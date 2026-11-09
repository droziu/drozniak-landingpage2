'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { DaySlots } from '@/lib/booking/slots';

const TZ = 'Europe/Warsaw';
const WEEK = ['pon.', 'wt.', 'śr.', 'czw.', 'pt.', 'sob.', 'niedz.'];

const monthFmt = new Intl.DateTimeFormat('pl-PL', { timeZone: 'UTC', month: 'long', year: 'numeric' });
const dayLongFmt = new Intl.DateTimeFormat('pl-PL', { timeZone: 'UTC', weekday: 'long', day: 'numeric', month: 'long' });
const timeFmt = new Intl.DateTimeFormat('pl-PL', { timeZone: TZ, hour: '2-digit', minute: '2-digit' });

/** Dzień RRRR-MM-DD jako Date w południe UTC, żeby formatowanie nie przesuwało daty. */
const keyToDate = (key: string) => new Date(`${key}T12:00:00Z`);

export const formatDayLong = (key: string) => dayLongFmt.format(keyToDate(key));
export const formatTime = (iso: string) => timeFmt.format(new Date(iso));

function slotCountLabel(n: number) {
  if (n === 1) return '1 wolny termin';
  const last = n % 10;
  const lastTwo = n % 100;
  if (last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14)) return `${n} wolne terminy`;
  return `${n} wolnych terminów`;
}

type Props = {
  days: DaySlots[];
  selectedDay: string | null;
  selectedStart: string | null;
  onSelectDay: (day: string) => void;
  onSelectStart: (start: string) => void;
  /** Termin, którego nie da się wybrać (obecny termin przy przekładaniu). */
  currentStart?: string | null;
  /** Pytanie nad kalendarzem. */
  title?: string;
  titleRef?: React.Ref<HTMLHeadingElement>;
};

export function SlotPicker({ days, selectedDay, selectedStart, onSelectDay, onSelectStart, currentStart, title = 'Wybierz dzień', titleRef }: Props) {
  const byDay = useMemo(() => new Map(days.map((d) => [d.date, d.slots])), [days]);

  // Miesiące, które obejmuje okno rezerwacji.
  const months = useMemo(() => {
    const keys = [...new Set(days.map((d) => d.date.slice(0, 7)))];
    return keys.length ? keys : [];
  }, [days]);

  const [monthIndex, setMonthIndex] = useState(0);
  useEffect(() => {
    if (selectedDay) {
      const i = months.indexOf(selectedDay.slice(0, 7));
      if (i >= 0) setMonthIndex(i);
    }
  }, [selectedDay, months]);

  const month = months[monthIndex];
  const cells = useMemo(() => {
    if (!month) return [];
    const [y, m] = month.split('-').map(Number);
    const first = new Date(Date.UTC(y, m - 1, 1));
    const daysInMonth = new Date(Date.UTC(y, m, 0)).getUTCDate();
    const lead = (first.getUTCDay() + 6) % 7; // poniedziałek jako pierwszy
    const out: (string | null)[] = Array(lead).fill(null);
    for (let d = 1; d <= daysInMonth; d++) out.push(`${month}-${String(d).padStart(2, '0')}`);
    while (out.length % 7) out.push(null);
    return out;
  }, [month]);

  const timesRef = useRef<HTMLDivElement>(null);
  const firstPick = useRef(true);
  useEffect(() => {
    // Na telefonie godziny są pod kalendarzem: po wyborze dnia przewijamy do nich.
    if (!selectedDay || firstPick.current) {
      firstPick.current = false;
      return;
    }
    if (window.matchMedia('(max-width: 899px)').matches) {
      timesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedDay]);

  const slots = selectedDay ? byDay.get(selectedDay) ?? [] : [];
  const anyFree = days.some((d) => d.slots.length);

  return (
    <div className="bk-picker">
      <div className="bk-cal">
        <div className="bk-cal-head">
          <h2 className="bk-step-title" id="bk-cal-title" ref={titleRef} tabIndex={-1}>
            {title}
          </h2>
          <div className="bk-cal-nav">
            <button
              type="button"
              className="bk-icon-btn"
              aria-label="Poprzedni miesiąc"
              disabled={monthIndex === 0}
              onClick={() => setMonthIndex((i) => Math.max(0, i - 1))}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m15 6-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <p className="bk-cal-month" aria-live="polite">
              {month ? monthFmt.format(keyToDate(`${month}-15`)) : ''}
            </p>
            <button
              type="button"
              className="bk-icon-btn"
              aria-label="Następny miesiąc"
              disabled={monthIndex >= months.length - 1}
              onClick={() => setMonthIndex((i) => Math.min(months.length - 1, i + 1))}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="bk-grid" role="group" aria-labelledby="bk-cal-title">
          <div className="bk-grid-row" aria-hidden="true">
            {WEEK.map((w) => (
              <span key={w} className="bk-weekday">
                {w.replace('.', '')}
              </span>
            ))}
          </div>
          {Array.from({ length: cells.length / 7 }, (_, row) => (
            <div className="bk-grid-row" key={row}>
              {cells.slice(row * 7, row * 7 + 7).map((key, i) => {
                if (!key) return <span key={`e${i}`} className="bk-day bk-day-empty" aria-hidden="true" />;
                const free = byDay.get(key)?.length ?? 0;
                const selected = key === selectedDay;
                const dayNum = Number(key.slice(8));
                return (
                  <span key={key} className="bk-day-cell">
                    {free ? (
                      <button
                        type="button"
                        className="bk-day"
                        data-selected={selected || undefined}
                        aria-pressed={selected}
                        aria-label={`${formatDayLong(key)}, ${slotCountLabel(free)}`}
                        onClick={() => onSelectDay(key)}
                      >
                        {dayNum}
                      </button>
                    ) : (
                      <span className="bk-day bk-day-off" aria-hidden="true">
                        {dayNum}
                      </span>
                    )}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
        {!anyFree && (
          <p className="bk-note" role="status">
            W najbliższych tygodniach nie ma wolnych terminów. Napisz przez{' '}
            <a className="site-link" href="/kontakt">
              formularz kontaktowy
            </a>
            , znajdziemy czas.
          </p>
        )}
      </div>

      <div className="bk-times" ref={timesRef}>
        {selectedDay ? (
          <>
            <h3 className="bk-times-title">{formatDayLong(selectedDay)}</h3>
            <p className="bk-times-tz">Godziny w czasie polskim</p>
            {slots.length ? (
              <ul className="bk-times-list" key={selectedDay} aria-label={`Godziny, ${formatDayLong(selectedDay)}`}>
                {slots.map((s, i) => {
                  const isCurrent = s.start === currentStart;
                  return (
                    <li key={s.start} style={{ ['--i' as string]: Math.min(i, 12) }}>
                      <button
                        type="button"
                        className="bk-time"
                        data-selected={s.start === selectedStart || undefined}
                        aria-pressed={s.start === selectedStart}
                        disabled={isCurrent}
                        onClick={() => onSelectStart(s.start)}
                      >
                        {formatTime(s.start)}
                        {isCurrent && <span className="bk-time-note"> obecny termin</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="bk-note">Ten dzień jest już zajęty. Wybierz inny.</p>
            )}
          </>
        ) : (
          <p className="bk-times-empty">Wybierz dzień w kalendarzu, a tu pokażą się wolne godziny.</p>
        )}
      </div>
    </div>
  );
}

/** Szkielet kalendarza na czas ładowania, w tym samym układzie co gotowy. */
export function SlotPickerSkeleton({ title = 'Wybierz dzień' }: { title?: string }) {
  return (
    <div className="bk-picker" role="status" aria-busy="true" aria-label="Ładowanie wolnych terminów…">
      <div className="bk-cal">
        <div className="bk-cal-head">
          <p className="bk-step-title">{title}</p>
        </div>
        <div className="bk-grid bk-grid-skeleton" aria-hidden="true">
          {Array.from({ length: 35 }, (_, i) => (
            <span key={i} className="bk-day bk-day-ghost" />
          ))}
        </div>
      </div>
      <div className="bk-times">
        <p className="bk-times-empty">Sprawdzam wolne terminy…</p>
      </div>
    </div>
  );
}
