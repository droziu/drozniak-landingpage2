import React, { useState, useEffect } from 'react';

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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#101820] border-t border-[#fee715] p-4 md:p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-[Montserrat] text-lg font-bold text-[#fee715] mb-2">
              🍪 Zarządzanie plikami cookies
            </h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Używamy plików cookies, aby zapewnić najlepsze doświadczenie na naszej stronie. 
              Niektóre są niezbędne do działania strony, inne pomagają nam analizować ruch i personalizować treści.
            </p>
            <div className="mt-3 space-y-2">
              <label className="flex items-center space-x-2 text-sm text-gray-300">
                <input 
                  type="checkbox" 
                  checked={preferences.necessary} 
                  disabled 
                  className="w-4 h-4 text-[#fee715] bg-gray-800 border-gray-600 rounded focus:ring-[#fee715] focus:ring-2"
                />
                <span>Niezbędne (zawsze włączone)</span>
              </label>
              <label className="flex items-center space-x-2 text-sm text-gray-300">
                <input 
                  type="checkbox" 
                  checked={preferences.performance}
                  onChange={(e) => setPreferences(prev => ({ ...prev, performance: e.target.checked }))}
                  className="w-4 h-4 text-[#fee715] bg-gray-800 border-gray-600 rounded focus:ring-[#fee715] focus:ring-2"
                />
                <span>Wydajność (Calendly, zewnętrzne narzędzia)</span>
              </label>
              <label className="flex items-center space-x-2 text-sm text-gray-300">
                <input 
                  type="checkbox" 
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                  className="w-4 h-4 text-[#fee715] bg-gray-800 border-gray-600 rounded focus:ring-[#fee715] focus:ring-2"
                />
                <span>Analityka (Google Analytics, śledzenie)</span>
              </label>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
            <button
              onClick={handleRejectAll}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors duration-300"
            >
              Odrzuć wszystkie
            </button>
            <button
              onClick={handleAcceptSelected}
              className="px-4 py-2 text-sm bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors duration-300"
            >
              Zapisz wybór
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-4 py-2 text-sm bg-[#fee715] text-[#101820] font-bold rounded-md hover:bg-[#ffd600] transition-colors duration-300"
            >
              Akceptuj wszystkie
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
