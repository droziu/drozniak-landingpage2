-- =====================================================
-- PUBLIKACJA DRUGIEGO POSTA BLOGA
-- =====================================================
-- Uruchom ten skrypt w Supabase SQL Editor, gdy chcesz
-- opublikować post "Dlaczego strona nie sprzedaje...".
-- =====================================================

UPDATE blog_posts
SET
  status = 'published',
  published_at = COALESCE(published_at, NOW()),
  updated_at = NOW()
WHERE slug = 'dlaczego-strona-nie-sprzedaje';
