# Architektura Projektu - Analiza dla Migracji SSR/SSG

**Data analizy:** 2026-01-25  
**Cel:** Ocena trudności migracji na Next.js (SSR/SSG) lub Astro (SSG)

---

## 1. Stack i Runtime

### 1.1 Typ Aplikacji
- **Vite SPA** (Single Page Application)
- **React 19.1.1** z **React DOM 19.1.1**
- **TypeScript 5.8.2**
- **Tailwind CSS 3.4.18** + **PostCSS**
- **React Router DOM 7.9.3** (client-side routing)

### 1.2 Entrypoint i Routing

**Entrypoint:**
- `index.html` → `<div id="root"></div>` + `<script type="module" src="/index.tsx"></script>`
- `index.tsx` → renderuje `<App />` do `#root` przez `ReactDOM.createRoot()`

**Routing:**
- **Lokalizacja:** `App.tsx` (linie 2-209)
- **Router:** `BrowserRouter` z `react-router-dom`
- **Struktura routingu:** Warunkowa w zależności od subdomeny:
  - **Subdomena `panel.drozniak.pl`:** routing panelu (login, admin, client panel)
  - **Główna domena `drozniak.pl`:** routing publiczny (strony marketingowe, blog)

**Kluczowe komponenty routingu:**
- `AppContent` - warunkowo renderuje Header/Footer/SEO w zależności od ścieżki
- `ProtectedRoute` - wrapper dla chronionych tras
- Lazy loading dla `FunnelBuilder` (React Flow - duży bundle)

### 1.3 Główne Strony i Komponenty

**Publiczne strony marketingowe:**
1. `/` → `MainPage.tsx` - strona główna
2. `/system` → `AIStrategyPage.tsx` - system pozyskiwania klientów
3. `/strony-www` → `StronyWWWPage.tsx` - oferta stron WWW
4. `/szkolenia` → `SzkoleniaPage.tsx` - szkolenia z AI
5. `/kontakt` → `ContactPage.tsx` - formularz kontaktowy
6. `/polityka-prywatnosci` → `PrivacyPolicy.tsx` - statyczna strona
7. `/freelancer` → `FreelancerLanding.tsx` - landing page dla freelancerów
8. `/portfolio-redlin` → `PortfolioRedlin.tsx` - case study
9. `/portfolio-pasw` → `PortfolioPasw.tsx` - case study
10. `/doradztwo-hotel-irys` → `DoradztwoHotelIrys.tsx` - case study
11. `/doradztwo-zef` → `DoradztwoZef.tsx` - case study

**Blog:**
12. `/blog` → `BlogList.tsx` - lista postów
13. `/blog/kategoria/:categorySlug` → `BlogList.tsx` - lista z filtrem kategorii
14. `/blog/:slug` → `BlogPost.tsx` - pojedynczy post

**Panel użytkownika (chronione):**
15. `/login` → `LoginPage.tsx`
16. `/panel/*` → `ClientPanel.tsx` - panel klienta
17. `/admin` → `AdminPanel.tsx` - panel admina
18. `/profile` → `UserProfile.tsx` - profil użytkownika
19. `/panel/marketing/:id` → `FunnelBuilder.tsx` (lazy) - edytor lejków
20. `/panel/courses/:courseId` → `TrainingPage.tsx` - kursy szkoleniowe

**Publiczne linki:**
21. `/p/:token` → `PublicProposalView.tsx` - publiczny widok oferty
22. `/o/:slug` → `PDFProposalView.tsx` - widok PDF oferty

### 1.4 Layouty i Moduły

**Brak dedykowanych layoutów** - każda strona jest niezależnym komponentem.

**Wspólne komponenty:**
- `Header.tsx` - nawigacja (renderowany warunkowo w `AppContent`)
- `Footer.tsx` - stopka (renderowany warunkowo)
- `SEOHead.tsx` - globalny SEO (noindex dla preview)
- `SchemaMarkup.tsx` - globalny Schema.org JSON-LD
- `StickyCTA.tsx` - sticky CTA button
- `CookieConsent.tsx` - zgoda na cookies
- `ScrollToTop.tsx` - scroll do góry przy zmianie route
- `ScrollToTopButton.tsx` - przycisk scroll to top
- `ErrorBoundary.tsx` - error boundary dla całej aplikacji

**Moduły:**
- `components/blog/` - system bloga (BlogList, BlogPost)
- `components/icons/` - ikony SVG
- `hooks/` - custom hooks (useSEO, useBlogPosts, useBlogPost, useAuth, etc.)

---

## 2. Mapa Stron i URL

### 2.1 Statyczne Strony (Hardcoded Content)

| URL | Komponent | SEO | Treść |
|-----|-----------|-----|-------|
| `/` | `MainPage.tsx` | ✅ useSEO | Statyczna (hardcoded) |
| `/system` | `AIStrategyPage.tsx` | ✅ useSEO | Statyczna (hardcoded) |
| `/strony-www` | `StronyWWWPage.tsx` | ✅ useSEO | Statyczna + formularz |
| `/szkolenia` | `SzkoleniaPage.tsx` | ✅ useSEO | Statyczna (hardcoded) |
| `/kontakt` | `ContactPage.tsx` | ✅ useSEO | Statyczna + formularz |
| `/polityka-prywatnosci` | `PrivacyPolicy.tsx` | ❌ Brak useSEO | Statyczna (hardcoded) |
| `/freelancer` | `FreelancerLanding.tsx` | ❌ Brak useSEO | Statyczna (hardcoded) |
| `/portfolio-redlin` | `PortfolioRedlin.tsx` | ✅ useSEO | Statyczna (hardcoded) |
| `/portfolio-pasw` | `PortfolioPasw.tsx` | ✅ useSEO | Statyczna (hardcoded) |
| `/doradztwo-hotel-irys` | `DoradztwoHotelIrys.tsx` | ✅ useSEO | Statyczna (hardcoded) |
| `/doradztwo-zef` | `DoradztwoZef.tsx` | ✅ useSEO | Statyczna (hardcoded) |

### 2.2 Blog (Dynamic Content z Supabase)

| URL | Komponent | SEO | Treść |
|-----|-----------|-----|-------|
| `/blog` | `BlogList.tsx` | ✅ useSEO | Dynamiczna (Supabase) |
| `/blog/kategoria/:categorySlug` | `BlogList.tsx` | ✅ useSEO | Dynamiczna (Supabase) |
| `/blog/:slug` | `BlogPost.tsx` | ✅ Dynamic SEO (useEffect) | Dynamiczna (Supabase) |

**Szczegóły SEO dla bloga:**
- `BlogList.tsx` - używa `useSEO` z hardcoded meta
- `BlogPost.tsx` - **NIE używa `useSEO`**, zamiast tego:
  - `useEffect` bezpośrednio manipuluje `document.title`
  - `useEffect` bezpośrednio manipuluje meta tags przez `document.querySelector`
  - `useEffect` dodaje Schema.org JSON-LD (BlogPosting, BreadcrumbList)
  - `useEffect` dodaje preload link dla hero image

### 2.3 Panel i Admin (Chronione, Client-Side Only)

| URL | Komponent | SEO | Treść |
|-----|-----------|-----|-------|
| `/login` | `LoginPage.tsx` | ❌ | Client-side auth |
| `/panel/*` | `ClientPanel.tsx` | ❌ | Client-side dashboard |
| `/admin` | `AdminPanel.tsx` | ❌ | Client-side admin |
| `/profile` | `UserProfile.tsx` | ❌ | Client-side profile |
| `/panel/marketing/:id` | `FunnelBuilder.tsx` | ❌ | Client-side editor (React Flow) |
| `/panel/courses/:courseId` | `TrainingPage.tsx` | ❌ | Client-side course |

### 2.4 Publiczne Linki (Dynamiczne)

| URL | Komponent | SEO | Treść |
|-----|-----------|-----|-------|
| `/p/:token` | `PublicProposalView.tsx` | ❌ | Dynamiczna (Supabase) |
| `/o/:slug` | `PDFProposalView.tsx` | ❌ | Dynamiczna (Supabase) |

---

## 3. Dane i Supabase

### 3.1 Tabele Supabase (Główne)

**Blog:**
- `blog_posts` - posty bloga (JSONB content, slug, SEO fields)
- `blog_categories` - kategorie bloga

**Użytkownicy i Autoryzacja:**
- `auth.users` - użytkownicy Supabase Auth
- `profiles` - rozszerzone profile użytkowników
- `panel_clients` - klienci panelu
- `user_courses` - przypisania kursów do użytkowników

**Kursy:**
- `courses` - definicje kursów
- `training_progress` - postęp w kursach
- `training_responses` - odpowiedzi w kursach
- `module_unlocks` - odblokowane moduły
- `course_certificates` - certyfikaty

**Marketing Funnels:**
- `marketing_funnels` - definicje lejków
- `funnel_diagrams` - diagramy lejków (React Flow nodes/edges)
- `funnel_nodes` - węzły diagramów
- `funnel_edges` - krawędzie diagramów
- `funnel_comments` - komentarze w lejkach

**Oferty (Proposals):**
- `proposals` - oferty
- `proposal_versions` - wersje ofert
- `proposal_access_links` - publiczne linki do ofert
- `proposal_acceptances` - akceptacje ofert
- `proposal_tracking_events` - eventy trackingowe

**Dokumenty:**
- `client_documents` - dokumenty klientów
- `client_view_grants` - uprawnienia do widoków

**Inne:**
- `marketing_clients` - klienci marketingowi (bez konta w panelu)

### 3.2 API Routes (Vercel Serverless Functions)

**Lokalizacja:** `api/` (pliki TypeScript)

1. **`api/sitemap.ts`**
   - **Endpoint:** `/sitemap.xml` (rewrite w `vercel.json`)
   - **Metoda:** GET
   - **Funkcja:** Generuje XML sitemap z:
     - Statycznych stron (hardcoded lista)
     - Dynamicznych postów bloga (pobiera z Supabase `blog_posts`)
   - **Cache:** `s-maxage=3600, stale-while-revalidate=86400`
   - **Env vars:** `VITE_SUPABASE_URL` lub `SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` lub `SUPABASE_ANON_KEY`

2. **`api/contact.ts`**
   - **Endpoint:** `/api/contact`
   - **Metoda:** POST
   - **Funkcja:** Wysyła email przez Resend API (formularz kontaktowy)
   - **Env vars:** `RESEND_API_KEY`

3. **`api/strony-www.ts`**
   - **Endpoint:** `/api/strony-www`
   - **Metoda:** POST
   - **Funkcja:** Wysyła email przez Resend API (formularz zapytania o stronę WWW)
   - **Env vars:** `RESEND_API_KEY`

4. **`api/doradztwo-email.ts`**
   - **Endpoint:** `/api/doradztwo-email`
   - **Metoda:** POST
   - **Funkcja:** Wysyła email przez Resend API
   - **Env vars:** `RESEND_API_KEY`

5. **`api/course-completion-email.ts`**
   - **Endpoint:** `/api/course-completion-email`
   - **Metoda:** POST
   - **Funkcja:** Wysyła email przez Resend API (ukończenie kursu)
   - **Env vars:** `RESEND_API_KEY`

### 3.3 Pobieranie Danych

**Client-Side Fetch:**
- **Wszystkie dane** są pobierane po stronie klienta przez Supabase Client SDK
- **Hooks:**
  - `useBlogPosts()` - pobiera listę postów (Supabase query)
  - `useBlogPost(slug)` - pobiera pojedynczy post (Supabase query)
  - `useAuth()` - zarządza autoryzacją (Supabase Auth)
  - `useClientPanel()` - dane panelu klienta
  - `useCourse()` - dane kursu
  - `useUserCourses()` - kursy użytkownika

**Build Time:**
- ❌ **Brak** - wszystko jest client-side

**Serverless Functions:**
- Tylko dla emaili (Resend API) i sitemap (generowanie XML)

### 3.4 Environment Variables

**Lokalnie (`.env.local`):**
- `VITE_SUPABASE_URL` - URL projektu Supabase
- `VITE_SUPABASE_ANON_KEY` - anon key Supabase
- `GEMINI_API_KEY` - API key dla Gemini (używane w `vite.config.ts`)

**Na Vercel:**
- `VITE_SUPABASE_URL` - URL projektu Supabase
- `VITE_SUPABASE_ANON_KEY` - anon key Supabase
- `SUPABASE_URL` - alternatywna nazwa (używana w API routes)
- `SUPABASE_ANON_KEY` - alternatywna nazwa (używana w API routes)
- `RESEND_API_KEY` - API key dla Resend (email service)
- `GEMINI_API_KEY` - API key dla Gemini

**Uwaga:** Vite wymaga prefiksu `VITE_` dla zmiennych dostępnych w kodzie klienta. W API routes (serverless) można używać `process.env` bez prefiksu.

### 3.5 Operacje Supabase

**Anon Key - tylko do odczytu?**
- ❌ **NIE** - anon key jest używany również do zapisu:
  - **Autoryzacja:** Supabase Auth (login, signup) - używa anon key
  - **Formularze:** Blog posts (tworzenie/edycja przez admina) - używa anon key + RLS
  - **Panel klienta:** Wszystkie operacje CRUD w panelu - używa anon key + RLS
  - **Kursy:** Zapisywanie postępu, odpowiedzi - używa anon key + RLS
  - **Lejki marketingowe:** Tworzenie/edycja lejków - używa anon key + RLS
  - **Oferty:** Tworzenie/edycja ofert - używa anon key + RLS

**RLS (Row Level Security):**
- Wszystkie tabele mają włączone RLS
- Polityki RLS kontrolują dostęp na podstawie:
  - `auth.uid()` - ID zalogowanego użytkownika
  - `is_admin()` - funkcja sprawdzająca czy użytkownik jest adminem
  - Statusy (np. `status = 'published'` dla bloga)

---

## 4. SQL i Migracje

### 4.1 Pliki SQL w Repo

**Migracje główne:**
- `supabase_migration_blog_system.sql` - system bloga (blog_posts, blog_categories)
- `supabase_migration_proposal_system.sql` - system ofert
- `supabase_migration_marketing_funnels.sql` - system lejków marketingowych
- `supabase_migration_multi_course.sql` - system wielokursowy
- `supabase_migration_course_completion.sql` - ukończenie kursów
- `supabase_migration_profiles.sql` - profile użytkowników
- `supabase_migration_client_panel_views.sql` - widoki panelu klienta
- `supabase_migration_comment_system.sql` - system komentarzy
- `supabase_migration_custom_node_templates.sql` - szablony węzłów
- `supabase_migration_admin_fix.sql` - poprawki admina
- `supabase_migration_rls_fix.sql` - poprawki RLS
- `supabase_migration_v2.sql` - migracja v2

**Pliki pomocnicze/seed:**
- `INSERT_FIRST_BLOG_POST.sql` - przykładowy post bloga (1260 linii!)
- `CREATE_ZEF_PROPOSAL.sql` - przykładowa oferta
- `EXAMPLE_PROPOSAL.sql` - przykład oferty
- `CHECK_WHICH_COURSE.sql` - query sprawdzające
- `VERIFY_MIGRATION.sql` - weryfikacja migracji

**Brak konwencji migracji:**
- ❌ Brak numerowanych migracji (np. `001_`, `002_`)
- ❌ Brak systemu wersjonowania migracji
- ❌ Migracje są wykonywane ręcznie w Supabase Dashboard → SQL Editor

### 4.2 Proces Dodawania Nowego Wpisu na Bloga

**Krok po kroku:**

1. **Admin loguje się** przez `/login` (Supabase Auth)

2. **Admin wchodzi do panelu** `/admin` (lub przez subdomenę `panel.drozniak.pl`)

3. **Admin tworzy nowy post:**
   - **Lokalizacja edytora:** Prawdopodobnie w `AdminPanel.tsx` (nie sprawdzałem szczegółów)
   - **Struktura treści:** JSONB z blokami (`{"blocks": [...]}`)
   - **Typy bloków:** `text`, `image`, `quote`, `code`, `video`, `cta`, `custom`, `highlight`, `separator`, `heading`, `numbered-section`

4. **Zapis do bazy:**
   - INSERT/UPDATE do `blog_posts` przez Supabase Client SDK
   - Używa anon key + RLS (policy: `is_admin()` lub `auth.uid() = author_id`)

5. **Publikacja:**
   - Ustawienie `status = 'published'`
   - Ustawienie `published_at = NOW()`
   - Po publikacji post jest widoczny na `/blog` i `/blog/:slug`

6. **SEO:**
   - `meta_title`, `meta_description`, `meta_keywords` - zapisywane w bazie
   - `og_image_url` - opcjonalne
   - `slug` - unikalny slug dla URL

**Uwaga:** Nie widziałem implementacji edytora bloga w kodzie - prawdopodobnie jest w `AdminPanel.tsx` lub nie został jeszcze zaimplementowany (może być dodawany ręcznie przez SQL).

---

## 5. SEO i Indeksacja

### 5.1 Sitemap

**Lokalizacja:** `api/sitemap.ts`

**Generowanie:**
- **Serverless function** na Vercel
- **Endpoint:** `/sitemap.xml` (rewrite w `vercel.json`)
- **Metoda:** GET
- **Zawartość:**
  - Statyczne strony (hardcoded lista w kodzie)
  - Dynamiczne posty bloga (pobiera z Supabase `blog_posts` gdzie `status = 'published'`)
- **Format:** XML zgodny z sitemap.org
- **Cache:** `s-maxage=3600, stale-while-revalidate=86400`

**Statyczne strony w sitemap:**
```typescript
const staticPages = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: '/system', priority: '0.9', changefreq: 'monthly' },
  { path: '/strony-www', priority: '0.9', changefreq: 'monthly' },
  { path: '/szkolenia', priority: '0.8', changefreq: 'monthly' },
  { path: '/kontakt', priority: '0.7', changefreq: 'monthly' },
  { path: '/polityka-prywatnosci', priority: '0.3', changefreq: 'yearly' },
  { path: '/portfolio-redlin', priority: '0.7', changefreq: 'yearly' },
  { path: '/portfolio-pasw', priority: '0.7', changefreq: 'yearly' },
  { path: '/blog', priority: '0.9', changefreq: 'weekly' },
];
```

### 5.2 Robots.txt

**Lokalizacja:** `public/robots.txt`

**Zawartość:**
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /panel/
Disallow: /login
Disallow: /profile
Disallow: /p/
Disallow: /o/

Sitemap: https://drozniak.pl/sitemap.xml
```

**Blokuje:**
- `/api/` - API routes
- `/admin/` - panel admina
- `/panel/` - panel klienta
- `/login` - strona logowania
- `/profile` - profil użytkownika
- `/p/` - publiczne linki do ofert
- `/o/` - linki do PDF ofert

### 5.3 Redirecty w vercel.json

**Lokalizacja:** `vercel.json`

**Redirecty:**
1. **HTTP → HTTPS:**
   ```json
   {
     "source": "/:path*",
     "has": [{"type": "header", "key": "x-forwarded-proto", "value": "http"}],
     "destination": "https://drozniak.pl/:path*",
     "permanent": true
   }
   ```

2. **www → non-www:**
   ```json
   {
     "source": "/:path*",
     "has": [{"type": "host", "value": "www.drozniak.pl"}],
     "destination": "https://drozniak.pl/:path*",
     "permanent": true
   }
   ```

3. **Trailing slash → bez trailing slash:**
   ```json
   {
     "source": "/:path+/",
     "destination": "https://drozniak.pl/:path",
     "permanent": true
   }
   ```

**Rewrites:**
1. **API routes:**
   ```json
   {
     "source": "/api/:path*",
     "destination": "/api/:path*"
   }
   ```

2. **Sitemap:**
   ```json
   {
     "source": "/sitemap.xml",
     "destination": "/api/sitemap"
   }
   ```

3. **SPA fallback:**
   ```json
   {
     "source": "/(.*)",
     "destination": "/index.html"
   }
   ```

### 5.4 Schema.org (Structured Data)

**Lokalizacja:** `components/SchemaMarkup.tsx`

**Globalne schematy (dodawane na każdej stronie publicznej):**
- **Organization** - dane organizacji
- **Person** - dane osoby (Stanisław Drożniak)
- **WebSite** - dane strony (z SearchAction)
- **Service** - usługi oferowane

**Dodawanie:**
- `useEffect` w `SchemaMarkup.tsx` dodaje `<script type="application/ld+json">` do `<head>`
- Uruchamiane przy każdej zmianie `location.pathname`

**Dla bloga:**
- **BlogPosting** - dodawany w `BlogPost.tsx` przez `useEffect`
- **BreadcrumbList** - dodawany w `BlogPost.tsx` przez `useEffect`
- **Nie używa `SchemaMarkup.tsx`** - własna implementacja w `BlogPost.tsx`

### 5.5 HTML w View-Source (Krytyczne dla SEO)

**Aktualny stan:**
- ❌ **View-source zawiera TYLKO:**
  - `<div id="root"></div>` (pusty)
  - `<script src="/index.tsx"></script>`
  - Podstawowe meta tags z `index.html` (tylko domyślne)
- ❌ **Brak treści strony w HTML**
- ❌ **Brak dynamicznych meta tags w HTML**
- ❌ **Brak Schema.org w HTML** (dodawane przez JS)

**Co to oznacza:**
- Googlebot widzi pustą stronę podczas pierwszego crawl
- Meta tags są dodawane przez JavaScript (może być za późno dla crawlerów)
- Schema.org jest dodawane przez JavaScript (może nie być zindeksowane)
- **To jest główny problem dla SEO** - crawlerzy mogą nie widzieć treści

**Przykład:**
```html
<!-- View-source dla /blog/jakiś-post -->
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>System pozyskiwania klientów i strony WWW dla małych firm | Stanisław Drożniak</title>
  <!-- Tylko domyślne meta z index.html -->
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/index.tsx"></script>
</body>
</html>
```

**Brak:**
- Tytułu posta
- Meta description posta
- Open Graph tags
- Schema.org JSON-LD
- Treści posta

---

## 6. Build, Deploy i Hosting

### 6.1 Build na Vercel

**Build command:** `vite build` (domyślnie z `package.json`)

**Output directory:** `dist/` (domyślnie dla Vite)

**Build process:**
1. Vite buduje SPA do `dist/`
2. Vercel deployuje `dist/` jako statyczne pliki
3. Wszystkie requesty (oprócz `/api/*`) są przekierowywane do `index.html` (SPA fallback)

**Serverless Functions:**
- Pliki w `api/` są automatycznie konwertowane na Vercel Serverless Functions
- Każdy plik `.ts` w `api/` staje się endpointem `/api/[nazwa-pliku]`

### 6.2 Serverless Functions

**Lokalizacja:** `api/`

**Funkcje:**
1. `sitemap.ts` → `/api/sitemap` (używany przez rewrite `/sitemap.xml`)
2. `contact.ts` → `/api/contact`
3. `strony-www.ts` → `/api/strony-www`
4. `doradztwo-email.ts` → `/api/doradztwo-email`
5. `course-completion-email.ts` → `/api/course-completion-email`

**Runtime:** Node.js (Vercel)

### 6.3 Problemy z SSR (window, document, localStorage)

**Miejsca używające `window`:**
- `App.tsx:63` - `window.location.hostname` (sprawdzanie subdomeny)
- `App.tsx:173` - `window.scrollY` (scroll handler)
- `App.tsx:166` - `localStorage.getItem('cookieConsent')`
- `useSEO.ts:92` - `window.location.href` (canonical URL)
- `SchemaMarkup.tsx` - `document.head.appendChild()` (dodawanie schematów)
- `BlogPost.tsx:324` - `window.scrollTo(0, 0)`
- `BlogPost.tsx:335-413` - `document.title`, `document.querySelector()`, `document.head.appendChild()` (SEO)
- `ContactPage.tsx:17` - `window.scrollTo(0, 0)`
- `SzkoleniaPage.tsx:19` - `window.scrollTo(0, 0)`
- `Header.tsx` - prawdopodobnie używa `window` (nie sprawdzałem)
- `CookieConsent.tsx` - `localStorage.setItem()`
- `ScrollToTop.tsx` - `window.scrollY`
- `ScrollToTopButton.tsx` - `window.scrollY`
- `StickyCTA.tsx` - prawdopodobnie używa `window` (nie sprawdzałem)

**Miejsca używające `document`:**
- `useSEO.ts` - cały hook manipuluje `document.head`
- `SchemaMarkup.tsx` - dodaje `<script>` do `document.head`
- `BlogPost.tsx` - manipuluje `document.title`, `document.head`
- `SEOHead.tsx` - manipuluje `document.head` (noindex)

**Miejsca używające `localStorage`:**
- `App.tsx:166` - `localStorage.getItem('cookieConsent')`
- `CookieConsent.tsx` - `localStorage.setItem()`

**Wszystkie te miejsca będą wymagały:**
- Sprawdzenia `typeof window !== 'undefined'` przed użyciem
- Lub przeniesienia do `useEffect` (już jest w większości przypadków)
- Lub użycia SSR-safe alternatyw (np. `useRouter` w Next.js)

---

## 7. Ryzyka Migracji

### 7.1 Elementy Utrudniające Migrację na Next.js (SSR/SSG)

**Wysokie ryzyko:**

1. **React Router DOM → Next.js Router**
   - ❌ Inny system routingu (file-based vs component-based)
   - ❌ Warunkowy routing w zależności od subdomeny (trudne w Next.js)
   - ❌ Lazy loading komponentów (trzeba przenieść na `next/dynamic`)
   - **Złożoność:** Wysoka

2. **Client-Side Data Fetching → Server-Side**
   - ❌ Wszystkie dane są pobierane przez Supabase Client SDK po stronie klienta
   - ❌ Hooks (`useBlogPosts`, `useBlogPost`) używają `useEffect` + Supabase Client
   - ❌ Trzeba przenieść na `getServerSideProps` (SSR) lub `getStaticProps` (SSG)
   - ❌ Supabase Client SDK może wymagać innej konfiguracji na serwerze
   - **Złożoność:** Średnia-Wysoka

3. **Dynamic SEO (useEffect) → Server-Side Meta Tags**
   - ❌ `useSEO` hook manipuluje `document.head` przez `useEffect`
   - ❌ `BlogPost.tsx` manipuluje meta tags przez `useEffect`
   - ❌ Trzeba przenieść na `<Head>` w Next.js lub `next/head`
   - ❌ Schema.org dodawane przez JS - trzeba przenieść na server-side
   - **Złożoność:** Średnia

4. **Window/Document/LocalStorage**
   - ❌ Wiele miejsc używa `window`, `document`, `localStorage`
   - ❌ Trzeba dodać guards (`typeof window !== 'undefined'`)
   - ❌ Trzeba przenieść do `useEffect` lub użyć SSR-safe alternatyw
   - **Złożoność:** Niska-Średnia

5. **Vite Config → Next.js Config**
   - ❌ `vite.config.ts` ma custom aliases (`@/`)
   - ❌ `vite.config.ts` ma custom env variables (`GEMINI_API_KEY`)
   - ❌ Trzeba przenieść do `next.config.js`
   - **Złożoność:** Niska

6. **API Routes (Vercel)**
   - ✅ API routes są już w formacie kompatybilnym z Next.js
   - ✅ Można przenieść 1:1 do `pages/api/` lub `app/api/`
   - **Złożoność:** Niska

**Średnie ryzyko:**

7. **Subdomena Routing**
   - ❌ Warunkowy routing w zależności od `window.location.hostname`
   - ❌ W Next.js trzeba użyć middleware lub custom server
   - **Złożoność:** Średnia

8. **Protected Routes**
   - ❌ `ProtectedRoute` wrapper - trzeba przenieść na middleware lub HOC
   - **Złożoność:** Niska-Średnia

9. **React Flow (FunnelBuilder)**
   - ❌ Duży bundle, lazy loaded
   - ❌ Może wymagać `next/dynamic` z `ssr: false`
   - **Złożoność:** Niska-Średnia

### 7.2 Elementy Utrudniające Migrację na Astro (SSG)

**Wysokie ryzyko:**

1. **React Router → Astro File-Based Routing**
   - ❌ Astro używa file-based routing (pliki w `src/pages/`)
   - ❌ Trzeba przenieść wszystkie komponenty na pliki `.astro` lub `.tsx`
   - ❌ Warunkowy routing w zależności od subdomeny - **NIE MOŻLIWE w Astro SSG**
   - **Złożoność:** Wysoka

2. **Client-Side Interactivity**
   - ❌ Wiele komponentów używa React hooks (`useState`, `useEffect`)
   - ❌ Astro wymaga `client:*` directives dla interaktywnych komponentów
   - ❌ Trzeba oznaczyć każdy interaktywny komponent jako `client:load` lub `client:hydrate`
   - **Złożoność:** Średnia-Wysoka

3. **Supabase Client SDK**
   - ❌ Supabase Client SDK wymaga `window` (nie działa na serwerze)
   - ❌ Trzeba użyć Supabase Server Client dla SSG
   - ❌ Trzeba przenieść data fetching na build time (`getStaticPaths`, `getStaticProps`)
   - **Złożoność:** Średnia-Wysoka

4. **Dynamic Routes (Blog)**
   - ❌ `/blog/:slug` - trzeba użyć `getStaticPaths` w Astro
   - ❌ Trzeba pobrać wszystkie slugi z Supabase podczas build time
   - ❌ Każdy nowy post wymaga rebuild (lub ISR)
   - **Złożoność:** Średnia

5. **Panel i Admin (Client-Side Only)**
   - ❌ Panel i admin są całkowicie client-side
   - ❌ Astro SSG nie obsługuje SSR dla chronionych tras
   - ❌ Trzeba użyć Astro SSR (nie SSG) lub pozostawić jako SPA
   - **Złożoność:** Wysoka

**Średnie ryzyko:**

6. **React Flow (FunnelBuilder)**
   - ❌ React Flow może nie działać dobrze w Astro (wymaga client-side)
   - ❌ Trzeba oznaczyć jako `client:load`
   - **Złożoność:** Średnia

7. **API Routes**
   - ❌ Astro SSG nie obsługuje API routes (tylko statyczne pliki)
   - ❌ Trzeba użyć Astro SSR lub przenieść na Vercel Functions
   - **Złożoność:** Średnia

### 7.3 Elementy Łatwe do Przeniesienia 1:1

**Bez zmian w UI:**

1. ✅ **Komponenty React** - większość komponentów można przenieść 1:1
2. ✅ **Tailwind CSS** - działa w Next.js i Astro
3. ✅ **TypeScript** - działa w Next.js i Astro
4. ✅ **Supabase Schema** - bez zmian
5. ✅ **API Routes** - kompatybilne z Next.js
6. ✅ **Vercel Deploy** - działa dla Next.js i Astro
7. ✅ **Environment Variables** - bez zmian

### 7.4 Największe Ryzyka Regresji

**1. Routing (Wysokie ryzyko)**
- ❌ Warunkowy routing w zależności od subdomeny
- ❌ Lazy loading komponentów
- ❌ Protected routes
- **Ryzyko:** Błędy routingu, 404, brak dostępu do chronionych tras

**2. Dane (Średnie-Wysokie ryzyko)**
- ❌ Client-side data fetching → server-side
- ❌ Supabase Client SDK → Server Client
- ❌ RLS policies mogą wymagać weryfikacji
- **Ryzyko:** Błędy pobierania danych, problemy z autoryzacją

**3. SEO (Średnie ryzyko)**
- ❌ Dynamic SEO przez `useEffect` → server-side meta tags
- ❌ Schema.org przez JS → server-side JSON-LD
- **Ryzyko:** Brak meta tags w HTML, brak indeksacji

**4. Blog (Średnie ryzyko)**
- ❌ Dynamic routing `/blog/:slug` → static generation
- ❌ JSONB content rendering
- ❌ ISR (Incremental Static Regeneration) dla nowych postów
- **Ryzyko:** Brak nowych postów w build, problemy z renderingiem

**5. Cache (Niskie ryzyko)**
- ❌ Vercel cache dla statycznych stron
- ❌ ISR dla bloga
- **Ryzyko:** Stare wersje stron, problemy z cache invalidation

---

## 8. Rekomendacja

### 8.1 Wariant Minimalnego Ryzyka (Na Teraz)

**Cel:** Najmniej zmian, najlepszy efekt SEO

**Rozwiązanie:** **Next.js SSG/ISR** (App Router)

**Kroki:**

1. **Setup Next.js (Złożoność: Niska)**
   - `npx create-next-app@latest` (App Router, TypeScript, Tailwind)
   - Przenieś `components/`, `hooks/`, `lib/` do `app/` lub `src/`
   - Skonfiguruj `next.config.js` (aliases, env vars)

2. **Routing (Złożoność: Średnia)**
   - Przenieś statyczne strony na `app/[route]/page.tsx`
   - Blog: `app/blog/page.tsx` (lista) + `app/blog/[slug]/page.tsx` (post)
   - Panel/Admin: pozostaw jako client-side (lub użyj middleware)
   - Subdomena routing: użyj middleware lub custom server

3. **Data Fetching (Złożoność: Średnia)**
   - Utwórz Supabase Server Client (`lib/supabase-server.ts`)
   - Przenieś `useBlogPosts` → `getStaticProps` lub Server Components
   - Przenieś `useBlogPost` → `generateStaticParams` + Server Component
   - ISR dla bloga: `revalidate: 3600` (1 godzina)

4. **SEO (Złożoność: Niska-Średnia)**
   - Przenieś `useSEO` → `metadata` export w `page.tsx`
   - Przenieś Schema.org → `<script type="application/ld+json">` w layout
   - Przenieś `BlogPost` SEO → `generateMetadata` w `app/blog/[slug]/page.tsx`

5. **API Routes (Złożoność: Niska)**
   - Przenieś `api/*.ts` → `app/api/*/route.ts`
   - Sitemap: `app/sitemap.ts` (Next.js built-in)

6. **Window/Document Guards (Złożoność: Niska)**
   - Dodaj `typeof window !== 'undefined'` gdzie potrzeba
   - Przenieś `localStorage` do `useEffect` lub użyj cookies

7. **Testing (Złożoność: Średnia)**
   - Testuj wszystkie strony
   - Testuj blog (lista + posty)
   - Testuj panel/admin (client-side)
   - Testuj SEO (view-source, Google Rich Results Test)

**Szacunkowa złożoność:** **Średnia** (2-3 tygodnie pracy)

**Korzyści:**
- ✅ HTML z treścią w view-source (SEO)
- ✅ Meta tags w HTML (SEO)
- ✅ Schema.org w HTML (SEO)
- ✅ ISR dla bloga (automatyczne odświeżanie)
- ✅ Zachowana funkcjonalność panelu/admin (client-side)

**Ryzyka:**
- ⚠️ Subdomena routing może wymagać custom server
- ⚠️ Panel/admin może wymagać pozostawienia jako SPA

---

### 8.2 Wariant Docelowy (Na Lata)

**Cel:** Najlepsza baza pod rozbudowę

**Rozwiązanie:** **Next.js App Router z SSR/SSG/ISR** (hybrydowy)

**Kroki:**

1. **Architektura (Złożoność: Wysoka)**
   - Podziel aplikację na:
     - **Public (SSG/ISR):** Strony marketingowe, blog
     - **Panel (SSR):** Panel klienta, admin (wymaga autoryzacji)
     - **API (Serverless):** API routes, webhooks
   - Użyj Next.js middleware dla subdomeny routing
   - Użyj Next.js middleware dla autoryzacji

2. **Data Layer (Złożoność: Wysoka)**
   - Utwórz warstwę abstrakcji dla Supabase:
     - `lib/supabase-server.ts` - Server Client
     - `lib/supabase-client.ts` - Client SDK (dla panelu)
   - Przenieś wszystkie queries do Server Components lub Server Actions
   - Użyj React Server Components dla statycznych stron
   - Użyj Client Components tylko dla interaktywności

3. **SEO i Performance (Złożoność: Średnia)**
   - Wszystkie meta tags przez `generateMetadata`
   - Schema.org przez Server Components
   - Image optimization przez `next/image`
   - Font optimization przez `next/font`

4. **Blog System (Złożoność: Średnia)**
   - ISR dla listy postów (`revalidate: 3600`)
   - ISR dla pojedynczych postów (`revalidate: 3600`)
   - On-demand revalidation po publikacji nowego posta
   - Webhook z Supabase → Vercel API → revalidate

5. **Panel i Admin (Złożoność: Wysoka)**
   - Przenieś na SSR (wymaga autoryzacji)
   - Użyj Next.js middleware dla RLS
   - Użyj Server Actions dla mutations
   - Client Components tylko dla UI

6. **Monitoring i Analytics (Złożoność: Niska)**
   - Next.js Analytics
   - Vercel Analytics
   - Custom tracking dla bloga

**Szacunkowa złożoność:** **Wysoka** (4-6 tygodni pracy)

**Korzyści:**
- ✅ Najlepsze SEO (SSG/ISR dla publicznych stron)
- ✅ Najlepsza wydajność (Server Components, Image optimization)
- ✅ Skalowalna architektura (łatwa rozbudowa)
- ✅ Nowoczesny stack (Next.js 14+ App Router)
- ✅ Type-safe (TypeScript, Server Actions)

**Ryzyka:**
- ⚠️ Wymaga głębokiej refaktoryzacji
- ⚠️ Wymaga testowania wszystkich funkcji
- ⚠️ Wymaga migracji panelu/admin na SSR

---

## Podsumowanie

**Aktualny stan:**
- Vite SPA z React Router
- Wszystkie dane client-side (Supabase Client SDK)
- SEO przez JavaScript (useEffect)
- View-source pokazuje pustą stronę

**Główny problem dla SEO:**
- ❌ Brak treści w HTML (tylko `<div id="root"></div>`)
- ❌ Meta tags dodawane przez JS (może być za późno)
- ❌ Schema.org dodawane przez JS (może nie być zindeksowane)

**Rekomendacja:**
- **Na teraz:** Next.js SSG/ISR (wariant minimalnego ryzyka)
- **Na lata:** Next.js App Router hybrydowy (wariant docelowy)

**Astro nie jest rekomendowany** ze względu na:
- ❌ Brak wsparcia dla subdomeny routing w SSG
- ❌ Panel/admin wymaga SSR (nie SSG)
- ❌ Większa złożoność migracji niż Next.js
