-- =====================================================
-- FIX: Naprawa uprawnień - użycie funkcji is_admin() zamiast auth.users
-- =====================================================
-- Problem: Policy odwoływały się bezpośrednio do auth.users, co wymagało
--          specjalnych uprawnień i powodowało "permission denied"
-- Rozwiązanie: Użycie funkcji is_admin() z SECURITY DEFINER
-- =====================================================

-- Utwórz funkcję is_admin() jeśli nie istnieje
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

-- Usuń stare policy i utwórz nowe z użyciem is_admin()

-- marketing_clients
DROP POLICY IF EXISTS "Admins can do everything with clients" ON marketing_clients;
CREATE POLICY "Admins can do everything with clients"
  ON marketing_clients
  FOR ALL
  USING (is_admin());

-- funnel_diagrams
DROP POLICY IF EXISTS "Admins can do everything with funnels" ON funnel_diagrams;
CREATE POLICY "Admins can do everything with funnels"
  ON funnel_diagrams
  FOR ALL
  USING (is_admin());

DROP POLICY IF EXISTS "Clients can view assigned funnels" ON funnel_diagrams;
CREATE POLICY "Clients can view assigned funnels"
  ON funnel_diagrams
  FOR SELECT
  USING (is_admin() OR created_by = auth.uid());

-- funnel_access
DROP POLICY IF EXISTS "Admins can manage all access" ON funnel_access;
CREATE POLICY "Admins can manage all access"
  ON funnel_access
  FOR ALL
  USING (is_admin());
