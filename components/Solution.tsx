'use client';

import React from 'react';
import { Eyebrow } from '../app/components/premium/Eyebrow';
import { FadeUp, Stagger, StaggerItem } from '../app/components/premium/Motion';

const SolutionItem: React.FC<{
  number: string;
  title: string;
  children: React.ReactNode;
}> = ({ number, title, children }) => (
  <div className="card surface-hover p-7 h-full flex flex-col gap-4">
    <div className="flex items-center justify-between">
      <span className="font-mono text-[11px] tracking-[0.18em] text-white/40">{number}</span>
      <span className="w-5 h-5 rounded-full bg-[#fee715]/10 border border-[#fee715]/30 flex items-center justify-center">
        <span className="w-1 h-1 rounded-full bg-[#fee715]" />
      </span>
    </div>
    <h3 className="text-lg md:text-xl font-medium tracking-tight text-white leading-snug">{title}</h3>
    <p className="text-[15px] text-white/60 leading-relaxed text-pretty">{children}</p>
  </div>
);

export const Solution: React.FC = () => (
  <section id="rozwiazanie" className="relative px-4 md:px-8 lg:px-12 py-24 md:py-36 border-t border-white/5">
    <div className="relative max-w-[88rem] mx-auto">
      <FadeUp className="max-w-3xl mb-14 md:mb-20">
        <Eyebrow>Z czego składa się system</Eyebrow>
        <h2 className="mt-5 cinematic-headline text-3xl md:text-5xl lg:text-[3.75rem] font-bold pb-3">
          <span className="text-gradient-fade">Elementy</span>{' '}
          <span className="text-gradient-yellow">Twojego systemu.</span>
        </h2>
        <p className="mt-6 text-base md:text-lg text-white/60 leading-relaxed text-balance">
          Zakres dobieramy do Twojej sytuacji - od pojedynczego narzędzia po pełny system.
        </p>
      </FadeUp>

      <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        <StaggerItem>
          <SolutionItem number="01" title="Audyt i strategia">
            Przygotowuję analizę Twoich dotychczasowych działań, grupy docelowej i konkurencji. Tworzę strategię komunikacji, która trafia w sedno.
          </SolutionItem>
        </StaggerItem>
        <StaggerItem>
          <SolutionItem number="02" title="Interaktywne narzędzie">
            Tworzę kalkulator, konfigurator lub quiz, który angażuje klienta i zbiera dla Ciebie cenne dane.
          </SolutionItem>
        </StaggerItem>
        <StaggerItem>
          <SolutionItem number="03" title="Automatyzacje AI">
            Wdrażam proste automatyzacje AI, które kwalifikują leady, wysyłają spersonalizowane maile i oszczędzają Twój czas.
          </SolutionItem>
        </StaggerItem>
        <StaggerItem>
          <SolutionItem number="04" title="Landing page, który sprzedaje">
            Projektuję i wdrażam stronę docelową, która jest maszyną do konwersji, a nie tylko ładnym obrazkiem.
          </SolutionItem>
        </StaggerItem>
        <StaggerItem>
          <SolutionItem number="05" title="Działania w social media">
            Optymalizuję profile i treści tak, żeby wspierały sprzedaż i regularnie przynosiły zapytania.
          </SolutionItem>
        </StaggerItem>
        <StaggerItem>
          <SolutionItem number="06" title="Wsparcie i rozwój">
            Po wdrożeniu nie znikam. Przekazuję instrukcje i wsparcie, aby w pełni wykorzystać potencjał nowego systemu.
          </SolutionItem>
        </StaggerItem>
      </Stagger>
    </div>
  </section>
);
