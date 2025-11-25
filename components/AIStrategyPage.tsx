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
import { useSEO } from '../hooks/useSEO';

interface AIStrategyPageProps {
  cookiePreferences: {
    necessary: boolean;
    performance: boolean;
    analytics: boolean;
  } | null;
}

export const AIStrategyPage: React.FC<AIStrategyPageProps> = ({ cookiePreferences }) => {
  useSEO({
    title: 'System pozyskiwania klientów dla małych firm i freelancerów | Stanisław Drożniak',
    description: 'System pozyskiwania klientów dla małych firm i freelancerów. Jak zbudować system pozyskiwania klientów w małej firmie? Ile kosztuje system pozyskiwania klientów? Sprawdź moją ofertę.',
    keywords: 'system pozyskiwania klientów, system pozyskiwania klientów dla małych firm, jak pozyskiwać klientów jako freelancer, jak zbudować system pozyskiwania klientów, pozyskiwanie klientów z internetu',
    ogTitle: 'System pozyskiwania klientów dla małych firm i freelancerów',
    ogDescription: 'System pozyskiwania klientów dla małych firm. Strona www + narzędzia + AI. Sprawdź, jak zbudować system pozyskiwania klientów.',
  });

  return (
    <main>
      <Hero />
      <Problem />
      <FomoAI />
      <Solution />
      <div className="hidden">
        <CaseStudies />
      </div>
      <Process />
      <Pricing />
      <TargetAudience />
      <AboutMe />
      <div className="hidden">
        <Testimonials />
      </div>
      <FinalCTA cookiePreferences={cookiePreferences} />
    </main>
  );
};
