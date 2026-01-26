/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  // Preserve existing API routes structure
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/sitemap',
      },
    ];
  },
  async redirects() {
    return [
      // HTTP to HTTPS - Next.js automatycznie wyklucza _next, api, i pliki statyczne
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://drozniak.pl/:path*',
        permanent: true,
      },
      // www to non-www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.drozniak.pl',
          },
        ],
        destination: 'https://drozniak.pl/:path*',
        permanent: true,
      },
      // Trailing slash removal (except root)
      {
        source: '/:path+/',
        destination: '/:path',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
