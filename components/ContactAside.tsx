import React from 'react';

export const ContactAside: React.FC = () => {
  return (
    <div className="lg:sticky lg:top-24 space-y-3">
      <Card>
        <Body label="Email">
          <a
            href="mailto:stanislaw@drozniak.com"
            className="text-[#fee715] hover:opacity-80 transition-opacity text-sm font-medium break-all cursor-pointer"
          >
            stanislaw@drozniak.com
          </a>
          <Hint>Najczęściej odpowiadam tego samego dnia.</Hint>
        </Body>
      </Card>

      <Card>
        <Body label="Telefon">
          <a
            href="tel:+48792491196"
            className="text-[#fee715] hover:opacity-80 transition-opacity text-sm font-medium cursor-pointer"
          >
            +48 792 491 196
          </a>
          <Hint>Pon–Pt 10:00–16:00</Hint>
        </Body>
      </Card>

      <div className="card p-5 md:p-6">
        <Label>Rozmowa 20 min</Label>
        <p className="text-white/55 text-xs mt-1.5 mb-4 leading-relaxed">
          Jeśli wolisz porozmawiać, zamiast pisać długiego maila.
        </p>
        <a
          href="https://calendly.com/drozniakstanislaw/spotkanie"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary w-full cursor-pointer"
          style={{ height: 38, fontSize: 13 }}
        >
          Zarezerwuj rozmowę
        </a>
      </div>

      <a
        href="https://www.linkedin.com/in/stanislawdrozniak"
        target="_blank"
        rel="noopener noreferrer"
        className="card surface-hover p-5 md:p-6 flex items-center justify-between cursor-pointer group"
      >
        <div>
          <Label>LinkedIn</Label>
          <p className="text-white/55 text-xs mt-1">Połącz się ze mną zawodowo</p>
        </div>
        <svg
          className="w-3.5 h-3.5 text-white/40 group-hover:text-[#fee715] group-hover:translate-x-0.5 transition-all"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  );
};

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="card p-5 md:p-6">{children}</div>
);

const Body: React.FC<{ children: React.ReactNode; label: string }> = ({ children, label }) => (
  <div className="space-y-1.5">
    <Label>{label}</Label>
    {children}
  </div>
);

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">{children}</div>
);

const Hint: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-white/45 text-xs leading-relaxed">{children}</p>
);
