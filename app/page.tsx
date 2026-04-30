import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { FadeUp, Stagger, StaggerItem } from './components/premium/Motion';
import { Spotlight } from './components/premium/Spotlight';
import { BGPattern } from './components/premium/BGPattern';
import { CinematicSection } from './components/premium/CinematicSection';
import { AnimatedTestimonials, type Testimonial } from './components/premium/AnimatedTestimonials';
import { HeroShapes } from './components/premium/HeroShapes';

export const metadata: Metadata = {
  title: 'System pozyskiwania klientów i strony WWW dla małych firm',
  description: 'Pomagam małym firmom i freelancerom pozyskiwać klientów z internetu. Tworzę systemy pozyskiwania klientów, strony internetowe dla małych firm oraz szkolenia z AI w marketingu.',
  keywords: ['system pozyskiwania klientów', 'strony internetowe dla małych firm', 'strony www dla freelancerów', 'AI w marketingu małej firmy', 'automatyzacja marketingu', 'strategia marketingowa dla małych firm'],
  openGraph: {
    title: 'System pozyskiwania klientów i strony WWW dla małych firm',
    description: 'Pomagam małym firmom i freelancerom pozyskiwać klientów z internetu. Systemy sprzedażowe, strony WWW i szkolenia z AI.',
    url: 'https://drozniak.pl',
    images: [
      {
        url: 'https://drozniak.pl/images/Drozniak_Zdjecie_Suit_2.webp',
        width: 1200,
        height: 630,
        alt: 'Stanisław Drożniak',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'System pozyskiwania klientów i strony WWW dla małych firm',
    description: 'Pomagam małym firmom i freelancerom pozyskiwać klientów z internetu. Systemy sprzedażowe, strony WWW i szkolenia z AI.',
    images: ['https://drozniak.pl/images/Drozniak_Zdjecie_Suit_2.webp'],
  },
  alternates: { canonical: 'https://drozniak.pl' },
};

const homepageTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Brent Peterson',
    role: 'CEO',
    company: 'Wagento',
    content: 'Świetna obsługa i błyskawiczny czas realizacji. Zdecydowanie polecam współpracę.',
    rating: 5,
    avatar: '/images/c1.jpg',
  },
  {
    id: 2,
    name: 'Russell Garner',
    content: 'Stanisław trafił w dziesiątkę. Zrozumiał wizję, był zaangażowany i dowiózł efekt, który przerósł oczekiwania.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Kalen Jordan',
    role: 'Co-Founder',
    company: 'Commerce Hero',
    content: 'Stanislaw is awesome! Reliable and great work.',
    rating: 5,
    avatar: '/images/c2.jpg',
  },
  {
    id: 4,
    name: 'Michał Fus',
    content: 'Szybka realizacja, dopracowany każdy detal, pełen profesjonalizm.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Kaja Lewandowska',
    content: 'Efekt mnie zaskoczył. Z czystym sumieniem polecam współpracę.',
    rating: 5,
  },
];

const homepageCompanies = [
  'Chess.com', 'Wagento', 'eWay Corp', 'BigCommerce', 'Tour & Holiday',
  'Commerce Hero', 'Dietana', 'Redlin', 'Talk Commerce', 'PASW', 'ZEF', 'Hotel Irys',
  'ICAROS', 'Grupa Fibra', 'FHU Tomex',
];

export default function HomePage() {
  return (
    <main className="relative text-white overflow-x-hidden">
      {/* ==================== HERO - geometric shapes ==================== */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-4 md:px-8">
        <HeroShapes variant="signature" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-[88rem] mx-auto pt-12 md:pt-20">
          <Stagger className="max-w-4xl mx-auto text-center" whenInView={false}>
            <StaggerItem>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-bold mb-6 md:mb-8 tracking-[-0.04em] leading-[1.05]">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                  Pozyskuję klientów
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFF066] via-[#fee715] to-[#F59E0B] [filter:drop-shadow(0_0_32px_rgba(254,231,21,0.25))]">
                  dla małych firm i freelancerów.
                </span>
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="mt-2 md:mt-4 text-base sm:text-lg md:text-xl text-white/45 leading-relaxed font-light tracking-wide max-w-2xl mx-auto px-2 text-balance">
                Tworzę systemy sprzedażowe, strony internetowe i wdrażam AI w marketingu. Pracuję sam, bez agencji i pośredników.
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/kontakt" className="btn btn-primary btn-lg cursor-pointer magnetic">
                  Umów rozmowę 20 min
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link href="/system" className="btn btn-secondary btn-lg cursor-pointer">
                  Zobacz, co oferuję
                </Link>
              </div>
            </StaggerItem>
          </Stagger>

          {/* Companies marquee - kept, restrained, low key */}
          <FadeUp delay={1.0} whenInView={false} className="relative mt-20 md:mt-28">
            <p className="text-center text-[11px] font-mono uppercase tracking-[0.22em] text-white/30 mb-7">
              Pracowałem z
            </p>
            <div className="overflow-hidden marquee-mask">
              <div className="flex animate-scroll-infinite whitespace-nowrap">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex items-center gap-12 md:gap-16 flex-shrink-0 pr-12 md:pr-16">
                    {homepageCompanies.map((name) => (
                      <span key={`${i}-${name}`} className="text-white/35 text-sm md:text-base font-medium">
                        {name}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Top + bottom fade frame */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050714] via-[#050714]/60 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050714] via-[#050714]/60 to-transparent pointer-events-none" />
      </section>

      {/* ==================== PORTRAIT / MANIFESTO ==================== */}
      <section className="relative px-4 md:px-8 lg:px-12 py-24 md:py-40 border-t border-white/5 overflow-hidden">
        <BGPattern variant="dots" mask="fade-edges" size={28} fill="rgba(255, 255, 255, 0.05)" />
        <div className="relative max-w-[88rem] mx-auto">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_1.3fr] gap-12 lg:gap-20 items-center">
            {/* Portrait card */}
            <FadeUp className="relative max-w-md mx-auto lg:mx-0 w-full">
              <div
                aria-hidden
                className="absolute -inset-8 -z-10 rounded-[3rem] opacity-60"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(254, 231, 21, 0.15), transparent 70%)',
                  filter: 'blur(48px)',
                }}
              />
              <div className="relative rounded-[1.75rem] overflow-hidden border border-white/10 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)]">
                <Image
                  src="/images/Drozniak_photo_suit_1.webp"
                  alt="Stanisław Drożniak"
                  width={800}
                  height={1000}
                  className="w-full h-auto object-cover aspect-[4/5]"
                  priority
                  sizes="(max-width: 1024px) 90vw, 480px"
                />
                {/* Yellow corner accents */}
                <span aria-hidden className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-[#fee715]/70 rounded-tl-2xl" />
                <span aria-hidden className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-[#fee715]/70 rounded-br-2xl" />
              </div>
            </FadeUp>

            {/* Manifesto */}
            <FadeUp delay={0.1}>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#fee715] mb-5">
                Stanisław Drożniak
              </p>
              <h2 className="cinematic-headline text-3xl md:text-5xl lg:text-[3.75rem] font-bold pb-3">
                Marketing, technologia i konkretne efekty.
              </h2>
              <div className="mt-7 space-y-4 text-base md:text-lg text-white/65 leading-relaxed text-balance max-w-xl">
                <p>
                  Pomagam małym firmom i freelancerom uporządkować procesy sprzedażowe i komunikację online. Łączę strategię marketingową, design i kod w jednym spójnym procesie.
                </p>
                <p className="text-white/45 text-[15px]">
                  Pracuję sam, bez zespołów i pośredników. Twój budżet idzie w jakość, design i skuteczność.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ==================== SERVICES ==================== */}
      <section className="relative px-4 md:px-8 lg:px-12 py-24 md:py-40 border-t border-white/5 overflow-hidden">
        <BGPattern variant="diagonal-stripes" mask="fade-edges" size={32} fill="rgba(255, 255, 255, 0.03)" />
        <div className="relative max-w-[88rem] mx-auto">
          <FadeUp className="mb-14 md:mb-20 max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#fee715] mb-5">
              Co oferuję
            </p>
            <h2 className="cinematic-headline text-3xl md:text-5xl lg:text-[4rem] font-bold pb-3">
              Dwa filary, jeden wynik.
            </h2>
            <p className="mt-6 text-base md:text-lg text-white/60 leading-relaxed text-balance">
              Wybierasz osobno albo razem - w obu przypadkach budujemy coś, co sprzedaje.
            </p>
          </FadeUp>

          <Stagger className="grid lg:grid-cols-2 gap-3">
            <StaggerItem>
              <ServiceCard
                num="01"
                eyebrow="System"
                title="System pozyskiwania klientów"
                description="Analizuję wszystkie działania marketingowe: landing page, reklamy, social media, wykorzystanie AI. Na tej podstawie tworzę system, który pomaga małym firmom i freelancerom pozyskiwać nowych klientów z internetu."
                href="/system"
                cta="Zobacz, jak to działa"
              />
            </StaggerItem>
            <StaggerItem>
              <ServiceCard
                num="02"
                eyebrow="Web"
                title="Strony internetowe dla małych firm"
                description="Buduję strony www w nowoczesnych frameworkach (Next.js, Astro, Vercel). Każda powstaje od zera, dopasowana do marki, lekka, szybka i zaprojektowana pod pozyskiwanie klientów."
                href="/strony-www"
                cta="Zobacz strony internetowe"
              />
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* ==================== APPROACH (NEW) ==================== */}
      <section className="relative px-4 md:px-8 lg:px-12 py-24 md:py-40 border-t border-white/5 overflow-hidden">
        <BGPattern variant="grid" mask="fade-edges" size={64} fill="rgba(255, 255, 255, 0.04)" />
        <div className="relative max-w-[88rem] mx-auto">
          <FadeUp className="mb-14 md:mb-20 max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#fee715] mb-5">
              Jak pracuję
            </p>
            <h2 className="cinematic-headline text-3xl md:text-5xl lg:text-[4rem] font-bold pb-3">
              Cztery kroki do efektu.
            </h2>
            <p className="mt-6 text-base md:text-lg text-white/60 leading-relaxed text-balance">
              Prosty i przejrzysty proces - na każdym etapie wiesz dokładnie, co się dzieje i czego się spodziewać.
            </p>
          </FadeUp>

          <Stagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            <StaggerItem>
              <ApproachStep
                num="01"
                title="Rozmowa"
                desc="20 minut online. Słucham, zadaję pytania i oceniam, czy mogę Ci pomóc - bez nacisków sprzedażowych."
              />
            </StaggerItem>
            <StaggerItem>
              <ApproachStep
                num="02"
                title="Plan i wycena"
                desc="W ciągu 1–2 dni dostajesz plan działania, zakres i konkretną wycenę. Wiesz dokładnie, za co płacisz."
              />
            </StaggerItem>
            <StaggerItem>
              <ApproachStep
                num="03"
                title="Wdrożenie"
                desc="Pracuję samodzielnie, więc decyzje są szybkie. Widzisz postępy etapami i akceptujesz zmiany w trakcie."
              />
            </StaggerItem>
            <StaggerItem>
              <ApproachStep
                num="04"
                title="Wsparcie"
                desc="Po starcie nie znikam. Otrzymujesz instrukcje, krótką wideo­instrukcję i 60 dni wsparcia technicznego."
              />
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <AnimatedTestimonials
        badgeText="Co mówią klienci"
        title={<>Słowa od osób, z którymi pracowałem.</>}
        subtitle="Co o współpracy mówią ludzie, dla których realizowałem projekty."
        testimonials={homepageTestimonials}
        trustedCompanies={homepageCompanies}
        trustedCompaniesTitle="Pracowałem z firmami i twórcami"
      />

      {/* ==================== STATS / TRUST ==================== */}
      <section className="relative px-4 md:px-8 lg:px-12 py-24 md:py-36 border-t border-white/5 overflow-hidden">
        <BGPattern variant="vertical-lines" mask="fade-edges" size={48} fill="rgba(255, 255, 255, 0.04)" />
        <div className="relative max-w-[88rem] mx-auto">
          <FadeUp className="mb-14 md:mb-20 max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#fee715] mb-5">
              Dlaczego ze mną
            </p>
            <h2 className="cinematic-headline text-3xl md:text-5xl lg:text-[4rem] font-bold pb-3">
              Konkrety, nie obietnice.
            </h2>
          </FadeUp>

          <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border-y border-white/8">
            <StaggerItem>
              <Stat
                value="9+"
                unit="lat"
                label="Doświadczenia w marketingu, projektowaniu systemów sprzedaży i tworzeniu stron www."
              />
            </StaggerItem>
            <StaggerItem>
              <Stat
                value="24h"
                unit=""
                label="Maksymalny czas odpowiedzi na Twoją wiadomość - w dni robocze zwykle szybciej."
              />
            </StaggerItem>
            <StaggerItem>
              <Stat
                value="2-4"
                unit="tyg."
                label="Średni czas realizacji projektu - od pierwszej rozmowy do uruchomienia."
              />
            </StaggerItem>
            <StaggerItem>
              <Stat
                value="60"
                unit="dni"
                label="Wsparcia technicznego po wdrożeniu w cenie - bez ukrytych kosztów."
              />
            </StaggerItem>
          </Stagger>

          {/* Certifications row - visual proof, no fake number */}
          <FadeUp className="mt-12 md:mt-16 flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/35">
              Certyfikaty i kwalifikacje
            </span>
            <span className="hidden md:inline-block w-px h-4 bg-white/10" />
            <div className="flex flex-wrap items-center gap-3">
              {['Adobe', 'Meta', 'University of California'].map((cert) => (
                <span
                  key={cert}
                  className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-sm text-white/85"
                >
                  {cert}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ==================== FINAL CTA - cinematic ==================== */}
      <CinematicSection ghost="Porozmawiajmy" id="cta">
        <BGPattern variant="grid" mask="fade-edges" size={60} fill="rgba(254, 231, 21, 0.04)" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="cinematic-headline text-[clamp(2.5rem,8vw,5.5rem)] font-bold pb-3">
            Masz projekt, który chcesz dopracować?
          </h2>
          <p className="mt-7 text-base md:text-lg text-white/60 leading-relaxed">
            Napisz do mnie - odpowiadam w 24 godziny.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://calendly.com/drozniakstanislaw/spotkanie"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg cursor-pointer magnetic"
            >
              Umów rozmowę 20 min
            </a>
            <Link href="/kontakt" className="btn btn-secondary btn-lg cursor-pointer">
              Napisz wiadomość
            </Link>
          </div>
          <div className="mt-10 pt-8 border-t border-white/8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[12px] font-mono uppercase tracking-[0.14em] text-white/40">
            <span>20 min online</span>
            <span className="text-white/15">·</span>
            <span>Zero zobowiązań</span>
            <span className="text-white/15">·</span>
            <span>Odpowiedź w 24h</span>
          </div>
        </div>
      </CinematicSection>
    </main>
  );
}

const Meta: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <span className="inline-flex flex-col gap-1">
    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">{label}</span>
    <span className="text-white/85 font-medium text-sm">{value}</span>
  </span>
);

const ServiceCard: React.FC<{
  num: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
}> = ({ num, eyebrow, title, description, href, cta }) => (
  <Spotlight as="a" href={href} className="group card card-accent surface-hover h-full p-8 md:p-12 flex flex-col gap-7 cursor-pointer">
    <div className="flex items-start justify-between">
      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#fee715]">
        {eyebrow}
      </div>
      <span className="font-mono text-[11px] tracking-[0.18em] text-white/30">{num}</span>
    </div>

    <div className="flex-1">
      <h3 className="text-2xl md:text-4xl font-medium tracking-[-0.025em] text-white leading-[1.1]">
        {title}
      </h3>
      <p className="mt-5 text-[15px] md:text-base text-white/60 leading-relaxed text-pretty max-w-xl">
        {description}
      </p>
    </div>

    <div className="pt-5 border-t border-white/8 inline-flex items-center justify-between text-sm">
      <span className="text-white/80 group-hover:text-[#fee715] transition-colors">{cta}</span>
      <span className="text-[#fee715] transition-transform duration-300 group-hover:translate-x-1">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </span>
    </div>
  </Spotlight>
);

const ApproachStep: React.FC<{ num: string; title: string; desc: string }> = ({ num, title, desc }) => (
  <div className="card surface-hover p-7 md:p-8 h-full flex flex-col gap-5">
    <div className="flex items-center justify-between">
      <span className="font-mono text-[11px] tracking-[0.18em] text-[#fee715]">{num}</span>
      <span className="w-1 h-1 rounded-full bg-[#fee715]" />
    </div>
    <h3 className="text-xl md:text-2xl font-medium tracking-[-0.02em] text-white leading-tight">
      {title}
    </h3>
    <p className="text-[15px] text-white/60 leading-relaxed text-pretty">{desc}</p>
  </div>
);

const Stat: React.FC<{ value: string; unit: string; label: string }> = ({ value, unit, label }) => (
  <div className="bg-[#070A1A] p-7 md:p-10 flex flex-col justify-between gap-6 min-h-[220px]">
    <div className="flex items-baseline gap-1.5">
      <span className="cinematic-headline-yellow text-[3rem] md:text-[4.5rem] lg:text-[5rem] font-bold leading-none">
        {value}
      </span>
      {unit && <span className="text-sm font-mono text-white/40">{unit}</span>}
    </div>
    <p className="text-[15px] text-white/55 leading-relaxed">{label}</p>
  </div>
);
