'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from './useMotion';

/**
 * Pętla z linii i kropki (księga marki 2.0, „Schematy procesów”: pętlę rysujemy jako okrąg
 * z kropką na obwodzie). Punkty w kolorze linii, jedna zielona kropka obiega okrąg i staje
 * kolejno przy każdym punkcie; podpis bieżącego punktu w odmianie 600. W środku może stać
 * portret (koło jest zarezerwowane dla kropki i awatara). Style w brand-elements.css (prefiks petla-).
 */

const MOVE_MS = 800;
const HOLD_MS = 1200;

export const TorRing: React.FC<{
  labels: string[];
  center?: React.ReactNode;
  className?: string;
  label?: string;
}> = ({ labels, center, className, label }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref);
  const [k, setK] = useState(0); // liczba kroków od startu; kąt rośnie, żeby kropka zawsze szła naprzód
  const n = labels.length;
  const active = ((k % n) + n) % n;

  useEffect(() => {
    if (reduced || !inView) return;
    const t = window.setInterval(() => setK((v) => v + 1), MOVE_MS + HOLD_MS);
    return () => window.clearInterval(t);
  }, [reduced, inView]);

  const R = 42; // promień okręgu w procentach połowy pola
  const pos = (i: number) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return { x: 50 + R * Math.cos(a), y: 50 + R * Math.sin(a), a };
  };

  return (
    <div ref={ref} className={`petla${className ? ` ${className}` : ''}`} role="img" aria-label={label ?? labels.join(', ')}>
      <svg className="petla-svg" viewBox="0 0 100 100" aria-hidden="true">
        <circle className="petla-line" cx="50" cy="50" r={R} />
        {labels.map((l, i) => {
          const p = pos(i);
          return <circle key={l} className="petla-pt" cx={p.x} cy={p.y} r="1.1" />;
        })}
        <g className="petla-run" style={{ transform: `rotate(${(k / n) * 360}deg)` }}>
          <circle className="petla-dot" cx="50" cy={50 - R} r="1.9" />
        </g>
      </svg>
      {center ? <div className="petla-center">{center}</div> : null}
      <ul className="petla-labels" aria-hidden="true">
        {labels.map((l, i) => {
          const p = pos(i);
          const side = Math.abs(Math.cos(p.a)) < 0.2 ? 'mid' : Math.cos(p.a) > 0 ? 'right' : 'left';
          const vert = Math.sin(p.a) < -0.9 ? 'top' : Math.sin(p.a) > 0.9 ? 'bottom' : 'mid';
          return (
            <li
              key={l}
              className="petla-label"
              data-side={side}
              data-vert={vert}
              data-on={i === active || undefined}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              {l}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
