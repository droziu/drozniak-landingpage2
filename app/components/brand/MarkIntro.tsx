import React from 'react';
import { MARK_DOT, MARK_PATH, MARK_SIZE } from '../BrandLogo';
import { INK, ROUTE_D, ROUTE_EASE, ROUTE_EASE_INK, ROUTE_MS, ROUTE_REST, STEM_BOXES } from './markRoute';

/**
 * Znak do animacji wejścia: kropka objeżdża literę i ją rysuje, a na końcu wyskakuje z trzonu
 * i ląduje nad nią z lekkim ugięciem.
 * Trasa i krzywa prędkości pochodzą z markRoute.ts, ruch ustawia CSS (.site-intro w pub-v2.css).
 *
 * Litera to plik logo zasłonięty maską. Maskę odsłaniają cztery kreski poprowadzone po trasie kropki,
 * więc litera pojawia się dokładnie tam, gdzie kropka już przejechała. Po przejeździe maska odsłania
 * całość, a kropka stoi w miejscu z pliku logo: ostatnia klatka to dokładnie logo.
 *
 * Kropka jest elementem HTML, bo offset-path na elementach SVG nie działa pewnie we wszystkich
 * przeglądarkach. Dlatego znak ma stały rozmiar pliku logo w pikselach, a wielkość na ekranie
 * ustawia skala w CSS (--intro-skala).
 */
export const MARK_INTRO_VARS = {
  ['--intro-trasa' as string]: `path("${ROUTE_D}")`,
  ['--intro-meta' as string]: ROUTE_REST,
  ['--intro-czas' as string]: `${ROUTE_MS}ms`,
  ['--intro-krzywa' as string]: ROUTE_EASE,
  ['--intro-krzywa-pisma' as string]: ROUTE_EASE_INK,
  ['--intro-dom' as string]: `${MARK_DOT.cx - MARK_DOT.r}px`, // miejsce kropki z pliku logo, dla przeglądarek bez offset-path
} as React.CSSProperties;

/** Pole maski: litera z zapasem na grubość kresek. */
const FIELD = { x: -40, y: -10, width: 260, height: 290 };
/** Całe pole bez wnętrza trzonu (evenodd): do tego przycięte są kreski belek. */
const BESIDE_STEM =
  `M${FIELD.x} ${FIELD.y}h${FIELD.width}v${FIELD.height}h${-FIELD.width}z` +
  STEM_BOXES.map((b) => `M${b.x} ${b.y}h${b.width}v${b.height}h${-b.width}z`).join('');

export function MarkIntro() {
  const size = MARK_DOT.r * 2;
  return (
    <span className="intro-mark" style={{ width: MARK_SIZE.width, height: MARK_SIZE.height }}>
      <svg
        className="intro-mark-svg"
        viewBox={`0 0 ${MARK_SIZE.width} ${MARK_SIZE.height}`}
        width={MARK_SIZE.width}
        height={MARK_SIZE.height}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <clipPath id="intro-poza-trzonem">
            <path clipRule="evenodd" d={BESIDE_STEM} />
          </clipPath>
          <mask id="intro-pismo" maskUnits="userSpaceOnUse" {...FIELD}>
            <g fill="none" stroke="#fff" strokeLinecap="butt" strokeLinejoin="round">
              {INK.map((k, i) => (
                <g key={i} clipPath={k.besideStem ? 'url(#intro-poza-trzonem)' : undefined}>
                  <path
                    className="intro-kreska"
                    d={k.d}
                    pathLength={k.pathLength}
                    strokeWidth={k.width}
                    strokeDasharray={k.dasharray}
                  />
                </g>
              ))}
            </g>
            <rect className="intro-calosc" {...FIELD} fill="#fff" />
          </mask>
        </defs>
        <path className="intro-litera" fill="currentColor" d={MARK_PATH} mask="url(#intro-pismo)" />
      </svg>
      <span className="intro-kropka" style={{ width: size, height: size }} />
    </span>
  );
}
