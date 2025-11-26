# Instrukcje migracji V2 - Panel szkolenia z weryfikacją odpowiedzi

## Co zostało dodane:

1. **Status weryfikacji odpowiedzi** - pytania otwarte mogą mieć status: `pending`, `approved`, `rejected`
2. **Panel administratora** - dostęp pod `/admin` dla użytkownika `admin@drozniak.pl`
3. **Automatyczne odblokowywanie modułów** - po zatwierdzeniu wszystkich odpowiedzi otwartych w module, następny moduł jest automatycznie odblokowywany
4. **Lepsze zarządzanie postępem** - poprawione zapisywanie i ładowanie postępu

## Krok 1: Uruchom migrację SQL

1. Otwórz Supabase Dashboard
2. Przejdź do **SQL Editor**
3. Skopiuj zawartość pliku `supabase_migration_v2.sql`
4. Wklej do edytora SQL
5. Kliknij **Run**

## Krok 2: Utwórz użytkownika admina

1. W Supabase Dashboard przejdź do **Authentication** > **Users**
2. Kliknij **Add user** > **Create new user**
3. Email: `stanislaw@drozniak.com`
4. Hasło: ustaw silne hasło
5. Kliknij **Create user**

## Krok 3: Sprawdź RLS (Row Level Security)

Migracja automatycznie konfiguruje RLS, ale możesz sprawdzić:

1. Przejdź do **Table Editor**
2. Sprawdź tabele:
   - `training_responses` - powinna mieć policy dla użytkowników i admina
   - `module_unlocks` - powinna mieć policy dla użytkowników i admina

## Krok 4: Testowanie

### Test panelu użytkownika:
1. Zaloguj się jako zwykły użytkownik
2. Przejdź do lekcji z pytaniem otwartym
3. Wpisz odpowiedź i kliknij **Prześlij odpowiedź**
4. Powinieneś zobaczyć status "Oczekiwanie na sprawdzenie"

### Test panelu admina:
1. Zaloguj się jako `stanislaw@drozniak.com`
2. Przejdź do `/admin` (lub `panel.drozniak.pl/admin`)
3. Powinieneś zobaczyć listę odpowiedzi oczekujących na weryfikację
4. Kliknij na odpowiedź, dodaj feedback (opcjonalnie)
5. Kliknij **Zatwierdź** lub **Odrzuć**

### Test odblokowywania modułów:
1. Jako admin, zatwierdź wszystkie odpowiedzi otwarte w module 1
2. Jako użytkownik, odśwież stronę
3. Moduł 2 powinien być odblokowany

## Ważne uwagi:

- **Moduł 1 jest zawsze odblokowany** dla wszystkich użytkowników
- **Kolejne moduły** są odblokowywane automatycznie po zatwierdzeniu wszystkich odpowiedzi otwartych w poprzednim module
- **Pytania zamknięte** są sprawdzane automatycznie (od razu po kliknięciu "Sprawdź odpowiedź")
- **Pytania otwarte** wymagają weryfikacji przez admina

## Rozwiązywanie problemów:

### Problem: Moduły się nie odblokowują
- Sprawdź czy wszystkie odpowiedzi otwarte w module mają status `approved`
- Sprawdź logi w Supabase Dashboard > Logs
- Sprawdź czy trigger `trigger_unlock_next_module` jest aktywny

### Problem: Admin nie widzi odpowiedzi
- Sprawdź czy email użytkownika to dokładnie `stanislaw@drozniak.com`
- Sprawdź RLS policies dla tabeli `training_responses`

### Problem: Postęp się nie zapisuje
- Sprawdź czy zmienne środowiskowe Supabase są ustawione
- Sprawdź konsolę przeglądarki pod kątem błędów
- Sprawdź logi w Supabase Dashboard

