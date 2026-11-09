'use client';

import React, { useRef } from 'react';
import { AREAS, AreaIcon } from '../AreaIcon';
import { useShapeClips, type Pt } from '../useShapeClips';

/**
 * Hero strony głównej w tej samej rodzinie co /prowadzenie-marketingu, tylko spokojniejsze:
 * dwa pola zamiast czterech. Zdjęcie po prawej z tym samym skosem w stronę tekstu,
 * pod tekstem jasny pas, w którym przesuwają się obszary pracy. Kształty w przestrzeni
 * 1000 x 620, od 960 px przycinane przez clip-path (useShapeClips); niżej pola stoją pod sobą.
 * Style w home-hero.css (prefiks hph).
 */

const SPACE = { w: 1000, h: 620 };

// Szczelina między polami to 12 jednostek wzdłuż skosu
const SHAPES: Record<'b' | 'c', Pt[]> = {
  b: [[560, 0], [1000, 0], [1000, 620], [600, 620], [500, 470], [560, 380]],
  c: [[0, 482], [493.6, 482], [585.6, 620], [0, 620]],
};

const ROW = [0, 3, 1, 5, 2, 6, 4, 7, 8];

export const HomeHero: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const clips = useShapeClips(ref, SHAPES, SPACE);

  const set = (copy: number) => (
    <span className="hph-set" key={copy}>
      {ROW.map((k) => (
        <span key={k} className="hph-pill">
          <span className="hph-pill-icon">
            <AreaIcon name={AREAS[k].icon} size={20} />
          </span>
          {AREAS[k].label}
        </span>
      ))}
    </span>
  );

  return (
    <div ref={ref} className="hph-canvas" style={clips ?? undefined}>
      <div className="hph-a">{children}</div>

      <figure className="hph-shape hph-b">
        <img
          src="/images/home/portret-hero-duzy.jpg"
          srcSet="/images/home/portret-hero-480.jpg 480w, /images/home/portret-hero-800.jpg 800w, /images/home/portret-hero-duzy.jpg 1440w"
          sizes="(min-width: 960px) 55vw, 100vw"
          alt="Stanisław Drożniak"
          width={1440}
          height={1800}
          fetchPriority="high"
        />
      </figure>

      <div
        className="hph-shape hph-c"
        data-ui
        role="img"
        aria-label={`Obszary pracy: ${AREAS.map((a) => a.label.toLowerCase()).join(', ')}`}
      >
        <span className="hph-row" aria-hidden="true">
          {set(0)}
          {set(1)}
        </span>
      </div>
    </div>
  );
};
