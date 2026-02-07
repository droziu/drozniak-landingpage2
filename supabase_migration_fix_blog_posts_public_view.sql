-- =====================================================
-- MIGRACJA: Naprawa security linter – blog_posts_public
-- =====================================================
-- Problem: Widok blog_posts_public ma SECURITY DEFINER (domyślne w PG),
-- co oznacza, że wykonuje się z uprawnieniami twórcy widoku zamiast
-- użytkownika zapytania. Linter Supabase to zgłasza.
--
-- Rozwiązanie: Przeładowanie widoku z SECURITY INVOKER. Wtedy RLS
-- na blog_posts i blog_categories jest egzekwowane względem użytkownika
-- wykonującego zapytanie (anon/authenticated). Polityki już pozwalają
-- na publiczny odczyt opublikowanych postów i kategorii.
-- =====================================================

DROP VIEW IF EXISTS public.blog_posts_public;

CREATE VIEW public.blog_posts_public
  WITH (security_invoker = true)
AS
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

COMMENT ON VIEW public.blog_posts_public IS
  'Opublikowane posty z danymi kategorii. SECURITY INVOKER – uprawnienia i RLS względem użytkownika zapytania.';
