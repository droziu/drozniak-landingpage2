import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Strony internetowe dla małych firm i freelancerów',
  description: 'Strony www dla małych firm i freelancerów. Strona internetowa dla trenera, dietetyka, zespołu muzycznego. Szybkie, nowoczesne strony projektowane pod pozyskiwanie klientów.',
  keywords: ['strony internetowe dla małych firm', 'strony www dla freelancerów', 'strona www dla trenera', 'strona internetowa dla dietetyka', 'strona www dla zespołu muzycznego', 'strony www dla małych firm'],
  openGraph: {
    title: 'Strony internetowe dla małych firm i freelancerów',
    description: 'Strony www dla małych firm i freelancerów. Szybkie, nowoczesne strony projektowane pod pozyskiwanie klientów.',
    url: 'https://drozniak.pl/strony-www',
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
    title: 'Strony internetowe dla małych firm i freelancerów',
    description: 'Strony www dla małych firm i freelancerów. Szybkie, nowoczesne strony projektowane pod pozyskiwanie klientów.',
    images: ['https://drozniak.pl/images/Drozniak_Zdjecie_Suit_2.jpg'],
  },
  alternates: {
    canonical: 'https://drozniak.pl/strony-www',
  },
};

export default function StronyWWWLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
