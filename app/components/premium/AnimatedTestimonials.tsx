'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import { BGPattern } from './BGPattern';

export interface Testimonial {
  id: number;
  name: string;
  role?: string;
  company?: string;
  content: string;
  rating?: number;
  avatar?: string;
}

interface Props {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  badgeText?: string;
  testimonials: Testimonial[];
  autoRotateInterval?: number;
  trustedCompanies?: string[];
  trustedCompaniesTitle?: string;
}

const Star: React.FC = () => (
  <svg className="w-4 h-4 text-[#fee715]" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
    <path d="M10 1l2.928 5.93 6.546.952-4.737 4.617 1.118 6.519L10 16.93l-5.855 3.078 1.118-6.519L.526 7.882l6.546-.952L10 1z" />
  </svg>
);

export const AnimatedTestimonials: React.FC<Props> = ({
  title,
  subtitle,
  badgeText,
  testimonials,
  autoRotateInterval = 6000,
  trustedCompanies = [],
  trustedCompaniesTitle = 'Pracowałem z firmami i twórcami',
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [isInView, controls]);

  useEffect(() => {
    if (autoRotateInterval <= 0 || testimonials.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, autoRotateInterval);
    return () => clearInterval(interval);
  }, [autoRotateInterval, testimonials.length, isPaused]);

  if (testimonials.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] } },
  };

  const t = testimonials[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative px-4 md:px-8 lg:px-12 py-24 md:py-40 overflow-hidden border-t border-white/5"
    >
      {/* Background grid + subtle yellow glow */}
      <BGPattern variant="grid" mask="fade-edges" size={64} fill="rgba(255, 255, 255, 0.04)" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] pointer-events-none">
        <div
          className="absolute inset-0 rounded-full opacity-60 blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(254, 231, 21, 0.08), transparent 70%)' }}
        />
      </div>

      <motion.div
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="relative max-w-[88rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-28 items-center"
      >
        {/* Left: Heading + nav */}
        <motion.div variants={itemVariants} className="flex flex-col justify-center">
          {badgeText && (
            <div className="mb-7">
              <span className="section-pill">
                <Star />
                <span className="section-pill-divider" />
                <span className="section-pill-label">{badgeText}</span>
              </span>
            </div>
          )}
          <h2 className="cinematic-headline text-3xl md:text-5xl lg:text-[4rem] font-bold pb-3">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-7 max-w-xl text-base md:text-lg text-white/60 leading-relaxed text-balance">
              {subtitle}
            </p>
          )}

          {/* Dot navigation */}
          <div className="mt-10 flex items-center gap-2.5">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  activeIndex === index
                    ? 'w-12 bg-[#fee715]'
                    : 'w-1.5 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Pokaż opinię ${index + 1}`}
              />
            ))}
            <span className="ml-3 font-mono text-[11px] text-white/40">
              {String(activeIndex + 1).padStart(2, '0')}/{String(testimonials.length).padStart(2, '0')}
            </span>
          </div>

          {/* Prev/Next */}
          <div className="mt-6 flex items-center gap-2">
            <button
              onClick={() =>
                setActiveIndex((activeIndex - 1 + testimonials.length) % testimonials.length)
              }
              className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/10 text-white/70 hover:text-[#fee715] hover:border-[#fee715]/30 hover:bg-white/[0.08] transition-all flex items-center justify-center cursor-pointer"
              aria-label="Poprzednia opinia"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setActiveIndex((activeIndex + 1) % testimonials.length)}
              className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/10 text-white/70 hover:text-[#fee715] hover:border-[#fee715]/30 hover:bg-white/[0.08] transition-all flex items-center justify-center cursor-pointer"
              aria-label="Następna opinia"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Right: testimonial card */}
        <motion.div
          variants={itemVariants}
          className="relative h-full min-h-[440px] md:min-h-[480px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Subtle yellow glow behind the card (static, not pulsing) */}
          <div
            aria-hidden
            className="absolute -inset-6 rounded-[2rem] -z-10 opacity-50"
            style={{
              background:
                'radial-gradient(ellipse at 70% 50%, rgba(254, 231, 21, 0.08), transparent 70%)',
            }}
          />

          <AnimatePresence mode="wait">
            <motion.article
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
              className="absolute inset-0 rounded-3xl border border-white/[0.08] bg-[#0A0E20] p-10 md:p-12 lg:p-14 flex flex-col transition-colors duration-500 hover:border-white/[0.14]"
              itemScope
              itemType="https://schema.org/Review"
            >
              {/* Stars row */}
              {t.rating && (
                <div className="flex gap-1.5 mb-8">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} />
                  ))}
                </div>
              )}

              {/* Quote */}
              <div className="flex-1">
                <p
                  className="text-xl md:text-2xl lg:text-[1.6rem] text-white leading-[1.5] font-light tracking-[-0.01em] text-pretty"
                  itemProp="reviewBody"
                >
                  „{t.content}"
                </p>
              </div>

              {/* Author block */}
              <div
                className="mt-10 pt-7 border-t border-white/[0.07] flex items-center gap-4"
                itemScope
                itemType="https://schema.org/Person"
                itemProp="author"
              >
                {t.avatar ? (
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover"
                    loading="lazy"
                    itemProp="image"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-white/[0.05] border border-white/[0.10] text-white/70 flex items-center justify-center font-medium text-[13px]">
                    {t.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)}
                  </div>
                )}
                <div>
                  <h3 className="text-[15px] font-medium text-white" itemProp="name">
                    {t.name}
                  </h3>
                  {(t.role || t.company) && (
                    <p className="text-[13px] text-white/45 mt-0.5">
                      {t.role}
                      {t.role && t.company && ', '}
                      {t.company}
                    </p>
                  )}
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Logo cloud */}
      {trustedCompanies.length > 0 && (
        <motion.div
          initial="hidden"
          animate={controls}
          variants={itemVariants}
          className="relative mt-20 md:mt-28 max-w-[88rem] mx-auto"
        >
          <p className="text-center text-[11px] font-mono uppercase tracking-[0.22em] text-white/35 mb-8">
            {trustedCompaniesTitle}
          </p>
          <div className="overflow-hidden marquee-mask">
            <div className="flex animate-scroll-infinite whitespace-nowrap">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-12 md:gap-16 flex-shrink-0 pr-12 md:pr-16">
                  {trustedCompanies.map((company) => (
                    <span
                      key={`${i}-${company}`}
                      className="text-white/40 hover:text-white/70 transition-colors text-sm md:text-base font-medium"
                    >
                      {company}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};
