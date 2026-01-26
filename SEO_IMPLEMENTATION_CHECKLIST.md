# SEO Implementation - Checklista i Testy

## ✅ Zrealizowane zmiany

### 1. Sitemap.xml
- ✅ **Lokalizacja**: `/sitemap.xml` (publiczny URL)
- ✅ **Endpoint**: `/api/sitemap.ts` (wewnętrzny)
- ✅ **Konfiguracja**: Rewrite w `vercel.json`
- ✅ **Zawartość**: 
  - Wszystkie statyczne strony (9 stron)
  - Wszystkie opublikowane posty bloga (dynamicznie)
  - `lastmod` dla każdego URL
- ✅ **Cache**: `s-maxage=3600, stale-while-revalidate=86400`

### 2. robots.txt
- ✅ **Lokalizacja**: `/public/robots.txt`
- ✅ **Zawartość**: Minimalna, bez "etc."
  - Blokuje tylko istniejące ścieżki: `/api/`, `/admin/`, `/panel/`, `/login`, `/profile`, `/p/`, `/o/`
  - Zawiera: `Sitemap: https://drozniak.pl/sitemap.xml`

### 3. Przekierowania 301
- ✅ **Canonical host**: `https://drozniak.pl` (bez www, bez trailing slash)
- ✅ **Redirects w vercel.json**:
  - `http://*` → `https://drozniak.pl/*` (301)
  - `www.drozniak.pl/*` → `https://drozniak.pl/*` (301)
  - `/*/` (trailing slash) → `https://drozniak.pl/*` (301)

### 4. Meta/OG/Schema na wszystkich stronach
- ✅ **MainPage** (`/`): useSEO z pełnymi meta + OG + Twitter
- ✅ **AIStrategyPage** (`/system`): useSEO z pełnymi meta + OG + Twitter
- ✅ **StronyWWWPage** (`/strony-www`): useSEO z pełnymi meta + OG + Twitter
- ✅ **SzkoleniaPage** (`/szkolenia`): useSEO z pełnymi meta + OG + Twitter
- ✅ **BlogList** (`/blog`): useSEO z pełnymi meta + OG + Twitter
- ✅ **BlogPost** (`/blog/:slug`): Pełne SEO (meta, OG, Twitter, Schema)

### 5. Schema.org JSON-LD
- ✅ **Organization**: Globalnie (SchemaMarkup)
- ✅ **Person**: Globalnie (SchemaMarkup)
- ✅ **Service**: Globalnie (SchemaMarkup)
- ✅ **WebSite**: Globalnie (SchemaMarkup) - z SearchAction
- ✅ **BlogPosting**: Per post (headline, datePublished, dateModified, author z sameAs, publisher, image, mainEntityOfPage)
- ✅ **BreadcrumbList**: Per post (Home → Blog → {tytuł})

### 6. Noindex dla staging/preview
- ✅ **Komponent**: `SEOHead.tsx`
- ✅ **Logika**: Sprawdza `VERCEL_ENV !== 'production'`
- ✅ **Dodaje**: `<meta name="robots" content="noindex, nofollow">` dla non-production

---

## 📋 Checklista testów

### Test 1: Sitemap.xml
```bash
curl -I https://drozniak.pl/sitemap.xml
```
**Oczekiwany wynik:**
- Status: `200 OK`
- Content-Type: `application/xml`
- Cache-Control: `public, s-maxage=3600, stale-while-revalidate=86400`

### Test 2: robots.txt
```bash
curl -I https://drozniak.pl/robots.txt
```
**Oczekiwany wynik:**
- Status: `200 OK`
- Content-Type: `text/plain`
- Zawartość zawiera: `Sitemap: https://drozniak.pl/sitemap.xml`

### Test 3: Redirects
```bash
# HTTP → HTTPS
curl -I http://drozniak.pl/
# Oczekiwany: 301 → https://drozniak.pl/

# WWW → non-WWW
curl -I https://www.drozniak.pl/
# Oczekiwany: 301 → https://drozniak.pl/

# Trailing slash
curl -I https://drozniak.pl/blog/
# Oczekiwany: 301 → https://drozniak.pl/blog
```

### Test 4: View-source (3 podstrony + 1 blogpost)
Sprawdź w view-source następujące strony:

#### a) Strona główna (`/`)
- ✅ `<title>`: "System pozyskiwania klientów i strony WWW dla małych firm | Stanisław Drożniak"
- ✅ `<meta name="description">`: obecny
- ✅ `<link rel="canonical">`: `https://drozniak.pl`
- ✅ `<meta property="og:title">`: obecny
- ✅ `<meta property="og:description">`: obecny
- ✅ `<meta property="og:image">`: obecny
- ✅ `<meta property="og:type">`: `website`
- ✅ `<meta name="twitter:card">`: `summary_large_image`
- ✅ JSON-LD: Organization, Person, Service, WebSite

#### b) `/system`
- ✅ `<title>`: "System pozyskiwania klientów dla małych firm i freelancerów | Stanisław Drożniak"
- ✅ `<meta name="description">`: obecny
- ✅ `<link rel="canonical">`: `https://drozniak.pl/system`
- ✅ OG tags: obecne
- ✅ Twitter tags: obecne

#### c) `/strony-www`
- ✅ `<title>`: "Strony internetowe dla małych firm i freelancerów | Stanisław Drożniak"
- ✅ `<meta name="description">`: obecny
- ✅ `<link rel="canonical">`: `https://drozniak.pl/strony-www`
- ✅ OG tags: obecne
- ✅ Twitter tags: obecne

#### d) `/blog/:slug` (przykładowy post)
- ✅ `<title>`: z meta_title lub title
- ✅ `<meta name="description">`: z meta_description lub excerpt
- ✅ `<link rel="canonical">`: `https://drozniak.pl/blog/{slug}`
- ✅ `<meta property="og:type">`: `article`
- ✅ `<meta property="article:published_time">`: obecny
- ✅ `<meta property="article:modified_time">`: obecny
- ✅ JSON-LD: BlogPosting (z headline, datePublished, dateModified, author z sameAs, publisher, image, mainEntityOfPage)
- ✅ JSON-LD: BreadcrumbList (Home → Blog → {tytuł})

---

## 📁 Lista zmienionych plików

1. **`public/robots.txt`** - Utworzony/zmieniony
2. **`api/sitemap.ts`** - Utworzony
3. **`vercel.json`** - Dodano redirects i headers
4. **`hooks/useSEO.ts`** - Rozszerzony (OG, Twitter, canonical, article tags)
5. **`components/SEOHead.tsx`** - Utworzony (noindex dla staging)
6. **`components/SchemaMarkup.tsx`** - Rozszerzony (WebSite schema)
7. **`components/blog/BlogPost.tsx`** - Rozszerzony (pełne OG, Twitter, Schema BlogPosting + BreadcrumbList)
8. **`components/blog/BlogList.tsx`** - Dodano useSEO
9. **`components/MainPage.tsx`** - Dodano ogImage, canonical
10. **`components/AIStrategyPage.tsx`** - Dodano ogImage, canonical
11. **`components/StronyWWWPage.tsx`** - Dodano ogImage, canonical
12. **`components/SzkoleniaPage.tsx`** - Dodano ogImage, canonical
13. **`App.tsx`** - Dodano SEOHead component
14. **`INSERT_FIRST_BLOG_POST.sql`** - Zaktualizowano meta_description

---

## 🔗 Finalne URL-e

- **Sitemap**: `https://drozniak.pl/sitemap.xml`
- **Robots**: `https://drozniak.pl/robots.txt`
- **Canonical host**: `https://drozniak.pl` (bez www, bez trailing slash)

---

## ⚠️ Uwagi

1. **Noindex dla staging**: Działa automatycznie przez `SEOHead` - sprawdza `VERCEL_ENV !== 'production'`
2. **Canonical URLs**: Automatycznie usuwają parametry i trailing slash przez `useSEO` hook
3. **Sitemap**: Generuje się dynamicznie z bazy danych (pobiera posty z Supabase)
4. **OG Images**: Wszystkie strony używają `/images/Drozniak_Zdjecie_Suit_2.webp` jako domyślnego OG image

---

## 🧪 Testy do wykonania po deploy

1. ✅ `curl -I https://drozniak.pl/sitemap.xml` → 200 + application/xml
2. ✅ `curl -I https://drozniak.pl/robots.txt` → 200 + zawiera Sitemap URL
3. ✅ `curl -I http://drozniak.pl/` → 301 → https://drozniak.pl/
4. ✅ `curl -I https://www.drozniak.pl/` → 301 → https://drozniak.pl/
5. ✅ `curl -I https://drozniak.pl/blog/` → 301 → https://drozniak.pl/blog
6. ✅ View-source `/` → title, description, canonical, OG, Twitter, JSON-LD
7. ✅ View-source `/system` → title, description, canonical, OG, Twitter
8. ✅ View-source `/strony-www` → title, description, canonical, OG, Twitter
9. ✅ View-source `/blog/:slug` → title, description, canonical, OG article, Twitter, BlogPosting schema, BreadcrumbList
