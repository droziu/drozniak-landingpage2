-- =====================================================
-- FIX: Nieskończona rekurencja w RLS dla funnel_diagrams
-- =====================================================
-- Problem: Policy "Clients can view assigned funnels" na funnel_diagrams
-- robi EXISTS (SELECT FROM funnel_access JOIN panel_clients...).
-- Przy ocenie tego zapytania RLS na funnel_access wymaga SELECT z funnel_diagrams,
-- co z powrotem wywołuje policy na funnel_diagrams -> rekurencja.
--
-- Rozwiązanie: Funkcja SECURITY DEFINER, która sama sprawdza funnel_access
-- i panel_clients (bez odwołania do funnel_diagrams). SECURITY DEFINER
-- omija RLS, więc nie ma rekurencji.
-- =====================================================

-- Funkcja: czy użytkownik ma dostęp do lejka (id) przez panel_clients + funnel_access
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

-- Zastąp policy na funnel_diagrams – zamiast inline EXISTS używamy funkcji (omija RLS w środku)
DROP POLICY IF EXISTS "Clients can view assigned funnels" ON funnel_diagrams;

CREATE POLICY "Clients can view assigned funnels"
  ON funnel_diagrams FOR SELECT
  USING (
    is_admin()
    OR created_by = auth.uid()
    OR can_access_funnel_via_panel_client(id)
  );

COMMENT ON FUNCTION can_access_funnel_via_panel_client(UUID) IS 'Sprawdza dostęp do lejka przez panel_clients.marketing_client_id i funnel_access. SECURITY DEFINER by uniknąć rekurencji RLS.';
