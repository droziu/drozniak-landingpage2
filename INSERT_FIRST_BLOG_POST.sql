-- =====================================================
-- DODANIE PIERWSZEGO POSTA BLOGA
-- =====================================================
-- Tytuł: Jak zdobyć klientów w małej firmie: prosty system w 4 krokach
-- Kategoria: Marketing
-- =====================================================

-- Najpierw upewnij się, że masz kategorię Marketing
-- Jeśli nie masz, uruchom najpierw podstawowe kategorie z migracji

-- Pobierz ID kategorii Marketing
DO $$
DECLARE
  v_category_id UUID;
  v_author_id UUID;
  v_slug TEXT := 'jak-zdobyc-klientow-w-malej-firmie-prosty-system-w-4-krokach';
  v_content JSONB;
BEGIN
  -- Pobierz kategorię Marketing
  SELECT id INTO v_category_id 
  FROM blog_categories 
  WHERE slug = 'marketing' 
  LIMIT 1;

  -- Jeśli kategoria nie istnieje, utwórz ją
  IF v_category_id IS NULL THEN
    INSERT INTO blog_categories (name, slug, description, color)
    VALUES ('Marketing', 'marketing', 'Artykuły o marketingu i pozyskiwaniu klientów', '#fee715')
    RETURNING id INTO v_category_id;
  END IF;

  -- Pobierz ID autora (Twoje konto)
  SELECT id INTO v_author_id 
  FROM auth.users 
  WHERE email = 'stanislaw@drozniak.com' 
  LIMIT 1;

  -- Jeśli nie znajdziesz po emailu, użyj pierwszego zalogowanego użytkownika
  IF v_author_id IS NULL THEN
    SELECT id INTO v_author_id 
    FROM auth.users 
    LIMIT 1;
  END IF;

  -- Przygotuj treść w formacie JSONB (bloki)
  v_content := '{
    "blocks": [
      {
        "type": "text",
        "id": "intro-1",
        "data": {
          "text": "<p>Jeśli prowadzisz małą firmę albo działasz jako freelancer, to ten temat pewnie jest Ci bardzo znajomy. Wkładasz dużo pracy, dbasz o poziom, klienci którzy już skorzystali są zadowoleni, a mimo to w pewnym momencie wszystko rozbija się o jedno pytanie: <strong>skąd brać kolejnych klientów?</strong></p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "intro-2",
        "data": {
          "text": "<p>To dotyka bardzo wielu przedsiębiorców, szczególnie tych mniejszych. I mocno spina się z moimi doświadczeniami, zarówno z pracy z klientami, jak i z mojej własnej drogi. Łatwo dojść do momentu, w którym czujesz, że produkt albo usługa są na solidnym poziomie, a jednocześnie pozyskiwanie klientów jest niestabilne. Raz jest lepiej, raz gorzej, ale masz wrażenie, że dużo zależy od przypadku.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "intro-3",
        "data": {
          "text": "<p>W takiej sytuacji pojawia się naturalna myśl: „no dobra, pewnie za mało osób o mnie wie”. Czyli trzeba większych zasięgów, więcej wejść na stronę, może warto odpalić reklamy. To brzmi logicznie i czasem faktycznie to jest część problemu.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "intro-4",
        "data": {
          "text": "<p>Ale w praktyce często kończy się to tak: w końcu zbierasz budżet, idziesz do agencji albo do „kogoś od reklam”, kampania rusza, ludzie zaczynają klikać i nagle okazuje się, że sprzedaż dalej nie rośnie. Albo jest kilka zapytań, ale zupełnie nie takich, jakich chciałeś. Albo trafiają się rozmowy, które kończą się niczym. I wtedy najprostszy wniosek jest taki, że „reklamy nie działają” albo że „agencja coś zepsuła”.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "intro-5",
        "data": {
          "text": "<p>Cóż, najczęściej prawda bywa trochę mniej wygodna, ale zrozumienie tego może być bardzo cenne: <strong>marketing to nie jest sama reklama</strong>. Reklama to jest tylko moment, w którym ktoś w ogóle dowiaduje się, że istniejesz. Natomiast to, czy on potem kupi, zależy od całej reszty rzeczy po drodze.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "intro-6",
        "data": {
          "text": "<p>Możesz mieć świetną reklamę, a jednocześnie mieć ofertę, która jest „dla wszystkich”, więc nikt nie czuje, że to jest coś \"idealnie\" dla niego. Możesz mieć ładną stronę, ale taką, po której człowiek nadal nie wie, co dokładnie dostanie i dlaczego ma Ci zaufać. Możesz mieć dobry produkt, ale proces kontaktu tak upierdliwy, że ludzie po prostu nie mają siły tego dokończyć. Albo odpowiadasz na zapytania następnego dnia i temat już stygnie, bo ktoś inny był szybszy.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "intro-7",
        "data": {
          "text": "<p>To jest właśnie sedno: <strong>marketing to jest cały proces wokół Twojego produktu</strong>. Od tego, jak opisujesz ofertę, przez to jak wygląda Twoja strona i jak się z Tobą kontaktuje, aż po to, co dzieje się po rozmowie i czy klient ma poczucie, że trafił w dobre ręce.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "intro-8",
        "data": {
          "text": "<p>Celem tego artykułu jest poukładać Ci to w prosty sposób, tak, żebyś mógł spojrzeć na swój marketing nieco szerzej i zobaczyć, gdzie u Ciebie „uciekają\" klienci i co warto poprawić w pierwszej kolejności.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "separator",
        "id": "sep-before-section-1",
        "data": {}
      },
      {
        "type": "heading",
        "id": "section-1-title",
        "data": {
          "text": "Większość ludzi myśli, że marketing to reklama.<br>A reklama to tylko jeden element układanki"
        }
      },
      {
        "type": "text",
        "id": "section-1-1",
        "data": {
          "text": "<p>Kiedy ktoś mówi mi, że „reklamy nie działają\", prawie zawsze dopytuję, co właściwie ma na myśli. Nauczyłem się tego z jednej prostej przyczyny. Większość osób, mówiąc „nie działa\", ma na myśli: kupiłem reklamy, a nikt nie kupił mojego produktu albo usługi.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-1-2",
        "data": {
          "text": "<p>Problem w tym, że stwierdzenie „to wina reklam\" zakłada, że reklamę ustawiono źle i to ona jest główną przeszkodą. Tymczasem reklama jest tylko jednym z elementów całego procesu, a brak sprzedaży może wynikać z wielu innych rzeczy, które dzieją się po drodze.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "highlight",
        "id": "highlight-problems",
        "data": {
          "title": "W praktyce „reklamy nie działają\" może oznaczać:",
          "text": "<ul><li>reklama w ogóle się nie wyświetla</li><li>reklama się wyświetla, ale trafia do złych osób</li><li>ludzie widzą reklamę, ale nie klikają</li><li>ludzie klikają, ale nie zostawiają kontaktu</li><li>kontakt się pojawia, ale zapytania są przypadkowe</li><li>dochodzi do rozmów, ale do sprzedaży nie dochodzi</li></ul>"
        }
      },
      {
        "type": "text",
        "id": "section-1-4",
        "data": {
          "text": "<p>Każdy z tych scenariuszy ma inne przyczyny. Każdy też wymaga innej naprawy. Dopiero kiedy wiesz, na którym etapie coś się psuje, możesz sensownie ocenić, czy problem rzeczywiście leży w reklamie.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-1-5",
        "data": {
          "text": "<p>Czasami rzeczywiście - to wina reklam. Jeśli reklama trafia do kompletnie nieodpowiednich osób, to jasne, że ustawienia są do poprawy. Jeśli nikt nie klika, to często znak, że komunikat jest zbyt ogólny, nieczytelny albo zwyczajnie nie przyciąga uwagi. Takie sytuacje się zdarzają i to są realne problemy reklamowe.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-1-6",
        "data": {
          "text": "<p>Tyle że bardzo często, kiedy dopytasz głębiej, wychodzi coś innego. Reklama zrobiła swoje, czyli przyciągnęła uwagę i sprowadziła ludzi na stronę, a dopiero później zaczęły się schody. Brak sprzedaży wynika wtedy nie z tego, że reklama była „zła\", tylko z tego, że reszta procesu nie domyka tematu.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-1-7",
        "data": {
          "text": "<p>Najczęściej pojawiają się trzy miejsca, w których ludzie odpadają po kliknięciu.</p><p>Pierwsze to <strong>rozjazd oczekiwań</strong>. Reklama obiecuje jedno, a strona brzmi inaczej, jest zbyt ogólna albo nie odpowiada na to, po co ktoś przyszedł. Druga sytuacja to <strong>brak zaufania</strong>. Osoba może być zainteresowana, ale nie widzi dowodów, że to działa i że warto Ci zaufać. Trzecie miejsce to <strong>kolejny krok</strong>. Klient jest już na stronie, widzi ofertę, jest wstępnie przekonany i chce coś zrobić dalej. W tym momencie musi mieć prostą ścieżkę, która prowadzi go dalej. Kontakt, zapytanie, umówienie rozmowy. Twoim zadaniem jest przeprowadzić go za rączkę przez tę ścieżkę.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "cta",
        "id": "cta-landing-page",
        "data": {
          "ctaText": "Jeśli chcesz, mogę zbudować Ci taki landing page, stworzony pod konwersję - szybki, konkretny i z jasnym CTA.",
          "ctaLink": "https://drozniak.pl/strony-www",
          "ctaStyle": "primary"
        }
      },
      {
        "type": "text",
        "id": "section-1-8",
        "data": {
          "text": "<p>Warto też pamiętać o jednej rzeczy. Ten kolejny krok nie musi od razu oznaczać dużego zobowiązania. W usługach często lepiej działa mały mostek. Krótkie, niezobowiązujące zapytanie. Prosta wiadomość. Umówienie rozmowy. Klient wchodzi w proces etapami, a nie jest stawiany przed decyzją „kup teraz\" przy pierwszym kontakcie.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-1-9",
        "data": {
          "text": "<p>To właśnie dlatego marketing nie kończy się na reklamie. Reklama może ściągnąć uwagę i wejścia na stronę, ale finalny wynik zależy od tego, co dzieje się dalej. Bez rozpisania całego procesu łatwo przepalić budżet i dojść do błędnego wniosku, że „reklamy nie działają\".</p>",
          "alignment": "left"
        }
      },
      {
        "type": "separator",
        "id": "sep-before-section-2",
        "data": {}
      },
      {
        "type": "heading",
        "id": "section-2-title",
        "data": {
          "text": "Marketing działa jak jeden proces.<br>Jeśli jeden element nie działa, reszta też zaczyna się sypać"
        }
      },
      {
        "type": "text",
        "id": "section-2-1",
        "data": {
          "text": "<p>Więle osób myśli o marketingu jak o zestawie osobnych rzeczy. Tu reklamy, tu strona, tu social media, tu sprzedaż. Coś tam poustawiałem, coś działa, coś się dzieje, tylko efekt końcowy jest słaby.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-2-2",
        "data": {
          "text": "<p>W praktyce to jest jeden proces. Klient ma przejść drogę od „pierwszy raz o Tobie słyszę\" do „odzywam się\" albo „kupuję\". Jeśli po drodze trafi na coś, co go zniechęci, cały ciąg się urywa, nawet jeśli inne elementy wyglądają przyzwoicie.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-2-3",
        "data": {
          "text": "<p>To jest też powód, dla którego ludzie szybko się frustrują. Patrzysz na reklamę i widzisz, że są kliknięcia. Patrzysz na stronę i ona wygląda okej. Patrzysz na ofertę i wydaje się sensowna. A mimo to sprzedaży nie ma. W takich sytuacjach wielu przedsiębiorców dochodzi do wniosku, że marketing to loteria.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-2-4",
        "data": {
          "text": "<p>Najczęściej jest jednak jeden konkretny problem w jednym konkretnym miejscu, który rozwala całość. Tylko że jeśli patrzysz na marketing jak na zbiór oddzielnych elementów, to łatwo tego nie zauważyć.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-2-5",
        "data": {
          "text": "<p>Spójrz na to prosto, z perspektywy klienta. Ktoś trafia do Ciebie z reklamy albo z polecenia. Wchodzi na stronę i zaczyna się podstawowa selekcja. Czy to jest dla mnie? Czym oni się w ogóle zajmują? Czy ogarniają temat?</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-2-6",
        "data": {
          "text": "<p>Jeśli strona jest niejasna, jeśli oferta jest zbyt szeroka, jeśli język jest niedopasowany do klienta, jeśli brakuje konkretów, ludzie odpadają. Nikt nie chce się domyślać, o co chodzi, ani składać sobie oferty z rozsypanych fragmentów.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-2-7",
        "data": {
          "text": "<p>Nawet jeśli oferta jest w porządku, może brakować zaufania. W usługach to jest kluczowe, bo klient kupuje nie tylko „usługę\", ale też spokój i poczucie, że trafił w dobre ręce. Przykłady prac, realizacje, opinie, krótkie case study, jasny opis jak wygląda współpraca. To są rzeczy, które często robią większą różnicę niż kolejna wersja reklamy.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-2-8",
        "data": {
          "text": "<p>Kolejny moment to następny krok. Klient przeczytał ofertę, powiedzmy, że wstępnie Ci zaufał, chce coś zrobić dalej i … no właśnie, co wtedy? Najlepiej: jasny przycisk, prosty formularz, krótka informacja co się stanie po wysłaniu wiadomości. Im mniej kombinowania po stronie klienta, tym lepiej. W wielu firmach odpadają osoby, które były już naprawdę blisko kontaktu, tylko coś je zatrzymało po drodze.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-2-9",
        "data": {
          "text": "<p>Dlatego warto myśleć o marketingu jak o szeregu etapów, które muszą do siebie pasować. Obietnica z reklamy musi zgadzać się z tym, co jest na stronie. Strona musi odpowiadać na główne pytania i prowadzić do kontaktu. Kontakt musi być prosty. Potem liczy się szybkość odpowiedzi. Dalej sprzedaż i obsługa. Na końcu polecenia.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-2-10",
        "data": {
          "text": "<p>Mała firma nie potrzebuje perfekcji, tylko spójności i braku dużych dziur, przez które uciekają klienci. Jedna taka dziura potrafi sprawić, że dokładanie budżetu i zasięgów nic nie zmieni.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-2-11",
        "data": {
          "text": "<p>W kolejnym punkcie przejdziemy do pierwszego miejsca, od którego zwykle warto zacząć, czyli do oferty. Do tego, co sprzedajesz, komu i czy ta osoba po wejściu czuje, że to jest dokładnie pod jej problem.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "separator",
        "id": "sep-before-section-3",
        "data": {}
      },
      {
        "type": "numbered-section",
        "id": "section-3-title",
        "data": {
          "number": 1,
          "text": "OFERTA"
        }
      },
      {
        "type": "text",
        "id": "section-3-1",
        "data": {
          "text": "<p>Jeśli mam wskazać jedno miejsce, od którego najczęściej warto zacząć, to jest to oferta. Nie reklamy, nie strona, nie „większe zasięgi\". Oferta, czyli to, co dokładnie sprzedajesz, komu to jest potrzebne i jak to opisujesz.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-3-2",
        "data": {
          "text": "<p>To jest też miejsce, w którym bardzo łatwo o prosty błąd. Myślisz: „moja usługa jest dobra, ludzie będą chcieli\". Tylko że klient nie kupuje Twojej jakości technicznej. Klient kupuje rozwiązanie swojego problemu. Jeśli on nie widzi jasno, że to jest rozwiązanie akurat jego problemu, to nawet bardzo dobra usługa będzie wyglądała jak jedna z wielu.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-3-3",
        "data": {
          "text": "<h3>„Do kogo jest ta oferta?\" to nie jest teoria, tylko praktyka</h3>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-3-4",
        "data": {
          "text": "<p>To pytanie brzmi banalnie, ale w praktyce robi ogromną różnicę. Oferta „dla wszystkich\" kończy się zazwyczaj tym, że większość osób po wejściu nie ma poczucia: „to jest dokładnie dla mnie\".</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-3-5",
        "data": {
          "text": "<p>Wyobraź sobie, że robisz strony internetowe i na swojej stronie piszesz coś w stylu: „zajmuję się rzeczami związanymi z internetem i komputerami\". Na pierwszy rzut oka brzmi to szeroko, a szeroko może się wydawać bezpiecznie. Teoretycznie łapiesz wszystko i wszystkich, bo przecież prawie każdy ma komputer, prawie każdy używa internetu.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-3-6",
        "data": {
          "text": "<p>Tylko że klient, który realnie ma zapłacić, nie szuka „rzeczy związanych z internetem\". On ma konkretny problem. Chce stronę, która wygląda profesjonalnie. Chce stronę, która działa na telefonie. Chce stronę, która pomaga zdobywać zapytania. Czasem chce stronę, która ładuje się szybko, bo wie, że ludzie uciekają, kiedy wszystko trwa za długo. I kiedy taka osoba widzi opis „internet i komputery\", to ma wrażenie, że to jest zbyt ogólne. Nie wie, czy trafiła do kogoś, kto robi dokładnie to, czego ona potrzebuje.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-3-7",
        "data": {
          "text": "<p>Taki opis może zadziałać w Twojej rodzinie, gdzie klientem jest babcia. Babcia nie potrzebuje specjalisty od stron, specjalisty od wifi i specjalisty od drukarek. Babcia potrzebuje „kogoś od komputerów\". Wtedy możesz być Krzysiem od niedziałającej myszki, od zepsutego routera, od drukarki, od wszystkiego. W takim układzie to ma sens.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-3-8",
        "data": {
          "text": "<p>W przypadku klientów sytuacja wygląda inaczej. Klient płaci za konkretną usługę i chce mieć poczucie, że trafia do osoby, która rozumie jego problem i robi takie rzeczy regularnie. Im bardziej oferta jest dopasowana do jego sytuacji, tym łatwiej o zaufanie.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-3-9",
        "data": {
          "text": "<p>To właśnie dlatego często lepiej działa komunikat typu: „robię strony dla firm usługowych\", „robię strony, które mają prowadzić do zapytań\", „robię szybkie strony, które nie tracą ludzi na telefonie\", niż ogólne „zajmuję się internetem\". Nawet jeśli technicznie umiałbyś zrobić wszystko, klient nie kupuje „możliwości\", tylko kupuje pewność, że dostanie coś dopasowanego.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-3-10",
        "data": {
          "text": "<h3>Oferta to nie jest lista rzeczy, które robisz</h3>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-3-11",
        "data": {
          "text": "<p>Więle ofert wygląda jak lista: „mam doświadczenie\", „działam kompleksowo\", „indywidualne podejście\", „szybka realizacja\". Problem w tym, że klient z tego niewiele wynosi. To są hasła, które brzmią dobrze, ale bez kontekstu nie rozwiązują żadnego problemu.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "highlight",
        "id": "highlight-offer-questions",
        "data": {
          "title": "Lepsza oferta odpowiada na proste pytania:",
          "text": "<ul><li>z czym przychodzą do Ciebie klienci,</li><li>co im przeszkadza,</li><li>co konkretnie dostaną,</li><li>jak wygląda współpraca krok po kroku.</li></ul>"
        }
      },
      {
        "type": "text",
        "id": "section-3-13",
        "data": {
          "text": "<p>To jest też najprostszy sposób, żeby od razu rozbroić typowe obawy. W usługach one są zazwyczaj bardzo podobne. Klient zastanawia się, ile to będzie kosztować, ile to potrwa, czy będzie musiał się mocno angażować, czy Ty naprawdę ogarniasz temat i co się stanie, jeśli jednak to nie będzie dla niego. Dobra oferta nie musi tego wszystkiego omawiać jak w regulaminie, ale powinna dawać poczucie, że masz to przemyślane i że klient wie, czego się spodziewać.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-3-14",
        "data": {
          "text": "<h3>Przykłady i konkrety robią większą różnicę niż „ładny opis\"</h3>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-3-15",
        "data": {
          "text": "<p>W usługach klient kupuje też spokój. Chce widzieć, że to działa, że masz doświadczenie i że to nie jest tylko obietnica. Dlatego oferty, które mają przykłady, opinie, krótkie case study albo chociaż pokazane realizacje, zwykle wygrywają z ofertami, które są napisane poprawnie, ale nie mają żadnych dowodów.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-3-16",
        "data": {
          "text": "<p>To jest element, który spina się z resztą strony. Reklama może przyciągnąć uwagę, ale po wejściu na ofertę klient musi zobaczyć, że to jest realne.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-3-17",
        "data": {
          "text": "<h3>Szybki test oferty: jedno zdanie</h3>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-3-18",
        "data": {
          "text": "<p>Na koniec prosty test, który naprawdę pomaga. Spróbuj odpowiedzieć na pytanie w jednym zdaniu:</p><p><strong>Komu pomagam, w czym i jaki będzie efekt?</strong></p><p>Jeśli to zdanie wychodzi ogólnie, typu „pomagam firmom w marketingu\", to klient też będzie miał wrażenie, że to jest ogólne. Jeśli wychodzi konkretnie, cała reszta robi się łatwiejsza. Łatwiej napisać stronę. Łatwiej zrobić reklamy. Łatwiej dostawać lepsze zapytania.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-3-19",
        "data": {
          "text": "<p>W kolejnym punkcie przejdziemy do drugiego elementu, czyli do strony i tego, co dzieje się po wejściu. Nawet dobra oferta nie zadziała, jeśli jest pokazana w sposób, który nie buduje zaufania i utrudnia kontakt.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "separator",
        "id": "sep-before-section-4",
        "data": {}
      },
      {
        "type": "numbered-section",
        "id": "section-4-title",
        "data": {
          "number": 2,
          "text": "STRONA WWW"
        }
      },
      {
        "type": "text",
        "id": "section-4-1",
        "data": {
          "text": "<p>Dobra oferta w głowie to jedno. Druga rzecz to to, jak ta oferta wygląda i działa na stronie. W praktyce bardzo często widzę sytuację, w której ktoś ma sensowną usługę, ma nawet w miarę poukładaną ofertę, a mimo to po wejściu na stronę klient nie robi kolejnego kroku.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-4-2",
        "data": {
          "text": "<p>Zwykle dzieje się tak z jednego powodu. Strona nie prowadzi klienta w prosty sposób. On musi się domyślać, szukać, przewijać, zgadywać, co autor miał na myśli. A to jest moment, w którym bardzo łatwo stracić ludzi.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-4-3",
        "data": {
          "text": "<h3>Jak szybko klient powinien zrozumieć, o co chodzi na stronie?</h3>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-4-4",
        "data": {
          "text": "<p>To jest jedno z tych pytań, które ludzie wpisują w Google wprost, tylko w innej formie: „czemu ludzie wchodzą na stronę i się nie odzywają?\". I odpowiedź w większości przypadków jest banalna. Po wejściu na stronę nie jest jasne, co ta firma robi i dla kogo.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-4-5",
        "data": {
          "text": "<p>Pierwszy ekran strony, czyli to, co widać bez przewijania, ma wykonać prostą robotę. Klient ma zobaczyć, czy to jest temat dla niego, bez konieczności czytania ściany tekstu i doszukiwania się szczegółów. Jedno zdanie, dwa zdania, prosto. Co robisz, dla kogo i jaki jest efekt.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-4-6",
        "data": {
          "text": "<p>W tym miejscu często pojawia się problem z językiem. Strony są pisane tak, jakby były pisane do innych specjalistów. Albo są pełne ogólnych haseł typu „kompleksowe podejście\", „innowacyjne rozwiązania\", „najwyższa jakość\". To brzmi ładnie, ale klient nie wie, co to znaczy dla niego.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-4-7",
        "data": {
          "text": "<h3>Spójność: reklama, post, polecenie i to, co widzę na stronie</h3>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-4-8",
        "data": {
          "text": "<p>Jeśli ktoś trafia do Ciebie z reklamy, to on ma w głowie jakąś obietnicę. Widział konkretny komunikat. Kliknął z konkretnego powodu. Jeżeli po wejściu na stronę widzi coś zupełnie innego, odpada.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-4-9",
        "data": {
          "text": "<p>To jest bardzo częsty problem. Reklama jest konkretna, a strona jest ogólna. Albo reklama mówi o jednym problemie, a strona zaczyna od historii firmy i „naszej misji\". To nie znaczy, że historia firmy jest zła, tylko że ona nie jest pierwszą rzeczą, której szuka klient w tym momencie.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-4-10",
        "data": {
          "text": "<p>Klient ma mieć poczucie: kliknąłem w coś i trafiłem dokładnie tam, gdzie powinienem trafić.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-4-11",
        "data": {
          "text": "<h3>Zaufanie na stronie: co musi zobaczyć, żeby poczuć, że jesteś „bezpiecznym wyborem\"</h3>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-4-12",
        "data": {
          "text": "<p>W usługach klient kupuje spokój. Nawet jeśli Twoja oferta jest logiczna, klient nadal potrzebuje dowodów. Przykłady prac, realizacje, opinie, krótkie case study, pokazanie procesu. To są rzeczy, które pomagają mu podjąć decyzję.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-4-13",
        "data": {
          "text": "<p>Brak takich elementów często sprawia, że klient jest zainteresowany, ale odkłada temat. A odkładanie w praktyce kończy się tym, że nie wraca.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-4-14",
        "data": {
          "text": "<p>Warto też pamiętać o jednej prostej rzeczy. Opinie są dużo mocniejsze, jeśli są konkretne. „Polecam\" jest ok, ale „dzięki tej współpracy mam X\" działa dużo lepiej. Nawet jedna dobra, konkretna opinia potrafi zrobić większą różnicę niż pięć ogólnych.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-4-15",
        "data": {
          "text": "<h3>Kolejny krok: klient ma nie tylko rozumieć, ale też łatwo przejść dalej</h3>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-4-16",
        "data": {
          "text": "<p>Jeśli klient przeczytał ofertę i jest zainteresowany, musi mieć prostą ścieżkę do kontaktu. To nie powinno wymagać szukania zakładki „kontakt\" w menu. Najlepiej, żeby kolejny krok był widoczny i naturalny.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-4-17",
        "data": {
          "text": "<p>I tu jest bardzo ważna rzecz. Ten krok powinien być dopasowany do sytuacji klienta. Jeśli to jest usługa za kilka tysięcy złotych, to często najlepszym kolejnym krokiem nie jest „kup teraz\", tylko mały mostek. Krótkie zapytanie, prosta wiadomość, umówienie rozmowy bez presji. Coś, co nie wymaga od razu dużej decyzji.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-4-18",
        "data": {
          "text": "<p>Takie małe kroki są ważne też dlatego, że klient jest zajęty i często odkłada rzeczy na później. Jeśli kontakt jest prosty, szansa, że zrobi to teraz, rośnie.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-4-19",
        "data": {
          "text": "<h3>Strona musi działać na telefonie i nie może przeszkadzać</h3>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-4-20",
        "data": {
          "text": "<p>To jest może oczywiste, ale zaskakująco często widzę strony, które na komputerze wyglądają w porządku, a na telefonie są męczące. Tekst jest za mały, przyciski są niewygodne, coś się rozjeżdża. Do tego czas ładowania. Jeśli strona ładuje się długo, ludzie wychodzą.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-4-21",
        "data": {
          "text": "<p>To są rzeczy, które łatwo przeoczyć, jeśli sam budowałeś stronę głównie na laptopie i zakładałeś, że „u mnie działa, więc jest okej\". Klient ogląda to inaczej. On ma 30 otwartych kart i sekundę cierpliwości.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-4-22",
        "data": {
          "text": "<p>W kolejnym punkcie przejdziemy do pozyskiwania, czyli do zasięgów i reklam, ale już z tej perspektywy, że oferta i strona są ogarnięte. Bo wtedy reklamy nie są próbą ratowania chaosu, tylko realnym przyspieszaniem procesu.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "separator",
        "id": "sep-before-section-5",
        "data": {}
      },
      {
        "type": "numbered-section",
        "id": "section-5-title",
        "data": {
          "number": 3,
          "text": "POZYSKIWANIE KLIENTÓW"
        }
      },
      {
        "type": "text",
        "id": "section-5-1",
        "data": {
          "text": "<p>Kiedy oferta jest doprecyzowana i strona jest zrobiona tak, że człowiek szybko rozumie, o co chodzi i może się łatwo odezwać, dopiero wtedy temat pozyskiwania ma sens. W przeciwnym razie zwykle kończy się to tym, że płacisz za wejścia, a potem masz frustrację, bo efekt jest słaby.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-5-2",
        "data": {
          "text": "<p>W tym punkcie warto uporządkować jedną rzecz, która często umyka. Pozyskiwanie klientów to nie jest jedno „źródło\" i jedna „reklama\". To jest sposób na to, żeby odpowiednie osoby w ogóle trafiły na Twoją ofertę. A „odpowiednie osoby\" to kluczowe słowo, bo kliknięcia same w sobie nic nie znaczą.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-5-3",
        "data": {
          "text": "<h3>„Skąd brać klientów?\" zależy od tego, jak ludzie podejmują decyzję w Twojej branży</h3>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-5-4",
        "data": {
          "text": "<p>To jest pytanie, które ludzie wpisują w Google dokładnie tak: „skąd brać klientów w małej firmie\" albo „jak pozyskać klientów jako freelancer\". I odpowiedź nie brzmi „z Facebooka\" albo „z Google\". Brzmi: to zależy od tego, czy klient szuka Cię aktywnie, czy dopiero uświadamia sobie, że w ogóle ma problem.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-5-5",
        "data": {
          "text": "<p>Są branże i usługi, gdzie klient jest w trybie „szukam teraz\". Wpisuje w Google konkretną frazę, porównuje kilka opcji, chce podjąć decyzję w miarę szybko. Wtedy Google i SEO mają ogromny sens, bo łapiesz ludzi z wysoką intencją.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-5-6",
        "data": {
          "text": "<p>Są też sytuacje, gdzie klient nie szuka wprost, tylko dopiero „łapie\", że ma problem. Widzi treść, widzi reklamę, widzi przykład, zaczyna o tym myśleć, wraca do tematu. W takich przypadkach social media i reklamy w socialach często działają lepiej, bo budują świadomość i oswajają temat.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-5-7",
        "data": {
          "text": "<p>W praktyce większość firm usługowych działa gdzieś pośrodku. Część klientów szuka od razu, część potrzebuje kilku kontaktów, żeby dojrzeć do decyzji. Dlatego tak ważne jest, żeby nie oceniać reklamy po tym, czy ktoś kupił po pierwszym wejściu.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-5-8",
        "data": {
          "text": "<h3>Co to znaczy, że reklama „działa\"?</h3>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-5-9",
        "data": {
          "text": "<p>Warto wrócić do tego, co było wcześniej. Reklama może działać na różnych poziomach. Może przyciągać uwagę i budować świadomość. Może generować wejścia na stronę. Może generować zapytania. Może generować sprzedaż. Problem zaczyna się wtedy, gdy wszystko wrzucasz do jednego worka i oceniasz wyłącznie po zakupie, bez patrzenia na to, co się działo po drodze.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-5-10",
        "data": {
          "text": "<p>W usługach szczególnie tych droższych, często pierwszym sensownym celem nie jest zakup. Najpierw klient ma Cię poznać, zobaczyć, że rozumiesz temat, wrócić drugi raz, dopiero później się odezwać. To jest normalne.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-5-11",
        "data": {
          "text": "<h3>Najczęstszy błąd: pozyskiwanie „dla wszystkich\", bo wtedy jest taniej</h3>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-5-12",
        "data": {
          "text": "<p>Dużo kampanii jest ustawianych w taki sposób, żeby było jak najwięcej wejść i jak najtaniej. I to brzmi logicznie do momentu, w którym patrzysz na jakość zapytań. Tani klik często oznacza, że przyciągasz ludzi, którzy nie są Twoim klientem, bo reklama jest zbyt ogólna albo obiecuje coś, co brzmi atrakcyjnie dla każdego.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-5-13",
        "data": {
          "text": "<p>W usługach dużo lepiej działa pozyskiwanie, które jest trochę węższe, ale bardziej dopasowane. Mniej wejść, więcej sensownych rozmów. To jest częsta zmiana myślenia, bo przedsiębiorca widzi w panelu ładne liczby i myśli, że idzie dobrze, a potem okazuje się, że nikt nie kupuje.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-5-14",
        "data": {
          "text": "<h3>Reklama i strona muszą mówić to samo</h3>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-5-15",
        "data": {
          "text": "<p>Jeśli reklama stawia konkretny problem, to pierwsze, co klient ma zobaczyć po kliknięciu, to kontynuacja tego samego tematu. W tym samym języku. W tym samym stylu. Bez wrażenia, że reklama była „na siłę\", a strona to osobna historia.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-5-16",
        "data": {
          "text": "<p>To jest prosty test. Jeśli w reklamie mówisz: „Twoja strona nie przynosi zapytań\", to po wejściu klient nie powinien lądować na stronie, która zaczyna od „Witamy na stronie firmy X działającej od 2012 roku\". On ma od razu zobaczyć: okej, to jest o mnie, to jest mój problem, to jest dla mnie.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-5-17",
        "data": {
          "text": "<h3>W praktyce pozyskiwanie to zwykle kilka kontaktów, a nie jeden</h3>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-5-18",
        "data": {
          "text": "<p>Często klient nie kupuje przy pierwszym wejściu. To jest normalne. Dlatego warto myśleć o tym, co dzieje się z osobą, która weszła na stronę i wyszła.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-5-19",
        "data": {
          "text": "<p>W najprostszej wersji chodzi o to, żeby ta osoba zobaczyła Cię jeszcze raz. Może przez kolejną treść, może przez reklamę przypominającą, może przez maila, jeśli wcześniej zostawiła kontakt. Im droższa usługa, tym częściej to wygląda właśnie tak.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-5-20",
        "data": {
          "text": "<p>To też łączy się z mikro krokiem na stronie. Jeśli zamiast „kup teraz\" dajesz możliwość krótkiego zapytania, pobrania checklisty, umówienia rozmowy, to w praktyce zwiększasz szansę, że ktoś wejdzie w kontakt, nawet jeśli nie jest jeszcze gotowy na decyzję.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-5-21",
        "data": {
          "text": "<h3>Pozyskiwanie bez pomiaru to strzelanie w ciemno</h3>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-5-22",
        "data": {
          "text": "<p>Tu nie trzeba wchodzić w technikalia, ale warto mieć minimalną jasność, co się dzieje. Jeśli puszczasz reklamy, a nie wiesz, czy ludzie klikają przycisk kontaktu, czy wypełniają formularz, czy odpadają po wejściu, to trudno w ogóle stwierdzić, co poprawiać.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-5-23",
        "data": {
          "text": "<p>W małej firmie nie potrzebujesz skomplikowanego systemu. Wystarczy wiedzieć, czy ludzie robią ten jeden kluczowy krok, który jest Twoim celem. Jeśli celem jest kontakt, to chcesz wiedzieć, ile osób faktycznie próbuje się skontaktować, a nie tylko ile weszło na stronę.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-5-24",
        "data": {
          "text": "<p>W kolejnym punkcie przejdziemy do sprzedaży i obsługi, czyli do tego, co się dzieje, kiedy klient już się odezwie. Bo wiele firm traci klientów nie na etapie reklamy, tylko na etapie odpowiedzi, rozmowy i prowadzenia klienta przez cały proces.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "separator",
        "id": "sep-before-section-6",
        "data": {}
      },
      {
        "type": "numbered-section",
        "id": "section-6-title",
        "data": {
          "number": 4,
          "text": "SPRZEDAŻ I OBSŁUGA"
        }
      },
      {
        "type": "text",
        "id": "section-6-1",
        "data": {
          "text": "<p>Więle firm traci klientów nie na etapie reklamy, tylko dużo później, kiedy ktoś już zrobił ten krok i się odezwał. To jest o tyle bolesne, że w tym momencie masz już kogoś, kto poświęcił czas, przeczytał ofertę i wykonał działanie. To nie jest przypadkowa osoba z ulicy. Tylko że samo „odezwał się\" jeszcze nic nie gwarantuje.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-6-2",
        "data": {
          "text": "<p>W tym miejscu zaczyna się część, o której mało kto myśli jak o elemencie marketingu, a ona ma ogromny wpływ na to, czy cały system działa. Sprzedaż i obsługa to jest dalszy ciąg tego samego procesu. Jeśli na tym etapie jest chaos, spóźnione odpowiedzi albo brak jasności, to klient odpada, nawet jeśli wszystko wcześniej było zrobione dobrze.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-6-3",
        "data": {
          "text": "<h3>Jak szybko odpowiadać na zapytania?</h3>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-6-4",
        "data": {
          "text": "<p>To jest jedno z najczęstszych pytań, które pojawia się w małych firmach i freelancerce. Klient zostawia wiadomość i często jest w trybie porównywania. Pisze do dwóch, trzech, czasem pięciu osób. Odpowiedź po kilku godzinach potrafi jeszcze być okej. Odpowiedź następnego dnia bardzo często oznacza, że temat już jest gdzieś indziej.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-6-5",
        "data": {
          "text": "<p>Nie chodzi o to, żeby być pod telefonem 24/7. Chodzi o to, żeby mieć prosty standard. Jeśli ktoś pisze, dostaje odpowiedź tego samego dnia. Jeśli nie możesz od razu wejść w szczegóły, wystarczy krótka wiadomość: widzę, dziękuję, wrócę do tego o tej i o tej godzinie. To robi ogromną różnicę, bo klient czuje, że temat jest zaopiekowany.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-6-6",
        "data": {
          "text": "<h3>Klient powinien wiedzieć, co teraz się wydarzy</h3>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-6-7",
        "data": {
          "text": "<p>Dużo osób odpada z bardzo prostego powodu. Nie wiedzą, co dalej. Wysłali wiadomość i cisza. Albo dostają odpowiedź, ale bez żadnej struktury. Albo rozmowa jest chaotyczna i klient ma wrażenie, że sam musi wszystko ciągnąć.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "highlight",
        "id": "highlight-sales-steps",
        "data": {
          "title": "Każdy etap powinien być jasny:",
          "text": "<ul><li>co teraz potrzebujesz od klienta,</li><li>co zrobisz Ty,</li><li>kiedy klient dostanie odpowiedź,</li><li>jaki jest następny krok.</li></ul>"
        }
      },
      {
        "type": "text",
        "id": "section-6-9",
        "data": {
          "text": "<p>To jest niby podstawowe, ale w praktyce w małych firmach często nikt tego nie układa, bo „przecież to oczywiste\". Dla klienta nie jest.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-6-10",
        "data": {
          "text": "<h3>Domykanie sprzedaży rzadko polega na „sprytnej gadce\"</h3>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-6-11",
        "data": {
          "text": "<p>W usługach ludzie często boją się słowa „sprzedaż\", bo kojarzy się z naciskaniem. A w praktyce dobra sprzedaż to jest po prostu przeprowadzenie klienta przez decyzję w normalny sposób.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "highlight",
        "id": "highlight-client-questions",
        "data": {
          "title": "Klient chce wiedzieć:",
          "text": "<ul><li>czy to jest dla niego,</li><li>ile to będzie kosztować,</li><li>ile to potrwa,</li><li>jak wygląda współpraca,</li><li>co dokładnie dostanie.</li></ul>"
        }
      },
      {
        "type": "text",
        "id": "section-6-13",
        "data": {
          "text": "<p>Jeżeli Ty to umiesz jasno powiedzieć, bez lania wody, to „sprzedaż\" dzieje się sama. I jeśli się nie dzieje, to bardzo często znaczy, że gdzieś zabrakło jasności, a nie że potrzebujesz lepszych technik.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-6-14",
        "data": {
          "text": "<h3>Obsługa to największy generator poleceń</h3>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-6-15",
        "data": {
          "text": "<p>W małej firmie i w usługach polecenia są jednym z najsilniejszych źródeł klientów. W praktyce często najbardziej opłacalnym klientem jest ten, który wraca albo poleca. A to zaczyna się od obsługi.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-6-16",
        "data": {
          "text": "<p>Klient powinien czuć, że współpraca jest poukładana. Że odpisujesz w rozsądnym czasie. Że wiesz, co robisz. Że dostaje to, na co się umawialiście. I że wszystko jest przewidywalne. To buduje zaufanie dużo bardziej niż jakakolwiek reklama.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-6-17",
        "data": {
          "text": "<p>Czasem działa też drobny „efekt wow\", ale mądrze. Nie na zasadzie dokładania sobie pracy na stałe, tylko jako jednorazowy dodatek, który naprawdę pomaga. Na przykład coś, o co klient nie prosił, a co ma realną wartość i pokazuje, że myślisz.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-6-18",
        "data": {
          "text": "<h3>Upsell tylko wtedy, kiedy ma sens dla klienta</h3>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-6-19",
        "data": {
          "text": "<p>Więle osób próbuje „sprzedać więcej\", bo to brzmi jak szybki zysk. Tylko że w usługach to łatwo zepsuć. Jeśli klient ma poczucie, że dostał coś niepotrzebnego albo że został do czegoś namówiony, to tracisz dużo więcej niż te dodatkowe pieniądze. Tracisz zaufanie i polecenia.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-6-20",
        "data": {
          "text": "<p>Upsell ma sens wtedy, kiedy wynika z problemu klienta i realnie go rozwiązuje. Klient powinien mieć poczucie: „dobra, to mi pomaga\", a nie „dobra, znowu mi coś sprzedają\".</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-6-21",
        "data": {
          "text": "<h3>Jak sprawić, żeby klienci polecali?</h3>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-6-22",
        "data": {
          "text": "<p>To jest temat, który brzmi banalnie, ale działa. Najwięcej osób liczy na polecenia, ale mało kto ma na to prosty sposób.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "highlight",
        "id": "highlight-recommendations",
        "data": {
          "title": "Najprostsze rzeczy są zwykle najlepsze:",
          "text": "<ul><li>dowieźć bardzo solidnie to, co było ustalone,</li><li>na koniec wprost poprosić o opinię albo polecenie,</li><li>ułatwić to, czyli dać link, dać krótką instrukcję, dać gotowy tekst, jeśli trzeba.</li></ul>"
        }
      },
      {
        "type": "text",
        "id": "section-6-24",
        "data": {
          "text": "<p>Więle osób nie poleci Cię nie dlatego, że nie chce, tylko dlatego, że nie ma okazji albo o tym nie pomyśli. Jedno zdanie w dobrym momencie potrafi zmienić bardzo dużo.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-6-25",
        "data": {
          "text": "<h3>Pomiar na tym etapie też ma sens</h3>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-6-26",
        "data": {
          "text": "<p>Na koniec warto wrócić do pomiaru, ale w prostej formie. Skoro ten cały proces ma działać jak system, to dobrze jest wiedzieć, gdzie on realnie się sypie. Na etapie sprzedaży to też da się zauważyć.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-6-27",
        "data": {
          "text": "<p>Jeśli masz dużo wejść na stronę i mało zapytań, to problem jest wcześniej. Jeśli masz dużo zapytań, ale mało rozmów, to być może problem jest w tym, jak prowadzisz kontakt, jak szybko odpowiadasz, jak wygląda pierwszy krok. Jeśli są rozmowy, a sprzedaży nie ma, to pytanie, czy trafiają właściwe osoby, czy oferta jest dopasowana, czy klient rozumie wartość, czy brakuje jakiejś jasności.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-6-28",
        "data": {
          "text": "<p>Tu nie chodzi o rozbudowane tabelki. Chodzi o to, żebyś nie działał na zasadzie „wydaje mi się\", tylko widział, gdzie dokładnie to się rozjeżdża.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "separator",
        "id": "sep-before-section-7",
        "data": {}
      },
      {
        "type": "text",
        "id": "section-7-title",
        "data": {
          "text": "<h2>A zatem… Jak zdobywać klientów w małej firmie?</h2>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-7-1",
        "data": {
          "text": "<p>Jeśli miałbym zebrać cały ten artykuł w jedną myśl, to ona jest prosta. Marketing to nie jest jedna rzecz. To nie jest „odpalę reklamy i zobaczę, co będzie\". To jest proces, w którym kilka elementów musi działać razem.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-7-2",
        "data": {
          "text": "<p>Uproszczony model sprzedaży wygląda właśnie tak:</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-7-3",
        "data": {
          "text": "<h3>Oferta</h3><p>Najpierw trzeba mieć jasność, co dokładnie sprzedajesz i komu. Klient ma po wejściu czuć, że to jest pod jego problem, a nie „dla wszystkich\". Im bardziej jest to konkretne, tym łatwiej później o dobre zapytania.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-7-4",
        "data": {
          "text": "<h3>Strona i sposób pokazania oferty</h3><p>Dobra oferta w głowie nic nie da, jeśli na stronie jest niejasno, brakuje zaufania albo trudno zrobić kolejny krok. Klient powinien szybko zrozumieć, o co chodzi, zobaczyć konkrety i mieć prostą ścieżkę kontaktu.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-7-5",
        "data": {
          "text": "<h3>Pozyskiwanie (zasięgi i reklamy)</h3><p>Reklamy są ważne, ale same w sobie nie rozwiązują wszystkiego. Pozyskiwanie ma sens wtedy, kiedy sprowadzasz odpowiednie osoby do oferty, a nie „jakiekolwiek wejścia\". W tym miejscu liczy się dopasowanie i świadomość, że w usługach często potrzeba więcej niż jednego kontaktu.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-7-6",
        "data": {
          "text": "<h3>Sprzedaż i obsługa</h3><p>Więle firm traci klientów już po tym, jak ktoś się odezwał. Szybkość odpowiedzi, jasny proces, prowadzenie klienta krok po kroku, dobre doświadczenie ze współpracy i polecenia. To jest element, który potrafi zrobić największą różnicę w wynikach, nawet bez zwiększania budżetu.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-7-7",
        "data": {
          "text": "<h3>Co zrobić teraz, jeśli chcesz przełożyć to na swoją firmę?</h3>",
          "alignment": "left"
        }
      },
      {
        "type": "highlight",
        "id": "highlight-checklist",
        "data": {
          "title": "Checklista - przejdź te punkty po kolei:",
          "text": "<ul><li>Czy oferta jest konkretna i jasno mówi: dla kogo to jest i jaki jest efekt?</li><li>Czy na stronie widać dowody zaufania i łatwo zrobić następny krok?</li><li>Czy pozyskujesz ludzi, którzy naprawdę mogą być klientami, czy po prostu „robią się liczby\"?</li><li>Czy po zapytaniu klient jest szybko zaopiekowany i wie, co dalej?</li></ul>"
        }
      },
      {
        "type": "text",
        "id": "section-7-9",
        "data": {
          "text": "<p>W większości firm wystarczy znaleźć jedno miejsce, które jest najsłabsze, i poprawić je jako pierwsze. To często daje lepszy efekt niż dokładanie budżetu i nerwowe zmienianie reklam.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "cta",
        "id": "cta-1",
        "data": {
          "ctaText": "Chcesz, żebym sprawdził to u Ciebie i powiedział, gdzie uciekają klienci?",
          "ctaLink": "https://drozniak.pl/system",
          "ctaStyle": "primary"
        }
      },
      {
        "type": "text",
        "id": "section-7-10",
        "data": {
          "text": "<p>Jeśli chcesz, mogę przeanalizować Twój marketing w firmie w praktyczny sposób. Nie tylko reklamy, ale cały proces od A do Z: oferta, strona, kontakt, pozyskiwanie, sprzedaż i obsługa. Sprawdzimy, na którym etapie najprawdopodobniej tracisz klientów, co jest do poprawy i co warto wdrożyć jako pierwsze. Jeśli trzeba, mogę też pomóc we wdrożeniu zmian na stronie i w poukładaniu całego procesu.</p>",
          "alignment": "left"
        }
      },
      {
        "type": "text",
        "id": "section-7-11",
        "data": {
          "text": "<p>Zobacz moją ofertę <a href=\"https://drozniak.pl/system\" class=\"link-yellow\">tutaj</a>.</p>",
          "alignment": "left"
        }
      }
    ]
  }'::jsonb;

  -- Wstaw post
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
    'Jak zdobyć klientów w małej firmie: prosty system w 4 krokach',
    'Jeśli prowadzisz małą firmę albo działasz jako freelancer, to ten temat pewnie jest Ci bardzo znajomy. Wkładasz dużo pracy, dbasz o poziom, klienci którzy już skorzystali są zadowoleni, a mimo to w pewnym momencie wszystko rozbija się o jedno pytanie: skąd brać kolejnych klientów?',
    v_content,
    'https://lkygnllsgashwloxgmax.supabase.co/storage/v1/object/public/blog-images/blog-hero-2000.webp',
    'published',
    NOW(),
    v_category_id,
    v_author_id,
    'Jak zdobyć klientów w małej firmie: prosty system w 4 krokach | Stanisław Drozniak',
    'Praktyczny przewodnik po marketingu dla małych firm i freelancerów. Dowiedz się, jak zbudować system pozyskiwania klientów w 4 krokach: oferta, strona, pozyskiwanie i sprzedaż.',
    ARRAY['marketing', 'pozyskiwanie klientów', 'mała firma', 'freelancer', 'sprzedaż', 'reklamy', 'marketing dla małych firm'],
    ARRAY['marketing', 'pozyskiwanie-klientów', 'mała-firma', 'freelancer', 'sprzedaż', 'reklamy'],
    'standard'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    excerpt = EXCLUDED.excerpt,
    content = EXCLUDED.content,
    featured_image_url = EXCLUDED.featured_image_url,
    updated_at = NOW();

  -- Oblicz reading time
  UPDATE blog_posts
  SET reading_time = calculate_reading_time(content)
  WHERE slug = v_slug;

  RAISE NOTICE 'Post został dodany pomyślnie! Slug: %', v_slug;
END $$;
