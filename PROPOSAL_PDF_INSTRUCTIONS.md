# Instrukcje: System PDF dla ofert

## 📋 Przegląd

System umożliwia wgrywanie PDF do ofert, wyświetlanie w przeglądarce i tracking aktywności klienta (otwarcia, pobrania, czasu na stronie, przewijania).

## 🗄️ Struktura

### Nowe kolumny w tabeli `proposals`:
- `slug` - Czytelny identyfikator dla URL (np. `fibra-2026-01`)
- `pdf_path` - Ścieżka do pliku w Supabase Storage (np. `proposals/fibra-2026-01.pdf`)

### Tracking wydarzeń (używa `proposal_tracking_events`):
- `opened_offer_page` - Otwarcie strony oferty
- `pdf_loaded` - PDF został załadowany w embedzie
- `download_clicked` - Kliknięcie pobierania PDF
- `time_on_page` - Czas spędzony na stronie (co 10 sekund)
- `scroll_depth` - Głębokość przewinięcia (co 10%)

### URL format:
- `/o/:slug?token=XYZ` - Strona PDF oferty z tokenem (opcjonalnie)
- `/o/:slug` - Publiczny dostęp przez slug (jeśli włączone)

## 🚀 Krok 1: Wykonaj migrację SQL

1. Otwórz **Supabase Dashboard → SQL Editor**
2. Wklej zawartość pliku `supabase_migration_proposal_pdf.sql`
3. Kliknij **"Run"**
4. Sprawdź czy nie ma błędów

### Co robi migracja:

- ✅ Dodaje kolumny `slug` i `pdf_path` do tabeli `proposals`
- ✅ Tworzy funkcję `generate_proposal_slug()` dla automatycznego generowania slug
- ✅ Tworzy funkcję `track_proposal_pdf_event()` dla trackingu wydarzeń
- ✅ Tworzy funkcję `get_proposal_by_slug_and_token()` dla pobierania oferty
- ✅ Tworzy trigger `auto_generate_proposal_slug()` dla automatycznego generowania slug przy tworzeniu oferty

## 📦 Krok 2: Skonfiguruj Supabase Storage

### 2.1. Utwórz bucket "proposals"

1. W **Supabase Dashboard** przejdź do **Storage**
2. Kliknij **"New bucket"**
3. Wypełnij formularz:
   - **Name**: `proposals`
   - **Public bucket**: Zaznacz (jeśli chcesz bezpośredni dostęp) lub pozostaw odznaczone (użyjemy signed URLs)
4. Kliknij **"Create bucket"**

### 2.2. Skonfiguruj RLS dla bucket

Jeśli bucket jest **private** (nie publiczny), dodaj policy:

1. W **Storage → Policies** wybierz bucket `proposals`
2. Kliknij **"New policy"**

#### Policy: SELECT (odczyt PDF)
```sql
CREATE POLICY "Allow public read access to proposals"
ON storage.objects FOR SELECT
USING (bucket_id = 'proposals');
```

#### Policy: INSERT (wgrywanie PDF - tylko admini)
```sql
CREATE POLICY "Allow authenticated admin upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'proposals' 
  AND auth.role() = 'authenticated'
  AND (SELECT is_admin() FROM public.profiles WHERE id = auth.uid())
);
```

#### Policy: UPDATE (aktualizacja PDF - tylko admini)
```sql
CREATE POLICY "Allow authenticated admin update"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'proposals' 
  AND auth.role() = 'authenticated'
  AND (SELECT is_admin() FROM public.profiles WHERE id = auth.uid())
);
```

#### Policy: DELETE (usuwanie PDF - tylko admini)
```sql
CREATE POLICY "Allow authenticated admin delete"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'proposals' 
  AND auth.role() = 'authenticated'
  AND (SELECT is_admin() FROM public.profiles WHERE id = auth.uid())
);
```

**UWAGA**: Jeśli bucket jest **publiczny**, policy SELECT nie jest potrzebna (wszyscy mają dostęp).

## 📝 Krok 3: Jak wgrać PDF do oferty

### Metoda 1: Przez UI (zalecane - do implementacji)

1. Otwórz `/admin/proposals/:id` w aplikacji
2. W sekcji "PDF" kliknij **"Wybierz plik"**
3. Wybierz plik PDF z dysku
4. Kliknij **"Wgraj PDF"**
5. System automatycznie:
   - Wgra plik do `proposals/:slug.pdf`
   - Zaktualizuje `pdf_path` w ofercie
   - Wygeneruje slug (jeśli nie istnieje)

### Metoda 2: Przez Supabase Dashboard

1. W **Supabase Dashboard** przejdź do **Storage → proposals**
2. Kliknij **"Upload file"**
3. Wybierz plik PDF
4. Zapisz nazwę pliku (np. `fibra-2026-01.pdf`)
5. W **SQL Editor** uruchom:
```sql
UPDATE proposals
SET pdf_path = 'fibra-2026-01.pdf'
WHERE id = 'PROPOSAL_ID_HERE';
```

### Metoda 3: Przez SQL (dla istniejących PDF)

```sql
-- Załóżmy, że masz już PDF w storage i chcesz przypisać go do oferty
UPDATE proposals
SET pdf_path = 'nazwa-pliku.pdf'
WHERE id = 'PROPOSAL_ID_HERE';
```

## 🔗 Krok 4: Jak wygenerować link do PDF

### Link bez tokena (publiczny):
```
https://twoja-domena.pl/o/fibra-2026-01
```

### Link z tokenem (bezpieczny):
```
https://twoja-domena.pl/o/fibra-2026-01?token=XYZ-UUID-TOKEN
```

**Jak wygenerować token?**
- Użyj funkcji `generate_proposal_link()` z systemu ofert
- Albo utwórz link ręcznie w panelu admina (do implementacji w UI)

## 📊 Krok 5: Jak sprawdzić tracking

### W Supabase SQL Editor:

```sql
-- Wszystkie wydarzenia dla oferty
SELECT 
  event_type,
  metadata,
  created_at
FROM proposal_tracking_events
WHERE proposal_id = 'PROPOSAL_ID_HERE'
ORDER BY created_at DESC;

-- Statystyki dla oferty
SELECT 
  event_type,
  COUNT(*) as count,
  MIN(created_at) as first_occurrence,
  MAX(created_at) as last_occurrence
FROM proposal_tracking_events
WHERE proposal_id = 'PROPOSAL_ID_HERE'
GROUP BY event_type;
```

### W panelu admina (do implementacji):

1. Otwórz `/admin/proposals/:id`
2. Przejdź do zakładki **"Tracking"**
3. Zobacz listę wydarzeń:
   - `opened_offer_page` - Ile razy otwarto
   - `pdf_loaded` - Ile razy załadowano PDF
   - `download_clicked` - Ile razy pobrano
   - `time_on_page` - Średni czas na stronie
   - `scroll_depth` - Średnia głębokość przewinięcia

## 🎯 Co mierzysz

1. **Otwarcie strony** (`opened_offer_page`) - Klient otworzył link
2. **Załadowanie PDF** (`pdf_loaded`) - PDF został załadowany w przeglądarce
3. **Pobranie PDF** (`download_clicked`) - Klient kliknął "Pobierz PDF"
4. **Czas na stronie** (`time_on_page`) - Jak długo klient był na stronie (proxy za "czytał")
5. **Przewijanie** (`scroll_depth`) - Jak daleko klient przewinął (proxy za "czytał")

## 📝 Przykładowy workflow

1. **Admin tworzy ofertę:**
   - `/admin/proposals/new`
   - Tytuł: "Oferta współpracy – Grupa Fibra"
   - Slug automatycznie: `oferta-wspolpracy-grupa-fibra-2026-01`
   - Wgraj PDF: `oferta-wspolpracy-grupa-fibra-2026-01.pdf`

2. **Admin generuje link:**
   - Kliknij "Generuj link" w edytorze oferty
   - System zwraca: `https://twoja-domena.pl/o/oferta-wspolpracy-grupa-fibra-2026-01?token=xyz`

3. **Admin wysyła link klientowi:**
   - Email: "Oferta do wglądu: https://..."

4. **Klient otwiera link:**
   - Tracking: `opened_offer_page` ✅
   - PDF się ładuje w embedzie
   - Tracking: `pdf_loaded` ✅
   - Klient czyta PDF (przewija, spędza czas)
   - Tracking: `time_on_page`, `scroll_depth` ✅

5. **Klient pobiera PDF:**
   - Kliknięcie "Pobierz PDF"
   - Tracking: `download_clicked` ✅

6. **Admin sprawdza tracking:**
   - `/admin/proposals/:id` → zakładka "Tracking"
   - Widzi wszystkie wydarzenia i statystyki

## 🔒 Bezpieczeństwo

- **Token** (opcjonalny) - Wymaga tokena dla dostępu (bezpieczny link)
- **Slug** - Czytelny URL, ale niezgadywalny (random slug jeśli nie podasz)
- **RLS** - Row Level Security w Supabase Storage (tylko admini mogą wgrywać)
- **Signed URLs** - Dla private bucket (URL wygasa po określonym czasie)

## ⚠️ Uwagi

1. **Slug musi być unikalny** - System automatycznie generuje unikalny slug, ale możesz go zmienić ręcznie
2. **PDF path musi wskazywać na istniejący plik** - Upewnij się, że plik istnieje w storage przed przypisaniem
3. **Tracking działa nawet jeśli klient pobierze PDF** - Tracking jest na stronie, nie w PDF
4. **Czas na stronie** jest przybliżony - Mierzony co sekundę, zapisywany co 10 sekund

## 🐛 Rozwiązywanie problemów

### Problem: PDF nie ładuje się

**Sprawdź:**
1. Czy `pdf_path` jest ustawiony w ofercie
2. Czy plik istnieje w storage (`proposals` bucket)
3. Czy bucket jest publiczny lub masz policy SELECT
4. Czy URL jest poprawny (sprawdź w konsoli przeglądarki)

### Problem: Tracking nie działa

**Sprawdź:**
1. Czy funkcja `track_proposal_pdf_event` istnieje (sprawdź w SQL Editor)
2. Czy token jest poprawny (jeśli używany)
3. Czy `proposal_tracking_events` tabela istnieje
4. Sprawdź console przeglądarki (F12) - czy są błędy

### Problem: Nie mogę wgrać PDF

**Sprawdź:**
1. Czy jesteś zalogowany jako admin
2. Czy bucket `proposals` istnieje
3. Czy masz policy INSERT dla bucket
4. Czy funkcja `is_admin()` zwraca `true` dla Twojego użytkownika

## 📚 Następne kroki (opcjonalne)

1. **UI do wgrywania PDF** - Dodaj komponent upload w `ProposalEditor`
2. **Panel trackingu** - Dodaj zakładkę "Tracking" w `ProposalEditor`
3. **Eksport raportów** - Eksportuj statystyki do CSV/PDF
4. **Email powiadomienia** - Powiadomienia przy otwarciu/pobraniu PDF
5. **Analytics dashboard** - Wizualizacja statystyk dla wszystkich ofert
