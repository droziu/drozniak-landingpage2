-- =========================================
-- SPRAWDZENIE - Jaki kurs ma użytkownik?
-- =========================================

-- 1. Sprawdź przypisanie użytkownika do kursu
SELECT 
  u.email,
  c.code as course_code,
  c.name as course_name,
  c.config_path,
  c.id as course_id,
  uc.active,
  uc.assigned_at
FROM public.user_courses uc
JOIN public.courses c ON uc.course_id = c.id
JOIN auth.users u ON uc.user_id = u.id
WHERE u.id = '525af3fb-8bd5-4fe2-8584-f5203575b43c'
  AND uc.active = true;

-- 2. Sprawdź wszystkie kursy w systemie
SELECT 
  code,
  name,
  config_path,
  active,
  created_at
FROM public.courses
ORDER BY created_at DESC;

-- 3. Sprawdź wszystkich użytkowników i ich kursy
SELECT 
  u.email,
  c.code as course_code,
  c.name as course_name,
  uc.active,
  uc.assigned_at
FROM public.user_courses uc
JOIN public.courses c ON uc.course_id = c.id
JOIN auth.users u ON uc.user_id = u.id
WHERE uc.active = true
ORDER BY uc.assigned_at DESC;
