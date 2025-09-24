
import React from 'react';
import { useFadeIn } from '../hooks/useFadeIn';

export const Hero: React.FC = () => {
    const fadeInH1 = useFadeIn<HTMLHeadingElement>();
    const fadeInSub = useFadeIn<HTMLParagraphElement>();
    const fadeInCTA = useFadeIn<HTMLDivElement>();
    const fadeInTrust = useFadeIn<HTMLDivElement>();

  return (
    <section className="min-h-screen flex flex-col justify-center text-center py-12 md:py-20 px-4 md:px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 ref={fadeInH1.ref} className={`font-[Montserrat] text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight ${fadeInH1.className}`}>
          Masz klientów tylko z polecenia lub przypadku? <br/><span style={{color: '#fee715'}}>Brakuje Ci systemu.</span>
        </h1>
        <div ref={fadeInSub.ref} className={`text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 md:mb-10 px-2 ${fadeInSub.className}`}>
          <p className="mb-6 text-gray-200 font-medium">Proponuję Ci jednorazową inwestycję: analiza, strategia i wdrożenie narzędzia opartego na AI – specjalnie dla małych firm i freelancerów.</p>
          <p>Zamiast płacić co miesiąc agencji za raporty i wykresy – dostajesz <span style={{color: '#fee715'}}>system, który działa 24/7</span> i faktycznie zdobywa klientów.</p>
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
                Chcę poznać szczegóły
            </a>
            <p className="text-gray-400 text-sm">Dla małych firm i freelancerów • 20 minut online • zero zobowiązań</p>
        </div>
      </div>
      <div ref={fadeInTrust.ref} className={`container mx-auto mt-12 md:mt-16 text-center px-4 ${fadeInTrust.className}`}>
        <p className="text-gray-500 uppercase tracking-widest text-xs md:text-sm mb-4">Zaufali nam / Certyfikaty</p>
        <div className="flex flex-wrap justify-center items-center gap-x-3 md:gap-x-6 gap-y-2 text-gray-300 text-sm md:text-base">
          <span>Chess.com</span>
          <span className="text-[#fee715] text-lg md:text-xl">&bull;</span>
          <span>Wagento</span>
          <span className="text-[#fee715] text-lg md:text-xl">&bull;</span>
          <span>eWay Corp</span>
          <span className="text-[#fee715] text-lg md:text-xl">&bull;</span>
          <span>BigCommerce</span>
          <span className="text-[#fee715] text-lg md:text-xl">&bull;</span>
          <span>Meta</span>
           <span className="text-[#fee715] text-lg md:text-xl">&bull;</span>
          <span>University of California</span>
        </div>
      </div>
    </section>
  );
};
