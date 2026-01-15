-- =========================================
-- SPRAWDZENIE UŻYTKOWNIKA 525af3fb-8bd5-4fe2-8584-f5203575b43c
-- =========================================

-- 1. Sprawdź przypisanie do kursu
SELECT 
  u.id as user_id,
  u.email,
  c.code as course_code,
  c.name as course_name,
  c.config_path,
  uc.active,
  uc.assigned_at
FROM public.user_courses uc
JOIN public.courses c ON uc.course_id = c.id
JOIN auth.users u ON uc.user_id = u.id
WHERE u.id = '525af3fb-8bd5-4fe2-8584-f5203575b43c'
  AND uc.active = true;

-- 2. Sprawdź czy użytkownik ma jakiekolwiek dane w kursie
SELECT 
  'training_progress' as tabela,
  COUNT(*) as liczba_rekordow
FROM public.training_progress tp
JOIN public.courses c ON tp.course_id = c.id
WHERE tp.user_id = '525af3fb-8bd5-4fe2-8584-f5203575b43c'
  AND c.code = 'social-boost-1.0'
UNION ALL
SELECT 
  'training_responses' as tabela,
  COUNT(*) as liczba_rekordow
FROM public.training_responses tr
JOIN public.courses c ON tr.course_id = c.id
WHERE tr.user_id = '525af3fb-8bd5-4fe2-8584-f5203575b43c'
  AND c.code = 'social-boost-1.0';

-- 3. Sprawdź email użytkownika
SELECT 
  id,
  email,
  created_at
FROM auth.users
WHERE id = '525af3fb-8bd5-4fe2-8584-f5203575b43c';
