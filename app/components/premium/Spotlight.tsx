'use client';

import React, { useRef } from 'react';

interface SpotlightProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'a';
  href?: string;
}

/**
 * Mouse-follow yellow halo on the bordered card.
 * CSS variables --mx, --my drive the radial gradient (set in spotlight class).
 */
export const Spotlight: React.FC<SpotlightProps & React.HTMLAttributes<HTMLElement>> = ({
  children,
  className = '',
  as = 'div',
  href,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  if (as === 'a' && href) {
    return (
      <a
        ref={ref as any}
        href={href}
        onMouseMove={handleMove as any}
        className={`spotlight ${className}`}
        {...(rest as any)}
      >
        {children}
      </a>
    );
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={`spotlight ${className}`}
      {...(rest as any)}
    >
      {children}
    </div>
  );
};
