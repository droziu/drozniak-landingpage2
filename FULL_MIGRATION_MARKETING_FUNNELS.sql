-- =====================================================
-- PEŁNA MIGRACJA: Moduł Marketing - Lejki Marketingowe
-- =====================================================
-- Data: 2024
-- Opis: Kompletna migracja dla modułu marketingowego z własnymi szablonami węzłów
-- =====================================================

-- =====================================================
-- 1. PODSTAWOWE TABELE MARKETINGOWE
-- =====================================================

-- Tabela marketing_clients (klienci marketingowi)
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

-- Tabela funnel_diagrams (lejki marketingowe)
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

-- Tabela funnel_access (dostęp klientów do lejków)
CREATE TABLE IF NOT EXISTS funnel_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  funnel_id UUID NOT NULL REFERENCES funnel_diagrams(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES marketing_clients(id) ON DELETE CASCADE,
  access_level TEXT DEFAULT 'view' CHECK (access_level IN ('view', 'comment')),
  granted_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(funnel_id, client_id)
);

-- Dodaj kolumnę subtitle do funnel_diagrams jeśli nie istnieje
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

-- Tabela custom_node_templates (własne szablony węzłów)
CREATE TABLE IF NOT EXISTS custom_node_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Źródła Ruchu', 'Typ Strony', 'Działania', 'Cel/Konwersja', 'Narzędzia')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela node_custom_fields (własne pola dla węzłów)
CREATE TABLE IF NOT EXISTS node_custom_fields (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  node_id TEXT NOT NULL,
  funnel_id UUID NOT NULL REFERENCES funnel_diagrams(id) ON DELETE CASCADE,
  field_name TEXT NOT NULL,
  field_type TEXT NOT NULL CHECK (field_type IN ('text', 'date', 'number', 'link')),
  field_value TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(funnel_id, node_id, field_name)
);

-- Upewnij się, że wszystkie kolumny istnieją (dla istniejących tabel)
DO $$ 
BEGIN
  -- Dodaj created_by do custom_node_templates jeśli nie istnieje
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'custom_node_templates')
    AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'custom_node_templates' AND column_name = 'created_by')
  THEN
    ALTER TABLE custom_node_templates 
    ADD COLUMN created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- =====================================================
-- 2. INDEKSY
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_marketing_clients_created_by ON marketing_clients(created_by);
CREATE INDEX IF NOT EXISTS idx_marketing_clients_status ON marketing_clients(status);

CREATE INDEX IF NOT EXISTS idx_funnel_diagrams_created_by ON funnel_diagrams(created_by);
CREATE INDEX IF NOT EXISTS idx_funnel_diagrams_client_id ON funnel_diagrams(client_id);
CREATE INDEX IF NOT EXISTS idx_funnel_diagrams_status ON funnel_diagrams(status);

CREATE INDEX IF NOT EXISTS idx_funnel_access_funnel_id ON funnel_access(funnel_id);
CREATE INDEX IF NOT EXISTS idx_funnel_access_client_id ON funnel_access(client_id);

CREATE INDEX IF NOT EXISTS idx_custom_node_templates_created_by ON custom_node_templates(created_by);
CREATE INDEX IF NOT EXISTS idx_custom_node_templates_category ON custom_node_templates(category);

CREATE INDEX IF NOT EXISTS idx_node_custom_fields_funnel_id ON node_custom_fields(funnel_id);
CREATE INDEX IF NOT EXISTS idx_node_custom_fields_node_id ON node_custom_fields(node_id);
CREATE INDEX IF NOT EXISTS idx_node_custom_fields_funnel_node ON node_custom_fields(funnel_id, node_id);

-- =====================================================
-- 3. FUNKCJE POMOCNICZE
-- =====================================================

-- Funkcja sprawdzająca czy użytkownik jest administratorem
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND email = 'stanislaw@drozniak.com'
  );
END;
$$;

-- Funkcja aktualizacji updated_at (wspólna dla wszystkich tabel)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 4. TRIGGERY
-- =====================================================

DROP TRIGGER IF EXISTS update_marketing_clients_updated_at ON marketing_clients;
CREATE TRIGGER update_marketing_clients_updated_at
  BEFORE UPDATE ON marketing_clients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_funnel_diagrams_updated_at ON funnel_diagrams;
CREATE TRIGGER update_funnel_diagrams_updated_at
  BEFORE UPDATE ON funnel_diagrams
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_custom_node_templates_updated_at ON custom_node_templates;
CREATE TRIGGER update_custom_node_templates_updated_at
  BEFORE UPDATE ON custom_node_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_node_custom_fields_updated_at ON node_custom_fields;
CREATE TRIGGER update_node_custom_fields_updated_at
  BEFORE UPDATE ON node_custom_fields
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 5. RLS POLICIES
-- =====================================================

-- Włącz RLS dla wszystkich tabel
ALTER TABLE marketing_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE funnel_diagrams ENABLE ROW LEVEL SECURITY;
ALTER TABLE funnel_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_node_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE node_custom_fields ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- marketing_clients RLS
-- =====================================================

DROP POLICY IF EXISTS "Admins can do everything with clients" ON marketing_clients;
CREATE POLICY "Admins can do everything with clients"
  ON marketing_clients
  FOR ALL
  USING (is_admin());

DROP POLICY IF EXISTS "Creators can manage their clients" ON marketing_clients;
CREATE POLICY "Creators can manage their clients"
  ON marketing_clients
  FOR ALL
  USING (created_by = auth.uid());

-- =====================================================
-- funnel_diagrams RLS
-- =====================================================

DROP POLICY IF EXISTS "Admins can do everything with funnels" ON funnel_diagrams;
CREATE POLICY "Admins can do everything with funnels"
  ON funnel_diagrams
  FOR ALL
  USING (is_admin());

DROP POLICY IF EXISTS "Creators can manage their own funnels" ON funnel_diagrams;
CREATE POLICY "Creators can manage their own funnels"
  ON funnel_diagrams
  FOR ALL
  USING (created_by = auth.uid());

DROP POLICY IF EXISTS "Clients can view assigned funnels" ON funnel_diagrams;
CREATE POLICY "Clients can view assigned funnels"
  ON funnel_diagrams
  FOR SELECT
  USING (is_admin() OR created_by = auth.uid());

-- =====================================================
-- funnel_access RLS
-- =====================================================

DROP POLICY IF EXISTS "Admins can manage all access" ON funnel_access;
CREATE POLICY "Admins can manage all access"
  ON funnel_access
  FOR ALL
  USING (is_admin());

DROP POLICY IF EXISTS "Funnel creators can manage access" ON funnel_access;
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

DROP POLICY IF EXISTS "Clients can view their access" ON funnel_access;
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
-- custom_node_templates RLS
-- =====================================================

DROP POLICY IF EXISTS "Users can view their own custom node templates" ON custom_node_templates;
CREATE POLICY "Users can view their own custom node templates"
  ON custom_node_templates
  FOR SELECT
  USING (auth.uid() = created_by);

DROP POLICY IF EXISTS "Users can create their own custom node templates" ON custom_node_templates;
CREATE POLICY "Users can create their own custom node templates"
  ON custom_node_templates
  FOR INSERT
  WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "Users can update their own custom node templates" ON custom_node_templates;
CREATE POLICY "Users can update their own custom node templates"
  ON custom_node_templates
  FOR UPDATE
  USING (auth.uid() = created_by);

DROP POLICY IF EXISTS "Users can delete their own custom node templates" ON custom_node_templates;
CREATE POLICY "Users can delete their own custom node templates"
  ON custom_node_templates
  FOR DELETE
  USING (auth.uid() = created_by);

-- =====================================================
-- node_custom_fields RLS
-- =====================================================

DROP POLICY IF EXISTS "Users can view custom fields for their funnels" ON node_custom_fields;
CREATE POLICY "Users can view custom fields for their funnels"
  ON node_custom_fields
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM funnel_diagrams
      WHERE funnel_diagrams.id = node_custom_fields.funnel_id
      AND (funnel_diagrams.created_by = auth.uid() OR is_admin())
    )
  );

DROP POLICY IF EXISTS "Users can create custom fields for their funnels" ON node_custom_fields;
CREATE POLICY "Users can create custom fields for their funnels"
  ON node_custom_fields
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM funnel_diagrams
      WHERE funnel_diagrams.id = node_custom_fields.funnel_id
      AND (funnel_diagrams.created_by = auth.uid() OR is_admin())
    )
  );

DROP POLICY IF EXISTS "Users can update custom fields for their funnels" ON node_custom_fields;
CREATE POLICY "Users can update custom fields for their funnels"
  ON node_custom_fields
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM funnel_diagrams
      WHERE funnel_diagrams.id = node_custom_fields.funnel_id
      AND (funnel_diagrams.created_by = auth.uid() OR is_admin())
    )
  );

DROP POLICY IF EXISTS "Users can delete custom fields for their funnels" ON node_custom_fields;
CREATE POLICY "Users can delete custom fields for their funnels"
  ON node_custom_fields
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM funnel_diagrams
      WHERE funnel_diagrams.id = node_custom_fields.funnel_id
      AND (funnel_diagrams.created_by = auth.uid() OR is_admin())
    )
  );

-- =====================================================
-- 6. KOMENTARZE
-- =====================================================

COMMENT ON TABLE marketing_clients IS 'Klienci marketingowi przypisani do lejków';
COMMENT ON TABLE funnel_diagrams IS 'Lejki marketingowe z danymi diagramu w formacie JSONB';
COMMENT ON COLUMN funnel_diagrams.diagram_data IS 'Dane diagramu React Flow (nodes, edges, viewport) w formacie JSONB';
COMMENT ON COLUMN funnel_diagrams.subtitle IS 'Podtytuł lejka (stan obecny / docelowy / Plan 90 dni / własny tekst)';
COMMENT ON TABLE funnel_access IS 'Przypisanie dostępu klientów do lejków';
COMMENT ON TABLE custom_node_templates IS 'Własne szablony węzłów tworzone przez użytkowników dla szybkiego dostępu w sidebarze';
COMMENT ON COLUMN custom_node_templates.icon IS 'Nazwa ikony Phosphor (np. CreditCard, Phone, MegaphoneSimple)';
COMMENT ON COLUMN custom_node_templates.category IS 'Kategoria: Źródła Ruchu, Typ Strony, Działania, Cel/Konwersja, Narzędzia';
COMMENT ON COLUMN custom_node_templates.color IS 'Kolor w formacie hex (np. #fee715)';
COMMENT ON TABLE node_custom_fields IS 'Własne pola (tekst, data, liczba, link) dla węzłów w lejkach marketingowych';
COMMENT ON COLUMN node_custom_fields.node_id IS 'ID noda z React Flow (przechowywane jako string, np. "node-123-abc")';
COMMENT ON COLUMN node_custom_fields.field_type IS 'Typ pola: text (tekst), date (data), number (liczba), link (link)';
COMMENT ON COLUMN node_custom_fields.field_value IS 'Wartość pola: dla daty w formacie ISO (YYYY-MM-DD), dla liczby jako string, dla tekstu i linku jako string';

-- =====================================================
-- KONIEC MIGRACJI
-- =====================================================
