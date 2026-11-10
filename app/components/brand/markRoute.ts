import { MARK_DOT } from '../BrandLogo';

/**
 * Trasa i ruch kropki w animacji znaku (księga marki, „Animacja znaku”).
 *
 * Kropka objeżdża literę D jej środkiem i przy okazji ją rysuje: górna belka, brzuszek, dolna belka,
 * zakręt, trzon w górę. Na trzonie przyspiesza, z jego końca wyskakuje nad literę, w najwyższym punkcie
 * na chwilę zwalnia do zera, opada na swoje miejsce, ugina się raz poniżej i wraca. Jeden ciągły ruch,
 * bez linii pomocniczych i bez wchodzenia kryciem.
 *
 * Współrzędne są w układzie pliku logo (MARK_VIEWBOX w BrandLogo). Osie belek, trzonu i brzuszka
 * są zmierzone na krzywych litery (środek między konturem zewnętrznym i wewnętrznym), więc przy
 * zmianie kroju albo litery trzeba je zmierzyć od nowa.
 *
 * Te same liczby są w docs/brand/zrodla/tools/ruch_znaku.py (klatki w księdze, plik do filmów).
 * Zmiana tutaj wymaga tej samej zmiany tam.
 *
 * Z trasy powstają:
 * - ROUTE_D: cała trasa dla kropki (offset-path) z krótkim odcinkiem pod miejscem kropki na ugięcie,
 * - ROUTE_REST: miejsce kropki na tej trasie w procentach jej długości,
 * - INK: cztery odcinki trasy, które odsłaniają literę w masce. Każdy ma własną grubość, bo belki są
 *   cienkie, a trzon i brzuszek grube. Wszystkie rusza jedna animacja: stroke-dashoffset od 100 do 0
 *   w tym samym czasie co kropka, więc koniec kreski jest zawsze dokładnie pod kropką,
 * - ROUTE_EASE i ROUTE_EASE_INK: droga w funkcji czasu jako linear(). Dla kropki z ugięciem (powyżej 1),
 *   dla kresek ta sama, ale przycięta do 1,
 * - ROUTE_MS: czas całego ruchu.
 */

type Pt = readonly [number, number];
type Seg = { to: Pt; c1?: Pt; c2?: Pt };

const TOP = 86.66; // oś górnej belki
const BOTTOM = 253.46; // oś dolnej belki
const STEM = 35.73; // oś trzonu
const TURN = 16; // promień zakrętu z dolnej belki w trzon
const LAUNCH = 82; // górna krawędź litery: stąd kropka wyskakuje
const K = 0.5523; // ćwiartka elipsy krzywą Béziera
const HOME: Pt = [MARK_DOT.cx, MARK_DOT.cy];
const APEX: Pt = [(STEM + HOME[0]) / 2, HOME[1] - 36]; // najwyższy punkt skoku: 36 nad miejscem kropki
const DIP_ROOM = 24; // odcinek pod miejscem kropki, po którym kropka ugina się i wraca

const START: Pt = [-30, TOP];

/** Kolejne odcinki trasy. Podziały w x = 56 i x = 60 to miejsca, w których zmienia się kreska maski. */
const SEGS: Seg[] = [
  /* 0 górna belka           */ { to: [56, TOP] },
  /* 1 górna belka, dalej    */ { to: [85.14, TOP] },
  /* 2 brzuszek, góra        */ { c1: [125.52, TOP], c2: [158.26, 123.29], to: [158.26, 168.48] },
  /* 3 brzuszek, dół         */ { c1: [158.26, 215.39], c2: [125.61, BOTTOM], to: [85.33, BOTTOM] },
  /* 4 dolna belka           */ { to: [60, BOTTOM] },
  /* 5 dolna belka, dalej    */ { to: [STEM + TURN, BOTTOM] },
  /* 6 zakręt w trzon        */ { c1: [STEM + TURN - K * TURN, BOTTOM], c2: [STEM, BOTTOM - TURN + K * TURN], to: [STEM, BOTTOM - TURN] },
  /* 7 trzon w górę          */ { to: [STEM, LAUNCH] },
  /* 8 skok, w górę          */ { c1: [STEM, LAUNCH - K * (LAUNCH - APEX[1])], c2: [APEX[0] - K * (APEX[0] - STEM), APEX[1]], to: APEX },
  /* 9 skok, w dół           */ { c1: [APEX[0] + K * (HOME[0] - APEX[0]), APEX[1]], c2: [HOME[0], HOME[1] - K * (HOME[1] - APEX[1])], to: HOME },
];
const SEG_JUMP = 8;
const SEG_FALL = 9;

const n = (v: number) => +v.toFixed(2);
const p = ([x, y]: Pt) => `${n(x)} ${n(y)}`;

const startOf = (i: number): Pt => (i === 0 ? START : SEGS[i - 1].to);

function segLength(from: Pt, s: Seg): number {
  if (!s.c1 || !s.c2) return Math.hypot(s.to[0] - from[0], s.to[1] - from[1]);
  const steps = 240;
  let len = 0;
  let prev = from;
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const u = 1 - t;
    const x = u * u * u * from[0] + 3 * u * u * t * s.c1[0] + 3 * u * t * t * s.c2[0] + t * t * t * s.to[0];
    const y = u * u * u * from[1] + 3 * u * u * t * s.c1[1] + 3 * u * t * t * s.c2[1] + t * t * t * s.to[1];
    len += Math.hypot(x - prev[0], y - prev[1]);
    prev = [x, y];
  }
  return len;
}

const LENGTHS = SEGS.map((s, i) => segLength(startOf(i), s));
/** Długość trasy od startu do miejsca kropki. To jest „100” dla kresek maski i „1” dla krzywych ruchu. */
const TOTAL = LENGTHS.reduce((a, b) => a + b, 0);
const lengthTo = (i: number) => LENGTHS.slice(0, i).reduce((a, b) => a + b, 0);
/** Odległość od startu do początku odcinka i, w skali 0–100. */
const at = (i: number) => (100 * lengthTo(i)) / TOTAL;

function pathOf(from: number, to: number): string {
  let d = `M${p(startOf(from))}`;
  for (let i = from; i <= to; i++) {
    const s = SEGS[i];
    d += s.c1 && s.c2 ? `C${p(s.c1)} ${p(s.c2)} ${p(s.to)}` : `L${p(s.to)}`;
  }
  return d;
}

export const ROUTE_D = `${pathOf(0, SEGS.length - 1)}L${p([HOME[0], HOME[1] + DIP_ROOM])}`;
export const ROUTE_REST = `${((100 * TOTAL) / (TOTAL + DIP_ROOM)).toFixed(4)}%`;

export type Ink = { d: string; width: number; pathLength: number; dasharray: string; besideStem?: boolean };

/**
 * Kreska maski na odcinkach od..do. Kreska zaczyna się w punkcie trasy `at(from)`, więc dostaje przerywanie
 * „(100 − start) 300”: przy wspólnym przesunięciu 100 → 0 jej koniec wypada dokładnie tam, gdzie kropka.
 * besideStem: kreska nie odsłania trzonu (patrz STEM_BOX).
 */
function ink(from: number, to: number, width: number, besideStem?: boolean): Ink {
  const start = at(from);
  const length = at(to + 1) - start;
  return { d: pathOf(from, to), width, pathLength: +length.toFixed(4), dasharray: `${(100 - start).toFixed(4)} 300`, besideStem };
}

export const INK: Ink[] = [
  ink(0, 1, 16, true), // górna belka
  ink(1, 5, 44), // brzuszek z dojściami po belkach, na zakładkę z sąsiednimi kreskami
  ink(5, 6, 82, true), // dolna belka z szeryfem: szeroko, bo zakręt omija szeryf
  ink(6, 7, 44), // trzon od zakrętu w górę
];

/**
 * Wnętrze trzonu między belkami, jako prostokąty. Kreski belek są grubsze niż belki i bez tego odsłaniałyby
 * końce trzonu, zanim kropka do niego dojedzie. Trzon odsłania tylko jego własna kreska.
 * U góry pole jest szersze od trzonu, żeby małe ścięcia w narożnikach nie pokazały się przed trzonem.
 * U dołu kończy się na krawędziach trzonu: tamte ścięcia odsłania kreska dolnej belki, tuż przed trzonem.
 */
export const STEM_BOXES = [
  { x: 16, y: 91.25, width: 39, height: 148.75 },
  { x: 19.9, y: 240, width: 31.65, height: 8.86 },
];

/* ------------------------------------------------------------------ ruch */

/** Czas rysowania litery, od startu do końca trzonu. Z niego wynika prędkość na trasie. */
const DRAW_MS = 900;
/** Kropka kończy trzon o tyle szybciej, niż jedzie po brzuszku. Im więcej, tym wyższy „wyrzut”. */
const LAUNCH_BOOST = 1.35;
/** Sprężyna lądowania (te same liczby co --ruch-ladowanie w tokenach): tłumienie 0,45 daje jedno ugięcie
 *  o ok. 20% drogi opadania i ledwo widoczny powrót. omega to częstość drgań tłumionych w rad/s. */
const SPRING = { damping: 0.45, omega: 14 };

/**
 * Droga w funkcji czasu. Trzy części:
 * 1. Rysowanie (do końca trzonu): rozbieg, stałe tempo na brzuszku, lekkie zwolnienie w zakręcie,
 *    przyspieszenie na trzonie. Profil jest funkcją drogi.
 * 2. Skok w górę: stałe hamowanie od prędkości z trzonu do zera w najwyższym punkcie, jak rzut w górę.
 * 3. Opadanie i lądowanie: sprężyna z tłumieniem, która ściąga kropkę z najwyższego punktu na miejsce.
 *    Kropka mija miejsce, ugina się raz poniżej i wraca.
 * Wynik: próbki co STEP_MS, 1 = miejsce kropki.
 */
const STEP_MS = 20;

function simulate(): { samples: number[]; ms: number; marks: { launch: number; apex: number; land: number } } {
  const smooth = (a: number, b: number, x: number) => {
    const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  };
  const sTurn = (at(6) + at(7)) / 200;
  const sStem = at(7) / 100;
  const sLaunch = at(SEG_JUMP) / 100;
  const sApex = at(SEG_FALL) / 100;

  // 1. rysowanie: czas w funkcji drogi, potem przeskalowany tak, żeby trwał DRAW_MS
  const speed = (s: number) => {
    const start = 0.35 + 0.65 * smooth(0, 0.08, s);
    const corner = 1 - 0.28 * Math.exp(-(((s - sTurn) / 0.04) ** 2));
    const stem = 1 + (LAUNCH_BOOST - 1) * smooth(sStem, sLaunch, s);
    return start * corner * stem;
  };
  const steps = 5000;
  const ds = sLaunch / steps;
  const time: number[] = [0];
  for (let i = 0; i < steps; i++) time.push(time[i] + ds / speed((i + 0.5) * ds));
  const scale = DRAW_MS / time[steps]; // ms na jednostkę czasu profilu
  const drawAt = (ms: number) => {
    const t = ms / scale;
    let lo = 0;
    let hi = steps;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (time[mid] <= t) lo = mid;
      else hi = mid;
    }
    return (lo + (t - time[lo]) / (time[hi] - time[lo])) * ds;
  };

  // 2. skok w górę: od prędkości na końcu trzonu do zera w najwyższym punkcie
  const vLaunch = speed(sLaunch) / scale; // droga (0–1) na ms
  const up = sApex - sLaunch;
  const upMs = (2 * up) / vLaunch;

  // 3. sprężyna z najwyższego punktu na miejsce
  const { damping, omega } = SPRING;
  const decay = (damping * omega) / Math.sqrt(1 - damping * damping);
  const fall = 1 - sApex;
  const settleMs = (1000 * Math.log(fall * TOTAL * 4)) / decay; // do drgań poniżej ćwierci jednostki
  const spring = (ms: number) => {
    const t = ms / 1000;
    return 1 - fall * Math.exp(-decay * t) * (Math.cos(omega * t) + (decay / omega) * Math.sin(omega * t));
  };

  const ms = Math.ceil((DRAW_MS + upMs + settleMs) / STEP_MS) * STEP_MS;
  const samples: number[] = [];
  for (let t = 0; t <= ms; t += STEP_MS) {
    let s: number;
    if (t <= DRAW_MS) s = drawAt(t);
    else if (t <= DRAW_MS + upMs) {
      const u = t - DRAW_MS;
      s = sLaunch + vLaunch * u - (vLaunch * u * u) / (2 * upMs);
    } else s = spring(t - DRAW_MS - upMs);
    samples.push(t === ms ? 1 : s);
  }
  const land = (Math.PI - Math.acos(damping)) / omega; // pierwsze przejście przez miejsce kropki
  return { samples, ms, marks: { launch: DRAW_MS, apex: Math.round(DRAW_MS + upMs), land: Math.round(DRAW_MS + upMs + land * 1000) } };
}

const MOTION = simulate();
const linear = (values: number[]) => `linear(${values.map((v) => String(+v.toFixed(4))).join(', ')})`;

export const ROUTE_MS = MOTION.ms;
export const ROUTE_EASE = linear(MOTION.samples);
export const ROUTE_EASE_INK = linear(MOTION.samples.map((v) => Math.min(1, v)));
/** Chwile od startu ruchu w ms: koniec rysowania, najwyższy punkt skoku, lądowanie. */
export const ROUTE_MARKS = MOTION.marks;
