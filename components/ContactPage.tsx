import React, { useEffect } from 'react';
import { ContactForm } from './ContactForm';
import { ContactAside } from './ContactAside';

export const ContactPage: React.FC = () => {
  // Reset scroll position to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="py-16 md:py-24 px-4 md:px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-[Montserrat] text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
            Kontakt
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Napisz krótko, czego potrzebujesz. Odpowiadam zwykle w 24 godziny.
          </p>
        </div>

        {/* 12-column grid layout */}
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          {/* Form - Col 1-7 on desktop, full width on tablet/mobile */}
          <div className="col-span-12 lg:col-span-7">
            <ContactForm />
          </div>

          {/* Separator - hidden on mobile */}
          <div className="hidden lg:block col-span-1">
            <div className="h-full w-px bg-white/10"></div>
          </div>

          {/* Aside - Col 8-12 on desktop, full width on tablet/mobile */}
          <div className="col-span-12 lg:col-span-4">
            <ContactAside />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm">
            Zwykle odpisuję w ciągu 24 godzin • Twoje dane są bezpieczne • <a href="/polityka-prywatnosci" className="text-[#fee715] hover:text-white transition-colors">Polityka prywatności</a>
          </p>
        </div>
      </div>
    </main>
  );
};
