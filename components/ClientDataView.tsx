import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/hooks/useAuth';
import { supabase } from '@/lib/supabase-client';
import { AlertModal } from './AlertModal';
import { LoadingState } from './LoadingState';

interface ProfileData {
  company_name: string;
  first_name: string;
  last_name: string;
  phone: string;
  notes: string;
  email: string;
  display_name: string;
}

export const ClientDataView: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    company_name: '', first_name: '', last_name: '', phone: '', notes: '', email: '', display_name: '',
  });
  const [alert, setAlert] = useState<{ isOpen: boolean; title: string; message: string; type: 'success' | 'error' | 'info' | 'warning' }>({
    isOpen: false, title: '', message: '', type: 'info',
  });

  useEffect(() => {
    if (!user) return;
    setProfileData((p) => ({ ...p, email: user.email || '' }));
    (async () => {
      const [profileRes, panelClientRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).maybeSingle(),
        // Używamy select('*') zamiast tylko display_name - jeśli kolumna nie istnieje, zwróci błąd, ale możemy go obsłużyć
        supabase.from('panel_clients').select('*').eq('user_id', user.id).maybeSingle(),
      ]);
      
      if (!profileRes.error && profileRes.data) {
        setProfileData((p) => ({
          ...p,
          company_name: profileRes.data.company_name || '',
          first_name: profileRes.data.first_name || '',
          last_name: profileRes.data.last_name || '',
          phone: profileRes.data.phone || '',
          notes: profileRes.data.notes || '',
          email: user.email || '',
        }));
      }
      
      // Obsługa panel_clients - jeśli jest błąd 400 (kolumna nie istnieje), ignoruj
      if (!panelClientRes.error && panelClientRes.data) {
        setProfileData((p) => ({
          ...p,
          display_name: (panelClientRes.data as any)?.display_name || '',
        }));
      } else if (panelClientRes.error && panelClientRes.error.code !== 'PGRST116' && panelClientRes.error.message?.includes('400')) {
        // Błąd 400 - prawdopodobnie kolumna display_name nie istnieje
        // Zignoruj błąd - display_name pozostanie pusty
        console.warn('Kolumna display_name może nie istnieć w panel_clients:', panelClientRes.error);
      }
      
      setLoading(false);
    })();
  }, [user?.id]);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      const fullName = [profileData.first_name, profileData.last_name].filter(Boolean).join(' ') || null;
      
      // Zapisz do profiles
      const { error: profileError } = await supabase.from('profiles').upsert({
        id: user.id,
        company_name: profileData.company_name || null,
        first_name: profileData.first_name || null,
        last_name: profileData.last_name || null,
        phone: profileData.phone || null,
        notes: profileData.notes || null,
        full_name: fullName,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'id' });
      if (profileError) throw profileError;
      
      // Zapisz display_name do panel_clients (jeśli istnieje)
      const { data: pcData } = await supabase
        .from('panel_clients')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (pcData) {
        const { error: pcError } = await supabase
          .from('panel_clients')
          .update({ display_name: profileData.display_name.trim() || null })
          .eq('id', pcData.id);
        if (pcError) throw pcError;
      }
      
      setAlert({ isOpen: true, title: 'Sukces', message: 'Dane zapisane.', type: 'success' });
    } catch (err: any) {
      setAlert({ isOpen: true, title: 'Błąd', message: err?.message || 'Błąd zapisu.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingState variant="inline" label="Ładowanie danych…" />;

  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold text-white">Dane</h2>
      <form onSubmit={onSave} className="bg-white/5 rounded-lg p-4 border border-white/10 space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">Email</label>
          <input type="email" value={profileData.email} readOnly disabled className="w-full bg-white/10 border border-white/10 rounded px-3 py-2 text-sm text-gray-400" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">Nazwa firmy</label>
          <input type="text" value={profileData.company_name} onChange={(e) => setProfileData((p) => ({ ...p, company_name: e.target.value }))} placeholder="Nazwa firmy" className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:ring-1 focus:ring-[#fee715] focus:border-[#fee715]" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Imię</label>
            <input type="text" value={profileData.first_name} onChange={(e) => setProfileData((p) => ({ ...p, first_name: e.target.value }))} placeholder="Imię" className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:ring-1 focus:ring-[#fee715] focus:border-[#fee715]" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Nazwisko</label>
            <input type="text" value={profileData.last_name} onChange={(e) => setProfileData((p) => ({ ...p, last_name: e.target.value }))} placeholder="Nazwisko" className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:ring-1 focus:ring-[#fee715] focus:border-[#fee715]" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">Telefon</label>
          <input type="tel" value={profileData.phone} onChange={(e) => setProfileData((p) => ({ ...p, phone: e.target.value }))} placeholder="Telefon" className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:ring-1 focus:ring-[#fee715] focus:border-[#fee715]" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">Preferowane imię</label>
          <input
            type="text"
            value={profileData.display_name}
            onChange={(e) => setProfileData((p) => ({ ...p, display_name: e.target.value }))}
            placeholder="np. Franek"
            className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:ring-1 focus:ring-[#fee715] focus:border-[#fee715]"
          />
          <p className="text-xs text-gray-500 mt-1">Opcjonalne pole z preferowaną formą imienia.</p>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">Notatki / cele</label>
          <textarea value={profileData.notes} onChange={(e) => setProfileData((p) => ({ ...p, notes: e.target.value }))} placeholder="Notatki..." rows={3} className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:ring-1 focus:ring-[#fee715] focus:border-[#fee715] resize-none" />
        </div>
        <div className="pt-2">
          <button type="submit" disabled={saving} className="px-4 py-2 bg-[#fee715] text-[#101820] text-sm font-semibold rounded-lg hover:bg-[#fee715]/90 disabled:opacity-50">
            {saving ? 'Zapisywanie…' : 'Zapisz'}
          </button>
        </div>
      </form>
      <AlertModal isOpen={alert.isOpen} title={alert.title} message={alert.message} type={alert.type} onClose={() => setAlert((a) => ({ ...a, isOpen: false }))} />
    </div>
  );
};
