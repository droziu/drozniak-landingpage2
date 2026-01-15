-- =========================================
-- MIGRACJA - System wielokursowy
-- =========================================
-- Ta migracja umożliwia przypisywanie różnych kursów do różnych użytkowników
-- 
-- Struktura:
-- 1. Tabela `courses` - definicje kursów
-- 2. Tabela `user_courses` - przypisania użytkowników do kursów
-- 3. Dodanie `course_id` do istniejących tabel
-- 4. Migracja istniejących danych do domyślnego kursu
-- 5. Aktualizacja RLS policies

-- =========================================
-- 1. TABELA courses - definicje kursów
-- =========================================

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  code text not null unique, -- np. 'marketing-online', 'catering-ai'
  name text not null, -- np. 'Marketing online dla hoteli', 'AI w usługach cateringowych'
  description text,
  config_path text, -- ścieżka do pliku konfiguracji (np. 'trainingModules', 'trainingModulesCatering')
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id)
);

-- Włącz RLS
alter table public.courses enable row level security;

-- Policy: Wszyscy zalogowani użytkownicy mogą czytać kursy
create policy "courses_select_all"
on public.courses
for select
using (auth.uid() is not null);

-- Policy: Tylko admin może modyfikować kursy
create policy "courses_admin_all"
on public.courses
for all
using (
  public.is_admin()
)
with check (
  public.is_admin()
);

-- Indeksy
create index if not exists idx_courses_code on public.courses(code);
create index if not exists idx_courses_active on public.courses(active) where active = true;

-- =========================================
-- 2. TABELA user_courses - przypisania użytkowników do kursów
-- =========================================

create table if not exists public.user_courses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  assigned_at timestamptz not null default now(),
  assigned_by uuid references auth.users(id),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (user_id, course_id)
);

-- Włącz RLS
alter table public.user_courses enable row level security;

-- Policy: Użytkownicy widzą tylko swoje przypisania
create policy "user_courses_user_select"
on public.user_courses
for select
using (
  auth.uid() = user_id
);

-- Policy: Admin widzi wszystkie przypisania
create policy "user_courses_admin_all"
on public.user_courses
for all
using (
  public.is_admin()
)
with check (
  public.is_admin()
);

-- Indeksy
create index if not exists idx_user_courses_user_id on public.user_courses(user_id);
create index if not exists idx_user_courses_course_id on public.user_courses(course_id);
create index if not exists idx_user_courses_active on public.user_courses(user_id, active) where active = true;

-- =========================================
-- 3. DODAJ course_id DO ISTNIEJĄCYCH TABEL
-- =========================================

-- 3.1. training_progress
do $$ 
begin
  if not exists (
    select 1 from information_schema.columns 
    where table_name = 'training_progress' 
    and column_name = 'course_id'
  ) then
    alter table public.training_progress 
    add column course_id uuid references public.courses(id) on delete cascade;
    
    -- Zmień unique constraint, aby uwzględniał course_id
    alter table public.training_progress 
    drop constraint if exists training_progress_user_id_module_code_key;
    
    alter table public.training_progress 
    add constraint training_progress_user_course_module_key 
    unique (user_id, course_id, module_code);
  end if;
end $$;

-- Indeks dla training_progress z course_id
create index if not exists idx_training_progress_course_id 
on public.training_progress(course_id);

create index if not exists idx_training_progress_user_course_module 
on public.training_progress(user_id, course_id, module_code);

-- 3.2. training_responses
do $$ 
begin
  if not exists (
    select 1 from information_schema.columns 
    where table_name = 'training_responses' 
    and column_name = 'course_id'
  ) then
    alter table public.training_responses 
    add column course_id uuid references public.courses(id) on delete cascade;
    
    -- Zmień unique constraint, aby uwzględniał course_id
    alter table public.training_responses 
    drop constraint if exists training_responses_user_module_step_question_key;
    
    alter table public.training_responses 
    add constraint training_responses_user_course_module_step_question_key 
    unique (user_id, course_id, module_code, step_code, question_code);
  end if;
end $$;

-- Indeks dla training_responses z course_id
create index if not exists idx_training_responses_course_id 
on public.training_responses(course_id);

create index if not exists idx_training_responses_user_course_module_step 
on public.training_responses(user_id, course_id, module_code, step_code);

-- 3.3. module_unlocks
do $$ 
begin
  if not exists (
    select 1 from information_schema.columns 
    where table_name = 'module_unlocks' 
    and column_name = 'course_id'
  ) then
    alter table public.module_unlocks 
    add column course_id uuid references public.courses(id) on delete cascade;
  end if;
end $$;

-- Indeks dla module_unlocks z course_id
create index if not exists idx_module_unlocks_course_id 
on public.module_unlocks(course_id);

create index if not exists idx_module_unlocks_user_course_module 
on public.module_unlocks(user_id, course_id, module_id);

-- 3.4. course_certificates
do $$ 
begin
  if not exists (
    select 1 from information_schema.columns 
    where table_name = 'course_certificates' 
    and column_name = 'course_id'
  ) then
    alter table public.course_certificates 
    add column course_id uuid references public.courses(id) on delete cascade;
    
    -- Zmień unique constraint, aby uwzględniał course_id
    alter table public.course_certificates 
    drop constraint if exists course_certificates_user_id_key;
    
    alter table public.course_certificates 
    add constraint course_certificates_user_course_key 
    unique (user_id, course_id);
  end if;
end $$;

-- Indeks dla course_certificates z course_id
create index if not exists idx_course_certificates_course_id 
on public.course_certificates(course_id);

-- =========================================
-- 4. FUNKCJE POMOCNICZE (potrzebne przed aktualizacją innych funkcji)
-- =========================================

-- 4.1. Funkcja do pobierania aktywnego kursu użytkownika
create or replace function public.get_user_active_course(p_user_id uuid)
returns uuid as $$
declare
  v_course_id uuid;
begin
  -- Sprawdź czy tabela user_courses istnieje (może nie istnieć podczas migracji)
  if exists (select 1 from information_schema.tables where table_name = 'user_courses') then
    select course_id into v_course_id
    from public.user_courses
    where user_id = p_user_id
      and active = true
    order by assigned_at desc
    limit 1;
  end if;
  
  return v_course_id;
end;
$$ language plpgsql security definer stable;

comment on function public.get_user_active_course(uuid) is 'Zwraca ID aktywnego kursu użytkownika';

-- =========================================
-- 5. AKTUALIZACJA ISTNIEJĄCYCH FUNKCJI - DODAJ course_id
-- =========================================
-- WAŻNE: Aktualizujemy funkcje PRZED migracją danych,
-- aby działały poprawnie podczas UPDATE course_id

-- 5.1. Zaktualizuj funkcję check_lesson_completed - dodaj course_id
create or replace function public.check_lesson_completed(
  p_user_id uuid,
  p_course_id uuid,
  p_module_code text,
  p_step_code text
)
returns boolean as $$
declare
  total_questions integer;
  completed_questions integer;
begin
  -- Jeśli course_id jest null, użyj starej wersji (dla kompatybilności podczas migracji)
  if p_course_id is null then
    select 
      count(*),
      count(*) filter (where status = 'approved')
    into total_questions, completed_questions
    from public.training_responses
    where user_id = p_user_id
      and module_code = p_module_code
      and step_code = p_step_code;
  else
    -- Pobierz wszystkie odpowiedzi dla tej lekcji z course_id
    select 
      count(*),
      count(*) filter (where status = 'approved')
    into total_questions, completed_questions
    from public.training_responses
    where user_id = p_user_id
      and course_id = p_course_id
      and module_code = p_module_code
      and step_code = p_step_code;
  end if;
  
  -- Jeśli nie ma pytań, uznaj za ukończone
  if total_questions = 0 then
    return true;
  end if;
  
  -- Wszystkie odpowiedzi muszą być zatwierdzone
  return completed_questions = total_questions;
end;
$$ language plpgsql security definer;

-- 5.2. Zaktualizuj funkcję update_progress_on_response - dodaj course_id
create or replace function public.update_progress_on_response()
returns trigger as $$
declare
  v_course_id uuid;
  v_module_code text;
  v_step_code text;
  v_user_id uuid;
  v_lesson_completed boolean;
  v_module_lessons integer;
  v_completed_lessons integer;
  v_percentage integer;
begin
  v_course_id := new.course_id;
  v_module_code := new.module_code;
  v_step_code := new.step_code;
  v_user_id := new.user_id;
  
  -- Jeśli course_id jest null, spróbuj pobrać aktywny kurs użytkownika
  if v_course_id is null then
    v_course_id := public.get_user_active_course(v_user_id);
  end if;
  
  -- Sprawdź czy lekcja jest ukończona (funkcja obsługuje null course_id)
  v_lesson_completed := public.check_lesson_completed(v_user_id, v_course_id, v_module_code, v_step_code);
  
  if v_lesson_completed then
    -- Jeśli course_id jest null, użyj starego constraint (dla kompatybilności podczas migracji)
    if v_course_id is null then
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
        50,
        false
      )
      on conflict (user_id, module_code) 
      do update set
        last_step_code = v_step_code,
        updated_at = now();
    else
      -- Użyj nowego constraint z course_id
      insert into public.training_progress (
        user_id,
        course_id,
        module_code,
        status,
        last_step_code,
        percentage,
        module_completed
      )
      values (
        v_user_id,
        v_course_id,
        v_module_code,
        'in_progress',
        v_step_code,
        50,
        false
      )
      on conflict (user_id, course_id, module_code) 
      do update set
        last_step_code = v_step_code,
        updated_at = now();
    end if;
  end if;
  
  return new;
end;
$$ language plpgsql security definer;

-- =========================================
-- 6. MIGRACJA ISTNIEJĄCYCH DANYCH
-- =========================================

-- WAŻNE: Wyłączamy trigger przed migracją, aby uniknąć problemów z constraint
alter table public.training_responses disable trigger trigger_update_progress_on_response;

-- 6.1. Utwórz domyślny kurs dla istniejących danych
do $$
declare
  default_course_id uuid;
  admin_user_id uuid;
begin
  -- Pobierz ID admina
  select id into admin_user_id
  from auth.users
  where email = 'stanislaw@drozniak.com'
  limit 1;
  
  -- Utwórz domyślny kurs jeśli nie istnieje
  insert into public.courses (code, name, description, config_path, active, created_by)
  values (
    'marketing-online',
    'Marketing online dla małych firm',
    'Domyślny kurs - istniejące dane',
    'trainingModules',
    true,
    admin_user_id
  )
  on conflict (code) do nothing
  returning id into default_course_id;
  
  -- Jeśli kurs już istnieje, pobierz jego ID
  if default_course_id is null then
    select id into default_course_id
    from public.courses
    where code = 'marketing-online'
    limit 1;
  end if;
  
  -- Przypisz wszystkich użytkowników do domyślnego kursu
  insert into public.user_courses (user_id, course_id, assigned_by, active)
  select distinct 
    user_id,
    default_course_id,
    admin_user_id,
    true
  from (
    select user_id from public.training_progress
    union
    select user_id from public.training_responses
    union
    select user_id from public.module_unlocks
    union
    select user_id from public.course_certificates
  ) as all_users
  where not exists (
    select 1 from public.user_courses 
    where user_courses.user_id = all_users.user_id 
    and user_courses.course_id = default_course_id
  );
  
  -- Zaktualizuj istniejące rekordy, dodając course_id
  update public.training_progress
  set course_id = default_course_id
  where course_id is null;
  
  update public.training_responses
  set course_id = default_course_id
  where course_id is null;
  
  update public.module_unlocks
  set course_id = default_course_id
  where course_id is null;
  
  update public.course_certificates
  set course_id = default_course_id
  where course_id is null;
end $$;

-- Włącz trigger z powrotem po migracji
alter table public.training_responses enable trigger trigger_update_progress_on_response;

-- =========================================
-- 7. AKTUALIZACJA RLS POLICIES
-- =========================================

-- 5.1. training_progress - dodać filtrowanie po course_id
drop policy if exists "training_progress_user" on public.training_progress;
drop policy if exists "training_progress_admin" on public.training_progress;

create policy "training_progress_user"
on public.training_progress
for all
using (
  auth.uid() = user_id
  and exists (
    select 1 from public.user_courses
    where user_courses.user_id = auth.uid()
    and user_courses.course_id = training_progress.course_id
    and user_courses.active = true
  )
)
with check (
  auth.uid() = user_id
  and exists (
    select 1 from public.user_courses
    where user_courses.user_id = auth.uid()
    and user_courses.course_id = training_progress.course_id
    and user_courses.active = true
  )
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

-- 5.2. training_responses - dodać filtrowanie po course_id
drop policy if exists "training_responses_user" on public.training_responses;
drop policy if exists "training_responses_admin_select" on public.training_responses;
drop policy if exists "training_responses_admin_all" on public.training_responses;

create policy "training_responses_user"
on public.training_responses
for all
using (
  auth.uid() = user_id
  and exists (
    select 1 from public.user_courses
    where user_courses.user_id = auth.uid()
    and user_courses.course_id = training_responses.course_id
    and user_courses.active = true
  )
)
with check (
  auth.uid() = user_id
  and exists (
    select 1 from public.user_courses
    where user_courses.user_id = auth.uid()
    and user_courses.course_id = training_responses.course_id
    and user_courses.active = true
  )
);

create policy "training_responses_admin_select"
on public.training_responses
for select
using (
  public.is_admin()
);

create policy "training_responses_admin_all"
on public.training_responses
for all
using (
  public.is_admin()
)
with check (
  public.is_admin()
);

-- 5.3. module_unlocks - dodać filtrowanie po course_id
drop policy if exists "module_unlocks_user" on public.module_unlocks;
drop policy if exists "module_unlocks_insert" on public.module_unlocks;
drop policy if exists "module_unlocks_admin_select" on public.module_unlocks;
drop policy if exists "module_unlocks_admin" on public.module_unlocks;

create policy "module_unlocks_user"
on public.module_unlocks
for select
using (
  auth.uid() = user_id
  and exists (
    select 1 from public.user_courses
    where user_courses.user_id = auth.uid()
    and user_courses.course_id = module_unlocks.course_id
    and user_courses.active = true
  )
);

create policy "module_unlocks_insert"
on public.module_unlocks
for insert
with check (
  auth.uid() = user_id
  and exists (
    select 1 from public.user_courses
    where user_courses.user_id = auth.uid()
    and user_courses.course_id = module_unlocks.course_id
    and user_courses.active = true
  )
);

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

-- 5.4. course_certificates - dodać filtrowanie po course_id
drop policy if exists "course_certificates_user" on public.course_certificates;
drop policy if exists "course_certificates_admin_all" on public.course_certificates;

create policy "course_certificates_user"
on public.course_certificates
for all
using (
  auth.uid() = user_id
  and exists (
    select 1 from public.user_courses
    where user_courses.user_id = auth.uid()
    and user_courses.course_id = course_certificates.course_id
    and user_courses.active = true
  )
)
with check (
  auth.uid() = user_id
  and exists (
    select 1 from public.user_courses
    where user_courses.user_id = auth.uid()
    and user_courses.course_id = course_certificates.course_id
    and user_courses.active = true
  )
);

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
-- 8. KOMENTARZE
-- =========================================

comment on table public.courses is 'Definicje kursów szkoleniowych';
comment on table public.user_courses is 'Przypisania użytkowników do kursów';
comment on column public.courses.code is 'Unikalny kod kursu (np. marketing-online, catering-ai)';
comment on column public.courses.config_path is 'Ścieżka do pliku konfiguracji modułów (np. trainingModules, trainingModulesCatering)';
comment on column public.user_courses.active is 'Czy przypisanie jest aktywne (użytkownik może mieć wiele kursów, ale tylko jeden aktywny)';
