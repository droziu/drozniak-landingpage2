'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import { supabase } from '@/lib/supabase-client';
import { AlertModal } from '@/components/AlertModal';
import { ConfirmModal } from '@/components/ConfirmModal';
import { CustomSelect } from '@/components/CustomSelect';
import { LoadingState } from '@/components/LoadingState';

interface FunnelDiagram {
  id: string;
  project_name: string;
  client_id: string | null;
  created_by: string;
  diagram_data: any;
  thumbnail_url: string | null;
  is_template: boolean;
  status: 'draft' | 'active' | 'archived';
  created_at: string;
  updated_at: string;
  client?: {
    id: string;
    name: string;
    company_name: string | null;
  } | null;
}

export const FunnelList: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [funnels, setFunnels] = useState<FunnelDiagram[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingFunnel, setEditingFunnel] = useState<FunnelDiagram | null>(null);
  const [newFunnelName, setNewFunnelName] = useState('');
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<'draft' | 'active' | 'archived'>('draft');
  const [clients, setClients] = useState<Array<{ id: string; name: string; company_name: string | null }>>([]);
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'active' | 'archived'>('all');
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

  useEffect(() => {
    if (user) {
      loadFunnels();
      loadClients();
    }
  }, [user, filterStatus]);

  const loadClients = async () => {
    try {
      const { data, error } = await supabase
        .from('marketing_clients')
        .select('id, name, company_name')
        .eq('status', 'active')
        .order('name', { ascending: true });

      if (error) throw error;

      setClients(data || []);
    } catch (error: any) {
      console.error('Błąd ładowania klientów:', error);
    }
  };

  const loadFunnels = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('funnel_diagrams')
        .select(`
          *,
          client:marketing_clients(id, name, company_name)
        `)
        .order('updated_at', { ascending: false });

      if (filterStatus !== 'all') {
        query = query.eq('status', filterStatus);
      }

      const { data, error } = await query;

      if (error) throw error;

      setFunnels((data || []).map((funnel: any) => ({
        ...funnel,
        client: Array.isArray(funnel.client) ? funnel.client[0] : funnel.client,
      })));
    } catch (error: any) {
      console.error('Błąd ładowania lejków:', error);
      setAlertModal({
        isOpen: true,
        title: 'Błąd',
        message: 'Nie udało się załadować lejków: ' + (error.message || 'Nieznany błąd'),
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFunnel = async () => {
    if (!user || !newFunnelName.trim()) {
      setAlertModal({
        isOpen: true,
        title: 'Błąd',
        message: 'Nazwa projektu jest wymagana.',
        type: 'error',
      });
      return;
    }

    try {
      const initialDiagramData = {
        nodes: [],
        edges: [],
        viewport: { x: 0, y: 0, zoom: 1 },
      };

      const { data, error } = await supabase
        .from('funnel_diagrams')
        .insert({
          project_name: newFunnelName.trim(),
          client_id: selectedClientId || null,
          created_by: user.id,
          diagram_data: initialDiagramData,
          status: 'draft',
        })
        .select()
        .single();

      if (error) throw error;

      // Jeśli ustawiono client_id, utwórz wpis w funnel_access
      if (selectedClientId && user) {
        const { error: accessError } = await supabase
          .from('funnel_access')
          .insert({
            funnel_id: data.id,
            client_id: selectedClientId,
            access_level: 'view',
            granted_by: user.id,
          });

        if (accessError) {
          console.warn('Błąd tworzenia wpisu w funnel_access:', accessError);
          // Nie blokujemy - lejek został utworzony
        }
      }

      setAlertModal({
        isOpen: true,
        title: 'Sukces',
        message: 'Lejek został utworzony.',
        type: 'success',
      });

      setShowAddModal(false);
      setNewFunnelName('');
      setSelectedClientId(null);
      router.push(`/admin/marketing/${data.id}`);
    } catch (error: any) {
      console.error('Błąd tworzenia lejka:', error);
      setAlertModal({
        isOpen: true,
        title: 'Błąd',
        message: 'Nie udało się utworzyć lejka: ' + (error.message || 'Nieznany błąd'),
        type: 'error',
      });
    }
  };

  const handleDeleteFunnel = (funnelId: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Potwierdź usunięcie',
      message: 'Czy na pewno chcesz usunąć ten lejek? Ta operacja jest nieodwracalna.',
      onConfirm: async () => {
        setConfirmModal({ ...confirmModal, isOpen: false });
        try {
          const { error } = await supabase
            .from('funnel_diagrams')
            .delete()
            .eq('id', funnelId);

          if (error) throw error;

          setAlertModal({
            isOpen: true,
            title: 'Sukces',
            message: 'Lejek został usunięty.',
            type: 'success',
          });

          await loadFunnels();
        } catch (error: any) {
          console.error('Błąd usuwania lejka:', error);
          setAlertModal({
            isOpen: true,
            title: 'Błąd',
            message: 'Nie udało się usunąć lejka: ' + (error.message || 'Nieznany błąd'),
            type: 'error',
          });
        }
      },
    });
  };

  const handleEditFunnel = (funnel: FunnelDiagram) => {
    setEditingFunnel(funnel);
    setNewFunnelName(funnel.project_name);
    setSelectedClientId(funnel.client_id || null);
    setSelectedStatus(funnel.status);
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    if (!editingFunnel || !newFunnelName.trim() || !user) {
      setAlertModal({
        isOpen: true,
        title: 'Błąd',
        message: 'Nazwa projektu jest wymagana.',
        type: 'error',
      });
      return;
    }

    try {
      // Aktualizuj lejek
      const { error: updateError } = await supabase
        .from('funnel_diagrams')
        .update({
          project_name: newFunnelName.trim(),
          client_id: selectedClientId || null,
          status: selectedStatus,
        })
        .eq('id', editingFunnel.id);

      if (updateError) throw updateError;

      // Jeśli ustawiono client_id, upewnij się że jest wpis w funnel_access
      if (selectedClientId) {
        // Sprawdź czy już istnieje wpis
        const { data: existingAccess } = await supabase
          .from('funnel_access')
          .select('id')
          .eq('funnel_id', editingFunnel.id)
          .eq('client_id', selectedClientId)
          .single();

        // Jeśli nie ma, utwórz wpis z access_level 'view'
        if (!existingAccess) {
          const { error: accessError } = await supabase
            .from('funnel_access')
            .insert({
              funnel_id: editingFunnel.id,
              client_id: selectedClientId,
              access_level: 'view',
              granted_by: user.id,
            });

          if (accessError) {
            console.warn('Błąd tworzenia wpisu w funnel_access:', accessError);
            // Nie blokujemy - lejek został zaktualizowany
          }
        }
      }

      setAlertModal({
        isOpen: true,
        title: 'Sukces',
        message: 'Lejek został zaktualizowany.',
        type: 'success',
      });

      setShowEditModal(false);
      setEditingFunnel(null);
      setNewFunnelName('');
      setSelectedClientId(null);
      setSelectedStatus('draft');
      await loadFunnels();
    } catch (error: any) {
      console.error('Błąd aktualizacji lejka:', error);
      setAlertModal({
        isOpen: true,
        title: 'Błąd',
        message: 'Nie udało się zaktualizować lejka: ' + (error.message || 'Nieznany błąd'),
        type: 'error',
      });
    }
  };

  const handleDuplicateFunnel = async (funnel: FunnelDiagram) => {
    try {
      const { data, error } = await supabase
        .from('funnel_diagrams')
        .insert({
          project_name: `${funnel.project_name} (Kopia)`,
          client_id: funnel.client_id,
          created_by: user?.id,
          diagram_data: funnel.diagram_data,
          status: 'draft',
        })
        .select()
        .single();

      if (error) throw error;

      setAlertModal({
        isOpen: true,
        title: 'Sukces',
        message: 'Lejek został skopiowany.',
        type: 'success',
      });

      await loadFunnels();
    } catch (error: any) {
      console.error('Błąd kopiowania lejka:', error);
      setAlertModal({
        isOpen: true,
        title: 'Błąd',
        message: 'Nie udało się skopiować lejka: ' + (error.message || 'Nieznany błąd'),
        type: 'error',
      });
    }
  };

  const filteredFunnels = filterStatus === 'all' 
    ? funnels 
    : funnels.filter(f => f.status === filterStatus);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-[Montserrat] text-2xl font-bold text-white mb-2">
            Lejki Marketingowe
          </h2>
          <p className="text-gray-400 text-sm">
            Twórz i zarządzaj lejkami marketingowymi dla swoich klientów
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold rounded-xl hover:shadow-2xl hover:shadow-[#fee715]/40 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nowy Lejek
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
          Wszystkie
        </button>
        <button
          onClick={() => setFilterStatus('draft')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            filterStatus === 'draft'
              ? 'bg-yellow-500 text-white'
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
        >
          Szkice
        </button>
        <button
          onClick={() => setFilterStatus('active')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            filterStatus === 'active'
              ? 'bg-green-500 text-white'
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
        >
          Aktywne
        </button>
        <button
          onClick={() => setFilterStatus('archived')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            filterStatus === 'archived'
              ? 'bg-gray-500 text-white'
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
        >
          Zarchiwizowane
        </button>
      </div>

      {/* Lista lejków */}
      {loading ? (
        <LoadingState variant="block" skeleton="cards" label="Ładowanie lejków…" />
      ) : filteredFunnels.length === 0 ? (
        <div className="bg-white/5 rounded-xl p-12 text-center text-gray-400">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p className="text-lg mb-2">Brak lejków</p>
          <p className="text-sm">Kliknij "Nowy Lejek", aby rozpocząć</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFunnels.map((funnel) => {
            const nodeCount = funnel.diagram_data?.nodes?.length || 0;
            const edgeCount = funnel.diagram_data?.edges?.length || 0;

            return (
              <div
                key={funnel.id}
                className="bg-gradient-to-br from-white/5 to-white/3 rounded-xl p-6 border-2 border-white/10 hover:border-[#fee715]/50 transition-all duration-300 cursor-pointer"
                onClick={() => router.push(`/admin/marketing/${funnel.id}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-[Montserrat] font-bold text-white text-lg mb-1">
                      {funnel.project_name}
                    </h3>
                    {funnel.client && (
                      <p className="text-gray-400 text-sm">
                        {funnel.client.name}
                        {funnel.client.company_name && ` • ${funnel.client.company_name}`}
                      </p>
                    )}
                  </div>
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                      funnel.status === 'active'
                        ? 'bg-green-500/20 text-green-300 border border-green-500/50'
                        : funnel.status === 'draft'
                        ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/50'
                        : 'bg-gray-500/20 text-gray-300 border border-gray-500/50'
                    }`}
                  >
                    {funnel.status === 'active' ? 'Aktywny' : funnel.status === 'draft' ? 'Szkic' : 'Zarchiwizowany'}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>{nodeCount} elementów</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span>{edgeCount} połączeń</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 mb-4">
                  Ostatnia aktualizacja: {new Date(funnel.updated_at).toLocaleDateString('pl-PL')}
                </div>

                <div className="flex gap-2 pt-4 border-t border-white/10" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => router.push(`/admin/marketing/${funnel.id}`)}
                    className="flex-1 px-4 py-2 bg-[#fee715] text-[#101820] rounded-lg transition-all text-sm font-semibold hover:bg-[#fee715]/90"
                  >
                    Otwórz
                  </button>
                  <button
                    onClick={() => handleEditFunnel(funnel)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all text-sm font-semibold"
                    title="Edytuj"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDuplicateFunnel(funnel)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all text-sm font-semibold"
                    title="Duplikuj"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteFunnel(funnel.id)}
                    className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-all text-sm font-semibold"
                    title="Usuń"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal edycji lejka */}
      {showEditModal && editingFunnel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => { setShowEditModal(false); setEditingFunnel(null); }} />
          <div className="relative bg-gradient-to-br from-[#18232F] to-[#101820] rounded-2xl p-6 border-2 border-white/10 max-w-md w-full">
            <h3 className="font-[Montserrat] text-2xl font-bold text-white mb-6">
              Edytuj Lejek Marketingowy
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nazwa Projektu <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={newFunnelName}
                  onChange={(e) => setNewFunnelName(e.target.value)}
                  className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-[#fee715]"
                  placeholder="np. Lejek sprzedażowy Q1 2024"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Przypisz do Klienta (opcjonalnie)
                </label>
                <CustomSelect
                  value={selectedClientId || ''}
                  onChange={(value) => setSelectedClientId(value || null)}
                  placeholder="Brak przypisania"
                  options={[
                    { value: '', label: '✓ Brak przypisania' },
                    ...clients.map((client) => ({
                      value: client.id,
                      label: `${client.name}${client.company_name ? ` • ${client.company_name}` : ''}`,
                    })),
                  ]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Status
                </label>
                <CustomSelect
                  value={selectedStatus}
                  onChange={(value) => setSelectedStatus(value as 'draft' | 'active' | 'archived')}
                  placeholder="Wybierz status"
                  options={[
                    { value: 'draft', label: 'Szkic' },
                    { value: 'active', label: 'Aktywny' },
                    { value: 'archived', label: 'Zarchiwizowany' },
                  ]}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSaveEdit}
                className="flex-1 bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold py-3 px-4 rounded-xl hover:shadow-lg hover:shadow-[#fee715]/40 transition-all duration-300"
              >
                Zapisz Zmiany
              </button>
              <button
                onClick={() => { setShowEditModal(false); setEditingFunnel(null); }}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-[Montserrat] font-semibold rounded-xl transition-all duration-300"
              >
                Anuluj
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal tworzenia lejka */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-gradient-to-br from-[#18232F] to-[#101820] rounded-2xl p-6 border-2 border-white/10 max-w-md w-full">
            <h3 className="font-[Montserrat] text-2xl font-bold text-white mb-6">
              Nowy Lejek Marketingowy
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nazwa Projektu <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={newFunnelName}
                  onChange={(e) => setNewFunnelName(e.target.value)}
                  className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-[#fee715]"
                  placeholder="np. Lejek sprzedażowy Q1 2024"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Przypisz do Klienta (opcjonalnie)
                </label>
                <CustomSelect
                  value={selectedClientId || ''}
                  onChange={(value) => setSelectedClientId(value || null)}
                  placeholder="Brak przypisania"
                  options={[
                    { value: '', label: '✓ Brak przypisania' },
                    ...clients.map((client) => ({
                      value: client.id,
                      label: `${client.name}${client.company_name ? ` • ${client.company_name}` : ''}`,
                    })),
                  ]}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCreateFunnel}
                className="flex-1 bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold py-3 px-4 rounded-xl hover:shadow-lg hover:shadow-[#fee715]/40 transition-all duration-300"
              >
                Utwórz Lejek
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
