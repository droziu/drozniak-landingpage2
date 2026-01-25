import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  featured_image_url: string | null;
  published_at: string | null;
  created_at: string;
  category_name: string | null;
  category_slug: string | null;
  category_color: string | null;
  tags: string[];
  view_count: number;
  reading_time: number | null;
}

export interface BlogPostsFilters {
  category?: string;
  tag?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

export const useBlogPosts = (filters?: BlogPostsFilters) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadPosts();
  }, [filters?.category, filters?.tag, filters?.search]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Filtrowanie po kategorii - najpierw pobierz ID kategorii
      let categoryId: string | null = null;
      if (filters?.category) {
        const { data: categoryData } = await supabase
          .from('blog_categories')
          .select('id')
          .eq('slug', filters.category)
          .single();
        if (categoryData) {
          categoryId = categoryData.id;
        }
      }

      // Używamy bezpośrednio tabeli blog_posts z join do kategorii
      let query = supabase
        .from('blog_posts')
        .select(`
          *,
          category:blog_categories(name, slug, color)
        `)
        .eq('status', 'published');

      // Zastosuj filtr kategorii jeśli jest
      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      // Filtrowanie po tagu
      if (filters?.tag) {
        query = query.contains('tags', [filters.tag]);
      }

      // Wyszukiwanie (rozszerzone - title, excerpt, meta_description)
      if (filters?.search) {
        query = query.or(
          `title.ilike.%${filters.search}%,excerpt.ilike.%${filters.search}%,meta_description.ilike.%${filters.search}%`
        );
      }

      // Limit i offset dla paginacji
      if (filters?.limit) {
        query = query.limit(filters.limit);
      }
      if (filters?.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
      }

      // Dodaj sortowanie
      query = query.order('published_at', { ascending: false });

      const { data, error: queryError } = await query;

      if (queryError) throw queryError;

      // Przekształć dane z join na format jak z view
      let transformedPosts = (data || []).map((post: any) => ({
        ...post,
        category_name: post.category?.name || null,
        category_slug: post.category?.slug || null,
        category_color: post.category?.color || null,
      }));

      // Jeśli jest wyszukiwanie, dodatkowo filtruj po tagach (rozszerzone wyszukiwanie)
      if (filters?.search) {
        const searchTerm = filters.search.toLowerCase().trim();
        const searchWords = searchTerm.split(/[\s-]+/).filter(w => w.length > 0); // Podziel też po myślnikach
        
        transformedPosts = transformedPosts.filter((post: any) => {
          // Sprawdź czy pasuje przez ILIKE w tekście
          const textMatch = post.title?.toLowerCase().includes(searchTerm) ||
                           post.excerpt?.toLowerCase().includes(searchTerm) ||
                           post.meta_description?.toLowerCase().includes(searchTerm);
          
          // Sprawdź czy któryś tag zawiera szukany tekst lub jego części
          const tagsMatch = post.tags && Array.isArray(post.tags) && 
            post.tags.some((tag: string) => {
              const tagLower = tag.toLowerCase();
              // Sprawdź dokładne dopasowanie lub częściowe
              return tagLower === searchTerm || 
                     tagLower.includes(searchTerm) || 
                     searchTerm.includes(tagLower) ||
                     searchWords.some(word => tagLower.includes(word)) ||
                     tagLower.split(/[\s-]+/).some(tagWord => searchWords.includes(tagWord));
            });
          
          return textMatch || tagsMatch;
        });
      }

      setPosts(transformedPosts as BlogPost[]);
    } catch (err: any) {
      console.error('Błąd ładowania postów bloga:', err);
      setError(err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  return { posts, loading, error, reload: loadPosts };
};
