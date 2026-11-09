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

  const statusMeta: Record<string, { label: string; color: string; bg: string }> = {
    active: { label: 'Aktywny', color: 'text-emerald-300', bg: 'bg-emerald-500/15 border-emerald-500/30' },
    draft: { label: 'Szkic', color: 'text-amber-300', bg: 'bg-amber-500/15 border-amber-500/30' },
    archived: { label: 'Zarchiwizowany', color: 'text-white/50', bg: 'bg-white/[0.04] border-white/[0.08]' },
  };

  const formatRelativeDate = (iso: string): string => {
    const d = new Date(iso);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (days === 0) return 'dziś';
    if (days === 1) return 'wczoraj';
    if (days < 7) return `${days} dni temu`;
    if (days < 30) return `${Math.floor(days / 7)} tyg. temu`;
    return d.toLocaleDateString('pl-PL', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div>
      {/* Header: title + new button */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-semibold text-white tracking-tight">Lejki marketingowe</h2>
          <p className="text-[13px] text-white/50 mt-0.5">Twórz i zarządzaj lejkami dla swoich klientów</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#fee715] text-[#050714] rounded-md text-[13px] font-semibold hover:brightness-110 transition-all shadow-sm shadow-[#fee715]/20"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Nowy lejek
        </button>
      </div>

      {/* Filter chips */}
      <div className="mb-5 flex gap-1 p-1 bg-white/[0.03] border border-white/[0.06] rounded-md w-fit">
        {(['all', 'draft', 'active', 'archived'] as const).map((s) => {
          const labels = { all: 'Wszystkie', draft: 'Szkice', active: 'Aktywne', archived: 'Archiwum' };
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
                  {funnels.filter((f) => f.status === s).length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tabela Linear-style */}
      {loading ? (
        <LoadingState variant="block" skeleton="cards" label="Ładowanie…" />
      ) : filteredFunnels.length === 0 ? (
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-12 text-center">
          <svg className="w-10 h-10 mx-auto mb-3 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-[13px] text-white/70 mb-1">
            {filterStatus === 'all' ? 'Brak lejków' : 'Brak lejków w tej kategorii'}
          </p>
          <p className="text-[12px] text-white/40">Kliknij "Nowy lejek", aby rozpocząć</p>
        </div>
      ) : (
        <div className="border border-white/[0.06] rounded-lg overflow-hidden bg-[#0a0d1f]/40">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_180px_120px_140px_120px] gap-4 px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02] text-[10px] font-mono font-semibold text-white/40 uppercase tracking-[0.14em]">
            <div>Nazwa</div>
            <div>Klient</div>
            <div>Status</div>
            <div>Aktualizacja</div>
            <div className="text-right">Akcje</div>
          </div>
          {/* Rows */}
          {filteredFunnels.map((funnel) => {
            const nodeCount = funnel.diagram_data?.nodes?.length || 0;
            const edgeCount = funnel.diagram_data?.edges?.length || 0;
            const meta = statusMeta[funnel.status] || statusMeta.draft;
            return (
              <div
                key={funnel.id}
                className="group grid grid-cols-[1fr_180px_120px_140px_120px] gap-4 px-4 py-3 border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.03] transition-colors cursor-pointer items-center"
                onClick={() => router.push(`/admin/marketing/${funnel.id}`)}
              >
                {/* Name + node/edge meta */}
                <div className="min-w-0">
                  <div className="text-[13px] font-medium text-white truncate">{funnel.project_name}</div>
                  <div className="text-[11px] text-white/40 mt-0.5 font-mono">
                    {nodeCount} {nodeCount === 1 ? 'element' : 'elementów'} · {edgeCount} {edgeCount === 1 ? 'połączenie' : 'połączeń'}
                  </div>
                </div>
                {/* Client */}
                <div className="text-[12px] text-white/60 truncate">
                  {funnel.client ? (
                    <>
                      <div className="truncate">{funnel.client.name}</div>
                      {funnel.client.company_name && (
                        <div className="text-[11px] text-white/35 truncate">{funnel.client.company_name}</div>
                      )}
                    </>
                  ) : (
                    <span className="text-white/30">—</span>
                  )}
                </div>
                {/* Status badge */}
                <div>
                  <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium border ${meta.bg} ${meta.color}`}>
                    {meta.label}
                  </span>
                </div>
                {/* Updated */}
                <div className="text-[12px] text-white/50 font-mono">
                  {formatRelativeDate(funnel.updated_at)}
                </div>
                {/* Actions - widoczne tylko na hover */}
                <div className="flex items-center justify-end gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => handleEditFunnel(funnel)}
                    className="p-1.5 hover:bg-white/[0.08] rounded text-white/50 hover:text-white transition-colors"
                    title="Edytuj"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDuplicateFunnel(funnel)}
                    className="p-1.5 hover:bg-white/[0.08] rounded text-white/50 hover:text-white transition-colors"
                    title="Duplikuj"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteFunnel(funnel.id)}
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

      {/* Modal edycji lejka */}
      {showEditModal && editingFunnel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => { setShowEditModal(false); setEditingFunnel(null); }} />
          <div className="relative bg-[#0a0d1f] rounded-xl p-5 border border-white/[0.08] max-w-md w-full shadow-2xl">
            <h3 className="text-base font-semibold text-white tracking-tight mb-4">
              Edytuj Lejek Marketingowy
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono font-semibold text-white/50 uppercase tracking-[0.14em] mb-1.5">
                  Nazwa Projektu <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={newFunnelName}
                  onChange={(e) => setNewFunnelName(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-md px-3 py-2 text-[13px] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 transition-colors"
                  placeholder="np. Lejek sprzedażowy Q1 2024"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-semibold text-white/50 uppercase tracking-[0.14em] mb-1.5">
                  Przypisz do Klienta (opcjonalnie)
                </label>
                <CustomSelect
                  value={selectedClientId || ''}
                  onChange={(value) => setSelectedClientId(value || null)}
                  placeholder="Brak przypisania"
                  options={[
                    { value: '', label: 'Brak przypisania' },
                    ...clients.map((client) => ({
                      value: client.id,
                      label: `${client.name}${client.company_name ? ` • ${client.company_name}` : ''}`,
                    })),
                  ]}
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-semibold text-white/50 uppercase tracking-[0.14em] mb-1.5">
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
                className="flex-1 bg-[#fee715] text-[#050714] text-[13px] font-semibold py-2 px-4 rounded-md hover:brightness-110 transition-all shadow-sm shadow-[#fee715]/20"
              >
                Zapisz Zmiany
              </button>
              <button
                onClick={() => { setShowEditModal(false); setEditingFunnel(null); }}
                className="px-3 py-2 bg-white/[0.04] border border-white/[0.08] text-white/80 text-[13px] font-medium rounded-md hover:bg-white/[0.08] hover:text-white transition-colors"
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
          <div className="relative bg-[#0a0d1f] rounded-xl p-5 border border-white/[0.08] max-w-md w-full shadow-2xl">
            <h3 className="text-base font-semibold text-white tracking-tight mb-4">
              Nowy Lejek Marketingowy
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono font-semibold text-white/50 uppercase tracking-[0.14em] mb-1.5">
                  Nazwa Projektu <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={newFunnelName}
                  onChange={(e) => setNewFunnelName(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-md px-3 py-2 text-[13px] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 transition-colors"
                  placeholder="np. Lejek sprzedażowy Q1 2024"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-semibold text-white/50 uppercase tracking-[0.14em] mb-1.5">
                  Przypisz do Klienta (opcjonalnie)
                </label>
                <CustomSelect
                  value={selectedClientId || ''}
                  onChange={(value) => setSelectedClientId(value || null)}
                  placeholder="Brak przypisania"
                  options={[
                    { value: '', label: 'Brak przypisania' },
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
                className="flex-1 bg-[#fee715] text-[#050714] text-[13px] font-semibold py-2 px-4 rounded-md hover:brightness-110 transition-all shadow-sm shadow-[#fee715]/20"
              >
                Utwórz Lejek
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
