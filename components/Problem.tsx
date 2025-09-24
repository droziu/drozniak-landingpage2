
import React from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { QuoteIcon } from './icons/QuoteIcon';

const ScenarioCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    const fadeInCard = useFadeIn<HTMLDivElement>();
    return (
        <div ref={fadeInCard.ref} className={`bg-[#18232F] p-8 rounded-lg border border-gray-800 transform hover:-translate-y-2 transition-transform duration-300 ${fadeInCard.className}`}>
            <QuoteIcon className="w-8 h-8 text-[#fee715] mb-4"/>
            <h3 className="font-[Montserrat] text-xl font-bold mb-4">{title}</h3>
            <p className="text-gray-300 leading-relaxed">{children}</p>
        </div>
    );
};

export const Problem: React.FC = () => {
    const fadeInHeader = useFadeIn<HTMLDivElement>();
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <div ref={fadeInHeader.ref} className={`text-center mb-16 ${fadeInHeader.className}`}>
          <h2 className="font-[Montserrat] text-4xl md:text-5xl font-extrabold mb-4">Brzmi znajomo?</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">Masz świetną usługę, zadowolonych klientów i polecenia. Ale czujesz, że to za mało, aby stabilnie rosnąć.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
            <ScenarioCard title="Scenariusz 1: Chaos">
                Każde zapytanie obsługujesz ręcznie. Przygotowujesz oferty w PDF, wysyłasz maile, umawiasz rozmowy. To cenne godziny, które mogłyby pójść na pracę dla klienta.
            </ScenarioCard>
            <ScenarioCard title="Scenariusz 2: Niewidzialność">
                Twoja strona to cyfrowa wizytówka, która nie sprzedaje. Brak na niej jasnego komunikatu, dowodów skuteczności i wezwania do działania, które naprawdę działa.
            </ScenarioCard>
            <ScenarioCard title="Scenariusz 3: Przypadek">
                Nowi klienci to loteria. Nie masz przewidywalnego źródła zapytań. Twój biznes zależy od poleceń, a gdy ich brakuje, pojawia się stres.
            </ScenarioCard>
        </div>
      </div>
    </section>
  );
};
