'use client';

import React from 'react';
import Link from 'next/link';
import { useFadeIn } from '@/hooks/useFadeIn';

interface FinalCTAProps {
  cookiePreferences: {
    necessary: boolean;
    performance: boolean;
    analytics: boolean;
  } | null;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ cookiePreferences }) => {
    const fadeInSection = useFadeIn<HTMLDivElement>();

  return (
    <section id="cta" className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-r from-[#fee715] to-[#00C9A7]">
      <div ref={fadeInSection.ref} className={`container mx-auto max-w-4xl text-center px-2 ${fadeInSection.className}`}>
        <h2 className="font-[Montserrat] text-3xl md:text-4xl lg:text-6xl font-extrabold text-[#101820] mb-6">Gotów na system, który sprzedaje?</h2>
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 md:p-8 max-w-4xl mx-auto mb-6 md:mb-10">
          <p className="text-lg md:text-xl text-[#101820]/90 max-w-2xl mx-auto mb-4">
            Pracuję maksymalnie z 5 klientami miesięcznie. Jeśli chcesz, żebym przygotował taki system dla Ciebie w ciągu najbliższych 6 tygodni - zarezerwuj rozmowę.
          </p>
          <p className="text-base md:text-lg text-[#101820]/70 max-w-3xl mx-auto leading-relaxed">
            Rozmowa jest zupełnie niezobowiązująca - przeanalizujemy wspólnie Twój biznes, ja zaproponuję rozwiązania i ustalimy czy chcemy pracować razem.
          </p>
        </div>
        <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://calendly.com/drozniakstanislaw/spotkanie"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#101820] text-white font-bold py-4 px-8 rounded-lg hover:bg-black transition-colors duration-300 inline-flex items-center justify-center"
          >
            Umów rozmowę
          </a>
          <Link
            href="/kontakt"
            className="border-2 border-[#101820] text-[#101820] font-bold py-4 px-8 rounded-lg hover:bg-[#101820] hover:text-white transition-all duration-300 inline-flex items-center justify-center"
          >
            Napisz maila
          </Link>
        </div>

      </div>
    </section>
  );
};
