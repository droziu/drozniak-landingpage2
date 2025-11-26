-- =========================================
-- MIGRACJA - Naprawa zapisywania odpowiedzi w lekcji 6.3
-- =========================================

-- Ta migracja zapewnia, że:
-- 1. Wszystkie odpowiedzi są zapisywane jako text (lub null)
-- 2. RLS pozwala na zapisywanie i odczytywanie odpowiedzi
-- 3. Admin widzi wszystkie odpowiedzi
-- 4. Nie zmienia istniejących danych ani struktur

-- =========================================
-- 1. SPRAWDŹ I NAPRAW TABELĘ training_responses
-- =========================================

-- Upewnij się, że tabela istnieje z odpowiednimi kolumnami
do $$ 
begin
  -- Sprawdź czy tabela istnieje
  if not exists (select 1 from information_schema.tables where table_name = 'training_responses') then
    create table public.training_responses (
      id uuid primary key default gen_random_uuid(),
      user_id uuid not null references auth.users(id) on delete cascade,
      module_code text not null,
      step_code text not null,
      question_code text not null,
      answer_text text, -- ZMIENIONE: może być NULL (wcześniej było NOT NULL)
      status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
      admin_feedback text,
      reviewed_by uuid references auth.users(id),
      reviewed_at timestamptz,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      unique (user_id, module_code, step_code, question_code)
    );
  else
    -- Zmień answer_text na nullable (jeśli jest NOT NULL)
    if exists (
      select 1 from information_schema.columns 
      where table_name = 'training_responses' 
      and column_name = 'answer_text' 
      and is_nullable = 'NO'
    ) then
      alter table public.training_responses 
      alter column answer_text drop not null;
    end if;
  end if;
  
  -- Upewnij się, że wszystkie kolumny istnieją
  if not exists (select 1 from information_schema.columns where table_name = 'training_responses' and column_name = 'status') then
    alter table public.training_responses add column status text not null default 'pending' check (status in ('pending', 'approved', 'rejected'));
  end if;
  
  if not exists (select 1 from information_schema.columns where table_name = 'training_responses' and column_name = 'admin_feedback') then
    alter table public.training_responses add column admin_feedback text;
  end if;
  
  if not exists (select 1 from information_schema.columns where table_name = 'training_responses' and column_name = 'reviewed_by') then
    alter table public.training_responses add column reviewed_by uuid references auth.users(id);
  end if;
  
  if not exists (select 1 from information_schema.columns where table_name = 'training_responses' and column_name = 'reviewed_at') then
    alter table public.training_responses add column reviewed_at timestamptz;
  end if;
  
  if not exists (select 1 from information_schema.columns where table_name = 'training_responses' and column_name = 'updated_at') then
    alter table public.training_responses add column updated_at timestamptz not null default now();
  end if;
  
  -- Upewnij się, że unique constraint istnieje
  if not exists (
    select 1 from information_schema.table_constraints 
    where constraint_name = 'training_responses_user_id_module_code_step_code_question_code_key'
  ) then
    alter table public.training_responses 
    add constraint training_responses_user_id_module_code_step_code_question_code_key 
    unique (user_id, module_code, step_code, question_code);
  end if;
end $$;

-- =========================================
-- 2. NAPRAW FUNKCJĘ is_admin()
-- =========================================

create or replace function public.is_admin()
returns boolean as $$
begin
  return (
    (auth.jwt() ->> 'email')::text = 'stanislaw@drozniak.com'
  );
end;
$$ language plpgsql security definer stable;

-- =========================================
-- 3. NAPRAW RLS DLA training_responses
-- =========================================

-- Włącz RLS
alter table public.training_responses enable row level security;

-- Usuń WSZYSTKIE stare policies (żeby nie było konfliktów)
drop policy if exists "training_responses_user" on public.training_responses;
drop policy if exists "training_responses_admin" on public.training_responses;
drop policy if exists "training_responses_admin_select" on public.training_responses;
drop policy if exists "training_responses_admin_all" on public.training_responses;
drop policy if exists "training_responses_all" on public.training_responses;

-- Policy 1: Użytkownicy mogą zapisywać i odczytywać swoje odpowiedzi
create policy "training_responses_user"
on public.training_responses
for all
using (
  auth.uid() = user_id
)
with check (
  auth.uid() = user_id
);

-- Policy 2: Admin widzi WSZYSTKIE odpowiedzi (SELECT)
create policy "training_responses_admin_select"
on public.training_responses
for select
using (
  public.is_admin()
);

-- Policy 3: Admin może modyfikować WSZYSTKIE odpowiedzi (INSERT, UPDATE, DELETE)
create policy "training_responses_admin_all"
on public.training_responses
for all
using (
  public.is_admin()
)
with check (
  public.is_admin()
);

-- =========================================
-- 4. FUNKCJA DO AUTOMATYCZNEGO AKTUALIZOWANIA updated_at
-- =========================================

create or replace function public.update_training_responses_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger dla training_responses
drop trigger if exists update_training_responses_updated_at on public.training_responses;
create trigger update_training_responses_updated_at
before update on public.training_responses
for each row
execute procedure public.update_training_responses_updated_at();

-- =========================================
-- 5. INDEKSY dla lepszej wydajności
-- =========================================

create index if not exists idx_training_responses_user_id 
on public.training_responses(user_id);

create index if not exists idx_training_responses_user_module_step 
on public.training_responses(user_id, module_code, step_code);

create index if not exists idx_training_responses_status 
on public.training_responses(status) 
where status = 'pending';

create index if not exists idx_training_responses_created_at 
on public.training_responses(created_at desc);

-- Indeks dla question_code (dla subTasks)
create index if not exists idx_training_responses_question_code 
on public.training_responses(question_code);

-- =========================================
-- 6. SPRAWDŹ POPRAWNOŚĆ DANYCH
-- =========================================

-- Upewnij się, że wszystkie odpowiedzi mają status (jeśli nie ma, ustaw jako pending)
update public.training_responses
set status = 'pending'
where status is null;

-- =========================================
-- 7. KOMENTARZE DO KOLUMN (dokumentacja)
-- =========================================

comment on table public.training_responses is 'Odpowiedzi użytkowników na pytania w quizach - może być NULL jeśli nie wypełnione';
comment on column public.training_responses.answer_text is 'Tekst odpowiedzi użytkownika - może być NULL jeśli nie wypełnione, tekst jeśli wypełnione';
comment on column public.training_responses.module_code is 'Kod modułu, np. modul_6';
comment on column public.training_responses.step_code is 'Kod lekcji, np. 6.3';
comment on column public.training_responses.question_code is 'Kod pytania lub podzadania, np. exercise1-sub1, exercise2-sub1';
comment on column public.training_responses.status is 'Status odpowiedzi: pending, approved, rejected';

-- =========================================
-- KONIEC MIGRACJI
-- =========================================

-- PODSUMOWANIE:
-- 1. Tabela training_responses ma answer_text jako nullable (może być NULL)
-- 2. RLS pozwala użytkownikom zapisywać i odczytywać swoje odpowiedzi
-- 3. Admin widzi wszystkie odpowiedzi
-- 4. Wszystkie odpowiedzi są zapisywane jako text (lub NULL)
-- 5. Nie zmieniono istniejących danych ani struktur innych tabel
-- 6. Postęp użytkowników pozostaje bez zmian

-- TEST:
-- Po wykonaniu migracji, sprawdź w SQL Editor:
-- SELECT * FROM training_responses WHERE step_code = '6.3' LIMIT 10;

