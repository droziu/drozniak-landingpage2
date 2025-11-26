-- =========================================
-- MIGRACJA FIX - Naprawa zapisywania odpowiedzi i postępu
-- =========================================

-- Upewnij się, że mamy funkcję gen_random_uuid (Supabase zwykle ma)
create extension if not exists "pgcrypto";

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
      module_code text not null, -- np. 'modul_1', 'modul_2'
      step_code text not null, -- np. '1.1', '1.2'
      question_code text not null, -- np. 'q1', 'q2'
      answer_text text not null,
      status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
      admin_feedback text,
      reviewed_by uuid references auth.users(id),
      reviewed_at timestamptz,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      unique (user_id, module_code, step_code, question_code)
    );
  else
    -- Dodaj brakujące kolumny jeśli tabela już istnieje
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
    
    -- Dodaj unique constraint jeśli nie istnieje
    if not exists (
      select 1 from information_schema.table_constraints 
      where constraint_name = 'training_responses_user_id_module_code_step_code_question_code_key'
    ) then
      alter table public.training_responses 
      add constraint training_responses_user_id_module_code_step_code_question_code_key 
      unique (user_id, module_code, step_code, question_code);
    end if;
  end if;
end $$;

-- Włącz RLS
alter table public.training_responses enable row level security;

-- Usuń stare policies jeśli istnieją
drop policy if exists "training_responses_all" on public.training_responses;
drop policy if exists "training_responses_user" on public.training_responses;
drop policy if exists "training_responses_admin" on public.training_responses;

-- Policy dla użytkowników - widzą tylko swoje odpowiedzi
create policy "training_responses_user"
on public.training_responses
for all
using (
  auth.uid() = user_id
)
with check (
  auth.uid() = user_id
);

-- Policy dla admina - widzi wszystkie odpowiedzi
create policy "training_responses_admin"
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
-- 2. SPRAWDŹ I NAPRAW TABELĘ training_progress
-- =========================================

do $$ 
begin
  if not exists (select 1 from information_schema.tables where table_name = 'training_progress') then
    create table public.training_progress (
      id uuid primary key default gen_random_uuid(),
      user_id uuid not null references auth.users(id) on delete cascade,
      module_code text not null, -- np. 'modul_1', 'modul_2'
      status text not null default 'in_progress' check (status in ('in_progress', 'completed')),
      last_step_code text not null, -- np. '1.1', '1.2'
      percentage integer not null default 0 check (percentage >= 0 and percentage <= 100),
      completed_at timestamptz,
      module_completed boolean default false,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      unique (user_id, module_code)
    );
  else
    -- Dodaj brakujące kolumny
    if not exists (select 1 from information_schema.columns where table_name = 'training_progress' and column_name = 'module_completed') then
      alter table public.training_progress add column module_completed boolean default false;
    end if;
    
    if not exists (select 1 from information_schema.columns where table_name = 'training_progress' and column_name = 'updated_at') then
      alter table public.training_progress add column updated_at timestamptz not null default now();
    end if;
    
    -- Dodaj unique constraint jeśli nie istnieje
    if not exists (
      select 1 from information_schema.table_constraints 
      where constraint_name = 'training_progress_user_id_module_code_key'
    ) then
      alter table public.training_progress 
      add constraint training_progress_user_id_module_code_key 
      unique (user_id, module_code);
    end if;
  end if;
end $$;

-- Włącz RLS
alter table public.training_progress enable row level security;

-- Usuń stare policies
drop policy if exists "training_progress_user" on public.training_progress;
drop policy if exists "training_progress_admin" on public.training_progress;

-- Policy dla użytkowników
create policy "training_progress_user"
on public.training_progress
for all
using (
  auth.uid() = user_id
)
with check (
  auth.uid() = user_id
);

-- Policy dla admina
create policy "training_progress_admin"
on public.training_progress
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
-- 3. FUNKCJE DO AUTOMATYCZNEGO AKTUALIZOWANIA updated_at
-- =========================================

-- Funkcja do aktualizowania updated_at dla training_responses
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

-- Funkcja do aktualizowania updated_at dla training_progress
create or replace function public.update_training_progress_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger dla training_progress
drop trigger if exists update_training_progress_updated_at on public.training_progress;
create trigger update_training_progress_updated_at
before update on public.training_progress
for each row
execute procedure public.update_training_progress_updated_at();

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

-- Indeksy dla training_progress
create index if not exists idx_training_progress_user_id 
on public.training_progress(user_id);

create index if not exists idx_training_progress_user_module 
on public.training_progress(user_id, module_code);

-- =========================================
-- 5. FUNKCJA POMOCNICZA: Sprawdź czy wszystkie odpowiedzi w lekcji są poprawne
-- =========================================

create or replace function public.check_lesson_completed(
  p_user_id uuid,
  p_module_code text,
  p_step_code text
)
returns boolean as $$
declare
  total_questions integer;
  completed_questions integer;
begin
  -- Pobierz wszystkie odpowiedzi dla tej lekcji
  select 
    count(*),
    count(*) filter (where status = 'approved')
  into total_questions, completed_questions
  from public.training_responses
  where user_id = p_user_id
    and module_code = p_module_code
    and step_code = p_step_code;
  
  -- Jeśli nie ma pytań, uznaj za ukończone
  if total_questions = 0 then
    return true;
  end if;
  
  -- Wszystkie odpowiedzi muszą być zatwierdzone
  return completed_questions = total_questions;
end;
$$ language plpgsql security definer;

-- =========================================
-- 6. FUNKCJA: Automatyczne aktualizowanie postępu po zapisaniu odpowiedzi
-- =========================================

create or replace function public.update_progress_on_response()
returns trigger as $$
declare
  v_module_code text;
  v_step_code text;
  v_user_id uuid;
  v_lesson_completed boolean;
  v_module_lessons integer;
  v_completed_lessons integer;
  v_percentage integer;
begin
  v_module_code := new.module_code;
  v_step_code := new.step_code;
  v_user_id := new.user_id;
  
  -- Sprawdź czy lekcja jest ukończona
  v_lesson_completed := public.check_lesson_completed(v_user_id, v_module_code, v_step_code);
  
  if v_lesson_completed then
    -- Oblicz procent ukończenia modułu
    -- To jest uproszczone - w rzeczywistości powinno sprawdzać wszystkie lekcje w module
    -- Na razie ustawiamy na podstawie last_step_code
    
    -- Zaktualizuj lub utwórz postęp
    insert into public.training_progress (
      user_id,
      module_code,
      status,
      last_step_code,
      percentage,
      module_completed
    )
    values (
      v_user_id,
      v_module_code,
      'in_progress',
      v_step_code,
      50, -- Tymczasowo - będzie obliczane w aplikacji
      false
    )
    on conflict (user_id, module_code) 
    do update set
      last_step_code = v_step_code,
      updated_at = now();
  end if;
  
  return new;
end;
$$ language plpgsql security definer;

-- Trigger do automatycznego aktualizowania postępu
drop trigger if exists trigger_update_progress_on_response on public.training_responses;
create trigger trigger_update_progress_on_response
after insert or update on public.training_responses
for each row
execute procedure public.update_progress_on_response();

-- =========================================
-- 7. SPRAWDŹ I NAPRAW TABELĘ module_unlocks
-- =========================================

do $$ 
begin
  if not exists (select 1 from information_schema.tables where table_name = 'module_unlocks') then
    create table public.module_unlocks (
      id uuid primary key default gen_random_uuid(),
      user_id uuid not null references public.profiles(id) on delete cascade,
      module_id text not null, -- np. '1', '2', '3'
      unlocked_at timestamptz not null default now(),
      unlocked_by text default 'system',
      unique (user_id, module_id)
    );
  end if;
end $$;

-- Włącz RLS
alter table public.module_unlocks enable row level security;

-- Usuń stare policies
drop policy if exists "module_unlocks_user" on public.module_unlocks;
drop policy if exists "module_unlocks_insert" on public.module_unlocks;

-- Policy dla użytkowników
create policy "module_unlocks_user"
on public.module_unlocks
for select
using (
  auth.uid() = user_id 
  OR 
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email = 'stanislaw@drozniak.com'
  )
);

create policy "module_unlocks_insert"
on public.module_unlocks
for insert
with check (
  auth.uid() = user_id 
  OR 
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email = 'stanislaw@drozniak.com'
  )
);

-- Indeks dla module_unlocks
create index if not exists idx_module_unlocks_user 
on public.module_unlocks(user_id, module_id);

-- =========================================
-- 8. AUTOMATYCZNE ODBLOKOWANIE MODUŁU 1 DLA WSZYSTKICH UŻYTKOWNIKÓW
-- =========================================

-- Funkcja do automatycznego odblokowania modułu 1
create or replace function public.auto_unlock_module_1()
returns trigger as $$
begin
  insert into public.module_unlocks (user_id, module_id, unlocked_by)
  values (new.id, '1', 'system')
  on conflict (user_id, module_id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

-- Trigger do automatycznego odblokowania modułu 1
drop trigger if exists trigger_auto_unlock_module_1 on public.profiles;
create trigger trigger_auto_unlock_module_1
after insert on public.profiles
for each row
execute procedure public.auto_unlock_module_1();

-- Odblokuj moduł 1 dla istniejących użytkowników
insert into public.module_unlocks (user_id, module_id, unlocked_by)
select id, '1', 'system' from public.profiles
on conflict (user_id, module_id) do nothing;

-- =========================================
-- 9. FUNKCJA: Automatyczne odblokowywanie modułu po zatwierdzeniu wszystkich odpowiedzi
-- =========================================

create or replace function public.check_and_unlock_next_module()
returns trigger as $$
declare
  current_module_id text;
  next_module_id text;
  user_id_val uuid;
  pending_or_rejected_count integer;
  approved_count integer;
  module_code_val text;
  module_number text;
begin
  -- Pobierz dane z aktualizowanego rekordu
  user_id_val := new.user_id;
  module_code_val := new.module_code;
  
  -- Wyciągnij numer modułu z module_code (np. "modul_1" -> "1")
  module_number := replace(module_code_val, 'modul_', '');
  
  -- Sprawdź czy status zmienił się na 'approved'
  if new.status = 'approved' and (old.status is null or old.status != 'approved') then
    
    -- Sprawdź czy wszystkie odpowiedzi OTWARTE w module są zatwierdzone
    -- (tylko pytania otwarte wymagają zatwierdzenia przez admina)
    select 
      count(*) filter (where (tr.status = 'pending' or tr.status = 'rejected')),
      count(*) filter (where tr.status = 'approved')
    into pending_or_rejected_count, approved_count
    from public.training_responses tr
    where tr.user_id = user_id_val
      and tr.module_code = module_code_val;
    
    -- Sprawdź czy wszystkie odpowiedzi w module są zatwierdzone (nie ma pending ani rejected)
    if pending_or_rejected_count = 0 and approved_count > 0 then
      next_module_id := (module_number::integer + 1)::text;
      
      -- Sprawdź czy następny moduł istnieje (maksymalnie 6 modułów)
      if next_module_id::integer <= 6 then
        -- Odblokuj następny moduł
        insert into public.module_unlocks (user_id, module_id, unlocked_by)
        values (user_id_val, next_module_id, 'system')
        on conflict (user_id, module_id) do nothing;
      end if;
    end if;
  end if;
  
  return new;
end;
$$ language plpgsql security definer;

-- Trigger do automatycznego odblokowywania
drop trigger if exists trigger_unlock_next_module on public.training_responses;
create trigger trigger_unlock_next_module
after update of status on public.training_responses
for each row
when (new.status = 'approved')
execute procedure public.check_and_unlock_next_module();

-- =========================================
-- 10. KOMENTARZE DO KOLUMN (dokumentacja)
-- =========================================

comment on table public.training_responses is 'Odpowiedzi użytkowników na pytania w quizach';
comment on column public.training_responses.module_code is 'Kod modułu, np. modul_1, modul_2';
comment on column public.training_responses.step_code is 'Kod lekcji, np. 1.1, 1.2, 2.1';
comment on column public.training_responses.question_code is 'Kod pytania, np. q1, q2';
comment on column public.training_responses.answer_text is 'Tekst odpowiedzi użytkownika';
comment on column public.training_responses.status is 'Status odpowiedzi: pending (oczekuje), approved (zatwierdzona), rejected (odrzucona)';

comment on table public.training_progress is 'Postęp użytkowników w modułach szkolenia';
comment on column public.training_progress.module_code is 'Kod modułu, np. modul_1, modul_2';
comment on column public.training_progress.last_step_code is 'Ostatnia ukończona lekcja, np. 1.1, 1.2';
comment on column public.training_progress.percentage is 'Procent ukończenia modułu (0-100)';

comment on table public.module_unlocks is 'Odblokowane moduły dla użytkowników';
comment on column public.module_unlocks.module_id is 'ID modułu, np. 1, 2, 3';
comment on column public.module_unlocks.unlocked_by is 'Kto odblokował: system lub admin';

-- =========================================
-- KONIEC MIGRACJI
-- =========================================

