-- =====================================================
-- DODANIE DRUGIEGO POSTA BLOGA
-- =====================================================
-- Tytuł: Dlaczego strona nie sprzedaje, mimo że ludzie wchodzą?
-- Title Tag: Dlaczego strona nie sprzedaje? Najczęstsze przyczyny i konkretne poprawki
-- Slug: dlaczego-strona-nie-sprzedaje
-- Kategoria: Marketing
-- =====================================================

DO $$
DECLARE
  v_category_id UUID;
  v_author_id UUID;
  v_slug TEXT := 'dlaczego-strona-nie-sprzedaje';
  v_content JSONB;
BEGIN
  SELECT id INTO v_category_id FROM blog_categories WHERE slug = 'marketing' LIMIT 1;
  IF v_category_id IS NULL THEN
    INSERT INTO blog_categories (name, slug, description, color)
    VALUES ('Marketing', 'marketing', 'Artykuły o marketingu i pozyskiwaniu klientów', '#fee715')
    RETURNING id INTO v_category_id;
  END IF;

  SELECT id INTO v_author_id FROM auth.users WHERE email = 'stanislaw@drozniak.com' LIMIT 1;
  IF v_author_id IS NULL THEN
    SELECT id INTO v_author_id FROM auth.users LIMIT 1;
  END IF;

  v_content := '{
    "blocks": [
      {
        "type": "text",
        "id": "intro-1",
        "data": {
          "text": "<p>Masz wejścia na stronę. Widzisz ruch z Google, social mediów albo reklam. A w skrzynce mailowej cisza. Telefon milczy.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "intro-2",
        "data": {
          "text": "<p>Brzmi znajomo?</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "intro-3",
        "data": {
          "text": "<p>Większość firm w tym momencie robi nerwowy ruch: dokupuje więcej reklam. To błąd.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "intro-4",
        "data": {
          "text": "<p>Jeśli wlewasz wodę do dziurawego wiadra, to rozwiązaniem nie jest odkręcenie kranu mocniej, tylko wymiana wiadra (lub załatanie dziur).</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "intro-5",
        "data": {
          "text": "<p>W tym artykule pokażę Ci, jak podejść do swojej strony jak do systemu. Przestaniesz zgadywać dlaczego klienci uciekają i zaczniesz opierać swoje działania marketingowo-sprzedażowe na konkretnych danych.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "separator",
        "id": "sep-1",
        "data": {}
      },
      {
        "type": "heading",
        "id": "section-dla-kogo",
        "data": {
          "text": "Dla kogo jest ten artykuł?<br>(A dla kogo nie)"
        }
      },
      {
        "type": "text",
        "id": "dla-kogo-1",
        "data": {
          "text": "<p>Wolę to zaznaczyć już na starcie, żeby nie marnować Twojego czasu. To, co piszę, sprawdzi się u Ciebie, jeśli:</p>",
          "alignment": "left"
        }
      },
      {
        "type": "highlight",
        "id": "highlight-dla-kogo",
        "data": {
          "title": "ARTYKUŁ JEST DLA CIEBIE, JEŚLI",
          "text": "<ul><li>Sprzedajesz usługi (np. doradztwo, wykonawstwo, obsługa B2B).</li><li>Masz produkty cyfrowe lub kursy i zależy Ci na sprzedaży z landing page''a.</li><li>Prowadzisz lokalny biznes i liczysz na telefony lub formularze od klientów.</li></ul>"
        }
      },
      {
        "type": "text",
        "id": "dla-kogo-2",
        "data": {
          "text": "<p>Jeśli masz duży sklep e-commerce z setkami/tysiącami produktów - ten tekst może być dla Ciebie mniej przydatny. Tam działają inne mechanizmy, a optymalizacja koszyka przy 5000 produktów to zupełnie inna gra niż pozyskiwanie zapytań (czyli leadów) na usługi.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "dla-kogo-3",
        "data": {
          "text": "<p>Jeśli zostałeś w pierwszej grupie - czytaj dalej.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "highlight",
        "id": "po-lekturze",
        "data": {
          "title": "PO LEKTURZE TEJ CZĘŚCI BĘDZIESZ WIEDZIAŁ",
          "text": "<ul><li>Co dokładnie na Twojej stronie jest <strong>konwersją</strong> (czyli realnym sukcesem), a co jest tylko pustym licznikiem odwiedzin.</li><li>Jakie <strong>3–5 rzeczy</strong> musisz sprawdzić, zanim wydasz kolejną złotówkę na reklamy.</li><li>Dlaczego „ładna strona” to za mało, żeby sprzedać.</li></ul>"
        }
      },
      {
        "type": "cta",
        "id": "cta-1",
        "data": {
          "ctaText": "Jeśli nie chcesz diagnozować tego sam i wolisz gotowe rozwiązanie – zobacz moją ofertę. Tworzę strony www, które są ultraszybkie i układane przez osobę znającą marketing i sprzedaż, a nie tylko kodowanie. Biorę pod uwagę cały Twój biznes, żeby strona realnie działała i przynosiła efekty.",
          "ctaLink": "https://drozniak.pl/strony-www",
          "ctaStyle": "primary"
        }
      },
      {
        "type": "separator",
        "id": "sep-2",
        "data": {}
      },
      {
        "type": "heading",
        "id": "section-ruch",
        "data": {
          "text": "Ruch to nie wynik"
        }
      },
      {
        "type": "text",
        "id": "ruch-1",
        "data": {
          "text": "<p>Więcej ruchu zawsze można \"kupić\", ale to, czy ktoś się odezwie, zależy od tego, co dzieje się PO wejściu:</p><ul><li>Czy trafiła do Ciebie właściwa osoba?</li><li>Czy rozumie Twoją ofertę błyskawicznie?</li><li>Czy ma zaufanie do tego, co widzi?</li><li>Czy wie dokładnie, co ma zrobić dalej i czy ten krok nie jest dla niego trudny lub irytujący?</li></ul>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "ruch-2",
        "data": {
          "text": "<p>Google coraz mocniej przykłada wagę do jakości doświadczenia strony - m.in. do Core Web Vitals. Jeśli strona jest wolna, niestabilna wizualnie albo źle reaguje na kliknięcia, trudniej o dobre efekty (i w SEO, i w sprzedaży). O najważniejszych rzeczach wspominam w artykule, ale więcej o tym podejściu możesz przeczytać w dokumentacji Google: <a href=\"https://web.dev/inp-cwv\" class=\"link-yellow\" target=\"_blank\" rel=\"noopener noreferrer\">INP i Core Web Vitals</a>.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "separator",
        "id": "sep-3",
        "data": {}
      },
      {
        "type": "heading",
        "id": "section-gdzie-problem",
        "data": {
          "text": "Gdzie leży problem?<br>(Dobre osoby vs. Zła strona)"
        }
      },
      {
        "type": "text",
        "id": "gdzie-1",
        "data": {
          "text": "<p>Większość firm uzyskuje ruch na stronę z kilku źródeł jednocześnie. I w każdym z tych przypadków możemy dość precyzyjnie przewidzieć, z czym ten człowiek do nas przychodzi:</p>",
          "alignment": "left"
        }
      },
      {
        "type": "highlight",
        "id": "highlight-zrodla",
        "data": {
          "title": "ŹRÓDŁA RUCHU I OCZEKIWANIA:",
          "text": "<ul><li><strong>Wyszukiwarka:</strong> Ktoś wpisuje hasło, widzi Twoją stronę i klika. Ma konkretne oczekiwania, które możemy trafnie przewidzieć na podstawie tego, co wpisał.</li><li><strong>Social Media (link w bio):</strong> Skoro ktoś klika w Twój profil, to zapewne ogląda Twoje filmy i czyta posty. Wiesz więc, jaki typ osoby Cię ogląda i po co najpewniej klika (szuka rozwinięcia tematu).</li><li><strong>Płatna reklama:</strong> Tu masz największą kontrolę. To Ty ustawiasz tekst, zdjęcie, wideo i grupę odbiorców. Ty „aranżujesz” jego oczekiwania. Dlatego powinieneś być w stanie całkiem dobrze wymodelować to, co ma w głowie większość klikających (pomijając grupę wiecznych „ciekawskich”).</li></ul>"
        }
      },
      {
        "type": "text",
        "id": "gdzie-2",
        "data": {
          "text": "<p>I najczęściej z tym właśnie bagażem oczekiwań potencjalni klienci lądują u Ciebie na stronie, szukając podświadomie odpowiedzi na proste pytania: „Czy to dla mnie?”, „Ile to kosztuje?”, „Czy oni rozwiążą mój problem?”.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "gdzie-3",
        "data": {
          "text": "<p>Oczywiście, wszystkich nie przekonasz. Zawsze będziesz mieć na stronie grupę osób, które kliknęły, ale nigdy nie zamierzały nic kupić. To jest normalne, tak po prostu działa internet.</p><p>Problem pojawia się wtedy, gdy okazuje się, że praktycznie nikt nie kupuje ani nie pyta. Bo to oznacza, że nie ma połączenia na linii: odpowiedni klient - odpowiednia oferta. To bardzo silny sygnał, że coś tu nie gra. Zazwyczaj wpadasz w jeden z dwóch scenariuszy:</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "scenariusz-1",
        "data": {
          "text": "<h3>Scenariusz 1: Sprowadzasz DOBRE OSOBY na ZŁĄ STRONĘ</h3><p>Masz świetny ruch (potencjalni idealni klienci), ale wchodzą na stronę, która: nie odpowiada na ich pytania i problemy, jest chaotyczna i niespójna, utrudnia kontakt (ukryty numer, niedziałający lub długi, skomplikowany formularz).</p><p>Efekt? Masz klienta na tacy, ale strona go „wypuszcza”.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "scenariusz-2",
        "data": {
          "text": "<h3>Scenariusz 2: Sprowadzasz ZŁE OSOBY na DOBRĄ STRONĘ</h3><p>Czasem (chociaż dużo rzadziej), Twoja strona jest świetna - przejrzysta, szybka, z dobrą ofertą. Ale trafiają na nią ludzie, którzy wcale tej oferty nie potrzebują.</p><p>Mój ulubiony przykład: Zajmujesz się profesjonalnym montażem wideo dla firm. Ale Twoje posty w social mediach i reklamy skupiają się na edukowaniu „jak montować filmy” i jakich skrótów klawiszowych używać. Kogo przyciągasz? Innych montażystów i amatorów, którzy chcą się uczyć (i nie mają budżetu), a nie właścicieli firm, którzy chcą zlecić usługę. I to Ci właśnie odbiorcy klikają później Twój link w opisie, zapewne szukając dalszych porad (albo np. kursu), ewentualnie chcąc dowiedzieć się \"co tam u konkurencji\".</p><p>Wtedy nawet najlepsza strona nie sprzeda, bo trafia do niewłaściwych oczu.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "gdzie-4",
        "data": {
          "text": "<p>Oczywiście rzadko jest to tak czarno-białe, w większości przypadków można poprawić zarówno grupę odbiorców i komunikację reklamy, jak również samą stronę i ofertę. Ale jeśli masz duży ruch i zero zapytań - to masz pewność, że w jednym z tych obszarów jest pożar.</p><p>W dalszej części artykułu rozbierzemy to na czynniki pierwsze. Ale zanim do tego przejdziemy, zacznijmy od absolutnej podstawy, bez której ani rusz.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "separator",
        "id": "sep-4",
        "data": {}
      },
      {
        "type": "numbered-section",
        "id": "num-1",
        "data": {
          "number": 1,
          "text": "DEFINICJA PROBLEMU I POMIAR"
        }
      },
      {
        "type": "text",
        "id": "s1-1",
        "data": {
          "text": "<p>Jeśli miałbym wskazać jedną rzecz, która najszybciej rozdziela firmy z wynikami od firm bez wyników, to prawdopodobnie wskazałbym właśnie pomiar - czy zbierasz dane i je analizujesz? Chociaż w podstawowym zakresie?</p><p>Bez pomiaru działasz na bazie emocji:</p><ul class=\"list-disc pl-6 space-y-2 my-4\"><li><strong>„No kurczę, nie klikają ludzie.”</strong></li><li><strong>„Przecież formularz jest OK, o co chodzi?”</strong></li><li><strong>„Pewnie social media nie działają.”</strong></li></ul><p class=\"mt-8\">A potem na podstawie tych błyskotliwych teorii robisz zmiany, które „wydają się” sensowne… ale prawie na pewno nie trafiają w realny problem.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "s1-2",
        "data": {
          "text": "<p>To nawet zabawne, bo jest bardzo oczywiste, że to prawda, a jednak sporo osób dalej \"zlewa temat\", mimo że w codziennym życiu nigdy by się tak nie zachowywali.</p><p>Jeśli zadzwoni do Ciebie znajomy i powie: „Ej, zepsuło mi się auto, co mam zrobić?”, to przecież nie odpowiesz w ciemno: „Wymień skrzynię biegów”, nie znając kontekstu. Musisz zadać więcej pytań, a często musisz później jeszcze zrobić trochę testów, żeby zobaczyć co naprawdę jest przyczyną.</p><p>A mówimy tutaj o samochodzie, którego budowa i układ jest bardzo powtarzalny.</p><p>Psychologia zakupu klienta to dużo bardziej złożony i nieprzewidywalny proces, więc tym bardziej opieranie swoich działań na bazie „wydaje mi się” to strzał w kolano.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "heading",
        "id": "s1-konwersja",
        "data": {
          "text": "Konwersja i mikrokonwersja - co to właściwie jest?"
        }
      },
      {
        "type": "text",
        "id": "s1-3",
        "data": {
          "text": "<p>To terminy, które pewnie słyszałeś wielokrotnie i być może znasz bardzo dobrze, ale pozwolę sobie na krótkie zdefiniowanie tych pojęć, żebyśmy wiedzieli o czym właściwie rozmawiamy.</p><p><strong>Konwersja</strong> - to po prostu moment, w którym użytkownik robi to, na czym Ci zależy najbardziej (realny efekt biznesowy). W zależności od Twojej strony to może być: wysłanie formularza, umówienie rozmowy w kalendarzu, kliknięcie w numer telefonu (na komórce), zakup.</p><p><strong>Mikrokonwersja</strong> - to mniejszy krok, który daje nam informację, że: „użytkownik jest zainteresowany i jest coraz bliżej”. Czyli np.: kliknięcie w przycisk „Sprawdź ofertę”, przewinięcie do sekcji z cennikiem, wejście w zakładkę „O mnie” lub FAQ.</p><p>W narzędziach analitycznych (jak Google Analytics 4) nazywa się to zdarzeniami (events). Musisz wiedzieć, które z nich są dla Ciebie kluczowe. Bez tego albo działasz po omacku, albo będziesz sobie malował trawę na zielono, przekonując sam siebie, że coś tam działa, bo \"ludzie robią XYZ\" na stronie.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "highlight",
        "id": "checklist-pomiar",
        "data": {
          "title": "CHECKLISTA MINIMALNYCH POMIARÓW",
          "text": "<p>Żeby zacząć - wystarczą naprawdę proste rzeczy. Oto mój zestaw bazowy:</p><ul><li><strong>Pierwsza warstwa: co sprowadza ruch z Google</strong><br>W darmowym narzędziu Google Search Console sprawdź: Jakie zapytania faktycznie generują kliknięcia? Czy ludzie wchodzą, bo chcą coś kupić (intencja zakupowa), czy szukają darmowej wiedzy?</li><li><strong>Druga warstwa: co ludzie robią na stronie</strong><br>W Google Analytics musisz widzieć coś więcej niż „odsłony”. Sprawdź: ile osób klika w główne przyciski (np. „Umów rozmowę”, „Wyślij zapytanie”), ile osób faktycznie wysyła formularz (a nie tylko wchodzi na podstronę kontaktu), ile osób klika w e-mail/telefon.</li><li><strong>Trzecia warstwa: skąd są zapytania</strong><br>Czy zapytania przychodzą z SEO (wyników wyszukiwania)? Czy z social mediów? A może z płatnych reklam? Często okazuje się, że social media robią dużo szumu i wejść (zasięg), ale realni klienci przychodzą z Google. Albo odwrotnie.</li></ul>"
        }
      },
      {
        "type": "text",
        "id": "s1-4",
        "data": {
          "text": "<p><strong>Spróbujmy zdiagnozować Twoją stronę w kilka minut.</strong> Zanim przejdziesz do kolejnego rozdziału, odpowiedz sobie na te pytania:</p><ul><li><strong>Z jakich źródeł masz najwięcej wejść, a z którego masz realne zapytania?</strong></li><li><strong>Która podstrona ma najwięcej ruchu i ile osób klika tam w „Kontakt”?</strong></li><li><strong>Czy użytkownik po wejściu ma jeden, oczywisty krok dalej, czy dajesz mu pięć różnych opcji do wyboru?</strong></li><li><strong>Czy Twoja strona wprost odpowiada na pytania o cenę i zakres, czy każe użytkownikowi dzwonić „po wycenę” bez podania nawet widełek?</strong></li></ul><p>Jeśli nie umiesz na to odpowiedzieć w ciągu kilku minut - to znaczy, że możesz jeszcze sporo poprawić w tym zakresie, a to z kolei powinno w widoczny sposób wpłynąć na Twoje wyniki sprzedażowe.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "separator",
        "id": "sep-5",
        "data": {}
      },
      {
        "type": "numbered-section",
        "id": "num-2",
        "data": {
          "number": 2,
          "text": "OFERTA I KOMUNIKAT NA PIERWSZYM EKRANIE"
        }
      },
      {
        "type": "text",
        "id": "s2-1",
        "data": {
          "text": "<p>Dlaczego ludzie wchodzą na stronę i się nie odzywają? Bardzo często dlatego, że nie wiedzą, co właściwie im oferujesz. Trudno ich winić. Użytkownik w internecie jest bardzo niecierpliwy i często ma setki opcji do wyboru. Masz bardzo mało czasu. Jeśli pierwszy ekran nie odpowiada na pytanie: czy to jest dla mnie i co ja z tego mam, wiele osób wraca do wyników.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "heading",
        "id": "s2-test",
        "data": {
          "text": "Zrób „Test Jednego Zdania”"
        }
      },
      {
        "type": "highlight",
        "id": "s2-formula-panel",
        "data": {
          "title": "WZÓR DO UZUPEŁNIENIA",
          "subtitle": "Dokończ to zdanie w imieniu swojego klienta, patrząc na pierwszy ekran swojej strony:",
          "text": "<p style=\"text-align:center;font-size:1.25rem;font-weight:600;color:#101820;line-height:1.6;margin:0\">„Ta firma pomaga <strong style=\"text-decoration:underline;text-decoration-color:#fee715;text-underline-offset:4px\">[KOMU?]</strong> osiągnąć <strong style=\"text-decoration:underline;text-decoration-color:#fee715;text-underline-offset:4px\">[CO?]</strong> dzięki <strong style=\"text-decoration:underline;text-decoration-color:#fee715;text-underline-offset:4px\">[CZEMU?]</strong>.”</p>"
        }
      },
      {
        "type": "text",
        "id": "s2-2",
        "data": {
          "text": "<p>To ćwiczenie szybko pomaga pozbyć się ogólników i ustalić czy klient w ogóle rozumie, co sprzedajesz. Spójrz na swoją stronę główną (pierwszy ekran, bez przewijania) i uzupełnij powyższy wzór.</p><p>Jeśli pierwsze co widzi klient na stronie głównej to wielki komunikat: „Jesteśmy liderem innowacyjnych rozwiązań o ugruntowanej pozycji”, to oblałeś test. To nic nie znaczy. Klient nie wie, czy naprawiasz kran, czy wdrażasz systemy automatyzacji AI.</p><p>Dobra strona mówi wprost:</p><p class=\"my-6 pl-4 border-l-4 border-[#fee715]\">„Pomagam biurom rachunkowym <strong>[KOMU]</strong> wyeliminować ręczne wpisywanie faktur <strong>[EFEKT]</strong> dzięki wdrożeniu systemu OCR <strong>[SPOSÓB]</strong>.”</p><p class=\"my-6 pl-4 border-l-4 border-[#fee715]\">„Tworzymy strony www dla deweloperów <strong>[KOMU]</strong>, które sprzedają mieszkania bez udziału pośredników <strong>[EFEKT]</strong>.”</p><p>Różnica jest widoczna gołym okiem. Konkret buduje zaufanie, a ogólniki tylko nawarstwiają pytania i wątpliwości.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "heading",
        "id": "s2-blad",
        "data": {
          "text": "Błąd: „Robimy wszystko dla wszystkich”"
        }
      },
      {
        "type": "text",
        "id": "s2-3",
        "data": {
          "text": "<p>Częstym powodem braku zapytań jest paradoks wyboru. Chcesz pozyskać każdego klienta, więc piszesz: „Robimy strony, sklepy, grafiki, logo, social media, reklamy i drukujemy wizytówki”. Wydaje Ci się, że zwiększasz szansę na zarobek. W rzeczywistości takie podejście najczęściej bardzo ogranicza potencjał sprzedaży.</p><p>To zjawisko nazywa się Choice Overload (przeciążenie wyborem). Znane badanie Iyengar i Lepper (opisane m.in. <a href=\"https://business.columbia.edu/faculty/research/when-choice-demotivating-can-one-desire-too-much-good-thing\" class=\"link-yellow\" target=\"_blank\" rel=\"noopener noreferrer\">tutaj</a>) pokazało to na przykładzie dżemów.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "quote",
        "id": "s2-dzem-quote",
        "data": {
          "quote": "Gdy na stoisku były 24 smaki dżemu, zatrzymywało się więcej ludzi (60%), ale kupowało tylko 3%. Gdy wystawiono tylko 6 smaków, zatrzymało się mniej osób (40%), ale kupiło aż 30%.",
          "author": ""
        }
      },
      {
        "type": "text",
        "id": "s2-3b",
        "data": {
          "text": "<p>Wniosek? Zbyt duży wybór paraliżuje decyzję. Jeśli Twoja strona lub landing page próbuje sprzedawać 10 różnych usług naraz, klient nie wybiera żadnej.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "s2-4",
        "data": {
          "text": "<p>Czy to oznacza, że nie możesz oferować wielu usług? Nie. Chodzi o to, żeby nie przytłaczać opcjami, gdy klient dopiero wchodzi na stronę z konkretnym problemem. A szczególnie jeśli dopiero zaczynasz, wtedy walka na \"szerokim froncie\" to samobójstwo. Skup się na jednej głównej obietnicy, a najlepiej takiej, która od razu pozycjonuje Cię jako specjalistę.</p><p><strong>Spójrz na tę różnicę:</strong></p>",
          "alignment": "left"
        }
      },
      {
        "type": "highlight",
        "id": "s2-porownanie-catering-sushi",
        "data": {
          "title": "OGÓLNIK VS KONKRET",
          "text": "<div style=\"margin:1rem 0\"><div style=\"border:2px solid #e5e7eb;background:#f9fafb;padding:1.25rem 1.5rem;border-radius:6px;margin-bottom:1rem\"><p style=\"font-weight:700;font-size:1.15rem;color:#101820;margin:0 0 0.5rem 0\">„Usługi cateringowe”</p><p style=\"margin:0;line-height:1.65;color:#101820;font-size:1rem\">W tej kategorii jesteś wyborem nr 50. Konkurujesz z każdym barem, restauracją i firmą w mieście. Klient nie ma powodu, żeby wybrać akurat Ciebie.</p></div><div style=\"border:2px solid #fee715;background:#fffbeb;padding:1.25rem 1.5rem;border-radius:6px\"><p style=\"font-weight:700;font-size:1.15rem;color:#101820;margin:0 0 0.5rem 0\">„Sushi na wesela”</p><p style=\"margin:0;line-height:1.65;color:#101820;font-size:1rem\">W tej kategorii stajesz się wyborem nr 1 dla konkretnej pary młodej, która szuka dokładnie tego: sushi na wesele. Eliminujesz konkurencję. Być może gigant w Twoim mieście, który oferuje usługi cateringowe, również ma opcję dostarczenia sushi na wesele, ale jeśli Twoja oferta dotyczy właśnie tego aspektu - znacznie łatwiej będzie zbudować zaufanie, pokazać specjalizację, a nawet pozycjonować się wyżej.</p></div></div>"
        }
      },
      {
        "type": "text",
        "id": "s2-4b",
        "data": {
          "text": "<p>Jeśli regularnie robisz wiele rzeczy i prowadzisz większą firmę - w porządku. Ale nie wrzucaj wszystkiego w jedno miejsce. Podziel ofertę. Landing page powinien sprzedawać jedną rzecz (lub jedną kategorię), a nie całą historię działalności firmy. Ustal jedną główną obietnicę na pierwszy ekran.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "heading",
        "id": "s2-dowody",
        "data": {
          "text": "Dowody, a nie ozdobniki"
        }
      },
      {
        "type": "text",
        "id": "s2-5",
        "data": {
          "text": "<p>W usługach klient nie chce kupować „kota w worku”. Naturalnie boi się, że przepali pieniądze, straci czas albo się zbłaźni. Dlatego sekcja „Zaufali nam” lub „Opinie” to należy potraktować jak narzędzie uspokajające klienta. Co działa? Konkretne liczby i przykłady prac. Case study (dobrze opisane). Opinia z imieniem, nazwiskiem i zdjęciem (lub linkiem do LinkedIn). Jeśli Twoja oferta jest jasna, a dowody mocne - przechodzisz do najtrudniejszego tematu. Pieniędzy.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "separator",
        "id": "sep-6",
        "data": {}
      },
      {
        "type": "numbered-section",
        "id": "num-3",
        "data": {
          "number": 3,
          "text": "CENA, OCZEKIWANIA I „WIDEŁKI”, KTÓRE NIE ZABIJAJĄ SPRZEDAŻY"
        }
      },
      {
        "type": "text",
        "id": "s3-1",
        "data": {
          "text": "<p>Tu wchodzimy na grząski grunt. Wiele firm broni się rękami i nogami przed pokazaniem cen na stronie:</p><ul class=\"list-disc pl-6 space-y-2 my-4\"><li>„To zależy\"</li><li>„Każdy projekt jest inny\"</li><li>„Nie chcemy odstraszyć konkurencji\"</li></ul><p><strong>Czy cena absolutnie musi być na stronie?</strong> Oczywiście nie musi. Są branże, gdzie każdy projekt to inna historia (custom software, skomplikowane wdrożenia budowlane). Czasami się po prostu nie da, albo wymaga to głębszej analizy. To jest w porządku.</p><p>Ale trzeba pamiętać o jednej rzeczy: <strong>Dla Twojego klienta cena jest ważna. Zawsze.</strong> Badania (publikowane m.in. przez <a href=\"https://www.hbs.edu/faculty/Pages/item.aspx?num=56467\" class=\"link-yellow\" target=\"_blank\" rel=\"noopener noreferrer\">HBR</a>) wskazują na zjawisko Cost Transparency (przejrzystość kosztów). Firmy, które ujawniają koszty lub ich składowe, są postrzegane jako bardziej godne zaufania.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "s3-2",
        "data": {
          "text": "<p>Dlatego, jeśli nie masz cennika na stronie, <strong>musisz mieć:</strong></p><ul class=\"list-disc pl-6 space-y-3 my-4\"><li><strong>Dobry argument DLACZEGO</strong> – np. „Każdy projekt wyceniamy indywidualnie, bo zależy to od X i Y”</li><li><strong>Szybki system podania ceny</strong> w procesie sprzedaży</li><li><strong>Przykładowe realizacje z wyceną</strong> – przygotuj kilka i opublikuj na stronie; wtedy klient będzie widział zakres wykonywanych prac i z jakimi kosztami się to wiąże</li></ul><p>Żeby lepiej zilustrować, jak to działa w praktyce – spróbuj odpowiedzieć na pytanie: <strong>ile kosztują poniższe usługi?</strong></p>",
          "alignment": "left"
        }
      },
      {
        "type": "highlight",
        "id": "s3-2-pytania",
        "data": {
          "title": "ILE KOSZTUJĄ PONIŻSZE USŁUGI?",
          "text": "<p style=\"margin:0 0 1.25rem 0;line-height:1.7;color:#101820\">Rzeczoznawca majątkowy (operat szacunkowy, np. do kredytu lub spadku)?</p><p style=\"margin:0 0 1.25rem 0;line-height:1.7;color:#101820\">Testy penetracyjne (symulowane ataki hakerskie) dla małej aplikacji?</p><p style=\"margin:0 0 1.25rem 0;line-height:1.7;color:#101820\">Sprzątanie po zgonie (dezynfekcja itp.)?</p><p style=\"margin:0;line-height:1.7;color:#101820\">Diagnoza ADHD u dorosłych (prywatnie)?</p>"
        }
      },
      {
        "type": "text",
        "id": "s3-2c",
        "data": {
          "text": "<p>Jeśli nigdy nie miałeś do czynienia z w/w usługami – trudne będzie oszacowanie nawet rzędu wielkości. Dlatego tak ważne jest, żeby dać chociaż klientowi jakiś punkt odniesienia.</p><p>Jeśli wiesz, że Twoja usługa to minimum 2000 zł przy podstawowym zakresie, a klient ma budżet 500 zł – po co marnować Twój i jego czas?</p>",
          "alignment": "left"
        }
      },
      {
        "type": "heading",
        "id": "s3-nie-ciagnij",
        "data": {
          "text": "Nie ciągnij klienta za nos"
        }
      },
      {
        "type": "text",
        "id": "s3-3",
        "data": {
          "text": "<p>Najgorsze, co możesz zrobić, to ukrywać cenę, a potem przeciągać proces w nieskończoność. Klient dzwoni, Ty mówisz \"spotkajmy się\", potem \"zróbmy warsztat\", potem \"wyślę brief\", a po 2 tygodniach wysyłasz ofertę, która 5-krotnie przekracza jego budżet. To strata czasu - Twojego i klienta. I ogromna frustracja, która zabija szansę na polecenia.</p><p>Jeśli nie ma cen na stronie, Twój proces obsługi zapytania musi to nadrabiać: Już na pierwszej rozmowie powinieneś być w stanie określić szacunkowe widełki (\"Zazwyczaj takie wdrożenia to koszt między 15 a 25 tysięcy\"). Jeśli nie możesz tego zrobić - wyślij ofertę wstępną błyskawicznie po rozmowie.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "s3-4",
        "data": {
          "text": "<p><strong>Jak pisać o cenie?</strong></p><p>Weźmy dla przykładu branżę projektowania wnętrz. Dwa typy zapytań – dwa podejścia:</p>",
          "alignment": "left"
        }
      },
      {
        "type": "highlight",
        "id": "s3-4-wnetrza",
        "data": {
          "title": "PRZYKŁAD: PROJEKTOWANIE WNĘTRZ",
          "text": "<div style=\"margin:0\"><div style=\"border:2px solid #e5e7eb;background:#f9fafb;padding:1.25rem 1.5rem;border-radius:6px;margin-bottom:1.25rem\"><p style=\"font-weight:700;font-size:1.05rem;color:#101820;margin:0 0 0.5rem 0\">Klient wpisuje w Google: „projekt łazienki online cena” lub „porada architekta cennik”</p><p style=\"margin:0 0 0.75rem 0;line-height:1.65;color:#101820\">Jeśli nie zobaczy ceny na Twojej stronie – wyjdzie. <strong>Jeśli Twoja usługa jest prosta i pudełkowa</strong> (np. konsultacja online) – pokaż cenę.</p></div><div style=\"border:2px solid #fee715;background:#fffbeb;padding:1.25rem 1.5rem;border-radius:6px\"><p style=\"font-weight:700;font-size:1.05rem;color:#101820;margin:0 0 0.5rem 0\">Klient wpisuje w Google: „kompleksowy projekt wnętrz domu”</p><p style=\"margin:0 0 0.75rem 0;line-height:1.65;color:#101820\">To klient, który wie, że to proces. Warto dać mu <strong>punkt odniesienia (kotwicę)</strong>. Przykłady:</p><p style=\"margin:0 0 0.35rem 0;line-height:1.65;color:#101820\">Projekt pojedynczego pomieszczenia: zazwyczaj 1 500 – 2 500 zł.</p><p style=\"margin:0;line-height:1.65;color:#101820\">Projekt całego domu pod klucz (150 m²): zazwyczaj 25 000 – 40 000 zł.</p><p style=\"margin:1rem 0 0;line-height:1.65;color:#101820;font-size:0.95rem\">To od razu filtruje klientów.</p></div></div>"
        }
      },
      {
        "type": "text",
        "id": "s3-4b",
        "data": {
          "text": "<p><strong>Zapamiętaj:</strong> Brak ceny na stronie to jeszcze nie koniec świata, ale brak transparentności w procesie sprzedaży – już tak.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "separator",
        "id": "sep-7",
        "data": {}
      },
      {
        "type": "numbered-section",
        "id": "num-4",
        "data": {
          "number": 4,
          "text": "TU NAJCZĘŚCIEJ GINĄ LEADY: TARCIE I ZAUFANIE"
        }
      },
      {
        "type": "text",
        "id": "s4-1",
        "data": {
          "text": "<p>To jest rozdział o tym, co zabija zapytania. Klient nie ma powodów, żeby Ci zaufać, a jeśli już nawet zaufa - rzucasz mu kłody pod nogi.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "heading",
        "id": "s4-wysilek",
        "data": {
          "text": "Zasada wysiłku"
        }
      },
      {
        "type": "text",
        "id": "s4-2",
        "data": {
          "text": "<p>Zobacz na przykład jak łatwo jest kupić coś na Amazonie, a jak trudno było wypełnić PIT 10 lat temu? To jest właśnie tarcie. Badania publikowane w Harvard Business Review (na temat wskaźnika Customer Effort Score) pokazują jasno: redukcja wysiłku klienta jest kluczowa dla utrzymania relacji. To świetnie przekłada się na leady: im trudniej zrobić krok, tym mniej ludzi go zrobi. Źródło: <a href=\"https://hbr.org/2012/01/stop-trying-to-delight-your-customers\" class=\"link-yellow\" target=\"_blank\" rel=\"noopener noreferrer\">HBR: Stop Trying to Delight Your Customers</a>.</p><p>Użytkownik w sieci jest niecierpliwy. Każda dodatkowa sekunda zastanawiania się, każde zacięcie, każda wątpliwość to ryzyko, że zamknie kartę.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "heading",
        "id": "s4-formularz",
        "data": {
          "text": "Formularz jako „wąskie gardło”"
        }
      },
      {
        "type": "text",
        "id": "s4-3",
        "data": {
          "text": "<p>Jeśli Twój formularz kontaktowy wygląda jak przesłuchanie na policji, tracisz klientów. Instytut Baymard (specjalizujący się w badaniach UX) regularnie publikuje dane o tym, jak detale projektowe ucinają konwersję. Podstawowa zasada brzmi: Mniej pól = więcej zgłoszeń. To akurat dane z e-commerce, ale mechanika tarcia w formularzach leadowych jest bardzo podobna. Jeśli prosisz o numer telefonu, nazwę firmy, stanowisko i NIP zanim w ogóle porozmawiacie, to stawiasz mur. Wymagaj tylko tego, co absolutnie niezbędne do pierwszego kontaktu (zwykle wystarczy imię i e-mail lub telefon). Więcej o projektowaniu pól znajdziesz tutaj: <a href=\"https://baymard.com/learn/input-fields\" class=\"link-yellow\" target=\"_blank\" rel=\"noopener noreferrer\">Baymard Input Fields</a> oraz <a href=\"https://baymard.com/blog/checkout-flow-average-form-fields\" class=\"link-yellow\" target=\"_blank\" rel=\"noopener noreferrer\">Baymard Form Fields</a>.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "s4-4",
        "data": {
          "text": "<p><strong>CTA</strong> - Przycisk (Call to Action) to obietnica. Jeśli przycisk mówi „Pobierz raport”, a po kliknięciu użytkownik ląduje w długim formularzu bez raportu - czuje się oszukany. Etykiety muszą mówić prawdę: „Przejdź do formularza”, „Umów rozmowę”, „Kup teraz”.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "heading",
        "id": "s4-wiarygodnosc",
        "data": {
          "text": "Błyskawiczna wiarygodność"
        }
      },
      {
        "type": "text",
        "id": "s4-5",
        "data": {
          "text": "<p>Wiarygodność w sieci ocenia się w ułamku sekundy. Wytyczne ze słynnego badania Stanford Web Credibility są jasne. Co buduje zaufanie? Fizyczny adres firmy (nawet jeśli działasz online). Realne zdjęcia ludzi (zamiast stockowych modeli podających sobie dłonie). Aktualność (copyright w stopce z obecnym rokiem, świeże wpisy na blogu). Pełne wytyczne znajdziesz tutaj: <a href=\"https://credibility.stanford.edu/guidelines/index.html\" class=\"link-yellow\" target=\"_blank\" rel=\"noopener noreferrer\">Stanford Guidelines</a>.</p><p>I jeszcze mała uwaga o AI: Dziś łatwo wygenerować stronę i teksty sztuczną inteligencją. I klienci zaczynają to widzieć. Jeżeli Twoja strona wygląda jak szablon wypełniony przez AI, bez konkretów, bez ludzkiego głosu i bez dowodów - użytkownik wyczuwa fałsz. AI jest świetnym narzędziem, ale nie zastąpi autentyczności. W czasach takich \"syntetycznych\" treści, bycie zwyczajnie sobą staje się przewagą konkurencyjną.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "separator",
        "id": "sep-8",
        "data": {}
      },
      {
        "type": "numbered-section",
        "id": "num-5",
        "data": {
          "number": 5,
          "text": "SZYBKOŚĆ I TECHNIKALIA"
        }
      },
      {
        "type": "image",
        "id": "s5-img-desktop",
        "data": {
          "imageUrl": "https://lkygnllsgashwloxgmax.supabase.co/storage/v1/object/public/blog-images/Drozniak_www_desktop.webp",
          "alt": "Zrzut ekranu z PageSpeed Insights – wyniki wydajności strony (desktop): szybkość, Core Web Vitals, optymalizacja",
          "caption": "PageSpeed Insights – wyniki dla wersji desktop",
          "width": "standard"
        }
      },
      {
        "type": "image",
        "id": "s5-img-mobile",
        "data": {
          "imageUrl": "https://lkygnllsgashwloxgmax.supabase.co/storage/v1/object/public/blog-images/Drozniak_www_mobile.webp",
          "alt": "Zrzut ekranu z PageSpeed Insights – wyniki wydajności strony (mobile): szybkość, Core Web Vitals, optymalizacja",
          "caption": "PageSpeed Insights – wyniki dla wersji mobilnej",
          "width": "standard"
        }
      },
      {
        "type": "text",
        "id": "s5-1",
        "data": {
          "text": "<p>Nie chcę Cię zanudzać technicznym żargonem, ale musisz wiedzieć jedną rzecz: szybkość strony to absolutnie jedna z najważniejszych rzeczy, która wpływa na decyzje klientów.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "heading",
        "id": "s5-sekunda",
        "data": {
          "text": "Każda sekunda kosztuje"
        }
      },
      {
        "type": "text",
        "id": "s5-2",
        "data": {
          "text": "<p>Google i badania rynku mobilnego pokazują to od lat: opóźnienie ładowania strony o każdą sekundę potrafi drastycznie obniżyć konwersję. Dane z <a href=\"https://business.google.com/ca-en/think/marketing-strategies/mobile-page-speed-new-industry-benchmarks/\" class=\"link-yellow\" target=\"_blank\" rel=\"noopener noreferrer\">Think with Google: Mobile Page Speed</a> wskazują wprost, że prawdopodobieństwo \"odbicia\" (opuszczenia strony) rośnie lawinowo wraz z czasem ładowania. Jeśli Twoja strona ładuje się 8 sekund, to większość ludzi z reklamy na Facebooku nawet jej nie zobaczy. Klikną i wyjdą, zanim cokolwiek się wyświetli. Płacisz za kliknięcie, a nie dostajesz nawet szansy na przedstawienie oferty.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "heading",
        "id": "s5-cwv",
        "data": {
          "text": "Core Web Vitals - wspólny język dla SEO i UX"
        }
      },
      {
        "type": "text",
        "id": "s5-3",
        "data": {
          "text": "<p>Google wprowadziło wskaźniki Core Web Vitals (CWV), żeby mierzyć \"wrażenia użytkownika\". W skrócie chodzi o to, czy: Strona ładuje się szybko (LCP). Czy jest stabilna wizualnie (CLS) - czyli czy tekst nie skacze, gdy doczytuje się obrazek. Czy szybko reaguje na kliknięcie (INP). Dobra, lekka strona to też niższy koszt utrzymania. Mniej \"pożarów\", mniej problemów z aktualizacjami i - co najważniejsze - mniej dziur, przez które uciekają klienci.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "highlight",
        "id": "s5-uwaga",
        "data": {
          "title": "NA CO SZCZEGÓLNIE ZWRACAĆ UWAGĘ NA STRONIE WWW:",
          "text": "<ul><li>Wolny, wielki obrazek na start (hero image), który waży 5 MB.</li><li>Wyskakujące okienka (pop-upy), których nie da się zamknąć na telefonie.</li><li>Rozjeżdżający się tekst na wersji mobilnej strony.</li><li>Formularz, w którym po błędzie kasują się wszystkie wpisane dane (gwarantowana frustracja).</li></ul>"
        }
      },
      {
        "type": "separator",
        "id": "sep-9",
        "data": {}
      },
      {
        "type": "numbered-section",
        "id": "num-6",
        "data": {
          "number": 6,
          "text": "STRUKTURA SKUTECZNEGO LANDING PAGE"
        }
      },
      {
        "type": "text",
        "id": "s6-1",
        "data": {
          "text": "<p>Nie musisz wymyślać koła na nowo. Większość największych \"graczy\" stosuje bardzo podobną strukturę, tylko dopasowują ją do swojej branży. Dobry landing page ma prowadzić klienta za rękę.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "highlight",
        "id": "s6-zawiera",
        "data": {
          "title": "CO POWINIEN ZAWIERAĆ SKUTECZNY LANDING PAGE?",
          "text": "<ul><li><strong>Pierwszy ekran (Hero):</strong> Nagłówek z obietnicą (Dla kogo? Co? Jak?), podtytuł rozwijający i wyraźne CTA.</li><li><strong>Social Proof (Dowód):</strong> Logotypy klientów, \"Zaufali nam\" - zaraz pod spodem.</li><li><strong>Konkrety oferty:</strong> Co dokładnie dostaję? (Korzyści, a nie tylko cechy).</li><li><strong>Proces:</strong> Jak wygląda współpraca? (Krok 1, Krok 2, Krok 3).</li><li><strong>Cena lub widełki:</strong> Chociaż punkt odniesienia jest kluczowy.</li><li><strong>FAQ:</strong> Odpowiedzi na obiekcje.</li><li><strong>Sekcja końcowa:</strong> Powtórzone CTA i ostateczna zachęta.</li></ul>"
        }
      },
      {
        "type": "text",
        "id": "s6-2",
        "data": {
          "text": "<p><strong>Długość strony vs Ryzyko</strong> - Tani produkt / małe ryzyko = Krótka strona. Droga usługa / duże ryzyko = Długa strona. Potrzebujesz więcej dowodów, więcej wyjaśnień, więcej redukcji ryzyka.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "heading",
        "id": "s6-ile-kosztuje",
        "data": {
          "text": "Ile kosztuje dobra strona internetowa?"
        }
      },
      {
        "type": "text",
        "id": "s6-3",
        "data": {
          "text": "<p>To jedno z najczęstszych pytań. Załóżmy, że mówimy o stronie w stylu, który omawiamy w tym artykule: ma generować zapytania, sprzedawać usługi i budować wizerunek profesjonalisty. Nie mówimy tu o wielkim sklepie typu Allegro. Poniżej widełki stron typu wizytówka (1 strona lub kilka stron + formularze) oraz ewentualnie 1 produkt + szybka płatność online. Tworzenie ecommerce z dużą ilością produktów to zupełnie inna skala, która nawet w budżetowym wariancie będzie przekraczała 10000 zł.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "highlight",
        "id": "s6-opcje",
        "data": {
          "title": "TRZY GŁÓWNE DROGI",
          "text": "<div style=\"margin:0\"><div style=\"margin-bottom:2.5rem;border:2px solid #e5e7eb;background:#fff;padding:1.75rem 2rem;border-radius:8px;border-left:4px solid #9ca3af\"><div style=\"margin-bottom:1rem\"><svg width=\"40\" height=\"40\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z\"/></svg></div><p style=\"font-weight:700;font-size:1.15rem;color:#101820;margin:0 0 0.35rem 0\">Opcja 1: Samodzielnie (DIY)</p><p style=\"font-size:0.95rem;color:#6b7280;margin:0 0 1.25rem 0\">Wix, gotowe szablony WordPress</p><p style=\"margin:0 0 1.1rem 0;line-height:1.7;color:#101820;font-size:1rem\"><strong>Koszt na start:</strong> Prawie 0 zł (+ abonament).</p><p style=\"margin:0 0 1.1rem 0;line-height:1.7;color:#101820;font-size:1rem\"><strong>Koszt ukryty:</strong> Twój czas, jakość i… abonament (na przestrzeni lat).</p><p style=\"margin:0 0 1.1rem 0;line-height:1.7;color:#101820;font-size:1rem\">Brzmi kusząco, ale ma swoje minusy. Musisz być jednocześnie grafikiem, programistą i marketerem.</p><p style=\"margin:0 0 1.1rem 0;line-height:1.7;color:#101820;font-size:1rem\"><strong>Główny problem:</strong> Strony na kreatorach (Wix) lub przeładowane wtyczkami na WordPressie bywają bardzo ciężkie i wolne. To zabija wskaźniki <em>Core Web Vitals</em>, o których pisałem wcześniej, co ogranicza widoczność w Google.</p><p style=\"margin:0;line-height:1.7;color:#101820;font-size:1rem\">Do tego dochodzi utrzymanie: w rozwiązaniach typu SaaS (abonamentowych) płacisz co rok coraz więcej, często kilka tysięcy złotych za pakiety <em>Business</em>, będąc wciąż zdanym na ograniczenia platformy.</p></div><div style=\"margin-bottom:2.5rem;border:2px solid #e5e7eb;background:#fff;padding:1.75rem 2rem;border-radius:8px;border-left:4px solid #3b82f6\"><div style=\"margin-bottom:1rem\"><svg width=\"40\" height=\"40\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#3b82f6\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/><path d=\"M23 21v-2a4 4 0 0 0-3-3.87\"/><path d=\"M16 3.13a4 4 0 0 1 0 7.75\"/></svg></div><p style=\"font-weight:700;font-size:1.15rem;color:#101820;margin:0 0 0.35rem 0\">Opcja 2: Freelancer / Agencja (WordPress)</p><p style=\"font-size:0.95rem;color:#6b7280;margin:0 0 1.25rem 0\"><strong>Koszt:</strong> Zazwyczaj od 2 500 – 3 000 zł netto w górę (za prosty landing page)</p><p style=\"margin:0 0 1.1rem 0;line-height:1.7;color:#101820;font-size:1rem\">To standard rynkowy. Lepsza agencja zadba o wygląd i strukturę. Strona będzie wyglądać profesjonalnie.</p><p style=\"margin:0 0 1.1rem 0;line-height:1.7;color:#101820;font-size:1rem\"><strong>Największe wyzwanie?</strong> WordPress to potężny kombajn. Żeby strona była szybka, trzeba umieć ją dobrze zoptymalizować, a nie tylko zainstalować gotowy motyw.</p><p style=\"margin:0 0 1.1rem 0;line-height:1.7;color:#101820;font-size:1rem\">Wielu tańszych wykonawców (tych za 500–1000 zł) robi <em>masówkę</em> na gotowcach, nie przejmując się tym, co jest <em>pod maską</em>. Efekt: strona działa, czasem nawet wygląda nieźle, ale często jest już dość wolna na starcie.</p><p style=\"margin:0;line-height:1.7;color:#101820;font-size:1rem\">Z czasem może <em>puchnąć</em>, wymagać ciągłych aktualizacji wtyczek i dbania o bezpieczeństwo.</p></div><div style=\"margin-bottom:0;border:2px solid #fee715;background:#fffbeb;padding:1.75rem 2rem;border-radius:8px;border-left:4px solid #fee715\"><div style=\"margin-bottom:1rem\"><svg width=\"40\" height=\"40\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#101820\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" xmlns=\"http://www.w3.org/2000/svg\"><polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"/></svg></div><p style=\"font-weight:700;font-size:1.15rem;color:#101820;margin:0 0 0.35rem 0\">Opcja 3: Rozwiązania Premium (Custom Code – Next.js, Astro)</p><p style=\"font-size:0.95rem;color:#6b7280;margin:0 0 1.25rem 0\"><strong>Koszt rynkowy:</strong> od 10 000 zł netto w górę (w dużych software house''ach). <strong>U mnie:</strong> jakość Premium w cenie dobrego WordPressa.</p><p style=\"margin:0 0 1.1rem 0;line-height:1.7;color:#101820;font-size:1rem\">To jest <em>Lexus</em> w świecie stron. Architektura <em>szyta na miarę</em> ułatwia świetne wyniki <em>Core Web Vitals</em> – mniej przypadkowych skryptów, mniej do załadowania.</p><p style=\"margin:0 0 1.1rem 0;line-height:1.7;color:#101820;font-size:1rem\">WordPress też da się zrobić szybko, ale wymaga dużo większej dyscypliny – każda drobna zmiana może sprawić, że wyniki polecą w dół.</p><p style=\"margin:0 0 1.1rem 0;line-height:1.7;color:#101820;font-size:1rem\"><strong>Skalowalność:</strong> Strona działa tak samo szybko przy 50 osobach, jak przy 5000. Przydatne przy <em>premierze</em> produktu czy viralu w social mediach – serwer nie padnie przy pierwszej okazji.</p><p style=\"margin:0 0 1.1rem 0;line-height:1.7;color:#101820;font-size:1rem\"><strong>Bezpieczeństwo:</strong> Architektura bez typowej bazy SQL wystawionej na ataki. Formularze i płatności działają bezpiecznie przez API.</p><p style=\"margin:0 0 1.1rem 0;line-height:1.7;color:#101820;font-size:1rem\"><strong>Koszt utrzymania:</strong> Zwykle niższy i przewidywalny (domena + hosting/CDN), bez typowych problemów wtyczkowych i aktualizacyjnych.</p><p style=\"margin:0 0 1.1rem 0;line-height:1.7;color:#101820;font-size:1rem\">Jako, że ja bardzo nie lubię kompromisów - tworzę strony właśnie w technologii Next.js/Astro (Opcja 3). Są szybkie, bezpieczne i tanie w utrzymaniu. A ponieważ działam sprawnie i bez agencji - mogę zaoferować jakość Premium w cenie dobrego WordPressa, czyli:</p><p style=\"margin:0;line-height:1.7;color:#101820;font-size:1rem\"><strong>Prosty landing page:</strong> od 2 500 zł netto.</p><p style=\"margin:0;line-height:1.7;color:#101820;font-size:1rem\"><strong>Standardowa strona wielostronicowa</strong> (np. Główna, Oferta, Kontakt – bez sklepu i logowania): 4 000 – 7 000 zł netto.</p></div></div>"
        }
      },
      {
        "type": "cta",
        "id": "cta-2",
        "data": {
          "ctaText": "Zobacz moją ofertę stron www i sprawdź, jak to wygląda w praktyce.",
          "ctaLink": "https://drozniak.pl/strony-www",
          "ctaStyle": "primary"
        }
      },
      {
        "type": "separator",
        "id": "sep-10",
        "data": {}
      },
      {
        "type": "heading",
        "id": "faq-title",
        "data": {
          "text": "FAQ - Najczęściej zadawane pytania"
        }
      },
      {
        "type": "text",
        "id": "faq-1",
        "data": {
          "text": "<h3>Ile kosztuje strona www?</h3><p>Koszt zależy od technologii i wykonawcy. Jeśli robisz to sam na gotowym szablonie, koszt to głównie Twój czas i abonament (od kilkudziesięciu do kilkuset złotych miesięcznie). Prosta strona u freelancera to zazwyczaj wydatek rzędu 2500–4000 zł netto. Rozwiązania \"szyte na miarę\" (dedykowane), które są szybkie i bezpieczne, w agencjach kosztują od 10 000 zł netto w górę, choć u niezależnych specjalistów można znaleźć taką jakość w cenie 4000-7000 zł netto.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "faq-2",
        "data": {
          "text": "<h3>Landing page cena – ile to kosztuje i co wpływa na cenę?</h3><p>Cena landing page''a waha się od 1500 zł netto do nawet 10 000 zł netto. Na koszt wpływa nie tylko sam wybór architektury, ale przede wszystkim zakres prac: czy w cenie jest napisanie tekstów sprzedażowych (copywriting), indywidualny projekt graficzny, wdrożenie analityki (GA4) i integracja z systemem mailingowym. Często tani landing page, który wolno działa i nie ma przemyślanej treści, może Cię kosztować więcej w straconych budżetach reklamowych.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "faq-3",
        "data": {
          "text": "<h3>Ile kosztuje utrzymanie strony internetowej?</h3><p>To zależy od rozwiązania. Zawsze należy opłacić domenę (ok. 100-200 zł netto / rok). Przy WordPressie musisz mieć dobry hosting (300–600 zł netto / rok) oraz dbać o aktualizacje wtyczek (samodzielnie lub płacąc za opiekę techniczną). W rozwiązaniach typu SaaS (Wix) płacisz stały abonament (od 400 do nawet 6000 zł netto / rok). Przy stronach statycznych/dedykowanych (np. Astro/Next.js) koszt hostingu jest często minimalny lub zerowy, a koszty techniczne są zredukowane.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "faq-4",
        "data": {
          "text": "<h3>Co powinien zawierać skuteczny landing page?</h3><p>Skuteczny landing page musi mieć jasną strukturę: 1) Nagłówek z obietnicą (Hero section), 2) Dowody społeczne (opinie, logotypy), 3) Konkretną ofertę (korzyści), 4) Odpowiedź na obiekcje (FAQ), 5) Wyraźne wezwanie do działania (CTA). Kluczowa jest spójność z reklamą, z której przyszedł użytkownik, oraz szybkość działania.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "faq-5",
        "data": {
          "text": "<h3>Jak zwiększyć liczbę zapytań ze strony?</h3><p>Zacznij od podstaw: 1) Sprawdź, czy sprowadzasz właściwy ruch (czy reklama obiecuje to, co jest na stronie?). 2) Uprość pierwszy ekran (test jednego zdania). 3) Dodaj dowody wiarygodności (realne zdjęcia, liczby). 4) Maksymalnie uprość formularz kontaktowy. 5) Zadbaj o szybkość strony – jeśli ładuje się wolno, tracisz klienta, zanim ten zobaczy ofertę.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "cta",
        "id": "cta-3",
        "data": {
          "ctaText": "Chcesz stronę, która realnie sprzedaje? Zobacz ofertę stron www.",
          "ctaLink": "https://drozniak.pl/strony-www",
          "ctaStyle": "primary"
        }
      }
    ]
  }'::jsonb;

  INSERT INTO blog_posts (
    slug,
    title,
    excerpt,
    content,
    featured_image_url,
    status,
    published_at,
    category_id,
    author_id,
    meta_title,
    meta_description,
    meta_keywords,
    tags,
    layout_type
  ) VALUES (
    v_slug,
    'Dlaczego strona nie sprzedaje, mimo że ludzie wchodzą?',
    'Masz ruch, ale brak zapytań? Diagnoza krok po kroku: dopasowanie, oferta, ceny i tarcie na stronie. Zobacz, jak zmienić wejścia w klientów.',
    v_content,
    'https://lkygnllsgashwloxgmax.supabase.co/storage/v1/object/public/blog-images/blog2-hero-2000.webp',
    'draft',
    NULL,
    v_category_id,
    v_author_id,
    'Dlaczego strona nie sprzedaje? Najczęstsze przyczyny i konkretne poprawki | Stanisław Drozniak',
    'Masz ruch, ale brak zapytań? Diagnoza krok po kroku: dopasowanie, oferta, ceny i tarcie na stronie. Zobacz, jak zmienić wejścia w klientów.',
    ARRAY['strona www', 'konwersja', 'landing page', 'lead generation', 'marketing', 'sprzedaż'],
    ARRAY['strona-www', 'konwersja', 'landing-page', 'marketing', 'sprzedaż'],
    'standard'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    excerpt = EXCLUDED.excerpt,
    content = EXCLUDED.content,
    featured_image_url = EXCLUDED.featured_image_url,
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description,
    meta_keywords = EXCLUDED.meta_keywords,
    tags = EXCLUDED.tags,
    updated_at = NOW();

  UPDATE blog_posts
  SET reading_time = calculate_reading_time(content)
  WHERE slug = v_slug;

  RAISE NOTICE 'Post został dodany pomyślnie! Slug: %', v_slug;
END $$;
