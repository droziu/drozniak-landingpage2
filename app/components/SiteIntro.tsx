'use client';

import React, { useEffect, useRef, useState } from 'react';
import { BrandMark } from './BrandLogo';

/**
 * Intro przy pierwszym wejściu: znak D na głębokiej zieleni, kropka wychodzi przez przerwę w łuku,
 * panel odjeżdża w górę i odsłania gotową już stronę (ok. 1,2 s).
 *
 * O tym, czy intro gra, decyduje skrypt INTRO_SCRIPT w <head> (przed pierwszym malowaniem),
 * ustawiając html[data-intro='play']. Bez tego atrybutu panel ma display: none.
 * Kliknięcie, przewinięcie albo klawisz kończą intro od razu.
 */
export function SiteIntro() {
  const [gone, setGone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || document.documentElement.dataset.intro !== 'play') {
      setGone(true);
      return;
    }
    const finish = () => setGone(true);
    const skip = () => {
      if (el.dataset.skip === undefined) el.dataset.skip = '';
    };
    const onEnd = (e: AnimationEvent) => {
      if (e.target === el) finish();
    };
    el.addEventListener('animationend', onEnd);
    window.addEventListener('wheel', skip, { passive: true });
    window.addEventListener('touchstart', skip, { passive: true });
    window.addEventListener('keydown', skip);
    el.addEventListener('pointerdown', skip);
    // zapas, gdyby animationend nie przyszło (karta w tle)
    const timer = window.setTimeout(finish, 2400);
    return () => {
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
    <div ref={ref} className="site-intro" aria-hidden="true">
      <BrandMark className="site-intro-mark" />
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
}catch(e){}})();`;
