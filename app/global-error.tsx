'use client';

/**
 * Błąd w samym układzie strony. Zastępuje cały dokument, więc nie ma tu fontów ani tokenów strony:
 * kolory z księgi wpisane wprost, pismo jak w mailach (Georgia i Arial).
 */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="pl">
      <body style={{ margin: 0, minHeight: '100vh', background: '#F6F5F1', color: '#161511', fontFamily: 'Arial, sans-serif' }}>
        <main style={{ maxWidth: 640, padding: '96px 24px', margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'Georgia, serif', fontWeight: 600, fontSize: 40, lineHeight: 1.1, margin: '0 0 16px' }}>
            Coś poszło nie tak
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.55, color: '#5E5A50', margin: '0 0 32px' }}>
            Strona nie wczytała się do końca. Spróbuj jeszcze raz, a jeśli to nie pomoże, napisz na stanislaw@drozniak.com.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{ background: '#161511', color: '#F6F5F1', border: 0, borderRadius: 999, padding: '14px 24px', fontSize: 16, fontWeight: 500, cursor: 'pointer' }}
          >
            Spróbuj jeszcze raz
          </button>
        </main>
      </body>
    </html>
  );
}
