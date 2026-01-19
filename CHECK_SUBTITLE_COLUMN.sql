-- =====================================================
-- SPRAWDZENIE: Czy kolumna subtitle istnieje w tabeli funnel_diagrams
-- =====================================================
-- Uruchom to zapytanie w Supabase SQL Editor, aby sprawdzić czy kolumna istnieje

SELECT 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'funnel_diagrams' 
AND column_name = 'subtitle';

-- Jeśli zwróci pusty wynik, uruchom migrację: supabase_migration_add_subtitle.sql
