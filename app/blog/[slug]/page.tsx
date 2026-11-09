import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { supabaseServer } from '@/lib/supabase-server';
// ContentBlock type definition (copied from hooks/useBlogPost.ts to avoid importing Vite-specific code)
export interface ContentBlock {
  type: 'text' | 'image' | 'quote' | 'code' | 'video' | 'cta' | 'custom' | 'highlight' | 'separator' | 'heading' | 'numbered-section';
  id: string;
  data: {
    text?: string;
    alignment?: 'left' | 'center' | 'right';
    imageUrl?: string;
    alt?: string;
    caption?: string;
    width?: 'narrow' | 'standard' | 'wide' | 'full';
    quote?: string;
    author?: string;
    code?: string;
    language?: string;
    videoUrl?: string;
    videoType?: 'youtube' | 'vimeo' | 'direct';
    ctaText?: string;
    ctaLink?: string;
    ctaStyle?: 'primary' | 'secondary';
    html?: string;
    css?: string;
    js?: string;
    title?: string;
    subtitle?: string;
    number?: number;
  };
}
// Icons - using Client Component to avoid SSR issues with phosphor-react
import { CaretRight, Clock, Calendar } from '@/app/components/BlogIcons';

const BASE_URL = 'https://drozniak.pl';

// Helper functions for images (same as in original BlogPost.tsx)
const getDesktopImageUrl = (baseUrl: string): string => {
  if (baseUrl.includes('-1024.webp')) {
    return baseUrl.replace('-1024.webp', '-2000.webp');
  }
  if (baseUrl.includes('-2000.webp')) {
    return baseUrl;
  }
  // URL bez konwencji -1024/-2000 – zwracamy bez zmian (np. Drozniak_www_desktop.webp)
  return baseUrl;
};

const getHeroImageSrcSet = (baseUrl: string): string => {
  if (!baseUrl) return '';
  if (baseUrl.includes('-1024.webp')) {
    const url2000 = baseUrl.replace('-1024.webp', '-2000.webp');
    return `${baseUrl} 1024w, ${url2000} 2000w`;
  }
  if (baseUrl.includes('-2000.webp')) {
    const url1024 = baseUrl.replace('-2000.webp', '-1024.webp');
    return `${url1024} 1024w, ${baseUrl} 2000w`;
  }
  const cleanUrl = baseUrl.replace(/\.(webp|jpg|png)$/i, '');
  const url1024 = `${cleanUrl}-1024.webp`;
  const url2000 = `${cleanUrl}-2000.webp`;
  return `${url1024} 1024w, ${url2000} 2000w`;
};

// Content Block Renderer (simplified version)
const ContentBlockRenderer: React.FC<{ block: ContentBlock; inPair?: boolean }> = ({ block, inPair = false }) => {
  switch (block.type) {
    case 'text':
      let textContent = block.data.text || '';
      const hasH2 = textContent.includes('<h2>') || textContent.includes('<h2 ');
      const hasH3 = textContent.includes('<h3>') || textContent.includes('<h3 ');
      
      if (hasH2 || hasH3) {
        let h2Index = 0;
        textContent = textContent.replace(/<h2([^>]*)>/gi, (match, attrs) => {
          if (!attrs.includes('id=')) {
            const id = `${block.id}-h2-${h2Index++}`;
            return `<h2 id="${id}" class="scroll-mt-20"${attrs}>`;
          }
          if (!attrs.includes('class=')) {
            return `<h2 class="scroll-mt-20"${attrs}>`;
          } else if (!attrs.includes('scroll-mt-20')) {
            return `<h2${attrs.replace(/class="([^"]*)"/, 'class="$1 scroll-mt-20"')}>`;
          }
          return match;
        });
        
        let h3Index = 0;
        textContent = textContent.replace(/<h3([^>]*)>/gi, (match, attrs) => {
          if (!attrs.includes('id=')) {
            const id = `${block.id}-h3-${h3Index++}`;
            return `<h3 id="${id}" class="scroll-mt-20"${attrs}>`;
          }
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
            hasH2 ? 'prose-headings:font-extrabold prose-headings:tracking-[-0.03em] prose-headings:text-[#161511] prose-h2:text-3xl prose-h2:md:text-4xl prose-h2:lg:text-[2.75rem] prose-h2:mb-6 prose-h2:mt-16 prose-h2:md:mt-20 prose-h2:leading-[1.12] prose-h2:py-2' : ''
          } ${
            hasH3 ? 'prose-h3:text-xl prose-h3:md:text-2xl prose-h3:lg:text-3xl prose-h3:mb-5 prose-h3:mt-12 prose-h3:md:mt-14 prose-h3:font-extrabold prose-h3:tracking-[-0.02em] prose-h3:text-[#161511] prose-h3:leading-[1.2] prose-h3:py-2' : ''
          } prose-p:leading-[1.7] prose-p:text-[#101820] prose-p:text-lg md:prose-p:text-xl prose-p:mb-8 prose-ul:my-10 prose-li:my-4 prose-li:text-[#101820] prose-li:leading-[1.7] prose-strong:text-[#101820] prose-strong:font-extrabold prose-a:text-[#101820] prose-a:underline prose-a:decoration-[#C9A227] prose-a:decoration-2 prose-a:underline-offset-2 prose-a:hover:text-[#8F7418] prose-a:hover:decoration-[#8F7418] prose-a:transition-colors`}
          dangerouslySetInnerHTML={{ __html: textContent }}
        />
      );

    case 'image':
      if (!block.data.imageUrl) return null;
      const widthClass = inPair
        ? 'w-full'
        : {
            narrow: 'max-w-md mx-auto',
            standard: 'max-w-2xl mx-auto',
            wide: 'max-w-4xl mx-auto',
            full: 'w-full',
          }[block.data.width || 'standard'];
      const marginClass = inPair ? '' : 'my-16 md:my-20';

      const imageSrc = getDesktopImageUrl(block.data.imageUrl);
      
      return (
        <figure className={`${marginClass} ${widthClass}`}>
          <img
            src={imageSrc}
            alt={block.data.alt || ''}
            className="w-full border border-[#E4E1D8] rounded-[4px]"
            loading="lazy"
          />
          {block.data.caption && (
            <figcaption className="text-center text-base text-[#85816F] mt-6 font-medium">
              {block.data.caption}
            </figcaption>
          )}
        </figure>
      );

    case 'quote':
      return (
        <blockquote className="border-l-2 border-[#C9A227] pl-8 md:pl-10 py-6 my-16 md:my-20">
          <p className="m-0 pub-serif italic text-xl md:text-2xl text-[#161511] leading-[1.55]">
            &bdquo;{block.data.quote}&rdquo;
          </p>
          {block.data.author && (
            <footer className="text-sm mt-5 font-semibold uppercase tracking-[0.14em] text-[#85816F] not-italic m-0">
              - {block.data.author}
            </footer>
          )}
        </blockquote>
      );

    case 'separator':
      return (
        <div className="my-16 md:my-20 flex items-center gap-4" aria-hidden>
          <span className="w-12 h-[2px] bg-[#C9A227]"></span>
          <span className="flex-1 h-px bg-[#E4E1D8]"></span>
        </div>
      );

    case 'heading':
      return (
        <div id={block.id} className="my-12 md:my-16 scroll-mt-20">
          <div className="max-w-6xl mx-auto">
            <div className="bg-[#F1EBDA] border border-[#E4E1D8] rounded-[4px] px-8 md:px-14 lg:px-16 flex items-center justify-center min-h-[60px] md:min-h-[70px] py-6 md:py-7">
              <h2
                className="text-lg md:text-xl lg:text-2xl font-extrabold text-[#161511] leading-[1.35] tracking-[-0.02em] text-center !m-0 !p-0 max-w-5xl"
                dangerouslySetInnerHTML={{ __html: block.data.text || '' }}
              />
            </div>
          </div>
        </div>
      );

    case 'highlight':
      const highlightText = block.data.text || '';
      const hasList = highlightText.includes('<ul>') || highlightText.includes('<li>');
      
      let processedText = highlightText;
      if (hasList) {
        processedText = processedText.replace(/<ul>/g, '<ul class="space-y-5 list-none pl-0">');
        processedText = processedText.replace(
          /<li>/g,
          '<li class="flex items-start gap-4"><span class="flex-shrink-0 mt-0.5"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="12" fill="#C9A227"/><path d="M8 12l2 2 4-4" stroke="#161511" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="flex-1 text-lg leading-relaxed">'
        );
        processedText = processedText.replace(/<\/li>/g, '</span></li>');
      }

      return (
        <div className="my-16 md:my-20 px-8 md:px-12 lg:px-16 bg-[#F6F5F1] text-[#101820] border border-[#E4E1D8] rounded-[4px]">
          <div className="pt-10 md:pt-12 lg:pt-14 pb-10 md:pb-12 lg:pb-14">
            {block.data.title && (
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#161511] tracking-[-0.02em] leading-[1.2] !m-0 !mb-6 md:!mb-8 !p-0">
                {block.data.title}
              </h3>
            )}
            {block.data.subtitle && (
              <p className="text-lg md:text-xl text-[#4A4740] mb-8 md:mb-10 font-semibold leading-[1.6] m-0">{block.data.subtitle}</p>
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

    case 'numbered-section':
      return (
        <div id={block.id} className="my-12 md:my-16 scroll-mt-20">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-[#161511] rounded-[2px] flex items-center justify-center">
                  <span className="pub-serif text-2xl md:text-3xl text-[#F2CE4B]">
                    {block.data.number || ''}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <div className="h-14 md:h-16 bg-[#F6F5F1] border border-[#E4E1D8] rounded-[2px] px-4 md:px-6 flex items-center">
                  <h2 className="text-lg md:text-xl lg:text-2xl font-extrabold text-[#161511] leading-tight tracking-[-0.02em] m-0 p-0">
                    {block.data.text || ''}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'cta':
      return (
        <div className="my-16 md:my-20 text-center py-10 md:py-12 px-8 md:px-12 bg-[#F1EBDA]/60 border border-[#E4E1D8] rounded-[4px] flex flex-col items-center justify-center">
          <p className="text-xl md:text-2xl font-extrabold tracking-[-0.02em] text-[#161511] mb-7 leading-[1.4] m-0">{block.data.ctaText}</p>
          {block.data.ctaLink && (
            <a
              href={block.data.ctaLink}
              className={block.data.ctaStyle === 'primary' ? 'pub-btn pub-btn-primary' : 'pub-btn pub-btn-outline'}
            >
              Dowiedz się więcej
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          )}
        </div>
      );

    default:
      return null;
  }
};

// Fetch blog post
async function getBlogPost(slug: string) {
  const { data, error } = await supabaseServer
    .from('blog_posts')
    .select(`
      *,
      category:blog_categories(name, slug, color)
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error || !data) {
    return null;
  }

  return {
    ...data,
    category_name: (data.category as any)?.name || null,
    category_slug: (data.category as any)?.slug || null,
    category_color: (data.category as any)?.color || null,
  };
}

// Generate metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: 'Post nie został znaleziony',
    };
  }

  const canonicalUrl = `${BASE_URL}/blog/${post.slug}`;
  const ogImage = post.og_image_url || post.featured_image_url || '';
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt || '',
    keywords: post.meta_keywords || [],
    openGraph: {
      type: 'article',
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt || '',
      url: canonicalUrl,
      images: ogImage ? [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ] : [],
      publishedTime: post.published_at || undefined,
      modifiedTime: post.updated_at || undefined,
      authors: ['Stanisław Drożniak'],
      section: post.category_name || undefined,
      tags: post.tags || [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt || '',
      images: ogImage ? [ogImageUrl] : [],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

// Generate static params (for ISR)
export async function generateStaticParams() {
  const { data } = await supabaseServer
    .from('blog_posts')
    .select('slug')
    .eq('status', 'published');

  if (!data) {
    return [];
  }

  return data.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const canonicalUrl = `${BASE_URL}/blog/${post.slug}`;
  const ogImage = post.og_image_url || post.featured_image_url || '';
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;

  // Schema.org JSON-LD
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.meta_description || post.excerpt || '',
    url: canonicalUrl,
    datePublished: post.published_at ? new Date(post.published_at).toISOString() : undefined,
    dateModified: post.updated_at ? new Date(post.updated_at).toISOString() : undefined,
    author: {
      '@type': 'Person',
      name: 'Stanisław Drożniak',
      url: BASE_URL,
      sameAs: ['https://www.linkedin.com/in/stanislawdrozniak'],
    },
    publisher: {
      '@type': 'Person',
      name: 'Stanisław Drożniak',
      url: BASE_URL,
      sameAs: ['https://www.linkedin.com/in/stanislawdrozniak'],
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    ...(ogImage && {
      image: {
        '@type': 'ImageObject',
        url: ogImageUrl,
        width: 1200,
        height: 630,
      },
    }),
    ...(post.category_name && {
      articleSection: post.category_name,
    }),
    ...(post.tags && post.tags.length > 0 && {
      keywords: post.tags.join(', '),
    }),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Strona główna',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${BASE_URL}/blog`,
      },
      ...(post.category_name ? [{
        '@type': 'ListItem',
        position: 3,
        name: post.category_name,
        item: `${BASE_URL}/blog/kategoria/${post.category_slug}`,
      }] : []),
      {
        '@type': 'ListItem',
        position: post.category_name ? 4 : 3,
        name: post.title,
        item: canonicalUrl,
      },
    ],
  };

  const layoutType = (post.layout_type || 'standard') as 'standard' | 'wide' | 'narrow' | 'custom';
  const maxWidthClass = {
    narrow: 'max-w-3xl',
    standard: 'max-w-5xl',
    wide: 'max-w-6xl',
    custom: 'max-w-5xl',
  }[layoutType];

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
        id="schema-blogposting"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        id="schema-breadcrumb"
      />

      <article className="min-h-screen bg-[#FFFFFF] text-[#101820]">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 md:px-6 py-6 md:py-8 max-w-7xl border-b border-[#E4E1D8]">
          <nav aria-label="Okruszki" className="flex items-center gap-1.5 md:gap-2 flex-wrap text-[13px] md:text-sm">
            <Link
              href="/"
              className="text-[#85816F] hover:text-[#161511] px-2 py-1.5 transition-colors font-medium rounded-[2px] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#161511]"
            >
              Strona główna
            </Link>
            <CaretRight size={14} weight="bold" className="text-[#D6D2C6] flex-shrink-0" />
            <Link
              href="/blog"
              className="text-[#85816F] hover:text-[#161511] px-2 py-1.5 transition-colors font-medium rounded-[2px] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#161511]"
            >
              Blog
            </Link>
            {post.category_name && (
              <>
                <CaretRight size={14} weight="bold" className="text-[#D6D2C6] flex-shrink-0" />
                <Link
                  href={`/blog/kategoria/${post.category_slug}`}
                  className="text-[#85816F] hover:text-[#161511] px-2 py-1.5 transition-colors font-medium rounded-[2px] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#161511]"
                >
                  {post.category_name}
                </Link>
              </>
            )}
            <CaretRight size={14} weight="bold" className="text-[#C9A227] flex-shrink-0" />
            <span className="text-[#161511] font-semibold px-2 py-1.5 max-w-[600px] truncate">
              {post.title}
            </span>
          </nav>
        </div>

        {/* Content */}
        <div className={`container mx-auto px-4 md:px-6 py-16 md:py-20 lg:py-24 ${maxWidthClass}`}>
          {/* Category and date - stable DOM order to avoid hydration mismatch */}
          <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-10 flex-wrap">
            <div className="flex items-center gap-2">
              {post.category_name ? (
                <>
                  <span className="w-2 h-2 bg-[#C9A227]" aria-hidden />
                  <span className="pub-chip">{post.category_name}</span>
                </>
              ) : null}
            </div>
            <div className="flex items-center gap-2 text-[#85816F]">
              {post.published_at ? (
                <>
                  <Calendar size={16} weight="regular" className="text-[#85816F] flex-shrink-0" />
                  <span className="text-sm" suppressHydrationWarning>
                    {new Date(post.published_at).toLocaleDateString('pl-PL', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </>
              ) : null}
            </div>
            <div className="flex items-center gap-2 text-[#85816F]">
              {post.reading_time ? (
                <>
                  <Clock size={16} weight="regular" className="text-[#85816F] flex-shrink-0" />
                  <span className="text-sm">{post.reading_time} min</span>
                </>
              ) : null}
            </div>
          </div>

          {/* Title */}
          <h1 className="pub-h-serif text-[clamp(2.2rem,5vw,3.8rem)] py-4 md:py-6">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl md:text-2xl text-[#4A4740] mb-8 md:mb-10 leading-[1.6] font-medium text-pretty">
              {post.excerpt}
            </p>
          )}

          {/* Hero image */}
          {post.featured_image_url && (
            <div className="w-full my-12 md:my-16 overflow-hidden rounded-[4px] border border-[#E4E1D8] bg-[#F6F5F1]">
              <img
                src={getDesktopImageUrl(post.featured_image_url) || post.featured_image_url}
                srcSet={getHeroImageSrcSet(post.featured_image_url)}
                sizes="100vw"
                alt={post.title}
                className="w-full h-auto object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          )}

          {/* Separator */}
          <div className="w-16 h-[3px] bg-[#C9A227] mb-16 md:mb-20" aria-hidden></div>

          {/* Content blocks */}
          <div className="blog-content text-[#101820]">
            {post.content?.blocks?.map((block: ContentBlock, index: number) => {
              const prevBlock = index > 0 ? post.content?.blocks[index - 1] : null;
              const nextBlock = index < (post.content?.blocks?.length ?? 0) - 1 ? post.content?.blocks[index + 1] : null;
              const isNewSection = block.type === 'text' && block.data.text && 
                (block.data.text.includes('<h2>') || block.data.text.includes('<h2 '));
              const prevWasSeparator = prevBlock?.type === 'separator';
              const currentIsSeparator = block.type === 'separator';
              const shouldAddSeparator = isNewSection && index > 0 && prevBlock && !prevWasSeparator;
              const isSecondOfImagePair = prevBlock?.type === 'image' && block.type === 'image';
              const isFirstOfImagePair = block.type === 'image' && nextBlock?.type === 'image';
              
              if (currentIsSeparator && prevWasSeparator) {
                return null;
              }
              if (isSecondOfImagePair) {
                return null;
              }
              
              if (isFirstOfImagePair && nextBlock) {
                return (
                  <div key={`${block.id}-${nextBlock.id}`}>
                    {shouldAddSeparator && (
                      <div className="my-16 md:my-20 flex items-center gap-4" aria-hidden>
                        <span className="w-12 h-[2px] bg-[#C9A227]"></span>
                        <span className="flex-1 h-px bg-[#E4E1D8]"></span>
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 my-16 md:my-20 max-w-5xl mx-auto">
                      <ContentBlockRenderer block={block} inPair />
                      <ContentBlockRenderer block={nextBlock} inPair />
                    </div>
                  </div>
                );
              }
              
              return (
                <div key={block.id}>
                  {shouldAddSeparator && (
                    <div className="my-16 md:my-20 flex items-center gap-4" aria-hidden>
                      <span className="w-12 h-[2px] bg-[#C9A227]"></span>
                      <span className="flex-1 h-px bg-[#E4E1D8]"></span>
                    </div>
                  )}
                  <ContentBlockRenderer block={block} />
                </div>
              );
            })}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-16 md:mt-20 pt-10 border-t border-[#E4E1D8]">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#85816F] mb-5">
                Tagi
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span key={tag} className="pub-chip">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Autor */}
          <div className="mt-16 md:mt-20 pt-10 border-t border-[#E4E1D8] flex items-center gap-5">
            <img
              src="/images/Drozniak_photo_suit_1.webp"
              alt="Stanisław Drożniak"
              className="w-14 h-14 md:w-16 md:h-16 object-cover rounded-[4px] border border-[#E4E1D8]"
              loading="lazy"
            />
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#85816F]">
                Autor
              </p>
              <p className="mt-1 pub-serif text-lg md:text-xl text-[#161511]">Stanisław Drożniak</p>
              <p className="text-[13px] text-[#4A4740]">
                Marketing, strony www i AI - w jednych rękach
              </p>
            </div>
          </div>

          {/* CTA na końcu artykułu */}
          <div className="mt-12 md:mt-16 p-8 md:p-12 bg-[#F1EBDA]/60 border border-[#E4E1D8] rounded-[4px] text-center">
            <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)]">
              <span className="pub-h-serif block">Masz projekt,</span>
              <span className="pub-h-sans block mt-1">który chcesz dopracować?</span>
            </h2>
            <p className="mt-5 text-base md:text-lg text-[#4A4740] leading-[1.7]">
              Napisz do mnie - odpowiadam w 24 godziny.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/kontakt" className="pub-btn pub-btn-primary">
                Porozmawiajmy
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/blog" className="pub-btn pub-btn-outline">
                Wróć do bloga
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

// ISR: Revalidate every hour
export const revalidate = 3600;
