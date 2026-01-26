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
  CaretRight
} from '@/app/components/BlogIcons';

const iconMap: Record<string, any> = {
  'Pozyskiwanie klientów': Users,
  'Oferta i komunikacja': ChatCircle,
  'Lejek sprzedażowy': Funnel,
  'SEO i content': FileText,
  'Reklamy': Megaphone,
  'Social media': ShareNetwork,
  'Strony WWW': Globe,
  'AI i automatyzacje': Robot,
  'Analityka': ChartLine,
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

  // Client-side search (można później przenieść na server-side)
  React.useEffect(() => {
    if (!searchQuery) {
      setPosts(initialPosts);
      return;
    }

    setLoading(true);
    const searchTerm = searchQuery.toLowerCase().trim();
    const searchWords = searchTerm.split(/[\s-]+/).filter(w => w.length > 0);
    
    const filtered = initialPosts.filter((post) => {
      const textMatch = post.title?.toLowerCase().includes(searchTerm) ||
                       post.excerpt?.toLowerCase().includes(searchTerm);
      
      const tagsMatch = post.tags && Array.isArray(post.tags) && 
        post.tags.some((tag: string) => {
          const tagLower = tag.toLowerCase();
          return tagLower === searchTerm || 
                 tagLower.includes(searchTerm) || 
                 searchTerm.includes(tagLower) ||
                 searchWords.some(word => tagLower.includes(word));
        });
      
      return textMatch || tagsMatch;
    });

    setPosts(filtered);
    setLoading(false);
  }, [searchQuery, initialPosts]);

  return (
    <div className="min-h-screen bg-white text-[#101820]">
      {/* Kompaktowy header - bez dużego hero */}
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-10">
        <div className="max-w-6xl mx-auto">
          {/* Główny tytuł */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-[Montserrat] text-[#101820] mb-6 md:mb-8 leading-tight tracking-tight">
            {categoryName ? `Blog: ${categoryName}` : 'Blog o marketingu dla małych firm i freelancerów'}
          </h1>

          {/* Dwa krótkie akapity z prostokątem akcentowym */}
          <div className="space-y-6 mb-6 md:mb-8">
            <p className="text-lg md:text-xl text-[#101820] leading-relaxed">
              Na tym blogu dzielę się moimi doświadczeniami z marketingu i sprzedaży w małych firmach, freelancerce i projektach online. Piszę o tym, jak w praktyce wygląda zdobywanie klientów i budowanie stabilnej sprzedaży: od oferty i komunikacji, przez stronę internetową i konwersję, po pozyskiwanie ruchu z SEO, reklam i social mediów.
            </p>
            {/* Prostokąt akcentowy z tekstem - bez outline */}
            <div className="bg-[#fee715] p-6 md:p-8 selection:bg-[#101820] selection:text-white">
              <p className="text-lg md:text-xl text-[#101820] leading-relaxed font-normal">
                Będą tu też tematy związane z AI i automatyzacjami w marketingu, tworzeniem treści oraz pomiarem i analityką, żeby dało się podejmować decyzje na podstawie danych, a nie przeczucia.
              </p>
            </div>
          </div>

          {/* Wyszukiwarka */}
          <div className="mb-6 md:mb-8">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <div className="w-8 h-8 bg-[#fee715] flex items-center justify-center">
                  <MagnifyingGlass size={16} weight="bold" className="text-[#101820]" />
                </div>
              </div>
              <input
                type="text"
                placeholder="Szukaj artykułów..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-4 py-4 border-2 border-gray-300 text-[#101820] text-lg placeholder-gray-400 focus:outline-none focus:border-[#fee715] transition-colors"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Separator */}
      <div className="container mx-auto px-4 md:px-6 mb-6 md:mb-8">
        <div className="max-w-6xl mx-auto h-1 bg-[#fee715]"></div>
      </div>

      {/* Sekcja tematów - rozwijalna cała sekcja z rotacją tła */}
      <div className="container mx-auto px-4 md:px-6 mb-12 md:mb-16">
        <div className="max-w-6xl mx-auto bg-gray-50 p-8 md:p-12 border-2 border-gray-200">
          <button
            onClick={() => setTopicsExpanded(!topicsExpanded)}
            className="w-full flex items-center justify-between p-6 md:p-8 bg-white border-2 border-gray-200 hover:border-[#fee715] transition-all group"
          >
            <h2 className="text-2xl md:text-3xl font-extrabold font-[Montserrat] text-[#101820] uppercase tracking-tight">
              Tematy
            </h2>
            <div className="w-10 h-10 bg-[#fee715] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <CaretRight 
                size={20} 
                weight="bold" 
                className={`text-[#101820] transition-transform ${topicsExpanded ? 'rotate-90' : ''}`}
              />
            </div>
          </button>
          
          {/* Rozwinięta lista tematów */}
          {topicsExpanded && (
            <div className="mt-3 space-y-3">
              {blogTopics.map((topic) => {
                const IconComponent = iconMap[topic.name] || Globe;
                
                return (
                  <button
                    key={topic.slug}
                    onClick={() => {
                      const searchTerm = topic.searchTags?.[0] || topic.name.toLowerCase();
                      setSearchQuery(searchTerm);
                    }}
                    className="w-full flex items-center justify-between p-6 md:p-8 bg-white border-2 border-gray-200 hover:border-[#fee715] transition-all text-left group"
                  >
                    <div className="flex items-center gap-4 md:gap-6">
                      <div className="w-12 h-12 bg-[#fee715] flex items-center justify-center flex-shrink-0">
                        <IconComponent size={24} weight="bold" className="text-[#101820]" />
                      </div>
                      <h3 className="text-base md:text-lg font-extrabold font-[Montserrat] text-[#101820] uppercase tracking-tight">
                        {topic.name}
                      </h3>
                    </div>
                    <div className="w-10 h-10 bg-[#fee715] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <CaretRight 
                        size={20} 
                        weight="bold" 
                        className="text-[#101820]"
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Separator */}
      <div className="container mx-auto px-4 md:px-6 mb-8 md:mb-10">
        <div className="max-w-6xl mx-auto h-1 bg-[#fee715]"></div>
      </div>

      {/* Lista artykułów - 2 kolumny, większe karty z rotacją tła */}
      <div className={`container mx-auto px-4 md:px-6 pb-16 md:pb-20 ${posts.length > 0 ? 'bg-gray-50 py-12 md:py-16' : ''}`}>
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-16">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-[#fee715] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-lg text-gray-500">Szukanie...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-gray-500">Brak artykułów spełniających kryteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {posts.map((post, index) => {
                // Rotacja kolorów tła - co trzeci artykuł ma żółte tło
                const hasYellowBg = index % 3 === 2;
                
                return (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className={`group block border-2 transition-all overflow-hidden ${
                    hasYellowBg 
                      ? 'bg-[#fee715] border-[#101820] hover:bg-[#fee715]/90' 
                      : 'bg-white border-gray-200 hover:border-[#fee715]'
                  }`}
                >
                  {/* Obraz podglądu */}
                  {post.featured_image_url && (
                    <div className="w-full h-48 md:h-64 overflow-hidden bg-gray-100">
                      <img
                        src={post.featured_image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="p-8 md:p-10">
                    {/* Kategoria jako etykieta */}
                    {post.category_name && (
                      <div className="flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 bg-[#fee715]"></span>
                        <span className="text-xs font-semibold text-[#101820] uppercase tracking-wider border border-gray-300 px-3 py-1">
                          {post.category_name}
                        </span>
                      </div>
                    )}

                    {/* Tytuł */}
                    <h2 className="text-2xl md:text-3xl font-extrabold font-[Montserrat] text-[#101820] mb-4 leading-tight group-hover:underline transition-all">
                      {post.title}
                    </h2>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="text-base md:text-lg text-[#101820] mb-6 leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}

                    {/* Meta w jednej linii */}
                    <div className="flex items-center gap-3 text-sm text-gray-600">
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
                          <span>•</span>
                          <span>{post.reading_time} min</span>
                        </>
                      )}
                      <ArrowRight size={16} weight="bold" className={`ml-auto opacity-0 group-hover:opacity-100 transition-opacity ${hasYellowBg ? 'text-[#101820]' : 'text-[#fee715]'}`} />
                    </div>
                  </div>
                </Link>
              );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
