-- =========================================
-- SPRAWDZENIE PRZYPISANIA UŻYTKOWNIKA DO KURSU
-- =========================================

-- 1. Sprawdź czy użytkownik ma przypisanie do kursu social-boost-1.0
SELECT 
  u.id as user_id,
  u.email,
  c.code as course_code,
  c.name as course_name,
  uc.active,
  uc.assigned_at,
  uc.assigned_by
FROM public.user_courses uc
JOIN public.courses c ON uc.course_id = c.id
JOIN auth.users u ON uc.user_id = u.id
WHERE u.id = 'd3cabccb-8528-4d45-b601-27d416bc9eae'
ORDER BY uc.assigned_at DESC;

-- 2. Sprawdź wszystkie aktywne przypisania tego użytkownika
SELECT 
  c.code as course_code,
  c.name as course_name,
  uc.active,
  uc.assigned_at
FROM public.user_courses uc
JOIN public.courses c ON uc.course_id = c.id
WHERE uc.user_id = 'd3cabccb-8528-4d45-b601-27d416bc9eae'
  AND uc.active = true;

-- 3. Sprawdź czy użytkownik ma jakiekolwiek dane w kursie social-boost-1.0
SELECT 
  'training_progress' as tabela,
  COUNT(*) as liczba_rekordow
FROM public.training_progress tp
JOIN public.courses c ON tp.course_id = c.id
WHERE tp.user_id = 'd3cabccb-8528-4d45-b601-27d416bc9eae'
  AND c.code = 'social-boost-1.0'
UNION ALL
SELECT 
  'training_responses' as tabela,
  COUNT(*) as liczba_rekordow
FROM public.training_responses tr
JOIN public.courses c ON tr.course_id = c.id
WHERE tr.user_id = 'd3cabccb-8528-4d45-b601-27d416bc9eae'
  AND c.code = 'social-boost-1.0';

-- 4. Sprawdź email użytkownika (dla weryfikacji)
SELECT 
  id,
  email,
  created_at
FROM auth.users
WHERE id = 'd3cabccb-8528-4d45-b601-27d416bc9eae';
