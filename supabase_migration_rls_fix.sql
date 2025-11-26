-- =========================================
-- MIGRACJA RLS FIX - Naprawa wszystkich RLS policies
-- =========================================

-- Funkcja pomocnicza do sprawdzania czy użytkownik jest adminem
-- Używa bezpiecznego sposobu bez bezpośredniego odczytu z auth.users
create or replace function public.is_admin()
returns boolean as $$
begin
  -- Sprawdź email użytkownika przez auth.jwt() - bezpieczniejsza metoda
  return (
    (auth.jwt() ->> 'email')::text = 'stanislaw@drozniak.com'
  );
end;
$$ language plpgsql security definer stable;

-- =========================================
-- 1. NAPRAW RLS DLA profiles
-- =========================================

-- Włącz RLS
alter table public.profiles enable row level security;

-- Usuń stare policies
drop policy if exists "profiles_user_select" on public.profiles;
drop policy if exists "profiles_user_update" on public.profiles;
drop policy if exists "profiles_user_insert" on public.profiles;
drop policy if exists "profiles_admin_all" on public.profiles;
drop policy if exists "profiles_all" on public.profiles;

-- Policy dla użytkowników - mogą czytać i modyfikować tylko swój profil
create policy "profiles_user_select"
on public.profiles
for select
using (
  auth.uid() = id
);

create policy "profiles_user_update"
on public.profiles
for update
using (
  auth.uid() = id
)
with check (
  auth.uid() = id
);

create policy "profiles_user_insert"
on public.profiles
for insert
with check (
  auth.uid() = id
);

-- Policy dla admina - może czytać i modyfikować wszystkie profile
create policy "profiles_admin_all"
on public.profiles
for all
using (
  public.is_admin()
)
with check (
  public.is_admin()
);

-- =========================================
-- 2. NAPRAW RLS DLA training_progress
-- =========================================

-- Włącz RLS
alter table public.training_progress enable row level security;

-- Usuń stare policies
drop policy if exists "training_progress_user" on public.training_progress;
drop policy if exists "training_progress_admin" on public.training_progress;
drop policy if exists "training_progress_all" on public.training_progress;

-- Policy dla użytkowników - widzą tylko swój postęp
create policy "training_progress_user"
on public.training_progress
for all
using (
  auth.uid() = user_id
)
with check (
  auth.uid() = user_id
);

-- Policy dla admina - widzi wszystkie postępy
create policy "training_progress_admin"
on public.training_progress
for all
using (
  public.is_admin()
)
with check (
  public.is_admin()
);

-- =========================================
-- 3. NAPRAW RLS DLA training_responses
-- =========================================

-- Włącz RLS
alter table public.training_responses enable row level security;

-- Usuń stare policies
drop policy if exists "training_responses_user" on public.training_responses;
drop policy if exists "training_responses_admin" on public.training_responses;
drop policy if exists "training_responses_all" on public.training_responses;

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
  public.is_admin()
)
with check (
  public.is_admin()
);

-- =========================================
-- 4. NAPRAW RLS DLA module_unlocks
-- =========================================

-- Włącz RLS
alter table public.module_unlocks enable row level security;

-- Usuń stare policies
drop policy if exists "module_unlocks_user" on public.module_unlocks;
drop policy if exists "module_unlocks_insert" on public.module_unlocks;
drop policy if exists "module_unlocks_admin" on public.module_unlocks;

-- Policy dla użytkowników - widzą tylko swoje odblokowania
create policy "module_unlocks_user"
on public.module_unlocks
for select
using (
  auth.uid() = user_id
);

create policy "module_unlocks_insert"
on public.module_unlocks
for insert
with check (
  auth.uid() = user_id OR public.is_admin()
);

-- Policy dla admina - widzi wszystkie odblokowania
create policy "module_unlocks_admin"
on public.module_unlocks
for all
using (
  public.is_admin()
)
with check (
  public.is_admin()
);

-- =========================================
-- 5. SPRAWDŹ CZY WSZYSTKIE TABELE MAJĄ RLS WŁĄCZONE
-- =========================================

-- Sprawdź status RLS dla wszystkich tabel
do $$
declare
  table_name text;
begin
  for table_name in 
    select tablename 
    from pg_tables 
    where schemaname = 'public' 
    and tablename in ('profiles', 'training_progress', 'training_responses', 'module_unlocks')
  loop
    execute format('alter table public.%I enable row level security', table_name);
  end loop;
end $$;

-- =========================================
-- 6. KOMENTARZE
-- =========================================

comment on function public.is_admin() is 'Sprawdza czy użytkownik jest adminem (stanislaw@drozniak.com)';

-- =========================================
-- KONIEC MIGRACJI
-- =========================================

