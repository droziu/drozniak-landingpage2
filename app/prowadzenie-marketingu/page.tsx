import Link from 'next/link';
import { HomeMotion } from '../components/home/HomeMotion';
import { Examples } from './Examples';
import { HeroCanvas } from './HeroCanvas';
import { AreaIcon, type IconName } from '../components/AreaIcon';
import { OrbitScene } from './OrbitScene';
import { ShapeCanvas } from '../components/shapes/ShapeCanvas';
import { SlantRow } from '../components/shapes/SlantRow';
import type { Pt } from '../components/useShapeClips';
import './prowadzenie-sekcje.css';

const BENEFITS = [
  'Jeden plan dla reklam, strony i maili',
  'Jedna osoba odpowiada za wynik',
  'Zwykle taniej niż zespół albo kilka agencji',
  'Bez kosztów zatrudnienia i rekrutacji',
];

const SCOPE: { icon: IconName; title: string; text: string }[] = [
  { icon: 'ads', title: 'Reklamy i kreacje', text: 'Kampanie w Meta i Google, grafiki i filmy do reklam.' },
  { icon: 'text', title: 'Teksty i oferta', text: 'Opis oferty, cennik, teksty na stronę i do maili.' },
  { icon: 'site', title: 'Strona i landingi', text: 'Zmiany na stronie, strony pod oferty, nowa strona, gdy trzeba.' },
  { icon: 'mail', title: 'Mailing', text: 'Newsletter i maile wysyłane automatycznie.' },
  { icon: 'inquiry', title: 'Zapytania i sprzedaż', text: 'Kto odpowiada, po jakim czasie i co dzieje się dalej.' },
  { icon: 'auto', title: 'Automatyzacje', text: 'Mniej ręcznej pracy w zespole, także dzięki AI.' },
  { icon: 'data', title: 'Pomiar i analiza', text: 'Skąd przychodzą klienci i gdzie przesunąć budżet.' },
  { icon: 'social', title: 'Media społecznościowe', text: 'Grafiki, krótkie filmy i teksty do postów.' },
  { icon: 'film', title: 'Animacje i filmy', text: 'Animacje do reklam i montaż nagrań firmy.' },
];

const SCOPE_ROWS = [SCOPE.slice(0, 2), SCOPE.slice(2, 5), SCOPE.slice(5)];

// Na czym polega: płótno 1000 x 620 przecięte skosem; scena w ciemnym polu po lewej,
// korzyści w jasnym polu pod tekstem po prawej. Szczelina 12 jednostek.
const ABOUT_SPACE = { w: 1000, h: 620 };
const ABOUT_SHAPES: Record<'o' | 't', Pt[]> = {
  o: [[0, 0], [553.5, 0], [429.5, 620], [0, 620]],
  t: [[492.1, 372], [1000, 372], [1000, 620], [442.5, 620]],
};

const TERMS: { icon: IconName; label: string; value: string }[] = [
  { icon: 'money', label: 'Opłata', value: 'Stała, co miesiąc' },
  { icon: 'calendar', label: 'Umowa', value: 'Minimum 3 miesiące' },
  { icon: 'sliders', label: 'Zakres', value: 'Do zmiany w trakcie' },
];

const STEPS: { icon: IconName; title: string; text: string }[] = [
  { icon: 'inquiry', title: 'Rozmowa', text: 'Poznaję firmę i to, skąd dziś przychodzą klienci.' },
  { icon: 'search', title: 'Analiza', text: 'Przeglądam reklamy, stronę, maile i obsługę zapytań.' },
  { icon: 'plan', title: 'Plan', text: 'Plan na pierwsze miesiące, zakres i cena. Podpisujemy umowę.' },
  { icon: 'launch', title: 'Pierwszy miesiąc', text: 'Porządkuję pomiar i zaczynam od najważniejszych zmian.' },
  { icon: 'repeat', title: 'Kolejne miesiące', text: 'Prowadzę marketing, a zakres zmieniamy, gdy trzeba.' },
];

const ArrowIcon = () => (
  <svg className="site-btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Jednoliterowe spójniki i przyimki nie zostają na końcu wiersza
const nb = (s: string) => s.replace(/(^|\s)([aiouwzAIOUWZ])\s/g, '$1$2 ');

const d = (n: number) => ({ ['--d' as string]: n });

export default function ProwadzenieMarketinguPage() {
  return (
    <main id="hm-root" className="hm">
      <HomeMotion rootId="hm-root" />

      {/* Hero */}
      <section className="hmh site-wrap" aria-labelledby="hm-title">
        <HeroCanvas>
          <h1 id="hm-title" className="hmh-title">
            Prowadzenie marketingu firmy
          </h1>
          <div className="hmh-copy">
            <p className="hp-body">
              Reklamy, oferta, strona, maile, obsługa zapytań i&nbsp;pomiar u&nbsp;jednej osoby. Za całość płacisz stałą
              kwotę co miesiąc.
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

      {/* Na czym polega: lustro hero, ciemne pole ze sceną po lewej, korzyści w jasnym polu pod tekstem */}
      <section className="hp-section site-wrap" aria-labelledby="hm-about">
        <ShapeCanvas className="hmw" shapes={ABOUT_SHAPES} space={ABOUT_SPACE}>
          <div className="hmw-field hmw-o">
            <div className="hmw-orbit" data-reveal style={d(1)}>
              <OrbitScene />
            </div>
          </div>
          <div className="hmw-text">
            <h2 id="hm-about" className="hp-h2" data-reveal>
              Na czym polega współpraca
            </h2>
            <p className="hm-statement" data-reveal style={d(1)}>
              Planuję marketing firmy, wykonuję go i&nbsp;pilnuję, żeby wszystkie części działały razem.
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

      {/* Zakres: pola w trzech rzędach zazębione skosami, w pierwszym ciemne pole z nagłówkiem */}
      <section id="zakres" className="site-wrap" aria-labelledby="hm-scope">
        <div className="hmz">
          {SCOPE_ROWS.map((row, r) => (
            <SlantRow key={r} className="hmz-row" k={0.2}>
              {r === 0 && (
                <div className="hmz-head">
                  <h2 id="hm-scope" className="hp-h2" data-reveal>
                    Zakres pracy
                  </h2>
                  <p className="hp-body" data-reveal style={d(1)}>
                    Wszystkie obszary albo wybrane z&nbsp;nich, zależnie od ustaleń.
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

      {/* Przykłady */}
      <section className="hp-section site-wrap" aria-labelledby="hm-examples">
        <Examples
          head={
            <div className="hm-examples-head">
              <h2 id="hm-examples" className="hp-h2" data-reveal>
                Przykładowe zakresy współpracy
              </h2>
              <p className="hp-body" data-reveal style={d(1)}>
                Tak może wyglądać miesiąc pracy w&nbsp;trzech rodzajach firm.
              </p>
            </div>
          }
        />
      </section>

      {/* Start: pięć kroków jako strzałki zazębione jedna w drugą */}
      <section className="hp-section site-wrap" aria-labelledby="hm-steps" style={{ paddingTop: 0 }}>
        <div className="hmst">
          <h2 id="hm-steps" className="hp-h2" data-reveal>
            Jak wygląda start
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

      {/* Rozliczenie: tekst i warunki po lewej, zdjęcie ze skosem po prawej */}
      <section className="hp-section site-wrap" aria-labelledby="hm-terms" style={{ paddingTop: 0 }}>
        <SlantRow className="hmr" k={0.12}>
          <div className="hmr-body" data-flat>
            <h2 id="hm-terms" className="hp-h2" data-reveal>
              Rozliczenie i&nbsp;umowa
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
                Wysokość opłaty zależy od zakresu, więc podaję ją po rozmowie. Zakres można zwiększyć albo zmniejszyć,
                na przykład przed sezonem.
              </p>
              <p>
                To jedyna forma współpracy, przy której podpisuję umowę. Odpowiadam wtedy za marketing całej firmy
                i&nbsp;poświęcam mu dużo więcej czasu niż pojedynczemu zleceniu.
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
