import React from 'react';

/**
 * Grafiki do kafelków „Co biorę pod uwagę”. Każda to kilka małych elementów (logo, pigułka, jeden kafel,
 * jedno-dwa słowa), które spokojnie wchodzą po kolei z rozmycia, gdy kafelek się zamontuje.
 * Kolory biorą się z kafelka (zmienne --sc-* w home-sections.css), więc grafika nie ma własnego tła
 * i tak samo pasuje do jasnego i ciemnego pola. Style w home-scene.css (prefiks sc-).
 * Przykłady dotyczą jednej firmy, która montuje klimatyzację. Dane przykładowe.
 */

/*
 * Logo narzędzi: ścieżki z pakietu simple-icons (v16), w oficjalnych kolorach marek.
 * Wpisane na sztywno, żeby nie ciągnąć do paczki całego zestawu ikon. Znaki należą do ich właścicieli.
 */
const BRANDS = {
  meta: {
    hex: '#0467DF',
    path: 'M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z',
  },
  googleAds: {
    hex: '#4285F4',
    path: 'M3.9998 22.9291C1.7908 22.9291 0 21.1383 0 18.9293s1.7908-3.9998 3.9998-3.9998 3.9998 1.7908 3.9998 3.9998-1.7908 3.9998-3.9998 3.9998zm19.4643-6.0004L15.4632 3.072C14.3586 1.1587 11.9121.5028 9.9988 1.6074S7.4295 5.1585 8.5341 7.0718l8.0009 13.8567c1.1046 1.9133 3.5511 2.5679 5.4644 1.4646 1.9134-1.1046 2.568-3.5511 1.4647-5.4644zM7.5137 4.8438L1.5645 15.1484A4.5 4.5 0 0 1 4 14.4297c2.5597-.0075 4.6248 2.1585 4.4941 4.7148l3.2168-5.5723-3.6094-6.25c-.4499-.7793-.6322-1.6394-.5878-2.4784z',
  },
  analytics: {
    hex: '#E37400',
    path: 'M22.84 2.9982v17.9987c.0086 1.6473-1.3197 2.9897-2.967 2.9984a2.9808 2.9808 0 01-.3677-.0208c-1.528-.226-2.6477-1.5558-2.6105-3.1V3.1204c-.0369-1.5458 1.0856-2.8762 2.6157-3.1 1.6361-.1915 3.1178.9796 3.3093 2.6158.014.1201.0208.241.0202.3619zM4.1326 18.0548c-1.6417 0-2.9726 1.331-2.9726 2.9726C1.16 22.6691 2.4909 24 4.1326 24s2.9726-1.3309 2.9726-2.9726-1.331-2.9726-2.9726-2.9726zm7.8728-9.0098c-.0171 0-.0342 0-.0513.0003-1.6495.0904-2.9293 1.474-2.891 3.1256v7.9846c0 2.167.9535 3.4825 2.3505 3.763 1.6118.3266 3.1832-.7152 3.5098-2.327.04-.1974.06-.3983.0593-.5998v-8.9585c.003-1.6474-1.33-2.9852-2.9773-2.9882z',
  },
} as const;

const Brand: React.FC<{ name: keyof typeof BRANDS; size?: number }> = ({ name, size = 20 }) => (
  <svg className="sc-logo" viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <path d={BRANDS[name].path} fill={BRANDS[name].hex} />
  </svg>
);

/** Kolejność wejścia elementu (CSS mnoży ją przez odstęp) */
const at = (i: number) => ({ ['--i' as string]: i }) as React.CSSProperties;

const Scene: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="sc">{children}</div>;

/** Reklamy: logo Meta i Google, jedna reklama, liczba zapytań */
export const FragAds: React.FC = () => (
  <Scene>
    <span className="sc-row">
      <span className="sc-pill sc-in" style={at(0)}>
        <Brand name="meta" />
        Meta
      </span>
      <span className="sc-pill sc-in" style={at(0.5)}>
        <Brand name="googleAds" />
        Google
      </span>
    </span>
    <span className="sc-card sc-in" style={at(1.5)}>
      <span className="sc-small">Sponsorowane</span>
      <span className="sc-title">Montaż w&nbsp;7&nbsp;dni</span>
    </span>
    <span className="sc-pill sc-pill-gold sc-in" style={at(3)}>
      14 zapytań
    </span>
  </Scene>
);

/** Grafiki i filmy: post, rolka i reklama obok siebie */
export const FragMedia: React.FC = () => (
  <Scene>
    <span className="sc-formats">
      <span className="sc-format sc-in" style={at(0)}>
        <svg className="sc-icon" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
          <circle cx="9" cy="9.5" r="1.6" />
          <path d="m4 17 5-5 4 4 2.5-2.5L20 18" />
        </svg>
        <span className="sc-small">Post</span>
      </span>
      <span className="sc-format sc-format-tall sc-in" style={at(1)}>
        <svg className="sc-icon" viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
          <path d="M8.5 5.5v13l10-6.5z" />
        </svg>
        <span className="sc-small">Rolka</span>
      </span>
      <span className="sc-format sc-in" style={at(2)}>
        <span className="sc-dot-gold" />
        <span className="sc-small">Reklama</span>
      </span>
    </span>
  </Scene>
);

/** Strona i oferta: jedna strona z ceną i przyciskiem, który klient wciska */
export const FragLanding: React.FC = () => (
  <Scene>
    <span className="sc-card sc-card-page sc-in" style={at(0)}>
      <span className="sc-title">Klimatyzacja z&nbsp;montażem</span>
      <span className="sc-small sc-in" style={at(1)}>
        od 2900&nbsp;zł
      </span>
      <span className="sc-cta sc-press sc-in" style={at(2)}>
        Umów wycenę
      </span>
    </span>
  </Scene>
);

/** Obsługa zapytań: pytanie klienta i szybka odpowiedź */
export const FragInquiry: React.FC = () => (
  <Scene>
    <span className="sc-thread">
      <span className="sc-bubble sc-in" style={at(0)}>
        Ile kosztuje montaż?
      </span>
      <span className="sc-bubble sc-bubble-out sc-in" style={at(1.5)}>
        Zapraszamy na bezpłatny pomiar
      </span>
      <span className="sc-small sc-in" style={at(2.5)}>
        Odpowiedź po minucie
      </span>
    </span>
  </Scene>
);

/** Maile: rok po montażu klient dostaje przypomnienie o przeglądzie */
export const FragEmail: React.FC = () => (
  <Scene>
    <span className="sc-card sc-in" style={at(0)}>
      <span className="sc-small">Rok po montażu</span>
      <span className="sc-title">Czas na przegląd</span>
      <span className="sc-cta sc-press sc-in" style={at(1.5)}>
        Umów termin
      </span>
    </span>
  </Scene>
);

const MONTHS = [40, 36, 52, 66, 84, 96, 100, 92, 70, 50, 38, 34];
const LOW = new Set([0, 1, 10, 11]);

/** Sezon: słupki z cichszą zimą i osobna oferta na ten czas */
export const FragSeason: React.FC = () => (
  <Scene>
    <span className="sc-bars">
      {MONTHS.map((v, i) => (
        <span
          key={i}
          className="sc-bar sc-in"
          data-low={LOW.has(i) ? 'true' : undefined}
          style={{ ...at(i * 0.15), height: `${v}%` }}
        />
      ))}
    </span>
    <span className="sc-pill sc-pill-gold sc-in" style={at(3)}>
      Oferta na zimę
    </span>
  </Scene>
);

/** Pomiar: jedna liczba i narzędzia, z których się bierze */
export const FragReport: React.FC = () => (
  <Scene>
    <span className="sc-big sc-in" style={at(0)}>
      218&nbsp;zł
    </span>
    <span className="sc-small sc-in" style={at(0.6)}>
      koszt jednej sprzedaży
    </span>
    <span className="sc-row sc-row-gap">
      <span className="sc-pill sc-in" style={at(1.6)}>
        <Brand name="analytics" />
        Analytics
      </span>
      <span className="sc-pill sc-in" style={at(2.1)}>
        <Brand name="meta" />
        Piksel
      </span>
    </span>
  </Scene>
);

/** Automatyzacje: zapytanie samo przechodzi przez kolejne kroki */
export const FragAutomation: React.FC = () => (
  <Scene>
    <span className="sc-chain">
      <span className="sc-pill sc-in" style={at(0)}>
        Nowe zapytanie
      </span>
      <span className="sc-link sc-in" style={at(0.8)} />
      <span className="sc-pill sc-in" style={at(1.2)}>
        Mail do klienta
      </span>
      <span className="sc-link sc-in" style={at(2)} />
      <span className="sc-pill sc-pill-gold sc-in" style={at(2.4)}>
        Przypomnienie
      </span>
    </span>
  </Scene>
);
