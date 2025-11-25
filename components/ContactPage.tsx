import React, { useEffect } from 'react';
import { ContactForm } from './ContactForm';
import { ContactAside } from './ContactAside';
import { useSEO } from '../hooks/useSEO';

export const ContactPage: React.FC = () => {
  useSEO({
    title: 'Kontakt - System pozyskiwania klientów i strony WWW | Stanisław Drożniak',
    description: 'Skontaktuj się w sprawie systemu pozyskiwania klientów, strony internetowej dla małej firmy lub szkolenia z AI w marketingu. Odpowiadam w 24 godziny.',
    keywords: 'kontakt, system pozyskiwania klientów, strony www dla małych firm, szkolenia AI',
    ogTitle: 'Kontakt - System pozyskiwania klientów i strony WWW',
    ogDescription: 'Skontaktuj się w sprawie systemu pozyskiwania klientów, strony internetowej lub szkolenia z AI w marketingu.',
  });

  // Reset scroll position to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="py-16 md:py-24 px-4 md:px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header - left aligned */}
        <div className="mb-8 md:mb-12">
          <h1 className="font-[Montserrat] text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
            Kontakt
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-[60ch]">
            Opisz krótko, czego potrzebujesz – zwykle wracam z odpowiedzią w ciągu 24 godzin.
          </p>
        </div>

        {/* Two column layout: 70% form, 30% aside */}
        <div className="grid grid-cols-1 lg:grid-cols-[70%_1fr] gap-8 lg:gap-12 items-start">
          {/* Form - Main action */}
          <div>
            <ContactForm />
          </div>

          {/* Aside - Other channels */}
          <div>
            <ContactAside />
          </div>
        </div>
      </div>
    </main>
  );
};
