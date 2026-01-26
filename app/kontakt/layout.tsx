import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontakt - System pozyskiwania klientów i strony WWW',
  description: 'Skontaktuj się w sprawie systemu pozyskiwania klientów, strony internetowej dla małej firmy lub szkolenia z AI w marketingu. Odpowiadam w 24 godziny.',
  keywords: ['kontakt', 'system pozyskiwania klientów', 'strony www dla małych firm', 'szkolenia AI'],
  openGraph: {
    title: 'Kontakt - System pozyskiwania klientów i strony WWW',
    description: 'Skontaktuj się w sprawie systemu pozyskiwania klientów, strony internetowej lub szkolenia z AI w marketingu.',
    url: 'https://drozniak.pl/kontakt',
  },
  alternates: {
    canonical: 'https://drozniak.pl/kontakt',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
