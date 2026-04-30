import React from 'react';

type Variant = 'hero' | 'section' | 'subtle' | 'none';

interface BackgroundProps {
  variant?: Variant;
  className?: string;
}

/** Restrained, clean background — single yellow halo + dot grid. No aurora chaos. */
export const Background: React.FC<BackgroundProps> = ({ variant = 'section', className = '' }) => {
  if (variant === 'none') return null;

  if (variant === 'hero') {
    return (
      <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-dots bg-fade-radial opacity-60" />
        <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[120vw] h-[120vw] max-w-[1400px] max-h-[1400px] halo-yellow" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#0A0A0B]" />
      </div>
    );
  }

  if (variant === 'subtle') {
    return (
      <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-dots bg-fade-radial opacity-30" />
      </div>
    );
  }

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-dots bg-fade-radial opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] halo-yellow opacity-70" />
    </div>
  );
};
