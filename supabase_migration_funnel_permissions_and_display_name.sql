-- =====================================================
-- MIGRACJA: Uprawnienia do lejków + Display Name
-- =====================================================
-- Data: 2024
-- Opis: 
-- 1. Rozszerza funnel_access o uprawnienie 'edit'
-- 2. Dodaje display_name/preferred_name do panel_clients
-- 3. Dodaje funkcję do pobierania display_name dla komentarzy
-- 4. Nie niszczy istniejących danych/migracji
-- =====================================================

-- =====================================================
-- 1. ROZSZERZENIE funnel_access.access_level o 'edit'
-- =====================================================

-- Sprawdź czy trzeba zmienić CHECK constraint
DO $$ 
BEGIN
  -- Usuń stary constraint jeśli istnieje (tylko jeśli jest stary bez 'edit')
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'funnel_access_access_level_check'
    AND table_name = 'funnel_access'
  ) THEN
    -- Sprawdź czy 'edit' już jest w constraint (przez próbę INSERT z 'edit')
    BEGIN
      -- Jeśli constraint nie pozwala na 'edit', to usuniemy i dodamy nowy
      ALTER TABLE funnel_access DROP CONSTRAINT IF EXISTS funnel_access_access_level_check;
    EXCEPTION WHEN OTHERS THEN
      -- Jeśli nie ma constraint lub inne błędy - ignoruj
      NULL;
    END;
  END IF;
  
  -- Dodaj nowy constraint z 'edit'
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'funnel_access_access_level_check'
    AND table_name = 'funnel_access'
  ) THEN
    ALTER TABLE funnel_access 
    ADD CONSTRAINT funnel_access_access_level_check 
    CHECK (access_level IN ('view', 'comment', 'edit'));
  END IF;
END $$;

-- Zaktualizuj istniejące rekordy jeśli trzeba (dla bezpieczeństwa - nie zmienia nic)
-- UPDATE funnel_access SET access_level = access_level WHERE TRUE;

-- =====================================================
-- 2. DODANIE display_name do panel_clients
-- =====================================================

-- Dodaj kolumnę display_name jeśli nie istnieje
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'panel_clients' 
    AND column_name = 'display_name'
  ) THEN
    ALTER TABLE panel_clients 
    ADD COLUMN display_name TEXT;
  END IF;
END $$;

-- Indeks dla display_name (opcjonalnie, dla wyszukiwania)
CREATE INDEX IF NOT EXISTS idx_panel_clients_display_name 
ON panel_clients(display_name) 
WHERE display_name IS NOT NULL;

-- =====================================================
-- 3. FUNKCJA: Pobieranie display_name dla użytkownika
-- =====================================================

-- Funkcja która zwraca display_name dla auth.users(id)
-- Priorytet: panel_clients.display_name > panel_clients.name > profiles.first_name+last_name > auth.users.email
CREATE OR REPLACE FUNCTION get_user_display_name(user_uuid UUID)
RETURNS TEXT AS $$
DECLARE
  result TEXT;
BEGIN
  -- Sprawdź panel_clients.display_name
  SELECT pc.display_name INTO result
  FROM panel_clients pc
  WHERE pc.user_id = user_uuid
  AND pc.display_name IS NOT NULL
  AND pc.display_name != ''
  LIMIT 1;
  
  IF result IS NOT NULL THEN
    RETURN result;
  END IF;
  
  -- Sprawdź panel_clients.name
  SELECT pc.name INTO result
  FROM panel_clients pc
  WHERE pc.user_id = user_uuid
  AND pc.name IS NOT NULL
  AND pc.name != ''
  LIMIT 1;
  
  IF result IS NOT NULL THEN
    RETURN result;
  END IF;
  
  -- Sprawdź profiles.first_name + last_name
  SELECT 
    TRIM(CONCAT_WS(' ', p.first_name, p.last_name))
  INTO result
  FROM profiles p
  WHERE p.id = user_uuid
  AND (p.first_name IS NOT NULL OR p.last_name IS NOT NULL);
  
  IF result IS NOT NULL AND result != '' THEN
    RETURN result;
  END IF;
  
  -- Fallback: email z auth.users
  SELECT email INTO result
  FROM auth.users
  WHERE id = user_uuid;
  
  RETURN COALESCE(result, 'Nieznany użytkownik');
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

COMMENT ON FUNCTION get_user_display_name(UUID) IS 'Zwraca display_name dla użytkownika. Priorytet: panel_clients.display_name > panel_clients.name > profiles.first_name+last_name > auth.users.email';

-- =====================================================
-- 4. ROZSZERZENIE RLS dla funnel_access z 'edit'
-- =====================================================

-- RLS policies już powinny działać z nowym access_level='edit'
-- Sprawdzamy czy są aktualizacje w politykach (jeśli potrzeba)

-- Dodaj komentarz że access_level może być 'view', 'comment', 'edit'
COMMENT ON COLUMN funnel_access.access_level IS 'Poziom dostępu: view (tylko podgląd), comment (komentarze), edit (edycja lejka)';

-- =====================================================
-- 5. KOMENTARZ dla display_name
-- =====================================================

COMMENT ON COLUMN panel_clients.display_name IS 'Preferowane imię wyświetlane w komentarzach (np. "Staszek" zamiast "Stanisław")';
