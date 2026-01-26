'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase-client';
import { useAuth } from './useAuth';
import { loadCourseModules } from '@/utils/courseLoader';

export interface CourseWithProgress {
  id: string;
  code: string;
  name: string;
  description: string | null;
  config_path: string;
  completionPercent: number;
}

export const useUserCourses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<CourseWithProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setCourses([]);
      setLoading(false);
      return;
    }
    load();
  }, [user?.id]);

  const load = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data: userCourses, error } = await supabase
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
        .order('assigned_at', { ascending: false });

      if (error) throw error;

      const courseList = (userCourses || [])
        .map((uc: any) => uc.courses)
        .filter(Boolean) as { id: string; code: string; name: string; description: string | null; config_path: string; active: boolean }[];

      if (courseList.length === 0) {
        setCourses([]);
        setLoading(false);
        return;
      }

      const { data: progressRows, error: progErr } = await supabase
        .from('training_progress')
        .select('course_id, module_code, percentage, module_completed')
        .eq('user_id', user.id)
        .in('course_id', courseList.map((c) => c.id));

      if (progErr) throw progErr;

      const withPercent: CourseWithProgress[] = courseList.map((c) => {
        const modules = loadCourseModules(c.config_path);
        const totalLessons = modules.reduce((s, m) => s + m.lessons.length, 0);
        let completedEquivalent = 0;
        modules.forEach((m) => {
          const moduleCode = `modul_${m.id}`;
          const tp = (progressRows || []).find((p: any) => p.course_id === c.id && p.module_code === moduleCode);
          const pct = tp?.module_completed ? 100 : (tp?.percentage ?? 0);
          completedEquivalent += (m.lessons.length * pct) / 100;
        });
        const completionPercent = totalLessons > 0 ? Math.round((completedEquivalent / totalLessons) * 100) : 0;
        return {
          id: c.id,
          code: c.code,
          name: c.name,
          description: c.description,
          config_path: c.config_path,
          completionPercent,
        };
      });

      setCourses(withPercent);
    } catch (e) {
      console.error('useUserCourses:', e);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  return { courses, loading, reload: load };
};
