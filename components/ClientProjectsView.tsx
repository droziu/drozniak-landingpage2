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

  const statusMeta: Record<string, { label: string; cls: string }> = {
    draft: { label: 'Szkic', cls: 'bg-amber-500/15 border-amber-500/30 text-amber-300' },
    in_progress: { label: 'W trakcie', cls: 'bg-blue-500/15 border-blue-500/30 text-blue-300' },
    review: { label: 'Do akceptacji', cls: 'bg-purple-500/15 border-purple-500/30 text-purple-300' },
    completed: { label: 'Zakończony', cls: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300' },
    on_hold: { label: 'Wstrzymany', cls: 'bg-white/[0.04] border-white/[0.08] text-white/50' },
  };
  const typeLabel: Record<string, string> = { website: 'Strona WWW', other: 'Inny' };

  const formatRelativeDate = (iso: string): string => {
    const d = new Date(iso);
    const days = Math.floor((Date.now() - d.getTime()) / 86400000);
    if (days === 0) return 'dziś';
    if (days === 1) return 'wczoraj';
    if (days < 7) return `${days} dni temu`;
    return d.toLocaleDateString('pl-PL', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  if (loading) {
    return <LoadingState variant="block" label="Ładowanie…" />;
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-white tracking-tight">Projekty</h2>
        <p className="text-[13px] text-white/50 mt-0.5">Strony i projekty realizowane dla Twojej firmy</p>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-12 text-center">
          <svg className="w-10 h-10 mx-auto mb-3 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p className="text-[13px] text-white/70 mb-1">Brak projektów</p>
          <p className="text-[12px] text-white/40">Projekty (np. strony WWW) pojawią się tutaj po dodaniu przez administratora</p>
        </div>
      ) : (
        <div className="border border-white/[0.06] rounded-lg overflow-hidden bg-[#0a0d1f]/40">
          <div className="grid grid-cols-[1fr_140px_140px_120px] gap-4 px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02] text-[10px] font-mono font-semibold text-white/40 uppercase tracking-[0.14em]">
            <div>Projekt</div>
            <div>Typ</div>
            <div>Status</div>
            <div className="text-right">Aktualizacja</div>
          </div>
          {projects.map((p) => {
            const meta = statusMeta[p.status] || { label: p.status, cls: 'bg-white/[0.04] border-white/[0.08] text-white/50' };
            return (
              <div key={p.id} className="grid grid-cols-[1fr_140px_140px_120px] gap-4 px-4 py-3 border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.03] transition-colors items-center">
                <div className="text-[13px] font-medium text-white truncate">{p.name}</div>
                <div className="text-[12px] text-white/60 truncate">{typeLabel[p.project_type] || p.project_type}</div>
                <div>
                  <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium border ${meta.cls}`}>
                    {meta.label}
                  </span>
                </div>
                <div className="text-[12px] text-white/50 font-mono text-right">{formatRelativeDate(p.updated_at)}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
