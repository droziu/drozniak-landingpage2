import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Polityka prywatności',
  description: 'Polityka prywatności strony drozniak.pl. Informacje o przetwarzaniu danych osobowych zgodnie z RODO.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://drozniak.pl/polityka-prywatnosci',
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
