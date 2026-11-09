import { KontaktForm } from './KontaktForm';
import { HomeMotion } from '../components/home/HomeMotion';
import { AreaIcon } from '../components/AreaIcon';
import { ShapeCanvas } from '../components/shapes/ShapeCanvas';
import { SlantRow } from '../components/shapes/SlantRow';
import type { Pt } from '../components/useShapeClips';
import './kontakt.css';

/** Rozmowy umawia się w kalendarzu na /umow. */
const BOOKING_URL = '/umow';

const d = (n: number) => ({ ['--d' as string]: n });

// Płótno jak hero strony głównej: zdjęcie po prawej z nosem w stronę tekstu,
// pod tekstem ciemny pas z mailem i telefonem. Przestrzeń 1000 x 600, szczelina 12 jednostek.
const SPACE = { w: 1000, h: 600 };
const SHAPES: Record<'b' | 'c', Pt[]> = {
  b: [[640, 0], [1000, 0], [1000, 600], [680, 600], [590, 450], [640, 360]],
  c: [[0, 440], [570, 440], [666, 600], [0, 600]],
};

const ArrowIcon = () => (
  <svg className="site-btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function KontaktPage() {
  return (
    <main id="kt-root" className="kt site-wrap">
      <HomeMotion rootId="kt-root" />

      <section aria-labelledby="kt-title">
        <ShapeCanvas className="kt-canvas" shapes={SHAPES} space={SPACE}>
          <div className="kt-a">
            <h1 id="kt-title" className="kt-h1" data-reveal>
              Kontakt
            </h1>
            <p className="hp-lead kt-lead" data-reveal style={d(1)}>
              Napisz kilka zdań o&nbsp;firmie i&nbsp;o&nbsp;tym, co chcesz zmienić. Możesz też od razu umówić krótką
              rozmowę.
            </p>
          </div>

          <figure className="kt-shape kt-b">
            <img src="/images/home/portret-hero-duzy.jpg" srcSet="/images/home/portret-hero-480.jpg 480w, /images/home/portret-hero-800.jpg 800w, /images/home/portret-hero-duzy.jpg 1440w" sizes="(min-width: 960px) 42vw, 100vw" alt="Stanisław Drożniak" width={1440} height={1800} fetchPriority="high" />
          </figure>

          <div className="kt-shape kt-c">
            <ul className="kt-channels">
              <li data-reveal style={d(2)}>
                <span className="kt-channel-icon" aria-hidden="true">
                  <AreaIcon name="mail" size={22} />
                </span>
                <a href="mailto:stanislaw@drozniak.com" className="kt-channel-main">
                  stanislaw@drozniak.com
                </a>
                <span className="kt-channel-note">Odpowiadam w&nbsp;ciągu 24 godzin w&nbsp;dni robocze</span>
              </li>
              <li data-reveal style={d(3)}>
                <span className="kt-channel-icon" aria-hidden="true">
                  <AreaIcon name="phone" size={22} />
                </span>
                <a href="tel:+48792491196" className="kt-channel-main">
                  +48 792 491 196
                </a>
                <span className="kt-channel-note">Poniedziałek-piątek, 10:00-16:00</span>
              </li>
            </ul>
          </div>
        </ShapeCanvas>
      </section>

      <SlantRow className="kt-row-forms" k={0.08}>
        <section className="kt-panel" aria-labelledby="kt-form-title" data-reveal>
          <h2 id="kt-form-title" className="kt-panel-title">
            Napisz wiadomość
          </h2>
          <KontaktForm bookingUrl={BOOKING_URL} />
        </section>

        <section className="kt-book" aria-labelledby="kt-book-title" data-reveal style={d(1)}>
          <span className="kt-book-icon" aria-hidden="true" data-reveal style={d(2)}>
            <AreaIcon name="calendar" size={28} />
          </span>
          <h2 id="kt-book-title" className="kt-panel-title">
            Umów rozmowę
          </h2>
          <p className="kt-book-text">20 minut przez Google Meet, w&nbsp;wybranym przez Ciebie terminie.</p>
          <a href={BOOKING_URL} className="site-btn kt-book-btn">
            Wybierz termin
            <ArrowIcon />
          </a>
        </section>
      </SlantRow>
    </main>
  );
}
