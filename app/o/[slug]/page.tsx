'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase-client';
import { AlertModal } from '@/components/AlertModal';
import { LoadingState } from '@/components/LoadingState';
import { FileArrowDown, XCircle, CheckCircle, Eye } from 'phosphor-react';
import { useFadeIn } from '@/hooks/useFadeIn';

interface Proposal {
  id: string;
  title: string;
  slug: string;
  pdf_path: string | null;
  status: string;
  valid_until: string | null;
}

export default function PDFProposalViewPage({ params }: { params: Promise<{ slug: string }> }) {
  const [resolvedParams, setResolvedParams] = useState<{ slug: string } | null>(null);
  const [slug, setSlug] = useState<string | null>(null);
  
  // Resolve params (Next.js 15+)
  useEffect(() => {
    params.then((p) => {
      setResolvedParams(p);
      setSlug(p.slug);
    });
  }, [params]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [loading, setLoading] = useState(true);
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [trackingInitialized, setTrackingInitialized] = useState(false);
  const [downloadClicked, setDownloadClicked] = useState(false);
  
  // Tracking time on page (proxy za "czytał")
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [scrollDepth, setScrollDepth] = useState(0);
  const timeStartRef = useRef<number>(Date.now());
  const scrollTrackerRef = useRef<NodeJS.Timeout | null>(null);

  const headerFadeIn = useFadeIn<HTMLDivElement>();
  const viewerFadeIn = useFadeIn<HTMLDivElement>();

  useEffect(() => {
    if (slug) {
      loadProposal();
    }
  }, [slug, token]);

  // Tracking czasu na stronie
  useEffect(() => {
    if (!proposal) return;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - timeStartRef.current) / 1000);
      setTimeOnPage(elapsed);
      
      // Co 10 sekund zapisuj tracking
      if (elapsed % 10 === 0 && elapsed > 0) {
        trackEvent('time_on_page', {
          seconds: elapsed,
          scroll_depth: scrollDepth,
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [proposal, scrollDepth]);

  // Tracking przewijania
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      const depth = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);
      setScrollDepth(Math.max(scrollDepth, depth));

      // Throttle scroll tracking
      if (scrollTrackerRef.current) {
        clearTimeout(scrollTrackerRef.current);
      }
      
      scrollTrackerRef.current = setTimeout(() => {
        if (depth > scrollDepth + 10) { // Track co 10% przewijania
          trackEvent('scroll_depth', {
            depth: depth,
            time_on_page: timeOnPage,
          });
        }
      }, 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTrackerRef.current) {
        clearTimeout(scrollTrackerRef.current);
      }
    };
  }, [scrollDepth, timeOnPage]);

  const loadProposal = async () => {
    if (!slug) return;
    setLoading(true);
    setError(null);

    try {
      // Pobierz ofertę przez funkcję RPC
      const { data, error: propError } = await supabase.rpc('get_proposal_by_slug_and_token', {
        proposal_slug: slug,
        access_token: token || null,
      });

      if (propError) throw propError;
      if (!data || data.length === 0) {
        setError('Oferta nie została znaleziona.');
        setLoading(false);
        return;
      }

      const prop = data[0];
      
      if (!prop.token_valid) {
        setError('Link jest nieprawidłowy lub wygasł.');
        setLoading(false);
        return;
      }

      setProposal({
        id: prop.id,
        title: prop.title,
        slug: prop.slug,
        pdf_path: prop.pdf_path,
        status: prop.status,
        valid_until: prop.valid_until,
      });

      // Sprawdź czy oferta nie wygasła
      if (prop.valid_until && new Date(prop.valid_until) < new Date()) {
        setError('Oferta wygasła.');
        setLoading(false);
        return;
      }

      // Jeśli nie ma PDF, zwróć błąd
      if (!prop.pdf_path) {
        setError('Ta oferta nie ma przypisanego pliku PDF.');
        setLoading(false);
        return;
      }

      // Pobierz URL do PDF z Supabase Storage
      await loadPdfUrl(prop.pdf_path);

      // Tracking: opened_offer_page
      await trackEvent('opened_offer_page', {
        slug: slug,
        token: token || null,
        user_agent: typeof window !== 'undefined' ? navigator.userAgent : '',
        referer: typeof window !== 'undefined' ? document.referrer || null : null,
      });
      
      setTrackingInitialized(true);
    } catch (err: any) {
      console.error('Błąd ładowania oferty:', err);
      setError('Nie udało się załadować oferty: ' + (err.message || 'Nieznany błąd'));
    } finally {
      setLoading(false);
    }
  };

  const loadPdfUrl = async (pdfPath: string) => {
    try {
      // Pobierz publiczny URL z Supabase Storage
      const { data, error } = await supabase.storage
        .from('proposals')
        .createSignedUrl(pdfPath, 3600); // URL ważny przez 1 godzinę

      if (error) {
        // Jeśli bucket jest publiczny, spróbuj bezpośredni URL
        const publicUrl = `${supabase.storage.from('proposals').getPublicUrl(pdfPath).data.publicUrl}`;
        setPdfUrl(publicUrl);
        return;
      }

      if (data) {
        setPdfUrl(data.signedUrl);
      }

      // Tracking: pdf_loaded
      await trackEvent('pdf_loaded', {
        pdf_path: pdfPath,
      });
    } catch (err: any) {
      console.error('Błąd ładowania PDF:', err);
      // Spróbuj bezpośredni publiczny URL jako fallback
      const publicUrl = `${supabase.storage.from('proposals').getPublicUrl(pdfPath).data.publicUrl}`;
      setPdfUrl(publicUrl);
    }
  };

  const trackEvent = async (eventType: string, metadata: Record<string, any> = {}) => {
    if (!proposal) return;

    try {
      await supabase.rpc('track_proposal_pdf_event', {
        proposal_uuid: proposal.id,
        event_type: eventType,
        access_token: token || null,
        metadata_json: {
          ...metadata,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (err) {
      console.warn('Błąd trackingu:', err);
      // Nie blokujemy działania aplikacji przy błędach trackingu
    }
  };

  const handleDownload = async () => {
    if (!pdfUrl) return;

    setDownloadClicked(true);

    // Tracking: download_clicked
    await trackEvent('download_clicked', {
      pdf_path: proposal?.pdf_path,
      time_on_page: timeOnPage,
      scroll_depth: scrollDepth,
    });

    // Pobierz PDF
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${proposal?.slug || 'oferta'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading || !resolvedParams) {
    return <LoadingState variant="fullscreen" label="Ładowanie oferty…" />;
  }

  if (error || !proposal || !pdfUrl) {
    return (
      <div className="min-h-screen bg-[#101820] text-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <XCircle size={64} weight="thin" className="mx-auto mb-4 text-red-400" />
          <h1 className="font-[Montserrat] text-2xl font-bold text-white mb-2">Błąd</h1>
          <p className="text-gray-400 text-sm">{error || 'Nie udało się załadować oferty.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#101820] text-white">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0a0f14] via-[#0d1217] to-[#101820] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-8 py-6 md:py-12 max-w-6xl relative z-10">
        {/* Header */}
        <div ref={headerFadeIn.ref} className={`mb-6 ${headerFadeIn.className}`}>
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-[Montserrat] text-2xl md:text-3xl font-bold text-white">
              {proposal.title}
            </h1>
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all text-sm font-semibold"
            >
              Zamknij
            </button>
          </div>

          {/* Przycisk pobierania */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleDownload}
              disabled={downloadClicked}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold rounded-xl hover:shadow-lg hover:shadow-[#fee715]/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileArrowDown size={20} weight="bold" />
              {downloadClicked ? 'Pobieranie…' : 'Pobierz PDF'}
            </button>
            
            {trackingInitialized && (
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Eye size={18} weight="regular" />
                <span>Śledzenie aktywności włączone</span>
              </div>
            )}
          </div>
        </div>

        {/* PDF Viewer */}
        <div ref={viewerFadeIn.ref} className={`bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-4 md:p-6 border border-white/10 shadow-lg ${viewerFadeIn.className}`}>
          <iframe
            src={pdfUrl}
            title={proposal.title}
            className="w-full h-[80vh] min-h-[600px] rounded-lg border border-white/10"
            style={{ background: 'white' }}
            onLoad={() => {
              // Tracking: pdf_loaded (jeśli jeszcze nie był wywołany)
              if (!trackingInitialized) {
                trackEvent('pdf_loaded', {
                  pdf_path: proposal.pdf_path,
                });
              }
            }}
          />

          {/* Link awaryjny: otwarcie PDF w nowej karcie */}
          <div className="mt-4 flex items-center justify-between gap-4 text-xs text-gray-400">
            <span>
              Jeśli podgląd PDF się nie wyświetla, możesz otworzyć ofertę w nowej karcie:
            </span>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-[#fee715] font-semibold transition-all"
            >
              Otwórz PDF w nowej karcie
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
