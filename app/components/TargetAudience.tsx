'use client';

import React from 'react';
import Link from 'next/link';
import { Eyebrow } from './premium/Eyebrow';
import { FadeUp, Stagger, StaggerItem } from './premium/Motion';

const Item: React.FC<{
  text: React.ReactNode;
  isPositive: boolean;
}> = ({ text, isPositive }) => (
  <div
    className={`flex items-start gap-4 p-5 md:p-6 rounded-xl border transition-all duration-200 ${
      isPositive
        ? 'border-white/8 bg-white/[0.02] hover:border-emerald-400/30'
        : 'border-white/8 bg-white/[0.02] hover:border-rose-400/30'
    }`}
  >
    <div
      className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center ${
        isPositive ? 'bg-emerald-400/15 text-emerald-400' : 'bg-rose-400/15 text-rose-400'
      }`}
    >
      {isPositive ? (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 6l12 12M18 6L6 18" />
        </svg>
      )}
    </div>
    <p className="text-white/70 text-[15px] leading-relaxed flex-1 text-pretty">{text}</p>
  </div>
);

export const TargetAudience: React.FC = () => (
  <section className="relative px-4 md:px-8 lg:px-12 py-24 md:py-36 border-t border-white/5">
    <div className="relative max-w-[88rem] mx-auto">
      <FadeUp className="max-w-3xl mb-14 md:mb-20">
        <Eyebrow>Dla kogo</Eyebrow>
        <h2 className="mt-5 cinematic-headline text-3xl md:text-5xl lg:text-[3.75rem] font-bold pb-3">
          <span className="text-gradient-fade">Czy to</span>{' '}
          <span className="text-gradient-yellow">dla Ciebie?</span>
        </h2>
        <p className="mt-6 text-base md:text-lg text-white/60 leading-relaxed text-balance">
          Sprawdź, czy moje rozwiązanie pasuje do Twojej sytuacji biznesowej.
        </p>
      </FadeUp>

      <Stagger className="grid lg:grid-cols-2 gap-8 md:gap-10">
        <StaggerItem>
          <div>
            <div className="mb-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-400">
                Tak, jeśli
              </span>
            </div>
            <div className="space-y-2.5">
              <Item isPositive text="Masz już klientów lub zlecenia, ale nie masz stałego sposobu na zdobywanie nowych." />
              <Item isPositive text="Masz stabilne przychody, ale utknąłeś na pewnym poziomie i chcesz przejść wyżej." />
              <Item isPositive text="Oferujesz dobre usługi (klienci Cię chwalą), ale trudno Ci zdobywać nowych klientów online." />
              <Item isPositive text="Próbowałeś reklam lub działań w internecie, ale kończyło się to stratą pieniędzy." />
              <Item isPositive text="Chcesz mieć system, który działa dla Ciebie - strona, oferta, email, proces sprzedaży - zamiast ciągle samemu szukać zleceń." />
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div>
            <div className="mb-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-rose-400/20 bg-rose-400/5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-rose-400">
                Nie, jeśli
              </span>
            </div>
            <div className="space-y-2.5">
              <Item
                isPositive={false}
                text="Twój biznes dopiero startuje i nie masz jeszcze klientów ani sprawdzonej oferty. Najpierw warto zdobyć pierwsze zlecenia i upewnić się, że Twoja usługa naprawdę działa."
              />
              <Item
                isPositive={false}
                text={
                  <>
                    Jeśli prowadzisz działalność, która ma rozbudowany dział marketingu lub zatrudniasz więcej niż 10 pracowników, to ta oferta nie jest dla Ciebie. W takiej sytuacji zapraszam do{' '}
                    <Link href="/kontakt" className="text-[#fee715] hover:text-white underline underline-offset-2 transition-colors">
                      kontaktu indywidualnego
                    </Link>
                    , aby opisać swoją sytuację.
                  </>
                }
              />
              <Item
                isPositive={false}
                text="Jeśli inwestycja rzędu kilku tysięcy złotych jest dla Ciebie zaporowa - ten model współpracy raczej nie będzie odpowiedni."
              />
            </div>
          </div>
        </StaggerItem>
      </Stagger>

      <FadeUp className="mt-16 md:mt-20 max-w-3xl mx-auto text-center">
        <p className="text-base md:text-lg text-white/70 mb-6 text-balance">
          Jeśli rozpoznajesz się w pierwszej kolumnie - prawdopodobnie mogę Ci pomóc.
        </p>
        <a
          href="https://calendly.com/drozniakstanislaw/spotkanie"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-lg cursor-pointer"
        >
          Umów darmową rozmowę
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </FadeUp>
    </div>
  </section>
);
