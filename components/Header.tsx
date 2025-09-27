
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './icons/Logo';

export const Header: React.FC = () => {
  const location = useLocation();
  const isFreelancerPage = location.pathname === '/freelancer';

  return (
    <header className="sticky top-0 z-50 bg-[#101820]/95 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4 md:px-6 py-4 md:py-5 flex justify-between items-center">
        <Link to="/" className="text-xl md:text-2xl font-bold font-[Montserrat] text-[#fee715] group">
          <div className="relative">
            <Logo />
            <div className="absolute inset-0 bg-gradient-to-r from-[#fee715]/20 to-[#00C9A7]/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
          </div>
        </Link>
        
        {/* Wave-style Page Navigation */}
        <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10 relative overflow-hidden">
          {/* Wave background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#fee715]/10 to-[#00C9A7]/10 rounded-full opacity-50"></div>
          
          <Link 
            to="/" 
            className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 relative z-10 ${
              !isFreelancerPage 
                ? 'bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] shadow-lg transform scale-105' 
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Full Package
          </Link>
          <Link 
            to="/freelancer" 
            className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 relative z-10 ${
              isFreelancerPage 
                ? 'bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] shadow-lg transform scale-105' 
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Freelancer Landing Page
          </Link>
        </div>
        
        {/* CTA Button */}
        <a 
          href="#cta" 
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#cta')?.scrollIntoView({
              behavior: 'smooth'
            });
          }}
          className="group relative bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-bold py-2 px-4 md:px-6 rounded-lg hover:shadow-2xl hover:shadow-[#fee715]/40 transform hover:-translate-y-0.5 transition-all duration-300 text-sm md:text-base overflow-hidden"
        >
          <span className="relative z-10">{isFreelancerPage ? 'Umów konsultację' : 'Umów rozmowę'}</span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#00C9A7] to-[#fee715] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </a>
      </div>
    </header>
  );
};
