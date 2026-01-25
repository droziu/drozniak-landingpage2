# Plan Architektury Bloga

## 🎯 Cele i Wymagania

1. **Wydajność**: Szybkie ładowanie strony (SSG/ISR, optymalizacja obrazów)
2. **SEO**: Przyjazne dla wyszukiwarek (meta tags, structured data, sitemap)
3. **Elastyczność**: Możliwość tworzenia różnych layoutów dla różnych postów
4. **Łatwość dodawania**: Prosty proces dodawania nowych artykułów
5. **Optymalizacja obrazów**: Obrazy nie obciążają serwera (CDN, lazy loading, responsive)
6. **Design**: Białe tło z akcentami kolorów (#fee715, #00C9A7), czytelne, profesjonalne

---

## 📊 Architektura Bazy Danych (Supabase)

### Tabela: `blog_posts`

```sql
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT, -- Krótki opis dla listy postów
  content JSONB NOT NULL, -- Elastyczna struktura treści (Rich Text Editor)
  featured_image_url TEXT, -- URL do obrazu w Supabase Storage
  author_id UUID REFERENCES auth.users(id),
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[],
  og_image_url TEXT, -- Open Graph image
  
  -- Status i daty
  status TEXT NOT NULL DEFAULT 'draft', -- 'draft', 'published', 'archived'
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Kategorie i tagi
  category_id UUID REFERENCES blog_categories(id),
  tags TEXT[],
  
  -- Elastyczne pola dla różnych layoutów
  layout_type TEXT DEFAULT 'standard', -- 'standard', 'wide', 'narrow', 'custom'
  custom_css TEXT, -- Opcjonalne custom CSS dla konkretnego posta
  custom_js TEXT, -- Opcjonalne custom JS
  
  -- Statystyki
  view_count INTEGER DEFAULT 0,
  reading_time INTEGER, -- w minutach (obliczane automatycznie)
  
  -- Indeksy dla szybkiego wyszukiwania
  CONSTRAINT valid_status CHECK (status IN ('draft', 'published', 'archived'))
);

-- Indeksy dla wydajności
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_category ON blog_posts(category_id);
CREATE INDEX idx_blog_posts_tags ON blog_posts USING GIN(tags);
CREATE INDEX idx_blog_posts_search ON blog_posts USING GIN(to_tsvector('polish', title || ' ' || COALESCE(excerpt, '') || ' ' || COALESCE(meta_description, '')));
```

### Tabela: `blog_categories`

```sql
CREATE TABLE blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT, -- Kolor akcentu dla kategorii (np. #fee715)
  icon TEXT, -- Nazwa ikony (opcjonalnie)
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Tabela: `blog_authors` (opcjonalnie, jeśli będzie więcej autorów)

```sql
CREATE TABLE blog_authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) UNIQUE,
  display_name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  social_links JSONB, -- {linkedin, twitter, etc.}
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### RLS (Row Level Security)

```sql
-- Publiczne odczyty dla opublikowanych postów
CREATE POLICY "Public can view published posts"
  ON blog_posts FOR SELECT
  USING (status = 'published');

-- Tylko zalogowani użytkownicy mogą tworzyć/edytować
CREATE POLICY "Authenticated users can create posts"
  ON blog_posts FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own posts"
  ON blog_posts FOR UPDATE
  USING (auth.uid() = author_id);

-- Admin może wszystko
CREATE POLICY "Admins can do everything"
  ON blog_posts FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
```

---

## 🗂️ Struktura Komponentów React

```
components/
  blog/
    BlogList.tsx              # Lista wszystkich postów (strona główna bloga)
    BlogPost.tsx              # Pojedynczy post (szczegóły)
    BlogPostCard.tsx          # Karta posta na liście
    BlogCategoryFilter.tsx    # Filtrowanie po kategoriach
    BlogSearch.tsx            # Wyszukiwarka
    BlogPagination.tsx        # Paginacja
    
    editor/
      BlogEditor.tsx          # Edytor do tworzenia/edycji postów
      RichTextEditor.tsx      # Rich text editor (może być TipTap lub podobny)
      ImageUploader.tsx       # Upload obrazów do Supabase Storage
      SEOFields.tsx           # Pola SEO (meta title, description, etc.)
      PreviewMode.tsx         # Podgląd przed publikacją
    
    layout/
      BlogHeader.tsx          # Header specyficzny dla bloga
      BlogFooter.tsx          # Footer specyficzny dla bloga (opcjonalnie)
      BlogSidebar.tsx         # Sidebar z kategoriami, popularnymi postami
    
    blocks/                   # Elastyczne bloki treści
      TextBlock.tsx
      ImageBlock.tsx
      QuoteBlock.tsx
      CodeBlock.tsx
      VideoBlock.tsx
      CTABlock.tsx            # Call-to-action blok
      CustomBlock.tsx         # Custom HTML/JSX
```

---

## 🎨 Design System dla Bloga

### Kolorystyka (bazująca na obecnej, ale na białym tle)

```css
/* Blog Color Palette */
--blog-bg: #ffffff;
--blog-text: #1a1a1a;
--blog-text-light: #666666;
--blog-accent-yellow: #fee715;
--blog-accent-teal: #00C9A7;
--blog-accent-dark: #101820;
--blog-border: #e5e5e5;
--blog-hover: #f5f5f5;
```

### Typografia

- **Nagłówki**: Montserrat (jak na głównej stronie)
- **Treść**: Open Sans lub system font stack dla lepszej wydajności
- **Rozmiary**: Responsywne, czytelne (min. 16px dla body)

### Layout

- **Maksymalna szerokość treści**: 800px (optymalna dla czytelności)
- **Szerokość z sidebarem**: 1200px
- **Padding**: 1.5rem na mobile, 2rem na desktop

---

## 🚀 Strategia Wydajności

### 1. **Obrazy w Supabase Storage**

```
Storage Bucket: blog-images
  ├── posts/
  │   ├── {post-slug}/
  │   │   ├── featured.jpg
  │   │   ├── og-image.jpg
  │   │   └── content/
  │   │       ├── image-1.jpg
  │   │       └── image-2.jpg
  └── thumbnails/
      └── {post-slug}-thumb.jpg
```

**Optymalizacja obrazów:**
- Automatyczne generowanie thumbnaili (można użyć Supabase Edge Functions lub zewnętrznego serwisu)
- Lazy loading dla obrazów poniżej folda
- Responsive images (`srcset`)
- WebP format z fallback do JPG
- CDN przez Supabase (automatycznie)

### 2. **Caching i ISR (Incremental Static Regeneration)**

- **Lista postów**: Cache 1 godzina (często się zmienia)
- **Pojedyncze posty**: Cache 24 godziny (rzadko się zmienia po publikacji)
- **Revalidacja**: Po edycji posta w admin panelu

### 3. **Code Splitting**

```typescript
// Lazy load edytora (tylko dla adminów)
const BlogEditor = lazy(() => import('./components/blog/editor/BlogEditor'));

// Lazy load ciężkich komponentów
const RichTextEditor = lazy(() => import('./components/blog/editor/RichTextEditor'));
```

### 4. **SEO Optimizations**

- **Meta tags**: Dynamiczne dla każdego posta
- **Structured Data**: JSON-LD dla Article schema
- **Sitemap**: Automatycznie generowany (można przez API route)
- **Open Graph**: Obrazy i meta dla social media
- **Canonical URLs**: Zapobieganie duplikatom

---

## 📝 Struktura Treści (JSONB)

Elastyczna struktura pozwalająca na różne layouty:

```typescript
interface BlogPostContent {
  blocks: ContentBlock[];
}

interface ContentBlock {
  type: 'text' | 'image' | 'quote' | 'code' | 'video' | 'cta' | 'custom';
  id: string;
  data: {
    // Dla text
    text?: string;
    alignment?: 'left' | 'center' | 'right';
    
    // Dla image
    imageUrl?: string;
    alt?: string;
    caption?: string;
    width?: 'narrow' | 'standard' | 'wide' | 'full';
    
    // Dla quote
    quote?: string;
    author?: string;
    
    // Dla code
    code?: string;
    language?: string;
    
    // Dla video
    videoUrl?: string;
    videoType?: 'youtube' | 'vimeo' | 'direct';
    
    // Dla CTA
    ctaText?: string;
    ctaLink?: string;
    ctaStyle?: 'primary' | 'secondary';
    
    // Dla custom
    html?: string;
    css?: string;
    js?: string;
  };
}
```

**Przykład:**

```json
{
  "blocks": [
    {
      "type": "text",
      "id": "intro",
      "data": {
        "text": "<p>Wprowadzenie do artykułu...</p>",
        "alignment": "left"
      }
    },
    {
      "type": "image",
      "id": "hero-img",
      "data": {
        "imageUrl": "https://...",
        "alt": "Opis obrazu",
        "caption": "Źródło: ...",
        "width": "wide"
      }
    },
    {
      "type": "quote",
      "id": "quote-1",
      "data": {
        "quote": "Inspirujący cytat",
        "author": "Jan Kowalski"
      }
    }
  ]
}
```

---

## 🔄 Routing

```typescript
// W App.tsx
<Route path="/blog" element={<BlogList />} />
<Route path="/blog/kategoria/:categorySlug" element={<BlogList />} />
<Route path="/blog/:slug" element={<BlogPost />} />
<Route path="/blog/admin/editor" element={<ProtectedRoute><BlogEditor /></ProtectedRoute>} />
<Route path="/blog/admin/editor/:postId" element={<ProtectedRoute><BlogEditor /></ProtectedRoute>} />
```

---

## 🛠️ API / Hooks

### Hook: `useBlogPosts`

```typescript
// hooks/useBlogPosts.ts
export const useBlogPosts = (filters?: {
  category?: string;
  tag?: string;
  search?: string;
  limit?: number;
  offset?: number;
}) => {
  // Fetch z Supabase z optymalizacją
};
```

### Hook: `useBlogPost`

```typescript
// hooks/useBlogPost.ts
export const useBlogPost = (slug: string) => {
  // Fetch pojedynczego posta
  // Automatyczne zwiększanie view_count
};
```

### API Functions

```typescript
// api/blog.ts
export const createBlogPost = async (data: BlogPostData) => { ... };
export const updateBlogPost = async (id: string, data: BlogPostData) => { ... };
export const deleteBlogPost = async (id: string) => { ... };
export const uploadBlogImage = async (file: File, postSlug: string) => { ... };
```

---

## 📱 Responsive Design

- **Mobile First**: Projektowanie od najmniejszego ekranu
- **Breakpoints**: 
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Touch-friendly**: Większe przyciski, łatwe scrollowanie

---

## 🔍 SEO Checklist

- [ ] Meta title i description dla każdego posta
- [ ] Open Graph tags
- [ ] Twitter Cards
- [ ] Structured Data (JSON-LD)
- [ ] Sitemap.xml
- [ ] Robots.txt
- [ ] Canonical URLs
- [ ] Alt text dla wszystkich obrazów
- [ ] Semantic HTML (article, section, etc.)
- [ ] Fast loading (< 3s)
- [ ] Mobile-friendly

---

## 🎯 Proces Dodawania Nowego Posta

1. **Admin Panel** → Blog → "Nowy Post"
2. **Edytor**:
   - Wprowadź tytuł (automatycznie generuje slug)
   - Dodaj excerpt
   - Dodaj treść (bloki)
   - Upload featured image
   - Wypełnij SEO fields
   - Wybierz kategorię i tagi
   - Wybierz layout type
3. **Preview** → Sprawdź jak wygląda
4. **Publish** → Zmień status na "published", ustaw datę publikacji
5. **Automatycznie**:
   - Generuje reading time
   - Tworzy thumbnaili obrazów
   - Aktualizuje sitemap
   - Wysyła webhook (jeśli potrzebny)

---

## 🚦 Fazy Implementacji

### Faza 1: Fundamenty
- [ ] Migracja bazy danych (tabele blog_posts, blog_categories)
- [ ] Podstawowe komponenty (BlogList, BlogPost)
- [ ] Routing
- [ ] Podstawowy design (białe tło, akcenty kolorów)

### Faza 2: Treść i Edycja
- [ ] Rich Text Editor
- [ ] System bloków treści
- [ ] Upload obrazów do Supabase Storage
- [ ] Edytor postów (dla adminów)

### Faza 3: SEO i Optymalizacja
- [ ] Meta tags
- [ ] Structured Data
- [ ] Sitemap
- [ ] Optymalizacja obrazów
- [ ] Lazy loading

### Faza 4: Zaawansowane Funkcje
- [ ] Wyszukiwarka
- [ ] Filtrowanie po kategoriach/tagach
- [ ] Powiązane posty
- [ ] Komentarze (opcjonalnie, może być przez Disqus lub Supabase)
- [ ] Social sharing

---

## 💡 Dodatkowe Pomysły

1. **Newsletter Integration**: Formularz subskrypcji na końcu postów
2. **Reading Progress Bar**: Pasek postępu czytania
3. **Table of Contents**: Automatycznie generowany spis treści
4. **Dark Mode Toggle**: Opcjonalnie (choć głównie białe tło)
5. **Print Styles**: CSS dla drukowania artykułów
6. **Related Posts**: Algorytm sugerujący podobne posty
7. **Reading Time**: Automatyczne obliczanie czasu czytania
8. **Share Buttons**: Udostępnianie na social media

---

## 📦 Potencjalne Biblioteki

- **Rich Text Editor**: [TipTap](https://tiptap.dev/) (lekkie, elastyczne) lub [Lexical](https://lexical.dev/) (Meta)
- **Image Optimization**: [Sharp](https://sharp.pixelplumbing.com/) (server-side) lub Supabase Edge Functions
- **Markdown Support**: [react-markdown](https://github.com/remarkjs/react-markdown) (jeśli chcesz wspierać Markdown)
- **Syntax Highlighting**: [Prism.js](https://prismjs.com/) lub [highlight.js](https://highlightjs.org/)

---

## ❓ Pytania do Rozważenia

1. **Komentarze**: Własny system czy zewnętrzny (Disqus, Supabase)?
2. **Analytics**: Google Analytics, Plausible, czy własny tracking?
3. **Newsletter**: Integracja z jakimś serwisem (Mailchimp, ConvertKit)?
4. **RSS Feed**: Czy potrzebny?
5. **Multi-language**: Czy blog będzie wielojęzyczny w przyszłości?

---

## 🎨 Przykładowy Layout Posta

```
┌─────────────────────────────────────┐
│  Header (z nawigacją)              │
├─────────────────────────────────────┤
│                                     │
│  [Breadcrumbs: Blog > Kategoria]   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  [Kategoria] [Data]         │   │
│  │                             │   │
│  │  # Tytuł Posta              │   │
│  │                             │   │
│  │  [Featured Image - Wide]    │   │
│  │                             │   │
│  │  Excerpt / Lead             │   │
│  │                             │   │
│  │  ─────────────────────      │   │
│  │                             │   │
│  │  [Treść artykułu]           │   │
│  │  - Bloki tekstu             │   │
│  │  - Obrazy                   │   │
│  │  - Cytaty                   │   │
│  │  - etc.                     │   │
│  │                             │   │
│  │  ─────────────────────      │   │
│  │                             │   │
│  │  [Tagi] [Share Buttons]     │   │
│  │                             │   │
│  │  [Powiązane Posty]          │   │
│  └─────────────────────────────┘   │
│                                     │
├─────────────────────────────────────┤
│  Footer                             │
└─────────────────────────────────────┘
```

---

Ten plan daje Ci pełną elastyczność, wydajność i łatwość w zarządzaniu blogiem. Możemy zacząć implementację od Faz 1, a potem stopniowo dodawać kolejne funkcje.
