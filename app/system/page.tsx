'use client';

import { Hero } from '@/components/Hero';
import { AboutMe } from '@/components/AboutMe';
import { Problem } from '@/components/Problem';
import { FomoAI } from '@/components/FomoAI';
import { Solution } from '@/components/Solution';
import { Process } from '@/components/Process';
import { CaseStudies } from '@/components/CaseStudies';
import { Pricing } from '@/components/Pricing';
import { TargetAudience } from '@/app/components/TargetAudience';
import { Testimonials } from '@/components/Testimonials';
import { FinalCTA } from '@/app/components/FinalCTA';
import { useState, useEffect } from 'react';

export default function AIStrategyPage() {
  const [cookiePreferences, setCookiePreferences] = useState<{
    necessary: boolean;
    performance: boolean;
    analytics: boolean;
  } | null>(null);

  useEffect(() => {
    const savedPreferences = localStorage.getItem('cookieConsent');
    if (savedPreferences) {
      setCookiePreferences(JSON.parse(savedPreferences));
    }
  }, []);

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
}
