-- =====================================================
-- NAPRAWA DOSTĘPU DO LEJKA
-- =====================================================
-- User: drozniakstanislaw@gmail.com
-- Marketing Client ID: 1b1ac125-c529-4790-aab0-0764166515cb
-- User ID: 525af3fb-8bd5-4fe2-8584-f5203575b43c

-- 1. SPRAWDZENIE: Jakie lejki są przypisane do tego klienta?
SELECT 
  fd.id as funnel_id,
  fd.project_name,
  fd.client_id,
  fd.status,
  CASE 
    WHEN fa.id IS NOT NULL THEN '✅ MA wpis w funnel_access'
    ELSE '❌ BRAK wpisu w funnel_access'
  END as funnel_access_status
FROM funnel_diagrams fd
LEFT JOIN funnel_access fa ON fa.funnel_id = fd.id AND fa.client_id = '1b1ac125-c529-4790-aab0-0764166515cb'
WHERE fd.client_id = '1b1ac125-c529-4790-aab0-0764166515cb'
ORDER BY fd.updated_at DESC;

-- 2. NAPRAWA: Dodaj brakujące wpisy w funnel_access
INSERT INTO funnel_access (funnel_id, client_id, access_level, granted_by)
SELECT 
  fd.id,
  fd.client_id,
  'view'::TEXT,
  '525af3fb-8bd5-4fe2-8584-f5203575b43c'::UUID
FROM funnel_diagrams fd
WHERE fd.client_id = '1b1ac125-c529-4790-aab0-0764166515cb'
AND NOT EXISTS (
  SELECT 1 FROM funnel_access fa 
  WHERE fa.funnel_id = fd.id 
  AND fa.client_id = '1b1ac125-c529-4790-aab0-0764166515cb'
);

-- 3. SPRAWDZENIE PO NAPRAWIE: Lista lejków dostępnych dla użytkownika
SELECT 
  fd.id as funnel_id,
  fd.project_name,
  fd.status,
  fa.access_level,
  '✅ DOSTĘP' as status_dostepu
FROM funnel_diagrams fd
INNER JOIN funnel_access fa ON fa.funnel_id = fd.id
WHERE fa.client_id = '1b1ac125-c529-4790-aab0-0764166515cb'
AND fd.status = 'active'
ORDER BY fd.updated_at DESC;
