'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface ElegantShapeProps {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  /** Tailwind gradient `from-...` class controlling the shape's tint. */
  gradient?: string;
  /** Vertical breathing amplitude in px (default 14). */
  floatY?: number;
  /** Horizontal drift amplitude in px (default 0 — no horizontal drift). */
  floatX?: number;
  /** Breathing animation duration in seconds (default 12). */
  duration?: number;
  /** Subtle rotation oscillation amplitude in degrees (default 0). */
  wobble?: number;
}

/**
 * Floating, slowly-drifting glass pill with a soft gold tint.
 * Rises in on mount, then breathes vertically (and optionally horizontally).
 * Mobile-scaled via Tailwind on a CSS-only wrapper.
 */
export const ElegantShape: React.FC<ElegantShapeProps> = ({
  className = '',
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = 'from-[#fee715]/[0.16]',
  floatY = 14,
  floatX = 0,
  duration = 12,
  wobble = 0,
}) => {
  const breathingAnim: Record<string, (number | string)[]> = {};
  if (floatY) breathingAnim.y = [0, floatY, 0];
  if (floatX) breathingAnim.x = [0, floatX, -floatX, 0];
  if (wobble) breathingAnim.rotate = [0, wobble, -wobble, 0];

  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96] as [number, number, number, number],
        opacity: { duration: 1.2 },
      }}
      className={`absolute will-change-transform ${className}`}
      aria-hidden
    >
      {/* CSS-only scale wrapper — separate stacking context, doesn't fight Framer transforms */}
      <div className="origin-center scale-[0.55] sm:scale-75 md:scale-100">
        <motion.div
          animate={breathingAnim}
          transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width, height }}
          className="relative"
        >
          <div
            className={[
              'absolute inset-0 rounded-full',
              'bg-gradient-to-r to-transparent',
              gradient,
              'backdrop-blur-[2px] border-2 border-[#fee715]/[0.18]',
              'shadow-[0_8px_32px_0_rgba(254,231,21,0.08)]',
              'after:absolute after:inset-0 after:rounded-full',
              'after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,240,150,0.24),transparent_70%)]',
            ].join(' ')}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};
