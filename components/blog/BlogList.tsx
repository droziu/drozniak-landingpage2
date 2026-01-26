import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBlogPosts } from '../../hooks/useBlogPosts';
import { useSEO } from '../../hooks/useSEO';
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
} from 'phosphor-react';

// Tematy bloga z ikonami i mapowaniem na tagi
const blogTopics = [
  { name: 'Pozyskiwanie klientów', icon: Users, slug: 'pozyskiwanie-klientow', searchTags: ['pozyskiwanie-klientów', 'pozyskiwanie klientów', 'pozyskiwanie', 'klienci', 'marketing'] },
  { name: 'Oferta i komunikacja', icon: ChatCircle, slug: 'oferta', searchTags: ['oferta', 'komunikacja'] },
  { name: 'Lejek sprzedażowy', icon: Funnel, slug: 'lejek', searchTags: ['lejek', 'funnel', 'sprzedaż'] },
  { name: 'SEO i content', icon: FileText, slug: 'seo', searchTags: ['seo', 'content', 'treści'] },
  { name: 'Reklamy', icon: Megaphone, slug: 'reklamy', searchTags: ['reklamy', 'reklama', 'kampanie'] },
  { name: 'Social media', icon: ShareNetwork, slug: 'social-media', searchTags: ['social-media', 'social', 'media'] },
  { name: 'Strony WWW', icon: Globe, slug: 'strony-www', searchTags: ['strony-www', 'strony', 'www'] },
  { name: 'AI i automatyzacje', icon: Robot, slug: 'ai', searchTags: ['ai', 'automatyzacje', 'automatyzacja'] },
  { name: 'Analityka', icon: ChartLine, slug: 'analityka', searchTags: ['analityka', 'analiza', 'pomiar'] },
];

export const BlogList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [topicsExpanded, setTopicsExpanded] = useState(false);
  
  // SEO
  useSEO({
    title: 'Blog o marketingu dla małych firm i freelancerów | Stanisław Drożniak',
    description: 'Blog o marketingu dla małych firm i freelancerów. Praktyczne porady o pozyskiwaniu klientów, stronach WWW, reklamach, SEO i AI w marketingu.',
    keywords: 'blog marketing, marketing małych firm, pozyskiwanie klientów, strony www, reklamy, SEO, AI w marketingu',
    ogTitle: 'Blog o marketingu dla małych firm i freelancerów',
    ogDescription: 'Praktyczne porady o marketingu dla małych firm: pozyskiwanie klientów, strony WWW, reklamy, SEO i AI.',
    ogImage: '/images/Drozniak_Zdjecie_Suit_2.webp',
    ogType: 'website',
    canonical: 'https://drozniak.pl/blog',
  });
  
  const { posts, loading: postsLoading, error } = useBlogPosts({
    search: searchQuery || undefined,
    limit: 20,
  });

  const loading = postsLoading;

  if (loading && posts.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6 px-4">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-[#fee715] rounded-full animate-spin" />
        <p className="text-base text-gray-600 font-medium">Ładowanie bloga...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#101820] mb-4">Błąd ładowania bloga</h2>
          <p className="text-[#101820]">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#101820]">
      {/* Kompaktowy header - bez dużego hero */}
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-10">
        <div className="max-w-6xl mx-auto">
          {/* Główny tytuł */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-[Montserrat] text-[#101820] mb-6 md:mb-8 leading-tight tracking-tight">
            Blog o marketingu dla małych firm i freelancerów
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
                const IconComponent = topic.icon;
                
                return (
                  <button
                    key={topic.slug}
                    onClick={() => {
                      // Użyj pierwszego tagu z listy searchTags
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
          {posts.length === 0 ? (
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
                  to={`/blog/${post.slug}`}
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
};
