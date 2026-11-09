import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/hooks/useAuth';
import { supabase } from '@/lib/supabase-client';
import { AlertModal } from './AlertModal';
import { ConfirmModal } from './ConfirmModal';
import { CustomSelect } from './CustomSelect';
import { LoadingState } from './LoadingState';

interface MarketingClient {
  id: string;
  name: string;
  email: string | null;
  company_name: string | null;
  phone: string | null;
  notes: string | null;
  status: 'active' | 'inactive' | 'archived';
  created_by: string;
  created_at: string;
  updated_at: string;
}

export const ClientManagement: React.FC = () => {
  const { user } = useAuth();
  const [clients, setClients] = useState<MarketingClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingClient, setEditingClient] = useState<MarketingClient | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company_name: '',
    phone: '',
    notes: '',
    status: 'active' as 'active' | 'inactive' | 'archived',
  });
  const [alertModal, setAlertModal] = useState<{ isOpen: boolean; title: string; message: string; type: 'success' | 'error' | 'info' | 'warning' }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
  });
  const [confirmModal, setConfirmModal] = useState<{ isOpen: boolean; title: string; message: string; onConfirm: () => void }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'archived'>('all');

  useEffect(() => {
    if (user) {
      loadClients();
    }
  }, [user, filterStatus]);

  const loadClients = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('marketing_clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (filterStatus !== 'all') {
        query = query.eq('status', filterStatus);
      }

      const { data, error } = await query;

      if (error) throw error;

      setClients(data || []);
    } catch (error: any) {
      console.error('Błąd ładowania klientów:', error);
      setAlertModal({
        isOpen: true,
        title: 'Błąd',
        message: 'Nie udało się załadować klientów: ' + (error.message || 'Nieznany błąd'),
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddClient = () => {
    setEditingClient(null);
    setFormData({
      name: '',
      email: '',
      company_name: '',
      phone: '',
      notes: '',
      status: 'active',
    });
    setShowAddModal(true);
  };

  const handleEditClient = (client: MarketingClient) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      email: client.email || '',
      company_name: client.company_name || '',
      phone: client.phone || '',
      notes: client.notes || '',
      status: client.status,
    });
    setShowAddModal(true);
  };

  const handleSaveClient = async () => {
    if (!user || !formData.name.trim()) {
      setAlertModal({
        isOpen: true,
        title: 'Błąd',
        message: 'Nazwa klienta jest wymagana.',
        type: 'error',
      });
      return;
    }

    try {
      if (editingClient) {
        // Aktualizuj istniejącego klienta
        const { error } = await supabase
          .from('marketing_clients')
          .update({
            name: formData.name.trim(),
            email: formData.email.trim() || null,
            company_name: formData.company_name.trim() || null,
            phone: formData.phone.trim() || null,
            notes: formData.notes.trim() || null,
            status: formData.status,
          })
          .eq('id', editingClient.id);

        if (error) throw error;

        setAlertModal({
          isOpen: true,
          title: 'Sukces',
          message: 'Klient został zaktualizowany.',
          type: 'success',
        });
      } else {
        // Dodaj nowego klienta
        const { error } = await supabase
          .from('marketing_clients')
          .insert({
            name: formData.name.trim(),
            email: formData.email.trim() || null,
            company_name: formData.company_name.trim() || null,
            phone: formData.phone.trim() || null,
            notes: formData.notes.trim() || null,
            status: formData.status,
            created_by: user.id,
          });

        if (error) throw error;

        setAlertModal({
          isOpen: true,
          title: 'Sukces',
          message: 'Klient został dodany.',
          type: 'success',
        });
      }

      setShowAddModal(false);
      await loadClients();
    } catch (error: any) {
      console.error('Błąd zapisywania klienta:', error);
      setAlertModal({
        isOpen: true,
        title: 'Błąd',
        message: 'Nie udało się zapisać klienta: ' + (error.message || 'Nieznany błąd'),
        type: 'error',
      });
    }
  };

  const handleDeleteClient = (clientId: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Potwierdź usunięcie',
      message: 'Czy na pewno chcesz usunąć tego klienta? Ta operacja jest nieodwracalna.',
      onConfirm: async () => {
        setConfirmModal({ ...confirmModal, isOpen: false });
        try {
          const { error } = await supabase
            .from('marketing_clients')
            .delete()
            .eq('id', clientId);

          if (error) throw error;

          setAlertModal({
            isOpen: true,
            title: 'Sukces',
            message: 'Klient został usunięty.',
            type: 'success',
          });

          await loadClients();
        } catch (error: any) {
          console.error('Błąd usuwania klienta:', error);
          setAlertModal({
            isOpen: true,
            title: 'Błąd',
            message: 'Nie udało się usunąć klienta: ' + (error.message || 'Nieznany błąd'),
            type: 'error',
          });
        }
      },
    });
  };

  const filteredClients = filterStatus === 'all' 
    ? clients 
    : clients.filter(c => c.status === filterStatus);

  const statusMeta: Record<string, { label: string; cls: string }> = {
    active: { label: 'Aktywny', cls: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300' },
    inactive: { label: 'Nieaktywny', cls: 'bg-amber-500/15 border-amber-500/30 text-amber-300' },
    archived: { label: 'Archiwum', cls: 'bg-white/[0.04] border-white/[0.08] text-white/50' },
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-semibold text-white tracking-tight">Klienci</h2>
          <p className="text-[13px] text-white/50 mt-0.5">Klienci marketingowi do lejków, ofert i dokumentów</p>
        </div>
        <button
          onClick={handleAddClient}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#fee715] text-[#050714] rounded-md text-[13px] font-semibold hover:brightness-110 transition-all shadow-sm shadow-[#fee715]/20"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Dodaj klienta
        </button>
      </div>

      {/* Filter chips */}
      <div className="mb-5 flex gap-1 p-1 bg-white/[0.03] border border-white/[0.06] rounded-md w-fit">
        {(['all', 'active', 'inactive', 'archived'] as const).map((s) => {
          const labels = { all: 'Wszyscy', active: 'Aktywni', inactive: 'Nieaktywni', archived: 'Archiwum' };
          return (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-2.5 py-1 rounded text-[12px] font-medium transition-colors ${
                filterStatus === s
                  ? 'bg-white/[0.08] text-white'
                  : 'text-white/55 hover:text-white/80'
              }`}
            >
              {labels[s]}
              {s !== 'all' && (
                <span className="ml-1.5 text-[10px] text-white/30 font-mono">
                  {clients.filter((c) => c.status === s).length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Lista */}
      {loading ? (
        <LoadingState variant="block" skeleton="cards" label="Ładowanie…" />
      ) : filteredClients.length === 0 ? (
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-12 text-center">
          <svg className="w-10 h-10 mx-auto mb-3 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="text-[13px] text-white/70 mb-1">
            {filterStatus === 'all' ? 'Brak klientów' : 'Brak klientów w tej kategorii'}
          </p>
          <p className="text-[12px] text-white/40">Kliknij "Dodaj klienta", aby rozpocząć</p>
        </div>
      ) : (
        <div className="border border-white/[0.06] rounded-lg overflow-hidden bg-[#0a0d1f]/40">
          <div className="grid grid-cols-[1fr_220px_140px_120px_100px] gap-4 px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02] text-[10px] font-mono font-semibold text-white/40 uppercase tracking-[0.14em]">
            <div>Klient</div>
            <div>Email</div>
            <div>Telefon</div>
            <div>Status</div>
            <div className="text-right">Akcje</div>
          </div>
          {filteredClients.map((client) => {
            const meta = statusMeta[client.status] || statusMeta.inactive;
            return (
              <div
                key={client.id}
                className="group grid grid-cols-[1fr_220px_140px_120px_100px] gap-4 px-4 py-3 border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.03] transition-colors items-center"
              >
                <div className="min-w-0">
                  <div className="text-[13px] font-medium text-white truncate">{client.name}</div>
                  {client.company_name && (
                    <div className="text-[11px] text-white/40 mt-0.5 truncate">{client.company_name}</div>
                  )}
                </div>
                <div className="text-[12px] text-white/60 truncate">
                  {client.email || <span className="text-white/30">—</span>}
                </div>
                <div className="text-[12px] text-white/60 font-mono truncate">
                  {client.phone || <span className="text-white/30 font-sans">—</span>}
                </div>
                <div>
                  <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium border ${meta.cls}`}>
                    {meta.label}
                  </span>
                </div>
                <div className="flex items-center justify-end gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEditClient(client)}
                    className="p-1.5 hover:bg-white/[0.08] rounded text-white/50 hover:text-white transition-colors"
                    title="Edytuj"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteClient(client.id)}
                    className="p-1.5 hover:bg-red-500/15 rounded text-white/50 hover:text-red-300 transition-colors"
                    title="Usuń"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal dodawania/edycji */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-[#0a0d1f] rounded-xl p-5 border border-white/[0.08] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <h3 className="text-base font-semibold text-white tracking-tight mb-4">
              {editingClient ? 'Edytuj Klienta' : 'Dodaj Nowego Klienta'}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono font-semibold text-white/50 uppercase tracking-[0.14em] mb-1.5">
                  Nazwa * <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-md px-3 py-2 text-[13px] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 transition-colors"
                  placeholder="Nazwa klienta"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-semibold text-white/50 uppercase tracking-[0.14em] mb-1.5">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-md px-3 py-2 text-[13px] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 transition-colors"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-semibold text-white/50 uppercase tracking-[0.14em] mb-1.5">Nazwa Firmy</label>
                <input
                  type="text"
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-md px-3 py-2 text-[13px] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 transition-colors"
                  placeholder="Nazwa firmy"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-semibold text-white/50 uppercase tracking-[0.14em] mb-1.5">Telefon</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-md px-3 py-2 text-[13px] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 transition-colors"
                  placeholder="+48 123 456 789"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-semibold text-white/50 uppercase tracking-[0.14em] mb-1.5">Status</label>
                <CustomSelect
                  value={formData.status}
                  onChange={(value) => setFormData({ ...formData, status: value as any })}
                  placeholder="Wybierz status"
                  options={[
                    { value: 'active', label: 'Aktywny' },
                    { value: 'inactive', label: 'Nieaktywny' },
                    { value: 'archived', label: 'Zarchiwizowany' },
                  ]}
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-semibold text-white/50 uppercase tracking-[0.14em] mb-1.5">Notatki</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-md px-3 py-2 text-[13px] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 transition-colors min-h-[100px]"
                  placeholder="Dodatkowe notatki o kliencie..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSaveClient}
                className="flex-1 bg-[#fee715] text-[#050714] text-[13px] font-semibold py-2 px-4 rounded-md hover:brightness-110 transition-all shadow-sm shadow-[#fee715]/20"
              >
                {editingClient ? 'Zaktualizuj' : 'Dodaj'}
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-3 py-2 bg-white/[0.04] border border-white/[0.08] text-white/80 text-[13px] font-medium rounded-md hover:bg-white/[0.08] hover:text-white transition-colors"
              >
                Anuluj
              </button>
            </div>
          </div>
        </div>
      )}

      <AlertModal
        isOpen={alertModal.isOpen}
        title={alertModal.title}
        message={alertModal.message}
        type={alertModal.type}
        onClose={() => setAlertModal(prev => ({ ...prev, isOpen: false }))}
      />

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText="Usuń"
        cancelText="Anuluj"
        type="danger"
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};
