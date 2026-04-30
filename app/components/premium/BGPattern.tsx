import React from 'react';

type BGVariantType = 'dots' | 'diagonal-stripes' | 'grid' | 'horizontal-lines' | 'vertical-lines' | 'checkerboard';
type BGMaskType =
  | 'fade-center'
  | 'fade-edges'
  | 'fade-top'
  | 'fade-bottom'
  | 'fade-left'
  | 'fade-right'
  | 'fade-x'
  | 'fade-y'
  | 'none';

interface BGPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BGVariantType;
  mask?: BGMaskType;
  size?: number;
  fill?: string;
}

const maskImage: Record<BGMaskType, string> = {
  'fade-edges': 'radial-gradient(ellipse at center, #000 25%, transparent 75%)',
  'fade-center': 'radial-gradient(ellipse at center, transparent 25%, #000 75%)',
  'fade-top': 'linear-gradient(to bottom, transparent, #000)',
  'fade-bottom': 'linear-gradient(to bottom, #000, transparent)',
  'fade-left': 'linear-gradient(to right, transparent, #000)',
  'fade-right': 'linear-gradient(to right, #000, transparent)',
  'fade-x': 'linear-gradient(to right, transparent, #000, transparent)',
  'fade-y': 'linear-gradient(to bottom, transparent, #000, transparent)',
  none: '',
};

function getBgImage(variant: BGVariantType, fill: string, size: number): string | undefined {
  switch (variant) {
    case 'dots':
      return `radial-gradient(${fill} 1px, transparent 1px)`;
    case 'grid':
      return `linear-gradient(to right, ${fill} 1px, transparent 1px), linear-gradient(to bottom, ${fill} 1px, transparent 1px)`;
    case 'diagonal-stripes':
      return `repeating-linear-gradient(45deg, ${fill}, ${fill} 1px, transparent 1px, transparent ${size}px)`;
    case 'horizontal-lines':
      return `linear-gradient(to bottom, ${fill} 1px, transparent 1px)`;
    case 'vertical-lines':
      return `linear-gradient(to right, ${fill} 1px, transparent 1px)`;
    case 'checkerboard':
      return `linear-gradient(45deg, ${fill} 25%, transparent 25%), linear-gradient(-45deg, ${fill} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${fill} 75%), linear-gradient(-45deg, transparent 75%, ${fill} 75%)`;
  }
}

/**
 * Versatile BG patterns with mask support.
 * Defaults tuned for dark navy theme — subtle white lines with low opacity.
 */
export const BGPattern: React.FC<BGPatternProps> = ({
  variant = 'grid',
  mask = 'none',
  size = 56,
  fill = 'rgba(255, 255, 255, 0.05)',
  className = '',
  style,
  ...props
}) => {
  const bgSize =
    variant === 'checkerboard' ? `${size}px ${size}px` : `${size}px ${size}px`;
  const backgroundPosition =
    variant === 'checkerboard'
      ? `0 0, 0 ${size / 2}px, ${size / 2}px -${size / 2}px, -${size / 2}px 0px`
      : undefined;
  const backgroundImage = getBgImage(variant, fill, size);
  const maskValue = maskImage[mask];

  return (
    <div
      aria-hidden
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage,
        backgroundSize: bgSize,
        backgroundPosition,
        ...(maskValue
          ? {
              WebkitMaskImage: maskValue,
              maskImage: maskValue,
            }
          : {}),
        ...style,
      }}
      {...props}
    />
  );
};
