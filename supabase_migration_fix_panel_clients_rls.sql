-- =====================================================
-- FIX: Sprawdzenie i naprawa RLS dla panel_clients
-- =====================================================
-- Jeśli użytkownik nie może zobaczyć swojego rekordu,
-- może być problem z RLS policy lub auth.uid()

-- 1. Sprawdź czy policy istnieje
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'panel_clients';

-- 2. Sprawdź czy użytkownik może zobaczyć swój rekord (uruchom jako użytkownik, nie admin)
-- SELECT * FROM panel_clients WHERE user_id = auth.uid();

-- 3. Jeśli policy nie działa, usuń i utwórz ponownie
DROP POLICY IF EXISTS "Users can view own panel_client" ON panel_clients;

CREATE POLICY "Users can view own panel_client"
  ON panel_clients FOR SELECT
  USING (user_id = auth.uid());

-- 4. Sprawdź czy get_my_view_grants() działa (uruchom jako użytkownik)
-- SELECT get_my_view_grants();
