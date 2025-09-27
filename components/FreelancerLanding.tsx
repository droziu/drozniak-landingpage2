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
      <section className="min-h-screen flex flex-col justify-center text-center py-12 md:py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <h1 ref={fadeInH1.ref} className={`font-[Montserrat] text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 md:mb-6 leading-tight md:leading-relaxed ${fadeInH1.className}`}>
            Twój freelancing zasługuje na
          </h1>
          <div ref={fadeInYellow.ref} className={`mb-4 md:mb-6 ${fadeInYellow.className}`}>
            <span className="bg-gradient-to-r from-[#fee715] to-[#00C9A7] hover:from-[#00C9A7] hover:to-[#fee715] bg-clip-text text-transparent font-[Montserrat] text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight md:leading-relaxed transition-all duration-500 cursor-pointer">profesjonalną stronę.</span>
          </div>
          <div ref={fadeInSub.ref} className={`text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 md:mb-10 px-2 leading-relaxed ${fadeInSub.className}`}>
            <p className="mb-6 text-gray-200 font-medium">Jako były video-editor freelancer i obecny specjalista marketingu, łączę wiedzę z obu światów, aby stworzyć strony, które nie tylko wyglądają świetnie, ale przede wszystkim <span style={{color: '#fee715'}}>konwertują i budują Twoją ekspertyzę.</span></p>
            <p>Bez szablonów. Bez ograniczeń. Tylko unikalne rozwiązania, które wyróżnią Cię na rynku.</p>
          </div>
          <div ref={fadeInCTA.ref} className={`flex flex-col items-center space-y-3 px-4 ${fadeInCTA.className}`}>
            <a 
              href="#cta" 
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#cta')?.scrollIntoView({
                  behavior: 'smooth'
                });
              }}
              className="bg-[#fee715] text-[#101820] font-bold py-3 md:py-4 px-6 md:px-10 rounded-lg text-lg md:text-xl hover:bg-gradient-to-r hover:from-[#fee715] hover:to-[#00C9A7] hover:shadow-2xl hover:shadow-[#fee715]/30 transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
            >
              Chcę zobaczyć przykłady
            </a>
            <p className="text-gray-400 text-sm">Bezpłatna konsultacja • 30 minut online • Zero zobowiązań</p>
          </div>
        </div>
        <div ref={fadeInTrust.ref} className={`container mx-auto mt-12 md:mt-16 text-center px-4 ${fadeInTrust.className}`}>
          <p className="text-gray-500 uppercase tracking-widest text-xs md:text-sm mb-6">Strony dla freelancerów z branż</p>
          <div className="overflow-hidden">
            <div className="flex animate-scroll space-x-8 md:space-x-12">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex space-x-8 md:space-x-12 flex-shrink-0">
                  <span className="text-gray-300 text-sm md:text-base whitespace-nowrap">Designerzy</span>
                  <span className="text-[#fee715] text-lg md:text-xl">&bull;</span>
                  <span className="text-gray-300 text-sm md:text-base whitespace-nowrap">Programiści</span>
                  <span className="text-[#fee715] text-lg md:text-xl">&bull;</span>
                  <span className="text-gray-300 text-sm md:text-base whitespace-nowrap">Marketing</span>
                  <span className="text-[#fee715] text-lg md:text-xl">&bull;</span>
                  <span className="text-gray-300 text-sm md:text-base whitespace-nowrap">Konsultanci</span>
                  <span className="text-[#fee715] text-lg md:text-xl">&bull;</span>
                  <span className="text-gray-300 text-sm md:text-base whitespace-nowrap">Copywriterzy</span>
                  <span className="text-[#fee715] text-lg md:text-xl">&bull;</span>
                  <span className="text-gray-300 text-sm md:text-base whitespace-nowrap">Fotografowie</span>
                  <span className="text-[#fee715] text-lg md:text-xl">&bull;</span>
                  <span className="text-gray-300 text-sm md:text-base whitespace-nowrap">Coachowie</span>
                  <span className="text-[#fee715] text-lg md:text-xl">&bull;</span>
                  <span className="text-gray-300 text-sm md:text-base whitespace-nowrap">Trenerzy</span>
                  <span className="text-[#fee715] text-lg md:text-xl">&bull;</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-[Montserrat] text-3xl md:text-5xl font-bold mb-8 text-white">
            Czy Twoja obecna strona...
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="text-red-400 text-4xl mb-4">❌</div>
              <h3 className="text-xl font-bold mb-3 text-gray-200">Wygląda jak szablon?</h3>
              <p className="text-gray-400">Klienci widzą, że używasz gotowych rozwiązań. Brakuje unikalności i profesjonalizmu.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="text-red-400 text-4xl mb-4">❌</div>
              <h3 className="text-xl font-bold mb-3 text-gray-200">Nie konwertuje?</h3>
              <p className="text-gray-400">Odwiedzający nie rozumieją, co dokładnie robisz i dlaczego mają wybrać właśnie Ciebie.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="text-red-400 text-4xl mb-4">❌</div>
              <h3 className="text-xl font-bold mb-3 text-gray-200">Nie buduje ekspertyzy?</h3>
              <p className="text-gray-400">Brakuje jasnego przekazu o Twoich umiejętnościach i doświadczeniu.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="text-red-400 text-4xl mb-4">❌</div>
              <h3 className="text-xl font-bold mb-3 text-gray-200">Jest wolna?</h3>
              <p className="text-gray-400">Długie czasy ładowania zniechęcają potencjalnych klientów do dalszego przeglądania.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-transparent to-white/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-[Montserrat] text-3xl md:text-5xl font-bold mb-8 text-white">
            Co otrzymujesz:
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-[#fee715]/10 to-[#00C9A7]/10 border border-[#fee715]/20 rounded-xl p-6 hover:border-[#fee715]/40 transition-all duration-300">
              <div className="text-[#fee715] text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3 text-white">Błyskawiczna strona</h3>
              <p className="text-gray-300">Optymalizacja pod kątem szybkości ładowania. Twoi klienci nie będą czekać.</p>
            </div>
            <div className="bg-gradient-to-br from-[#fee715]/10 to-[#00C9A7]/10 border border-[#fee715]/20 rounded-xl p-6 hover:border-[#fee715]/40 transition-all duration-300">
              <div className="text-[#fee715] text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold mb-3 text-white">Unikalny design</h3>
              <p className="text-gray-300">Bez szablonów. Każdy element zaprojektowany specjalnie dla Twojej branży i osobowości.</p>
            </div>
            <div className="bg-gradient-to-br from-[#fee715]/10 to-[#00C9A7]/10 border border-[#fee715]/20 rounded-xl p-6 hover:border-[#fee715]/40 transition-all duration-300">
              <div className="text-[#fee715] text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold mb-3 text-white">Konwersja w DNA</h3>
              <p className="text-gray-300">Każdy element strony ma na celu przekonanie odwiedzającego do skontaktowania się z Tobą.</p>
            </div>
            <div className="bg-gradient-to-br from-[#fee715]/10 to-[#00C9A7]/10 border border-[#fee715]/20 rounded-xl p-6 hover:border-[#fee715]/40 transition-all duration-300">
              <div className="text-[#fee715] text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-3 text-white">Budowanie ekspertyzy</h3>
              <p className="text-gray-300">Strona, która pozycjonuje Cię jako eksperta w swojej dziedzinie.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-16 md:py-24 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-[Montserrat] text-3xl md:text-5xl font-bold mb-12 text-center text-white">
            Jak to działa?
          </h2>
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="bg-[#fee715] text-[#101820] font-bold text-2xl w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">1</div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-3 text-white">Analiza Twojej branży</h3>
                <p className="text-gray-300 text-lg">Rozmawiamy o Twoich klientach, konkurencji i tym, co Cię wyróżnia. To podstawa do stworzenia skutecznej strony.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="bg-[#fee715] text-[#101820] font-bold text-2xl w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">2</div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-3 text-white">Strategia i projekt</h3>
                <p className="text-gray-300 text-lg">Tworzę strategię komunikacji i projekt strony, który będzie konwertował. Wszystko oparte na wiedzy marketingowej.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="bg-[#fee715] text-[#101820] font-bold text-2xl w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">3</div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-3 text-white">Implementacja</h3>
                <p className="text-gray-300 text-lg">Buduję stronę z dbałością o każdy szczegół. Optymalizacja pod kątem szybkości i konwersji.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="bg-[#fee715] text-[#101820] font-bold text-2xl w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">4</div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-3 text-white">Uruchomienie i wsparcie</h3>
                <p className="text-gray-300 text-lg">Strona idzie na żywo, a Ty otrzymujesz instrukcje jak ją aktualizować i rozwijać.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-white/5 to-transparent">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-[Montserrat] text-3xl md:text-5xl font-bold mb-8 text-white">
            Gotowy na zmianę?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Umówmy się na bezpłatną konsultację. Porozmawiamy o Twoich potrzebach i pokażę Ci, jak może wyglądać Twoja nowa strona.
          </p>
          <div className="flex flex-col items-center space-y-4">
            <a 
              href="mailto:stanislaw@drozniak.com?subject=Konsultacja - Strona dla freelancera&body=Cześć! Chciałbym/chciałabym umówić się na konsultację dotyczącą nowej strony internetowej."
              className="bg-[#fee715] text-[#101820] font-bold py-4 px-8 rounded-lg text-xl hover:bg-gradient-to-r hover:from-[#fee715] hover:to-[#00C9A7] hover:shadow-2xl hover:shadow-[#fee715]/30 transform hover:-translate-y-1 transition-all duration-300"
            >
              Umów bezpłatną konsultację
            </a>
            <p className="text-gray-400 text-sm">30 minut online • Zero zobowiązań • Odpowiem w ciągu 24h</p>
          </div>
        </div>
      </section>
    </div>
  );
};
