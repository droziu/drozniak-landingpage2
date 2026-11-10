'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AreaIcon, type IconName } from '../AreaIcon';
import { useInView, useReducedMotion } from './useMotion';
import { playHop } from './dotHop';

/**
 * Ilustracja interfejsu (księga marki 2.0, „Ilustracje interfejsu”): biała karta, promień 16 px,
 * linia 1,5 px, najwyżej trzy wiersze po kilka słów, ikony liniowe i jedna zielona kropka.
 * Jedna pętla około 5 s: wiersz pojawia się, kropka przeskakuje na niego łukiem, na końcu karta gaśnie
 * i zaczyna od nowa. Działa tylko w widoku. Bez JS i przy wyłączonym ruchu widać wszystkie wiersze,
 * a kropka stoi przy wierszu `current` (domyślnie ostatnim). Style w brand-elements.css (prefiks ui-).
 */

export type UiRow = { icon: IconName; label: string };

const STEP_MS = 1200;
const HOLD_MS = 2000;
const FADE_MS = 400;

export const UiRows: React.FC<{ rows: UiRow[]; current?: number; className?: string; label?: string }> = ({
  rows,
  current,
  className,
  label,
}) => {
  const list = rows.slice(0, 3);
  const last = list.length - 1;
  const rest = current ?? last;
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, '0px 0px -10% 0px');
  const [shown, setShown] = useState(list.length);
  const [dot, setDot] = useState(rest);
  const [fading, setFading] = useState(false);
  const dotRef = useRef<HTMLSpanElement>(null);
  const prevDot = useRef(dot);

  // Przeskok kropki na następny wiersz. Położenie końcowe daje CSS (--i), animacja tylko je poprzedza.
  useEffect(() => {
    const from = prevDot.current;
    prevDot.current = dot;
    const el = dotRef.current;
    const card = ref.current;
    if (reduced || !el || !card || dot <= from || shown === 0 || typeof el.animate !== 'function') return;
    const rows = card.querySelectorAll<HTMLElement>('.ui-row');
    if (rows.length < 2) return;
    const step = rows[1].offsetTop - rows[0].offsetTop;
    const h = playHop(el, { x: 0, y: from * step }, 0, (dot - from) * step);
    return () => h.animation.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dot]);

  useEffect(() => {
    if (reduced || !inView) {
      setShown(list.length);
      setDot(rest);
      setFading(false);
      return;
    }
    let t: number;
    let i = 0;
    const show = () => {
      setFading(false);
      setShown(i + 1);
      setDot(i);
      if (i < last) {
        i += 1;
        t = window.setTimeout(show, STEP_MS);
      } else {
        t = window.setTimeout(() => {
          setFading(true);
          t = window.setTimeout(() => {
            i = 0;
            setShown(0);
            t = window.setTimeout(show, 120);
          }, FADE_MS);
        }, HOLD_MS);
      }
    };
    setShown(0);
    t = window.setTimeout(show, 200);
    return () => window.clearTimeout(t);
  }, [reduced, inView, last, rest, list.length]);

  return (
    <div
      ref={ref}
      className={`ui-card${className ? ` ${className}` : ''}`}
      data-ui
      data-fading={fading || undefined}
      role="img"
      aria-label={label ?? list.map((r) => r.label).join(', ')}
    >
      <ul className="ui-rows" aria-hidden="true">
        {list.map((r, i) => (
          <li key={r.label} className="ui-row" data-in={i < shown || undefined}>
            <AreaIcon name={r.icon} size={20} />
            <span className="ui-row-text">{r.label}</span>
          </li>
        ))}
      </ul>
      <span ref={dotRef} className="ui-dot" aria-hidden="true" data-in={shown > 0 || undefined} style={{ ['--i' as string]: dot }} />
    </div>
  );
};
