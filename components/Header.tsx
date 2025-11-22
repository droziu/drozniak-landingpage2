
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './icons/Logo';

export const Header: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isSystemPage = location.pathname === '/system';
  const isStronyWWWPage = location.pathname === '/strony-www';
  const isSzkoleniaPage = location.pathname === '/szkolenia';
  const isContactPage = location.pathname === '/kontakt';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#101820]/95 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4 md:px-6 py-2 md:py-5 flex justify-between items-center">
        <Link to="/" className="text-xl md:text-2xl font-bold font-[Montserrat] text-[#fee715] group">
          <div className="relative">
            <Logo />
            <div className="absolute inset-0 bg-gradient-to-r from-[#fee715]/20 to-[#00C9A7]/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
          </div>
        </Link>
        
            {/* Professional Navigation - Hidden on mobile */}
            <nav className="hidden md:flex items-center space-x-8 h-16">
              <Link 
                to="/" 
                className={`relative flex items-center h-16 text-sm font-medium transition-colors duration-200 ${
                  isHomePage ? 'text-[#fee715]' : 'text-gray-300 hover:text-white'
                }`}
              >
                Kim jestem
                {isHomePage && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-0.5 bg-gradient-to-r from-transparent via-[#fee715] to-transparent"></div>
                )}
              </Link>
              
              {/* Services Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                  className={`relative flex items-center h-16 text-sm font-medium transition-colors duration-200 ${
                    isSystemPage || isStronyWWWPage || isSzkoleniaPage ? 'text-[#fee715]' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Co oferuję
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  {(isSystemPage || isStronyWWWPage || isSzkoleniaPage) && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-0.5 bg-gradient-to-r from-transparent via-[#fee715] to-transparent"></div>
                  )}
                </button>
                
                {isServicesDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-[#101820] border border-white/20 rounded-lg shadow-xl z-50">
                    <div className="py-2">
                      <Link
                        to="/strony-www"
                        onClick={() => setIsServicesDropdownOpen(false)}
                        className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                          isStronyWWWPage 
                            ? 'text-[#fee715] bg-[#fee715]/10' 
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        Strony WWW
                      </Link>
                      <Link
                        to="/system"
                        onClick={() => setIsServicesDropdownOpen(false)}
                        className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                          isSystemPage 
                            ? 'text-[#fee715] bg-[#fee715]/10' 
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        Systemy sprzedażowe
                      </Link>
                      <Link
                        to="/szkolenia"
                        onClick={() => setIsServicesDropdownOpen(false)}
                        className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                          isSzkoleniaPage 
                            ? 'text-[#fee715] bg-[#fee715]/10' 
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        Szkolenia dla firm
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              <Link 
                to="/kontakt" 
                className={`relative flex items-center h-16 text-sm font-medium transition-colors duration-200 ${
                  isContactPage ? 'text-[#fee715]' : 'text-gray-300 hover:text-white'
                }`}
              >
                Kontakt
                {isContactPage && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-0.5 bg-gradient-to-r from-transparent via-[#fee715] to-transparent"></div>
                )}
              </Link>
        </nav>
        
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
                  className={`block w-full py-3 text-center text-base font-medium transition-all duration-300 relative ${
                    isHomePage ? 'text-[#fee715]' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Kim jestem
                  {isHomePage && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-[#fee715] to-transparent"></div>
                  )}
                </Link>
                
                {/* Services Section */}
                <div className="border-b border-white/10 pb-2">
                  <p className="text-gray-400 text-sm font-medium px-4 py-2">Co oferuję</p>
                  <Link 
                    to="/strony-www" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block w-full py-2 px-4 text-sm transition-all duration-300 ${
                      isStronyWWWPage 
                        ? 'text-[#fee715] bg-[#fee715]/10' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Strony WWW
                  </Link>
                  <Link 
                    to="/system" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block w-full py-2 px-4 text-sm transition-all duration-300 ${
                      isSystemPage 
                        ? 'text-[#fee715] bg-[#fee715]/10' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Systemy sprzedażowe
                  </Link>
                  <Link 
                    to="/szkolenia" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block w-full py-2 px-4 text-sm transition-all duration-300 ${
                      isSzkoleniaPage 
                        ? 'text-[#fee715] bg-[#fee715]/10' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Szkolenia dla firm
                  </Link>
                </div>
                
                <Link 
                  to="/kontakt" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block w-full py-3 text-center text-base font-medium transition-all duration-300 relative ${
                    isContactPage ? 'text-[#fee715]' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Kontakt
                  {isContactPage && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-[#fee715] to-transparent"></div>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
