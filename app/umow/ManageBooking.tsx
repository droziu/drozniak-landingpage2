'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { DaySlots } from '@/lib/booking/slots';
import type { PublicBooking } from '@/lib/booking/service';
import { BriefFlow } from './BriefFlow';
import { SlotPicker, SlotPickerSkeleton, formatDayLong, formatTime } from './SlotPicker';

type Mode = 'view' | 'reschedule' | 'confirm-move' | 'cancel';

const dayOf = (iso: string) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Warsaw' }).format(new Date(iso));
const when = (b: { start: string; end: string }) =>
  `${formatDayLong(dayOf(b.start))}, ${formatTime(b.start)}–${formatTime(b.end)}`;

export function ManageBooking({ token }: { token: string }) {
  const [booking, setBooking] = useState<PublicBooking | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>('view');
  const [days, setDays] = useState<DaySlots[] | null>(null);
  const [day, setDay] = useState<string | null>(null);
  const [start, setStart] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    fetch(`/api/booking/manage?token=${encodeURIComponent(token)}`, { cache: 'no-store' })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setBooking(data);
      })
      .catch((e) => setLoadError(e instanceof Error && e.message ? e.message : 'Nie udało się wczytać rezerwacji.'));
  }, [token]);

  // Link „Odpowiedz na pytania” z maila prowadzi do #pytania: przewijamy, gdy rezerwacja się wczyta.
  const loaded = Boolean(booking);
  useEffect(() => {
    if (!loaded || window.location.hash !== '#pytania') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    requestAnimationFrame(() => document.getElementById('pytania')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }));
  }, [loaded]);

  const loadSlots = useCallback(async () => {
    setDays(null);
    const res = await fetch(`/api/booking/slots?token=${encodeURIComponent(token)}`, { cache: 'no-store' });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Nie udało się pobrać terminów.');
      return;
    }
    setDays(data.days);
    setDay(data.days.find((d: DaySlots) => d.slots.length)?.date ?? null);
  }, [token]);

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [mode]);

  async function act(body: Record<string, unknown>, success: string) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch('/api/booking/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, ...body }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Nie udało się zapisać zmiany.');
        if (data.code === 'slot_taken') {
          setStart(null);
          setMode('reschedule');
          await loadSlots();
        }
        return;
      }
      setBooking(data);
      setNotice(success);
      setMode('view');
    } catch {
      setError('Brak połączenia. Sprawdź internet i spróbuj jeszcze raz.');
    } finally {
      setBusy(false);
    }
  }

  if (loadError) {
    return (
      <section className="bk-manage-box" aria-labelledby="bk-m-title">
        <h1 id="bk-m-title" className="bk-h1">
          Nie znaleziono rezerwacji
        </h1>
        <p className="bk-lead">{loadError} Sprawdź, czy link z maila skopiował się w całości.</p>
        <div className="bk-actions">
          <Link href="/umow" className="site-btn site-btn-accent">
            Umów nową rozmowę
          </Link>
          <a href="mailto:stanislaw@drozniak.com" className="site-link">
            Napisz do mnie
          </a>
        </div>
      </section>
    );
  }

  if (!booking) {
    return (
      <section className="bk-manage-box" aria-busy="true">
        <h1 className="bk-h1">Twoja rezerwacja</h1>
        <p className="bk-lead">Wczytuję szczegóły…</p>
      </section>
    );
  }

  const title =
    booking.status === 'cancelled' ? 'Rozmowa odwołana' : booking.status === 'past' ? 'Rozmowa już się odbyła' : 'Twoja rozmowa';

  return (
    <section className="bk-manage-box" aria-labelledby="bk-m-title">
      {booking.demo && <p className="bk-demo">Podgląd lokalny: zmiany nie trafiają do kalendarza ani na skrzynki.</p>}

      <h1 id="bk-m-title" className="bk-h1">
        {title}
      </h1>
      <p className="bk-done-when" data-struck={booking.status === 'cancelled' || undefined}>
        {when(booking)}
      </p>
      <p className="bk-times-tz">
        Czas polski, 20 minut, {booking.mode === 'phone' ? `telefon${booking.phone ? ` (${booking.phone})` : ''}` : 'Google Meet'}
      </p>

      {notice && (
        <p className="bk-success" role="status">
          {notice}
        </p>
      )}
      {error && (
        <p className="bk-alert" role="alert">
          {error}
        </p>
      )}

      {booking.status === 'confirmed' && mode === 'view' && (
        <>
          <p className="bk-body">
            Zaproszenie jest w kalendarzu na adres <strong className="break-words">{booking.email}</strong>.
          </p>
          <div className="bk-actions">
            {booking.meetUrl && (
              <a href={booking.meetUrl} className="site-btn site-btn-ink site-btn-small" target="_blank" rel="noopener noreferrer">
                Link do Google Meet
              </a>
            )}
          </div>
          {booking.canChange ? (
            <div className="bk-actions">
              <button
                type="button"
                className="site-btn site-btn-accent site-btn-small"
                onClick={() => {
                  setNotice(null);
                  setError(null);
                  setStart(null);
                  setMode('reschedule');
                  loadSlots();
                }}
              >
                Przełóż termin
              </button>
              <button
                type="button"
                className="bk-text-btn"
                onClick={() => {
                  setNotice(null);
                  setError(null);
                  setMode('cancel');
                }}
              >
                Odwołaj rozmowę…
              </button>
            </div>
          ) : (
            <p className="bk-body">
              Do rozmowy zostało niewiele czasu, więc zmian nie da się już zrobić tutaj. Jeśli coś Ci wypadło, napisz na{' '}
              <a href="mailto:stanislaw@drozniak.com" className="site-link">
                stanislaw@drozniak.com
              </a>
              .
            </p>
          )}
        </>
      )}

      {booking.status === 'confirmed' && mode === 'reschedule' && (
        <div className="bk-panel bk-panel-flat" data-ui>
          <div className="bk-chosen">
            <h2 className="bk-step-title" ref={headingRef} tabIndex={-1}>
              Nowy termin
            </h2>
            <button type="button" className="bk-text-btn" onClick={() => setMode('view')}>
              Anuluj
            </button>
          </div>
          {days ? (
            <SlotPicker
              days={days}
              selectedDay={day}
              selectedStart={start}
              currentStart={booking.start}
              onSelectDay={(d) => {
                setDay(d);
                setStart(null);
              }}
              onSelectStart={(s) => {
                setStart(s);
                setMode('confirm-move');
              }}
            />
          ) : (
            <SlotPickerSkeleton />
          )}
        </div>
      )}

      {booking.status === 'confirmed' && mode === 'confirm-move' && start && (
        <div className="bk-confirm">
          <h2 className="bk-step-title" ref={headingRef} tabIndex={-1}>
            Przełożyć rozmowę?
          </h2>
          <p className="bk-body">
            Nowy termin: <strong>{formatDayLong(dayOf(start))}, {formatTime(start)}</strong>. Wydarzenie w kalendarzu
            zmieni się samo{booking.mode === 'phone' ? '.' : ', link do Google Meet zostaje ten sam.'}
          </p>
          <div className="bk-actions">
            <button
              type="button"
              className="site-btn site-btn-accent site-btn-small"
              disabled={busy}
              onClick={() => act({ action: 'reschedule', start }, 'Gotowe, rozmowa jest przełożona. Potwierdzenie wysłałem mailem.')}
            >
              {busy && <span className="bk-spinner" aria-hidden="true" />}
              Przełóż rozmowę
            </button>
            <button type="button" className="bk-text-btn" onClick={() => setMode('reschedule')}>
              Wybierz inną godzinę
            </button>
          </div>
        </div>
      )}

      {booking.status === 'confirmed' && mode === 'cancel' && (
        <form
          className="bk-confirm"
          onSubmit={(e) => {
            e.preventDefault();
            const reason = new FormData(e.currentTarget).get('reason');
            act({ action: 'cancel', reason }, 'Rozmowa jest odwołana. Wydarzenie zniknie z Twojego kalendarza.');
          }}
        >
          <h2 className="bk-step-title" ref={headingRef} tabIndex={-1}>
            Odwołać rozmowę?
          </h2>
          <div className="bk-field bk-field-wide">
            <label htmlFor="bk-reason">
              Powód <span className="bk-optional">(nieobowiązkowe)</span>
            </label>
            <textarea id="bk-reason" name="reason" rows={3} autoComplete="off" placeholder="Na przykład: temat jest już nieaktualny…" />
          </div>
          <div className="bk-actions">
            <button type="submit" className="site-btn site-btn-ink site-btn-small" disabled={busy}>
              {busy && <span className="bk-spinner" aria-hidden="true" />}
              Tak, odwołaj rozmowę
            </button>
            <button type="button" className="bk-text-btn" onClick={() => setMode('view')}>
              Nie, zostawiam termin
            </button>
          </div>
        </form>
      )}

      {booking.status === 'confirmed' && mode === 'view' && (
        <section id="pytania" className="bk-brief-box bk-manage-brief" aria-labelledby="bk-brief-h">
          <h2 id="bk-brief-h" className="bk-brief-title">
            {booking.briefDone ? 'Odpowiedzi przed rozmową' : 'Pomóż mi się przygotować'}
          </h2>
          {booking.briefDone ? (
            <p className="bk-body">Dziękuję, odpowiedzi do mnie dotarły. Jeśli chcesz coś dopisać, odpowiedz na maila z potwierdzeniem.</p>
          ) : (
            <>
              <p className="bk-body bk-brief-lead">Sześć krótkich pytań o firmę, około dwóch minut. Każde możesz pominąć.</p>
              <BriefFlow token={token} onSaved={() => setBooking((b) => (b ? { ...b, briefDone: true } : b))} />
            </>
          )}
        </section>
      )}

      {booking.status !== 'confirmed' && (
        <div className="bk-actions">
          <Link href="/umow" className="site-btn site-btn-accent">
            Umów nową rozmowę
          </Link>
          <Link href="/" className="site-link">
            Strona główna
          </Link>
        </div>
      )}
    </section>
  );
}
