import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Strona WWW dla szkoły sztuk walki PASW – case study',
  description: 'Strona internetowa dla Pszczyńskiej Akademii Sztuk Walki. Case study: jak stworzyć szybką stronę www dla szkoły sztuk walki i małej firmy edukacyjnej.',
  keywords: ['strona www dla szkoły sztuk walki', 'strona internetowa dla szkoły', 'strony www dla małych firm edukacyjnych', 'strona dla akademii'],
  openGraph: {
    title: 'Strona WWW dla szkoły sztuk walki PASW – case study',
    description: 'Strona internetowa dla szkoły sztuk walki. Zobacz, jak stworzyć szybką stronę www dla małej firmy edukacyjnej.',
    url: 'https://drozniak.pl/portfolio-pasw',
  },
  alternates: {
    canonical: 'https://drozniak.pl/portfolio-pasw',
  },
};

export default function PortfolioPaswLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
