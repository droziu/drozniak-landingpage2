-- Utworzenie oferty ZEF dla klienta: Stanisław Drożniak / MONLINE
-- PDF: Oferta_doradztwo_ZEF_1.pdf (już wrzucony do storage)
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
  auth.uid(),
  'b818ed1c-3339-46cf-be3a-a88cce4f20a2', -- Stanisław Drożniak / MONLINE
  'Oferta_doradztwo_ZEF_1.pdf',
  'oferta-doradztwo-zef'
)
RETURNING 
  id, 
  title, 
  slug, 
  pdf_path, 
  status,
  -- Gotowy link do testowania:
  'https://twoja-domena.pl/o/' || slug as pdf_url;

-- Sprawdź wynik po utworzeniu:
/*
SELECT 
  id,
  title,
  slug,
  pdf_path,
  status,
  marketing_client_id,
  'https://twoja-domena.pl/o/' || slug as pdf_url
FROM proposals
WHERE pdf_path = 'Oferta_doradztwo_ZEF_1.pdf';
*/
