
import React from 'react';
import { useFadeIn } from '../hooks/useFadeIn';

const PricingScenario: React.FC<{ 
  number: number; 
  title: string; 
  price: string; 
  description: React.ReactNode;
}> = ({ number, title, price, description }) => {
  const fadeInItem = useFadeIn<HTMLDivElement>();
  return (
    <div ref={fadeInItem.ref} className={`group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 md:p-8 shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:border-[#fee715]/50 ${fadeInItem.className}`}>
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#fee715]/5 via-transparent to-[#00C9A7]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Subtle gradient border effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#fee715]/20 via-[#00C9A7]/20 to-[#fee715]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="mb-6">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-[#fee715] to-[#00C9A7] mb-5 mx-auto shadow-lg shadow-[#fee715]/30 group-hover:shadow-[#fee715]/50 group-hover:scale-110 transition-all duration-300">
            <span className="font-[Montserrat] font-bold text-[#101820] text-xl">{number}</span>
          </div>
          <h3 className="font-[Montserrat] text-xl md:text-2xl font-bold text-white text-center mb-5">{title}</h3>
        </div>
        
        <div className="mb-6 pb-6 border-b border-white/10 group-hover:border-[#fee715]/30 transition-colors duration-300">
          <p className="font-[Montserrat] text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-[#fee715] to-[#00C9A7] bg-clip-text text-transparent text-center leading-tight">{price}</p>
        </div>
        
        <p className="text-gray-300 text-sm md:text-base leading-relaxed text-center">{description}</p>
      </div>
    </div>
  );
};

export const Pricing: React.FC = () => {
    const fadeInSection = useFadeIn<HTMLDivElement>();
  return (
    <section id="cena" className="py-16 md:py-20 px-4 md:px-6 bg-gradient-to-b from-[#18232F] to-[#101820] relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="pricing-grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#pricing-grid)" className="text-white"/>
        </svg>
      </div>
      
      <div ref={fadeInSection.ref} className={`container mx-auto max-w-6xl px-2 relative z-10 ${fadeInSection.className}`}>
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block">
            <h2 className="font-[Montserrat] text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2 pb-1 leading-tight bg-gradient-to-r from-[#fee715] via-white to-[#00C9A7] bg-clip-text text-transparent">
              Ile to kosztuje?
            </h2>
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-[#fee715] to-[#00C9A7] rounded-full mt-4"></div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          <PricingScenario
            number={1}
            title="Pojedyncze narzędzie"
            price="od ok. 1 500 zł netto"
            description={
              <>
                Wybieramy 1 kluczowy element z <a href="#rozwiazanie" className="text-[#fee715] hover:text-[#ffd600] underline transition-colors">listy</a> (np. interaktywne narzędzie albo blueprint lejka) i robimy go od A do Z.
              </>
            }
          />
          
          <PricingScenario
            number={2}
            title="System dla małej firmy"
            price="3 000–6 000 zł netto"
            description={
              <>
                Najczęściej obejmuje 2–4 elementy z <a href="#rozwiazanie" className="text-[#fee715] hover:text-[#ffd600] underline transition-colors">listy</a> (np. audyt + narzędzie + prosty landing). Dokładny zakres dobieramy po rozmowie.
              </>
            }
          />
          
          <PricingScenario
            number={3}
            title="System szyty na miarę"
            price="wycena indywidualna"
            description={
              <>
                Pełny system obejmuje wszystkie obszary z <a href="#rozwiazanie" className="text-[#fee715] hover:text-[#ffd600] underline transition-colors">listy</a> + dodatkowe integracje i automatyzacje.
              </>
            }
          />
        </div>
      </div>
    </section>
  );
};
