'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/icons/Logo';
import { LinkedinIcon } from '@/components/icons/LinkedinIcon';
import { TwitterIcon } from '@/components/icons/TwitterIcon';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B1218] text-gray-400 py-16 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          
          <div className="md:col-span-1">
            <h4 className="font-[Montserrat] text-lg font-bold text-white mb-4">O mnie</h4>
            <p className="text-sm leading-relaxed">
              Pomagam małym firmom i freelancerom zdobywać klientów przez lepszą ofertę, stronę internetową i reklamy. Analizuję, gdzie uciekają zapytania i sprzedaż, a potem układam cały proces tak, żeby działał w praktyce: od wejścia na stronę do kontaktu i decyzji zakupowej.
            </p>
          </div>

          <div className="md:col-span-1 md:text-center">
             <div className="text-2xl font-bold font-[Montserrat] text-[#fee715] mb-4 flex justify-center">
               <Logo />
             </div>
             <p className="text-sm mb-3">&copy; {new Date().getFullYear()} Drozniak.pl Wszelkie prawa zastrzeżone.</p>
             <Link href="/polityka-prywatnosci" className="text-sm hover:text-white transition-colors">Polityka Prywatności</Link>
          </div>

          <div className="md:col-span-1 md:text-right">
             <h4 className="font-[Montserrat] text-lg font-bold text-white mb-4">Kontakt</h4>
             <div className="space-y-2">
                <p className="text-sm">
                  <a href="mailto:stanislaw@drozniak.com" className="text-gray-400 hover:text-[#fee715] transition-colors duration-300">
                    stanislaw@drozniak.com
                  </a>
                </p>
                <p className="text-sm">
                  <a href="tel:+48792491196" className="text-gray-400 hover:text-[#fee715] transition-colors duration-300">
                    +48 792 491 196
                  </a>
                </p>
             </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
