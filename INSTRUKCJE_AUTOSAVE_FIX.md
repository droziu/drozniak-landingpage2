# Instrukcje - Naprawa auto-save odpowiedzi w lekcji 6.3

## Problem
Odpowiedzi w lekcji 6.3 (Praktyczne ćwiczenia i warsztaty) nie zapisywały się automatycznie i nie były widoczne po odświeżeniu strony.

## Rozwiązanie

### 1. Migracja SQL
Uruchom migrację SQL w Supabase, aby upewnić się, że struktura bazy danych jest poprawna:

1. Otwórz Supabase Dashboard
2. Przejdź do SQL Editor
3. Wykonaj plik `supabase_migration_autosave_fix.sql`

Ta migracja:
- Upewnia się, że tabela `training_responses` istnieje z wszystkimi potrzebnymi kolumnami
- Konfiguruje RLS (Row Level Security) tak, aby admin widział wszystkie odpowiedzi
- Dodaje indeksy dla lepszej wydajności
- Dodaje komentarze do kolumn dla dokumentacji

### 2. Auto-save
Auto-save zostało zaimplementowane w `components/TrainingPage.tsx`:
- **Dla subTasks (wszystkie typy pól)**: Odpowiedzi zapisują się automatycznie po 2 sekundach od ostatniej zmiany
- **Dla pytań otwartych**: Odpowiedzi zapisują się automatycznie po 2 sekundach od ostatniej zmiany
- Odpowiedzi są zapisywane z statusem 'pending', jeśli nie są jeszcze zatwierdzone

### 3. Ładowanie odpowiedzi
Po odświeżeniu strony:
- Wszystkie odpowiedzi są ładowane z bazy danych
- Odpowiedzi są wyświetlane w polach (checkboxy zaznaczone, tekst w polach tekstowych, daty wybrane, itp.)
- Status odpowiedzi jest zachowany (pending, approved, rejected)

## Format odpowiedzi w bazie danych

### Dla multichoice (checkboxy)
Odpowiedzi są zapisywane jako string z indeksami oddzielonymi przecinkami, np.:
- `"0,1,2"` - zaznaczone opcje 0, 1 i 2
- `"0"` - zaznaczona tylko opcja 0

### Dla innych typów pól
- **text/textarea**: Tekst użytkownika
- **number**: Liczba jako string
- **url**: URL jako string
- **date**: Data w formacie YYYY-MM-DD
- **choice**: Indeks wybranej opcji jako string

## Struktura tabeli training_responses

```sql
- id: uuid (primary key)
- user_id: uuid (foreign key do auth.users)
- module_code: text (np. 'modul_6')
- step_code: text (np. '6.3')
- question_code: text (np. 'exercise1-sub1', 'summary-q1')
- answer_text: text (odpowiedź użytkownika)
- status: text ('pending', 'approved', 'rejected')
- admin_feedback: text (opcjonalny feedback od admina)
- reviewed_by: uuid (foreign key do auth.users)
- reviewed_at: timestamptz
- created_at: timestamptz
- updated_at: timestamptz
```

## Widoczność dla admina

Admin (stanislaw@drozniak.com) może:
- Widzieć wszystkie odpowiedzi wszystkich użytkowników w panelu admina
- Edytować status odpowiedzi (pending → approved/rejected)
- Dodawać feedback dla użytkowników
- Widzieć wszystkie odpowiedzi niezależnie od statusu

## Testowanie

1. **Test auto-save**:
   - Wypełnij formularz w lekcji 6.3
   - Odczekaj 2 sekundy po ostatniej zmianie
   - Odśwież stronę
   - Sprawdź, czy wszystkie odpowiedzi są zachowane

2. **Test widoczności dla admina**:
   - Zaloguj się jako admin
   - Przejdź do panelu admina
   - Sprawdź, czy widzisz wszystkie odpowiedzi użytkowników

3. **Test ładowania odpowiedzi**:
   - Wypełnij formularz
   - Odśwież stronę
   - Sprawdź, czy wszystkie pola są wypełnione poprawnie

## Troubleshooting

### Odpowiedzi nie zapisują się
1. Sprawdź konsolę przeglądarki - powinny być logi z prefiksem `💾`
2. Sprawdź, czy użytkownik jest zalogowany
3. Sprawdź, czy migracja SQL została wykonana

### Odpowiedzi nie są widoczne po odświeżeniu
1. Sprawdź konsolę przeglądarki - powinny być logi z prefiksem `📥` lub `✅`
2. Sprawdź, czy odpowiedzi są w bazie danych (w Supabase Dashboard)
3. Sprawdź, czy RLS policies są poprawnie skonfigurowane

### Admin nie widzi odpowiedzi
1. Sprawdź, czy email admina to `stanislaw@drozniak.com`
2. Sprawdź, czy RLS policies dla admina są aktywne
3. Sprawdź, czy funkcja `is_admin()` działa poprawnie

