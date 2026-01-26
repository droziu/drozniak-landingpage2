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
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-[Montserrat] text-lg font-bold text-white">Klienci panelu</h2>
          <p className="text-gray-400 text-xs">Użytkownicy panelu klienta i przypisane widoki (Umowy, Kursy, Marketing, Dane, Projekty)</p>
        </div>
        <button
          onClick={openAdd}
          className="px-4 py-2 bg-[#fee715] text-[#101820] text-sm font-semibold rounded-lg hover:bg-[#fee715]/90"
        >
          + Dodaj użytkownika
        </button>
      </div>

      {loading ? (
        <LoadingState variant="block" skeleton="table" label="Ładowanie użytkowników…" />
      ) : list.length === 0 ? (
        <div className="py-8 px-4 rounded-lg bg-white/5 border border-white/10 text-center text-gray-400 text-sm">
          Brak użytkowników. Kliknij „Dodaj użytkownika” i podaj e‑mail istniejącego użytkownika oraz wybierz widoki.
        </div>
      ) : (
        <div className="border border-white/10 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Email</th>
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Nazwa</th>
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Widoki</th>
                <th className="text-right py-2 px-3 text-gray-400 font-medium">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {list.map((row) => (
                <tr key={row.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-2 px-3 text-white">{row.email || '—'}</td>
                  <td className="py-2 px-3 text-gray-300">{row.name || row.company_name || '—'}</td>
                  <td className="py-2 px-3 text-gray-400">
                    {(row.view_tags || []).join(', ') || '—'}
                  </td>
                  <td className="py-2 px-3 text-right">
                    <button onClick={() => openEdit(row)} className="text-[#00C9A7] hover:underline text-xs">Edytuj</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setModal(null)} />
          <div className="relative bg-[#18232F] rounded-xl p-5 border border-white/10 max-w-md w-full">
            <h3 className="text-base font-semibold text-white mb-4">{modal === 'add' ? 'Dodaj użytkownika panelu' : 'Edytuj uprawnienia'}</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">E‑mail *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  disabled={modal === 'edit'}
                  placeholder="email@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-500 disabled:opacity-60"
                />
                {modal === 'add' && <p className="text-xs text-gray-500 mt-1">Użytkownik musi już istnieć w systemie (auth).</p>}
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Nazwa</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Imię / firma"
                  className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Nazwa firmy</label>
                <input
                  type="text"
                  value={form.company_name}
                  onChange={(e) => setForm((f) => ({ ...f, company_name: e.target.value }))}
                  placeholder="Firma"
                  className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Klient marketingowy (dla lejków)</label>
                <CustomSelect
                  value={form.marketing_client_id}
                  onChange={(v) => setForm((f) => ({ ...f, marketing_client_id: v }))}
                  placeholder="— Brak —"
                  options={[
                    { value: '', label: '— Brak —' },
                    ...marketingClients.map((c) => ({
                      value: c.id,
                      label: c.company_name ? `${c.name} (${c.company_name})` : c.name,
                    })),
                  ]}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-2">Widoki (co najmniej jeden) *</label>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
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
                      className="text-sm"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-[#fee715] text-[#101820] text-sm font-semibold rounded-lg hover:bg-[#fee715]/90 disabled:opacity-50">
                {saving ? 'Zapisywanie…' : 'Zapisz'}
              </button>
              <button onClick={() => setModal(null)} className="px-4 py-2 bg-white/10 text-white text-sm rounded-lg hover:bg-white/20">Anuluj</button>
            </div>
          </div>
        </div>
      )}

      <AlertModal isOpen={alert.isOpen} title={alert.title} message={alert.message} type={alert.type} onClose={() => setAlert((a) => ({ ...a, isOpen: false }))} />
    </div>
  );
};
