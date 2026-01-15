-- =========================================
-- MIGRACJA - Przypisanie użytkownika testowego do kursu "Social Boost 1.0"
-- =========================================
-- Użytkownik: eb372103-09e4-42dd-a0c4-5c9e741d5792
-- Kurs: social-boost-1.0

DO $$
DECLARE
  target_user_id uuid := 'eb372103-09e4-42dd-a0c4-5c9e741d5792';
  target_course_id uuid;
  admin_user_id uuid;
  user_email text;
BEGIN
  -- Sprawdź czy użytkownik istnieje
  SELECT id, email INTO target_user_id, user_email
  FROM auth.users
  WHERE id = 'eb372103-09e4-42dd-a0c4-5c9e741d5792';
  
  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'Użytkownik o ID eb372103-09e4-42dd-a0c4-5c9e741d5792 nie został znaleziony';
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
  
  RAISE NOTICE 'Przypisano użytkownika testowego % (email: %) do kursu social-boost-1.0', target_user_id, user_email;
END $$;

-- =========================================
-- WERYFIKACJA
-- =========================================

-- Sprawdź przypisanie użytkownika testowego
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
WHERE u.id = 'eb372103-09e4-42dd-a0c4-5c9e741d5792'
  AND uc.active = true;

-- Sprawdź wszystkich użytkowników przypisanych do kursu social-boost-1.0
SELECT 
  u.id as user_id,
  u.email,
  uc.active,
  uc.assigned_at
FROM public.user_courses uc
JOIN public.courses c ON uc.course_id = c.id
JOIN auth.users u ON uc.user_id = u.id
WHERE c.code = 'social-boost-1.0'
  AND uc.active = true
ORDER BY uc.assigned_at DESC;
