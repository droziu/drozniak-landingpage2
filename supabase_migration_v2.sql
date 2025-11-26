-- =========================================
-- MIGRACJA V2 - Panel szkolenia z weryfikacją odpowiedzi
-- =========================================

-- Upewnij się, że mamy funkcję gen_random_uuid (Supabase zwykle ma)
create extension if not exists "pgcrypto";

-- =========================================
-- 1. AKTUALIZACJA: training_responses - dodanie statusu weryfikacji
-- =========================================

-- Dodaj kolumny do training_responses jeśli nie istnieją
do $$ 
begin
  -- Sprawdź i dodaj kolumny tylko jeśli nie istnieją
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
  
  -- Jeśli kolumna status istnieje ale nie ma constraint, dodaj go
  if exists (select 1 from information_schema.columns where table_name = 'training_responses' and column_name = 'status') then
    -- Sprawdź czy constraint już istnieje
    if not exists (select 1 from information_schema.check_constraints where constraint_name like '%status%check%') then
      alter table public.training_responses add constraint training_responses_status_check check (status in ('pending', 'approved', 'rejected'));
    end if;
  end if;
end $$;

-- Komentarz: status 'pending' dla pytań otwartych oczekujących na weryfikację
-- status 'approved' dla zatwierdzonych odpowiedzi
-- status 'rejected' dla odrzuconych (z możliwością poprawy)

-- =========================================
-- 2. NOWA TABELA: module_unlocks - odblokowywanie modułów
-- =========================================

create table if not exists public.module_unlocks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  module_id text not null, -- np. '1', '2', '3'
  unlocked_at timestamptz not null default now(),
  unlocked_by text default 'system', -- 'system' lub 'admin' (jeśli admin odblokował ręcznie)
  unique (user_id, module_id)
);

alter table public.module_unlocks enable row level security;

-- RLS: użytkownik widzi tylko swoje odblokowania, admin widzi wszystkie
drop policy if exists "module_unlocks_user" on public.module_unlocks;
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

drop policy if exists "module_unlocks_insert" on public.module_unlocks;
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

-- =========================================
-- 3. FUNKCJA: Automatyczne odblokowywanie modułu po zatwierdzeniu wszystkich odpowiedzi
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
begin
  -- Pobierz dane z aktualizowanego rekordu
  current_module_id := split_part(new.step_code, '.', 1);
  user_id_val := new.user_id;
  module_code_val := new.module_code;
  
  -- Sprawdź czy status zmienił się na 'approved'
  if new.status = 'approved' and (old.status is null or old.status != 'approved') then
    
    -- Sprawdź czy wszystkie odpowiedzi w module są zatwierdzone
    -- Liczymy odpowiedzi które są pending lub rejected (tylko dla pytań otwartych)
    -- oraz odpowiedzi które są approved
    select 
      count(*) filter (where (tr.status = 'pending' or tr.status = 'rejected')),
      count(*) filter (where tr.status = 'approved')
    into pending_or_rejected_count, approved_count
    from public.training_responses tr
    where tr.user_id = user_id_val
      and tr.module_code = module_code_val
      and split_part(tr.step_code, '.', 1) = current_module_id;
    
    -- Sprawdź czy wszystkie odpowiedzi w module są zatwierdzone (nie ma pending ani rejected)
    -- approved_count > 0 zapewnia, że są jakieś odpowiedzi
    if pending_or_rejected_count = 0 and approved_count > 0 then
      next_module_id := (current_module_id::integer + 1)::text;
      
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
-- 4. AKTUALIZACJA RLS: training_responses - admin może przeglądać wszystkie
-- =========================================

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
-- 5. FUNKCJA POMOCNICZA: Sprawdź czy moduł jest odblokowany
-- =========================================

create or replace function public.is_module_unlocked(p_user_id uuid, p_module_id text)
returns boolean as $$
begin
  -- Moduł 1 jest zawsze odblokowany
  if p_module_id = '1' then
    return true;
  end if;
  
  -- Sprawdź czy moduł jest odblokowany
  return exists (
    select 1 
    from public.module_unlocks 
    where user_id = p_user_id 
    and module_id = p_module_id
  );
end;
$$ language plpgsql security definer;

-- =========================================
-- 6. AUTOMATYCZNE ODBLOKOWANIE MODUŁU 1 DLA WSZYSTKICH UŻYTKOWNIKÓW
-- =========================================

-- Funkcja do automatycznego odblokowania modułu 1 dla nowych użytkowników
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
-- 7. AKTUALIZACJA: training_progress - lepsze zarządzanie postępem
-- =========================================

-- Dodaj kolumnę do śledzenia czy moduł jest w pełni ukończony
do $$ 
begin
  if not exists (select 1 from information_schema.columns where table_name = 'training_progress' and column_name = 'module_completed') then
    alter table public.training_progress add column module_completed boolean default false;
  end if;
end $$;

-- Komentarz: module_completed = true oznacza, że wszystkie lekcje w module są ukończone
-- i wszystkie pytania otwarte są zatwierdzone

-- =========================================
-- 8. INDEKSY dla lepszej wydajności
-- =========================================

create index if not exists idx_training_responses_user_module 
on public.training_responses(user_id, module_code, step_code);

create index if not exists idx_training_responses_status 
on public.training_responses(status) 
where status = 'pending';

create index if not exists idx_module_unlocks_user 
on public.module_unlocks(user_id, module_id);

-- =========================================
-- KONIEC MIGRACJI
-- =========================================

