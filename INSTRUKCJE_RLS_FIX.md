# Instrukcje naprawy RLS policies

## Problem
Błąd "permission denied for table users" występuje, ponieważ RLS policies próbują odczytać bezpośrednio z tabeli `auth.users`, co nie jest dozwolone w Supabase.

## Rozwiązanie
Stworzyłem nową migrację `supabase_migration_rls_fix.sql`, która:
1. Tworzy funkcję pomocniczą `is_admin()` używającą `auth.jwt()` (bezpieczniejsza metoda)
2. Naprawia wszystkie RLS policies dla wszystkich tabel
3. Używa funkcji `is_admin()` zamiast bezpośredniego odczytu z `auth.users`

## Jak uruchomić naprawę

### Krok 1: Uruchom migrację RLS FIX

1. Otwórz Supabase Dashboard → SQL Editor
2. Wklej zawartość pliku `supabase_migration_rls_fix.sql`
3. Kliknij "Run"

### Krok 2: Sprawdź czy funkcja is_admin() została utworzona

```sql
-- Sprawdź czy funkcja istnieje
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name = 'is_admin';
```

Powinno zwrócić `is_admin`

### Krok 3: Sprawdź czy wszystkie policies zostały zaktualizowane

```sql
-- Sprawdź policies dla wszystkich tabel
SELECT tablename, policyname, cmd
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('profiles', 'training_progress', 'training_responses', 'module_unlocks')
ORDER BY tablename, policyname;
```

Powinny być widoczne:
- **profiles**: `profiles_user_select`, `profiles_user_update`, `profiles_user_insert`, `profiles_admin_all`
- **training_progress**: `training_progress_user`, `training_progress_admin`
- **training_responses**: `training_responses_user`, `training_responses_admin`
- **module_unlocks**: `module_unlocks_user`, `module_unlocks_insert`, `module_unlocks_admin`

## Co zostało naprawione

### 1. Funkcja is_admin()
- Używa `auth.jwt()` zamiast bezpośredniego odczytu z `auth.users`
- Bezpieczniejsza metoda, która nie wymaga uprawnień do tabeli `auth.users`
- Sprawdza czy email użytkownika to `stanislaw@drozniak.com`

### 2. RLS policies dla profiles
- Użytkownicy mogą czytać/edytować tylko swój profil
- Admin może czytać/edytować wszystkie profile

### 3. RLS policies dla training_progress
- Użytkownicy mogą czytać/edytować tylko swój postęp
- Admin może czytać/edytować wszystkie postępy

### 4. RLS policies dla training_responses
- Użytkownicy mogą czytać/edytować tylko swoje odpowiedzi
- Admin może czytać/edytować wszystkie odpowiedzi

### 5. RLS policies dla module_unlocks
- Użytkownicy mogą czytać tylko swoje odblokowania
- Użytkownicy i admin mogą tworzyć odblokowania
- Admin może czytać/edytować wszystkie odblokowania

## Testowanie

Po uruchomieniu migracji:

1. **Zaloguj się jako zwykły użytkownik**
2. **Przejdź do `/profile`** - powinno działać bez błędów
3. **Wypełnij formularz i zapisz** - powinno zapisać się poprawnie
4. **Przejdź do `/panel`** - powinno działać bez błędów
5. **Zaznacz odpowiedź w quizie** - powinno zapisać się poprawnie
6. **Zaloguj się jako admin** (`stanislaw@drozniak.com`)
7. **Przejdź do `/admin`** - powinno działać bez błędów
8. **Sprawdź czy widzisz wszystkich użytkowników** - powinno działać

## Rozwiązywanie problemów

### Problem: "function is_admin() does not exist"
**Rozwiązanie:** Uruchom migrację `supabase_migration_rls_fix.sql` ponownie

### Problem: "permission denied" nadal występuje
**Rozwiązanie:**
1. Sprawdź czy RLS jest włączone dla wszystkich tabel:
```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('profiles', 'training_progress', 'training_responses', 'module_unlocks');
```

2. Sprawdź czy wszystkie policies istnieją (patrz Krok 3 powyżej)

3. Sprawdź logi Supabase (Dashboard → Logs → Postgres Logs)

### Problem: Admin nie widzi danych innych użytkowników
**Rozwiązanie:**
1. Sprawdź czy email admina to dokładnie `stanislaw@drozniak.com`
2. Sprawdź czy funkcja `is_admin()` zwraca `true` dla admina:
```sql
SELECT public.is_admin();
```
(Powinno zwrócić `true` gdy jesteś zalogowany jako admin)

## Uwagi

- Funkcja `is_admin()` używa `auth.jwt()` - bezpieczniejsza metoda niż bezpośredni odczyt z `auth.users`
- Wszystkie policies są teraz spójne i używają tej samej metody sprawdzania admina
- Migracja jest idempotentna - można ją uruchomić wielokrotnie bez problemów

