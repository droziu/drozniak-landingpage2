import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase-client';
import { useAuth } from '@/app/hooks/useAuth';
import { AlertModal } from './AlertModal';
import { LoadingState } from './LoadingState';
import { CustomSelect } from './CustomSelect';
import { CustomCheckbox } from './CustomCheckbox';

type ViewTag = 'documents' | 'courses' | 'marketing' | 'data' | 'projects';

interface PanelClientRow {
  id: string;
  user_id: string;
  name: string | null;
  email: string | null;
  company_name: string | null;
  marketing_client_id: string | null;
  created_at: string;
  view_tags: string[] | null;
}

interface MarketingClientOption {
  id: string;
  name: string;
  company_name: string | null;
}

const VIEW_TAGS: { value: ViewTag; label: string }[] = [
  { value: 'documents', label: 'Umowy i dokumenty' },
  { value: 'courses', label: 'Kursy' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'data', label: 'Dane' },
  { value: 'projects', label: 'Projekty' },
];

export const PanelClientsManagement: React.FC = () => {
  const { user } = useAuth();
  const [list, setList] = useState<PanelClientRow[]>([]);
  const [marketingClients, setMarketingClients] = useState<MarketingClientOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<'add' | 'edit' | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    email: '',
    name: '',
    company_name: '',
    marketing_client_id: '',
    view_tags: [] as ViewTag[],
  });
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState<{ isOpen: boolean; title: string; message: string; type: 'success' | 'error' | 'info' | 'warning' }>({ isOpen: false, title: '', message: '', type: 'info' });

  const load = async () => {
    setLoading(true);
    try {
      const [rpc, mc] = await Promise.all([
        supabase.rpc('get_panel_clients_for_admin'),
        supabase.from('marketing_clients').select('id, name, company_name').eq('status', 'active').order('name'),
      ]);
      if (rpc.error) throw rpc.error;
      setList((rpc.data as PanelClientRow[]) || []);
      setMarketingClients((mc.data as MarketingClientOption[]) || []);
    } catch (e: any) {
      setAlert({ isOpen: true, title: 'Błąd', message: e?.message || 'Nie udało się załadować listy.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) load();
  }, [user?.id]);

  const openAdd = () => {
    setEditingId(null);
    setForm({ email: '', name: '', company_name: '', marketing_client_id: '', view_tags: [] });
    setModal('add');
  };

  const openEdit = (row: PanelClientRow) => {
    setEditingId(row.id);
    setForm({
      email: row.email || '',
      name: row.name || '',
      company_name: row.company_name || '',
      marketing_client_id: row.marketing_client_id || '',
      view_tags: (row.view_tags || []) as ViewTag[],
    });
    setModal('edit');
  };

  const handleSave = async () => {
    if (!user) return;
    if (form.view_tags.length === 0) {
      setAlert({ isOpen: true, title: 'Błąd', message: 'Wybierz co najmniej jeden widok.', type: 'error' });
      return;
    }

    setSaving(true);
    try {
      if (modal === 'add') {
        const { data: uid, error: eu } = await supabase.rpc('get_user_id_by_email', { em: form.email.trim() });
        if (eu || !uid) {
          setAlert({ isOpen: true, title: 'Błąd', message: 'Nie znaleziono użytkownika o podanym adresie e‑mail. Użytkownik musi istnieć w systemie (np. utwórz go w Supabase Dashboard).', type: 'error' });
          setSaving(false);
          return;
        }
        const { data: pc, error: ep } = await supabase
          .from('panel_clients')
          .insert({
            user_id: uid,
            name: form.name.trim() || null,
            email: form.email.trim() || null,
            company_name: form.company_name.trim() || null,
            marketing_client_id: form.marketing_client_id || null,
            created_by: user.id,
          })
          .select('id')
          .single();
        if (ep) throw ep;
        for (const tag of form.view_tags) {
          await supabase.from('client_view_grants').insert({
            client_id: pc.id,
            view_tag: tag,
            granted_by: user.id,
          });
        }
        setAlert({ isOpen: true, title: 'Sukces', message: 'Użytkownik panelu został dodany.', type: 'success' });
      } else if (modal === 'edit' && editingId) {
        await supabase
          .from('panel_clients')
          .update({
            name: form.name.trim() || null,
            company_name: form.company_name.trim() || null,
            marketing_client_id: form.marketing_client_id || null,
          })
          .eq('id', editingId);
        await supabase.from('client_view_grants').delete().eq('client_id', editingId);
        for (const tag of form.view_tags) {
          await supabase.from('client_view_grants').insert({
            client_id: editingId,
            view_tag: tag,
            granted_by: user.id,
          });
        }
        setAlert({ isOpen: true, title: 'Sukces', message: 'Zmiany zapisane.', type: 'success' });
      }
      setModal(null);
      setEditingId(null);
      await load();
    } catch (e: any) {
      setAlert({ isOpen: true, title: 'Błąd', message: e?.message || 'Nie udało się zapisać.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-semibold text-white tracking-tight">Konta klienckie</h2>
          <p className="text-[13px] text-white/50 mt-0.5">Użytkownicy panelu klienta i ich dostępy do modułów</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#fee715] text-[#050714] rounded-md text-[13px] font-semibold hover:brightness-110 transition-all shadow-sm shadow-[#fee715]/20"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Dodaj użytkownika
        </button>
      </div>

      {loading ? (
        <LoadingState variant="block" skeleton="table" label="Ładowanie…" />
      ) : list.length === 0 ? (
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-12 text-center">
          <svg className="w-10 h-10 mx-auto mb-3 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <p className="text-[13px] text-white/70 mb-1">Brak użytkowników</p>
          <p className="text-[12px] text-white/40">Dodaj e-mail istniejącego użytkownika i przyznaj dostęp do modułów</p>
        </div>
      ) : (
        <div className="border border-white/[0.06] rounded-lg overflow-hidden bg-[#0a0d1f]/40">
          <div className="grid grid-cols-[1fr_180px_1fr_100px] gap-4 px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02] text-[10px] font-mono font-semibold text-white/40 uppercase tracking-[0.14em]">
            <div>Email</div>
            <div>Nazwa</div>
            <div>Moduły</div>
            <div className="text-right">Akcje</div>
          </div>
          {list.map((row) => (
            <div
              key={row.id}
              className="group grid grid-cols-[1fr_180px_1fr_100px] gap-4 px-4 py-3 border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.03] transition-colors items-center"
            >
              <div className="text-[12px] text-white truncate font-mono">{row.email || <span className="text-white/30 font-sans">—</span>}</div>
              <div className="text-[12px] text-white/70 truncate">{row.name || row.company_name || <span className="text-white/30">—</span>}</div>
              <div className="flex flex-wrap gap-1">
                {(row.view_tags || []).length === 0 ? (
                  <span className="text-[12px] text-white/30">—</span>
                ) : (
                  (row.view_tags || []).map((tag) => (
                    <span key={tag} className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-white/[0.05] border border-white/[0.08] text-white/70 uppercase tracking-wide">
                      {tag}
                    </span>
                  ))
                )}
              </div>
              <div className="flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(row)} className="p-1.5 hover:bg-white/[0.08] rounded text-white/50 hover:text-white transition-colors" title="Edytuj">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setModal(null)}>
          <div className="bg-[#0a0d1f] rounded-xl p-5 border border-white/[0.08] max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-base font-semibold text-white tracking-tight mb-4">{modal === 'add' ? 'Dodaj użytkownika' : 'Edytuj uprawnienia'}</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-mono font-semibold text-white/50 uppercase tracking-[0.14em] mb-1.5">Email <span className="text-red-400 normal-case font-sans tracking-normal">*</span></label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  disabled={modal === 'edit'}
                  placeholder="email@example.com"
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-md px-3 py-2 text-[13px] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 transition-colors disabled:opacity-50"
                />
                {modal === 'add' && <p className="text-[11px] text-white/35 mt-1">Użytkownik musi już istnieć w systemie auth.</p>}
              </div>
              <div>
                <label className="block text-[10px] font-mono font-semibold text-white/50 uppercase tracking-[0.14em] mb-1.5">Nazwa</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Imię / nazwisko"
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-md px-3 py-2 text-[13px] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono font-semibold text-white/50 uppercase tracking-[0.14em] mb-1.5">Firma</label>
                <input
                  type="text"
                  value={form.company_name}
                  onChange={(e) => setForm((f) => ({ ...f, company_name: e.target.value }))}
                  placeholder="Nazwa firmy"
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-md px-3 py-2 text-[13px] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono font-semibold text-white/50 uppercase tracking-[0.14em] mb-1.5">Klient marketingowy (dla lejków)</label>
                <CustomSelect
                  value={form.marketing_client_id}
                  onChange={(v) => setForm((f) => ({ ...f, marketing_client_id: v }))}
                  placeholder="Brak przypisania"
                  options={[
                    { value: '', label: 'Brak przypisania' },
                    ...marketingClients.map((c) => ({
                      value: c.id,
                      label: c.company_name ? `${c.name} (${c.company_name})` : c.name,
                    })),
                  ]}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono font-semibold text-white/50 uppercase tracking-[0.14em] mb-2">Dostęp do modułów <span className="text-red-400 normal-case font-sans tracking-normal">*</span></label>
                <div className="grid grid-cols-2 gap-1.5">
                  {VIEW_TAGS.map(({ value, label }) => (
                    <CustomCheckbox
                      key={value}
                      checked={form.view_tags.includes(value)}
                      onChange={(c) =>
                        setForm((f) => ({
                          ...f,
                          view_tags: c
                            ? (f.view_tags.includes(value) ? f.view_tags : [...f.view_tags, value])
                            : f.view_tags.filter((x) => x !== value),
                        }))
                      }
                      label={label}
                      className="text-[12px]"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 bg-[#fee715] text-[#050714] text-[13px] font-semibold py-2 px-4 rounded-md hover:brightness-110 transition-all shadow-sm shadow-[#fee715]/20 disabled:opacity-50"
              >
                {saving ? 'Zapisywanie…' : 'Zapisz'}
              </button>
              <button
                onClick={() => setModal(null)}
                className="px-3 py-2 bg-white/[0.04] border border-white/[0.08] text-white/80 text-[13px] font-medium rounded-md hover:bg-white/[0.08] hover:text-white transition-colors"
              >
                Anuluj
              </button>
            </div>
          </div>
        </div>
      )}

      <AlertModal isOpen={alert.isOpen} title={alert.title} message={alert.message} type={alert.type} onClose={() => setAlert((a) => ({ ...a, isOpen: false }))} />
    </div>
  );
};
