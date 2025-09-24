import React from 'react';

export const RocketIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" 
      fill="currentColor"
    />
    <path 
      d="M12 16L13.5 20L18 18L13.5 19L12 24L10.5 19L6 18L10.5 20L12 16Z" 
      fill="currentColor"
      opacity="0.7"
    />
    <path 
      d="M12 2L10.5 6L6 4L10.5 5L12 10L13.5 5L18 4L13.5 6L12 2Z" 
      fill="currentColor"
      opacity="0.5"
    />
  </svg>
);
