'use client';

import React from 'react';
import { Eyebrow } from '../app/components/premium/Eyebrow';
import { FadeUp, Stagger, StaggerItem } from '../app/components/premium/Motion';

interface StepProps {
  number: string;
  title: string;
  description: string;
  isLast?: boolean;
}

const ProcessStep: React.FC<StepProps> = ({ number, title, description, isLast = false }) => (
  <div className="relative flex items-start gap-6 md:gap-8">
    <div className="flex-shrink-0 flex flex-col items-center">
      <div className="font-mono text-xs text-[#fee715] mt-1">{number}</div>
      {!isLast && (
        <div
          className="w-px flex-1 mt-3 bg-gradient-to-b from-white/15 via-white/8 to-transparent"
          style={{ minHeight: '80px' }}
        />
      )}
    </div>
    <div className="pt-0 pb-10 md:pb-14 flex-1">
      <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-white mb-3">
        {title}
      </h3>
      <p className="text-white/60 leading-relaxed text-[15px] md:text-base text-pretty max-w-2xl">
        {description}
      </p>
    </div>
  </div>
);

export const Process: React.FC = () => (
  <section className="relative px-4 md:px-8 lg:px-12 py-24 md:py-36 border-t border-white/5">
    <div className="relative max-w-4xl mx-auto">
      <FadeUp className="max-w-3xl mb-14 md:mb-20">
        <Eyebrow>Jak pracujemy razem</Eyebrow>
        <h2 className="mt-5 cinematic-headline text-3xl md:text-5xl lg:text-[3.75rem] font-bold pb-3">
          <span className="text-gradient-fade">Proces w</span>{' '}
          <span className="text-gradient-yellow">4 krokach.</span>
        </h2>
        <p className="mt-6 text-base md:text-lg text-white/60 leading-relaxed text-balance">
          Od chaosu do przewidywalnego systemu - w kilka tygodni. Prowadzę Cię za rękę przez cały proces.
        </p>
      </FadeUp>

      <Stagger>
        <StaggerItem>
          <ProcessStep
            number="01"
            title="Diagnoza"
            description="Podczas rozmowy (20–30 min) poznaję Twoją ofertę, klientów i wąskie gardła."
          />
        </StaggerItem>
        <StaggerItem>
          <ProcessStep
            number="02"
            title="Projekt"
            description="Tworzę prosty schemat ścieżki klienta i makietę narzędzia."
          />
        </StaggerItem>
        <StaggerItem>
          <ProcessStep
            number="03"
            title="Wdrożenie"
            description="Wdrażam narzędzie, integracje i automatyzacje AI. Testuję rozwiązanie."
          />
        </StaggerItem>
        <StaggerItem>
          <ProcessStep
            number="04"
            title="Uruchomienie"
            description="Przekazuję gotowy projekt, nagrywam krótką instrukcję i pomagam przy starcie."
            isLast
          />
        </StaggerItem>
      </Stagger>
    </div>
  </section>
);
