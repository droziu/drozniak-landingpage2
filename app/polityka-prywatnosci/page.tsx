'use client';

import React from 'react';
import { FadeUp } from '@/app/components/premium/Motion';

const tocItems = [
  { num: '01', id: 'administrator-danych', title: 'Administrator danych' },
  { num: '02', id: 'kontakt-dane-osobowe', title: 'Kontakt w sprawie danych osobowych' },
  { num: '03', id: 'zakres-i-cele', title: 'Zakres i cele przetwarzania danych' },
  { num: '04', id: 'podstawy-prawne', title: 'Podstawy prawne przetwarzania' },
  { num: '05', id: 'odbiorcy-danych', title: 'Odbiorcy danych' },
  { num: '06', id: 'czas-przechowywania', title: 'Czas przechowywania danych' },
  { num: '07', id: 'cookies', title: 'Pliki cookies i narzędzia śledzące' },
  { num: '08', id: 'twoje-prawa', title: 'Twoje prawa (RODO)' },
  { num: '09', id: 'bezpieczenstwo', title: 'Bezpieczeństwo danych' },
  { num: '10', id: 'zmiany', title: 'Zmiany w polityce prywatności' },
];

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#161511]';

export default function PrivacyPolicyPage() {
  return (
    <main className="relative">
      {/* ==================== NAGŁÓWEK DOKUMENTU ==================== */}
      <header className="px-5 md:px-10 pt-14 md:pt-24 pb-10 md:pb-14">
        <div className="mx-auto max-w-3xl">
          <FadeUp whenInView={false}>
            <p className="pub-eyebrow mb-7">Dokument</p>
            <h1 className="text-[clamp(2.4rem,6vw,4.2rem)]">
              <span className="pub-h-serif block">Polityka</span>
              <span className="pub-h-sans block mt-1">prywatności.</span>
            </h1>
            <p className="mt-7 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#85816F]">
              Obowiązuje od 9.11.2026
            </p>
          </FadeUp>
        </div>
      </header>

      {/* ==================== SPIS TREŚCI ==================== */}
      <section className="px-5 md:px-10">
        <div className="mx-auto max-w-3xl">
          <FadeUp whenInView={false} delay={0.15}>
            <nav
              aria-label="Spis treści"
              className="bg-[#FFFFFF] border border-[#E4E1D8] rounded-[4px] p-6 md:p-9"
            >
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#85816F] mb-4">
                Spis treści
              </p>
              <ol className="list-none">
                {tocItems.map((item) => (
                  <li key={item.id} className="border-t border-[#E4E1D8] last:border-b">
                    <a
                      href={`#${item.id}`}
                      className={`group flex items-baseline gap-4 py-3 px-1 transition-colors ${focusRing}`}
                    >
                      <span className="pub-serif text-sm text-[#8F7418] w-6 flex-shrink-0">
                        {item.num}
                      </span>
                      <span className="text-[15px] font-medium text-[#161511] group-hover:text-[#8F7418] transition-colors">
                        {item.title}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </FadeUp>
        </div>
      </section>

      {/* ==================== TREŚĆ ==================== */}
      <section className="px-5 md:px-10 pb-24 md:pb-36">
        <div className="mx-auto max-w-3xl">
          {/* 01 - Administrator */}
          <FadeUp>
            <DocSection id="administrator-danych" number="01" title="Administrator danych">
              <p className="mb-5">Administratorem danych osobowych jest:</p>
              <div className="bg-[#FFFFFF] border border-[#E4E1D8] rounded-[4px] p-6 md:p-8">
                <p className="text-[#161511] font-semibold">MONLINE Stanisław Drożniak</p>
                <p className="mt-1.5">ul. Krzycka 107/19, 53-019 Wrocław</p>
                <p className="mt-1.5 text-[13px] tracking-[0.04em] text-[#85816F]">
                  NIP: 6332237557 &middot; REGON: 368769391
                </p>
                <div className="mt-5 pt-5 border-t border-[#E4E1D8] space-y-2.5">
                  <ContactRow label="E-mail" href="mailto:stanislaw@drozniak.com" value="stanislaw@drozniak.com" />
                  <ContactRow label="Telefon" href="tel:+48792491196" value="+48 792 491 196" />
                </div>
              </div>
            </DocSection>
          </FadeUp>

          {/* 02 - Kontakt */}
          <FadeUp>
            <DocSection id="kontakt-dane-osobowe" number="02" title="Kontakt w sprawie danych osobowych">
              <p>
                W sprawach dotyczących przetwarzania danych osobowych możesz skontaktować się przez{' '}
                <InlineLink href="mailto:stanislaw@drozniak.com">stanislaw@drozniak.com</InlineLink>.
              </p>
            </DocSection>
          </FadeUp>

          {/* 03 - Zakres i cele */}
          <FadeUp>
            <DocSection id="zakres-i-cele" number="03" title="Zakres i cele przetwarzania danych">
              <p className="mb-6">Przetwarzam dane osobowe wyłącznie w celu:</p>
              <div className="space-y-3">
                <PurposeItem
                  num="3.1"
                  title="Obsługa formularza kontaktowego"
                  bullets={[
                    'Dane: imię, e-mail, telefon (dobrowolnie podany).',
                    'Cel: odpowiedź na zapytanie, przygotowanie oferty.',
                  ]}
                />
                <PurposeItem
                  num="3.2"
                  title="Umawianie rozmów (kalendarz na stronie)"
                  bullets={[
                    'Dane: imię i nazwisko, e-mail, temat rozmowy, termin; telefon, gdy wybierasz rozmowę telefoniczną lub podajesz go dobrowolnie; nazwa firmy, adres strony i odpowiedzi na pytania przed rozmową, jeśli je podasz.',
                    'Cel: umówienie i przeprowadzenie rozmowy, wysłanie zaproszenia do kalendarza, potwierdzenia i przypomnień, przygotowanie się do rozmowy.',
                    'Systemy: Google (Kalendarz, Meet, Dysk), Supabase Inc. (baza danych), Resend (wysyłka e-maili).',
                  ]}
                />
                <PurposeItem
                  num="3.3"
                  title="Wysyłka newslettera (MailerLite)"
                  bullets={[
                    'Dane: e-mail, data zapisu, aktywności newsletterowe.',
                    'Cel: przesyłanie treści i informacji marketingowych - tylko po wyrażeniu zgody.',
                    'System: MailerLite UAB.',
                  ]}
                />
                <PurposeItem
                  num="3.4"
                  title="Baza danych i backend (Supabase)"
                  bullets={[
                    'Dane: dane podane w formularzach (imię, e-mail, telefon), dane dotyczące rezerwacji/zakupów (identyfikatory transakcji, statusy), dane techniczne związane z funkcjonowaniem serwisu (logi zdarzeń, identyfikatory sesji).',
                    'Cel: przechowywanie danych niezbędnych do działania strony i usług, prowadzenie działań operacyjnych, zapewnienie bezpieczeństwa oraz integralności systemu.',
                    'System: Supabase Inc.',
                  ]}
                />
                <PurposeItem
                  num="3.5"
                  title="Płatności online (Stripe)"
                  bullets={[
                    'Dane: imię, nazwisko, adres e-mail, dane transakcji.',
                    'Cel: realizacja płatności online, obsługa rozliczeń.',
                    'Operator płatności: Stripe Payments Europe Ltd.',
                  ]}
                />
                <PurposeItem
                  num="3.6"
                  title="Analityka i statystyki (cookies)"
                  bullets={[
                    'Dane: adres IP, identyfikatory cookies, parametry urządzenia, aktywności na stronie.',
                    'Cel: analiza ruchu, poprawa funkcjonalności, statystyki (Google Analytics).',
                  ]}
                />
                <PurposeItem
                  num="3.7"
                  title="Marketing (Meta Pixel, Google Ads)"
                  bullets={[
                    'Dane wykorzystywane do tworzenia grup odbiorców, remarketingu, mierzenia konwersji.',
                    'Cel: promocja usług i optymalizacja kampanii reklamowych.',
                  ]}
                />
              </div>
            </DocSection>
          </FadeUp>

          {/* 04 - Podstawy prawne */}
          <FadeUp>
            <DocSection id="podstawy-prawne" number="04" title="Podstawy prawne przetwarzania">
              <p className="mb-5">Dane są przetwarzane na podstawie:</p>
              <ul className="space-y-3">
                <Bullet>
                  <Strong>art. 6 ust. 1 lit. a RODO</Strong> - zgoda (np. newsletter, cookies
                  marketingowe).
                </Bullet>
                <Bullet>
                  <Strong>art. 6 ust. 1 lit. b RODO</Strong> - wykonanie umowy lub działania
                  na Twoje żądanie (kontakt, konsultacje, płatności).
                </Bullet>
                <Bullet>
                  <Strong>art. 6 ust. 1 lit. f RODO</Strong> - uzasadniony interes
                  administratora (analityka, marketing własnych usług, bezpieczeństwo).
                </Bullet>
              </ul>
            </DocSection>
          </FadeUp>

          {/* 05 - Odbiorcy */}
          <FadeUp>
            <DocSection id="odbiorcy-danych" number="05" title="Odbiorcy danych">
              <p className="mb-6">
                Dane mogą być przekazywane do podmiotów przetwarzających je w moim imieniu:
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <RecipientCard
                  label="Hosting i infrastruktura"
                  items={['Vercel Inc. - hosting i utrzymanie strony']}
                />
                <RecipientCard
                  label="Analityka i reklama"
                  items={[
                    'Google Ireland Ltd. - Analytics, Tag Manager, Ads',
                    'Meta Platforms Ireland Ltd. - Pixel, API Conversions',
                  ]}
                />
                <RecipientCard label="Newsletter" items={['MailerLite UAB']} />
                <RecipientCard
                  label="Umawianie rozmów"
                  items={['Google Ireland Ltd. - Kalendarz, Meet, Dysk', 'Supabase Inc. - baza danych', 'Resend - wysyłka e-maili']}
                />
                <RecipientCard label="Płatności" items={['Stripe Payments Europe Ltd.']} />
                <RecipientCard
                  label="Pozostali dostawcy"
                  items={[
                    'Dostawcy usług IT i marketingowych działający na podstawie umowy powierzenia danych',
                  ]}
                />
              </div>
              <p className="mt-6 text-[14px] text-[#85816F] leading-[1.7]">
                Wszystkie podmioty realizują przetwarzanie zgodnie z RODO i wyłącznie na moje
                polecenie.
              </p>
            </DocSection>
          </FadeUp>

          {/* 06 - Czas przechowywania */}
          <FadeUp>
            <DocSection id="czas-przechowywania" number="06" title="Czas przechowywania danych">
              <ul className="space-y-3">
                <Bullet>
                  <Strong>Dane z formularza kontaktowego</Strong> - do 12 miesięcy po
                  zakończeniu kontaktu.
                </Bullet>
                <Bullet>
                  <Strong>Dane klientów</Strong> - przez okres obsługi oraz do 5 lat
                  (obowiązki podatkowe).
                </Bullet>
                <Bullet>
                  <Strong>Dane z umawiania rozmów</Strong> - do 12 miesięcy po rozmowie, chyba że
                  rozpoczniemy współpracę.
                </Bullet>
                <Bullet>
                  <Strong>Dane newsletterowe</Strong> - do czasu wycofania zgody.
                </Bullet>
                <Bullet>
                  <Strong>Dane z cookies</Strong> - zgodnie z czasem przechowywania ustawionym
                  w przeglądarce lub do usunięcia.
                </Bullet>
                <Bullet>
                  <Strong>Dane płatnicze (Stripe)</Strong> - zgodnie z przepisami
                  rozliczeniowymi i księgowymi.
                </Bullet>
              </ul>
            </DocSection>
          </FadeUp>

          {/* 07 - Cookies */}
          <FadeUp>
            <DocSection id="cookies" number="07" title="Pliki cookies i narzędzia śledzące">
              <p className="mb-5">Strona korzysta z plików cookies w celu:</p>
              <ul className="space-y-3 mb-6">
                <Bullet>zapewnienia prawidłowego działania strony</Bullet>
                <Bullet>tworzenia statystyk (Google Analytics)</Bullet>
                <Bullet>personalizacji reklam i remarketingu (Meta Pixel, Google Ads)</Bullet>
                <Bullet>analizy skuteczności kampanii</Bullet>
              </ul>
              <p>
                Masz prawo zarządzać ustawieniami cookies w swojej przeglądarce. Korzystanie ze
                strony oznacza zgodę na zapisywanie cookies na urządzeniu użytkownika.
              </p>
            </DocSection>
          </FadeUp>

          {/* 08 - Prawa */}
          <FadeUp>
            <DocSection id="twoje-prawa" number="08" title="Twoje prawa (RODO)">
              <p className="mb-5">Masz prawo do:</p>
              <ul className="space-y-3 mb-6">
                <Bullet>dostępu do swoich danych</Bullet>
                <Bullet>sprostowania lub usunięcia danych</Bullet>
                <Bullet>ograniczenia przetwarzania</Bullet>
                <Bullet>przeniesienia danych</Bullet>
                <Bullet>wniesienia sprzeciwu wobec przetwarzania</Bullet>
                <Bullet>cofnięcia zgody w dowolnym momencie</Bullet>
                <Bullet>złożenia skargi do Prezesa UODO</Bullet>
              </ul>
              <p>
                Aby skorzystać z tych praw, napisz na{' '}
                <InlineLink href="mailto:stanislaw@drozniak.com">stanislaw@drozniak.com</InlineLink>.
              </p>
            </DocSection>
          </FadeUp>

          {/* 09 - Bezpieczeństwo */}
          <FadeUp>
            <DocSection id="bezpieczenstwo" number="09" title="Bezpieczeństwo danych">
              <p className="mb-5">Dane chronione są przy użyciu:</p>
              <ul className="space-y-3 mb-6">
                <Bullet>szyfrowania SSL</Bullet>
                <Bullet>zabezpieczonych serwerów (Vercel)</Bullet>
                <Bullet>kontroli dostępu</Bullet>
                <Bullet>aktualnych standardów bezpieczeństwa IT</Bullet>
              </ul>
              <p>Dostęp mają wyłącznie osoby upoważnione.</p>
            </DocSection>
          </FadeUp>

          {/* 10 - Zmiany */}
          <FadeUp>
            <DocSection id="zmiany" number="10" title="Zmiany w polityce prywatności">
              <p>
                Polityka prywatności może być aktualizowana w przypadku zmian prawnych lub
                technicznych. Nowa wersja zostanie opublikowana na stronie drozniak.pl.
              </p>
            </DocSection>
          </FadeUp>

          {/* Stopka dokumentu */}
          <FadeUp>
            <div className="mt-16 md:mt-20 pt-8 border-t border-[#E4E1D8] text-center">
              <p className="text-[13px] text-[#85816F] leading-[1.7]">
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

/* ==================== PRYMITYWY DOKUMENTU ==================== */

const DocSection: React.FC<{
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}> = ({ id, number, title, children }) => (
  <section id={id} className="scroll-mt-28 mt-12 md:mt-14 pt-10 md:pt-12 border-t border-[#E4E1D8]">
    <div className="flex items-baseline gap-4 mb-6">
      <span className="pub-num text-[1.7rem] md:text-[2rem] flex-shrink-0">{number}</span>
      <h2 className="text-xl md:text-2xl font-bold tracking-[-0.02em] text-[#161511] leading-tight">
        {title}
      </h2>
    </div>
    <div className="text-[15px] md:text-base text-[#4A4740] leading-[1.75]">{children}</div>
  </section>
);

const Strong: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="text-[#161511] font-semibold">{children}</span>
);

const InlineLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a
    href={href}
    className={`text-[#8F7418] font-medium underline decoration-[#C9A227]/50 underline-offset-[3px] hover:decoration-[#8F7418] transition-colors ${focusRing}`}
  >
    {children}
  </a>
);

const Bullet: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-start gap-3 text-[#4A4740] leading-[1.75]">
    <span aria-hidden="true" className="mt-[0.7em] w-1 h-1 bg-[#C9A227] flex-shrink-0" />
    <span>{children}</span>
  </li>
);

const PurposeItem: React.FC<{ num: string; title: string; bullets: string[] }> = ({
  num,
  title,
  bullets,
}) => (
  <div className="bg-[#FFFFFF] border border-[#E4E1D8] rounded-[4px] p-5 md:p-6">
    <div className="flex items-baseline gap-3 mb-3.5">
      <span className="pub-serif text-sm text-[#8F7418]">{num}</span>
      <h3 className="text-[15px] md:text-base font-semibold text-[#161511]">{title}</h3>
    </div>
    <ul className="space-y-2">
      {bullets.map((b, i) => (
        <li key={i} className="flex items-start gap-3 text-[14px] text-[#4A4740] leading-[1.7]">
          <span aria-hidden="true" className="mt-[0.68em] w-1 h-1 bg-[#D6D2C6] flex-shrink-0" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  </div>
);

const RecipientCard: React.FC<{ label: string; items: string[] }> = ({ label, items }) => (
  <div className="bg-[#FFFFFF] border border-[#E4E1D8] rounded-[4px] p-5">
    <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#85816F] mb-3">
      {label}
    </p>
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="text-[14px] text-[#4A4740] leading-[1.7]">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const ContactRow: React.FC<{ label: string; href: string; value: string }> = ({
  label,
  href,
  value,
}) => (
  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
    <span className="w-16 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#85816F]">
      {label}
    </span>
    <a
      href={href}
      className={`text-[15px] text-[#161511] font-medium hover:text-[#8F7418] transition-colors ${focusRing}`}
    >
      {value}
    </a>
  </div>
);
