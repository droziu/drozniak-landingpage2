'use client';

import React, { useEffect, useRef } from 'react';
import { roundedPath, type Pt } from '../useShapeClips';

/**
 * Rząd pól, które zazębiają się skosami (kind="slant") albo strzałkami (kind="chevron").
 * Od progu `media` komponent mierzy dzieci i przycina każde zaokrąglonym wielokątem:
 * pierwsze ma prosty lewy bok, ostatnie prosty prawy, środkowe skosy z obu stron.
 * Głębokość skosu to `k` razy wysokość rzędu; komponent ustawia ją jako --s na rzędzie
 * (CSS odsuwa nią treść od skosów) i nasuwa pola na siebie o --s, żeby odstęp wzdłuż
 * skosu został taki jak `gap` w CSS. Dziecko z atrybutem data-flat nie jest przycinane
 * (np. kolumna tekstu bez tła obok przyciętego pola). Poniżej progu i bez JS: zwykłe prostokąty.
 */

type Kind = 'slant' | 'chevron';

const shape = (kind: Kind, w: number, h: number, s: number, first: boolean, last: boolean): Pt[] => {
  if (kind === 'chevron') {
    const right = last ? w : w - s;
    const pts: Pt[] = [[0, 0], [right, 0]];
    if (!last) pts.push([w, h / 2]);
    pts.push([right, h], [0, h]);
    if (!first) pts.push([s, h / 2]);
    return pts;
  }
  return [
    [first ? 0 : s, 0],
    [w, 0],
    [last ? w : w - s, h],
    [0, h],
  ];
};

export const SlantRow: React.FC<{
  as?: 'div' | 'ul' | 'ol' | 'dl';
  className?: string;
  kind?: Kind;
  k?: number;
  radius?: number;
  media?: string;
  children: React.ReactNode;
  'aria-label'?: string;
}> = ({ as = 'div', className, kind = 'slant', k = 0.24, radius = 26, media = '(min-width: 960px)', children, ...rest }) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia(media);
    let lastS = -1;

    const kids = () => Array.from(el.children) as HTMLElement[];

    const clear = () => {
      lastS = -1;
      el.style.removeProperty('--s');
      for (const kid of kids()) {
        kid.style.clipPath = '';
        kid.style.marginLeft = '';
      }
    };

    const measure = () => {
      if (!mq.matches) {
        clear();
        return;
      }
      const list = kids();
      const h = Math.max(0, ...list.map((kid) => kid.offsetHeight));
      const s = Math.round(h * k);
      if (Math.abs(s - lastS) >= 1) {
        lastS = s;
        el.style.setProperty('--s', `${s}px`);
        list.forEach((kid, i) => {
          kid.style.marginLeft = i === 0 ? '' : `${-s}px`;
        });
      }
      list.forEach((kid, i) => {
        if (kid.hasAttribute('data-flat')) {
          kid.style.clipPath = '';
          return;
        }
        const pts = shape(kind, kid.offsetWidth, kid.offsetHeight, s, i === 0, i === list.length - 1);
        kid.style.clipPath = `path("${roundedPath(pts, radius)}")`;
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    kids().forEach((kid) => ro.observe(kid));
    mq.addEventListener('change', measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener('change', measure);
    };
  }, [kind, k, radius, media]);

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
};
