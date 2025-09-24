
import React from 'react';

interface StickyCTAProps {
  isVisible: boolean;
}

export const StickyCTA: React.FC<StickyCTAProps> = ({ isVisible }) => {
  return (
    <div className={`fixed bottom-4 right-4 md:bottom-5 md:right-5 z-50 transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
      <a 
        href="#cta"
        onClick={(e) => {
          e.preventDefault();
          document.querySelector('#cta')?.scrollIntoView({
            behavior: 'smooth'
          });
        }}
        className="bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-bold py-2 md:py-3 px-4 md:px-6 rounded-full shadow-2xl hover:shadow-[#fee715]/40 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 text-sm md:text-base"
      >
        <span>Umów rozmowę</span>
      </a>
    </div>
  );
};
