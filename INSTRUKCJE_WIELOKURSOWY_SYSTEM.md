# Instrukcje: System Wielokursowy

## 📋 Przegląd

Ten system umożliwia przypisywanie różnych kursów do różnych użytkowników. Każdy użytkownik może mieć dostęp do jednego lub wielu kursów, ale tylko jeden kurs może być aktywny w danym momencie.

## 🗄️ Struktura Bazy Danych

### Nowe tabele:

1. **`courses`** - definicje kursów
   - `id` (uuid) - ID kursu
   - `code` (text) - unikalny kod (np. 'marketing-online', 'catering-ai')
   - `name` (text) - nazwa kursu
   - `description` (text) - opis
   - `config_path` (text) - ścieżka do pliku konfiguracji (np. 'trainingModules', 'trainingModulesCatering')
   - `active` (boolean) - czy kurs jest aktywny
   - `created_at`, `updated_at`

2. **`user_courses`** - przypisania użytkowników do kursów
   - `id` (uuid)
   - `user_id` (uuid) - FK do auth.users
   - `course_id` (uuid) - FK do courses
   - `assigned_at` (timestamptz) - kiedy przypisano
   - `assigned_by` (uuid) - kto przypisał (admin)
   - `active` (boolean) - czy przypisanie jest aktywne

### Zmodyfikowane tabele (dodano `course_id`):

- `training_progress` - teraz zawiera `course_id`
- `training_responses` - teraz zawiera `course_id`
- `module_unlocks` - teraz zawiera `course_id`
- `course_certificates` - teraz zawiera `course_id`

## 🚀 Krok 1: Wykonaj migrację SQL

1. Otwórz **Supabase Dashboard → SQL Editor**
2. Wklej zawartość pliku `supabase_migration_multi_course.sql`
3. Kliknij **"Run"**
4. Sprawdź czy nie ma błędów

### Co robi migracja:

- ✅ Tworzy tabele `courses` i `user_courses`
- ✅ Dodaje `course_id` do istniejących tabel
- ✅ Tworzy domyślny kurs `'marketing-online'` dla istniejących danych
- ✅ Przypisuje wszystkich istniejących użytkowników do domyślnego kursu
- ✅ Aktualizuje wszystkie istniejące rekordy, dodając `course_id`
- ✅ Aktualizuje RLS policies, aby uwzględniały `course_id`

## 📝 Krok 2: Utwórz nowy plik konfiguracji kursu

Dla nowego kursu (np. catering), utwórz nowy plik:

**`config/trainingModulesCatering.ts`**

```typescript
import type { Module } from './trainingModules';

export const trainingModulesCatering: Module[] = [
  {
    id: '1',
    title: 'Podstawy marketingu online dla catering',
    icon: 'chart',
    lessons: [
      // ... twoje lekcje
    ]
  },
  // ... więcej modułów
];
```

**Wskazówka:** Możesz skopiować `config/trainingModules.ts` i zmienić treść.

## 🔧 Krok 3: Zmiany w kodzie TypeScript

### 3.1. Utwórz hook do zarządzania kursami

**`hooks/useCourse.ts`**

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

### 3.2. Utwórz funkcję do dynamicznego ładowania modułów

**`utils/courseLoader.ts`**

```typescript
import { trainingModules } from '../config/trainingModules';
import type { Module } from '../config/trainingModules';

// Importuj inne konfiguracje kursów
// import { trainingModulesCatering } from '../config/trainingModulesCatering';

export const loadCourseModules = (configPath: string): Module[] => {
  switch (configPath) {
    case 'trainingModules':
      return trainingModules;
    // case 'trainingModulesCatering':
    //   return trainingModulesCatering;
    default:
      console.warn(`Unknown config path: ${configPath}, using default`);
      return trainingModules;
  }
};
```

### 3.3. Zmodyfikuj `TrainingPage.tsx`

**Główne zmiany:**

1. **Dodaj import hooka:**
```typescript
import { useCourse } from '../hooks/useCourse';
import { loadCourseModules } from '../utils/courseLoader';
```

2. **Użyj hooka zamiast hardcoded `trainingModules`:**
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

3. **Zastąp wszystkie wystąpienia `trainingModules` przez `modules`**

4. **Dodaj `course_id` do wszystkich zapytań:**
```typescript
// Przykład dla training_progress
const { data, error } = await supabase
  .from('training_progress')
  .select('*')
  .eq('user_id', user.id)
  .eq('course_id', course.id) // DODAJ TO
  .eq('module_code', moduleCode);
```

### 3.4. Zmodyfikuj `AdminPanel.tsx`

**Główne zmiany:**

1. **Dodaj możliwość wyboru kursu w panelu admina**
2. **Filtruj użytkowników i odpowiedzi po `course_id`**
3. **Dodaj interfejs do przypisywania kursów użytkownikom**

**Przykład funkcji przypisania kursu:**
```typescript
const assignCourseToUser = async (userId: string, courseId: string) => {
  // Deaktywuj poprzednie kursy użytkownika
  await supabase
    .from('user_courses')
    .update({ active: false })
    .eq('user_id', userId)
    .eq('active', true);

  // Przypisz nowy kurs
  const { error } = await supabase
    .from('user_courses')
    .upsert({
      user_id: userId,
      course_id: courseId,
      active: true,
      assigned_by: user.id,
    });

  if (error) throw error;
};
```

## 🎯 Krok 4: Utwórz nowy kurs w bazie danych

Po wykonaniu migracji, utwórz nowy kurs:

```sql
-- Przykład: Kurs dla catering
INSERT INTO public.courses (code, name, description, config_path, active, created_by)
VALUES (
  'catering-ai',
  'AI w usługach cateringowych',
  'Szkolenie z wykorzystania AI w marketingu i zarządzaniu cateringiem',
  'trainingModulesCatering',
  true,
  (SELECT id FROM auth.users WHERE email = 'stanislaw@drozniak.com' LIMIT 1)
);
```

## 👥 Krok 5: Przypisz kurs do użytkownika

### Opcja A: Przez SQL (dla admina)

```sql
-- Przypisz kurs do użytkownika
INSERT INTO public.user_courses (user_id, course_id, assigned_by, active)
VALUES (
  'user-uuid-here', -- ID użytkownika
  (SELECT id FROM public.courses WHERE code = 'catering-ai'),
  (SELECT id FROM auth.users WHERE email = 'stanislaw@drozniak.com'),
  true
)
ON CONFLICT (user_id, course_id) 
DO UPDATE SET active = true, assigned_at = now();
```

### Opcja B: Przez panel admina (po implementacji)

Dodaj w `AdminPanel.tsx` możliwość wyboru kursu dla użytkownika.

## ✅ Krok 6: Testowanie

1. **Zaloguj się jako użytkownik testowy**
2. **Przypisz mu nowy kurs** (przez SQL lub panel)
3. **Sprawdź czy widzi właściwe moduły**
4. **Sprawdź czy postęp jest zapisywany z właściwym `course_id`**

## 🔒 Bezpieczeństwo

- ✅ RLS policies zostały zaktualizowane, aby filtrować po `course_id`
- ✅ Użytkownicy widzą tylko dane z kursów, do których mają dostęp
- ✅ Admin widzi wszystkie dane (może filtrować po kursie)

## 📊 Przyszłe rozszerzenia

1. **Wiele aktywnych kursów jednocześnie** - zmień logikę `active` w `user_courses`
2. **Progresja między kursami** - dodaj zależności między kursami
3. **Certyfikaty per kurs** - już zaimplementowane przez `course_id` w `course_certificates`

## ⚠️ Ważne uwagi

1. **Backup przed migracją** - zawsze rób backup przed wykonaniem migracji
2. **Testowanie** - przetestuj na środowisku deweloperskim przed produkcją
3. **Kompatybilność wsteczna** - istniejące dane są automatycznie przypisane do domyślnego kursu

## 🆘 Rozwiązywanie problemów

### Problem: Użytkownik nie widzi kursu
- Sprawdź czy ma przypisanie w `user_courses` z `active = true`
- Sprawdź czy kurs istnieje i jest aktywny w tabeli `courses`

### Problem: Błędy RLS
- Sprawdź czy RLS policies zostały zaktualizowane
- Sprawdź czy `course_id` jest ustawione w zapytaniach

### Problem: Nieprawidłowe moduły
- Sprawdź czy `config_path` w `courses` odpowiada nazwie pliku
- Sprawdź czy plik konfiguracji istnieje i jest poprawnie zaimportowany
