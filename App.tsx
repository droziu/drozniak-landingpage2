
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { AIStrategyPage } from './components/AIStrategyPage';
import { FreelancerLanding } from './components/FreelancerLanding';
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
    <Router>
      <div className="bg-[#101820] text-white font-[Open Sans] overflow-x-hidden">
        <Header />
        <Routes>
          <Route path="/" element={<AIStrategyPage cookiePreferences={cookiePreferences} />} />
          <Route path="/freelancer" element={<FreelancerLanding />} />
        </Routes>
        <Footer />
        <StickyCTA isVisible={isStickyCtaVisible} />
        <CookieConsent onAccept={handleCookieAccept} />
      </div>
    </Router>
  );
};

export default App;
