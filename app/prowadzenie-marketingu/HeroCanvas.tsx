'use client';

import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { AreaIcon, type IconName } from '../components/AreaIcon';
import { useShapeClips, type Pt } from '../components/useShapeClips';

/**
 * Hero z zazębiających się pól: tytuł i oferta w lewym górnym rogu, zdjęcie po prawej,
 * ciemne pole z osią drogi klienta na dole, kafelek z rozliczeniem w rogu. Po osi przesuwa się
 * podświetlenie: kolejne kroki prowadzi ta sama osoba.
 * Kształty są opisane w umownej przestrzeni 1000 x 620 i od 960 px przycinane przez clip-path.
 * Bez JS działają wielokąty w procentach z CSS (ostre narożniki); po pomiarze komponent
 * podmienia je na ścieżki z zaokrąglonymi narożnikami w pikselach. Poniżej 960 px pola
 * stoją pod sobą jako zwykłe prostokąty. Style w prowadzenie-marketingu.css (prefiks hmh).
 */

const SPACE = { w: 1000, h: 620 };

// Szczelina między polami to 12 jednostek, także wzdłuż skosów
const SHAPES: Record<'b' | 'c' | 'd', Pt[]> = {
  b: [[490, 0], [1000, 0], [1000, 428], [476, 428], [411.5, 344.6], [490, 250]],
  c: [[0, 352], [402, 352], [470, 440], [863, 440], [743, 620], [0, 620]],
  d: [[760, 620], [880, 440], [1000, 440], [1000, 620]],
};

// Droga klienta: sześć kroków, które prowadzę razem
const STEPS: { icon: IconName; label: string }[] = [
  { icon: 'ads', label: 'Reklama' },
  { icon: 'site', label: 'Strona' },
  { icon: 'inquiry', label: 'Zapytanie' },
  { icon: 'offer', label: 'Oferta' },
  { icon: 'mail', label: 'Mailing' },
  { icon: 'data', label: 'Pomiar' },
];

const STEP_MS = 1300;
const HOLD_MS = 2600;

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
    () => false
  );

/** Krok podświetlony na osi; po ostatnim chwila postoju i od początku */
const usePathStep = (n: number) => {
  const [step, setStep] = useState(n - 1);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    let i = 0;
    let t: number;
    const tick = () => {
      setStep(i);
      const last = i === n - 1;
      i = last ? 0 : i + 1;
      t = window.setTimeout(tick, last ? HOLD_MS : STEP_MS);
    };
    tick();
    return () => window.clearTimeout(t);
  }, [n, reduced]);

  return reduced ? n - 1 : step;
};

export const HeroCanvas: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const clips = useShapeClips(ref, SHAPES, SPACE);
  const step = usePathStep(STEPS.length);

  return (
    <div ref={ref} className="hmh-canvas" style={clips ?? undefined}>
      <div className="hmh-a">{children}</div>

      <figure className="hmh-shape hmh-b">
        <img
          src="/images/home/portret-hero-duzy.jpg"
          srcSet="/images/home/portret-hero-480.jpg 480w, /images/home/portret-hero-800.jpg 800w, /images/home/portret-hero-duzy.jpg 1440w"
          sizes="(min-width: 960px) 60vw, 100vw"
          alt="Stanisław Drożniak"
          width={1440}
          height={1800}
          fetchPriority="high"
        />
      </figure>

      <div className="hmh-shape hmh-c">
        <p className="hmh-c-title">Odpowiadam za marketing, ofertę i&nbsp;proces sprzedaży</p>
        <ol
          className="hmh-path"
          data-ui
          aria-label="Droga klienta"
          style={{ ['--p' as string]: step / (STEPS.length - 1) }}
        >
          {STEPS.map((s, i) => (
            <li key={s.label} className="hmh-step" data-on={i === step || undefined} data-done={i < step || undefined}>
              <span className="hmh-step-dot" aria-hidden="true">
                <AreaIcon name={s.icon} size={24} />
              </span>
              <span className="hmh-step-label">{s.label}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="hmh-shape hmh-d">
        <span className="hmh-d-text">
          <span className="hmh-d-big">Jedna opłata</span>
          <span className="hmh-d-small">co miesiąc, za cały ustalony zakres</span>
        </span>
      </div>
    </div>
  );
};
