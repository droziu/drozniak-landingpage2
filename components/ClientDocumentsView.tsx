import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase-client';
import { useAuth } from '@/app/hooks/useAuth';
import { useClientPanel } from '@/app/hooks/useClientPanel';
import { LoadingState } from './LoadingState';
import { FileText, CheckCircle, Eye } from 'phosphor-react';

interface Proposal {
  id: string;
  title: string;
  status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'expired' | 'archived';
  created_at: string;
  valid_until: string | null;
  access_link?: { token: string } | null;
}

export const ClientDocumentsView: React.FC = () => {
  const { user } = useAuth();
  const { panelClient } = useClientPanel();
  const [docs, setDocs] = useState<Array<{ id: string; doc_type: string; name: string; file_url: string | null; created_at: string }>>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      setLoading(true);
      // Pobierz dokumenty
      const { data: docsData, error: docsError } = await supabase
        .from('client_documents')
        .select('id, doc_type, name, file_url, created_at')
        .order('created_at', { ascending: false });
      if (!docsError) setDocs(docsData || []);

      // Pobierz oferty (jeśli panelClient istnieje, RLS zadziała automatycznie)
      if (panelClient) {
        const { data: propsData, error: propsError } = await supabase
          .from('proposals')
          .select('id, title, status, created_at, valid_until')
          .order('created_at', { ascending: false });

        if (!propsError && propsData) {
          // Pobierz linki dostępu dla każdej oferty (jeśli istnieją)
          const proposalsWithLinks = await Promise.all(
            propsData.map(async (prop) => {
              const { data: linkData } = await supabase
                .from('proposal_access_links')
                .select('token')
                .eq('proposal_id', prop.id)
                .eq('status', 'active')
                .single();

              return {
                ...prop,
                access_link: linkData || null,
              };
            })
          );
          setProposals(proposalsWithLinks);
        }
      }

      setLoading(false);
    })();
  }, [user?.id, panelClient?.id]);

  const typeLabel: Record<string, string> = { offer: 'Oferta', invoice: 'Faktura', contract: 'Umowa', other: 'Inny' };

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
      draft: 'text-gray-400',
      sent: 'text-blue-400',
      viewed: 'text-purple-400',
      accepted: 'text-green-400',
      expired: 'text-gray-500',
      archived: 'text-gray-500',
    };
    return colors[status] || 'text-gray-400';
  };

  const handleOpenProposal = (proposal: Proposal) => {
    if (proposal.access_link) {
      // Otwórz publiczny link w nowej karcie
      window.open(`/p/${proposal.access_link.token}`, '_blank');
    }
  };

  if (loading) {
    return <LoadingState variant="block" label="Ładowanie dokumentów…" />;
  }

  const hasContent = docs.length > 0 || proposals.length > 0;

  if (!hasContent) {
    return (
      <div className="py-8 px-4 rounded-lg bg-white/5 border border-white/10 text-center">
        <p className="text-gray-400 text-sm">Brak dokumentów i ofert</p>
        <p className="text-gray-500 text-xs mt-1">Oferty, faktury i umowy pojawią się tutaj po dodaniu przez administratora.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Oferty */}
      {proposals.length > 0 && (
        <div>
          <h2 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
            <FileText size={18} weight="regular" />
            Oferty
          </h2>
          <ul className="divide-y divide-white/10">
            {proposals.map((prop) => (
              <li key={prop.id} className="py-3 flex items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm">{prop.title}</span>
                    {prop.status === 'accepted' && (
                      <CheckCircle size={16} weight="bold" className="text-green-400" />
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`text-xs ${getStatusColor(prop.status)}`}>
                      {getStatusLabel(prop.status)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(prop.created_at).toLocaleDateString('pl-PL')}
                    </span>
                    {prop.valid_until && (
                      <span className="text-xs text-gray-500">
                        Ważna do: {new Date(prop.valid_until).toLocaleDateString('pl-PL')}
                      </span>
                    )}
                  </div>
                </div>
                {prop.access_link ? (
                  <button
                    onClick={() => handleOpenProposal(prop)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-[#fee715] text-[#101820] rounded-lg hover:bg-[#fee715]/90 text-xs font-semibold transition-all"
                  >
                    <Eye size={14} weight="regular" />
                    Otwórz
                  </button>
                ) : (
                  <span className="text-xs text-gray-500">Brak linku</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Dokumenty */}
      {docs.length > 0 && (
        <div>
          <h2 className="text-base font-semibold text-white mb-3">Umowy i dokumenty</h2>
          <ul className="divide-y divide-white/10">
            {docs.map((d) => (
              <li key={d.id} className="py-3 flex items-center justify-between gap-3">
                <div>
                  <span className="text-white text-sm">{d.name}</span>
                  <span className="ml-2 text-xs text-gray-500">({typeLabel[d.doc_type] || d.doc_type})</span>
                </div>
                {d.file_url && (
                  <a
                    href={d.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#00C9A7] hover:underline"
                  >
                    Pobierz
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
