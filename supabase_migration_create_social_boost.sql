-- =========================================
-- MIGRACJA - Utworzenie nowego kursu "Social Boost 1.0"
-- =========================================
-- Ten kurs jest kopią istniejącego kursu "marketing-online"
-- Wszystko działa identycznie - sposób zapisywania, panel klienta, etc.

-- =========================================
-- 1. UTWÓRZ NOWY KURS
-- =========================================

INSERT INTO public.courses (
  code,
  name,
  description,
  config_path,
  active,
  created_by
)
VALUES (
  'social-boost-1.0',  -- Unikalny kod kursu
  'Szkolenie Social Boost: Sztuka Marketingu Online i Pozyskiwania Klientów 1.0',
  'Szkolenie z marketingu online i pozyskiwania klientów - identyczne z kursem marketing-online',
  'trainingModules',  -- Używa tego samego config_path co domyślny kurs (identyczne działanie)
  true,
  (SELECT id FROM auth.users WHERE email = 'stanislaw@drozniak.com' LIMIT 1)
)
ON CONFLICT (code) DO NOTHING
RETURNING id, code, name, config_path;

-- =========================================
-- 2. OPCJONALNIE: Skopiuj przypisania użytkowników z istniejącego kursu
-- =========================================
-- Odkomentuj poniższe, jeśli chcesz automatycznie przypisać wszystkich użytkowników
-- z kursu "marketing-online" do nowego kursu "social-boost-1.0"

/*
DO $$
DECLARE
  source_course_id uuid;
  target_course_id uuid;
  admin_user_id uuid;
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
  
  RAISE NOTICE 'Skopiowano przypisania użytkowników z kursu marketing-online do social-boost-1.0';
END $$;
*/

-- =========================================
-- 3. WERYFIKACJA
-- =========================================

-- Sprawdź czy kurs został utworzony
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

-- Sprawdź ile użytkowników ma przypisanie do tego kursu
SELECT 
  COUNT(*) as liczba_przypisan
FROM public.user_courses uc
JOIN public.courses c ON uc.course_id = c.id
WHERE c.code = 'social-boost-1.0'
  AND uc.active = true;
