import { MetadataRoute } from 'next';
import { supabaseServer } from '@/lib/supabase-server';

const BASE_URL = 'https://drozniak.pl';

// Statyczne strony
const staticPages = [
  { url: '', priority: 1.0, changeFrequency: 'weekly' as const },
  { url: '/system', priority: 0.9, changeFrequency: 'monthly' as const },
  { url: '/strony-www', priority: 0.9, changeFrequency: 'monthly' as const },
  { url: '/szkolenia', priority: 0.8, changeFrequency: 'monthly' as const },
  { url: '/kontakt', priority: 0.7, changeFrequency: 'monthly' as const },
  { url: '/polityka-prywatnosci', priority: 0.3, changeFrequency: 'yearly' as const },
  { url: '/portfolio-redlin', priority: 0.7, changeFrequency: 'yearly' as const },
  { url: '/portfolio-pasw', priority: 0.7, changeFrequency: 'yearly' as const },
  { url: '/blog', priority: 0.9, changeFrequency: 'weekly' as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Pobierz opublikowane posty bloga
  let blogPosts: Array<{ url: string; lastModified: Date; changeFrequency: 'weekly' | 'monthly' | 'yearly'; priority: number }> = [];
  
  try {
    const { data, error } = await supabaseServer
      .from('blog_posts')
      .select('slug, updated_at, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (!error && data) {
      blogPosts = data.map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: post.updated_at ? new Date(post.updated_at) : (post.published_at ? new Date(post.published_at) : new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error('Błąd pobierania postów bloga dla sitemap:', error);
  }

  // Połącz statyczne strony z postami bloga
  const allPages = [
    ...staticPages.map((page) => ({
      url: `${BASE_URL}${page.url}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...blogPosts,
  ];

  return allPages;
}
