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

  const getStatusBadge = (status: string) => {
    const map: Record<string, string> = {
      draft: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
      sent: 'bg-blue-500/15 border-blue-500/30 text-blue-300',
      viewed: 'bg-purple-500/15 border-purple-500/30 text-purple-300',
      accepted: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
      expired: 'bg-white/[0.04] border-white/[0.08] text-white/50',
      archived: 'bg-white/[0.04] border-white/[0.08] text-white/50',
    };
    return map[status] || map.draft;
  };

  const handleOpenProposal = (proposal: Proposal) => {
    if (proposal.access_link) {
      window.open(`/p/${proposal.access_link.token}`, '_blank');
    }
  };

  if (loading) {
    return <LoadingState variant="block" label="Ładowanie…" />;
  }

  const hasContent = docs.length > 0 || proposals.length > 0;

  if (!hasContent) {
    return (
      <div className="max-w-2xl">
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-white tracking-tight">Dokumenty</h2>
          <p className="text-[13px] text-white/50 mt-0.5">Oferty, umowy i faktury przypisane do Twojego konta</p>
        </div>
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-12 text-center">
          <FileText size={32} weight="thin" className="mx-auto mb-3 text-white/20" />
          <p className="text-[13px] text-white/70 mb-1">Brak dokumentów</p>
          <p className="text-[12px] text-white/40">Oferty, faktury i umowy pojawią się tutaj po dodaniu przez administratora</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white tracking-tight">Dokumenty</h2>
        <p className="text-[13px] text-white/50 mt-0.5">Oferty, umowy i faktury przypisane do Twojego konta</p>
      </div>

      {/* Oferty */}
      {proposals.length > 0 && (
        <section>
          <div className="text-[10px] font-mono font-semibold text-white/30 uppercase tracking-[0.16em] mb-2.5">Oferty</div>
          <div className="border border-white/[0.06] rounded-lg overflow-hidden bg-[#0a0d1f]/40">
            {proposals.map((prop) => (
              <div key={prop.id} className="group flex items-center justify-between gap-4 px-4 py-3 border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.03] transition-colors">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <FileText size={14} weight="regular" className="text-white/40 shrink-0" />
                    <span className="text-[13px] font-medium text-white truncate">{prop.title}</span>
                    {prop.status === 'accepted' && (
                      <CheckCircle size={14} weight="fill" className="text-emerald-400 shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1 ml-6">
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border ${getStatusBadge(prop.status)}`}>
                      {getStatusLabel(prop.status)}
                    </span>
                    <span className="text-[11px] text-white/40 font-mono">
                      {new Date(prop.created_at).toLocaleDateString('pl-PL')}
                    </span>
                    {prop.valid_until && (
                      <span className="text-[11px] text-white/40">
                        do {new Date(prop.valid_until).toLocaleDateString('pl-PL')}
                      </span>
                    )}
                  </div>
                </div>
                {prop.access_link ? (
                  <button
                    onClick={() => handleOpenProposal(prop)}
                    className="flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] text-white/80 hover:text-white rounded text-[12px] font-medium transition-colors"
                  >
                    <Eye size={13} weight="regular" />
                    Otwórz
                  </button>
                ) : (
                  <span className="text-[11px] text-white/30">Brak linku</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Umowy / dokumenty */}
      {docs.length > 0 && (
        <section>
          <div className="text-[10px] font-mono font-semibold text-white/30 uppercase tracking-[0.16em] mb-2.5">Umowy i dokumenty</div>
          <div className="border border-white/[0.06] rounded-lg overflow-hidden bg-[#0a0d1f]/40">
            {docs.map((d) => (
              <div key={d.id} className="flex items-center justify-between gap-4 px-4 py-3 border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.03] transition-colors">
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-medium text-white truncate">{d.name}</div>
                  <div className="text-[11px] text-white/35 font-mono mt-0.5">{typeLabel[d.doc_type] || d.doc_type}</div>
                </div>
                {d.file_url && (
                  <a
                    href={d.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] text-white/80 hover:text-white rounded text-[12px] font-medium transition-colors"
                  >
                    Pobierz
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
