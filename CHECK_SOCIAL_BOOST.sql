-- =========================================
-- SPRAWDZENIE KURSU "Social Boost 1.0"
-- =========================================

-- 1. Sprawdź szczegóły kursu
SELECT 
  id,
  code,
  name,
  description,
  config_path,
  active,
  created_at
FROM public.courses
WHERE code = 'social-boost-1.0';

-- 2. Sprawdź wszystkie kursy w systemie
SELECT 
  code,
  name,
  active,
  created_at
FROM public.courses
ORDER BY created_at DESC;

-- 3. Sprawdź ile użytkowników ma przypisanie do każdego kursu
SELECT 
  c.code as course_code,
  c.name as course_name,
  COUNT(uc.id) as liczba_przypisan
FROM public.courses c
LEFT JOIN public.user_courses uc ON c.id = uc.course_id AND uc.active = true
GROUP BY c.id, c.code, c.name
ORDER BY c.created_at DESC;
