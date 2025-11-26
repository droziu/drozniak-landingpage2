-- =========================================
-- MIGRACJA - Naprawa widoczności odpowiedzi dla admina i przywrócenie danych
-- =========================================

-- WAŻNE: Ta migracja NIE USUWA danych - tylko naprawia RLS policies
-- Jeśli dane zniknęły, mogą być w backupie Supabase lub niewidoczne przez RLS

-- =========================================
-- 1. SPRAWDŹ CZY DANE ISTNIEJĄ (tylko do sprawdzenia - nie modyfikuje)
-- =========================================

-- Sprawdź liczbę odpowiedzi (bez RLS - tylko dla sprawdzenia)
-- Odkomentuj poniższe, aby sprawdzić:
-- SELECT COUNT(*) as total_responses FROM public.training_responses;
-- SELECT COUNT(*) as total_progress FROM public.training_progress;

-- =========================================
-- 2. NAPRAW FUNKCJĘ is_admin() 
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
-- 3. NAPRAW RLS DLA training_responses - ADMIN MUSI WIDZIEĆ WSZYSTKO
-- =========================================

-- Włącz RLS
alter table public.training_responses enable row level security;

-- Usuń WSZYSTKIE stare policies (żeby nie było konfliktów)
drop policy if exists "training_responses_user" on public.training_responses;
drop policy if exists "training_responses_admin" on public.training_responses;
drop policy if exists "training_responses_admin_select" on public.training_responses;
drop policy if exists "training_responses_admin_all" on public.training_responses;
drop policy if exists "training_responses_all" on public.training_responses;

-- Policy 1: Admin widzi WSZYSTKIE odpowiedzi (SELECT) - ma wyższy priorytet
create policy "training_responses_admin_select"
on public.training_responses
for select
using (
  public.is_admin()
);

-- Policy 2: Admin może modyfikować WSZYSTKIE odpowiedzi (INSERT, UPDATE, DELETE)
create policy "training_responses_admin_all"
on public.training_responses
for all
using (
  public.is_admin()
)
with check (
  public.is_admin()
);

-- Policy 3: Użytkownicy widzą tylko swoje odpowiedzi (SELECT, INSERT, UPDATE)
create policy "training_responses_user"
on public.training_responses
for all
using (
  auth.uid() = user_id
)
with check (
  auth.uid() = user_id
);

-- =========================================
-- 4. NAPRAW RLS DLA training_progress - ADMIN MUSI WIDZIEĆ WSZYSTKO
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

-- Policy dla admina - widzi WSZYSTKIE postępy (SELECT)
create policy "training_progress_admin_select"
on public.training_progress
for select
using (
  public.is_admin()
);

-- Policy dla admina - może modyfikować WSZYSTKIE postępy
create policy "training_progress_admin_all"
on public.training_progress
for all
using (
  public.is_admin()
)
with check (
  public.is_admin()
);

-- =========================================
-- 5. SPRAWDŹ CZY WSZYSTKIE ODPOWIEDZI SĄ WIDOCZNE (diagnostyka)
-- =========================================

-- Po wykonaniu migracji, sprawdź w Supabase Dashboard:
-- 1. Table Editor → training_responses → zobacz wszystkie rekordy jako admin
-- 2. Sprawdź czy są odpowiedzi z step_code = '6.3'
-- 3. Sprawdź czy są odpowiedzi z question_code zawierające 'exercise', 'summary-q'

-- =========================================
-- 6. PRZYWRÓCENIE DANYCH Z BACKUPU (jeśli dane zostały usunięte)
-- =========================================

-- Jeśli dane faktycznie zniknęły (nie tylko są niewidoczne przez RLS):
-- 1. Sprawdź w Supabase Dashboard → Database → Backups
-- 2. Możesz przywrócić dane z punktu przywracania (Point-in-Time Recovery)
-- 3. Lub sprawdź czy są w tabeli audit/logs

-- UWAGA: Poniższy kod NIE usuwa danych - tylko sprawdza:
-- SELECT 
--   module_code, 
--   step_code, 
--   COUNT(*) as count 
-- FROM public.training_responses 
-- GROUP BY module_code, step_code 
-- ORDER BY count DESC;

-- =========================================
-- 7. NAPRAW PROFILES (jeśli są problemy z widocznością)
-- =========================================

alter table public.profiles enable row level security;

drop policy if exists "profiles_user_select" on public.profiles;
drop policy if exists "profiles_user_update" on public.profiles;
drop policy if exists "profiles_user_insert" on public.profiles;
drop policy if exists "profiles_admin_select" on public.profiles;
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
-- KONIEC MIGRACJI
-- =========================================

-- PODSUMOWANIE:
-- 1. RLS policies zostały naprawione - admin powinien widzieć wszystkie odpowiedzi
-- 2. Jeśli dane faktycznie zniknęły, sprawdź backup w Supabase Dashboard
-- 3. Po wykonaniu migracji, odśwież panel admina i sprawdź czy odpowiedzi są widoczne

-- DIAGNOSTYKA:
-- Po wykonaniu migracji, uruchom w SQL Editor:
-- SELECT COUNT(*) FROM training_responses; -- powinno pokazać liczbę odpowiedzi
-- SELECT * FROM training_responses WHERE step_code = '6.3' LIMIT 10; -- sprawdź odpowiedzi z lekcji 6.3

