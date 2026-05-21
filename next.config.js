/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  experimental: {
    optimizePackageImports: ['phosphor-react', '@xyflow/react', 'framer-motion'],
  },
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: '**.supabase.co' },
    ],
  },
  // Next.js automatycznie obsługuje /sitemap.xml przez app/sitemap.ts
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
