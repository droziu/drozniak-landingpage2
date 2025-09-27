
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './icons/Logo';

export const Header: React.FC = () => {
  const location = useLocation();
  const isFreelancerPage = location.pathname === '/freelancer';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#101820]/95 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4 md:px-6 py-4 md:py-5 flex justify-between items-center">
        <Link to="/" className="text-xl md:text-2xl font-bold font-[Montserrat] text-[#fee715] group">
          <div className="relative">
            <Logo />
            <div className="absolute inset-0 bg-gradient-to-r from-[#fee715]/20 to-[#00C9A7]/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
          </div>
        </Link>
        
            {/* Wave-style Page Navigation - Hidden on mobile */}
            <div className="hidden md:block relative">
              {/* Wave background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#fee715]/5 to-[#00C9A7]/5 rounded-full blur-sm"></div>
              
              {/* Navigation container with wave effect */}
              <div className="relative flex items-center bg-white/5 rounded-full p-1 border border-white/10 overflow-hidden">
                {/* Animated wave background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#fee715]/10 to-[#00C9A7]/10 rounded-full opacity-60 animate-pulse"></div>
                
                {/* Active indicator wave */}
                <div 
                  className={`absolute top-0 left-0 h-full bg-gradient-to-r from-[#fee715] to-[#00C9A7] rounded-full transition-all duration-500 ease-out ${
                    isFreelancerPage ? 'translate-x-full' : 'translate-x-0'
                  }`}
                  style={{ width: '50%' }}
                ></div>
                
                <Link 
                  to="/" 
                  className={`relative z-10 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    !isFreelancerPage 
                      ? 'text-[#101820] font-bold' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Kompletny System
                </Link>
                <Link 
                  to="/freelancer" 
                  className={`relative z-10 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isFreelancerPage 
                      ? 'text-[#101820] font-bold' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Strona Dla Freelancera
                </Link>
              </div>
            </div>
        
        {/* Desktop CTA Button - Hidden on mobile */}
        <a 
          href="#cta" 
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#cta')?.scrollIntoView({
              behavior: 'smooth'
            });
          }}
          className="hidden md:block group relative bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-bold py-2 px-4 md:px-6 rounded-lg hover:shadow-2xl hover:shadow-[#fee715]/40 transform hover:-translate-y-0.5 transition-all duration-300 text-sm md:text-base overflow-hidden"
        >
          <span className="relative z-10">{isFreelancerPage ? 'Umów konsultację' : 'Umów rozmowę'}</span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#00C9A7] to-[#fee715] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </a>

        {/* Mobile Hamburger Menu */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center space-y-1 group"
        >
          <div className={`w-6 h-0.5 bg-[#fee715] transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-[#fee715] transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-[#fee715] transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#101820] border-b border-white/20 shadow-2xl z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="space-y-3">
              {/* Page Selection - Simple and Clear */}
              <div className="space-y-2">
                <Link 
                  to="/" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block w-full py-3 text-center text-base font-medium transition-all duration-300 ${
                    !isFreelancerPage 
                      ? 'text-[#fee715] border-b border-[#fee715]/30' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Kompletny System
                </Link>
                <Link 
                  to="/freelancer" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block w-full py-3 text-center text-base font-medium transition-all duration-300 ${
                    isFreelancerPage 
                      ? 'text-[#fee715] border-b border-[#fee715]/30' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Strona Dla Freelancera
                </Link>
              </div>

              {/* CTA Button */}
              <div className="pt-3 border-t border-white/10">
                <a 
                  href="#cta" 
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    document.querySelector('#cta')?.scrollIntoView({
                      behavior: 'smooth'
                    });
                  }}
                  className="block w-full bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-bold py-3 px-4 rounded-lg text-center hover:shadow-2xl hover:shadow-[#fee715]/30 transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  {isFreelancerPage ? 'Umów konsultację' : 'Umów rozmowę'}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
