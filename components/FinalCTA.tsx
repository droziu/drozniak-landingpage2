
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

interface FinalCTAProps {
  cookiePreferences: {
    necessary: boolean;
    performance: boolean;
    analytics: boolean;
  } | null;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ cookiePreferences }) => {
    const fadeInSection = useFadeIn<HTMLDivElement>();
    const calendlyRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
      let isInitialized = false;

      // Only load Calendly if performance cookies are accepted
      if (!cookiePreferences?.performance) {
        return;
      }

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
            url: 'https://calendly.com/stanislaw-drozniak/30min?hide_gdpr_banner=1&background_color=101820&text_color=ffffff&primary_color=fee715',
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
    }, [cookiePreferences]);

  return (
    <section id="cta" className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-r from-[#fee715] to-[#00C9A7]">
      <div ref={fadeInSection.ref} className={`container mx-auto max-w-4xl text-center px-2 ${fadeInSection.className}`}>
        <h2 className="font-[Montserrat] text-3xl md:text-4xl lg:text-6xl font-extrabold text-[#101820] mb-6">Gotów na system, który sprzedaje?</h2>
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 md:p-8 max-w-4xl mx-auto mb-6 md:mb-10">
          <p className="text-lg md:text-xl text-[#101820]/90 max-w-2xl mx-auto mb-4">
            Pracuję maksymalnie z 5 klientami miesięcznie. Jeśli chcesz, żebym przygotował taki system dla Ciebie w ciągu najbliższych 6 tygodni - zarezerwuj rozmowę.
          </p>
          <p className="text-base md:text-lg text-[#101820]/70 max-w-3xl mx-auto leading-relaxed">
            Rozmowa jest zupełnie niezobowiązująca - przeanalizujemy wspólnie Twój biznes, ja zaproponuję rozwiązania i ustalimy czy chcemy pracować razem.
          </p>
        </div>
        <div className="mt-6 md:mt-8">
          {cookiePreferences?.performance ? (
            <div ref={calendlyRef} className="calendly-container" style={{minWidth: '320px', height: '700px', position: 'relative', zIndex: 1}}></div>
          ) : (
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 max-w-md mx-auto">
              <h3 className="font-[Montserrat] text-xl font-bold text-[#101820] mb-4">Zarezerwuj rozmowę</h3>
              <p className="text-[#101820]/80 mb-6">Aby zobaczyć kalendarz, zaakceptuj pliki cookies wydajności w bannerze na dole strony.</p>
              <a 
                href="https://calendly.com/stanislaw-drozniak/30min" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#101820] text-white font-bold py-3 px-6 rounded-lg hover:bg-black transition-colors duration-300 inline-block"
              >
                Otwórz kalendarz w nowej karcie
              </a>
            </div>
          )}
          <p className="text-[#101820]/70 text-xs md:text-sm mt-4">Jeśli kalendarz się nie wyświetla, kliknij <a href="https://calendly.com/stanislaw-drozniak/30min" target="_blank" rel="noopener noreferrer" className="underline">tutaj</a> aby otworzyć w nowej karcie.</p>
        </div>

      </div>
    </section>
  );
};
