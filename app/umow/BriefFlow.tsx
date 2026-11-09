'use client';

import React, { useEffect, useRef, useState } from 'react';
import { BRIEF_QUESTIONS, type BriefAnswers } from '@/lib/booking/brief';
import { trackEvent } from '@/lib/track';

type Props = {
  token: string;
  /** Wywoływane po zapisaniu odpowiedzi. */
  onSaved?: () => void;
};

/**
 * Pytania przed rozmową, po jednym na ekranie. Każde można pominąć, odpowiedzi zapisują się razem na końcu.
 */
export function BriefFlow({ token, onSaved }: Props) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<BriefAnswers>({});
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const titleRef = useRef<HTMLLabelElement & HTMLHeadingElement>(null);
  const first = useRef(true);

  const q = BRIEF_QUESTIONS[index];
  const last = index === BRIEF_QUESTIONS.length - 1;
  const value = answers[q?.id ?? ''];
  const hasValue = Array.isArray(value) ? value.length > 0 : Boolean(value && String(value).trim());
  const anyAnswer = Object.values(answers).some((v) => (Array.isArray(v) ? v.length : String(v).trim()));

  // Przy zmianie pytania fokus na jego treść (klawiatura i czytniki ekranu).
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = document.getElementById(`bq-${q?.id}`) as HTMLElement | null;
    (el?.tagName === 'TEXTAREA' ? el : titleRef.current)?.focus({ preventScroll: true });
  }, [index, q?.id]);

  function set(id: string, v: string | string[]) {
    setAnswers((prev) => ({ ...prev, [id]: v }));
  }

  function toggle(option: string) {
    if (!q || q.kind !== 'choice') return;
    if (q.multiple) {
      const current = Array.isArray(value) ? value : [];
      set(q.id, current.includes(option) ? current.filter((o) => o !== option) : [...current, option]);
    } else {
      set(q.id, value === option ? '' : option);
      // Jedna odpowiedź do wyboru: po kliknięciu od razu dalej, z chwilą na zobaczenie zaznaczenia.
      if (value !== option && !last) window.setTimeout(() => setIndex((i) => Math.min(i + 1, BRIEF_QUESTIONS.length - 1)), 280);
    }
  }

  async function submit() {
    if (sending) return;
    if (!anyAnswer) {
      setError('Odpowiedz chociaż na jedno pytanie albo wróć do nich później z linku w mailu.');
      return;
    }
    setSending(true);
    setError(null);
    try {
      const res = await fetch('/api/booking/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, action: 'brief', answers }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Nie udało się zapisać odpowiedzi.');
      setSaved(true);
      trackEvent('brief_submitted', { answered: Object.keys(answers).length });
      onSaved?.();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Brak połączenia. Spróbuj jeszcze raz.');
    } finally {
      setSending(false);
    }
  }

  function next() {
    if (last) submit();
    else setIndex((i) => i + 1);
  }

  if (saved) {
    return (
      <div className="bf bf-saved" role="status">
        <p className="bf-saved-title">Dziękuję, mam wszystko, czego potrzebuję.</p>
        <p className="bk-body">Odpowiedzi przeczytam przed rozmową. Do usłyszenia!</p>
      </div>
    );
  }

  return (
    <div className="bf">
      <div
        className="bf-progress"
        role="progressbar"
        aria-label="Postęp pytań"
        aria-valuemin={0}
        aria-valuemax={BRIEF_QUESTIONS.length}
        aria-valuenow={index + 1}
        aria-valuetext={`Pytanie ${index + 1} z ${BRIEF_QUESTIONS.length}`}
      >
        <span className="bf-progress-fill" style={{ transform: `scaleX(${(index + 1) / BRIEF_QUESTIONS.length})` }} />
      </div>

      <div className="bf-q" key={q.id}>
        {q.kind === 'text' ? (
          <>
            <label htmlFor={`bq-${q.id}`} className="bf-label" ref={titleRef} tabIndex={-1}>
              {q.label}
            </label>
            {q.hint && <p className="bf-hint">{q.hint}</p>}
            <textarea
              id={`bq-${q.id}`}
              className="bf-text"
              rows={q.rows ?? 3}
              value={typeof value === 'string' ? value : ''}
              placeholder={q.placeholder}
              autoComplete="off"
              onChange={(e) => set(q.id, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  next();
                }
              }}
            />
          </>
        ) : (
          <fieldset className="bf-fieldset">
            <legend className="bf-label" ref={titleRef as React.Ref<HTMLLegendElement>} tabIndex={-1}>
              {q.label}
            </legend>
            {q.hint && <p className="bf-hint">{q.hint}</p>}
            <div className="bf-options">
              {q.options.map((o, i) => {
                const on = Array.isArray(value) ? value.includes(o) : value === o;
                return (
                  <button
                    key={o}
                    type="button"
                    className="bf-option"
                    style={{ ['--i' as string]: i }}
                    aria-pressed={on}
                    data-on={on || undefined}
                    onClick={() => toggle(o)}
                  >
                    <span className="bf-tick" aria-hidden="true">
                      <svg viewBox="0 0 16 16" width="14" height="14">
                        <path d="m3.5 8.5 3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {o}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}
      </div>

      {error && (
        <p className="bk-alert bf-alert" role="alert">
          {error}
        </p>
      )}

      <div className="bf-nav">
        <button type="button" className="site-btn site-btn-ink site-btn-small" onClick={next} disabled={sending}>
          {sending && <span className="bk-spinner" aria-hidden="true" />}
          {last ? 'Wyślij odpowiedzi' : hasValue ? 'Dalej' : 'Pomiń'}
        </button>
        {index > 0 && (
          <button type="button" className="bk-text-btn" onClick={() => setIndex((i) => i - 1)}>
            Wstecz
          </button>
        )}
      </div>
    </div>
  );
}
