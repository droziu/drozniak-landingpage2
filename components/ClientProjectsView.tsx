import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase-client';
import { useAuth } from '@/app/hooks/useAuth';
import { LoadingState } from './LoadingState';

export const ClientProjectsView: React.FC = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Array<{ id: string; project_type: string; name: string; status: string; updated_at: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('client_projects')
        .select('id, project_type, name, status, updated_at')
        .order('updated_at', { ascending: false });
      if (!error) setProjects(data || []);
      setLoading(false);
    })();
  }, [user?.id]);

  const statusLabel: Record<string, string> = {
    draft: 'Szkic',
    in_progress: 'W trakcie',
    review: 'Do akceptacji',
    completed: 'Zakończony',
    on_hold: 'Wstrzymany',
  };
  const typeLabel: Record<string, string> = { website: 'Strona WWW', other: 'Inny' };

  if (loading) {
    return <LoadingState variant="block" label="Ładowanie projektów…" />;
  }

  if (projects.length === 0) {
    return (
      <div className="py-8 px-4 rounded-lg bg-white/5 border border-white/10 text-center">
        <p className="text-gray-400 text-sm">Brak projektów</p>
        <p className="text-gray-500 text-xs mt-1">Projekty (np. strona www) i ich status pojawią się tutaj po dodaniu.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-base font-semibold text-white mb-3">Projekty</h2>
      <ul className="divide-y divide-white/10">
        {projects.map((p) => (
          <li key={p.id} className="py-3 flex items-center justify-between gap-3">
            <div>
              <span className="text-white text-sm">{p.name}</span>
              <span className="ml-2 text-xs text-gray-500">({typeLabel[p.project_type] || p.project_type})</span>
            </div>
            <span className="text-xs text-gray-400">{statusLabel[p.status] || p.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
