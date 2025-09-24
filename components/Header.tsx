
import React from 'react';
import { Logo } from './icons/Logo';

export const Header: React.FC = () => {
  const navLinks = [
    { href: '#rozwiazanie', label: 'Rozwiązanie' },
    { href: '#case', label: 'Case Studies' },
    { href: '#cena', label: 'Cena' },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#101820]/80 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
        <a href="#" className="text-xl md:text-2xl font-bold font-[Montserrat] text-[#fee715]">
          <Logo />
        </a>
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.href} 
              href={link.href} 
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="text-white hover:text-[#fee715] transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a 
          href="#cta" 
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#cta')?.scrollIntoView({
              behavior: 'smooth'
            });
          }}
          className="bg-[#fee715] text-[#101820] font-bold py-2 px-4 md:px-6 rounded-md hover:bg-gradient-to-r hover:from-[#fee715] hover:to-[#00C9A7] hover:shadow-lg hover:shadow-[#fee715]/20 transform hover:-translate-y-1 transition-all duration-300 text-sm md:text-base"
        >
          Umów rozmowę
        </a>
      </div>
    </header>
  );
};
