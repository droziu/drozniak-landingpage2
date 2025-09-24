
import React from 'react';

export const Logo: React.FC = () => (
    <img 
        src="/images/DROZNIAK_LOGO.svg" 
        alt="Drozniak Logo" 
        className="h-8 md:h-10 w-auto"
        style={{ filter: 'brightness(0) saturate(100%) invert(85%) sepia(100%) saturate(2000%) hue-rotate(45deg) brightness(1.2) contrast(1.1)' }}
    />
);
