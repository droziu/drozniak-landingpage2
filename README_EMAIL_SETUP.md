# Konfiguracja wysyłania emaili z formularza kontaktowego

## Krok 1: Utwórz konto w Resend

1. Przejdź na https://resend.com
2. Zarejestruj się (darmowy plan: 3000 emaili/miesiąc)
3. Zweryfikuj swoją domenę lub użyj domeny Resend (np. `onboarding@resend.dev`)

## Krok 2: Pobierz API Key

1. W dashboardzie Resend przejdź do "API Keys"
2. Utwórz nowy klucz API
3. Skopiuj klucz (zaczyna się od `re_...`)

## Krok 3: Dodaj zmienną środowiskową w Vercel

1. Przejdź do swojego projektu w Vercel
2. Otwórz Settings → Environment Variables
3. Dodaj nową zmienną:
   - **Name**: `RESEND_API_KEY`
   - **Value**: Twój klucz API z Resend
   - **Environment**: Production, Preview, Development (zaznacz wszystkie)

## Krok 4: Zaktualizuj adres email w API

W pliku `api/contact.ts` zmień:

```typescript
from: 'Kontakt <noreply@drozniak.com>', // Użyj zweryfikowanej domeny
to: ['stanislaw@drozniak.com'], // Twój email
```

Jeśli używasz domeny Resend do testów:
```typescript
from: 'Kontakt <onboarding@resend.dev>',
to: ['stanislaw@drozniak.com'],
```

## Krok 5: Wdróż na Vercel

Po dodaniu zmiennej środowiskowej:
1. Zrób commit zmian
2. Push do repozytorium
3. Vercel automatycznie wdroży nową wersję

## Testowanie

Po wdrożeniu przetestuj formularz kontaktowy - powinieneś otrzymać email z wiadomością.

## Alternatywne rozwiązania

Jeśli nie chcesz używać Resend, możesz użyć:
- **SendGrid** - podobne API, darmowy plan
- **Mailgun** - darmowy plan
- **Nodemailer** - wymaga własnego SMTP (np. Gmail, Outlook)

