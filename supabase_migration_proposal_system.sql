-- =====================================================
-- MIGRACJA: Moduł "Oferty" (Proposal System)
-- =====================================================
-- Data: 2024
-- Opis: System ofert z wersjami, trackingiem i akceptacją online
--       Wykorzystuje istniejące: panel_clients, auth.users, is_admin()
--       Nowe tabele: proposals, proposal_versions, proposal_access_links,
--                    proposal_acceptances, proposal_tracking_events
-- =====================================================

-- Funkcja updated_at (jeśli nie istnieje z innej migracji)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 1. TABELA: proposals (Oferty)
-- =====================================================

CREATE TABLE IF NOT EXISTS proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES panel_clients(id) ON DELETE SET NULL,
  marketing_client_id UUID REFERENCES marketing_clients(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'viewed', 'accepted', 'expired', 'archived')),
  valid_until TIMESTAMPTZ,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  -- Co najmniej jedno przypisanie: client_id lub marketing_client_id
  CONSTRAINT proposals_client_check CHECK (
    client_id IS NOT NULL OR marketing_client_id IS NOT NULL
  )
);

COMMENT ON TABLE proposals IS 'Oferty - główna tabela. Przypisane do panel_clients lub marketing_clients.';
COMMENT ON COLUMN proposals.status IS 'draft=nie wysłana, sent=wysłana, viewed=otwarta, accepted=zaakceptowana, expired=wygasła, archived=zarchiwizowana';

-- =====================================================
-- 2. TABELA: proposal_versions (Wersje oferty)
-- =====================================================

CREATE TABLE IF NOT EXISTS proposal_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  content JSONB NOT NULL DEFAULT '{"sections": []}'::jsonb,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(proposal_id, version_number)
);

COMMENT ON TABLE proposal_versions IS 'Wersje oferty - historia zmian. content to JSONB z sekcjami oferty (renderowalny).';
COMMENT ON COLUMN proposal_versions.content IS 'JSONB struktura: {"sections": [{"title": "...", "content": "...", "type": "text|list|pricing"}]}';

-- =====================================================
-- 3. TABELA: proposal_access_links (Linki publiczne)
-- =====================================================

CREATE TABLE IF NOT EXISTS proposal_access_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL DEFAULT gen_random_uuid()::TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'revoked')),
  expires_at TIMESTAMPTZ,
  last_opened_at TIMESTAMPTZ,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(proposal_id) -- Jeden aktywny link na ofertę (można zmienić, ale nie wiele równocześnie)
);

COMMENT ON TABLE proposal_access_links IS 'Publiczne linki dostępu do ofert. Token w URL: /p/:token';
COMMENT ON COLUMN proposal_access_links.token IS 'Random UUID/token - niezgadywalny. Używany w URL: /p/:token';

-- =====================================================
-- 4. TABELA: proposal_acceptances (Akceptacje)
-- =====================================================

CREATE TABLE IF NOT EXISTS proposal_acceptances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  accepted_version_id UUID NOT NULL REFERENCES proposal_versions(id) ON DELETE RESTRICT,
  accepted_version_content JSONB NOT NULL, -- Zamrożona treść (snapshot)
  accepted_at TIMESTAMPTZ DEFAULT NOW(),
  accepted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- Jeśli z konta klienta
  accepted_by_email TEXT, -- Jeśli bez konta (public link)
  ip_address TEXT,
  user_agent TEXT,
  comment TEXT, -- Opcjonalny komentarz od klienta
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(proposal_id) -- Jedna akceptacja na ofertę
);

COMMENT ON TABLE proposal_acceptances IS 'Akceptacje ofert - snapshot wersji + metadane. accepted_version_content to zamrożona treść (nie zmienia się nawet jeśli oferta jest edytowana).';
COMMENT ON COLUMN proposal_acceptances.accepted_version_content IS 'Zamrożona treść wersji w momencie akceptacji (snapshot)';

-- =====================================================
-- 5. TABELA: proposal_tracking_events (Eventy trackingowe)
-- =====================================================

CREATE TABLE IF NOT EXISTS proposal_tracking_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  access_link_id UUID REFERENCES proposal_access_links(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('view', 'accept', 'click', 'scroll')),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE proposal_tracking_events IS 'Eventy trackingowe: view, accept, click, scroll. metadata: {ua, referer, section_id, etc.}';
COMMENT ON COLUMN proposal_tracking_events.metadata IS 'JSONB: {"user_agent": "...", "referer": "...", "section_id": "...", "click_target": "..."}';

-- =====================================================
-- INDEKSY dla wydajności
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_proposals_client_id ON proposals(client_id) WHERE client_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_proposals_marketing_client_id ON proposals(marketing_client_id) WHERE marketing_client_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_proposals_status ON proposals(status);
CREATE INDEX IF NOT EXISTS idx_proposals_created_by ON proposals(created_by);
CREATE INDEX IF NOT EXISTS idx_proposals_valid_until ON proposals(valid_until) WHERE valid_until IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_proposal_versions_proposal_id ON proposal_versions(proposal_id);
CREATE INDEX IF NOT EXISTS idx_proposal_versions_version_number ON proposal_versions(proposal_id, version_number DESC);

CREATE INDEX IF NOT EXISTS idx_proposal_access_links_proposal_id ON proposal_access_links(proposal_id);
CREATE INDEX IF NOT EXISTS idx_proposal_access_links_token ON proposal_access_links(token) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_proposal_access_links_expires_at ON proposal_access_links(expires_at) WHERE expires_at IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_proposal_acceptances_proposal_id ON proposal_acceptances(proposal_id);
CREATE INDEX IF NOT EXISTS idx_proposal_acceptances_accepted_by ON proposal_acceptances(accepted_by) WHERE accepted_by IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_proposal_acceptances_accepted_at ON proposal_acceptances(accepted_at DESC);

CREATE INDEX IF NOT EXISTS idx_proposal_tracking_events_proposal_id ON proposal_tracking_events(proposal_id);
CREATE INDEX IF NOT EXISTS idx_proposal_tracking_events_access_link_id ON proposal_tracking_events(access_link_id) WHERE access_link_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_proposal_tracking_events_event_type ON proposal_tracking_events(event_type);
CREATE INDEX IF NOT EXISTS idx_proposal_tracking_events_created_at ON proposal_tracking_events(created_at DESC);

-- =====================================================
-- TRIGGERY dla updated_at
-- =====================================================

DROP TRIGGER IF EXISTS update_proposals_updated_at ON proposals;
CREATE TRIGGER update_proposals_updated_at
  BEFORE UPDATE ON proposals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- FUNKCJE POMOCNICZE
-- =====================================================

-- Funkcja do sprawdzania czy użytkownik jest adminem
-- Używamy istniejącej funkcji is_admin() z innych migracji
-- CREATE OR REPLACE jest idempotentne, więc nie trzeba sprawdzać IF NOT EXISTS
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $function$
BEGIN
  -- Prosta implementacja - sprawdza email (zgodnie z marketing_funnels migration)
  RETURN EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.email = 'stanislaw@drozniak.com'
  );
END;
$function$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Funkcja: Generuj link do oferty (lub zwróć istniejący)
CREATE OR REPLACE FUNCTION generate_proposal_link(proposal_uuid UUID, user_uuid UUID)
RETURNS TABLE (
  token TEXT,
  link_id UUID,
  status TEXT
) AS $$
DECLARE
  existing_link_id UUID;
  new_token TEXT;
BEGIN
  -- Sprawdź czy link już istnieje i jest aktywny
  SELECT id, token INTO existing_link_id, new_token
  FROM proposal_access_links
  WHERE proposal_id = proposal_uuid
  AND status = 'active'
  LIMIT 1;

  IF existing_link_id IS NOT NULL THEN
    -- Zwróć istniejący link
    RETURN QUERY
    SELECT new_token, existing_link_id, 'active';
    RETURN;
  END IF;

  -- Utwórz nowy link
  new_token := gen_random_uuid()::TEXT;
  INSERT INTO proposal_access_links (proposal_id, token, created_by)
  VALUES (proposal_uuid, new_token, user_uuid)
  RETURNING id, token INTO existing_link_id, new_token;

  -- Aktualizuj status oferty na 'sent'
  UPDATE proposals
  SET status = 'sent'
  WHERE id = proposal_uuid
  AND status = 'draft';

  RETURN QUERY
  SELECT new_token, existing_link_id, 'active';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION generate_proposal_link(UUID, UUID) IS 'Generuje lub zwraca istniejący publiczny link do oferty. Aktualizuje status na "sent".';

-- Funkcja: Akceptuj ofertę (public link lub authenticated)
CREATE OR REPLACE FUNCTION accept_proposal(
  proposal_uuid UUID,
  access_token TEXT DEFAULT NULL,
  user_uuid UUID DEFAULT NULL,
  user_email TEXT DEFAULT NULL,
  client_comment TEXT DEFAULT NULL,
  client_ip TEXT DEFAULT NULL,
  client_ua TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  current_version_id UUID;
  current_version_content JSONB;
  acceptance_id UUID;
  link_id UUID;
BEGIN
  -- Pobierz aktualną wersję oferty
  SELECT id, content INTO current_version_id, current_version_content
  FROM proposal_versions
  WHERE proposal_id = proposal_uuid
  ORDER BY version_number DESC
  LIMIT 1;

  IF current_version_id IS NULL THEN
    RAISE EXCEPTION 'Brak wersji oferty';
  END IF;

  -- Jeśli token, sprawdź czy link jest aktywny
  IF access_token IS NOT NULL THEN
    SELECT id INTO link_id
    FROM proposal_access_links
    WHERE proposal_id = proposal_uuid
    AND token = access_token
    AND status = 'active'
    AND (expires_at IS NULL OR expires_at > NOW());
  END IF;

  IF access_token IS NOT NULL AND link_id IS NULL THEN
    RAISE EXCEPTION 'Nieprawidłowy lub wygasły token';
  END IF;

  -- Sprawdź czy już zaakceptowana
  IF EXISTS (SELECT 1 FROM proposal_acceptances WHERE proposal_id = proposal_uuid) THEN
    RAISE EXCEPTION 'Oferta już została zaakceptowana';
  END IF;

  -- Utwórz akceptację
  INSERT INTO proposal_acceptances (
    proposal_id,
    accepted_version_id,
    accepted_version_content,
    accepted_by,
    accepted_by_email,
    comment,
    ip_address,
    user_agent
  )
  VALUES (
    proposal_uuid,
    current_version_id,
    current_version_content,
    user_uuid,
    user_email,
    client_comment,
    client_ip,
    client_ua
  )
  RETURNING id INTO acceptance_id;

  -- Aktualizuj status oferty na 'accepted'
  UPDATE proposals
  SET status = 'accepted'
  WHERE id = proposal_uuid;

  -- Zaktualizuj last_opened_at w linku (jeśli przez token)
  IF link_id IS NOT NULL THEN
    UPDATE proposal_access_links
    SET last_opened_at = NOW()
    WHERE id = link_id;
  END IF;

  -- Dodaj tracking event 'accept'
  INSERT INTO proposal_tracking_events (proposal_id, access_link_id, event_type, metadata)
  VALUES (
    proposal_uuid,
    link_id,
    'accept',
    jsonb_build_object(
      'ip', client_ip,
      'user_agent', client_ua,
      'comment', client_comment
    )
  );

  RETURN acceptance_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION accept_proposal(UUID, TEXT, UUID, TEXT, TEXT, TEXT, TEXT) IS 'Akceptuje ofertę (przez token lub authenticated user). Tworzy snapshot wersji w proposal_acceptances.';

-- Funkcja: Automatyczne wygasanie ofert (wywoływana przez cron lub trigger)
CREATE OR REPLACE FUNCTION expire_proposals()
RETURNS INTEGER AS $$
DECLARE
  expired_count INTEGER;
BEGIN
  UPDATE proposals
  SET status = 'expired'
  WHERE status IN ('draft', 'sent', 'viewed')
  AND valid_until IS NOT NULL
  AND valid_until < NOW();

  GET DIAGNOSTICS expired_count = ROW_COUNT;
  RETURN expired_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION expire_proposals() IS 'Automatycznie oznacza wygasłe oferty jako expired. Do wywołania przez cron.';

-- Funkcja: Tracking event 'view' (dla anon/public)
CREATE OR REPLACE FUNCTION track_proposal_view(proposal_uuid UUID, access_token TEXT, metadata_json JSONB DEFAULT '{}'::jsonb)
RETURNS UUID AS $function$
DECLARE
  link_id UUID;
  event_id UUID;
BEGIN
  -- Sprawdź czy link jest aktywny
  SELECT id INTO link_id
  FROM proposal_access_links
  WHERE proposal_id = proposal_uuid
  AND token = access_token
  AND status = 'active'
  AND (expires_at IS NULL OR expires_at > NOW());

  IF link_id IS NULL THEN
    RAISE EXCEPTION 'Nieprawidłowy lub wygasły token';
  END IF;

  -- Utwórz tracking event
  INSERT INTO proposal_tracking_events (proposal_id, access_link_id, event_type, metadata)
  VALUES (proposal_uuid, link_id, 'view', metadata_json)
  RETURNING id INTO event_id;

  -- Aktualizuj last_opened_at w linku
  UPDATE proposal_access_links
  SET last_opened_at = NOW()
  WHERE id = link_id;

  -- Aktualizuj status oferty na 'viewed' (jeśli jest 'sent')
  UPDATE proposals
  SET status = 'viewed'
  WHERE id = proposal_uuid
  AND status = 'sent';

  RETURN event_id;
END;
$function$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION track_proposal_view(UUID, TEXT, JSONB) IS 'Rejestruje event ''view'' dla oferty (public/anonymous). Sprawdza token, aktualizuje last_opened_at i status.';

-- =====================================================
-- RLS (Row Level Security)
-- =====================================================

ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposal_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposal_access_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposal_acceptances ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposal_tracking_events ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- RLS POLICIES: proposals
-- =====================================================

-- Admin: pełny dostęp
DROP POLICY IF EXISTS "Admins can manage all proposals" ON proposals;
CREATE POLICY "Admins can manage all proposals"
  ON proposals
  FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- Twórcy: mogą zarządzać swoimi ofertami
DROP POLICY IF EXISTS "Creators can manage their proposals" ON proposals;
CREATE POLICY "Creators can manage their proposals"
  ON proposals
  FOR ALL
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

-- Klienci: widzą tylko swoje przypisane oferty (przez client_id lub marketing_client_id)
DROP POLICY IF EXISTS "Clients can view their proposals" ON proposals;
CREATE POLICY "Clients can view their proposals"
  ON proposals
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM panel_clients pc
      WHERE pc.user_id = auth.uid()
      AND (
        pc.id = proposals.client_id
        OR (pc.marketing_client_id IS NOT NULL AND pc.marketing_client_id = proposals.marketing_client_id)
      )
    )
  );

-- Public (anon): NIE MA DOSTĘPU bezpośrednio (tylko przez token/link)
-- Anon nie może SELECT z proposals bez tokenu

-- =====================================================
-- RLS POLICIES: proposal_versions
-- =====================================================

-- Admin: pełny dostęp
DROP POLICY IF EXISTS "Admins can manage all versions" ON proposal_versions;
CREATE POLICY "Admins can manage all versions"
  ON proposal_versions
  FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- Dostęp do wersji = dostęp do oferty (przez proposal_id)
DROP POLICY IF EXISTS "Users can view versions of accessible proposals" ON proposal_versions;
CREATE POLICY "Users can view versions of accessible proposals"
  ON proposal_versions
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM proposals p
      WHERE p.id = proposal_versions.proposal_id
      AND (
        p.created_by = auth.uid()
        OR is_admin()
        OR EXISTS (
          SELECT 1 FROM panel_clients pc
          WHERE pc.id = p.client_id
          AND pc.user_id = auth.uid()
        )
      )
    )
  );

DROP POLICY IF EXISTS "Creators can create versions" ON proposal_versions;
CREATE POLICY "Creators can create versions"
  ON proposal_versions
  FOR INSERT
  WITH CHECK (
    created_by = auth.uid()
    AND EXISTS (
      SELECT 1 FROM proposals p
      WHERE p.id = proposal_versions.proposal_id
      AND (p.created_by = auth.uid() OR is_admin())
    )
  );

-- =====================================================
-- RLS POLICIES: proposal_access_links
-- =====================================================

-- Admin: pełny dostęp
DROP POLICY IF EXISTS "Admins can manage all links" ON proposal_access_links;
CREATE POLICY "Admins can manage all links"
  ON proposal_access_links
  FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- Twórcy: mogą zarządzać linkami swoich ofert
DROP POLICY IF EXISTS "Creators can manage links of their proposals" ON proposal_access_links;
CREATE POLICY "Creators can manage links of their proposals"
  ON proposal_access_links
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM proposals p
      WHERE p.id = proposal_access_links.proposal_id
      AND p.created_by = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM proposals p
      WHERE p.id = proposal_access_links.proposal_id
      AND p.created_by = auth.uid()
    )
  );

-- Public (anon): może SELECT tylko jeśli token jest aktywny (dla weryfikacji w API)
-- Używamy SECURITY DEFINER w funkcjach zamiast bezpośredniego SELECT przez anon

-- =====================================================
-- RLS POLICIES: proposal_acceptances
-- =====================================================

-- Admin: pełny dostęp
DROP POLICY IF EXISTS "Admins can view all acceptances" ON proposal_acceptances;
CREATE POLICY "Admins can view all acceptances"
  ON proposal_acceptances
  FOR SELECT
  USING (is_admin());

-- Klienci: widzą tylko akceptacje swoich ofert
DROP POLICY IF EXISTS "Clients can view acceptances of their proposals" ON proposal_acceptances;
CREATE POLICY "Clients can view acceptances of their proposals"
  ON proposal_acceptances
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM proposals p
      JOIN panel_clients pc ON pc.id = p.client_id
      WHERE p.id = proposal_acceptances.proposal_id
      AND pc.user_id = auth.uid()
    )
  );

-- Twórcy: widzą akceptacje swoich ofert
DROP POLICY IF EXISTS "Creators can view acceptances of their proposals" ON proposal_acceptances;
CREATE POLICY "Creators can view acceptances of their proposals"
  ON proposal_acceptances
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM proposals p
      WHERE p.id = proposal_acceptances.proposal_id
      AND p.created_by = auth.uid()
    )
  );

-- INSERT przez funkcję accept_proposal (SECURITY DEFINER) - nie przez policy

-- =====================================================
-- RLS POLICIES: proposal_tracking_events
-- =====================================================

-- Admin: pełny dostęp
DROP POLICY IF EXISTS "Admins can view all tracking events" ON proposal_tracking_events;
CREATE POLICY "Admins can view all tracking events"
  ON proposal_tracking_events
  FOR SELECT
  USING (is_admin());

-- Twórcy: widzą eventy swoich ofert
DROP POLICY IF EXISTS "Creators can view tracking of their proposals" ON proposal_tracking_events;
CREATE POLICY "Creators can view tracking of their proposals"
  ON proposal_tracking_events
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM proposals p
      WHERE p.id = proposal_tracking_events.proposal_id
      AND p.created_by = auth.uid()
    )
  );

-- Public (anon): może INSERT eventów 'view' tylko dla aktywnych linków (przez funkcję lub edge function)
-- Nie używamy bezpośredniego INSERT przez policy - bezpieczniejsze przez edge function lub SECURITY DEFINER

-- =====================================================
-- KOŃCOWE KOMENTARZE
-- =====================================================

COMMENT ON TABLE proposals IS 'Moduł ofert: główna tabela. Status: draft→sent→viewed→accepted/expired/archived';
COMMENT ON TABLE proposal_versions IS 'Historia wersji ofert. content (JSONB) zawiera sekcje renderowalne.';
COMMENT ON TABLE proposal_access_links IS 'Publiczne linki dostępu. Token w URL: /p/:token';
COMMENT ON TABLE proposal_acceptances IS 'Akceptacje ofert z snapshotem wersji (zamrożona treść).';
COMMENT ON TABLE proposal_tracking_events IS 'Eventy trackingowe: view, accept, click, scroll.';
