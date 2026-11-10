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
          className={`prose prose-lg text-[length:var(--t-body)] max-w-none my-12 md:my-16 text-[#161511] ${
            block.data.alignment === 'center' ? 'text-center' : ''
          } ${block.data.alignment === 'right' ? 'text-right' : ''
          } ${
            hasH2 ? 'prose-headings:font-[family-name:var(--font-display),Georgia,serif] prose-headings:font-semibold prose-headings:tracking-[-0.01em] prose-headings:text-[#161511] prose-h2:text-[length:var(--t-h3)] prose-h2:mb-6 prose-h2:mt-16 prose-h2:md:mt-20 prose-h2:leading-[1.12] prose-h2:py-2' : ''
          } ${
            hasH3 ? 'prose-h3:text-[length:var(--t-body)] prose-h3:mb-5 prose-h3:mt-12 prose-h3:md:mt-14 prose-h3:font-semibold prose-h3:tracking-[-0.02em] prose-h3:text-[#161511] prose-h3:leading-[1.2] prose-h3:py-2' : ''
          } prose-p:leading-[1.55] prose-p:text-[#161511] prose-p:text-[length:var(--t-body)] prose-p:mb-6 prose-ul:my-8 prose-li:my-2 prose-li:text-[#161511] prose-li:leading-[1.55] prose-strong:text-[#161511] prose-strong:font-semibold prose-a:text-[#161511] prose-a:underline prose-a:decoration-[#161511]/40 prose-a:decoration-2 prose-a:underline-offset-2 prose-a:hover:text-[#161511] prose-a:hover:decoration-[#161511] prose-a:transition-colors`}
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
            className="w-full rounded-[16px]"
            loading="lazy"
          />
          {block.data.caption && (
            <figcaption className="text-[length:var(--t-small)] text-[#5E5A50] mt-3 font-medium">
              {block.data.caption}
            </figcaption>
          )}
        </figure>
      );

    case 'quote':
      return (
        <blockquote className="my-12 md:my-16 p-6 md:p-8 rounded-[16px] bg-[#ECEAE3]">
          <p className="m-0 pub-serif italic font-medium text-[length:var(--t-h3)] text-[#161511] leading-[1.3]">
            &bdquo;{block.data.quote}&rdquo;
          </p>
          {block.data.author && (
            <footer className="text-[length:var(--t-small)] mt-4 font-medium text-[#5E5A50] not-italic m-0">
              {block.data.author}
            </footer>
          )}
        </blockquote>
      );

    case 'separator':
      // Księga marki: sekcje oddziela odstęp, a nie linia
      return <div className="my-12 md:my-16" aria-hidden />;

    case 'heading':
      return (
        <div id={block.id} className="mt-16 md:mt-20 mb-6 scroll-mt-28">
          <h2
            className="pub-serif text-[length:var(--t-h3)] font-semibold text-[#161511] leading-[1.2] tracking-[-0.01em] !m-0 !p-0"
            dangerouslySetInnerHTML={{ __html: block.data.text || '' }}
          />
        </div>
      );

    case 'highlight':
      const highlightText = block.data.text || '';
      const hasList = highlightText.includes('<ul>') || highlightText.includes('<li>');
      
      let processedText = highlightText;
      if (hasList) {
        // Lista bez znaczków w kółkach (księga: ikony nie są punktorami), punkty oddziela odstęp
        processedText = processedText.replace(/<ul>/g, '<ul class="space-y-3 list-none pl-0">');
      }

      return (
        <div className="my-12 md:my-16 px-6 md:px-10 bg-[#ECEAE3] text-[#161511] rounded-[16px]">
          <div className="pt-8 md:pt-10 pb-8 md:pb-10">
            {block.data.title && (
              <h3 className="pub-serif text-[length:var(--t-h3)] font-semibold text-[#161511] tracking-[-0.01em] leading-[1.2] !m-0 !mb-6 md:!mb-8 !p-0">
                {block.data.title}
              </h3>
            )}
            {block.data.subtitle && (
              <p className="text-[length:var(--t-body)] text-[#161511] mb-8 md:mb-10 font-semibold leading-[1.6] m-0">{block.data.subtitle}</p>
            )}
            {block.data.text && (
              <div
                className="prose prose-lg text-[length:var(--t-body)] max-w-none prose-ul:my-8 prose-ul:list-none prose-ul:pl-0 prose-li:my-5 prose-li:pl-0 prose-p:text-[#161511] prose-p:text-[length:var(--t-body)] prose-p:leading-[1.7] prose-p:mb-6 prose-strong:text-[#161511] prose-strong:font-extrabold"
                dangerouslySetInnerHTML={{ __html: processedText }}
              />
            )}
          </div>
        </div>
      );

    case 'numbered-section':
      return (
        <div id={block.id} className="my-12 md:my-16 scroll-mt-20">
          <h2 className="pub-serif text-[length:var(--t-h3)] font-semibold text-[#161511] leading-[1.2] tracking-[-0.01em] m-0 p-0">
            {block.data.number ? `${block.data.number}. ` : ''}
            {block.data.text || ''}
          </h2>
        </div>
      );

    case 'cta':
      return (
        <div className="my-12 md:my-16 py-8 md:py-10 px-6 md:px-10 bg-[#ECEAE3] rounded-[16px] flex flex-col items-start">
          <p className="pub-serif text-[length:var(--t-h3)] font-semibold tracking-[-0.01em] text-[#161511] mb-6 leading-[1.2] m-0">{block.data.ctaText}</p>
          {block.data.ctaLink && (
            <a href={block.data.ctaLink} className="site-btn site-btn-ink">
              Zobacz szczegóły
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

      <article className="bp site-wrap">
        {/* Okruszki */}
        <nav aria-label="Okruszki" className="bp-crumbs">
          <Link href="/blog">Blog</Link>
          {post.category_name && (
            <>
              <span aria-hidden="true">/</span>
              <Link href={`/blog/kategoria/${post.category_slug}`}>{post.category_name}</Link>
            </>
          )}
        </nav>

        <div className={`bp-col ${layoutType === 'wide' ? 'bp-col-wide' : ''}`}>
          <header className="bp-head">
            <h1 className="hp-h2 bp-title">{post.title}</h1>
            <p className="bp-meta" suppressHydrationWarning>
              {post.published_at
                ? new Date(post.published_at).toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' })
                : ''}
              {post.reading_time ? `, ${post.reading_time} min czytania` : ''}
            </p>
            {post.excerpt && <p className="bp-lead">{post.excerpt}</p>}
          </header>

          {post.featured_image_url && (
            <figure className="bp-hero">
              <img
                src={getDesktopImageUrl(post.featured_image_url) || post.featured_image_url}
                srcSet={getHeroImageSrcSet(post.featured_image_url)}
                sizes="(min-width: 1100px) 860px, 100vw"
                alt={post.title}
                loading="eager"
                fetchPriority="high"
              />
            </figure>
          )}

          {/* Treść wpisu */}
          <div className="blog-content bp-content">
            {post.content?.blocks?.map((block: ContentBlock, index: number) => {
              const prevBlock = index > 0 ? post.content?.blocks[index - 1] : null;
              const nextBlock = index < (post.content?.blocks?.length ?? 0) - 1 ? post.content?.blocks[index + 1] : null;
              const prevWasSeparator = prevBlock?.type === 'separator';
              const currentIsSeparator = block.type === 'separator';
              const isSecondOfImagePair = prevBlock?.type === 'image' && block.type === 'image';
              const isFirstOfImagePair = block.type === 'image' && nextBlock?.type === 'image';

              if (currentIsSeparator && prevWasSeparator) return null;
              if (isSecondOfImagePair) return null;

              if (isFirstOfImagePair && nextBlock) {
                return (
                  <div key={`${block.id}-${nextBlock.id}`} className="grid grid-cols-1 md:grid-cols-2 gap-4 my-12 md:my-16">
                    <ContentBlockRenderer block={block} inPair />
                    <ContentBlockRenderer block={nextBlock} inPair />
                  </div>
                );
              }

              return (
                <div key={block.id}>
                  <ContentBlockRenderer block={block} />
                </div>
              );
            })}
          </div>

          {/* Tagi */}
          {post.tags && post.tags.length > 0 && (
            <ul className="bp-tags" aria-label="Tagi">
              {post.tags.map((tag: string) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}

          {/* Autor */}
          <div className="bp-author">
            <img src="/images/home/portret-omnie-600.jpg" alt="" width={64} height={64} loading="lazy" />
            <div>
              <p className="bp-author-name">Stanisław Drożniak</p>
              <p className="bp-author-role">Marketing i pozyskiwanie klientów dla firm</p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

// ISR: Revalidate every hour
export const revalidate = 3600;
