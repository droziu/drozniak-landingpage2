'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MagnifyingGlass,
  ArrowRight,
  Users,
  ChatCircle,
  Funnel,
  FileText,
  Megaphone,
  ShareNetwork,
  Globe,
  Robot,
  ChartLine,
  CaretRight,
} from '@/app/components/BlogIcons';
import { Eyebrow } from '@/app/components/premium/Eyebrow';
import { FadeUp, Stagger, StaggerItem } from '@/app/components/premium/Motion';
import { HeroShapes } from '@/app/components/premium/HeroShapes';

const iconMap: Record<string, any> = {
  'Pozyskiwanie klientów': Users,
  'Oferta i komunikacja': ChatCircle,
  'Lejek sprzedażowy': Funnel,
  'SEO i content': FileText,
  Reklamy: Megaphone,
  'Social media': ShareNetwork,
  'Strony WWW': Globe,
  'AI i automatyzacje': Robot,
  Analityka: ChartLine,
};

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
  const [topicsExpanded, setTopicsExpanded] = useState(false);
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
    <div className="min-h-screen text-white">
      {/* HERO */}
      <section className="relative px-4 md:px-8 py-20 md:py-28 overflow-hidden">
        <HeroShapes variant="minimal" />
        <div className="relative w-full max-w-4xl mx-auto">
          <FadeUp whenInView={false} className="text-center">
            <div className="flex justify-center mb-7">
              <Eyebrow>{categoryName ? `Kategoria · ${categoryName}` : 'Blog'}</Eyebrow>
            </div>
            <h1 className="mt-5 cinematic-headline text-[clamp(2.25rem,7vw,5rem)] font-bold pb-3">
              {categoryName ? (
                <>
                  Blog: <span className="text-gradient-yellow">{categoryName}</span>
                </>
              ) : (
                <>
                  Marketing dla małych firm <span className="text-gradient-yellow">i freelancerów.</span>
                </>
              )}
            </h1>

            <div className="mt-9 max-w-2xl mx-auto space-y-4 text-base md:text-lg text-white/65 leading-relaxed text-balance">
              <p>
                Dzielę się tu doświadczeniami z marketingu i sprzedaży w małych firmach, freelancerce i projektach online. Piszę o tym, jak w praktyce wygląda zdobywanie klientów i budowanie stabilnej sprzedaży.
              </p>
              <p className="text-white/45 text-[15px]">
                Również o <span className="text-white/85">AI i automatyzacjach w marketingu</span>, tworzeniu treści oraz pomiarze i analityce.
              </p>
            </div>
          </FadeUp>

          {/* Search */}
          <FadeUp delay={0.2} whenInView={false} className="mt-10 max-w-xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                <MagnifyingGlass size={16} weight="bold" />
              </div>
              <input
                type="text"
                placeholder="Szukaj artykułów…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white/[0.04] border border-white/10 text-white placeholder-white/40 text-sm md:text-[15px] focus:outline-none focus:ring-2 focus:ring-[#fee715]/30 focus:border-[#fee715]/30 transition-all duration-200"
              />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* TOPICS */}
      <section className="relative px-4 md:px-6 mb-12 md:mb-20">
        <div className="max-w-4xl mx-auto">
          <FadeUp className="card p-2">
            <button
              onClick={() => setTopicsExpanded(!topicsExpanded)}
              className="w-full flex items-center justify-between p-4 cursor-pointer rounded-xl hover:bg-white/[0.03] transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#fee715]">
                  Tematy
                </span>
              </div>
              <CaretRight
                size={14}
                weight="bold"
                className={`text-white/50 transition-transform duration-300 ${topicsExpanded ? 'rotate-90' : ''}`}
              />
            </button>

            {topicsExpanded && (
              <div className="mt-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-1.5 p-2">
                {blogTopics.map((topic) => {
                  const IconComponent = iconMap[topic.name] || Globe;
                  return (
                    <button
                      key={topic.slug}
                      onClick={() => {
                        const searchTerm = topic.searchTags?.[0] || topic.name.toLowerCase();
                        setSearchQuery(searchTerm);
                      }}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.05] transition-colors text-left cursor-pointer group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#fee715]/10 border border-[#fee715]/20 flex items-center justify-center flex-shrink-0">
                        <IconComponent size={14} weight="bold" className="text-[#fee715]" />
                      </div>
                      <span className="text-sm text-white/80 group-hover:text-white">{topic.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </FadeUp>
        </div>
      </section>

      {/* POSTS */}
      <section className="relative px-4 md:px-6 pb-20 md:pb-32 border-t border-white/5 pt-12 md:pt-16">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-10 h-10 border-2 border-white/10 border-t-[#fee715] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm text-white/55">Szukanie…</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="card max-w-md mx-auto p-10 text-center">
              <div className="w-12 h-12 mx-auto mb-5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
                <MagnifyingGlass size={20} weight="bold" />
              </div>
              <p className="text-base text-white/65">Brak artykułów spełniających kryteria.</p>
            </div>
          ) : (
            <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {posts.map((post) => (
                <StaggerItem key={post.id}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group card surface-hover overflow-hidden flex flex-col h-full cursor-pointer"
                  >
                    {post.featured_image_url && (
                      <div className="relative w-full aspect-[16/10] overflow-hidden border-b border-white/8">
                        <img
                          src={post.featured_image_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                          loading="lazy"
                        />
                        {post.category_name && (
                          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] bg-black/60 backdrop-blur-md border border-white/10 text-[#fee715]">
                            {post.category_name}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="p-6 md:p-7 flex flex-col flex-1">
                      {!post.featured_image_url && post.category_name && (
                        <span className="self-start mb-4 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] bg-[#fee715]/8 border border-[#fee715]/20 text-[#fee715]">
                          {post.category_name}
                        </span>
                      )}

                      <h2 className="text-lg md:text-xl font-medium tracking-tight text-white leading-tight mb-3 group-hover:text-[#fee715] transition-colors">
                        {post.title}
                      </h2>

                      {post.excerpt && (
                        <p className="text-sm text-white/55 mb-5 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}

                      <div className="mt-auto pt-4 border-t border-white/8 flex items-center justify-between text-xs text-white/40">
                        <div className="flex items-center gap-2 font-mono uppercase tracking-[0.12em]">
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
                              <span className="text-white/15">·</span>
                              <span>{post.reading_time} min</span>
                            </>
                          )}
                        </div>
                        <ArrowRight
                          size={14}
                          weight="bold"
                          className="text-[#fee715] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
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
    </div>
  );
}
