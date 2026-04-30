'use client';

import React from 'react';
import { Eyebrow } from '../app/components/premium/Eyebrow';
import { FadeUp, Stagger, StaggerItem } from '../app/components/premium/Motion';
import { HeroShapes } from '../app/components/premium/HeroShapes';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[88vh] flex items-center px-4 md:px-8 lg:px-12 pt-12 md:pt-20 pb-16 md:pb-24 overflow-hidden">
      <HeroShapes variant="compact" />
      <div className="relative w-full max-w-[88rem] mx-auto">
        <Stagger className="text-center max-w-5xl mx-auto" whenInView={false}>
          <StaggerItem>
            <Eyebrow align="center" className="mb-5">
              System pozyskiwania klientów
            </Eyebrow>
          </StaggerItem>

          <StaggerItem>
            <h1 className="cinematic-headline text-[clamp(2.25rem,7vw,5rem)] font-bold pb-3">
              Masz klientów tylko z polecenia <br className="hidden sm:inline" />
              lub przypadku?{' '}
              <span className="text-gradient-yellow">Brakuje Ci systemu.</span>
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="mt-7 md:mt-9 text-base md:text-lg text-white/60 leading-relaxed max-w-2xl mx-auto text-balance">
              Proponuję jednorazową inwestycję:{' '}
              <span className="text-white/85">analiza, strategia i wdrożenie</span> narzędzia opartego na AI - zaprojektowanego specjalnie dla małych firm i freelancerów.
            </p>
          </StaggerItem>

          <StaggerItem>
            <div className="mt-9 md:mt-11 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#cta"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-primary btn-lg cursor-pointer magnetic"
              >
                Chcę poznać szczegóły
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <p className="text-[12px] text-white/40 inline-flex items-center gap-2 flex-wrap justify-center font-mono uppercase tracking-[0.14em]">
                20 min &middot; online &middot; zero zobowiązań
              </p>
            </div>
          </StaggerItem>
        </Stagger>

        {/* Trust marquee */}
        <FadeUp delay={0.4} whenInView={false} className="mt-20 md:mt-28">
          <p className="text-center text-[11px] font-mono uppercase tracking-[0.22em] text-white/35 mb-7">
            Pracowałem z
          </p>
          <div className="overflow-hidden marquee-mask">
            <div className="flex animate-scroll-infinite whitespace-nowrap">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-12 md:gap-16 flex-shrink-0 pr-12 md:pr-16">
                  {[
                    'Chess.com',
                    'Wagento',
                    'eWay Corp',
                    'BigCommerce',
                    'Tour & Holiday',
                    'Commerce Hero',
                    'Dietana',
                    'Redlin',
                    'Talk Commerce',
                    'ICAROS',
                    'Grupa Fibra',
                    'FHU Tomex',
                  ].map((name) => (
                    <span key={`${i}-${name}`} className="text-white/40 text-sm md:text-base font-medium">
                      {name}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};
