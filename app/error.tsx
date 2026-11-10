'use client';

import Link from 'next/link';
import { useEffect } from 'react';

/** Błąd na stronie, w systemie marki jak 404: jeden nagłówek, jedno zdanie, dwa działania. */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="site-wrap nf">
      <h1 className="hp-name nf-title">Coś poszło nie tak</h1>
      <p className="hp-body nf-text">
        Strona nie wczytała się do końca. Spróbuj jeszcze raz, a jeśli to nie pomoże, napisz na stanislaw@drozniak.com.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        <button type="button" onClick={reset} className="site-btn site-btn-ink">
          Spróbuj jeszcze raz
        </button>
        <Link href="/" className="site-btn site-btn-line">
          Strona główna
        </Link>
      </div>
    </main>
  );
}
