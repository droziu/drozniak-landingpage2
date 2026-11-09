// Rezerwacje w Supabase (tabela public.bookings, migracja: docs/supabase_migration_bookings.sql).
// Tylko po stronie serwera: klucz service role omija RLS, a tabela nie ma żadnych polityk dla anon.
import { randomBytes } from 'crypto';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { ReminderKey } from './config';
import { dateKeyOf } from './time';

export type Booking = {
  id: string;
  status: 'confirmed' | 'cancelled';
  start_at: string;
  end_at: string;
  name: string;
  email: string;
  company: string | null;
  website: string | null;
  phone: string | null;
  topic: string;
  /** Losowy token z linku „przełóż albo odwołaj”. */
  manage_token: string;
  google_event_id: string | null;
  meet_url: string | null;
  source: string | null;
  reminder_24h_sent_at: string | null;
  reminder_1h_sent_at: string | null;
  cancel_reason: string | null;
  cancelled_at: string | null;
  rescheduled_count: number;
  /** Kiedy ustalono obecny termin (zapis albo ostatnie przełożenie). */
  scheduled_at: string;
  /** Google Meet albo telefon. */
  mode: 'meet' | 'phone';
  /** Odpowiedzi na pytania przed rozmową (lib/booking/brief.ts). */
  brief: Record<string, string | string[]> | null;
  brief_submitted_at: string | null;
  /** Dokument Google tej rozmowy na Dysku prowadzącego. */
  doc_id: string | null;
  doc_url: string | null;
  created_at: string;
};

let client: SupabaseClient | null = null;

function db() {
  if (client) return client;
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Brak SUPABASE_URL lub SUPABASE_SERVICE_ROLE_KEY');
  client = createClient(url, key, { auth: { persistSession: false } });
  return client;
}

export function newManageToken() {
  return randomBytes(24).toString('base64url');
}

/** Kod błędu Postgresa przy nakładających się rezerwacjach (ograniczenie bookings_no_overlap). */
export const OVERLAP_ERROR = '23P01';

export async function insertBooking(row: Omit<Booking, 'id' | 'status' | 'created_at' | 'reminder_24h_sent_at' | 'reminder_1h_sent_at' | 'cancel_reason' | 'cancelled_at' | 'rescheduled_count' | 'google_event_id' | 'meet_url' | 'scheduled_at' | 'brief' | 'brief_submitted_at' | 'doc_id' | 'doc_url'>) {
  const { data, error } = await db().from('bookings').insert(row).select().single();
  if (error) throw Object.assign(new Error(error.message), { code: error.code });
  return data as Booking;
}

export async function updateBooking(id: string, patch: Partial<Booking>) {
  const { data, error } = await db()
    .from('bookings')
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw Object.assign(new Error(error.message), { code: error.code });
  return data as Booking;
}

export async function deleteBooking(id: string) {
  await db().from('bookings').delete().eq('id', id);
}

export async function findByToken(token: string) {
  const { data, error } = await db().from('bookings').select('*').eq('manage_token', token).maybeSingle();
  if (error) throw new Error(error.message);
  return (data as Booking | null) ?? null;
}

/** Liczba potwierdzonych rozmów na dzień (czas polski) w zakresie dat. */
export async function confirmedPerDay(from: Date, to: Date) {
  const { data, error } = await db()
    .from('bookings')
    .select('start_at')
    .eq('status', 'confirmed')
    .gte('start_at', from.toISOString())
    .lt('start_at', to.toISOString());
  if (error) throw new Error(error.message);
  const counts: Record<string, number> = {};
  for (const row of data ?? []) {
    const key = dateKeyOf(new Date(row.start_at));
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return counts;
}

/** Ile przyszłych rozmów ma już ten adres e-mail (ochrona przed zajmowaniem wielu terminów). */
export async function futureCountForEmail(email: string) {
  const { count, error } = await db()
    .from('bookings')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'confirmed')
    .ilike('email', email)
    .gte('start_at', new Date().toISOString());
  if (error) throw new Error(error.message);
  return count ?? 0;
}

/** Rozmowy, którym należy się przypomnienie (zapisane co najmniej trochę wcześniej niż przypomnienie). */
export async function dueReminders(key: ReminderKey, beforeMin: number, now = new Date()) {
  const windowEnd = new Date(now.getTime() + beforeMin * 60_000);
  const { data, error } = await db()
    .from('bookings')
    .select('*')
    .eq('status', 'confirmed')
    .is(key, null)
    .gt('start_at', now.toISOString())
    .lte('start_at', windowEnd.toISOString());
  if (error) throw new Error(error.message);
  // Pomijamy rozmowy umówione dopiero w oknie przypomnienia: klient ma świeże potwierdzenie.
  return ((data ?? []) as Booking[]).filter(
    (b) => new Date(b.start_at).getTime() - new Date(b.scheduled_at).getTime() > (beforeMin + 30) * 60_000,
  );
}

