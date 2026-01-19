# Moduł Marketing - Lejki Marketingowe

## 📋 Podsumowanie

Zaimplementowano profesjonalny moduł do budowania lejków marketingowych z następującymi funkcjonalnościami:

### ✅ Zaimplementowane funkcjonalności:

1. **Panel Administratora z zakładkami:**
   - 📚 **Kursy** - zarządzanie kursantami (istniejący moduł)
   - 📊 **Marketing** - lista i zarządzanie lejkami marketingowymi
   - 👥 **Klienci** - zarządzanie klientami marketingowymi

2. **Edytor Lejków (FunnelBuilder):**
   - Infinite Canvas z React Flow
   - Drag & Drop elementów z sidebaru
   - Custom Nodes z ikonami i kolorami
   - Smooth Step edges (łuki zamiast prostych linii)
   - Mini-map do nawigacji
   - Grid w tle
   - Auto-save (zapisuje zmiany co 2 sekundy)
   - Panel właściwości dla nodów (edycja nazwy, ikony, notatek)
   - Zoom i pan (przesuwanie)

3. **Zarządzanie Klientami:**
   - Dodawanie/edycja/usuwanie klientów
   - Filtrowanie po statusie (aktywny, nieaktywny, zarchiwizowany)
   - Przypisywanie klientów do lejków

4. **Lista Lejków:**
   - Tworzenie nowych lejków
   - Przypisywanie do klientów
   - Duplikowanie lejków
   - Filtrowanie po statusie
   - Statystyki (liczba elementów i połączeń)

5. **Baza Danych:**
   - Tabele: `marketing_clients`, `funnel_diagrams`, `funnel_access`
   - Pełne RLS (Row Level Security) policies
   - Auto-update `updated_at`

## 🗄️ Migracja SQL

**WAŻNE:** Przed użyciem modułu, wykonaj migrację SQL:

```bash
# W Supabase Dashboard -> SQL Editor
# Wykonaj plik: supabase_migration_marketing_funnels.sql
```

Migracja tworzy:
- 3 tabele z odpowiednimi indeksami
- RLS policies dla bezpieczeństwa
- Funkcje pomocnicze
- Triggery do auto-update `updated_at`

## 🎨 Ikony i Elementy

### Obecne ikony w sidebarze:

**Traffic Sources:**
- 📢 Facebook Ads
- 🔍 Google Ads
- 📧 Email Marketing
- 📱 Instagram

**Pages:**
- 🌐 Landing Page
- 📄 Sales Page
- 💳 Checkout
- ✅ Thank You Page

**Actions:**
- 📝 Lead Magnet
- 📊 Webinar
- 💬 Chatbot
- 📞 Sales Call

### Jak dodać więcej ikon?

Edytuj plik `components/FunnelBuilder.tsx`, tablica `nodeTemplates`:

```typescript
const nodeTemplates = [
  { type: 'custom', icon: '🎯', label: 'Nowy Element', color: '#HEX', category: 'Kategoria' },
  // ... więcej elementów
];
```

**Format ikon:**
- Użyj emoji Unicode (np. 🎯, 📊, 💰)
- Lub możesz użyć SVG (wymaga modyfikacji komponentu CustomNode)

**Kolory:**
- Format HEX (np. `#fee715`)
- Automatycznie dodawany jest alpha channel (20% opacity dla tła)

## 🚀 Użycie

### 1. Dodaj klienta:
1. Przejdź do zakładki **Klienci**
2. Kliknij **Dodaj Klienta**
3. Wypełnij formularz i zapisz

### 2. Utwórz lejek:
1. Przejdź do zakładki **Marketing**
2. Kliknij **Nowy Lejek**
3. Podaj nazwę projektu
4. (Opcjonalnie) Przypisz do klienta
5. Kliknij **Utwórz Lejek**

### 3. Edytuj lejek:
1. Z listy lejków kliknij **Otwórz** lub kliknij na kartę lejka
2. Przeciągnij elementy z lewego sidebaru na canvas
3. Połącz elementy przeciągając z portu źródłowego do docelowego
4. Kliknij na element, aby edytować jego właściwości
5. Zmiany są automatycznie zapisywane

### 4. Zarządzaj dostępem:
- Obecnie dostęp jest zarządzany przez przypisanie klienta do lejka
- W przyszłości można dodać panel zarządzania dostępem w `funnel_access`

## 🔒 Bezpieczeństwo (RLS)

- **Admin** (`stanislaw@drozniak.com`) - pełny dostęp do wszystkiego
- **Twórca lejka** - może edytować swoje lejki i zarządzać dostępem
- **Klient** - może tylko przeglądać przypisane lejki (read-only)

## 📝 Notatki techniczne

### Struktura danych w `diagram_data` (JSONB):

```json
{
  "nodes": [
    {
      "id": "node-123",
      "type": "custom",
      "position": { "x": 100, "y": 200 },
      "data": {
        "label": "Facebook Ads",
        "icon": "📢",
        "color": "#1877F2",
        "notes": "CPC target: 2 PLN"
      }
    }
  ],
  "edges": [
    {
      "id": "edge-123",
      "source": "node-1",
      "target": "node-2",
      "type": "smoothstep"
    }
  ],
  "viewport": {
    "x": 0,
    "y": 0,
    "zoom": 1
  }
}
```

### Customizacja:

**Zmiana kolorów:**
- Edytuj `defaultEdgeOptions` w `FunnelBuilder.tsx`
- Edytuj kolory w `nodeTemplates`

**Dodanie animacji na edges:**
- W `FunnelBuilder.tsx`, zmień `animated: false` na `animated: true` w `defaultEdgeOptions`

**Zmiana stylu nodów:**
- Edytuj komponent `CustomNode` w `FunnelBuilder.tsx`

## 🐛 Rozwiązywanie problemów

### Lejek się nie zapisuje:
- Sprawdź czy migracja SQL została wykonana
- Sprawdź RLS policies w Supabase
- Sprawdź konsolę przeglądarki pod kątem błędów

### Nie widzę elementów w sidebarze:
- Sprawdź czy React Flow został zainstalowany: `npm list @xyflow/react`
- Sprawdź konsolę przeglądarki

### Błędy RLS:
- Upewnij się, że jesteś zalogowany jako admin
- Sprawdź czy funkcja `is_admin()` działa w Supabase

## 📦 Zależności

- `@xyflow/react` - React Flow (infinite canvas)
- `@supabase/supabase-js` - Supabase client (już zainstalowany)

## 🔮 Przyszłe rozszerzenia

Możliwe do dodania w przyszłości:
- [ ] Live tracking konwersji
- [ ] Analityka i raporty
- [ ] Szablony lejków
- [ ] Eksport do PDF/PNG
- [ ] Współpraca w czasie rzeczywistym
- [ ] Więcej typów nodów (formularze, integracje)
- [ ] Panel zarządzania dostępem dla klientów
- [ ] Notatki globalne dla lejka
- [ ] Kolorystyka tematyczna

## 📞 Wsparcie

W razie problemów sprawdź:
1. Konsolę przeglądarki (F12)
2. Logi Supabase
3. Migrację SQL

---

**Status:** ✅ Gotowe do użycia
**Ostatnia aktualizacja:** 2024
