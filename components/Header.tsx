
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './icons/Logo';

export const Header: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isSystemPage = location.pathname === '/system';
  const isStronyWWWPage = location.pathname === '/strony-www';
  const isSzkoleniaPage = location.pathname === '/szkolenia';
  const isZatrudnijMniePage = location.pathname === '/zatrudnij-mnie';
  const isContactPage = location.pathname === '/kontakt';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMikrofirmyDropdownOpen, setIsMikrofirmyDropdownOpen] = useState(false);
  const [isSrednieFirmyDropdownOpen, setIsSrednieFirmyDropdownOpen] = useState(false);
  const [isInneUslugiDropdownOpen, setIsInneUslugiDropdownOpen] = useState(false);
  const [isMobileMikrofirmyOpen, setIsMobileMikrofirmyOpen] = useState(false);
  const [isMobileSrednieFirmyOpen, setIsMobileSrednieFirmyOpen] = useState(false);
  const [isMobileInneUslugiOpen, setIsMobileInneUslugiOpen] = useState(false);
  const mikrofirmyDropdownRef = useRef<HTMLDivElement>(null);
  const srednieFirmyDropdownRef = useRef<HTMLDivElement>(null);
  const inneUslugiDropdownRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mikrofirmyDropdownRef.current && !mikrofirmyDropdownRef.current.contains(event.target as Node)) {
        setIsMikrofirmyDropdownOpen(false);
      }
      if (srednieFirmyDropdownRef.current && !srednieFirmyDropdownRef.current.contains(event.target as Node)) {
        setIsSrednieFirmyDropdownOpen(false);
      }
      if (inneUslugiDropdownRef.current && !inneUslugiDropdownRef.current.contains(event.target as Node)) {
        setIsInneUslugiDropdownOpen(false);
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
              
              {/* Dla mikrofirm i freelancerów */}
              <div className="relative" ref={mikrofirmyDropdownRef}>
                <button
                  onClick={() => setIsMikrofirmyDropdownOpen(!isMikrofirmyDropdownOpen)}
                  className={`relative flex items-center h-16 text-sm font-medium transition-colors duration-200 ${
                    isSystemPage ? 'text-[#fee715]' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Dla mikrofirm i freelancerów
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  {isSystemPage && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-0.5 bg-gradient-to-r from-transparent via-[#fee715] to-transparent"></div>
                  )}
                </button>
                
                {isMikrofirmyDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-[#101820] border border-white/20 rounded-lg shadow-xl z-50">
                    <div className="py-2">
                      <Link
                        to="/system"
                        onClick={() => setIsMikrofirmyDropdownOpen(false)}
                        className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                          isSystemPage 
                            ? 'text-[#fee715] bg-[#fee715]/10' 
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        System
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Dla małych i średnich firm */}
              <div className="relative" ref={srednieFirmyDropdownRef}>
                <button
                  onClick={() => setIsSrednieFirmyDropdownOpen(!isSrednieFirmyDropdownOpen)}
                  className={`relative flex items-center h-16 text-sm font-medium transition-colors duration-200 ${
                    isSzkoleniaPage || isZatrudnijMniePage ? 'text-[#fee715]' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Dla małych i średnich firm
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  {(isSzkoleniaPage || isZatrudnijMniePage) && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-0.5 bg-gradient-to-r from-transparent via-[#fee715] to-transparent"></div>
                  )}
                </button>
                
                {isSrednieFirmyDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-[#101820] border border-white/20 rounded-lg shadow-xl z-50">
                    <div className="py-2">
                      <Link
                        to="/szkolenia"
                        onClick={() => setIsSrednieFirmyDropdownOpen(false)}
                        className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                          isSzkoleniaPage 
                            ? 'text-[#fee715] bg-[#fee715]/10' 
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        Szkolenia
                      </Link>
                      <Link
                        to="/zatrudnij-mnie"
                        onClick={() => setIsSrednieFirmyDropdownOpen(false)}
                        className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                          isZatrudnijMniePage 
                            ? 'text-[#fee715] bg-[#fee715]/10' 
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        Zatrudnij mnie
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Inne usługi */}
              <div className="relative" ref={inneUslugiDropdownRef}>
                <button
                  onClick={() => setIsInneUslugiDropdownOpen(!isInneUslugiDropdownOpen)}
                  className={`relative flex items-center h-16 text-sm font-medium transition-colors duration-200 ${
                    isStronyWWWPage ? 'text-[#fee715]' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Inne usługi
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  {isStronyWWWPage && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-0.5 bg-gradient-to-r from-transparent via-[#fee715] to-transparent"></div>
                  )}
                </button>
                
                {isInneUslugiDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-[#101820] border border-white/20 rounded-lg shadow-xl z-50">
                    <div className="py-2">
                      <Link
                        to="/strony-www"
                        onClick={() => setIsInneUslugiDropdownOpen(false)}
                        className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                          isStronyWWWPage 
                            ? 'text-[#fee715] bg-[#fee715]/10' 
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        Strony WWW
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
            <div className="space-y-1">
              {/* Kim jestem */}
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
              
              {/* Dla mikrofirm i freelancerów */}
              <div>
                <button
                  onClick={() => setIsMobileMikrofirmyOpen(!isMobileMikrofirmyOpen)}
                  className={`w-full py-3 text-center text-base font-medium transition-all duration-300 relative flex items-center justify-center ${
                    isSystemPage 
                      ? 'text-[#fee715]' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Dla mikrofirm i freelancerów
                  <svg 
                    className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                      isMobileMikrofirmyOpen ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  {isSystemPage && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-[#fee715] to-transparent"></div>
                  )}
                </button>
                
                {isMobileMikrofirmyOpen && (
                  <div className="mt-2 space-y-1">
                    <Link 
                      to="/system" 
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsMobileMikrofirmyOpen(false);
                      }}
                      className={`block w-full py-2 px-4 text-sm transition-all duration-300 rounded ${
                        isSystemPage 
                          ? 'text-[#fee715] bg-[#fee715]/10' 
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      System
                    </Link>
                  </div>
                )}
              </div>

              {/* Dla małych i średnich firm */}
              <div>
                <button
                  onClick={() => setIsMobileSrednieFirmyOpen(!isMobileSrednieFirmyOpen)}
                  className={`w-full py-3 text-center text-base font-medium transition-all duration-300 relative flex items-center justify-center ${
                    isSzkoleniaPage || isZatrudnijMniePage
                      ? 'text-[#fee715]' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Dla małych i średnich firm
                  <svg 
                    className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                      isMobileSrednieFirmyOpen ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  {(isSzkoleniaPage || isZatrudnijMniePage) && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-[#fee715] to-transparent"></div>
                  )}
                </button>
                
                {isMobileSrednieFirmyOpen && (
                  <div className="mt-2 space-y-1">
                    <Link 
                      to="/szkolenia" 
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsMobileSrednieFirmyOpen(false);
                      }}
                      className={`block w-full py-2 px-4 text-sm transition-all duration-300 rounded ${
                        isSzkoleniaPage 
                          ? 'text-[#fee715] bg-[#fee715]/10' 
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      Szkolenia
                    </Link>
                    <Link 
                      to="/zatrudnij-mnie" 
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsMobileSrednieFirmyOpen(false);
                      }}
                      className={`block w-full py-2 px-4 text-sm transition-all duration-300 rounded ${
                        isZatrudnijMniePage 
                          ? 'text-[#fee715] bg-[#fee715]/10' 
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      Zatrudnij mnie
                    </Link>
                  </div>
                )}
              </div>

              {/* Inne usługi */}
              <div>
                <button
                  onClick={() => setIsMobileInneUslugiOpen(!isMobileInneUslugiOpen)}
                  className={`w-full py-3 text-center text-base font-medium transition-all duration-300 relative flex items-center justify-center ${
                    isStronyWWWPage 
                      ? 'text-[#fee715]' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Inne usługi
                  <svg 
                    className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                      isMobileInneUslugiOpen ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  {isStronyWWWPage && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-[#fee715] to-transparent"></div>
                  )}
                </button>
                
                {isMobileInneUslugiOpen && (
                  <div className="mt-2 space-y-1">
                    <Link 
                      to="/strony-www" 
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsMobileInneUslugiOpen(false);
                      }}
                      className={`block w-full py-2 px-4 text-sm transition-all duration-300 rounded ${
                        isStronyWWWPage 
                          ? 'text-[#fee715] bg-[#fee715]/10' 
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      Strony WWW
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Kontakt */}
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
      )}
    </header>
  );
};
