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

  const FIELD_INPUT = "w-full bg-white/[0.03] border border-white/[0.08] rounded-md px-3 py-2 text-[13px] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 transition-colors";
  const FIELD_LABEL = "block text-[10px] font-mono font-semibold text-white/50 uppercase tracking-[0.14em] mb-1.5";

  return (
    <div className="max-w-2xl space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-white tracking-tight">Dane konta</h2>
        <p className="text-[13px] text-white/50 mt-0.5">Zaktualizuj swoje dane kontaktowe i firmowe</p>
      </div>

      <form onSubmit={onSave} className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-5 space-y-4">
        {/* Sekcja: identyfikacja */}
        <div>
          <div className="text-[10px] font-mono font-semibold text-white/30 uppercase tracking-[0.16em] mb-3 pb-2 border-b border-white/[0.05]">Identyfikacja</div>
          <div className="space-y-3">
            <div>
              <label className={FIELD_LABEL}>Email</label>
              <input type="email" value={profileData.email} readOnly disabled className={`${FIELD_INPUT} disabled:opacity-50 font-mono`} />
              <p className="text-[11px] text-white/35 mt-1">Email nie można zmienić — skontaktuj się z administratorem</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={FIELD_LABEL}>Imię</label>
                <input type="text" value={profileData.first_name} onChange={(e) => setProfileData((p) => ({ ...p, first_name: e.target.value }))} placeholder="Imię" className={FIELD_INPUT} />
              </div>
              <div>
                <label className={FIELD_LABEL}>Nazwisko</label>
                <input type="text" value={profileData.last_name} onChange={(e) => setProfileData((p) => ({ ...p, last_name: e.target.value }))} placeholder="Nazwisko" className={FIELD_INPUT} />
              </div>
            </div>
            <div>
              <label className={FIELD_LABEL}>Preferowane imię</label>
              <input
                type="text"
                value={profileData.display_name}
                onChange={(e) => setProfileData((p) => ({ ...p, display_name: e.target.value }))}
                placeholder="np. Franek"
                className={FIELD_INPUT}
              />
              <p className="text-[11px] text-white/35 mt-1">Tak będziesz widoczny w komentarzach i historii zmian</p>
            </div>
          </div>
        </div>

        {/* Sekcja: firma */}
        <div>
          <div className="text-[10px] font-mono font-semibold text-white/30 uppercase tracking-[0.16em] mb-3 pb-2 border-b border-white/[0.05]">Firma i kontakt</div>
          <div className="space-y-3">
            <div>
              <label className={FIELD_LABEL}>Nazwa firmy</label>
              <input type="text" value={profileData.company_name} onChange={(e) => setProfileData((p) => ({ ...p, company_name: e.target.value }))} placeholder="Nazwa firmy" className={FIELD_INPUT} />
            </div>
            <div>
              <label className={FIELD_LABEL}>Telefon</label>
              <input type="tel" value={profileData.phone} onChange={(e) => setProfileData((p) => ({ ...p, phone: e.target.value }))} placeholder="+48 ..." className={FIELD_INPUT} />
            </div>
          </div>
        </div>

        {/* Sekcja: notatki */}
        <div>
          <div className="text-[10px] font-mono font-semibold text-white/30 uppercase tracking-[0.16em] mb-3 pb-2 border-b border-white/[0.05]">Cele i notatki</div>
          <div>
            <label className={FIELD_LABEL}>Twoje cele biznesowe / kontekst</label>
            <textarea
              value={profileData.notes}
              onChange={(e) => setProfileData((p) => ({ ...p, notes: e.target.value }))}
              placeholder="Opisz swoje cele, kontekst biznesowy, czego oczekujesz od współpracy…"
              rows={4}
              className={`${FIELD_INPUT} resize-none`}
            />
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-white/[0.05]">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-[#fee715] text-[#050714] text-[13px] font-semibold rounded-md hover:brightness-110 transition-all shadow-sm shadow-[#fee715]/20 disabled:opacity-50"
          >
            {saving ? 'Zapisywanie…' : 'Zapisz zmiany'}
          </button>
        </div>
      </form>
      <AlertModal isOpen={alert.isOpen} title={alert.title} message={alert.message} type={alert.type} onClose={() => setAlert((a) => ({ ...a, isOpen: false }))} />
    </div>
  );
};
