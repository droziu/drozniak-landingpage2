import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Szkolenia z AI w marketingu dla małych firm',
  description: 'Szkolenia z AI w marketingu dla małych firm. AI w marketingu małej firmy - praktyczne zastosowania. Automatyzacja marketingu w małej firmie. Warsztaty i szkolenia projektowane na zamówienie.',
  keywords: ['szkolenia z AI w marketingu', 'AI w marketingu małej firmy', 'automatyzacja marketingu w małej firmie', 'szkolenia AI w marketingu', 'AI w marketingu dla małych firm'],
  openGraph: {
    title: 'Szkolenia z AI w marketingu dla małych firm',
    description: 'Szkolenia z AI w marketingu dla małych firm. Praktyczne zastosowania AI i automatyzacji marketingu w małej firmie.',
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
    title: 'Szkolenia z AI w marketingu dla małych firm',
    description: 'Szkolenia z AI w marketingu dla małych firm. Praktyczne zastosowania AI i automatyzacji marketingu w małej firmie.',
    images: ['https://drozniak.pl/images/Drozniak_Zdjecie_Suit_2.webp'],
  },
  alternates: {
    canonical: 'https://drozniak.pl/szkolenia',
  },
};

export default function SzkoleniaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
