'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Wordmark } from './BrandLogo';

// Blog na razie poza menu: strona działa pod /blog, ale nie prowadzimy do niej ze strony
const NAV_LINKS: { href: string; label: string }[] = [
  { href: '/#wspolpraca', label: 'Współpraca' },
  { href: '/szkolenia', label: 'Szkolenia' },
  { href: '/#o-mnie', label: 'O mnie' },
  { href: '/kontakt', label: 'Kontakt' },
];

const MENU_LINKS: { href: string; label: string }[] = [{ href: '/', label: 'Strona główna' }, ...NAV_LINKS];

/** Wszystkie „Umów rozmowę” prowadzą prosto do kalendarza. */
const BOOKING_HREF = '/umow';

const EXIT_MS = 160;

/**
 * Pasek: wordmark, linki, jeden przycisk do kalendarza. Na telefonie przycisk „Menu”
 * otwiera pełnoekranowe menu, które wyrasta z przycisku i do niego wraca.
 */
export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Menu zostaje w DOM na czas animacji zamknięcia
  useEffect(() => {
    if (open) {
      setMounted(true);
      return;
    }
    const t = window.setTimeout(() => setMounted(false), EXIT_MS);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const raf = requestAnimationFrame(() => firstLinkRef.current?.focus());
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
      cancelAnimationFrame(raf);
    };
  }, [open]);

  // Link do strony głównej, kliknięty na stronie głównej: Next nic nie robi, więc wracamy na górę sami
  const toTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== '/' || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    setOpen(false);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    // Przez router, nie history.replaceState: inaczej Next dalej „myśli”, że jest pod /#o-mnie,
    // i kolejne kliknięcie w ten sam link nic nie robi
    if (window.location.hash) router.replace('/', { scroll: false });
  };

  const isCurrent = (href: string) => (href === '/' ? pathname === '/' : !href.includes('#') && pathname.startsWith(href));

  return (
    <>
      <a href="#tresc" className="site-skip">
        Przejdź do treści
      </a>
      <header className="site-header" data-scrolled={scrolled ? 'true' : 'false'} data-menu={open ? 'true' : 'false'}>
        <div className="site-wrap site-header-row">
          <Link href="/" aria-label="Stanisław Drożniak, strona główna" className="site-wordmark" onClick={toTop} style={open ? { color: 'var(--paper)' } : undefined}>
            <Wordmark className="site-wordmark-svg" />
          </Link>

          <nav className="site-nav" aria-label="Menu główne">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} aria-current={isCurrent(l.href) ? 'page' : undefined}>
                {l.label}
              </Link>
            ))}
            <Link href={BOOKING_HREF} className="site-btn site-btn-ink site-btn-small">
              Umów rozmowę
            </Link>
          </nav>

          <button
            ref={menuBtnRef}
            type="button"
            className="site-menu-btn"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? 'Zamknij' : 'Menu'}
          </button>
        </div>
      </header>

      {mounted && (
        <div id="site-menu" className="site-menu" data-state={open ? 'open' : 'closed'} role="dialog" aria-modal="true" aria-label="Menu">
          <div className="site-wrap" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <nav aria-label="Menu główne">
              <ul>
                {MENU_LINKS.map((l, i) => (
                  <li key={l.href} style={{ ['--i' as string]: i }}>
                    <Link
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={l.href}
                      className="site-menu-link"
                      aria-current={isCurrent(l.href) ? 'page' : undefined}
                      onClick={l.href === '/' ? toTop : () => setOpen(false)}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="site-menu-foot">
              <a href="mailto:stanislaw@drozniak.com">stanislaw@drozniak.com</a>
              <a href="tel:+48792491196">+48 792 491 196</a>
              <Link href={BOOKING_HREF} className="site-btn site-btn-accent" onClick={() => setOpen(false)}>
                Umów rozmowę
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
