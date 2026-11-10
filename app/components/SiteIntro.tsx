'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MarkIntro, MARK_INTRO_VARS } from './brand/MarkIntro';

/**
 * Intro przy pierwszym wejściu w sesji: animacja znaku (2,4 s) na głębokiej zieleni.
 * Kropka objeżdża literę D i ją rysuje, z końca trzonu wyskakuje nad literę i ląduje z lekkim ugięciem.
 * Potem panel odjeżdża w górę (400 ms) i odsłania gotową już stronę.
 *
 * O tym, czy intro gra, decyduje skrypt INTRO_SCRIPT w <head> (przed pierwszym malowaniem),
 * ustawiając html[data-intro='play']. Bez tego atrybutu panel ma display: none.
 * Sam ruch rusza z html[data-intro-go], który ustawia ten komponent, gdy strona się uruchomi
 * (a skrypt w <head> po 2 s, gdyby komponent nie zdążył).
 * Kliknięcie, przewinięcie albo klawisz kończą intro od razu.
 */
/** Czas od startu ruchu do końca odjazdu panelu (2,4 s animacja znaku i 400 ms odjazd), jak w pub-v2.css. */
const INTRO_MS = 2800;

export function SiteIntro() {
  const [gone, setGone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const root = document.documentElement;
    if (!el || root.dataset.intro !== 'play') {
      setGone(true);
      return;
    }
    const finish = () => setGone(true);
    const skip = () => {
      if (el.dataset.skip === undefined) el.dataset.skip = '';
    };
    const onEnd = (e: AnimationEvent) => {
      if (e.target !== el) return;
      // Po pominięciu intro kropka w napisie w nagłówku ma stać od razu, bez czekania na swoją kolej
      if (el.dataset.skip !== undefined) root.setAttribute('data-intro', 'skipped');
      finish();
    };
    // Ruch rusza, gdy przeglądarka skończy uruchamiać stronę: po zdarzeniu load i sześciu kolejnych równych
    // klatkach. Odsłanianie litery liczy główny wątek, więc start w trakcie ładowania skryptów dawałby
    // zacięcia. Do tego czasu stoi sam zielony panel.
    let timer = 0;
    let frame = 0;
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      root.setAttribute('data-intro-go', '');
      // zapas, gdyby animationend nie przyszło (karta w tle)
      timer = window.setTimeout(finish, INTRO_MS + 700);
    };
    let smooth = 0;
    let last = 0;
    const probe = (now: number) => {
      smooth = last && now - last < 40 ? smooth + 1 : 0;
      last = now;
      if (smooth >= 6) start();
      else frame = window.requestAnimationFrame(probe);
    };
    const watch = () => {
      frame = window.requestAnimationFrame(probe);
    };
    if (document.readyState === 'complete') watch();
    else window.addEventListener('load', watch, { once: true });
    // gdyby karta była w tle i klatki nie szły, ruch rusza po 2 s (to samo robi skrypt w <head>)
    const late = window.setTimeout(start, 2000);
    el.addEventListener('animationend', onEnd);
    window.addEventListener('wheel', skip, { passive: true });
    window.addEventListener('touchstart', skip, { passive: true });
    window.addEventListener('keydown', skip);
    el.addEventListener('pointerdown', skip);
    return () => {
      window.removeEventListener('load', watch);
      window.cancelAnimationFrame(frame);
      window.clearTimeout(late);
      el.removeEventListener('animationend', onEnd);
      window.removeEventListener('wheel', skip);
      window.removeEventListener('touchstart', skip);
      window.removeEventListener('keydown', skip);
      el.removeEventListener('pointerdown', skip);
      window.clearTimeout(timer);
    };
  }, []);

  if (gone) return null;
  return (
    <div ref={ref} className="site-intro" aria-hidden="true" style={MARK_INTRO_VARS}>
      <MarkIntro />
    </div>
  );
}

/**
 * Uruchamiany w <head> przed malowaniem. Intro gra tylko przy pierwszym wejściu w sesji,
 * na stronach marketingowych, bez znaczników kliknięcia w reklamę i bez wyłączonego ruchu.
 * Podgląd w dowolnej chwili: dopisz do adresu ?intro=1.
 */
export const INTRO_SCRIPT = `(function(){try{
var d=document.documentElement,p=location.pathname,q=location.search,f=/[?&]intro=1/.test(q);
if(!f&&sessionStorage.getItem('dz-intro'))return;
if(!/^\\/($|prowadzenie-marketingu|system-pozyskiwania-klientow|szkolenia|kontakt|blog)/.test(p))return;
if(/[?&](gclid|gbraid|wbraid|fbclid|msclkid|ttclid|li_fat_id)=/.test(q)||/[?&]utm_medium=(cpc|ppc|paid|paidsocial|paid_social|display)/i.test(q))return;
if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
sessionStorage.setItem('dz-intro','1');
d.setAttribute('data-intro','play');
setTimeout(function(){d.setAttribute('data-intro-go','')},2000);
}catch(e){}})();`;
