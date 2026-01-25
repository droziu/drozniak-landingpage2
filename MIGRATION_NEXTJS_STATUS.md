# Status Migracji Next.js - Proof of Concept

**Data:** 2026-01-25  
**Branch:** `Migration_Nextjs`  
**Status:** ✅ **MIGRACJA ZAKOŃCZONA** - Wszystkie strony publiczne przeniesione do Next.js

---

## ✅ Co zostało zrobione

### 1. Setup Next.js
- ✅ Zainstalowano Next.js 15.1.4 (App Router)
- ✅ Skonfigurowano `next.config.js` (redirects, rewrites)
- ✅ Zaktualizowano `tsconfig.json` (wykluczono stare komponenty Vite)
- ✅ Zaktualizowano `tailwind.config.js` (dodano ścieżki Next.js)
- ✅ Zaktualizowano `package.json` (dodano skrypty Next.js)

### 2. Struktura Next.js
- ✅ Utworzono `app/layout.tsx` - główny layout z globalnym SEO i Schema.org
- ✅ Utworzono `app/globals.css` - przeniesiono wszystkie style z `index.css`
- ✅ Utworzono `app/page.tsx` - homepage (migracja z `MainPage.tsx`)
- ✅ Utworzono `app/blog/[slug]/page.tsx` - blog post (migracja z `BlogPost.tsx`)
- ✅ Utworzono `lib/supabase-server.ts` - server-side Supabase client

### 3. SEO Implementation
- ✅ **Homepage:** `generateMetadata` z pełnymi meta tags (OG, Twitter)
- ✅ **Blog Post:** `generateMetadata` z dynamicznymi meta tags per post
- ✅ **Schema.org:** Globalne schematy w `layout.tsx` (Organization, Person, WebSite, Service)
- ✅ **Blog Schema:** BlogPosting + BreadcrumbList w `app/blog/[slug]/page.tsx`
- ✅ **Canonical URLs:** Wszystkie strony mają canonical w metadata

### 4. ISR (Incremental Static Regeneration)
- ✅ Blog post ma `revalidate: 3600` (1 godzina)
- ✅ `generateStaticParams` dla wszystkich opublikowanych postów
- ✅ Build znalazł 1 post: `/blog/jak-zdobyc-klientow-w-malej-firmie-prosty-system-w-4-krokach`

### 5. Fixes
- ✅ Naprawiono CSS (selektory z `[#fee715]`)
- ✅ Utworzono Client Component dla ikon (`app/components/BlogIcons.tsx`) - rozwiązanie problemu z `phosphor-react` w SSR
- ✅ Wykluczono stare komponenty Vite z kompilacji TypeScript
- ✅ Naprawiono Next.js 15+ async params (params jest Promise, trzeba użyć `await params`)

---

## 📁 Pliki dodane/zmienione

### Nowe pliki Next.js:
- `app/layout.tsx` - główny layout
- `app/globals.css` - globalne style
- `app/page.tsx` - homepage
- `app/blog/[slug]/page.tsx` - blog post page
- `app/components/BlogIcons.tsx` - Client Component dla ikon
- `lib/supabase-server.ts` - server-side Supabase client
- `next.config.js` - konfiguracja Next.js
- `next-env.d.ts` - TypeScript definitions dla Next.js

### Zmienione pliki:
- `package.json` - dodano Next.js i zaktualizowano skrypty
- `tsconfig.json` - dostosowano do Next.js, wykluczono stare komponenty
- `tailwind.config.js` - dodano ścieżki Next.js
- `components/blog/BlogPost.tsx` - naprawiono błędy TypeScript (dla kompatybilności)

---

## ✅ Testowanie Lokalne

**Dev server działa:**
```bash
npm run dev
# Server: http://localhost:3000
```

**Sprawdzone:**
- ✅ Homepage (`/`) - HTML z treścią, meta tags, Schema.org
- ✅ Blog post (`/blog/[slug]`) - HTML z treścią, dynamiczne meta tags, BlogPosting + BreadcrumbList Schema.org

**Szczegóły testowania:** Zobacz `TESTING_LOCAL.md`

---

## ⚠️ Co jeszcze trzeba zrobić

### Priorytet 1 - Reszta stron marketingowych:
- [x] `/system` → `app/system/page.tsx` ✅
- [x] `/strony-www` → `app/strony-www/page.tsx` ✅
- [x] `/szkolenia` → `app/szkolenia/page.tsx` ✅
- [x] `/kontakt` → `app/kontakt/page.tsx` ✅
- [x] `/polityka-prywatnosci` → `app/polityka-prywatnosci/page.tsx` ✅
- [x] `/freelancer` → `app/freelancer/page.tsx` ✅
- [x] `/portfolio-redlin` → `app/portfolio-redlin/page.tsx` ✅
- [x] `/portfolio-pasw` → `app/portfolio-pasw/page.tsx` ✅
- ~~`/doradztwo-hotel-irys`~~ - **POMINIĘTE** (nie potrzebne)
- ~~`/doradztwo-zef`~~ - **POMINIĘTE** (stary projekt, nie migrowany)

### Priorytet 2 - Blog:
- [x] `/blog` (lista) → `app/blog/page.tsx` ✅
- [x] `/blog/kategoria/[categorySlug]` → `app/blog/kategoria/[categorySlug]/page.tsx` ✅

### Priorytet 3 - SEO i Utilities:
- [x] `robots.txt` → `app/robots.ts` (Next.js route handler) ✅
- [x] `sitemap.xml` → `app/sitemap.ts` (Next.js route handler) ✅
- [x] Przenieść API routes do `app/api/` (contact, strony-www, doradztwo-email, course-completion-email) ✅

### Priorytet 4 - Komponenty wspólne:
- [x] `Header.tsx` - przenieść do Next.js (Client Component) ✅
- [x] `Footer.tsx` - przenieść do Next.js ✅
- [x] `StickyCTA.tsx` - przenieść do Next.js (Client Component) ✅
- [x] `CookieConsent.tsx` - przenieść do Next.js (Client Component) ✅
- [x] `LayoutClient.tsx` - wrapper dla zarządzania stanami ✅

---

## 🔧 Environment Variables dla Vercel

### Production:
```
VITE_SUPABASE_URL=https://twoj-projekt.supabase.co
VITE_SUPABASE_ANON_KEY=twoj-anon-key
SUPABASE_URL=https://twoj-projekt.supabase.co
SUPABASE_ANON_KEY=twoj-anon-key
RESEND_API_KEY=twoj-resend-key
```

### Preview (branch deployments):
```
VITE_SUPABASE_URL=https://twoj-projekt.supabase.co
VITE_SUPABASE_ANON_KEY=twoj-anon-key
SUPABASE_URL=https://twoj-projekt.supabase.co
SUPABASE_ANON_KEY=twoj-anon-key
RESEND_API_KEY=twoj-resend-key
```

**Uwaga:** Next.js używa `process.env` dla server-side, więc można używać zarówno `VITE_*` jak i bez prefiksu. Dla kompatybilności z API routes, najlepiej ustawić obie wersje.

---

## ✅ Checklist dla Vercel

### Po pierwszym deploy Preview:

1. **Environment Variables:**
   - [ ] Przejdź do Vercel Dashboard → Project → Settings → Environment Variables
   - [ ] Dodaj wszystkie wymagane zmienne (Production + Preview)
   - [ ] Upewnij się, że `VITE_SUPABASE_URL` i `SUPABASE_URL` są ustawione (oba)
   - [ ] Upewnij się, że `VITE_SUPABASE_ANON_KEY` i `SUPABASE_ANON_KEY` są ustawione (oba)
   - [ ] Dodaj `RESEND_API_KEY` jeśli używasz formularzy

2. **Domain Configuration:**
   - [ ] Sprawdź czy `drozniak.pl` jest podpięty do projektu
   - [ ] Sprawdź redirecty (www→non-www, http→https) - powinny działać przez `next.config.js`

3. **Build Settings:**
   - [ ] Framework Preset: Next.js (powinno być automatycznie)
   - [ ] Build Command: `npm run build` (domyślne)
   - [ ] Output Directory: `.next` (domyślne dla Next.js)
   - [ ] Install Command: `npm install` (domyślne)

4. **Testy po deploy:**
   - [ ] Sprawdź `view-source:https://preview-url.vercel.app/` - powinien zawierać HTML z treścią
   - [ ] Sprawdź `view-source:https://preview-url.vercel.app/blog/[slug]` - powinien zawierać meta tags, Schema.org
   - [ ] Sprawdź `/sitemap.xml` - powinien działać (po implementacji)
   - [ ] Sprawdź `/robots.txt` - powinien działać (po implementacji)
   - [ ] Sprawdź redirecty (www→non-www, trailing slash)

---

## 🚀 Następne kroki

1. **Przenieś resztę stron marketingowych** (priorytet 1)
2. **Zaimplementuj blog list** (`app/blog/page.tsx`)
3. **Zaimplementuj sitemap i robots.txt**
4. **Przenieś API routes** do `app/api/`
5. **Przenieś wspólne komponenty** (Header, Footer, etc.)
6. **Testy end-to-end** przed merge do main

---

## 📝 Uwagi techniczne

- **Panel/Admin:** Zostaje jako Vite SPA (nie migrowane)
- **Stare komponenty:** Wykluczone z kompilacji TypeScript Next.js, ale pozostają w repo
- **Phosphor React:** Używa Client Component (`'use client'`) ze względu na problemy z SSR
- **ISR:** Blog posty mają revalidate 1h - nowe posty będą widoczne maksymalnie po 1 godzinie (lub po ręcznym revalidate)

---

## ✅ Definition of Done (Po zakończeniu migracji)

- [ ] Wszystkie strony marketingowe działają
- [ ] Blog (lista + posty) działa
- [ ] View-source zawiera HTML z treścią (nie tylko `<div id="root">`)
- [ ] Meta tags, OG, Twitter Cards w HTML
- [ ] Schema.org JSON-LD w HTML
- [ ] Sitemap.xml działa i zawiera wszystkie URL
- [ ] Robots.txt działa
- [ ] Redirecty działają (www→non-www, http→https, trailing slash)
- [ ] Lighthouse/CWV nie pogorszyły się
- [ ] UI wizualnie identyczne (screenshots comparison)
