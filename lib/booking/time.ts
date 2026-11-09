// Czas w strefie Europe/Warsaw bez zewnętrznych bibliotek.
import { BOOKING } from './config';

const TZ = BOOKING.timeZone;

const partsFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: TZ,
  hourCycle: 'h23',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  weekday: 'short',
});

const WEEKDAYS: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

/** Części daty w czasie polskim. */
export function warsawParts(date: Date) {
  const p: Record<string, string> = {};
  for (const { type, value } of partsFormatter.formatToParts(date)) p[type] = value;
  return {
    year: Number(p.year),
    month: Number(p.month),
    day: Number(p.day),
    hour: Number(p.hour),
    minute: Number(p.minute),
    second: Number(p.second),
    weekday: WEEKDAYS[p.weekday],
  };
}

/** Przesunięcie strefy w milisekundach dla danej chwili (np. +1 h zimą, +2 h latem). */
function offsetMs(date: Date) {
  const p = warsawParts(date);
  const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
  return asUtc - Math.floor(date.getTime() / 1000) * 1000;
}

/** Data i godzina w czasie polskim zamienione na chwilę w czasie (Date). */
export function warsawToDate(dateKey: string, time: string) {
  const [y, m, d] = dateKey.split('-').map(Number);
  const [hh, mm] = time.split(':').map(Number);
  const guess = Date.UTC(y, m - 1, d, hh, mm);
  let result = guess - offsetMs(new Date(guess));
  // Druga iteracja poprawia wynik w dniach zmiany czasu.
  result = guess - offsetMs(new Date(result));
  return new Date(result);
}

/** Klucz dnia RRRR-MM-DD w czasie polskim. */
export function dateKeyOf(date: Date) {
  const p = warsawParts(date);
  return `${p.year}-${String(p.month).padStart(2, '0')}-${String(p.day).padStart(2, '0')}`;
}

/** Kolejny dzień jako klucz RRRR-MM-DD (rachunek kalendarzowy, bez stref). */
export function addDays(dateKey: string, days: number) {
  const [y, m, d] = dateKey.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + days));
  return dt.toISOString().slice(0, 10);
}

export function weekdayOf(dateKey: string) {
  const [y, m, d] = dateKey.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

export function isDateKey(value: unknown): value is string {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

/** Święta ustawowo wolne od pracy w Polsce. */
export function polishHolidays(year: number) {
  // Wielkanoc (algorytm Meeusa/Jonesa/Butchera)
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  const easter = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  const fixed = ['01-01', '01-06', '05-01', '05-03', '08-15', '11-01', '11-11', '12-25', '12-26'];
  // Od 2025 roku Wigilia jest dniem wolnym.
  if (year >= 2025) fixed.push('12-24');

  return new Set([
    ...fixed.map((md) => `${year}-${md}`),
    easter,
    addDays(easter, 1), // Poniedziałek Wielkanocny
    addDays(easter, 49), // Zielone Świątki (niedziela)
    addDays(easter, 60), // Boże Ciało
  ]);
}

const longDate = new Intl.DateTimeFormat('pl-PL', {
  timeZone: TZ,
  weekday: 'long',
  day: 'numeric',
  month: 'long',
});
const shortTime = new Intl.DateTimeFormat('pl-PL', { timeZone: TZ, hour: '2-digit', minute: '2-digit' });

/** „wtorek, 12 listopada” */
export function formatLongDate(date: Date) {
  return longDate.format(date);
}

/** „10:30” */
export function formatTime(date: Date) {
  return shortTime.format(date);
}

/** „wtorek, 12 listopada, 10:30–10:50 (czas polski)” */
export function formatRange(start: Date, end: Date) {
  return `${formatLongDate(start)}, ${formatTime(start)}–${formatTime(end)}`;
}
