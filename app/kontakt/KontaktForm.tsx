'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { Turnstile, turnstileEnabled, type TurnstileHandle } from './Turnstile';
import { trackLead } from '@/lib/track';

type Field = 'name' | 'email' | 'phone' | 'company' | 'message';
type Errors = Partial<Record<Field, string>>;
type Status = 'idle' | 'sending' | 'sent' | 'error';

const EMPTY: Record<Field, string> = { name: '', email: '', phone: '', company: '', message: '' };

function validate(v: Record<Field, string>): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = 'Wpisz imię i nazwisko.';
  if (!v.email.trim()) e.email = 'Wpisz adres e-mail.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'Ten adres e-mail wygląda na niepełny.';
  if (v.message.trim().length < 10) e.message = 'Napisz choć jedno, dwa zdania o firmie.';
  return e;
}

/**
 * Formularz kontaktowy: błędy przy polach, po wysłaniu fokus na pierwszy błąd,
 * przycisk zachowuje etykietę podczas wysyłania, po sukcesie podziękowanie w miejscu formularza.
 */
export const KontaktForm: React.FC<{ bookingUrl: string }> = ({ bookingUrl }) => {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [honeypot, setHoneypot] = useState('');
  const [serverError, setServerError] = useState('');
  const [token, setToken] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<TurnstileHandle>(null);
  // Czas od wyświetlenia formularza: boty wysyłają go w ułamku sekundy
  const shownAt = useRef(0);
  useEffect(() => {
    shownAt.current = Date.now();
  }, []);
  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as Field;
    setValues((v) => ({ ...v, [name]: e.target.value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
    if (status === 'error') setStatus('idle');
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;

    const found = validate(values);
    setErrors(found);
    const first = (Object.keys(found) as Field[])[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    if (turnstileEnabled && !token) {
      setServerError('Chwila, sprawdzam jeszcze, czy wiadomość wysyła człowiek. Spróbuj za kilka sekund.');
      setStatus('error');
      return;
    }

    setStatus('sending');
    setServerError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          company: values.company.trim(),
          message: values.message.trim(),
          company_website: honeypot,
          elapsed: Date.now() - shownAt.current,
          turnstileToken: token,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        if (res.status === 400 && data.error) setServerError(data.error);
        throw new Error();
      }
      setStatus('sent');
      trackLead('contact');
      setValues(EMPTY);
    } catch {
      setStatus('error');
      // token Turnstile jest jednorazowy, po nieudanej próbie potrzebny nowy
      turnstileRef.current?.reset();
    }
  };

  // Ctrl/Cmd + Enter w polu wiadomości wysyła formularz
  const onMessageKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) formRef.current?.requestSubmit();
  };

  if (status === 'sent') {
    return (
      <div className="kt-sent" role="status">
        <p className="kt-sent-title">Wiadomość wysłana.</p>
        <p className="hp-body">
          Odpowiem w ciągu 24 godzin w dni robocze. Jeśli wolisz porozmawiać od razu, wybierz termin rozmowy online.
        </p>
        <a href={bookingUrl} className="site-btn site-btn-ink">
          Wybierz termin
        </a>
      </div>
    );
  }

  const fieldProps = (f: Field) => ({
    id: id(f),
    name: f,
    value: values[f],
    onChange,
    'aria-invalid': errors[f] ? true : undefined,
    'aria-describedby': errors[f] ? id(`${f}-err`) : undefined,
  });

  const err = (f: Field) =>
    errors[f] ? (
      <span id={id(`${f}-err`)} className="kt-error">
        {errors[f]}
      </span>
    ) : null;

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="kt-form">
      {/* Pole-pułapka na boty, niewidoczne dla ludzi */}
      <div className="kt-trap" aria-hidden="true">
        <label htmlFor={id('trap')}>Nie wypełniaj</label>
        <input
          id={id('trap')}
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="kt-row">
        <div className="kt-field">
          <label htmlFor={id('name')}>Imię i nazwisko</label>
          <input {...fieldProps('name')} type="text" autoComplete="name" placeholder="Anna Kowalska…" />
          {err('name')}
        </div>
        <div className="kt-field">
          <label htmlFor={id('email')}>E-mail</label>
          <input
            {...fieldProps('email')}
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            placeholder="anna@firma.pl…"
          />
          {err('email')}
        </div>
      </div>

      <div className="kt-row">
        <div className="kt-field">
          <label htmlFor={id('phone')}>
            Telefon <span className="kt-optional">(opcjonalnie)</span>
          </label>
          <input {...fieldProps('phone')} type="tel" inputMode="tel" autoComplete="tel" placeholder="600 200 300…" />
        </div>
        <div className="kt-field">
          <label htmlFor={id('company')}>
            Firma lub strona <span className="kt-optional">(opcjonalnie)</span>
          </label>
          <input {...fieldProps('company')} type="text" autoComplete="organization" placeholder="firma.pl…" />
        </div>
      </div>

      <div className="kt-field">
        <label htmlFor={id('message')}>Wiadomość</label>
        <textarea
          {...fieldProps('message')}
          rows={6}
          onKeyDown={onMessageKey}
          placeholder="Czym zajmuje się firma, skąd dziś przychodzą klienci i co chcesz zmienić…"
        />
        {err('message')}
      </div>

      <Turnstile ref={turnstileRef} onToken={setToken} />

      <div className="kt-submit">
        <button type="submit" className="site-btn site-btn-accent" disabled={status === 'sending'} aria-busy={status === 'sending'}>
          {status === 'sending' && <span className="kt-spinner" aria-hidden="true" />}
          {status === 'sending' ? 'Wysyłanie…' : 'Wyślij wiadomość'}
        </button>
        <p className="kt-legal">
          Dane z formularza wykorzystam tylko do odpowiedzi na wiadomość. Więcej w{' '}
          <Link href="/polityka-prywatnosci" className="site-link">
            polityce prywatności
          </Link>
          .
        </p>
      </div>

      <p className="kt-status" role="alert" aria-live="polite">
        {status === 'error' &&
          (serverError ||
            'Nie udało się wysłać wiadomości. Spróbuj jeszcze raz albo napisz bezpośrednio na stanislaw@drozniak.com.')}
      </p>
    </form>
  );
};
