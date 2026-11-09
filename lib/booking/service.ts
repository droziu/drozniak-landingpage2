// Logika rezerwacji używana przez trasy API /api/booking/*.
import { randomUUID } from 'crypto';
import { BOOKING } from './config';
import { cleanBrief } from './brief';
import { createCallDoc, replaceInDoc, writeBriefToDoc } from './drive';
import { manageUrl, sendBriefNotice, sendCancelled, sendConfirmation, sendHostNotice, sendMoved } from './emails';
import { busyIntervals, cancelEvent, createEvent, googleConfigured, moveEvent, updateEventDescription } from './google';
import { availableSlots, bookingWindow, earliestStart, isCandidateStart, slotFor, type DaySlots, type Interval } from './slots';
import {
  OVERLAP_ERROR,
  confirmedPerDay,
  deleteBooking,
  findByToken,
  futureCountForEmail,
  insertBooking,
  newManageToken,
  updateBooking,
  type Booking,
} from './store';
import { addDays, dateKeyOf, formatRange, warsawToDate } from './time';

export class BookingError extends Error {
  constructor(
    public code: 'invalid' | 'slot_taken' | 'too_many' | 'not_configured' | 'not_found' | 'too_late' | 'cancelled',
    message: string,
    public status = 400,
    public field?: string,
  ) {
    super(message);
  }
}

/**
 * Tryb podglądu: lokalnie, bez kluczy Google, strona działa na udawanych danych.
 * Nic nie trafia do kalendarza, bazy ani skrzynek.
 */
export function isDemo() {
  if (process.env.NODE_ENV === 'production') return false;
  // BOOKING_DEMO=1 w .env.local: podgląd lokalny mimo podłączonego kalendarza (testy wyglądu bez prawdziwych rezerwacji).
  return !googleConfigured() || process.env.BOOKING_DEMO === '1';
}

function assertConfigured() {
  if (!googleConfigured() && !isDemo()) {
    throw new BookingError('not_configured', 'Kalendarz nie jest jeszcze podłączony.', 503);
  }
}

// ---------- Terminy ----------

function demoBusy(first: string, last: string): Interval[] {
  const busy: Interval[] = [];
  for (let key = first, i = 0; key <= last; key = addDays(key, 1), i++) {
    busy.push({ start: warsawToDate(key, '12:00'), end: warsawToDate(key, '13:00') });
    if (i % 3 === 1) busy.push({ start: warsawToDate(key, '10:00'), end: warsawToDate(key, '11:20') });
    if (i % 4 === 2) busy.push({ start: warsawToDate(key, '14:00'), end: warsawToDate(key, '16:00') });
  }
  return busy;
}

export async function getSlots(excludeToken?: string): Promise<{ days: DaySlots[]; demo: boolean }> {
  assertConfigured();
  const { first, last } = bookingWindow();
  const from = warsawToDate(first, '00:00');
  const to = warsawToDate(addDays(last, 1), '00:00');

  if (isDemo()) return { days: availableSlots(first, last, demoBusy(first, last)), demo: true };

  let [busy, perDay] = await Promise.all([busyIntervals(from, to), confirmedPerDay(from, to)]);

  // Przy przekładaniu własny obecny termin nie blokuje sąsiednich godzin.
  if (excludeToken) {
    const own = await findByToken(excludeToken);
    if (own && own.status === 'confirmed') {
      const s = new Date(own.start_at).getTime();
      const e = new Date(own.end_at).getTime();
      busy = busy.filter((b) => !(b.start.getTime() === s && b.end.getTime() === e));
      const day = dateKeyOf(new Date(own.start_at));
      perDay = { ...perDay, [day]: Math.max(0, (perDay[day] ?? 1) - 1) };
    }
  }

  return { days: availableSlots(first, last, busy, perDay), demo: false };
}

/** Sprawdza, czy termin jest poprawny i nadal wolny. */
async function assertSlotFree(start: Date, ignore?: Booking) {
  if (Number.isNaN(start.getTime()) || !isCandidateStart(start)) {
    throw new BookingError('invalid', 'Ten termin nie jest dostępny. Wybierz inny.', 400, 'start');
  }
  const { last } = bookingWindow();
  if (start.getTime() < earliestStart() || start > warsawToDate(addDays(last, 1), '00:00')) {
    throw new BookingError('invalid', 'Ten termin jest już poza zakresem rezerwacji. Wybierz inny.', 400, 'start');
  }
  if (isDemo()) return;

  const slot = slotFor(start);
  const pad = BOOKING.bufferMin * 60_000;
  const busy = await busyIntervals(new Date(slot.start.getTime() - pad), new Date(slot.end.getTime() + pad));
  const own = ignore ? [new Date(ignore.start_at).getTime(), new Date(ignore.end_at).getTime()] : null;
  const taken = busy.some(
    (b) =>
      !(own && b.start.getTime() === own[0] && b.end.getTime() === own[1]) &&
      slot.start.getTime() < b.end.getTime() + pad &&
      slot.end.getTime() > b.start.getTime() - pad,
  );
  if (taken) throw new BookingError('slot_taken', 'Ktoś właśnie zajął ten termin. Wybierz inny.', 409, 'start');

  const day = dateKeyOf(start);
  const perDay = await confirmedPerDay(warsawToDate(day, '00:00'), warsawToDate(addDays(day, 1), '00:00'));
  const sameDay = ignore && dateKeyOf(new Date(ignore.start_at)) === day ? 1 : 0;
  if ((perDay[day] ?? 0) - sameDay >= BOOKING.maxPerDay) {
    throw new BookingError('slot_taken', 'Ten dzień jest już pełny. Wybierz inny.', 409, 'start');
  }
}

// ---------- Nowa rezerwacja ----------

export type BookInput = {
  start?: unknown;
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  website?: unknown;
  topic?: unknown;
  source?: unknown;
  /** 'meet' albo 'phone'. */
  mode?: unknown;
  /** Pole-pułapka na boty, ukryte dla ludzi. */
  fax?: unknown;
  /** Kiedy formularz się pokazał (ms), boty wysyłają od razu. */
  shownAt?: unknown;
};

function text(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export function validate(input: BookInput) {
  const name = text(input.name, 120);
  const email = text(input.email, 200).toLowerCase();
  const topic = text(input.topic, 2000);
  const phone = text(input.phone, 40);
  const company = text(input.company, 160);
  const mode: 'meet' | 'phone' = input.mode === 'phone' ? 'phone' : 'meet';
  let website = text(input.website, 300);
  if (website && !/^https?:\/\//i.test(website)) website = `https://${website}`;

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = 'Podaj imię i nazwisko.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = 'Podaj poprawny adres e-mail, na przykład jan@firma.pl.';
  if (topic.length < 10) errors.topic = 'Napisz w jednym, dwóch zdaniach, o czym chcesz porozmawiać.';
  if (mode === 'phone' && !phone) errors.phone = 'Podaj numer, pod który mam zadzwonić.';
  else if (phone && !/^[+\d][\d\s()-]{6,}$/.test(phone))
    errors.phone = mode === 'phone' ? 'Podaj numer w formie 600 123 456.' : 'Podaj numer w formie 600 123 456 albo zostaw pole puste.';
  if (website) {
    try {
      new URL(website);
    } catch {
      errors.website = 'Podaj adres strony, na przykład firma.pl, albo zostaw pole puste.';
    }
  }
  return {
    errors,
    value: { name, email, topic, mode, phone: phone || null, company: company || null, website: website || null, source: text(input.source, 300) || null },
  };
}

function eventDescription(
  b: Pick<Booking, 'topic' | 'company' | 'website' | 'phone' | 'mode'> & { doc_url?: string | null },
  token: string,
) {
  return [
    b.mode === 'phone'
      ? `Rozmowa telefoniczna, ${BOOKING.durationMin} minut. Zadzwonię na numer ${b.phone}.`
      : `Rozmowa online, ${BOOKING.durationMin} minut. Link do Google Meet jest w tym wydarzeniu.`,
    '',
    'Czego dotyczy:',
    b.topic,
    '',
    b.company ? `Firma: ${b.company}` : '',
    b.website ? `Strona: ${b.website}` : '',
    b.phone ? `Telefon: ${b.phone}` : '',
    '',
    `Przełożenie albo odwołanie: ${manageUrl(token)}`,
    b.doc_url ? `Notatki prowadzącego (dokument prywatny): ${b.doc_url}` : '',
  ]
    .filter((line, i, all) => line !== '' || all[i - 1] !== '')
    .join('\n');
}

/** Dokument Google rozmowy i link do niego w wydarzeniu. Błąd nie psuje rezerwacji, tylko trafia do logów. */
async function attachDoc(row: Booking, token: string) {
  try {
    const doc = await createCallDoc(row);
    const updated = await updateBooking(row.id, { doc_id: doc.id, doc_url: doc.url });
    if (row.google_event_id) await updateEventDescription(row.google_event_id, eventDescription(updated, token));
    return updated;
  } catch (error) {
    console.error('[booking] dokument Google nie powstał:', error);
    return row;
  }
}

export type BookResult = { token: string; start: string; end: string; email: string; meetUrl: string | null; demo: boolean };

export async function book(input: BookInput): Promise<BookResult> {
  assertConfigured();
  const start = new Date(typeof input.start === 'string' ? input.start : NaN);

  // Boty: wypełnione pole-pułapka albo formularz wysłany szybciej niż w 3 sekundy.
  const shownAt = Number(input.shownAt);
  if (text(input.fax, 100) || (Number.isFinite(shownAt) && Date.now() - shownAt < 3000)) {
    throw new BookingError('invalid', 'Nie udało się wysłać formularza. Spróbuj jeszcze raz.', 400);
  }

  const { errors, value } = validate(input);
  if (Object.keys(errors).length) {
    const [field, message] = Object.entries(errors)[0];
    throw Object.assign(new BookingError('invalid', message, 400, field), { errors });
  }

  await assertSlotFree(start);
  const slot = slotFor(start);

  if (isDemo()) {
    return { token: 'demo', start: slot.start.toISOString(), end: slot.end.toISOString(), email: value.email, meetUrl: null, demo: true };
  }

  if ((await futureCountForEmail(value.email)) >= 2) {
    throw new BookingError('too_many', 'Masz już umówione rozmowy. Jeśli chcesz zmienić termin, użyj linku z maila z potwierdzeniem.', 409);
  }

  const token = newManageToken();
  let row: Booking;
  try {
    row = await insertBooking({
      ...value,
      start_at: slot.start.toISOString(),
      end_at: slot.end.toISOString(),
      manage_token: token,
    });
  } catch (error) {
    if ((error as { code?: string }).code === OVERLAP_ERROR) {
      throw new BookingError('slot_taken', 'Ktoś właśnie zajął ten termin. Wybierz inny.', 409, 'start');
    }
    throw error;
  }

  try {
    const event = await createEvent({
      start: slot.start,
      end: slot.end,
      summary: `${BOOKING.title}${value.company ? ` | ${value.company}` : ` | ${value.name}`}`,
      description: eventDescription(value, token),
      attendee: { email: value.email, name: value.name },
      requestId: randomUUID(),
      mode: value.mode,
      phone: value.phone,
    });
    row = await updateBooking(row.id, { google_event_id: event.eventId, meet_url: event.meetUrl });
  } catch (error) {
    await deleteBooking(row.id);
    throw error;
  }

  row = await attachDoc(row, token);
  await Promise.all([sendConfirmation(row, token), sendHostNotice(row, 'new')]);
  return { token, start: row.start_at, end: row.end_at, email: row.email, meetUrl: row.meet_url, demo: false };
}

// ---------- Zarządzanie rezerwacją ----------

export type PublicBooking = {
  status: 'confirmed' | 'cancelled' | 'past';
  start: string;
  end: string;
  name: string;
  email: string;
  meetUrl: string | null;
  mode: 'meet' | 'phone';
  phone: string | null;
  canChange: boolean;
  /** Czy klient odpowiedział już na pytania przed rozmową. */
  briefDone: boolean;
  demo: boolean;
};

function demoBooking(): Booking {
  const days = availableSlots(...(Object.values(bookingWindow()) as [string, string]), []);
  const first = days.find((d) => d.slots.length)!.slots[0];
  return {
    id: 'demo',
    status: 'confirmed',
    start_at: first.start,
    end_at: first.end,
    name: 'Jan Kowalski',
    email: 'jan@firma.pl',
    company: 'Firma',
    website: null,
    phone: null,
    topic: 'Podgląd',
    manage_token: 'demo',
    google_event_id: null,
    meet_url: null,
    source: null,
    reminder_24h_sent_at: null,
    reminder_1h_sent_at: null,
    cancel_reason: null,
    cancelled_at: null,
    rescheduled_count: 0,
    scheduled_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    mode: 'meet',
    brief: null,
    brief_submitted_at: null,
    doc_id: null,
    doc_url: null,
  };
}

async function loadBooking(token: string) {
  if (isDemo() && token === 'demo') return demoBooking();
  if (!/^[\w-]{20,64}$/.test(token)) throw new BookingError('not_found', 'Nie znaleziono rezerwacji.', 404);
  assertConfigured();
  const b = await findByToken(token);
  if (!b) throw new BookingError('not_found', 'Nie znaleziono rezerwacji.', 404);
  return b;
}

function canChange(b: Booking) {
  return b.status === 'confirmed' && new Date(b.start_at).getTime() - Date.now() > BOOKING.changeCutoffHours * 3_600_000;
}

function toPublic(b: Booking): PublicBooking {
  const past = new Date(b.end_at).getTime() < Date.now();
  return {
    status: b.status === 'cancelled' ? 'cancelled' : past ? 'past' : 'confirmed',
    start: b.start_at,
    end: b.end_at,
    name: b.name,
    email: b.email,
    meetUrl: b.meet_url,
    mode: b.mode,
    phone: b.mode === 'phone' ? b.phone : null,
    canChange: canChange(b),
    briefDone: Boolean(b.brief_submitted_at),
    demo: b.id === 'demo',
  };
}

export async function getBooking(token: string) {
  return toPublic(await loadBooking(token));
}

function assertChangeable(b: Booking) {
  if (b.status === 'cancelled') throw new BookingError('cancelled', 'Ta rozmowa jest już odwołana.', 409);
  if (!canChange(b)) {
    throw new BookingError(
      'too_late',
      `Do rozmowy zostało mniej niż ${BOOKING.changeCutoffHours} godziny. Napisz na ${BOOKING.hostEmail}, ustalimy to mailowo.`,
      409,
    );
  }
}

export async function reschedule(token: string, startValue: unknown) {
  const b = await loadBooking(token);
  assertChangeable(b);
  const start = new Date(typeof startValue === 'string' ? startValue : NaN);
  if (start.getTime() === new Date(b.start_at).getTime()) {
    throw new BookingError('invalid', 'To jest obecny termin rozmowy. Wybierz inny.', 400, 'start');
  }
  await assertSlotFree(start, b);
  const slot = slotFor(start);
  if (b.id === 'demo') return { ...toPublic(b), start: slot.start.toISOString(), end: slot.end.toISOString() };

  const previous = { start_at: b.start_at, end_at: b.end_at };
  let row: Booking;
  try {
    row = await updateBooking(b.id, {
      start_at: slot.start.toISOString(),
      end_at: slot.end.toISOString(),
      scheduled_at: new Date().toISOString(),
      reminder_24h_sent_at: null,
      reminder_1h_sent_at: null,
      rescheduled_count: b.rescheduled_count + 1,
    });
  } catch (error) {
    if ((error as { code?: string }).code === OVERLAP_ERROR) {
      throw new BookingError('slot_taken', 'Ktoś właśnie zajął ten termin. Wybierz inny.', 409, 'start');
    }
    throw error;
  }

  try {
    if (b.google_event_id) await moveEvent(b.google_event_id, slot.start, slot.end);
  } catch (error) {
    await updateBooking(b.id, previous);
    throw error;
  }

  if (b.doc_id) {
    const was = formatRange(new Date(previous.start_at), new Date(previous.end_at));
    await replaceInDoc(b.doc_id, was, formatRange(slot.start, slot.end)).catch((e) => console.error('[booking] dokument:', e));
  }
  await Promise.all([sendMoved(row, token), sendHostNotice(row, 'moved')]);
  return toPublic(row);
}

export async function cancel(token: string, reason: unknown) {
  const b = await loadBooking(token);
  if (b.status === 'cancelled') throw new BookingError('cancelled', 'Ta rozmowa jest już odwołana.', 409);
  if (new Date(b.start_at).getTime() < Date.now()) throw new BookingError('too_late', 'Ta rozmowa już się odbyła.', 409);
  if (b.id === 'demo') return { ...toPublic(b), status: 'cancelled' as const, canChange: false };

  if (b.google_event_id) {
    try {
      await cancelEvent(b.google_event_id);
    } catch (error) {
      // Wydarzenie usunięte już ręcznie w kalendarzu: to nie przeszkadza w odwołaniu.
      if (!/: (404|410) /.test(String(error))) throw error;
    }
  }
  const row = await updateBooking(b.id, {
    status: 'cancelled',
    cancelled_at: new Date().toISOString(),
    cancel_reason: text(reason, 500) || null,
  });
  await Promise.all([sendCancelled(row), sendHostNotice(row, 'cancelled')]);
  return toPublic(row);
}

// ---------- Pytania przed rozmową ----------

export async function saveBrief(token: string, input: unknown) {
  const b = await loadBooking(token);
  if (b.status === 'cancelled') throw new BookingError('cancelled', 'Ta rozmowa jest odwołana.', 409);
  const answers = cleanBrief(input);
  if (!answers) throw new BookingError('invalid', 'Odpowiedz chociaż na jedno pytanie.', 400);
  if (b.id === 'demo') return { ...toPublic(b), briefDone: true };

  const row = await updateBooking(b.id, { brief: answers, brief_submitted_at: new Date().toISOString() });
  if (row.doc_id) {
    await writeBriefToDoc(row.doc_id, answers).catch((e) => console.error('[booking] dokument, odpowiedzi:', e));
  }
  await sendBriefNotice(row);
  return toPublic(row);
}
