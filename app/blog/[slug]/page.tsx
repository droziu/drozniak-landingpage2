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
import { ArrowRight, CaretRight, Clock, Calendar } from '@/app/components/BlogIcons';

const BASE_URL = 'https://drozniak.pl';

// Helper functions for images (same as in original BlogPost.tsx)
const getDesktopImageUrl = (baseUrl: string): string => {
  if (baseUrl.includes('-1024.webp')) {
    return baseUrl.replace('-1024.webp', '-2000.webp');
  }
  if (baseUrl.includes('-2000.webp')) {
    return baseUrl;
  }
  const cleanUrl = baseUrl.replace(/\.(webp|jpg|png)$/i, '');
  return `${cleanUrl}-2000.webp`;
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
const ContentBlockRenderer: React.FC<{ block: ContentBlock }> = ({ block }) => {
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

      const imageSrc = getDesktopImageUrl(block.data.imageUrl);
      
      return (
        <figure className={`my-16 md:my-20 ${widthClass}`}>
          <img
            src={imageSrc}
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

    case 'separator':
      return (
        <div className="my-16 md:my-20 h-4 bg-[#fee715]"></div>
      );

    case 'heading':
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

    case 'highlight':
      const highlightText = block.data.text || '';
      const hasList = highlightText.includes('<ul>') || highlightText.includes('<li>');
      
      let processedText = highlightText;
      if (hasList) {
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

    case 'numbered-section':
      return (
        <div id={block.id} className="my-12 md:my-16 scroll-mt-20">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-[#fee715] flex items-center justify-center">
                  <span className="text-xl md:text-2xl font-extrabold font-[Montserrat] text-[#101820]">
                    {block.data.number || ''}
                  </span>
                </div>
              </div>
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

      <article className="min-h-screen bg-white text-[#101820]">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-10 max-w-7xl border-b border-gray-200">
          <nav className="flex items-center gap-2 md:gap-3 flex-wrap text-sm md:text-base">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-[#101820] hover:bg-[#fee715]/10 px-3 py-1.5 transition-all font-medium rounded-sm"
            >
              Strona główna
            </Link>
            <CaretRight size={16} weight="bold" className="text-gray-300 flex-shrink-0" />
            <Link 
              href="/blog" 
              className="text-gray-600 hover:text-[#101820] hover:bg-[#fee715]/10 px-3 py-1.5 transition-all font-medium rounded-sm"
            >
              Blog
            </Link>
            {post.category_name && (
              <>
                <CaretRight size={16} weight="bold" className="text-gray-300 flex-shrink-0" />
                <Link
                  href={`/blog/kategoria/${post.category_slug}`}
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

        {/* Content */}
        <div className={`container mx-auto px-4 md:px-6 py-16 md:py-20 lg:py-24 ${maxWidthClass}`}>
          {/* Category and date */}
          <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-10 flex-wrap">
            {post.category_name && (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#fee715]"></span>
                <span className="inline-block text-xs font-semibold px-3 py-1 border border-gray-300 text-[#101820]">
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

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-[Montserrat] text-[#101820] py-6 md:py-8 leading-tight tracking-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl md:text-2xl text-gray-700 mb-8 md:mb-10 leading-relaxed font-medium">
              {post.excerpt}
            </p>
          )}

          {/* Hero image */}
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
              />
            </div>
          )}

          {/* Separator */}
          <div className="w-40 h-4 bg-[#fee715] mb-20 md:mb-24"></div>

          {/* Content blocks */}
          <div className="blog-content text-[#101820]">
            {post.content?.blocks?.map((block: ContentBlock, index: number) => {
              const prevBlock = index > 0 ? post.content?.blocks[index - 1] : null;
              const isNewSection = block.type === 'text' && block.data.text && 
                (block.data.text.includes('<h2>') || block.data.text.includes('<h2 '));
              const prevWasSeparator = prevBlock?.type === 'separator';
              const currentIsSeparator = block.type === 'separator';
              const shouldAddSeparator = isNewSection && index > 0 && prevBlock && !prevWasSeparator;
              
              if (currentIsSeparator && prevWasSeparator) {
                return null;
              }
              
              return (
                <div key={block.id}>
                  {shouldAddSeparator && (
                    <div className="my-16 md:my-20 h-4 bg-[#fee715]"></div>
                  )}
                  <ContentBlockRenderer block={block} />
                </div>
              );
            })}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-20 md:mt-24 pt-16">
              <div className="h-4 bg-[#fee715] mb-10"></div>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag: string) => (
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

          {/* Back to blog */}
          <div className="mt-20 md:mt-24 pt-16">
            <div className="h-4 bg-[#fee715] mb-10"></div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#101820] hover:text-[#101820] transition-colors font-extrabold text-lg group"
            >
              <ArrowRight size={20} weight="bold" className="text-[#fee715] group-hover:translate-x-1 transition-transform" />
              Wróć do bloga
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}

// ISR: Revalidate every hour
export const revalidate = 3600;
