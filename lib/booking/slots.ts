// Wolne terminy: godziny pracy minus zajętość z Kalendarza Google, święta i limity.
import { BOOKING } from './config';
import { addDays, dateKeyOf, polishHolidays, warsawToDate, weekdayOf } from './time';

export type Interval = { start: Date; end: Date };
export type Slot = { start: string; end: string };
export type DaySlots = { date: string; slots: Slot[] };

const MIN = 60_000;

/** Zakres dni, dla których w ogóle pokazujemy terminy (od dziś do horyzontu). */
export function bookingWindow(now = new Date()) {
  const first = dateKeyOf(now);
  return { first, last: addDays(first, BOOKING.horizonDays) };
}

function isWorkingDay(dateKey: string) {
  const year = Number(dateKey.slice(0, 4));
  if (polishHolidays(year).has(dateKey)) return false;
  if (BOOKING.blockedDates.includes(dateKey)) return false;
  return (BOOKING.hours[weekdayOf(dateKey)] ?? []).length > 0;
}

/** Wszystkie terminy z godzin pracy, jeszcze bez sprawdzania kalendarza. */
function candidates(dateKey: string): Interval[] {
  if (!isWorkingDay(dateKey)) return [];
  const out: Interval[] = [];
  const fixed = weeklyBusy(dateKey);
  for (const [from, to] of BOOKING.hours[weekdayOf(dateKey)] ?? []) {
    const end = warsawToDate(dateKey, to).getTime();
    for (let t = warsawToDate(dateKey, from).getTime(); t + BOOKING.durationMin * MIN <= end; t += BOOKING.stepMin * MIN) {
      const slot = { start: new Date(t), end: new Date(t + BOOKING.durationMin * MIN) };
      if (!overlapsBusy(slot, fixed)) out.push(slot);
    }
  }
  return out;
}

/** Stałe cotygodniowe zajęcia danego dnia jako przedziały czasu. */
function weeklyBusy(dateKey: string): Interval[] {
  return (BOOKING.weeklyBlocks[weekdayOf(dateKey)] ?? []).map(([from, to]) => ({
    start: warsawToDate(dateKey, from),
    end: warsawToDate(dateKey, to),
  }));
}

/** Najwcześniejszy możliwy początek rozmowy: co najmniej minNoticeHours od teraz i nie wcześniej niż jutro. */
export function earliestStart(now = new Date()) {
  const tomorrow = warsawToDate(addDays(dateKeyOf(now), 1), '00:00').getTime();
  return Math.max(now.getTime() + BOOKING.minNoticeHours * 60 * MIN, tomorrow);
}

function overlapsBusy(slot: Interval, busy: Interval[]) {
  const pad = BOOKING.bufferMin * MIN;
  return busy.some((b) => slot.start.getTime() < b.end.getTime() + pad && slot.end.getTime() > b.start.getTime() - pad);
}

/**
 * Wolne terminy dzień po dniu.
 * @param busy zajęte przedziały z Kalendarza Google
 * @param bookedPerDay liczba potwierdzonych rozmów na dzień (do limitu maxPerDay)
 */
export function availableSlots(
  from: string,
  to: string,
  busy: Interval[],
  bookedPerDay: Record<string, number> = {},
  now = new Date(),
): DaySlots[] {
  const earliest = earliestStart(now);
  const days: DaySlots[] = [];
  for (let key = from; key <= to; key = addDays(key, 1)) {
    const free =
      (bookedPerDay[key] ?? 0) >= BOOKING.maxPerDay
        ? []
        : candidates(key).filter((s) => s.start.getTime() >= earliest && !overlapsBusy(s, busy));
    days.push({ date: key, slots: free.map((s) => ({ start: s.start.toISOString(), end: s.end.toISOString() })) });
  }
  return days;
}

/** Czy dany początek rozmowy jest jednym z terminów z godzin pracy (ochrona przed dowolną datą z formularza). */
export function isCandidateStart(start: Date) {
  return candidates(dateKeyOf(start)).some((s) => s.start.getTime() === start.getTime());
}

export function slotFor(start: Date): Interval {
  return { start, end: new Date(start.getTime() + BOOKING.durationMin * MIN) };
}
