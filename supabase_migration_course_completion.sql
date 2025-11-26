-- =========================================
-- MIGRACJA - Ekran końcowy kursu i certyfikaty
-- =========================================

-- Ta migracja tworzy:
-- 1. Tabelę course_certificates dla danych do zaświadczenia
-- 2. Dodaje pola course_completed i course_completed_at do training_progress
-- 3. Ustawia RLS policies

-- =========================================
-- 1. TABELA course_certificates
-- =========================================

create table if not exists public.course_certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  full_name text,
  company_name text,
  email text,
  phone text,
  completion_date date,
  additional_question text,
  course_ready_to_complete boolean not null default false,
  submitted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id)
);

-- =========================================
-- 2. DODAJ POLA DO course_certificates
-- =========================================

-- Dodaj course_ready_to_complete, course_completed i course_completed_at do course_certificates
do $$ 
begin
  if not exists (
    select 1 from information_schema.columns 
    where table_name = 'course_certificates' 
    and column_name = 'course_ready_to_complete'
  ) then
    alter table public.course_certificates 
    add column course_ready_to_complete boolean not null default false;
  end if;
  
  if not exists (
    select 1 from information_schema.columns 
    where table_name = 'course_certificates' 
    and column_name = 'course_completed'
  ) then
    alter table public.course_certificates 
    add column course_completed boolean not null default false;
  end if;
  
  if not exists (
    select 1 from information_schema.columns 
    where table_name = 'course_certificates' 
    and column_name = 'course_completed_at'
  ) then
    alter table public.course_certificates 
    add column course_completed_at timestamptz;
  end if;
end $$;

-- =========================================
-- 3. RLS DLA course_certificates
-- =========================================

alter table public.course_certificates enable row level security;

-- Usuń stare policies
drop policy if exists "course_certificates_user" on public.course_certificates;
drop policy if exists "course_certificates_admin" on public.course_certificates;
drop policy if exists "course_certificates_admin_all" on public.course_certificates;

-- Policy 1: Użytkownicy mogą zapisywać i odczytywać swoje certyfikaty
create policy "course_certificates_user"
on public.course_certificates
for all
using (
  auth.uid() = user_id
)
with check (
  auth.uid() = user_id
);

-- Policy 2: Admin widzi wszystkie certyfikaty
create policy "course_certificates_admin_all"
on public.course_certificates
for all
using (
  public.is_admin()
)
with check (
  public.is_admin()
);

-- =========================================
-- 4. FUNKCJA DO AKTUALIZOWANIA updated_at
-- =========================================

create or replace function public.update_course_certificates_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger dla course_certificates
drop trigger if exists update_course_certificates_updated_at on public.course_certificates;
create trigger update_course_certificates_updated_at
before update on public.course_certificates
for each row
execute procedure public.update_course_certificates_updated_at();

-- =========================================
-- 5. INDEKSY
-- =========================================

create index if not exists idx_course_certificates_user_id 
on public.course_certificates(user_id);

create index if not exists idx_course_certificates_submitted_at 
on public.course_certificates(submitted_at desc);

create index if not exists idx_course_certificates_course_completed 
on public.course_certificates(course_completed) 
where course_completed = true;

-- =========================================
-- KONIEC MIGRACJI
-- =========================================

-- PODSUMOWANIE:
-- 1. Tabela course_certificates istnieje z polami do zaświadczenia
-- 2. Pola course_completed i course_completed_at dodane do course_certificates
-- 3. RLS pozwala użytkownikom zapisywać swoje certyfikaty
-- 4. Admin widzi wszystkie certyfikaty
-- 5. Indeksy dla lepszej wydajności

-- TEST:
-- Po wykonaniu migracji, sprawdź w SQL Editor:
-- SELECT * FROM course_certificates LIMIT 10;
-- SELECT * FROM course_certificates WHERE course_completed = true LIMIT 10;

