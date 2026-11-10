'use client';

import React from 'react';
import { HomeMotion } from '@/app/components/home/HomeMotion';

const tocItems = [
  { num: '1', id: 'administrator-danych', title: 'Administrator danych' },
  { num: '2', id: 'kontakt-dane-osobowe', title: 'Kontakt w sprawie danych osobowych' },
  { num: '3', id: 'zakres-i-cele', title: 'Zakres i cele przetwarzania danych' },
  { num: '4', id: 'podstawy-prawne', title: 'Podstawy prawne przetwarzania' },
  { num: '5', id: 'odbiorcy-danych', title: 'Odbiorcy danych' },
  { num: '6', id: 'czas-przechowywania', title: 'Czas przechowywania danych' },
  { num: '7', id: 'cookies', title: 'Pliki cookies i narzędzia śledzące' },
  { num: '8', id: 'twoje-prawa', title: 'Twoje prawa (RODO)' },
  { num: '9', id: 'bezpieczenstwo', title: 'Bezpieczeństwo danych' },
  { num: '10', id: 'zmiany', title: 'Zmiany w polityce prywatności' },
];

export default function PrivacyPolicyPage() {
  return (
    <main id="pp-root" className="pp">
      <HomeMotion rootId="pp-root" />
      {/* ==================== NAGŁÓWEK DOKUMENTU ==================== */}
      <header className="site-wrap pp-head">
        <div className="pp-col">
          <div data-reveal>
            <h1 className="hp-h2 pp-title">Polityka prywatności</h1>
            <p className="pp-meta">
              Jak przetwarzam dane osobowe na stronie drozniak.pl. Obowiązuje od 9 listopada 2026.
            </p>
          </div>
        </div>
      </header>

      {/* ==================== SPIS TREŚCI ==================== */}
      <section className="site-wrap">
        <div className="pp-col">
          <div data-reveal style={{ ['--d' as string]: 1 }}>
            <nav aria-label="Spis treści" className="pp-toc">
              <p className="pp-toc-title">Spis treści</p>
              <ol className="pp-toc-list">
                {tocItems.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="pp-toc-link">
                      <span className="pp-num">{Number(item.num)}.</span>
                      {item.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      </section>

      {/* ==================== TREŚĆ ==================== */}
      <section className="site-wrap pp-body">
        <div className="pp-col">
          {/* 1. Administrator */}
          <div data-reveal>
            <DocSection id="administrator-danych" number="1" title="Administrator danych">
              <p className="mb-5">Administratorem danych osobowych jest:</p>
              <div className="pp-box">
                <p className="pp-strong">MONLINE Stanisław Drożniak</p>
                <p>ul. Krzycka 107/19, 53-019 Wrocław</p>
                <p className="pp-small">NIP: 6332237557, REGON: 368769391</p>
                <div className="pp-contact">
                  <ContactRow label="E-mail" href="mailto:stanislaw@drozniak.com" value="stanislaw@drozniak.com" />
                  <ContactRow label="Telefon" href="tel:+48792491196" value="+48 792 491 196" />
                </div>
              </div>
            </DocSection>
          </div>

          {/* 2. Kontakt */}
          <div data-reveal>
            <DocSection id="kontakt-dane-osobowe" number="2" title="Kontakt w sprawie danych osobowych">
              <p>
                W sprawach dotyczących przetwarzania danych osobowych możesz skontaktować się przez{' '}
                <InlineLink href="mailto:stanislaw@drozniak.com">stanislaw@drozniak.com</InlineLink>.
              </p>
            </DocSection>
          </div>

          {/* 3. Zakres i cele */}
          <div data-reveal>
            <DocSection id="zakres-i-cele" number="3" title="Zakres i cele przetwarzania danych">
              <p className="mb-6">Przetwarzam dane osobowe wyłącznie w celu:</p>
              <div className="pp-stack">
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
                    'Cel: przesyłanie treści i informacji marketingowych, tylko po wyrażeniu zgody.',
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
                    'Zbiorcze statystyki bez cookies (Vercel Web Analytics) prowadzimy bez zgody, na podstawie prawnie uzasadnionego interesu (art. 6 ust. 1 lit. f RODO).',
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
          </div>

          {/* 4. Podstawy prawne */}
          <div data-reveal>
            <DocSection id="podstawy-prawne" number="4" title="Podstawy prawne przetwarzania">
              <p className="mb-5">Dane są przetwarzane na podstawie:</p>
              <ul className="pp-list">
                <Bullet>
                  <Strong>art. 6 ust. 1 lit. a RODO</Strong>: zgoda (np. newsletter, cookies
                  marketingowe).
                </Bullet>
                <Bullet>
                  <Strong>art. 6 ust. 1 lit. b RODO</Strong>: wykonanie umowy lub działania
                  na Twoje żądanie (kontakt, konsultacje, płatności).
                </Bullet>
                <Bullet>
                  <Strong>art. 6 ust. 1 lit. f RODO</Strong>: uzasadniony interes
                  administratora (analityka, marketing własnych usług, bezpieczeństwo).
                </Bullet>
              </ul>
            </DocSection>
          </div>

          {/* 5. Odbiorcy */}
          <div data-reveal>
            <DocSection id="odbiorcy-danych" number="5" title="Odbiorcy danych">
              <p className="mb-6">
                Dane mogą być przekazywane do podmiotów przetwarzających je w moim imieniu:
              </p>
              <div className="pp-grid">
                <RecipientCard
                  label="Hosting i infrastruktura"
                  items={['Vercel Inc.: hosting, utrzymanie strony i statystyki bez cookies']}
                />
                <RecipientCard
                  label="Analityka i reklama"
                  items={[
                    'Google Ireland Ltd.: Analytics, Tag Manager, Ads',
                    'Meta Platforms Ireland Ltd.: Pixel, API Conversions',
                  ]}
                />
                <RecipientCard label="Newsletter" items={['MailerLite UAB']} />
                <RecipientCard
                  label="Umawianie rozmów"
                  items={['Google Ireland Ltd.: Kalendarz, Meet, Dysk', 'Supabase Inc.: baza danych', 'Resend: wysyłka e-maili']}
                />
                <RecipientCard label="Płatności" items={['Stripe Payments Europe Ltd.']} />
                <RecipientCard
                  label="Pozostali dostawcy"
                  items={[
                    'Dostawcy usług IT i marketingowych działający na podstawie umowy powierzenia danych',
                  ]}
                />
              </div>
              <p className="mt-6">
                Wszystkie podmioty realizują przetwarzanie zgodnie z RODO i wyłącznie na moje
                polecenie.
              </p>
            </DocSection>
          </div>

          {/* 6. Czas przechowywania */}
          <div data-reveal>
            <DocSection id="czas-przechowywania" number="6" title="Czas przechowywania danych">
              <ul className="pp-list">
                <Bullet>
                  <Strong>Dane z formularza kontaktowego</Strong>: do 12 miesięcy po
                  zakończeniu kontaktu.
                </Bullet>
                <Bullet>
                  <Strong>Dane klientów</Strong>: przez okres obsługi oraz do 5 lat
                  (obowiązki podatkowe).
                </Bullet>
                <Bullet>
                  <Strong>Dane z umawiania rozmów</Strong>: do 12 miesięcy po rozmowie, chyba że
                  rozpoczniemy współpracę.
                </Bullet>
                <Bullet>
                  <Strong>Dane newsletterowe</Strong>: do czasu wycofania zgody.
                </Bullet>
                <Bullet>
                  <Strong>Dane z cookies</Strong>: zgodnie z czasem przechowywania ustawionym
                  w przeglądarce lub do usunięcia.
                </Bullet>
                <Bullet>
                  <Strong>Dane płatnicze (Stripe)</Strong>: zgodnie z przepisami
                  rozliczeniowymi i księgowymi.
                </Bullet>
              </ul>
            </DocSection>
          </div>

          {/* 7. Cookies */}
          <div data-reveal>
            <DocSection id="cookies" number="7" title="Pliki cookies i narzędzia śledzące">
              <p className="mb-5">Strona korzysta z plików cookies w celu:</p>
              <ul className="pp-list mb-6">
                <Bullet>zapewnienia prawidłowego działania strony</Bullet>
                <Bullet>tworzenia statystyk (Google Analytics)</Bullet>
                <Bullet>personalizacji reklam i remarketingu (Meta Pixel, Google Ads)</Bullet>
                <Bullet>analizy skuteczności kampanii</Bullet>
              </ul>
              <p className="mb-4">
                Pliki cookies analityczne i marketingowe zapisujemy tylko po Twojej zgodzie, wyrażonej w oknie, które
                pokazuje się przy pierwszej wizycie. Do tego czasu Google otrzymuje wyłącznie anonimowe sygnały bez
                plików cookies (tryb zgody Google), a Meta Pixel w ogóle się nie wczytuje. Zgodę możesz zmienić albo
                wycofać w każdej chwili przyciskiem „Ustawienia cookies” w stopce strony.
              </p>
              <p className="mb-4">
                Niezależnie od zgody liczymy odwiedziny narzędziem Vercel Web Analytics. Nie zapisuje ono niczego na
                Twoim urządzeniu i nie pozwala Cię zidentyfikować: zlicza odsłony, odwiedzane podstrony, źródło wejścia,
                kraj oraz typ urządzenia i przeglądarki.
              </p>
              <p>Ustawieniami cookies możesz też zarządzać w swojej przeglądarce.</p>
            </DocSection>
          </div>

          {/* 8. Prawa */}
          <div data-reveal>
            <DocSection id="twoje-prawa" number="8" title="Twoje prawa (RODO)">
              <p className="mb-5">Masz prawo do:</p>
              <ul className="pp-list mb-6">
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
          </div>

          {/* 9. Bezpieczeństwo */}
          <div data-reveal>
            <DocSection id="bezpieczenstwo" number="9" title="Bezpieczeństwo danych">
              <p className="mb-5">Dane chronione są przy użyciu:</p>
              <ul className="pp-list mb-6">
                <Bullet>szyfrowania SSL</Bullet>
                <Bullet>zabezpieczonych serwerów (Vercel)</Bullet>
                <Bullet>kontroli dostępu</Bullet>
                <Bullet>aktualnych standardów bezpieczeństwa IT</Bullet>
              </ul>
              <p>Dostęp mają wyłącznie osoby upoważnione.</p>
            </DocSection>
          </div>

          {/* 10 - Zmiany */}
          <div data-reveal>
            <DocSection id="zmiany" number="10" title="Zmiany w polityce prywatności">
              <p>
                Polityka prywatności może być aktualizowana w przypadku zmian prawnych lub
                technicznych. Nowa wersja zostanie opublikowana na stronie drozniak.pl.
              </p>
            </DocSection>
          </div>

          {/* Stopka dokumentu */}
          <div data-reveal>
            <p className="pp-end">
              &copy; {new Date().getFullYear()} MONLINE Stanisław Drożniak. Wszelkie prawa zastrzeżone.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ==================== PRYMITYWY DOKUMENTU ====================
   Skład dokumentu według księgi marki: jedna kolumna tekstu na lewej krawędzi strony,
   tekst 17 px w atramencie, sekcje oddziela odstęp, a nie linia; ramki zastępuje kamienne pole.
   Style w pub-v2.css (prefiks pp-). */

const DocSection: React.FC<{
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}> = ({ id, number, title, children }) => (
  <section id={id} className="pp-section">
    <h2 className="pp-h2">
      <span className="pp-num">{Number(number)}.</span>
      {title}
    </h2>
    <div className="pp-text">{children}</div>
  </section>
);

const Strong: React.FC<{ children: React.ReactNode }> = ({ children }) => <strong className="pp-strong">{children}</strong>;

const InlineLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a href={href} className="site-link">
    {children}
  </a>
);

const Bullet: React.FC<{ children: React.ReactNode }> = ({ children }) => <li className="pp-li">{children}</li>;

const PurposeItem: React.FC<{ num: string; title: string; bullets: string[] }> = ({ num, title, bullets }) => (
  <div className="pp-box">
    <h3 className="pp-h3">
      <span className="pp-num">{num}</span>
      {title}
    </h3>
    <ul className="pp-list">
      {bullets.map((b, i) => (
        <li key={i} className="pp-li">
          {b}
        </li>
      ))}
    </ul>
  </div>
);

const RecipientCard: React.FC<{ label: string; items: string[] }> = ({ label, items }) => (
  <div className="pp-box">
    <p className="pp-h3">{label}</p>
    <ul className="pp-list">
      {items.map((item, i) => (
        <li key={i} className="pp-li">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const ContactRow: React.FC<{ label: string; href: string; value: string }> = ({ label, href, value }) => (
  <p className="pp-contact-row">
    <span className="pp-small">{label}</span>
    <a href={href} className="site-link">
      {value}
    </a>
  </p>
);
