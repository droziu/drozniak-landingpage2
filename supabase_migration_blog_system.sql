-- =====================================================
-- MIGRACJA: System Bloga
-- =====================================================
-- Opis: Tworzy kompletny system bloga z elastyczną strukturą treści
-- Data: 2026-01-25
-- =====================================================

-- 1. Tabela kategorii bloga
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#fee715', -- Kolor akcentu dla kategorii
  icon TEXT, -- Nazwa ikony (opcjonalnie)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Główna tabela postów bloga
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT, -- Krótki opis dla listy postów
  content JSONB NOT NULL DEFAULT '{"blocks": []}'::jsonb, -- Elastyczna struktura treści
  featured_image_url TEXT, -- URL do obrazu w Supabase Storage
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[],
  og_image_url TEXT, -- Open Graph image
  
  -- Status i daty
  status TEXT NOT NULL DEFAULT 'draft', -- 'draft', 'published', 'archived'
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Kategorie i tagi
  category_id UUID REFERENCES blog_categories(id) ON DELETE SET NULL,
  tags TEXT[] DEFAULT '{}',
  
  -- Elastyczne pola dla różnych layoutów
  layout_type TEXT DEFAULT 'standard', -- 'standard', 'wide', 'narrow', 'custom'
  custom_css TEXT, -- Opcjonalne custom CSS dla konkretnego posta
  custom_js TEXT, -- Opcjonalne custom JS
  
  -- Statystyki
  view_count INTEGER DEFAULT 0,
  reading_time INTEGER, -- w minutach (obliczane automatycznie)
  
  -- Walidacja
  CONSTRAINT valid_status CHECK (status IN ('draft', 'published', 'archived')),
  CONSTRAINT valid_layout_type CHECK (layout_type IN ('standard', 'wide', 'narrow', 'custom'))
);

-- 4. Indeksy dla wydajności
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC) WHERE status = 'published';
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author ON blog_posts(author_id);

-- Indeks pełnotekstowy dla wyszukiwania (używamy 'simple' zamiast 'polish')
CREATE INDEX IF NOT EXISTS idx_blog_posts_search ON blog_posts 
  USING GIN(to_tsvector('simple', 
    COALESCE(title, '') || ' ' || 
    COALESCE(excerpt, '') || ' ' || 
    COALESCE(meta_description, '')
  ));

-- 5. Funkcja do automatycznego aktualizowania updated_at
CREATE OR REPLACE FUNCTION update_blog_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger dla blog_posts
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_updated_at();

-- Trigger dla blog_categories
CREATE TRIGGER update_blog_categories_updated_at
  BEFORE UPDATE ON blog_categories
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_updated_at();

-- 6. Funkcja do automatycznego obliczania czasu czytania
CREATE OR REPLACE FUNCTION calculate_reading_time(content_json JSONB)
RETURNS INTEGER AS $$
DECLARE
  word_count INTEGER := 0;
  block_data JSONB;
  text_content TEXT;
BEGIN
  -- Przejdź przez wszystkie bloki i zsumuj słowa
  FOR block_data IN SELECT * FROM jsonb_array_elements(content_json->'blocks')
  LOOP
    -- Dla bloków typu 'text', wyciągnij tekst i policz słowa
    IF block_data->>'type' = 'text' AND block_data->'data'->>'text' IS NOT NULL THEN
      text_content := block_data->'data'->>'text';
      -- Usuń HTML tags i policz słowa (przybliżone)
      text_content := regexp_replace(text_content, '<[^>]+>', '', 'g');
      word_count := word_count + array_length(string_to_array(text_content, ' '), 1);
    END IF;
  END LOOP;
  
  -- Średnia prędkość czytania: 200 słów/minutę
  RETURN GREATEST(1, CEIL(word_count::NUMERIC / 200));
END;
$$ LANGUAGE plpgsql;

-- 7. Funkcja do zwiększania liczby wyświetleń
CREATE OR REPLACE FUNCTION increment_post_views(post_slug TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE blog_posts
  SET view_count = view_count + 1
  WHERE slug = post_slug AND status = 'published';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Funkcja pomocnicza do sprawdzania czy użytkownik jest adminem
-- (używa tej samej metody co reszta projektu)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- Sprawdź email użytkownika przez auth.jwt() - bezpieczniejsza metoda
  RETURN (
    (auth.jwt() ->> 'email')::text = 'stanislaw@drozniak.com'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- 9. RLS (Row Level Security) Policies

-- Włącz RLS
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Blog Categories: Publiczne odczyty
CREATE POLICY "Public can view categories"
  ON blog_categories FOR SELECT
  USING (true);

-- Blog Posts: Publiczne odczyty dla opublikowanych postów
CREATE POLICY "Public can view published posts"
  ON blog_posts FOR SELECT
  USING (status = 'published');

-- Blog Posts: Zalogowani użytkownicy mogą tworzyć posty
CREATE POLICY "Authenticated users can create posts"
  ON blog_posts FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Blog Posts: Użytkownicy mogą edytować swoje posty
CREATE POLICY "Users can update their own posts"
  ON blog_posts FOR UPDATE
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

-- Blog Posts: Użytkownicy mogą usuwać swoje posty (tylko drafty)
CREATE POLICY "Users can delete their own draft posts"
  ON blog_posts FOR DELETE
  USING (
    auth.uid() = author_id 
    AND status = 'draft'
  );

-- Blog Posts: Admin może wszystko
CREATE POLICY "Admins can do everything with posts"
  ON blog_posts FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 10. View dla łatwego pobierania opublikowanych postów z danymi kategorii
CREATE OR REPLACE VIEW blog_posts_public AS
SELECT 
  p.id,
  p.slug,
  p.title,
  p.excerpt,
  p.content,
  p.featured_image_url,
  p.meta_title,
  p.meta_description,
  p.meta_keywords,
  p.og_image_url,
  p.published_at,
  p.created_at,
  p.updated_at,
  p.category_id,
  p.tags,
  p.layout_type,
  p.view_count,
  p.reading_time,
  c.name AS category_name,
  c.slug AS category_slug,
  c.color AS category_color,
  p.author_id
FROM blog_posts p
LEFT JOIN blog_categories c ON p.category_id = c.id
WHERE p.status = 'published'
ORDER BY p.published_at DESC;

-- 11. Funkcja pomocnicza do wyszukiwania postów
CREATE OR REPLACE FUNCTION search_blog_posts(search_query TEXT, limit_count INTEGER DEFAULT 10)
RETURNS TABLE (
  id UUID,
  slug TEXT,
  title TEXT,
  excerpt TEXT,
  published_at TIMESTAMPTZ,
  category_name TEXT,
  category_slug TEXT,
  relevance REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.slug,
    p.title,
    p.excerpt,
    p.published_at,
    c.name AS category_name,
    c.slug AS category_slug,
    ts_rank(
      to_tsvector('simple', COALESCE(p.title, '') || ' ' || COALESCE(p.excerpt, '') || ' ' || COALESCE(p.meta_description, '')),
      plainto_tsquery('simple', search_query)
    ) AS relevance
  FROM blog_posts p
  LEFT JOIN blog_categories c ON p.category_id = c.id
  WHERE 
    p.status = 'published'
    AND (
      to_tsvector('simple', COALESCE(p.title, '') || ' ' || COALESCE(p.excerpt, '') || ' ' || COALESCE(p.meta_description, ''))
      @@ plainto_tsquery('simple', search_query)
      OR p.title ILIKE '%' || search_query || '%'
      OR p.excerpt ILIKE '%' || search_query || '%'
    )
  ORDER BY relevance DESC, p.published_at DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 12. Przykładowe dane (opcjonalnie - można usunąć)
-- Kategorie
INSERT INTO blog_categories (name, slug, description, color) VALUES
  ('Marketing', 'marketing', 'Artykuły o marketingu i pozyskiwaniu klientów', '#fee715'),
  ('Strony WWW', 'strony-www', 'Poradniki dotyczące tworzenia stron internetowych', '#00C9A7'),
  ('Sztuczna Inteligencja', 'sztuczna-inteligencja', 'AI w biznesie i marketingu', '#fee715'),
  ('Szkolenia', 'szkolenia', 'Materiały szkoleniowe i poradniki', '#00C9A7')
ON CONFLICT (slug) DO NOTHING;

-- 13. Komentarze (opcjonalnie - jeśli chcesz własny system komentarzy)
-- CREATE TABLE IF NOT EXISTS blog_comments (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
--   author_name TEXT NOT NULL,
--   author_email TEXT NOT NULL,
--   content TEXT NOT NULL,
--   parent_id UUID REFERENCES blog_comments(id) ON DELETE CASCADE, -- Dla odpowiedzi
--   status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'spam'
--   created_at TIMESTAMPTZ DEFAULT NOW(),
--   updated_at TIMESTAMPTZ DEFAULT NOW(),
--   CONSTRAINT valid_comment_status CHECK (status IN ('pending', 'approved', 'spam'))
-- );

-- CREATE INDEX IF NOT EXISTS idx_blog_comments_post ON blog_comments(post_id);
-- CREATE INDEX IF NOT EXISTS idx_blog_comments_status ON blog_comments(status);

-- ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;

-- CREATE POLICY "Public can view approved comments"
--   ON blog_comments FOR SELECT
--   USING (status = 'approved');

-- =====================================================
-- KONIEC MIGRACJI
-- =====================================================
-- 
-- Następne kroki:
-- 1. Utwórz Storage Bucket 'blog-images' w Supabase Dashboard
-- 2. Skonfiguruj publiczny dostęp do bucket (tylko odczyty)
-- 3. Utwórz Edge Function do optymalizacji obrazów (opcjonalnie)
-- 4. Zaimplementuj komponenty React zgodnie z BLOG_ARCHITECTURE_PLAN.md
-- 
-- =====================================================
