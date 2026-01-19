# Instrukcja: Status lejków, uprawnienia i display_name

## 1. Zmiana statusu lejka (Szkic, Aktywny, Zarchiwizowany)

**Gdzie:** Panel Administratora → Marketing → Lista lejków

**Jak:**
1. Kliknij ikonę **ołówka (Edytuj)** na karcie lejka
2. W modalu edycji wybierz **Status** z listy:
   - **Szkic** - w trakcie pracy, nie widoczny dla klientów
   - **Aktywny** - gotowy, widoczny dla klientów z dostępem
   - **Zarchiwizowany** - nieaktywny, nie widoczny na liście

## 2. Uprawnienia do lejków (funnel_access)

**Poziomy dostępu:**
- **`view`** - tylko podgląd lejka
- **`comment`** - podgląd + dodawanie komentarzy
- **`edit`** - podgląd + komentarze + edycja lejka (zmiana nodów, edges)

**Obecnie uprawnienia są przypisywane przez:**
- Powiązanie lejka z klientem (`funnel_diagrams.client_id`) + powiązanie klienta panelu (`panel_clients.marketing_client_id`)
- Bezpośrednie przypisanie w tabeli `funnel_access` (many-to-many)

**UI do zarządzania uprawnieniami:**
- Obecnie przez Supabase Dashboard (SQL Editor) lub przyszły UI (do dodania)
- Tabela: `funnel_access`
- Kolumny: `funnel_id`, `client_id` (marketing_clients), `access_level` ('view', 'comment', 'edit')

## 3. Preferowane imię (display_name)

**Gdzie:** Panel Klienta → Dane

**Jak ustawić:**
1. Wejdź w **Panel Klienta** → **Dane**
2. Znajdź pole **"Preferowane imię"**
3. Wpisz preferowane imię (np. "Staszek" zamiast "Stanisław")
4. Kliknij **"Zapisz"**

**Jak działa:**
- `display_name` jest zapisywane w `panel_clients.display_name`
- W komentarzach używana jest funkcja `get_user_display_name(user_id)` która zwraca:
  1. `panel_clients.display_name` (jeśli ustawione)
  2. `panel_clients.name` (jeśli brak display_name)
  3. `profiles.first_name + last_name` (jeśli brak powyższych)
  4. `auth.users.email` (jako fallback)

## 4. Zapraszanie użytkowników przez magic link

**Obecnie:**
- Użytkownik musi istnieć w `auth.users` (można utworzyć w Supabase Dashboard)
- Następnie admin dodaje go w **Panel Administratora → Klienci panelu**
- Magic link można wysłać z Supabase Dashboard (Authentication → Users → Invite user)

**Proces:**
1. W Supabase Dashboard: **Authentication → Users → Add user** (lub **Invite user**)
2. Wpisz email użytkownika
3. System wyśle magic link do logowania
4. Użytkownik kliknie link, ustawi hasło i się zaloguje
5. Admin przypisuje mu widoki w **Panel Administratora → Klienci panelu**

## Migracje SQL

**Uruchom w Supabase SQL Editor:**

1. **`supabase_migration_funnel_permissions_and_display_name.sql`**
   - Rozszerza `funnel_access.access_level` o 'edit'
   - Dodaje `display_name` do `panel_clients`
   - Dodaje funkcję `get_user_display_name()`

**Migracja jest idempotentna** - bezpiecznie uruchamiać wielokrotnie.
