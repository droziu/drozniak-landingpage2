-- Utworzenie pierwszej oferty - Uporządkowanie i prowadzenie marketingu Grupy Fibra
-- Uruchom ten skrypt w Supabase SQL Editor
-- UWAGA: Zastąp 'YOUR_USER_ID' swoim UUID użytkownika (możesz znaleźć w auth.users lub użyć auth.uid())

-- 1. Utwórz ofertę
-- UWAGA: Musisz mieć przynajmniej jedno z: client_id lub marketing_client_id
-- Jeśli nie masz jeszcze klienta, możesz najpierw utworzyć ofertę przez UI, a potem zaktualizować treść

-- OPCJA A: Jeśli masz klienta marketingowego, użyj tego:
-- INSERT INTO proposals (
--   title,
--   status,
--   created_by,
--   marketing_client_id,
--   valid_until
-- )
-- VALUES (
--   'Oferta współpracy – uporządkowanie i prowadzenie marketingu Grupy Fibra',
--   'draft',
--   auth.uid(),
--   'MARKETING_CLIENT_UUID', -- Zastąp UUID klienta marketingowego
--   NULL
-- )
-- RETURNING id;

-- OPCJA B: Utwórz ofertę przez UI (/admin/proposals/new), a potem użyj UPDATE poniżej
-- Najpierw utwórz ofertę przez UI, skopiuj jej ID, a potem uruchom UPDATE dla wersji

-- 2. Zaktualizuj treść istniejącej oferty (utworzonej przez UI)
-- Zastąp 'PROPOSAL_ID_HERE' ID oferty z URL (np. /admin/proposals/123e4567-...)

UPDATE proposal_versions
SET content =
  '{
    "sections": [
      {
        "title": "Cel współpracy",
        "content": "Celem współpracy jest zbudowanie spójnego systemu marketingowego dla wszystkich obszarów działalności Grupy Fibra, tak aby:\n• działania marketingowe konsekwentnie generowały zapytania (kupno / sprzedaż / najem / rezerwacje apartamentów),\n• jednocześnie wzmacniały zaufanie do marki poprzez regularną, dobrze zaplanowaną komunikację,\n• proces pozyskania i obsługi kontaktów był uporządkowany i mierzalny.",
        "type": "text"
      },
      {
        "title": "Sposób realizacji",
        "content": "Pracę prowadzę w trzech etapach.",
        "type": "list",
        "items": [
          "Etap 1 — Diagnoza i uporządkowanie obecnej sytuacji: zebranie i opisanie obecnych ścieżek klienta w ramach całej grupy (od pierwszego kontaktu do finalizacji), identyfikacja miejsc, w których klienci odpadają lub w których firma traci kontakty, wskazanie najważniejszych obszarów do poprawy oraz priorytetów na start.",
          "Etap 2 — Projekt docelowego systemu marketingu i sprzedaży: zaprojektowanie docelowej struktury (skąd trafia kontakt, jak jest klasyfikowany, do kogo jest przekazywany i jak wygląda komunikacja po kontakcie), segmentacja kontaktów i zasady komunikacji, plan działań na 3–6 miesięcy z kolejnością wdrożeń i miernikami skuteczności.",
          "Etap 3 — Wdrożenie i działania bieżące: wdrożenie sposobu zbierania kontaktów na stronach internetowych oraz w kanałach komunikacji, uporządkowanie i konfiguracja GetResponse (baza kontaktów, segmenty, automatyzacje), ułożenie modelu prowadzenia mediów społecznościowych (Facebook + YouTube) w formule możliwej do utrzymania, cykliczna analiza wyników i wprowadzanie usprawnień."
        ]
      },
      {
        "title": "Wariant 1 — Strategia i plan działań",
        "content": "Cena: 6 900 zł netto\nCzas realizacji: 7–10 dni roboczych\n\nZakres:\n• opis i uporządkowanie obecnych działań marketingowych w całej grupie,\n• lista wąskich gardeł i rekomendacji zmian (priorytety),\n• plan działań na 3 miesiące wraz z logiką obsługi zapytań (kto obsługuje jaki typ kontaktu),\n• rekomendacje zmian dla stron internetowych (konkretne elementy do wdrożenia),\n• rekomendacje dla komunikacji na Facebooku i YouTube (formaty oraz harmonogram możliwy do utrzymania),\n• spotkanie podsumowujące + dokument z ustaleniami.",
        "type": "pricing",
        "price": 6900
      },
      {
        "title": "Wariant 2 — System leadów + GetResponse + wdrożenia",
        "content": "Cena: 14 900 zł netto\nCzas realizacji: 3–4 tygodnie\n\nZakres obejmuje wszystko z Wariantu 1 oraz:\n• konfigurację zbierania kontaktów na stronach internetowych (formularze / przyciski / komunikaty),\n• logiczne kierowanie zapytań do właściwych osób lub zespołów (w zależności od rodzaju zapytania),\n• uporządkowanie i konfigurację GetResponse: struktura list, segmenty, podstawowe automatyzacje,\n• ustawienie podstawowego pomiaru skuteczności działań (żeby było wiadomo, które źródła generują wartościowe kontakty),\n• przygotowanie modelu prowadzenia Facebook + YouTube w formule regularnej i możliwej do utrzymania,\n• spotkania w trakcie wdrożenia + odbiór końcowy wraz z instrukcją dla zespołu.",
        "type": "pricing",
        "price": 14900
      },
      {
        "title": "Wariant 3 — Pełne wdrożenie + nowa strona internetowa dla etapu III",
        "content": "Cena: 29 900 zł netto\nCzas realizacji: 6–8 tygodni\n\nZakres obejmuje wszystko z Wariantu 2 oraz:\n• projekt i wdrożenie nowej strony internetowej dla etapu III (układ, treści, struktura pod pozyskiwanie kontaktów),\n• przygotowanie mechanizmów pozyskiwania zapytań (czytelne scenariusze: pytanie o lokal, prośba o kontakt, umówienie rozmowy),\n• przygotowanie treści sprzedażowych i informacyjnych na stronę (język profesjonalny, bez przesadnej „reklamowości"),\n• integrację strony z procesem pozyskania kontaktów i GetResponse,\n• przygotowanie 2–3 dedykowanych podstron pod kampanie (np. osobne strony pod reklamy i konkretne cele).\n\nBudżety reklamowe (Meta / Google) są rozliczane osobno i ustalane po rozmowie. Jako punkt odniesienia: przy tej skali sensowny poziom testów i stałych działań to zwykle 3 000–10 000 zł miesięcznie.",
        "type": "pricing",
        "price": 29900
      },
      {
        "title": "Retainer A — Utrzymanie i porządek",
        "content": "Cena: 4 900 zł netto / miesiąc\n\nZakres:\n• plan i koordynacja publikacji Facebook + YouTube w formule możliwej do utrzymania,\n• 1 mailing w miesiącu + bieżące, drobne usprawnienia automatyzacji,\n• miesięczne podsumowanie działań i priorytety na kolejny miesiąc,\n• bieżące poprawki na stronach: treści, nagłówki, sekcje, drobne zmiany układu (w rozsądnym zakresie).",
        "type": "pricing",
        "price": 4900
      },
      {
        "title": "Retainer B — Rozwój i optymalizacja wyników",
        "content": "Cena: 7 900 zł netto / miesiąc\n\nZakres obejmuje wszystko z Retainera A oraz:\n• prowadzenie i optymalizacja kampanii reklamowych (Meta / Google),\n• 2 mailingi w miesiącu + rozwój segmentów w GetResponse,\n• 1 nowa strona kampanijna w miesiącu (pod konkretny cel),\n• stała optymalizacja stron internetowych: treści, układ, elementy wpływające na konwersję,\n• regularne identyfikowanie i usuwanie tarć w procesie obsługi kontaktów.",
        "type": "pricing",
        "price": 7900
      },
      {
        "title": "Retainer C — Marketing + szybkie wdrożenia internetowe w trybie ciągłym",
        "content": "Cena: 11 900 zł netto / miesiąc\n\nZakres obejmuje wszystko z Retainera B oraz:\n• większe prace wdrożeniowe na stronach w trybie ciągłym (rozbudowy, nowe podstrony, testy),\n• 2 strony kampanijne w miesiącu + regularne prace optymalizacyjne,\n• rozszerzona analiza i wnioski: co jest zmieniane, dlaczego i jaki efekt ma to przynieść.",
        "type": "pricing",
        "price": 11900
      },
      {
        "title": "Jak zaakceptować ofertę",
        "content": "Aby zaakceptować ofertę, wystarczy kliknąć przycisk poniżej i wypełnić krótki formularz.\n\nPo otrzymaniu wiadomości potwierdzam przyjęcie zlecenia i wysyłam krótkie podsumowanie ustaleń (zakres + termin startu).\n\nCo dzieje się po akceptacji:\n1. Ustalenie startu i osób kontaktowych — W pierwszej wiadomości proszę o wskazanie jednej osoby do bieżącego kontaktu oraz osoby decyzyjnej (jeśli to różne osoby).\n2. Checklista startowa i dostęp do materiałów — Wysyłam krótką checklistę rzeczy potrzebnych do rozpoczęcia (np. dostępy do kont reklamowych, GetResponse, analityka stron, materiały firmowe). Jeżeli części dostępów nie ma lub nie są gotowe — pracę rozpoczynamy od tego, co jest dostępne, a brakujące elementy uzupełniamy w trakcie.\n3. Rozpoczęcie prac — Rozpoczynam realizację zgodnie z wybranym wariantem i ustalonym terminem startu. W trakcie prac przesyłam bieżące podsumowania i kolejne kroki do zatwierdzenia, jeśli są potrzebne.\n4. Rozliczenie — Warianty wdrożeniowe (1 / 2 / 3): rozliczenie zgodnie z wybranym zakresem (faktura według ustaleń). Współpraca miesięczna (retainer): faktura wystawiana na koniec miesiąca za miesiąc realizacji.",
        "type": "text"
      }
    ]
  }'::jsonb
WHERE proposal_id = 'PROPOSAL_ID_HERE' -- ZASTĄP ID OFERTY Z URL
AND version_number = 1;

-- INSTRUKCJA KROK PO KROKU:
-- 
-- 1. Otwórz aplikację i przejdź do /admin/proposals/new
-- 2. Wypełnij formularz:
--    - Tytuł: "Oferta współpracy – uporządkowanie i prowadzenie marketingu Grupy Fibra"
--    - Status: Szkic (lub inny)
--    - Opcjonalnie: przypisz do klienta (panel lub marketing)
-- 3. Kliknij "Utwórz ofertę"
-- 4. Skopiuj ID oferty z URL (np. /admin/proposals/123e4567-e89b-12d3-a456-426614174000)
-- 5. Otwórz Supabase SQL Editor
-- 6. Zastąp 'PROPOSAL_ID_HERE' w powyższym UPDATE skopiowanym ID
-- 7. Uruchom UPDATE (cały blok z JSONB)
-- 8. Wróć do aplikacji i odśwież stronę oferty - powinieneś zobaczyć pełną treść
-- 9. Użyj przycisku "Generuj link", aby utworzyć publiczny link do oferty
-- 10. Skopiuj link i wyślij go klientowi
--
-- ALTERNATYWA (jeśli chcesz utworzyć wszystko przez SQL):
-- 1. Najpierw znajdź lub utwórz klienta marketingowego
-- 2. Odkomentuj OPCJĘ A powyżej i zastąp 'MARKETING_CLIENT_UUID'
-- 3. Uruchom INSERT dla proposals
-- 4. Skopiuj zwrócone ID i użyj w UPDATE dla proposal_versions
