'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';
import { StickyCTA } from './StickyCTA';
import { CookieConsent } from './CookieConsent';

interface LayoutClientProps {
  children: React.ReactNode;
}

export const LayoutClient: React.FC<LayoutClientProps> = ({ children }) => {
  const pathname = usePathname();
  const [isStickyCtaVisible, setStickyCtaVisible] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState<{
    necessary: boolean;
    performance: boolean;
    analytics: boolean;
  } | null>(null);

  // Sprawdź czy jesteśmy na ścieżkach panelu/admina (nie pokazuj Header/Footer)
  const isPanelRoute = 
    pathname === '/login' || 
    pathname === '/panel' || 
    pathname === '/admin' || 
    pathname === '/profile' ||
    pathname.startsWith('/panel/') ||
    pathname.startsWith('/admin/') ||
    pathname.startsWith('/profile/') ||
    pathname.startsWith('/p/') || // Public proposals
    pathname.startsWith('/o/'); // PDF proposals

  useEffect(() => {
    try {
      // Load existing cookie preferences
      if (typeof window !== 'undefined') {
        const savedPreferences = localStorage.getItem('cookieConsent');
        if (savedPreferences) {
          setCookiePreferences(JSON.parse(savedPreferences));
        }

        // Tylko dla publicznych stron - sticky CTA
        if (!isPanelRoute) {
          const handleScroll = () => {
            // Show sticky CTA after scrolling past the hero section (e.g., 800px)
            if (window.scrollY > 800) {
              setStickyCtaVisible(true);
            } else {
              setStickyCtaVisible(false);
            }
          };

          window.addEventListener('scroll', handleScroll);
          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
        }
      }
    } catch (error) {
      console.error('Error in LayoutClient useEffect:', error);
    }
  }, [isPanelRoute]);

  const handleCookieAccept = (preferences: { necessary: boolean; performance: boolean; analytics: boolean }) => {
    setCookiePreferences(preferences);
    
    // Load Calendly only if performance cookies are accepted
    if (preferences.performance) {
      // Calendly will be loaded by the FinalCTA component
      console.log('Performance cookies accepted - Calendly will load');
    }
  };

  return (
    <>
      {!isPanelRoute && <Header />}
      {children}
      {!isPanelRoute && <Footer />}
      {!isPanelRoute && <StickyCTA isVisible={isStickyCtaVisible} />}
      {!isPanelRoute && <CookieConsent onAccept={handleCookieAccept} />}
    </>
  );
};
