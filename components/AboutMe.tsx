'use client';

import React from 'react';
import { Eyebrow } from '../app/components/premium/Eyebrow';
import { FadeUp, Stagger, StaggerItem } from '../app/components/premium/Motion';

export const AboutMe: React.FC = () => (
  <section className="relative px-4 md:px-8 lg:px-12 py-24 md:py-36 border-t border-white/5">
    <div className="relative max-w-[88rem] mx-auto">
      <FadeUp className="max-w-3xl mb-14 md:mb-20">
        <Eyebrow>Kim jestem</Eyebrow>
        <h2 className="mt-5 cinematic-headline text-3xl md:text-5xl lg:text-[3.75rem] font-bold pb-3">
          <span className="text-gradient-fade">Specjalista w</span>{' '}
          <span className="text-gradient-yellow">marketingu i AI.</span>
        </h2>
      </FadeUp>

      <Stagger className="grid lg:grid-cols-[1fr_1.4fr] gap-10 md:gap-16 items-start">
        <StaggerItem>
          <div className="relative rounded-2xl overflow-hidden border border-white/8">
            <img
              src="/images/Drozniak_photo_suit_1.webp"
              alt="Stanisław Drożniak"
              className="w-full h-auto object-cover aspect-[4/5]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#fee715] mb-1">
                9 lat doświadczenia
              </div>
              <div className="text-base font-medium text-white/90">Marketing &middot; AI &middot; Web</div>
            </div>
          </div>
        </StaggerItem>

        <StaggerItem className="space-y-7">
          <div className="space-y-5 text-base md:text-lg text-white/65 leading-relaxed text-pretty">
            <p>
              Zaczynałem jako nauczyciel szachów i freelancer montujący filmy. Z czasem coraz więcej czasu poświęcałem na marketing i automatyzację procesów.
            </p>
            <p className="text-white/85">
              Prawdopodobnie mamy podobne doświadczenia - ja też byłem freelancerem, który aktywnie szukał klientów i zmagał się z niestabilnością przychodów.
            </p>
            <p>
              Przez lata pomogłem dziesiątkom firm i freelancerów z ich marketingiem, integracją AI i automatyzacją procesów. Wiem, jak wyglądają Twoje zmagania, więc prawdopodobnie będę mógł Ci pomóc skuteczniej niż duża agencja.
            </p>
          </div>

          <div className="card surface-hover p-6 md:p-7">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-4">
              Certyfikaty
            </div>
            <div className="flex flex-wrap gap-2">
              {['META', 'Adobe', 'University of California'].map((cert) => (
                <span
                  key={cert}
                  className="px-3 py-1.5 rounded-full text-sm font-medium text-white/85 bg-white/[0.04] border border-white/8"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          <blockquote className="card surface-hover p-7 md:p-8">
            <div className="text-3xl text-[#fee715]/20 leading-none mb-3 font-mono">"</div>
            <p className="text-base md:text-lg text-white/80 leading-relaxed text-pretty">
              Rozumiem Twoje problemy i frustracje biznesowe. Wspólnie możemy popracować nad Twoim marketingiem i stworzyć działający system.
            </p>
            <footer className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#fee715]">
              - Stanisław Drożniak
            </footer>
          </blockquote>
        </StaggerItem>
      </Stagger>
    </div>
  </section>
);
