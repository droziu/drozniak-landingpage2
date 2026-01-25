import { useEffect } from 'react';

interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  ogUrl?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonical?: string; // Jeśli nie podane, używa window.location.href bez parametrów
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  articleAuthor?: string;
  articleSection?: string;
  articleTags?: string[];
}

const BASE_URL = 'https://drozniak.pl';

// Funkcja do czyszczenia URL z parametrów i trailing slash
const cleanUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    // Usuń trailing slash (oprócz root)
    let pathname = urlObj.pathname;
    if (pathname !== '/' && pathname.endsWith('/')) {
      pathname = pathname.slice(0, -1);
    }
    return `${urlObj.origin}${pathname}`;
  } catch {
    return url;
  }
};

export const useSEO = (seoData: SEOData) => {
  useEffect(() => {
    // Update title
    document.title = seoData.title;

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', seoData.description);

    // Update or create meta keywords (optional, but can be useful)
    if (seoData.keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', Array.isArray(seoData.keywords) ? seoData.keywords.join(', ') : seoData.keywords);
    }

    // Update Open Graph tags
    const updateOGTag = (property: string, content: string) => {
      let ogTag = document.querySelector(`meta[property="${property}"]`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', property);
        document.head.appendChild(ogTag);
      }
      ogTag.setAttribute('content', content);
    };

    // Update Twitter Card tags
    const updateTwitterTag = (name: string, content: string) => {
      let twitterTag = document.querySelector(`meta[name="${name}"]`);
      if (!twitterTag) {
        twitterTag = document.createElement('meta');
        twitterTag.setAttribute('name', name);
        document.head.appendChild(twitterTag);
      }
      twitterTag.setAttribute('content', content);
    };

    // Open Graph
    updateOGTag('og:title', seoData.ogTitle || seoData.title);
    updateOGTag('og:description', seoData.ogDescription || seoData.description);
    updateOGTag('og:type', seoData.ogType || 'website');
    updateOGTag('og:url', seoData.ogUrl || cleanUrl(window.location.href));
    
    if (seoData.ogImage) {
      // Upewnij się, że URL jest absolutny
      const ogImageUrl = seoData.ogImage.startsWith('http') 
        ? seoData.ogImage 
        : `${BASE_URL}${seoData.ogImage.startsWith('/') ? '' : '/'}${seoData.ogImage}`;
      updateOGTag('og:image', ogImageUrl);
      updateOGTag('og:image:width', '1200');
      updateOGTag('og:image:height', '630');
    }

    // Article specific OG tags
    if (seoData.ogType === 'article') {
      if (seoData.articlePublishedTime) {
        updateOGTag('article:published_time', seoData.articlePublishedTime);
      }
      if (seoData.articleModifiedTime) {
        updateOGTag('article:modified_time', seoData.articleModifiedTime);
      }
      if (seoData.articleAuthor) {
        updateOGTag('article:author', seoData.articleAuthor);
      }
      if (seoData.articleSection) {
        updateOGTag('article:section', seoData.articleSection);
      }
      if (seoData.articleTags && seoData.articleTags.length > 0) {
        seoData.articleTags.forEach(tag => {
          updateOGTag('article:tag', tag);
        });
      }
    }

    // Twitter Cards
    updateTwitterTag('twitter:card', seoData.twitterCard || 'summary_large_image');
    updateTwitterTag('twitter:title', seoData.twitterTitle || seoData.title);
    updateTwitterTag('twitter:description', seoData.twitterDescription || seoData.description);
    
    if (seoData.twitterImage) {
      const twitterImageUrl = seoData.twitterImage.startsWith('http') 
        ? seoData.twitterImage 
        : `${BASE_URL}${seoData.twitterImage.startsWith('/') ? '' : '/'}${seoData.twitterImage}`;
      updateTwitterTag('twitter:image', twitterImageUrl);
    } else if (seoData.ogImage) {
      const ogImageUrl = seoData.ogImage.startsWith('http') 
        ? seoData.ogImage 
        : `${BASE_URL}${seoData.ogImage.startsWith('/') ? '' : '/'}${seoData.ogImage}`;
      updateTwitterTag('twitter:image', ogImageUrl);
    }

    // Update canonical URL (bez parametrów)
    const canonicalUrl = seoData.canonical || cleanUrl(window.location.href);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Cleanup function
    return () => {
      // Cleanup nie jest konieczny, ale można dodać jeśli potrzeba
    };
  }, [seoData]);
};

