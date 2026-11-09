// Kalendarz Google przez REST API (bez pakietu googleapis).
// Dostęp: klient OAuth z Google Cloud + jednorazowo pobrany refresh token (scripts/google-refresh-token.mjs).
import { BOOKING } from './config';
import type { Interval } from './slots';

const API = 'https://www.googleapis.com/calendar/v3';

export function googleConfigured() {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_REFRESH_TOKEN);
}

/** Kalendarz, do którego wpadają rozmowy. */
function calendarId() {
  return process.env.GOOGLE_CALENDAR_ID || 'primary';
}

/** Kalendarze sprawdzane pod kątem zajętości (domyślnie ten sam). Lista po przecinku. */
function busyCalendarIds() {
  const extra = (process.env.GOOGLE_BUSY_CALENDAR_IDS || '').split(',').map((s) => s.trim()).filter(Boolean);
  return [...new Set([calendarId(), ...extra])];
}

let cachedToken: { value: string; expiresAt: number } | null = null;

export async function accessToken() {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.value;
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN!,
      grant_type: 'refresh_token',
    }),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Google token: ${res.status} ${await res.text()}`);
  const data = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = { value: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return data.access_token;
}

async function google<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${await accessToken()}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Google Calendar ${init.method || 'GET'} ${path}: ${res.status} ${await res.text()}`);
  return (res.status === 204 ? undefined : await res.json()) as T;
}

/** Zajęte przedziały we wszystkich sprawdzanych kalendarzach. */
export async function busyIntervals(from: Date, to: Date): Promise<Interval[]> {
  const data = await google<{ calendars: Record<string, { busy: { start: string; end: string }[]; errors?: unknown[] }> }>(
    '/freeBusy',
    {
      method: 'POST',
      body: JSON.stringify({
        timeMin: from.toISOString(),
        timeMax: to.toISOString(),
        timeZone: BOOKING.timeZone,
        items: busyCalendarIds().map((id) => ({ id })),
      }),
    },
  );
  return Object.values(data.calendars).flatMap((c) => {
    if (c.errors?.length) throw new Error(`Google freeBusy: ${JSON.stringify(c.errors)}`);
    return c.busy.map((b) => ({ start: new Date(b.start), end: new Date(b.end) }));
  });
}

export type CalendarEventInput = {
  start: Date;
  end: Date;
  summary: string;
  description: string;
  attendee: { email: string; name: string };
  requestId: string;
  /** Google Meet albo telefon (wtedy bez Meet, z numerem w miejscu wydarzenia). */
  mode: 'meet' | 'phone';
  phone?: string | null;
};

type GoogleEvent = { id: string; hangoutLink?: string; htmlLink?: string };

/** Tworzy wydarzenie (z Google Meet albo z telefonem); Google wysyła klientowi zaproszenie do kalendarza. */
export async function createEvent(input: CalendarEventInput) {
  const meet = input.mode === 'meet';
  const event = await google<GoogleEvent>(
    `/calendars/${encodeURIComponent(calendarId())}/events?conferenceDataVersion=1&sendUpdates=all`,
    {
      method: 'POST',
      body: JSON.stringify({
        summary: input.summary,
        description: input.description,
        start: { dateTime: input.start.toISOString(), timeZone: BOOKING.timeZone },
        end: { dateTime: input.end.toISOString(), timeZone: BOOKING.timeZone },
        attendees: [{ email: input.attendee.email, displayName: input.attendee.name }],
        guestsCanModify: false,
        guestsCanInviteOthers: false,
        reminders: { useDefault: true },
        ...(meet
          ? { conferenceData: { createRequest: { requestId: input.requestId, conferenceSolutionKey: { type: 'hangoutsMeet' } } } }
          : { location: `Telefon: ${input.phone ?? ''}` }),
      }),
    },
  );
  return { eventId: event.id, meetUrl: meet ? (event.hangoutLink ?? null) : null };
}

/** Podmienia opis wydarzenia bez powiadamiania gościa (np. dopisany link do dokumentu). */
export async function updateEventDescription(eventId: string, description: string) {
  await google<GoogleEvent>(`/calendars/${encodeURIComponent(calendarId())}/events/${encodeURIComponent(eventId)}?sendUpdates=none`, {
    method: 'PATCH',
    body: JSON.stringify({ description }),
  });
}

/** Przekłada wydarzenie; Google wysyła klientowi zaktualizowane zaproszenie. */
export async function moveEvent(eventId: string, start: Date, end: Date, description?: string) {
  const event = await google<GoogleEvent>(
    `/calendars/${encodeURIComponent(calendarId())}/events/${encodeURIComponent(eventId)}?sendUpdates=all&conferenceDataVersion=1`,
    {
      method: 'PATCH',
      body: JSON.stringify({
        start: { dateTime: start.toISOString(), timeZone: BOOKING.timeZone },
        end: { dateTime: end.toISOString(), timeZone: BOOKING.timeZone },
        ...(description ? { description } : {}),
      }),
    },
  );
  return { meetUrl: event.hangoutLink ?? null };
}

/** Usuwa wydarzenie; Google wysyła klientowi odwołanie. */
export async function cancelEvent(eventId: string) {
  await google<void>(`/calendars/${encodeURIComponent(calendarId())}/events/${encodeURIComponent(eventId)}?sendUpdates=all`, {
    method: 'DELETE',
  });
}
