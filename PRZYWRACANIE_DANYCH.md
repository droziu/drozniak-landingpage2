# Przywracanie utraconych danych

## Problem
Po wykonaniu migracji wszystkie postępy użytkowników zniknęły z panelu admina.

## Najprawdopodobniejsza przyczyna
**Dane prawdopodobnie NIE zostały usunięte** - są tylko niewidoczne przez problemy z RLS (Row Level Security) policies.

## Rozwiązanie krok po kroku

### Krok 1: Sprawdź czy dane istnieją w bazie

Wykonaj w Supabase SQL Editor:

```sql
-- Sprawdź liczbę odpowiedzi (bez RLS - jako superuser)
SELECT COUNT(*) as total_responses FROM public.training_responses;

-- Sprawdź liczbę postępów
SELECT COUNT(*) as total_progress FROM public.training_progress;

-- Sprawdź odpowiedzi z lekcji 6.3
SELECT 
  user_id, 
  module_code, 
  step_code, 
  question_code, 
  answer_text, 
  status, 
  created_at 
FROM public.training_responses 
WHERE step_code = '6.3'
ORDER BY created_at DESC 
LIMIT 20;
```

**Jeśli widzisz dane** → Problem jest z RLS policies, przejdź do Kroku 2.
**Jeśli NIE widzisz danych** → Dane zostały usunięte, przejdź do Kroku 3.

### Krok 2: Napraw RLS policies (jeśli dane istnieją)

Wykonaj migrację:
```bash
supabase_migration_admin_responses_fix.sql
```

Ta migracja:
- Naprawia RLS policies dla admina
- Używa funkcji `is_admin()` do sprawdzania uprawnień
- Zapewnia, że admin widzi wszystkie odpowiedzi

### Krok 3: Przywróć dane z backupu (jeśli dane zostały usunięte)

#### Opcja A: Point-in-Time Recovery (Supabase)

1. Otwórz Supabase Dashboard
2. Przejdź do **Project Settings** → **Database**
3. Znajdź sekcję **Backups** lub **Point-in-Time Recovery**
4. Wybierz datę sprzed wykonania migracji
5. Kliknij **Restore** lub **Create restore point**
6. Potwierdź przywracanie

⚠️ **UWAGA**: To przywróci CAŁĄ bazę danych do wybranego momentu - może nadpisać nowe dane!

#### Opcja B: Przywróć tylko tabele training_responses i training_progress

1. W Supabase Dashboard → **Database** → **Backups**
2. Znajdź backup sprzed migracji
3. Pobierz plik SQL backupu
4. Wyciągnij tylko INSERT statements dla:
   - `training_responses`
   - `training_progress`
5. Wykonaj te INSERT statements w SQL Editor

#### Opcja C: Sprawdź czy są w logach/audit

```sql
-- Sprawdź logi (jeśli są włączone)
SELECT * FROM audit.logged_actions 
WHERE table_name = 'training_responses' 
ORDER BY action_tstamp DESC 
LIMIT 50;
```

### Krok 4: Sprawdź czy wszystko działa

Po naprawie RLS lub przywróceniu danych:

1. Odśwież panel admina
2. Sprawdź, czy widzisz użytkowników
3. Kliknij na użytkownika i sprawdź, czy widzisz odpowiedzi
4. Sprawdź, czy odpowiedzi z lekcji 6.3 są widoczne

### Krok 5: Weryfikacja w panelu admina

W panelu admina powinieneś widzieć:
- Listę wszystkich użytkowników
- Postęp każdego użytkownika
- Wszystkie odpowiedzi, w tym z lekcji 6.3

Jeśli nadal nie widzisz odpowiedzi:

1. Sprawdź konsolę przeglądarki (F12) - mogą być błędy
2. Sprawdź Network tab - czy zapytania do Supabase działają
3. Sprawdź w Supabase Dashboard → Authentication → czy email to `stanislaw@drozniak.com`

## Zapobieganie w przyszłości

1. **Zawsze rób backup przed migracją**:
   ```sql
   -- Eksport danych przed migracją
   COPY (SELECT * FROM training_responses) TO '/tmp/backup_responses.csv' CSV HEADER;
   COPY (SELECT * FROM training_progress) TO '/tmp/backup_progress.csv' CSV HEADER;
   ```

2. **Testuj migracje na kopii bazy** przed wdrożeniem produkcyjnym

3. **Używaj transakcji** w migracjach, aby móc cofnąć zmiany

4. **Sprawdzaj RLS policies** przed każdą migracją

## Kontakt

Jeśli problem nadal występuje po wykonaniu wszystkich kroków, sprawdź:
- Logi w Supabase Dashboard
- Konsolę przeglądarki
- Network requests w DevTools

