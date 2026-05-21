'use client';

import React from 'react';
import Link from 'next/link';
import { Eyebrow } from '@/app/components/premium/Eyebrow';
import { FadeUp, Stagger, StaggerItem } from '@/app/components/premium/Motion';
import { HeroShapes } from '@/app/components/premium/HeroShapes';

export default function FreelancerLandingPage() {
  return (
    <div className="text-white overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-[88vh] flex flex-col justify-center text-center px-4 md:px-8 py-16 md:py-24 overflow-hidden">
        <HeroShapes variant="case" />
        <div className="relative w-full max-w-4xl mx-auto">
          <Stagger whenInView={false}>
            <StaggerItem>
              <Eyebrow align="center" className="mb-5">Dla freelancerów</Eyebrow>
            </StaggerItem>
            <StaggerItem>
              <h1 className="cinematic-headline text-[clamp(2.25rem,7vw,5rem)] font-bold pb-3">
                Strona, która sprzedaje Twoje usługi, <span className="text-gradient-yellow">a nie tylko ładnie wygląda.</span>
              </h1>
            </StaggerItem>
            <StaggerItem>
              <div className="mt-9 space-y-5 text-base md:text-lg text-white/65 leading-relaxed text-balance max-w-3xl mx-auto">
                <p>
                  Jako były video-editor freelancer i obecny specjalista marketingu, łączę wiedzę z obu światów, aby stworzyć strony, które nie tylko wyglądają świetnie, ale przede wszystkim{' '}
                  <span className="text-white/90">konwertują i budują Twoją ekspertyzę.</span>
                </p>
                <p className="text-white/45 text-[15px]">
                  Nie korzystam z szablonów ani gotowych motywów. Tworzę unikalne rozwiązania, które wyróżnią Cię na rynku.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="mt-10 flex flex-col items-center gap-3">
                <a
                  href="#why"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#why')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn btn-primary btn-lg cursor-pointer"
                >
                  Dlaczego to działa?
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </a>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                  Bezpłatna konsultacja &middot; 30 min &middot; Zero zobowiązań
                </p>
              </div>
            </StaggerItem>
          </Stagger>

          <FadeUp delay={0.4} whenInView={false} className="mt-20 md:mt-28">
            <p className="text-center text-[11px] font-mono uppercase tracking-[0.22em] text-white/35 mb-6">
              Współpracowałem z
            </p>
            <div className="overflow-hidden marquee-mask">
              <div className="flex animate-scroll-infinite whitespace-nowrap">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex items-center gap-12 md:gap-16 flex-shrink-0 pr-12 md:pr-16">
                    {['Designerzy', 'Programiści', 'Marketing', 'Konsultanci', 'Copywriterzy', 'Fotografowie', 'Coachowie', 'Trenerzy'].map((name) => (
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

      {/* WHY */}
      <section id="why" className="relative px-4 md:px-8 lg:px-12 py-24 md:py-36 border-t border-white/5">
        <div className="relative max-w-[88rem] mx-auto">
          <FadeUp className="max-w-3xl mb-14 md:mb-20">
            <Eyebrow>Portfolio kontra Landing</Eyebrow>
            <h2 className="mt-5 cinematic-headline text-3xl md:text-5xl lg:text-[3.75rem] font-bold pb-3">
              <span className="text-gradient-fade">Dlaczego portfolio</span>{' '}
              <span className="text-gradient-yellow">to za mało?</span>
            </h2>
            <p className="mt-6 text-base md:text-lg text-white/60 leading-relaxed text-balance">
              Większość freelancerów myśli, że portfolio wystarczy. To błąd, który kosztuje ich tysiące złotych miesięcznie.
            </p>
          </FadeUp>

          <Stagger className="grid lg:grid-cols-2 gap-8 lg:gap-10 mb-16 md:mb-20">
            <StaggerItem>
              <div>
                <div className="mb-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-rose-400/20 bg-rose-400/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-rose-400">
                    Stare portfolio
                  </span>
                </div>
                <div className="space-y-2.5">
                  <ConCard title="Pokazujesz prace">
                    To działa tylko dla klientów, którzy już Cię znają. Nowi klienci nie rozumieją, jak Twoja praca rozwiązuje ich problemy.
                  </ConCard>
                  <ConCard title="Brak ekspertyzy">
                    Klienci nie widzą, dlaczego mają wybrać właśnie Ciebie. Nie wiedzą, że jesteś ekspertem w swojej dziedzinie.
                  </ConCard>
                  <ConCard title="Słaba konwersja">
                    Odwiedzający nie wiedzą, co mają zrobić dalej. Brakuje jasnego call-to-action i procesu sprzedaży.
                  </ConCard>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div>
                <div className="mb-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#fee715]/25 bg-[#fee715]/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fee715]" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#fee715]">
                    Premium landing
                  </span>
                </div>
                <div className="space-y-2.5">
                  <ProCard title="Sprzedajesz rozwiązania">
                    Pokazujesz, jak rozwiązujesz problemy klientów. Każdy element ma na celu przekonanie ich do współpracy.
                  </ProCard>
                  <ProCard title="Budujesz ekspertyzę">
                    Pozycjonujesz się jako ekspert. Klienci widzą Twoją wiedzę, doświadczenie i unikalne podejście.
                  </ProCard>
                  <ProCard title="Wysoka konwersja">
                    Każdy odwiedzający wie, co ma zrobić. Jasny proces sprzedaży prowadzi do więcej zapytań i wyższych cen.
                  </ProCard>
                </div>
              </div>
            </StaggerItem>
          </Stagger>

          {/* Mobile optimization */}
          <FadeUp className="card p-8 md:p-12 mb-12">
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <Eyebrow align="center">Mobile-first</Eyebrow>
              <h3 className="mt-5 display-tight text-2xl md:text-3xl lg:text-4xl text-balance">
                <span className="text-gradient-fade">Perfekcyjna optymalizacja</span>{' '}
                <span className="text-gradient-yellow">mobilna.</span>
              </h3>
              <p className="mt-5 text-base md:text-lg text-white/60 leading-relaxed text-balance">
                <span className="text-white/85 font-medium">65% wszystkich odwiedzin</span> pochodzi z urządzeń mobilnych. Większość freelancerów o tym zapomina.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-rose-400 mb-4">
                  Typowe problemy
                </div>
                <ul className="space-y-2.5">
                  {['Strona nie działa na telefonie', 'Tekst za mały do czytania', 'Przyciski za małe do kliknięcia', 'Wolne ładowanie na telefonie'].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/65 text-[15px]">
                      <svg className="w-4 h-4 text-rose-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 6l12 12M18 6L6 18" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#fee715] mb-4">
                  Co otrzymujesz
                </div>
                <ul className="space-y-2.5">
                  {['Strona wygląda świetnie na każdym urządzeniu', 'Czytelny tekst i intuicyjna nawigacja', 'Przyciski dostosowane do dotyku', 'Błyskawiczne ładowanie na telefonie'].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/65 text-[15px]">
                      <svg className="w-4 h-4 text-[#fee715] mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 pt-7 border-t border-white/8 text-center">
              <p className="text-base md:text-lg italic text-white/70 max-w-2xl mx-auto text-pretty">
                "Nikt nie uważa Cię za profesjonalistę, jeśli Twoja strona wygląda źle na telefonie."
              </p>
            </div>
          </FadeUp>

          {/* Examples */}
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              {
                num: '01',
                title: 'Pierwsze wrażenie, które sprzedaje',
                desc: 'Nie „Oto moje prace", ale: „Rozwiązuję Twój problem X w sposób Y, który daje rezultat Z".',
              },
              {
                num: '02',
                title: 'Twoja metoda, która Cię wyróżnia',
                desc: 'Przejrzysty proces pokazujący, dlaczego współpraca z Tobą to gwarancja efektu. To buduje zaufanie i eliminuje wątpliwości.',
              },
              {
                num: '03',
                title: 'Dowody, które budują zaufanie',
                desc: 'Opinie klientów, liczby, case studies - twarde fakty, które potwierdzają, że jesteś ekspertem i dowozisz wyniki.',
              },
            ].map((ex) => (
              <StaggerItem key={ex.num}>
                <div className="card surface-hover p-7 h-full">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-[#fee715] mb-4 block">
                    {ex.num}
                  </span>
                  <h4 className="text-lg md:text-xl font-medium tracking-tight text-white mb-3">
                    {ex.title}
                  </h4>
                  <p className="text-[15px] text-white/60 leading-relaxed">{ex.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="relative px-4 md:px-8 lg:px-12 py-24 md:py-36 border-t border-white/5">
        <div className="relative w-full max-w-4xl mx-auto">
          <FadeUp className="max-w-3xl mb-14 md:mb-20">
            <Eyebrow>Jak to działa</Eyebrow>
            <h2 className="mt-5 cinematic-headline text-3xl md:text-5xl lg:text-[3.75rem] font-bold pb-3">
              <span className="text-gradient-fade">4 kroki do</span>{' '}
              <span className="text-gradient-yellow">premium strony.</span>
            </h2>
          </FadeUp>

          <Stagger>
            {[
              { num: '01', title: 'Analiza Twojej branży', desc: 'Rozmawiamy o Twoich klientach, konkurencji i tym, co Cię wyróżnia. To podstawa do stworzenia skutecznej strony.' },
              { num: '02', title: 'Strategia i projekt', desc: 'Tworzę strategię komunikacji i projekt strony, który będzie konwertował. Wszystko oparte na wiedzy marketingowej.' },
              { num: '03', title: 'Implementacja', desc: 'Buduję stronę z dbałością o każdy szczegół. Optymalizacja pod kątem szybkości i konwersji.' },
              { num: '04', title: 'Uruchomienie i wsparcie', desc: 'Strona idzie na żywo, a Ty otrzymujesz instrukcje jak ją aktualizować i rozwijać.' },
            ].map((step, i, arr) => (
              <StaggerItem key={step.num}>
                <div className="relative flex items-start gap-6 md:gap-8">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <span className="font-mono text-xs text-[#fee715] mt-1">{step.num}</span>
                    {i < arr.length - 1 && (
                      <div
                        className="w-px flex-1 mt-3 bg-gradient-to-b from-white/15 via-white/8 to-transparent"
                        style={{ minHeight: '80px' }}
                      />
                    )}
                  </div>
                  <div className="pb-10 md:pb-14 flex-1">
                    <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed text-[15px] md:text-base text-pretty max-w-2xl">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* PRICING COMPARISON */}
      <section id="pricing" className="relative px-4 md:px-8 lg:px-12 py-24 md:py-36 border-t border-white/5">
        <div className="relative max-w-[88rem] mx-auto">
          <FadeUp className="max-w-3xl mb-14 md:mb-20">
            <Eyebrow>Inwestycja</Eyebrow>
            <h2 className="mt-5 cinematic-headline text-3xl md:text-5xl lg:text-[3.75rem] font-bold pb-3">
              <span className="text-gradient-fade">Lepiej niż</span>{' '}
              <span className="text-gradient-yellow">agencja.</span>
            </h2>
          </FadeUp>

          <Stagger className="grid md:grid-cols-2 gap-3 mb-12">
            <StaggerItem>
              <div className="card p-7 md:p-9 h-full">
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-rose-400 mb-3">
                  Typowa agencja
                </div>
                <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-white mb-7">
                  Szablon + faktura
                </h3>
                <ul className="space-y-3 text-[15px] text-white/65">
                  {['Koszt: 3000+ PLN', 'Szablon + logo', 'Brak wiedzy marketingowej', 'Nie można zweryfikować jakości', 'Strona jak tysiące innych', '+ Koszt copywritera (1000+ PLN)', 'Słaba optymalizacja mobilna'].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-rose-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 6l12 12M18 6L6 18" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-white/8">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">
                    Razem
                  </div>
                  <div className="text-2xl md:text-3xl font-medium text-rose-300">4000+ PLN</div>
                  <div className="text-xs text-white/45 mt-1">Za szablon bez gwarancji konwersji</div>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="relative card card-accent p-7 md:p-9 h-full border-[#fee715]/30">
                <div className="absolute -top-3 left-7">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] bg-[#fee715] text-[#0A0A0B]">
                    Premium
                  </span>
                </div>
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#fee715] mb-3">
                  Moja usługa
                </div>
                <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-white mb-7">
                  Maszyna do sprzedaży
                </h3>
                <ul className="space-y-3 text-[15px] text-white/75">
                  {['Koszt: 1500–2500 PLN', 'Unikalny design', 'Wiedza marketingowa', 'Optymalizacja pod konwersję', 'Twoja strona ma unikalny design', 'Copywriting w cenie', 'Pełne wsparcie przez 60 dni po wdrożeniu'].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-[#fee715] mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-[#fee715]/15">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">
                    Razem
                  </div>
                  <div className="text-2xl md:text-3xl font-medium text-gradient-yellow">
                    1500–2500 PLN
                  </div>
                  <div className="text-xs text-white/45 mt-1">Za maszynę do sprzedaży</div>
                </div>
              </div>
            </StaggerItem>
          </Stagger>

          {/* Why */}
          <FadeUp className="card p-8 md:p-12">
            <div className="max-w-2xl mb-10">
              <Eyebrow>Skąd taka cena</Eyebrow>
              <h3 className="mt-5 display-tight text-2xl md:text-3xl lg:text-4xl text-balance">
                <span className="text-gradient-fade">Dlaczego mogę to</span>{' '}
                <span className="text-gradient-yellow">zaoferować?</span>
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { title: 'Pracuję sam', desc: 'Nie mam zespołu, biura, kosztów operacyjnych. Cały budżet idzie na jakość.' },
                { title: 'Doświadczenie z korporacjami', desc: 'Pracowałem z firmami wartymi miliony. Wiem, co sprzedaje, a co nie.' },
                { title: 'Szybkość działania', desc: 'Bez biurokracji, bez długich procesów. Stronę otrzymasz w maksymalnie 21 dni.' },
              ].map((item, i) => (
                <div key={item.title} className="card surface-hover p-6">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-[#fee715] mb-3 block">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h4 className="text-lg font-medium tracking-tight text-white mb-2">{item.title}</h4>
                  <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="relative px-4 md:px-6 py-32 md:py-44 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-dots bg-fade-radial opacity-25" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1100px] max-h-[1100px] halo-yellow opacity-80" />
        </div>

        <FadeUp className="relative max-w-3xl mx-auto text-center">
          <Eyebrow align="center">Następny krok</Eyebrow>
          <h2 className="mt-5 display-x text-[clamp(2.25rem,7vw,4.5rem)] text-balance">
            <span className="text-gradient-fade">Gotowy na</span>{' '}
            <span className="text-gradient-yellow">zmianę?</span>
          </h2>
          <p className="mt-7 text-base md:text-lg text-white/60 leading-relaxed">
            Umówmy się na bezpłatną konsultację. Porozmawiamy o Twoich potrzebach i pokażę Ci, jak może wyglądać Twoja nowa strona.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:stanislaw@drozniak.com?subject=Konsultacja - Strona dla freelancera"
              className="btn btn-primary btn-lg cursor-pointer"
            >
              Wyślij email
            </a>
            <Link href="/kontakt" className="btn btn-secondary btn-lg cursor-pointer">
              Wszystkie kanały kontaktu
            </Link>
          </div>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
            30 min &middot; Zero zobowiązań &middot; Odpowiedź w 24h
          </p>
        </FadeUp>
      </section>
    </div>
  );
}

const ConCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="card p-5 md:p-6 border-rose-400/15 hover:border-rose-400/30 transition-colors">
    <div className="flex items-center gap-3 mb-2">
      <svg className="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 6l12 12M18 6L6 18" />
      </svg>
      <h3 className="font-medium text-white text-base md:text-lg">{title}</h3>
    </div>
    <p className="text-[15px] text-white/55 leading-relaxed">{children}</p>
  </div>
);

const ProCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="card p-5 md:p-6 border-[#fee715]/20 hover:border-[#fee715]/40 transition-colors">
    <div className="flex items-center gap-3 mb-2">
      <svg className="w-4 h-4 text-[#fee715]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
      <h3 className="font-medium text-white text-base md:text-lg">{title}</h3>
    </div>
    <p className="text-[15px] text-white/55 leading-relaxed">{children}</p>
  </div>
);
