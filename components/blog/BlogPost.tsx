import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBlogPost, ContentBlock } from '../../hooks/useBlogPost';
import { ArrowRight, CaretRight, Clock, Calendar } from 'phosphor-react';

// Funkcja pomocnicza do generowania srcset dla obrazów hero
const getHeroImageSrcSet = (baseUrl: string): string => {
  if (!baseUrl) return '';
  
  // Jeśli URL już zawiera -1024.webp, zamień na -2000.webp dla drugiej wersji
  if (baseUrl.includes('-1024.webp')) {
    const url2000 = baseUrl.replace('-1024.webp', '-2000.webp');
    return `${baseUrl} 1024w, ${url2000} 2000w`;
  }
  
  // Jeśli URL już zawiera -2000.webp, zamień na -1024.webp dla pierwszej wersji
  if (baseUrl.includes('-2000.webp')) {
    const url1024 = baseUrl.replace('-2000.webp', '-1024.webp');
    return `${url1024} 1024w, ${baseUrl} 2000w`;
  }
  
  // W przeciwnym razie spróbuj wygenerować wersje (usuń rozszerzenie i dodaj sufixy)
  const cleanUrl = baseUrl.replace(/\.(webp|jpg|png)$/i, '');
  const url1024 = `${cleanUrl}-1024.webp`;
  const url2000 = `${cleanUrl}-2000.webp`;
  return `${url1024} 1024w, ${url2000} 2000w`;
};

// Funkcja pomocnicza do generowania srcset dla obrazów w treści
const getContentImageSrcSet = (baseUrl: string): string => {
  // Jeśli URL już zawiera -1024 lub -2000, użyj go bezpośrednio
  if (baseUrl.includes('-1024.webp')) {
    const url2000 = baseUrl.replace('-1024.webp', '-2000.webp');
    return `${baseUrl} 1024w, ${url2000} 2000w`;
  }
  if (baseUrl.includes('-2000.webp')) {
    const url1024 = baseUrl.replace('-2000.webp', '-1024.webp');
    return `${url1024} 1024w, ${baseUrl} 2000w`;
  }
  // W przeciwnym razie spróbuj wygenerować wersje
  const cleanUrl = baseUrl.replace(/\.(webp|jpg|png)$/i, '');
  const url1024 = `${cleanUrl}-1024.webp`;
  const url2000 = `${cleanUrl}-2000.webp`;
  return `${url1024} 1024w, ${url2000} 2000w`;
};

// Funkcja do uzyskania URL dla desktopowej wersji (2000px)
const getDesktopImageUrl = (baseUrl: string): string => {
  // Jeśli URL już zawiera -1024, zamień na -2000
  if (baseUrl.includes('-1024.webp')) {
    return baseUrl.replace('-1024.webp', '-2000.webp');
  }
  // Jeśli już ma -2000, zwróć bez zmian
  if (baseUrl.includes('-2000.webp')) {
    return baseUrl;
  }
  // URL bez konwencji -1024/-2000 – zwracamy bez zmian (np. Drozniak_www_desktop.webp)
  return baseUrl;
};

// Komponent do renderowania bloków treści
const ContentBlockRenderer: React.FC<{ block: ContentBlock }> = ({ block }) => {
  switch (block.type) {
    case 'text':
      // Sprawdź czy tekst zawiera nagłówki h2/h3 - jeśli tak, zastosuj specjalne style
      let textContent = block.data.text || '';
      const hasH2 = textContent.includes('<h2>') || textContent.includes('<h2 ');
      const hasH3 = textContent.includes('<h3>') || textContent.includes('<h3 ');
      
      // Dodaj ID do nagłówków h2 i h3 w tekście (jeśli nie mają już ID)
      if (hasH2 || hasH3) {
        // Dodaj ID do h2 (używając block.id + '-h2-' + index)
        let h2Index = 0;
        textContent = textContent.replace(/<h2([^>]*)>/gi, (match, attrs) => {
          if (!attrs.includes('id=')) {
            const id = `${block.id}-h2-${h2Index++}`;
            return `<h2 id="${id}" class="scroll-mt-20"${attrs}>`;
          }
          // Jeśli już ma ID, dodaj tylko klasę scroll-mt-20
          if (!attrs.includes('class=')) {
            return `<h2 class="scroll-mt-20"${attrs}>`;
          } else if (!attrs.includes('scroll-mt-20')) {
            return `<h2${attrs.replace(/class="([^"]*)"/, 'class="$1 scroll-mt-20"')}>`;
          }
          return match;
        });
        
        // Dodaj ID do h3 (używając block.id + '-h3-' + index)
        let h3Index = 0;
        textContent = textContent.replace(/<h3([^>]*)>/gi, (match, attrs) => {
          if (!attrs.includes('id=')) {
            const id = `${block.id}-h3-${h3Index++}`;
            return `<h3 id="${id}" class="scroll-mt-20"${attrs}>`;
          }
          // Jeśli już ma ID, dodaj tylko klasę scroll-mt-20
          if (!attrs.includes('class=')) {
            return `<h3 class="scroll-mt-20"${attrs}>`;
          } else if (!attrs.includes('scroll-mt-20')) {
            return `<h3${attrs.replace(/class="([^"]*)"/, 'class="$1 scroll-mt-20"')}>`;
          }
          return match;
        });
      }
      
      return (
        <div
          className={`prose prose-lg max-w-none my-12 md:my-16 text-[#101820] ${
            block.data.alignment === 'center' ? 'text-center' : ''
          } ${block.data.alignment === 'right' ? 'text-right' : ''
          } ${
            hasH2 ? 'prose-headings:font-extrabold prose-headings:font-[Montserrat] prose-headings:text-[#101820] prose-h2:text-4xl prose-h2:md:text-5xl prose-h2:lg:text-6xl prose-h2:mb-8 prose-h2:mt-20 prose-h2:md:mt-24 prose-h2:uppercase prose-h2:leading-tight prose-h2:tracking-tight prose-h2:py-6' : ''
          } ${
            hasH3 ? 'prose-h3:text-2xl prose-h3:md:text-3xl prose-h3:lg:text-4xl prose-h3:mb-6 prose-h3:mt-12 prose-h3:md:mt-16 prose-h3:font-extrabold prose-h3:text-[#101820] prose-h3:leading-tight prose-h3:py-4' : ''
          } prose-p:leading-[1.7] prose-p:text-[#101820] prose-p:text-lg md:prose-p:text-xl prose-p:mb-8 prose-ul:my-10 prose-li:my-4 prose-li:text-[#101820] prose-li:leading-[1.7] prose-strong:text-[#101820] prose-strong:font-extrabold prose-a:text-[#101820] prose-a:underline prose-a:decoration-[#fee715] prose-a:decoration-2 prose-a:hover:text-[#101820] prose-a:hover:bg-[#fee715] prose-a:transition-colors`}
          dangerouslySetInnerHTML={{ __html: textContent }}
        />
      );

    case 'image':
      if (!block.data.imageUrl) return null;
      const widthClass = {
        narrow: 'max-w-md mx-auto',
        standard: 'max-w-2xl mx-auto',
        wide: 'max-w-4xl mx-auto',
        full: 'w-full',
      }[block.data.width || 'standard'];

      // srcSet tylko gdy URL ma konwencję -1024/-2000 (np. hero-2000.webp)
      const hasResponsiveVersions = block.data.imageUrl && 
        (block.data.imageUrl.includes('-1024.webp') || block.data.imageUrl.includes('-2000.webp'));
      
      // Jeśli ma standardowe rozszerzenie, użyj srcset, w przeciwnym razie zwykły src
      const imageSrc = hasResponsiveVersions 
        ? getDesktopImageUrl(block.data.imageUrl)
        : block.data.imageUrl;
      
      const imageSrcSet = hasResponsiveVersions 
        ? getContentImageSrcSet(block.data.imageUrl)
        : undefined;
      
      // Określ sizes w zależności od szerokości obrazu
      const imageSizes = block.data.width === 'full' 
        ? '100vw'
        : block.data.width === 'wide'
        ? '(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px'
        : block.data.width === 'narrow'
        ? '(max-width: 768px) 100vw, 600px'
        : '(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 800px';

      return (
        <figure className={`my-16 md:my-20 ${widthClass}`}>
          <img
            src={imageSrc}
            srcSet={imageSrcSet}
            sizes={imageSrcSet ? imageSizes : undefined}
            alt={block.data.alt || ''}
            className="w-full border-2 border-gray-200"
            loading="lazy"
          />
          {block.data.caption && (
            <figcaption className="text-center text-base text-gray-600 mt-6 font-medium">
              {block.data.caption}
            </figcaption>
          )}
        </figure>
      );

    case 'quote':
      return (
        <blockquote className="border-l-4 border-[#fee715] pl-10 py-8 my-16 md:my-20 italic text-xl md:text-2xl text-[#101820] font-medium leading-[1.7]">
          <p className="m-0 leading-[1.7]">"{block.data.quote}"</p>
          {block.data.author && (
            <footer className="text-lg text-gray-700 mt-6 font-semibold not-italic m-0">- {block.data.author}</footer>
          )}
        </blockquote>
      );

    case 'code':
      return (
        <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto my-8">
          <code>{block.data.code}</code>
        </pre>
      );

    case 'video':
      // Prosta obsługa YouTube/Vimeo - można rozbudować
      return (
        <div className="my-8 aspect-video">
          <iframe
            src={block.data.videoUrl}
            className="w-full h-full rounded-lg"
            allowFullScreen
            title="Video"
          />
        </div>
      );

    case 'cta':
      return (
        <div className="my-16 md:my-20 text-center py-10 md:py-12 px-10 md:px-12 bg-gray-50 border-2 border-gray-200 flex flex-col items-center justify-center">
          <p className="text-xl md:text-2xl font-extrabold text-[#101820] mb-6 leading-[1.6] m-0">{block.data.ctaText}</p>
          {block.data.ctaLink && (
            <a
              href={block.data.ctaLink}
              className={`inline-block px-8 py-4 font-extrabold text-lg transition-colors border-2 ${
                block.data.ctaStyle === 'primary'
                  ? 'bg-[#fee715] border-[#fee715] text-[#101820] hover:bg-[#101820] hover:text-[#fee715] hover:border-[#101820]'
                  : 'bg-transparent border-[#fee715] text-[#fee715] hover:bg-[#fee715] hover:text-[#101820]'
              }`}
            >
              Dowiedz się więcej
            </a>
          )}
        </div>
      );

    case 'custom':
      return (
        <div
          dangerouslySetInnerHTML={{ __html: block.data.html || '' }}
          style={block.data.css ? ({ cssText: block.data.css } as React.CSSProperties) : undefined}
        />
      );

    case 'highlight':
      // Blok z tłem (highlighted block) - prostokąt bez zaokrągleń, bez paska po lewej, z ikonami
      const highlightText = block.data.text || '';
      const hasList = highlightText.includes('<ul>') || highlightText.includes('<li>');
      
      // Jeśli ma listę, parsuj i dodaj ikony (tylko ikonka, bez kropeczki)
      let processedText = highlightText;
      if (hasList) {
        // Dodaj klasę do ul i zamień li na format z ikoną (bez kropeczki)
        processedText = processedText.replace(/<ul>/g, '<ul class="space-y-5 list-none pl-0">');
        processedText = processedText.replace(
          /<li>/g,
          '<li class="flex items-start gap-4"><span class="flex-shrink-0 mt-0.5"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="12" fill="#fee715"/><path d="M8 12l2 2 4-4" stroke="#101820" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="flex-1 text-lg leading-relaxed">'
        );
        processedText = processedText.replace(/<\/li>/g, '</span></li>');
      }
      
      return (
        <div className="my-16 md:my-20 px-10 md:px-12 lg:px-16 bg-gray-50 text-[#101820] border-2 border-gray-200">
          <div className="pt-10 md:pt-12 lg:pt-16 pb-10 md:pb-12 lg:pb-16">
            {block.data.title && (
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-[Montserrat] text-[#101820] mb-8 md:mb-10 uppercase tracking-tight leading-[1.6] m-0">
                {block.data.title}
              </h3>
            )}
            {block.data.subtitle && (
              <p className="text-xl md:text-2xl text-gray-700 mb-8 md:mb-10 font-semibold leading-[1.6] m-0">{block.data.subtitle}</p>
            )}
            {block.data.text && (
              <div 
                className="prose prose-lg max-w-none prose-ul:my-8 prose-ul:list-none prose-ul:pl-0 prose-li:my-5 prose-li:pl-0 prose-p:text-[#101820] prose-p:text-lg prose-p:leading-[1.7] prose-p:mb-6 prose-strong:text-[#101820] prose-strong:font-extrabold"
                dangerouslySetInnerHTML={{ __html: processedText }}
              />
            )}
          </div>
        </div>
      );

    case 'separator':
      // Gruba żółta linia separująca sekcje
      return (
        <div className="my-16 md:my-20 h-4 bg-[#fee715]"></div>
      );

    case 'heading':
      // Nagłówek w żółtym boksie (sharp edges, ciemny tekst, bez outline) - pasek z optycznym wyśrodkowaniem
      return (
        <div id={block.id} className="my-12 md:my-16 scroll-mt-20">
          <div className="max-w-6xl mx-auto">
            <div className="bg-[#fee715] px-10 md:px-16 lg:px-20 flex items-center justify-center min-h-[60px] md:min-h-[70px] py-6 md:py-7">
              <h2 
                className="text-lg md:text-xl lg:text-2xl font-extrabold font-[Montserrat] text-[#101820] leading-[2.6] tracking-tight text-center m-0 p-0 max-w-5xl -translate-y-[15px]"
                dangerouslySetInnerHTML={{ __html: block.data.text || '' }}
              />
            </div>
          </div>
        </div>
      );

    case 'numbered-section':
      // Numerowana sekcja z kwadratem i numerem - clean design z jasnym tłem
      return (
        <div id={block.id} className="my-12 md:my-16 scroll-mt-20">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 md:gap-6">
              {/* Kwadrat z numerem - bez outline */}
              <div className="flex-shrink-0">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-[#fee715] flex items-center justify-center">
                  <span className="text-xl md:text-2xl font-extrabold font-[Montserrat] text-[#101820]">
                    {block.data.number || ''}
                  </span>
                </div>
              </div>
              {/* Tytuł sekcji w prostokącie z jasnym tłem - ta sama wysokość co kwadrat */}
              <div className="flex-1">
                <div className="h-14 md:h-16 bg-gray-50 px-4 md:px-6 flex items-center">
                  <h2 className="text-lg md:text-xl lg:text-2xl font-extrabold font-[Montserrat] text-[#101820] leading-tight tracking-tight m-0 p-0 uppercase">
                    {block.data.text || ''}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { post, loading, error } = useBlogPost(slug || '');

  useEffect(() => {
    // Scroll do góry przy zmianie posta
    window.scrollTo(0, 0);
  }, [slug]);

  // SEO Meta Tags i Preload
  useEffect(() => {
    if (!post) return;

    const BASE_URL = 'https://drozniak.pl';
    const canonicalUrl = `${BASE_URL}/blog/${post.slug}`;

    // Update document title
    document.title = post.meta_title || post.title;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', post.meta_description || post.excerpt || '');

    // Update Open Graph tags
    const updateOGTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
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
    updateOGTag('og:title', post.meta_title || post.title);
    updateOGTag('og:description', post.meta_description || post.excerpt || '');
    const ogImage = post.og_image_url || post.featured_image_url || '';
    if (ogImage) {
      const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;
      updateOGTag('og:image', ogImageUrl);
      updateOGTag('og:image:width', '1200');
      updateOGTag('og:image:height', '630');
    }
    updateOGTag('og:type', 'article');
    updateOGTag('og:url', canonicalUrl);

    // Article specific OG tags
    if (post.published_at) {
      updateOGTag('article:published_time', new Date(post.published_at).toISOString());
    }
    if (post.updated_at) {
      updateOGTag('article:modified_time', new Date(post.updated_at).toISOString());
    }
    if (post.category_name) {
      updateOGTag('article:section', post.category_name);
    }
    if (post.tags && post.tags.length > 0) {
      post.tags.forEach(tag => {
        updateOGTag('article:tag', tag);
      });
    }

    // Twitter Cards
    updateTwitterTag('twitter:card', 'summary_large_image');
    updateTwitterTag('twitter:title', post.meta_title || post.title);
    updateTwitterTag('twitter:description', post.meta_description || post.excerpt || '');
    if (ogImage) {
      const twitterImageUrl = ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;
      updateTwitterTag('twitter:image', twitterImageUrl);
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Preload hero image jeśli istnieje
    if (post.featured_image_url) {
      let preloadLink = document.querySelector('link[rel="preload"][as="image"][data-blog-hero]');
      if (!preloadLink) {
        preloadLink = document.createElement('link');
        preloadLink.setAttribute('rel', 'preload');
        preloadLink.setAttribute('as', 'image');
        preloadLink.setAttribute('data-blog-hero', 'true');
        document.head.appendChild(preloadLink);
      }
      preloadLink.setAttribute('href', getDesktopImageUrl(post.featured_image_url));
    }

    // Schema.org JSON-LD: BlogPosting
    const blogPostingSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.meta_description || post.excerpt || '',
      "url": canonicalUrl,
      "datePublished": post.published_at ? new Date(post.published_at).toISOString() : undefined,
      "dateModified": post.updated_at ? new Date(post.updated_at).toISOString() : undefined,
      "author": {
        "@type": "Person",
        "name": "Stanisław Drożniak",
        "url": BASE_URL,
        "sameAs": [
          "https://www.linkedin.com/in/stanislawdrozniak"
        ]
      },
      "publisher": {
        "@type": "Person",
        "name": "Stanisław Drożniak",
        "url": BASE_URL,
        "sameAs": [
          "https://www.linkedin.com/in/stanislawdrozniak"
        ]
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl
      },
      ...(post.featured_image_url && {
        "image": {
          "@type": "ImageObject",
          "url": post.featured_image_url.startsWith('http') ? post.featured_image_url : `${BASE_URL}${post.featured_image_url.startsWith('/') ? '' : '/'}${post.featured_image_url}`,
          "width": 1200,
          "height": 630
        }
      }),
      ...(post.category_name && {
        "articleSection": post.category_name
      }),
      ...(post.tags && post.tags.length > 0 && {
        "keywords": post.tags.join(', ')
      })
    };

    // Schema.org JSON-LD: BreadcrumbList
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Strona główna",
          "item": BASE_URL
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": `${BASE_URL}/blog`
        },
        ...(post.category_name ? [{
          "@type": "ListItem",
          "position": 3,
          "name": post.category_name,
          "item": `${BASE_URL}/blog/kategoria/${post.category_slug}`
        }] : []),
        {
          "@type": "ListItem",
          "position": post.category_name ? 4 : 3,
          "name": post.title,
          "item": canonicalUrl
        }
      ]
    };

    // Add schemas to page
    const addSchema = (schema: object, id: string) => {
      const existing = document.getElementById(id);
      if (existing) {
        existing.remove();
      }
      const script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    };

    addSchema(blogPostingSchema, 'schema-blogposting');
    addSchema(breadcrumbSchema, 'schema-breadcrumb');

    // Cleanup function
    return () => {
      document.title = 'Stanisław Drozniak - Marketing, Strony WWW, AI';
      // Usuń preload link
      const preloadLink = document.querySelector('link[rel="preload"][as="image"][data-blog-hero]');
      if (preloadLink) {
        preloadLink.remove();
      }
      // Usuń schemas
      ['schema-blogposting', 'schema-breadcrumb'].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          element.remove();
        }
      });
    };
  }, [post]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6 px-4">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-[#fee715] rounded-full animate-spin" />
        <p className="text-base text-gray-600 font-medium">Ładowanie artykułu...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Post nie został znaleziony</h2>
          <p className="text-gray-600 mb-6">{error?.message || 'Post o podanym adresie nie istnieje.'}</p>
          <Link
            to="/blog"
            className="inline-block px-6 py-3 bg-[#fee715] text-[#101820] rounded-lg font-semibold hover:bg-[#00C9A7] transition-colors"
          >
            Wróć do bloga
          </Link>
        </div>
      </div>
    );
  }

  const maxWidthClass = {
    narrow: 'max-w-3xl',
    standard: 'max-w-5xl',
    wide: 'max-w-6xl',
    custom: 'max-w-5xl',
  }[post.layout_type];

  return (
    <article className="min-h-screen bg-white text-[#101820]">
        {/* Breadcrumbs - Premium Style */}
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-10 max-w-7xl border-b border-gray-200">
          <nav className="flex items-center gap-2 md:gap-3 flex-wrap text-sm md:text-base">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-[#101820] hover:bg-[#fee715]/10 px-3 py-1.5 transition-all font-medium rounded-sm"
            >
              Strona główna
            </Link>
            <CaretRight size={16} weight="bold" className="text-gray-300 flex-shrink-0" />
            <Link 
              to="/blog" 
              className="text-gray-600 hover:text-[#101820] hover:bg-[#fee715]/10 px-3 py-1.5 transition-all font-medium rounded-sm"
            >
              Blog
            </Link>
            {post.category_name && (
              <>
                <CaretRight size={16} weight="bold" className="text-gray-300 flex-shrink-0" />
                <Link
                  to={`/blog/kategoria/${post.category_slug}`}
                  className="text-gray-600 hover:text-[#101820] hover:bg-[#fee715]/10 px-3 py-1.5 transition-all font-medium rounded-sm"
                >
                  {post.category_name}
                </Link>
              </>
            )}
            <CaretRight size={16} weight="bold" className="text-[#fee715] flex-shrink-0" />
            <span className="text-[#101820] font-extrabold px-3 py-1.5 max-w-[600px] truncate">
              {post.title}
            </span>
          </nav>
        </div>

        {/* Treść artykułu */}
        <div className={`container mx-auto px-4 md:px-6 py-16 md:py-20 lg:py-24 ${maxWidthClass}`}>
          {/* Kategoria i data */}
          <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-10 flex-wrap">
            {post.category_name && (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#fee715]"></span>
                <span
                  className="inline-block text-xs font-semibold px-3 py-1 border border-gray-300"
                  style={{
                    color: '#101820',
                  }}
                >
                  {post.category_name}
                </span>
              </div>
            )}
            {post.published_at && (
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={16} weight="regular" className="text-gray-500 flex-shrink-0" />
                <span className="text-sm">
                  {new Date(post.published_at).toLocaleDateString('pl-PL', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            )}
            {post.reading_time && (
              <div className="flex items-center gap-2 text-gray-600">
                <Clock size={16} weight="regular" className="text-gray-500 flex-shrink-0" />
                <span className="text-sm">{post.reading_time} min</span>
              </div>
            )}
          </div>

          {/* Tytuł */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-[Montserrat] text-[#101820] py-6 md:py-8 leading-tight tracking-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl md:text-2xl text-gray-700 mb-8 md:mb-10 leading-relaxed font-medium">
              {post.excerpt}
            </p>
          )}

          {/* Obraz hero pod tytułem i excerpt */}
          {post.featured_image_url && (
            <div className="w-full my-12 md:my-16 overflow-hidden bg-gray-100">
              <img
                src={getDesktopImageUrl(post.featured_image_url) || post.featured_image_url}
                srcSet={getHeroImageSrcSet(post.featured_image_url)}
                sizes="100vw"
                alt={post.title}
                className="w-full h-auto object-cover"
                loading="eager"
                fetchPriority="high"
                onError={(e) => {
                  // Fallback do oryginalnego URL jeśli przekształcony nie działa
                  const target = e.target as HTMLImageElement;
                  if (post.featured_image_url && target.src !== post.featured_image_url) {
                    target.src = post.featured_image_url;
                  }
                }}
              />
            </div>
          )}

          {/* Separator */}
          <div className="w-40 h-4 bg-[#fee715] mb-20 md:mb-24"></div>

          {/* Spis treści */}
          {(() => {
            // Funkcja do generowania spisu treści - tylko główne sekcje (numbered-section) i podsekcje (h3)
            const generateTableOfContents = (blocks: ContentBlock[]) => {
              const tocItems: Array<{ id: string; title: string; type: 'numbered-section' | 'h3'; number?: number; parentId?: string }> = [];
              let currentParentId: string | null = null;
              
              blocks.forEach((block) => {
                if (block.type === 'numbered-section' && block.data.text) {
                  currentParentId = block.id;
                  tocItems.push({
                    id: block.id,
                    title: block.data.text,
                    type: 'numbered-section',
                    number: block.data.number
                  });
                } else if (block.type === 'text' && block.data.text && currentParentId) {
                  // Wyciągnij tylko h3 z bloków tekstowych (podsekcje)
                  const h3Matches = block.data.text.matchAll(/<h3[^>]*>(.*?)<\/h3>/gi);
                  let h3Index = 0;
                  for (const match of h3Matches) {
                    const cleanText = match[1].replace(/<[^>]*>/g, '').trim();
                    if (cleanText) {
                      tocItems.push({
                        id: `${block.id}-h3-${h3Index++}`,
                        title: cleanText,
                        type: 'h3',
                        parentId: currentParentId
                      });
                    }
                  }
                }
              });
              
              return tocItems.length > 0 ? tocItems : null;
            };

            const tocItems = post.content?.blocks ? generateTableOfContents(post.content.blocks) : null;

            if (!tocItems || tocItems.length === 0) return null;

            return (
              <div className="mb-16 md:mb-20 p-8 md:p-10 bg-gray-50 border-2 border-gray-200">
                <h3 className="text-2xl md:text-3xl font-extrabold font-[Montserrat] text-[#101820] mb-6 md:mb-8 uppercase tracking-tight">
                  Spis treści
                </h3>
                <nav className="space-y-1">
                  {tocItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block text-base md:text-lg text-[#101820] px-4 py-2 transition-all rounded ${
                        item.type === 'h3' 
                          ? 'ml-6 hover:bg-[#fee715]/20' 
                          : 'font-semibold hover:bg-[#fee715]/20'
                      }`}
                    >
                      {item.type === 'numbered-section' && item.number && (
                        <span className="text-[#101820] font-extrabold mr-2">{item.number}.</span>
                      )}
                      {item.type === 'h3' && (
                        <span className="text-gray-500 mr-2">•</span>
                      )}
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>
            );
          })()}

          {/* Bloki treści */}
          <div className="blog-content text-[#101820]">
              {post.content?.blocks?.map((block, index) => {
              // Automatycznie dodaj separator po dużych sekcjach (h2), ale tylko jeśli poprzedni blok nie był separatorem
              const prevBlock = index > 0 ? post.content?.blocks[index - 1] : null;
              const isNewSection = block.type === 'text' && block.data.text && 
                (block.data.text.includes('<h2>') || block.data.text.includes('<h2 '));
              const prevWasSeparator = prevBlock?.type === 'separator';
              const currentIsSeparator = block.type === 'separator';
              const shouldAddSeparator = isNewSection && index > 0 && prevBlock && !prevWasSeparator;
              
              // Pomiń separator, jeśli poprzedni blok też był separatorem (usuń duplikaty)
              if (currentIsSeparator && prevWasSeparator) {
                return null;
              }
              
              return (
                <React.Fragment key={block.id}>
                  {shouldAddSeparator && (
                    <div className="my-16 md:my-20 h-4 bg-[#fee715]"></div>
                  )}
                  <ContentBlockRenderer block={block} />
                </React.Fragment>
              );
            })}
          </div>

          {/* Tagi */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-20 md:mt-24 pt-16">
              <div className="h-4 bg-[#fee715] mb-10"></div>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 text-sm bg-gray-100 border border-gray-300 text-[#101820] font-semibold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Powrót do bloga */}
          <div className="mt-20 md:mt-24 pt-16">
            <div className="h-4 bg-[#fee715] mb-10"></div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[#101820] hover:text-[#101820] transition-colors font-extrabold text-lg group"
            >
              <ArrowRight size={20} weight="bold" className="text-[#fee715] group-hover:translate-x-1 transition-transform" />
              Wróć do bloga
            </Link>
          </div>
        </div>
      </article>
  );
};
