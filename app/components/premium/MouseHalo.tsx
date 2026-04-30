'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Hero-only mouse-follow yellow halo.
 * Performant — uses translate transforms only, no React re-renders.
 */
export const MouseHalo: React.FC<{ className?: string }> = ({ className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (e: MouseEvent) => {
      const parent = el.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      el.style.transform = `translate3d(${currentX - 350}px, ${currentY - 350}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const parent = el.parentElement;
    parent?.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      parent?.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute top-0 left-0 w-[700px] h-[700px] opacity-50 ${className}`}
      style={{
        background:
          'radial-gradient(circle at center, rgba(254, 231, 21, 0.10) 0%, rgba(254, 231, 21, 0.04) 30%, transparent 60%)',
        filter: 'blur(40px)',
        willChange: 'transform',
      }}
    />
  );
};
