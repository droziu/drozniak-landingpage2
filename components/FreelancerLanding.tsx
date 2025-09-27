import React from 'react';
import { useFadeIn } from '../hooks/useFadeIn';

export const FreelancerLanding: React.FC = () => {
  const fadeInH1 = useFadeIn<HTMLHeadingElement>();
  const fadeInYellow = useFadeIn<HTMLDivElement>();
  const fadeInSub = useFadeIn<HTMLParagraphElement>();
  const fadeInCTA = useFadeIn<HTMLDivElement>();
  const fadeInTrust = useFadeIn<HTMLDivElement>();

  return (
    <div className="bg-[#101820] text-white font-[Open Sans] overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center text-center py-16 md:py-24 px-4 md:px-6 relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#fee715]/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-[#00C9A7]/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[#fee715]/5 rounded-full blur-lg animate-bounce"></div>
        </div>
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <h1 ref={fadeInH1.ref} className={`font-[Montserrat] text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 md:mb-6 leading-tight md:leading-relaxed ${fadeInH1.className}`}>
            Strona, która sprzedaje Twoje usługi,
          </h1>
          <div ref={fadeInYellow.ref} className={`mb-4 md:mb-6 ${fadeInYellow.className}`}>
            <span className="bg-gradient-to-r from-[#fee715] to-[#00C9A7] hover:from-[#00C9A7] hover:to-[#fee715] bg-clip-text text-transparent font-[Montserrat] text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight md:leading-relaxed transition-all duration-500 cursor-pointer">a nie tylko ładnie wygląda.</span>
          </div>
          <div ref={fadeInSub.ref} className={`text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto mb-6 md:mb-8 lg:mb-10 px-2 leading-relaxed ${fadeInSub.className}`}>
            <p className="mb-4 md:mb-6 text-gray-200 font-medium">Jako były video-editor freelancer i obecny specjalista marketingu, łączę wiedzę z obu światów, aby stworzyć strony, które nie tylko wyglądają świetnie, ale przede wszystkim <span style={{color: '#fee715'}}>konwertują i budują Twoją ekspertyzę.</span></p>
            <p>Bez szablonów. Bez ograniczeń. Tylko unikalne rozwiązania, które wyróżnią Cię na rynku.</p>
          </div>
          <div ref={fadeInCTA.ref} className={`flex flex-col items-center space-y-3 px-4 ${fadeInCTA.className}`}>
            <a 
              href="#why" 
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#why')?.scrollIntoView({
                  behavior: 'smooth'
                });
              }}
              className="bg-[#fee715] text-[#101820] font-bold py-3 md:py-4 px-6 md:px-10 rounded-lg text-base md:text-lg lg:text-xl hover:bg-gradient-to-r hover:from-[#fee715] hover:to-[#00C9A7] hover:shadow-2xl hover:shadow-[#fee715]/30 transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
            >
              Dlaczego to działa?
            </a>
            <p className="text-gray-400 text-sm">Bezpłatna konsultacja • 30 minut online • Zero zobowiązań</p>
          </div>
        </div>
        <div ref={fadeInTrust.ref} className={`container mx-auto mt-12 md:mt-16 lg:mt-20 text-center px-4 ${fadeInTrust.className}`}>
          <p className="text-gray-500 uppercase tracking-widest text-xs md:text-sm mb-4 md:mb-6">Strony dla freelancerów z branż</p>
          <div className="overflow-hidden">
            <div className="flex animate-scroll space-x-6 md:space-x-8 lg:space-x-12">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex space-x-4 md:space-x-6 lg:space-x-8 xl:space-x-12 flex-shrink-0">
                  <span className="text-gray-300 text-xs sm:text-sm md:text-base whitespace-nowrap">Designerzy</span>
                  <span className="text-[#fee715] text-sm md:text-lg lg:text-xl">&bull;</span>
                  <span className="text-gray-300 text-xs sm:text-sm md:text-base whitespace-nowrap">Programiści</span>
                  <span className="text-[#fee715] text-sm md:text-lg lg:text-xl">&bull;</span>
                  <span className="text-gray-300 text-xs sm:text-sm md:text-base whitespace-nowrap">Marketing</span>
                  <span className="text-[#fee715] text-sm md:text-lg lg:text-xl">&bull;</span>
                  <span className="text-gray-300 text-xs sm:text-sm md:text-base whitespace-nowrap">Konsultanci</span>
                  <span className="text-[#fee715] text-sm md:text-lg lg:text-xl">&bull;</span>
                  <span className="text-gray-300 text-xs sm:text-sm md:text-base whitespace-nowrap">Copywriterzy</span>
                  <span className="text-[#fee715] text-sm md:text-lg lg:text-xl">&bull;</span>
                  <span className="text-gray-300 text-xs sm:text-sm md:text-base whitespace-nowrap">Fotografowie</span>
                  <span className="text-[#fee715] text-sm md:text-lg lg:text-xl">&bull;</span>
                  <span className="text-gray-300 text-xs sm:text-sm md:text-base whitespace-nowrap">Coachowie</span>
                  <span className="text-[#fee715] text-sm md:text-lg lg:text-xl">&bull;</span>
                  <span className="text-gray-300 text-xs sm:text-sm md:text-base whitespace-nowrap">Trenerzy</span>
                  <span className="text-[#fee715] text-sm md:text-lg lg:text-xl">&bull;</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section id="why" className="py-16 md:py-20 lg:py-28 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-[Montserrat] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 text-white">
              Dlaczego portfolio to za mało?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Większość freelancerów myśli, że portfolio wystarczy. To błąd, który kosztuje ich tysiące złotych miesięcznie.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12">
            <div className="space-y-6 md:space-y-8">
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 md:p-6 hover:bg-red-500/15 transition-all duration-300">
                <div className="flex items-center mb-3 md:mb-4">
                  <div className="text-red-400 text-xl md:text-2xl mr-3">❌</div>
                  <h3 className="text-lg md:text-xl font-bold text-red-300">Portfolio = Pokazujesz prace</h3>
                </div>
                <p className="text-sm md:text-base text-gray-300">To działa tylko dla klientów, którzy już Cię znają. Nowi klienci nie rozumieją, jak Twoja praca rozwiązuje ich problemy.</p>
              </div>
              
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 md:p-6 hover:bg-red-500/15 transition-all duration-300">
                <div className="flex items-center mb-3 md:mb-4">
                  <div className="text-red-400 text-xl md:text-2xl mr-3">❌</div>
                  <h3 className="text-lg md:text-xl font-bold text-red-300">Brak ekspertyzy</h3>
                </div>
                <p className="text-sm md:text-base text-gray-300">Klienci nie widzą, dlaczego mają wybrać właśnie Ciebie. Nie wiedzą, że jesteś ekspertem w swojej dziedzinie.</p>
              </div>

              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 md:p-6 hover:bg-red-500/15 transition-all duration-300">
                <div className="flex items-center mb-3 md:mb-4">
                  <div className="text-red-400 text-xl md:text-2xl mr-3">❌</div>
                  <h3 className="text-lg md:text-xl font-bold text-red-300">Słaba konwersja</h3>
                </div>
                <p className="text-sm md:text-base text-gray-300">Odwiedzający nie wiedzą, co mają zrobić dalej. Brakuje jasnego call-to-action i procesu sprzedaży.</p>
              </div>
            </div>

            <div className="space-y-6 md:space-y-8">
              <div className="bg-gradient-to-br from-[#fee715]/10 to-[#00C9A7]/10 border border-[#fee715]/20 rounded-xl p-4 md:p-6 hover:border-[#fee715]/40 transition-all duration-300">
                <div className="flex items-center mb-3 md:mb-4">
                  <div className="text-[#fee715] text-xl md:text-2xl mr-3">✅</div>
                  <h3 className="text-lg md:text-xl font-bold text-white">Landing Page = Sprzedajesz rozwiązania</h3>
                </div>
                <p className="text-sm md:text-base text-gray-300">Pokazujesz, jak rozwiązujesz problemy klientów. Każdy element ma na celu przekonanie ich do współpracy.</p>
              </div>
              
              <div className="bg-gradient-to-br from-[#fee715]/10 to-[#00C9A7]/10 border border-[#fee715]/20 rounded-xl p-4 md:p-6 hover:border-[#fee715]/40 transition-all duration-300">
                <div className="flex items-center mb-3 md:mb-4">
                  <div className="text-[#fee715] text-xl md:text-2xl mr-3">✅</div>
                  <h3 className="text-lg md:text-xl font-bold text-white">Budujesz ekspertyzę</h3>
                </div>
                <p className="text-sm md:text-base text-gray-300">Pozycjonujesz się jako ekspert. Klienci widzą Twoją wiedzę, doświadczenie i unikalne podejście.</p>
              </div>

              <div className="bg-gradient-to-br from-[#fee715]/10 to-[#00C9A7]/10 border border-[#fee715]/20 rounded-xl p-4 md:p-6 hover:border-[#fee715]/40 transition-all duration-300">
                <div className="flex items-center mb-3 md:mb-4">
                  <div className="text-[#fee715] text-xl md:text-2xl mr-3">✅</div>
                  <h3 className="text-lg md:text-xl font-bold text-white">Wysoka konwersja</h3>
                </div>
                <p className="text-sm md:text-base text-gray-300">Każdy odwiedzający wie, co ma zrobić. Jasny proces sprzedaży prowadzi do więcej zapytań i wyższych cen.</p>
              </div>
            </div>
          </div>

          {/* Mobile Optimization Section */}
          <div className="bg-gradient-to-r from-[#fee715]/10 to-[#00C9A7]/10 border border-[#fee715]/20 rounded-2xl p-6 md:p-8 lg:p-12 mb-8 md:mb-12">
            <div className="text-center mb-6 md:mb-8">
              <div className="text-[#fee715] text-4xl md:text-5xl mb-4">📱</div>
              <h3 className="font-[Montserrat] text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-white">
                Perfekcyjna optymalizacja mobilna
              </h3>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                <span className="text-[#fee715] font-bold">65% wszystkich odwiedzin</span> pochodzi z urządzeń mobilnych. 
                Większość freelancerów o tym zapomina.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-4">
                <h4 className="text-lg md:text-xl font-bold text-red-300 mb-3">❌ Typowe problemy:</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-red-400 mr-3 mt-1">•</span>
                    <p className="text-gray-300 text-sm md:text-base">Strona nie działa na telefonie</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-red-400 mr-3 mt-1">•</span>
                    <p className="text-gray-300 text-sm md:text-base">Tekst za mały do czytania</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-red-400 mr-3 mt-1">•</span>
                    <p className="text-gray-300 text-sm md:text-base">Przyciski za małe do kliknięcia</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-red-400 mr-3 mt-1">•</span>
                    <p className="text-gray-300 text-sm md:text-base">Wolne ładowanie na telefonie</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg md:text-xl font-bold text-[#fee715] mb-3">✅ Co otrzymujesz:</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-[#fee715] mr-3 mt-1">•</span>
                    <p className="text-gray-300 text-sm md:text-base">Strona wygląda świetnie na każdym urządzeniu</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-[#fee715] mr-3 mt-1">•</span>
                    <p className="text-gray-300 text-sm md:text-base">Czytelny tekst i intuicyjna nawigacja</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-[#fee715] mr-3 mt-1">•</span>
                    <p className="text-gray-300 text-sm md:text-base">Przyciski dostosowane do dotyku</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-[#fee715] mr-3 mt-1">•</span>
                    <p className="text-gray-300 text-sm md:text-base">Błyskawiczne ładowanie na telefonie</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 md:mt-8 p-4 md:p-6 bg-gradient-to-r from-[#fee715]/20 to-[#00C9A7]/20 rounded-xl">
              <p className="text-center text-white font-bold text-base md:text-lg">
                "Nikt nie uważa Cię za profesjonalistę, jeśli Twoja strona wygląda źle na telefonie"
              </p>
            </div>
          </div>

          {/* Real Examples */}
          <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-2xl p-6 md:p-8 lg:p-12">
            <h3 className="font-[Montserrat] text-xl sm:text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center text-white">
              Przykłady tego, co otrzymujesz:
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="text-center">
                <div className="bg-[#fee715] text-[#101820] text-2xl md:text-3xl font-bold w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">1</div>
                <h4 className="text-base md:text-lg font-bold mb-2 md:mb-3 text-white">Hero Section</h4>
                <p className="text-gray-300 text-xs md:text-sm">Nie "Oto moje prace", ale "Rozwiązuję Twój problem X w sposób Y, który daje rezultat Z"</p>
              </div>
              <div className="text-center">
                <div className="bg-[#fee715] text-[#101820] text-2xl md:text-3xl font-bold w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">2</div>
                <h4 className="text-base md:text-lg font-bold mb-2 md:mb-3 text-white">Proces Pracy</h4>
                <p className="text-gray-300 text-xs md:text-sm">Pokazujesz, jak pracujesz, co klient otrzyma i dlaczego to jest lepsze niż u konkurencji</p>
              </div>
              <div className="text-center sm:col-span-2 lg:col-span-1">
                <div className="bg-[#fee715] text-[#101820] text-2xl md:text-3xl font-bold w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">3</div>
                <h4 className="text-base md:text-lg font-bold mb-2 md:mb-3 text-white">Social Proof</h4>
                <p className="text-gray-300 text-xs md:text-sm">Opinie klientów, case studies, liczby - wszystko co buduje zaufanie i ekspertyzę</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-16 md:py-20 lg:py-28 px-4 md:px-6 bg-gradient-to-b from-transparent to-white/5">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-[Montserrat] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 text-center text-white">
            Jak to działa?
          </h2>
          <div className="space-y-6 md:space-y-8">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 group">
              <div className="bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-bold text-xl md:text-2xl w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">1</div>
              <div className="text-center md:text-left">
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-3 text-white">Analiza Twojej branży</h3>
                <p className="text-gray-300 text-sm md:text-base lg:text-lg">Rozmawiamy o Twoich klientach, konkurencji i tym, co Cię wyróżnia. To podstawa do stworzenia skutecznej strony.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 group">
              <div className="bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-bold text-xl md:text-2xl w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">2</div>
              <div className="text-center md:text-left">
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-3 text-white">Strategia i projekt</h3>
                <p className="text-gray-300 text-sm md:text-base lg:text-lg">Tworzę strategię komunikacji i projekt strony, który będzie konwertował. Wszystko oparte na wiedzy marketingowej.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 group">
              <div className="bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-bold text-xl md:text-2xl w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">3</div>
              <div className="text-center md:text-left">
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-3 text-white">Implementacja</h3>
                <p className="text-gray-300 text-sm md:text-base lg:text-lg">Buduję stronę z dbałością o każdy szczegół. Optymalizacja pod kątem szybkości i konwersji.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 group">
              <div className="bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-bold text-xl md:text-2xl w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">4</div>
              <div className="text-center md:text-left">
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-3 text-white">Uruchomienie i wsparcie</h3>
                <p className="text-gray-300 text-sm md:text-base lg:text-lg">Strona idzie na żywo, a Ty otrzymujesz instrukcje jak ją aktualizować i rozwijać.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section id="pricing" className="py-16 md:py-20 lg:py-28 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-[Montserrat] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 text-center text-white">
            Dlaczego to jest lepsze niż agencja?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12">
            {/* Traditional Agency */}
            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-red-300">Typowa Agencja</h3>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center">
                  <span className="text-red-400 mr-3">❌</span>
                  <span className="text-gray-300 text-sm md:text-base">Koszt: 3000+ PLN</span>
                </div>
                <div className="flex items-center">
                  <span className="text-red-400 mr-3">❌</span>
                  <span className="text-gray-300 text-sm md:text-base">Szablon + logo</span>
                </div>
                <div className="flex items-center">
                  <span className="text-red-400 mr-3">❌</span>
                  <span className="text-gray-300 text-sm md:text-base">Brak wiedzy marketingowej</span>
                </div>
                <div className="flex items-center">
                  <span className="text-red-400 mr-3">❌</span>
                  <span className="text-gray-300 text-sm md:text-base">Nie można zweryfikować jakości</span>
                </div>
                <div className="flex items-center">
                  <span className="text-red-400 mr-3">❌</span>
                  <span className="text-gray-300 text-sm md:text-base">Strona jak tysiące innych</span>
                </div>
                <div className="flex items-center">
                  <span className="text-red-400 mr-3">❌</span>
                  <span className="text-gray-300 text-sm md:text-base">+ Koszt copywritera (1000+ PLN)</span>
                </div>
                <div className="flex items-center">
                  <span className="text-red-400 mr-3">❌</span>
                  <span className="text-gray-300 text-sm md:text-base">Słaba optymalizacja mobilna</span>
                </div>
              </div>
              <div className="mt-4 md:mt-6 p-3 md:p-4 bg-red-500/10 rounded-lg">
                <p className="text-red-300 font-bold text-base md:text-lg">RAZEM: 4000+ PLN</p>
                <p className="text-red-400 text-xs md:text-sm">Za szablon bez gwarancji konwersji</p>
              </div>
            </div>

            {/* My Service */}
            <div className="bg-gradient-to-br from-[#fee715]/10 to-[#00C9A7]/10 border border-[#fee715]/30 rounded-2xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-bold shadow-lg">
                🏆 OFERTA PREMIUM
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-white">Moja Usługa</h3>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center">
                  <span className="text-[#fee715] mr-3">✅</span>
                  <span className="text-gray-300 text-sm md:text-base">Koszt: 1500-2500 PLN</span>
                </div>
                <div className="flex items-center">
                  <span className="text-[#fee715] mr-3">✅</span>
                  <span className="text-gray-300 text-sm md:text-base">Unikalny design</span>
                </div>
                <div className="flex items-center">
                  <span className="text-[#fee715] mr-3">✅</span>
                  <span className="text-gray-300 text-sm md:text-base">Wiedza marketingowa</span>
                </div>
                <div className="flex items-center">
                  <span className="text-[#fee715] mr-3">✅</span>
                  <span className="text-gray-300 text-sm md:text-base">Optymalizacja pod konwersję</span>
                </div>
                <div className="flex items-center">
                  <span className="text-[#fee715] mr-3">✅</span>
                  <span className="text-gray-300 text-sm md:text-base">Strona jak żadna inna</span>
                </div>
                <div className="flex items-center">
                  <span className="text-[#fee715] mr-3">✅</span>
                  <span className="text-gray-300 text-sm md:text-base">Copywriting w cenie</span>
                </div>
                <div className="flex items-center">
                  <span className="text-[#fee715] mr-3">✅</span>
                  <span className="text-gray-300 text-sm md:text-base">Perfekcyjna optymalizacja mobilna</span>
                </div>
              </div>
              <div className="mt-4 md:mt-6 p-3 md:p-4 bg-gradient-to-r from-[#fee715]/20 to-[#00C9A7]/20 rounded-lg">
                <p className="text-white font-bold text-base md:text-lg">RAZEM: 1500-2500 PLN</p>
                <p className="text-[#fee715] text-xs md:text-sm">Za maszynę do sprzedaży</p>
              </div>
            </div>
          </div>

          {/* Why I Can Offer This */}
          <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-2xl p-6 md:p-8 lg:p-12 text-center">
            <h3 className="font-[Montserrat] text-xl sm:text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-white">
              Dlaczego mogę to zaoferować?
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div>
                <div className="text-[#fee715] text-3xl md:text-4xl mb-3 md:mb-4">👤</div>
                <h4 className="text-base md:text-lg font-bold mb-2 md:mb-3 text-white">Pracuję sam</h4>
                <p className="text-gray-300 text-xs md:text-sm">Nie mam zespołu, biura, kosztów operacyjnych. Cały budżet idzie na jakość.</p>
              </div>
              <div>
                <div className="text-[#fee715] text-3xl md:text-4xl mb-3 md:mb-4">🏢</div>
                <h4 className="text-base md:text-lg font-bold mb-2 md:mb-3 text-white">Doświadczenie z korporacjami</h4>
                <p className="text-gray-300 text-xs md:text-sm">Pracowałem z firmami wartymi miliony. Znam, co działa w marketingu.</p>
              </div>
              <div className="sm:col-span-2 lg:col-span-1">
                <div className="text-[#fee715] text-3xl md:text-4xl mb-3 md:mb-4">⚡</div>
                <h4 className="text-base md:text-lg font-bold mb-2 md:mb-3 text-white">Szybkość działania</h4>
                <p className="text-gray-300 text-xs md:text-sm">Bez biurokracji, bez długich procesów. Szybko, sprawnie, skutecznie.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-16 md:py-20 lg:py-28 px-4 md:px-6 bg-gradient-to-b from-white/5 to-transparent">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-[Montserrat] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 text-white">
            Gotowy na zmianę?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto">
            Umówmy się na bezpłatną konsultację. Porozmawiamy o Twoich potrzebach i pokażę Ci, jak może wyglądać Twoja nowa strona.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto">
            <a 
              href="mailto:stanislaw@drozniak.com?subject=Konsultacja - Strona dla freelancera&body=Cześć! Chciałbym/chciałabym umówić się na konsultację dotyczącą nowej strony internetowej."
              className="bg-[#fee715] text-[#101820] font-bold py-3 md:py-4 px-6 md:px-8 rounded-lg text-base md:text-lg lg:text-xl hover:bg-gradient-to-r hover:from-[#fee715] hover:to-[#00C9A7] hover:shadow-2xl hover:shadow-[#fee715]/30 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
            >
              📧 Wyślij email
            </a>
            <a 
              href="tel:+48123456789"
              className="bg-gradient-to-r from-[#00C9A7] to-[#fee715] text-[#101820] font-bold py-3 md:py-4 px-6 md:px-8 rounded-lg text-base md:text-lg lg:text-xl hover:shadow-2xl hover:shadow-[#00C9A7]/30 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
            >
              📞 Zadzwoń teraz
            </a>
          </div>
          
          <p className="text-gray-400 text-xs md:text-sm mt-4 md:mt-6">30 minut online • Zero zobowiązań • Odpowiem w ciągu 24h</p>
        </div>
      </section>
    </div>
  );
};