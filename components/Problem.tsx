'use client';

import React from 'react';
import { Eyebrow } from '../app/components/premium/Eyebrow';
import { FadeUp, Stagger, StaggerItem } from '../app/components/premium/Motion';

const ScenarioCard: React.FC<{
  number: string;
  title: string;
  children: React.ReactNode;
}> = ({ number, title, children }) => (
  <div className="card surface-hover p-7 md:p-8 h-full">
    <div className="flex items-start justify-between mb-5">
      <span className="font-mono text-[11px] tracking-[0.18em] text-white/40">{number}</span>
      <span className="w-1 h-1 rounded-full bg-[#fee715]" />
    </div>
    <h3 className="text-xl font-medium tracking-tight text-white mb-3">{title}</h3>
    <p className="text-white/60 text-[15px] leading-relaxed text-pretty">{children}</p>
  </div>
);

export const Problem: React.FC = () => (
  <section className="relative px-4 md:px-8 lg:px-12 py-24 md:py-36 border-t border-white/5">
    <div className="relative max-w-[88rem] mx-auto">
      <FadeUp className="max-w-3xl mb-14 md:mb-20">
        <Eyebrow>Brzmi znajomo?</Eyebrow>
        <h2 className="mt-5 cinematic-headline text-3xl md:text-5xl lg:text-[3.75rem] font-bold pb-3">
          <span className="text-gradient-fade">Trzy scenariusze,</span>{' '}
          <span className="text-gradient-yellow">jeden problem.</span>
        </h2>
        <p className="mt-6 text-base md:text-lg text-white/60 leading-relaxed text-balance">
          Masz świetną usługę, zadowolonych klientów i polecenia. Ale czujesz, że to za mało, aby stabilnie rosnąć.
        </p>
      </FadeUp>

      <Stagger className="grid md:grid-cols-3 gap-3">
        <StaggerItem>
          <ScenarioCard number="01 / Chaos" title="Wszystko ręcznie">
            Każde zapytanie obsługujesz ręcznie. Przygotowujesz oferty w PDF, wysyłasz maile, umawiasz rozmowy. To cenne godziny, które mogłyby pójść na pracę dla klienta.
          </ScenarioCard>
        </StaggerItem>
        <StaggerItem>
          <ScenarioCard number="02 / Niewidzialność" title="Strona nie sprzedaje">
            Twoja strona to cyfrowa wizytówka, która nie sprzedaje. Brak na niej jasnego komunikatu, dowodów skuteczności i wezwania do działania, które naprawdę działa.
          </ScenarioCard>
        </StaggerItem>
        <StaggerItem>
          <ScenarioCard number="03 / Przypadek" title="Klienci to loteria">
            Nowi klienci to loteria. Nie masz przewidywalnego źródła zapytań. Twój biznes zależy od poleceń, a gdy ich brakuje, pojawia się stres.
          </ScenarioCard>
        </StaggerItem>
      </Stagger>
    </div>
  </section>
);
