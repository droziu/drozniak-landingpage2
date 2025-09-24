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
            <div className="space-y-1">
              <label className="flex items-center space-x-2 text-xs text-gray-300">
                <input 
                  type="checkbox" 
                  checked={preferences.necessary} 
                  disabled 
                  className="w-3 h-3 text-[#fee715] bg-gray-800 border-gray-600 rounded focus:ring-[#fee715] focus:ring-1"
                />
                <span>Niezbędne (zawsze włączone)</span>
              </label>
              <label className="flex items-center space-x-2 text-xs text-gray-300">
                <input 
                  type="checkbox" 
                  checked={preferences.performance}
                  onChange={(e) => setPreferences(prev => ({ ...prev, performance: e.target.checked }))}
                  className="w-3 h-3 text-[#fee715] bg-gray-800 border-gray-600 rounded focus:ring-[#fee715] focus:ring-1"
                />
                <span>Wydajność (Calendly, zewnętrzne narzędzia)</span>
              </label>
              <label className="flex items-center space-x-2 text-xs text-gray-300">
                <input 
                  type="checkbox" 
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                  className="w-3 h-3 text-[#fee715] bg-gray-800 border-gray-600 rounded focus:ring-[#fee715] focus:ring-1"
                />
                <span>Analityka (Google Analytics, śledzenie)</span>
              </label>
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
