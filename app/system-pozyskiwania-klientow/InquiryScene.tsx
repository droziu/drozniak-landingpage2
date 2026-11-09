import React from 'react';
import { AreaIcon, type IconName } from '../components/AreaIcon';

/**
 * Scena w hero: system jako lejek. Kropki (ludzie) płyną z lewej przez trzy węzły.
 * Część odpada po reklamie, część po zapytaniu, a te, które dotrą do końca, zielenieją
 * i zapalają węzeł „Klient”. Kropka to motyw marki. Pętla w samym CSS (system.css, prefiks sys-flow);
 * przy ograniczonym ruchu kropki znikają, a węzeł „Klient” stoi zapalony.
 */

const NODES: { icon: IconName; label: string; x: number }[] = [
  { icon: 'ads', label: 'Reklama', x: 120 },
  { icon: 'inquiry', label: 'Zapytanie', x: 300 },
  { icon: 'deal', label: 'Klient', x: 480 },
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
      <line className="sys-flow-line" x1="0" y1="150" x2="600" y2="150" />
      {DOTS.map((kind, i) =>
        kind === 'win' ? (
          <circle
            key={`r${i}`}
            className="sys-flow-ring"
            cx="480"
            cy="150"
            r="40"
            style={{ animationDelay: `${i}s` }}
          />
        ) : null,
      )}
      {DOTS.map((kind, i) => (
        <circle
          key={i}
          className={`sys-flow-dot sys-flow-${kind}`}
          cx="0"
          cy="150"
          r="11"
          style={{ animationDelay: `${i}s` }}
        />
      ))}
    </svg>

    {NODES.map((n, i) => (
      <span
        key={n.label}
        className="sys-flow-node"
        data-last={i === NODES.length - 1 || undefined}
        style={{ left: `${(n.x / 600) * 100}%` }}
        aria-hidden="true"
      >
        <span className="sys-flow-node-icon">
          <AreaIcon name={n.icon} size={30} />
        </span>
        <span className="sys-flow-node-label">{n.label}</span>
      </span>
    ))}
  </div>
);
