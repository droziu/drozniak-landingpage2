import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/panel/', '/login', '/profile', '/p/', '/o/'],
      },
    ],
    sitemap: 'https://drozniak.pl/sitemap.xml',
  };
}
