# Instrukcje - Naprawa zapisywania odpowiedzi w lekcji 6.3

## Problem
Odpowiedzi w lekcji 6.3 nie zapisują się - po odświeżeniu strony wszystko znika.

## Rozwiązanie

### Krok 1: Wykonaj migrację SQL

W Supabase Dashboard → SQL Editor wykonaj plik:
```
supabase_migration_fix_answers.sql
```

Ta migracja:
- ✅ Upewnia się, że tabela `training_responses` istnieje
- ✅ Zmienia `answer_text` na nullable (może być NULL)
- ✅ Naprawia RLS policies - użytkownicy mogą zapisywać swoje odpowiedzi
- ✅ Naprawia RLS policies - admin widzi wszystkie odpowiedzi
- ✅ Dodaje indeksy dla lepszej wydajności
- ✅ **NIE ZMIENIA** istniejących danych
- ✅ **NIE ZMIENIA** innych tabel
- ✅ **NIE ZMIENIA** postępu użytkowników

### Krok 2: Sprawdź w konsoli przeglądarki

1. Otwórz konsolę przeglądarki (F12)
2. Wypełnij pole w lekcji 6.3
3. Kliknij "Zapisz odpowiedź"
4. Sprawdź logi w konsoli:
   - Powinien być log: `💾 Zapisuję odpowiedź na podzadanie:`
   - Powinien być log: `💾 Próba zapisania odpowiedzi:`
   - Powinien być log: `✅ Zapisano odpowiedź:`

### Krok 3: Sprawdź w bazie danych

W Supabase SQL Editor wykonaj:
```sql
SELECT * FROM training_responses 
WHERE step_code = '6.3' 
ORDER BY created_at DESC 
LIMIT 10;
```

Powinieneś zobaczyć zapisane odpowiedzi.

### Krok 4: Sprawdź po odświeżeniu

1. Odśwież stronę (F5)
2. Sprawdź, czy odpowiedzi są widoczne w polach
3. Sprawdź konsolę - powinny być logi:
   - `✅ Znaleziono odpowiedź dla podzadania:`
   - `📥 Ładowanie odpowiedzi dla subTask:`

## Jeśli nadal nie działa

1. **Sprawdź RLS policies**:
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'training_responses';
   ```

2. **Sprawdź czy jesteś zalogowany**:
   - W konsoli: `localStorage.getItem('sb-auth-token')`

3. **Sprawdź błędy w konsoli**:
   - Czy są błędy RLS?
   - Czy są błędy zapisu do bazy?

4. **Sprawdź w Supabase Dashboard**:
   - Table Editor → training_responses
   - Czy są odpowiedzi z `step_code = '6.3'`?

## Struktura odpowiedzi w bazie

Każda odpowiedź jest zapisywana jako:
- `user_id`: ID użytkownika
- `module_code`: `modul_6`
- `step_code`: `6.3`
- `question_code`: ID podzadania (np. `exercise1-sub1`, `exercise2-sub1`)
- `answer_text`: Tekst odpowiedzi (może być NULL)
- `status`: `pending` lub `approved`

## Test zapisu

Po wykonaniu migracji, możesz przetestować zapis:

1. Wypełnij pole "Kanał 1" w ćwiczeniu 1
2. Kliknij "Zapisz odpowiedź"
3. Sprawdź w konsoli - powinny być logi z `✅`
4. Odśwież stronę
5. Pole powinno być wypełnione

