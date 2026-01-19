-- KROK 1: Znajdź swój user_id (jako admin)
-- Zastąp 'stanislaw@drozniak.com' swoim emailem
SELECT id, email, created_at
FROM auth.users
WHERE email = 'stanislaw@drozniak.com'
LIMIT 1;

-- KROK 2: Po uruchomieniu KROKU 1, skopiuj ID z wyników
-- i użyj go w poniższym zapytaniu (zastąp 'COPIED_USER_ID_HERE' skopiowanym ID)

-- Utwórz ofertę ZEF (bez przypisania do klienta - dla potencjalnego klienta)
/*
INSERT INTO proposals (
  title,
  status,
  created_by,
  marketing_client_id,
  pdf_path,
  slug
)
VALUES (
  'Moduł doradztwa biznesowego oraz doboru narzędzi AI',
  'sent',
  'COPIED_USER_ID_HERE', -- ZASTĄP ID z KROKU 1
  NULL, -- NULL = oferta dla potencjalnego klienta (bez konta)
  'Oferta_doradztwo_ZEF_1.pdf',
  'oferta-doradztwo-zef'
)
RETURNING 
  id, 
  title, 
  slug, 
  pdf_path, 
  status,
  client_id,
  marketing_client_id;
*/
