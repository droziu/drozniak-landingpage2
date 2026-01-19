-- =====================================================
-- MIGRACJA: Moduł Marketing - Lejki Marketingowe
-- =====================================================
-- Data: 2024
-- Opis: Tworzy strukturę bazy danych dla modułu lejków marketingowych
--       z pełnym wsparciem RLS i zarządzaniem klientami
-- =====================================================

-- 1. Tabela: marketing_clients
-- Przechowuje informacje o klientach marketingowych
CREATE TABLE IF NOT EXISTS marketing_clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  company_name TEXT,
  phone TEXT,
  notes TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabela: funnel_diagrams
-- Przechowuje diagramy lejków marketingowych
CREATE TABLE IF NOT EXISTS funnel_diagrams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_name TEXT NOT NULL,
  client_id UUID REFERENCES marketing_clients(id) ON DELETE SET NULL,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  diagram_data JSONB NOT NULL DEFAULT '{"nodes": [], "edges": []}'::jsonb,
  thumbnail_url TEXT,
  is_template BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabela: funnel_access
-- Zarządza dostępem klientów do lejków (many-to-many)
CREATE TABLE IF NOT EXISTS funnel_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  funnel_id UUID NOT NULL REFERENCES funnel_diagrams(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES marketing_clients(id) ON DELETE CASCADE,
  access_level TEXT DEFAULT 'view' CHECK (access_level IN ('view', 'comment')),
  granted_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(funnel_id, client_id)
);

-- Indeksy dla wydajności
CREATE INDEX IF NOT EXISTS idx_funnel_diagrams_client_id ON funnel_diagrams(client_id);
CREATE INDEX IF NOT EXISTS idx_funnel_diagrams_created_by ON funnel_diagrams(created_by);
CREATE INDEX IF NOT EXISTS idx_funnel_diagrams_status ON funnel_diagrams(status);
CREATE INDEX IF NOT EXISTS idx_marketing_clients_created_by ON marketing_clients(created_by);
CREATE INDEX IF NOT EXISTS idx_marketing_clients_status ON marketing_clients(status);
CREATE INDEX IF NOT EXISTS idx_funnel_access_funnel_id ON funnel_access(funnel_id);
CREATE INDEX IF NOT EXISTS idx_funnel_access_client_id ON funnel_access(client_id);

-- Funkcja do automatycznej aktualizacji updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggery dla updated_at (usuń jeśli istnieją, potem utwórz)
DROP TRIGGER IF EXISTS update_funnel_diagrams_updated_at ON funnel_diagrams;
CREATE TRIGGER update_funnel_diagrams_updated_at
  BEFORE UPDATE ON funnel_diagrams
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_marketing_clients_updated_at ON marketing_clients;
CREATE TRIGGER update_marketing_clients_updated_at
  BEFORE UPDATE ON marketing_clients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- RLS (Row Level Security) Policies
-- =====================================================

-- Włącz RLS dla wszystkich tabel
ALTER TABLE marketing_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE funnel_diagrams ENABLE ROW LEVEL SECURITY;
ALTER TABLE funnel_access ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- FUNKCJE POMOCNICZE (muszą być przed policy)
-- =====================================================

-- Funkcja do sprawdzania czy użytkownik jest adminem
-- SECURITY DEFINER pozwala na dostęp do auth.users
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.email = 'stanislaw@drozniak.com'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- POLICIES: marketing_clients
-- =====================================================

-- Usuń stare policy jeśli istnieją (dla idempotentności)
DROP POLICY IF EXISTS "Admins can do everything with clients" ON marketing_clients;
DROP POLICY IF EXISTS "Creators can manage their clients" ON marketing_clients;
DROP POLICY IF EXISTS "Clients can view their own data" ON marketing_clients;

-- Admin może wszystko
CREATE POLICY "Admins can do everything with clients"
  ON marketing_clients
  FOR ALL
  USING (is_admin());

-- Twórca może zarządzać swoimi klientami
CREATE POLICY "Creators can manage their clients"
  ON marketing_clients
  FOR ALL
  USING (created_by = auth.uid());

-- =====================================================
-- POLICIES: funnel_diagrams
-- =====================================================

-- Usuń stare policy jeśli istnieją (dla idempotentności)
DROP POLICY IF EXISTS "Admins can do everything with funnels" ON funnel_diagrams;
DROP POLICY IF EXISTS "Creators can manage their own funnels" ON funnel_diagrams;
DROP POLICY IF EXISTS "Clients can view assigned funnels" ON funnel_diagrams;

-- Admin może wszystko
CREATE POLICY "Admins can do everything with funnels"
  ON funnel_diagrams
  FOR ALL
  USING (is_admin());

-- Twórca może wszystko ze swoimi lejkami
CREATE POLICY "Creators can manage their own funnels"
  ON funnel_diagrams
  FOR ALL
  USING (created_by = auth.uid());

-- Uproszczone policy - tylko admin i twórcy mają dostęp
-- (bez odwoływania się do marketing_clients, żeby uniknąć rekurencji)
CREATE POLICY "Clients can view assigned funnels"
  ON funnel_diagrams
  FOR SELECT
  USING (is_admin() OR created_by = auth.uid());

-- =====================================================
-- POLICIES: funnel_access
-- =====================================================

-- Usuń stare policy jeśli istnieją (dla idempotentności)
DROP POLICY IF EXISTS "Admins can manage all access" ON funnel_access;
DROP POLICY IF EXISTS "Funnel creators can manage access" ON funnel_access;
DROP POLICY IF EXISTS "Clients can view their access" ON funnel_access;

-- Admin może wszystko
CREATE POLICY "Admins can manage all access"
  ON funnel_access
  FOR ALL
  USING (is_admin());

-- Twórca lejka może zarządzać dostępem
CREATE POLICY "Funnel creators can manage access"
  ON funnel_access
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM funnel_diagrams
      WHERE funnel_diagrams.id = funnel_access.funnel_id
      AND funnel_diagrams.created_by = auth.uid()
    )
  );

-- Uproszczone policy - twórcy lejków mogą widzieć przypisania
CREATE POLICY "Clients can view their access"
  ON funnel_access
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM funnel_diagrams fd
      WHERE fd.id = funnel_access.funnel_id
      AND fd.created_by = auth.uid()
    )
  );

-- =====================================================
-- FUNKCJE POMOCNICZE (dodatkowe)
-- =====================================================
-- Uwaga: is_admin() jest już zdefiniowana wyżej, przed policy

-- Funkcja do pobierania lejków z dostępem dla klienta
CREATE OR REPLACE FUNCTION get_funnels_for_client(client_uuid UUID)
RETURNS TABLE (
  id UUID,
  project_name TEXT,
  client_id UUID,
  created_by UUID,
  diagram_data JSONB,
  thumbnail_url TEXT,
  status TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  access_level TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    fd.id,
    fd.project_name,
    fd.client_id,
    fd.created_by,
    fd.diagram_data,
    fd.thumbnail_url,
    fd.status,
    fd.created_at,
    fd.updated_at,
    fa.access_level
  FROM funnel_diagrams fd
  INNER JOIN funnel_access fa ON fd.id = fa.funnel_id
  WHERE fa.client_id = client_uuid
  AND fd.status = 'active';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- KOMENTARZE
-- =====================================================

COMMENT ON TABLE marketing_clients IS 'Klienci marketingowi - osoby/firmy dla których tworzymy lejki';
COMMENT ON TABLE funnel_diagrams IS 'Diagramy lejków marketingowych - dane JSONB zawierają nodes i edges z React Flow';
COMMENT ON TABLE funnel_access IS 'Tabela łącząca lejki z klientami - zarządzanie dostępem';
COMMENT ON COLUMN funnel_diagrams.diagram_data IS 'JSONB zawierający pełny stan React Flow: {nodes: [...], edges: [...], viewport: {...}}';
COMMENT ON COLUMN funnel_diagrams.is_template IS 'Czy lejek jest szablonem do kopiowania';
