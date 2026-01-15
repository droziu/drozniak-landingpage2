-- =========================================
-- WERYFIKACJA MIGRACJI - System Wielokursowy
-- =========================================

-- 1. Sprawdź szczegóły aktywnego kursu użytkownika
SELECT 
  c.id,
  c.code,
  c.name,
  c.description,
  c.config_path,
  c.active as course_active,
  uc.active as user_course_active,
  uc.assigned_at
FROM public.courses c
JOIN public.user_courses uc ON c.id = uc.course_id
WHERE uc.user_id = auth.uid()
  AND uc.active = true
ORDER BY uc.assigned_at DESC
LIMIT 1;

-- 2. Sprawdź wszystkie kursy w systemie
SELECT 
  id,
  code,
  name,
  description,
  config_path,
  active,
  created_at
FROM public.courses
ORDER BY created_at DESC;

-- 3. Sprawdź przypisania użytkowników do kursów
SELECT 
  u.email,
  c.code as course_code,
  c.name as course_name,
  uc.active,
  uc.assigned_at
FROM public.user_courses uc
JOIN public.courses c ON uc.course_id = c.id
JOIN auth.users u ON uc.user_id = u.id
ORDER BY uc.assigned_at DESC
LIMIT 20;

-- 4. Sprawdź czy wszystkie rekordy mają course_id (powinno być 0)
SELECT 
  'training_progress' as tabela,
  COUNT(*) as total_records,
  COUNT(*) filter (where course_id IS NULL) as bez_course_id
FROM public.training_progress
UNION ALL
SELECT 
  'training_responses' as tabela,
  COUNT(*) as total_records,
  COUNT(*) filter (where course_id IS NULL) as bez_course_id
FROM public.training_responses
UNION ALL
SELECT 
  'module_unlocks' as tabela,
  COUNT(*) as total_records,
  COUNT(*) filter (where course_id IS NULL) as bez_course_id
FROM public.module_unlocks
UNION ALL
SELECT 
  'course_certificates' as tabela,
  COUNT(*) as total_records,
  COUNT(*) filter (where course_id IS NULL) as bez_course_id
FROM public.course_certificates;

-- 5. Sprawdź przykładowe dane z course_id
SELECT 
  user_id,
  course_id,
  module_code,
  status,
  last_step_code,
  percentage
FROM public.training_progress
WHERE course_id IS NOT NULL
ORDER BY updated_at DESC
LIMIT 10;
