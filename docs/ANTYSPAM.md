# Ochrona formularza kontaktowego przed spamem

Stan na 8 listopada 2026. Kod: `lib/antispam.ts` (zasady), `app/api/contact/route.ts` (formularz), `app/kontakt/Turnstile.tsx` (widżet Cloudflare).

## Co działa od razu, bez konfiguracji

Każda wiadomość z `/kontakt` przechodzi przez te kontrole po kolei:

1. Pole-pułapka. Człowiek go nie widzi, bot je wypełnia. Bot dostaje odpowiedź „wysłano”, ale mail nie wychodzi.
2. Czas wypełnienia. Wysłanie szybciej niż 2,5 s po otwarciu strony traktujemy jak bota (cichy „sukces”, bez maila).
3. Limit: najwyżej 5 wiadomości z jednego adresu IP na 10 minut.
4. Cloudflare Turnstile, gdy są ustawione klucze (niżej).
5. Treść: limity długości pól, żadnych linków w imieniu, najwyżej 2 linki w wiadomości.
6. Adres e-mail: odrzucamy skrzynki jednorazowe (mailinator, yopmail i podobne) oraz domeny, które nie przyjmują poczty (sprawdzenie rekordów MX w DNS). Człowiek dostaje wtedy komunikat z prośbą o poprawkę.

Treść wiadomości jest zabezpieczona przed wstrzyknięciem HTML do maila.

Stary endpoint `/api/strony-www` zwraca 410, bo strona stron www została wyłączona i przez niego przychodził tylko spam.

## Do zrobienia: klucze Cloudflare Turnstile (około 5 minut)

Turnstile to darmowa weryfikacja, że formularz wysyła człowiek. Zwykle jest niewidoczna, a pole wyboru pokazuje się tylko przy wątpliwościach. Nie trzeba przenosić domeny do Cloudflare.

1. Załóż darmowe konto na dash.cloudflare.com (albo zaloguj się).
2. W menu: Turnstile, potem „Add widget”.
3. Nazwa: `drozniak.pl`. Domeny: `drozniak.pl` (i `drozniak.com`, jeśli strona działa też pod nią). Tryb: „Managed”.
4. Skopiuj „Site Key” i „Secret Key”.
5. W Vercelu: projekt, Settings, Environment Variables, dla Production i Preview dodaj:
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` = Site Key
   - `TURNSTILE_SECRET_KEY` = Secret Key
6. Zrób nowy deploy (zmienne `NEXT_PUBLIC_` wchodzą do kodu przy budowaniu).

Dopóki kluczy nie ma, na produkcji Turnstile jest pomijany, a pozostałe kontrole działają. Lokalnie używane są klucze testowe Cloudflare, które zawsze przechodzą.

Warto dopisać jedno zdanie do polityki prywatności: formularz korzysta z Cloudflare Turnstile w celu ochrony przed spamem.

## Jak sprawdzić lokalnie bez wysyłania maila

Nagłówek `x-dry-run: 1` (działa tylko w trybie deweloperskim) przepuszcza wiadomość przez wszystkie kontrole i zatrzymuje się przed wysłaniem maila:

```bash
curl -X POST http://localhost:3000/api/contact -H 'Content-Type: application/json' -H 'x-dry-run: 1' -d '{"name":"Anna","email":"anna@gmail.com","message":"Pytanie o ofertę.","elapsed":6000,"turnstileToken":"XXXX.DUMMY.TOKEN.XXXX"}'
```

## Inne formularze

- `/api/booking/book` (własne umawianie rozmów `/umow`) i `/api/doradztwo-email` (strony doradztwa dla ZEF i Hotelu Irys) nie korzystają jeszcze z tych kontroli. Mogą użyć `checkSubmission` z `lib/antispam.ts` tak samo jak formularz kontaktowy.
