
import React from 'react';
import { Logo } from './icons/Logo';

export const Header: React.FC = () => {
  const navLinks = [
    { href: '#rozwiazanie', label: 'Na Czym To Polega?' },
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
    <header className="sticky top-0 z-50 bg-[#101820]/90 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
        <a href="#" className="text-xl md:text-2xl font-bold font-[Montserrat] text-[#fee715] group">
          <div className="relative">
            <Logo />
            <div className="absolute inset-0 bg-gradient-to-r from-[#fee715]/20 to-[#00C9A7]/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
          </div>
        </a>
        
        <nav className="hidden md:flex items-center space-x-2">
          {navLinks.map((link, index) => (
            <a 
              key={link.href} 
              href={link.href} 
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="group relative px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/5 bg-white/5 border border-white/10"
            >
              <span className="relative z-10 text-white group-hover:text-[#fee715] font-medium transition-colors duration-300">
                {link.label}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#fee715]/10 to-[#00C9A7]/10 rounded-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-[#fee715] to-[#00C9A7] group-hover:w-3/4 transition-all duration-300"></div>
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
          className="group relative bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-bold py-2 px-4 md:px-6 rounded-lg hover:shadow-2xl hover:shadow-[#fee715]/40 transform hover:-translate-y-1 transition-all duration-300 text-sm md:text-base overflow-hidden"
        >
          <span className="relative z-10">Umów rozmowę</span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#00C9A7] to-[#fee715] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </a>
      </div>
    </header>
  );
};
