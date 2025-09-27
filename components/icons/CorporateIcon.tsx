import React from 'react';

interface CorporateIconProps {
  className?: string;
}

export const CorporateIcon: React.FC<CorporateIconProps> = ({ className = "w-6 h-6" }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M3 21H21M5 21V7L12 3L19 7V21M9 9H15M9 13H15M9 17H15" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};
