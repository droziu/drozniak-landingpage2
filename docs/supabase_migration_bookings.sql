-- Rezerwacje rozmów ze strony /umow.
-- Uruchom w Supabase: SQL Editor, wklej całość, Run.

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'confirmed' check (status in ('confirmed', 'cancelled')),
  start_at timestamptz not null,
  end_at timestamptz not null,
  name text not null,
  email text not null,
  phone text,
  company text,
  website text,
  topic text not null,
  source text,
  manage_token text not null unique,
  google_event_id text,
  meet_url text,
  reminder_24h_sent_at timestamptz,
  reminder_1h_sent_at timestamptz,
  cancel_reason text,
  cancelled_at timestamptz,
  rescheduled_count integer not null default 0,
  scheduled_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint bookings_end_after_start check (end_at > start_at),
  -- Dwie potwierdzone rozmowy nie mogą na siebie nachodzić, nawet gdy dwie osoby klikną w tej samej sekundzie.
  constraint bookings_no_overlap exclude using gist (tstzrange(start_at, end_at) with &&) where (status = 'confirmed')
);

create index if not exists bookings_start_at_idx on public.bookings (start_at) where status = 'confirmed';
create index if not exists bookings_email_idx on public.bookings (lower(email));

-- Dostęp wyłącznie z serwera (klucz service role). Brak polityk = przeglądarka nie widzi nic.
alter table public.bookings enable row level security;
revoke all on public.bookings from anon, authenticated;


-- ============================================================
-- Przypomnienia co 15 minut (opcjonalnie, zamiast Vercel Cron)
-- ============================================================
-- Vercel na darmowym planie uruchamia crony raz dziennie, a przypomnienie godzinę przed rozmową
-- wymaga sprawdzania co kilkanaście minut. Supabase robi to za darmo.
-- 1. Database, Extensions: włącz pg_cron i pg_net.
-- 2. Podmień TWOJ_CRON_SECRET na wartość CRON_SECRET z Vercela i uruchom:
--
-- select cron.schedule(
--   'booking-reminders',
--   '*/15 * * * *',
--   $$
--   select net.http_get(
--     url := 'https://drozniak.pl/api/booking/reminders',
--     headers := jsonb_build_object('Authorization', 'Bearer TWOJ_CRON_SECRET')
--   );
--   $$
-- );
--
-- Podgląd: select * from cron.job_run_details order by start_time desc limit 10;
-- Wyłączenie: select cron.unschedule('booking-reminders');


-- ============================================================
-- 9.11.2026: forma rozmowy, pytania przed rozmową, dokument Google
-- ============================================================
alter table public.bookings
  add column if not exists mode text not null default 'meet' check (mode in ('meet', 'phone')),
  add column if not exists brief jsonb,
  add column if not exists brief_submitted_at timestamptz,
  add column if not exists doc_id text,
  add column if not exists doc_url text;
