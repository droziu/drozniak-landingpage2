'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isService = isSystemPage || isStronyWWWPage || isSzkoleniaPage;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] as [number, number, number, number] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Top fade veil */}
      <div
        className={`absolute inset-x-0 top-0 h-20 transition-opacity duration-500 ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(180deg, rgba(10,10,11,0.85) 0%, rgba(10,10,11,0) 100%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <div
          className={`mt-3 md:mt-4 flex items-center justify-between gap-4 px-4 md:px-5 h-12 md:h-14 rounded-full transition-all duration-400 ${
            scrolled
              ? 'glass shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)]'
              : 'bg-transparent border border-transparent'
          }`}
        >
          <Link
            href="/"
            className="flex items-center text-[#fee715] cursor-pointer"
            aria-label="Strona główna"
          >
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="/" active={isHomePage}>Kim jestem</NavLink>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors duration-200 cursor-pointer ${
                  isService ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
                aria-expanded={isServicesOpen}
              >
                Co oferuję
                <svg
                  className={`w-3 h-3 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: [0.22, 0.61, 0.36, 1] as [number, number, number, number] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 rounded-2xl overflow-hidden p-1.5 bg-[#050714]/95 backdrop-blur-2xl border border-white/12 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]"
                  >
                    <DropdownLink
                      href="/strony-www"
                      title="Strony internetowe"
                      desc="Premium strony szyte na miarę"
                      active={isStronyWWWPage}
                      onClick={() => setIsServicesOpen(false)}
                    />
                    <DropdownLink
                      href="/system"
                      title="System pozyskiwania klientów"
                      desc="Strategia + automatyzacje + AI"
                      active={isSystemPage}
                      onClick={() => setIsServicesOpen(false)}
                    />
                    <DropdownLink
                      href="/szkolenia"
                      title="Szkolenia z AI"
                      desc="Warsztaty dla zespołów"
                      active={isSzkoleniaPage}
                      onClick={() => setIsServicesOpen(false)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink href="/blog" active={isBlogPage}>Blog</NavLink>
            <NavLink href="/kontakt" active={isContactPage}>Kontakt</NavLink>
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/kontakt"
              className="btn btn-primary"
              style={{ height: 36, padding: '0 14px', fontSize: 13 }}
            >
              Umów rozmowę
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
            aria-expanded={isMobileMenuOpen}
            className="md:hidden relative w-9 h-9 flex flex-col justify-center items-center gap-1.5 cursor-pointer rounded-full hover:bg-white/5 transition-colors"
          >
            <div className={`w-4 h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
            <div className={`w-4 h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-4 h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] as [number, number, number, number] }}
              className="md:hidden absolute left-4 right-4 mt-2 rounded-2xl overflow-hidden bg-[#050714]/95 backdrop-blur-2xl border border-white/12 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]"
            >
              <div className="p-2 space-y-0.5">
                <MobileLink href="/" active={isHomePage} onClick={() => setIsMobileMenuOpen(false)}>
                  Kim jestem
                </MobileLink>

                <button
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-medium transition-all cursor-pointer ${
                    isService ? 'text-[#fee715] bg-[#fee715]/8' : 'text-white/80 hover:bg-white/5'
                  }`}
                >
                  <span>Co oferuję</span>
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${isMobileServicesOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {isMobileServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-3 ml-3 space-y-0.5 border-l border-white/10 my-1">
                        <MobileLink
                          href="/strony-www"
                          active={isStronyWWWPage}
                          small
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsMobileServicesOpen(false);
                          }}
                        >
                          Strony internetowe
                        </MobileLink>
                        <MobileLink
                          href="/system"
                          active={isSystemPage}
                          small
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsMobileServicesOpen(false);
                          }}
                        >
                          System pozyskiwania klientów
                        </MobileLink>
                        <MobileLink
                          href="/szkolenia"
                          active={isSzkoleniaPage}
                          small
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsMobileServicesOpen(false);
                          }}
                        >
                          Szkolenia z AI
                        </MobileLink>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <MobileLink href="/blog" active={isBlogPage} onClick={() => setIsMobileMenuOpen(false)}>
                  Blog
                </MobileLink>
                <MobileLink href="/kontakt" active={isContactPage} onClick={() => setIsMobileMenuOpen(false)}>
                  Kontakt
                </MobileLink>

                <div className="pt-2 px-1">
                  <Link
                    href="/kontakt"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn btn-primary w-full"
                  >
                    Umów rozmowę
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

const NavLink: React.FC<{ href: string; active: boolean; children: React.ReactNode }> = ({
  href,
  active,
  children,
}) => (
  <Link
    href={href}
    className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors duration-200 cursor-pointer ${
      active ? 'text-white' : 'text-white/60 hover:text-white'
    }`}
  >
    {children}
  </Link>
);

const DropdownLink: React.FC<{
  href: string;
  title: string;
  desc: string;
  active: boolean;
  onClick: () => void;
}> = ({ href, title, desc, active, onClick }) => (
  <Link
    href={href}
    onClick={onClick}
    className={`block px-3.5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
      active ? 'bg-[#fee715]/8' : 'hover:bg-white/5'
    }`}
  >
    <div className={`text-sm font-medium ${active ? 'text-[#fee715]' : 'text-white'}`}>{title}</div>
    <div className="text-xs text-white/50 mt-0.5">{desc}</div>
  </Link>
);

const MobileLink: React.FC<{
  href: string;
  active: boolean;
  onClick: () => void;
  small?: boolean;
  children: React.ReactNode;
}> = ({ href, active, onClick, small = false, children }) => (
  <Link
    href={href}
    onClick={onClick}
    className={`block px-4 ${small ? 'py-2 text-[13px]' : 'py-3 text-sm'} rounded-xl font-medium transition-all cursor-pointer ${
      active ? 'text-[#fee715] bg-[#fee715]/8' : 'text-white/80 hover:text-white hover:bg-white/5'
    }`}
  >
    {children}
  </Link>
);
