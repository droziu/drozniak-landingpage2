'use client';

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';
import { CookieConsent } from './CookieConsent';

interface LayoutClientProps {
  children: React.ReactNode;
}

export const LayoutClient: React.FC<LayoutClientProps> = ({ children }) => {
  const pathname = usePathname();
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

  const isBlogRoute = pathname === '/blog' || pathname.startsWith('/blog/');

  // Nowa strona zawsze od samej góry, bez płynnego przewijania od dołu i bez hero przyciętego
  // pod paskiem (Next przewija do początku treści, a ta zaczyna się 72-84 px niżej).
  // Wstecz/dalej zostawiamy przeglądarce, która przywraca poprzednią pozycję; kotwice (#o-mnie) Nextowi.
  const fromHistory = useRef(false);
  const firstRender = useRef(true);
  useEffect(() => {
    const onPop = () => {
      fromHistory.current = true;
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  useLayoutEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (fromHistory.current) {
      fromHistory.current = false;
      return;
    }
    if (window.location.hash) return;
    const toTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    toTop();
    const raf = requestAnimationFrame(toTop);
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  useEffect(() => {
    try {
      // Load existing cookie preferences
      if (typeof window !== 'undefined') {
        const savedPreferences = localStorage.getItem('cookieConsent');
        if (savedPreferences) {
          setCookiePreferences(JSON.parse(savedPreferences));
        }
      }
    } catch (error) {
      console.error('Error in LayoutClient useEffect:', error);
    }
  }, [isPanelRoute, isBlogRoute]);

  const handleCookieAccept = (preferences: { necessary: boolean; performance: boolean; analytics: boolean }) => {
    setCookiePreferences(preferences);
  };

  if (isPanelRoute) {
    return <>{children}</>;
  }

  // Publiczna część - jasny motyw „Editorial Ink & Paper" (scope .site-pub)
  return (
    <div className="site-pub">
      <Header />
      <div id="tresc" tabIndex={-1} className="pt-[72px] lg:pt-[84px] outline-none">{children}</div>
      <Footer compact={pathname === '/kontakt'} />
      <CookieConsent onAccept={handleCookieAccept} />
    </div>
  );
};
