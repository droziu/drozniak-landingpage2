import type { Metadata } from 'next';

const DESCRIPTION =
  'Napisz kilka zdań o firmie albo umów rozmowę online. Odpowiadam w ciągu 24 godzin w dni robocze.';

export const metadata: Metadata = {
  title: 'Kontakt',
  description: DESCRIPTION,
  openGraph: {
    title: 'Kontakt | Stanisław Drożniak',
    description: DESCRIPTION,
    url: 'https://drozniak.pl/kontakt',
  },
  alternates: {
    canonical: 'https://drozniak.pl/kontakt',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
