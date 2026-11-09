import type { Metadata } from 'next';
import './prowadzenie-marketingu.css';

const TITLE = 'Prowadzenie marketingu firmy';
const DESCRIPTION =
  'Stała współpraca: zarządzam całym marketingiem firmy i prowadzę go co miesiąc. Reklamy, oferta, strona, mailing, obsługa zapytań, automatyzacje i pomiar za jedną stałą opłatą miesięczną.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['prowadzenie marketingu firmy', 'outsourcing marketingu', 'zewnętrzny dział marketingu', 'stała obsługa marketingowa', 'marketing dla firm'],
  openGraph: {
    title: `${TITLE} | Stanisław Drożniak`,
    description: DESCRIPTION,
    url: 'https://drozniak.pl/prowadzenie-marketingu',
    images: [
      {
        url: 'https://drozniak.pl/images/Drozniak_Zdjecie_Suit_2.webp',
        width: 1200,
        height: 630,
        alt: 'Stanisław Drożniak',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${TITLE} | Stanisław Drożniak`,
    description: DESCRIPTION,
    images: ['https://drozniak.pl/images/Drozniak_Zdjecie_Suit_2.webp'],
  },
  alternates: {
    canonical: 'https://drozniak.pl/prowadzenie-marketingu',
  },
};

export default function ProwadzenieMarketinguLayout({ children }: { children: React.ReactNode }) {
  return children;
}
