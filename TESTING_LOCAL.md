# Testowanie Lokalne - Next.js Dev Server

## ✅ Uruchomienie

```bash
npm run dev
```

Server startuje na: **http://localhost:3000**

## 🧪 Co sprawdzić

### 1. Homepage (`/`)
- [ ] Otwórz http://localhost:3000
- [ ] Sprawdź `view-source:http://localhost:3000` - powinien zawierać:
  - ✅ Pełny HTML z treścią (nie tylko `<div id="root">`)
  - ✅ Meta tags: `<title>`, `<meta name="description">`
  - ✅ Open Graph: `<meta property="og:title">`, `<meta property="og:image">`
  - ✅ Twitter Cards: `<meta name="twitter:card">`
  - ✅ Schema.org JSON-LD: `<script type="application/ld+json" id="schema-organization">`
  - ✅ Canonical: `<link rel="canonical" href="https://drozniak.pl">`

### 2. Blog Post (`/blog/[slug]`)
- [ ] Otwórz http://localhost:3000/blog/jak-zdobyc-klientow-w-malej-firmie-prosty-system-w-4-krokach
- [ ] Sprawdź `view-source` - powinien zawierać:
  - ✅ Tytuł posta w `<title>`
  - ✅ Meta description posta
  - ✅ OG tags z tytułem i opisem posta
  - ✅ Schema.org BlogPosting JSON-LD
  - ✅ Schema.org BreadcrumbList JSON-LD
  - ✅ Treść posta w HTML (nie tylko placeholder)

### 3. Wizualne porównanie
- [ ] Porównaj homepage z oryginalną wersją Vite
- [ ] Sprawdź czy wszystkie sekcje są widoczne
- [ ] Sprawdź czy kolory, fonty, layout są identyczne
- [ ] Sprawdź czy linki działają (nawet jeśli prowadzą do nieistniejących jeszcze stron)

### 4. Console i Network
- [ ] Otwórz DevTools → Console - sprawdź czy nie ma błędów
- [ ] Otwórz DevTools → Network - sprawdź czy wszystkie zasoby się ładują
- [ ] Sprawdź czy fonty się ładują (Montserrat, Open Sans)

## ⚠️ Znane problemy (do naprawienia)

1. **Brakujące strony** - linki do `/system`, `/strony-www` itd. będą dawać 404 (to normalne, jeszcze nie migrowane)
2. **Brak Header/Footer** - jeszcze nie przeniesione z Vite
3. **Brak blog list** - `/blog` jeszcze nie zaimplementowane

## 🛑 Zatrzymanie serwera

```bash
# W terminalu gdzie działa npm run dev:
Ctrl + C
```

Lub znajdź proces i zabij:
```bash
lsof -ti:3000 | xargs kill
```

## 📝 Notatki

- Dev server używa **Turbopack** (szybszy niż Webpack)
- Hot reload działa automatycznie
- Zmiany w `app/` są widoczne natychmiast
- Zmiany w `next.config.js` wymagają restartu
