import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import './pub-v2.css';
import { LayoutClient } from './components/LayoutClient';
import { Analytics } from '@vercel/analytics/next';

const BASE_URL = 'https://drozniak.pl';

// Fonty publicznej części („Editorial Ink & Paper"): serif display + geometryczny sans.
// Panel/admin pozostają na Geist (body className poniżej).
const fraunces = Fraunces({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display',
  axes: ['opsz', 'SOFT', 'WONK'],
  display: 'swap',
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans-pub',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Stanisław Drożniak | Marketing i pozyskiwanie klientów',
    template: '%s | Stanisław Drożniak',
  },
  description: 'Marketing i pozyskiwanie klientów dla firm: reklamy, strona, obsługa zapytań, mailing i automatyzacje planowane razem.',
  keywords: ['pozyskiwanie klientów', 'marketing dla firm', 'kampanie Meta i Google', 'obsługa zapytań', 'automatyzacje marketingu', 'szkolenia dla firm'],
  authors: [{ name: 'Stanisław Drożniak' }],
  creator: 'Stanisław Drożniak',
  publisher: 'Stanisław Drożniak',
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: BASE_URL,
    siteName: 'Stanisław Drożniak',
    title: 'Stanisław Drożniak | Marketing i pozyskiwanie klientów',
    description: 'Marketing i pozyskiwanie klientów dla firm: reklamy, strona, obsługa zapytań, mailing i automatyzacje planowane razem.',
    images: [
      {
        url: `${BASE_URL}/images/Drozniak_Zdjecie_Suit_2.webp`,
        width: 1200,
        height: 630,
        alt: 'Stanisław Drożniak',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stanisław Drożniak | Marketing i pozyskiwanie klientów',
    description: 'Marketing i pozyskiwanie klientów dla firm: reklamy, strona, obsługa zapytań, mailing i automatyzacje planowane razem.',
    images: [`${BASE_URL}/images/Drozniak_Zdjecie_Suit_2.webp`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
};

const globalSchemas = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Stanisław Drożniak',
    url: BASE_URL,
    logo: `${BASE_URL}/images/DROZNIAK_LOGO.svg`,
    description: 'Marketing i pozyskiwanie klientów dla firm.',
    sameAs: ['https://www.linkedin.com/in/stanislawdrozniak'],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+48-792-491-196',
      contactType: 'customer service',
      email: 'stanislaw@drozniak.com',
    },
  },
  person: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Stanisław Drożniak',
    jobTitle: 'Marketing i pozyskiwanie klientów',
    url: BASE_URL,
    email: 'stanislaw@drozniak.com',
    telephone: '+48-792-491-196',
    sameAs: ['https://www.linkedin.com/in/stanislawdrozniak'],
    description: 'Marketing i pozyskiwanie klientów dla firm: reklamy, strona, obsługa zapytań, mailing, pomiar i automatyzacje.',
  },
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Stanisław Drożniak',
    url: BASE_URL,
    description: 'Marketing i pozyskiwanie klientów dla firm',
    publisher: {
      '@type': 'Person',
      name: 'Stanisław Drożniak',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/blog?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  },
  service: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Marketing i pozyskiwanie klientów',
    provider: {
      '@type': 'Person',
      name: 'Stanisław Drożniak',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Poland',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Usługi marketingowe',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Marketing i pozyskiwanie klientów',
            description: 'Analiza i prowadzenie marketingu firmy: reklamy, strona, obsługa zapytań, mailing, pomiar i automatyzacje',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Szkolenia dla firm',
            description: 'Praktyczne szkolenia dla zespołów i właścicieli: marketing, sprzedaż, nowe technologie i usprawnianie codziennej pracy',
          },
        },
      ],
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" data-scroll-behavior="smooth" className={`${GeistSans.variable} ${GeistMono.variable} ${fraunces.variable} ${jakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchemas.organization) }}
          id="schema-organization"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchemas.person) }}
          id="schema-person"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchemas.website) }}
          id="schema-website"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchemas.service) }}
          id="schema-service"
        />
      </head>
      <body className={`${GeistSans.className} text-white antialiased selection:bg-[#fee715] selection:text-[#050714]`}>
        <LayoutClient>
          {children}
        </LayoutClient>
        <Analytics />
      </body>
    </html>
  );
}
