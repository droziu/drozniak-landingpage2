import React from 'react';

interface MobileIconProps {
  className?: string;
}

export const MobileIcon: React.FC<MobileIconProps> = ({ className = "w-6 h-6" }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect 
        x="5" 
        y="2" 
        width="14" 
        height="20" 
        rx="2" 
        ry="2" 
        stroke="currentColor" 
        strokeWidth="2"
      />
      <line 
        x1="12" 
        y1="18" 
        x2="12.01" 
        y2="18" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
    </svg>
  );
};
