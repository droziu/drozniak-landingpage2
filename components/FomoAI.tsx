'use client';

import React from 'react';
import { Background } from '../app/components/premium/Background';
import { Eyebrow } from '../app/components/premium/Eyebrow';
import { FadeUp } from '../app/components/premium/Motion';

export const FomoAI: React.FC = () => (
  <section className="relative px-4 md:px-8 lg:px-12 py-24 md:py-36 overflow-hidden">
    <Background variant="subtle" />
    <FadeUp className="relative max-w-3xl mx-auto text-center">
      <Eyebrow align="center">Era AI &middot; Tu i teraz</Eyebrow>
      <h2 className="mt-5 cinematic-headline text-3xl md:text-5xl lg:text-[3.75rem] font-bold pb-3">
        <span className="text-gradient-fade">Jesteśmy w erze AI.</span>{' '}
        <span className="text-gradient-yellow">Wykorzystaj to.</span>
      </h2>
      <div className="mt-9 space-y-5 text-base md:text-lg text-white/60 leading-relaxed text-balance">
        <p>
          Interaktywne narzędzia konwertują{' '}
          <span className="text-white/85 font-medium">2–3× lepiej niż PDF-y</span>. AI segmentuje i podpowiada, kto jest naprawdę zainteresowany.
        </p>
        <p className="text-white/45">
          Za rok większość firm to wdroży - pytanie, czy chcesz być pierwszy, czy ostatni?
        </p>
      </div>
    </FadeUp>
  </section>
);
