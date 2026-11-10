'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MagnifyingGlass } from '@/app/components/BlogIcons';
import { HomeMotion } from '@/app/components/home/HomeMotion';
import { BrandLoader } from '@/app/components/BrandLogo';

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

  const fmtDate = (iso: string | null) =>
    iso ? new Date(iso).toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  return (
    <main id="bl-root" className="bl">
      <HomeMotion rootId="bl-root" />

      {/* Nagłówek: tytuł, jedno zdanie, wyszukiwarka i tematy, wszystko na lewej krawędzi */}
      <section className="site-wrap bl-head" aria-labelledby="bl-title">
        <h1 id="bl-title" className="hp-name bl-title" data-reveal>
          {categoryName ? `Blog: ${categoryName}` : 'Blog o marketingu dla firm'}
        </h1>
        <p className="hp-body bl-lead" data-reveal style={{ ['--d' as string]: 1 }}>
          Piszę o tym, jak w praktyce wygląda pozyskiwanie klientów: reklamy, oferta, obsługa zapytań, mailing
          i&nbsp;automatyzacje z&nbsp;pomocą AI.
        </p>

        <div className="bl-tools" data-reveal style={{ ['--d' as string]: 2 }}>
          <label className="bl-search">
            <MagnifyingGlass size={20} aria-hidden="true" />
            <input
              type="search"
              placeholder="Szukaj artykułów"
              aria-label="Szukaj artykułów"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </label>
          <div className="bl-topics" role="group" aria-label="Tematy">
            {blogTopics.map((topic) => {
              const topicTerm = topic.searchTags?.[0] || topic.name.toLowerCase();
              const active = searchQuery === topicTerm;
              return (
                <button
                  key={topic.slug}
                  type="button"
                  className="bl-topic"
                  onClick={() => setSearchQuery(active ? '' : topicTerm)}
                  aria-pressed={active}
                >
                  {topic.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Wpisy */}
      <section className="site-wrap bl-list" aria-label="Wpisy">
        {loading ? (
          <div className="bl-empty">
            <BrandLoader label="Szukanie" />
          </div>
        ) : posts.length === 0 ? (
          <div className="bl-empty">
            <p className="hp-body">Nie ma artykułów na ten temat. Wyczyść wyszukiwanie albo wybierz inny temat.</p>
          </div>
        ) : (
          <ul className="bl-grid">
            {posts.map((post, i) => (
              <li key={post.id} data-reveal style={{ ['--d' as string]: i % 3 }}>
                <Link href={`/blog/${post.slug}`} className="bl-card">
                  {post.featured_image_url && (
                    <span className="bl-card-img">
                      <img src={post.featured_image_url} alt="" loading="lazy" />
                    </span>
                  )}
                  <span className="bl-card-body">
                    {post.category_name && <span className="bl-card-cat">{post.category_name}</span>}
                    <h2 className="bl-card-title">{post.title}</h2>
                    {post.excerpt && <span className="bl-card-text">{post.excerpt}</span>}
                    <span className="bl-card-meta">
                      {fmtDate(post.published_at)}
                      {post.reading_time ? `, ${post.reading_time} min czytania` : ''}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
