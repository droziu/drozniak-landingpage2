-- =====================================================
-- MIGRACJA: PDF dla ofert (Proposal PDF System)
-- =====================================================
-- Data: 2024
-- Opis: Dodanie możliwości wgrywania PDF, tracking otwarć/pobierań
--       Wykorzystuje istniejące: proposals, proposal_tracking_events
-- =====================================================

-- =====================================================
-- 1. DODANIE KOLUMN DO proposals
-- =====================================================

-- Kolumna slug dla czytelnego URL (np. "fibra-2026-01")
ALTER TABLE proposals
ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

COMMENT ON COLUMN proposals.slug IS 'Czytelny identyfikator dla URL: /o/fibra-2026-01';

-- Kolumna pdf_path dla ścieżki do pliku w Supabase Storage
ALTER TABLE proposals
ADD COLUMN IF NOT EXISTS pdf_path TEXT;

COMMENT ON COLUMN proposals.pdf_path IS 'Ścieżka do PDF w Supabase Storage (np. proposals/fibra-2026-01.pdf)';

-- Indeks dla szybkiego wyszukiwania po slug
CREATE INDEX IF NOT EXISTS idx_proposals_slug ON proposals(slug) WHERE slug IS NOT NULL;

-- =====================================================
-- 2. FUNKCJA: Generowanie unikalnego slug
-- =====================================================

CREATE OR REPLACE FUNCTION generate_proposal_slug(proposal_title TEXT, proposal_id UUID DEFAULT NULL)
RETURNS TEXT AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INTEGER := 1;
BEGIN
  -- Tworzymy podstawowy slug z tytułu (małe litery, usuwamy znaki specjalne)
  base_slug := lower(proposal_title);
  base_slug := regexp_replace(base_slug, '[^a-z0-9]+', '-', 'g');
  base_slug := regexp_replace(base_slug, '^-|-$', '', 'g');
  base_slug := left(base_slug, 50); -- Ograniczamy długość
  
  -- Jeśli podano ID, dodajemy datę
  IF proposal_id IS NOT NULL THEN
    base_slug := base_slug || '-' || to_char(NOW(), 'YYYY-MM');
  END IF;
  
  final_slug := base_slug;
  
  -- Sprawdzamy czy slug jest unikalny, jeśli nie - dodajemy numer
  WHILE EXISTS (SELECT 1 FROM proposals WHERE slug = final_slug AND (proposal_id IS NULL OR id != proposal_id)) LOOP
    final_slug := base_slug || '-' || counter;
    counter := counter + 1;
  END LOOP;
  
  RETURN final_slug;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION generate_proposal_slug(TEXT, UUID) IS 'Generuje unikalny slug dla oferty na podstawie tytułu';

-- =====================================================
-- 3. FUNKCJA: Tracking wydarzeń PDF
-- =====================================================

CREATE OR REPLACE FUNCTION track_proposal_pdf_event(
  proposal_uuid UUID,
  event_type TEXT,
  access_token TEXT DEFAULT NULL,
  metadata_json JSONB DEFAULT '{}'::jsonb
)
RETURNS UUID AS $$
DECLARE
  event_id UUID;
  link_id UUID;
BEGIN
  -- Jeśli token, sprawdź czy link jest aktywny
  IF access_token IS NOT NULL THEN
    SELECT id INTO link_id
    FROM proposal_access_links
    WHERE proposal_id = proposal_uuid
    AND token = access_token
    AND status = 'active'
    AND (expires_at IS NULL OR expires_at > NOW());
    
    IF link_id IS NULL THEN
      RAISE EXCEPTION 'Nieprawidłowy lub wygasły token';
    END IF;
  END IF;
  
  -- Dodaj tracking event
  INSERT INTO proposal_tracking_events (
    proposal_id,
    access_link_id,
    event_type,
    metadata
  )
  VALUES (
    proposal_uuid,
    link_id,
    event_type,
    metadata_json
  )
  RETURNING id INTO event_id;
  
  -- Aktualizuj last_opened_at w linku (jeśli przez token)
  IF link_id IS NOT NULL AND event_type = 'opened_offer_page' THEN
    UPDATE proposal_access_links
    SET last_opened_at = NOW()
    WHERE id = link_id;
  END IF;
  
  RETURN event_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION track_proposal_pdf_event(UUID, TEXT, TEXT, JSONB) IS 'Rejestruje wydarzenie PDF (opened_offer_page, pdf_loaded, download_clicked). Działa z tokenem lub bez.';

-- =====================================================
-- 4. FUNKCJA: Pobierz ofertę przez slug i token
-- =====================================================

CREATE OR REPLACE FUNCTION get_proposal_by_slug_and_token(
  proposal_slug TEXT,
  access_token TEXT DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  slug TEXT,
  pdf_path TEXT,
  status TEXT,
  valid_until TIMESTAMPTZ,
  token_valid BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.title,
    p.slug,
    p.pdf_path,
    p.status,
    p.valid_until,
    CASE 
      WHEN access_token IS NULL THEN true -- Bez tokena (publiczny dostęp przez slug)
      WHEN EXISTS (
        SELECT 1 FROM proposal_access_links pal
        WHERE pal.proposal_id = p.id
        AND pal.token = access_token
        AND pal.status = 'active'
        AND (pal.expires_at IS NULL OR pal.expires_at > NOW())
      ) THEN true
      ELSE false
    END AS token_valid
  FROM proposals p
  WHERE p.slug = proposal_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION get_proposal_by_slug_and_token(TEXT, TEXT) IS 'Pobiera ofertę po slug i sprawdza token (jeśli podano).';

-- =====================================================
-- 5. RLS: Sprawdzenie czy użytkownik może zobaczyć PDF
-- =====================================================

-- Użyjmy istniejących RLS policies dla proposals
-- Dodamy tylko funkcję pomocniczą dla publicznego dostępu przez slug

-- =====================================================
-- 6. STORAGE BUCKET: Konfiguracja (do wykonania w Supabase Dashboard)
-- =====================================================

-- W Supabase Dashboard > Storage:
-- 1. Utwórz bucket "proposals"
-- 2. Ustaw jako publiczny (jeśli chcesz bezpośredni dostęp) lub private (z podpisanymi URL)
-- 3. RLS Policy (dla private bucket):
--    - SELECT: Allow public access (anon)
--    - INSERT: Allow authenticated users only (is_admin())
--    - UPDATE: Allow authenticated users only (is_admin())
--    - DELETE: Allow authenticated users only (is_admin())

-- =====================================================
-- 7. TRIGGER: Automatyczne generowanie slug przy utworzeniu oferty
-- =====================================================

CREATE OR REPLACE FUNCTION auto_generate_proposal_slug()
RETURNS TRIGGER AS $$
BEGIN
  -- Jeśli slug nie jest ustawiony, wygeneruj go
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := generate_proposal_slug(NEW.title, NEW.id);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION auto_generate_proposal_slug() IS 'Automatycznie generuje slug dla nowej oferty';

DROP TRIGGER IF EXISTS trigger_auto_generate_proposal_slug ON proposals;
CREATE TRIGGER trigger_auto_generate_proposal_slug
  BEFORE INSERT OR UPDATE ON proposals
  FOR EACH ROW
  WHEN (NEW.slug IS NULL OR NEW.slug = '')
  EXECUTE FUNCTION auto_generate_proposal_slug();

-- =====================================================
-- KONIEC MIGRACJI
-- =====================================================

-- Test: Sprawdź czy wszystko działa
-- SELECT generate_proposal_slug('Oferta współpracy – uporządkowanie marketingu Grupy Fibra');
