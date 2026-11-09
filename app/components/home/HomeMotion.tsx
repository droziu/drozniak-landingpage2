'use client';

import { useEffect } from 'react';

/**
 * Włącza wejścia elementów [data-reveal] na stronie głównej.
 * Bez JS albo przy ograniczonym ruchu wszystko jest od razu widoczne,
 * bo stan ukryty istnieje tylko pod klasą .hp-anim dodawaną tutaj.
 */
export const HomeMotion: React.FC<{ rootId: string }> = ({ rootId }) => {
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
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 }
    );

    root.classList.add('hp-anim');
    // Klatkę później, żeby stan początkowy zdążył się namalować.
    const raf = requestAnimationFrame(() => targets.forEach((t) => io.observe(t)));

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [rootId]);

  return null;
};
