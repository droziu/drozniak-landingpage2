import type { Metadata } from 'next';
import './szkolenia.css';

const TITLE = 'Szkolenia dla firm';
const DESCRIPTION =
  'Szkolenia dla zespołów w małych firmach i działów w większych: marketing i pozyskiwanie klientów, obsługa zapytań, automatyzacje i AI w codziennej pracy. Program pod konkretną firmę, online albo na miejscu.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['szkolenia dla firm', 'szkolenia z marketingu', 'szkolenia z obsługi klienta', 'szkolenia AI dla firm', 'szkolenia z automatyzacji'],
  openGraph: {
    title: `${TITLE} | Stanisław Drożniak`,
    description: DESCRIPTION,
    url: 'https://drozniak.pl/szkolenia',
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
    canonical: 'https://drozniak.pl/szkolenia',
  },
};

export default function SzkoleniaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
