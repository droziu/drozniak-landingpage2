'use client';

import { useEffect, useState, type RefObject } from 'react';

/**
 * Pola hero o kształcie wielokątów z zaokrąglonymi narożnikami (strona główna i /prowadzenie-marketingu).
 * Kształty są opisane w umownej przestrzeni (np. 1000 x 620) i skalowane do płótna.
 * Hook mierzy płótno i zwraca zmienne CSS --clip-<nazwa> ze ścieżkami path() w pikselach.
 * Poza zakresem `media` zwraca null, a CSS używa wtedy własnych wielokątów albo zwykłych prostokątów.
 */

export type Pt = [number, number];

const f = (n: number) => Math.round(n * 10) / 10;

/** Wielokąt z zaokrąglonymi narożnikami (krzywa przez wierzchołek, promień ograniczony połową krawędzi) */
export const roundedPath = (pts: Pt[], r: number) => {
  const n = pts.length;
  let d = '';
  for (let i = 0; i < n; i++) {
    const p = pts[i];
    const a = pts[(i - 1 + n) % n];
    const b = pts[(i + 1) % n];
    const la = Math.hypot(a[0] - p[0], a[1] - p[1]);
    const lb = Math.hypot(b[0] - p[0], b[1] - p[1]);
    const t = Math.min(r, la / 2, lb / 2);
    const s: Pt = [p[0] + ((a[0] - p[0]) / la) * t, p[1] + ((a[1] - p[1]) / la) * t];
    const e: Pt = [p[0] + ((b[0] - p[0]) / lb) * t, p[1] + ((b[1] - p[1]) / lb) * t];
    d += `${i === 0 ? 'M' : 'L'}${f(s[0])} ${f(s[1])} Q${f(p[0])} ${f(p[1])} ${f(e[0])} ${f(e[1])} `;
  }
  return `${d}Z`;
};

export const useShapeClips = (
  ref: RefObject<HTMLElement | null>,
  shapes: Record<string, Pt[]>,
  space: { w: number; h: number },
  radius = 16, // księga marki: karty, panele i zdjęcia mają promień 16 px
  media = '(min-width: 960px)'
) => {
  const [clips, setClips] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia(media);

    const measure = () => {
      if (!mq.matches) {
        setClips(null);
        return;
      }
      const { width: w, height: h } = el.getBoundingClientRect();
      const sx = w / space.w;
      const sy = h / space.h;
      const next: Record<string, string> = {};
      for (const [k, pts] of Object.entries(shapes)) {
        const scaled = pts.map(([x, y]) => [x * sx, y * sy] as Pt);
        next[`--clip-${k}`] = `path("${roundedPath(scaled, radius)}")`;
      }
      setClips(next);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    mq.addEventListener('change', measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener('change', measure);
    };
  }, [ref, shapes, space, radius, media]);

  return clips;
};
