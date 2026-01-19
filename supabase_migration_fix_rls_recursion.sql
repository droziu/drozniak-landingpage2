-- =====================================================
-- FIX: Naprawa infinite recursion w RLS policies
-- =====================================================
-- Problem: Policy dla marketing_clients odwoływała się do funnel_access,
--          które z kolei odwoływało się do marketing_clients (cykl)
-- Rozwiązanie: Uproszczenie policy, usunięcie cyklicznych odwołań
-- 
-- UWAGA: Jeśli już wykonałeś główną migrację z poprawkami,
--        ten skrypt może nie być potrzebny - główna migracja już ma poprawki.
-- =====================================================

-- Usuń stare policy które powodują rekurencję
DROP POLICY IF EXISTS "Clients can view their own data" ON marketing_clients;
DROP POLICY IF EXISTS "Clients can view assigned funnels" ON funnel_diagrams;
DROP POLICY IF EXISTS "Clients can view their access" ON funnel_access;

-- Dodaj nowe, uproszczone policy dla marketing_clients (tylko jeśli nie istnieje)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'marketing_clients' 
    AND policyname = 'Creators can manage their clients'
  ) THEN
    CREATE POLICY "Creators can manage their clients"
      ON marketing_clients
      FOR ALL
      USING (created_by = auth.uid());
  END IF;
END $$;

-- Uproszczone policy dla funnel_diagrams (tylko jeśli nie istnieje)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'funnel_diagrams' 
    AND policyname = 'Clients can view assigned funnels'
  ) THEN
    CREATE POLICY "Clients can view assigned funnels"
      ON funnel_diagrams
      FOR SELECT
      USING (
        EXISTS (
          SELECT 1 FROM auth.users
          WHERE auth.users.id = auth.uid()
          AND auth.users.email = 'stanislaw@drozniak.com'
        )
        OR created_by = auth.uid()
      );
  END IF;
END $$;

-- Uproszczone policy dla funnel_access (tylko jeśli nie istnieje)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'funnel_access' 
    AND policyname = 'Clients can view their access'
  ) THEN
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
  END IF;
END $$;
