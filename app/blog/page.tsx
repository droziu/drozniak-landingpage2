import { supabaseServer } from '@/lib/supabase-server';
import BlogListClient from './BlogListClient';

const BASE_URL = 'https://drozniak.pl';

// Tematy bloga z ikonami i mapowaniem na tagi
const blogTopics = [
  { name: 'Pozyskiwanie klientów', slug: 'pozyskiwanie-klientow', searchTags: ['pozyskiwanie-klientów', 'pozyskiwanie klientów', 'pozyskiwanie', 'klienci', 'marketing'] },
  { name: 'Oferta i komunikacja', slug: 'oferta', searchTags: ['oferta', 'komunikacja'] },
  { name: 'Lejek sprzedażowy', slug: 'lejek', searchTags: ['lejek', 'funnel', 'sprzedaż'] },
  { name: 'SEO i content', slug: 'seo', searchTags: ['seo', 'content', 'treści'] },
  { name: 'Reklamy', slug: 'reklamy', searchTags: ['reklamy', 'reklama', 'kampanie'] },
  { name: 'Social media', slug: 'social-media', searchTags: ['social-media', 'social', 'media'] },
  { name: 'Strony WWW', slug: 'strony-www', searchTags: ['strony-www', 'strony', 'www'] },
  { name: 'AI i automatyzacje', slug: 'ai', searchTags: ['ai', 'automatyzacje', 'automatyzacja'] },
  { name: 'Analityka', slug: 'analityka', searchTags: ['analityka', 'analiza', 'pomiar'] },
];

async function getBlogPosts(search?: string, categorySlug?: string) {
  let query = supabaseServer
    .from('blog_posts')
    .select(`
      *,
      category:blog_categories(name, slug, color)
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(20);

  // Filtrowanie po kategorii
  if (categorySlug) {
    const { data: categoryData } = await supabaseServer
      .from('blog_categories')
      .select('id')
      .eq('slug', categorySlug)
      .single();
    
    if (categoryData) {
      query = query.eq('category_id', categoryData.id);
    }
  }

  // Filtrowanie po wyszukiwaniu
  if (search) {
    query = query.or(
      `title.ilike.%${search}%,excerpt.ilike.%${search}%,meta_description.ilike.%${search}%`
    );
  }

  const { data, error } = await query;

  if (error) {
    console.error('Błąd pobierania postów:', error);
    return [];
  }

  // Przekształć dane
  return (data || []).map((post: any) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    featured_image_url: post.featured_image_url,
    published_at: post.published_at,
    created_at: post.created_at,
    category_name: post.category?.name || null,
    category_slug: post.category?.slug || null,
    category_color: post.category?.color || null,
    tags: post.tags || [],
    view_count: post.view_count || 0,
    reading_time: post.reading_time || null,
  }));
}

export default async function BlogListPage({
  searchParams,
}: {
  searchParams: { search?: string; category?: string };
}) {
  const posts = await getBlogPosts(searchParams.search, searchParams.category);

  return <BlogListClient initialPosts={posts} blogTopics={blogTopics} />;
}
