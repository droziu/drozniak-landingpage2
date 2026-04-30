'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Eyebrow } from '@/app/components/premium/Eyebrow';
import { FadeUp, Stagger, StaggerItem } from '@/app/components/premium/Motion';
import { HeroShapes } from '@/app/components/premium/HeroShapes';

export default function SzkoleniaPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const targetAudience = [
    'korporacji i większych firm wdrażających AI w procesach marketingu',
    'średnich i małych firm, których zespoły chcą zacząć korzystać z AI w codziennej pracy',
    'działów marketingu, komunikacji, sprzedaży i obsługi klienta',
    'właścicieli firm, którzy sami chcą poznać narzędzia AI i automatyzacje',
    'organizacji szukających efektywniejszego wykorzystania mediów społecznościowych',
    'firm realizujących szkolenia w ramach programów dofinansowań',
  ];

  const trainingTypes = [
    {
      title: 'Marketing i strategia digitalowa',
      description:
        'Analiza procesów marketingowych, planowanie działań, nowoczesne podejście do pozyskiwania klientów.',
    },
    {
      title: 'Media społecznościowe w organizacji',
      description:
        'Efektywne zarządzanie treściami, analityka, procesy wewnętrzne, komunikacja spójna z marką.',
    },
    {
      title: 'AI w marketingu i sprzedaży',
      description:
        'Praktyczne zastosowania narzędzi AI w tworzeniu treści, automatyzacji zadań, analizie danych i pracy zespołów.',
    },
    {
      title: 'Automatyzacja procesów',
      description:
        'Integracje, workflowy, dokumentacja i procedury z wykorzystaniem AI. Mniej ręcznej pracy, więcej powtarzalnych efektów.',
    },
    {
      title: 'Warsztaty praktyczne',
      description: 'Zajęcia w formule hands-on. Pracujemy na realnych przypadkach Twojej firmy, krok po kroku.',
    },
    {
      title: 'Szkolenia na zamówienie',
      description:
        'Program tworzony pod cele organizacji, profil działalności i poziom zaawansowania uczestników.',
    },
  ];

  const processSteps = [
    { step: '01', title: 'Diagnoza potrzeb', description: 'Analiza procesów, struktury zespołu i oczekiwań biznesowych.' },
    { step: '02', title: 'Program szkolenia', description: 'Zakres, harmonogram, materiały i wymagania organizacyjne.' },
    { step: '03', title: 'Realizacja', description: 'Praktyczne warsztaty online lub stacjonarnie, dostosowane do zespołu.' },
    { step: '04', title: 'Materiały po', description: 'Checklisty, instrukcje, procedury, systemy promptów.' },
    { step: '05', title: 'Wsparcie 30 dni', description: 'Konsultacje dodatkowych pytań i ocena wdrożonych zmian.' },
  ];

  const benefits = [
    'usprawnienie pracy zespołów i skrócenie czasu realizacji zadań',
    'uporządkowanie komunikacji marketingowej',
    'wdrożenie realnych zastosowań AI w codziennych procesach',
    'poprawa jakości treści i spójności przekazu marki',
    'zwiększenie efektywności działań sprzedażowych i marketingowych',
  ];

  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-[80vh] flex flex-col justify-center px-4 md:px-8 py-16 md:py-24 overflow-hidden">
        <HeroShapes variant="compact" />
        <div className="relative w-full max-w-4xl mx-auto text-center">
          <Stagger whenInView={false}>
            <StaggerItem>
              <Eyebrow align="center" className="mb-5">Szkolenia dla firm</Eyebrow>
            </StaggerItem>
            <StaggerItem>
              <h1 className="cinematic-headline text-[clamp(2.25rem,7vw,5rem)] font-bold pb-3">
                Szkolenia szyte na miarę{' '}
                <span className="text-gradient-yellow">dla zespołów i właścicieli firm.</span>
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-7 text-base md:text-lg text-white/60 leading-relaxed text-balance">
                Marketing, sprzedaż, social media, AI w marketingu, automatyzacje, procesy. Treść każdego szkolenia dopasowuję do konkretnej firmy i osób, z którymi pracuję - od korporacji, przez średnie i małe firmy, po indywidualnych właścicieli.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="mt-9 flex justify-center">
                <Link href="/kontakt" className="btn btn-primary btn-lg cursor-pointer">
                  Poproś o ofertę
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* CHARAKTER */}
      <section className="relative px-4 md:px-8 lg:px-12 py-24 md:py-36 border-t border-white/5">
        <div className="relative max-w-[88rem] mx-auto">
          <FadeUp className="max-w-3xl mb-14 md:mb-20">
            <Eyebrow>Charakter i przeznaczenie</Eyebrow>
            <h2 className="mt-5 cinematic-headline text-3xl md:text-5xl lg:text-[3.75rem] font-bold pb-3">
              Szkolenia szyte na miarę.
            </h2>
            <p className="mt-6 text-base md:text-lg text-white/60 leading-relaxed text-balance">
              Pracuję z firmami każdej wielkości: od korporacji i większych organizacji, po średnie i małe firmy oraz indywidualnych właścicieli. Każdy program dopasowany do procesów, struktury zespołu i celów biznesowych.
            </p>
          </FadeUp>

          <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {targetAudience.map((item, index) => (
              <StaggerItem key={index}>
                <div className="card surface-hover p-7 h-full">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-white/40 mb-4 block">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[15px] md:text-base text-white/80 leading-relaxed">{item}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ZAKRES */}
      <section className="relative px-4 md:px-8 lg:px-12 py-24 md:py-36 border-t border-white/5">
        <div className="relative max-w-[88rem] mx-auto">
          <FadeUp className="max-w-3xl mb-14 md:mb-20">
            <Eyebrow>Zakres tematyczny</Eyebrow>
            <h2 className="mt-5 cinematic-headline text-3xl md:text-5xl lg:text-[3.75rem] font-bold pb-3">
              Co otrzymujesz.
            </h2>
          </FadeUp>

          <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {trainingTypes.map((training, index) => (
              <StaggerItem key={index}>
                <div className="card surface-hover p-7 h-full">
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-[11px] tracking-[0.18em] text-white/40">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#fee715]" />
                  </div>
                  <h3 className="text-lg md:text-xl font-medium tracking-tight text-white mb-3">
                    {training.title}
                  </h3>
                  <p className="text-[15px] text-white/60 leading-relaxed">{training.description}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* PRZEBIEG */}
      <section className="relative px-4 md:px-8 lg:px-12 py-24 md:py-36 border-t border-white/5">
        <div className="relative max-w-[88rem] mx-auto">
          <FadeUp className="max-w-3xl mb-14 md:mb-20">
            <Eyebrow>Przebieg współpracy</Eyebrow>
            <h2 className="mt-5 cinematic-headline text-3xl md:text-5xl lg:text-[3.75rem] font-bold pb-3">
              <span className="text-gradient-yellow">5 kroków</span>{' '}
              <span className="text-gradient-fade">do efektu.</span>
            </h2>
          </FadeUp>

          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-5 border-t border-white/8">
            {processSteps.map((step, index) => (
              <StaggerItem
                key={index}
                className={`p-7 md:p-8 border-b border-white/8 sm:border-r ${
                  (index + 1) % 2 === 0 ? 'sm:border-r-0 lg:border-r' : ''
                } ${index === 4 ? 'lg:border-r-0' : ''}`}
              >
                <div className="font-mono text-[11px] tracking-[0.18em] text-[#fee715] mb-4">
                  {step.step}
                </div>
                <h3 className="text-base md:text-lg font-medium tracking-tight text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-white/55 leading-relaxed">{step.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* DOFINANSOWANIA */}
      <section className="relative px-4 md:px-8 lg:px-12 py-24 md:py-36 border-t border-white/5">
        <div className="relative w-full max-w-4xl mx-auto">
          <FadeUp>
            <div className="card p-8 md:p-12">
              <Eyebrow>Wsparcie finansowe</Eyebrow>
              <h2 className="mt-5 display-tight text-3xl md:text-4xl lg:text-5xl text-balance">
                <span className="text-gradient-fade">Szkolenia z</span>{' '}
                <span className="text-gradient-yellow">dofinansowaniem.</span>
              </h2>
              <div className="mt-6 space-y-4 text-base md:text-lg text-white/65 leading-relaxed text-pretty">
                <p>Szkolenia mogą być realizowane w ramach dofinansowań i programów rozwojowych.</p>
                <p>
                  Zapewniam przygotowanie zakresu szkolenia, dokumentacji oraz wsparcie w procesie zgłoszenia.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* EFEKTY */}
      <section className="relative px-4 md:px-8 lg:px-12 py-24 md:py-36 border-t border-white/5">
        <div className="relative w-full max-w-4xl mx-auto">
          <FadeUp className="mb-14 md:mb-20">
            <Eyebrow>Efekty wdrożeń</Eyebrow>
            <h2 className="mt-5 cinematic-headline text-3xl md:text-5xl lg:text-[3.75rem] font-bold pb-3">
              <span className="text-gradient-fade">Po szkoleniu</span>{' '}
              <span className="text-gradient-yellow">zyskasz.</span>
            </h2>
          </FadeUp>

          <Stagger className="space-y-2.5">
            {benefits.map((benefit, index) => (
              <StaggerItem key={index}>
                <div className="card surface-hover p-5 md:p-6 flex items-start gap-4">
                  <div className="flex-shrink-0 mt-0.5 w-7 h-7 rounded-full bg-emerald-400/15 border border-emerald-400/25 text-emerald-400 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-white/75 text-base md:text-lg leading-relaxed flex-1">{benefit}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-4 md:px-6 py-32 md:py-44 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-dots bg-fade-radial opacity-25" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1100px] max-h-[1100px] halo-yellow opacity-80" />
        </div>

        <FadeUp className="relative max-w-3xl mx-auto text-center">
          <h2 className="display-x text-[clamp(2rem,6vw,4rem)] text-balance">
            <span className="text-gradient-fade">Chcesz zrealizować</span>{' '}
            <span className="text-gradient-yellow">szkolenie</span>{' '}
            <span className="text-gradient-fade">dla zespołu?</span>
          </h2>
          <p className="mt-7 text-base md:text-lg text-white/60 leading-relaxed">
            Przygotuję program dostosowany do potrzeb Twojej firmy.
          </p>
          <div className="mt-9 flex justify-center">
            <Link href="/kontakt" className="btn btn-primary btn-lg cursor-pointer">
              Poproś o ofertę
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}
