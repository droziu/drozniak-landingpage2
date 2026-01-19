# Mapowanie: Moduł "Oferty" (Proposal System) → Istniejąca baza Supabase

## 1. Mapowanie istniejących encji

### "Klient" → `panel_clients`
- **Używamy:** `panel_clients` (główna encja klienta panelu)
- **Relacja:** 1:1 z `auth.users` (`user_id`)
- **Pola:** `id`, `user_id`, `name`, `email`, `company_name`, `marketing_client_id`
- **Alternatywa:** `marketing_clients` (ale nie ma bezpośredniego związku z `auth.users`)

**Decyzja:** Oferty przypisujemy do `panel_clients.id` (klient z kontem w panelu). Jeśli potrzebujemy oferty dla klienta bez konta, możemy dodać `marketing_client_id` jako opcjonalne pole.

### "Użytkownik/Admin" → `auth.users` + `profiles`
- **Używamy:** `auth.users.id` jako `created_by` / `granted_by`
- **Funkcja sprawdzania admina:** `is_admin()` (prawdopodobnie w RLS)

### "Role" → `is_admin()` function + RLS
- **Admin:** funkcja `is_admin()` zwraca `true` dla adminów
- **Klient:** `panel_clients.user_id = auth.uid()`

### "Eventy/Logi" → Nowa tabela `proposal_tracking_events`
- **Nie mamy globalnej tabeli eventów** → tworzymy dedykowaną dla ofert
- **Struktura:** `proposal_id`, `event_type`, `metadata` (JSONB), `created_at`

## 2. Wykorzystanie istniejących tabel

### `client_documents` (istniejąca)
- **Status:** Istnieje, ale zbyt prosta struktura (brak wersji, snapshotów, linków)
- **Decyzja:** Nie używamy bezpośrednio, ale możemy dodać link/referencję do `proposals.id`
- **Futuro:** `client_documents` może wskazywać na `proposals.id` jako `document_id`

### `client_view_grants`
- **Użycie:** Jeśli klient ma tag `'documents'`, widzi oferty w panelu
- **Integracja:** Oferty będą widoczne w `/panel/documents` jeśli ma grant `'documents'`

## 3. Nowe tabele (minimalne, czego nie mamy)

### 3.1. `proposals` (Oferty)
```sql
- id UUID PRIMARY KEY
- client_id UUID REFERENCES panel_clients(id) -- główny klient
- marketing_client_id UUID REFERENCES marketing_clients(id) -- opcjonalnie (klient bez konta)
- title TEXT NOT NULL
- status: draft/sent/viewed/accepted/expired/archived
- created_by UUID REFERENCES auth.users(id)
- valid_until TIMESTAMPTZ -- opcjonalne wygaśnięcie
- created_at / updated_at
```

### 3.2. `proposal_versions` (Wersje oferty)
```sql
- id UUID PRIMARY KEY
- proposal_id UUID REFERENCES proposals(id)
- version_number INTEGER (1, 2, 3...)
- content JSONB -- struktura sekcji oferty (renderowalna)
- created_at
- created_by UUID REFERENCES auth.users(id)
```

### 3.3. `proposal_access_links` (Linki publiczne)
```sql
- id UUID PRIMARY KEY
- proposal_id UUID REFERENCES proposals(id)
- token TEXT UNIQUE NOT NULL -- random UUID/token
- status: active/revoked
- expires_at TIMESTAMPTZ -- opcjonalnie
- last_opened_at TIMESTAMPTZ
- created_by UUID REFERENCES auth.users(id)
```

### 3.4. `proposal_acceptances` (Akceptacje)
```sql
- id UUID PRIMARY KEY
- proposal_id UUID REFERENCES proposals(id)
- accepted_version_id UUID REFERENCES proposal_versions(id) -- snapshot wersji
- accepted_version_content JSONB -- zamrożona treść (backup)
- accepted_at TIMESTAMPTZ
- accepted_by UUID REFERENCES panel_clients(user_id) -- jeśli z konta
- accepted_by_email TEXT -- jeśli bez konta (public link)
- ip_address TEXT
- user_agent TEXT
- comment TEXT -- opcjonalny komentarz od klienta
```

### 3.5. `proposal_tracking_events` (Eventy trackingowe)
```sql
- id UUID PRIMARY KEY
- proposal_id UUID REFERENCES proposals(id)
- access_link_id UUID REFERENCES proposal_access_links(id) -- jeśli przez public link
- event_type: view/accept/click/scroll
- metadata JSONB -- { ua, referer, section_id, etc. }
- created_at TIMESTAMPTZ
```

## 4. Relacje i integracje

### Relacje FK:
- `proposals.client_id` → `panel_clients.id` (główny klient)
- `proposals.marketing_client_id` → `marketing_clients.id` (opcjonalnie, klient bez konta)
- `proposal_versions.proposal_id` → `proposals.id`
- `proposal_access_links.proposal_id` → `proposals.id`
- `proposal_acceptances.proposal_id` → `proposals.id`
- `proposal_acceptances.accepted_version_id` → `proposal_versions.id`
- `proposal_tracking_events.proposal_id` → `proposals.id`
- `proposal_tracking_events.access_link_id` → `proposal_access_links.id`

### Integracja z `client_view_grants`:
- Klient z grantem `'documents'` widzi przypisane oferty w `/panel/documents`
- RLS: `proposals.client_id IN (SELECT id FROM panel_clients WHERE user_id = auth.uid())`

## 5. Bezpieczeństwo (RLS / Edge Functions)

### Publiczny dostęp (anon):
- **Tylko przez token:** `proposal_access_links.token` → `proposals.id`
- **RLS policy:** Anon może SELECT tylko jeśli token istnieje i jest aktywny
- **Tracking:** Anon może INSERT do `proposal_tracking_events` tylko dla danej `proposal_id` (przez token)

### Admin:
- **Pełny dostęp:** `is_admin() = true` → wszystkie operacje

### Klient (authenticated):
- **Własne oferty:** `proposals.client_id IN (SELECT id FROM panel_clients WHERE user_id = auth.uid())`
- **Akceptacja:** Może INSERT do `proposal_acceptances` dla przypisanych ofert

## 6. Rozszerzalność (fundament pod przyszłość)

### Komentarze:
- **Przyszłość:** Można użyć `comment_threads` (już istnieje) z `funnel_id` → `proposal_id`
- **Lub:** Dedykowana tabela `proposal_comments` (prostsze)

### Warianty/Pakiety:
- **Przyszłość:** Pole `variants JSONB` w `proposal_versions.content` lub osobna tabela `proposal_variants`

### Podpis elektroniczny:
- **Przyszłość:** Pole `signature_data JSONB` w `proposal_acceptances`

### Płatności:
- **Przyszłość:** Link do `invoices` lub osobna tabela `proposal_payments`

## 7. Statusy workflow

```
draft → sent → viewed → accepted
         ↓
      expired / archived
```

- **draft:** Tylko admin widzi, nie wysłana
- **sent:** Link wygenerowany i wysłany
- **viewed:** Klient otworzył ofertę (tracking event)
- **accepted:** Klient zaakceptował (record w `proposal_acceptances`)
- **expired:** `valid_until < NOW()`
- **archived:** Ręcznie przez admina
