import React from 'react';

interface SectionLabelProps {
  /** Kept for backwards compat — no longer rendered. */
  number?: string;
  label: string;
  align?: 'left' | 'center';
  className?: string;
}

/**
 * Subtle uppercase eyebrow label.
 * No pill, no number — just clean tracked typography in yellow.
 */
export const SectionLabel: React.FC<SectionLabelProps> = ({ label, align = 'left', className = '' }) => {
  return (
    <p
      className={`font-mono text-[11px] uppercase tracking-[0.22em] text-[#fee715] ${
        align === 'center' ? 'text-center' : ''
      } ${className}`}
    >
      {label}
    </p>
  );
};
