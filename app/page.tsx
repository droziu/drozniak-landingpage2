import Link from 'next/link';
import type { Metadata } from 'next';
import { HomeHero } from './components/home/HomeHero';
import { HomeMotion } from './components/home/HomeMotion';
import './components/home/home-hero.css';
import { ScopeList } from './components/home/ScopeList';
import './components/home/home-sections.css';
import { AreaIcon, type IconName } from './components/AreaIcon';
import { Tor } from './components/brand/Tor';
import { ShapeCanvas } from './components/shapes/ShapeCanvas';
import { SlantRow } from './components/shapes/SlantRow';
import type { Pt } from './components/useShapeClips';

const TITLE = 'Stanisław Drożniak | Marketing i pozyskiwanie klientów';
const DESCRIPTION =
  'Marketing i pozyskiwanie klientów dla firm: reklamy, strona, obsługa zapytań, mailing i automatyzacje planowane razem.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
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
    title: TITLE,
    description: DESCRIPTION,
    images: ['https://drozniak.pl/images/Drozniak_Zdjecie_Suit_2.webp'],
  },
  alternates: { canonical: 'https://drozniak.pl' },
};

const CLIENTS = ['Grupa Fibra', 'ICAROS', 'Bartnicky', 'SzczypoMedia', 'Commerce Hero', 'Wagento', 'Chess.com'];

const d = (n: number) => ({ ['--d' as string]: n });

// Współpraca: płótno 1000 x 520 przecięte jednym skosem; po lewej dwa jasne pola (forma
// jednorazowa i kolejność pracy), po prawej ciemne pole stałej współpracy. Szczelina 12 jednostek.
const WORK_SPACE = { w: 1000, h: 520 };
const WORK_SHAPES: Record<'a' | 'b' | 'c', Pt[]> = {
  a: [[0, 0], [413.5, 0], [527.7, 330], [0, 330]],
  c: [[0, 342], [531.9, 342], [593.5, 520], [0, 520]],
  b: [[426.5, 0], [1000, 0], [1000, 520], [606.5, 520]],
};
const WORK_STEPS = [{ label: 'Sprawdzenie' }, { label: 'Plan' }, { label: 'Wdrożenie' }, { label: '30 dni wsparcia' }];
const WORK_AREAS: { icon: IconName; label: string }[] = [
  { icon: 'ads', label: 'Reklamy' },
  { icon: 'site', label: 'Strona' },
  { icon: 'mail', label: 'Mailing' },
  { icon: 'inquiry', label: 'Zapytania' },
  { icon: 'data', label: 'Pomiar' },
];

// O mnie: lustro hero; zdjęcie po lewej z nosem w prawo, pod tekstem jasny pas z faktami.
const ABOUT_SPACE = { w: 1000, h: 620 };
const ABOUT_SHAPES: Record<'p' | 'f', Pt[]> = {
  p: [[0, 0], [440, 0], [440, 380], [500, 470], [400, 620], [0, 620]],
  f: [[506.4, 482], [1000, 482], [1000, 620], [414.4, 620]],
};
const ABOUT_FACTS: { icon: IconName; label: string }[] = [
  { icon: 'work', label: '10 lat doświadczenia' },
  { icon: 'people', label: 'Ponad 100 klientów' },
];

export default function HomePage() {
  return (
    <main id="hp-root" className="hp">
      <HomeMotion rootId="hp-root" />

      {/* Hero */}
      <section className="hph site-wrap" aria-labelledby="hp-title">
        <HomeHero>
          <h1 id="hp-title" className="hp-name">
            Stanisław Drożniak
          </h1>
          <div className="hph-copy">
            <p className="hp-hero-role">Marketing i pozyskiwanie klientów dla firm</p>
            <p className="hp-body">
              Planuję i prowadzę wszystkie części marketingu firmy: reklamy, stronę, obsługę zapytań i automatyzacje.
            </p>
            <div className="hph-actions">
              <Link href="/umow" className="site-btn site-btn-accent">
                Umów rozmowę
              </Link>
            </div>
          </div>
        </HomeHero>
      </section>

      {/* Klienci */}
      <section className="hp-section site-wrap" aria-labelledby="hp-clients">
        <div className="hpc">
          <div className="hpc-head">
            <h2 id="hp-clients" className="hp-h2" data-reveal>
              Z kim pracuję
            </h2>
            <p className="hp-body" data-reveal style={d(1)}>
              Klienci z&nbsp;wielu branż: usługi lokalne, nieruchomości, turystyka, B2B i&nbsp;sklepy internetowe.
              Pracowałem już m.in. z&nbsp;firmami:
            </p>
          </div>
          <ul className="hpc-names">
            {CLIENTS.map((c, i) => (
              <li key={c} data-reveal style={d(i % 4)}>
                <span className="hpc-chip">
                  <span className="hpc-chip-text" translate="no">
                    {c}
                  </span>
                </span>
              </li>
            ))}
            <li data-reveal style={d(3)}>
              <span className="hpc-chip hpc-chip-total">
                <span className="hpc-chip-text">Łącznie ponad 100 klientów</span>
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Współpraca */}
      <section id="wspolpraca" className="hp-section site-wrap" aria-labelledby="hp-work" style={{ paddingTop: 0 }}>
        <div className="hpw">
          <div className="hpw-head">
            <h2 id="hp-work" className="hp-h2" data-reveal>
              Jak wygląda współpraca
            </h2>
            <p className="hp-body" data-reveal style={d(1)}>
              Zaczynam od sprawdzenia, jak firma pozyskuje klientów dziś. Potem układam plan dopasowany do branży:
              czasem najwięcej da nowa kampania, czasem szybsza odpowiedź na zapytania.
            </p>
          </div>
          <ShapeCanvas className="hpw-canvas" shapes={WORK_SHAPES} space={WORK_SPACE} media="(min-width: 1100px)">
            <div className="hpw-field hpw-c">
              <Tor steps={WORK_STEPS} current={0} className="hpw-road" aria-label="Kolejność pracy przy wdrożeniu" />
            </div>
            <div className="hpw-field hpw-a">
              <div className="hpw-inner" data-reveal>
                <h3 className="hpw-h3">Jednorazowo</h3>
                <p className="hpw-text">Ustawiam system pozyskiwania klientów i&nbsp;przez 30 dni pilnuję, żeby działał.</p>
                <Link href="/system-pozyskiwania-klientow" className="site-btn site-btn-line hpw-btn-a">
                  Zobacz ofertę
                </Link>
              </div>
            </div>
            <div className="hpw-field hpw-b">
              <div className="hpw-inner" data-reveal style={d(1)}>
                <ul className="hpw-areas" aria-label="Co prowadzę co miesiąc">
                  {WORK_AREAS.map((a) => (
                    <li key={a.label} className="hpw-area">
                      <AreaIcon name={a.icon} size={24} />
                      {a.label}
                    </li>
                  ))}
                </ul>
                <div className="hpw-b-text">
                  <h3 className="hpw-h3">Stała współpraca</h3>
                  <p className="hpw-text">Prowadzę cały marketing firmy co miesiąc, za stałą opłatą.</p>
                  <Link href="/prowadzenie-marketingu" className="site-btn site-btn-line hpw-btn">
                    Zobacz ofertę
                  </Link>
                </div>
              </div>
            </div>
          </ShapeCanvas>
        </div>
      </section>

      {/* Co biorę pod uwagę */}
      <section className="hp-section site-wrap" aria-labelledby="hp-scope" style={{ paddingTop: 0 }}>
        <ScopeList
          head={
            <>
              <h2 id="hp-scope" className="hp-h2">
                Co biorę pod uwagę
              </h2>
              <p className="hp-body">
                Każda z tych rzeczy wpływa na to, ile firma zarabia, dlatego żadnej nie planuję osobno.
              </p>
            </>
          }
        />
      </section>

      {/* Szkolenia */}
      <section className="hp-section site-wrap" aria-labelledby="hp-training" style={{ paddingTop: 0 }}>
        <SlantRow className="hpt" k={0.34}>
          <div className="hpt-main" data-reveal>
            <h2 id="hp-training" className="hpt-title">
              Szkolenia
            </h2>
            <p className="hp-body">
              Prowadzę też szkolenia dla zespołów i&nbsp;pracuję z&nbsp;działami marketingu w&nbsp;większych firmach.
            </p>
          </div>
          <div className="hpt-go" data-reveal style={d(1)}>
            <Link href="/szkolenia" className="site-btn site-btn-line">
              Zobacz szkolenia
            </Link>
          </div>
        </SlantRow>
      </section>

      {/* O mnie */}
      <section id="o-mnie" className="hp-section site-wrap" aria-labelledby="hp-about" style={{ paddingTop: 0 }}>
        <ShapeCanvas className="hpa" shapes={ABOUT_SHAPES} space={ABOUT_SPACE}>
          <figure className="hpa-field hpa-photo">
            <img src="/images/home/portret-omnie.jpg" srcSet="/images/home/portret-omnie-600.jpg 600w, /images/home/portret-omnie.jpg 900w" sizes="(min-width: 960px) 50vw, 100vw" alt="Stanisław Drożniak" width={900} height={900} loading="lazy" />
          </figure>
          <div className="hpa-body">
            <h2 id="hp-about" className="hp-h2" data-reveal>
              O mnie
            </h2>
            <div className="hpa-text" data-reveal style={d(1)}>
              <p>
                Zajmuję się marketingiem i&nbsp;pozyskiwaniem klientów. Pracowałem z&nbsp;dużymi międzynarodowymi
                firmami, ale też z&nbsp;większymi i&nbsp;mniejszymi firmami w&nbsp;Polsce, często z&nbsp;właścicielami
                jednoosobowych działalności.
              </p>
              <p>Zaczynałem jako nauczyciel szachów i&nbsp;freelancer, więc pierwszych klientów pozyskiwałem sam.</p>
            </div>
          </div>
          <div className="hpa-field hpa-strip">
            <ul className="hpa-facts" data-reveal style={d(2)}>
              {ABOUT_FACTS.map((f) => (
                <li key={f.label} className="hpa-fact">
                  <AreaIcon name={f.icon} size={24} />
                  {f.label}
                </li>
              ))}
            </ul>
          </div>
        </ShapeCanvas>
      </section>
    </main>
  );
}
