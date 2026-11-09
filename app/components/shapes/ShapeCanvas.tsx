'use client';

import React, { useMemo, useRef } from 'react';
import { useShapeClips, type Pt } from '../useShapeClips';

/**
 * Płótno z zazębiającymi się polami, jak w hero (HomeHero, HeroCanvas), dla sekcji niżej na stronie.
 * Kształty w umownej przestrzeni (np. 1000 x 520). Od progu `media` hook podmienia zmienne
 * --clip-<nazwa> na zaokrąglone ścieżki w pikselach; wcześniej (i bez JS) zmienne mają wielokąty
 * w procentach. CSS sekcji decyduje, od jakiej szerokości ich używa; niżej pola stoją pod sobą.
 */

const pct = (n: number) => `${Math.round(n * 100) / 100}%`;

export const ShapeCanvas: React.FC<{
  shapes: Record<string, Pt[]>;
  space: { w: number; h: number };
  className?: string;
  radius?: number;
  media?: string;
  children: React.ReactNode;
}> = ({ shapes, space, className, radius = 28, media = '(min-width: 960px)', children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const clips = useShapeClips(ref, shapes, space, radius, media);

  const fallback = useMemo(() => {
    const out: Record<string, string> = {};
    for (const [k, pts] of Object.entries(shapes)) {
      out[`--clip-${k}`] = `polygon(${pts.map(([x, y]) => `${pct((x / space.w) * 100)} ${pct((y / space.h) * 100)}`).join(', ')})`;
    }
    return out;
  }, [shapes, space]);

  return (
    <div ref={ref} className={className} style={{ ...fallback, ...(clips ?? {}) } as React.CSSProperties}>
      {children}
    </div>
  );
};
