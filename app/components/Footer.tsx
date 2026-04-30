'use client';

import * as React from 'react';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Logo } from '@/components/icons/Logo';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ============================================================
// Magnetic primitive (GSAP, elastic)
// ============================================================
type MagneticAnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' };
type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { as: 'button' };
type MagneticLinkProps = { as: 'link'; href: string; onClick?: () => void; className?: string; children?: React.ReactNode };

type AllMagneticProps = MagneticAnchorProps | MagneticButtonProps | MagneticLinkProps;

const Magnetic: React.FC<AllMagneticProps> = (props) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const x = (e.clientX - cx) * 0.35;
        const y = (e.clientY - cy) * 0.35;
        gsap.to(el, {
          x,
          y,
          rotationX: -y * 0.3,
          rotationY: x * 0.3,
          scale: 1.04,
          ease: 'power3.out',
          duration: 0.4,
        });
      };
      const onLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          ease: 'elastic.out(1, 0.4)',
          duration: 1.1,
        });
      };
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      return () => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
      };
    }, el);

    return () => ctx.revert();
  }, []);

  if (props.as === 'link') {
    const { as: _as, href, onClick, className, children } = props;
    return (
      <Link href={href} onClick={onClick} ref={ref as any} className={className}>
        {children}
      </Link>
    );
  }
  if (props.as === 'a') {
    const { as: _as, ...rest } = props;
    return <a ref={ref as any} {...rest} />;
  }
  const { as: _as, ...rest } = props;
  return <button ref={ref as any} {...rest} />;
};

// ============================================================
// Marquee item
// ============================================================
const MarqueeItem: React.FC = () => (
  <div className="flex items-center gap-12 px-6 whitespace-nowrap text-xs md:text-sm font-bold tracking-[0.3em] text-white/40 uppercase">
    <span>Strony WWW</span>
    <span className="text-[#fee715]/60">✦</span>
    <span>System pozyskiwania klientów</span>
    <span className="text-[#fee715]/60">✦</span>
    <span>AI w marketingu</span>
    <span className="text-[#fee715]/60">✦</span>
    <span>Automatyzacje</span>
    <span className="text-[#fee715]/60">✦</span>
    <span>Design</span>
    <span className="text-[#fee715]/60">✦</span>
  </div>
);

// ============================================================
// CinematicFooter - curtain reveal with giant DROZNIAK text
// ============================================================
export const Footer: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      // Background giant text parallax
      gsap.fromTo(
        giantTextRef.current,
        { y: '8vh', scale: 0.85, opacity: 0 },
        {
          y: '0vh',
          scale: 1,
          opacity: 1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top 80%',
            end: 'bottom bottom',
            scrub: 1,
          },
        }
      );

      // Heading + links staggered reveal
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top 50%',
            end: 'bottom bottom',
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const year = new Date().getFullYear();

  return (
    <>
      <style jsx global>{`
        .cf-grid {
          background-size: 60px 60px;
          background-image:
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
          mask-image: linear-gradient(to bottom, transparent, #000 30%, #000 70%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, transparent, #000 30%, #000 70%, transparent);
        }
        .cf-aurora {
          background: radial-gradient(
            circle at 50% 50%,
            rgba(254, 231, 21, 0.18) 0%,
            rgba(254, 231, 21, 0.05) 35%,
            transparent 70%
          );
          animation: cfBreathe 8s ease-in-out infinite alternate;
        }
        @keyframes cfBreathe {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 1;
          }
        }
        .cf-marquee {
          animation: cfScroll 40s linear infinite;
        }
        @keyframes cfScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .cf-pill {
          background: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.04) 0%,
            rgba(255, 255, 255, 0.01) 100%
          );
          box-shadow:
            0 10px 30px -10px rgba(0, 0, 0, 0.5),
            inset 0 1px 1px rgba(255, 255, 255, 0.08),
            inset 0 -1px 2px rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          transform-style: preserve-3d;
        }
        .cf-pill:hover {
          background: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.08) 0%,
            rgba(255, 255, 255, 0.02) 100%
          );
          border-color: rgba(254, 231, 21, 0.3);
          box-shadow:
            0 20px 40px -10px rgba(0, 0, 0, 0.6),
            inset 0 1px 1px rgba(255, 255, 255, 0.15);
        }
        .cf-pill-primary {
          background: linear-gradient(180deg, #fff066 0%, #fee715 60%, #e5c800 100%);
          box-shadow:
            0 0 0 1px rgba(254, 231, 21, 0.4),
            0 1px 0 rgba(255, 255, 255, 0.6) inset,
            0 -1px 0 rgba(0, 0, 0, 0.2) inset,
            0 12px 30px -8px rgba(254, 231, 21, 0.5),
            0 6px 16px -6px rgba(0, 0, 0, 0.4);
          color: #050714;
          border: none;
        }
        .cf-pill-primary:hover {
          box-shadow:
            0 0 0 1px rgba(254, 231, 21, 0.55),
            0 1px 0 rgba(255, 255, 255, 0.7) inset,
            0 -1px 0 rgba(0, 0, 0, 0.25) inset,
            0 18px 40px -8px rgba(254, 231, 21, 0.65),
            0 6px 16px -6px rgba(0, 0, 0, 0.4);
          background: linear-gradient(180deg, #fff066 0%, #fee715 60%, #e5c800 100%);
        }
        .cf-giant {
          font-size: clamp(6rem, 21vw, 16rem);
          line-height: 0.78;
          font-weight: 800;
          letter-spacing: -0.05em;
          color: transparent;
          -webkit-text-stroke: 1px rgba(254, 231, 21, 0.08);
          background: linear-gradient(
            180deg,
            rgba(254, 231, 21, 0.18) 0%,
            transparent 60%
          );
          -webkit-background-clip: text;
          background-clip: text;
        }
        .cf-text-glow {
          background: linear-gradient(
            180deg,
            #ffffff 0%,
            rgba(255, 255, 255, 0.5) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0px 0px 24px rgba(254, 231, 21, 0.18));
        }
      `}</style>

      <div
        ref={wrapperRef}
        className="relative w-full"
      >
        <footer className="relative flex w-full flex-col overflow-hidden bg-[#040614] text-white pt-20 md:pt-28 min-h-[80vh] md:min-h-[90vh]">
          {/* Ambient + grid */}
          <div className="cf-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[80px] pointer-events-none z-0" />
          <div className="cf-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background text */}
          <div
            ref={giantTextRef}
            className="cf-giant absolute -bottom-[6vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none"
          >
            DROZNIAK
          </div>

          {/* Diagonal marquee */}
          <div className="relative w-full overflow-hidden border-y border-white/10 bg-[#050714]/60 backdrop-blur-md py-4 z-10 -rotate-2 scale-110 shadow-2xl mb-12 md:mb-16">
            <div className="flex w-max cf-marquee">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center px-6 w-full max-w-5xl mx-auto text-center">
            <div ref={headingRef}>
              <h2 className="cf-text-glow tracking-[-0.05em] mb-3 text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] pb-2">
                Porozmawiajmy.
              </h2>
              <p className="text-base md:text-lg text-white/55 max-w-xl mx-auto leading-relaxed mt-6">
                20 minut online, zero zobowiązań. Przeanalizujemy Twoją sytuację i zaproponuję konkretne rozwiązania.
              </p>
            </div>

            <div ref={linksRef} className="flex flex-col items-center gap-5 w-full mt-10 md:mt-12">
              {/* Primary CTAs */}
              <div className="flex flex-wrap justify-center gap-3 md:gap-4 w-full">
                <Magnetic
                  as="a"
                  href="https://calendly.com/drozniakstanislaw/spotkanie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cf-pill cf-pill-primary px-8 md:px-10 py-4 rounded-full font-semibold text-sm md:text-base flex items-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Umów rozmowę 20 min
                </Magnetic>

                <Magnetic
                  as="link"
                  href="/kontakt"
                  className="cf-pill px-8 md:px-10 py-4 rounded-full text-white font-semibold text-sm md:text-base flex items-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Napisz wiadomość
                </Magnetic>
              </div>

              {/* Secondary nav pills */}
              <div className="flex flex-wrap justify-center gap-2 md:gap-3 w-full mt-3">
                {[
                  { href: '/strony-www', label: 'Strony WWW' },
                  { href: '/system', label: 'System pozyskiwania' },
                  { href: '/szkolenia', label: 'Szkolenia z AI' },
                  { href: '/blog', label: 'Blog' },
                  { href: '/polityka-prywatnosci', label: 'Polityka prywatności' },
                ].map((l) => (
                  <Magnetic
                    key={l.href}
                    as="link"
                    href={l.href}
                    className="cf-pill px-5 py-2.5 rounded-full text-white/70 hover:text-white font-medium text-xs md:text-[13px]"
                  >
                    {l.label}
                  </Magnetic>
                ))}
              </div>
            </div>

            {/* Contact micro-row */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-10 text-xs text-white/40">
              <a
                href="mailto:stanislaw@drozniak.com"
                className="hover:text-[#fee715] transition-colors cursor-pointer"
              >
                stanislaw@drozniak.com
              </a>
              <span className="text-white/15">·</span>
              <a
                href="tel:+48792491196"
                className="hover:text-[#fee715] transition-colors cursor-pointer"
              >
                +48 792 491 196
              </a>
              <span className="text-white/15">·</span>
              <a
                href="https://www.linkedin.com/in/stanislawdrozniak"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#fee715] transition-colors cursor-pointer"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="relative z-20 w-full pb-8 pt-16 md:pt-24 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white/35 text-[10px] md:text-xs font-semibold tracking-widest uppercase order-2 md:order-1">
              © {year} Drozniak.pl &middot; Wszelkie prawa zastrzeżone
            </div>

            <Link
              href="/"
              className="cf-pill px-5 py-2.5 rounded-full flex items-center gap-2 order-1 md:order-2 cursor-pointer"
            >
              <span className="text-[#fee715]">
                <Logo />
              </span>
            </Link>

            <Magnetic
              as="button"
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full cf-pill flex items-center justify-center text-white/60 hover:text-[#fee715] group order-3 cursor-pointer"
              aria-label="Wróć na górę"
            >
              <svg
                className="w-5 h-5 transform group-hover:-translate-y-1.5 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </Magnetic>
          </div>
        </footer>
      </div>
    </>
  );
};
