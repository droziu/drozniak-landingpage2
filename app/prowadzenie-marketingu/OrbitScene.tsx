import React from 'react';
import { AreaIcon, type IconName } from '../components/AreaIcon';

/**
 * Scena „jedna osoba, wszystkie części marketingu”, w duchu reklamy Gemini for business:
 * zdjęcie w środku, wokół ikony obszarów pracy na wolno obracającym się pierścieniu.
 * Po kolei zapala się jedna ikona, a pod zdjęciem pojawia się jej nazwa. Pętla w samym CSS
 * (prowadzenie-marketingu.css, prefiks hm-orbit); przy ograniczonym ruchu stoi.
 */

const AREAS: { icon: IconName; label: string }[] = [
  { icon: 'ads', label: 'Reklamy' },
  { icon: 'site', label: 'Strona' },
  { icon: 'offer', label: 'Oferta' },
  { icon: 'mail', label: 'Mailing' },
  { icon: 'inquiry', label: 'Zapytania' },
  { icon: 'auto', label: 'Automatyzacje' },
  { icon: 'data', label: 'Analityka' },
  { icon: 'film', label: 'Filmy' },
];

const n = AREAS.length;

export const OrbitScene: React.FC = () => (
  <div
    className="hm-orbit"
    data-ui
    role="img"
    aria-label={`Stanisław Drożniak w środku, wokół niego obszary pracy: ${AREAS.map((a) => a.label.toLowerCase()).join(', ')}`}
  >
    <div className="hm-orbit-ring" aria-hidden="true">
      {AREAS.map((a, i) => (
        <span key={a.label} className="hm-orbit-slot" style={{ ['--a' as string]: `${i / n}turn`, ['--i' as string]: i }}>
          <span className="hm-orbit-icon">
            <AreaIcon name={a.icon} size={26} />
            <span className="hm-orbit-on">
              <AreaIcon name={a.icon} size={26} />
            </span>
          </span>
        </span>
      ))}
    </div>
    <img className="hm-orbit-photo" src="/images/home/portret-hero-480.jpg" alt="" width={480} height={600} loading="lazy" />
    <span className="hm-orbit-labels" aria-hidden="true">
      {AREAS.map((a, i) => (
        <span key={a.label} className="hm-orbit-label" style={{ ['--i' as string]: i }}>
          {a.label}
        </span>
      ))}
    </span>
  </div>
);
