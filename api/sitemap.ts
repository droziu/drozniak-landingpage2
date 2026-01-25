import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const BASE_URL = 'https://drozniak.pl';

// Utwórz klienta Supabase bezpośrednio w API route (używając process.env dla Vercel)
const getSupabaseClient = () => {
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createClient(supabaseUrl, supabaseAnonKey);
};

// Statyczne strony (bez trailing slash)
const staticPages = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: '/system', priority: '0.9', changefreq: 'monthly' },
  { path: '/strony-www', priority: '0.9', changefreq: 'monthly' },
  { path: '/szkolenia', priority: '0.8', changefreq: 'monthly' },
  { path: '/kontakt', priority: '0.7', changefreq: 'monthly' },
  { path: '/polityka-prywatnosci', priority: '0.3', changefreq: 'yearly' },
  { path: '/portfolio-redlin', priority: '0.7', changefreq: 'yearly' },
  { path: '/portfolio-pasw', priority: '0.7', changefreq: 'yearly' },
  { path: '/blog', priority: '0.9', changefreq: 'weekly' },
];

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  try {
    // Utwórz klienta Supabase
    const supabase = getSupabaseClient();
    
    // Pobierz wszystkie opublikowane posty bloga
    const { data: blogPosts, error } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Błąd pobierania postów bloga:', error);
      // Kontynuuj bez postów bloga - zwróć tylko statyczne strony
    }

    // Generuj XML sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => {
  const lastmod = new Date().toISOString().split('T')[0];
  return `  <url>
    <loc>${BASE_URL}${page.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
}).join('\n')}
${blogPosts?.map(post => {
  const lastmod = post.updated_at 
    ? new Date(post.updated_at).toISOString().split('T')[0]
    : post.published_at 
    ? new Date(post.published_at).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0];
  return `  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
}).join('\n') || ''}
</urlset>`;

    response.setHeader('Content-Type', 'application/xml');
    response.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    response.status(200).send(sitemap);
  } catch (error) {
    console.error('Błąd generowania sitemap:', error);
    // W przypadku błędu, zwróć przynajmniej statyczne strony
    try {
      const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => {
  const lastmod = new Date().toISOString().split('T')[0];
  return `  <url>
    <loc>${BASE_URL}${page.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
}).join('\n')}
</urlset>`;
      response.setHeader('Content-Type', 'application/xml');
      response.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
      response.status(200).send(fallbackSitemap);
    } catch (fallbackError) {
      response.status(500).json({ error: 'Błąd generowania sitemap', details: error instanceof Error ? error.message : String(error) });
    }
  }
}
