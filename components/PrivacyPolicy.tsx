import React from 'react';
import { Envelope, Phone } from 'phosphor-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <main className="py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-[Montserrat] text-4xl md:text-5xl font-bold mb-4">
              Polityka prywatności
            </h1>
            <p className="text-gray-400 text-lg">
              obowiązuje od: 12.10.2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            {/* Section 1 */}
            <section className="mb-12">
              <h2 className="font-[Montserrat] text-2xl font-bold text-white mb-6">
                1. Administrator danych
              </h2>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="text-gray-300 mb-4">
                  Administratorem danych osobowych jest:
                </p>
                <div className="space-y-2 text-gray-300">
                  <p><strong className="text-white">MONLINE Stanisław Drożniak</strong></p>
                  <p>ul. Krzycka 107/19, 53-019 Wrocław</p>
                  <p>NIP: 6332237557 | REGON: 368769391</p>
                  <p className="mt-4"><strong className="text-white">Kontakt:</strong></p>
                  <p className="flex items-center gap-2"><Envelope size={16} weight="regular" /> <a href="mailto:stanislaw@drozniak.com" className="text-[#fee715] hover:underline">stanislaw@drozniak.com</a></p>
                  <p className="flex items-center gap-2"><Phone size={16} weight="regular" /> <a href="tel:+48792491196" className="text-[#fee715] hover:underline">+48 792 491 196</a></p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-12">
              <h2 className="font-[Montserrat] text-2xl font-bold text-white mb-6">
                2. Kontakt w sprawie danych osobowych
              </h2>
              <p className="text-gray-300 leading-relaxed">
                W sprawach dotyczących przetwarzania danych osobowych możesz skontaktować się poprzez:
              </p>
              <p className="text-gray-300 mt-4">
                📧 <a href="mailto:stanislaw@drozniak.com" className="text-[#fee715] hover:underline">stanislaw@drozniak.com</a>
              </p>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h2 className="font-[Montserrat] text-2xl font-bold text-white mb-6">
                3. Zakres i cele przetwarzania danych
              </h2>
              <p className="text-gray-300 mb-4">
                Przetwarzam dane osobowe wyłącznie w celu:
              </p>
              <ol className="list-decimal list-inside space-y-4 text-gray-300">
                <li className="mb-4">
                  <strong className="text-white">Obsługi formularza kontaktowego</strong>
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li>Dane: imię, e-mail, telefon (dobrowolnie podany).</li>
                    <li>Cel: odpowiedź na zapytanie, przygotowanie oferty.</li>
                  </ul>
                </li>
                <li className="mb-4">
                  <strong className="text-white">Rezerwacji konsultacji / spotkań (Calendly)</strong>
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li>Dane: imię i nazwisko, e-mail, telefon (jeśli wymagany przez system), informacje o terminie.</li>
                    <li>Cel: zapis, obsługa rezerwacji, organizacja spotkania.</li>
                    <li>System: Calendly LLC.</li>
                  </ul>
                </li>
                <li className="mb-4">
                  <strong className="text-white">Wysyłki newslettera (MailerLite)</strong>
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li>Dane: e-mail, data zapisu, aktywności newsletterowe.</li>
                    <li>Cel: przesyłanie treści i informacji marketingowych — tylko po wyrażeniu zgody.</li>
                    <li>System: MailerLite UAB.</li>
                  </ul>
                </li>
                <li className="mb-4">
                  <strong className="text-white">Baza danych i backend (Supabase)</strong>
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li>
                      Dane: dane podane w formularzach (np. imię, e-mail, telefon), dane dotyczące rezerwacji/zakupów
                      (np. identyfikatory transakcji, statusy), dane techniczne związane z funkcjonowaniem serwisu
                      (np. logi zdarzeń, identyfikatory sesji — jeśli występują).
                    </li>
                    <li>
                      Cel: przechowywanie danych niezbędnych do działania strony i usług (np. obsługa zapytań, zapisów,
                      procesów zakupowych), prowadzenie działań operacyjnych (np. realizacja usług/kursów, komunikacja
                      z użytkownikiem), zapewnienie bezpieczeństwa oraz integralności systemu.
                    </li>
                    <li>
                      System: Supabase (Supabase Inc. / dostawca infrastruktury chmurowej w ramach usługi).
                    </li>
                  </ul>
                </li>
                <li className="mb-4">
                  <strong className="text-white">Płatności online (Stripe)</strong>
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li>Dane: imię, nazwisko, adres e-mail, dane transakcji.</li>
                    <li>Cel: realizacja płatności online, obsługa rozliczeń.</li>
                    <li>Operator płatności: Stripe Payments Europe Ltd.</li>
                  </ul>
                </li>
                <li className="mb-4">
                  <strong className="text-white">Analityki i statystyk (cookies)</strong>
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li>Dane: adres IP, identyfikatory cookies, parametry urządzenia, aktywności na stronie.</li>
                    <li>Cel: analiza ruchu, poprawa funkcjonalności, statystyki (Google Analytics).</li>
                  </ul>
                </li>
                <li>
                  <strong className="text-white">Marketing (Meta Pixel, Google Ads)</strong>
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li>Dane wykorzystywane do tworzenia grup odbiorców, remarketingu, mierzenia konwersji.</li>
                    <li>Cel: promocja usług i optymalizacja kampanii reklamowych.</li>
                  </ul>
                </li>
              </ol>
            </section>

            {/* Section 4 */}
            <section className="mb-12">
              <h2 className="font-[Montserrat] text-2xl font-bold text-white mb-6">
                4. Podstawy prawne przetwarzania
              </h2>
              <p className="text-gray-300 mb-4">
                Dane są przetwarzane na podstawie:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li><strong className="text-white">art. 6 ust. 1 lit. a RODO</strong> – zgoda (np. newsletter, cookies marketingowe),</li>
                <li><strong className="text-white">art. 6 ust. 1 lit. b RODO</strong> – wykonanie umowy lub działania na Twoje żądanie (kontakt, konsultacje, płatności),</li>
                <li><strong className="text-white">art. 6 ust. 1 lit. f RODO</strong> – uzasadniony interes administratora (analityka, marketing własnych usług, bezpieczeństwo).</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="mb-12">
              <h2 className="font-[Montserrat] text-2xl font-bold text-white mb-6">
                5. Odbiorcy danych
              </h2>
              <p className="text-gray-300 mb-4">
                Dane mogą być przekazywane do podmiotów, które przetwarzają je w moim imieniu:
              </p>
              <div className="space-y-4 text-gray-300">
                <div>
                  <p className="font-semibold text-white mb-2">Hosting i infrastruktura</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li><strong className="text-white">Vercel Inc.</strong> – hosting i utrzymanie strony.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-white mb-2">Analityka / reklama</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li><strong className="text-white">Google Ireland Ltd.</strong> – Google Analytics, Tag Manager, Ads.</li>
                    <li><strong className="text-white">Meta Platforms Ireland Ltd.</strong> – Meta Pixel, API Conversions.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-white mb-2">Newsletter</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li><strong className="text-white">MailerLite UAB</strong> – system wysyłki newslettera.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-white mb-2">Rezerwacje konsultacji</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li><strong className="text-white">Calendly LLC</strong> – system rezerwacji spotkań.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-white mb-2">Płatności</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li><strong className="text-white">Stripe Payments Europe Ltd.</strong> – obsługa płatności online.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-white mb-2">Pozostali dostawcy</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Dostawcy usług IT i marketingowych działający na podstawie umowy powierzenia danych.</li>
                  </ul>
                </div>
              </div>
              <p className="text-gray-300 mt-4">
                Wszystkie podmioty realizują przetwarzanie zgodnie z RODO i wyłącznie na moje polecenie.
              </p>
            </section>

            {/* Section 6 */}
            <section className="mb-12">
              <h2 className="font-[Montserrat] text-2xl font-bold text-white mb-6">
                6. Czas przechowywania danych
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li><strong className="text-white">Dane z formularza kontaktowego</strong> — do 12 miesięcy po zakończeniu kontaktu.</li>
                <li><strong className="text-white">Dane klientów</strong> — przez okres obsługi oraz do 5 lat (obowiązki podatkowe).</li>
                <li><strong className="text-white">Dane newsletterowe</strong> — do czasu wycofania zgody.</li>
                <li><strong className="text-white">Dane z cookies</strong> — zgodnie z czasem przechowywania ustawionym w przeglądarce lub do usunięcia.</li>
                <li><strong className="text-white">Dane płatnicze (Stripe)</strong> — zgodnie z przepisami rozliczeniowymi i księgowymi.</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section className="mb-12">
              <h2 className="font-[Montserrat] text-2xl font-bold text-white mb-6">
                7. Pliki cookies i narzędzia śledzące
              </h2>
              <p className="text-gray-300 mb-4">
                Strona korzysta z plików cookies w celu:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">
                <li>zapewnienia prawidłowego działania strony,</li>
                <li>tworzenia statystyk (Google Analytics),</li>
                <li>personalizacji reklam i remarketingu (Meta Pixel, Google Ads),</li>
                <li>analizy skuteczności kampanii.</li>
              </ul>
              <p className="text-gray-300">
                Masz prawo zarządzać ustawieniami cookies w swojej przeglądarce.<br />
                Korzystanie ze strony oznacza zgodę na zapisywanie cookies na urządzeniu użytkownika.
              </p>
            </section>

            {/* Section 8 */}
            <section className="mb-12">
              <h2 className="font-[Montserrat] text-2xl font-bold text-white mb-6">
                8. Twoje prawa (RODO)
              </h2>
              <p className="text-gray-300 mb-4">
                Masz prawo do:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">
                <li>dostępu do swoich danych,</li>
                <li>sprostowania lub usunięcia danych,</li>
                <li>ograniczenia przetwarzania,</li>
                <li>przeniesienia danych,</li>
                <li>wniesienia sprzeciwu wobec przetwarzania,</li>
                <li>cofnięcia zgody w dowolnym momencie,</li>
                <li>złożenia skargi do Prezesa UODO.</li>
              </ul>
              <p className="text-gray-300">
                <strong className="text-white">Kontakt:</strong><br />
                📧 <a href="mailto:stanislaw@drozniak.com" className="text-[#fee715] hover:underline">stanislaw@drozniak.com</a>
              </p>
            </section>

            {/* Section 9 */}
            <section className="mb-12">
              <h2 className="font-[Montserrat] text-2xl font-bold text-white mb-6">
                9. Bezpieczeństwo danych
              </h2>
              <p className="text-gray-300 mb-4">
                Dane chronione są przy użyciu:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">
                <li>szyfrowania SSL,</li>
                <li>zabezpieczonych serwerów (Vercel),</li>
                <li>kontroli dostępu,</li>
                <li>aktualnych standardów bezpieczeństwa IT.</li>
              </ul>
              <p className="text-gray-300">
                Dostęp mają wyłącznie osoby upoważnione.
              </p>
            </section>

            {/* Section 10 */}
            <section className="mb-12">
              <h2 className="font-[Montserrat] text-2xl font-bold text-white mb-6">
                10. Zmiany w polityce prywatności
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Polityka prywatności może być aktualizowana w przypadku zmian prawnych lub technicznych.<br />
                Nowa wersja zostanie opublikowana na stronie drozniak.pl.
              </p>
            </section>

            {/* Footer */}
            <div className="text-center pt-8 border-t border-white/10">
              <p className="text-gray-400">
                © 2025 MONLINE Stanisław Drożniak<br />
                Wszelkie prawa zastrzeżone.
              </p>
            </div>
          </div>
        </div>
    </main>
  );
};
