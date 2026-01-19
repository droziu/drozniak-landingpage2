import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { PanelClient } from '../hooks/useClientPanel';
import { LoadingState } from './LoadingState';

interface FunnelRow {
  id: string;
  project_name: string;
  status: string;
  updated_at: string;
}

interface ClientMarketingViewProps {
  panelClient: PanelClient | null;
}

export const ClientMarketingView: React.FC<ClientMarketingViewProps> = ({ panelClient }) => {
  const navigate = useNavigate();
  const [funnels, setFunnels] = useState<FunnelRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!panelClient?.marketing_client_id) {
      setFunnels([]);
      setLoading(false);
      return;
    }
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('funnel_diagrams')
        .select('id, project_name, status, updated_at')
        .in('status', ['active', 'draft']); // Pokaż również szkice (draft) dla klienta
      if (error) {
        setFunnels([]);
        setLoading(false);
        return;
      }
      const { data: access } = await supabase
        .from('funnel_access')
        .select('funnel_id')
        .eq('client_id', panelClient.marketing_client_id);
      const allowed = new Set((access || []).map((a) => a.funnel_id));
      setFunnels((data || []).filter((f) => allowed.has(f.id)));
      setLoading(false);
    })();
  }, [panelClient?.marketing_client_id]);

  if (loading) {
    return <LoadingState variant="block" label="Ładowanie lejków…" />;
  }

  if (!panelClient?.marketing_client_id || funnels.length === 0) {
    return (
      <div className="py-8 px-4 rounded-lg bg-white/5 border border-white/10 text-center">
        <p className="text-gray-400 text-sm">Brak lejków</p>
        <p className="text-gray-500 text-xs mt-1">Lejki marketingowe przypisane do Twojego konta pojawią się tutaj.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-base font-semibold text-white mb-3">Lejki marketingowe</h2>
      <ul className="divide-y divide-white/10">
        {funnels.map((f) => (
          <li key={f.id} className="py-3 flex items-center justify-between gap-3">
            <span className="text-white text-sm">{f.project_name}</span>
            <button
              type="button"
              onClick={() => navigate(`/panel/marketing/${f.id}`)}
              className="text-xs text-[#00C9A7] hover:underline"
            >
              Otwórz
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
