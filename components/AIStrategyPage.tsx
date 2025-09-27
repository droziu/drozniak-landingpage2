import React from 'react';
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

interface AIStrategyPageProps {
  cookiePreferences: {
    necessary: boolean;
    performance: boolean;
    analytics: boolean;
  } | null;
}

export const AIStrategyPage: React.FC<AIStrategyPageProps> = ({ cookiePreferences }) => {
  return (
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
  );
};
