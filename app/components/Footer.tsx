'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { openCookieSettings } from './CookieConsent';
import { Wordmark } from './BrandLogo';

/**
 * Jedno zamknięcie strony: kontakt i stopka w jednym ciemnym polu,
 * na dole nazwa przycięta przez krawędź ekranu.
 * compact: na stronie kontaktu bez drugiego bloku kontaktu, zostaje stopka prawna i nazwa.
 */
export const Footer: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const year = new Date().getFullYear();
  const nameRef = useRef<HTMLDivElement>(null);

  // Kropka nad „ż” ląduje, gdy duży napis wjeżdża w widok (raz). Bez JS po prostu stoi.
  useEffect(() => {
    const el = nameRef.current;
    if (!el || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.dataset.anim = 'ready';
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.dataset.anim = 'in';
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <footer className="site-footer" aria-labelledby={compact ? undefined : 'site-contact'} data-compact={compact ? 'true' : undefined}>
      <div className="site-wrap">
        {!compact && (
        <div className="site-footer-main">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h2 id="site-contact" className="hp-h2">
              Kontakt
            </h2>
            <p className="site-footer-lead">Napisz kilka zdań o&nbsp;firmie. Odpowiadam w&nbsp;ciągu 24&nbsp;godzin w&nbsp;dni robocze.</p>
            <a href="mailto:stanislaw@drozniak.com" className="site-footer-mail">
              stanislaw@drozniak.com
            </a>
          </div>
          <div className="site-footer-actions">
            <Link href="/umow" className="site-btn site-btn-accent">
              Umów rozmowę
            </Link>
            <div className="site-footer-links">
              <a href="tel:+48792491196">+48 792 491 196</a>
              <a href="https://www.linkedin.com/in/stanislawdrozniak" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <Link href="/system-pozyskiwania-klientow">Wdrożenie systemu</Link>
              <Link href="/prowadzenie-marketingu">Stała współpraca</Link>
              <Link href="/szkolenia">Szkolenia</Link>
            </div>
          </div>
        </div>
        )}

        <div className="site-footer-legal">
          <span>© {year} Stanisław Drożniak</span>
          <span className="site-footer-legal-links">
            <Link href="/polityka-prywatnosci">Polityka prywatności</Link>
            <button type="button" onClick={openCookieSettings}>
              Ustawienia cookies
            </button>
          </span>
        </div>
      </div>
      <div className="site-footer-name" ref={nameRef}>
        <Wordmark className="site-footer-name-svg" />
      </div>
    </footer>
  );
};
