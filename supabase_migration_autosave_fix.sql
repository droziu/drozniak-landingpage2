-- =========================================
-- MIGRACJA - Naprawa auto-save odpowiedzi i widoczności dla admina
-- =========================================

-- Upewnij się, że tabela training_responses istnieje z odpowiednimi kolumnami
-- i że wszystkie odpowiedzi są zapisywane niezależnie od statusu

-- =========================================
-- 1. SPRAWDŹ I NAPRAW TABELĘ training_responses
-- =========================================

-- Upewnij się, że tabela istnieje
do $$ 
begin
  if not exists (select 1 from information_schema.tables where table_name = 'training_responses') then
    create table public.training_responses (
      id uuid primary key default gen_random_uuid(),
      user_id uuid not null references auth.users(id) on delete cascade,
      module_code text not null,
      step_code text not null,
      question_code text not null,
      answer_text text not null,
      status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
      admin_feedback text,
      reviewed_by uuid references auth.users(id),
      reviewed_at timestamptz,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      unique (user_id, module_code, step_code, question_code)
    );
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
-- 2. NAPRAW RLS DLA training_responses
-- =========================================

-- Włącz RLS
alter table public.training_responses enable row level security;

-- Usuń stare policies
drop policy if exists "training_responses_user" on public.training_responses;
drop policy if exists "training_responses_admin" on public.training_responses;
drop policy if exists "training_responses_admin_select" on public.training_responses;
drop policy if exists "training_responses_admin_all" on public.training_responses;

-- Policy dla użytkowników - mogą czytać i modyfikować tylko swoje odpowiedzi
create policy "training_responses_user"
on public.training_responses
for all
using (
  auth.uid() = user_id
)
with check (
  auth.uid() = user_id
);

-- Policy dla admina - może czytać WSZYSTKIE odpowiedzi (SELECT)
create policy "training_responses_admin_select"
on public.training_responses
for select
using (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email = 'stanislaw@drozniak.com'
  )
);

-- Policy dla admina - może modyfikować WSZYSTKIE odpowiedzi (UPDATE, INSERT, DELETE)
create policy "training_responses_admin_all"
on public.training_responses
for all
using (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email = 'stanislaw@drozniak.com'
  )
)
with check (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email = 'stanislaw@drozniak.com'
  )
);

-- =========================================
-- 3. FUNKCJA DO AUTOMATYCZNEGO AKTUALIZOWANIA updated_at
-- =========================================

-- Funkcja do aktualizowania updated_at
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
-- 4. INDEKSY dla lepszej wydajności
-- =========================================

-- Indeksy dla training_responses
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
-- 5. KOMENTARZE DO KOLUMN (dokumentacja)
-- =========================================

comment on table public.training_responses is 'Odpowiedzi użytkowników na pytania w quizach - zapisywane automatycznie przez auto-save';
comment on column public.training_responses.module_code is 'Kod modułu, np. modul_1, modul_2';
comment on column public.training_responses.step_code is 'Kod lekcji, np. 6.3 (Praktyczne ćwiczenia)';
comment on column public.training_responses.question_code is 'Kod pytania lub podzadania, np. exercise1-sub1, exercise2-sub1, summary-q1';
comment on column public.training_responses.answer_text is 'Tekst odpowiedzi użytkownika - może zawierać tekst, liczby, URL, daty lub indeksy wybranych opcji (dla multichoice: "0,1,2")';
comment on column public.training_responses.status is 'Status odpowiedzi: pending (oczekuje na sprawdzenie), approved (zatwierdzona), rejected (odrzucona)';
comment on column public.training_responses.admin_feedback is 'Feedback od administratora dla użytkownika';

-- =========================================
-- 6. SPRAWDŹ POPRAWNOŚĆ ISTNIEJĄCYCH DANYCH
-- =========================================

-- Upewnij się, że wszystkie odpowiedzi mają status (jeśli nie ma, ustaw jako pending)
update public.training_responses
set status = 'pending'
where status is null;

-- =========================================
-- KONIEC MIGRACJI
-- =========================================

-- Podsumowanie:
-- 1. Tabela training_responses jest gotowa do przechowywania wszystkich odpowiedzi
-- 2. Użytkownicy mogą zapisywać swoje odpowiedzi (auto-save działa)
-- 3. Admin może widzieć wszystkie odpowiedzi w panelu admina
-- 4. Wszystkie odpowiedzi są zapisywane niezależnie od statusu (pending, approved, rejected)
-- 5. Odpowiedzi są automatycznie ładowane po odświeżeniu strony

