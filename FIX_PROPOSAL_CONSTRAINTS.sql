-- Naprawa constraint dla ofert - pozwól na oferty bez przypisanego klienta
-- Uruchom w Supabase SQL Editor

-- KROK 1: Usuń constraint wymagający client_id lub marketing_client_id
ALTER TABLE proposals
DROP CONSTRAINT IF EXISTS proposals_client_check;

-- KROK 2: Dodaj komentarz wyjaśniający, że klient jest opcjonalny
COMMENT ON COLUMN proposals.client_id IS 'Opcjonalne przypisanie do klienta panelu. NULL = oferta dla potencjalnego klienta (bez konta).';
COMMENT ON COLUMN proposals.marketing_client_id IS 'Opcjonalne przypisanie do klienta marketingowego. NULL = oferta dla potencjalnego klienta (bez konta).';

-- KROK 3: Sprawdź czy wszystko OK
SELECT 
  table_name,
  constraint_name,
  constraint_type
FROM information_schema.table_constraints
WHERE table_name = 'proposals'
AND constraint_name LIKE '%client%';
