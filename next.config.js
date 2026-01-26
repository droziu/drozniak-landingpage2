/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Modern JS target - eliminuje niepotrzebne polyfille (14 KiB oszczędności)
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Modern browsers only - eliminuje transpilację dla starszych przeglądarek
  swcMinify: true,
  // Modern JS output - używa ES2022+ zamiast transpilacji do ES5
  experimental: {
    optimizePackageImports: ['phosphor-react', '@xyflow/react'],
  },
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
    // Next.js automatycznie optymalizuje obrazy (WebP/AVIF)
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
