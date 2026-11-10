'use client';

import React, { useRef } from 'react';
import { useInView, useReducedMotion } from './useMotion';

/**
 * Wykres sezonowości według księgi marki („Kolory wykresów”): to, o czym mowa, jest zielone,
 * reszta szara, podpis stoi przy słupku, bez legendy, siatki i cieni. Przykład: zapytania
 * w firmie montującej klimatyzację, listopad to słabszy miesiąc, na który trzeba mieć plan.
 * Słupki wjeżdżają od dołu raz, gdy wykres wejdzie w widok (położenie, nie rozmiar).
 *
 * Podpis jest szerszy niż słupek, więc stoi nad wyższym z sąsiadów, a ze słupkiem łączy go
 * cienka linia. Dzięki temu nie nachodzi na słupki obok przy żadnej szerokości kafelka.
 */

const MONTHS = ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'];
const VALUES = [24, 22, 36, 54, 76, 94, 100, 90, 62, 40, 20, 28];
const FOCUS = 10;
const FOCUS_LABEL = 'listopad';

/** Wysokość, nad którą podpis ma wolne miejsce: najwyższy z trzech słupków pod nim. */
const CLEAR = Math.max(VALUES[FOCUS - 1] ?? 0, VALUES[FOCUS], VALUES[FOCUS + 1] ?? 0);

export const SeasonBars: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, '0px 0px -10% 0px');
  const go = reduced || inView;

  return (
    <div
      ref={ref}
      className="ui-card bars"
      data-ui
      data-go={go || undefined}
      role="img"
      aria-label="Zapytania w kolejnych miesiącach: najwięcej latem, najmniej w listopadzie"
    >
      <div className="bars-plot" aria-hidden="true">
        {VALUES.map((v, i) => (
          <span key={MONTHS[i]} className="bars-col" data-focus={i === FOCUS || undefined} style={{ gridColumn: i + 1 }}>
            <span className="bars-bar" style={{ height: `${v}%`, ['--i' as string]: i }} />
          </span>
        ))}
        <span
          className="bars-note"
          style={{
            gridColumn: FOCUS + 1,
            ['--bar' as string]: `${VALUES[FOCUS]}%`,
            ['--rise' as string]: `${CLEAR - VALUES[FOCUS]}%`,
          }}
        >
          <span className="bars-label">{FOCUS_LABEL}</span>
        </span>
      </div>
      <div className="bars-axis" aria-hidden="true">
        <span>sty</span>
        <span>gru</span>
      </div>
    </div>
  );
};
