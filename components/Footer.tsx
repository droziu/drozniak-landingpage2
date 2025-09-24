
import React from 'react';
import { Logo } from './icons/Logo';
import { LinkedinIcon } from './icons/LinkedinIcon';
import { TwitterIcon } from './icons/TwitterIcon';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B1218] text-gray-400 py-16 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          
          <div className="md:col-span-1">
            <h4 className="font-[Montserrat] text-lg font-bold text-white mb-4">O mnie</h4>
            <p className="text-sm leading-relaxed">
              Pomagam małym firmom i freelancerom tworzyć systemy marketingowe, które realnie zwiększają wyniki. Łączę strategię, technologię i AI, aby dostarczać rozwiązania, które po prostu działają.
            </p>
          </div>

          <div className="md:col-span-1 md:text-center">
             <div className="text-2xl font-bold font-[Montserrat] text-[#fee715] mb-4">
               <Logo />
             </div>
             <p className="text-sm">&copy; {new Date().getFullYear()} Drozniak.com Wszelkie prawa zastrzeżone.</p>
          </div>

          <div className="md:col-span-1 md:text-right">
             <h4 className="font-[Montserrat] text-lg font-bold text-white mb-4">Znajdź mnie</h4>
             <div className="flex space-x-4 md:justify-end mb-6">
                <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors duration-300"><LinkedinIcon className="w-6 h-6"/></a>
                <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors duration-300"><TwitterIcon className="w-6 h-6"/></a>
             </div>
             <a href="#" className="text-sm hover:text-white transition-colors">Polityka Prywatności</a>
          </div>

        </div>
      </div>
    </footer>
  );
};
