import { notFound } from 'next/navigation';
import { supabaseServer } from '@/lib/supabase-server';
import BlogListClient from '../../BlogListClient';

const BASE_URL = 'https://drozniak.pl';

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

async function getCategoryPosts(categorySlug: string) {
  // Pobierz ID kategorii
  const { data: categoryData, error: categoryError } = await supabaseServer
    .from('blog_categories')
    .select('id, name, slug, color')
    .eq('slug', categorySlug)
    .single();

  if (categoryError || !categoryData) {
    return { posts: [], category: null };
  }

  // Pobierz posty z tej kategorii
  const { data: postsData, error: postsError } = await supabaseServer
    .from('blog_posts')
    .select(`
      *,
      category:blog_categories(name, slug, color)
    `)
    .eq('status', 'published')
    .eq('category_id', categoryData.id)
    .order('published_at', { ascending: false })
    .limit(20);

  if (postsError) {
    console.error('Błąd pobierania postów:', postsError);
    return { posts: [], category: categoryData };
  }

  const posts = (postsData || []).map((post: any) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    featured_image_url: post.featured_image_url,
    published_at: post.published_at,
    created_at: post.created_at,
    category_name: post.category?.name || categoryData.name,
    category_slug: post.category?.slug || categoryData.slug,
    category_color: post.category?.color || categoryData.color,
    tags: post.tags || [],
    view_count: post.view_count || 0,
    reading_time: post.reading_time || null,
  }));

  return { posts, category: categoryData };
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  const { posts, category } = await getCategoryPosts(categorySlug);

  if (!category) {
    notFound();
  }

  return <BlogListClient initialPosts={posts} blogTopics={blogTopics} categoryName={category.name} />;
}
