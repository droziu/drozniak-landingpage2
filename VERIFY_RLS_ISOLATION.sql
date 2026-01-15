-- =========================================
-- WERYFIKACJA RLS - Izolacja kursów między użytkownikami
-- =========================================
-- Ten plik sprawdza czy RLS policies działają poprawnie
-- i czy użytkownicy widzą TYLKO swoje kursy

-- =========================================
-- 1. SPRAWDŹ RLS POLICIES DLA training_progress
-- =========================================

SELECT 
  schemaname,
  tablename,
  policyname,
  cmd as command,
  qual as using_expression,
  with_check as with_check_expression
FROM pg_policies
WHERE tablename IN ('training_progress', 'training_responses', 'module_unlocks', 'course_certificates', 'user_courses')
  AND schemaname = 'public'
ORDER BY tablename, policyname;

-- =========================================
-- 2. SPRAWDŹ CZY UŻYTKOWNIK WIDZI TYLKO SWOJE DANE
-- =========================================
-- (Wykonaj to jako konkretny użytkownik w Supabase Dashboard → SQL Editor)

-- Sprawdź jakie kursy widzi użytkownik (jako ten użytkownik)
SELECT 
  c.code,
  c.name,
  uc.active
FROM public.user_courses uc
JOIN public.courses c ON uc.course_id = c.id
WHERE uc.user_id = auth.uid()
  AND uc.active = true;

-- Sprawdź postęp użytkownika (jako ten użytkownik)
SELECT 
  course_id,
  module_code,
  status,
  last_step_code,
  percentage
FROM public.training_progress
WHERE user_id = auth.uid()
ORDER BY updated_at DESC
LIMIT 10;

-- Sprawdź odpowiedzi użytkownika (jako ten użytkownik)
SELECT 
  course_id,
  module_code,
  step_code,
  question_code,
  status
FROM public.training_responses
WHERE user_id = auth.uid()
ORDER BY created_at DESC
LIMIT 10;

-- =========================================
-- 3. SPRAWDŹ CZY ADMIN WIDZI WSZYSTKO
-- =========================================
-- (Wykonaj to jako admin - stanislaw@drozniak.com)

-- Sprawdź wszystkich użytkowników i ich kursy (jako admin)
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

-- Sprawdź postęp wszystkich użytkowników (jako admin)
SELECT 
  u.email,
  c.code as course_code,
  tp.module_code,
  tp.status,
  tp.percentage
FROM public.training_progress tp
JOIN auth.users u ON tp.user_id = u.id
JOIN public.courses c ON tp.course_id = c.id
ORDER BY tp.updated_at DESC
LIMIT 20;

-- =========================================
-- 4. TEST IZOLACJI - Sprawdź czy użytkownik NIE widzi danych innych
-- =========================================
-- To zapytanie powinno zwrócić TYLKO dane zalogowanego użytkownika
-- Jeśli zwróci dane innych użytkowników, RLS nie działa poprawnie

-- Sprawdź czy można zobaczyć dane innych użytkowników (NIE POWINNO BYĆ MOŻLIWE)
SELECT 
  u.email,
  tp.user_id,
  tp.course_id,
  tp.module_code
FROM public.training_progress tp
JOIN auth.users u ON tp.user_id = u.id
WHERE tp.user_id != auth.uid();  -- To NIE powinno zwrócić żadnych wyników dla zwykłego użytkownika
