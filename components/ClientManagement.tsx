import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-[Montserrat] text-2xl font-bold text-white mb-2">
            Zarządzanie Klientami
          </h2>
          <p className="text-gray-400 text-sm">
            Dodawaj i zarządzaj klientami marketingowymi
          </p>
        </div>
        <button
          onClick={handleAddClient}
          className="px-6 py-3 bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold rounded-xl hover:shadow-2xl hover:shadow-[#fee715]/40 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Dodaj Klienta
        </button>
      </div>

      {/* Filtry */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            filterStatus === 'all'
              ? 'bg-[#fee715] text-[#101820]'
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
        >
          Wszyscy
        </button>
        <button
          onClick={() => setFilterStatus('active')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            filterStatus === 'active'
              ? 'bg-green-500 text-white'
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
        >
          Aktywni
        </button>
        <button
          onClick={() => setFilterStatus('inactive')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            filterStatus === 'inactive'
              ? 'bg-yellow-500 text-white'
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
        >
          Nieaktywni
        </button>
        <button
          onClick={() => setFilterStatus('archived')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            filterStatus === 'archived'
              ? 'bg-gray-500 text-white'
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
        >
          Zarchiwizowani
        </button>
      </div>

      {/* Lista klientów */}
      {loading ? (
        <LoadingState variant="block" skeleton="cards" label="Ładowanie klientów…" />
      ) : filteredClients.length === 0 ? (
        <div className="bg-white/5 rounded-xl p-12 text-center text-gray-400">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="text-lg mb-2">Brak klientów</p>
          <p className="text-sm">Kliknij "Dodaj Klienta", aby rozpocząć</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className="bg-gradient-to-br from-white/5 to-white/3 rounded-xl p-6 border-2 border-white/10 hover:border-[#fee715]/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-[Montserrat] font-bold text-white text-lg mb-1">
                    {client.name}
                  </h3>
                  {client.company_name && (
                    <p className="text-gray-400 text-sm mb-2">{client.company_name}</p>
                  )}
                </div>
                <span
                  className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                    client.status === 'active'
                      ? 'bg-green-500/20 text-green-300 border border-green-500/50'
                      : client.status === 'inactive'
                      ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/50'
                      : 'bg-gray-500/20 text-gray-300 border border-gray-500/50'
                  }`}
                >
                  {client.status === 'active' ? 'Aktywny' : client.status === 'inactive' ? 'Nieaktywny' : 'Zarchiwizowany'}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-300 mb-4">
                {client.email && (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="truncate">{client.email}</span>
                  </div>
                )}
                {client.phone && (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{client.phone}</span>
                  </div>
                )}
              </div>

              {client.notes && (
                <div className="mb-4 p-3 bg-white/5 rounded-lg">
                  <p className="text-xs text-gray-400 mb-1">Notatki:</p>
                  <p className="text-sm text-gray-300 line-clamp-2">{client.notes}</p>
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t border-white/10">
                <button
                  onClick={() => handleEditClient(client)}
                  className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all text-sm font-semibold"
                >
                  Edytuj
                </button>
                <button
                  onClick={() => handleDeleteClient(client.id)}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-all text-sm font-semibold"
                >
                  Usuń
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal dodawania/edycji */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-gradient-to-br from-[#18232F] to-[#101820] rounded-2xl p-6 border-2 border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="font-[Montserrat] text-2xl font-bold text-white mb-6">
              {editingClient ? 'Edytuj Klienta' : 'Dodaj Nowego Klienta'}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nazwa * <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-[#fee715]"
                  placeholder="Nazwa klienta"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-[#fee715]"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nazwa Firmy</label>
                <input
                  type="text"
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-[#fee715]"
                  placeholder="Nazwa firmy"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Telefon</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-[#fee715]"
                  placeholder="+48 123 456 789"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
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
                <label className="block text-sm font-medium text-gray-300 mb-2">Notatki</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-[#fee715] min-h-[100px]"
                  placeholder="Dodatkowe notatki o kliencie..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSaveClient}
                className="flex-1 bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold py-3 px-4 rounded-xl hover:shadow-lg hover:shadow-[#fee715]/40 transition-all duration-300"
              >
                {editingClient ? 'Zaktualizuj' : 'Dodaj'}
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-[Montserrat] font-semibold rounded-xl transition-all duration-300"
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
