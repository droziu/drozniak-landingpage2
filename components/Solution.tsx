
import React from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

const SolutionItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    const fadeInItem = useFadeIn<HTMLDivElement>();
    return (
        <div ref={fadeInItem.ref} className={`flex items-start space-x-3 md:space-x-4 ${fadeInItem.className}`}>
            <CheckCircleIcon className="w-6 h-6 md:w-7 md:h-7 text-[#00C9A7] flex-shrink-0 mt-1" />
            <div>
                <h3 className="font-[Montserrat] text-lg md:text-xl font-bold text-[#fee715] mb-2">{title}</h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">{children}</p>
            </div>
        </div>
    );
}

export const Solution: React.FC = () => {
    const fadeInHeader = useFadeIn<HTMLHeadingElement>();
  return (
    <section id="rozwiazanie" className="py-16 md:py-20 px-4 md:px-6">
      <div className="container mx-auto max-w-5xl">
        <h2 ref={fadeInHeader.ref} className={`font-[Montserrat] text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-12 md:mb-16 px-2 ${fadeInHeader.className}`}>
          Jedna inwestycja, kompletny <span className="text-[#fee715]">system</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-8 md:gap-y-10">
            <SolutionItem title="Audyt i Strategia">
                Przygotowuję analizę Twoich dotychczasowych działań, grupy docelowej i konkurencji. Tworzę strategię komunikacji, która trafia w sedno.
            </SolutionItem>
            <SolutionItem title="Interaktywne Narzędzie">
                Tworzę kalkulator, konfigurator lub quiz, który angażuje klienta i zbiera dla Ciebie cenne dane.
            </SolutionItem>
            <SolutionItem title="Automatyzacje AI">
                Wdrażam proste automatyzacje AI, które automatycznie kwalifikują leady, wysyłają spersonalizowane maile i oszczędzają Twój czas.
            </SolutionItem>
             <SolutionItem title="Landing Page, który sprzedaje">
                Projektuję i wdrażam stronę docelową, która jest maszyną do konwersji, a nie tylko ładnym obrazkiem.
            </SolutionItem>
            <SolutionItem title="Działania w social media">
                Optymalizuję profile i treści, żeby realnie wspierały sprzedaż i regularnie zbierały zapytania.
            </SolutionItem>
            <SolutionItem title="Wsparcie i Rozwój">
                Po wdrożeniu nie znikam. Przekazuję instrukcje i wsparcie, aby w pełni wykorzystać potencjał nowego systemu.
            </SolutionItem>
        </div>
      </div>
    </section>
  );
};
