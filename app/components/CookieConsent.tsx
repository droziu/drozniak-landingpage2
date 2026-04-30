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
    if (!cookieConsent) {
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
          transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 md:bottom-6 md:left-auto md:right-6 md:w-[420px] z-[60]"
        >
          <div className="relative rounded-2xl bg-[#050714]/95 backdrop-blur-2xl border border-white/12 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8),0_0_0_1px_rgba(254,231,21,0.06)] overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#fee715]/40 to-transparent" />

            <div className="p-6 md:p-7">
              {/* Header */}
              <div className="flex items-start gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-[#fee715]/10 border border-[#fee715]/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-[#fee715]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 2a10 10 0 1010 10 4 4 0 01-4-4 4 4 0 01-4-4 4 4 0 01-4-2zm-3 10a1 1 0 100-2 1 1 0 000 2zm5 4a1 1 0 100-2 1 1 0 000 2zm3-6a1 1 0 100-2 1 1 0 000 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-white tracking-tight">
                    Pliki cookies
                  </h3>
                  <p className="text-[13px] text-white/55 leading-relaxed mt-1">
                    Używam plików cookies, żeby strona działała poprawnie i żebym mógł lepiej rozumieć, jak z niej korzystasz.{' '}
                    <Link
                      href="/polityka-prywatnosci"
                      className="text-[#fee715] hover:underline underline-offset-2"
                    >
                      Polityka prywatności
                    </Link>
                  </p>
                </div>
              </div>

              {/* Preferences toggle */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between py-2 mb-1 text-[12px] font-mono uppercase tracking-[0.18em] text-white/45 hover:text-white/80 transition-colors cursor-pointer"
              >
                <span>{isExpanded ? 'Schowaj preferencje' : 'Dostosuj preferencje'}</span>
                <svg
                  className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-2 py-3 mb-1 border-t border-white/8">
                      <Toggle
                        label="Niezbędne"
                        desc="Wymagane do działania strony"
                        checked
                        disabled
                      />
                      <Toggle
                        label="Wydajność"
                        desc="Calendly, narzędzia zewnętrzne"
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

              {/* Buttons */}
              <div className="flex flex-col gap-2 mt-4">
                <button
                  onClick={handleAcceptAll}
                  className="btn btn-primary w-full cursor-pointer"
                >
                  Akceptuj wszystkie
                </button>
                <div className="grid grid-cols-2 gap-2">
                  {isExpanded ? (
                    <button
                      onClick={handleAcceptSelected}
                      className="btn btn-secondary w-full cursor-pointer"
                    >
                      Zapisz wybór
                    </button>
                  ) : (
                    <button
                      onClick={handleRejectAll}
                      className="btn btn-secondary w-full cursor-pointer"
                    >
                      Tylko niezbędne
                    </button>
                  )}
                  <button
                    onClick={handleRejectAll}
                    className={`text-[12px] font-medium text-white/45 hover:text-white/75 transition-colors cursor-pointer ${
                      isExpanded ? '' : 'hidden'
                    }`}
                  >
                    Odrzuć wszystkie
                  </button>
                  {!isExpanded && (
                    <button
                      onClick={() => setIsExpanded(true)}
                      className="text-[12px] font-medium text-white/45 hover:text-white/75 transition-colors cursor-pointer"
                    >
                      Dostosuj
                    </button>
                  )}
                </div>
              </div>
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
    onClick={() => !disabled && onChange?.(!checked)}
    disabled={disabled}
    className={`w-full flex items-center justify-between gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/8 transition-all ${
      disabled ? 'cursor-default opacity-70' : 'hover:bg-white/[0.04] hover:border-white/15 cursor-pointer'
    }`}
  >
    <div className="text-left min-w-0">
      <div className="text-sm font-medium text-white">{label}</div>
      <div className="text-[11px] text-white/45 mt-0.5">{desc}</div>
    </div>
    <span
      className={`relative inline-flex h-5 w-9 flex-shrink-0 items-center rounded-full transition-colors ${
        checked ? 'bg-[#fee715]' : 'bg-white/15'
      } ${disabled ? '' : ''}`}
      aria-hidden
    >
      <span
        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-[#050714] transition-transform ${
          checked ? 'translate-x-[18px]' : 'translate-x-1'
        }`}
      />
    </span>
  </button>
);
