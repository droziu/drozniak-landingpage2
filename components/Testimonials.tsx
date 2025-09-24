
import React from 'react';
import { useFadeIn } from '../hooks/useFadeIn';

const TestimonialCard: React.FC<{ quote: string; author: string; company: string;}> = ({ quote, author, company }) => {
    const fadeInCard = useFadeIn<HTMLDivElement>();
    return (
        <div ref={fadeInCard.ref} className={`group relative bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-lg shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl ${fadeInCard.className}`}>
            {/* Gradient outline */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#fee715]/20 to-[#00C9A7]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#fee715] to-[#00C9A7] opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-sm"></div>
            
            {/* Content */}
            <div className="relative z-10">
                <p className="text-gray-300 italic text-base md:text-lg mb-4 md:mb-6 leading-relaxed">"{quote}"</p>
                <div className="text-right">
                    <p className="font-bold text-white text-sm md:text-base">{author}</p>
                    <p className="text-[#fee715] text-sm md:text-base">{company}</p>
                </div>
            </div>
        </div>
    );
};

export const Testimonials: React.FC = () => {
    const fadeInHeader = useFadeIn<HTMLDivElement>();
  return (
    <section className="py-16 md:py-20 px-4 md:px-6 bg-[#18232F]">
      <div className="container mx-auto max-w-5xl">
        <div ref={fadeInHeader.ref} className={`text-center mb-12 md:mb-16 px-2 ${fadeInHeader.className}`}>
          <h2 className="font-[Montserrat] text-3xl md:text-4xl lg:text-5xl font-extrabold">Co mówią klienci?</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <TestimonialCard 
            quote="Wreszcie mam system, który działa, gdy ja śpię. Liczba zapytań wzrosła, a ja mam więcej czasu na pracę kreatywną."
            author="Anna Nowak"
            company="Architekt Wnętrz"
          />
          <TestimonialCard 
            quote="Proces był niezwykle sprawny, a efekt przerósł moje oczekiwania. Interaktywny kalkulator to strzał w dziesiątkę."
            author="Piotr Kowalski"
            company="Doradca Finansowy"
          />
          <TestimonialCard 
            quote="Zamiast odpowiadać na te same pytania w kółko, odsyłam klientów do narzędzia na stronie. Genialne w swojej prostocie."
            author="Ewa Wiśniewska"
            company="Trener Personalny"
          />
        </div>
      </div>
    </section>
  );
};
