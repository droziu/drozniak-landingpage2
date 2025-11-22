import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const PortfolioRedlin: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHomeExpanded, setIsHomeExpanded] = useState(false);

  // Reset scroll position to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const galleryImages = [
    { src: '/images/redlin_homepage.jpg', alt: 'Desktop - Strona główna', label: 'Desktop - Strona główna' },
    { src: '/images/redlin_koncerty.jpg', alt: 'Desktop - Lista koncertów', label: 'Desktop - Lista koncertów' },
    { src: '/images/redlin_stronakoncertu.jpg', alt: 'Desktop - Strona koncertu', label: 'Desktop - Strona koncertu' },
    { src: '/images/redlin_zakupbiletu.jpg', alt: 'Desktop - Zakup biletu', label: 'Desktop - Zakup biletu' },
    { src: '/images/redlin_newsletter.jpg', alt: 'Desktop - Newsletter', label: 'Desktop - Newsletter' },
    { src: '/images/phone_redlin_1.jpg', alt: 'Mobile - Widok 1', label: 'Mobile - Widok 1' },
    { src: '/images/phone_redlin_2.jpg', alt: 'Mobile - Widok 2', label: 'Mobile - Widok 2' },
    { src: '/images/phone_redlin_3.jpg', alt: 'Mobile - Widok 3', label: 'Mobile - Widok 3' },
    { src: '/images/phone_redlin_4.jpg', alt: 'Mobile - Widok 4', label: 'Mobile - Widok 4' },
    { src: '/images/phone_redlin_5.jpg', alt: 'Mobile - Widok 5', label: 'Mobile - Widok 5' }
  ];

  // Auto-play slider
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [galleryImages.length]);

  const problems = [
    {
      title: 'Brak modułu sprzedaży biletów',
      description: 'Poprzednia strona nie miała żadnego procesu zakupu. Fani musieli pisać wiadomości lub szukać zewnętrznych linków.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    {
      title: 'Rozproszona informacja o koncertach',
      description: 'Daty, ceny, lokalizacje — wszystko było w innych miejscach. Nie istniała logiczna, przejrzysta lista wydarzeń.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Brak miejsca do budowania społeczności',
      description: 'Nie było sekcji newslettera, landing page\'a do zapisów, ani sposobu na regularny kontakt z fanami.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'Przestarzały design',
      description: 'Layout nie oddawał charakteru zespołu i jakości koncertów — wyglądał zbyt oldschoolowo.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      title: 'Słaba wersja mobilna',
      description: 'Przy ponad 80% ruchu z telefonów, nawigacja była niewygodna, a strona działała wolno.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  const solutions = [
    {
      title: 'Kompletny system zakupu biletów',
      description: 'Wprowadziłem przejrzysty proces: wybór koncertu → liczba biletów → dane → płatność PayU → bilety na maila. Całość jest prosta, a transakcje obsługuje PayU.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    {
      title: 'Przejrzysta lista koncertów',
      description: 'Każde wydarzenie ma własną stronę z datą, miejscem, ceną, zdjęciami i mapą Google. Strona główna prowadzi bezpośrednio do kalendarza koncertów.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      title: 'Moduł newslettera dla fanów',
      description: 'Dedykowany landing page + sekcja zapisu na stronie głównej. Opisane korzyści, prosty formularz, jasna polityka prywatności.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Nowoczesny design koncertowy',
      description: 'Ciemne tła, czerwone akcenty, wysoko-kontrastowe CTA, zdjęcia ze sceny. Wizualnie dużo poważniej i profesjonalniej niż poprzednia wersja.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      title: 'Projekt mobile-first',
      description: 'Cała strona została zaprojektowana z myślą o telefonach, co przełożyło się na świetne wyniki wydajności.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Uporządkowana struktura treści',
      description: 'Ścieżka użytkownika jest jednoznaczna: Wejście → koncerty → bilet → płatność → potwierdzenie.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    }
  ];

  const desktopResults = [
    { label: 'Wydajność', value: '99', unit: '/100' },
    { label: 'Dostępność', value: '90', unit: '/100' },
    { label: 'Sprawdzone metody', value: '100', unit: '/100' },
    { label: 'SEO', value: '100', unit: '/100' }
  ];

  const mobileResults = [
    { label: 'Wydajność', value: '94', unit: '/100' },
    { label: 'Dostępność', value: '94', unit: '/100' },
    { label: 'Sprawdzone metody', value: '100', unit: '/100' },
    { label: 'SEO', value: '100', unit: '/100' }
  ];

  const technologies = [
    { name: 'Next.js', logo: '/images/nextjs-icon.svg' },
    { name: 'Tailwind CSS', logo: '/images/tailwind-css.svg' },
    { name: 'TypeScript', logo: '/images/typescript.svg' },
    { name: 'Vercel', logo: '/images/vercel-icon.svg' }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <main className="py-16 md:py-24 px-4 md:px-6 bg-[#101820]">
      <div className="container mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className="mb-20 md:mb-24">
          <div className="text-center mb-16 md:mb-20">
            <h1 className="font-[Montserrat] text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#fee715] to-[#00C9A7] bg-clip-text text-transparent">
                Zespół REDLIN
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              — nowa strona koncertowa z systemem sprzedaży biletów
            </p>
            <p className="text-xl md:text-2xl font-semibold text-white max-w-3xl mx-auto leading-relaxed mb-12 md:mb-16">
              Redesign strony REDLIN — <span className="bg-gradient-to-r from-[#fee715] to-[#00C9A7] bg-clip-text text-transparent">szybsza, nowocześniejsza</span> i zaprojektowana pod sprzedaż biletów, promocję koncertów i budowanie społeczności fanów.
            </p>
          </div>

          <div className="relative flex justify-center">
            {/* Multi-layer shadow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#fee715]/20 via-[#00C9A7]/20 to-[#fee715]/20 blur-3xl rounded-2xl -z-10 transform translate-y-8 scale-105"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#fee715]/10 via-[#00C9A7]/10 to-[#fee715]/10 blur-2xl rounded-2xl -z-10 transform translate-y-4 scale-102"></div>
            
            <div className="relative w-full md:w-[70%] lg:w-[65%] transform hover:scale-[1.02] transition-transform duration-500">
              <img 
                src="/images/redlin_mockup_1.jpg" 
                alt="REDLIN - Mockup strony" 
                className="w-full h-auto rounded-2xl shadow-2xl shadow-black/50"
                style={{ filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))' }}
              />
            </div>
          </div>
        </div>

        {/* About Client & Project Goal Section */}
        <section className="mb-20 md:mb-24">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {/* O kliencie Card */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 hover:border-white/20 transition-all duration-300 flex flex-col">
                <h2 className="font-[Montserrat] text-xl md:text-2xl font-bold mb-4 text-[#fee715]">
                  O kliencie
                </h2>
                <div className="space-y-3 text-gray-300 leading-relaxed text-sm md:text-base flex-grow">
                  <p>
                    REDLIN to zespół folkowy koncertujący w całej Polsce.
                  </p>
                  <p>
                    Występują na wydarzeniach biletowanych, festiwalach, imprezach plenerowych i koncertach klubowych, a dodatkowo budują aktywną społeczność fanów.
                  </p>
                </div>
              </div>

              {/* Cel projektu Card */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 hover:border-white/20 transition-all duration-300 flex flex-col">
                <h2 className="font-[Montserrat] text-xl md:text-2xl font-bold mb-4 text-[#fee715]">
                  Cel projektu
                </h2>
                <div className="space-y-3 text-gray-300 leading-relaxed text-sm md:text-base flex-grow">
                  <p>
                    Stworzyć stronę, która ułatwia zakup biletów online, porządkuje informacje o koncertach, zachęca do zapisów do newslettera i tworzy profesjonalny, nowoczesny wizerunek zespołu.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problems Section */}
        <section className="mb-20 md:mb-24">
          <h2 className="font-[Montserrat] text-3xl md:text-4xl font-bold mb-12 text-center text-white">
            Cele i problemy klienta przed projektem
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#fee715]/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center text-red-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {problem.icon}
                </div>
                <h3 className="font-[Montserrat] text-lg font-bold text-white mb-2">
                  {problem.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {problem.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Solutions Section */}
        <section className="mb-20 md:mb-24">
          <h2 className="font-[Montserrat] text-3xl md:text-4xl font-bold mb-12 text-center text-white">
            Jak to rozwiązałem
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#fee715]/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#fee715]/20 to-[#00C9A7]/20 flex items-center justify-center text-[#00C9A7] mb-4 group-hover:scale-110 transition-transform duration-300">
                  {solution.icon}
                </div>
                <h3 className="font-[Montserrat] text-lg font-bold text-white mb-2">
                  {solution.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {solution.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Before/After Section - Home Page */}
        <section className="mb-20 md:mb-24">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setIsHomeExpanded(!isHomeExpanded)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#fee715]/30 transition-all duration-300 text-left group"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-[Montserrat] text-2xl md:text-3xl font-bold text-white">
                  Przykład poprawy: Strona główna
                </h2>
                <svg 
                  className={`w-6 h-6 text-[#fee715] transition-transform duration-300 ${isHomeExpanded ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {!isHomeExpanded && (
                <div className="flex items-center gap-4">
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <div className="relative rounded-lg overflow-hidden border-2 border-red-500/30">
                      <img 
                        src="/images/redlin_home_before.jpg" 
                        alt="Przed" 
                        className="w-full h-24 object-cover opacity-70"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/redlin_mockup_1.jpg';
                        }}
                      />
                      <div className="absolute bottom-1 left-1 bg-red-500/90 text-white px-2 py-0.5 rounded text-xs font-semibold">
                        Przed
                      </div>
                    </div>
                    <div className="relative rounded-lg overflow-hidden border-2 border-[#00C9A7]/30">
                      <img 
                        src="/images/redlin_homepage.jpg" 
                        alt="Po" 
                        className="w-full h-24 object-cover opacity-70"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/redlin_mockup_1.jpg';
                        }}
                      />
                      <div className="absolute bottom-1 left-1 bg-[#00C9A7]/90 text-white px-2 py-0.5 rounded text-xs font-semibold">
                        Po
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm hidden md:block">
                    Kliknij, aby zobaczyć pełne porównanie
                  </p>
                </div>
              )}
            </button>

            {isHomeExpanded && (
              <div className="mt-6 space-y-6 animate-fadeIn">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <div className="relative bg-white/5 border border-red-500/30 rounded-xl overflow-hidden mb-4">
                      <div className="absolute top-4 left-4 z-10 bg-red-500/90 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                        Przed
                      </div>
                      <img 
                        src="/images/redlin_home_before.jpg" 
                        alt="Strona główna - przed zmianami" 
                        className="w-full h-auto opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/redlin_mockup_1.jpg';
                        }}
                      />
                    </div>
                    <p className="text-center text-gray-400 text-sm">
                      Stara wersja
                    </p>
                  </div>

                  <div className="group">
                    <div className="relative bg-white/5 border border-[#00C9A7]/30 rounded-xl overflow-hidden mb-4">
                      <div className="absolute top-4 left-4 z-10 bg-[#00C9A7]/90 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                        Po
                      </div>
                      <img 
                        src="/images/redlin_homepage.jpg" 
                        alt="Strona główna - po zmianach" 
                        className="w-full h-auto opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/redlin_mockup_1.jpg';
                        }}
                      />
                    </div>
                    <p className="text-center text-gray-400 text-sm">
                      Nowa wersja
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Gallery Section */}
        <section className="mb-20 md:mb-24">
          <h2 className="font-[Montserrat] text-3xl md:text-4xl font-bold mb-12 text-center text-white">
            Galeria projektu
          </h2>
          
          <div className="relative max-w-5xl mx-auto">
            {/* Slider */}
            <div className="relative overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {galleryImages.map((image, index) => (
                  <div key={index} className="min-w-full">
                    <div className="relative">
                      <img 
                        src={image.src} 
                        alt={image.alt} 
                        className="w-full h-auto"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/redlin_mockup_1.jpg';
                        }}
                      />
                      <div className="absolute bottom-4 left-4 bg-[#fee715]/80 text-[#101820] font-semibold px-4 py-2 rounded-lg text-sm">
                        {image.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation - positioned on image edges */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 z-10"
                aria-label="Poprzedni slajd"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 z-10"
                aria-label="Następny slajd"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Thumbnails Section */}
            <div className="mt-8">
              <p className="text-center text-gray-400 text-sm mb-4">
                Przegląd widoków strony
              </p>
              <div className="flex justify-center gap-2 overflow-x-auto py-4 px-2">
                {galleryImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`flex-shrink-0 rounded-lg border-2 transition-all duration-300 relative ${
                      index === currentSlide 
                        ? 'border-[#fee715] scale-110 w-20 h-20 md:w-24 md:h-24 z-10 shadow-lg shadow-[#fee715]/20' 
                        : 'border-white/20 hover:border-white/40 opacity-60 hover:opacity-100 w-16 h-16 md:w-20 md:h-20'
                    }`}
                    aria-label={`Przejdź do slajdu ${index + 1}`}
                  >
                    <div className="w-full h-full rounded-lg overflow-hidden">
                      <img 
                        src={image.src} 
                        alt={image.alt}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/redlin_mockup_1.jpg';
                        }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="mb-20 md:mb-24">
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#fee715]/20 to-[#00C9A7]/20 flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#fee715]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h2 className="font-[Montserrat] text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                  Technologie i architektura
                </h2>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-300 leading-relaxed text-lg mb-6">
                  Strona została zbudowana w <span className="text-[#fee715] font-semibold">Next.js</span>, z wykorzystaniem SSR/SSG, optymalizacji obrazów i lekkich komponentów. Dzięki temu witryna pozostaje szybka i responsywna, mimo dużej liczby zdjęć, grafik i animowanych elementów koncertowych. Hosting na Vercel zapewnia natychmiastowe wdrażanie i świetną wydajność globalną.
                </p>
              </div>

              {/* Technology Logos */}
              <div className="flex flex-wrap items-center gap-6 justify-center">
                {technologies.map((tech, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#fee715]/30 transition-all duration-300 p-3">
                      <img 
                        src={tech.logo} 
                        alt={tech.name}
                        className="w-full h-full object-contain filter brightness-0 invert"
                      />
                    </div>
                    <span className="text-sm text-gray-300">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="mb-20 md:mb-24">
          <h2 className="font-[Montserrat] text-3xl md:text-4xl font-bold mb-12 text-center text-white">
            Rezultaty
          </h2>
          
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Desktop Results */}
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <svg className="w-6 h-6 text-[#fee715]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h3 className="font-[Montserrat] text-xl md:text-2xl font-bold text-white">
                  Desktop (PageSpeed Insights)
                </h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {desktopResults.map((result, index) => (
                  <div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:border-[#00C9A7]/30 transition-all duration-300"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-[#00C9A7] mb-1">
                      {result.value}
                      <span className="text-lg text-gray-400">{result.unit}</span>
                    </div>
                    <div className="text-gray-300 text-sm">
                      {result.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Results */}
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <svg className="w-6 h-6 text-[#fee715]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <h3 className="font-[Montserrat] text-xl md:text-2xl font-bold text-white">
                  Mobile (PageSpeed Insights)
                </h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {mobileResults.map((result, index) => (
                  <div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:border-[#00C9A7]/30 transition-all duration-300"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-[#00C9A7] mb-1">
                      {result.value}
                      <span className="text-lg text-gray-400">{result.unit}</span>
                    </div>
                    <div className="text-gray-300 text-sm">
                      {result.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Effects */}
            <div className="mt-6 text-center max-w-3xl mx-auto">
              <p className="text-gray-300 leading-relaxed text-sm md:text-base italic">
                Dodatkowe efekty: uproszczony proces zakupu biletów, większa konwersja dzięki przejrzystej strukturze, wyraźnie lepszy odbiór marki, wzrost zapisów do newslettera.
              </p>
            </div>

            {/* Source */}
            <div className="text-center mt-4">
              <p className="text-gray-400 text-sm">
                Źródło: Google PageSpeed Insights
              </p>
            </div>
          </div>
        </section>

        {/* Live Site Link */}
        <section className="mb-20 md:mb-24">
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl overflow-hidden group hover:border-[#fee715]/30 transition-all duration-300">
              {/* Background mockup preview */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#fee715]/10 via-transparent to-[#00C9A7]/10"></div>
                <img 
                  src="/images/pasw_main_page.jpg" 
                  alt="REDLIN - Podgląd strony" 
                  className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center z-10">
                    <h3 className="font-[Montserrat] text-3xl md:text-4xl font-bold mb-4 text-white">
                      Zobacz stronę na żywo
                    </h3>
                    <p className="text-gray-300 mb-6 text-lg">
                      Odwiedź działającą stronę i zobacz wszystkie funkcje w akcji
                    </p>
                    <a
                      href="https://www.redlin.pl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-bold px-8 py-4 rounded-lg hover:shadow-lg hover:shadow-[#fee715]/50 transition-all duration-300 transform hover:scale-105"
                    >
                      Otwórz stronę
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 md:p-12 max-w-3xl mx-auto">
            <h3 className="font-[Montserrat] text-2xl md:text-3xl font-bold mb-4 text-white">
              Chcesz taką stronę dla siebie?
            </h3>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              Stwórzmy razem stronę, która działa szybko, wygląda profesjonalnie i pomaga osiągać Twoje cele biznesowe.
            </p>
            <Link
              to="/kontakt"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-bold px-8 py-4 rounded-lg hover:shadow-lg hover:shadow-[#fee715]/50 transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
            >
              <span className="relative z-10">Skontaktuj się ze mną</span>
              <svg 
                className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-[#00C9A7] to-[#fee715] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};
