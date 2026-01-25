import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface BlogPostContent {
  blocks: ContentBlock[];
}

export interface ContentBlock {
  type: 'text' | 'image' | 'quote' | 'code' | 'video' | 'cta' | 'custom' | 'highlight' | 'separator' | 'heading' | 'numbered-section';
  id: string;
  data: {
    text?: string;
    alignment?: 'left' | 'center' | 'right';
    imageUrl?: string;
    alt?: string;
    caption?: string;
    width?: 'narrow' | 'standard' | 'wide' | 'full';
    quote?: string;
    author?: string;
    code?: string;
    language?: string;
    videoUrl?: string;
    videoType?: 'youtube' | 'vimeo' | 'direct';
    ctaText?: string;
    ctaLink?: string;
    ctaStyle?: 'primary' | 'secondary';
    html?: string;
    css?: string;
    js?: string;
    title?: string; // Dla bloku highlight
    subtitle?: string; // Dla bloku highlight
    number?: number; // Dla bloku numbered-section
  };
}

export interface BlogPostFull {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: BlogPostContent;
  featured_image_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string[] | null;
  og_image_url: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  category_id: string | null;
  category_name: string | null;
  category_slug: string | null;
  category_color: string | null;
  tags: string[];
  layout_type: 'standard' | 'wide' | 'narrow' | 'custom';
  view_count: number;
  reading_time: number | null;
}

export const useBlogPost = (slug: string) => {
  const [post, setPost] = useState<BlogPostFull | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (slug) {
      loadPost();
    }
  }, [slug]);

  const loadPost = async () => {
    if (!slug) return;

    try {
      setLoading(true);
      setError(null);

      // Pobierz post po slug bezpośrednio z tabeli (view może mieć problemy z RLS)
      const { data: directData, error: queryError } = await supabase
        .from('blog_posts')
        .select(`
          *,
          category:blog_categories(name, slug, color)
        `)
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (queryError) {
        if (queryError.code === 'PGRST116') {
          setError(new Error('Post nie został znaleziony lub nie jest opublikowany'));
        } else {
          console.error('Błąd pobierania posta:', queryError);
          throw queryError;
        }
        return;
      }

      // Przekształć dane z join na format jak z view
      const data = {
        ...directData,
        category_name: (directData.category as any)?.name || null,
        category_slug: (directData.category as any)?.slug || null,
        category_color: (directData.category as any)?.color || null,
      };

      setPost(data as BlogPostFull);

      // Zwiększ liczbę wyświetleń (asynchronicznie, nie blokuje renderowania)
      // Używamy setTimeout żeby nie blokować renderowania
      setTimeout(async () => {
        try {
          const { error: rpcError } = await supabase.rpc('increment_post_views', { post_slug: slug });
          if (rpcError) {
            console.error('Błąd zwiększania liczby wyświetleń:', rpcError);
          }
        } catch (err) {
          console.error('Błąd zwiększania liczby wyświetleń:', err);
          // Ignoruj błąd - nie blokuje wyświetlania posta
        }
      }, 100);
    } catch (err: any) {
      console.error('Błąd ładowania posta:', err);
      setError(err);
      setPost(null);
    } finally {
      setLoading(false);
    }
  };

  return { post, loading, error, reload: loadPost };
};
