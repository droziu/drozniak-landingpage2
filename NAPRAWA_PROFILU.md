# Naprawa profilu użytkownika - Instrukcje

## Problemy które zostały naprawione:

1. **Email nie był widoczny** - teraz jest wyświetlany jako biały tekst z lekką przezroczystością, ale nadal nieedytowalny
2. **Dane się nie zapisywały** - zmieniono `update` na `upsert`, żeby tworzyć profil jeśli nie istnieje
3. **Brak RLS policies** - dodano RLS policies do migracji profiles

## Co zostało zmienione:

### 1. Komponent UserProfile.tsx
- ✅ Email jest teraz bardziej widoczny (biały tekst z opacity 0.8)
- ✅ Używa `upsert` zamiast `update` - tworzy profil jeśli nie istnieje
- ✅ Email jest zawsze pobierany z `user.email` (auth.users), nie z tabeli profiles
- ✅ Lepsze obsługiwanie błędów przy ładowaniu profilu

### 2. Migracja supabase_migration_profiles.sql
- ✅ Dodano RLS policies dla użytkowników (mogą czytać/edytować tylko swój profil)
- ✅ Dodano RLS policy dla admina (może czytać/edytować wszystkie profile)

## Jak zastosować naprawy:

### Krok 1: Uruchom zaktualizowaną migrację profiles

1. Otwórz Supabase Dashboard → SQL Editor
2. Wklej zawartość pliku `supabase_migration_profiles.sql`
3. Kliknij "Run"

### Krok 2: Sprawdź czy RLS jest włączone

```sql
-- Sprawdź czy RLS jest włączone dla profiles
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'profiles';
```

Powinno zwrócić `rowsecurity = true`

### Krok 3: Sprawdź czy policies istnieją

```sql
-- Sprawdź policies dla profiles
SELECT policyname, cmd, qual, with_check
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename = 'profiles';
```

Powinny być widoczne:
- `profiles_user_select`
- `profiles_user_update`
- `profiles_user_insert`
- `profiles_admin_all`

## Testowanie:

1. **Zaloguj się jako użytkownik**
2. **Przejdź do `/profile`**
3. **Sprawdź czy email jest widoczny** (biały tekst, nieedytowalny)
4. **Wypełnij formularz** (nazwa firmy, imię, nazwisko, telefon, notatki)
5. **Kliknij "Zapisz zmiany"**
6. **Odśwież stronę** - dane powinny pozostać zapisane
7. **Wyloguj się i zaloguj ponownie** - dane powinny być nadal widoczne

## Rozwiązywanie problemów:

### Problem: "permission denied for table profiles"
**Rozwiązanie:** Uruchom migrację `supabase_migration_profiles.sql` - dodaje RLS policies

### Problem: Email nadal nie jest widoczny
**Rozwiązanie:** 
- Sprawdź czy `user.email` jest dostępne w `useAuth()`
- Sprawdź konsolę przeglądarki pod kątem błędów
- Upewnij się, że używasz najnowszej wersji `UserProfile.tsx`

### Problem: Dane się nie zapisują
**Rozwiązanie:**
- Sprawdź konsolę przeglądarki pod kątem błędów
- Sprawdź czy RLS policies są poprawnie skonfigurowane
- Sprawdź logi Supabase (Dashboard → Logs → Postgres Logs)

### Problem: "duplicate key value violates unique constraint"
**Rozwiązanie:** To oznacza, że próbujesz utworzyć profil który już istnieje. `upsert` powinien to obsłużyć automatycznie, ale jeśli problem występuje, sprawdź czy `id` w profiles odpowiada `id` w auth.users.

## Uwagi:

- Email jest zawsze pobierany z `auth.users`, nie z tabeli `profiles`
- Profil jest automatycznie tworzony przy pierwszym zapisie danych
- Admin (`stanislaw@drozniak.com`) może widzieć i edytować wszystkie profile
- Wszystkie zmiany są zapisywane w czasie rzeczywistym w Supabase

