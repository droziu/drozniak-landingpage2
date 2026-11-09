'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { DaySlots } from '@/lib/booking/slots';
import { trackLead } from '@/lib/track';
import { BriefFlow } from './BriefFlow';
import { SlotPicker, SlotPickerSkeleton, formatDayLong, formatTime } from './SlotPicker';

type Step = 'when' | 'how' | 'who' | 'done';
type Mode = 'meet' | 'phone';
type Field = 'name' | 'email' | 'phone' | 'company' | 'website' | 'topic';
type Errors = Partial<Record<Field | 'start', string>>;
type Done = { token: string; start: string; end: string; email: string; meetUrl: string | null; demo: boolean };

const FIELDS: Field[] = ['name', 'email', 'phone', 'topic', 'company', 'website'];
const ORDER: Step[] = ['when', 'how', 'who', 'done'];

/** Dzień RRRR-MM-DD w czasie polskim dla danej chwili. */
const dayOf = (iso: string) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Warsaw' }).format(new Date(iso));
const whenLabel = (iso: string) => `${formatDayLong(dayOf(iso))}, ${formatTime(iso)}`;
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const MODES: { id: Mode; title: string; text: string }[] = [
  { id: 'meet', title: 'Google Meet', text: 'Rozmowa wideo. Link przyjdzie w zaproszeniu do kalendarza.' },
  { id: 'phone', title: 'Telefon', text: 'Zadzwonię na Twój numer o umówionej godzinie.' },
];

function readSource() {
  const params = new URLSearchParams(window.location.search);
  const parts = ['utm_source', 'utm_medium', 'utm_campaign']
    .map((k) => params.get(k) && `${k}=${params.get(k)}`)
    .filter(Boolean);
  if (document.referrer) {
    try {
      const ref = new URL(document.referrer);
      parts.push(ref.host === window.location.host ? `z ${ref.pathname}` : `z ${ref.host}`);
    } catch {
      /* pusty albo niepoprawny referrer */
    }
  }
  return parts.join(', ');
}

/** Ikony kafelków: kamera i słuchawka, w kolorze tekstu. */
function ModeIcon({ mode }: { mode: Mode }) {
  return mode === 'meet' ? (
    <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
      <rect x="2.5" y="6" width="13" height="12" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="m15.5 10.5 5-3v9l-5-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
      <path
        d="M6.6 3.5h2.6l1.4 4-2 1.5a11 11 0 0 0 6.4 6.4l1.5-2 4 1.4v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BookingFlow() {
  const [days, setDays] = useState<DaySlots[] | null>(null);
  const [demo, setDemo] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [day, setDay] = useState<string | null>(null);
  const [start, setStart] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode | null>(null);
  const [step, setStep] = useState<Step>('when');
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<Done | null>(null);
  const [brief, setBrief] = useState<'invite' | 'open' | 'later' | 'saved'>('invite');
  const shownAt = useRef(0);
  const source = useRef('');
  const formRef = useRef<HTMLFormElement>(null);
  const stepRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const load = useCallback(async () => {
    setLoadError(null);
    try {
      const res = await fetch('/api/booking/slots', { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Nie udało się pobrać terminów.');
      setDays(data.days);
      setDemo(Boolean(data.demo));
      return data.days as DaySlots[];
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : 'Nie udało się pobrać terminów.');
      return null;
    }
  }, []);

  // Pierwsze wczytanie: terminy oraz wybór z adresu (?dzien=...&termin=...&forma=telefon).
  useEffect(() => {
    source.current = readSource();
    load().then((loaded) => {
      if (!loaded) return;
      const params = new URLSearchParams(window.location.search);
      const wantedStart = params.get('termin');
      const wantedDay = params.get('dzien');
      const wantedMode = params.get('forma') === 'telefon' ? 'phone' : params.get('forma') === 'meet' ? 'meet' : null;
      const firstFree = loaded.find((d) => d.slots.length)?.date ?? null;
      if (wantedStart && loaded.some((d) => d.slots.some((s) => s.start === wantedStart))) {
        setDay(dayOf(wantedStart));
        setStart(wantedStart);
        if (wantedMode) {
          setMode(wantedMode);
          shownAt.current = Date.now();
          setStep('who');
        } else setStep('how');
      } else if (wantedDay && loaded.some((d) => d.date === wantedDay && d.slots.length)) {
        setDay(wantedDay);
      } else {
        setDay(firstFree);
      }
    });
  }, [load]);

  // Adres odzwierciedla wybór, więc link z wybranym terminem można odświeżyć albo wysłać dalej.
  useEffect(() => {
    if (!days) return;
    const url = new URL(window.location.href);
    for (const k of ['dzien', 'termin', 'forma']) url.searchParams.delete(k);
    if (step !== 'done') {
      if (start) url.searchParams.set('termin', start);
      else if (day) url.searchParams.set('dzien', day);
      if (start && mode && step === 'who') url.searchParams.set('forma', mode === 'phone' ? 'telefon' : 'meet');
    }
    window.history.replaceState(null, '', url);
  }, [day, start, mode, step, days]);

  // Nowy krok: fokus na jego pytanie, a na telefonie przewinięcie do niego.
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
    const top = stepRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0 || top > window.innerHeight * 0.6) {
      stepRef.current?.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' });
    }
  }, [step]);

  // Ostrzeżenie przed wyjściem z wypełnionym, niewysłanym formularzem.
  useEffect(() => {
    if (step !== 'who') return;
    const handler = (e: BeforeUnloadEvent) => {
      const form = formRef.current;
      if (!form || sending) return;
      const filled = FIELDS.some((f) => ((form.elements.namedItem(f) as HTMLInputElement | null)?.value ?? '').trim());
      if (filled) e.preventDefault();
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [step, sending]);

  function pickStart(value: string) {
    setStart(value);
    setFormError(null);
    // Chwila na zobaczenie zaznaczonej godziny, potem następne pytanie.
    window.setTimeout(() => setStep(mode ? 'who' : 'how'), reduceMotion() ? 0 : 260);
    if (mode) shownAt.current = Date.now();
  }

  function pickMode(value: Mode) {
    setMode(value);
    setErrors({});
    shownAt.current = Date.now();
    window.setTimeout(() => setStep('who'), reduceMotion() ? 0 : 260);
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending || !start || !mode) return;
    const form = new FormData(e.currentTarget);
    const payload: Record<string, unknown> = { start, mode, source: source.current, shownAt: shownAt.current };
    for (const [k, v] of form.entries()) payload[k] = typeof v === 'string' ? v.trim() : v;

    // Szybkie sprawdzenie w przeglądarce, te same reguły serwer sprawdza jeszcze raz.
    const local: Errors = {};
    if (String(payload.name || '').length < 2) local.name = 'Podaj imię i nazwisko.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(payload.email || '')))
      local.email = 'Podaj poprawny adres e-mail, na przykład jan@firma.pl.';
    if (mode === 'phone' && !String(payload.phone || '')) local.phone = 'Podaj numer, pod który mam zadzwonić.';
    if (String(payload.topic || '').length < 10) local.topic = 'Napisz w jednym, dwóch zdaniach, o czym chcesz porozmawiać.';
    if (Object.keys(local).length) return showErrors(local);

    setSending(true);
    setFormError(null);
    setErrors({});
    try {
      const res = await fetch('/api/booking/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.code === 'slot_taken') {
          // Termin zajęty w międzyczasie: wracamy do kalendarza ze świeżymi godzinami.
          setStart(null);
          setStep('when');
          setFormError(data.error);
          await load();
          return;
        }
        if (data.errors) return showErrors(data.errors);
        if (data.field && data.field !== 'start') return showErrors({ [data.field]: data.error });
        setFormError(data.error || 'Nie udało się umówić rozmowy. Spróbuj jeszcze raz.');
        return;
      }
      setDone(data);
      setStep('done');
      if (!data.demo) trackLead('booking', { method: mode });
    } catch {
      setFormError('Brak połączenia. Sprawdź internet i spróbuj jeszcze raz, wpisane dane zostały w formularzu.');
    } finally {
      setSending(false);
    }
  }

  function showErrors(next: Errors) {
    setErrors(next);
    const first = FIELDS.find((f) => next[f]);
    if (first) (formRef.current?.elements.namedItem(first) as HTMLElement | null)?.focus();
  }

  const fieldProps = (name: Field) => ({
    id: `bk-${name}`,
    name,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `bk-${name}-error` : undefined,
    onChange: () => errors[name] && setErrors((prev) => ({ ...prev, [name]: undefined })),
  });

  const fieldError = (name: Field) =>
    errors[name] ? (
      <p className="bk-field-error" id={`bk-${name}-error`}>
        {errors[name]}
      </p>
    ) : null;

  const at = ORDER.indexOf(step);
  const optional = <span className="bk-optional">(nieobowiązkowe)</span>;

  return (
    <div className="bk-panel" data-ui>
      {demo && (
        <p className="bk-demo">Podgląd lokalny: terminy są przykładowe, nic nie trafia do kalendarza ani na skrzynki.</p>
      )}

      {/* Odpowiedzi z poprzednich kroków zwinięte do jednej linijki, każdą można zmienić. */}
      {step !== 'done' && at > 0 && (
        <ul className="bk-trail" aria-label="Twój wybór">
          {start && (
            <li className="bk-trail-row">
              <span className="bk-trail-what">Termin</span>
              <span className="bk-trail-value">{whenLabel(start)}</span>
              <button type="button" className="bk-text-btn" onClick={() => setStep('when')}>
                Zmień<span className="sr-only"> termin</span>
              </button>
            </li>
          )}
          {mode && at > 1 && (
            <li className="bk-trail-row">
              <span className="bk-trail-what">Forma</span>
              <span className="bk-trail-value">{mode === 'meet' ? 'Google Meet' : 'Telefon'}</span>
              <button type="button" className="bk-text-btn" onClick={() => setStep('how')}>
                Zmień<span className="sr-only"> formę rozmowy</span>
              </button>
            </li>
          )}
        </ul>
      )}

      <div ref={stepRef} className="bk-anchor" />

      {step === 'when' && (
        <div className="bk-step" key="when">
          {formError && (
            <p className="bk-alert" role="alert">
              {formError}
            </p>
          )}
          {loadError ? (
            <div className="bk-error-box" role="alert">
              <p>{loadError}</p>
              <div className="bk-actions">
                <button type="button" className="site-btn site-btn-ink site-btn-small" onClick={load}>
                  Spróbuj ponownie
                </button>
                <Link href="/kontakt" className="site-link">
                  Napisz przez formularz kontaktowy
                </Link>
              </div>
            </div>
          ) : days ? (
            <SlotPicker
              days={days}
              selectedDay={day}
              selectedStart={start}
              title="Kiedy Ci pasuje?"
              titleRef={headingRef}
              onSelectDay={(d) => {
                setDay(d);
                if (start && dayOf(start) !== d) setStart(null);
              }}
              onSelectStart={pickStart}
            />
          ) : (
            <SlotPickerSkeleton title="Kiedy Ci pasuje?" />
          )}
        </div>
      )}

      {step === 'how' && (
        <div className="bk-step" key="how">
          <h2 className="bk-step-title" ref={headingRef} tabIndex={-1}>
            Jak rozmawiamy?
          </h2>
          <div className="bk-modes" role="group" aria-label="Forma rozmowy">
            {MODES.map((m, i) => (
              <button
                key={m.id}
                type="button"
                className="bk-mode"
                style={{ ['--i' as string]: i }}
                aria-pressed={mode === m.id}
                data-on={mode === m.id || undefined}
                onClick={() => pickMode(m.id)}
              >
                <span className="bk-mode-icon">
                  <ModeIcon mode={m.id} />
                </span>
                <span className="bk-mode-title">{m.title}</span>
                <span className="bk-mode-text">{m.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'who' && start && mode && (
        <div className="bk-step" key="who">
          <h2 className="bk-step-title" ref={headingRef} tabIndex={-1}>
            Kilka słów o Tobie
          </h2>

          <form ref={formRef} className="bk-form" onSubmit={submit} noValidate>
            <div className="bk-field" style={{ ['--i' as string]: 0 }}>
              <label htmlFor="bk-name">Imię i nazwisko</label>
              <input {...fieldProps('name')} type="text" autoComplete="name" required placeholder="Jan Kowalski…" />
              {fieldError('name')}
            </div>
            <div className="bk-field" style={{ ['--i' as string]: 1 }}>
              <label htmlFor="bk-email">E-mail</label>
              <input
                {...fieldProps('email')}
                type="email"
                inputMode="email"
                autoComplete="email"
                spellCheck={false}
                autoCapitalize="off"
                required
                placeholder="jan@firma.pl…"
              />
              {fieldError('email')}
            </div>
            {mode === 'phone' && (
              <div className="bk-field" style={{ ['--i' as string]: 2 }}>
                <label htmlFor="bk-phone">Numer telefonu</label>
                <input {...fieldProps('phone')} type="tel" inputMode="tel" autoComplete="tel" required placeholder="600 123 456…" />
                {fieldError('phone')}
              </div>
            )}
            <div className="bk-field" style={{ ['--i' as string]: 2 }}>
              <label htmlFor="bk-company">Firma {optional}</label>
              <input {...fieldProps('company')} type="text" autoComplete="organization" placeholder="Nazwa firmy…" />
              {fieldError('company')}
            </div>
            <div className="bk-field bk-field-wide" style={{ ['--i' as string]: 3 }}>
              <label htmlFor="bk-topic">O czym chcesz porozmawiać?</label>
              <textarea
                {...fieldProps('topic')}
                rows={3}
                required
                autoComplete="off"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    formRef.current?.requestSubmit();
                  }
                }}
                placeholder="Na przykład: prowadzę biuro rachunkowe, klienci przychodzą tylko z poleceń i chcę to zmienić…"
              />
              {fieldError('topic')}
            </div>
            <div className={`bk-field${mode === 'phone' ? ' bk-field-wide' : ''}`} style={{ ['--i' as string]: 4 }}>
              <label htmlFor="bk-website">Strona internetowa {optional}</label>
              <input
                {...fieldProps('website')}
                type="text"
                inputMode="url"
                autoComplete="url"
                spellCheck={false}
                autoCapitalize="off"
                placeholder="firma.pl…"
              />
              {fieldError('website')}
            </div>
            {mode === 'meet' && (
              <div className="bk-field" style={{ ['--i' as string]: 4 }}>
                <label htmlFor="bk-phone">Telefon {optional}</label>
                <input {...fieldProps('phone')} type="tel" inputMode="tel" autoComplete="tel" placeholder="600 123 456…" />
                {fieldError('phone')}
              </div>
            )}

            {/* Pole-pułapka na boty: niewidoczne i pomijane przez czytniki ekranu. */}
            <div className="bk-trap" aria-hidden="true">
              <label htmlFor="bk-fax">Faks</label>
              <input id="bk-fax" name="fax" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="bk-submit" style={{ ['--i' as string]: 5 }}>
              {formError && (
                <p className="bk-alert" role="alert">
                  {formError}
                </p>
              )}
              <button type="submit" className="site-btn site-btn-accent" disabled={sending} aria-busy={sending}>
                {sending ? 'Umawiam…' : 'Umów rozmowę'}
              </button>
              <p className="bk-hint">
                Na podany adres przyjdzie zaproszenie do kalendarza. Dane posłużą tylko do umówienia i przeprowadzenia
                rozmowy, szczegóły w{' '}
                <Link href="/polityka-prywatnosci" className="site-link">
                  polityce prywatności
                </Link>
                .
              </p>
            </div>
          </form>
        </div>
      )}

      {step === 'done' && done && (
        <div className="bk-step bk-done" key="done">
          <svg className="bk-check" viewBox="0 0 56 56" width="56" height="56" aria-hidden="true">
            <circle className="bk-check-ring" cx="28" cy="28" r="26" />
            <path className="bk-check-mark" d="m17 29 7.5 7.5L40 21" />
          </svg>
          <h2 className="bk-done-title" ref={headingRef} tabIndex={-1}>
            Rozmowa umówiona
          </h2>
          <p className="bk-done-when">
            {formatDayLong(dayOf(done.start))}, {formatTime(done.start)}–{formatTime(done.end)}
          </p>
          <p className="bk-body">
            {mode === 'phone' ? (
              <>
                Zadzwonię o umówionej godzinie. Zaproszenie do kalendarza wysłałem na{' '}
                <strong className="break-words">{done.email}</strong>.
              </>
            ) : (
              <>
                Zaproszenie z linkiem do Google Meet wysłałem na <strong className="break-words">{done.email}</strong>.
              </>
            )}{' '}
            Dzień przed rozmową i godzinę przed nią przyjdzie przypomnienie.
          </p>

          {brief === 'invite' && (
            <div className="bk-brief-invite">
              <h3 className="bk-brief-title">Pomóż mi się przygotować</h3>
              <p className="bk-body">Sześć krótkich pytań o firmę, około dwóch minut. Każde możesz pominąć.</p>
              <div className="bk-actions">
                <button type="button" className="site-btn site-btn-accent site-btn-small" onClick={() => setBrief('open')}>
                  Odpowiedz teraz
                </button>
                <button type="button" className="bk-text-btn" onClick={() => setBrief('later')}>
                  Później
                </button>
              </div>
            </div>
          )}
          {(brief === 'open' || brief === 'saved') && (
            <div className="bk-brief-box">
              <BriefFlow token={done.token} onSaved={() => setBrief('saved')} />
            </div>
          )}
          {brief === 'later' && (
            <p className="bk-body">Link do pytań jest też w mailu z potwierdzeniem, możesz do nich wrócić w każdej chwili.</p>
          )}

          <p className="bk-body bk-done-manage">
            Gdyby termin przestał pasować, przełożysz go albo odwołasz{' '}
            <Link href={`/umow/rezerwacja/${done.token}`} className="site-link">
              na stronie rezerwacji
            </Link>
            .
          </p>
          {done.meetUrl && (
            <div className="bk-actions">
              <a href={done.meetUrl} className="site-link" target="_blank" rel="noopener noreferrer">
                Link do Google Meet
              </a>
            </div>
          )}
        </div>
      )}

      <div className="sr-only" aria-live="polite">
        {sending ? 'Umawiam rozmowę…' : ''}
      </div>
    </div>
  );
}
