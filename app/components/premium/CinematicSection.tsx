'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CinematicSectionProps {
  /** The huge ghost text in the background (e.g. "Pogadajmy", "DROZNIAK") */
  ghost: string;
  className?: string;
  ghostClassName?: string;
  /** Position of the ghost text — "bottom" (default) or "center" or "top" */
  ghostPosition?: 'bottom' | 'center' | 'top';
  children: React.ReactNode;
  /** Optional id */
  id?: string;
}

/**
 * Cinematic section — giant scroll-triggered ghost text + aurora pulse + diagonal marquee-friendly.
 * Use as a wrapper around hero/CTA sections to give them the footer's vibe.
 */
export const CinematicSection: React.FC<CinematicSectionProps> = ({
  ghost,
  className = '',
  ghostClassName = '',
  ghostPosition = 'bottom',
  children,
  id,
}) => {
  const wrapperRef = useRef<HTMLElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      // Ghost text parallax
      gsap.fromTo(
        ghostRef.current,
        { y: '8vh', scale: 0.85, opacity: 0 },
        {
          y: '0vh',
          scale: 1,
          opacity: 1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top 90%',
            end: 'bottom bottom',
            scrub: 1,
          },
        }
      );

      // Content lift on scroll-in
      const content = contentRef.current;
      if (content) {
        const blocks = Array.from(content.children) as HTMLElement[];
        gsap.fromTo(
          blocks,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: 'top 70%',
              end: 'top 30%',
              scrub: 1,
            },
          }
        );
      }
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const ghostPositionClass =
    ghostPosition === 'top'
      ? '-top-[6vh]'
      : ghostPosition === 'center'
        ? 'top-1/2 -translate-y-1/2'
        : '-bottom-[8vh]';

  return (
    <section
      ref={wrapperRef}
      id={id}
      className={`relative px-4 md:px-8 lg:px-12 py-32 md:py-44 border-t border-white/5 overflow-hidden ${className}`}
    >
      {/* Aurora */}
      <div className="aurora-pulse absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[80px] pointer-events-none z-0" />

      {/* Giant ghost text */}
      <div
        ref={ghostRef}
        aria-hidden
        className={`giant-bg-text absolute left-1/2 -translate-x-1/2 z-0 ${ghostPositionClass} ${ghostClassName}`}
      >
        {ghost}
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 max-w-[88rem] mx-auto">
        {children}
      </div>
    </section>
  );
};
