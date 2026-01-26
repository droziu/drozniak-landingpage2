'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase-client';
import { useAuth } from './useAuth';

interface Course {
  id: string;
  code: string;
  name: string;
  description: string | null;
  config_path: string;
  active: boolean;
}

export const useCourse = () => {
  const { user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    loadUserCourse();
  }, [user]);

  const loadUserCourse = async () => {
    if (!user) return;
    try {
      // Pobierz aktywny kurs użytkownika
      const { data: userCourse, error } = await supabase
        .from('user_courses')
        .select(`
          course_id,
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
        .eq('active', true)
        .order('assigned_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        // Jeśli nie ma przypisania, nie rzucaj błędu - po prostu brak kursu
        if (error.code !== 'PGRST116') {
          console.error('Error loading course:', error);
        }
        setCourse(null);
        return;
      }

      if (userCourse?.courses) {
        const coursesData = Array.isArray(userCourse.courses) ? userCourse.courses[0] : userCourse.courses;
        setCourse((coursesData as unknown) as Course);
      } else {
        setCourse(null);
      }
    } catch (error) {
      console.error('Error loading course:', error);
      setCourse(null);
    } finally {
      setLoading(false);
    }
  };

  return { course, loading, reloadCourse: loadUserCourse };
};
