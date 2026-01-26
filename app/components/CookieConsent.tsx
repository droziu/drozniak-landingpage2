'use client';

import React, { useState, useEffect } from 'react';
import { CustomCheckbox } from '@/components/CustomCheckbox';

interface CookieConsentProps {
  onAccept: (preferences: { necessary: boolean; performance: boolean; analytics: boolean }) => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ onAccept }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, can't be disabled
    performance: false,
    analytics: false
  });

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setIsVisible(true);
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

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#101820] border-t border-[#fee715] p-3 md:p-4">
      <div className="container mx-auto max-w-3xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-[Montserrat] text-base font-bold text-[#fee715] mb-2">
              🍪 Zarządzanie plikami cookies
            </h3>
            <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-3">
              Używamy plików cookies, aby zapewnić najlepsze doświadczenie na naszej stronie. 
              Niektóre są niezbędne do działania strony, inne pomagają nam analizować ruch i personalizować treści.
            </p>
            <div className="space-y-2">
              <CustomCheckbox
                checked={preferences.necessary}
                onChange={() => {}}
                disabled
                label="Niezbędne (zawsze włączone)"
                size="sm"
                labelClassName="text-xs text-gray-300"
              />
              <CustomCheckbox
                checked={preferences.performance}
                onChange={(v) => setPreferences((prev) => ({ ...prev, performance: v }))}
                label="Wydajność (Calendly, zewnętrzne narzędzia)"
                size="sm"
                labelClassName="text-xs text-gray-300"
              />
              <CustomCheckbox
                checked={preferences.analytics}
                onChange={(v) => setPreferences((prev) => ({ ...prev, analytics: v }))}
                label="Analityka (Google Analytics, śledzenie)"
                size="sm"
                labelClassName="text-xs text-gray-300"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleRejectAll}
              className="px-3 py-1.5 text-xs text-gray-400 hover:text-white transition-colors duration-300"
            >
              Odrzuć wszystkie
            </button>
            <button
              onClick={handleAcceptSelected}
              className="px-3 py-1.5 text-xs bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors duration-300"
            >
              Zapisz wybór
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-3 py-1.5 text-xs bg-[#fee715] text-[#101820] font-bold rounded-md hover:bg-[#ffd600] transition-colors duration-300"
            >
              Akceptuj wszystkie
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
