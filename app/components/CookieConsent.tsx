'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface CookieConsentProps {
  onAccept: (preferences: { necessary: boolean; performance: boolean; analytics: boolean }) => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ onAccept }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    performance: false,
    analytics: false,
  });

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    // Tylko w trybie deweloperskim: ?bez-cookies ukrywa baner na potrzeby zrzutów i pomiarów
    const skipForDev =
      process.env.NODE_ENV === 'development' && new URLSearchParams(window.location.search).has('bez-cookies');
    if (!cookieConsent && !skipForDev) {
      const t = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(t);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = { necessary: true, performance: true, analytics: true };
    setPreferences(allAccepted);
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
    setIsVisible(false);
    onAccept(allAccepted);
  };

  const handleAcceptSelected = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    setIsVisible(false);
    onAccept(preferences);
  };

  const handleRejectAll = () => {
    const onlyNecessary = { necessary: true, performance: false, analytics: false };
    setPreferences(onlyNecessary);
    localStorage.setItem('cookieConsent', JSON.stringify(onlyNecessary));
    setIsVisible(false);
    onAccept(onlyNecessary);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] as [number, number, number, number] }}
          className="fixed z-[60] left-3 right-3 bottom-[calc(12px+env(safe-area-inset-bottom))] md:left-6 md:right-auto md:bottom-6 md:w-[400px]"
          role="region"
          aria-label="Pliki cookies"
        >
          <div className="site-cookie">
            <p className="site-cookie-text">
              Strona używa plików cookies, także do statystyk.{' '}
              <Link href="/polityka-prywatnosci" className="site-link">
                Polityka prywatności
              </Link>
              {', '}
              <button
                type="button"
                onClick={() => setIsExpanded((v) => !v)}
                aria-expanded={isExpanded}
                className="site-cookie-more"
              >
                {isExpanded ? 'zwiń ustawienia' : 'ustawienia'}
              </button>
            </p>

            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] as [number, number, number, number] }}
                  className="overflow-hidden"
                >
                  <div className="space-y-2 pt-3">
                    <Toggle label="Niezbędne" desc="Wymagane do działania strony" checked disabled />
                    <Toggle
                      label="Wydajność"
                      desc="Narzędzia zewnętrzne"
                      checked={preferences.performance}
                      onChange={(v) => setPreferences((p) => ({ ...p, performance: v }))}
                    />
                    <Toggle
                      label="Analityka"
                      desc="Google Analytics, statystyki"
                      checked={preferences.analytics}
                      onChange={(v) => setPreferences((p) => ({ ...p, analytics: v }))}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="site-cookie-actions">
              <button type="button" onClick={handleAcceptAll} className="site-btn site-btn-ink site-btn-small">
                Akceptuję
              </button>
              {isExpanded ? (
                <button type="button" onClick={handleAcceptSelected} className="site-btn site-btn-quiet site-btn-small">
                  Zapisz wybór
                </button>
              ) : (
                <button type="button" onClick={handleRejectAll} className="site-btn site-btn-quiet site-btn-small">
                  Tylko niezbędne
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Toggle: React.FC<{
  label: string;
  desc: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}> = ({ label, desc, checked, disabled, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => !disabled && onChange?.(!checked)}
    disabled={disabled}
    className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-[12px] bg-[#F6F5F1] transition-colors ${
      disabled ? 'cursor-default opacity-70' : 'hover:bg-[#EFEDE6] cursor-pointer'
    }`}
  >
    <div className="text-left min-w-0">
      <div className="text-sm font-semibold text-[#161511]">{label}</div>
      <div className="text-[13px] text-[#4A4740] mt-0.5">{desc}</div>
    </div>
    <span
      className={`relative inline-flex h-5 w-9 flex-shrink-0 items-center rounded-full transition-colors ${
        checked ? 'bg-[#161511]' : 'bg-[#D6D2C6]'
      }`}
      aria-hidden
    >
      <span
        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-[#FFFFFF] transition-transform ${
          checked ? 'translate-x-[18px]' : 'translate-x-1'
        }`}
      />
    </span>
  </button>
);
