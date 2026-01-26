import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Strona WWW dla zespołu muzycznego REDLIN – case study',
  description: 'Strona internetowa dla zespołu muzycznego REDLIN z systemem płatności i modułem biletów. Case study: jak stworzyć stronę www dla zespołu muzycznego.',
  keywords: ['strona www dla zespołu muzycznego', 'strona internetowa dla zespołu muzycznego', 'system sprzedaży biletów online', 'strona koncertowa'],
  openGraph: {
    title: 'Strona WWW dla zespołu muzycznego REDLIN – case study',
    description: 'Strona internetowa dla zespołu muzycznego z systemem płatności i modułem biletów. Zobacz, jak stworzyć stronę www dla zespołu muzycznego.',
    url: 'https://drozniak.pl/portfolio-redlin',
  },
  alternates: {
    canonical: 'https://drozniak.pl/portfolio-redlin',
  },
};

export default function PortfolioRedlinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
