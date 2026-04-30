'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface WordRevealProps {
  text: string;
  className?: string;
  /** Per-word stagger (seconds) */
  stagger?: number;
  /** Initial delay before first word (seconds) */
  delay?: number;
  /** Optional yellow highlight on a sub-string */
  highlight?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

/**
 * Word-by-word reveal animation for headlines.
 * Each word fades up and de-blurs in sequence — premium, fast (~700ms total).
 */
export const WordReveal: React.FC<WordRevealProps> = ({
  text,
  className = '',
  stagger = 0.06,
  delay = 0,
  highlight,
  as = 'h1',
}) => {
  const reduce = useReducedMotion();
  const Comp: any = motion[as as keyof typeof motion] ?? motion.h1;

  if (reduce) {
    return <Comp className={className}>{text}</Comp>;
  }

  const words = text.split(' ');

  return (
    <Comp className={className} aria-label={text}>
      {words.map((word, i) => {
        const isHighlighted = !!highlight && word.replace(/[.,!?;:]/g, '').toLowerCase().startsWith(
          highlight.replace(/[.,!?;:]/g, '').toLowerCase().split(' ')[0]
        );
        return (
          <React.Fragment key={i}>
            <motion.span
              initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.7,
                delay: delay + i * stagger,
                ease: [0.22, 0.61, 0.36, 1],
              }}
              className="inline-block"
              aria-hidden
            >
              {word}
            </motion.span>
            {i < words.length - 1 && ' '}
          </React.Fragment>
        );
      })}
    </Comp>
  );
};
