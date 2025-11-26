# Test zapisu odpowiedzi - Diagnostyka

## Problem
Odpowiedzi w lekcji 6.3 nie są zapisywane ani ładowane po odświeżeniu strony.

## Co zrobić:

### 1. Sprawdź w konsoli przeglądarki

Po kliknięciu "Zapisz odpowiedź" powinny pojawić się logi:
- `💾 Zapisuję odpowiedź na podzadanie:`
- `💾 Próba zapisania odpowiedzi:`
- `✅ Zapisano odpowiedź:`
- `✅ Weryfikacja - odpowiedź jest w bazie:`

Jeśli tych logów NIE MA, to znaczy, że przycisk nie działa lub funkcja nie jest wywoływana.

### 2. Sprawdź w bazie danych

W Supabase SQL Editor wykonaj:
```sql
SELECT * FROM training_responses 
WHERE step_code = '6.3' 
ORDER BY created_at DESC 
LIMIT 20;
```

Jeśli nie ma odpowiedzi, to znaczy, że zapis nie działa.

### 3. Sprawdź RLS policies

W Supabase SQL Editor wykonaj:
```sql
SELECT * FROM pg_policies 
WHERE tablename = 'training_responses';
```

Powinny być widoczne policies dla użytkowników i admina.

### 4. Test ręcznego zapisu

W Supabase SQL Editor możesz ręcznie dodać odpowiedź:
```sql
INSERT INTO training_responses (user_id, module_code, step_code, question_code, answer_text, status)
VALUES (
  'TWOJE_USER_ID',  -- znajdź w auth.users
  'modul_6',
  '6.3',
  'ex1-1',
  'test odpowiedzi',
  'approved'
);
```

Następnie odśwież stronę - jeśli odpowiedź się pojawi, problem jest w zapisie. Jeśli nie, problem jest w ładowaniu.

## Najczęstsze problemy:

1. **RLS blokuje zapis** - użytkownik nie może zapisywać swoich odpowiedzi
2. **Odpowiedzi nie są ładowane** - problem w funkcji `loadProgress`
3. **Przyciski nie działają** - funkcja nie jest wywoływana
4. **Błąd w zapisie** - odpowiedzi są zapisywane z błędem, który nie jest wyświetlany

## Rozwiązanie

Jeśli odpowiedzi nie są zapisywane, wykonaj migrację:
- `supabase_migration_fix_answers.sql`

I sprawdź logi w konsoli, aby zobaczyć, gdzie jest problem.

