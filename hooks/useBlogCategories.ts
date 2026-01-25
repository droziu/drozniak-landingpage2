import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string | null;
}

export const useBlogCategories = () => {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setCategories((data || []) as BlogCategory[]);
    } catch (err: any) {
      console.error('Błąd ładowania kategorii:', err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  return { categories, loading };
};
