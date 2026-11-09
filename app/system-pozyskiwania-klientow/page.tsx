import Link from 'next/link';
import { HomeMotion } from '../components/home/HomeMotion';
import { AreaIcon, type IconName } from '../components/AreaIcon';
import { ShapeCanvas } from '../components/shapes/ShapeCanvas';
import { SlantRow } from '../components/shapes/SlantRow';
import type { Pt } from '../components/useShapeClips';
import { Examples, type Example } from '../prowadzenie-marketingu/Examples';
import { HeroCanvas, type PathStep } from '../prowadzenie-marketingu/HeroCanvas';
import { OrbitScene, type OrbitArea } from '../prowadzenie-marketingu/OrbitScene';
import '../prowadzenie-marketingu/prowadzenie-sekcje.css';

/**
 * Jednorazowe wdrożenie systemu pozyskiwania klientów. Siostra /prowadzenie-marketingu:
 * te same komponenty i style (prefiksy hmh, hmw, hmz, hmst, hmr), inna treść.
 */

// Oś w hero: części systemu, które ustawiam razem
const PATH: PathStep[] = [
  { icon: 'offer', label: 'Oferta' },
  { icon: 'film', label: 'Kreacje' },
  { icon: 'ads', label: 'Reklama' },
  { icon: 'site', label: 'Strona' },
  { icon: 'inquiry', label: 'Zapytanie' },
  { icon: 'auto', label: 'Automatyzacja' },
];

const ORBIT: OrbitArea[] = [
  { icon: 'offer', label: 'Oferta' },
  { icon: 'text', label: 'Teksty' },
  { icon: 'film', label: 'Filmy' },
  { icon: 'ads', label: 'Reklamy' },
  { icon: 'site', label: 'Landing' },
  { icon: 'inquiry', label: 'Zapytania' },
  { icon: 'auto', label: 'Automatyzacje' },
  { icon: 'data', label: 'Pomiar' },
];

const BENEFITS = [
  'Jeden projekt z jasnym zakresem, terminem i ceną',
  'Gotowe kreacje, kampanie i automatyzacje',
  'Pokazuję, jak działa każda część systemu',
  '30 dni wsparcia po uruchomieniu',
];

const PARTS: { icon: IconName; title: string; text: string }[] = [
  { icon: 'search', title: 'Plan na start', text: 'Przegląd reklam, strony i konkurencji, a z niego plan kampanii.' },
  { icon: 'offer', title: 'Oferta', text: 'Dopracowana oferta i prosty sposób, żeby ją pokazać w reklamie.' },
  { icon: 'film', title: 'Kreacje', text: 'Teksty, grafiki, filmy i animacje, także z nagrań, które firma już ma.' },
  { icon: 'ads', title: 'Kampanie', text: 'Reklamy w Meta i Google skierowane do ludzi, którzy mogą kupić.' },
  { icon: 'site', title: 'Formularz i strona', text: 'Formularz z pytaniami o zlecenie, a gdy trzeba, strona pod ofertę.' },
  { icon: 'inquiry', title: 'Obsługa zapytań', text: 'Zapytanie od razu trafia do firmy, a w prostej bazie widać, co się z nim dzieje.' },
  { icon: 'auto', title: 'Automatyzacje', text: 'Powiadomienia, odpowiedzi do klienta i maile działają bez ręcznej pracy.' },
  { icon: 'data', title: 'Pomiar', text: 'Wiadomo, z której reklamy przyszło zapytanie i które skończyło się sprzedażą.' },
];

const PART_ROWS = [PARTS.slice(0, 2), PARTS.slice(2, 5), PARTS.slice(5)];

const EXAMPLES: Example[] = [
  {
    id: 'uslugi',
    tab: 'Firma usługowa',
    tasks: [
      { icon: 'ads', text: 'Reklamy na konkretną usługę' },
      { icon: 'film', text: 'Filmy z realizacji' },
      { icon: 'site', text: 'Formularz z pytaniami o zlecenie' },
      { icon: 'target', text: 'Zapytania tylko z Twojego regionu' },
      { icon: 'phone', text: 'Powiadomienie od razu po zapytaniu' },
    ],
  },
  {
    id: 'sklep',
    tab: 'Sklep internetowy',
    tasks: [
      { icon: 'data', text: 'Pomiar zakupów w sklepie' },
      { icon: 'shop', text: 'Katalog produktów w reklamach' },
      { icon: 'film', text: 'Krótkie filmy o produktach' },
      { icon: 'ads', text: 'Kampania sprzedażowa' },
      { icon: 'money', text: 'Wyniki liczone na prawdziwych zamówieniach' },
    ],
  },
  {
    id: 'b2b',
    tab: 'Firma B2B',
    tasks: [
      { icon: 'target', text: 'Kampanie do wybranych branż' },
      { icon: 'site', text: 'Formularz, który odsiewa przypadkowe osoby' },
      { icon: 'auto', text: 'Zapytanie od razu w CRM' },
      { icon: 'mail', text: 'Automatyczna pierwsza odpowiedź' },
      { icon: 'phone', text: 'Zadanie „pierwszy telefon” dla handlowca' },
    ],
  },
];

const STEPS: { icon: IconName; title: string; text: string }[] = [
  { icon: 'inquiry', title: 'Rozmowa', text: 'Poznaję firmę, ofertę i to, skąd dziś przychodzą klienci.' },
  { icon: 'plan', title: 'Plan i wycena', text: 'Plan na start i kilka wariantów zakresu, każdy z ceną.' },
  { icon: 'film', title: 'Przygotowanie', text: 'Pomiar, formularz, kreacje, kampanie i automatyzacje.' },
  { icon: 'launch', title: 'Uruchomienie', text: 'Włączam system i pokazuję, jak działa każda część.' },
  { icon: 'calendar', title: '30 dni wsparcia', text: 'Sprawdzam wyniki po tygodniu i po dwóch, poprawiam, co trzeba.' },
];

const TERMS: { icon: IconName; label: string; value: string }[] = [
  { icon: 'money', label: 'Rozliczenie', value: 'Jednorazowo, za projekt' },
  { icon: 'calendar', label: 'Wsparcie', value: '30 dni po starcie' },
  { icon: 'repeat', label: 'Potem', value: 'Sam albo ze mną' },
];

// Na czym polega: ten sam układ co na stronie stałej współpracy (płótno 1000 x 620, skos)
const ABOUT_SPACE = { w: 1000, h: 620 };
const ABOUT_SHAPES: Record<'o' | 't', Pt[]> = {
  o: [[0, 0], [553.5, 0], [429.5, 620], [0, 620]],
  t: [[492.1, 372], [1000, 372], [1000, 620], [442.5, 620]],
};

const ArrowIcon = () => (
  <svg className="site-btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Jednoliterowe spójniki i przyimki nie zostają na końcu wiersza
const nb = (s: string) => s.replace(/(^|\s)([aiouwzAIOUWZ])\s/g, '$1$2 ');

const d = (n: number) => ({ ['--d' as string]: n });

export default function SystemPozyskiwaniaPage() {
  return (
    <main id="hm-root" className="hm">
      <HomeMotion rootId="hm-root" />

      {/* Hero */}
      <section className="hmh site-wrap" aria-labelledby="hm-title">
        <HeroCanvas
          steps={PATH}
          pathTitle={<>Wszystkie części systemu ustawiam razem</>}
          tile={{ big: '30 dni wsparcia', small: 'po uruchomieniu systemu' }}
        >
          <h1 id="hm-title" className="hmh-title">
            Pozyskiwanie klientów
          </h1>
          <div className="hmh-copy">
            <p className="hp-body">
              Jednorazowo ustawiam w&nbsp;firmie system: ofertę, reklamy z&nbsp;kreacjami i&nbsp;automatyczną obsługę
              zapytań. Po uruchomieniu przez 30 dni pilnuję, żeby wszystko działało.
            </p>
            <div className="hmh-actions">
              <Link href="/umow" className="site-btn site-btn-accent">
                Umów rozmowę
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </HeroCanvas>
      </section>

      {/* Na czym polega */}
      <section className="hp-section site-wrap" aria-labelledby="hm-about">
        <ShapeCanvas className="hmw" shapes={ABOUT_SHAPES} space={ABOUT_SPACE}>
          <div className="hmw-field hmw-o">
            <div className="hmw-orbit" data-reveal style={d(1)}>
              <OrbitScene areas={ORBIT} />
            </div>
          </div>
          <div className="hmw-text">
            <h2 id="hm-about" className="hp-h2" data-reveal>
              Na czym polega wdrożenie
            </h2>
            <p className="hm-statement" data-reveal style={d(1)}>
              Ludzie widzą ofertę w&nbsp;reklamie, zostawiają zapytanie, a&nbsp;ono od razu trafia do firmy.
            </p>
          </div>
          <div className="hmw-field hmw-t">
            <ul className="hm-benefits" data-reveal style={d(2)}>
              {BENEFITS.map((b) => (
                <li key={b} className="hm-benefit">
                  <span className="hm-benefit-check" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {nb(b)}
                </li>
              ))}
            </ul>
          </div>
        </ShapeCanvas>
      </section>

      {/* Części systemu */}
      <section id="zakres" className="site-wrap" aria-labelledby="hm-scope">
        <div className="hmz">
          {PART_ROWS.map((row, r) => (
            <SlantRow key={r} className="hmz-row" k={0.2}>
              {r === 0 && (
                <div className="hmz-head">
                  <h2 id="hm-scope" className="hp-h2" data-reveal>
                    Z czego składa się system
                  </h2>
                  <p className="hp-body" data-reveal style={d(1)}>
                    Najczęściej z&nbsp;tych części. Zakres ustalamy pod firmę, nie z&nbsp;gotowego pakietu.
                  </p>
                </div>
              )}
              {row.map((s, i) => (
                <div key={s.title} className="hmz-item" data-reveal style={d(i + (r === 0 ? 1 : 0))}>
                  <div className="hmz-item-top">
                    <span className="hmz-icon" aria-hidden="true">
                      <AreaIcon name={s.icon} size={24} />
                    </span>
                    <h3 className="hmz-h3">{nb(s.title)}</h3>
                  </div>
                  <p className="hmz-text">{nb(s.text)}</p>
                </div>
              ))}
            </SlantRow>
          ))}
        </div>
      </section>

      {/* Branże */}
      <section className="hp-section site-wrap" aria-labelledby="hm-examples">
        <Examples
          examples={EXAMPLES}
          head={
            <div className="hm-examples-head">
              <h2 id="hm-examples" className="hp-h2" data-reveal>
                System w&nbsp;różnych branżach
              </h2>
              <p className="hp-body" data-reveal style={d(1)}>
                Sklep potrzebuje innego systemu niż firma usługowa. Tak mogą wyglądać trzy przykłady.
              </p>
            </div>
          }
        />
      </section>

      {/* Przebieg */}
      <section className="hp-section site-wrap" aria-labelledby="hm-steps" style={{ paddingTop: 0 }}>
        <div className="hmst">
          <h2 id="hm-steps" className="hp-h2" data-reveal>
            Jak przebiega wdrożenie
          </h2>
          <SlantRow as="ol" className="hmst-row" kind="chevron" k={0.1} media="(min-width: 1200px)">
            {STEPS.map((s, i) => (
              <li key={s.title} className="hmst-step" data-reveal style={{ ...d(i + 1), ['--i' as string]: i }}>
                <span className="hmst-icon" data-ui aria-hidden="true">
                  <AreaIcon name={s.icon} size={24} />
                  <span className="hmst-on">
                    <AreaIcon name={s.icon} size={24} />
                  </span>
                </span>
                <h3 className="hm-h3">{nb(s.title)}</h3>
                <p className="hmst-text">{nb(s.text)}</p>
              </li>
            ))}
          </SlantRow>
        </div>
      </section>

      {/* Rozliczenie i dalsza współpraca */}
      <section className="hp-section site-wrap" aria-labelledby="hm-terms" style={{ paddingTop: 0 }}>
        <SlantRow className="hmr" k={0.12}>
          <div className="hmr-body" data-flat>
            <h2 id="hm-terms" className="hp-h2" data-reveal>
              Rozliczenie i&nbsp;dalsza współpraca
            </h2>
            <SlantRow as="dl" className="hmr-facts" k={0.3}>
              {TERMS.map((t, i) => (
                <div key={t.label} className="hmr-fact" data-reveal style={d(i + 1)}>
                  <span className="hmr-fact-icon" aria-hidden="true">
                    <AreaIcon name={t.icon} size={22} />
                  </span>
                  <dt className="hp-fact-label">{t.label}</dt>
                  <dd className="hp-fact-value">{t.value}</dd>
                </div>
              ))}
            </SlantRow>
            <div className="hm-terms-text" data-reveal style={d(2)}>
              <p>
                Cena zależy od tego, z&nbsp;ilu części składa się system, jak bardzo jest złożony i&nbsp;jakiego budżetu
                reklamowego potrzebuje. Po rozmowie dostajesz plan na start i&nbsp;kilka wariantów zakresu, każdy z&nbsp;ceną
                i&nbsp;terminem.
              </p>
              <p>
                Po 30 dniach możesz prowadzić system sam. Jeśli wolisz oddać to komuś, przechodzimy na{' '}
                <Link href="/prowadzenie-marketingu" className="site-link">
                  stałą współpracę
                </Link>
                , w&nbsp;której co miesiąc prowadzę cały marketing firmy.
              </p>
            </div>
            <div data-reveal style={d(3)}>
              <Link href="/umow" className="site-btn site-btn-ink">
                Umów rozmowę
                <ArrowIcon />
              </Link>
            </div>
          </div>
          <figure className="hmr-photo" data-reveal>
            <img src="/images/home/portret-omnie.jpg" srcSet="/images/home/portret-omnie-600.jpg 600w, /images/home/portret-omnie.jpg 900w" sizes="(min-width: 960px) 40vw, 100vw" alt="Stanisław Drożniak" width={900} height={900} loading="lazy" />
          </figure>
        </SlantRow>
      </section>
    </main>
  );
}
