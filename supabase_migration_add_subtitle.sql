-- =====================================================
-- MIGRACJA: Dodanie kolumny subtitle do funnel_diagrams
-- =====================================================
-- Data: 2024
-- Opis: Dodaje kolumnę subtitle dla podtytułu lejka (stan obecny / docelowy / Plan 90 dni / własny)
-- =====================================================

-- Dodaj kolumnę subtitle jeśli nie istnieje
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'funnel_diagrams' 
    AND column_name = 'subtitle'
  ) THEN
    ALTER TABLE funnel_diagrams 
    ADD COLUMN subtitle TEXT;
  END IF;
END $$;

-- Komentarz
COMMENT ON COLUMN funnel_diagrams.subtitle IS 'Podtytuł lejka (stan obecny / docelowy / Plan 90 dni / własny tekst)';
