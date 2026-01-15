# Kroki po migracji - System Wielokursowy

## ✅ Krok 1: Weryfikacja migracji

Wykonaj te zapytania w Supabase SQL Editor, aby sprawdzić czy wszystko działa:

```sql
-- 1. Sprawdź czy domyślny kurs został utworzony
SELECT * FROM public.courses WHERE code = 'marketing-online';

-- 2. Sprawdź czy użytkownicy mają przypisania do kursów
SELECT 
  uc.user_id,
  c.code as course_code,
  c.name as course_name,
  uc.active
FROM public.user_courses uc
JOIN public.courses c ON uc.course_id = c.id
LIMIT 10;

-- 3. Sprawdź czy wszystkie rekordy mają course_id (powinno być 0)
SELECT 
  'training_progress' as tabela,
  COUNT(*) as bez_course_id
FROM public.training_progress 
WHERE course_id IS NULL
UNION ALL
SELECT 
  'training_responses' as tabela,
  COUNT(*) as bez_course_id
FROM public.training_responses 
WHERE course_id IS NULL
UNION ALL
SELECT 
  'module_unlocks' as tabela,
  COUNT(*) as bez_course_id
FROM public.module_unlocks 
WHERE course_id IS NULL
UNION ALL
SELECT 
  'course_certificates' as tabela,
  COUNT(*) as bez_course_id
FROM public.course_certificates 
WHERE course_id IS NULL;

-- 4. Sprawdź czy funkcje działają
SELECT public.get_user_active_course(
  (SELECT id FROM auth.users LIMIT 1)
);
```

**Oczekiwane wyniki:**
- ✅ Kurs `marketing-online` istnieje
- ✅ Użytkownicy mają przypisania w `user_courses`
- ✅ Wszystkie rekordy mają `course_id` (0 rekordów bez course_id)

---

## 📝 Krok 2: Utwórz nowy kurs w bazie danych

Dla nowego kursu (np. catering), wykonaj:

```sql
INSERT INTO public.courses (code, name, description, config_path, active, created_by)
VALUES (
  'catering-ai',
  'AI w usługach cateringowych',
  'Szkolenie z wykorzystania AI w marketingu i zarządzaniu cateringiem',
  'trainingModulesCatering',
  true,
  (SELECT id FROM auth.users WHERE email = 'stanislaw@drozniak.com' LIMIT 1)
)
RETURNING *;
```

**Uwaga:** Zmień `code`, `name`, `description` i `config_path` zgodnie z Twoim kursem.

---

## 📁 Krok 3: Przygotuj plik konfiguracji kursu

1. **Skopiuj szablon:**
   ```bash
   cp config/trainingModulesCatering.ts.example config/trainingModulesCatering.ts
   ```

2. **Lub skopiuj istniejący kurs i zmodyfikuj:**
   ```bash
   cp config/trainingModules.ts config/trainingModulesCatering.ts
   ```

3. **Edytuj `config/trainingModulesCatering.ts`:**
   - Zmień treść lekcji zgodnie z nowym kursem
   - Zachowaj strukturę (interfejsy, typy)
   - Eksportuj jako `trainingModulesCatering`

---

## 👥 Krok 4: Przypisz kurs do użytkownika

### Opcja A: Przez SQL (szybkie)

```sql
-- Przypisz kurs do konkretnego użytkownika
INSERT INTO public.user_courses (user_id, course_id, assigned_by, active)
VALUES (
  'USER-UUID-HERE', -- Zamień na UUID użytkownika
  (SELECT id FROM public.courses WHERE code = 'catering-ai'),
  (SELECT id FROM auth.users WHERE email = 'stanislaw@drozniak.com'),
  true
)
ON CONFLICT (user_id, course_id) 
DO UPDATE SET active = true, assigned_at = now();
```

**Jak znaleźć UUID użytkownika:**
```sql
SELECT id, email FROM auth.users WHERE email = 'email-uzytkownika@example.com';
```

### Opcja B: Przez panel admina (po implementacji w kodzie)

Będzie dostępne po modyfikacji `AdminPanel.tsx` (patrz Krok 5).

---

## 🔧 Krok 5: Zmodyfikuj kod TypeScript

### 5.1. Utwórz hook `hooks/useCourse.ts`

Skopiuj kod z `INSTRUKCJE_WIELOKURSOWY_SYSTEM.md` (sekcja 3.1)

### 5.2. Utwórz `utils/courseLoader.ts`

Skopiuj kod z `INSTRUKCJE_WIELOKURSOWY_SYSTEM.md` (sekcja 3.2)

**WAŻNE:** Odkomentuj import dla nowego kursu:
```typescript
import { trainingModulesCatering } from '../config/trainingModulesCatering';
```

I dodaj do switch:
```typescript
case 'trainingModulesCatering':
  return trainingModulesCatering;
```

### 5.3. Zmodyfikuj `components/TrainingPage.tsx`

Główne zmiany:
1. Dodaj importy:
   ```typescript
   import { useCourse } from '../hooks/useCourse';
   import { loadCourseModules } from '../utils/courseLoader';
   ```

2. Zastąp `trainingModules` przez dynamiczne ładowanie:
   ```typescript
   const { course, loading: courseLoading } = useCourse();
   const [modules, setModules] = useState<Module[]>([]);

   useEffect(() => {
     if (course) {
       const loadedModules = loadCourseModules(course.config_path);
       setModules(loadedModules);
     }
   }, [course]);
   ```

3. **Zastąp WSZYSTKIE wystąpienia `trainingModules` przez `modules`**

4. **Dodaj `course_id` do WSZYSTKICH zapytań Supabase:**
   ```typescript
   // Przykład:
   const { data } = await supabase
     .from('training_progress')
     .select('*')
     .eq('user_id', user.id)
     .eq('course_id', course.id) // DODAJ TO
     .eq('module_code', moduleCode);
   ```

### 5.4. Zmodyfikuj `components/AdminPanel.tsx`

1. Dodaj możliwość wyboru kursu dla użytkownika
2. Filtruj dane po `course_id`
3. Dodaj funkcję przypisania kursu (patrz `INSTRUKCJE_WIELOKURSOWY_SYSTEM.md` sekcja 3.4)

---

## ✅ Krok 6: Testowanie

1. **Zaloguj się jako użytkownik testowy**
2. **Sprawdź czy widzi właściwe moduły** (zależnie od przypisanego kursu)
3. **Wypełnij lekcję i sprawdź czy postęp jest zapisywany**
4. **Sprawdź czy `course_id` jest ustawione w bazie:**
   ```sql
   SELECT * FROM training_progress 
   WHERE user_id = 'USER-UUID' 
   ORDER BY created_at DESC 
   LIMIT 5;
   ```

---

## 🆘 Rozwiązywanie problemów

### Problem: Użytkownik nie widzi kursu
```sql
-- Sprawdź przypisanie
SELECT * FROM user_courses 
WHERE user_id = 'USER-UUID' AND active = true;

-- Sprawdź czy kurs istnieje i jest aktywny
SELECT * FROM courses WHERE id = 'COURSE-UUID';
```

### Problem: Błędy w kodzie TypeScript
- Sprawdź czy wszystkie importy są poprawne
- Sprawdź czy `courseLoader.ts` ma właściwy case dla `config_path`
- Sprawdź czy plik konfiguracji jest poprawnie zaimportowany

### Problem: Postęp nie jest zapisywany
- Sprawdź czy `course_id` jest dodane do zapytań
- Sprawdź czy `course` nie jest `null` w komponencie
- Sprawdź logi w konsoli przeglądarki

---

## 📋 Checklist przed wdrożeniem

- [ ] Migracja wykonana pomyślnie
- [ ] Weryfikacja SQL pokazuje poprawne dane
- [ ] Nowy kurs utworzony w bazie
- [ ] Plik konfiguracji kursu przygotowany
- [ ] Kurs przypisany do użytkownika testowego
- [ ] Hook `useCourse` utworzony
- [ ] `courseLoader.ts` utworzony i skonfigurowany
- [ ] `TrainingPage.tsx` zmodyfikowany
- [ ] `AdminPanel.tsx` zmodyfikowany (opcjonalnie)
- [ ] Testowanie zakończone pomyślnie
- [ ] Wszystkie zapytania mają `course_id`

---

## 🚀 Gotowe!

Po wykonaniu wszystkich kroków, system wielokursowy będzie działał. Każdy użytkownik będzie widział tylko kursy, do których ma przypisanie.
