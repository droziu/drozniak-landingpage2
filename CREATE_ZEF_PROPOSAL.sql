-- Utworzenie oferty ZEF z PDF
-- Uruchom w Supabase SQL Editor

-- KROK 1: Sprawdź dostępnych klientów marketingowych (musisz mieć przynajmniej jedno: client_id lub marketing_client_id)
SELECT id, name, company_name, status
FROM marketing_clients
WHERE status = 'active'
ORDER BY name
LIMIT 10;

-- KROK 2: Utwórz ofertę z PDF
-- Zastąp 'MARKETING_CLIENT_ID_HERE' ID klienta z powyższego zapytania
-- Lub użyj client_id zamiast marketing_client_id (z tabeli panel_clients)
-- Musisz mieć przynajmniej jedno z tych pól!

INSERT INTO proposals (
  title,
  status,
  created_by,
  marketing_client_id, -- ZASTĄP ID klienta marketingowego (lub użyj client_id zamiast tego)
  pdf_path,
  slug
)
VALUES (
  'Moduł doradztwa biznesowego oraz doboru narzędzi AI',
  'sent', -- lub 'draft'
  auth.uid(),
  'MARKETING_CLIENT_ID_HERE', -- ZASTĄP ID klienta marketingowego z KROKU 1
  'Oferta_doradztwo_ZEF_1.pdf',
  'oferta-doradztwo-zef' -- Slug dla URL: /o/oferta-doradztwo-zef
)
RETURNING id, title, slug, pdf_path, status;

-- KROK 3: Sprawdź czy wszystko OK
-- Uruchom to po KROKU 2:
/*
SELECT 
  id,
  title,
  slug,
  pdf_path,
  status,
  -- Gotowy link:
  'https://twoja-domena.pl/o/' || slug as pdf_url
FROM proposals
WHERE pdf_path = 'Oferta_doradztwo_ZEF_1.pdf';
*/

-- KROK 4 (opcjonalnie): Wygeneruj bezpieczny token
-- Jeśli chcesz dodać token dla bezpiecznego dostępu:
/*
SELECT generate_proposal_link(
  (SELECT id FROM proposals WHERE pdf_path = 'Oferta_doradztwo_ZEF_1.pdf' LIMIT 1),
  auth.uid()
) as link_data;
*/

-- INSTRUKCJA:
-- 1. Uruchom KROK 1, aby zobaczyć dostępnych klientów
-- 2. Skopiuj ID klienta z wyników
-- 3. Uruchom KROK 2, zastępując 'MARKETING_CLIENT_ID_HERE' skopiowanym ID
-- 4. Uruchom KROK 3, aby sprawdzić link
-- 5. (Opcjonalnie) Uruchom KROK 4, aby wygenerować token
-- 6. Przetestuj link: /o/oferta-doradztwo-zef

-- ALTERNATYWA: Jeśli nie masz klienta marketingowego, użyj panel_clients:
/*
INSERT INTO proposals (
  title,
  status,
  created_by,
  client_id, -- Zamiast marketing_client_id
  pdf_path,
  slug
)
VALUES (
  'Moduł doradztwa biznesowego oraz doboru narzędzi AI',
  'sent',
  auth.uid(),
  'PANEL_CLIENT_ID_HERE', -- ID z panel_clients
  'Oferta_doradztwo_ZEF_1.pdf',
  'oferta-doradztwo-zef'
)
RETURNING id, title, slug, pdf_path, status;
*/
