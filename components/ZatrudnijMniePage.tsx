import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

export const ZatrudnijMniePage: React.FC = () => {
  useSEO({
    title: 'Zewnętrzny Head of Marketing na kontrakcie B2B | Stanisław Drożniak',
    description: 'Zewnętrzny Head of Marketing na kontrakcie B2B. Przejmuję odpowiedzialność za strategię, plan działań, zarządzanie realizacją i mierzenie efektów marketingu w Twojej firmie.',
    keywords: 'zewnętrzny head of marketing, head of marketing B2B, fractional head of marketing, marketing na kontrakcie',
    ogTitle: 'Zewnętrzny Head of Marketing na kontrakcie B2B',
    ogDescription: 'Przejmuję odpowiedzialność za marketing w firmie: strategię, plan działań, zarządzanie realizacją i mierzenie efektów.',
  });

  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowTooltip(false);
      }
    };

    if (showTooltip) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showTooltip]);

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const dlaKogoItems = [
    'rozwijają sprzedaż i potrzebują osoby odpowiedzialnej za marketing jako całość, a nie tylko za pojedyncze kanały',
    'działają sprawnie decyzyjnie i oczekują jasnych priorytetów oraz stałego rytmu pracy',
    'mają wewnętrzny zespół lub stałych wykonawców, ale brakuje im spójnego planu i konsekwentnego zarządzania realizacją',
    'inwestują w pozyskiwanie klientów, lecz chcą zwiększyć przewidywalność wyników, poprawić jakość leadów i mieć lepszą kontrolę nad kosztami oraz konwersją',
  ];

  const nieOptymalneItems = [
    'firma oczekuje wyłącznie doraźnych zleceń bez wspólnego planu i bez odpowiedzialności po stronie decydentów',
    'nie ma gotowości do pracy w stałym rytmie i podejmowania decyzji na podstawie danych',
  ];

  const zakresItems = [
    {
      title: 'Strategia i plan',
      items: [
        'priorytety oraz plan na najbliższy kwartał',
        'rekomendacje kanałów, komunikacji i oferty',
      ],
    },
    {
      title: 'Lejek i konwersja',
      items: [
        'identyfikacja strat na kluczowych etapach',
        'usprawnienia konwersji i jakości leadów',
      ],
    },
    {
      title: 'Zarządzanie realizacją',
      items: [
        'priorytety, harmonogram, standardy i kontrola jakości',
        'koordynacja zespołu oraz partnerów zewnętrznych',
      ],
    },
    {
      title: 'Mierzenie i raportowanie',
      items: [
        'KPI dopasowane do celów biznesowych',
        'panel wyników oraz cykliczne przeglądy',
      ],
    },
    {
      title: 'Wsparcie techniczne, gdy potrzebne',
      items: [
        'automatyzacje, integracje, CRM i komunikacja e-mail',
        'analityka oraz śledzenie zdarzeń na stronie',
      ],
    },
  ];

  const standardowyRytm = [
    '1 spotkanie tygodniowe operacyjne 30-60 min',
    '1 spotkanie miesięczne strategiczne 60-90 min',
    'bieżąca koordynacja w ustalonym kanale komunikacji',
    'cykliczny przegląd KPI oraz decyzji dotyczących priorytetów i budżetu',
  ];

  const odCzegoZalezy = [
    'złożoności działań i liczby obszarów, za które mam odpowiadać',
    'stanu fundamentów: analityka, CRM, strona, proces sprzedaży',
    'skali koordynacji: wielkość zespołu i liczba wykonawców',
    'wymaganego tempa realizacji i poziomu dostępności',
  ];

  const faqItems = [
    {
      question: 'Czy podajesz stałą cenę z góry?',
      answer: 'Na stronie podaję widełki orientacyjne. Po rozmowie i ustaleniu zakresu odpowiedzialności przygotowuję propozycję współpracy ze stałą kwotą miesięczną.',
    },
    {
      question: 'Dlaczego kontrakt B2B, a nie zatrudnienie na etat?',
      answer: 'Kontrakt B2B pozwala pełnić funkcję Head of Marketing w ustalonym wymiarze, bez kosztu pełnego etatu i bez procesu rekrutacji na stanowisko stałe.',
    },
    {
      question: 'Jaki jest minimalny okres współpracy?',
      answer: 'Minimalny okres współpracy to 3 miesiące. W praktyce najlepsze efekty daje umowa na 6-12 miesięcy, ponieważ umożliwia pracę w cyklu kwartalnym i systematyczne zwiększanie skuteczności marketingu.',
    },
    {
      question: 'Ile czasu miesięcznie jesteś dostępny?',
      answer: 'Zakres ustalamy w umowie. Orientacyjnie jest to 20-80 godzin miesięcznie. Dokładny poziom zaangażowania zależy od skali działań i potrzeb firmy.',
    },
    {
      question: 'Czy pracujesz na wyłączność?',
      answer: 'Tak, w ramach roli Head of Marketing pracuję na wyłączność. Oznacza to, że w czasie obowiązywania umowy nie pełnię równolegle funkcji Head of Marketing w innej firmie.',
    },
    {
      question: 'Czy przejmujesz zarządzanie zespołem i wykonawcami?',
      answer: 'Tak. Ustalamy rytm pracy, sposób komunikacji, odpowiedzialności oraz standardy realizacji. Koordynacja zespołu i partnerów jest jednym z kluczowych elementów tej współpracy.',
    },
    {
      question: 'Czy zajmujesz się również analityką i mierzeniem efektów?',
      answer: 'Tak. Ustalamy KPI, sposób raportowania oraz cykliczne przeglądy wyników. Celem jest podejmowanie decyzji na podstawie danych.',
    },
    {
      question: 'Jak wygląda start współpracy?',
      answer: 'Na początku doprecyzowujemy cele biznesowe, zakres odpowiedzialności, priorytety na pierwszy okres oraz rytm pracy. Następnie przechodzę do realizacji wraz z zespołem i wykonawcami, równolegle ustawiając system mierzenia efektów.',
    },
    {
      question: 'Co musi zapewnić firma po swojej stronie, żeby to działało?',
      answer: 'Potrzebne są osoby decyzyjne z jasnym trybem podejmowania decyzji, dostęp do kluczowych narzędzi i danych oraz gotowość do utrzymania stałego rytmu współpracy.',
    },
  ];

  return (
    <main className="bg-[#101820] text-white py-20 md:py-32 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Hero Section */}
        <section className="mb-24 md:mb-32">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-12 md:mb-16">
              {/* Lewa kolumna - Tekst */}
              <div className="text-center md:text-left">
                {/* Nadtytuł */}
                <p className="text-sm md:text-base text-white font-medium mb-4 md:mb-6 uppercase tracking-wide">
                  Dla małych i średnich firm
                </p>
                
                {/* Nagłówek HERO */}
                <h1 className="font-[Montserrat] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 md:mb-8 leading-tight">
                  <span className="text-[#fee715]">
                    Zarządzanie marketingiem w modelu B2B
                  </span>
                </h1>
                
                {/* Podtytuł */}
                <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
                  Odpowiadam za strategię, priorytety i realizację marketingu. W zależności od potrzeb obejmuję rolę Marketing Lead lub Head of Marketing w ustalonym wymiarze miesięcznym.
                </p>
              </div>
              
              {/* Prawa kolumna - Zdjęcie */}
              <div className="relative order-first md:order-last">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/images/Drozniak_Zdjecie_Suit2.jpg"
                    alt="Stanisław Drożniak - Zewnętrzny Head of Marketing"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101820]/30 to-transparent"></div>
                </div>
              </div>
            </div>
            
            {/* Krótkie fakty - jako kafle */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16 text-center">
              <div className="bg-white/5 border border-white/10 rounded-lg px-5 py-4 hover:border-white/20 transition-all duration-300 text-center">
                <p className="text-gray-400 font-medium text-xs md:text-sm mb-1.5 uppercase tracking-wide">Forma współpracy</p>
                <p className="text-white font-semibold text-sm md:text-base">Kontrakt B2B, miesięczny retainer</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg px-5 py-4 hover:border-white/20 transition-all duration-300 text-center">
                <p className="text-gray-400 font-medium text-xs md:text-sm mb-1.5 uppercase tracking-wide">Minimalny okres</p>
                <p className="text-white font-semibold text-sm md:text-base">3 miesiące</p>
              </div>
              <div 
                className="relative bg-white/5 border border-white/10 rounded-lg px-5 py-4 hover:border-white/20 transition-all duration-300 text-center cursor-help"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={() => setShowTooltip(!showTooltip)}
              >
                <div className="flex items-center justify-center gap-1.5 mb-1.5">
                  <p className="text-gray-400 font-medium text-xs md:text-sm uppercase tracking-wide">Wyłączność roli</p>
                  <svg 
                    className="w-3.5 h-3.5 text-[#fee715] flex-shrink-0" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-label="Kliknij lub najedź, aby zobaczyć więcej informacji"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-white font-semibold text-sm md:text-base">Head of Marketing</p>
                {showTooltip && (
                  <div 
                    ref={tooltipRef}
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-80 bg-[#101820] border border-white/20 rounded-lg p-4 shadow-xl z-50"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    <p className="text-sm text-gray-300 leading-relaxed">
                      W przypadku kontraktu dla roli Head of Marketing obowiązuje wyłączność w ramach tej funkcji. Oznacza to, że w okresie obowiązywania umowy nie pełnię równolegle funkcji Head of Marketing w innej organizacji. Wyłączność dotyczy pełnienia tej roli, a nie pozostałej działalności.
                    </p>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white/20"></div>
                  </div>
                )}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
              <a
                href="https://calendly.com/drozniakstanislaw/spotkanie"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-bold px-8 py-4 rounded-lg hover:shadow-lg hover:shadow-[#fee715]/50 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
              >
                <span>Umów rozmowę 20 min</span>
                <svg 
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <Link
                to="/kontakt"
                className="border-2 border-[#fee715] text-[#fee715] font-bold px-8 py-4 rounded-lg hover:bg-[#fee715] hover:text-[#101820] transition-all duration-300 inline-flex items-center justify-center"
              >
                Otrzymaj wstępną propozycję
              </Link>
            </div>
          </div>
        </section>

        {/* Dla kogo jest ta współpraca */}
        <section className="mb-24 md:mb-32 py-16 md:py-20 bg-[#0f1a24] -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-[Montserrat] text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 text-white">
              Dla kogo jest ta współpraca
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-10 md:mb-12 leading-relaxed max-w-3xl">
              Najczęściej współpracuję z firmami, które:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
              {dlaKogoItems.map((item, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 hover:border-white/20 transition-all duration-300">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-r from-[#fee715] to-[#00C9A7] flex items-center justify-center mt-0.5 mr-4">
                      <svg className="w-4 h-4 text-[#101820]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-300 leading-relaxed flex-1 text-base md:text-lg">{item}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-10">
              <p className="text-xl md:text-2xl font-semibold text-white mb-6 md:mb-8">Ten model nie jest optymalny, jeśli:</p>
              <div className="grid md:grid-cols-2 gap-6">
                {nieOptymalneItems.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center mt-0.5 mr-4">
                      <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <p className="text-gray-300 leading-relaxed flex-1 text-base md:text-lg">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Co obejmuje moja odpowiedzialność */}
        <section className="mb-24 md:mb-32">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-[Montserrat] text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 text-white">
              Co obejmuje moja odpowiedzialność
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-12 md:mb-16 leading-relaxed max-w-3xl">
              Zakres ustalamy w umowie. Poniżej obszary, które najczęściej obejmuje współpraca.
            </p>
            <div className="grid md:grid-cols-2 gap-8 md:gap-10">
              {zakresItems.map((item, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-8 md:p-10 hover:border-[#fee715]/30 transition-all duration-300 flex flex-col">
                  <div className="flex items-center justify-center mb-8">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-r from-[#fee715]/20 to-[#00C9A7]/20 border border-[#fee715]/30 flex items-center justify-center mr-4">
                      <span className="text-[#fee715] font-semibold text-sm">{index + 1}</span>
                    </div>
                    <h3 className="font-[Montserrat] text-lg md:text-xl font-semibold text-white leading-tight text-center flex-1">
                      {item.title}
                    </h3>
                  </div>
                  <ul className="space-y-4 flex-1">
                    {item.items.map((subItem, subIndex) => (
                      <li key={subIndex} className="flex items-start">
                        <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#fee715] mt-2.5 mr-4"></div>
                        <p className="text-gray-300 leading-relaxed flex-1 text-sm md:text-base">{subItem}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Jak wygląda współpraca w praktyce */}
        <section className="mb-24 md:mb-32 py-16 md:py-20 bg-[#0f1a24] -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-[Montserrat] text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 text-white">
              Jak wygląda współpraca w praktyce
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-12 md:mb-16 leading-relaxed max-w-3xl">
              Współpraca opiera się o jasno określony zakres odpowiedzialności, rytm pracy i sposób podejmowania decyzji.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-gradient-to-br from-[#fee715]/10 to-[#00C9A7]/10 border border-[#fee715]/20 rounded-xl p-8 md:p-10">
                <h3 className="font-[Montserrat] text-xl md:text-2xl font-bold mb-6 md:mb-8 text-white">Standardowy rytm:</h3>
                <ul className="space-y-5">
                  {standardowyRytm.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-[#fee715] to-[#00C9A7] flex items-center justify-center mt-0.5 mr-4">
                        <span className="text-[#101820] font-bold text-sm">{index + 1}</span>
                      </div>
                      <p className="text-gray-300 leading-relaxed flex-1 text-base md:text-lg pt-1">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-10">
                <h3 className="font-[Montserrat] text-xl md:text-2xl font-bold mb-6 md:mb-8 text-white">Poziom zaangażowania:</h3>
                <ul className="space-y-5">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#00C9A7] mt-2.5 mr-4"></div>
                    <p className="text-gray-300 leading-relaxed flex-1 text-base md:text-lg">współpraca jest realizowana w ustalonym wymiarze miesięcznym, dopasowanym do potrzeb firmy</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#00C9A7] mt-2.5 mr-4"></div>
                    <p className="text-gray-300 leading-relaxed flex-1 text-base md:text-lg">orientacyjnie 20-80 godzin miesięcznie</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#00C9A7] mt-2.5 mr-4"></div>
                    <p className="text-gray-300 leading-relaxed flex-1 text-base md:text-lg">dokładny zakres i dostępność są ustalane w umowie</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Oferta współpracy */}
        <section className="mb-24 md:mb-32">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-[Montserrat] text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 text-white">
              Oferta współpracy
            </h2>
            <p className="text-base md:text-lg text-gray-300 mb-12 md:mb-16 leading-relaxed max-w-3xl">
              Dostępne są dwa warianty. Marketing Lead koncentruje się na prowadzeniu realizacji i koordynacji wykonania priorytetów. Head of Marketing obejmuje pełną odpowiedzialność za marketing end-to-end: strategię, KPI, decyzje i zarządzanie realizacją.
            </p>
            
            {/* Karty */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-10 mb-12 md:mb-16">
              {/* KARTA 1 - Marketing Lead */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-10 hover:border-white/20 transition-all duration-300">
                <div className="mb-6">
                  <h3 className="font-[Montserrat] text-2xl md:text-3xl font-bold mb-2 text-white">
                    Marketing Lead
                  </h3>
                  <p className="text-sm md:text-base text-gray-400 mb-6">Kontrakt B2B - ustalony wymiar miesięczny</p>
                  <div className="mb-6">
                    <p className="text-3xl md:text-4xl font-bold text-[#fee715] mb-1">
                      8 000 - 14 000 zł
                    </p>
                    <p className="text-gray-300 text-sm md:text-base">miesięcznie</p>
                  </div>
                  <div className="mb-6 pb-6 border-b border-white/10">
                    <p className="text-xs md:text-sm text-gray-400 mb-1 uppercase tracking-wide">Orientacyjny wymiar</p>
                    <p className="text-white font-semibold text-sm md:text-base">20-40 godzin miesięcznie</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-4 text-sm md:text-base uppercase tracking-wide">Zakres typowy</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#00C9A7] mt-2 mr-3"></div>
                      <p className="text-gray-300 leading-relaxed flex-1 text-sm md:text-base">prowadzenie realizacji ustalonych priorytetów marketingowych</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#00C9A7] mt-2 mr-3"></div>
                      <p className="text-gray-300 leading-relaxed flex-1 text-sm md:text-base">koordynacja wykonawców, standardy pracy, kontrola jakości realizacji</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#00C9A7] mt-2 mr-3"></div>
                      <p className="text-gray-300 leading-relaxed flex-1 text-sm md:text-base">praca nad konwersją w kluczowych punktach procesu: strona, landing pages, formularze, follow-up</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#00C9A7] mt-2 mr-3"></div>
                      <p className="text-gray-300 leading-relaxed flex-1 text-sm md:text-base">usprawnienia w raportowaniu oraz cykliczne rekomendacje decyzji dotyczących priorytetów</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#00C9A7] mt-2 mr-3"></div>
                      <p className="text-gray-300 leading-relaxed flex-1 text-sm md:text-base">wsparcie w narzędziach i automatyzacjach, gdy są potrzebne dla skuteczności działań</p>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-xs md:text-sm text-gray-400 mb-1 uppercase tracking-wide">Dla kogo</p>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">Dla firm, które mają określony kierunek lub potrzebują go doprecyzować, a kluczową potrzebą jest stabilne prowadzenie realizacji, koordynacja i podnoszenie jakości egzekucji.</p>
                </div>
              </div>

              {/* KARTA 2 - Head of Marketing */}
              <div className="bg-gradient-to-br from-[#fee715]/10 to-[#00C9A7]/10 border-2 border-[#fee715]/30 rounded-xl p-8 md:p-10 hover:border-[#fee715]/40 transition-all duration-300">
                <div className="mb-6">
                  <h3 className="font-[Montserrat] text-2xl md:text-3xl font-bold mb-2 text-white">
                    Head of Marketing
                  </h3>
                  <p className="text-sm md:text-base text-gray-400 mb-6">Kontrakt B2B - ustalony wymiar miesięczny</p>
                  <div className="mb-6">
                    <p className="text-3xl md:text-4xl font-bold text-[#fee715] mb-1">
                      14 000 - 22 000 zł
                    </p>
                    <p className="text-gray-300 text-sm md:text-base">miesięcznie</p>
                  </div>
                  <div className="mb-6 pb-6 border-b border-white/10">
                    <p className="text-xs md:text-sm text-gray-400 mb-1 uppercase tracking-wide">Orientacyjny wymiar</p>
                    <p className="text-white font-semibold text-sm md:text-base">40-80 godzin miesięcznie</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-4 text-sm md:text-base uppercase tracking-wide">Zakres typowy</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#00C9A7] mt-2 mr-3"></div>
                      <p className="text-gray-300 leading-relaxed flex-1 text-sm md:text-base">odpowiedzialność za strategię marketingową, plan działań i KPI</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#00C9A7] mt-2 mr-3"></div>
                      <p className="text-gray-300 leading-relaxed flex-1 text-sm md:text-base">decyzje dotyczące kierunku działań marketingowych oraz budżetów</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#00C9A7] mt-2 mr-3"></div>
                      <p className="text-gray-300 leading-relaxed flex-1 text-sm md:text-base">zarządzanie realizacją, koordynacja zespołu i partnerów zewnętrznych</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#00C9A7] mt-2 mr-3"></div>
                      <p className="text-gray-300 leading-relaxed flex-1 text-sm md:text-base">projektowanie i optymalizacja lejka marketingowo-sprzedażowego oraz jakości leadów</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#00C9A7] mt-2 mr-3"></div>
                      <p className="text-gray-300 leading-relaxed flex-1 text-sm md:text-base">system mierzenia efektów i cykliczne rekomendacje decyzyjne dla zarządu</p>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4 mb-4">
                  <p className="text-xs md:text-sm text-gray-400 mb-1 uppercase tracking-wide">Wyłączność w ramach roli</p>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">W czasie obowiązywania umowy nie pełnię równolegle funkcji Head of Marketing w innej firmie.</p>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-xs md:text-sm text-gray-400 mb-1 uppercase tracking-wide">Dla kogo</p>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">Dla firm, które potrzebują właściciela marketingu end-to-end i chcą mieć jedną osobę odpowiedzialną za kierunek, priorytety, realizację oraz mierzenie efektów.</p>
                </div>
              </div>
            </div>

            {/* Sekcja pod kartami */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-10 mb-8 md:mb-10">
              <p className="text-gray-300 leading-relaxed text-base md:text-lg mb-4">
                Minimalny okres współpracy to 3 miesiące. Dłuższa umowa może wpływać na finalną wycenę, ponieważ umożliwia planowanie w cyklu kwartalnym i stabilne zarządzanie priorytetami.
              </p>
              <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                Powyższe widełki mają charakter orientacyjny. Po rozmowie i ustaleniu zakresu odpowiedzialności przedstawiam propozycję współpracy ze stałą kwotą miesięczną.
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com/drozniakstanislaw/spotkanie"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-bold px-8 py-4 rounded-lg hover:shadow-lg hover:shadow-[#fee715]/50 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
              >
                <span>Umów rozmowę 20 min</span>
                <svg 
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <Link
                to="/kontakt"
                className="border-2 border-[#fee715] text-[#fee715] font-bold px-8 py-4 rounded-lg hover:bg-[#fee715] hover:text-[#101820] transition-all duration-300 inline-flex items-center justify-center"
              >
                Otrzymaj wstępną propozycję
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-24 md:mb-32 py-16 md:py-20 bg-[#0f1a24] -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-[Montserrat] text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 text-white">
              FAQ
            </h2>
            <div className="space-y-4 md:space-y-6">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 md:px-8 py-6 md:py-7 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-200"
                  >
                    <h3 className="font-semibold text-white pr-4 text-base md:text-lg lg:text-xl">{item.question}</h3>
                    <svg
                      className={`w-6 h-6 text-[#fee715] flex-shrink-0 transition-transform duration-300 ${
                        expandedFAQ === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-6 md:px-8 pt-2 pb-8 md:pt-4 md:pb-10 border-t border-white/10">
                      <p className="text-gray-300 leading-relaxed text-base md:text-lg">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-[#fee715] to-[#00C9A7] rounded-2xl p-10 md:p-16 text-center">
            <h2 className="font-[Montserrat] text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 text-[#101820]">
              Gotowy na współpracę?
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-[#101820]/90 mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed">
              Jeśli chcesz, żebym przejął odpowiedzialność za marketing w Twojej firmie, umów rozmowę. W 20 minut sprawdzimy, czy ten model ma sens i jaki zakres będzie właściwy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com/drozniakstanislaw/spotkanie"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#101820] text-white font-bold px-8 py-4 rounded-lg hover:bg-black transition-colors duration-300 inline-flex items-center justify-center"
              >
                Umów rozmowę 20 min
              </a>
              <Link
                to="/kontakt"
                className="border-2 border-[#101820] text-[#101820] font-bold px-8 py-4 rounded-lg hover:bg-[#101820] hover:text-white transition-all duration-300 inline-flex items-center justify-center"
              >
                Otrzymaj wstępną propozycję
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
