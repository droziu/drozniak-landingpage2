-- =====================================================
-- MIGRACJA: Spersonalizowany panel klienta - widoki i uprawnienia
-- =====================================================
-- Data: 2024
-- Opis: System tagów/widoków dla klientów: Umowy i dokumenty, Kursy,
--       Marketing (lejki), Dane, Projekty. Admin przypisuje widoki (tagi)
--       do użytkowników. Klient widzi tylko przydzielone sekcje.
--       RLS: klient widzi tylko swoje dane (po client_id / user_id).
-- =====================================================

-- Funkcja updated_at (jeśli nie istnieje z innej migracji)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 1. Tabela: panel_clients
-- Główna encja "klienta w panelu" - 1:1 z auth.users (user_id)
CREATE TABLE IF NOT EXISTS panel_clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  company_name TEXT,
  marketing_client_id UUID REFERENCES marketing_clients(id) ON DELETE SET NULL,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabela: client_view_grants
-- Które widoki (tagi) ma dany klient: documents, courses, marketing, data, projects
CREATE TABLE IF NOT EXISTS client_view_grants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES panel_clients(id) ON DELETE CASCADE,
  view_tag TEXT NOT NULL CHECK (view_tag IN ('documents','courses','marketing','data','projects')),
  granted_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(client_id, view_tag)
);

-- 3. Tabela: client_documents (na przyszłość – oferty, faktury, umowy)
CREATE TABLE IF NOT EXISTS client_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES panel_clients(id) ON DELETE CASCADE,
  doc_type TEXT NOT NULL CHECK (doc_type IN ('offer','invoice','contract','other')),
  name TEXT NOT NULL,
  file_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tabela: client_projects (na przyszłość – np. strona www, status)
CREATE TABLE IF NOT EXISTS client_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES panel_clients(id) ON DELETE CASCADE,
  project_type TEXT NOT NULL DEFAULT 'website' CHECK (project_type IN ('website','other')),
  name TEXT NOT NULL,
  status TEXT DEFAULT 'in_progress' CHECK (status IN ('draft','in_progress','review','completed','on_hold')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indeksy
CREATE INDEX IF NOT EXISTS idx_panel_clients_user_id ON panel_clients(user_id);
CREATE INDEX IF NOT EXISTS idx_panel_clients_marketing_client_id ON panel_clients(marketing_client_id);
CREATE INDEX IF NOT EXISTS idx_client_view_grants_client_id ON client_view_grants(client_id);
CREATE INDEX IF NOT EXISTS idx_client_documents_client_id ON client_documents(client_id);
CREATE INDEX IF NOT EXISTS idx_client_projects_client_id ON client_projects(client_id);

-- Trigger updated_at dla panel_clients i client_projects
DROP TRIGGER IF EXISTS update_panel_clients_updated_at ON panel_clients;
CREATE TRIGGER update_panel_clients_updated_at
  BEFORE UPDATE ON panel_clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_client_projects_updated_at ON client_projects;
CREATE TRIGGER update_client_projects_updated_at
  BEFORE UPDATE ON client_projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- Funkcje pomocnicze (SECURITY DEFINER)
-- =====================================================

-- Zwraca user_id (auth.users) dla danego emaila – tylko dla admina
CREATE OR REPLACE FUNCTION get_user_id_by_email(em TEXT)
RETURNS UUID AS $$
BEGIN
  IF NOT is_admin() THEN
    RETURN NULL;
  END IF;
  RETURN (SELECT id FROM auth.users WHERE email = em LIMIT 1);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Lista panel_clients z email i view_tags – tylko dla admina (do zarządzania w UI)
CREATE OR REPLACE FUNCTION get_panel_clients_for_admin()
RETURNS TABLE (
  id UUID,
  user_id UUID,
  name TEXT,
  email TEXT,
  company_name TEXT,
  marketing_client_id UUID,
  created_at TIMESTAMPTZ,
  view_tags TEXT[]
) AS $$
BEGIN
  IF NOT is_admin() THEN
    RETURN;
  END IF;
  RETURN QUERY
  SELECT
    pc.id,
    pc.user_id,
    pc.name,
    COALESCE(pc.email, au.email::TEXT),
    pc.company_name,
    pc.marketing_client_id,
    pc.created_at,
    (SELECT array_agg(cvg.view_tag ORDER BY cvg.view_tag) FROM client_view_grants cvg WHERE cvg.client_id = pc.id) AS view_tags
  FROM panel_clients pc
  LEFT JOIN auth.users au ON au.id = pc.user_id
  ORDER BY pc.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Zwraca panel_client dla zalogowanego użytkownika (klient) – SECURITY DEFINER omija RLS
CREATE OR REPLACE FUNCTION get_my_panel_client()
RETURNS TABLE (
  id UUID,
  marketing_client_id UUID
) AS $$
BEGIN
  RETURN QUERY
  SELECT pc.id, pc.marketing_client_id
  FROM panel_clients pc
  WHERE pc.user_id = auth.uid()
  LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Zwraca view_tags dla zalogowanego użytkownika (klient) – do nawigacji w panelu
CREATE OR REPLACE FUNCTION get_my_view_grants()
RETURNS TEXT[] AS $$
  SELECT COALESCE(array_agg(cvg.view_tag ORDER BY cvg.view_tag), ARRAY[]::TEXT[])
  FROM client_view_grants cvg
  JOIN panel_clients pc ON pc.id = cvg.client_id
  WHERE pc.user_id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Czy użytkownik ma dostęp do lejka (id) przez panel_clients + funnel_access.
-- SECURITY DEFINER omija RLS przy odczycie funnel_access/panel_clients,
-- dzięki czemu unikamy rekurencji (funnel_access → funnel_diagrams → funnel_access).
CREATE OR REPLACE FUNCTION can_access_funnel_via_panel_client(fid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM funnel_access fa
    JOIN panel_clients pc ON pc.marketing_client_id = fa.client_id AND pc.user_id = auth.uid()
    WHERE fa.funnel_id = fid
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- =====================================================
-- RLS
-- =====================================================

ALTER TABLE panel_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_view_grants ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_projects ENABLE ROW LEVEL SECURITY;

-- --- panel_clients ---
DROP POLICY IF EXISTS "Admins can do everything with panel_clients" ON panel_clients;
DROP POLICY IF EXISTS "Users can view own panel_client" ON panel_clients;

CREATE POLICY "Admins can do everything with panel_clients"
  ON panel_clients FOR ALL
  USING (is_admin());

CREATE POLICY "Users can view own panel_client"
  ON panel_clients FOR SELECT
  USING (user_id = auth.uid());

-- --- client_view_grants ---
DROP POLICY IF EXISTS "Admins can do everything with client_view_grants" ON client_view_grants;
DROP POLICY IF EXISTS "Users can view own grants" ON client_view_grants;

CREATE POLICY "Admins can do everything with client_view_grants"
  ON client_view_grants FOR ALL
  USING (is_admin());

CREATE POLICY "Users can view own grants"
  ON client_view_grants FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM panel_clients pc WHERE pc.id = client_view_grants.client_id AND pc.user_id = auth.uid())
  );

-- --- client_documents ---
DROP POLICY IF EXISTS "Admins can do everything with client_documents" ON client_documents;
DROP POLICY IF EXISTS "Clients can view own documents" ON client_documents;

CREATE POLICY "Admins can do everything with client_documents"
  ON client_documents FOR ALL
  USING (is_admin());

CREATE POLICY "Clients can view own documents"
  ON client_documents FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM panel_clients pc WHERE pc.id = client_documents.client_id AND pc.user_id = auth.uid())
  );

-- --- client_projects ---
DROP POLICY IF EXISTS "Admins can do everything with client_projects" ON client_projects;
DROP POLICY IF EXISTS "Clients can view own projects" ON client_projects;

CREATE POLICY "Admins can do everything with client_projects"
  ON client_projects FOR ALL
  USING (is_admin());

CREATE POLICY "Clients can view own projects"
  ON client_projects FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM panel_clients pc WHERE pc.id = client_projects.client_id AND pc.user_id = auth.uid())
  );

-- --- funnel_diagrams: odczyt dla admina, twórcy oraz klientów z panel_clients+funnel_access (przez funkcję, żeby uniknąć rekurencji RLS) ---
DROP POLICY IF EXISTS "Clients can view assigned funnels" ON funnel_diagrams;

CREATE POLICY "Clients can view assigned funnels"
  ON funnel_diagrams FOR SELECT
  USING (
    is_admin()
    OR created_by = auth.uid()
    OR can_access_funnel_via_panel_client(id)
  );

-- =====================================================
-- Komentarze
-- =====================================================

COMMENT ON TABLE panel_clients IS 'Klienci panelu – 1:1 z auth.users; user_id to id zalogowanego użytkownika';
COMMENT ON TABLE client_view_grants IS 'Przypisane widoki (tagi): documents, courses, marketing, data, projects';
COMMENT ON COLUMN panel_clients.marketing_client_id IS 'Opcjonalne powiązanie z marketing_clients – do widoku lejków (funnel_access)';
COMMENT ON TABLE client_documents IS 'Dokumenty klienta: oferty, faktury, umowy (na przyszłość)';
COMMENT ON TABLE client_projects IS 'Projekty klienta: np. strona www, status (na przyszłość)';
