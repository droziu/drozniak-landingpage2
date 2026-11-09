'use client';

import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id: string) => void;
    };
  }
}

// Klucz testowy Cloudflare (zawsze przechodzi), tylko lokalnie, gdy nie ustawiono prawdziwego.
const SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
  (process.env.NODE_ENV === 'development' ? '1x00000000000000000000AA' : '');

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
let scriptPromise: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = SCRIPT_SRC;
      s.async = true;
      s.defer = true;
      s.onload = () => resolve();
      s.onerror = () => {
        scriptPromise = null;
        reject(new Error('turnstile script'));
      };
      document.head.appendChild(s);
    });
  }
  return scriptPromise;
}

export const turnstileEnabled = Boolean(SITE_KEY);

export interface TurnstileHandle {
  reset: () => void;
}

/**
 * Cloudflare Turnstile w trybie „interaction-only”: zwykle niewidoczny,
 * pokazuje pole wyboru tylko wtedy, gdy Cloudflare ma wątpliwości.
 */
export const Turnstile = forwardRef<TurnstileHandle, { onToken: (token: string) => void }>(function Turnstile(
  { onToken },
  ref
) {
  const boxRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;

  useImperativeHandle(ref, () => ({
    reset: () => {
      onTokenRef.current('');
      if (widgetId.current) window.turnstile?.reset(widgetId.current);
    },
  }));

  useEffect(() => {
    if (!SITE_KEY) return;
    let cancelled = false;
    loadScript()
      .then(() => {
        if (cancelled || !boxRef.current || !window.turnstile) return;
        widgetId.current = window.turnstile.render(boxRef.current, {
          sitekey: SITE_KEY,
          appearance: 'interaction-only',
          theme: 'light',
          language: 'pl',
          size: 'flexible',
          callback: (t: string) => onTokenRef.current(t),
          'expired-callback': () => onTokenRef.current(''),
          'error-callback': () => onTokenRef.current(''),
        });
      })
      .catch(() => onTokenRef.current(''));
    return () => {
      cancelled = true;
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = null;
    };
  }, []);

  if (!SITE_KEY) return null;
  return <div ref={boxRef} className="kt-turnstile" />;
});
