
import React from 'react';
import { useFadeIn } from '../hooks/useFadeIn';

export const Hero: React.FC = () => {
    const fadeInH1 = useFadeIn<HTMLHeadingElement>();
    const fadeInYellow = useFadeIn<HTMLDivElement>();
    const fadeInSub = useFadeIn<HTMLParagraphElement>();
    const fadeInCTA = useFadeIn<HTMLDivElement>();
    const fadeInTrust = useFadeIn<HTMLDivElement>();

  return (
    <section className="min-h-screen flex flex-col justify-center py-12 md:py-20 px-4 md:px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Two column layout: 60% text, 40% visualization */}
        <div className="grid lg:grid-cols-[55%_45%] gap-8 lg:gap-10 items-start mb-16 md:mb-24">
          {/* Left Column - Text */}
          <div className="text-center lg:text-left">
            <h1 ref={fadeInH1.ref} className={`font-[Montserrat] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 md:mb-7 leading-tight ${fadeInH1.className}`}>
              Masz klientów tylko z polecenia lub przypadku?
            </h1>
            <div ref={fadeInYellow.ref} className={`mb-9 md:mb-11 ${fadeInYellow.className}`}>
              <h2 className="bg-gradient-to-r from-[#fee715] to-[#00C9A7] hover:from-[#00C9A7] hover:to-[#fee715] bg-clip-text text-transparent font-[Montserrat] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight pb-1 transition-all duration-500">
                Brakuje Ci systemu.
              </h2>
            </div>
            <div ref={fadeInSub.ref} className={`text-base sm:text-lg md:text-xl text-gray-300 mb-11 md:mb-14 leading-relaxed ${fadeInSub.className}`}>
              <p className="text-gray-200 font-medium">Proponuję jednorazową inwestycję: analiza, strategia i wdrożenie narzędzia opartego na AI – zaprojektowanego specjalnie dla małych firm i freelancerów.</p>
            </div>
            <div ref={fadeInCTA.ref} className={`flex flex-col items-center lg:items-start space-y-4 ${fadeInCTA.className}`}>
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
                    Chcę poznać szczegóły
                </a>
                <p className="text-gray-400 text-sm">Dla małych firm i freelancerów • 20 minut online • zero zobowiązań</p>
            </div>
          </div>

          {/* Right Column - Visual Funnel */}
          <div className="flex items-start justify-center h-full">
            <div className="relative w-full max-w-xs mx-auto lg:max-w-none">
              {/* Funnel visualization - compact to match left column height */}
              <div className="relative flex flex-col items-center justify-start space-y-4 pt-0">
                {/* Step 1 - Top: Ruch z internetu (widest) */}
                <div className="w-full flex flex-col items-center">
                  <div className="w-28 h-28 bg-gradient-to-br from-[#fee715]/20 to-[#00C9A7]/20 border-2 border-[#fee715]/30 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-lg shadow-[#fee715]/10">
                    <svg className="w-11 h-11 text-[#fee715]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-xs mt-2">Ruch</p>
                </div>

                {/* Funnel connection line 1 */}
                <div className="w-1 h-5 bg-gradient-to-b from-[#fee715]/40 via-[#00C9A7]/40 to-transparent"></div>

                {/* Step 2 - Middle: System/AI (medium width) */}
                <div className="w-7/12 flex flex-col items-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#fee715]/25 to-[#00C9A7]/25 border-2 border-[#00C9A7]/40 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-lg shadow-[#00C9A7]/10">
                    <svg className="w-9 h-9 text-[#00C9A7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-xs mt-2">System</p>
                </div>

                {/* Funnel connection line 2 */}
                <div className="w-1 h-5 bg-gradient-to-b from-[#00C9A7]/40 via-[#fee715]/40 to-transparent"></div>

                {/* Step 3 - Bottom: Klienci/Pieniądze (narrowest, emphasized) */}
                <div className="w-5/12 flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#fee715]/30 to-[#00C9A7]/30 border-2 border-[#fee715] rounded-lg flex items-center justify-center backdrop-blur-sm shadow-xl shadow-[#fee715]/20">
                    <svg className="w-6 h-6 text-[#fee715]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-xs mt-2">Klienci</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust strip - centered */}
        <div ref={fadeInTrust.ref} className={`container mx-auto text-center px-4 ${fadeInTrust.className}`}>
          <p className="text-gray-500 uppercase tracking-widest text-xs md:text-sm mb-6">Pracowałem już z</p>
          <div className="overflow-hidden">
            <div className="flex animate-scroll space-x-8 md:space-x-12">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex space-x-8 md:space-x-12 flex-shrink-0">
                  <span className="text-gray-300 text-sm md:text-base whitespace-nowrap">Chess.com</span>
                  <span className="text-[#fee715] text-lg md:text-xl">&bull;</span>
                  <span className="text-gray-300 text-sm md:text-base whitespace-nowrap">Wagento</span>
                  <span className="text-[#fee715] text-lg md:text-xl">&bull;</span>
                  <span className="text-gray-300 text-sm md:text-base whitespace-nowrap">eWay Corp</span>
                  <span className="text-[#fee715] text-lg md:text-xl">&bull;</span>
                  <span className="text-gray-300 text-sm md:text-base whitespace-nowrap">BigCommerce</span>
                  <span className="text-[#fee715] text-lg md:text-xl">&bull;</span>
                  <span className="text-gray-300 text-sm md:text-base whitespace-nowrap">Tour & Holiday</span>
                  <span className="text-[#fee715] text-lg md:text-xl">&bull;</span>
                  <span className="text-gray-300 text-sm md:text-base whitespace-nowrap">Commerce Hero</span>
                  <span className="text-[#fee715] text-lg md:text-xl">&bull;</span>
                  <span className="text-gray-300 text-sm md:text-base whitespace-nowrap">Grupa Fibra</span>
                  <span className="text-[#fee715] text-lg md:text-xl">&bull;</span>
                  <span className="text-gray-300 text-sm md:text-base whitespace-nowrap">Dietana</span>
                  <span className="text-[#fee715] text-lg md:text-xl">&bull;</span>
                  <span className="text-gray-300 text-sm md:text-base whitespace-nowrap">Redlin</span>
                  <span className="text-[#fee715] text-lg md:text-xl">&bull;</span>
                  <span className="text-gray-300 text-sm md:text-base whitespace-nowrap">Talk Commerce</span>
                  <span className="text-[#fee715] text-lg md:text-xl">&bull;</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
