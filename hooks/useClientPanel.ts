import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export type ViewTag = 'documents' | 'courses' | 'marketing' | 'data' | 'projects';

export interface PanelClient {
  id: string;
  marketing_client_id: string | null;
}

export const useClientPanel = () => {
  const { user } = useAuth();
  const [panelClient, setPanelClient] = useState<PanelClient | null>(null);
  const [viewGrants, setViewGrants] = useState<ViewTag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setPanelClient(null);
      setViewGrants([]);
      setLoading(false);
      return;
    }
    load();
  }, [user?.id]);

  const load = async () => {
    if (!user) return;
    setLoading(true);
    try {
      console.log('useClientPanel: loading for user', user.id, user.email);
      // Używamy funkcji SECURITY DEFINER zamiast bezpośredniego zapytania - omija RLS
      const [pcRes, grantsRes] = await Promise.all([
        supabase.rpc('get_my_panel_client'),
        supabase.rpc('get_my_view_grants'),
      ]);

      console.log('useClientPanel: pcRes (from RPC)', pcRes);
      console.log('useClientPanel: pcRes.data', pcRes.data);
      console.log('useClientPanel: pcRes.error', pcRes.error);
      console.log('useClientPanel: grantsRes', grantsRes);
      console.log('useClientPanel: grantsRes.data', grantsRes.data);
      console.log('useClientPanel: grantsRes.error', grantsRes.error);

      if (pcRes.error) {
        console.error('useClientPanel: get_my_panel_client error', pcRes.error);
        console.error('useClientPanel: error details', JSON.stringify(pcRes.error, null, 2));
        setPanelClient(null);
        setViewGrants([]);
        return;
      }

      // get_my_panel_client zwraca TABLE, więc data to array
      const pcData = Array.isArray(pcRes.data) && pcRes.data.length > 0 ? pcRes.data[0] : null;
      setPanelClient(pcData ? { id: pcData.id, marketing_client_id: pcData.marketing_client_id } : null);

      // Jeśli nie ma panel_clients, nie ma też view_grants
      if (!pcData) {
        setViewGrants([]);
        return;
      }

      if (grantsRes.error) {
        console.error('useClientPanel: get_my_view_grants error', grantsRes.error);
        setViewGrants([]);
        return;
      }

      const tags = (Array.isArray(grantsRes.data) ? grantsRes.data : []) as string[];
      setViewGrants(tags.filter((t): t is ViewTag => ['documents','courses','marketing','data','projects'].includes(t)));
    } catch (e) {
      console.error('useClientPanel load error:', e);
      setPanelClient(null);
      setViewGrants([]);
    } finally {
      setLoading(false);
    }
  };

  return { panelClient, viewGrants, loading, reload: load };
};
