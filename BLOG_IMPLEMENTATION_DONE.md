# Blog - Implementacja Fazy 1 ✅

## Co zostało zrobione:

### 1. ✅ Baza danych
- Migracja SQL uruchomiona pomyślnie
- Tabele: `blog_posts`, `blog_categories`
- RLS policies skonfigurowane
- Funkcje pomocnicze (wyszukiwanie, view counter, reading time)

### 2. ✅ Hooks React
- `hooks/useBlogPosts.ts` - pobieranie listy postów z filtrowaniem
- `hooks/useBlogPost.ts` - pobieranie pojedynczego posta

### 3. ✅ Komponenty React
- `components/blog/BlogList.tsx` - lista wszystkich postów
- `components/blog/BlogPost.tsx` - pojedynczy post z renderowaniem bloków

### 4. ✅ Routing
- `/blog` - lista postów
- `/blog/:slug` - pojedynczy post

### 5. ✅ SEO
- Dynamiczne meta tags (title, description, Open Graph)
- Structured data ready (można dodać JSON-LD później)

---

## 🎯 Co dalej?

### KROK 1: Utwórz Storage Bucket (WAŻNE!)

Zobacz plik `BLOG_SETUP_STORAGE.md` - tam są instrukcje jak:
1. Utworzyć bucket `blog-images` w Supabase
2. Skonfigurować RLS policies dla Storage

**Bez tego nie będziesz mógł uploadować obrazów!**

---

### KROK 2: Przetestuj podstawową funkcjonalność

1. **Uruchom serwer dev**:
   ```bash
   npm run dev
   ```

2. **Wejdź na `/blog`** - powinieneś zobaczyć pustą listę (bo nie ma jeszcze postów)

3. **Utwórz testowy post w bazie** (przez SQL Editor):
   ```sql
   INSERT INTO blog_posts (
     slug,
     title,
     excerpt,
     content,
     status,
     published_at,
     category_id
   ) VALUES (
     'testowy-post',
     'Testowy Post',
     'To jest testowy post do sprawdzenia czy wszystko działa.',
     '{"blocks": [{"type": "text", "id": "1", "data": {"text": "<p>To jest treść testowego posta. Jeśli to widzisz, wszystko działa!</p>", "alignment": "left"}}]}'::jsonb,
     'published',
     NOW(),
     (SELECT id FROM blog_categories LIMIT 1)
   );
   ```

4. **Odśwież `/blog`** - powinien pojawić się testowy post

5. **Kliknij na post** - powinieneś zobaczyć pełną treść

---

### KROK 3: Dodaj link do bloga w nawigacji

W `components/Header.tsx` dodaj link do bloga w menu nawigacyjnym.

---

### KROK 4: Następne fazy (opcjonalnie)

- **Faza 2**: Edytor postów (Rich Text Editor, upload obrazów)
- **Faza 3**: Zaawansowane SEO (JSON-LD, sitemap)
- **Faza 4**: Wyszukiwarka, filtrowanie, paginacja

---

## 📝 Struktura treści posta (JSONB)

Gdy będziesz tworzyć posty, struktura `content` powinna wyglądać tak:

```json
{
  "blocks": [
    {
      "type": "text",
      "id": "unique-id-1",
      "data": {
        "text": "<p>Paragraf tekstu z <strong>formatowaniem</strong>.</p>",
        "alignment": "left"
      }
    },
    {
      "type": "image",
      "id": "unique-id-2",
      "data": {
        "imageUrl": "https://twoj-projekt.supabase.co/storage/v1/object/public/blog-images/posts/testowy-post/image.jpg",
        "alt": "Opis obrazu",
        "caption": "Źródło: ...",
        "width": "wide"
      }
    },
    {
      "type": "quote",
      "id": "unique-id-3",
      "data": {
        "quote": "Inspirujący cytat",
        "author": "Jan Kowalski"
      }
    }
  ]
}
```

---

## 🐛 Rozwiązywanie problemów

### Problem: "Post nie został znaleziony"
- Sprawdź czy post ma `status = 'published'`
- Sprawdź czy slug jest poprawny

### Problem: Obrazy się nie ładują
- Sprawdź czy Storage Bucket został utworzony
- Sprawdź czy URL obrazu jest poprawny
- Sprawdź RLS policies dla Storage

### Problem: Błąd w konsoli
- Sprawdź czy wszystkie zmienne środowiskowe Supabase są ustawione
- Sprawdź czy migracja SQL przeszła bez błędów

---

## 🎉 Gotowe!

Masz teraz działający blog z podstawową funkcjonalnością. Możesz:
- Przeglądać listę postów
- Otwierać pojedyncze posty
- Renderować różne typy bloków treści

Następnym krokiem jest utworzenie edytora, żeby móc łatwo dodawać nowe posty!
