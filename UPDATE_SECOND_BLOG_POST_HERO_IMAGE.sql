-- =====================================================
-- USTWIENIE OBRAZKA HERO DLA DRUGIEGO POSTA BLOGA
-- =====================================================
-- Wymaga: blog2-hero-1024.webp i blog2-hero-2000.webp
-- w bucketcie blog-images (Supabase Storage).
-- =====================================================

UPDATE blog_posts
SET featured_image_url = 'https://lkygnllsgashwloxgmax.supabase.co/storage/v1/object/public/blog-images/blog2-hero-2000.webp',
    updated_at = NOW()
WHERE slug = 'dlaczego-strona-nie-sprzedaje';
