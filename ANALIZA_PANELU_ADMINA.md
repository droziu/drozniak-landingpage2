# Analiza Panelu Administratora - Wymagania i Struktura

## Cel Panelu Admina
Panel administratora służy do zarządzania kursantami, weryfikacji ich odpowiedzi i monitorowania postępu w szkoleniu.

## Funkcjonalności Wymagane

### 1. **Lista Kursantów (Lewy Panel)**
- **Wyświetlane dane:**
  - Imię i nazwisko (lub email jeśli brak)
  - Email
  - Nazwa firmy (jeśli podana)
  - Telefon (jeśli podany)
  - Postęp ogólny (% ukończenia)
  - Liczba ukończonych lekcji / całkowita liczba lekcji
  - Postęp w każdym module (%)
  - Liczba odpowiedzi oczekujących na weryfikację
  - Ostatnia aktywność

- **Funkcje:**
  - Kliknięcie na kursanta → pokazuje szczegóły po prawej
  - Wyróżnienie aktywnego kursanta (zaznaczenie)
  - Sortowanie (opcjonalnie): alfabetycznie, według postępu, według ostatniej aktywności

### 2. **Szczegóły Kursanta (Prawy Panel - Górna Część)**
- **Dane kontaktowe:**
  - Imię i nazwisko
  - Email
  - Nazwa firmy
  - Telefon
  - Notatki/Cele biznesowe

- **Statystyki postępu:**
  - Ukończone lekcje: X/Y
  - Postęp ogólny: X%
  - Postęp w każdym module: X%
  - Status każdego modułu (ukończony/nieukończony)

### 3. **Lista Odpowiedzi (Prawy Panel - Dolna Część)**
- **Wyświetlane dane dla każdej odpowiedzi:**
  - Moduł i lekcja (np. "Moduł 1 • 1.1")
  - Status (Oczekuje/Zatwierdzona/Odrzucona)
  - Pytanie
  - Odpowiedź kursanta (skrócona, z możliwością rozwinięcia)
  - Feedback admina (jeśli istnieje)
  - Data utworzenia

- **Funkcje:**
  - Kliknięcie na odpowiedź → otwiera modal weryfikacji
  - Filtrowanie: wszystkie/oczekujące/zatwierdzone/odrzucone
  - Sortowanie: według daty, modułu, statusu

### 4. **Modal Weryfikacji Odpowiedzi**
- **Wyświetlane dane:**
  - Pełne pytanie
  - Pełna odpowiedź kursanta
  - Kontekst lekcji (która lekcja, który moduł)
  - Poprzedni feedback (jeśli istnieje)

- **Funkcje:**
  - Pole tekstowe na feedback dla kursanta
  - Przycisk "Zatwierdź" → zmienia status na 'approved', zapisuje feedback
  - Przycisk "Odrzuć" → zmienia status na 'rejected', zapisuje feedback
  - Przycisk "Zamknij" → zamyka modal bez zmian
  - Po zatwierdzeniu/odrzuceniu → automatyczne odświeżenie listy

### 5. **Automatyczne Odblokowywanie Modułów**
- Po zatwierdzeniu wszystkich odpowiedzi otwartych w module → automatyczne odblokowanie następnego modułu
- Implementowane w Supabase przez trigger/funkcję

## Struktura Danych

### Tabela `profiles`
- `id` (uuid, PK)
- `full_name` (text)
- `company_name` (text)
- `first_name` (text)
- `last_name` (text)
- `phone` (text)
- `notes` (text)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)
- **BRAK `email`** - email jest w `auth.users`

### Tabela `training_progress`
- `id` (uuid, PK)
- `user_id` (uuid, FK → auth.users)
- `module_code` (text, np. "modul_1")
- `status` (text: 'in_progress' | 'completed')
- `last_step_code` (text, np. "1.1")
- `percentage` (integer, 0-100)
- `module_completed` (boolean)
- `completed_at` (timestamptz)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

### Tabela `training_responses`
- `id` (uuid, PK)
- `user_id` (uuid, FK → auth.users)
- `module_code` (text)
- `step_code` (text, np. "1.1")
- `question_code` (text, np. "q1")
- `answer_text` (text)
- `status` (text: 'pending' | 'approved' | 'rejected')
- `admin_feedback` (text)
- `reviewed_by` (uuid, FK → auth.users)
- `reviewed_at` (timestamptz)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

### Tabela `module_unlocks`
- `id` (uuid, PK)
- `user_id` (uuid, FK → profiles)
- `module_id` (text, np. "1", "2")
- `unlocked_at` (timestamptz)
- `unlocked_by` (text, np. "system", "admin")

## Rozwiązanie Problemu z Email

### Problem
Tabela `profiles` nie ma kolumny `email` - email jest w `auth.users`, które nie jest bezpośrednio dostępne przez Supabase Client API z powodu RLS.

### Rozwiązanie
1. **Funkcja SQL `get_user_email(user_id)`** - zwraca email z `auth.users` (security definer)
2. **View `user_profiles_with_email`** - łączy `profiles` z `auth.users` (może nie działać z RLS)
3. **Fallback w kodzie** - jeśli view nie działa, użyj funkcji RPC dla każdego użytkownika

## Przepływ Pracy Admina

1. **Logowanie** → przekierowanie do `/admin`
2. **Widok główny:**
   - Lewy panel: lista wszystkich kursantów
   - Prawy panel: "Wybierz kursanta, aby zobaczyć szczegóły"
3. **Kliknięcie na kursanta:**
   - Prawy panel pokazuje:
     - Szczegóły kursanta (góra)
     - Lista wszystkich odpowiedzi (dół)
4. **Kliknięcie na odpowiedź:**
   - Otwiera modal weryfikacji
   - Admin może:
     - Przeczytać odpowiedź
     - Dodać feedback
     - Zatwierdzić lub odrzucić
5. **Po zatwierdzeniu:**
   - Status zmienia się na 'approved'
   - Feedback jest zapisywany
   - Lista się odświeża
   - Jeśli wszystkie odpowiedzi w module są zatwierdzone → następny moduł się odblokowuje (automatycznie)

## UI/UX Wymagania

- **Kolorystyka:**
  - Tło: `#101820` (ciemny)
  - Akcenty: gradient `#fee715` → `#00C9A7`
  - Tekst: biały/szary
  - Statusy:
    - Oczekuje: żółty (`yellow-400`)
    - Zatwierdzona: zielony (`green-400`)
    - Odrzucona: czerwony (`red-400`)

- **Layout:**
  - 3-kolumnowy na desktop (lista kursantów | szczegóły | opcjonalnie)
  - 2-kolumnowy na tablet (lista | szczegóły)
  - 1-kolumnowy na mobile (stack)

- **Interakcje:**
  - Hover effects na klikalnych elementach
  - Loading states podczas ładowania danych
  - Success/error messages po akcjach
  - Smooth transitions

## Błędy do Naprawienia

1. ✅ **Błąd: "column profiles.email does not exist"**
   - Naprawione: usunięto `email` z select, używamy funkcji RPC lub view

2. ⚠️ **Brak kursantów w liście**
   - Może być spowodowane:
     - Brakiem danych w `profiles`
     - Problemem z RLS policies
     - Błędem w zapytaniu

3. ⚠️ **Email nie jest wyświetlany**
   - Naprawione: używamy funkcji RPC `get_user_email` lub view

## Następne Kroki

1. Uruchomić migrację `supabase_migration_admin_view.sql`
2. Przetestować pobieranie email przez funkcję RPC
3. Sprawdzić czy lista kursantów się wyświetla
4. Przetestować weryfikację odpowiedzi
5. Sprawdzić automatyczne odblokowywanie modułów

