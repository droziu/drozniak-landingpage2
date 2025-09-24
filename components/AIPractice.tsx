
import React from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { AIBrainIcon } from './icons/AIBrainIcon';

const AIPracticeItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    const fadeInItem = useFadeIn<HTMLDivElement>();
    return (
        <div ref={fadeInItem.ref} className={`bg-[#18232F] p-4 md:p-6 rounded-lg border border-gray-800 h-full flex flex-col ${fadeInItem.className}`}>
            <h3 className="font-[Montserrat] text-lg md:text-xl font-bold mb-3 text-[#fee715]">{title}</h3>
            <p className="text-gray-300 text-sm md:text-base flex-grow leading-relaxed">{children}</p>
        </div>
    );
};

export const AIPractice: React.FC = () => {
    const fadeInHeader = useFadeIn<HTMLDivElement>();
  return (
    <section className="py-16 md:py-20 px-4 md:px-6">
      <div className="container mx-auto max-w-5xl">
        <div ref={fadeInHeader.ref} className={`text-center mb-12 md:mb-16 px-2 ${fadeInHeader.className}`}>
          <AIBrainIcon className="w-12 h-12 md:w-16 md:h-16 text-[#fee715] mx-auto mb-4 md:mb-6" />
          <h2 className="font-[Montserrat] text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">AI w praktyce. Co to oznacza?</h2>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">To nie magia, a konkretne narzędzia, które wykonują za Ciebie powtarzalną pracę.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-stretch">
          <div className="space-y-6 flex flex-col">
            <AIPracticeItem title="Inteligentne tagowanie leadów">
                Na podstawie odpowiedzi w interaktywnym narzędziu, system AI sam ocenia, czy dany klient jest "gorący", "ciepły" czy "zimny", i odpowiednio go oznacza w Twojej bazie.
            </AIPracticeItem>
            <AIPracticeItem title="Personalizacja maili startowych">
                System automatycznie generuje i wysyła pierwszego maila do klienta, używając informacji z formularza, aby treść była idealnie dopasowana do jego potrzeb.
            </AIPracticeItem>
          </div>
          <div className="space-y-6 flex flex-col">
            <AIPracticeItem title="Automatyczne podsumowania dla Ciebie">
                Po każdym wypełnieniu formularza, AI tworzy krótkie, zwięzłe podsumowanie potrzeb klienta i wysyła je do Ciebie, abyś był zawsze przygotowany do rozmowy.
            </AIPracticeItem>
            <AIPracticeItem title="Analiza danych w dashboardzie">
                Twoja tablica analityczna jest zasilana przez AI, które nie tylko pokazuje suche liczby, ale także sugeruje trendy i podpowiada, które źródła leadów są najskuteczniejsze.
            </AIPracticeItem>
          </div>
        </div>
      </div>
    </section>
  );
};
