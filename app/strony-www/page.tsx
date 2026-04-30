'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Background } from '@/app/components/premium/Background';
import { Eyebrow } from '@/app/components/premium/Eyebrow';
import { FadeUp, Stagger, StaggerItem } from '@/app/components/premium/Motion';
import { SectionLabel } from '@/app/components/premium/SectionLabel';
import { WordReveal } from '@/app/components/premium/WordReveal';
import { MouseHalo } from '@/app/components/premium/MouseHalo';
import { Spotlight } from '@/app/components/premium/Spotlight';
import { BGPattern } from '@/app/components/premium/BGPattern';
import { HeroShapes } from '@/app/components/premium/HeroShapes';
import { AnimatedTestimonials, type Testimonial as ATestimonial } from '@/app/components/premium/AnimatedTestimonials';

// ============================================================
// DATA
// ============================================================

const COMPANIES = [
  'Chess.com',
  'Wagento',
  'eWay Corp',
  'BigCommerce',
  'Tour & Holiday',
  'Commerce Hero',
  'Dietana',
  'Redlin',
  'Talk Commerce',
  'PASW',
  'ZEF',
  'Hotel Irys',
  'FUH Trabant',
  'ICAROS',
  'Grupa Fibra',
  'FHU Tomex',
];

const TESTIMONIALS: ATestimonial[] = [
  {
    id: 1,
    name: 'Brent Peterson',
    role: 'CEO',
    company: 'Wagento',
    avatar: '/images/c1.jpg',
    content: 'Świetna obsługa i błyskawiczny czas realizacji. Zdecydowanie polecam współpracę.',
    rating: 5,
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
    avatar: '/images/c2.jpg',
    content: 'Stanislaw is awesome! Reliable and great work.',
    rating: 5,
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
  {
    id: 6,
    name: 'Damian Lewandowski',
    content: 'Indywidualne podejście i pełen profesjonalizm.',
    rating: 5,
  },
  {
    id: 7,
    name: 'Jarosław Babiuch',
    content: 'Z niczego potrafi zrobić coś. Efekt końcowy – pozytywne zaskoczenie.',
    rating: 5,
  },
];

const FEATURES = [
  {
    title: 'Premium od pierwszego wrażenia',
    desc: 'Projektuję stronę tak, żeby od razu budowała zaufanie do Twojej marki - typografia, proporcje, hierarchia treści, detale. To standard, który podnosi wartość Twojej oferty w oczach klienta.',
  },
  {
    title: 'Treść i układ, które prowadzą do działania',
    desc: 'Struktura strony wynika z procesu decyzyjnego klienta, a nie z szablonu. Użytkownik szybko rozumie, co oferujesz, dla kogo to jest i jaki ma zrobić następny krok.',
  },
  {
    title: 'Błyskawiczne działanie na telefonie',
    desc: 'Strona ładuje się błyskawicznie i działa płynnie na telefonie, bez ciężaru typowego dla gotowych systemów. To przekłada się na większą liczbę osób, które docierają do Twojej oferty i kontaktu.',
  },
  {
    title: 'SEO na poziomie, bo masz pełną kontrolę',
    desc: 'W rozwiązaniach premium masz kontrolę nad strukturą, kodem, szybkością i każdym elementem strony. To baza pod SEO, której nie da się uzyskać w tym samym standardzie, gdy strona jest zależna od motywu i wtyczek.',
  },
  {
    title: "Gotowa na landing page'e i sprzedaż",
    desc: "Strona jest przygotowana pod rozwój marketingu: landing page'e, lead magnety, sprzedaż kursu, nowe usługi i segmenty klientów. Dzięki temu nie wracasz do punktu wyjścia przy każdej nowej inicjatywie.",
  },
  {
    title: 'Architektura klasy enterprise',
    desc: 'Buduję w podejściu i technologii stosowanej przez globalne marki, które wymagają najwyższej jakości wydajności i stabilności. To standard używany m.in. w projektach takich jak Nike, OpenAI czy Netflix Jobs.',
  },
];

const PROCESS_STEPS = [
  {
    title: 'Krótka rozmowa lub wiadomość',
    description: 'Zaczynamy od prostego kontaktu - możesz napisać lub umówić krótką rozmowę.',
    details: [
      'Na podstawie kilku pytań oceniam, czego naprawdę potrzebujesz i czy mogę pomóc.',
      'Ty mówisz, czego chcesz. Ja tłumaczę, jak możemy to osiągnąć.',
    ],
  },
  {
    title: 'Propozycja i plan projektu',
    description: 'W większości przypadków od razu mogę powiedzieć, jaki będzie koszt i jak wygląda cały proces.',
    details: [
      'Jeśli projekt jest bardziej rozbudowany lub nietypowy, w ciągu maksymalnie dwóch dni przygotowuję szczegółowy plan z zakresem, terminem i wyceną.',
      'Wiesz dokładnie, co powstanie, ile to potrwa i za ile.',
    ],
  },
  {
    title: 'Projekt i treści',
    description: 'Po akceptacji przygotowuję projekt strony dopasowany do Twojej marki.',
    details: [
      'Tworzę strukturę, treści i UX tak, aby strona nie tylko wyglądała dobrze, ale przede wszystkim działała skutecznie.',
      'Widzisz postępy i możesz wprowadzać swoje uwagi.',
    ],
  },
  {
    title: 'Kodowanie i testy',
    description: 'Po zatwierdzeniu projektu wdrażam stronę w oparciu o nowoczesne technologie.',
    details: [
      'Testuję jej szybkość, SEO i poprawne działanie na wszystkich urządzeniach.',
      'Masz pewność, że wszystko działa perfekcyjnie.',
    ],
  },
  {
    title: 'Start i wsparcie po wdrożeniu',
    description: 'Publikujemy stronę. Otrzymujesz dostęp, krótką instrukcję i 60 dni wsparcia technicznego.',
    details: [
      'Na życzenie pomagam też w podstawowej analityce i marketingu.',
      'Twoja strona działa, a Ty masz pełną kontrolę.',
    ],
  },
];

const FAQS = [
  {
    question: 'Czy to strona na WordPressie?',
    answer:
      'Nie. Nie korzystam z WordPressa ani gotowych kreatorów. Tworzę strony w oparciu o nowoczesne frameworki webowe (takie jak Next.js czy Astro) i infrastrukturę Vercel. Dzięki temu kod jest lekki, stabilny i błyskawiczny, a strona ładuje się w około 1 sekundę - bez potrzeby ciągłych aktualizacji czy martwienia się o wtyczki. WordPress to dobry wybór dla blogów, ale jeśli chcesz stronę, która sprzedaje, działa szybko i nie wymaga opieki technicznej, potrzebujesz nowoczesnego rozwiązania.',
  },
  {
    question: 'Ile to kosztuje?',
    answer:
      'Prosty landing page zaczyna się od 2500 zł netto, a większość standardowych stron mieści się w przedziale 3500–6000 zł. W tej cenie otrzymujesz stronę, która pracuje na Twoje wyniki - jest szybka, zoptymalizowana i zaprojektowana pod konwersję. Pracuję bez pośredników i zespołów projektowych - wszystko tworzę sam, od strategii po wdrożenie. Dzięki temu płacisz za jakość i skuteczność, nie za strukturę agencji i wewnętrzne koszty.',
  },
  {
    question: 'Czym Twoje strony różnią się od innych wykonawców?',
    answer:
      'Łączę marketing, design i technologię w jeden spójny proces. Nie buduję stron „na oko" - każda decyzja, od układu po kolor, wynika z wiedzy o zachowaniach użytkowników i zasadach konwersji. Mam za sobą lata doświadczenia w marketingu oraz certyfikaty m.in. z Adobe, Meta i University of California, dzięki czemu rozumiem, jak połączyć estetykę z psychologią decyzji. Dlatego moje strony nie tylko dobrze wyglądają - one po prostu działają skutecznie.',
  },
  {
    question: 'Czy będę mógł coś samodzielnie zmieniać?',
    answer:
      'Tak, otrzymasz prosty panel do edycji treści, zdjęć i nagłówków. Dodatkowo nagrywam krótką wideoinstrukcję, żebyś nie musiał zgadywać, co kliknąć. Nie zostawiam Cię z plikiem ZIP - zostawiam Ci stronę, którą faktycznie możesz obsłużyć.',
  },
  {
    question: 'Ile to trwa?',
    answer:
      'Zazwyczaj 2–4 tygodnie, w zależności od projektu i materiałów. Pracujemy etapami - najpierw strategia, potem projekt, potem wdrożenie. Wszystko widzisz i akceptujesz po drodze.',
  },
  {
    question: 'Co jeśli będę chciał coś poprawić po starcie?',
    answer:
      'W cenie masz poprawki, dopasowania i wsparcie po wdrożeniu. Nie kończę projektu w dniu publikacji - pomagam Ci ustawić wszystko tak, by strona działała w praktyce.',
  },
];

const BUDGET_OPTIONS = [
  { value: '1500-3000', label: '1500–3000 zł' },
  { value: '3000-6000', label: '3000–6000 zł' },
  { value: '6000-12000', label: '6000–12000 zł' },
  { value: '12000+', label: '12000 zł+' },
];

// ============================================================
// PAGE
// ============================================================

export default function StronyWWWPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [selectedBudget, setSelectedBudget] = useState<{ value: string; label: string }>({ value: '', label: '' });
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const budgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (budgetRef.current && !budgetRef.current.contains(e.target as Node)) {
        setIsBudgetOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const industry = formData.get('industry') as string;
    const budget = selectedBudget.value;
    const message = formData.get('message') as string;

    if (!name || !email || !industry || !budget || !message) {
      alert('Proszę wypełnić wszystkie pola formularza.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Proszę podać prawidłowy adres e-mail.');
      return;
    }

    try {
      const response = await fetch('/api/strony-www', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, industry, budget, message }),
      });

      if (!response.ok) {
        let errorMessage = 'Wystąpił błąd podczas wysyłania formularza';
        try {
          const text = await response.text();
          if (text) {
            const errorData = JSON.parse(text);
            errorMessage = errorData.error || errorMessage;
          }
        } catch {
          if (response.status === 404) {
            errorMessage = 'Endpoint API nie został znaleziony. Użyj „vercel dev" lub przetestuj na produkcji.';
          }
        }
        throw new Error(errorMessage);
      }

      const text = await response.text();
      const result = text ? JSON.parse(text) : { success: false };

      if (result.success) {
        setFormStatus('success');
        form.reset();
        setSelectedBudget({ value: '', label: '' });
        setTimeout(() => setFormStatus('idle'), 10000);
      } else {
        throw new Error('Nieoczekiwany błąd.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert(error instanceof Error ? error.message : 'Wystąpił błąd. Spróbuj ponownie.');
    }
  };

  return (
    <main className="text-white overflow-x-hidden">
      {/* ==================== HERO ==================== */}
      <section className="relative min-h-[90vh] flex flex-col justify-center px-4 md:px-8 lg:px-12 pt-12 md:pt-20 pb-16 md:pb-28 overflow-hidden">
        <HeroShapes variant="case" />

        <div className="relative w-full max-w-[88rem] mx-auto text-center">
          <FadeUp whenInView={false}>
            <div className="flex justify-center mb-9">
              <SectionLabel number="01" label="Strony internetowe" align="center" />
            </div>
          </FadeUp>

          <WordReveal
            as="h1"
            className="display-x text-[clamp(2.5rem,8.5vw,6.5rem)] text-balance"
            text="Strony internetowe dla firm i freelancerów."
            delay={0.15}
          />

          <FadeUp delay={0.7} whenInView={false}>
            <p className="mt-9 text-base md:text-lg lg:text-xl text-white/65 leading-relaxed max-w-2xl mx-auto text-balance">
              Błyskawiczne strony w jakości premium, przygotowane pod pozyskiwanie klientów. Projekt szyty na miarę.
            </p>
          </FadeUp>

          <FadeUp delay={0.85} whenInView={false}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#cta"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-primary btn-lg cursor-pointer magnetic"
              >
                Umów rozmowę 20 min
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a href="#case" className="btn btn-secondary btn-lg cursor-pointer">
                Zobacz realizacje
              </a>
            </div>
          </FadeUp>

          <FadeUp delay={1} whenInView={false}>
            <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
              Cena od 2500 zł netto
            </p>
          </FadeUp>

          <FadeUp delay={1.15} whenInView={false} className="mt-16 md:mt-24 grid sm:grid-cols-3 gap-3 max-w-5xl mx-auto">
            <KeyBenefit
              title="Wygląda profesjonalnie od pierwszej sekundy"
              desc="Strona ładuje się szybko, również na telefonie. Twoja oferta jest widoczna od razu po wejściu."
            />
            <KeyBenefit
              title="Strona, która sprzedaje, a nie tylko wygląda"
              desc="Układ, treść i wezwania do działania prowadzą klienta do kontaktu z Tobą."
            />
            <KeyBenefit
              title="Wyróżnia Cię na tle konkurencji"
              desc="Projekt dopasowany do Twojej branży i Twoich klientów - nie kolejny gotowy szablon."
            />
          </FadeUp>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <AnimatedTestimonials
        badgeText="Co mówią klienci"
        title={
          <>
            <span className="text-gradient-fade">Słowa od osób,</span>{' '}
            <span className="text-gradient-yellow">z którymi pracowałem.</span>
          </>
        }
        subtitle="Każda strona to relacja - nie tylko projekt. Oto, co o tej współpracy mówią moi klienci."
        testimonials={TESTIMONIALS}
        trustedCompanies={COMPANIES}
        trustedCompaniesTitle="Pracowałem z"
      />

      {/* ==================== CASE STUDIES ==================== */}
      <section id="case" className="relative px-4 md:px-8 lg:px-12 py-24 md:py-36 border-t border-white/5">
        <div className="relative max-w-[88rem] mx-auto">
          <FadeUp className="max-w-3xl mb-14 md:mb-20">
            <SectionLabel number="02" label="Realizacje" />
            <h2 className="mt-7 cinematic-headline text-3xl md:text-5xl lg:text-[3.75rem] font-bold pb-3">
              Wybrane projekty.
            </h2>
          </FadeUp>

          <Stagger className="grid md:grid-cols-2 gap-3">
            <StaggerItem>
              <Link
                href="/portfolio-redlin"
                className="group card surface-hover overflow-hidden block cursor-pointer h-full"
              >
                <div className="aspect-[16/10] overflow-hidden border-b border-white/8">
                  <img
                    src="/images/redlin_mockup_thumbnail.jpg"
                    alt="Strona www dla zespołu muzycznego REDLIN"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
                <div className="p-7 md:p-8">
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#fee715] mb-3">
                    Music · Tickets · Payments
                  </div>
                  <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white mb-3 group-hover:text-[#fee715] transition-colors">
                    Strona www dla zespołu muzycznego REDLIN
                  </h3>
                  <p className="text-[15px] text-white/60 leading-relaxed">
                    Kompletny, responsywny serwis koncertowy z wygodnym procesem kupowania biletów, płatnościami online i sekcjami zaprojektowanymi pod fanów.
                  </p>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-sm text-white/70 group-hover:text-[#fee715] transition-colors">
                    Zobacz case study
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </Link>
            </StaggerItem>

            <StaggerItem>
              <Link
                href="/portfolio-pasw"
                className="group card surface-hover overflow-hidden block cursor-pointer h-full"
              >
                <div className="aspect-[16/10] overflow-hidden border-b border-white/8">
                  <img
                    src="/images/pasw_mockup_thumbnail.jpg"
                    alt="Strona internetowa dla szkoły sztuk walki"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
                <div className="p-7 md:p-8">
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#fee715] mb-3">
                    Education · Local · Mobile
                  </div>
                  <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white mb-3 group-hover:text-[#fee715] transition-colors">
                    Strona internetowa dla szkoły sztuk walki
                  </h3>
                  <p className="text-[15px] text-white/60 leading-relaxed">
                    Ultraszybka, responsywna witryna z przejrzystą nawigacją, łatwym kontaktem i odświeżoną historią szkoły w formie osi czasu.
                  </p>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-sm text-white/70 group-hover:text-[#fee715] transition-colors">
                    Zobacz case study
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* ==================== FEATURES (Dlaczego warto) ==================== */}
      <section id="dlaczego-moje-strony" className="relative px-4 md:px-8 lg:px-12 py-24 md:py-36 border-t border-white/5">
        <div className="relative max-w-[88rem] mx-auto">
          <FadeUp className="max-w-3xl mb-14 md:mb-20">
            <SectionLabel number="04" label="Dlaczego warto" />
            <h2 className="mt-7 cinematic-headline text-3xl md:text-5xl lg:text-[3.75rem] font-bold pb-3">
              Sześć powodów, żeby pracować ze mną.
            </h2>
          </FadeUp>

          <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {FEATURES.map((f, i) => (
              <StaggerItem key={i}>
                <div className="card surface-hover h-full p-7 md:p-8">
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-[11px] tracking-[0.18em] text-[#fee715]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                  </div>
                  <h3 className="text-lg md:text-xl font-medium tracking-tight text-white leading-snug mb-3">
                    {f.title}
                  </h3>
                  <p className="text-[15px] text-white/60 leading-relaxed text-pretty">{f.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ==================== PROCESS ==================== */}
      <section id="process" className="relative px-4 md:px-8 lg:px-12 py-24 md:py-36 border-t border-white/5">
        <div className="relative max-w-4xl mx-auto">
          <FadeUp className="max-w-3xl mb-14 md:mb-20">
            <SectionLabel number="05" label="Krok po kroku" />
            <h2 className="mt-7 cinematic-headline text-3xl md:text-5xl lg:text-[3.75rem] font-bold pb-3">
              Od pomysłu do gotowej strony.
            </h2>
            <p className="mt-6 text-base md:text-lg text-white/60 leading-relaxed text-balance">
              Cały proces trwa zwykle 14–21 dni roboczych. Jesteśmy w stałym kontakcie - dokładnie wiesz, co dzieje się na każdym etapie.
            </p>
          </FadeUp>

          <Stagger>
            {PROCESS_STEPS.map((step, i) => (
              <StaggerItem key={i}>
                <div className="relative flex items-start gap-6 md:gap-8">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <span className="font-mono text-xs text-[#fee715] mt-1">{String(i + 1).padStart(2, '0')}</span>
                    {i < PROCESS_STEPS.length - 1 && (
                      <div
                        className="w-px flex-1 mt-3 bg-gradient-to-b from-white/15 via-white/8 to-transparent"
                        style={{ minHeight: '120px' }}
                      />
                    )}
                  </div>
                  <div className="pb-10 md:pb-14 flex-1">
                    <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-white/65 leading-relaxed text-[15px] md:text-base text-pretty mb-3">
                      {step.description}
                    </p>
                    <ul className="space-y-2 text-sm text-white/50">
                      {step.details.map((detail, di) => (
                        <li key={di} className="flex items-start gap-2.5 leading-relaxed">
                          <span className="mt-2 w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <FadeUp className="mt-12 text-center">
            <a
              href="#cta"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-primary btn-lg cursor-pointer"
            >
              Zacznij tutaj
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </FadeUp>
        </div>
      </section>

      {/* ==================== SPEED - minimal, breathing ==================== */}
      <section id="speed-performance" className="relative px-4 md:px-8 lg:px-12 py-32 md:py-48 border-t border-white/5 overflow-hidden">
        <BGPattern variant="horizontal-lines" mask="fade-edges" size={48} fill="rgba(255, 255, 255, 0.03)" />
        <div className="aurora-pulse absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[100px] pointer-events-none z-0 opacity-40" />

        <div className="relative max-w-[88rem] mx-auto">
          <FadeUp className="max-w-3xl mb-20 md:mb-28">
            <SectionLabel number="06" label="Szybkość" />
            <h2 className="mt-7 cinematic-headline text-3xl md:text-5xl lg:text-[4rem] font-bold pb-3">
              Szybkość, którą widać od razu.
            </h2>
            <p className="mt-7 text-base md:text-lg text-white/60 leading-relaxed text-balance">
              Im szybciej wyświetlisz kluczową treść, tym mniej osób rezygnuje. Projektuję strony tak, by pierwsze wrażenie było błyskawiczne i stabilne - nawet przy animacjach i zdjęciach w tle.
            </p>
          </FadeUp>

          <Stagger className="grid md:grid-cols-3 gap-px bg-white/5 border-y border-white/5">
            <StaggerItem>
              <SpeedStat
                value="1"
                unit="s"
                label="Pierwszy widok"
                desc="Moment, w którym użytkownik widzi treść - niezależnie od miejsca, urządzenia i przeglądarki."
              />
            </StaggerItem>
            <StaggerItem>
              <SpeedStat
                value="1.5"
                unit="s"
                label="Kluczowa treść"
                desc="Pełny layout gotowy do użycia. Nawet z animacjami, video i zdjęciami w tle."
              />
            </StaggerItem>
            <StaggerItem>
              <SpeedStat
                value="0.05"
                unit=""
                label="Stabilność układu"
                desc="Brak skoków podczas ładowania. Treść nie ucieka pod kursorem ani palcem."
              />
            </StaggerItem>
          </Stagger>

          <FadeUp className="mt-16 md:mt-20 max-w-3xl">
            <p className="text-base md:text-lg text-white/65 leading-relaxed text-pretty">
              Nie używam ciężkich page-builderów (<span className="text-white/85">Wix, Elementor, Squarespace</span>). Kod i zasoby ładuję selektywnie, a kluczowe elementy mają pierwszeństwo. Jeśli projekt wymaga WordPressa - realizuję go lekko (motyw na zamówienie lub headless), bez spowalniających nakładek.
            </p>
            <div className="mt-10 inline-flex items-center gap-3 glass-pill px-5 py-2.5 rounded-full">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#fee715]">Źródło</span>
              <span className="section-pill-divider" />
              <span className="text-xs text-white/65">
                Lighthouse · Desktop &middot; lighthouse-metrics.com
              </span>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section className="relative px-4 md:px-8 lg:px-12 py-24 md:py-36 border-t border-white/5">
        <div className="relative max-w-3xl mx-auto">
          <FadeUp className="text-center mb-14 md:mb-16">
            <SectionLabel number="07" label="FAQ" align="center" />
            <h2 className="mt-7 cinematic-headline text-3xl md:text-5xl lg:text-[3.75rem] font-bold pb-3">
              Masz pytania? Ja też bym miał.
            </h2>
          </FadeUp>

          <Stagger className="space-y-2">
            {FAQS.map((faq, i) => (
              <StaggerItem key={i}>
                <FAQItem
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFAQ === i}
                  onToggle={() => setOpenFAQ(openFAQ === i ? null : i)}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ==================== CONTACT - cinematic ==================== */}
      <section id="cta" className="relative px-4 md:px-8 lg:px-12 py-32 md:py-44 border-t border-white/5 overflow-hidden">
        <BGPattern variant="grid" mask="fade-edges" size={60} fill="rgba(254, 231, 21, 0.04)" />
        <div className="aurora-pulse absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[100px] pointer-events-none z-0 opacity-50" />
        <div
          aria-hidden
          className="giant-bg-text absolute -bottom-[8vh] left-1/2 -translate-x-1/2 z-0 opacity-90"
        >
          Kontakt
        </div>

        <div className="relative z-10 max-w-[88rem] mx-auto">
          <FadeUp className="text-center mb-16 md:mb-24">
            <SectionLabel number="08" label="Kontakt" align="center" />
            <h2 className="mt-7 cinematic-headline text-[clamp(2.5rem,7vw,5rem)] font-bold pb-3">
              Wybierz formę kontaktu.
            </h2>
            <p className="mt-6 text-base md:text-lg text-white/55 max-w-xl mx-auto leading-relaxed">
              20 minut online, zero zobowiązań. Albo wyślij zapytanie - odpowiadam tego samego dnia.
            </p>
          </FadeUp>

          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-6 lg:gap-10 items-start">
            {/* Channels */}
            <FadeUp className="space-y-3">
              <ContactCard
                title="Umów rozmowę 20 min"
                desc="Krótko i konkretnie."
                action="Umów rozmowę"
                href="https://calendly.com/drozniakstanislaw/spotkanie"
                external
                primary
              />
              <ContactCard
                title="Napisz maila"
                desc="Odpowiadam tego samego dnia."
                action="stanislaw@drozniak.com"
                href="mailto:stanislaw@drozniak.com"
              />
              <ContactCard
                title="Zadzwoń"
                desc="Pon–Pt 10:00–16:00"
                action="+48 792 491 196"
                href="tel:+48792491196"
              />
            </FadeUp>

            {/* Form */}
            <FadeUp delay={0.1} className="card p-6 md:p-8 lg:p-10">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#fee715] mb-2">
                Wyślij zapytanie
              </div>
              <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white mb-7">
                Powiedz mi krótko o projekcie
              </h3>

              {formStatus === 'success' ? (
                <div className="text-center py-10">
                  <div className="w-12 h-12 mx-auto mb-5 rounded-full bg-gradient-to-br from-[#FFF066] via-[#fee715] to-[#E5C800] flex items-center justify-center shadow-[0_8px_24px_-4px_rgba(254,231,21,0.4)]">
                    <svg className="w-5 h-5 text-[#0A0A0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-medium text-white mb-2">Dziękuję za kontakt</h4>
                  <p className="text-white/60 max-w-sm mx-auto">
                    Zazwyczaj odpowiadam w ciągu 24 godzin w dni robocze.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <FormField label="Imię i firma">
                    <input
                      type="text"
                      name="name"
                      required
                      className={inputClass}
                      placeholder="Jan Kowalski, Firma XYZ"
                    />
                  </FormField>

                  <FormField label="E-mail">
                    <input
                      type="email"
                      name="email"
                      required
                      className={inputClass}
                      placeholder="jan@firma.pl"
                    />
                  </FormField>

                  <FormField label="Branża">
                    <input
                      type="text"
                      name="industry"
                      required
                      className={inputClass}
                      placeholder="np. usługi prawne, gastronomia, edukacja…"
                    />
                  </FormField>

                  <FormField label="Budżet">
                    <div className="relative" ref={budgetRef}>
                      <button
                        type="button"
                        onClick={() => setIsBudgetOpen(!isBudgetOpen)}
                        className={`${inputClass} text-left flex items-center justify-between cursor-pointer ${
                          isBudgetOpen ? 'border-[#fee715]/50 ring-1 ring-[#fee715]/30' : ''
                        }`}
                      >
                        <span className={selectedBudget.value ? 'text-white' : 'text-white/40'}>
                          {selectedBudget.label || 'Wybierz budżet'}
                        </span>
                        <svg
                          className={`w-4 h-4 text-white/50 transition-transform duration-200 ${
                            isBudgetOpen ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      <AnimatePresence>
                        {isBudgetOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.18 }}
                            className="absolute z-20 w-full mt-2 glass rounded-xl p-1.5"
                          >
                            {BUDGET_OPTIONS.map((option) => (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => {
                                  setSelectedBudget(option);
                                  setIsBudgetOpen(false);
                                }}
                                className={`w-full px-3.5 py-2.5 text-left text-sm rounded-lg transition-all duration-150 cursor-pointer flex items-center justify-between ${
                                  selectedBudget.value === option.value
                                    ? 'bg-[#fee715]/10 text-[#fee715]'
                                    : 'text-white/80 hover:bg-white/5'
                                }`}
                              >
                                <span>{option.label}</span>
                                {selectedBudget.value === option.value && (
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <input type="hidden" name="budget" value={selectedBudget.value} required />
                    </div>
                  </FormField>

                  <FormField label="Cel strony">
                    <textarea
                      name="message"
                      required
                      rows={4}
                      className={`${inputClass} resize-none`}
                      placeholder="Co ma osiągnąć Twoja strona?"
                    />
                  </FormField>

                  <button type="submit" className="btn btn-primary w-full cursor-pointer">
                    Wyślij zapytanie
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>

                  <p className="text-xs text-white/40 text-center leading-relaxed">
                    Wysyłając zapytanie, akceptujesz przetwarzanie danych w celu kontaktu.{' '}
                    <a href="/polityka-prywatnosci" className="text-[#fee715] hover:opacity-80 underline underline-offset-2">
                      Polityka prywatności
                    </a>
                  </p>
                </form>
              )}
            </FadeUp>
          </div>
        </div>
      </section>
    </main>
  );
}

// ============================================================
// SUB-COMPONENTS
// ============================================================

const inputClass =
  'w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-[15px] text-white placeholder-white/40 focus:outline-none focus:border-[#fee715]/50 focus:ring-1 focus:ring-[#fee715]/30 transition-all duration-200';

const KeyBenefit: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
  <div className="card surface-hover p-6 md:p-7 h-full text-left">
    <div className="flex items-start gap-3">
      <div className="w-1.5 h-1.5 rounded-full bg-[#fee715] flex-shrink-0 mt-2.5" />
      <div className="flex-1">
        <div className="text-[15px] md:text-base font-medium text-white leading-snug">{title}</div>
        <div className="text-[13px] text-white/55 mt-2 leading-relaxed">{desc}</div>
      </div>
    </div>
  </div>
);

const SpeedStat: React.FC<{ value: string; unit: string; label: string; desc: string }> = ({
  value,
  unit,
  label,
  desc,
}) => (
  <div className="bg-[#070A1A] p-10 md:p-14 lg:p-16 flex flex-col gap-8 min-h-[320px] md:min-h-[380px]">
    <div className="flex items-baseline gap-2">
      <span className="cinematic-headline-yellow text-[5rem] md:text-[6.5rem] lg:text-[8rem] font-bold leading-none">
        {value}
      </span>
      {unit && (
        <span className="text-base md:text-lg font-mono text-white/40 tracking-tight">{unit}</span>
      )}
    </div>
    <div className="mt-auto">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#fee715] mb-3">
        {label}
      </div>
      <p className="text-sm md:text-[15px] text-white/55 leading-relaxed text-pretty">{desc}</p>
    </div>
  </div>
);

const FAQItem: React.FC<{
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ question, answer, isOpen, onToggle }) => (
  <div className={`card transition-colors duration-300 ${isOpen ? 'border-white/15' : ''}`}>
    <button
      onClick={onToggle}
      className="w-full px-6 md:px-7 py-5 md:py-6 text-left flex items-start justify-between gap-4 cursor-pointer"
      aria-expanded={isOpen}
    >
      <span className="text-base md:text-lg text-white font-medium leading-snug">{question}</span>
      <span
        className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'bg-[#fee715] text-[#0A0A0B] rotate-45' : 'bg-white/[0.04] border border-white/10 text-white/60'
        }`}
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
        </svg>
      </span>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="px-6 md:px-7 pb-6 md:pb-7 text-[15px] text-white/65 leading-relaxed text-pretty">
            {answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const ContactCard: React.FC<{
  title: string;
  desc: string;
  action: string;
  href: string;
  external?: boolean;
  primary?: boolean;
}> = ({ title, desc, action, href, external, primary }) => (
  <div className={`card surface-hover p-6 md:p-7 ${primary ? 'border-[#fee715]/30' : ''}`}>
    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-3">
      {primary ? 'Najszybciej' : 'Kontakt'}
    </div>
    <h3 className="text-lg md:text-xl font-medium tracking-tight text-white mb-2">{title}</h3>
    <p className="text-sm text-white/55 leading-relaxed mb-5">{desc}</p>
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={primary ? 'btn btn-primary cursor-pointer' : 'btn btn-secondary cursor-pointer'}
    >
      {action}
      {primary && (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      )}
    </a>
  </div>
);

const FormField: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div>
    <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">
      {label}
    </label>
    {children}
  </div>
);
