import React from 'react';
import { SzIcon, type SzIconName } from './Icon';

/**
 * Materiały po szkoleniu w stylu reklam Gemini: trzy kafle z ikoną i jednym słowem
 * stoją wprost na tle sekcji. Wchodzą raz po kolei z rozmycia, potem w spokojnej pętli
 * zapala się ikona kolejnego kafla. Przy ograniczonym ruchu stoją nieruchomo. Ruch w szkolenia.css.
 */

const ITEMS: { icon: SzIconName; label: string }[] = [
  { icon: 'doc', label: 'Instrukcje' },
  { icon: 'check', label: 'Checklisty' },
  { icon: 'plan', label: 'Procedury' },
];

export const MaterialsLoop: React.FC = () => (
  <div className="sz-loop" role="img" aria-label="Materiały po szkoleniu: instrukcje, checklisty i procedury">
    {ITEMS.map((item, i) => (
      <span key={item.label} className="sz-loop-tile" style={{ ['--i' as string]: i }}>
        <span className="sz-loop-icon">
          <SzIcon name={item.icon} size={30} />
          <span className="sz-loop-on">
            <SzIcon name={item.icon} size={30} />
          </span>
        </span>
        {item.label}
      </span>
    ))}
  </div>
);
