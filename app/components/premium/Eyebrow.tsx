import React from 'react';

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center';
}

/**
 * Subtle uppercase eyebrow label — no pill, no dot.
 * Just clean tracked typography in brand yellow.
 */
export const Eyebrow: React.FC<EyebrowProps> = ({ children, className = '', align = 'left' }) => {
  return (
    <p
      className={`font-mono text-[11px] uppercase tracking-[0.22em] text-[#fee715] ${
        align === 'center' ? 'text-center' : ''
      } ${className}`}
    >
      {children}
    </p>
  );
};
