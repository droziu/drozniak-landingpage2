-- =========================================
-- MIGRACJA - Naprawa widoczności wszystkich użytkowników dla admina
-- =========================================

-- Upewnij się, że funkcja is_admin() działa poprawnie
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
-- NAPRAW RLS DLA profiles - upewnij się, że admin widzi WSZYSTKIE profile
-- =========================================

-- Włącz RLS
alter table public.profiles enable row level security;

-- Usuń stare policies
drop policy if exists "profiles_user_select" on public.profiles;
drop policy if exists "profiles_user_update" on public.profiles;
drop policy if exists "profiles_user_insert" on public.profiles;
drop policy if exists "profiles_admin_all" on public.profiles;
drop policy if exists "profiles_admin_select" on public.profiles;

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

-- Policy dla admina - może czytać WSZYSTKIE profile (SELECT)
create policy "profiles_admin_select"
on public.profiles
for select
using (
  public.is_admin()
);

-- Policy dla admina - może modyfikować WSZYSTKIE profile (UPDATE, INSERT, DELETE)
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
-- NAPRAW RLS DLA training_progress - upewnij się, że admin widzi WSZYSTKIE postępy
-- =========================================

-- Włącz RLS
alter table public.training_progress enable row level security;

-- Usuń stare policies
drop policy if exists "training_progress_user" on public.training_progress;
drop policy if exists "training_progress_admin" on public.training_progress;
drop policy if exists "training_progress_admin_select" on public.training_progress;

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

-- Policy dla admina - widzi WSZYSTKIE postępy
create policy "training_progress_admin_select"
on public.training_progress
for select
using (
  public.is_admin()
);

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
-- NAPRAW RLS DLA training_responses - upewnij się, że admin widzi WSZYSTKIE odpowiedzi
-- =========================================

-- Włącz RLS
alter table public.training_responses enable row level security;

-- Usuń stare policies
drop policy if exists "training_responses_user" on public.training_responses;
drop policy if exists "training_responses_admin" on public.training_responses;
drop policy if exists "training_responses_admin_select" on public.training_responses;

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

-- Policy dla admina - widzi WSZYSTKIE odpowiedzi
create policy "training_responses_admin_select"
on public.training_responses
for select
using (
  public.is_admin()
);

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
-- NAPRAW RLS DLA module_unlocks - upewnij się, że admin widzi WSZYSTKIE odblokowania
-- =========================================

-- Włącz RLS
alter table public.module_unlocks enable row level security;

-- Usuń stare policies
drop policy if exists "module_unlocks_user" on public.module_unlocks;
drop policy if exists "module_unlocks_admin" on public.module_unlocks;
drop policy if exists "module_unlocks_admin_select" on public.module_unlocks;

-- Policy dla użytkowników - widzą tylko swoje odblokowania
create policy "module_unlocks_user"
on public.module_unlocks
for all
using (
  auth.uid() = user_id
)
with check (
  auth.uid() = user_id
);

-- Policy dla admina - widzi WSZYSTKIE odblokowania
create policy "module_unlocks_admin_select"
on public.module_unlocks
for select
using (
  public.is_admin()
);

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
-- TRIGGER - Automatyczne tworzenie profilu dla nowych użytkowników
-- =========================================

-- Funkcja do automatycznego tworzenia profilu dla nowego użytkownika
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, created_at, updated_at)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    now(),
    now()
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger, który tworzy profil przy rejestracji nowego użytkownika
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =========================================
-- FUNKCJA - Utworzenie profilu dla istniejących użytkowników bez profilu
-- =========================================

-- Funkcja pomocnicza do tworzenia profilu dla użytkownika, który już istnieje w auth.users, ale nie ma profilu
create or replace function public.create_missing_profiles()
returns void as $$
declare
  auth_user record;
begin
  -- Dla każdego użytkownika w auth.users, który nie ma profilu w profiles
  for auth_user in 
    select au.id, au.email, au.raw_user_meta_data
    from auth.users au
    left join public.profiles p on au.id = p.id
    where p.id is null
  loop
    -- Utwórz profil
    insert into public.profiles (id, full_name, created_at, updated_at)
    values (
      auth_user.id,
      coalesce(auth_user.raw_user_meta_data->>'full_name', auth_user.email),
      now(),
      now()
    )
    on conflict (id) do nothing; -- Jeśli już istnieje, nie rób nic
  end loop;
end;
$$ language plpgsql security definer;

-- Uruchom funkcję, aby utworzyć profile dla istniejących użytkowników
select public.create_missing_profiles();

