import React from 'react';
import { Hero } from './Hero';
import { AboutMe } from './AboutMe';
import { Problem } from './Problem';
import { FomoAI } from './FomoAI';
import { Solution } from './Solution';
import { Process } from './Process';
import { CaseStudies } from './CaseStudies';
import { Pricing } from './Pricing';
import { TargetAudience } from './TargetAudience';
import { Testimonials } from './Testimonials';
import { FinalCTA } from './FinalCTA';

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
      <div className="hidden">
        <CaseStudies />
      </div>
      <Pricing />
      <TargetAudience />
      <Testimonials />
      <FinalCTA cookiePreferences={cookiePreferences} />
    </main>
  );
};
