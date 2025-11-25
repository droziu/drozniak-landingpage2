import React from 'react';

export const ContactAside: React.FC = () => {
  return (
    <div className="lg:sticky lg:top-24 space-y-4">
      {/* Email Card */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-5">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-[#fee715]/20 to-[#00C9A7]/20 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-[#fee715]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-white text-sm mb-1">Email</h3>
            <a 
              href="mailto:stanislaw@drozniak.com" 
              className="text-[#fee715] hover:text-white transition-colors duration-300 text-sm break-all"
            >
              stanislaw@drozniak.com
            </a>
            <p className="text-gray-400 text-xs mt-1">
              Najczęściej odpowiadam tego samego dnia.
            </p>
          </div>
        </div>
      </div>

      {/* Phone Card */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-5">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-[#fee715]/20 to-[#00C9A7]/20 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-[#fee715]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-white text-sm mb-1">Telefon</h3>
            <a 
              href="tel:+48792491196" 
              className="text-[#fee715] hover:text-white transition-colors duration-300 text-sm"
            >
              +48 792 491 196
            </a>
            <p className="text-gray-400 text-xs mt-1">
              Pon–Pt 10:00–16:00
            </p>
          </div>
        </div>
      </div>

      {/* Rozmowa Card */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-5">
        <h3 className="font-medium text-white text-sm mb-2">Rozmowa 20 min</h3>
        <p className="text-gray-400 text-xs mb-4">
          Jeśli wolisz porozmawiać, zamiast pisać długiego maila.
        </p>
        <a
          href="https://calendly.com/drozniakstanislaw/spotkanie"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center border border-[#fee715] text-[#fee715] hover:bg-[#fee715] hover:text-[#101820] font-medium py-2.5 px-4 rounded-lg transition-all duration-300 text-sm"
        >
          Zarezerwuj 20-min rozmowę
        </a>
      </div>
    </div>
  );
};
