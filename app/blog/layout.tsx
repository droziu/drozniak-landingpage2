import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog o marketingu dla małych firm i freelancerów',
  description: 'Blog o marketingu dla małych firm i freelancerów. Praktyczne porady o pozyskiwaniu klientów, stronach WWW, reklamach, SEO i AI w marketingu.',
  keywords: ['blog marketing', 'marketing małych firm', 'pozyskiwanie klientów', 'strony www', 'reklamy', 'SEO', 'AI w marketingu'],
  openGraph: {
    title: 'Blog o marketingu dla małych firm i freelancerów',
    description: 'Praktyczne porady o marketingu dla małych firm: pozyskiwanie klientów, strony WWW, reklamy, SEO i AI.',
    url: 'https://drozniak.pl/blog',
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
    title: 'Blog o marketingu dla małych firm i freelancerów',
    description: 'Praktyczne porady o marketingu dla małych firm: pozyskiwanie klientów, strony WWW, reklamy, SEO i AI.',
    images: ['https://drozniak.pl/images/Drozniak_Zdjecie_Suit_2.jpg'],
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
