# Instrukcje wdrożenia panelu klienta na subdomenie

## Konfiguracja subdomeny panel.drozniak.pl na Vercel

Panel klienta został zaprojektowany jako osobna aplikacja, która powinna działać na subdomenie `panel.drozniak.pl`.

### Krok 1: Dodaj domenę w Vercel (NAJPIERW TO!)

1. Zaloguj się do [Vercel Dashboard](https://vercel.com/dashboard)
2. Wybierz swój projekt (ten, który ma już `drozniak.pl`)
3. Przejdź do **Settings** → **Domains**
4. Kliknij **Add Domain**
5. Wpisz: `panel.drozniak.pl`
6. Kliknij **Add**

### Krok 2: Skonfiguruj DNS (PO DODANIU W VERCEL)

Vercel pokaże Ci instrukcje DNS. Zazwyczaj będzie to:

**Rekord CNAME:**
```
Type: CNAME
Name: panel
Value: cname.vercel-dns.com (lub podobny adres pokazany przez Vercel)
TTL: Auto (lub 3600)
```

**Gdzie to zrobić:**
- Jeśli używasz **Cloudflare**: DNS → Records → Add record
- Jeśli używasz **Namecheap**: Advanced DNS → Add New Record
- Jeśli używasz innego dostawcy: znajdź sekcję DNS Records

**WAŻNE:**
- Nie dodawaj `panel.drozniak.pl` w Name - tylko `panel`
- Value to adres pokazany przez Vercel (zwykle `cname.vercel-dns.com` lub podobny)

### Krok 3: Czekaj na propagację DNS

1. Po dodaniu rekordu DNS, wróć do Vercel
2. W **Settings** → **Domains** zobaczysz status domeny
3. Poczekaj 5-60 minut na propagację DNS
4. Vercel automatycznie wystawi certyfikat SSL (HTTPS)

### Krok 4: Sprawdź czy działa

1. Po propagacji DNS, otwórz w przeglądarce: `https://panel.drozniak.pl`
2. Powinieneś zobaczyć stronę logowania
3. Jeśli widzisz błąd, sprawdź:
   - Czy DNS się rozpropagował (możesz sprawdzić na [whatsmydns.net](https://www.whatsmydns.net))
   - Czy w Vercel domena ma status "Valid"
   - Czy certyfikat SSL jest aktywny (powinien być automatycznie)

### Konfiguracja routingu (JUŻ ZAIMPLEMENTOWANE ✅)

Panel jest już skonfigurowany w kodzie! Routing automatycznie wykrywa subdomenę:

**Na `panel.drozniak.pl`:**
- `/` → pokazuje login (lub przekierowuje do `/panel` jeśli zalogowany)
- `/login` → strona logowania (bez headera i footera)
- `/panel` → panel szkolenia (bez headera i footera, wymaga logowania)

**Na `drozniak.pl`:**
- Wszystko działa normalnie z headerem i footerem
- `/login` i `/panel` również działają, ale bez headera/footera

**Nie musisz nic robić** - routing jest już skonfigurowany w `App.tsx` i automatycznie wykrywa subdomenę!

### Krok 5: Sprawdź zmienne środowiskowe

Upewnij się, że na produkcji masz skonfigurowane zmienne środowiskowe:

1. W Vercel: **Settings** → **Environment Variables**
2. Sprawdź czy masz:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Jeśli nie masz, dodaj je (te same wartości dla wszystkich środowisk: Production, Preview, Development)

### Bezpieczeństwo

Panel jest już skonfigurowany tak, że:
- ✅ Nie pokazuje headera i footera (użytkownik nie może przypadkowo wyjść)
- ✅ Wszystkie ścieżki panelu (`/login`, `/panel`) są wyłączone z głównego layoutu
- ✅ Panel wymaga autentykacji (ProtectedRoute)
- ✅ Brak linków do głównej strony w panelu

### Testowanie lokalne (opcjonalne)

Aby przetestować panel lokalnie:

1. Dodaj do pliku `/etc/hosts` (Mac/Linux) lub `C:\Windows\System32\drivers\etc\hosts` (Windows):
   ```
   127.0.0.1 panel.drozniak.pl
   ```

2. Uruchom serwer: `npm run dev`

3. Otwórz w przeglądarce: `http://panel.drozniak.pl:3000`

## Podsumowanie - szybki checklist

- [ ] Dodałem domenę `panel.drozniak.pl` w Vercel (Settings → Domains)
- [ ] Skonfigurowałem rekord CNAME w DNS (u dostawcy domeny)
- [ ] Poczekałem na propagację DNS (5-60 minut)
- [ ] Sprawdziłem, że domena działa: `https://panel.drozniak.pl`
- [ ] Sprawdziłem zmienne środowiskowe w Vercel
- [ ] Przetestowałem logowanie i panel

## Troubleshooting

### Domena nie działa / pokazuje błąd

1. **Sprawdź DNS**: Użyj [whatsmydns.net](https://www.whatsmydns.net) i sprawdź czy rekord CNAME się rozpropagował
2. **Sprawdź Vercel**: W Settings → Domains zobacz status domeny
3. **Poczekaj dłużej**: Propagacja DNS może trwać do 24h (zwykle 5-60 minut)
4. **Sprawdź certyfikat SSL**: Vercel powinien automatycznie wystawić certyfikat

### Panel pokazuje główną stronę zamiast logowania

- Sprawdź czy routing w `App.tsx` jest poprawny (powinien być już skonfigurowany)
- Sprawdź w konsoli przeglądarki czy hostname jest poprawnie wykrywany
- Upewnij się, że używasz `https://panel.drozniak.pl` (nie `drozniak.pl/panel`)

## Ważne uwagi

1. **Separacja**: Panel działa jako osobna aplikacja - nie ma headera, footera, ani innych elementów głównej strony
2. **Bezpieczeństwo**: Użytkownik nie może przypadkowo wyjść z panelu (brak linków nawigacyjnych)
3. **Autentykacja**: Wszystkie ścieżki panelu wymagają logowania (oprócz `/login`)
4. **Subdomena**: Panel powinien działać na `panel.drozniak.pl` dla lepszej separacji i bezpieczeństwa

