-- =========================================
-- MIGRACJA - Rozszerzenie tabeli profiles o dane klienta
-- =========================================

-- Dodaj kolumny do profiles jeśli nie istnieją
do $$ 
begin
  if not exists (select 1 from information_schema.columns where table_name = 'profiles' and column_name = 'company_name') then
    alter table public.profiles add column company_name text;
  end if;
  
  if not exists (select 1 from information_schema.columns where table_name = 'profiles' and column_name = 'first_name') then
    alter table public.profiles add column first_name text;
  end if;
  
  if not exists (select 1 from information_schema.columns where table_name = 'profiles' and column_name = 'last_name') then
    alter table public.profiles add column last_name text;
  end if;
  
  if not exists (select 1 from information_schema.columns where table_name = 'profiles' and column_name = 'phone') then
    alter table public.profiles add column phone text;
  end if;
  
  if not exists (select 1 from information_schema.columns where table_name = 'profiles' and column_name = 'notes') then
    alter table public.profiles add column notes text;
  end if;
  
  if not exists (select 1 from information_schema.columns where table_name = 'profiles' and column_name = 'updated_at') then
    alter table public.profiles add column updated_at timestamptz default now();
  end if;
end $$;

-- Funkcja do automatycznego aktualizowania updated_at
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger do automatycznego aktualizowania updated_at
drop trigger if exists update_profiles_updated_at on public.profiles;
create trigger update_profiles_updated_at
before update on public.profiles
for each row
execute procedure public.update_updated_at_column();

-- Komentarze do kolumn
comment on column public.profiles.company_name is 'Nazwa firmy klienta';
comment on column public.profiles.first_name is 'Imię klienta';
comment on column public.profiles.last_name is 'Nazwisko klienta';
comment on column public.profiles.phone is 'Numer telefonu klienta';
comment on column public.profiles.notes is 'Notatki/cele biznesowe klienta';

-- =========================================
-- RLS (Row Level Security) dla profiles
-- =========================================

-- Włącz RLS jeśli nie jest włączone
alter table public.profiles enable row level security;

-- Usuń stare policies jeśli istnieją
drop policy if exists "profiles_user_select" on public.profiles;
drop policy if exists "profiles_user_update" on public.profiles;
drop policy if exists "profiles_user_insert" on public.profiles;
drop policy if exists "profiles_admin_all" on public.profiles;

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

-- Funkcja pomocnicza do sprawdzania czy użytkownik jest adminem
create or replace function public.is_admin()
returns boolean as $$
begin
  -- Sprawdź email użytkownika przez auth.jwt() - bezpieczniejsza metoda
  return (
    (auth.jwt() ->> 'email')::text = 'stanislaw@drozniak.com'
  );
end;
$$ language plpgsql security definer stable;

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

