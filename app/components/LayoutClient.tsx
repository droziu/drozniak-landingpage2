'use client';

import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { StickyCTA } from './StickyCTA';
import { CookieConsent } from './CookieConsent';

interface LayoutClientProps {
  children: React.ReactNode;
}

export const LayoutClient: React.FC<LayoutClientProps> = ({ children }) => {
  const [isStickyCtaVisible, setStickyCtaVisible] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState<{
    necessary: boolean;
    performance: boolean;
    analytics: boolean;
  } | null>(null);

  useEffect(() => {
    // Load existing cookie preferences
    const savedPreferences = localStorage.getItem('cookieConsent');
    if (savedPreferences) {
      setCookiePreferences(JSON.parse(savedPreferences));
    }

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
  }, []);

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
      <Header />
      {children}
      <Footer />
      <StickyCTA isVisible={isStickyCtaVisible} />
      <CookieConsent onAccept={handleCookieAccept} />
    </>
  );
};
