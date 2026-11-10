'use client';

import React, { useRef } from 'react';
import { useShapeClips, type Pt } from '../components/useShapeClips';
import { Tor } from '../components/brand/Tor';

/**
 * Hero z zazębiających się pól: tytuł i oferta w lewym górnym rogu, zdjęcie po prawej,
 * kamienne pole z drogą klienta na dole (linia z punktami, kropka przechodzi od kroku do kroku),
 * biały kafelek z rozliczeniem w rogu. Kształty są opisane w umownej przestrzeni 1000 x 620
 * i od 960 px przycinane przez clip-path. Bez JS działają wielokąty w procentach z CSS;
 * po pomiarze komponent podmienia je na ścieżki z zaokrąglonymi narożnikami. Poniżej 960 px
 * pola stoją pod sobą jako zwykłe prostokąty. Style w prowadzenie-marketingu.css (prefiks hmh).
 */

const SPACE = { w: 1000, h: 620 };

// Szczelina między polami to 12 jednostek, także wzdłuż skosów
const SHAPES: Record<'b' | 'c' | 'd', Pt[]> = {
  b: [[490, 0], [1000, 0], [1000, 428], [476, 428], [411.5, 344.6], [490, 250]],
  c: [[0, 352], [402, 352], [470, 440], [863, 440], [743, 620], [0, 620]],
  d: [[760, 620], [880, 440], [1000, 440], [1000, 620]],
};

// Droga klienta: sześć kroków, które prowadzę razem
const STEPS = ['Reklama', 'Strona', 'Zapytanie', 'Oferta', 'Mailing', 'Pomiar'];

type HeroCanvasProps = {
  children: React.ReactNode;
  /** Kroki na drodze klienta (domyślnie przy stałej współpracy). */
  steps?: string[];
  /** Zdanie nad osią. */
  pathTitle?: React.ReactNode;
  /** Kafelek w prawym dolnym rogu. */
  tile?: { big: string; small: string };
};

export const HeroCanvas: React.FC<HeroCanvasProps> = ({
  children,
  steps = STEPS,
  pathTitle = <>Odpowiadam za marketing, ofertę i&nbsp;proces sprzedaży</>,
  tile = { big: 'Jedna opłata', small: 'co miesiąc, za cały ustalony zakres' },
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const clips = useShapeClips(ref, SHAPES, SPACE);

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
        <p className="hmh-c-title">{pathTitle}</p>
        <Tor
          steps={steps.map((label) => ({ label }))}
          className="hmh-path"
          aria-label={`Droga klienta: ${steps.join(', ').toLowerCase()}`}
        />
      </div>

      <div className="hmh-shape hmh-d">
        <span className="hmh-d-text">
          <span className="hmh-d-big">{tile.big}</span>
          <span className="hmh-d-small">{tile.small}</span>
        </span>
      </div>
    </div>
  );
};
