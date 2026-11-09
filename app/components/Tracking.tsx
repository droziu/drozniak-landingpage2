'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { TRACKING, hasGoogle, trackEvent, trackPixelPageView, updateGoogleConsent, type ConsentPrefs } from '@/lib/track';

/**
 * Tagi pomiarowe strony publicznej.
 * Google (GA4 i Ads) ładuje się od razu z odmową wszystkich zgód (Consent Mode v2) i dostaje aktualizację po wyborze w banerze.
 * Meta Pixel ładuje się dopiero po zgodzie na marketing.
 */
export function Tracking({ prefs }: { prefs: ConsentPrefs | null }) {
  const pathname = usePathname();
  const marketing = Boolean(prefs?.performance);

  // Zmiana zgód w banerze
  useEffect(() => {
    if (hasGoogle()) updateGoogleConsent(prefs);
  }, [prefs]);

  // Pixel: wyświetlenie strony przy każdej zmianie adresu (pierwsze wysyła skrypt startowy)
  const firstPath = useRef(true);
  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    if (marketing) trackPixelPageView();
  }, [pathname, marketing]);

  // Kliknięcia w telefon i e-mail jako zdarzenia w GA4
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.('a[href^="tel:"], a[href^="mailto:"]') as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute('href') || '';
      trackEvent(href.startsWith('tel:') ? 'phone_click' : 'email_click', { link_url: href, page_path: window.location.pathname });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const googleId = TRACKING.gaId || TRACKING.adsId;

  return (
    <>
      {googleId && (
        <>
          <Script id="gtag-consent" strategy="afterInteractive">{`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
var saved = null;
try { saved = JSON.parse(localStorage.getItem('cookieConsent') || 'null'); } catch (e) {}
var mk = saved && saved.performance ? 'granted' : 'denied';
gtag('consent', 'default', {
  analytics_storage: saved && saved.analytics ? 'granted' : 'denied',
  ad_storage: mk, ad_user_data: mk, ad_personalization: mk,
  wait_for_update: 500
});
gtag('set', 'ads_data_redaction', true);
gtag('set', 'url_passthrough', true);
gtag('js', new Date());
${TRACKING.gaId ? `gtag('config', '${TRACKING.gaId}');` : ''}
${TRACKING.adsId ? `gtag('config', '${TRACKING.adsId}');` : ''}
`}</Script>
          <Script id="gtag-lib" strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${googleId}`} />
        </>
      )}

      {TRACKING.pixelId && marketing && (
        <Script id="meta-pixel" strategy="afterInteractive">{`
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${TRACKING.pixelId}');
fbq('track', 'PageView');
`}</Script>
      )}
    </>
  );
}
