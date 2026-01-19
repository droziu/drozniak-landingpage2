import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { AlertModal } from './AlertModal';
import { LoadingState } from './LoadingState';
import { CheckCircle, XCircle, FileText, Envelope, Phone } from 'phosphor-react';
import { useFadeIn } from '../hooks/useFadeIn';

interface ProposalSection {
  title: string;
  content: string;
  type: 'text' | 'list' | 'pricing';
  items?: string[];
  price?: number;
}

interface Proposal {
  id: string;
  title: string;
  status: string;
  valid_until: string | null;
}

interface ProposalVersion {
  id: string;
  version_number: number;
  content: { sections: ProposalSection[] };
}

export const PublicProposalView: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [version, setVersion] = useState<ProposalVersion | null>(null);
  const [accessLink, setAccessLink] = useState<{ id: string; expires_at: string | null } | null>(null);
  const [accepting, setAccepting] = useState(false);
  const [showAcceptForm, setShowAcceptForm] = useState(false);
  const [acceptFormData, setAcceptFormData] = useState({
    variant: '1',
    startDate: '',
    companyName: '',
    companyNip: '',
    companyAddress: '',
    companyEmail: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    notes: '',
    acceptTerms: false,
    acceptPrivacy: false,
  });
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [alertModal, setAlertModal] = useState<{ isOpen: boolean; title: string; message: string; type: 'success' | 'error' | 'info' | 'warning' }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
  });

  useEffect(() => {
    if (token) {
      loadProposal();
    }
  }, [token]);

  const loadProposal = async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      // Pobierz link dostępowy przez funkcję RPC (jeśli istnieje) lub bezpośrednio
      // Dla publicznego dostępu używamy bezpośredniego SELECT z token
      const { data: linkData, error: linkError } = await supabase
        .from('proposal_access_links')
        .select('id, proposal_id, expires_at')
        .eq('token', token)
        .eq('status', 'active')
        .single();

      if (linkError || !linkData) {
        setError('Link jest nieprawidłowy lub został unieważniony.');
        setLoading(false);
        return;
      }

      // Sprawdź czy link nie wygasł
      if (linkData.expires_at && new Date(linkData.expires_at) < new Date()) {
        setError('Link wygasł.');
        setLoading(false);
        return;
      }

      setAccessLink(linkData);

      // Pobierz ofertę i najnowszą wersję
      const { data: propData, error: propError } = await supabase
        .from('proposals')
        .select('id, title, status, valid_until')
        .eq('id', linkData.proposal_id)
        .single();

      if (propError || !propData) {
        setError('Nie znaleziono oferty.');
        setLoading(false);
        return;
      }

      setProposal(propData);

      // Pobierz najnowszą wersję
      const { data: versData, error: versError } = await supabase
        .from('proposal_versions')
        .select('id, version_number, content')
        .eq('proposal_id', propData.id)
        .order('version_number', { ascending: false })
        .limit(1)
        .single();

      if (versError || !versData) {
        setError('Nie znaleziono wersji oferty.');
        setLoading(false);
        return;
      }

      setVersion(versData);

      // Zapisz tracking event 'view' przez funkcję SECURITY DEFINER
      try {
        await supabase.rpc('track_proposal_view', {
          proposal_uuid: propData.id,
          access_token: token,
          metadata_json: {
            user_agent: navigator.userAgent,
            referer: document.referrer || null,
            timestamp: new Date().toISOString(),
          },
        });
      } catch (trackError) {
        // Ignoruj błędy trackingu - nie blokują wyświetlania
        console.warn('Błąd trackingu:', trackError);
      }
    } catch (err: any) {
      console.error('Błąd ładowania oferty:', err);
      setError('Nie udało się załadować oferty.');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async () => {
    if (!token || !proposal || !version) return;

    // Walidacja formularza
    if (!acceptFormData.acceptTerms || !acceptFormData.acceptPrivacy) {
      setAlertModal({
        isOpen: true,
        title: 'Błąd',
        message: 'Musisz zaakceptować zakres i warunki oferty oraz politykę prywatności.',
        type: 'error',
      });
      return;
    }

    if (!acceptFormData.companyName || !acceptFormData.companyEmail || !acceptFormData.contactName || !acceptFormData.contactEmail) {
      setAlertModal({
        isOpen: true,
        title: 'Błąd',
        message: 'Proszę wypełnić wszystkie obowiązkowe pola (nazwa firmy, email firmy, osoba kontaktowa, email kontaktowy).',
        type: 'error',
      });
      return;
    }

    setAccepting(true);
    try {
      // Zbuduj JSON z danymi formularza
      const formDataJson = JSON.stringify({
        variant: acceptFormData.variant,
        startDate: acceptFormData.startDate || null,
        company: {
          name: acceptFormData.companyName,
          nip: acceptFormData.companyNip || null,
          address: acceptFormData.companyAddress || null,
          email: acceptFormData.companyEmail,
        },
        contact: {
          name: acceptFormData.contactName,
          phone: acceptFormData.contactPhone || null,
          email: acceptFormData.contactEmail,
        },
        notes: acceptFormData.notes || null,
      });

      const { data: acceptData, error: acceptError } = await supabase.rpc('accept_proposal', {
        proposal_uuid: proposal.id,
        access_token: token,
        user_uuid: null, // Anon - nie ma user_uuid
        user_email: acceptFormData.contactEmail || null,
        client_comment: formDataJson,
        client_ip: null, // Nie zbieramy IP w MVP (można dodać później)
        client_ua: navigator.userAgent,
      });

      if (acceptError) throw acceptError;

      setAlertModal({
        isOpen: true,
        title: 'Sukces',
        message: 'Oferta została zaakceptowana. Dziękujemy!',
        type: 'success',
      });

      // Odśwież ofertę (status zmieni się na 'accepted')
      await loadProposal();
      setShowAcceptForm(false);
    } catch (err: any) {
      console.error('Błąd akceptacji oferty:', err);
      setAlertModal({
        isOpen: true,
        title: 'Błąd',
        message: 'Nie udało się zaakceptować oferty: ' + (err.message || 'Nieznany błąd'),
        type: 'error',
      });
    } finally {
      setAccepting(false);
    }
  };

  if (loading) {
    return <LoadingState variant="fullscreen" label="Ładowanie oferty…" />;
  }

  if (error || !proposal || !version) {
    return (
      <div className="min-h-screen bg-[#101820] text-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <XCircle size={64} weight="thin" className="mx-auto mb-4 text-red-400" />
          <h1 className="font-[Montserrat] text-2xl font-bold text-white mb-2">Błąd</h1>
          <p className="text-gray-400 text-sm">{error || 'Nie znaleziono oferty.'}</p>
        </div>
      </div>
    );
  }

  const isAccepted = proposal.status === 'accepted';
  const isExpired = proposal.valid_until && new Date(proposal.valid_until) < new Date();

  const headerFadeIn = useFadeIn<HTMLDivElement>();
  const sectionsFadeIn = useFadeIn<HTMLDivElement>();
  const formFadeIn = useFadeIn<HTMLDivElement>();

  return (
    <div className="min-h-screen bg-[#101820] text-white">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0a0f14] via-[#0d1217] to-[#101820] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-8 py-8 md:py-12 max-w-4xl relative z-10">
        {/* Header */}
        <div ref={headerFadeIn.ref} className={`mb-8 ${headerFadeIn.className}`}>
          <h1 className="font-[Montserrat] text-3xl md:text-4xl font-bold text-white mb-2">
            {proposal.title}
          </h1>
          {isAccepted && (
            <div className="flex items-center gap-2 text-green-400 text-sm mt-2">
              <CheckCircle size={20} weight="bold" />
              <span>Oferta została zaakceptowana</span>
            </div>
          )}
          {isExpired && (
            <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
              <XCircle size={20} weight="bold" />
              <span>Oferta wygasła</span>
            </div>
          )}
        </div>

        {/* Treść oferty */}
        <div ref={sectionsFadeIn.ref} className={`space-y-8 mb-8 ${sectionsFadeIn.className}`}>
          {version.content.sections.map((section, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-lg p-6 md:p-8 border border-white/10 hover:border-[#fee715]/20 transition-all duration-300 shadow-lg"
            >
              <h2 className="font-[Montserrat] text-xl font-bold text-white mb-4">{section.title}</h2>

              {section.type === 'text' && (
                <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              )}

              {section.type === 'list' && (
                <ul className="space-y-2">
                  {(section.items || []).map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-gray-300">
                      <span className="text-[#fee715] mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.type === 'pricing' && (
                <div className="space-y-4">
                  <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                  {section.price !== undefined && section.price > 0 && (
                    <div className="pt-4 border-t border-white/10">
                      <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#fee715] to-[#00C9A7] bg-clip-text text-transparent">
                        {section.price.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Sekcja akceptacji */}
        {!isAccepted && !isExpired && (
          <div ref={formFadeIn.ref} className={`bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-6 md:p-8 border border-white/10 shadow-lg ${formFadeIn.className}`}>
            <div className="text-center mb-8">
              <h3 className="font-[Montserrat] text-2xl md:text-3xl font-bold text-white mb-2">
                Jak zaakceptować ofertę
              </h3>
              <p className="text-gray-400 text-sm">
                Aby zaakceptować ofertę, kliknij przycisk poniżej i wypełnij krótki formularz
              </p>
            </div>

            {!showAcceptForm ? (
              <div className="space-y-4">
                <button
                  onClick={() => setShowAcceptForm(true)}
                  className="w-full px-8 py-4 bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold rounded-xl hover:shadow-xl hover:shadow-[#fee715]/40 transition-all duration-300 flex items-center justify-center gap-2 text-lg"
                >
                  <CheckCircle size={24} weight="bold" />
                  Akceptuję ofertę
                </button>
                
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => window.location.href = 'mailto:stanislaw@drozniak.pl?subject=Pytańie dotyczące oferty'}
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-white/10 hover:border-[#fee715]/30 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                  >
                    <Envelope size={18} weight="regular" />
                    Mam pytania
                  </button>
                  <a
                    href="mailto:stanislaw@drozniak.pl?subject=Akceptacja oferty"
                    className="text-gray-400 text-xs hover:text-[#fee715] transition-colors self-center"
                  >
                    Wolisz mail?
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <h4 className="font-[Montserrat] text-lg font-semibold text-white mb-4">Formularz akceptacji</h4>

                {/* Wybór wariantu */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Wybór wariantu *</label>
                  <div className="space-y-2">
                    {['1', '2', '3'].map((v) => (
                      <label key={v} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:border-[#fee715]/30 cursor-pointer transition-colors">
                        <input
                          type="radio"
                          name="variant"
                          value={v}
                          checked={acceptFormData.variant === v}
                          onChange={(e) => setAcceptFormData(prev => ({ ...prev, variant: e.target.value }))}
                          className="w-4 h-4 text-[#fee715] bg-white/5 border-white/20 focus:ring-[#fee715] focus:ring-2"
                        />
                        <span className="text-gray-300">Wariant {v}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Data startu */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Preferowana data startu (opcjonalnie)</label>
                  <input
                    type="date"
                    value={acceptFormData.startDate}
                    onChange={(e) => setAcceptFormData(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm focus:ring-1 focus:ring-[#fee715] focus:border-[#fee715]"
                  />
                </div>

                {/* Dane firmy */}
                <div className="pt-4 border-t border-white/10">
                  <h5 className="font-[Montserrat] text-base font-semibold text-white mb-4">Dane firmy do faktury</h5>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Nazwa firmy *</label>
                      <input
                        type="text"
                        value={acceptFormData.companyName}
                        onChange={(e) => setAcceptFormData(prev => ({ ...prev, companyName: e.target.value }))}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm placeholder-gray-500 focus:ring-1 focus:ring-[#fee715] focus:border-[#fee715]"
                        placeholder="Nazwa firmy"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">NIP (opcjonalnie)</label>
                        <input
                          type="text"
                          value={acceptFormData.companyNip}
                          onChange={(e) => setAcceptFormData(prev => ({ ...prev, companyNip: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm placeholder-gray-500 focus:ring-1 focus:ring-[#fee715] focus:border-[#fee715]"
                          placeholder="NIP"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">E-mail do faktur *</label>
                        <input
                          type="email"
                          value={acceptFormData.companyEmail}
                          onChange={(e) => setAcceptFormData(prev => ({ ...prev, companyEmail: e.target.value }))}
                          required
                          className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm placeholder-gray-500 focus:ring-1 focus:ring-[#fee715] focus:border-[#fee715]"
                          placeholder="email@firma.pl"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Adres (opcjonalnie)</label>
                      <textarea
                        value={acceptFormData.companyAddress}
                        onChange={(e) => setAcceptFormData(prev => ({ ...prev, companyAddress: e.target.value }))}
                        rows={2}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm placeholder-gray-500 focus:ring-1 focus:ring-[#fee715] focus:border-[#fee715] resize-none"
                        placeholder="Adres firmy"
                      />
                    </div>
                  </div>
                </div>

                {/* Osoba kontaktowa */}
                <div className="pt-4 border-t border-white/10">
                  <h5 className="font-[Montserrat] text-base font-semibold text-white mb-4">Osoba kontaktowa</h5>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Imię i nazwisko *</label>
                      <input
                        type="text"
                        value={acceptFormData.contactName}
                        onChange={(e) => setAcceptFormData(prev => ({ ...prev, contactName: e.target.value }))}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm placeholder-gray-500 focus:ring-1 focus:ring-[#fee715] focus:border-[#fee715]"
                        placeholder="Imię i nazwisko"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Telefon (opcjonalnie)</label>
                        <input
                          type="tel"
                          value={acceptFormData.contactPhone}
                          onChange={(e) => setAcceptFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm placeholder-gray-500 focus:ring-1 focus:ring-[#fee715] focus:border-[#fee715]"
                          placeholder="+48 123 456 789"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">E-mail *</label>
                        <input
                          type="email"
                          value={acceptFormData.contactEmail}
                          onChange={(e) => setAcceptFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                          required
                          className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm placeholder-gray-500 focus:ring-1 focus:ring-[#fee715] focus:border-[#fee715]"
                          placeholder="email@firma.pl"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Uwagi */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Uwagi / dodatkowe informacje (opcjonalnie)</label>
                  <textarea
                    value={acceptFormData.notes}
                    onChange={(e) => setAcceptFormData(prev => ({ ...prev, notes: e.target.value }))}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm placeholder-gray-500 focus:ring-1 focus:ring-[#fee715] focus:border-[#fee715] resize-none"
                    placeholder="Twoje uwagi lub pytania..."
                  />
                </div>

                {/* Checkboxy */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptFormData.acceptTerms}
                      onChange={(e) => setAcceptFormData(prev => ({ ...prev, acceptTerms: e.target.checked }))}
                      required
                      className="mt-1 w-4 h-4 text-[#fee715] bg-white/5 border-white/20 rounded focus:ring-[#fee715] focus:ring-2"
                    />
                    <span className="text-gray-300 text-sm">Akceptuję zakres i warunki oferty *</span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptFormData.acceptPrivacy}
                      onChange={(e) => setAcceptFormData(prev => ({ ...prev, acceptPrivacy: e.target.checked }))}
                      required
                      className="mt-1 w-4 h-4 text-[#fee715] bg-white/5 border-white/20 rounded focus:ring-[#fee715] focus:ring-2"
                    />
                    <span className="text-gray-300 text-sm">Akceptuję politykę prywatności *</span>
                  </label>
                </div>

                {/* Przyciski */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleAccept}
                    disabled={accepting || !acceptFormData.acceptTerms || !acceptFormData.acceptPrivacy}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold rounded-xl hover:shadow-lg hover:shadow-[#fee715]/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={20} weight="bold" />
                    {accepting ? 'Akceptowanie…' : 'Akceptuję ofertę'}
                  </button>
                  <button
                    onClick={() => setShowAcceptForm(false)}
                    className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-white/10 hover:border-[#fee715]/30 transition-all duration-300 text-sm"
                  >
                    Anuluj
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {isAccepted && (
          <div className="bg-green-500/10 rounded-lg p-6 border border-green-500/30 text-center">
            <CheckCircle size={48} weight="bold" className="mx-auto mb-4 text-green-400" />
            <h3 className="font-[Montserrat] text-xl font-bold text-white mb-2">
              Oferta została zaakceptowana
            </h3>
            <p className="text-gray-300 text-sm">
              Dziękujemy za akceptację oferty. Skontaktujemy się z Tobą w najbliższym czasie.
            </p>
          </div>
        )}

        {isExpired && (
          <div className="bg-gray-500/10 rounded-lg p-6 border border-gray-500/30 text-center">
            <XCircle size={48} weight="bold" className="mx-auto mb-4 text-gray-400" />
            <h3 className="font-[Montserrat] text-xl font-bold text-white mb-2">
              Oferta wygasła
            </h3>
            <p className="text-gray-300 text-sm">
              Ta oferta nie jest już aktualna. Skontaktuj się z nami, aby otrzymać aktualną ofertę.
            </p>
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
    </div>
  );
};
