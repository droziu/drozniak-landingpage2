import type { Metadata } from 'next';
import { Montserrat, Open_Sans } from 'next/font/google';
import './globals.css';
import '@xyflow/react/dist/style.css';
import { LayoutClient } from './components/LayoutClient';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-open-sans',
  display: 'swap',
});

const BASE_URL = 'https://drozniak.pl';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'System pozyskiwania klientów i strony WWW dla małych firm | Stanisław Drożniak',
    template: '%s | Stanisław Drożniak',
  },
  description: 'Pomagam małym firmom i freelancerom pozyskiwać klientów z internetu. Tworzę systemy pozyskiwania klientów, strony internetowe dla małych firm oraz szkolenia z AI w marketingu.',
  keywords: ['system pozyskiwania klientów', 'strony internetowe dla małych firm', 'strony www dla freelancerów', 'AI w marketingu małej firmy', 'automatyzacja marketingu', 'strategia marketingowa dla małych firm'],
  authors: [{ name: 'Stanisław Drożniak' }],
  creator: 'Stanisław Drożniak',
  publisher: 'Stanisław Drożniak',
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: BASE_URL,
    siteName: 'Stanisław Drożniak - Marketing i Strony WWW',
    title: 'System pozyskiwania klientów i strony WWW dla małych firm',
    description: 'Pomagam małym firmom i freelancerom pozyskiwać klientów z internetu. Systemy sprzedażowe, strony WWW i szkolenia z AI.',
    images: [
      {
        url: `${BASE_URL}/images/Drozniak_Zdjecie_Suit_2.jpg`,
        width: 1200,
        height: 630,
        alt: 'Stanisław Drożniak',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'System pozyskiwania klientów i strony WWW dla małych firm',
    description: 'Pomagam małym firmom i freelancerom pozyskiwać klientów z internetu. Systemy sprzedażowe, strony WWW i szkolenia z AI.',
    images: [`${BASE_URL}/images/Drozniak_Zdjecie_Suit_2.jpg`],
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
      { url: '/images/Drozniak_Favicon.svg', type: 'image/svg+xml' },
      { url: '/images/Drozniak_Favicon_96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/images/Drozniak_Favicon_176x176.png', sizes: '176x176', type: 'image/png' },
    ],
    apple: [
      { url: '/images/Drozniak_Favicon_176x176.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

// Global Schema.org JSON-LD
const globalSchemas = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Stanisław Drożniak',
    url: BASE_URL,
    logo: `${BASE_URL}/images/DROZNIAK_LOGO.svg`,
    description: 'System pozyskiwania klientów i strony internetowe dla małych firm i freelancerów. Szkolenia z AI w marketingu.',
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
    jobTitle: 'Marketing Specialist & Web Developer',
    url: BASE_URL,
    email: 'stanislaw@drozniak.com',
    telephone: '+48-792-491-196',
    sameAs: ['https://www.linkedin.com/in/stanislawdrozniak'],
    description: 'Specjalista od systemów pozyskiwania klientów, stron internetowych dla małych firm i szkoleń z AI w marketingu.',
  },
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Stanisław Drożniak - Marketing i Strony WWW',
    url: BASE_URL,
    description: 'System pozyskiwania klientów i strony internetowe dla małych firm i freelancerów',
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
    serviceType: 'Marketing & Web Development Services',
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
      name: 'Usługi marketingowe i web development',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'System pozyskiwania klientów dla małych firm',
            description: 'Kompleksowy system pozyskiwania klientów z internetu dla małych firm i freelancerów',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Strony internetowe dla małych firm',
            description: 'Strony www dla małych firm i freelancerów - szybkie, nowoczesne, projektowane pod pozyskiwanie klientów',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Szkolenia z AI w marketingu',
            description: 'Szkolenia z AI w marketingu dla małych firm - automatyzacja marketingu i praktyczne zastosowania AI',
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
    <html lang="pl" className={`${montserrat.variable} ${openSans.variable}`}>
      <head>
        {/* Global Schema.org JSON-LD */}
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
      <body className="bg-[#101820] text-white font-[Open Sans] antialiased">
        <LayoutClient>
          {children}
        </LayoutClient>
      </body>
    </html>
  );
}
