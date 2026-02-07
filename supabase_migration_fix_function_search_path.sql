-- =====================================================
-- MIGRACJA: Function Search Path (security linter)
-- =====================================================
-- Problem: Funkcje bez ustawionego search_path mogą być podatne na
-- search_path injection (wywołujący może zmienić search_path przed
-- wywołaniem i wpłynąć na to, które obiekty są rozwiązywane).
--
-- Rozwiązanie: Ustawiamy search_path = public dla wszystkich funkcji
-- w schemacie public, żeby rozwiązywanie nazw było przewidywalne.
-- =====================================================

DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN
    SELECT p.oid, p.proname, pg_get_function_identity_arguments(p.oid) AS args
    FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public'
      AND p.prokind = 'f'
  LOOP
    EXECUTE format(
      'ALTER FUNCTION public.%I(%s) SET search_path = public',
      r.proname,
      r.args
    );
  END LOOP;
END $$;
