-- Utworzenie oferty ZEF - POPRAWIONA WERSJA
-- Uruchom w Supabase SQL Editor

-- KROK 1: Znajdź swój user_id (jako admin)
-- Zastąp 'stanislaw@drozniak.com' swoim emailem
SELECT id, email
FROM auth.users
WHERE email = 'stanislaw@drozniak.com'
LIMIT 1;

-- KROK 2: Utwórz ofertę (bez przypisania do klienta - dla potencjalnego klienta)
-- Zastąp 'YOUR_USER_ID_HERE' ID z KROKU 1
INSERT INTO proposals (
  title,
  status,
  created_by,
  marketing_client_id, -- Opcjonalne - możesz ustawić NULL
  pdf_path,
  slug
)
VALUES (
  'Moduł doradztwa biznesowego oraz doboru narzędzi AI',
  'sent',
  'YOUR_USER_ID_HERE', -- ZASTĄP ID użytkownika z KROKU 1
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

-- ALTERNATYWA: Jeśli chcesz przypisać do klienta (opcjonalnie):
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
  'YOUR_USER_ID_HERE',
  'b818ed1c-3339-46cf-be3a-a88cce4f20a2', -- Stanisław Drożniak / MONLINE (opcjonalnie)
  'Oferta_doradztwo_ZEF_1.pdf',
  'oferta-doradztwo-zef'
)
RETURNING id, title, slug, pdf_path, status;
*/

-- INSTRUKCJA:
-- 1. Najpierw uruchom FIX_PROPOSAL_CONSTRAINTS.sql (usuwa wymaganie client_id)
-- 2. Uruchom KROK 1, aby znaleźć swój user_id
-- 3. Uruchom KROK 2, zastępując 'YOUR_USER_ID_HERE' swoim ID
-- 4. Przetestuj link: /o/oferta-doradztwo-zef
