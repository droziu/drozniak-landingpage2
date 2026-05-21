'use client';

import React from 'react';
import { ElegantShape } from './ElegantShape';

type Variant = 'signature' | 'case' | 'compact' | 'minimal';

interface HeroShapesProps {
  /**
   * Visual variant — all share the same gold/yellow brand palette
   * but differ in shape count, positions, sizes and animation timing.
   *
   * - `signature` — homepage. 5 shapes, full layered composition.
   * - `case` — strony-www / freelancer. 4 shapes, asymmetric, slight wobble.
   * - `compact` — system / szkolenia. 3 shapes, balanced, slow drift.
   * - `minimal` — kontakt / blog. 2 shapes, very subtle, just enough atmosphere.
   */
  variant?: Variant;
  className?: string;
}

/**
 * Floating gold pill composition for the hero — same visual language across pages,
 * unique configuration per variant so each page feels distinct.
 */
export const HeroShapes: React.FC<HeroShapesProps> = ({ variant = 'signature', className = '' }) => {
  // Non-homepage variants get a darker veil for better contrast
  const isPrimary = variant === 'signature';
  const veilOpacity = isPrimary ? '[0.04]' : '[0.06]';

  return (
    <>
      {/* Darker base for sub-pages so the headline has stronger contrast */}
      {!isPrimary && <div className="absolute inset-0 bg-[#030516]/55 pointer-events-none" />}

      {/* Soft global wash */}
      <div className={`absolute inset-0 bg-gradient-to-br from-[#fee715]/${veilOpacity} via-transparent to-violet-500/${veilOpacity} blur-3xl pointer-events-none ${className}`} />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {variant === 'signature' && <SignatureShapes />}
        {variant === 'case' && <CaseShapes />}
        {variant === 'compact' && <CompactShapes />}
        {variant === 'minimal' && <MinimalShapes />}
      </div>

      {/* Top + bottom fade frame */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050714] via-[#050714]/60 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050714] via-[#050714]/60 to-transparent pointer-events-none" />
    </>
  );
};

const SignatureShapes: React.FC = () => (
  <>
    <ElegantShape
      delay={0.3}
      width={620}
      height={150}
      rotate={12}
      duration={11}
      gradient="from-[#fee715]/[0.20]"
      className="left-[-15%] md:left-[-5%] top-[14%] md:top-[18%]"
    />
    <ElegantShape
      delay={0.5}
      width={520}
      height={130}
      rotate={-15}
      duration={14}
      gradient="from-[#FFD60A]/[0.16]"
      className="right-[-12%] md:right-[-2%] top-[68%] md:top-[72%]"
    />
    <ElegantShape
      delay={0.4}
      width={320}
      height={90}
      rotate={-8}
      duration={13}
      gradient="from-[#F59E0B]/[0.14]"
      className="left-[2%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
    />
    <ElegantShape
      delay={0.6}
      width={220}
      height={64}
      rotate={20}
      duration={10}
      gradient="from-[#fee715]/[0.14]"
      className="hidden sm:block right-[15%] md:right-[20%] top-[10%] md:top-[14%]"
    />
    <ElegantShape
      delay={0.7}
      width={160}
      height={44}
      rotate={-25}
      duration={15}
      gradient="from-[#FFF066]/[0.12]"
      className="hidden sm:block left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
    />
  </>
);

/** Case-study heroes (strony-www, freelancer): tilted, more diagonal, with subtle wobble. */
const CaseShapes: React.FC = () => (
  <>
    <ElegantShape
      delay={0.3}
      width={580}
      height={140}
      rotate={-10}
      duration={13}
      wobble={1.2}
      gradient="from-[#fee715]/[0.18]"
      className="left-[-8%] md:left-[-3%] top-[20%] md:top-[24%]"
    />
    <ElegantShape
      delay={0.55}
      width={460}
      height={120}
      rotate={18}
      duration={11}
      wobble={1.5}
      gradient="from-[#FFD60A]/[0.15]"
      className="right-[-10%] md:right-[2%] top-[60%] md:top-[64%]"
    />
    <ElegantShape
      delay={0.45}
      width={260}
      height={72}
      rotate={28}
      duration={14}
      gradient="from-[#F59E0B]/[0.13]"
      className="hidden sm:block right-[20%] md:right-[25%] top-[8%] md:top-[12%]"
    />
    <ElegantShape
      delay={0.7}
      width={180}
      height={50}
      rotate={-30}
      duration={12}
      wobble={2}
      gradient="from-[#FFF066]/[0.12]"
      className="left-[10%] md:left-[14%] bottom-[10%] md:bottom-[14%]"
    />
  </>
);

/** Compact heroes (system, szkolenia): balanced, slower drift, less density. */
const CompactShapes: React.FC = () => (
  <>
    <ElegantShape
      delay={0.3}
      width={540}
      height={130}
      rotate={8}
      duration={15}
      gradient="from-[#fee715]/[0.18]"
      className="left-[-10%] md:left-[-2%] top-[16%] md:top-[20%]"
    />
    <ElegantShape
      delay={0.55}
      width={380}
      height={100}
      rotate={-12}
      duration={13}
      gradient="from-[#FFD60A]/[0.15]"
      className="right-[-8%] md:right-[2%] top-[60%] md:top-[64%]"
    />
    <ElegantShape
      delay={0.7}
      width={210}
      height={60}
      rotate={-22}
      duration={16}
      gradient="from-[#FFF066]/[0.13]"
      className="hidden sm:block left-[55%] md:left-[58%] top-[6%] md:top-[10%]"
    />
  </>
);

/** Minimal heroes (kontakt, blog): just two soft pills — subtle atmosphere. */
const MinimalShapes: React.FC = () => (
  <>
    <ElegantShape
      delay={0.3}
      width={460}
      height={120}
      rotate={-6}
      duration={16}
      gradient="from-[#fee715]/[0.15]"
      className="left-[-10%] md:left-[-2%] top-[20%] md:top-[28%]"
    />
    <ElegantShape
      delay={0.5}
      width={320}
      height={88}
      rotate={14}
      duration={14}
      gradient="from-[#FFD60A]/[0.12]"
      className="right-[-10%] md:right-[2%] top-[55%] md:top-[60%]"
    />
  </>
);
