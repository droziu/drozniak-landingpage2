'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { EnvelopeSimple, LinkedinLogo, Phone } from 'phosphor-react';
import { openCookieSettings } from './CookieConsent';
import { Wordmark } from './BrandLogo';

/**
 * Stopka według księgi marki (strona i landing page): jedyna zielona płaszczyzna na stronie,
 * jeden nagłówek, jedno zdanie, jeden przycisk, dane kontaktowe z ikonami w kolorze tekstu,
 * na dole napis w negatywie na całą szerokość, z polem ochronnym.
 * compact: na stronie kontaktu bez drugiego bloku kontaktu, zostaje stopka prawna i napis.
 */
export const Footer: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const year = new Date().getFullYear();
  const nameRef = useRef<HTMLDivElement>(null);

  // Kropka nad „ż” opada na miejsce, gdy napis wjeżdża w widok (raz). Bez JS po prostu stoi.
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
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <footer className="site-footer" aria-labelledby={compact ? undefined : 'site-contact'} data-compact={compact ? 'true' : undefined}>
      <div className="site-wrap">
        {!compact && (
          <div className="site-footer-main">
            <div className="site-footer-call">
              <h2 id="site-contact" className="hp-h2">
                Porozmawiajmy
              </h2>
              <p className="site-footer-lead">
                Napisz kilka zdań o&nbsp;firmie albo wybierz termin rozmowy. Odpowiadam w&nbsp;ciągu 24&nbsp;godzin
                w&nbsp;dni robocze.
              </p>
              <div>
                <Link href="/umow" className="site-btn site-btn-accent">
                  Umów rozmowę
                </Link>
              </div>
            </div>

            <div className="site-footer-side">
              <ul className="site-footer-contact">
                <li>
                  <a href="mailto:stanislaw@drozniak.com">
                    <EnvelopeSimple size={20} weight="regular" aria-hidden="true" />
                    stanislaw@drozniak.com
                  </a>
                </li>
                <li>
                  <a href="tel:+48792491196">
                    <Phone size={20} weight="regular" aria-hidden="true" />
                    +48 792 491 196
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/stanislawdrozniak" target="_blank" rel="noopener noreferrer">
                    <LinkedinLogo size={20} weight="regular" aria-hidden="true" />
                    LinkedIn
                  </a>
                </li>
              </ul>
              <nav className="site-footer-links" aria-label="Oferta">
                <Link href="/system-pozyskiwania-klientow">Wdrożenie systemu</Link>
                <Link href="/prowadzenie-marketingu">Stała współpraca</Link>
                <Link href="/szkolenia">Szkolenia</Link>
                <Link href="/kontakt">Kontakt</Link>
              </nav>
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
        <Wordmark className="site-footer-name-svg" title="Drożniak" />
      </div>
    </footer>
  );
};
