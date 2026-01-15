# Plan Dalszych Kroków - System Wielokursowy

## ⚠️ WAŻNE: Kolejność działań

**NAJPIERW** musisz zaimplementować system wielokursowy w kodzie TypeScript, **POTEM** możesz zmieniać treść kursu.

Dlaczego? Bo bez implementacji kodu, użytkownicy nie zobaczą kursu w aplikacji, nawet jeśli zmienisz treść.

---

## 📋 KROK 1: Implementacja systemu wielokursowego w kodzie (WYMAGANE)

### 1.1. Utwórz hook `hooks/useCourse.ts`

Plik: `hooks/useCourse.ts`

```typescript
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

interface Course {
  id: string;
  code: string;
  name: string;
  description: string | null;
  config_path: string;
  active: boolean;
}

export const useCourse = () => {
  const { user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    loadUserCourse();
  }, [user]);

  const loadUserCourse = async () => {
    try {
      // Pobierz aktywny kurs użytkownika
      const { data: userCourse, error } = await supabase
        .from('user_courses')
        .select(`
          course_id,
          courses (
            id,
            code,
            name,
            description,
            config_path,
            active
          )
        `)
        .eq('user_id', user.id)
        .eq('active', true)
        .order('assigned_at', { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;

      if (userCourse?.courses) {
        setCourse(userCourse.courses as Course);
      }
    } catch (error) {
      console.error('Error loading course:', error);
    } finally {
      setLoading(false);
    }
  };

  return { course, loading, reloadCourse: loadUserCourse };
};
```

### 1.2. Utwórz `utils/courseLoader.ts`

Plik: `utils/courseLoader.ts`

```typescript
import { trainingModules } from '../config/trainingModules';
import type { Module } from '../config/trainingModules';

// Importuj inne konfiguracje kursów (dodaj gdy utworzysz)
// import { trainingModulesSocialBoost } from '../config/trainingModulesSocialBoost';

export const loadCourseModules = (configPath: string): Module[] => {
  switch (configPath) {
    case 'trainingModules':
      return trainingModules;
    // case 'trainingModulesSocialBoost':
    //   return trainingModulesSocialBoost;
    default:
      console.warn(`Unknown config path: ${configPath}, using default`);
      return trainingModules;
  }
};
```

### 1.3. Zmodyfikuj `components/TrainingPage.tsx`

**Główne zmiany:**

1. **Dodaj importy na górze:**
```typescript
import { useCourse } from '../hooks/useCourse';
import { loadCourseModules } from '../utils/courseLoader';
```

2. **Zastąp `trainingModules` przez dynamiczne ładowanie:**
```typescript
// Zamiast:
// import { trainingModules, ... } from '../config/trainingModules';

// Dodaj:
const { course, loading: courseLoading } = useCourse();
const [modules, setModules] = useState<Module[]>([]);

useEffect(() => {
  if (course) {
    const loadedModules = loadCourseModules(course.config_path);
    setModules(loadedModules);
  }
}, [course]);
```

3. **Zastąp WSZYSTKIE wystąpienia `trainingModules` przez `modules`** w całym pliku

4. **Dodaj `course_id` do WSZYSTKICH zapytań Supabase:**
```typescript
// Przykład dla training_progress:
const { data } = await supabase
  .from('training_progress')
  .select('*')
  .eq('user_id', user.id)
  .eq('course_id', course?.id) // DODAJ TO
  .eq('module_code', moduleCode);
```

**Gdzie dodać `course_id`:**
- `loadTrainingData()` - zapytania do `training_progress`
- `loadResponses()` - zapytania do `training_responses`
- `saveProgress()` - zapisywanie do `training_progress`
- `saveResponse()` - zapisywanie do `training_responses`
- `loadUnlockedModules()` - zapytania do `module_unlocks`
- Wszystkie inne zapytania do tabel związanych z kursem

---

## 📝 KROK 2: Przygotowanie pliku z treścią kursu (PO KROKU 1)

### 2.1. Skopiuj plik z treścią

```bash
# Skopiuj istniejący kurs jako podstawę
cp config/trainingModules.ts config/trainingModulesSocialBoost.ts
```

### 2.2. Edytuj plik `config/trainingModulesSocialBoost.ts`

1. **Zmień eksport:**
```typescript
// Zamiast:
export const trainingModules: Module[] = [

// Zmień na:
export const trainingModulesSocialBoost: Module[] = [
```

2. **Zmień treść lekcji** - edytuj:
   - `title` - tytuły modułów i lekcji
   - `intro` - wprowadzenia
   - `whyImportant` - dlaczego to ważne
   - `quiz` - pytania i odpowiedzi
   - Wszystkie inne sekcje zgodnie z potrzebami

3. **Zaktualizuj funkcje pomocnicze na końcu pliku:**
```typescript
// Zmień wszystkie wystąpienia trainingModules na trainingModulesSocialBoost
export const findLesson = (lessonId: string): Lesson | undefined => {
  for (const module of trainingModulesSocialBoost) { // <-- zmiana
    const lesson = module.lessons.find(l => l.id === lessonId);
    if (lesson) return lesson;
  }
  return undefined;
};

export const getTotalLessons = (): number => {
  return trainingModulesSocialBoost.reduce((sum, module) => sum + module.lessons.length, 0); // <-- zmiana
};

// ... itd.
```

### 2.3. Zaktualizuj `utils/courseLoader.ts`

```typescript
import { trainingModulesSocialBoost } from '../config/trainingModulesSocialBoost';

export const loadCourseModules = (configPath: string): Module[] => {
  switch (configPath) {
    case 'trainingModules':
      return trainingModules;
    case 'trainingModulesSocialBoost': // <-- dodaj
      return trainingModulesSocialBoost;
    default:
      console.warn(`Unknown config path: ${configPath}, using default`);
      return trainingModules;
  }
};
```

### 2.4. Zaktualizuj kurs w bazie danych

```sql
-- Zmień config_path kursu na nowy plik
UPDATE public.courses
SET config_path = 'trainingModulesSocialBoost'
WHERE code = 'social-boost-1.0';
```

---

## ✅ KROK 3: Testowanie

1. **Zaloguj się jako użytkownik testowy** (`eb372103-09e4-42dd-a0c4-5c9e741d5792`)
2. **Sprawdź czy widzi kurs `social-boost-1.0`**
3. **Sprawdź czy widzi właściwe moduły** (z nowego pliku)
4. **Wypełnij lekcję i sprawdź czy postęp jest zapisywany**
5. **Sprawdź czy `course_id` jest ustawione w bazie:**
   ```sql
   SELECT * FROM training_progress 
   WHERE user_id = 'eb372103-09e4-42dd-a0c4-5c9e741d5792'
   ORDER BY created_at DESC LIMIT 5;
   ```

---

## 📁 Struktura plików z treścią

**Gdzie jest treść kursu:**
- `config/trainingModules.ts` - treść domyślnego kursu `marketing-online`
- `config/trainingModulesSocialBoost.ts` - treść kursu `social-boost-1.0` (do utworzenia)

**Struktura pliku:**
```typescript
export interface Module {
  id: string;           // np. "1", "2"
  title: string;        // Tytuł modułu
  icon: string;         // Nazwa ikony
  lessons: Lesson[];     // Tablica lekcji
}

export interface Lesson {
  id: string;           // np. "1.1", "1.2"
  moduleId: string;     // np. "1"
  title: string;        // Tytuł lekcji
  intro: string;        // Wprowadzenie
  whyImportant: string | KeyElement[];
  // ... inne sekcje
  quiz: QuizQuestion[]; // Pytania
}
```

---

## 🎯 Podsumowanie - Co najpierw?

### ✅ NAJPIERW (WYMAGANE):
1. Utwórz `hooks/useCourse.ts`
2. Utwórz `utils/courseLoader.ts`
3. Zmodyfikuj `components/TrainingPage.tsx` (dodaj `course_id` do zapytań)
4. Przetestuj czy użytkownicy widzą swoje kursy

### ✅ POTEM (gdy system działa):
1. Skopiuj `config/trainingModules.ts` jako `config/trainingModulesSocialBoost.ts`
2. Zmień treść w nowym pliku
3. Zaktualizuj `courseLoader.ts`
4. Zaktualizuj `config_path` w bazie danych

---

## 🆘 Jeśli potrzebujesz pomocy

Mogę przygotować gotowe pliki:
- `hooks/useCourse.ts` - gotowy
- `utils/courseLoader.ts` - gotowy
- Modyfikacje `TrainingPage.tsx` - mogę pokazać dokładnie co zmienić

Daj znać, jeśli chcesz żebym przygotował te pliki!
