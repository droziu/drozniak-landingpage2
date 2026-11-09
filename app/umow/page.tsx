import type { Metadata } from 'next';
import Link from 'next/link';
import { BookingFlow } from './BookingFlow';
import './umow.css';

const TITLE = 'Umów rozmowę | Stanisław Drożniak';
const DESCRIPTION =
  'Wybierz termin 20-minutowej rozmowy o marketingu i pozyskiwaniu klientów, przez Google Meet albo telefon. Zaproszenie trafi od razu do Twojego kalendarza.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: 'https://drozniak.pl/umow' },
  alternates: { canonical: 'https://drozniak.pl/umow' },
};

export default function UmowPage() {
  return (
    <main className="bk site-wrap">
      <section className="bk-intro" aria-labelledby="bk-title">
        <h1 id="bk-title" className="bk-h1">
          Umów rozmowę
        </h1>
        <p className="bk-lead">
          20&nbsp;minut przez Google Meet albo telefon. Wybierz termin, a&nbsp;zaproszenie od razu trafi do Twojego kalendarza.
        </p>
      </section>

      <BookingFlow />

      <section className="bk-aside" aria-labelledby="bk-how">
        <h2 id="bk-how" className="bk-h2">
          Jak wygląda rozmowa
        </h2>
        <ul className="bk-list">
          <li>Opowiadasz, czym zajmuje się firma i skąd dziś przychodzą klienci.</li>
          <li>Mówię, od czego bym zaczął i ile mniej więcej by to kosztowało.</li>
          <li>Niczego nie musisz przygotowywać, a rozmowa do niczego nie zobowiązuje.</li>
        </ul>

        <div className="bk-host">
          <img src="/images/home/portret-omnie.jpg" alt="" width={900} height={900} className="bk-host-photo" />
          <div className="min-w-0">
            <p className="bk-host-name">Stanisław Drożniak</p>
            <p className="bk-host-role">Marketing i pozyskiwanie klientów dla firm</p>
          </div>
        </div>

        <p className="bk-alt">
          Wolisz napisać?{' '}
          <Link href="/kontakt" className="site-link">
            Formularz kontaktowy
          </Link>{' '}
          albo{' '}
          <a href="mailto:stanislaw@drozniak.com" className="site-link">
            stanislaw@drozniak.com
          </a>
        </p>
      </section>
    </main>
  );
}
