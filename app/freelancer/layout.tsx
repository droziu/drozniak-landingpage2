import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Strony internetowe dla freelancerów',
  description: 'Strona, która sprzedaje Twoje usługi, a nie tylko ładnie wygląda. Strony internetowe dla freelancerów projektowane pod konwersję.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://drozniak.pl/freelancer',
  },
};

export default function FreelancerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
