import React from 'react';

/**
 * Scena w hero: system jako lejek, narysowany z linii i kropki (księga marki 2.0).
 * Po linii płyną atramentowe kropki (ludzie). Część schodzi z linii po reklamie, część po zapytaniu,
 * a te, które dojdą do końca, wpadają w jedyną zieloną kropkę: „Klient”. Spadające kropki schodzą
 * pod kątem prostym, bez strzałek. Pętla w samym CSS (system.css, prefiks sys-flow);
 * przy ograniczonym ruchu stoją sama linia, punkty i zielona kropka.
 */

const NODES: { label: string; x: number }[] = [
  { label: 'Reklama', x: 120 },
  { label: 'Zapytanie', x: 300 },
  { label: 'Klient', x: 480 },
];

// Losy kolejnych kropek: odpada po reklamie (ad), po zapytaniu (lead) albo zostaje klientem (win)
const DOTS: ('win' | 'ad' | 'lead')[] = ['win', 'ad', 'ad', 'lead', 'win', 'ad', 'lead', 'win'];
const LOOP = DOTS.length; // sekundy, jedna kropka na sekundę

export const InquiryScene: React.FC = () => (
  <div
    className="sys-flow"
    data-ui
    role="img"
    aria-label="Lejek: z reklamy część osób wysyła zapytanie, a część z nich zostaje klientami"
    style={{ ['--loop' as string]: `${LOOP}s` }}
  >
    <svg className="sys-flow-svg" viewBox="0 0 600 300" aria-hidden="true">
      <line className="sys-flow-line" x1="40" y1="150" x2="464" y2="150" />
      {DOTS.map((kind, i) => (
        <circle
          key={i}
          className={`sys-flow-dot sys-flow-${kind}`}
          cx="0"
          cy="150"
          r="7"
          style={{ animationDelay: `${i}s` }}
        />
      ))}
      {NODES.map((n, i) =>
        i === NODES.length - 1 ? (
          <circle key={n.label} className="sys-flow-goal" cx={n.x} cy="150" r="12" />
        ) : (
          <circle key={n.label} className="sys-flow-pt" cx={n.x} cy="150" r="8" />
        ),
      )}
    </svg>

    {NODES.map((n, i) => (
      <span
        key={n.label}
        className="sys-flow-label"
        data-last={i === NODES.length - 1 || undefined}
        style={{ left: `${(n.x / 600) * 100}%` }}
        aria-hidden="true"
      >
        {n.label}
      </span>
    ))}
  </div>
);
