'use client';

import React from 'react';
import { HeroShapes } from '@/app/components/premium/HeroShapes';
import { Eyebrow } from '@/app/components/premium/Eyebrow';
import { FadeUp } from '@/app/components/premium/Motion';

export default function PrivacyPolicyPage() {
  return (
    <main className="relative">
      {/* HERO */}
      <section className="relative px-4 md:px-8 py-20 md:py-28 overflow-hidden">
        <HeroShapes variant="minimal" />
        <div className="relative w-full max-w-4xl mx-auto text-center">
          <FadeUp whenInView={false}>
            <Eyebrow align="center" className="mb-5">
              Dokument
            </Eyebrow>
            <h1 className="cinematic-headline text-[clamp(2.25rem,7vw,5rem)] font-bold pb-3">
              Polityka <span className="text-gradient-yellow">prywatności</span>
            </h1>
            <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
              Obowiązuje od 12.10.2025
            </p>
          </FadeUp>
        </div>
      </section>

      {/* CONTENT */}
      <section className="relative px-4 md:px-8 pb-24 md:pb-36">
        <div className="relative max-w-3xl mx-auto space-y-6">
          {/* Section 1 - Administrator */}
          <FadeUp>
            <Section number="01" title="Administrator danych">
              <p className="text-white/65 mb-5 leading-relaxed">
                Administratorem danych osobowych jest:
              </p>
              <div className="card p-6 md:p-7 space-y-2.5 text-[15px] text-white/75 leading-relaxed">
                <p>
                  <span className="text-white font-medium">MONLINE Stanisław Drożniak</span>
                </p>
                <p>ul. Krzycka 107/19, 53-019 Wrocław</p>
                <p className="font-mono text-[12px] text-white/55 tracking-wider">
                  NIP: 6332237557 &middot; REGON: 368769391
                </p>
                <div className="pt-4 mt-4 border-t border-white/8 space-y-2">
                  <ContactRow
                    icon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    }
                    label="Email"
                    href="mailto:stanislaw@drozniak.com"
                    value="stanislaw@drozniak.com"
                  />
                  <ContactRow
                    icon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    }
                    label="Telefon"
                    href="tel:+48792491196"
                    value="+48 792 491 196"
                  />
                </div>
              </div>
            </Section>
          </FadeUp>

          {/* Section 2 */}
          <FadeUp>
            <Section number="02" title="Kontakt w sprawie danych osobowych">
              <p className="text-white/65 leading-relaxed">
                W sprawach dotyczących przetwarzania danych osobowych możesz skontaktować się przez{' '}
                <a
                  href="mailto:stanislaw@drozniak.com"
                  className="text-[#fee715] hover:underline underline-offset-2"
                >
                  stanislaw@drozniak.com
                </a>
                .
              </p>
            </Section>
          </FadeUp>

          {/* Section 3 - Zakres */}
          <FadeUp>
            <Section number="03" title="Zakres i cele przetwarzania danych">
              <p className="text-white/65 mb-6 leading-relaxed">
                Przetwarzam dane osobowe wyłącznie w celu:
              </p>
              <div className="space-y-3">
                <PurposeCard
                  num="3.1"
                  title="Obsługa formularza kontaktowego"
                  bullets={[
                    'Dane: imię, e-mail, telefon (dobrowolnie podany).',
                    'Cel: odpowiedź na zapytanie, przygotowanie oferty.',
                  ]}
                />
                <PurposeCard
                  num="3.2"
                  title="Rezerwacja konsultacji / spotkań (Calendly)"
                  bullets={[
                    'Dane: imię i nazwisko, e-mail, telefon (jeśli wymagany przez system), informacje o terminie.',
                    'Cel: zapis, obsługa rezerwacji, organizacja spotkania.',
                    'System: Calendly LLC.',
                  ]}
                />
                <PurposeCard
                  num="3.3"
                  title="Wysyłka newslettera (MailerLite)"
                  bullets={[
                    'Dane: e-mail, data zapisu, aktywności newsletterowe.',
                    'Cel: przesyłanie treści i informacji marketingowych - tylko po wyrażeniu zgody.',
                    'System: MailerLite UAB.',
                  ]}
                />
                <PurposeCard
                  num="3.4"
                  title="Baza danych i backend (Supabase)"
                  bullets={[
                    'Dane: dane podane w formularzach (imię, e-mail, telefon), dane dotyczące rezerwacji/zakupów (identyfikatory transakcji, statusy), dane techniczne związane z funkcjonowaniem serwisu (logi zdarzeń, identyfikatory sesji).',
                    'Cel: przechowywanie danych niezbędnych do działania strony i usług, prowadzenie działań operacyjnych, zapewnienie bezpieczeństwa oraz integralności systemu.',
                    'System: Supabase Inc.',
                  ]}
                />
                <PurposeCard
                  num="3.5"
                  title="Płatności online (Stripe)"
                  bullets={[
                    'Dane: imię, nazwisko, adres e-mail, dane transakcji.',
                    'Cel: realizacja płatności online, obsługa rozliczeń.',
                    'Operator płatności: Stripe Payments Europe Ltd.',
                  ]}
                />
                <PurposeCard
                  num="3.6"
                  title="Analityka i statystyki (cookies)"
                  bullets={[
                    'Dane: adres IP, identyfikatory cookies, parametry urządzenia, aktywności na stronie.',
                    'Cel: analiza ruchu, poprawa funkcjonalności, statystyki (Google Analytics).',
                  ]}
                />
                <PurposeCard
                  num="3.7"
                  title="Marketing (Meta Pixel, Google Ads)"
                  bullets={[
                    'Dane wykorzystywane do tworzenia grup odbiorców, remarketingu, mierzenia konwersji.',
                    'Cel: promocja usług i optymalizacja kampanii reklamowych.',
                  ]}
                />
              </div>
            </Section>
          </FadeUp>

          {/* Section 4 */}
          <FadeUp>
            <Section number="04" title="Podstawy prawne przetwarzania">
              <p className="text-white/65 mb-5 leading-relaxed">
                Dane są przetwarzane na podstawie:
              </p>
              <ul className="space-y-3">
                <Bullet>
                  <span className="text-white">art. 6 ust. 1 lit. a RODO</span> &mdash; zgoda (np. newsletter, cookies marketingowe).
                </Bullet>
                <Bullet>
                  <span className="text-white">art. 6 ust. 1 lit. b RODO</span> &mdash; wykonanie umowy lub działania na Twoje żądanie (kontakt, konsultacje, płatności).
                </Bullet>
                <Bullet>
                  <span className="text-white">art. 6 ust. 1 lit. f RODO</span> &mdash; uzasadniony interes administratora (analityka, marketing własnych usług, bezpieczeństwo).
                </Bullet>
              </ul>
            </Section>
          </FadeUp>

          {/* Section 5 - Odbiorcy */}
          <FadeUp>
            <Section number="05" title="Odbiorcy danych">
              <p className="text-white/65 mb-6 leading-relaxed">
                Dane mogą być przekazywane do podmiotów przetwarzających je w moim imieniu:
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <RecipientCard label="Hosting i infrastruktura" items={['Vercel Inc. - hosting i utrzymanie strony']} />
                <RecipientCard label="Analityka i reklama" items={['Google Ireland Ltd. - Analytics, Tag Manager, Ads', 'Meta Platforms Ireland Ltd. - Pixel, API Conversions']} />
                <RecipientCard label="Newsletter" items={['MailerLite UAB']} />
                <RecipientCard label="Rezerwacje konsultacji" items={['Calendly LLC']} />
                <RecipientCard label="Płatności" items={['Stripe Payments Europe Ltd.']} />
                <RecipientCard label="Pozostali dostawcy" items={['Dostawcy usług IT i marketingowych działający na podstawie umowy powierzenia danych']} />
              </div>
              <p className="text-white/55 text-[14px] leading-relaxed mt-6">
                Wszystkie podmioty realizują przetwarzanie zgodnie z RODO i wyłącznie na moje polecenie.
              </p>
            </Section>
          </FadeUp>

          {/* Section 6 - Czas */}
          <FadeUp>
            <Section number="06" title="Czas przechowywania danych">
              <ul className="space-y-3">
                <Bullet>
                  <span className="text-white">Dane z formularza kontaktowego</span> - do 12 miesięcy po zakończeniu kontaktu.
                </Bullet>
                <Bullet>
                  <span className="text-white">Dane klientów</span> - przez okres obsługi oraz do 5 lat (obowiązki podatkowe).
                </Bullet>
                <Bullet>
                  <span className="text-white">Dane newsletterowe</span> - do czasu wycofania zgody.
                </Bullet>
                <Bullet>
                  <span className="text-white">Dane z cookies</span> - zgodnie z czasem przechowywania ustawionym w przeglądarce lub do usunięcia.
                </Bullet>
                <Bullet>
                  <span className="text-white">Dane płatnicze (Stripe)</span> - zgodnie z przepisami rozliczeniowymi i księgowymi.
                </Bullet>
              </ul>
            </Section>
          </FadeUp>

          {/* Section 7 - Cookies */}
          <FadeUp>
            <Section number="07" title="Pliki cookies i narzędzia śledzące">
              <p className="text-white/65 mb-5 leading-relaxed">
                Strona korzysta z plików cookies w celu:
              </p>
              <ul className="space-y-3 mb-6">
                <Bullet>zapewnienia prawidłowego działania strony</Bullet>
                <Bullet>tworzenia statystyk (Google Analytics)</Bullet>
                <Bullet>personalizacji reklam i remarketingu (Meta Pixel, Google Ads)</Bullet>
                <Bullet>analizy skuteczności kampanii</Bullet>
              </ul>
              <p className="text-white/65 leading-relaxed">
                Masz prawo zarządzać ustawieniami cookies w swojej przeglądarce. Korzystanie ze strony oznacza zgodę na zapisywanie cookies na urządzeniu użytkownika.
              </p>
            </Section>
          </FadeUp>

          {/* Section 8 - Prawa */}
          <FadeUp>
            <Section number="08" title="Twoje prawa (RODO)">
              <p className="text-white/65 mb-5 leading-relaxed">Masz prawo do:</p>
              <ul className="space-y-3 mb-6">
                <Bullet>dostępu do swoich danych</Bullet>
                <Bullet>sprostowania lub usunięcia danych</Bullet>
                <Bullet>ograniczenia przetwarzania</Bullet>
                <Bullet>przeniesienia danych</Bullet>
                <Bullet>wniesienia sprzeciwu wobec przetwarzania</Bullet>
                <Bullet>cofnięcia zgody w dowolnym momencie</Bullet>
                <Bullet>złożenia skargi do Prezesa UODO</Bullet>
              </ul>
              <div className="card p-5 inline-flex items-center gap-3">
                <svg className="w-4 h-4 text-[#fee715]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a
                  href="mailto:stanislaw@drozniak.com"
                  className="text-[#fee715] hover:underline underline-offset-2 text-sm font-medium"
                >
                  stanislaw@drozniak.com
                </a>
              </div>
            </Section>
          </FadeUp>

          {/* Section 9 - Bezpieczeństwo */}
          <FadeUp>
            <Section number="09" title="Bezpieczeństwo danych">
              <p className="text-white/65 mb-5 leading-relaxed">Dane chronione są przy użyciu:</p>
              <ul className="space-y-3 mb-6">
                <Bullet>szyfrowania SSL</Bullet>
                <Bullet>zabezpieczonych serwerów (Vercel)</Bullet>
                <Bullet>kontroli dostępu</Bullet>
                <Bullet>aktualnych standardów bezpieczeństwa IT</Bullet>
              </ul>
              <p className="text-white/65 leading-relaxed">
                Dostęp mają wyłącznie osoby upoważnione.
              </p>
            </Section>
          </FadeUp>

          {/* Section 10 */}
          <FadeUp>
            <Section number="10" title="Zmiany w polityce prywatności">
              <p className="text-white/65 leading-relaxed">
                Polityka prywatności może być aktualizowana w przypadku zmian prawnych lub technicznych. Nowa wersja zostanie opublikowana na stronie drozniak.pl.
              </p>
            </Section>
          </FadeUp>

          {/* Footer */}
          <FadeUp>
            <div className="text-center pt-8 mt-4 border-t border-white/8">
              <p className="text-white/40 text-[13px] leading-relaxed">
                &copy; {new Date().getFullYear()} MONLINE Stanisław Drożniak
                <br />
                Wszelkie prawa zastrzeżone.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}

const Section: React.FC<{ number: string; title: string; children: React.ReactNode }> = ({
  number,
  title,
  children,
}) => (
  <div className="card p-7 md:p-9">
    <div className="flex items-center gap-4 mb-6">
      <span className="font-mono text-[11px] tracking-[0.18em] text-[#fee715]">{number}</span>
      <span className="h-px flex-1 bg-gradient-to-r from-[#fee715]/40 via-white/8 to-transparent" />
    </div>
    <h2 className="text-xl md:text-2xl lg:text-[1.65rem] font-medium tracking-[-0.02em] text-white leading-tight mb-6">
      {title}
    </h2>
    <div className="text-[15px] md:text-base">{children}</div>
  </div>
);

const Bullet: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-start gap-3 text-white/65 leading-relaxed">
    <span className="mt-2 w-1 h-1 rounded-full bg-[#fee715] flex-shrink-0" />
    <span>{children}</span>
  </li>
);

const PurposeCard: React.FC<{ num: string; title: string; bullets: string[] }> = ({
  num,
  title,
  bullets,
}) => (
  <div className="rounded-xl bg-white/[0.02] border border-white/8 p-5 md:p-6">
    <div className="flex items-center gap-3 mb-4">
      <span className="font-mono text-[10px] tracking-[0.2em] text-[#fee715]">{num}</span>
      <h3 className="text-[15px] md:text-base font-medium text-white">{title}</h3>
    </div>
    <ul className="space-y-2">
      {bullets.map((b, i) => (
        <li key={i} className="flex items-start gap-3 text-[14px] text-white/60 leading-relaxed">
          <span className="mt-1.5 w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  </div>
);

const RecipientCard: React.FC<{ label: string; items: string[] }> = ({ label, items }) => (
  <div className="rounded-xl bg-white/[0.02] border border-white/8 p-5">
    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#fee715] mb-3">
      {label}
    </div>
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="text-[14px] text-white/65 leading-relaxed">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const ContactRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  href: string;
  value: string;
}> = ({ icon, label, href, value }) => (
  <div className="flex items-center gap-3">
    <span className="text-[#fee715]">{icon}</span>
    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">{label}</span>
    <span className="text-white/20">·</span>
    <a
      href={href}
      className="text-[#fee715] hover:underline underline-offset-2 text-sm font-medium"
    >
      {value}
    </a>
  </div>
);
