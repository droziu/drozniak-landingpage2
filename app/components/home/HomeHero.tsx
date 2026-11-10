'use client';

import React, { useRef } from 'react';
import { useShapeClips, type Pt } from '../useShapeClips';
import { Tor } from '../brand/Tor';

/**
 * Hero strony głównej w tej samej rodzinie co /prowadzenie-marketingu, tylko spokojniejsze:
 * dwa pola zamiast czterech. Zdjęcie po prawej z tym samym skosem w stronę tekstu,
 * pod tekstem jasny pas z drogą klienta z księgi marki (linia z punktami, kropka idzie po kolei
 * od reklamy do sprzedaży). Kształty w przestrzeni 1000 x 620, od 960 px przycinane przez clip-path
 * (useShapeClips); niżej pola stoją pod sobą. Style w home-hero.css (prefiks hph).
 */

const SPACE = { w: 1000, h: 620 };

// Szczelina między polami to 12 jednostek wzdłuż skosu
const SHAPES: Record<'b' | 'c', Pt[]> = {
  b: [[560, 0], [1000, 0], [1000, 620], [600, 620], [500, 470], [560, 380]],
  c: [[0, 482], [493.6, 482], [585.6, 620], [0, 620]],
};

const ROAD = ['Reklama', 'Strona', 'Zapytanie', 'Rozmowa', 'Sprzedaż'].map((label) => ({ label }));

export const HomeHero: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const clips = useShapeClips(ref, SHAPES, SPACE);

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

      <div className="hph-shape hph-c">
        <Tor steps={ROAD} current={2} className="hph-road" aria-label="Droga klienta: reklama, strona, zapytanie, rozmowa, sprzedaż" />
      </div>
    </div>
  );
};
