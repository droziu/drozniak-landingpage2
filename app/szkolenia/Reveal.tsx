'use client';

import { useEffect } from 'react';

/**
 * Wejścia elementów [data-reveal] na podstronie szkoleń.
 * Stan ukryty istnieje tylko pod klasą .sz-anim dodawaną tutaj,
 * więc bez JS albo przy ograniczonym ruchu wszystko jest od razu widoczne.
 */
export const Reveal: React.FC<{ rootId: string }> = ({ rootId }) => {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );

    root.classList.add('sz-anim');
    const raf = requestAnimationFrame(() => targets.forEach((t) => io.observe(t)));

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [rootId]);

  return null;
};
