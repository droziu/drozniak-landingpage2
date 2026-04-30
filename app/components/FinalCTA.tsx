'use client';

import React from 'react';
import Link from 'next/link';
import { CinematicSection } from './premium/CinematicSection';
import { SectionLabel } from './premium/SectionLabel';
import { BGPattern } from './premium/BGPattern';

interface FinalCTAProps {
  cookiePreferences: {
    necessary: boolean;
    performance: boolean;
    analytics: boolean;
  } | null;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ cookiePreferences: _cookiePreferences }) => (
  <CinematicSection ghost="Porozmawiajmy" id="cta">
    <BGPattern variant="grid" mask="fade-edges" size={60} fill="rgba(254, 231, 21, 0.04)" />
    <div className="relative max-w-3xl mx-auto text-center">
      <h2 className="cinematic-headline text-[clamp(2.5rem,7vw,5rem)] font-bold pb-3">
        Gotów na system, który sprzedaje?
      </h2>
      <div className="mt-8 max-w-2xl mx-auto space-y-4 text-base md:text-lg text-white/65 leading-relaxed text-balance">
        <p>
          Pracuję maksymalnie z <span className="text-white/90 font-medium">5 klientami miesięcznie</span>. Jeśli chcesz, żebym przygotował taki system dla Ciebie w ciągu najbliższych 6 tygodni - zarezerwuj rozmowę.
        </p>
        <p className="text-white/45 text-[15px]">
          Rozmowa jest zupełnie niezobowiązująca - przeanalizujemy Twój biznes, zaproponuję rozwiązania i ustalimy, czy chcemy pracować razem.
        </p>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href="https://calendly.com/drozniakstanislaw/spotkanie"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-lg cursor-pointer magnetic"
        >
          Umów rozmowę
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
        <Link href="/kontakt" className="btn btn-secondary btn-lg cursor-pointer">
          Napisz wiadomość
        </Link>
      </div>

      <div className="mt-12 pt-8 border-t border-white/8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[12px] font-mono uppercase tracking-[0.14em] text-white/40">
        <span>20 min online</span>
        <span className="text-white/15">·</span>
        <span>Zero zobowiązań</span>
        <span className="text-white/15">·</span>
        <span>Odpowiedź w 24h</span>
      </div>
    </div>
  </CinematicSection>
);
