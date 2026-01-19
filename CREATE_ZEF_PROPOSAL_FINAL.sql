-- Utworzenie oferty ZEF - GOTOWE ZAPYTANIE
-- Uruchom w Supabase SQL Editor

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
  '94a312a4-79e2-4b0a-8cb4-6127216c3a6e', -- stanislaw@drozniak.com
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
  marketing_client_id,
  -- Gotowy link do testowania:
  'https://twoja-domena.pl/o/' || slug as pdf_url;

-- Po utworzeniu sprawdź wynik:
/*
SELECT 
  id,
  title,
  slug,
  pdf_path,
  status,
  'https://twoja-domena.pl/o/' || slug as pdf_url
FROM proposals
WHERE pdf_path = 'Oferta_doradztwo_ZEF_1.pdf';
*/
