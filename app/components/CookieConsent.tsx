'use client';

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export type ConsentPreferences = { necessary: boolean; performance: boolean; analytics: boolean };

interface CookieConsentProps {
  onAccept: (preferences: ConsentPreferences) => void;
}

/** Zdarzenie, które otwiera okno zgody ponownie (przycisk „Ustawienia cookies” w stopce). */
export const OPEN_COOKIE_SETTINGS = 'cookie-settings:open';
export const openCookieSettings = () => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS));

const STORAGE_KEY = 'cookieConsent';
const NONE: ConsentPreferences = { necessary: true, performance: false, analytics: false };
const ALL: ConsentPreferences = { necessary: true, performance: true, analytics: true };
const POLICY_PATH = '/polityka-prywatnosci';

function readSaved(): ConsentPreferences | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ConsentPreferences) : null;
  } catch {
    return null;
  }
}

/**
 * Okno zgody na cookies. Przy pierwszej wizycie zasłania stronę i czeka na wybór: „Akceptuję wszystkie”,
 * „Tylko niezbędne” albo własne ustawienia. Obie główne decyzje są tak samo łatwe (wymóg UODO i EROD).
 * Na stronie polityki prywatności okno nie blokuje treści, żeby dało się ją przeczytać przed decyzją.
 */
export const CookieConsent: React.FC<CookieConsentProps> = ({ onAccept }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [custom, setCustom] = useState(false);
  const [prefs, setPrefs] = useState<ConsentPreferences>(NONE);
  const rootRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const blocking = open && pathname !== POLICY_PATH;

  // Pierwsza wizyta: okno pojawia się chwilę po wyrenderowaniu strony.
  useEffect(() => {
    const skipForDev =
      process.env.NODE_ENV === 'development' && new URLSearchParams(window.location.search).has('bez-cookies');
    if (readSaved() || skipForDev) return;
    const t = window.setTimeout(() => setOpen(true), 350);
    return () => window.clearTimeout(t);
  }, []);

  // Ponowne otwarcie ze stopki, od razu z ustawieniami i z zapisanym wcześniej wyborem.
  useEffect(() => {
    const onOpen = () => {
      returnFocus.current = document.activeElement as HTMLElement | null;
      setPrefs(readSaved() ?? NONE);
      setCustom(true);
      setClosing(false);
      setOpen(true);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS, onOpen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, onOpen);
  }, []);

  // Okno blokujące: reszta strony jest nieaktywna (inert), przewijanie wyłączone, fokus w oknie.
  useLayoutEffect(() => {
    if (!blocking) return;
    const root = rootRef.current;
    const page = root?.parentElement;
    const siblings = page ? Array.from(page.children).filter((el) => el !== root) : [];
    siblings.forEach((el) => el.setAttribute('inert', ''));

    const html = document.documentElement;
    const scrollbar = window.innerWidth - html.clientWidth;
    const prev = { overflow: html.style.overflow, paddingRight: html.style.paddingRight };
    html.style.overflow = 'hidden';
    if (scrollbar > 0) html.style.paddingRight = `${scrollbar}px`;

    dialogRef.current?.focus({ preventScroll: true });

    return () => {
      siblings.forEach((el) => el.removeAttribute('inert'));
      html.style.overflow = prev.overflow;
      html.style.paddingRight = prev.paddingRight;
    };
  }, [blocking]);

  const save = useCallback(
    (next: ConsentPreferences) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Bez localStorage zgoda działa tylko do końca wizyty.
      }
      onAccept(next);
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setClosing(true);
      window.setTimeout(
        () => {
          setOpen(false);
          setClosing(false);
          setCustom(false);
          returnFocus.current?.focus?.({ preventScroll: true });
          returnFocus.current = null;
        },
        reduce ? 0 : 220,
      );
    },
    [onAccept],
  );

  if (!open) return null;

  return (
    <div
      ref={rootRef}
      className="cc-root"
      data-blocking={blocking || undefined}
      data-closing={closing || undefined}
    >
      {blocking && <div className="cc-backdrop" aria-hidden="true" />}
      <div
        ref={dialogRef}
        className="cc-dialog"
        role={blocking ? 'alertdialog' : 'dialog'}
        aria-modal={blocking || undefined}
        aria-labelledby="cc-title"
        aria-describedby="cc-desc"
        tabIndex={-1}
      >
        <h2 id="cc-title" className="cc-title">
          Pliki cookies
        </h2>
        <p id="cc-desc" className="cc-text">
          Chcę wiedzieć, które treści na tej stronie są przydatne i&nbsp;skąd trafiają tu ludzie. Do tego potrzebuję
          Twojej zgody na Google Analytics oraz narzędzia reklamowe Google i&nbsp;Mety. Wybór zmienisz w&nbsp;każdej chwili
          w&nbsp;stopce strony.
        </p>
        <p className="cc-text cc-text-small">
          Szczegóły w&nbsp;
          <Link href={POLICY_PATH} className="site-link">
            polityce prywatności
          </Link>
          .
        </p>

        <div className="cc-settings" data-open={custom || undefined}>
          <div className="cc-settings-inner">
            <fieldset className="cc-list" disabled={!custom}>
              <legend className="cc-sr">Rodzaje plików cookies</legend>
              <Toggle label="Niezbędne" desc="Działanie strony i zapamiętanie tego wyboru. Zawsze włączone." checked disabled />
              <Toggle
                label="Analityka"
                desc="Google Analytics: odwiedziny, źródła ruchu, popularne treści."
                checked={prefs.analytics}
                onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
              />
              <Toggle
                label="Marketing"
                desc="Google Ads i Meta (Facebook, Instagram): pomiar i dopasowanie reklam."
                checked={prefs.performance}
                onChange={(v) => setPrefs((p) => ({ ...p, performance: v }))}
              />
            </fieldset>
          </div>
        </div>

        <div className="cc-actions">
          <button type="button" className="site-btn site-btn-ink cc-btn" onClick={() => save(ALL)}>
            Akceptuję wszystkie
          </button>
          {custom ? (
            <button type="button" className="site-btn cc-btn cc-btn-line" onClick={() => save(prefs)}>
              Zapisz mój wybór
            </button>
          ) : (
            <button type="button" className="site-btn cc-btn cc-btn-line" onClick={() => save(NONE)}>
              Tylko niezbędne
            </button>
          )}
        </div>

        {!custom && (
          <button
            type="button"
            className="cc-more"
            aria-expanded={false}
            onClick={() => {
              setCustom(true);
              // Przycisk znika, więc fokus przechodzi na pierwszy przełącznik do wyboru.
              requestAnimationFrame(() =>
                dialogRef.current?.querySelector<HTMLElement>('.cc-toggle:not([data-locked])')?.focus({ preventScroll: true }),
              );
            }}
          >
            Wybierz, na co się zgadzasz
          </button>
        )}
      </div>
    </div>
  );
};

const Toggle: React.FC<{
  label: string;
  desc: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}> = ({ label, desc, checked, disabled, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-disabled={disabled || undefined}
    onClick={() => !disabled && onChange?.(!checked)}
    className="cc-toggle"
    data-locked={disabled || undefined}
  >
    <span className="cc-toggle-text">
      <span className="cc-toggle-label">{label}</span>
      <span className="cc-toggle-desc">{desc}</span>
    </span>
    <span className="cc-switch" data-on={checked || undefined} aria-hidden="true">
      <span />
    </span>
  </button>
);
