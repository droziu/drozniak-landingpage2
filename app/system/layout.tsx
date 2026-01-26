import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'System pozyskiwania klientów dla małych firm i freelancerów',
  description: 'System pozyskiwania klientów dla małych firm i freelancerów. Jak zbudować system pozyskiwania klientów w małej firmie? Ile kosztuje system pozyskiwania klientów? Sprawdź moją ofertę.',
  keywords: ['system pozyskiwania klientów', 'system pozyskiwania klientów dla małych firm', 'jak pozyskiwać klientów jako freelancer', 'jak zbudować system pozyskiwania klientów', 'pozyskiwanie klientów z internetu'],
  openGraph: {
    title: 'System pozyskiwania klientów dla małych firm i freelancerów',
    description: 'System pozyskiwania klientów dla małych firm. Strona www + narzędzia + AI. Sprawdź, jak zbudować system pozyskiwania klientów.',
    url: 'https://drozniak.pl/system',
    images: [
      {
        url: 'https://drozniak.pl/images/Drozniak_Zdjecie_Suit_2.jpg',
        width: 1200,
        height: 630,
        alt: 'Stanisław Drożniak',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'System pozyskiwania klientów dla małych firm i freelancerów',
    description: 'System pozyskiwania klientów dla małych firm. Strona www + narzędzia + AI. Sprawdź, jak zbudować system pozyskiwania klientów.',
    images: ['https://drozniak.pl/images/Drozniak_Zdjecie_Suit_2.jpg'],
  },
  alternates: {
    canonical: 'https://drozniak.pl/system',
  },
};

export default function SystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
