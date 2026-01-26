'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase-client';
import { useAuth } from './useAuth';

export interface Course {
  id: string;
  code: string;
  name: string;
  description: string | null;
  config_path: string;
  active: boolean;
}

export const useCourseById = (courseId: string | null) => {
  const { user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !courseId) {
      setCourse(null);
      setLoading(false);
      return;
    }
    load();
  }, [user?.id, courseId]);

  const load = async () => {
    if (!user || !courseId) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_courses')
        .select(`
          courses (
            id,
            code,
            name,
            description,
            config_path,
            active
          )
        `)
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .eq('active', true)
        .maybeSingle();

      if (error) throw error;
      const c = (data as any)?.courses;
      setCourse(c ? (c as Course) : null);
    } catch (e) {
      console.error('useCourseById:', e);
      setCourse(null);
    } finally {
      setLoading(false);
    }
  };

  return { course, loading, reload: load };
};
