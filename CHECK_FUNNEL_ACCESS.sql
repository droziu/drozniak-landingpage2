-- =====================================================
-- SPRAWDZENIE DOSTĘPU DO LEJKA DLA KONTA
-- =====================================================
-- Ten skrypt automatycznie znajdzie user_id i sprawdzi dostęp

-- 1. Znajdź user_id dla konta drozniakstanislaw@gmail.com
SELECT 
  u.id as user_id, 
  u.email,
  pc.id as panel_client_id,
  pc.marketing_client_id,
  mc.id as marketing_client_check_id,
  mc.name as marketing_client_name
FROM auth.users u
LEFT JOIN panel_clients pc ON pc.user_id = u.id
LEFT JOIN marketing_clients mc ON mc.id = pc.marketing_client_id
WHERE u.email = 'drozniakstanislaw@gmail.com';

-- 2. Sprawdź lejki przypisane do tego marketing_client_id
-- (Zastąp MARKETING_CLIENT_ID rzeczywistym ID z powyższego zapytania)
-- Przykład:
/*
SELECT 
  fd.id as funnel_id,
  fd.project_name,
  fd.client_id as funnel_client_id,
  fa.id as funnel_access_id,
  fa.access_level,
  CASE 
    WHEN fa.id IS NOT NULL THEN '✅ MA DOSTĘP (przez funnel_access)'
    WHEN fd.client_id = pc.marketing_client_id THEN '⚠️ Przypisany do client_id, ale brak wpisu w funnel_access'
    ELSE '❌ BRAK DOSTĘPU'
  END as access_status
FROM funnel_diagrams fd
LEFT JOIN funnel_access fa ON fa.funnel_id = fd.id 
LEFT JOIN panel_clients pc ON pc.marketing_client_id = fd.client_id
WHERE fd.client_id IN (
  SELECT marketing_client_id FROM panel_clients 
  WHERE user_id = (SELECT id FROM auth.users WHERE email = 'drozniakstanislaw@gmail.com')
)
OR fa.client_id IN (
  SELECT marketing_client_id FROM panel_clients 
  WHERE user_id = (SELECT id FROM auth.users WHERE email = 'drozniakstanislaw@gmail.com')
);
*/

-- 3. AUTOMATYCZNE DODANIE WPISÓW DO funnel_access dla lejków z client_id
-- (To naprawi dostęp dla istniejących lejków)
DO $$
DECLARE
  user_uuid UUID;
  marketing_client_uuid UUID;
  var_count INTEGER;
BEGIN
  -- Znajdź user_id
  SELECT id INTO user_uuid 
  FROM auth.users 
  WHERE email = 'drozniakstanislaw@gmail.com';
  
  IF user_uuid IS NULL THEN
    RAISE NOTICE 'Nie znaleziono użytkownika';
    RETURN;
  END IF;
  
  -- Znajdź marketing_client_id
  SELECT marketing_client_id INTO marketing_client_uuid
  FROM panel_clients
  WHERE user_id = user_uuid;
  
  IF marketing_client_uuid IS NULL THEN
    RAISE NOTICE 'Nie znaleziono marketing_client_id dla użytkownika';
    RETURN;
  END IF;
  
  RAISE NOTICE 'User ID: %', user_uuid;
  RAISE NOTICE 'Marketing Client ID: %', marketing_client_uuid;
  
  -- Dodaj wpisy w funnel_access dla lejków z client_id = marketing_client_id, które nie mają wpisu
  INSERT INTO funnel_access (funnel_id, client_id, access_level, granted_by)
  SELECT 
    fd.id,
    fd.client_id,
    'view'::TEXT,
    user_uuid
  FROM funnel_diagrams fd
  WHERE fd.client_id = marketing_client_uuid
  AND NOT EXISTS (
    SELECT 1 FROM funnel_access fa 
    WHERE fa.funnel_id = fd.id 
    AND fa.client_id = marketing_client_uuid
  );
  
  GET DIAGNOSTICS var_count = ROW_COUNT;
  RAISE NOTICE 'Dodano % wpisów do funnel_access', var_count;
  
END $$;

-- 4. SPRAWDZENIE PO NAPRAWIE - lista lejków dostępnych dla użytkownika
SELECT 
  fd.id as funnel_id,
  fd.project_name,
  fd.status,
  fa.access_level,
  '✅ DOSTĘP' as status_dostepu
FROM funnel_diagrams fd
INNER JOIN funnel_access fa ON fa.funnel_id = fd.id
INNER JOIN panel_clients pc ON pc.marketing_client_id = fa.client_id
WHERE pc.user_id = (SELECT id FROM auth.users WHERE email = 'drozniakstanislaw@gmail.com')
AND fd.status = 'active'
ORDER BY fd.updated_at DESC;
