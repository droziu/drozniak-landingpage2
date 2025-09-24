
import React from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { ZapIcon } from './icons/ZapIcon';

export const FomoAI: React.FC = () => {
    const fadeInSection = useFadeIn<HTMLDivElement>();
  return (
    <section ref={fadeInSection.ref} className={`py-20 px-6 bg-gradient-to-b from-[#18232F] to-[#101820] ${fadeInSection.className}`}>
      <div className="container mx-auto max-w-4xl text-center">
        <ZapIcon className="w-16 h-16 text-[#fee715] mx-auto mb-6" />
        <h2 className="font-[Montserrat] text-4xl md:text-5xl font-extrabold mb-6">Jesteśmy w erze AI. Wykorzystaj to.</h2>
        <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
          Interaktywne narzędzia konwertują <span className="text-[#fee715] font-bold">2–3× lepiej</span> niż PDF-y. AI segmentuje i podpowiada, kto jest naprawdę zainteresowany. Za rok większość firm to wdroży - pytanie, czy chcesz być pierwszy, czy ostatni?
        </p>
        <div className="h-1 w-24 bg-[#fee715] mx-auto rounded-full"></div>
      </div>
    </section>
  );
};
