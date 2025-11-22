import React from 'react';
import { useFadeIn } from '../hooks/useFadeIn';

const CheckIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const XIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 9L9 15M9 9L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TargetAudienceItem: React.FC<{ 
  text: string; 
  isPositive: boolean; 
  children: React.ReactNode;
}> = ({ text, isPositive, children }) => {
  const fadeInItem = useFadeIn<HTMLDivElement>();
  
  return (
    <div ref={fadeInItem.ref} className={`group relative bg-white/5 backdrop-blur-md border border-white/10 p-4 md:p-6 rounded-lg shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl ${fadeInItem.className} ${
      isPositive 
        ? 'hover:border-[#00C9A7]/50 hover:bg-gradient-to-r hover:from-[#00C9A7]/5 hover:to-transparent' 
        : 'hover:border-red-500/50 hover:bg-gradient-to-r hover:from-red-500/5 hover:to-transparent'
    }`}>
      {/* Gradient outline on hover */}
      <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
        isPositive 
          ? 'bg-gradient-to-r from-[#00C9A7]/20 to-transparent' 
          : 'bg-gradient-to-r from-red-500/20 to-transparent'
      }`}></div>
      
      {/* Content */}
      <div className="relative z-10 flex items-start space-x-3">
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
          isPositive 
            ? 'bg-[#00C9A7] text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {isPositive ? <CheckIcon className="w-4 h-4" /> : <XIcon className="w-4 h-4" />}
        </div>
        <p className="text-gray-300 text-sm md:text-base leading-relaxed flex-grow">{text}</p>
      </div>
    </div>
  );
};

export const TargetAudience: React.FC = () => {
  const fadeInHeader = useFadeIn<HTMLDivElement>();
  
  return (
    <section className="py-16 md:py-20 px-4 md:px-6 bg-gradient-to-b from-[#18232F] to-[#101820]">
      <div className="container mx-auto max-w-6xl">
        <div ref={fadeInHeader.ref} className={`text-center mb-12 md:mb-16 px-2 ${fadeInHeader.className}`}>
          <h2 className="font-[Montserrat] text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
            <span className="text-[#fee715]">Czy to dla Ciebie</span>
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
            Sprawdź, czy moje rozwiązanie pasuje do Twojej sytuacji biznesowej
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Pozytywna kolumna */}
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#00C9A7]/10 to-transparent border border-[#00C9A7]/20 rounded-full px-6 py-3">
                <CheckIcon className="w-6 h-6 text-[#00C9A7]" />
                <h3 className="font-[Montserrat] text-xl font-bold text-[#00C9A7]">Tak, jeśli:</h3>
              </div>
            </div>
            
            <div className="space-y-4">
              <TargetAudienceItem isPositive={true} text="Masz już klientów lub zlecenia, ale nie masz stałego sposobu na zdobywanie nowych.">
                <CheckIcon />
              </TargetAudienceItem>
              
              <TargetAudienceItem isPositive={true} text="Utknąłeś w okolicach 8 000 – 20 000 zł miesięcznie i chcesz przejść wyżej.">
                <CheckIcon />
              </TargetAudienceItem>
              
              <TargetAudienceItem isPositive={true} text="Oferujesz dobre usługi (klienci Cię chwalą), ale trudno Ci zdobywać nowych klientów online.">
                <CheckIcon />
              </TargetAudienceItem>
              
              <TargetAudienceItem isPositive={true} text="Próbowałeś reklam lub działań w internecie, ale kończyło się to stratą pieniędzy.">
                <CheckIcon />
              </TargetAudienceItem>
              
              <TargetAudienceItem isPositive={true} text="Chcesz mieć system, który działa dla Ciebie – strona, oferta, email, proces sprzedaży – zamiast ciągle samemu szukać zleceń.">
                <CheckIcon />
              </TargetAudienceItem>
            </div>
          </div>

          {/* Negatywna kolumna */}
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-red-500/10 to-transparent border border-red-500/20 rounded-full px-6 py-3">
                <XIcon className="w-6 h-6 text-red-500" />
                <h3 className="font-[Montserrat] text-xl font-bold text-red-500">Nie, jeśli:</h3>
              </div>
            </div>
            
            <div className="space-y-4">
              <TargetAudienceItem isPositive={false} text="Twój biznes dopiero startuje i nie masz jeszcze klientów ani sprawdzonej oferty. Najpierw warto zdobyć pierwsze zlecenia i upewnić się, że Twoja usługa naprawdę działa.">
                <XIcon />
              </TargetAudienceItem>
              
              <TargetAudienceItem isPositive={false} text="Twój biznes generuje już ponad 1 mln zł przychodu rocznie. Na tym poziomie największe efekty daje optymalizacja procesów w dużej skali — to nie jest moja specjalizacja.">
                <XIcon />
              </TargetAudienceItem>
              
              <TargetAudienceItem isPositive={false} text="Jeśli inwestycja rzędu kilkuset złotych to dla Ciebie zaporowa kwota, to moje rozwiązanie może nie być jeszcze najlepszą opcją. W takiej sytuacji lepiej na początek zdobywać klientów samodzielnie.">
                <XIcon />
              </TargetAudienceItem>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-12 md:mt-16">
          <div className="bg-gradient-to-r from-[#fee715]/10 to-[#00C9A7]/10 border border-[#fee715]/20 rounded-xl p-6 md:p-8 max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-gray-200 font-medium mb-4">
              Jeśli rozpoznajesz się w pierwszej kolumnie, to prawdopodobnie mogę Ci pomóc
            </p>
            <a 
              href="https://calendly.com/drozniakstanislaw/spotkanie"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-bold py-3 md:py-4 px-6 md:px-8 rounded-lg text-lg md:text-xl hover:shadow-2xl hover:shadow-[#fee715]/40 transform hover:-translate-y-1 transition-all duration-300 inline-block"
            >
              Umów darmową rozmowę
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
