import React from 'react';
import { Eyebrow } from './Eyebrow';

interface SectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
}) => {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  return (
    <div className={`max-w-3xl ${alignClass} ${className}`}>
      {eyebrow && <Eyebrow align={align}>{eyebrow}</Eyebrow>}
      <h2 className={`headline-display-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white ${eyebrow ? 'mt-5' : ''}`}>
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base md:text-lg text-slate-300 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
