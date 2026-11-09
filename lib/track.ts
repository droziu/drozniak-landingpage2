// Pomiar: Google Analytics 4, Google Ads i Meta Pixel.
// Identyfikatory przychodzą ze zmiennych NEXT_PUBLIC_* w Vercelu; bez nich nic się nie ładuje i nic nie wysyła.
// Zgody: Consent Mode v2 (Google) i Pixel ładowany dopiero po zgodzie na marketing (app/components/Tracking.tsx).

export const TRACKING = {
  gaId: process.env.NEXT_PUBLIC_GA_ID || '',
  adsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || '',
  adsLabels: {
    booking: process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL_BOOKING || '',
    contact: process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL_CONTACT || '',
  },
  pixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || '',
};

export const hasGoogle = () => Boolean(TRACKING.gaId || TRACKING.adsId);

type Gtag = (...args: unknown[]) => void;
type Fbq = ((...args: unknown[]) => void) & { loaded?: boolean };

function gtag(...args: unknown[]) {
  const g = (window as unknown as { gtag?: Gtag }).gtag;
  if (g) g(...args);
}

function fbq(...args: unknown[]) {
  const f = (window as unknown as { fbq?: Fbq }).fbq;
  if (f) f(...args);
}

export type ConsentPrefs = { necessary: boolean; performance: boolean; analytics: boolean };

/** Przekłada wybór z banera na Consent Mode v2. `performance` w banerze to zgoda na marketing. */
export function googleConsent(p: ConsentPrefs | null) {
  const marketing = p?.performance ? 'granted' : 'denied';
  return {
    analytics_storage: p?.analytics ? 'granted' : 'denied',
    ad_storage: marketing,
    ad_user_data: marketing,
    ad_personalization: marketing,
  };
}

export function updateGoogleConsent(p: ConsentPrefs | null) {
  gtag('consent', 'update', googleConsent(p));
}

/** Pojedynczy identyfikator zdarzenia, żeby Meta mogła kiedyś połączyć zdarzenie z przeglądarki i z serwera. */
const eventId = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

/**
 * Pozyskany kontakt: umówiona rozmowa albo wysłany formularz.
 * GA4: generate_lead (do oznaczenia jako kluczowe zdarzenie), Google Ads: konwersja, Meta: Lead (i Schedule przy rozmowie).
 */
export function trackLead(kind: 'booking' | 'contact', extra: Record<string, string> = {}) {
  if (typeof window === 'undefined') return;
  const id = eventId();
  gtag('event', 'generate_lead', { lead_type: kind, ...extra });
  const label = TRACKING.adsLabels[kind];
  if (TRACKING.adsId && label) gtag('event', 'conversion', { send_to: `${TRACKING.adsId}/${label}`, transaction_id: id });
  if (kind === 'booking') fbq('track', 'Schedule', {}, { eventID: `${id}-s` });
  fbq('track', 'Lead', { content_category: kind }, { eventID: id });
}

/** Zwykłe zdarzenie w GA4 (np. odpowiedzi przed rozmową, kliknięcie telefonu). */
export function trackEvent(name: string, params: Record<string, string | number> = {}) {
  if (typeof window === 'undefined') return;
  gtag('event', name, params);
}

/** Wyświetlenie strony w Pixelu po zmianie adresu bez przeładowania (GA4 liczy je sam). */
export function trackPixelPageView() {
  fbq('track', 'PageView');
}
