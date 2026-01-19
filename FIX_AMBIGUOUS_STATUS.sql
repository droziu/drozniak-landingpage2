-- Naprawa funkcji get_proposal_by_slug_and_token - niejednoznaczna kolumna "status"
-- Uruchom w Supabase SQL Editor

CREATE OR REPLACE FUNCTION get_proposal_by_slug_and_token(
  proposal_slug TEXT,
  access_token TEXT DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  slug TEXT,
  pdf_path TEXT,
  status TEXT,
  valid_until TIMESTAMPTZ,
  token_valid BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.title,
    p.slug,
    p.pdf_path,
    p.status,
    p.valid_until,
    CASE 
      WHEN access_token IS NULL THEN true -- Bez tokena (publiczny dostęp przez slug)
      WHEN EXISTS (
        SELECT 1 FROM proposal_access_links pal
        WHERE pal.proposal_id = p.id
        AND pal.token = access_token
        AND pal.status = 'active' -- POPRAWKA: pal.status zamiast status
        AND (pal.expires_at IS NULL OR pal.expires_at > NOW())
      ) THEN true
      ELSE false
    END AS token_valid
  FROM proposals p
  WHERE p.slug = proposal_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION get_proposal_by_slug_and_token(TEXT, TEXT) IS 'Pobiera ofertę po slug i sprawdza token (jeśli podano). POPRAWKA: naprawiono niejednoznaczną kolumnę status.';
