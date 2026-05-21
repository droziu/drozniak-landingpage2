'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { BGPattern } from '@/app/components/premium/BGPattern';
import { SectionLabel } from '@/app/components/premium/SectionLabel';
import { FadeUp, Stagger, StaggerItem } from '@/app/components/premium/Motion';
import { CinematicSection } from '@/app/components/premium/CinematicSection';
import { MouseHalo } from '@/app/components/premium/MouseHalo';

const PROBLEMS = [
  {
    title: 'Brak modułu sprzedaży biletów',
    description:
      'Poprzednia strona nie miała żadnego procesu zakupu. Fani musieli pisać wiadomości lub szukać zewnętrznych linków.',
  },
  {
    title: 'Rozproszona informacja o koncertach',
    description:
      'Daty, ceny, lokalizacje - wszystko było w innych miejscach. Nie istniała logiczna, przejrzysta lista wydarzeń.',
  },
  {
    title: 'Brak miejsca do budowania społeczności',
    description:
      'Nie było sekcji newslettera, landing page\'a do zapisów, ani sposobu na regularny kontakt z fanami.',
  },
  {
    title: 'Przestarzały design',
    description:
      'Layout nie oddawał charakteru zespołu i jakości koncertów - wyglądał zbyt oldschoolowo.',
  },
  {
    title: 'Słaba wersja mobilna',
    description:
      'Przy ponad 80% ruchu z telefonów, nawigacja była niewygodna, a strona działała wolno.',
  },
];

const SOLUTIONS = [
  {
    title: 'Kompletny system zakupu biletów',
    description:
      'Przejrzysty proces: wybór koncertu → liczba biletów → dane → płatność PayU → bilety na maila.',
  },
  {
    title: 'Przejrzysta lista koncertów',
    description:
      'Każde wydarzenie ma własną stronę z datą, miejscem, ceną, zdjęciami i mapą Google.',
  },
  {
    title: 'Moduł newslettera dla fanów',
    description:
      'Dedykowany landing page + sekcja zapisu. Opisane korzyści, prosty formularz, jasna polityka prywatności.',
  },
  {
    title: 'Nowoczesny design koncertowy',
    description:
      'Ciemne tła, czerwone akcenty, wysoko-kontrastowe CTA, zdjęcia ze sceny. Wizualnie profesjonalniej.',
  },
  {
    title: 'Projekt mobile-first',
    description:
      'Cała strona zaprojektowana z myślą o telefonach - przekłada się na świetne wyniki wydajności.',
  },
  {
    title: 'Uporządkowana struktura treści',
    description:
      'Ścieżka użytkownika jest jednoznaczna: wejście → koncerty → bilet → płatność → potwierdzenie.',
  },
];

const GALLERY = [
  { src: '/images/redlin_homepage.jpg', alt: 'Strona główna', label: 'Strona główna' },
  { src: '/images/redlin_koncerty.jpg', alt: 'Lista koncertów', label: 'Lista koncertów' },
  { src: '/images/redlin_stronakoncertu.jpg', alt: 'Strona koncertu', label: 'Strona koncertu' },
  { src: '/images/redlin_zakupbiletu.jpg', alt: 'Zakup biletu', label: 'Zakup biletu' },
  { src: '/images/redlin_newsletter.jpg', alt: 'Newsletter', label: 'Newsletter' },
  { src: '/images/phone_redlin_1.jpg', alt: 'Mobile 1', label: 'Mobile' },
  { src: '/images/phone_redlin_2.jpg', alt: 'Mobile 2', label: 'Mobile' },
  { src: '/images/phone_redlin_3.jpg', alt: 'Mobile 3', label: 'Mobile' },
  { src: '/images/phone_redlin_4.jpg', alt: 'Mobile 4', label: 'Mobile' },
  { src: '/images/phone_redlin_5.jpg', alt: 'Mobile 5', label: 'Mobile' },
];

const TECHNOLOGIES = [
  { name: 'Next.js', logo: '/images/nextjs-icon.svg' },
  { name: 'Tailwind CSS', logo: '/images/tailwind-css.svg' },
  { name: 'TypeScript', logo: '/images/typescript.svg' },
  { name: 'Vercel', logo: '/images/vercel-icon.svg' },
];

const RESULTS_DESKTOP = [
  { label: 'Wydajność', value: 99 },
  { label: 'Dostępność', value: 90 },
  { label: 'Best practices', value: 100 },
  { label: 'SEO', value: 100 },
];

const RESULTS_MOBILE = [
  { label: 'Wydajność', value: 94 },
  { label: 'Dostępność', value: 94 },
  { label: 'Best practices', value: 100 },
  { label: 'SEO', value: 100 },
];

export default function PortfolioRedlinPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isHovering) return;
    const id = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % GALLERY.length);
    }, 5500);
    return () => clearInterval(id);
  }, [isHovering]);

  const next = () => setCurrentSlide((s) => (s + 1) % GALLERY.length);
  const prev = () => setCurrentSlide((s) => (s - 1 + GALLERY.length) % GALLERY.length);

  return (
    <main className="text-white overflow-x-hidden">
      {/* HERO */}
      <section className="relative px-4 md:px-8 lg:px-12 pt-12 md:pt-20 pb-20 md:pb-24 overflow-hidden">
        <BGPattern variant="grid" mask="fade-edges" size={60} fill="rgba(255, 255, 255, 0.05)" />
        <MouseHalo />

        <div className="relative max-w-[88rem] mx-auto">
          <FadeUp whenInView={false} className="text-center max-w-4xl mx-auto">
            <SectionLabel number="CASE 01" label="Music · Tickets · Payments" align="center" />
            <h1 className="mt-7 cinematic-headline text-[clamp(2.25rem,7vw,5.5rem)] font-bold pb-3">
              Strona www dla zespołu muzycznego REDLIN
            </h1>
            <p className="mt-7 text-base md:text-lg text-white/65 leading-relaxed text-balance">
              Strona internetowa z pełnym systemem sprzedaży biletów, kalendarzem koncertów, dedykowanym newsletterem i nowoczesną oprawą wizualną - szyta na miarę pod marketing zespołu folkowego.
            </p>

            {/* Meta row */}
            <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[13px] text-white/45">
              <Meta label="Klient" value="REDLIN" />
              <Dot />
              <Meta label="Branża" value="Muzyka" />
              <Dot />
              <Meta label="Stack" value="Next.js · Vercel" />
              <Dot />
              <Meta label="Live" value="redlin.pl" />
            </div>
          </FadeUp>

          {/* Mockup */}
          <FadeUp delay={0.2} whenInView={false} className="mt-16 md:mt-24 mx-auto max-w-5xl">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-10 -z-10 rounded-[3rem] opacity-60"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(254, 231, 21, 0.18), transparent 70%)',
                  filter: 'blur(60px)',
                }}
              />
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)]">
                <img
                  src="/images/redlin_mockup_1.jpg"
                  alt="REDLIN - mockup strony"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* CLIENT + GOAL */}
      <section className="relative px-4 md:px-8 lg:px-12 py-24 md:py-36 border-t border-white/5">
        <div className="relative max-w-[88rem] mx-auto">
          <FadeUp className="max-w-3xl mb-14 md:mb-20">
            <SectionLabel number="01" label="O projekcie" />
            <h2 className="mt-7 cinematic-headline text-3xl md:text-5xl lg:text-[3.75rem] font-bold pb-3">
              Klient i cel projektu.
            </h2>
          </FadeUp>

          <Stagger className="grid md:grid-cols-2 gap-3">
            <StaggerItem>
              <InfoCard
                eyebrow="Klient"
                title="REDLIN"
                desc="Zespół folkowy koncertujący w całej Polsce. Występują na wydarzeniach biletowanych, festiwalach, imprezach plenerowych i koncertach klubowych. Budują aktywną społeczność fanów."
              />
            </StaggerItem>
            <StaggerItem>
              <InfoCard
                eyebrow="Cel"
                title="Strona, która sprzedaje bilety"
                desc="Stworzyć stronę, która ułatwia zakup biletów online, porządkuje informacje o koncertach, zachęca do zapisów do newslettera i tworzy profesjonalny, nowoczesny wizerunek zespołu."
              />
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="relative px-4 md:px-8 lg:px-12 py-24 md:py-36 border-t border-white/5">
        <div className="relative max-w-[88rem] mx-auto">
          <FadeUp className="max-w-3xl mb-14 md:mb-20">
            <SectionLabel number="02" label="Punkt wyjścia" />
            <h2 className="mt-7 cinematic-headline text-3xl md:text-5xl lg:text-[3.75rem] font-bold pb-3">
              Problemy do rozwiązania.
            </h2>
          </FadeUp>

          <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {PROBLEMS.map((p, i) => (
              <StaggerItem key={i}>
                <ProblemCard num={String(i + 1).padStart(2, '0')} title={p.title} desc={p.description} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="relative px-4 md:px-8 lg:px-12 py-24 md:py-36 border-t border-white/5">
        <div className="relative max-w-[88rem] mx-auto">
          <FadeUp className="max-w-3xl mb-14 md:mb-20">
            <SectionLabel number="03" label="Realizacja" />
            <h2 className="mt-7 cinematic-headline text-3xl md:text-5xl lg:text-[3.75rem] font-bold pb-3">
              Jak to rozwiązałem.
            </h2>
          </FadeUp>

          <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {SOLUTIONS.map((s, i) => (
              <StaggerItem key={i}>
                <SolutionCard num={String(i + 1).padStart(2, '0')} title={s.title} desc={s.description} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* GALLERY */}
      <section className="relative px-4 md:px-8 lg:px-12 py-24 md:py-36 border-t border-white/5 overflow-hidden">
        <BGPattern variant="dots" mask="fade-edges" size={28} fill="rgba(255, 255, 255, 0.05)" />
        <div className="relative max-w-[88rem] mx-auto">
          <FadeUp className="max-w-3xl mb-14 md:mb-20">
            <SectionLabel number="04" label="Galeria" />
            <h2 className="mt-7 cinematic-headline text-3xl md:text-5xl lg:text-[3.75rem] font-bold pb-3">
              Widoki z projektu.
            </h2>
          </FadeUp>

          <FadeUp className="relative">
            <div
              className="relative rounded-3xl overflow-hidden border border-white/10"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] as [number, number, number, number] }}
                  className="aspect-[16/10] bg-[#0A0E20]"
                >
                  <img
                    src={GALLERY[currentSlide].src}
                    alt={GALLERY[currentSlide].alt}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Label */}
              <div className="absolute bottom-5 left-5 glass-pill px-4 py-2 rounded-full">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#fee715]">
                  {String(currentSlide + 1).padStart(2, '0')}
                </span>
                <span className="section-pill-divider mx-2 inline-block" />
                <span className="text-[12px] text-white/80">{GALLERY[currentSlide].label}</span>
              </div>

              {/* Nav */}
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass-pill flex items-center justify-center text-white/80 hover:text-[#fee715] transition-colors cursor-pointer"
                aria-label="Poprzedni"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass-pill flex items-center justify-center text-white/80 hover:text-[#fee715] transition-colors cursor-pointer"
                aria-label="Następny"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Dot nav */}
            <div className="mt-7 flex items-center justify-center gap-2">
              {GALLERY.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                    currentSlide === i ? 'w-10 bg-[#fee715]' : 'w-1.5 bg-white/15 hover:bg-white/35'
                  }`}
                  aria-label={`Slajd ${i + 1}`}
                />
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* RESULTS */}
      <section className="relative px-4 md:px-8 lg:px-12 py-24 md:py-36 border-t border-white/5 overflow-hidden">
        <BGPattern variant="vertical-lines" mask="fade-edges" size={48} fill="rgba(255, 255, 255, 0.04)" />
        <div className="relative max-w-[88rem] mx-auto">
          <FadeUp className="max-w-3xl mb-14 md:mb-20">
            <SectionLabel number="05" label="Rezultaty" />
            <h2 className="mt-7 cinematic-headline text-3xl md:text-5xl lg:text-[3.75rem] font-bold pb-3">
              Wyniki, które mówią same za siebie.
            </h2>
          </FadeUp>

          <Stagger className="grid lg:grid-cols-2 gap-3">
            <StaggerItem>
              <ResultsBlock label="Desktop" results={RESULTS_DESKTOP} />
            </StaggerItem>
            <StaggerItem>
              <ResultsBlock label="Mobile" results={RESULTS_MOBILE} />
            </StaggerItem>
          </Stagger>

          <FadeUp className="mt-12 max-w-3xl mx-auto text-center">
            <p className="text-base md:text-lg text-white/65 leading-relaxed text-pretty">
              Dodatkowe efekty: <span className="text-white/85">uproszczony proces zakupu biletów</span>, większa konwersja dzięki przejrzystej strukturze, wyraźnie lepszy odbiór marki, wzrost zapisów do newslettera.
            </p>
            <div className="mt-8 inline-flex items-center gap-3 glass-pill px-5 py-2.5 rounded-full">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#fee715]">Źródło</span>
              <span className="section-pill-divider" />
              <span className="text-xs text-white/65">Google PageSpeed Insights</span>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* TECH */}
      <section className="relative px-4 md:px-8 lg:px-12 py-24 md:py-36 border-t border-white/5">
        <div className="relative max-w-[88rem] mx-auto">
          <FadeUp className="max-w-3xl mb-14 md:mb-20">
            <SectionLabel number="06" label="Stack" />
            <h2 className="mt-7 cinematic-headline text-3xl md:text-5xl lg:text-[3.75rem] font-bold pb-3">
              Technologie i architektura.
            </h2>
            <p className="mt-7 text-base md:text-lg text-white/65 leading-relaxed text-pretty">
              Strona zbudowana w <span className="text-white/85">Next.js</span> z SSR/SSG, optymalizacją obrazów i lekkimi komponentami. Hosting na <span className="text-white/85">Vercel</span> zapewnia natychmiastowe wdrażanie i świetną wydajność globalną.
            </p>
          </FadeUp>

          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TECHNOLOGIES.map((tech) => (
              <StaggerItem key={tech.name}>
                <div className="card surface-hover p-7 flex flex-col items-center gap-4 cursor-default">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      className="w-full h-full object-contain filter brightness-0 invert opacity-80"
                    />
                  </div>
                  <span className="text-sm text-white/85">{tech.name}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* LIVE LINK */}
      <section className="relative px-4 md:px-8 lg:px-12 py-20 md:py-28 border-t border-white/5">
        <div className="relative max-w-3xl mx-auto">
          <FadeUp className="card p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#fee715] mb-3">
                Live
              </div>
              <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white">
                Zobacz stronę na żywo
              </h3>
              <p className="mt-1 text-sm text-white/55">redlin.pl</p>
            </div>
            <a
              href="https://www.redlin.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg cursor-pointer flex-shrink-0"
            >
              Otwórz stronę
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </FadeUp>
        </div>
      </section>

      {/* CTA */}
      <CinematicSection ghost="Porozmawiajmy">
        <BGPattern variant="grid" mask="fade-edges" size={60} fill="rgba(254, 231, 21, 0.04)" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="cinematic-headline text-[clamp(2.25rem,6vw,4.5rem)] font-bold pb-3">
            Chcesz taką stronę dla siebie?
          </h2>
          <p className="mt-7 text-base md:text-lg text-white/60 leading-relaxed">
            Stwórzmy razem stronę, która działa szybko, wygląda profesjonalnie i pomaga osiągać Twoje cele biznesowe.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/strony-www#cta" className="btn btn-primary btn-lg cursor-pointer magnetic">
              Skontaktuj się ze mną
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link href="/strony-www" className="btn btn-secondary btn-lg cursor-pointer">
              Zobacz wszystkie realizacje
            </Link>
          </div>
        </div>
      </CinematicSection>
    </main>
  );
}

const Meta: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <span className="inline-flex items-center gap-2">
    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">{label}</span>
    <span className="text-white/85">{value}</span>
  </span>
);

const Dot: React.FC = () => <span className="w-1 h-1 rounded-full bg-white/15" />;

const InfoCard: React.FC<{ eyebrow: string; title: string; desc: string }> = ({ eyebrow, title, desc }) => (
  <div className="card surface-hover p-8 md:p-10 h-full">
    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#fee715] mb-5">
      {eyebrow}
    </div>
    <h3 className="text-2xl md:text-3xl font-medium tracking-[-0.025em] text-white leading-tight mb-4">
      {title}
    </h3>
    <p className="text-[15px] md:text-base text-white/60 leading-relaxed text-pretty">{desc}</p>
  </div>
);

const ProblemCard: React.FC<{ num: string; title: string; desc: string }> = ({ num, title, desc }) => (
  <div className="card surface-hover p-7 h-full">
    <div className="flex items-center justify-between mb-5">
      <span className="font-mono text-[11px] tracking-[0.18em] text-rose-400/80">{num}</span>
      <span className="w-1 h-1 rounded-full bg-rose-400/60" />
    </div>
    <h3 className="text-lg md:text-xl font-medium tracking-tight text-white leading-snug mb-3">
      {title}
    </h3>
    <p className="text-[15px] text-white/55 leading-relaxed">{desc}</p>
  </div>
);

const SolutionCard: React.FC<{ num: string; title: string; desc: string }> = ({ num, title, desc }) => (
  <div className="card surface-hover p-7 h-full">
    <div className="flex items-center justify-between mb-5">
      <span className="font-mono text-[11px] tracking-[0.18em] text-[#fee715]">{num}</span>
      <span className="w-1 h-1 rounded-full bg-[#fee715]" />
    </div>
    <h3 className="text-lg md:text-xl font-medium tracking-tight text-white leading-snug mb-3">
      {title}
    </h3>
    <p className="text-[15px] text-white/60 leading-relaxed">{desc}</p>
  </div>
);

const ResultsBlock: React.FC<{ label: string; results: { label: string; value: number }[] }> = ({
  label,
  results,
}) => (
  <div className="card p-8 md:p-10">
    <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#fee715] mb-7">
      {label} · PageSpeed Insights
    </div>
    <div className="grid grid-cols-2 gap-px bg-white/5">
      {results.map((r) => (
        <div key={r.label} className="bg-[#070A1A] p-7 flex flex-col gap-3 min-h-[160px] justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="cinematic-headline-yellow text-[3.5rem] md:text-[4.5rem] font-bold leading-none">
              {r.value}
            </span>
            <span className="text-sm font-mono text-white/35">/100</span>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
            {r.label}
          </div>
        </div>
      ))}
    </div>
  </div>
);
