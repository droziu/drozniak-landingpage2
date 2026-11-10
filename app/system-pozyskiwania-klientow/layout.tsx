import type { Metadata } from 'next';

const URL = 'https://drozniak.pl/system-pozyskiwania-klientow';
const TITLE = 'System pozyskiwania klientów dla firmy';
const DESCRIPTION =
  'Jednorazowe wdrożenie od 1 900 zł netto: oferta, reklamy z filmami, kampanie w Meta i Google, formularz i automatyczna obsługa zapytań. Gotowe w 1-3 tygodnie, potem 30 dni wsparcia.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'system pozyskiwania klientów',
    'pozyskiwanie klientów dla firm',
    'wdrożenie lejka sprzedażowego',
    'automatyzacja obsługi zapytań',
    'kampanie Meta i Google dla firmy',
  ],
  openGraph: {
    title: `${TITLE} | Stanisław Drożniak`,
    description: DESCRIPTION,
    url: URL,
    images: [{ url: 'https://drozniak.pl/images/brand/drozniak-udostepnianie.jpg', width: 1200, height: 630, alt: 'Stanisław Drożniak' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${TITLE} | Stanisław Drożniak`,
    description: DESCRIPTION,
    images: ['https://drozniak.pl/images/brand/drozniak-udostepnianie.jpg'],
  },
  alternates: { canonical: URL },
};

const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Wdrożenie systemu pozyskiwania klientów',
  serviceType: 'Marketing i pozyskiwanie klientów',
  description: DESCRIPTION,
  url: URL,
  areaServed: { '@type': 'Country', name: 'Poland' },
  provider: { '@type': 'Person', name: 'Stanisław Drożniak', url: 'https://drozniak.pl' },
};

export default function SystemLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      {children}
    </>
  );
}
