'use client';

import React from 'react';
import { Eyebrow } from '../app/components/premium/Eyebrow';
import { FadeUp, Stagger, StaggerItem } from '../app/components/premium/Motion';

const PricingScenario: React.FC<{
  number: string;
  title: string;
  price: string;
  description: React.ReactNode;
  featured?: boolean;
}> = ({ number, title, price, description, featured }) => (
  <div
    className={`relative card surface-hover h-full p-8 md:p-9 flex flex-col ${
      featured ? 'card-accent border-[#fee715]/30' : ''
    }`}
  >
    {featured && (
      <div className="absolute -top-3 left-8">
        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] bg-[#fee715] text-[#0A0A0B]">
          Najczęstszy wybór
        </span>
      </div>
    )}

    <div className="flex items-center justify-between mb-7">
      <span className="font-mono text-[11px] tracking-[0.18em] text-white/40">{number}</span>
      <div className="flex gap-1">
        {[...Array(3)].map((_, i) => (
          <span
            key={i}
            className={`h-1 w-3 rounded-full ${
              i < parseInt(number, 10) ? 'bg-[#fee715]' : 'bg-white/12'
            }`}
          />
        ))}
      </div>
    </div>

    <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white mb-3">{title}</h3>
    <p className="text-white/60 text-[15px] leading-relaxed mb-8 flex-grow text-pretty">{description}</p>

    <div className="pt-6 border-t border-white/8">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">
        Inwestycja
      </div>
      <div className="text-2xl md:text-3xl font-medium tracking-tight text-gradient-yellow leading-tight">
        {price}
      </div>
    </div>
  </div>
);

export const Pricing: React.FC = () => (
  <section id="cena" className="relative px-4 md:px-8 lg:px-12 py-24 md:py-36 border-t border-white/5">
    <div className="relative max-w-[88rem] mx-auto">
      <FadeUp className="max-w-3xl mb-14 md:mb-20">
        <Eyebrow>Inwestycja</Eyebrow>
        <h2 className="mt-5 cinematic-headline text-3xl md:text-5xl lg:text-[3.75rem] font-bold pb-3">
          <span className="text-gradient-fade">Ile to</span>{' '}
          <span className="text-gradient-yellow">kosztuje?</span>
        </h2>
        <p className="mt-6 text-base md:text-lg text-white/60 leading-relaxed text-balance">
          Trzy ścieżki - od jednorazowego narzędzia po pełny system szyty na miarę.
        </p>
      </FadeUp>

      <Stagger className="grid md:grid-cols-3 gap-3">
        <StaggerItem>
          <PricingScenario
            number="1"
            title="Pojedyncze narzędzie"
            price="od 1 500 zł netto"
            description={
              <>
                Wybieramy 1 kluczowy element z{' '}
                <a href="#rozwiazanie" className="text-[#fee715] hover:opacity-80 underline-offset-2 underline transition-opacity">
                  listy
                </a>{' '}
                (np. interaktywne narzędzie albo blueprint lejka) i robimy go od A do Z.
              </>
            }
          />
        </StaggerItem>
        <StaggerItem>
          <PricingScenario
            number="2"
            featured
            title="System dla małej firmy"
            price="3 000–6 000 zł netto"
            description={
              <>
                Najczęściej obejmuje 2–4 elementy z{' '}
                <a href="#rozwiazanie" className="text-[#fee715] hover:opacity-80 underline-offset-2 underline transition-opacity">
                  listy
                </a>{' '}
                (np. audyt + narzędzie + prosty landing). Dokładny zakres dobieramy po rozmowie.
              </>
            }
          />
        </StaggerItem>
        <StaggerItem>
          <PricingScenario
            number="3"
            title="System szyty na miarę"
            price="wycena indywidualna"
            description={
              <>
                Pełny system obejmuje wszystkie obszary z{' '}
                <a href="#rozwiazanie" className="text-[#fee715] hover:opacity-80 underline-offset-2 underline transition-opacity">
                  listy
                </a>{' '}
                + dodatkowe integracje i automatyzacje.
              </>
            }
          />
        </StaggerItem>
      </Stagger>
    </div>
  </section>
);
