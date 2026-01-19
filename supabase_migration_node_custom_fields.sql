-- =====================================================
-- MIGRACJA: Customowe pola dla węzłów w lejkach marketingowych
-- =====================================================
-- Data: 2024
-- Opis: Dodaje możliwość tworzenia własnych pól (tekst, data, liczba, link) dla węzłów
-- =====================================================

-- Tabela node_custom_fields (własne pola dla węzłów)
CREATE TABLE IF NOT EXISTS node_custom_fields (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  node_id TEXT NOT NULL, -- ID noda z React Flow (przechowywane jako string)
  funnel_id UUID NOT NULL REFERENCES funnel_diagrams(id) ON DELETE CASCADE,
  field_name TEXT NOT NULL, -- Nazwa pola (np. "CPC", "Data startu", "Budżet")
  field_type TEXT NOT NULL CHECK (field_type IN ('text', 'date', 'number', 'link')),
  field_value TEXT, -- Wartość pola (dla daty: ISO string, dla liczby: string, dla tekstu: string, dla linku: URL)
  display_order INTEGER DEFAULT 0, -- Kolejność wyświetlania w węźle
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(funnel_id, node_id, field_name) -- Jeden węzeł w jednym lejku nie może mieć dwóch pól o tej samej nazwie
);

-- Indeksy dla wydajności
CREATE INDEX IF NOT EXISTS idx_node_custom_fields_funnel_id ON node_custom_fields(funnel_id);
CREATE INDEX IF NOT EXISTS idx_node_custom_fields_node_id ON node_custom_fields(node_id);
CREATE INDEX IF NOT EXISTS idx_node_custom_fields_funnel_node ON node_custom_fields(funnel_id, node_id);

-- Funkcja aktualizacji updated_at
CREATE OR REPLACE FUNCTION update_node_custom_fields_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger dla updated_at
DROP TRIGGER IF EXISTS update_node_custom_fields_updated_at ON node_custom_fields;
CREATE TRIGGER update_node_custom_fields_updated_at
  BEFORE UPDATE ON node_custom_fields
  FOR EACH ROW
  EXECUTE FUNCTION update_node_custom_fields_updated_at();

-- Włącz RLS
ALTER TABLE node_custom_fields ENABLE ROW LEVEL SECURITY;

-- RLS Policies
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

-- Komentarze
COMMENT ON TABLE node_custom_fields IS 'Własne pola (tekst, data, liczba, link) dla węzłów w lejkach marketingowych';
COMMENT ON COLUMN node_custom_fields.node_id IS 'ID noda z React Flow (przechowywane jako string, np. "node-123-abc")';
COMMENT ON COLUMN node_custom_fields.field_type IS 'Typ pola: text (tekst), date (data), number (liczba), link (link)';
COMMENT ON COLUMN node_custom_fields.field_value IS 'Wartość pola: dla daty w formacie ISO (YYYY-MM-DD), dla liczby jako string, dla tekstu i linku jako string';
