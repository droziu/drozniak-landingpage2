'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MagnifyingGlass, ArrowRight } from '@/app/components/BlogIcons';
import { FadeUp, Stagger, StaggerItem } from '@/app/components/premium/Motion';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  featured_image_url: string | null;
  published_at: string | null;
  created_at: string;
  category_name: string | null;
  category_slug: string | null;
  category_color: string | null;
  tags: string[];
  view_count: number;
  reading_time: number | null;
}

interface BlogListClientProps {
  initialPosts: BlogPost[];
  blogTopics: Array<{ name: string; slug: string; searchTags: string[] }>;
  categoryName?: string;
}

export default function BlogListClient({ initialPosts, blogTopics, categoryName }: BlogListClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (!searchQuery) {
      setPosts(initialPosts);
      return;
    }
    setLoading(true);
    const searchTerm = searchQuery.toLowerCase().trim();
    const searchWords = searchTerm.split(/[\s-]+/).filter((w) => w.length > 0);
    const filtered = initialPosts.filter((post) => {
      const textMatch =
        post.title?.toLowerCase().includes(searchTerm) ||
        post.excerpt?.toLowerCase().includes(searchTerm);
      const tagsMatch =
        post.tags &&
        Array.isArray(post.tags) &&
        post.tags.some((tag: string) => {
          const tagLower = tag.toLowerCase();
          return (
            tagLower === searchTerm ||
            tagLower.includes(searchTerm) ||
            searchTerm.includes(tagLower) ||
            searchWords.some((word) => tagLower.includes(word))
          );
        });
      return textMatch || tagsMatch;
    });
    setPosts(filtered);
    setLoading(false);
  }, [searchQuery, initialPosts]);

  return (
    <main className="min-h-screen">
      {/* ==================== HERO ==================== */}
      <section className="relative px-5 md:px-10 pt-10 md:pt-16 pb-12 md:pb-16">
        <div className="mx-auto max-w-[88rem]">
          <div className="max-w-3xl mx-auto text-center">
            <FadeUp whenInView={false}>
              <p className="pub-eyebrow mb-8">
                {categoryName ? `Blog - kategoria` : 'Blog'}
              </p>
              <h1 className="text-[clamp(2.4rem,5.5vw,4.4rem)]">
                {categoryName ? (
                  <>
                    <span className="pub-h-serif block">Blog:</span>
                    <span className="pub-h-sans block mt-1">{categoryName}.</span>
                  </>
                ) : (
                  <>
                    <span className="pub-h-serif block">Marketing dla małych firm</span>
                    <span className="pub-h-sans block mt-1">i freelancerów.</span>
                  </>
                )}
              </h1>
              <div className="mt-8 space-y-3 text-base md:text-lg text-[#4A4740] leading-[1.7] text-balance">
                <p>
                  Dzielę się tu doświadczeniami z marketingu i sprzedaży w małych firmach,
                  freelancerce i projektach online. Piszę o tym, jak w praktyce wygląda zdobywanie
                  klientów i budowanie stabilnej sprzedaży.
                </p>
                <p className="text-[15px] text-[#85816F]">
                  Również o <span className="text-[#4A4740] font-semibold">AI i automatyzacjach w marketingu</span>,
                  tworzeniu treści oraz pomiarze i analityce.
                </p>
              </div>
            </FadeUp>

            {/* Search */}
            <FadeUp delay={0.15} whenInView={false} className="mt-10 max-w-xl mx-auto">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#85816F]" aria-hidden>
                  <MagnifyingGlass size={16} weight="bold" />
                </div>
                <input
                  type="text"
                  placeholder="Szukaj artykułów…"
                  aria-label="Szukaj artykułów"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 rounded-[2px] bg-[#FFFFFF] border border-[#E4E1D8] text-[#161511] placeholder-[#85816F] text-sm md:text-[15px] transition-colors duration-200 focus:outline-none focus:border-[#161511] focus-visible:ring-1 focus-visible:ring-[#161511]"
                />
              </div>
            </FadeUp>

            {/* Tematy - chipy filtrów */}
            <FadeUp delay={0.25} whenInView={false} className="mt-7">
              <div className="flex flex-wrap justify-center gap-2">
                {blogTopics.map((topic) => {
                  const topicTerm = topic.searchTags?.[0] || topic.name.toLowerCase();
                  const active = searchQuery === topicTerm;
                  return (
                    <button
                      key={topic.slug}
                      type="button"
                      onClick={() => setSearchQuery(active ? '' : topicTerm)}
                      aria-pressed={active}
                      className={`pub-chip cursor-pointer transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#161511] focus-visible:ring-offset-1 ${
                        active
                          ? '!bg-[#161511] !border-[#161511] !text-[#F6F5F1]'
                          : 'hover:border-[#161511] hover:text-[#161511]'
                      }`}
                    >
                      {topic.name}
                    </button>
                  );
                })}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ==================== WPISY ==================== */}
      <section className="relative px-5 md:px-10 pb-20 md:pb-32 pt-12 md:pt-16 border-t border-[#E4E1D8]">
        <div className="mx-auto max-w-[88rem]">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-10 h-10 border-2 border-[#E4E1D8] border-t-[#161511] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm text-[#85816F]">Szukanie…</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="pub-card max-w-md mx-auto p-10 text-center">
              <div className="w-12 h-12 mx-auto mb-5 rounded-[2px] bg-[#F6F5F1] border border-[#E4E1D8] flex items-center justify-center text-[#85816F]">
                <MagnifyingGlass size={20} weight="bold" />
              </div>
              <p className="text-base text-[#4A4740]">Brak artykułów spełniających kryteria.</p>
            </div>
          ) : (
            <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {posts.map((post) => (
                <StaggerItem key={post.id} className="h-full">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group pub-card overflow-hidden flex flex-col h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#161511] focus-visible:ring-offset-2"
                  >
                    {post.featured_image_url && (
                      <div className="relative w-full aspect-[16/10] overflow-hidden border-b border-[#E4E1D8] bg-[#F6F5F1]">
                        <img
                          src={post.featured_image_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    )}

                    <div className="p-6 md:p-7 flex flex-col flex-1">
                      {post.category_name && (
                        <span className="self-start mb-4 pub-chip">{post.category_name}</span>
                      )}

                      <h2 className="text-lg md:text-xl font-bold tracking-[-0.02em] text-[#161511] leading-snug mb-3 group-hover:text-[#8F7418] transition-colors">
                        {post.title}
                      </h2>

                      {post.excerpt && (
                        <p className="text-[15px] text-[#4A4740] mb-5 leading-[1.7] line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}

                      <div className="mt-auto pt-4 border-t border-[#E4E1D8] flex items-center justify-between text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#85816F]">
                        <div className="flex items-center gap-2">
                          <span>
                            {post.published_at
                              ? new Date(post.published_at).toLocaleDateString('pl-PL', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                })
                              : ''}
                          </span>
                          {post.reading_time && (
                            <>
                              <span className="text-[#D6D2C6]">·</span>
                              <span>{post.reading_time} min</span>
                            </>
                          )}
                        </div>
                        <ArrowRight
                          size={14}
                          weight="bold"
                          className="text-[#8F7418] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                        />
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </section>
    </main>
  );
}
