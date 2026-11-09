'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FragAds,
  FragAutomation,
  FragEmail,
  FragInquiry,
  FragLanding,
  FragMedia,
  FragReport,
  FragSeason,
} from './Fragments';
import { SlantRow } from '../shapes/SlantRow';

const ITEMS: { title: string; note: string; Frag: React.FC }[] = [
  { title: 'Reklamy w internecie', note: 'Czy reklamy trafiają do ludzi, którzy mogą kupić.', Frag: FragAds },
  { title: 'Grafiki, filmy i animacje', note: 'Czy grafiki i filmy zatrzymują wzrok.', Frag: FragMedia },
  { title: 'Strona i oferta', note: 'Czy oferta jest dobrze skonstruowana i spójna.', Frag: FragLanding },
  { title: 'Obsługa zapytań', note: 'Czy klient szybko dostaje odpowiedź.', Frag: FragInquiry },
  { title: 'Maile do klientów', note: 'Czy klient, który już kupił, wraca po więcej.', Frag: FragEmail },
  { title: 'Sezonowość i branża', note: 'Czy firma ma plan na słabsze miesiące.', Frag: FragSeason },
  { title: 'Pomiar sprzedaży', note: 'Czy wiadomo, skąd przychodzą klienci.', Frag: FragReport },
  { title: 'Automatyzacje i AI', note: 'Czy zespół nie traci czasu na ręczną robotę.', Frag: FragAutomation },
];

/** Od tej szerokości i wysokości okna pas jest przypięty i przewija się w bok; niżej zwykła lista */
const PIN_MEDIA = '(min-width: 768px) and (min-height: 620px)';
/** Pas przesuwa się w bok o tyle razy więcej, niż strona w dół, żeby przypięcie nie trwało za długo */
const SPEED = 1.5;

/**
 * Kafelki naprzemiennie ciemne i jasne, zazębione skosami (SlantRow).
 * Na dużym ekranie sekcja przypina się na czas przejścia przez wszystkie kafelki: przewijanie strony
 * w dół przesuwa pas w poziomie, potem strona jedzie dalej. Strzałki i klawisze ← → przewijają stronę
 * o jeden kafelek. Na telefonie i w niskim oknie pas jest zwykłą karuzelą
 * przesuwaną palcem (scroll-snap), pod nim licznik i strzałki przewijające o jeden kafelek.
 * Grafika w kafelku montuje się, gdy kafelek pierwszy raz wejdzie w widok, i zostaje.
 * Style w home-sections.css (prefiks hpk), grafiki w home-scene.css (prefiks sc).
 */
export const ScopeList: React.FC<{ head: React.ReactNode }> = ({ head }) => {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLElement | null>(null);
  const dist = useRef(0);
  const [shown, setShown] = useState<boolean[]>(() => ITEMS.map(() => false));
  const [pinned, setPinned] = useState(false);
  const [edge, setEdge] = useState({ start: true, end: false });
  /** Karuzela (telefon): numer kafelka przy lewej krawędzi i skrajne położenia */
  const [slide, setSlide] = useState(0);
  const [slideEdge, setSlideEdge] = useState({ start: true, end: false });

  // Grafika montuje się, gdy kafelek pierwszy raz wejdzie w widok (okno i przycięcie pasa)
  useEffect(() => {
    const row = trackRef.current?.firstElementChild;
    if (!row) return;
    const tiles = Array.from(row.children);
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).map((e) => tiles.indexOf(e.target));
        if (!hit.length) return;
        setShown((prev) => (hit.every((i) => prev[i]) ? prev : prev.map((v, i) => v || hit.includes(i))));
      },
      { threshold: 0.35 }
    );
    tiles.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  // Przypięcie: postęp przewijania w pionie przekłada się na przesunięcie pasa w poziomie
  useEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    const row = track?.firstElementChild as HTMLElement | null;
    if (!pin || !track || !row) return;
    rowRef.current = row;
    const mq = window.matchMedia(PIN_MEDIA);
    let raf = 0;
    let last = { start: true, end: false };

    const place = () => {
      raf = 0;
      if (!mq.matches) return;
      const d = dist.current;
      const p = d > 0 ? Math.min(1, Math.max(0, (-pin.getBoundingClientRect().top * SPEED) / d)) : 0;
      row.style.transform = `translate3d(${-Math.round(p * d)}px, 0, 0)`;
      const next = { start: p <= 0.002, end: p >= 0.998 };
      if (next.start !== last.start || next.end !== last.end) {
        last = next;
        setEdge(next);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(place);
    };
    const measure = () => {
      setPinned(mq.matches);
      if (!mq.matches) {
        dist.current = 0;
        row.style.transform = '';
        pin.style.removeProperty('--hpk-dist');
        return;
      }
      const header = document.querySelector<HTMLElement>('.site-header');
      pin.style.setProperty('--hpk-top', `${header ? header.offsetHeight : 0}px`);
      dist.current = Math.max(0, row.scrollWidth - track.clientWidth);
      pin.style.setProperty('--hpk-dist', `${Math.round(dist.current / SPEED)}px`);
      place();
    };

    // Przesunięcie w bok na touchpadzie też prowadzi stronę, bo pas sam się nie przewija
    const onWheel = (e: WheelEvent) => {
      if (!mq.matches || Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      window.scrollBy({ top: e.deltaX, behavior: 'instant' });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    ro.observe(row);
    mq.addEventListener('change', measure);
    window.addEventListener('scroll', onScroll, { passive: true });
    track.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      ro.disconnect();
      mq.removeEventListener('change', measure);
      window.removeEventListener('scroll', onScroll);
      track.removeEventListener('wheel', onWheel);
      if (raf) cancelAnimationFrame(raf);
      row.style.transform = '';
    };
  }, []);

  // Karuzela na telefonie: licznik i stan strzałek liczone z przewinięcia pasa
  useEffect(() => {
    const track = trackRef.current;
    const row = track?.firstElementChild as HTMLElement | null;
    if (!track || !row) return;
    let raf = 0;
    const read = () => {
      raf = 0;
      if (window.matchMedia(PIN_MEDIA).matches) return;
      const tiles = Array.from(row.children) as HTMLElement[];
      if (!tiles.length) return;
      const max = track.scrollWidth - track.clientWidth;
      const x = track.scrollLeft;
      const start = tiles[0].offsetLeft;
      let i = 0;
      tiles.forEach((t, k) => {
        if (Math.abs(t.offsetLeft - start - x) < Math.abs(tiles[i].offsetLeft - start - x)) i = k;
      });
      // przy końcu pasa ostatni kafelek nie dojdzie do lewej krawędzi, więc liczymy go osobno
      if (x >= max - 4) i = tiles.length - 1;
      setSlide(i);
      setSlideEdge((prev) => {
        const next = { start: x <= 4, end: x >= max - 4 };
        return prev.start === next.start && prev.end === next.end ? prev : next;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const slideBy = useCallback((dir: 1 | -1) => {
    const track = trackRef.current;
    const row = track?.firstElementChild as HTMLElement | null;
    if (!track || !row) return;
    const tiles = Array.from(row.children) as HTMLElement[];
    if (!tiles.length) return;
    const start = tiles[0].offsetLeft;
    const x = track.scrollLeft;
    const stops = tiles.map((t) => t.offsetLeft - start);
    const target =
      dir > 0 ? stops.find((p) => p > x + 4) ?? stops[stops.length - 1] : [...stops].reverse().find((p) => p < x - 4) ?? 0;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({ left: target, behavior: reduce ? 'instant' : 'smooth' });
  }, []);

  // Strzałki przewijają stronę tak, żeby pas stanął na następnym albo poprzednim kafelku
  const step = useCallback((dir: 1 | -1) => {
    const pin = pinRef.current;
    const row = rowRef.current;
    if (!pin || !row) return;
    const d = dist.current;
    const top = pin.getBoundingClientRect().top + window.scrollY;
    const now = Math.min(d, Math.max(0, (window.scrollY - top) * SPEED));
    const stops = Array.from(row.children, (t) => Math.min(d, (t as HTMLElement).offsetLeft));
    const target =
      dir > 0 ? stops.find((x) => x > now + 4) ?? d : [...stops].reverse().find((x) => x < now - 4) ?? 0;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: top + Math.round(target / SPEED), behavior: reduce ? 'instant' : 'smooth' });
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    if (!pinned) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      step(e.key === 'ArrowRight' ? 1 : -1);
    }
  };

  return (
    <div ref={pinRef} className="hpk-pin">
      <div className="hpk">
        <div className="hpk-head">
          <div className="hpk-head-text">{head}</div>
          <div className="hpk-nav">
            <button type="button" className="hpk-btn" aria-label="Poprzednie" disabled={edge.start} onClick={() => step(-1)}>
              <Arrow dir={-1} />
            </button>
            <button type="button" className="hpk-btn" aria-label="Następne" disabled={edge.end} onClick={() => step(1)}>
              <Arrow dir={1} />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="hpk-track"
          tabIndex={0}
          role="region"
          aria-label="Co biorę pod uwagę, strzałki w lewo i w prawo przewijają kafelki"
          onKeyDown={onKey}
        >
          <SlantRow as="ul" className="hpk-row" k={0.09} media={PIN_MEDIA}>
            {ITEMS.map(({ title, note, Frag }, i) => (
              <li key={title} className={i % 2 === 0 ? 'hpk-tile hpk-dark' : 'hpk-tile'}>
                <h3 className="hpk-h3">{title}</h3>
                <p className="hpk-note">{note}</p>
                <div className="hpk-art" aria-hidden="true">
                  {shown[i] ? <Frag /> : null}
                </div>
              </li>
            ))}
          </SlantRow>
        </div>

        {/* Telefon: licznik i strzałki pod karuzelą */}
        <div className="hpk-foot">
          <p className="hpk-count">
            <span className="hpk-count-now">{slide + 1}</span>
            <span className="hpk-count-all">/{ITEMS.length}</span>
          </p>
          <div className="hpk-foot-nav">
            <button type="button" className="hpk-btn" aria-label="Poprzedni kafelek" disabled={slideEdge.start} onClick={() => slideBy(-1)}>
              <Arrow dir={-1} />
            </button>
            <button type="button" className="hpk-btn" aria-label="Następny kafelek" disabled={slideEdge.end} onClick={() => slideBy(1)}>
              <Arrow dir={1} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Arrow: React.FC<{ dir: 1 | -1 }> = ({ dir }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={dir < 0 ? { transform: 'scaleX(-1)' } : undefined}>
    <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
