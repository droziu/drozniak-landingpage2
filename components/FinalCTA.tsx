
import React, { useEffect, useRef } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';

// Declare Calendly global
declare global {
  interface Window {
    Calendly: {
      initInlineWidget: (options: {
        url: string;
        parentElement: Element | null;
        prefill: any;
        utm: any;
      }) => void;
    };
  }
}

export const FinalCTA: React.FC = () => {
    const fadeInSection = useFadeIn<HTMLDivElement>();
    const calendlyRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
      let isInitialized = false;

      // Load Calendly script dynamically to avoid conflicts
      const loadCalendlyScript = () => {
        if (!window.Calendly) {
          const script = document.createElement('script');
          script.src = 'https://assets.calendly.com/assets/external/widget.js';
          script.async = true;
          script.onload = () => {
            // Initialize widget after script loads
            setTimeout(initCalendly, 100);
          };
          document.head.appendChild(script);
        } else {
          initCalendly();
        }
      };

      // Initialize Calendly widget manually with custom colors
      const initCalendly = () => {
        if (window.Calendly && calendlyRef.current && !isInitialized) {
          console.log('Initializing Calendly widget...');
          isInitialized = true;
          
          // Clear any existing content
          calendlyRef.current.innerHTML = '';
          
          window.Calendly.initInlineWidget({
            url: 'https://calendly.com/stanislaw-drozniak/30min?background_color=101820&text_color=ffffff&primary_color=fee715',
            parentElement: calendlyRef.current,
            prefill: {},
            utm: {}
          });
        } else if (!isInitialized) {
          console.log('Calendly not ready, retrying...');
          setTimeout(initCalendly, 500);
        }
      };

      // Start loading after component mounts
      setTimeout(loadCalendlyScript, 1000);

      // Cleanup function
      return () => {
        if (calendlyRef.current) {
          calendlyRef.current.innerHTML = '';
        }
      };
    }, []);

  return (
    <section id="cta" className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-r from-[#fee715] to-[#00C9A7]">
      <div ref={fadeInSection.ref} className={`container mx-auto max-w-4xl text-center px-2 ${fadeInSection.className}`}>
        <h2 className="font-[Montserrat] text-3xl md:text-4xl lg:text-6xl font-extrabold text-[#101820] mb-6">Gotów na system, który sprzedaje?</h2>
        <p className="text-lg md:text-xl text-[#101820]/80 max-w-2xl mx-auto mb-6 md:mb-10">
          Pracuję maksymalnie z 5 klientami miesięcznie. Jeśli chcesz, żebym przygotował taki system dla Ciebie w ciągu najbliższych 6 tygodni - zarezerwuj rozmowę.
        </p>
        <p className="text-base md:text-lg text-[#101820]/70 max-w-3xl mx-auto mb-6 md:mb-10 leading-relaxed">
          Rozmowa jest zupełnie niezobowiązująca - przeanalizujemy wspólnie Twój biznes, ja zaproponuję rozwiązania i ustalimy czy chcemy pracować razem.
        </p>
        <div className="mt-6 md:mt-8">
          <div ref={calendlyRef} className="calendly-container" style={{minWidth: '320px', height: '700px', position: 'relative', zIndex: 1}}></div>
          <p className="text-[#101820]/70 text-xs md:text-sm mt-4">Jeśli kalendarz się nie wyświetla, kliknij <a href="https://calendly.com/stanislaw-drozniak/30min" target="_blank" rel="noopener noreferrer" className="underline">tutaj</a> aby otworzyć w nowej karcie.</p>
        </div>

      </div>
    </section>
  );
};
