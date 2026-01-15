-- =========================================
-- MIGRACJA - Przypisanie konkretnego użytkownika do kursu "Social Boost 1.0"
-- =========================================
-- WAŻNE: RLS policies zapewniają, że użytkownicy widzą TYLKO swoje kursy
-- Admin widzi wszystko i może zarządzać

-- =========================================
-- 1. PRZYPISZ UŻYTKOWNIKA DO KURSU
-- =========================================

DO $$
DECLARE
  target_user_id uuid := 'd3cabccb-8528-4d45-b601-27d416bc9eae';
  target_course_id uuid;
  admin_user_id uuid;
  user_email text;
BEGIN
  -- Sprawdź czy użytkownik istnieje
  SELECT id, email INTO target_user_id, user_email
  FROM auth.users
  WHERE id = 'd3cabccb-8528-4d45-b601-27d416bc9eae';
  
  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'Użytkownik o ID d3cabccb-8528-4d45-b601-27d416bc9eae nie został znaleziony';
  END IF;
  
  -- Pobierz ID kursu Social Boost
  SELECT id INTO target_course_id
  FROM public.courses
  WHERE code = 'social-boost-1.0'
  LIMIT 1;
  
  IF target_course_id IS NULL THEN
    RAISE EXCEPTION 'Kurs social-boost-1.0 nie został znaleziony';
  END IF;
  
  -- Pobierz ID admina
  SELECT id INTO admin_user_id
  FROM auth.users
  WHERE email = 'stanislaw@drozniak.com'
  LIMIT 1;
  
  -- Deaktywuj poprzednie kursy użytkownika (jeśli ma inne aktywne)
  UPDATE public.user_courses
  SET active = false
  WHERE user_id = target_user_id
    AND active = true
    AND course_id != target_course_id;
  
  -- Przypisz kurs (lub zaktualizuj jeśli już istnieje)
  INSERT INTO public.user_courses (user_id, course_id, assigned_by, active)
  VALUES (
    target_user_id,
    target_course_id,
    admin_user_id,
    true
  )
  ON CONFLICT (user_id, course_id)
  DO UPDATE SET
    active = true,
    assigned_at = now(),
    assigned_by = admin_user_id;
  
  RAISE NOTICE 'Przypisano użytkownika % (email: %) do kursu social-boost-1.0', target_user_id, user_email;
END $$;

-- =========================================
-- 2. WERYFIKACJA
-- =========================================

-- Sprawdź przypisanie użytkownika
SELECT 
  u.id as user_id,
  u.email,
  c.code as course_code,
  c.name as course_name,
  uc.active,
  uc.assigned_at
FROM public.user_courses uc
JOIN public.courses c ON uc.course_id = c.id
JOIN auth.users u ON uc.user_id = u.id
WHERE u.id = 'd3cabccb-8528-4d45-b601-27d416bc9eae'
  AND uc.active = true;

-- Sprawdź wszystkie aktywne przypisania tego użytkownika
SELECT 
  c.code as course_code,
  c.name as course_name,
  uc.active,
  uc.assigned_at
FROM public.user_courses uc
JOIN public.courses c ON uc.course_id = c.id
WHERE uc.user_id = 'd3cabccb-8528-4d45-b601-27d416bc9eae'
ORDER BY uc.assigned_at DESC;
