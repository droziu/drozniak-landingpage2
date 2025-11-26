# Instrukcje migracji FIX - Naprawa zapisywania odpowiedzi

## Problem
Dane nie zapisują się poprawnie w bazie danych. Migracja FIX rozwiązuje to poprzez:
1. **Unikalne identyfikatory** - każda odpowiedź ma unikalny kod (`module_code`, `step_code`, `question_code`)
2. **Poprawne indeksy** - dla lepszej wydajności zapytań
3. **Automatyczne triggery** - do aktualizowania postępu i odblokowywania modułów
4. **RLS policies** - poprawne uprawnienia dla użytkowników i admina

## Struktura danych

### Format kodów:
- **module_code**: `modul_1`, `modul_2`, `modul_3`, itd.
- **step_code**: `1.1`, `1.2`, `2.1`, itd. (ID lekcji)
- **question_code**: `q1`, `q2`, itd. (ID pytania w quizie)

### Przykład:
```sql
-- Odpowiedź użytkownika na pytanie q1 w lekcji 1.1 modułu 1
{
  user_id: "uuid-użytkownika",
  module_code: "modul_1",
  step_code: "1.1",
  question_code: "q1",
  answer_text: "1",  -- lub tekst dla pytań otwartych
  status: "approved" -- lub "pending", "rejected"
}
```

## Jak uruchomić migrację

1. **Otwórz Supabase Dashboard**
   - Przejdź do: https://supabase.com/dashboard
   - Wybierz swój projekt

2. **Otwórz SQL Editor**
   - W menu po lewej stronie kliknij "SQL Editor"
   - Kliknij "New query"

3. **Wklej zawartość pliku `supabase_migration_fix.sql`**
   - Skopiuj całą zawartość pliku
   - Wklej do edytora SQL
   - Kliknij "Run" (lub Ctrl+Enter)

4. **Sprawdź wyniki**
   - Powinieneś zobaczyć komunikat o sukcesie
   - Jeśli są błędy, sprawdź czy wszystkie poprzednie migracje zostały uruchomione

## Co robi migracja

### 1. Tworzy/aktualizuje tabelę `training_responses`
- Unikalny constraint na `(user_id, module_code, step_code, question_code)`
- Kolumny: `status`, `admin_feedback`, `reviewed_by`, `reviewed_at`
- Automatyczne aktualizowanie `updated_at`

### 2. Tworzy/aktualizuje tabelę `training_progress`
- Unikalny constraint na `(user_id, module_code)`
- Kolumny: `module_completed`, `percentage`, `last_step_code`
- Automatyczne aktualizowanie `updated_at`

### 3. Tworzy indeksy
- Dla szybszych zapytań po `user_id`, `module_code`, `step_code`
- Dla filtrowania po `status = 'pending'`

### 4. Tworzy funkcje pomocnicze
- `check_lesson_completed()` - sprawdza czy lekcja jest ukończona
- `update_progress_on_response()` - automatycznie aktualizuje postęp
- `check_and_unlock_next_module()` - odblokowuje następny moduł

### 5. Tworzy triggery
- Automatyczne aktualizowanie `updated_at` przy zmianach
- Automatyczne odblokowywanie modułów po zatwierdzeniu odpowiedzi
- Automatyczne odblokowanie modułu 1 dla nowych użytkowników

### 6. Konfiguruje RLS (Row Level Security)
- Użytkownicy widzą tylko swoje odpowiedzi i postęp
- Admin (`stanislaw@drozniak.com`) widzi wszystko

## Weryfikacja

Po uruchomieniu migracji sprawdź:

1. **Czy tabele istnieją:**
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('training_responses', 'training_progress', 'module_unlocks');
```

2. **Czy indeksy istnieją:**
```sql
SELECT indexname 
FROM pg_indexes 
WHERE schemaname = 'public' 
AND tablename IN ('training_responses', 'training_progress');
```

3. **Czy RLS jest włączone:**
```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('training_responses', 'training_progress');
```

4. **Czy funkcje istnieją:**
```sql
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name LIKE '%training%' OR routine_name LIKE '%module%';
```

## Rozwiązywanie problemów

### Błąd: "relation already exists"
- To oznacza, że tabela już istnieje - migracja powinna to obsłużyć automatycznie
- Jeśli nadal jest błąd, sprawdź czy nie ma konfliktów w nazwach

### Błąd: "policy already exists"
- Migracja usuwa stare policies przed utworzeniem nowych
- Jeśli nadal jest błąd, uruchom migrację ponownie

### Błąd: "constraint already exists"
- Migracja sprawdza czy constraint istnieje przed utworzeniem
- Jeśli nadal jest błąd, sprawdź czy nie ma duplikatów w danych

## Następne kroki

Po uruchomieniu migracji:
1. Przetestuj zapisywanie odpowiedzi w aplikacji
2. Sprawdź czy postęp się aktualizuje
3. Sprawdź czy moduły się odblokowują po zatwierdzeniu odpowiedzi
4. Sprawdź czy admin widzi wszystkie odpowiedzi

## Uwagi

- Migracja jest **idempotentna** - można ją uruchomić wielokrotnie bez problemów
- Wszystkie zmiany są **backward compatible** - nie powinny zepsuć istniejących danych
- Jeśli masz problemy, sprawdź logi w Supabase Dashboard → Logs → Postgres Logs

