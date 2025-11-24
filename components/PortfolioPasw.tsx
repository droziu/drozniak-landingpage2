import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const PortfolioPasw: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isBeforeAfterExpanded, setIsBeforeAfterExpanded] = useState(false);
  const [isHistoriaExpanded, setIsHistoriaExpanded] = useState(false);

  // Reset scroll position to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const galleryImages = [
    { src: '/images/Gallery_main.jpg', alt: 'Desktop - Strona główna', label: 'Desktop - Strona główna' },
    { src: '/images/Gallery_main_2.jpg', alt: 'Desktop - Strona główna 2', label: 'Desktop - Strona główna 2' },
    { src: '/images/Gallery_naszesekcje.jpg', alt: 'Desktop - Nasze Sekcje', label: 'Desktop - Nasze Sekcje' },
    { src: '/images/Gallery_historia_1.jpg', alt: 'Desktop - Historia 1', label: 'Desktop - Historia 1' },
    { src: '/images/Gallery_historia_2.jpg', alt: 'Desktop - Historia 2', label: 'Desktop - Historia 2' },
    { src: '/images/Gallery_faq.jpg', alt: 'Desktop - FAQ', label: 'Desktop - FAQ' },
    { src: '/images/Gallery_filmy.jpg', alt: 'Desktop - Filmy', label: 'Desktop - Filmy' },
    { src: '/images/Gallery_kamilka.jpg', alt: 'Desktop - Ustawa Kamilka', label: 'Desktop - Ustawa Kamilka' },
    { src: '/images/mobile_home1.jpg', alt: 'Mobile - Strona główna 1', label: 'Mobile - Strona główna 1' },
    { src: '/images/mobile_home2.jpg', alt: 'Mobile - Strona główna 2', label: 'Mobile - Strona główna 2' },
    { src: '/images/mobile_nasze_sekcje.jpg', alt: 'Mobile - Nasze Sekcje', label: 'Mobile - Nasze Sekcje' },
    { src: '/images/mobile_historia.jpg', alt: 'Mobile - Historia', label: 'Mobile - Historia' },
    { src: '/images/mobile_ustawa_kamilka.jpg', alt: 'Mobile - Ustawa Kamilka', label: 'Mobile - Ustawa Kamilka' }
  ];

  // Auto-play slider
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [galleryImages.length]);

  const problems = [
    {
      title: 'Wolne działanie na urządzeniach mobilnych',
      description: 'Strona działała wolno na urządzeniach mobilnych, co zniechęcało użytkowników.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Rozproszone informacje o sekcjach',
      description: 'Informacje o sekcjach były rozproszone i trudne do znalezienia.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: 'Trudna do przeglądania historia',
      description: 'Historia akademii była jednym długim blokiem tekstu, trudnym do przeglądania.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: 'Niewygodny kontakt',
      description: 'Kontakt był mało wygodny dla nowych użytkowników, szczególnie na mobile.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    },
    {
      title: 'Brak spójnego wizerunku',
      description: 'Brakowało spójnego, aktualnego wizerunku wizualnego.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    }
  ];

  const solutions = [
    {
      title: 'Maksymalna wydajność',
      description: 'Ograniczenie zbędnych skryptów, optymalizacja grafik i rozsądne ładowanie zasobów.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: 'Przejrzysta struktura',
      description: 'Uporządkowana nawigacja bez zbędnych podstron i chaosu.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    },
    {
      title: 'Oś czasu historii',
      description: 'Czytelna oś czasu prezentująca najważniejsze daty i wydarzenia.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Mobile-first design',
      description: 'Klikalne numery telefonów i pełna responsywność.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  const desktopResults = [
    { label: 'Wydajność', value: '99', unit: '/100' },
    { label: 'Ułatwienia dostępu', value: '94', unit: '/100' },
    { label: 'Best Practices', value: '100', unit: '/100' },
    { label: 'SEO', value: '100', unit: '/100' }
  ];

  const mobileResults = [
    { label: 'Wydajność', value: '89', unit: '/100' },
    { label: 'Ułatwienia dostępu', value: '95', unit: '/100' },
    { label: 'Best Practices', value: '100', unit: '/100' },
    { label: 'SEO', value: '100', unit: '/100' }
  ];

  const technologies = [
    { name: 'Astro', logo: '/images/Astro.svg.png' },
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
                Pszczyńska Akademia Sztuk Walki
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              nowa strona internetowa
            </p>
            <p className="text-xl md:text-2xl font-semibold text-white max-w-3xl mx-auto leading-relaxed mb-12 md:mb-16">
              Redesign strony PASW – <span className="bg-gradient-to-r from-[#fee715] to-[#00C9A7] bg-clip-text text-transparent">szybsza, czytelniejsza</span> i dopasowana do użytkowników mobilnych.
            </p>
          </div>

          <div className="relative flex justify-center">
            {/* Multi-layer shadow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#fee715]/20 via-[#00C9A7]/20 to-[#fee715]/20 blur-3xl rounded-2xl -z-10 transform translate-y-8 scale-105"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#fee715]/10 via-[#00C9A7]/10 to-[#fee715]/10 blur-2xl rounded-2xl -z-10 transform translate-y-4 scale-102"></div>
            
            <div className="relative w-full md:w-[70%] lg:w-[65%] transform hover:scale-[1.02] transition-transform duration-500">
              <img 
                src="/images/pasw_mockup_1.jpg" 
                alt="Pszczyńska Akademia Sztuk Walki - Mockup strony" 
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
                    PASW to jedna z najstarszych szkół sztuk walki w Polsce.
                  </p>
                  <p>
                    Działa nieprzerwanie od 1957 roku i prowadzi zajęcia kung-fu, jiu-jitsu oraz systema dla dzieci, młodzieży i dorosłych.
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
                    Celem projektu było stworzenie nowej strony, która działa szybko na urządzeniach mobilnych, w przejrzysty sposób pokazuje sekcje i grafik treningów oraz lepiej prezentuje historię akademii.
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
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#00C9A7]/30 transition-all duration-300"
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

        {/* Before/After Section - Kontakt */}
        <section className="mb-20 md:mb-24">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setIsBeforeAfterExpanded(!isBeforeAfterExpanded)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#fee715]/30 transition-all duration-300 text-left group"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-[Montserrat] text-2xl md:text-3xl font-bold text-white">
                  Przykład poprawy: Sekcja Kontakt
                </h2>
                <svg 
                  className={`w-6 h-6 text-[#fee715] transition-transform duration-300 ${isBeforeAfterExpanded ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {!isBeforeAfterExpanded && (
                <div className="flex items-center gap-4">
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <div className="relative rounded-lg overflow-hidden border-2 border-red-500/30">
                      <img 
                        src="/images/pasw-kontakt-przed.png" 
                        alt="Przed" 
                        className="w-full h-24 object-cover opacity-70"
                      />
                      <div className="absolute bottom-1 left-1 bg-red-500/90 text-white px-2 py-0.5 rounded text-xs font-semibold">
                        Przed
                      </div>
                    </div>
                    <div className="relative rounded-lg overflow-hidden border-2 border-[#00C9A7]/30">
                      <img 
                        src="/images/pasw-kontakt-po.png" 
                        alt="Po" 
                        className="w-full h-24 object-cover opacity-70"
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

            {isBeforeAfterExpanded && (
              <div className="mt-6 space-y-6 animate-fadeIn">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Before */}
                  <div className="group">
                    <div className="relative bg-white/5 border border-red-500/30 rounded-xl overflow-hidden mb-4">
                      <div className="absolute top-4 left-4 z-10 bg-red-500/90 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                        Przed
                      </div>
                      <img 
                        src="/images/pasw-kontakt-przed.png" 
                        alt="Sekcja Kontakt - przed zmianami" 
                        className="w-full h-auto opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                    <p className="text-center text-gray-400 text-sm">
                      Stara wersja - "Kontakt"
                    </p>
                  </div>

                  {/* After */}
                  <div className="group">
                    <div className="relative bg-white/5 border border-[#00C9A7]/30 rounded-xl overflow-hidden mb-4">
                      <div className="absolute top-4 left-4 z-10 bg-[#00C9A7]/90 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                        Po
                      </div>
                      <img 
                        src="/images/pasw-kontakt-po.png" 
                        alt="Sekcja Kontakt - po zmianach" 
                        className="w-full h-auto opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                    <p className="text-center text-gray-400 text-sm">
                      Nowa wersja - "Nasze Sekcje" z klikalnymi numerami
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="text-center max-w-3xl mx-auto">
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                    Sekcja została przeprojektowana z myślą o użytkownikach mobilnych. Wszystkie numery telefonów są teraz klikalne, co umożliwia rozpoczęcie połączenia jednym tapnięciem. To szczególnie ważne dla rodziców i nowych kursantów, którzy chcą szybko skontaktować się z instruktorami.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Before/After Section - Historia */}
        <section className="mb-20 md:mb-24">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setIsHistoriaExpanded(!isHistoriaExpanded)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#fee715]/30 transition-all duration-300 text-left group"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-[Montserrat] text-2xl md:text-3xl font-bold text-white">
                  Przykład poprawy: Sekcja Historia
                </h2>
                <svg 
                  className={`w-6 h-6 text-[#fee715] transition-transform duration-300 ${isHistoriaExpanded ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {!isHistoriaExpanded && (
                <div className="flex items-center gap-4">
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <div className="relative rounded-lg overflow-hidden border-2 border-red-500/30">
                      <img 
                        src="/images/pasw-historia-przed.jpg" 
                        alt="Przed" 
                        className="w-full h-24 object-cover opacity-70"
                      />
                      <div className="absolute bottom-1 left-1 bg-red-500/90 text-white px-2 py-0.5 rounded text-xs font-semibold">
                        Przed
                      </div>
                    </div>
                    <div className="relative rounded-lg overflow-hidden border-2 border-[#00C9A7]/30">
                      <img 
                        src="/images/pasw-historia-po.jpg" 
                        alt="Po" 
                        className="w-full h-24 object-cover opacity-70"
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

            {isHistoriaExpanded && (
              <div className="mt-6 space-y-6 animate-fadeIn">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Before */}
                  <div className="group">
                    <div className="relative bg-white/5 border border-red-500/30 rounded-xl overflow-hidden mb-4">
                      <div className="absolute top-4 left-4 z-10 bg-red-500/90 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                        Przed
                      </div>
                      <img 
                        src="/images/pasw-historia-przed.jpg" 
                        alt="Sekcja Historia - przed zmianami" 
                        className="w-full h-auto opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                    <p className="text-center text-gray-400 text-sm">
                      Stara wersja - długi blok tekstu
                    </p>
                  </div>

                  {/* After */}
                  <div className="group">
                    <div className="relative bg-white/5 border border-[#00C9A7]/30 rounded-xl overflow-hidden mb-4">
                      <div className="absolute top-4 left-4 z-10 bg-[#00C9A7]/90 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                        Po
                      </div>
                      <img 
                        src="/images/pasw-historia-po.jpg" 
                        alt="Sekcja Historia - po zmianach" 
                        className="w-full h-auto opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                    <p className="text-center text-gray-400 text-sm">
                      Nowa wersja - czytelna oś czasu
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="text-center max-w-3xl mx-auto">
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                    Historia PASW wcześniej była jednym długim blokiem tekstu, trudnym do przeglądania. Dodałem czytelną oś czasu, która prezentuje najważniejsze daty i wydarzenia w przejrzystej formie. Dzięki temu można przejrzeć kluczowe momenty bez konieczności czytania całości, zachowując jednocześnie pełny opis dla zainteresowanych.
                  </p>
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
                          target.src = '/images/pasw_mockup_1.jpg'; // Fallback
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
              <div className="flex justify-center gap-2 overflow-x-auto pb-2">
                {galleryImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      index === currentSlide 
                        ? 'border-[#fee715] scale-110 w-20 h-20 md:w-24 md:h-24' 
                        : 'border-white/20 hover:border-white/40 opacity-60 hover:opacity-100 w-16 h-16 md:w-20 md:h-20'
                    }`}
                    aria-label={`Przejdź do slajdu ${index + 1}`}
                  >
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/pasw_mockup_1.jpg';
                      }}
                    />
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
                  Po analizie potrzeb PASW zdecydowałem się zbudować stronę w <span className="text-[#fee715] font-semibold">Astro (architektura islands)</span>. Lekka architektura pozwala ładować interaktywność tylko tam, gdzie jest potrzebna, dając świetny stosunek wydajności do kosztu utrzymania.
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

            {/* Source */}
            <div className="text-center mt-4">
              <p className="text-gray-400 text-sm">
                Źródło: PageSpeed Insights
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
                  src="/images/pasw_mockup_1.jpg" 
                  alt="Pszczyńska Akademia Sztuk Walki - Podgląd strony" 
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
                      href="https://pasw.com.pl"
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
              to="/strony-www#cta"
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
