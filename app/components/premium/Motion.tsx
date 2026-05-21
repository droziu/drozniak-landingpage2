'use client';

import { motion, useReducedMotion, type Variants, type HTMLMotionProps } from 'framer-motion';
import React from 'react';

const ease = [0.22, 0.61, 0.36, 1] as [number, number, number, number];

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease },
  },
};

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease } },
};

export const staggerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

interface FadeUpProps extends Omit<HTMLMotionProps<'div'>, 'variants'> {
  delay?: number;
  as?: 'div' | 'section' | 'span' | 'h1' | 'h2' | 'h3' | 'p';
  /** When true, will animate when in viewport. Otherwise on mount. */
  whenInView?: boolean;
}

export const FadeUp: React.FC<FadeUpProps> = ({
  children,
  delay = 0,
  as = 'div',
  whenInView = true,
  className,
  ...rest
}) => {
  const reduce = useReducedMotion();
  const Comp: any = (motion as any)[as] ?? motion.div;

  if (reduce) return <Comp className={className} {...rest}>{children}</Comp>;

  const animation = whenInView
    ? { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-80px' } }
    : { initial: 'hidden', animate: 'show' };

  return (
    <Comp
      variants={fadeUpVariants}
      transition={{ delay }}
      className={className}
      {...animation}
      {...rest}
    >
      {children}
    </Comp>
  );
};

export const Stagger: React.FC<HTMLMotionProps<'div'> & { whenInView?: boolean }> = ({
  children,
  className,
  whenInView = true,
  ...rest
}) => {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children as React.ReactNode}</div>;

  const animation = whenInView
    ? { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-80px' } }
    : { initial: 'hidden', animate: 'show' };

  return (
    <motion.div variants={staggerVariants} className={className} {...animation} {...rest}>
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<HTMLMotionProps<'div'>> = ({ children, className, ...rest }) => {
  return (
    <motion.div variants={fadeUpVariants} className={className} {...rest}>
      {children}
    </motion.div>
  );
};

/** Smooth hover lift for cards */
export const Lift: React.FC<HTMLMotionProps<'div'>> = ({ children, className, ...rest }) => {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children as React.ReactNode}</div>;
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};
