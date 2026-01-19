-- Przypisanie PDF do oferty - Oferta doradztwo ZEF
-- Uruchom w Supabase SQL Editor

-- KROK 1: Znajdź ID oferty (jeśli już istnieje)
-- Zastąp tytuł oferty lub ID:
SELECT id, title, slug, pdf_path, status
FROM proposals
WHERE title ILIKE '%ZEF%' OR title ILIKE '%doradztwo%'
ORDER BY created_at DESC;

-- KROK 2A: Jeśli oferta już istnieje, zaktualizuj pdf_path i slug
-- Zastąp 'PROPOSAL_ID_HERE' ID z powyższego zapytania:
/*
UPDATE proposals
SET 
  pdf_path = 'Oferta_doradztwo_ZEF_1.pdf',
  slug = COALESCE(slug, generate_proposal_slug('Oferta doradztwo ZEF', id))
WHERE id = 'PROPOSAL_ID_HERE';
*/

-- KROK 2B: Jeśli oferty nie ma, utwórz ją z PDF
-- UWAGA: Zastąp 'CLIENT_ID' lub 'MARKETING_CLIENT_ID' ID klienta
-- Musisz mieć przynajmniej jedno z tych pól (zgodnie z constraint)
/*
INSERT INTO proposals (
  title,
  status,
  created_by,
  marketing_client_id, -- lub client_id
  pdf_path,
  slug
)
VALUES (
  'Moduł doradztwa biznesowego oraz doboru narzędzi AI',
  'sent', -- lub 'draft'
  auth.uid(),
  'MARKETING_CLIENT_ID_HERE', -- Zastąp ID klienta marketingowego
  'Oferta_doradztwo_ZEF_1.pdf',
  'oferta-doradztwo-zef'
)
RETURNING id, slug, pdf_path;
*/

-- KROK 3: Sprawdź czy wszystko jest OK
-- Uruchom to po KROKU 2A lub 2B:
/*
SELECT 
  id,
  title,
  slug,
  pdf_path,
  status,
  -- Sprawdź URL:
  'https://lkygnllsgashwloxgmax.supabase.co/o/' || slug || '?token=XYZ' as pdf_url
FROM proposals
WHERE pdf_path = 'Oferta_doradztwo_ZEF_1.pdf';
*/

-- KROK 4: Wygeneruj bezpieczny token (opcjonalnie)
-- Jeśli chcesz dodać token dla bezpiecznego dostępu:
/*
SELECT generate_proposal_link(
  'PROPOSAL_ID_HERE', -- Zastąp ID oferty
  auth.uid()
) as link_data;
*/

-- KROK 5: Gotowy link do testowania
-- Po wykonaniu wszystkich kroków, link będzie wyglądał tak:
-- https://twoja-domena.pl/o/oferta-doradztwo-zef?token=XYZ
-- lub
-- https://twoja-domena.pl/o/oferta-doradztwo-zef (jeśli publiczny dostęp)

-- INSTRUKCJA:
-- 1. Uruchom KROK 1, aby znaleźć ID oferty (jeśli istnieje)
-- 2. Jeśli oferta istnieje: uruchom KROK 2A (odkomentuj i zastąp ID)
-- 3. Jeśli oferty nie ma: uruchom KROK 2B (odkomentuj i zastąp CLIENT_ID)
-- 4. Uruchom KROK 3, aby sprawdzić czy wszystko OK
-- 5. (Opcjonalnie) Uruchom KROK 4, aby wygenerować token
-- 6. Przetestuj link w przeglądarce
