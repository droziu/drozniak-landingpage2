# Konfiguracja Storage dla Bloga

## Krok 1: Utworzenie Storage Bucket

1. **Otwórz Supabase Dashboard** → **Storage**
2. Kliknij **"New bucket"**
3. Wypełnij:
   - **Name**: `blog-images`
   - **Public bucket**: ✅ **TAK** (zaznacz, żeby obrazy były dostępne publicznie)
   - **File size limit**: 5 MB (lub więcej, jeśli planujesz większe obrazy)
   - **Allowed MIME types**: 
     - `image/jpeg`
     - `image/png`
     - `image/webp`
     - `image/gif`
4. Kliknij **"Create bucket"**

## Krok 2: Konfiguracja RLS dla Storage

Po utworzeniu bucketu, musisz skonfigurować RLS policies:

1. W Supabase Dashboard → **Storage** → **Policies**
2. Wybierz bucket `blog-images`
3. Dodaj następujące policies:

### Policy 1: Publiczne odczyty (SELECT)
```sql
-- Nazwa: "Public can view blog images"
-- Operacja: SELECT
-- Policy: 
true
```

### Policy 2: Zalogowani użytkownicy mogą uploadować (INSERT)
```sql
-- Nazwa: "Authenticated users can upload blog images"
-- Operacja: INSERT
-- Policy:
auth.role() = 'authenticated'
```

### Policy 3: Właściciele mogą usuwać swoje pliki (DELETE)
```sql
-- Nazwa: "Users can delete their own images"
-- Operacja: DELETE
-- Policy:
auth.uid()::text = (storage.foldername(name))[1]
```

### Policy 4: Admin może wszystko (ALL)
```sql
-- Nazwa: "Admins can do everything with blog images"
-- Operacja: ALL
-- Policy:
public.is_admin()
```

**Alternatywnie**, możesz uruchomić ten SQL w SQL Editor:

```sql
-- RLS dla blog-images bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'blog-images',
  'blog-images',
  true,
  5242880, -- 5 MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

-- Policy: Publiczne odczyty
CREATE POLICY "Public can view blog images"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

-- Policy: Zalogowani mogą uploadować
CREATE POLICY "Authenticated users can upload blog images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'blog-images'
  AND auth.role() = 'authenticated'
);

-- Policy: Właściciele mogą usuwać
CREATE POLICY "Users can delete their own blog images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'blog-images'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy: Admin może wszystko
CREATE POLICY "Admins can do everything with blog images"
ON storage.objects FOR ALL
USING (
  bucket_id = 'blog-images'
  AND public.is_admin()
);
```

## Krok 3: Struktura folderów (opcjonalnie)

Możesz organizować obrazy w folderach:
- `blog-images/posts/{post-slug}/featured.jpg` - główne obrazy postów
- `blog-images/posts/{post-slug}/content/` - obrazy w treści
- `blog-images/thumbnails/{post-slug}-thumb.jpg` - miniaturki

## Krok 4: Test uploadu

Możesz przetestować upload obrazu przez Supabase Dashboard:
1. Storage → blog-images → Upload file
2. Wybierz obraz
3. Sprawdź czy jest dostępny publicznie (URL)

---

**Gotowe!** Teraz możesz przejść do implementacji komponentów React.
