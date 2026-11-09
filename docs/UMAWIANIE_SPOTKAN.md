# Umawianie rozmów na drozniak.pl

Własny kalendarz rezerwacji pod adresem `/umow`, bez Calendly i bez dodatkowego serwera. Działa na tym, co strona już ma: Next.js na Vercelu, Supabase i Resend, plus API Kalendarza Google.

## Jak to działa dla klienta

1. Wchodzi na `/umow`, widzi wolne dni i godziny. Wolne terminy liczą się na żywo z Twojego Kalendarza Google: godziny pracy minus wszystko, co masz w kalendarzu, z 10-minutowym zapasem przed i po.
2. Wybiera godzinę, podaje imię, e-mail i temat rozmowy (firma, strona i telefon są nieobowiązkowe).
3. W tej samej chwili:
   - w Twoim kalendarzu powstaje wydarzenie z linkiem do Google Meet, a klient jest na nim gościem,
   - Google wysyła klientowi zaproszenie, więc rozmowa ląduje w jego kalendarzu (Google, Outlook, Apple),
   - klient dostaje od Ciebie mail z potwierdzeniem i linkiem „przełóż albo odwołaj”,
   - Ty dostajesz mail z danymi i odpowiedziami klienta.
4. Dzień przed rozmową i godzinę przed nią klient dostaje przypomnienie z linkiem do Meet.
5. Pod linkiem z maila (`/umow/rezerwacja/...`) klient może sam przełożyć albo odwołać rozmowę, najpóźniej 2 godziny przed nią. Wydarzenie w obu kalendarzach zmienia się samo, Ty dostajesz powiadomienie.

Zabezpieczenia: dwie osoby nie zajmą tego samego terminu (sprawdzenie w Google tuż przed zapisem i blokada w bazie), jeden adres może mieć najwyżej dwie przyszłe rozmowy, formularz ma pułapkę na boty.

## Ustawienia

Wszystko w jednym pliku: `lib/booking/config.ts`.

| Ustawienie | Teraz |
|---|---|
| Długość rozmowy | 20 minut |
| Godziny | pon.–pt. 10:00–16:00 (jak dotąd na /kontakt) |
| Co ile terminy | co 30 minut |
| Zapas wokół innych spotkań | 10 minut |
| Najwcześniej | 12 godzin od teraz |
| Na ile do przodu | 28 dni |
| Najwięcej rozmów dziennie | 4 |
| Święta | polskie dni wolne liczone automatycznie, w tym Wigilia |
| Dodatkowe dni wolne | lista `blockedDates`, np. urlop |
| Przypomnienia | 24 godziny i 1 godzinę przed |

Urlop możesz też po prostu wpisać w Kalendarzu Google jako wydarzenie całodniowe ze statusem „Zajęty”, wtedy terminy znikną same.

## Pliki

- `app/umow/` strona rezerwacji, strona zarządzania rezerwacją, style
- `app/api/booking/` trasy API: terminy, rezerwacja, przełożenie i odwołanie, przypomnienia
- `lib/booking/` logika: Kalendarz Google, baza, maile, strefa czasowa i święta
- `docs/supabase_migration_bookings.sql` tabela `bookings` i harmonogram przypomnień
- `scripts/google-refresh-token.mjs` jednorazowe połączenie z Twoim Kalendarzem Google

## Konfiguracja, krok po kroku

### 1. Baza w Supabase

1. Supabase, SQL Editor: wklej całą zawartość `docs/supabase_migration_bookings.sql` i uruchom.
2. Sprawdź, że w Vercelu jest zmienna `SUPABASE_SERVICE_ROLE_KEY` (lokalnie jest w `.env.local`). Tabela jest dostępna tylko z serwera, przeglądarka nie widzi nic.

### 2. Google Cloud (konto stanislaw@drozniak.com)

Domena drozniak.com jest na Google Workspace, więc aplikacja może być wewnętrzna: bez weryfikacji Google i bez wygasania dostępu co 7 dni.

1. https://console.cloud.google.com: utwórz projekt, np. „Umawianie rozmów”.
2. APIs & Services, Library: włącz **Google Calendar API**.
3. OAuth consent screen: typ **Internal**, nazwa aplikacji, Twój e-mail.
4. Credentials, Create credentials, **OAuth client ID**, typ **Web application**. W „Authorized redirect URIs” dodaj:
   `http://localhost:53682/oauth2callback`
5. Skopiuj Client ID i Client secret.

### 3. Jednorazowe połączenie kalendarza

W terminalu, w katalogu projektu:

```bash
GOOGLE_CLIENT_ID=wklej GOOGLE_CLIENT_SECRET=wklej node scripts/google-refresh-token.mjs
```

Otworzy się przeglądarka, zalogujesz się na stanislaw@drozniak.com i zaakceptujesz dostęp do kalendarza. W terminalu pojawi się `GOOGLE_REFRESH_TOKEN=...`.

### 4. Zmienne w Vercelu

Settings, Environment Variables (Production):

| Zmienna | Wartość |
|---|---|
| `GOOGLE_CLIENT_ID` | z kroku 2 |
| `GOOGLE_CLIENT_SECRET` | z kroku 2 |
| `GOOGLE_REFRESH_TOKEN` | z kroku 3 |
| `CRON_SECRET` | losowy ciąg, np. wynik `openssl rand -hex 32` |
| `SUPABASE_SERVICE_ROLE_KEY` | jeśli jeszcze go tam nie ma |
| `RESEND_API_KEY` | już jest |
| `GOOGLE_CALENDAR_ID` | opcjonalnie, gdy rozmowy mają trafiać do innego kalendarza niż główny |
| `GOOGLE_BUSY_CALENDAR_IDS` | opcjonalnie, dodatkowe kalendarze sprawdzane pod kątem zajętości, po przecinku (np. prywatny) |
| `NEXT_PUBLIC_SITE_URL` | opcjonalnie, domyślnie `https://drozniak.pl`, używane w linkach w mailach |
| `BOOKING_FROM_EMAIL` | opcjonalnie, domyślnie `Stanisław Drożniak <spotkania@drozniak.com>` |

Maile wychodzą przez Resend z domeny drozniak.com (już zweryfikowanej, bo formularz kontaktowy wysyła z `noreply@drozniak.com`). Odpowiedzi klientów trafiają na stanislaw@drozniak.com.

### 5. Przypomnienia co 15 minut

Vercel na darmowym planie uruchamia zadania tylko raz dziennie, a przypomnienie godzinę przed rozmową wymaga sprawdzania co kilkanaście minut. Robi to Supabase:

1. Supabase, Database, Extensions: włącz `pg_cron` i `pg_net`.
2. W `docs/supabase_migration_bookings.sql` na dole jest gotowy blok `cron.schedule`. Podmień `TWOJ_CRON_SECRET` na wartość `CRON_SECRET` z Vercela i uruchom go w SQL Editor.

### 6. Test na produkcji

1. Po wdrożeniu wejdź na `/umow`, umów rozmowę na swój drugi adres e-mail.
2. Sprawdź: wydarzenie z Meet w Twoim kalendarzu, zaproszenie i potwierdzenie na drugim adresie, mail z danymi u Ciebie.
3. Z linku w potwierdzeniu przełóż rozmowę, potem ją odwołaj. Wydarzenie powinno się przesunąć, a potem zniknąć.
4. Jeśli coś nie działa, szczegóły są w logach Vercela (Functions) pod `[booking]`.

## Co jeszcze trzeba podpiąć na stronie

Tego nie zmieniałem, bo w tych plikach pracowały równolegle inne sesje. Do zrobienia po wdrożeniu `/umow`:

- przyciski „Umów rozmowę” w `app/components/Header.tsx`, `app/components/Footer.tsx` i `app/page.tsx` przestawić z `/kontakt` na `/umow`,
- linki do Calendly zamienić na `/umow`: `app/components/FinalCTA.tsx`, `app/components/TargetAudience.tsx`, `app/system/page.tsx`, `app/system-sprzedazowy/page.tsx` (stała `CALENDLY`), `app/strony-www/page.tsx`, `app/api/strony-www/route.ts`,
- na `/kontakt` dodać wyraźny link „Wolisz od razu wybrać termin? Umów rozmowę”,
- polityka prywatności (`app/polityka-prywatnosci/page.tsx`): zamiast Calendly LLC wpisać, że dane z rezerwacji przetwarzają Google (kalendarz i Meet), Supabase (baza) i Resend (maile),
- baner cookies (`app/components/CookieConsent.tsx`) i `LayoutClient.tsx`: usunąć wzmianki o Calendly, `/umow` nie używa ciasteczek zewnętrznych,
- `app/sitemap.ts`: dodać `/umow`.

## Podgląd lokalny

Bez zmiennych `GOOGLE_*` w `.env.local` strona `/umow` działa w trybie podglądu: przykładowe terminy, rezerwacja kończy się potwierdzeniem, ale nic nie trafia do kalendarza, bazy ani na skrzynki. Strona zarządzania w podglądzie: `/umow/rezerwacja/demo`. Na produkcji bez kluczy strona pokazuje komunikat i odsyła do formularza kontaktowego.
