# drozniak.pl

Strona Stanisława Drożniaka (marketing i pozyskiwanie klientów dla firm) oraz panel klienta i admina.
Next.js (App Router) na Vercelu, Supabase (baza, logowanie, pliki), Resend (maile).

## Uruchomienie

```bash
npm install
npm run dev
```

Zmienne środowiskowe są w `.env.local` (poza repozytorium), na produkcji w ustawieniach projektu w Vercelu.

## Gdzie co jest

- `app/` strony publiczne, panel (`/panel`), admin (`/admin`), oferty (`/o`, `/p`), API (`app/api`)
- `app/umow/`, `lib/booking/` umawianie rozmów, opis i konfiguracja w `docs/UMAWIANIE_SPOTKAN.md`
- `components/` komponenty panelu i admina
- `config/` treść szkoleń w panelu
- `docs/` dokumentacja i notatki z redesignu
- `scripts/` skrypty jednorazowe

Push robi właściciel ręcznie, każdy push buduje produkcję na Vercelu.
