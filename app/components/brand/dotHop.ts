/**
 * Przeskok kropki między punktami (księga marki, „Przeskok kropki”).
 *
 * Kropka nie przesuwa się po linii, tylko przeskakuje z punktu na punkt: wybija się w górę, leci łukiem
 * jak rzucona (stała prędkość w poziomie, w pionie rzut), ląduje na następnym punkcie, ugina się raz
 * poniżej i wraca. Góra to zawsze góra ekranu. Prosto w dół kropka nie podskakuje, tylko od razu spada
 * na niższy punkt (dalsza część tego samego łuku) i ląduje z tym samym ugięciem.
 *
 * Te same liczby są w docs/brand/zrodla/tools/ruch_znaku.py (rysunki w księdze). Zmiana tutaj wymaga
 * tej samej zmiany tam.
 */

export const HOP = {
  /** Czas lotu: 380 ms i 0,9 ms na każdy piksel drogi, w granicach 440–680 ms. */
  baseMs: 380,
  msPerPx: 0.9,
  minMs: 440,
  maxMs: 680,
  /** Wysokość łuku nad wyższym z dwóch punktów: 16% drogi w poziomie, od 0,7 do 3 średnic kropki. */
  rise: 0.16,
  minRise: 0.7,
  maxRise: 3,
  /** Ugięcie po lądowaniu: 12% wysokości opadania, od 0,2 do 0,45 średnicy kropki. */
  dip: 0.12,
  minDip: 0.2,
  maxDip: 0.45,
  /** Sprężyna lądowania, ta sama co w animacji znaku. */
  damping: 0.45,
  omega: 14,
  settleMs: 380,
  /** Kropka pojawia się i znika skalą, nie kryciem. */
  popMs: 200,
};

export type Hop = {
  /** Położenie kropki względem punktu startu co 1/60 s; t to ułamek całego czasu. */
  frames: { t: number; x: number; y: number }[];
  /** Czas lotu do lądowania w ms. */
  flightMs: number;
  /** Czas całości (lot i ugięcie) w ms. */
  totalMs: number;
};

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Przeskok o (dx, dy) pikseli dla kropki o średnicy size. */
export function hop(dx: number, dy: number, size: number): Hop {
  const dist = Math.hypot(dx, dy);
  const arcMs = clamp(HOP.baseMs + HOP.msPerPx * dist, HOP.minMs, HOP.maxMs);
  const rise = clamp(HOP.rise * Math.abs(dx), HOP.minRise * size, HOP.maxRise * size);
  // Rzut: y(u) = −a·u + (dy + a)·u². Najwyższy punkt leży `rise` nad wyższym z punktów.
  const top = rise + Math.max(0, -dy);
  const a = 2 * top + 2 * Math.sqrt(top * (top + dy));
  const fall = top + dy;
  // Prosto w dół kropka nie podskakuje: bez ruchu w bok podskok wygląda jak zacięcie, bo kropka staje
  // na górze łuku. Lot zaczyna się od chwili, w której łuk mija wysokość startu (u0): kropka od razu
  // jedzie w dół i ląduje z tą samą prędkością co z łuku, a lot jest krótszy.
  const drop = dy > 0 && Math.abs(dx) < size;
  const u0 = drop ? a / (dy + a) : 0;
  const flightMs = arcMs * (1 - u0);
  const dip = clamp(HOP.dip * fall, HOP.minDip * size, HOP.maxDip * size);
  const decay = (HOP.damping * HOP.omega) / Math.sqrt(1 - HOP.damping ** 2);
  const peakAt = Math.atan(HOP.omega / decay) / HOP.omega;
  const amp = dip / (Math.exp(-decay * peakAt) * Math.sin(HOP.omega * peakAt));

  const totalMs = flightMs + HOP.settleMs;
  const frames: Hop['frames'] = [];
  const step = 1000 / 60;
  for (let t = 0; t < totalMs; t += step) {
    if (t <= flightMs) {
      const p = t / flightMs;
      const u = u0 + (1 - u0) * p;
      frames.push({ t: t / totalMs, x: dx * p, y: -a * u + (dy + a) * u * u });
    } else {
      const s = (t - flightMs) / 1000;
      frames.push({ t: t / totalMs, x: dx, y: dy + amp * Math.exp(-decay * s) * Math.sin(HOP.omega * s) });
    }
  }
  frames.push({ t: 1, x: dx, y: dy });
  return { frames, flightMs, totalMs };
}

/**
 * Odtwarza przeskok elementu z punktu `from` o (dx, dy). Zwraca animację i czasy.
 * Po zakończeniu element zostaje tam, gdzie ustawia go jego własny styl, więc styl trzeba ustawić
 * na punkt docelowy przed wywołaniem albo zaraz po nim.
 */
export function playHop(el: HTMLElement, from: { x: number; y: number }, dx: number, dy: number): Hop & { animation: Animation } {
  const h = hop(dx, dy, el.offsetWidth || 12);
  const animation = el.animate(
    h.frames.map((f) => ({ offset: f.t, transform: `translate(${(from.x + f.x).toFixed(2)}px, ${(from.y + f.y).toFixed(2)}px)` })),
    { duration: h.totalMs, easing: 'linear' }
  );
  return { ...h, animation };
}
