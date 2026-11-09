import Link from 'next/link';
import { HomeMotion } from '../components/home/HomeMotion';
import { AreaIcon, type IconName } from '../components/AreaIcon';
import { InquiryScene } from './InquiryScene';
import './system.css';

/**
 * Jednorazowe wdrożenie systemu pozyskiwania klientów: konkretny pakiet w trzech opcjach z cenami „od”,
 * przebieg tydzień po tygodniu, warunki i pytania. Style w system.css (prefiks sys-).
 * Zakresy opcji wzorowane na ofertach dla klientów (Tajemnice Gryfu, Bartnicky, Michalczyk), ceny od Stanisława.
 */

const FACTS: { big: string; small: string }[] = [
  { big: 'od 1 900 zł', small: 'netto, jednorazowo' },
  { big: '1–3 tygodnie', small: 'do uruchomienia' },
  { big: '30 dni', small: 'wsparcia po starcie' },
];

const SITUATIONS: { icon: IconName; text: string }[] = [
  { icon: 'people', text: 'Klienci przychodzą głównie z polecenia, a chcesz mieć ich więcej i regularnie.' },
  { icon: 'ads', text: 'Reklamy już były, ale zapytań jest mało albo nie wiadomo, skąd przychodzą.' },
  { icon: 'inquiry', text: 'Zapytania przychodzą, ale część ginie, bo nikt nie odpisuje na czas.' },
  { icon: 'calendar', text: 'Masz sezon albo nową ofertę i chcesz ją dobrze sprzedać.' },
];

const STEPS: { when: string; title: string; text: string }[] = [
  {
    when: 'Tydzień 1',
    title: 'Plan na start',
    text: 'Przeglądam konto reklamowe, stronę, profile i konkurencję. Dostajesz plan na piśmie: co poprawić, do kogo kierujemy reklamy i ile na nie przeznaczyć.',
  },
  {
    when: 'Tydzień 1–2',
    title: 'Oferta i kreacje',
    text: 'Dopracowuję opis oferty, przygotowuję teksty, grafiki i filmy. Zwykle wystarczą nagrania i zdjęcia, które już masz. Wszystko akceptujesz przed startem.',
  },
  {
    when: 'Tydzień 2',
    title: 'Pomiar i obsługa zapytań',
    text: 'Ustawiam pomiar konwersji, formularz z pytaniami o zlecenie, powiadomienie o każdym zapytaniu i prostą bazę, w której widać, co się z nim dzieje.',
  },
  {
    when: 'Start',
    title: 'Uruchomienie',
    text: 'Włączam kampanie i pokazuję Ci, jak działa każda część: gdzie przychodzą zapytania, co znaczą statusy i gdzie patrzeć na wyniki.',
  },
  {
    when: 'Po starcie',
    title: 'Wsparcie',
    text: 'Sprawdzam wyniki po tygodniu i po dwóch. Wyłączam reklamy, które nie działają, i wzmacniam te, które dają zapytania. Przez 30 dni odpowiadam na pytania i poprawiam, co trzeba.',
  },
];

// Cena: od 1 900 zł netto, większość wdrożeń 3 500-6 000 zł netto. Skala paska 1 900-8 000 zł.
const PRICE_SCALE = { min: 1900, max: 8000 };
const pct = (v: number) => `${((v - PRICE_SCALE.min) / (PRICE_SCALE.max - PRICE_SCALE.min)) * 100}%`;

// Rzeczy, które często wchodzą w zakres (przykłady, nie pakiet)
const TYPICAL: { icon: IconName; label: string }[] = [
  { icon: 'search', label: 'Plan na start' },
  { icon: 'offer', label: 'Dopracowanie oferty' },
  { icon: 'film', label: 'Filmy reklamowe' },
  { icon: 'photo', label: 'Grafiki i teksty reklam' },
  { icon: 'ads', label: 'Kampanie w Meta i Google' },
  { icon: 'target', label: 'Reklamy do osób, które były na stronie' },
  { icon: 'site', label: 'Formularz albo strona pod ofertę' },
  { icon: 'phone', label: 'Powiadomienia o zapytaniach' },
  { icon: 'inquiry', label: 'Baza zapytań ze statusami' },
  { icon: 'mail', label: 'Automatyczne maile' },
  { icon: 'data', label: 'Pomiar konwersji' },
  { icon: 'plan', label: 'Strategia na kolejne miesiące' },
];

// O co pytam na rozmowie, zanim zaproponuję rozwiązanie
const TALK: { icon: IconName; text: string }[] = [
  { icon: 'work', text: 'Gdzie firma jest teraz i co sprzedaje' },
  { icon: 'ads', text: 'Jakie działania marketingowe prowadzi albo prowadziła' },
  { icon: 'people', text: 'Skąd dziś przychodzą klienci' },
  { icon: 'target', text: 'Jakie są cele i budżet' },
];

const TERMS = [
  'Płatność jednorazowa, bez abonamentu.',
  'Budżet na reklamy płacisz bezpośrednio do Meta i Google, poza ceną wdrożenia.',
  'Filmy i grafiki zostają Twoje, z prawem do wykorzystania.',
  'Konta reklamowe należą do Ciebie, a zmiany w nich wprowadzam po Twojej akceptacji.',
];

const NEEDED = [
  'Dostęp do konta reklamowego i strony.',
  'Materiały, które już masz: zdjęcia, nagrania, opisy oferty.',
  'Kilka liczb o sprzedaży, żeby wiedzieć, od czego zaczynamy.',
];

const FAQ: { q: string; a: string }[] = [
  {
    q: 'Czy muszę nagrywać nowe filmy?',
    a: 'Zwykle nie. Filmy montuję z nagrań i zdjęć, które firma już ma. Jeśli czegoś brakuje, powiem, co warto dograć.',
  },
  {
    q: 'Ile trzeba wydać na reklamy?',
    a: 'To zależy od branży i celu. Kwotę na start ustalamy w planie, a po dwóch, trzech tygodniach zwiększamy ją albo zmniejszamy, zależnie od wyników.',
  },
  {
    q: 'Czy potrzebuję nowej strony?',
    a: 'Nie zawsze. Często wystarczy formularz w reklamie. Stronę pod ofertę robię wtedy, gdy obecna nie pomaga sprzedawać.',
  },
  {
    q: 'Od czego zależy ostateczna cena?',
    a: 'Od liczby kampanii, filmów i automatyzacji oraz od tego, jak złożona jest sprzedaż w firmie. Cenę podaję po rozmowie, w planie z zakresem i terminem.',
  },
  {
    q: 'Co po 30 dniach?',
    a: 'System zostaje u Ciebie i możesz prowadzić go sam. Jeśli wolisz oddać to komuś, przechodzimy na stałą współpracę.',
  },
];

const ArrowIcon = () => (
  <svg className="site-btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Jednoliterowe spójniki i przyimki nie zostają na końcu wiersza
const nb = (s: string) => s.replace(/(^|\s)([aiouwzAIOUWZ])\s/g, '$1$2 ');

const d = (n: number) => ({ ['--d' as string]: n });

export default function SystemPozyskiwaniaPage() {
  return (
    <main id="sys-root" className="sys">
      <HomeMotion rootId="sys-root" />

      {/* Hero: tytuł na całą szerokość, pod nim opis z faktami i scena drogi zapytania */}
      <section className="sys-hero site-wrap" aria-labelledby="sys-title">
        <h1 id="sys-title" className="sys-h1" data-reveal>
          System pozyskiwania klientów
        </h1>
        <div className="sys-hero-grid">
          <div className="sys-hero-copy">
            <p className="hp-lead" data-reveal style={d(1)}>
              Jednorazowe wdrożenie. Przygotowuję ofertę, reklamy z&nbsp;filmami i&nbsp;automatyczną obsługę zapytań,
              a&nbsp;po starcie przez 30 dni pilnuję, żeby wszystko działało.
            </p>
            <ul className="sys-facts" data-reveal style={d(2)}>
              {FACTS.map((f) => (
                <li key={f.big} className="sys-fact">
                  <span className="sys-fact-big">{f.big}</span>
                  <span className="sys-fact-small">{f.small}</span>
                </li>
              ))}
            </ul>
            <div className="sys-actions" data-reveal style={d(3)}>
              <Link href="/umow" className="site-btn site-btn-accent">
                Umów rozmowę
                <ArrowIcon />
              </Link>
              <a href="#cena" className="site-btn sys-btn-line">
                Zakres i cena
              </a>
            </div>
          </div>
          <div className="sys-hero-stage" data-reveal style={d(2)}>
            <InquiryScene />
          </div>
        </div>
      </section>

      {/* Kiedy ma sens */}
      <section className="sys-section site-wrap" aria-labelledby="sys-when">
        <div className="sys-when">
          <div className="sys-when-head">
            <h2 id="sys-when" className="hp-h2" data-reveal>
              Kiedy wdrożenie ma sens
            </h2>
            <p className="hp-body" data-reveal style={d(1)}>
              System ustawiam raz, w&nbsp;kilka tygodni. Najwięcej daje firmom w&nbsp;jednej z&nbsp;tych sytuacji.
            </p>
            <figure className="sys-when-photo" data-reveal style={d(2)}>
              <img
                src="/images/home/portret-hero-800.jpg"
                srcSet="/images/home/portret-hero-480.jpg 480w, /images/home/portret-hero-800.jpg 800w"
                sizes="(min-width: 960px) 30vw, 100vw"
                alt="Stanisław Drożniak"
                width={800}
                height={1000}
                loading="lazy"
              />
            </figure>
          </div>
          <ul className="sys-when-list">
            {SITUATIONS.map((s, i) => (
              <li key={s.text} className="sys-when-item" data-reveal style={d(i + 1)}>
                <span className="sys-when-icon" aria-hidden="true">
                  <AreaIcon name={s.icon} size={26} />
                </span>
                <p>{nb(s.text)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Przebieg tydzień po tygodniu */}
      <section className="sys-steps-wrap sys-section-gap" aria-labelledby="sys-steps">
        <div className="sys-steps site-wrap">
          <div className="sys-steps-head">
            <h2 id="sys-steps" className="hp-h2" data-reveal>
              Co robię krok po kroku
            </h2>
            <p className="hp-body" data-reveal style={d(1)}>
              Tak zwykle wygląda wdrożenie. Przy mniejszym zakresie trwa około tygodnia, przy większym do trzech
              tygodni.
            </p>
          </div>
          <ol className="sys-timeline">
            {STEPS.map((s, i) => (
              <li key={s.title} className="sys-step" data-reveal style={d(i % 2)}>
                <span className="sys-step-when">{s.when}</span>
                <div className="sys-step-body">
                  <h3 className="sys-h3">{s.title}</h3>
                  <p>{nb(s.text)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Zakres i cena */}
      <section id="cena" className="sys-section site-wrap" aria-labelledby="sys-price">
        <div className="sys-price">
          <div className="sys-price-main">
            <h2 id="sys-price" className="hp-h2" data-reveal>
              Zakres i&nbsp;cena
            </h2>
            <p className="sys-price-lead" data-reveal style={d(1)}>
              Wdrożenie zaczyna się od <span className="sys-nowrap">1&nbsp;900&nbsp;zł</span> netto. Większość mieści się
              w&nbsp;przedziale <span className="sys-nowrap">3&nbsp;500–6&nbsp;000&nbsp;zł</span> netto, zależnie od potrzeb
              i&nbsp;zakresu.
            </p>
            <div
              className="sys-range"
              role="img"
              aria-label="Cena wdrożenia: od 1 900 zł netto, większość wdrożeń od 3 500 do 6 000 zł netto"
              data-reveal
              style={d(2)}
            >
              <div className="sys-range-track" aria-hidden="true">
                <span className="sys-range-start" />
                <span className="sys-range-band" style={{ left: pct(3500), width: `calc(${pct(6000)} - ${pct(3500)})` }} />
              </div>
              <div className="sys-range-labels" aria-hidden="true">
                <span className="sys-range-label" style={{ left: '0%' }}>
                  <strong>od 1 900 zł</strong>
                </span>
                <span className="sys-range-label sys-range-label-band" style={{ left: pct(4750) }}>
                  <strong>3 500–6 000 zł</strong>
                  <span>większość wdrożeń</span>
                </span>
              </div>
            </div>
          </div>

          <aside className="sys-talk" aria-labelledby="sys-talk-title" data-reveal style={d(2)}>
            <h3 id="sys-talk-title" className="sys-h3">
              Zakres dobieram po rozmowie
            </h3>
            <p className="sys-talk-text">
              Nie musisz niczego wybierać z&nbsp;góry. Na rozmowie sprawdzamy:
            </p>
            <ul className="sys-talk-list">
              {TALK.map((t) => (
                <li key={t.text}>
                  <span className="sys-talk-icon" aria-hidden="true">
                    <AreaIcon name={t.icon} size={20} />
                  </span>
                  {nb(t.text)}
                </li>
              ))}
            </ul>
            <p className="sys-talk-text">
              Na tej podstawie proponuję rozwiązanie i&nbsp;cenę. Tylko to, co w&nbsp;Twojej firmie ma sens.
            </p>
            <Link href="/umow" className="site-btn site-btn-accent sys-talk-btn">
              Umów rozmowę
              <ArrowIcon />
            </Link>
          </aside>
        </div>

        <div className="sys-typical">
          <h3 className="sys-h3" data-reveal>
            Co często robię w&nbsp;ramach wdrożenia
          </h3>
          <p className="hp-body sys-typical-note" data-reveal style={d(1)}>
            To przykłady. W&nbsp;jednej firmie wystarczy kampania z&nbsp;formularzem i&nbsp;powiadomieniami, w&nbsp;innej
            potrzebna jest też strona i&nbsp;maile.
          </p>
          <ul className="sys-typical-list" data-reveal style={d(2)}>
            {TYPICAL.map((t) => (
              <li key={t.label}>
                <span className="sys-typical-icon" aria-hidden="true">
                  <AreaIcon name={t.icon} size={22} />
                </span>
                {nb(t.label)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Warunki i start */}
      <section className="sys-section site-wrap" aria-labelledby="sys-terms">
        <div className="sys-terms">
          <div className="sys-terms-main">
            <h2 id="sys-terms" className="hp-h2" data-reveal>
              Warunki
            </h2>
            <ul className="sys-list" data-reveal style={d(1)}>
              {TERMS.map((t) => (
                <li key={t}>
                  <span className="sys-list-check" aria-hidden="true">
                    <Check />
                  </span>
                  {nb(t)}
                </li>
              ))}
            </ul>
          </div>
          <div className="sys-terms-need" data-reveal style={d(2)}>
            <h3 className="sys-h3">Na start potrzebuję</h3>
            <ul className="sys-list">
              {NEEDED.map((t) => (
                <li key={t}>
                  <span className="sys-list-check" aria-hidden="true">
                    <Check />
                  </span>
                  {nb(t)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pytania */}
      <section className="sys-section site-wrap" aria-labelledby="sys-faq">
        <div className="sys-faq">
          <h2 id="sys-faq" className="hp-h2" data-reveal>
            Najczęstsze pytania
          </h2>
          <div className="sys-faq-list" data-reveal style={d(1)}>
            {FAQ.map((f) => (
              <details key={f.q} className="sys-faq-item">
                <summary>
                  {f.q}
                  <span className="sys-faq-sign" aria-hidden="true" />
                </summary>
                <p>{nb(f.a)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Po wdrożeniu */}
      <section className="sys-section site-wrap sys-after-wrap" aria-labelledby="sys-after">
        <div className="sys-after" data-reveal>
          <div className="sys-after-text">
            <h2 id="sys-after" className="hp-h2">
              Po wdrożeniu
            </h2>
            <p className="hp-lead">
              System zostaje u&nbsp;Ciebie. Możesz prowadzić go sam albo przejść na stałą współpracę, w&nbsp;której co
              miesiąc prowadzę cały marketing firmy.
            </p>
          </div>
          <div className="sys-after-actions">
            <Link href="/umow" className="site-btn site-btn-accent">
              Umów rozmowę
              <ArrowIcon />
            </Link>
            <Link href="/prowadzenie-marketingu" className="site-btn sys-btn-line">
              Zobacz stałą współpracę
            </Link>
          </div>
          <figure className="sys-after-photo">
            <img
              src="/images/home/portret-omnie.jpg"
              srcSet="/images/home/portret-omnie-600.jpg 600w, /images/home/portret-omnie.jpg 900w"
              sizes="(min-width: 960px) 30vw, 100vw"
              alt="Stanisław Drożniak"
              width={900}
              height={900}
              loading="lazy"
            />
          </figure>
        </div>
      </section>
    </main>
  );
}
