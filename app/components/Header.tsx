'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/icons/Logo';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isSystemPage = pathname === '/system';
  const isStronyWWWPage = pathname === '/strony-www';
  const isSzkoleniaPage = pathname === '/szkolenia';
  const isContactPage = pathname === '/kontakt';
  const isBlogPage = pathname.startsWith('/blog');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
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
        <Link href="/" className="text-xl md:text-2xl font-bold font-[Montserrat] text-[#fee715]">
          <Logo />
        </Link>
        
            {/* Professional Navigation - Hidden on mobile */}
            <nav className="hidden md:flex items-center space-x-8 h-16">
              <Link 
                href="/" 
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
                        href="/strony-www"
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
                        href="/system"
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
                        href="/szkolenia"
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
                href="/kontakt" 
                className={`relative flex items-center h-16 text-sm font-medium transition-colors duration-200 ${
                  isContactPage ? 'text-[#fee715]' : 'text-gray-300 hover:text-white'
                }`}
              >
                Kontakt
                {isContactPage && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-0.5 bg-gradient-to-r from-transparent via-[#fee715] to-transparent"></div>
                )}
              </Link>
              
              <Link 
                href="/blog" 
                className={`relative flex items-center h-16 text-sm font-medium transition-colors duration-200 ${
                  isBlogPage ? 'text-[#fee715]' : 'text-gray-300 hover:text-white'
                }`}
              >
                Blog
                {isBlogPage && (
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
                href="/" 
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
              
              {/* Co oferuję - with dropdown */}
              <div>
                <button
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                  className={`w-full py-3 text-center text-base font-medium transition-all duration-300 relative flex items-center justify-center ${
                    isSystemPage || isStronyWWWPage || isSzkoleniaPage 
                      ? 'text-[#fee715]' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Co oferuję
                  <svg 
                    className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                      isMobileServicesOpen ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  {(isSystemPage || isStronyWWWPage || isSzkoleniaPage) && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-[#fee715] to-transparent"></div>
                  )}
                </button>
                
                {/* Services Dropdown */}
                {isMobileServicesOpen && (
                  <div className="mt-2 space-y-1">
                    <Link 
                      href="/strony-www" 
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsMobileServicesOpen(false);
                      }}
                      className={`block w-full py-2 px-4 text-sm transition-all duration-300 rounded ${
                        isStronyWWWPage 
                          ? 'text-[#fee715] bg-[#fee715]/10' 
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      Strony WWW
                    </Link>
                    <Link 
                      href="/system" 
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsMobileServicesOpen(false);
                      }}
                      className={`block w-full py-2 px-4 text-sm transition-all duration-300 rounded ${
                        isSystemPage 
                          ? 'text-[#fee715] bg-[#fee715]/10' 
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      Systemy sprzedażowe
                    </Link>
                    <Link 
                      href="/szkolenia" 
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsMobileServicesOpen(false);
                      }}
                      className={`block w-full py-2 px-4 text-sm transition-all duration-300 rounded ${
                        isSzkoleniaPage 
                          ? 'text-[#fee715] bg-[#fee715]/10' 
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      Szkolenia dla firm
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Kontakt */}
              <Link 
                href="/kontakt" 
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
              
              {/* Blog */}
              <Link 
                href="/blog" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block w-full py-3 text-center text-base font-medium transition-all duration-300 relative ${
                  isBlogPage ? 'text-[#fee715]' : 'text-gray-300 hover:text-white'
                }`}
              >
                Blog
                {isBlogPage && (
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
