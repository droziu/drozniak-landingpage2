'use client';

import { useEffect } from 'react';
import { ContactForm } from '@/components/ContactForm';
import { ContactAside } from '@/components/ContactAside';
import { Eyebrow } from '@/app/components/premium/Eyebrow';
import { FadeUp } from '@/app/components/premium/Motion';
import { HeroShapes } from '@/app/components/premium/HeroShapes';

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative">
      {/* HERO */}
      <section className="relative px-4 md:px-8 py-20 md:py-28 overflow-hidden">
        <HeroShapes variant="minimal" />
        <div className="relative w-full max-w-4xl mx-auto text-center">
          <FadeUp whenInView={false}>
            <Eyebrow align="center" className="mb-5">Porozmawiajmy</Eyebrow>
            <h1 className="cinematic-headline text-[clamp(2.25rem,7vw,5rem)] font-bold pb-3">
              Napisz <span className="text-gradient-yellow">wiadomość.</span>
            </h1>
            <p className="mt-7 text-base md:text-lg text-white/60 leading-relaxed text-balance">
              Opisz krótko, czego potrzebujesz - zwykle wracam z odpowiedzią w ciągu 24 godzin.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* FORM + ASIDE */}
      <section className="relative px-4 md:px-6 pb-24 md:pb-36">
        <div className="relative max-w-[88rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6 lg:gap-10 items-start">
            <FadeUp className="card p-6 md:p-8 lg:p-10">
              <ContactForm />
            </FadeUp>
            <FadeUp delay={0.1}>
              <ContactAside />
            </FadeUp>
          </div>
        </div>
      </section>
    </main>
  );
}
