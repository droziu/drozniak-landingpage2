
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutMe } from './components/AboutMe';
import { Problem } from './components/Problem';
import { FomoAI } from './components/FomoAI';
import { Solution } from './components/Solution';
import { Process } from './components/Process';
import { CaseStudies } from './components/CaseStudies';
import { Pricing } from './components/Pricing';
import { TargetAudience } from './components/TargetAudience';
import { Testimonials } from './components/Testimonials';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { StickyCTA } from './components/StickyCTA';
import { CookieConsent } from './components/CookieConsent';

const App: React.FC = () => {
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
    <div className="bg-[#101820] text-white font-[Open Sans] overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <AboutMe />
        <Problem />
        <FomoAI />
        <Solution />
        <Process />
        <CaseStudies />
        <Pricing />
        <TargetAudience />
        <Testimonials />
        <FinalCTA cookiePreferences={cookiePreferences} />
      </main>
      <Footer />
      <StickyCTA isVisible={isStickyCtaVisible} />
      <CookieConsent onAccept={handleCookieAccept} />
    </div>
  );
};

export default App;
