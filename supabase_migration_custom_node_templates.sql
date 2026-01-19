-- =====================================================
-- MIGRACJA: Tabela custom_node_templates - własne szablony węzłów
-- =====================================================
-- Data: 2024
-- Opis: Pozwala użytkownikom zapisywać własne, często używane szablony węzłów
-- =====================================================

-- Utwórz tabelę custom_node_templates
CREATE TABLE IF NOT EXISTS custom_node_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  icon TEXT NOT NULL, -- Nazwa ikony Phosphor (np. 'CreditCard', 'Phone')
  color TEXT NOT NULL, -- Hex color (np. '#fee715')
  category TEXT NOT NULL, -- Kategoria: 'Źródła Ruchu', 'Typ Strony', 'Działania', 'Narzędzia'
  notes TEXT, -- Opcjonalne notatki
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Utwórz indeksy
CREATE INDEX IF NOT EXISTS idx_custom_node_templates_created_by ON custom_node_templates(created_by);
CREATE INDEX IF NOT EXISTS idx_custom_node_templates_category ON custom_node_templates(category);

-- Utwórz trigger do automatycznej aktualizacji updated_at
CREATE OR REPLACE FUNCTION update_custom_node_templates_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_custom_node_templates_updated_at ON custom_node_templates;
CREATE TRIGGER update_custom_node_templates_updated_at
  BEFORE UPDATE ON custom_node_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_custom_node_templates_updated_at();

-- RLS Policies
ALTER TABLE custom_node_templates ENABLE ROW LEVEL SECURITY;

-- Polityka: Użytkownicy mogą widzieć tylko swoje własne szablony
DROP POLICY IF EXISTS "Users can view their own custom node templates" ON custom_node_templates;
CREATE POLICY "Users can view their own custom node templates"
  ON custom_node_templates
  FOR SELECT
  USING (auth.uid() = created_by);

-- Polityka: Użytkownicy mogą tworzyć swoje własne szablony
DROP POLICY IF EXISTS "Users can create their own custom node templates" ON custom_node_templates;
CREATE POLICY "Users can create their own custom node templates"
  ON custom_node_templates
  FOR INSERT
  WITH CHECK (auth.uid() = created_by);

-- Polityka: Użytkownicy mogą aktualizować swoje własne szablony
DROP POLICY IF EXISTS "Users can update their own custom node templates" ON custom_node_templates;
CREATE POLICY "Users can update their own custom node templates"
  ON custom_node_templates
  FOR UPDATE
  USING (auth.uid() = created_by);

-- Polityka: Użytkownicy mogą usuwać swoje własne szablony
DROP POLICY IF EXISTS "Users can delete their own custom node templates" ON custom_node_templates;
CREATE POLICY "Users can delete their own custom node templates"
  ON custom_node_templates
  FOR DELETE
  USING (auth.uid() = created_by);

-- Komentarz
COMMENT ON TABLE custom_node_templates IS 'Własne szablony węzłów tworzone przez użytkowników dla szybkiego dostępu w sidebarze';
COMMENT ON COLUMN custom_node_templates.icon IS 'Nazwa ikony Phosphor (np. CreditCard, Phone, MegaphoneSimple)';
COMMENT ON COLUMN custom_node_templates.category IS 'Kategoria: Źródła Ruchu, Typ Strony, Działania, Narzędzia';
COMMENT ON COLUMN custom_node_templates.color IS 'Kolor w formacie hex (np. #fee715)';
