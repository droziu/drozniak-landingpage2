-- =========================================
-- MIGRACJA - Przypisanie użytkowników do kursu "Social Boost 1.0"
-- =========================================

-- OPCJA 1: Skopiuj wszystkich użytkowników z kursu "marketing-online"
-- (Odkomentuj poniższe, jeśli chcesz to zrobić automatycznie)

DO $$
DECLARE
  source_course_id uuid;
  target_course_id uuid;
  admin_user_id uuid;
  copied_count integer;
BEGIN
  -- Pobierz ID kursów
  SELECT id INTO source_course_id
  FROM public.courses
  WHERE code = 'marketing-online'
  LIMIT 1;
  
  SELECT id INTO target_course_id
  FROM public.courses
  WHERE code = 'social-boost-1.0'
  LIMIT 1;
  
  -- Pobierz ID admina
  SELECT id INTO admin_user_id
  FROM auth.users
  WHERE email = 'stanislaw@drozniak.com'
  LIMIT 1;
  
  -- Sprawdź czy kursy istnieją
  IF source_course_id IS NULL THEN
    RAISE EXCEPTION 'Kurs marketing-online nie został znaleziony';
  END IF;
  
  IF target_course_id IS NULL THEN
    RAISE EXCEPTION 'Kurs social-boost-1.0 nie został znaleziony';
  END IF;
  
  -- Skopiuj przypisania użytkowników (tylko aktywni)
  INSERT INTO public.user_courses (user_id, course_id, assigned_by, active)
  SELECT 
    uc.user_id,
    target_course_id,
    admin_user_id,
    true
  FROM public.user_courses uc
  WHERE uc.course_id = source_course_id
    AND uc.active = true
    AND NOT EXISTS (
      SELECT 1 FROM public.user_courses
      WHERE user_id = uc.user_id
        AND course_id = target_course_id
    );
  
  GET DIAGNOSTICS copied_count = ROW_COUNT;
  
  RAISE NOTICE 'Skopiowano % przypisań użytkowników z kursu marketing-online do social-boost-1.0', copied_count;
END $$;

-- =========================================
-- WERYFIKACJA
-- =========================================

-- Sprawdź ile użytkowników ma przypisanie do każdego kursu
SELECT 
  c.code as course_code,
  c.name as course_name,
  COUNT(uc.id) as liczba_przypisan,
  COUNT(CASE WHEN uc.active = true THEN 1 END) as aktywnych_przypisan
FROM public.courses c
LEFT JOIN public.user_courses uc ON c.id = uc.course_id
WHERE c.code IN ('marketing-online', 'social-boost-1.0')
GROUP BY c.id, c.code, c.name
ORDER BY c.code;

-- Sprawdź przykładowe przypisania
SELECT 
  u.email,
  c.code as course_code,
  uc.active,
  uc.assigned_at
FROM public.user_courses uc
JOIN public.courses c ON uc.course_id = c.id
JOIN auth.users u ON uc.user_id = u.id
WHERE c.code = 'social-boost-1.0'
ORDER BY uc.assigned_at DESC
LIMIT 10;
