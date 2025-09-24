
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Problem } from './components/Problem';
import { FomoAI } from './components/FomoAI';
import { Solution } from './components/Solution';
import { Process } from './components/Process';
import { CaseStudies } from './components/CaseStudies';
import { Pricing } from './components/Pricing';
import { AIPractice } from './components/AIPractice';
import { Testimonials } from './components/Testimonials';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { StickyCTA } from './components/StickyCTA';

const App: React.FC = () => {
  const [isStickyCtaVisible, setStickyCtaVisible] = useState(false);

  useEffect(() => {
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

  return (
    <div className="bg-[#101820] text-white font-[Open Sans] overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Problem />
        <FomoAI />
        <Solution />
        <Process />
        <CaseStudies />
        <Pricing />
        <AIPractice />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA isVisible={isStickyCtaVisible} />
    </div>
  );
};

export default App;
