'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  /** How strongly the button follows the cursor (px). */
  strength?: number;
  className?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  type?: 'button' | 'submit';
  ariaLabel?: string;
  external?: boolean;
}

/**
 * Magnetic CTA: subtle cursor-follow with a spring.
 * Keeps content snappy, not gimmicky — ~6px max displacement.
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 6,
  className = '',
  href,
  onClick,
  type = 'button',
  ariaLabel,
  external,
}) => {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const nx = (e.clientX - cx) / rect.width;
    const ny = (e.clientY - cy) / rect.height;
    x.set(nx * strength * 2);
    y.set(ny * strength * 2);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const motionProps = {
    style: { x: sx, y: sy } as any,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    className,
    'aria-label': ariaLabel,
  };

  if (href) {
    return (
      <motion.a
        href={href}
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        onClick={onClick as any}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick as any}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
};
