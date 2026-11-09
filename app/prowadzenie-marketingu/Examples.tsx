'use client';

import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { AreaIcon, type IconName } from '../components/AreaIcon';
import { SlantRow } from '../components/shapes/SlantRow';

/**
 * Przykładowe zakresy współpracy: trzy rodzaje firm w zakładkach (wzorzec APG: strzałki, Home, End),
 * obok miesiąc pracy jako kilka krótkich zadań z ikonami. Zadania wchodzą po kolei, odhaczają się
 * i lista zaczyna od nowa, dopóki jest w widoku. Przy ograniczonym ruchu stoi odhaczona.
 * Treść poglądowa, do potwierdzenia przez Stanisława.
 */

export type Example = { id: string; tab: string; tasks: { icon: IconName; text: string }[] };

const EXAMPLES: Example[] = [
  {
    id: 'uslugi',
    tab: 'Firma usługowa',
    tasks: [
      { icon: 'ads', text: 'Reklamy na usługi sezonu' },
      { icon: 'photo', text: 'Zdjęcia i filmy z realizacji' },
      { icon: 'site', text: 'Krótszy formularz zapytań' },
      { icon: 'inquiry', text: 'Odpowiedź tego samego dnia' },
      { icon: 'mail', text: 'Mail do dawnych klientów' },
    ],
  },
  {
    id: 'sklep',
    tab: 'Sklep internetowy',
    tasks: [
      { icon: 'shop', text: 'Kampanie produktowe' },
      { icon: 'film', text: 'Krótkie filmy o produktach' },
      { icon: 'mail', text: 'Maile po porzuconym koszyku' },
      { icon: 'offer', text: 'Strona promocji na sezon' },
      { icon: 'data', text: 'Sprzedaż z każdej kampanii' },
    ],
  },
  {
    id: 'b2b',
    tab: 'Firma B2B',
    tasks: [
      { icon: 'target', text: 'Kampanie do wybranych branż' },
      { icon: 'text', text: 'Oferta dla handlowców' },
      { icon: 'auto', text: 'Powiadomienie o zapytaniu' },
      { icon: 'mail', text: 'Mailing do kontaktów' },
      { icon: 'data', text: 'Zapytania, które doszły do oferty' },
    ],
  },
];

const reducedQuery = '(prefers-reduced-motion: reduce)';
const subscribeReduced = (cb: () => void) => {
  const mq = window.matchMedia(reducedQuery);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};
const useReducedMotion = () =>
  useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(reducedQuery).matches,
    () => false,
  );

// Jednoliterowe spójniki i przyimki nie zostają na końcu wiersza
const nb = (s: string) => s.replace(/(^|\s)([aiouwzAIOUWZ])\s/g, '$1$2 ');

type Loop = { shown: number; done: number; leaving: boolean };
const ALL: Loop = { shown: 99, done: 99, leaving: false };

export const Examples: React.FC<{ head: React.ReactNode; examples?: Example[] }> = ({ head, examples = EXAMPLES }) => {
  const [active, setActive] = useState(0);
  const [loop, setLoop] = useState<Loop>(ALL);
  const [inView, setInView] = useState(false);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // HTML z serwera pokazuje całą listę; po załadowaniu lista czeka pusta, aż wejdzie w widok
  useEffect(() => {
    if (!reduced) setLoop({ shown: 0, done: 0, leaving: false });
  }, [reduced]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Oś czasu jednej pętli: wejście zadań, odhaczanie, chwila postoju, wyjście, od nowa
  useEffect(() => {
    if (reduced || !inView) return;
    const n = examples[active].tasks.length;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));

    const run = () => {
      setLoop({ shown: 0, done: 0, leaving: false });
      for (let i = 1; i <= n; i++) at(200 + i * 380, () => setLoop((l) => ({ ...l, shown: i })));
      const checks = 200 + n * 380 + 500;
      for (let i = 1; i <= n; i++) at(checks + i * 620, () => setLoop((l) => ({ ...l, done: i })));
      const end = checks + n * 620 + 2400;
      at(end, () => setLoop((l) => ({ ...l, leaving: true })));
      at(end + 700, run);
    };
    run();

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [active, inView, reduced]);

  const select = (i: number) => {
    const next = (i + examples.length) % examples.length;
    setActive(next);
    tabsRef.current[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') select(active + 1);
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') select(active - 1);
    else if (e.key === 'Home') select(0);
    else if (e.key === 'End') select(examples.length - 1);
    else return;
    e.preventDefault();
  };

  const l = reduced ? ALL : loop;

  return (
    <SlantRow className="hm-ex" k={0.1}>
      <div className="hm-ex-side" data-flat>
        {head}
        <div
          className="hm-tabs"
          data-reveal
          style={{ ['--d' as string]: 2 }}
          role="tablist"
          aria-label="Rodzaj firmy"
          onKeyDown={onKeyDown}
        >
          {examples.map((ex, i) => (
            <button
              key={ex.id}
              ref={(el) => {
                tabsRef.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`hm-tab-${ex.id}`}
              aria-selected={i === active}
              aria-controls={`hm-panel-${ex.id}`}
              tabIndex={i === active ? 0 : -1}
              className="hm-tab"
              onClick={() => setActive(i)}
            >
              {ex.tab}
            </button>
          ))}
        </div>
      </div>

      <div ref={stageRef} className="hm-stage" data-reveal style={{ ['--d' as string]: 1 }}>
        {examples.map((ex, i) => (
          <div
            key={ex.id}
            id={`hm-panel-${ex.id}`}
            role="tabpanel"
            aria-labelledby={`hm-tab-${ex.id}`}
            className="hm-tasks-wrap"
            hidden={i !== active}
            tabIndex={0}
          >
            <ul className="hm-tasks" data-ui data-leaving={l.leaving || undefined}>
              {ex.tasks.map((t, j) => (
                <li
                  key={t.text}
                  className="hm-task"
                  data-in={j < l.shown || undefined}
                  data-done={j < l.done || undefined}
                >
                  <span className="hm-task-icon">
                    <AreaIcon name={t.icon} size={22} />
                  </span>
                  <span className="hm-task-text">{nb(t.text)}</span>
                  <span className="hm-task-check" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SlantRow>
  );
};
