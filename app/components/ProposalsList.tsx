'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import { supabase } from '@/lib/supabase-client';
import { AlertModal } from '@/components/AlertModal';
import { LoadingState } from '@/components/LoadingState';
import { FileText } from 'phosphor-react';

interface Proposal {
  id: string;
  title: string;
  status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'expired' | 'archived';
  client_id: string | null;
  marketing_client_id: string | null;
  valid_until: string | null;
  created_at: string;
  updated_at: string;
  client?: {
    name: string | null;
    company_name: string | null;
  } | null;
  marketing_client?: {
    name: string;
    company_name: string | null;
  } | null;
  last_viewed_at?: string | null;
  accepted_at?: string | null;
}

export const ProposalsList: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'sent' | 'viewed' | 'accepted' | 'expired' | 'archived'>('all');
  const [alertModal, setAlertModal] = useState<{ isOpen: boolean; title: string; message: string; type: 'success' | 'error' | 'info' | 'warning' }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
  });

  useEffect(() => {
    if (user) {
      loadProposals();
    }
  }, [user, filterStatus]);

  const loadProposals = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('proposals')
        .select(`
          *,
          client:panel_clients(name, company_name),
          marketing_client:marketing_clients(name, company_name)
        `)
        .order('updated_at', { ascending: false });

      if (filterStatus !== 'all') {
        query = query.eq('status', filterStatus);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Błąd zapytania proposals:', error);
        throw error;
      }

      console.log('Załadowano oferty:', data?.length || 0, 'ofert');

      // Pobierz dodatkowe informacje: last_viewed_at, accepted_at
      const proposalsWithDetails: Proposal[] = [];
      for (const prop of data || []) {
        // Obsłuż błędy dla opcjonalnych zapytań (tracking i acceptance)
        let lastViewedAt: string | null = null;
        let acceptedAt: string | null = null;

        try {
          const { data: tracking } = await supabase
            .from('proposal_tracking_events')
            .select('created_at')
            .eq('proposal_id', prop.id)
            .eq('event_type', 'view')
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle(); // maybeSingle zamiast single - nie rzuca błędu jeśli brak danych

          lastViewedAt = tracking?.created_at || null;
        } catch (err) {
          console.warn('Błąd pobierania tracking dla oferty', prop.id, err);
        }

        try {
          const { data: acceptance } = await supabase
            .from('proposal_acceptances')
            .select('accepted_at')
            .eq('proposal_id', prop.id)
            .maybeSingle(); // maybeSingle zamiast single - nie rzuca błędu jeśli brak danych

          acceptedAt = acceptance?.accepted_at || null;
        } catch (err) {
          console.warn('Błąd pobierania acceptance dla oferty', prop.id, err);
        }

        proposalsWithDetails.push({
          ...prop,
          client: Array.isArray(prop.client) ? prop.client[0] : prop.client,
          marketing_client: Array.isArray(prop.marketing_client) ? prop.marketing_client[0] : prop.marketing_client,
          last_viewed_at: lastViewedAt,
          accepted_at: acceptedAt,
        });
      }

      setProposals(proposalsWithDetails);
    } catch (error: any) {
      console.error('Błąd ładowania ofert:', error);
      setAlertModal({
        isOpen: true,
        title: 'Błąd',
        message: 'Nie udało się załadować ofert: ' + (error.message || 'Nieznany błąd'),
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      draft: 'Szkic',
      sent: 'Wysłana',
      viewed: 'Otworzona',
      accepted: 'Zaakceptowana',
      expired: 'Wygasła',
      archived: 'Zarchiwizowana',
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      draft: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
      sent: 'bg-blue-500/15 border-blue-500/30 text-blue-300',
      viewed: 'bg-purple-500/15 border-purple-500/30 text-purple-300',
      accepted: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
      expired: 'bg-white/[0.04] border-white/[0.08] text-white/50',
      archived: 'bg-white/[0.04] border-white/[0.08] text-white/50',
    };
    return colors[status] || colors.draft;
  };

  const formatRelativeDate = (iso: string): string => {
    const d = new Date(iso);
    const days = Math.floor((Date.now() - d.getTime()) / 86400000);
    if (days === 0) return 'dziś';
    if (days === 1) return 'wczoraj';
    if (days < 7) return `${days} dni temu`;
    if (days < 30) return `${Math.floor(days / 7)} tyg. temu`;
    return d.toLocaleDateString('pl-PL', { day: 'numeric', month: 'short' });
  };

  const filteredProposals = filterStatus === 'all'
    ? proposals
    : proposals.filter(p => p.status === filterStatus);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-semibold text-white tracking-tight">Oferty</h2>
          <p className="text-[13px] text-white/50 mt-0.5">Twórz i zarządzaj ofertami dla klientów</p>
        </div>
        <button
          onClick={() => router.push('/admin/proposals/new')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#fee715] text-[#050714] rounded-md text-[13px] font-semibold hover:brightness-110 transition-all shadow-sm shadow-[#fee715]/20"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Nowa oferta
        </button>
      </div>

      {/* Filter chips */}
      <div className="mb-5 flex gap-1 p-1 bg-white/[0.03] border border-white/[0.06] rounded-md w-fit overflow-x-auto">
        {(['all', 'draft', 'sent', 'viewed', 'accepted', 'expired', 'archived'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-2.5 py-1 rounded text-[12px] font-medium transition-colors whitespace-nowrap ${
              filterStatus === status
                ? 'bg-white/[0.08] text-white'
                : 'text-white/55 hover:text-white/80'
            }`}
          >
            {status === 'all' ? 'Wszystkie' : getStatusLabel(status)}
            {status !== 'all' && (
              <span className="ml-1.5 text-[10px] text-white/30 font-mono">
                {proposals.filter((p) => p.status === status).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Lista */}
      {loading ? (
        <LoadingState variant="block" skeleton="cards" label="Ładowanie…" />
      ) : filteredProposals.length === 0 ? (
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-12 text-center">
          <FileText size={32} weight="thin" className="mx-auto mb-3 text-white/20" />
          <p className="text-[13px] text-white/70 mb-1">
            {filterStatus === 'all' ? 'Brak ofert' : 'Brak ofert w tej kategorii'}
          </p>
          <p className="text-[12px] text-white/40">Kliknij "Nowa oferta", aby rozpocząć</p>
        </div>
      ) : (
        <div className="border border-white/[0.06] rounded-lg overflow-hidden bg-[#0a0d1f]/40">
          <div className="grid grid-cols-[1fr_200px_140px_120px] gap-4 px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02] text-[10px] font-mono font-semibold text-white/40 uppercase tracking-[0.14em]">
            <div>Oferta</div>
            <div>Klient</div>
            <div>Status</div>
            <div className="text-right">Data</div>
          </div>
          {filteredProposals.map((proposal) => {
            const clientName = proposal.client?.name || proposal.marketing_client?.name;
            const companyName = proposal.client?.company_name || proposal.marketing_client?.company_name;
            const lastDate = proposal.accepted_at || proposal.last_viewed_at || proposal.created_at;
            return (
              <div
                key={proposal.id}
                className="grid grid-cols-[1fr_200px_140px_120px] gap-4 px-4 py-3 border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.03] transition-colors cursor-pointer items-center"
                onClick={() => router.push(`/admin/proposals/${proposal.id}`)}
              >
                <div className="min-w-0">
                  <div className="text-[13px] font-medium text-white truncate">{proposal.title}</div>
                  <div className="text-[10px] text-white/35 font-mono mt-0.5">
                    {proposal.accepted_at ? `zaakceptowana ${formatRelativeDate(proposal.accepted_at)}` :
                     proposal.last_viewed_at ? `otwarta ${formatRelativeDate(proposal.last_viewed_at)}` :
                     `utworzona ${formatRelativeDate(proposal.created_at)}`}
                  </div>
                </div>
                <div className="text-[12px] text-white/60 min-w-0">
                  {clientName ? (
                    <>
                      <div className="truncate">{clientName}</div>
                      {companyName && <div className="text-[11px] text-white/35 truncate">{companyName}</div>}
                    </>
                  ) : (
                    <span className="text-white/30">—</span>
                  )}
                </div>
                <div>
                  <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium border ${getStatusColor(proposal.status)}`}>
                    {getStatusLabel(proposal.status)}
                  </span>
                </div>
                <div className="text-[12px] text-white/50 font-mono text-right">
                  {formatRelativeDate(lastDate)}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <AlertModal
        isOpen={alertModal.isOpen}
        title={alertModal.title}
        message={alertModal.message}
        type={alertModal.type}
        onClose={() => setAlertModal(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};
