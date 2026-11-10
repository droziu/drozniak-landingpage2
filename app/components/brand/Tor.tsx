'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from './useMotion';
import { HOP, playHop } from './dotHop';

/**
 * Tor: schemat procesu z linii i kropki (księga marki 2.0, „Linia i kropka” i „Schematy procesów”).
 * Linia jednej grubości L, punkty 2L w kolorze linii, jedna zielona kropka 3L na bieżącym kroku.
 * Bez strzałek, ikon w kółkach i numerów. Czyta się go od lewej do prawej albo z góry na dół.
 *
 * Ruch: kropka przeskakuje z punktu na punkt łukiem i ląduje z lekkim ugięciem (dotHop.ts), potem
 * postój. Po ostatnim punkcie znika skalą i pojawia się na początku. Rusza, gdy tor jest w widoku.
 * Przy wyłączonym ruchu kropka stoi na kroku `current` (domyślnie pierwszym).
 *
 * Układ: `dir="row"` (poziomo), `dir="col"` (pionowo) albo `dir="auto"`: poziomo od progu `wide`,
 * niżej pionowo. Położenie linii i kropki liczy pomiar punktów, więc kroki mogą mieć dowolną treść.
 * Style w brand-elements.css (prefiks tor-).
 */

export type TorStep = {
  label: React.ReactNode;
  when?: React.ReactNode;
  text?: React.ReactNode;
};

const HOLD_MS = 1300;
const LAST_HOLD_MS = 2200;
const POP_MS = HOP.popMs;

export const Tor: React.FC<{
  steps: TorStep[];
  current?: number;
  dir?: 'row' | 'col' | 'auto';
  wide?: string;
  loop?: boolean;
  className?: string;
  'aria-label'?: string;
}> = ({ steps, current = 0, dir = 'row', wide = '(min-width: 960px)', loop = true, className, ...rest }) => {
  const olRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(current);
  const activeRef = useRef(active);
  const posRef = useRef<{ x: number; y: number } | null>(null);
  const hopRef = useRef<Animation | null>(null);
  const [layout, setLayout] = useState<'row' | 'col'>(dir === 'col' ? 'col' : 'row');
  const reduced = useReducedMotion();
  const inView = useInView(olRef, '0px 0px -10% 0px');

  // Układ zależny od szerokości
  useEffect(() => {
    if (dir !== 'auto') {
      setLayout(dir);
      return;
    }
    const mq = window.matchMedia(wide);
    const set = () => setLayout(mq.matches ? 'row' : 'col');
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, [dir, wide]);

  // Pomiar: linia od pierwszego do ostatniego punktu, kropka nad aktywnym punktem.
  // Z `animate` kropka przeskakuje tam z miejsca, w którym stoi; zwraca czas lotu i całości w ms.
  const place = (i: number, animate: boolean): { flightMs: number; totalMs: number } => {
    const none = { flightMs: 0, totalMs: 0 };
    const ol = olRef.current;
    const dot = dotRef.current;
    if (!ol || !dot) return none;
    const pts = Array.from(ol.querySelectorAll<HTMLElement>('.tor-pt'));
    if (!pts.length) return none;
    const box = ol.getBoundingClientRect();
    const c = pts.map((p) => {
      const r = p.getBoundingClientRect();
      return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
    });
    const first = c[0];
    const last = c[c.length - 1];
    ol.style.setProperty('--tor-x0', `${first.x}px`);
    ol.style.setProperty('--tor-y0', `${first.y}px`);
    ol.style.setProperty('--tor-x1', `${last.x}px`);
    ol.style.setProperty('--tor-y1', `${last.y}px`);
    const t = c[Math.min(i, c.length - 1)];
    const from = posRef.current;
    hopRef.current?.cancel();
    hopRef.current = null;
    posRef.current = t;
    dot.style.transform = `translate(${t.x}px, ${t.y}px)`;
    dot.setAttribute('data-ready', '');
    if (!animate || !from || typeof dot.animate !== 'function') return none;
    const h = playHop(dot, from, t.x - from.x, t.y - from.y);
    hopRef.current = h.animation;
    return h;
  };

  useLayoutEffect(() => {
    place(active, false);
    const ol = olRef.current;
    if (!ol) return;
    const ro = new ResizeObserver(() => place(activeRef.current, false));
    ro.observe(ol);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout]);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  // Pętla ruchu
  useEffect(() => {
    if (reduced || !loop || !inView || steps.length < 2) {
      if (reduced) {
        setActive(current);
        place(current, false);
      }
      return;
    }
    const dot = dotRef.current;
    let i = activeRef.current;
    let timer: number;
    const next = () => {
      if (i === steps.length - 1) {
        // po ostatnim: kropka znika skalą, wraca na początek bez ruchu i pojawia się skalą
        dot?.setAttribute('data-hide', '');
        timer = window.setTimeout(() => {
          i = 0;
          setActive(0);
          place(0, false);
          dot?.removeAttribute('data-hide');
          timer = window.setTimeout(next, HOLD_MS + POP_MS);
        }, POP_MS);
        return;
      }
      i += 1;
      const target = i;
      const { flightMs, totalMs } = place(target, true);
      // podpis kroku zmienia się, gdy kropka ląduje
      landing = window.setTimeout(() => setActive(target), flightMs);
      timer = window.setTimeout(next, totalMs + (i === steps.length - 1 ? LAST_HOLD_MS : HOLD_MS));
    };
    let landing = 0;
    timer = window.setTimeout(next, HOLD_MS);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(landing);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, loop, inView, steps.length, current]);

  return (
    <div
      ref={olRef}
      className={`tor${className ? ` ${className}` : ''}`}
      data-dir={layout}
      style={{ ['--n' as string]: steps.length }}
    >
      <ol className="tor-list" {...rest}>
        {steps.map((s, i) => (
          <li key={i} className="tor-step" data-on={i === active || undefined}>
            <span className="tor-pt" aria-hidden="true" />
            <span className="tor-body">
              {s.when ? <span className="tor-when">{s.when}</span> : null}
              <span className="tor-label">{s.label}</span>
              {s.text ? <span className="tor-text">{s.text}</span> : null}
            </span>
          </li>
        ))}
      </ol>
      <span ref={dotRef} className="tor-dot" aria-hidden="true" />
    </div>
  );
};
