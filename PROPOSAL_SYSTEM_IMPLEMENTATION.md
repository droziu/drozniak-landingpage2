# Moduł "Oferty" (Proposal System) - Implementacja MVP

## ✅ Deliverables - Co zostało zrobione

### 1. DB Mapping (✅ Gotowe)
**Plik:** `PROPOSAL_SYSTEM_DB_MAPPING.md`

- **Mapowanie istniejących encji:**
  - "Klient" → `panel_clients` (główna encja klienta panelu)
  - "Użytkownik/Admin" → `auth.users` + `is_admin()` function
  - "Role" → `is_admin()` + RLS policies

- **Wykorzystanie istniejących tabel:**
  - `panel_clients` - przypisanie ofert
  - `client_view_grants` - integracja z widokiem 'documents'
  - `is_admin()` - sprawdzanie uprawnień admina

### 2. Minimalny schemat nowych encji (✅ Gotowe)

**Plik:** `supabase_migration_proposal_system.sql`

**Nowe tabele:**
1. **`proposals`** - główna tabela ofert
   - `id`, `client_id`, `marketing_client_id` (opcjonalnie)
   - `title`, `status` (draft/sent/viewed/accepted/expired/archived)
   - `valid_until` (opcjonalne wygaśnięcie)
   - `created_by`, `created_at`, `updated_at`

2. **`proposal_versions`** - historia wersji
   - `id`, `proposal_id`, `version_number` (1,2,3...)
   - `content` (JSONB - struktura sekcji renderowalna)
   - `created_by`, `created_at`

3. **`proposal_access_links`** - publiczne linki
   - `id`, `proposal_id`, `token` (random UUID - niezgadywalny)
   - `status` (active/revoked)
   - `expires_at`, `last_opened_at`
   - `created_by`, `created_at`

4. **`proposal_acceptances`** - akceptacje ze snapshotem
   - `id`, `proposal_id`, `accepted_version_id`
   - `accepted_version_content` (JSONB - zamrożona treść)
   - `accepted_by` (UUID) lub `accepted_by_email` (TEXT)
   - `ip_address`, `user_agent`, `comment`
   - `accepted_at`, `created_at`

5. **`proposal_tracking_events`** - eventy trackingowe
   - `id`, `proposal_id`, `access_link_id` (opcjonalnie)
   - `event_type` (view/accept/click/scroll)
   - `metadata` (JSONB: {ua, referer, section_id, etc.})
   - `created_at`

### 3. RLS / Edge Functions Plan (✅ Gotowe)

**RLS Policies:**
- **Admin:** pełny dostęp do wszystkich tabel (`is_admin()`)
- **Twórcy:** mogą zarządzać swoimi ofertami (`created_by = auth.uid()`)
- **Klienci:** widzą tylko przypisane oferty (`panel_clients.user_id = auth.uid()`)
- **Public (anon):** NIE MA bezpośredniego dostępu - tylko przez funkcje SECURITY DEFINER

**Funkcje SECURITY DEFINER:**
1. `generate_proposal_link(proposal_uuid, user_uuid)` - generuje/zwraca link publiczny
2. `accept_proposal(...)` - akceptuje ofertę (public link lub authenticated)
3. `expire_proposals()` - automatyczne wygasanie (do cron)

**Bezpieczeństwo:**
- Anon NIE może SELECT z `proposals` bezpośrednio
- Dostęp przez token w URL: `/p/:token` → funkcja sprawdza token
- Tracking eventy: INSERT przez edge function lub SECURITY DEFINER (nie przez policy)

### 4. Status workflow (✅ Gotowe)

```
draft → sent → viewed → accepted
         ↓
      expired / archived
```

- **draft:** Tylko admin widzi, nie wysłana
- **sent:** Link wygenerowany i wysłany
- **viewed:** Klient otworzył ofertę (tracking event)
- **accepted:** Klient zaakceptował (record w `proposal_acceptances`)
- **expired:** `valid_until < NOW()` (automatycznie przez `expire_proposals()`)
- **archived:** Ręcznie przez admina

## 📋 Co dalej (Implementacja UI + API)

### 5. MVP Implementation UI + API (🔄 Do zrobienia)

#### Admin Panel (`/admin/proposals`)

**Komponenty do stworzenia:**
- `ProposalsList.tsx` - lista ofert (tabela/karty)
  - Kolumny: tytuł, klient, status, last viewed, accepted, akcje
  - Filtry: status (draft/sent/viewed/accepted/expired/archived)
  - Przycisk: "Nowa oferta"

- `ProposalEditor.tsx` - edycja oferty (`/admin/proposals/:id`)
  - Formularz: tytuł, klient (select), valid_until (opcjonalnie)
  - Editor sekcji oferty (JSONB content):
    ```json
    {
      "sections": [
        {
          "title": "Pakiet Basic",
          "content": "...",
          "type": "pricing",
          "price": 1000
        },
        {
          "title": "Usługi",
          "content": "...",
          "type": "list",
          "items": ["...", "..."]
        }
      ]
    }
    ```
  - Historia wersji (lista `proposal_versions`)
  - Przycisk: "Utwórz nową wersję"
  - Przycisk: "Generuj link" → wywołuje `generate_proposal_link()`
  - Zakładka: "Tracking" → lista `proposal_tracking_events`

#### Public View (`/p/:token`)

**Komponenty do stworzenia:**
- `PublicProposalView.tsx` - widok oferty bez logowania
  - Pobierz `proposal_access_links` po token
  - Pobierz `proposals` + `proposal_versions` (najnowsza wersja)
  - Renderuj sekcje z `content` JSONB
  - Tracking: INSERT `view` event przy otwarciu
  - Przycisk: "Akceptuję ofertę" → modal z komentarzem (opcjonalnie)
  - Akceptacja: wywołuje `accept_proposal()` przez API

**Routing:**
```typescript
<Route path="/p/:token" element={<PublicProposalView />} />
```

#### Client Panel (`/panel/documents`)

**Integracja z istniejącym:**
- Rozszerz `ClientDocumentsView.tsx` o wyświetlanie ofert
- Filtruj `proposals` gdzie `client_id = panelClient.id`
- Karta oferty: tytuł, status, "Otwórz" → `/panel/documents/proposals/:id`
- Widok szczegółów: podobny do `PublicProposalView`, ale z kontekstem panelu

## 🚀 Instrukcja wdrożenia

### Krok 1: Uruchom migrację SQL

1. Otwórz **Supabase Dashboard → SQL Editor**
2. Wklej zawartość pliku `supabase_migration_proposal_system.sql`
3. Kliknij **"Run"**
4. Sprawdź czy nie ma błędów

### Krok 2: Weryfikacja

```sql
-- Sprawdź czy tabele zostały utworzone
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE 'proposal%';

-- Sprawdź czy funkcje działają
SELECT generate_proposal_link(gen_random_uuid(), auth.uid());
```

### Krok 3: Implementacja UI (następny krok)

- Utwórz komponenty React (jak wyżej)
- Routing w `App.tsx`
- API endpoints (Supabase RPC lub edge functions)

## 🔮 Rozszerzalność (fundament pod przyszłość)

**Gotowe do łatwego dodania:**

1. **Komentarze:** Można użyć `comment_threads` (już istnieje) lub dedykowana `proposal_comments`
2. **Warianty/Pakiety:** Pole `variants JSONB` w `proposal_versions.content`
3. **Podpis elektroniczny:** Pole `signature_data JSONB` w `proposal_acceptances`
4. **Płatności:** Link do `invoices` lub `proposal_payments`

## 📝 Notatki techniczne

- **Idempotentność:** Migracja używa `CREATE TABLE IF NOT EXISTS` i `DROP POLICY IF EXISTS`
- **Bezpieczeństwo:** Anon nie ma bezpośredniego dostępu - tylko przez funkcje SECURITY DEFINER
- **Snapshot:** `accepted_version_content` w `proposal_acceptances` jest zamrożony (nie zmienia się nawet jeśli oferta jest edytowana)
- **Token:** Random UUID - niezgadywalny, używany w URL `/p/:token`
