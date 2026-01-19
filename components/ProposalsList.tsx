import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { AlertModal } from './AlertModal';
import { CustomSelect } from './CustomSelect';
import { useNavigate } from 'react-router-dom';
import { LoadingState } from './LoadingState';
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
  const navigate = useNavigate();
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
      draft: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
      sent: 'bg-blue-500/20 text-blue-300 border-blue-500/50',
      viewed: 'bg-purple-500/20 text-purple-300 border-purple-500/50',
      accepted: 'bg-green-500/20 text-green-300 border-green-500/50',
      expired: 'bg-gray-500/20 text-gray-300 border-gray-500/50',
      archived: 'bg-gray-500/20 text-gray-300 border-gray-500/50',
    };
    return colors[status] || colors.draft;
  };

  const filteredProposals = filterStatus === 'all'
    ? proposals
    : proposals.filter(p => p.status === filterStatus);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-[Montserrat] text-2xl font-bold text-white mb-2">
            Oferty
          </h2>
          <p className="text-gray-400 text-sm">
            Twórz i zarządzaj ofertami dla swoich klientów
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/proposals/new')}
          className="px-6 py-3 bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold rounded-xl hover:shadow-2xl hover:shadow-[#fee715]/40 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
        >
          <FileText size={20} weight="bold" />
          Nowa Oferta
        </button>
      </div>

      {/* Filtry */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {(['all', 'draft', 'sent', 'viewed', 'accepted', 'expired', 'archived'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
              filterStatus === status
                ? status === 'all'
                  ? 'bg-[#fee715] text-[#101820]'
                  : getStatusColor(status).replace('/20', '').replace('/50', '')
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            {status === 'all' ? 'Wszystkie' : getStatusLabel(status)}
          </button>
        ))}
      </div>

      {/* Lista ofert */}
      {loading ? (
        <LoadingState variant="block" skeleton="cards" label="Ładowanie ofert…" />
      ) : filteredProposals.length === 0 ? (
        <div className="bg-white/5 rounded-xl p-12 text-center text-gray-400">
          <FileText size={48} weight="thin" className="mx-auto mb-4 text-gray-500" />
          <p className="text-lg mb-2">Brak ofert</p>
          <p className="text-sm">Kliknij "Nowa Oferta", aby rozpocząć</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProposals.map((proposal) => (
            <div
              key={proposal.id}
              className="bg-gradient-to-br from-white/5 to-white/3 rounded-xl p-6 border-2 border-white/10 hover:border-[#fee715]/50 transition-all duration-300 cursor-pointer"
              onClick={() => navigate(`/admin/proposals/${proposal.id}`)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-[Montserrat] font-bold text-white text-lg mb-1">
                    {proposal.title}
                  </h3>
                  {(proposal.client || proposal.marketing_client) && (
                    <p className="text-gray-400 text-sm">
                      {proposal.client?.name || proposal.marketing_client?.name}
                      {proposal.client?.company_name && ` • ${proposal.client.company_name}`}
                      {proposal.marketing_client?.company_name && ` • ${proposal.marketing_client.company_name}`}
                    </p>
                  )}
                </div>
                <span
                  className={`px-2 py-1 rounded-lg text-xs font-semibold border ${getStatusColor(proposal.status)}`}
                >
                  {getStatusLabel(proposal.status)}
                </span>
              </div>

              <div className="text-xs text-gray-500 mb-4 space-y-1">
                {proposal.last_viewed_at && (
                  <div>Ostatnie otwarcie: {new Date(proposal.last_viewed_at).toLocaleDateString('pl-PL')}</div>
                )}
                {proposal.accepted_at && (
                  <div>Zaakceptowana: {new Date(proposal.accepted_at).toLocaleDateString('pl-PL')}</div>
                )}
                {!proposal.last_viewed_at && !proposal.accepted_at && (
                  <div>Utworzona: {new Date(proposal.created_at).toLocaleDateString('pl-PL')}</div>
                )}
              </div>

              <div className="flex gap-2 pt-4 border-t border-white/10" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => navigate(`/admin/proposals/${proposal.id}`)}
                  className="flex-1 px-4 py-2 bg-[#fee715] text-[#101820] rounded-lg transition-all text-sm font-semibold hover:bg-[#fee715]/90"
                >
                  Otwórz
                </button>
              </div>
            </div>
          ))}
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
