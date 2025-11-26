# Instrukcje konfiguracji Supabase

## 1. Tworzenie użytkowników w Supabase

Ponieważ rejestracja została wyłączona, użytkowników musisz tworzyć ręcznie w panelu Supabase.

### Metoda 1: Przez panel administracyjny Supabase

1. Zaloguj się do [Supabase Dashboard](https://app.supabase.com)
2. Wybierz swój projekt
3. Przejdź do **Authentication** → **Users**
4. Kliknij **Add user** → **Create new user**
5. Wypełnij formularz:
   - **Email**: adres email użytkownika
   - **Password**: hasło (min. 6 znaków)
   - **Auto Confirm User**: zaznacz, aby użytkownik mógł się od razu zalogować
6. Kliknij **Create user**

### Metoda 2: Przez SQL Editor (masowe tworzenie)

1. W Supabase Dashboard przejdź do **SQL Editor**
2. Uruchom następujący kod SQL:

```sql
-- Utwórz użytkownika
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  confirmation_token,
  recovery_token
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'uzytkownik@example.com',  -- ZMIEŃ NA EMAIL UŻYTKOWNIKA
  crypt('haslo123', gen_salt('bf')),  -- ZMIEŃ NA HASŁO (min. 6 znaków)
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  false,
  '',
  ''
);

-- Utwórz profil użytkownika
INSERT INTO public.profiles (
  id,
  full_name,
  created_at,
  updated_at
)
SELECT 
  id,
  'Imię Nazwisko',  -- ZMIEŃ NA IMIĘ I NAZWISKO
  now(),
  now()
FROM auth.users
WHERE email = 'uzytkownik@example.com';  -- ZMIEŃ NA EMAIL UŻYTKOWNIKA
```

**UWAGA**: Ta metoda wymaga dodatkowej konfiguracji. Zalecana jest **Metoda 1**.

### Metoda 3: Przez API (programowo)

Możesz użyć Supabase Management API do tworzenia użytkowników programowo. Wymaga to API key z Supabase Dashboard.

## 2. Konfiguracja autentykacji w Supabase

### Wyłączenie rejestracji publicznej

1. W Supabase Dashboard przejdź do **Authentication** → **Settings**
2. W sekcji **Auth Providers** → **Email**:
   - **Enable Email Signup**: możesz pozostawić włączone (nie będzie używane w aplikacji)
   - **Confirm email**: możesz wyłączyć, jeśli chcesz, aby użytkownicy mogli się logować od razu
3. Zapisz zmiany

### Konfiguracja email

1. W **Authentication** → **Settings** → **SMTP Settings**
2. Skonfiguruj SMTP (opcjonalne, jeśli chcesz wysyłać emaile):
   - **Enable Custom SMTP**: włącz
   - Wypełnij dane swojego serwera SMTP
   - Zapisz

## 3. Konfiguracja RLS (Row Level Security)

RLS jest już skonfigurowane w migracji, ale upewnij się, że:

1. W **Authentication** → **Policies** sprawdź, czy:
   - Tabela `profiles` ma policy `profiles_all`
   - Tabela `training_progress` ma policy `training_progress_all`
   - Tabela `training_responses` ma policy `training_responses_all`
   - Tabela `advisory_responses` ma policy `advisory_responses_all`
   - Tabela `advisory_notes` ma policy `advisory_notes_all`

2. Wszystkie policy powinny używać `auth.uid() = user_id` (lub `auth.uid() = id` dla profiles)

## 4. Zmienne środowiskowe

### Krok 1: Utwórz plik .env.local

W głównym katalogu projektu utwórz plik `.env.local`:

```bash
# W terminalu, w katalogu projektu:
cp .env.local.example .env.local
```

Lub utwórz plik ręcznie o nazwie `.env.local` w głównym katalogu projektu.

### Krok 2: Znajdź wartości w Supabase

1. Zaloguj się do [Supabase Dashboard](https://app.supabase.com)
2. Wybierz swój projekt
3. Przejdź do **Settings** → **API**
4. Skopiuj następujące wartości:
   - **Project URL** (np. `https://abcdefgh.supabase.co`)
   - **anon public** key (długi ciąg znaków)

### Krok 3: Wypełnij plik .env.local

Otwórz plik `.env.local` i wypełnij go:

```env
VITE_SUPABASE_URL=https://twoj-projekt.supabase.co
VITE_SUPABASE_ANON_KEY=twoj-anon-key-tutaj
```

**WAŻNE**: 
- Zastąp `https://twoj-projekt.supabase.co` prawdziwym URL z Supabase
- Zastąp `twoj-anon-key-tutaj` prawdziwym kluczem anon z Supabase
- **NIE** dodawaj cudzysłowów wokół wartości
- **NIE** commituj pliku `.env.local` do git (jest w .gitignore)

### Krok 4: Zrestartuj serwer deweloperski

**BARDZO WAŻNE**: Po utworzeniu lub zmianie pliku `.env.local` musisz zrestartować serwer:

1. Zatrzymaj serwer (Ctrl+C w terminalu)
2. Uruchom ponownie: `npm run dev`

Bez restartu serwera zmienne środowiskowe nie będą załadowane!

## 5. Testowanie

1. Utwórz użytkownika przez panel Supabase (Metoda 1)
2. Uruchom aplikację: `npm run dev`
3. Przejdź do `/login`
4. Zaloguj się używając utworzonych danych
5. Sprawdź, czy możesz:
   - Zalogować się
   - Zmienić hasło (przycisk "Zmień hasło" w panelu)
   - Przechodzić przez szkolenie
   - Zobaczyć zapisany postęp

## 6. Zarządzanie użytkownikami

### Resetowanie hasła użytkownika

1. W **Authentication** → **Users**
2. Znajdź użytkownika
3. Kliknij **...** → **Reset password**
4. Użytkownik otrzyma email z linkiem do resetu (jeśli SMTP jest skonfigurowane)

### Usuwanie użytkownika

1. W **Authentication** → **Users**
2. Znajdź użytkownika
3. Kliknij **...** → **Delete user**
4. Potwierdź usunięcie

**UWAGA**: Usunięcie użytkownika spowoduje również usunięcie wszystkich jego danych z tabel (dzięki `on delete cascade` w migracji).

## 7. Bezpieczeństwo

- **Nigdy nie udostępniaj** `service_role` key w kodzie frontendowym
- Używaj tylko `anon` key w aplikacji
- RLS (Row Level Security) zapewnia, że użytkownicy widzą tylko swoje dane
- Wszystkie operacje są walidowane przez Supabase Auth

## 8. Troubleshooting

### Błąd "Missing Supabase environment variables"

**Objawy:**
- W konsoli przeglądarki widzisz: "Missing Supabase environment variables"
- Błąd "Failed to fetch" lub "ERR_NAME_NOT_RESOLVED"
- Aplikacja nie może połączyć się z Supabase

**Rozwiązanie:**
1. Sprawdź, czy plik `.env.local` istnieje w głównym katalogu projektu
2. Sprawdź, czy plik zawiera poprawne wartości:
   ```env
   VITE_SUPABASE_URL=https://twoj-projekt.supabase.co
   VITE_SUPABASE_ANON_KEY=twoj-anon-key
   ```
3. **Zrestartuj serwer dev** (Ctrl+C i `npm run dev` ponownie)
4. Sprawdź, czy wartości są poprawne (bez cudzysłowów, bez spacji na początku/końcu)
5. Sprawdź, czy nazwy zmiennych zaczynają się od `VITE_` (wymagane przez Vite)

### Użytkownik nie może się zalogować

1. Sprawdź, czy użytkownik istnieje w **Authentication** → **Users**
2. Sprawdź, czy email jest potwierdzony (kolumna **Confirmed**)
3. Jeśli nie, kliknij **...** → **Send confirmation email** lub **Confirm user**

### Błąd "User not found"

- Upewnij się, że użytkownik został utworzony w Supabase
- Sprawdź, czy email jest poprawny

### Błąd "Invalid login credentials"

- Sprawdź, czy hasło jest poprawne
- Możesz zresetować hasło przez panel Supabase

### Postęp nie jest zapisywany

1. Sprawdź, czy RLS jest włączone dla tabel
2. Sprawdź, czy policy są poprawne
3. Sprawdź konsolę przeglądarki pod kątem błędów
4. Sprawdź logi w Supabase Dashboard → **Logs**

## 9. Dodatkowe funkcje

### Wysyłanie emaili powitalnych

Możesz skonfigurować email templates w **Authentication** → **Email Templates**:
- **Confirm signup**: email potwierdzający rejestrację
- **Reset password**: email do resetu hasła
- **Magic Link**: email z linkiem do logowania

### Integracja z innymi providerami

W **Authentication** → **Providers** możesz włączyć:
- Google
- GitHub
- Facebook
- itp.

**UWAGA**: Obecna aplikacja używa tylko Email/Password authentication.

