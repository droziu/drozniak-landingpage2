import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog o marketingu i pozyskiwaniu klientów',
  description: 'Praktyczne porady dla firm: skąd brać klientów, jak prowadzić reklamy, jak przygotować ofertę i obsługiwać zapytania, jak mierzyć sprzedaż.',
  keywords: ['blog o marketingu', 'marketing dla firm', 'pozyskiwanie klientów', 'reklamy w internecie', 'obsługa zapytań', 'automatyzacje marketingu'],
  openGraph: {
    title: 'Blog o marketingu i pozyskiwaniu klientów',
    description: 'Praktyczne porady dla firm: skąd brać klientów, jak prowadzić reklamy, jak przygotować ofertę i obsługiwać zapytania, jak mierzyć sprzedaż.',
    url: 'https://drozniak.pl/blog',
    images: [
      {
        url: 'https://drozniak.pl/images/brand/drozniak-udostepnianie.jpg',
        width: 1200,
        height: 630,
        alt: 'Stanisław Drożniak',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog o marketingu i pozyskiwaniu klientów',
    description: 'Praktyczne porady dla firm: skąd brać klientów, jak prowadzić reklamy, jak przygotować ofertę i obsługiwać zapytania, jak mierzyć sprzedaż.',
    images: ['https://drozniak.pl/images/brand/drozniak-udostepnianie.jpg'],
  },
  alternates: {
    canonical: 'https://drozniak.pl/blog',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
