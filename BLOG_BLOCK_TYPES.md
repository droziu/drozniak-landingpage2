# Typy Bloków w Blogu

## Dostępne Typy Bloków

### 1. `text` - Tekst
Podstawowy blok tekstowy z obsługą HTML.

```json
{
  "type": "text",
  "id": "unique-id",
  "data": {
    "text": "<p>Paragraf tekstu z <strong>formatowaniem</strong>.</p><h2>Nagłówek sekcji</h2>",
    "alignment": "left" // "left" | "center" | "right"
  }
}
```

**Uwagi:**
- Automatycznie wykrywa nagłówki `<h2>` i `<h3>` i stosuje specjalne style
- Po każdym `<h2>` automatycznie dodawany jest grubszy separator
- Wspiera pełny HTML

---

### 2. `image` - Obraz
Obraz z opcjonalnym podpisem.

```json
{
  "type": "image",
  "id": "unique-id",
  "data": {
    "imageUrl": "https://...",
    "alt": "Opis obrazu",
    "caption": "Źródło: ...",
    "width": "wide" // "narrow" | "standard" | "wide" | "full"
  }
}
```

---

### 3. `highlight` - Blok z tłem
Blok wyróżniony z tłem (szary) - idealny do sekcji z listami, ważnych informacji.

```json
{
  "type": "highlight",
  "id": "unique-id",
  "data": {
    "title": "TEN WPIS POMOŻE CI KIEDY:",
    "subtitle": "26 najpopularniejszych potrzeb:",
    "text": "<ul><li>Punkt 1</li><li>Punkt 2</li></ul>"
  }
}
```

**Styl:**
- Szare tło (`bg-gray-50`)
- Niebieska lewa krawędź (`border-[#00C9A7]`)
- Tytuł w UPPERCASE, bold
- Subtitle w mniejszej czcionce

---

### 4. `separator` - Separator
Grubsza linia oddzielająca sekcje.

```json
{
  "type": "separator",
  "id": "unique-id",
  "data": {}
}
```

**Uwaga:** Separatory są też automatycznie dodawane po każdym `<h2>` w blokach tekstowych.

---

### 5. `quote` - Cytat
Cytat z opcjonalnym autorem.

```json
{
  "type": "quote",
  "id": "unique-id",
  "data": {
    "quote": "Tekst cytatu",
    "author": "Jan Kowalski"
  }
}
```

---

### 6. `cta` - Call to Action
Blok z wezwaniem do działania.

```json
{
  "type": "cta",
  "id": "unique-id",
  "data": {
    "ctaText": "Chcesz, żebym sprawdził to u Ciebie?",
    "ctaLink": "https://drozniak.pl/system",
    "ctaStyle": "primary" // "primary" | "secondary"
  }
}
```

---

### 7. `code` - Kod
Blok z kodem.

```json
{
  "type": "code",
  "id": "unique-id",
  "data": {
    "code": "const example = 'code';",
    "language": "javascript"
  }
}
```

---

### 8. `video` - Video
Osadzone video (YouTube/Vimeo).

```json
{
  "type": "video",
  "id": "unique-id",
  "data": {
    "videoUrl": "https://www.youtube.com/embed/...",
    "videoType": "youtube" // "youtube" | "vimeo" | "direct"
  }
}
```

---

### 9. `custom` - Custom HTML
Własny HTML/CSS/JS (dla zaawansowanych przypadków).

```json
{
  "type": "custom",
  "id": "unique-id",
  "data": {
    "html": "<div class='custom-block'>...</div>",
    "css": "custom-block { ... }",
    "js": "console.log('...');"
  }
}
```

---

## Kolorystyka

- **Tag kategorii**: Niebieski (`#00C9A7`) na białym tle
- **Separatory**: Grubsze linie (`border-t-2`)
- **Bloki highlight**: Szare tło (`bg-gray-50`) z niebieską krawędzią
- **Cytaty**: Niebieska lewa krawędź (`border-[#00C9A7]`)

---

## Przykład Kompletnego Posta

```json
{
  "blocks": [
    {
      "type": "text",
      "id": "intro",
      "data": {
        "text": "<p>Wprowadzenie do artykułu...</p>"
      }
    },
    {
      "type": "text",
      "id": "section-1",
      "data": {
        "text": "<h2>NAGŁÓWEK SEKCJI</h2><p>Treść sekcji...</p>"
      }
    },
    {
      "type": "separator",
      "id": "sep-1",
      "data": {}
    },
    {
      "type": "highlight",
      "id": "highlight-1",
      "data": {
        "title": "TEN WPIS POMOŻE CI KIEDY:",
        "text": "<ul><li>Punkt 1</li><li>Punkt 2</li></ul>"
      }
    },
    {
      "type": "image",
      "id": "img-1",
      "data": {
        "imageUrl": "https://...",
        "alt": "Opis",
        "width": "wide"
      }
    },
    {
      "type": "cta",
      "id": "cta-1",
      "data": {
        "ctaText": "Chcesz dowiedzieć się więcej?",
        "ctaLink": "https://drozniak.pl/system",
        "ctaStyle": "primary"
      }
    }
  ]
}
```

---

## Automatyczne Funkcje

1. **Separatory po h2**: Po każdym nagłówku `<h2>` automatycznie dodawany jest separator
2. **Style nagłówków**: `<h2>` i `<h3>` mają specjalne style (większe, bold, uppercase dla h2)
3. **Odstępy**: Większe marginesy dla obrazów i sekcji

---

## Wskazówki

- Używaj `highlight` dla ważnych informacji, list, sekcji które chcesz wyróżnić
- Używaj `separator` między dużymi sekcjami
- Nagłówki `<h2>` w blokach tekstowych automatycznie tworzą nowe sekcje
- Obrazy mają większe marginesy (12rem) dla lepszej czytelności
