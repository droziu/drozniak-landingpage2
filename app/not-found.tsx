import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nie ma takiej strony',
  robots: { index: false, follow: true },
};

/** Strona 404 w systemie marki: jeden nagłówek, jedno zdanie, jedno działanie. */
export default function NotFound() {
  return (
    <main className="site-wrap nf">
      <h1 className="hp-name nf-title">Nie ma takiej strony</h1>
      <p className="hp-body nf-text">
        Adres mógł się zmienić albo strona została usunięta. Wszystko, czym się zajmuję, jest na stronie głównej.
      </p>
      <div>
        <Link href="/" className="site-btn site-btn-ink">
          Wróć na stronę główną
        </Link>
      </div>
    </main>
  );
}
