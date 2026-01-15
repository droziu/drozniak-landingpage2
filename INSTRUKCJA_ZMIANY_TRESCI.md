# 📝 Instrukcja: Jak zmienić treść kursu

## Krok 1: Skopiuj plik konfiguracyjny

Utwórz nowy plik konfiguracyjny dla kursu `social-boost-1.0`:

```bash
cp config/trainingModules.ts config/trainingModulesSocialBoost.ts
```

## Krok 2: Edytuj treść kursu

Otwórz plik `config/trainingModulesSocialBoost.ts` i zmień:

### 2.1. Zmień nazwę eksportu

Na początku pliku znajdź:
```typescript
export const trainingModules: Module[] = [
```

I zmień na:
```typescript
export const trainingModulesSocialBoost: Module[] = [
```

### 2.2. Zmień treść modułów i lekcji

W pliku znajdziesz strukturę:
```typescript
{
  id: '1',
  title: 'Podstawy marketingu online',
  description: '...',
  lessons: [
    {
      id: '1.1',
      title: 'Wprowadzenie do marketingu cyfrowego',
      content: '...',
      quiz: [
        {
          id: 'q1',
          type: 'choice',
          question: '...',
          options: ['...', '...'],
          correctAnswer: 1,
          feedback: '...'
        }
      ]
    }
  ]
}
```

**Możesz zmieniać:**
- ✅ Tytuły modułów (`title`)
- ✅ Opisy modułów (`description`)
- ✅ Tytuły lekcji (`title`)
- ✅ Treść lekcji (`content`)
- ✅ Pytania w quizach (`question`)
- ✅ Opcje odpowiedzi (`options`)
- ✅ Poprawne odpowiedzi (`correctAnswer`)
- ✅ Feedback (`feedback`)
- ✅ Podpowiedzi (`hint`)
- ✅ Wszystkie teksty w kursie

**NIE zmieniaj:**
- ❌ `id` modułów (np. `'1'`, `'2'`) - muszą pozostać takie same
- ❌ `id` lekcji (np. `'1.1'`, `'1.2'`) - muszą pozostać takie same
- ❌ `id` pytań (np. `'q1'`, `'q2'`) - muszą pozostać takie same
- ❌ Struktury danych (typy, interfejsy)

## Krok 3: Zaktualizuj `courseLoader.ts`

Otwórz plik `utils/courseLoader.ts` i:

### 3.1. Odkomentuj import

Znajdź:
```typescript
// import { trainingModulesSocialBoost } from '../config/trainingModulesSocialBoost';
```

I zmień na:
```typescript
import { trainingModulesSocialBoost } from '../config/trainingModulesSocialBoost';
```

### 3.2. Dodaj case w switch

Znajdź:
```typescript
// case 'trainingModulesSocialBoost':
//   return trainingModulesSocialBoost;
```

I zmień na:
```typescript
case 'trainingModulesSocialBoost':
  return trainingModulesSocialBoost;
```

## Krok 4: Zaktualizuj bazę danych

Wykonaj w Supabase SQL Editor:

```sql
-- Zaktualizuj config_path dla kursu social-boost-1.0
UPDATE public.courses
SET config_path = 'trainingModulesSocialBoost'
WHERE code = 'social-boost-1.0';
```

## Krok 5: Sprawdź czy działa

1. **Odśwież stronę** w przeglądarce
2. **Zaloguj się** jako użytkownik przypisany do kursu `social-boost-1.0`
3. **Sprawdź** czy widzisz nową treść

## ⚠️ Ważne uwagi

### Zachowanie ID

**DLACZEGO nie zmieniać ID?**

ID są używane do:
- Zapisywania postępu użytkowników (`step_code`, `module_code`)
- Łączenia odpowiedzi z pytaniami (`question_code`)
- Nawigacji między lekcjami

Jeśli zmienisz ID, użytkownicy stracą:
- ❌ Postęp w lekcjach
- ❌ Zapisane odpowiedzi
- ❌ Odblokowane moduły

### Jeśli musisz zmienić strukturę

Jeśli chcesz dodać/usuwać moduły lub lekcje:

1. **Dodaj nowe moduły/lekcje** z nowymi ID (np. `'7'`, `'7.1'`)
2. **Nie usuwaj** starych modułów/lekcji - zostaw je puste lub ukryj
3. **Lub** utwórz całkowicie nowy kurs z nowym kodem

### Przykład zmiany treści

**PRZED:**
```typescript
{
  id: '1.1',
  title: 'Wprowadzenie do marketingu cyfrowego',
  content: 'Marketing cyfrowy to...',
  quiz: [
    {
      id: 'q1',
      question: 'Co jest głównym celem marketingu?',
      options: ['Sprzedaż', 'Zaufanie'],
      correctAnswer: 1
    }
  ]
}
```

**PO:**
```typescript
{
  id: '1.1', // ✅ ZOSTAW TAKIE SAME
  title: 'Wprowadzenie do Social Media Marketing', // ✅ MOŻESZ ZMIENIĆ
  content: 'Social Media Marketing to...', // ✅ MOŻESZ ZMIENIĆ
  quiz: [
    {
      id: 'q1', // ✅ ZOSTAW TAKIE SAME
      question: 'Co jest głównym celem Social Media Marketing?', // ✅ MOŻESZ ZMIENIĆ
      options: ['Sprzedaż', 'Budowanie społeczności'], // ✅ MOŻESZ ZMIENIĆ
      correctAnswer: 1 // ✅ MOŻESZ ZMIENIĆ
    }
  ]
}
```

## 🔄 Szybkie przypomnienie kroków

1. ✅ `cp config/trainingModules.ts config/trainingModulesSocialBoost.ts`
2. ✅ Edytuj `config/trainingModulesSocialBoost.ts` (zmień treść, NIE ID)
3. ✅ Zaktualizuj `utils/courseLoader.ts` (odkomentuj import i case)
4. ✅ Wykonaj SQL: `UPDATE courses SET config_path = 'trainingModulesSocialBoost' WHERE code = 'social-boost-1.0'`
5. ✅ Odśwież stronę i sprawdź

## 📚 Struktura pliku konfiguracyjnego

Plik `trainingModulesSocialBoost.ts` zawiera:

- **Module[]** - tablica modułów
- **Module** - moduł zawiera:
  - `id` - ID modułu (np. `'1'`, `'2'`)
  - `title` - tytuł modułu
  - `description` - opis modułu
  - `lessons` - tablica lekcji
- **Lesson** - lekcja zawiera:
  - `id` - ID lekcji (np. `'1.1'`, `'1.2'`)
  - `title` - tytuł lekcji
  - `content` - treść lekcji (HTML/Markdown)
  - `quiz` - tablica pytań
- **QuizQuestion** - pytanie zawiera:
  - `id` - ID pytania (np. `'q1'`, `'q2'`)
  - `type` - typ pytania (`'choice'`, `'open'`, `'multi-task'`)
  - `question` - treść pytania
  - `options` - opcje odpowiedzi (dla `'choice'`)
  - `correctAnswer` - poprawna odpowiedź
  - `feedback` - komunikat po poprawnej odpowiedzi
  - `hint` - podpowiedź przy błędnej odpowiedzi

## 🆘 Problemy?

### Problem: Nie widzę zmian po odświeżeniu

**Rozwiązanie:**
1. Sprawdź czy wykonałeś SQL update
2. Sprawdź czy odkomentowałeś import w `courseLoader.ts`
3. Sprawdź konsolę przeglądarki (F12) - mogą być błędy
4. Wyczyść cache przeglądarki (Ctrl+Shift+R)

### Problem: Błąd kompilacji TypeScript

**Rozwiązanie:**
1. Sprawdź czy zmieniłeś nazwę eksportu w pliku konfiguracyjnym
2. Sprawdź czy import w `courseLoader.ts` jest poprawny
3. Sprawdź czy wszystkie ID są unikalne

### Problem: Użytkownicy tracą postęp

**Rozwiązanie:**
- To oznacza, że zmieniłeś ID modułów/lekcji/pytań
- NIE ZMIENIAJ ID - tylko treść!

## ✅ Gotowe!

Po wykonaniu wszystkich kroków, kurs `social-boost-1.0` będzie używał nowej treści z pliku `trainingModulesSocialBoost.ts`.
