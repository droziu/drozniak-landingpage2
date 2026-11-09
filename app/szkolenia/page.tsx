import Link from 'next/link';
import { Reveal } from './Reveal';
import { MaterialsLoop } from './Graphics';
import { SzIcon, type SzIconName } from './Icon';

const TOPICS: { icon: SzIconName; title: string; text: string }[] = [
  { icon: 'ads', title: 'Marketing i pozyskiwanie klientów', text: 'Jak planować reklamy i budżet, żeby było widać, co przynosi klientów.' },
  { icon: 'inquiry', title: 'Obsługa zapytań', text: 'Szybka odpowiedź i porządek w kontaktach, żeby żadne zapytanie nie zginęło.' },
  { icon: 'auto', title: 'Automatyzacje', text: 'Powtarzalne zadania, które mogą robić narzędzia zamiast ludzi.' },
  { icon: 'ai', title: 'AI w codziennej pracy', text: 'Odpowiedzi, teksty i raporty z pomocą AI, ćwiczone na zadaniach zespołu.' },
  { icon: 'custom', title: 'Program na zamówienie', text: 'Kilka tematów w jednym szkoleniu, dobranych do firmy.' },
];

const STEPS: { icon: SzIconName; title: string; text: string }[] = [
  { icon: 'talk', title: 'Rozmowa', text: 'Pytam, jak zespół pracuje i co chce robić sprawniej.' },
  { icon: 'plan', title: 'Program', text: 'Przed szkoleniem dostajesz zakres i harmonogram.' },
  { icon: 'teach', title: 'Szkolenie', text: 'Online albo na miejscu, na przykładach z firmy.' },
  { icon: 'month', title: 'Miesiąc po szkoleniu', text: 'Odpowiadam na pytania zespołu.' },
];

const ArrowIcon = () => (
  <svg className="site-btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Jednoliterowe spójniki i przyimki nie zostają na końcu wiersza
const nb = (s: string) => s.replace(/(^|\s)([aiouwzAIOUWZ])\s/g, '$1$2\u00a0');

const d = (n: number) => ({ ['--d' as string]: n });

export default function SzkoleniaPage() {
  return (
    <main id="sz-root" className="sz">
      <Reveal rootId="sz-root" />

      {/* Hero */}
      <section className="sz-hero site-wrap" aria-labelledby="sz-title">
        <div className="sz-hero-text">
          <h1 id="sz-title" className="sz-title">
            Szkolenia dla zespołów
          </h1>
          <div className="sz-hero-copy">
            <p className="hp-hero-role">Marketing, obsługa zapytań, automatyzacje i AI</p>
            <p className="hp-body">
              Program przygotowuję pod konkretną firmę i&nbsp;narzędzia, z&nbsp;których zespół korzysta na co dzień. Szkolenia
              prowadzę online albo na miejscu.
            </p>
            <div className="sz-hero-actions">
              <Link href="/kontakt" className="site-btn site-btn-accent">
                Zapytaj o&nbsp;szkolenie
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>

        <figure className="sz-hero-photo">
          <img
            src="/images/home/portret-hero-duzy.jpg"
            srcSet="/images/home/portret-hero-480.jpg 480w, /images/home/portret-hero-800.jpg 800w, /images/home/portret-hero-duzy.jpg 1440w"
            sizes="(min-width: 960px) 42vw, 100vw"
            alt="Stanisław Drożniak"
            width={1440}
            height={1800}
            fetchPriority="high"
          />
        </figure>
      </section>

      {/* Tematy */}
      <section className="hp-section site-wrap" aria-labelledby="sz-topics">
        <div className="sz-topics-head">
          <h2 id="sz-topics" className="hp-h2" data-reveal>
            Tematy szkoleń
          </h2>
          <p className="hp-body" data-reveal style={d(1)}>
            Każdy temat może być osobnym szkoleniem albo częścią dłuższego programu.
          </p>
        </div>
        <ul className="sz-topic-grid">
          {TOPICS.map((t, i) => (
            <li key={t.title} className="sz-topic" data-reveal style={d(i % 3)}>
              <span className="sz-topic-icon">
                <SzIcon name={t.icon} />
              </span>
              <div className="sz-topic-body">
                <h3 className="sz-h3">{nb(t.title)}</h3>
                <p className="hp-body">{nb(t.text)}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Dla kogo */}
      <section className="hp-section site-wrap" aria-labelledby="sz-audience" style={{ paddingTop: 0 }}>
        <div className="sz-audience">
          <figure className="sz-audience-photo" data-reveal>
            <img src="/images/home/portret-omnie.jpg" srcSet="/images/home/portret-omnie-600.jpg 600w, /images/home/portret-omnie.jpg 900w" sizes="(min-width: 960px) 40vw, 100vw" alt="Stanisław Drożniak" width={900} height={900} loading="lazy" />
          </figure>
          <div className="sz-audience-body">
            <h2 id="sz-audience" className="hp-h2" data-reveal>
              Dla kogo są szkolenia
            </h2>
            <div className="sz-audience-item" data-reveal style={d(1)}>
              <h3 className="sz-h3">Zespoły w małych firmach</h3>
              <p className="hp-body">
                Właściciel i&nbsp;kilka osób, które razem zajmują się klientami i&nbsp;marketingiem.
              </p>
            </div>
            <div className="sz-audience-item" data-reveal style={d(2)}>
              <h3 className="sz-h3">Działy w większych firmach</h3>
              <p className="hp-body">
                Dział marketingu, sprzedaży albo obsługi klienta, który chce uporządkować jedną sprawę.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Przebieg */}
      <section className="site-wrap" aria-labelledby="sz-steps">
        <div className="sz-steps">
          <h2 id="sz-steps" className="hp-h2" data-reveal>
            Jak wygląda szkolenie
          </h2>
          <ol className="sz-step-list" data-ui>
            {STEPS.map((s, i) => (
              <li key={s.title} className="sz-step" data-reveal style={{ ...d(i + 1), ['--i' as string]: i }}>
                <span className="sz-step-icon">
                  <SzIcon name={s.icon} />
                  <span className="sz-step-on" aria-hidden="true">
                    <SzIcon name={s.icon} />
                  </span>
                </span>
                <h3 className="sz-h3">{nb(s.title)}</h3>
                <p className="hp-body">{nb(s.text)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Materiały */}
      <section className="hp-section site-wrap" aria-labelledby="sz-materials">
        <div className="sz-materials">
          <div className="sz-materials-text">
            <h2 id="sz-materials" className="hp-h2" data-reveal>
              Materiały po szkoleniu
            </h2>
            <p className="hp-body" data-reveal style={d(1)}>
              Zespół dostaje materiały dopasowane do swoich narzędzi. Można do nich wrócić albo przekazać je nowej osobie.
            </p>
          </div>
          <div className="sz-materials-graphic" data-ui data-reveal style={d(2)}>
            <MaterialsLoop />
          </div>
        </div>
      </section>

      {/* Dofinansowanie */}
      <section className="hp-section site-wrap" aria-labelledby="sz-funding" style={{ paddingTop: 0 }}>
        <div className="sz-funding">
          <h2 id="sz-funding" className="hp-h2" data-reveal>
            Dofinansowanie
          </h2>
          <div className="sz-funding-body">
            <p className="sz-funding-text" data-reveal style={d(1)}>
              Szkolenia z&nbsp;AI prowadziłem m.in. w&nbsp;<span translate="no">ZEF</span> i&nbsp;w&nbsp;Hotelu&nbsp;<span translate="no">Irys</span>, w&nbsp;projektach dofinansowanych z&nbsp;KPO.
            </p>
            <p className="hp-body" data-reveal style={d(2)}>
              Jeśli firma korzysta z&nbsp;takiego programu, przygotowuję zakres szkolenia i&nbsp;dokumentację oraz pomagam przy
              zgłoszeniu.
            </p>
            <div data-reveal style={d(3)}>
              <Link href="/kontakt" className="site-btn site-btn-ink">
                Zapytaj o&nbsp;dofinansowanie
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
