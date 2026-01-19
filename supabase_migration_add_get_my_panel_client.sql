-- =====================================================
-- DODANIE: Funkcja get_my_panel_client() - SECURITY DEFINER omija RLS
-- =====================================================
-- Uruchom to w Supabase SQL Editor

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

COMMENT ON FUNCTION get_my_panel_client() IS 'Zwraca panel_client dla zalogowanego użytkownika. SECURITY DEFINER omija RLS.';
