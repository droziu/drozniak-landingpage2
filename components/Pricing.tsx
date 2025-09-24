
import React from 'react';
import { useFadeIn } from '../hooks/useFadeIn';

export const Pricing: React.FC = () => {
    const fadeInSection = useFadeIn<HTMLDivElement>();
  return (
    <section id="cena" className="py-16 md:py-20 px-4 md:px-6 bg-gradient-to-b from-[#18232F] to-[#101820]">
      <div ref={fadeInSection.ref} className={`container mx-auto max-w-3xl text-center px-2 ${fadeInSection.className}`}>
        <h2 className="font-[Montserrat] text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">Transparentna inwestycja</h2>
        <p className="text-base md:text-lg text-gray-400 mb-6 md:mb-8">Lubię znać cenę od początku – dlatego sam jej nie ukrywam.</p>
        
        <div className="bg-[#101820] border-2 border-[#fee715] rounded-xl p-6 md:p-10 inline-block shadow-2xl shadow-[#fee715]/10 max-w-full group hover:shadow-[#fee715]/30 hover:scale-105 transition-all duration-500 cursor-pointer">
            <p className="text-gray-300 text-base md:text-lg">Jednorazowa inwestycja netto:</p>
            <p className="font-[Montserrat] text-4xl md:text-5xl lg:text-7xl font-extrabold text-[#fee715] my-4">1 - 4 tys. zł</p>
            <p className="text-gray-400 max-w-md mx-auto text-sm md:text-base leading-relaxed">
                Zakres zależy od Twojej sytuacji i budżetu, ale większość projektów mieści się w zakresie 1–4 tys. zł.<br/>
                Po rozmowie dostaniesz konkretną ofertę z wariantami dla Twojego biznesu.
            </p>
        </div>
        
        <div className="mt-8 md:mt-12">
            <a 
                href="#cta" 
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#cta')?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}
                className="bg-white text-[#101820] font-bold py-3 md:py-4 px-6 md:px-10 rounded-lg text-lg md:text-xl hover:bg-gray-200 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#fee715]/40 transition-all duration-300 w-full sm:w-auto inline-block"
            >
                Porozmawiajmy o wycenie dla Ciebie
            </a>
            <p className="text-gray-400 text-sm mt-4 md:mt-6">Bezpłatna, 20-minutowa konsultacja</p>
        </div>
      </div>
    </section>
  );
};
