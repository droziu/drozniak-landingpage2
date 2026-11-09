# Strona główna drozniak.com: research treści i propozycja struktury

Dokument roboczy do przebudowy strony głównej. Kodu strony nie zmienia. Wygląd i układ powstaną osobno, na podstawie referencji z Mobbin, a opis głosu Stanisława przygotowuje równolegle inna sesja. Tutaj jest tylko treść: co zostaje z obecnej strony, czym Stanisław faktycznie się zajmuje, jak robią to inni i jak ułożyć nową stronę główną.

Źródła:
- obecna strona: `app/page.tsx`, `app/system/page.tsx`, `app/szkolenia/page.tsx`, `app/kontakt/page.tsx`, `app/components/Header.tsx`, `app/components/Footer.tsx`, `app/components/pub/ShowcaseTabs.tsx`,
- materiały o klientach w `~/Ads Analysis/Clients/` (portfel, README i klient.json klientów). Z nich biorę tylko ogólny obraz pracy. Liczby, wyniki i opisy konkretnych działań dla klientów zostają poza stroną,
- research stron konsultantów i małych firm doradczych w sieci (sekcje 3 i 4).

## 1. Obecna strona: co zostaje, a co wypada

### Fakty, które da się użyć

- Imię i nazwisko, zdjęcia (`Drozniak_photo_suit_1.webp`, `Drozniak_Zdjecie_Suit_2.webp`).
- Kontakt: stanislaw@drozniak.com, +48 792 491 196, LinkedIn `linkedin.com/in/stanislawdrozniak`, Calendly `calendly.com/drozniakstanislaw/spotkanie`, telefon pon.–pt. 10:00–16:00.
- Odpowiedź w ciągu 24 godzin w dni robocze. Prosta obietnica, którą łatwo dotrzymać, może zostać.
- Krótka rozmowa online na start (dziś 20 minut). Może zostać, długość do decyzji.
- „Wszystkim zajmuję się osobiście”, „pracuję sam, bez agencji i pośredników”. Zostaje jako fakt o modelu pracy, ale bez wojny z agencjami (Stanisław sam współpracuje z agencją SzczypoMedia).
- Historia z podstrony systemu: zaczynał jako nauczyciel szachów i freelancer montujący filmy, potem coraz więcej marketingu i automatyzacji. To ludzki, sprawdzalny szczegół. Do sekcji „O mnie”, krócej.
- Certyfikaty: Meta, Adobe, University of California. Meta pasuje do nowej oferty. Adobe jest z czasów montażu i grafiki, na nowej stronie raczej zbędny. University of California: warto doprecyzować, z czego jest certyfikat (np. kurs na Coursera z marketingu), inaczej brzmi jak ozdoba.
- Szkolenia: zakres z `/szkolenia` jest dobry i rzeczowy (marketing i pozyskiwanie klientów, obsługa zapytań, social media w organizacji, AI w codziennej pracy, automatyzacje, program na zamówienie), tak samo przebieg (diagnoza, program, realizacja, materiały, 30 dni wsparcia) i informacja o dofinansowaniach. Na stronie głównej wystarczy z tego krótki blok z linkiem.
- Chess.com: to miejsce pracy Stanisława, nie klient z portfela (wideo, polskie raporty). Nazwa zostaje na liście firm, z którymi pracuje, bez opisywania konkretnych projektów. Dokładny opis roli trzeba potwierdzić u Stanisława (pytanie w sekcji 9).
- Lista firm: Grupa Fibra, ICAROS i Redlin pasują do nowej oferty. ZEF i Hotel Irys pochodzą ze szkoleń i doradztwa AI (KPO), też pasują do bloku o szkoleniach.
- Z akordeonu „Za dużo rzeczy robimy ręcznie” zostaje sens: przygląda się, jak firma pracuje na co dzień, i szuka miejsc, gdzie ucieka czas albo giną sprawy (zapytania bez odpowiedzi, przepisywanie danych). To jest jądro nowej oferty, trzeba tylko napisać to od nowa i szerzej.

### Do sprawdzenia przed użyciem

- „9+ lat w marketingu”. Liczba pojawia się w kilku miejscach jako 9 i 9+. Potwierdzić, od kiedy liczyć, i używać jednej wersji.
- Pozostałe firmy z dawnej listy: Wagento, eWay Corp, BigCommerce, Tour & Holiday, Commerce Hero, Dietana, Talk Commerce, FHU Tomex, PASW. Część to zapewne praca przy wideo, stronach albo e-commerce za granicą. Jeśli Stanisław robił tam marketing, mogą zostać. Jeśli to były strony albo montaż, lepiej je zdjąć albo dać w jednym zdaniu w „O mnie” („wcześniej montowałem wideo i robiłem strony m.in. dla…”).
- Opinie: Brent Peterson (Wagento), Kalen Jordan (Commerce Hero), Russell Garner, Michał Fus, Kaja Lewandowska. Mówią o „błyskawicznej realizacji” i „dopracowanym detalu”, czyli o wykonawcy, a dwie są po angielsku. Do nowej oferty nie pasują. Potrzebne są nowe opinie od właścicieli i zarządów firm, z którymi Stanisław pracuje teraz (patrz sekcja 8).
- Domena: metadane i canonical wskazują `drozniak.pl`, a w briefie jest drozniak.com. Ustalić jedną.
- Marka MONLINE: w materiałach o klientach oferty idą czasem jako „Stanisław (MONLINE)”. Jeśli MONLINE ma się pojawić na stronie (np. w stopce jako firma), trzeba to zdecydować. Jeśli nie, strona zostaje pod imieniem i nazwiskiem.

### Do wyrzucenia

- Wszystko o robieniu stron jako usłudze: karta „Strony internetowe”, akordeon „Moja strona nie sprzedaje”, link `/strony-www` w menu i stopce, dopisek w hero „marketing i strony internetowe”, „Marketing, strony www i sprzedaż w jednych rękach”, opis w stopce i menu („Systemy pozyskiwania klientów i strony internetowe dla małych firm”).
- Portfolio stron: zakładka „Realizacje” z PASW i REDLIN (`ShowcaseTabs`), podstrony `portfolio-pasw` i `portfolio-redlin`, marquee „Strony WWW, Systemy sprzedażowe, Szkolenia, Realizacje”.
- Liczby wykonawcy strony: „2–4 tygodnie do startu”, „60 dni wsparcia w cenie”, „wideoinstrukcja”. To mowa o oddawaniu gotowego projektu, nie o prowadzeniu marketingu.
- Hasło „Pozyskuję klientów dla firm”. Jest za wąskie i brzmi jak każda agencja leadowa.
- „System sprzedażowy” i „System pozyskiwania klientów” jako produkt. Według briefu jest za wąski. Do tego obiecuje mechanizm, w którym „resztą zajmuje się system”, a zapytania „dostają odpowiedź w kilkanaście sekund”.
- Teksty brzmiące jak AI albo jak szablon agencji:
  - „Wiem, z czym dziś się mierzysz”, „Brzmi znajomo?”, „Trzy scenariusze, jeden problem”, „Konkrety, nie obietnice”, „Dowody, nie deklaracje”, „Prosty proces, jasne etapy”, „Gotów na system, który sprzedaje?”,
  - „Jesteśmy w erze AI. Używam jej z głową.”,
  - „Interaktywne narzędzia konwertują 2–3× lepiej niż PDF-y” (liczba bez źródła),
  - „maszyna do konwersji”, „strategia komunikacji, która trafia w sedno”, „pełny potencjał nowego systemu”,
  - „Pracuję maksymalnie z 5 klientami miesięcznie” (sztuczna rzadkość),
  - „budżet pracuje na efekt, a nie na strukturę agencji”,
  - „Rozumiem Twoje problemy i frustracje biznesowe”,
  - „Specjalista od marketingu i AI”,
  - „Klienci to loteria”, „Twoja strona to cyfrowa wizytówka”.
- Warunek z podstrony systemu „jeśli zatrudniasz więcej niż 10 pracowników, ta oferta nie jest dla Ciebie”. Nowa grupa docelowa to właśnie firmy od kilkunastu do kilkudziesięciu osób.
- Elementy układu, które łamią zasady z `~/.claude/CLAUDE.md`: eyebrow nad każdym nagłówkiem (`SectionIntro eyebrow=…`, „Od czego zaczynamy”, „Co oferuję”, „Jak pracuję”), numeracja „01, 02, 03” w kartach, kropka środkowa w tytule strony („Stanisław Drożniak · Pozyskuję klientów dla firm”) i w paskach pod CTA („20 min online · Zero zobowiązań · Odpowiedź w 24h”), nagłówki dzielone na „serif + sans” z puentą. To sprawa projektu wizualnego, ale treść trzeba pisać tak, żeby nie wymagała tych ozdobników.

## 2. Czym Stanisław zajmuje się dziś

Na podstawie materiałów o klientach. Ta sekcja jest do zrozumienia, nie do przepisania na stronę.

### Role i rodzaje współpracy

- **Zewnętrzny szef marketingu w jednej firmie.** W Grupie Fibra (deweloper, biuro nieruchomości i zarządzanie najmem, Rybnik i okolice) prowadzi cały marketing: reklamy Meta i Google, mailing (GetResponse), pomiar i analitykę, stronę, obsługę zgłoszeń, automatyzacje, wideo. W ICAROS Polska (sprzęt VR do rehabilitacji, sprzedaż B2B do klinik i uczelni) ma rolę Marketing Lead: strona, reklamy, lejek do CRM (Pipedrive), newsletter, cold mailing, treści.
- **Stałe prowadzenie marketingu dla firmy usługowej.** Widokownia (domki premium w Beskidach): reklamy Google i Meta, pomiar, sprzedaż voucherów, klub stałych gości (mailing). Cel firmy to więcej rezerwacji bezpośrednich zamiast przez pośrednika.
- **Kampanie dla klientów agencji SzczypoMedia** (white-label, Stanisław jest „człowiekiem od Facebooka” agencji): szkoła pływania, import aut z USA, instalator pomp ciepła, sklep z wózkami, strefa skoków spadochronowych.
- **Jednorazowe projekty „plan i wdrożenie”.** Zespół muzyczny Bartnicky: plan kampanii, nowa oferta koncertowa, szablony maili, kampanie, formularz, prosty CRM w arkuszu. Fotograf z Niemiec: plan na start i kampania świąteczna. Warsztat oponiarski Car Mig: kampanie sezonowe, wcześniej strona.
- **Szkolenia i doradztwo AI** (2025–początek 2026, m.in. ZEF, Hotel Irys) w ramach programów z dofinansowaniem.
- **Oferty w toku**: marka kosmetyków premium, agencja pracy (rekrutacja i B2B), sklep z materiałami dla gitarzystów (sprzedaż i LTV przez mailing i dosprzedaż).

### Branże

Nieruchomości i deweloper, B2B z długim cyklem sprzedaży (sprzęt medyczny, rekrutacja, usługi dla firm), turystyka i noclegi, e-commerce (sklep z artykułami dziecięcymi, kosmetyki, produkty cyfrowe), usługi lokalne (warsztat, instalator, szkoła pływania, fotograf), rozrywka i eventy (zespół muzyczny, skoki spadochronowe, koncerty). Większość klientów to firmy od kilku do kilkudziesięciu osób, często prowadzone przez właściciela, który sam podejmuje decyzje.

### Problemy, które się powtarzają

Z tego materiału najłatwiej zrobić treść strony, bo pokazuje ekspertyzę bez liczb i bez opisów konkretnych zleceń. Opisane ogólnie, bez przypisywania do klientów:

1. **Zgłoszenia przychodzą, sprzedaży jest mało.** Reklama daje tanie leady, ale mało z nich kończy się rozmową, ofertą albo zakupem. Wąskie gardło leży zwykle po zgłoszeniu: odpowiedź po dobie albo dwóch, brak drugiego kontaktu, brak informacji, co się stało z leadem.
2. **Firma nie wie, co się zwraca.** Liczy kliknięcia i koszt leada, kosztu sprzedaży nie zna. Nie ma uzgodnionego jednego wskaźnika (koszt rezerwacji, oferty, zapisu, sprzedanego vouchera). Statusy w arkuszu czy CRM stoją na „Nowy”.
3. **Pomiar pokazuje lepszy wynik niż w kasie.** Platforma reklamowa liczy jako zakup coś, co nie zostało opłacone, albo nie widzi sprzedaży, która przyszła telefonem. Kampanie uczą się wtedy na złych danych.
4. **Za dużo sprzedaży idzie przez pośrednika.** Booking.com, marketplace, portale ogłoszeniowe. Każda transakcja kosztuje prowizję, a kontakt do klienta zostaje u pośrednika.
5. **Klient kupuje raz i znika.** Nie ma listy mailingowej, klubu, przypomnienia o kolejnym zakupie ani dosprzedaży. Wartość klienta w czasie (LTV) nikt nie liczy.
6. **Słabe okresy.** Sezonowość, puste dni w środku tygodnia, martwe miesiące. Te okresy potrzebują osobnej oferty i kampanii, ta sama reklama przez cały rok ich nie wypełni.
7. **B2B z długim cyklem.** Drogi produkt, kilka telefonów na jedną sprzedaż, decyzja zależna od budżetu klienta. Potrzebny lejek z etapami (lead, rozmowa, test, oferta), CRM i treści, które przygotowują rozmówcę przed telefonem.
8. **Ręczna praca w obsłudze klienta.** Przepisywanie zgłoszeń, ręczne maile, oferty w PDF robione od zera. Część da się zautomatyzować (automatyczna pierwsza odpowiedź z linkiem do kalendarza, powiadomienie handlowca, status wracający do systemu reklamowego).
9. **Marketing robi kilka osób albo firm i nikt nie widzi całości.** Agencja od reklam, ktoś od strony, ktoś od social mediów, właściciel od sprzedaży. Każdy raportuje swoje, a nikt nie odpowiada za to, czy z tego wszystkiego jest sprzedaż.

Wspólny mianownik: Stanisław patrzy na całą drogę klienta, od pierwszej reklamy do sprzedaży i kolejnego zakupu. Tym różni się od typowego „specjalisty od Facebooka” i strona powinna mówić o tym wprost.

### Czego z tych materiałów nie wolno przenosić na stronę

- Żadnych liczb ani wyników klientów (leady, koszty, obłożenie, ROAS, sprzedaż), żadnych stawek i budżetów.
- Żadnych opisów „u klienta X zrobiłem Y”. Nazwy firm i ogólne zdanie o roli tak, problemy i sposób pracy tylko w oderwaniu od nazw.
- **SzczypoMedia można pokazać.** Stanisław fakturuje agencję bezpośrednio, więc to jego klient i może być na liście firm, np. „SzczypoMedia, agencja marketingowa: prowadzę kampanie Meta dla jej klientów”. Grzecznie jest uprzedzić Piotra Szczypińskiego, bo wpis na stronie pokazuje klientom agencji, że Meta robi dla niej ktoś z zewnątrz.
- **Klientów agencji nie wymieniać.** PAS, Salvage Guys, mTurniak, Bobiland i Skyforce są obsługiwani white-label: relację ma agencja, a raporty nie mają śladu drozniak.pl. Ich nazwy dopiero po zgodzie agencji. Bez niej wystarczy ogólnie: „przez agencję prowadzę kampanie m.in. dla szkoły pływania, sklepu internetowego i firm usługowych”.
- Nazwy firm z etapu oferty (Fioramea, Qlevel, Tajemnice Gryfu) dopiero po podpisaniu współpracy.

Nazwy, które wyglądają na bezpieczne do użycia (relacja bezpośrednia, trwająca współpraca): Grupa Fibra, ICAROS Polska, Widokownia, Bartnicky, Car Mig, Redlin. Mimo to warto zapytać każdą z tych firm o zgodę, bo prośba o zgodę to dobry moment na prośbę o opinię.

## 3. Research: strony konsultantów i małych firm doradczych

Przejrzane w listopadzie 2026. Cytaty nagłówków są przybliżone (część stron czytana przez narzędzie, które streszcza), więc przed wykorzystaniem warto otworzyć stronę. Przy dwóch stronach zagranicznych znalazłem tylko adres na `pages.dev`, właściwa domena niesprawdzona.

Żadna z tych stron nie pokrywa dokładnie profilu Stanisława (cały marketing plus procesy i AI w małej firmie). Zagraniczne są zwykle węższe, pod SaaS i B2B tech. Najbliżej są Digital Advisors, Digital Marketing Professor i Martech Consulting.

### Strony polskie

**Dawid Marciniak, dawidmarciniak.pl** (marka osobista przy Grupie B6)
- Hero: „W 90 dni zbudujemy system pozyskiwania klientów”, pod spodem treści, reklamy, lejek i sprzedaż w jednym mierzalnym systemie.
- Oferta: jedna metoda w trzech poziomach z cenami netto: mentoring 7 000 zł (12 tygodni), jeden mechanizm leadowy 16 000 zł, pełny system od 32 000 zł (CRM, automatyzacje, szkolenie zespołu). Budżet reklamowy osobno, wprost napisane, że nie ma gwarancji wyników.
- Doświadczenie: przykłady klientów opisane branżą (kancelaria, deweloper, e-commerce premium, B2B rolnictwo), mapa procesu, kalkulator ekonomiki lejka. Przyznaje, że opinie dopiero zbiera.
- CTA: 30-minutowa rozmowa, do tego bezpłatna diagnoza i kalkulator.
- Działa: ceny na wierzchu, trzy stopnie zaangażowania, „dla kogo i dla kogo nie” z konkretami (cykl sprzedaży 2–12 tygodni, decyzje powyżej 3 000 zł).
- Szablonowe: „wirtualny handlowiec”, „dowody, nie obietnice” przy małej liczbie dowodów, znak ™ przy nazwie metody. Hasło „system pozyskiwania klientów” jest dokładnie tym, od czego Stanisław odchodzi, więc to też ostrzeżenie: ten przekaz jest już zajęty i wąski.

**Paweł Szymków, Marketing Hero, pawelszymkow.com**
- Hero: „Marketing, który działa.”, w podtytule marketing jako proces do poukładania.
- Oferta: konsultacje (audyt, strategia, plan), mentoring miesięczny, szkolenia firmowe, wystąpienia. Bez cen, pierwsza rozmowa 20 minut za darmo. Porównanie z agencją i etatem.
- Doświadczenie: logotypy dużych marek bez opisu zakresu, „15+ lat”, „300+ firm”, imienne opinie, media.
- CTA: bezpłatna konsultacja, przy szkoleniach „Zapytaj o termin”.
- Działa: czytelny podział na cztery formy, szkolenia jako osobna linia. FAQ mówi uczciwie, że on prowadzi proces, a wykonanie jest po stronie klienta albo podwykonawców.
- Szablonowe: metafory (kostka Rubika, „bohaterem jesteś Ty”), hasło powtarzane w każdej sekcji, opinie typu „polecam”, nieuzasadnione „Nr 1”.

**Premium Consulting, „Dyrektor marketingu na godziny”, premium-consulting.pl** (dwoje założycieli)
- Hero: większa efektywność firmy bez zatrudniania dyrektora na etat.
- Oferta: trzy pakiety godzin z terminem ważności (20 h na 3 miesiące, 40 h na 6, 80 h na 12), w każdym lista zadań. Bez kwot.
- Doświadczenie: lata i liczba projektów założyciela, logotypy (m.in. Allegro, Santander), siedem opinii z nazwiskami.
- CTA: formularz zapytania, rozmowa, e-book.
- Działa: model godzinowy łatwo zrozumieć, lista zadań w pakiecie pokazuje szeroki zakres (zespoły, brief dla dostawców, GA4, automatyzacje).
- Szablonowe: „autorska metoda” bez opisu, niespójne liczby lat, stopka z 2023 roku.

**Owl My God, „Interim marketing manager na godziny”, owlmygod.pl** (mała firma, kontakt przez jedną osobę)
- Hero: doświadczony marketing manager na godziny, w podtytule „tajna broń”.
- Oferta: zarządza zespołem, agencjami i freelancerami, w razie potrzeby sam wykonuje. Proces w pięciu krokach: konsultacja, analiza, plan na 3–6 miesięcy, sprinty z cotygodniowym statusem, poprawki. Bez cen.
- Doświadczenie: „+10 lat”, kilkanaście logotypów, sześć imiennych opinii.
- Działa: dobrze opisany rytm współpracy (cotygodniowy status), „dla kogo” (marketing jest, ale chaotyczny), wprost „nie realizujemy pojedynczych zleceń”.
- Szablonowe: „tajna broń”, „szwajcarski zegarek”, emotikony, „za ułamek ceny” bez liczb.

**Digital Advisors, „Zewnętrzny dyrektor marketingu”, digitaladvisors.pl** (grupa Macopedia)
- Hero: zewnętrzny dyrektor marketingu na godziny z naciskiem na AI, w podtytule koniec czasów dużych budżetów i kilku agencji.
- Oferta: pięć kroków z harmonogramem: audyt i strategia 2–4 tygodnie, dobór i wdrożenie narzędzi 4–8 tygodni, szkolenie osoby w firmie, nadzór. Firma ma być samodzielna po około 3 miesiącach.
- Doświadczenie: logotypy (Żabka, Raben, Multisport), podcast i szkolenia.
- Działa: najbliżej profilu Stanisława. Sygnały „to o Tobie” (marketing robi prezes między innymi sprawami, kilka agencji bez koordynacji), próg wielkości firmy (obrót), porównanie z kosztem etatu.
- Szablonowe: „nowy model marketingu”, liczby bez źródła („jedna osoba z AI zastępuje trzy agencje”, „50–70% oszczędności”), na stronie nie ma ludzi ani cen. AI w nagłówku robi z niej kolejną „ofertę z AI”, czego Stanisław chce uniknąć.

### Strony zagraniczne

**Mantas Levinas, fractional CMO dla B2B tech** (znaleziony adres `mantaslevinas-com.pages.dev`)
- Hero: w skrócie, „to, co doprowadziło Cię do 3 mln euro, nie zaprowadzi do 20 mln”. Podtytuł: fractional CMO dla założycieli firm B2B tech.
- Oferta: trzy kroki. Audyt (2 tygodnie, plan na 90 dni), budowa (3 miesiące, stała cena), stała rola CMO (5 500 euro miesięcznie, minimum 3 miesiące, najwyżej dwóch klientów naraz). Tabela porównania z agencją i etatem.
- Doświadczenie: jedno dokładne studium kariery (rola Head of Growth w jednej firmie, wzrost zespołu), bóle założycieli w formie cytatów.
- CTA: rozmowa wstępna, 30 minut na jeden problem „bez sprzedawania”, darmowa lista kontrolna.
- Działa: najlepsza sekcja „dla kogo i dla kogo nie”: odsyła do agencji tych, którzy wiedzą, co zrobić, a duże firmy do etatowego CMO. Limit dwóch klientów jest wiarygodny, bo wynika z modelu pracy.
- Szablonowe: aforyzmy o strategii, niewyjaśnione „AI-first”.

**Daniel Johnson, fractional CMO** (znaleziony adres `danieljohnsonxyz-site.pages.dev`)
- Hero: w skrócie, firma rośnie, ale założyciel wciąż musi się angażować w zbyt wiele.
- Oferta: tabela z cenami: darmowy przegląd 20 minut, sprint 90 dni 8–12 tys. funtów, stała rola 5–8 tys. funtów miesięcznie, warsztaty i wystąpienia. Plan 30/60/90 dni i przykładowy tydzień pracy.
- Doświadczenie: dwa studia z liczbami, imienne opinie, podcast, newsletter, ocena z platformy mentorskiej.
- CTA: darmowa rozmowa 20 minut, z dopiskiem w stylu „powiedz, gdzie utknął wzrost”.
- Działa: klient opisany po objawach („założyciel wciąż w zbyt wielu decyzjach”), jasne wykluczenia, przykładowy tydzień pracy.
- Szablonowe: niewyjaśniony „growth operating system”, powtarzające się sekcje.

**Arnie Robinson, Digital Marketing Professor, thedigitalmarketingprofessor.com**
- Hero: audyt i doradztwo z analityki marketingu cyfrowego, dla dyrektorów i menedżerów, którzy chcą zrozumieć swój marketing.
- Oferta: audyt całości (reklamy, SEO, strona, analityka, piksele, social, e-mail, atrybucja, CRM, lejki) za 4 000 dolarów, doradztwo 1 000 dolarów miesięcznie, bez długiej umowy. Ocenia zespoły i agencje klienta, wykonanie zostawia poleconym specjalistom.
- Doświadczenie: ponad 25 lat, „setki organizacji”, jedna anonimowa anegdota, praca wykładowcy.
- CTA: zamów audyt, napisz maila.
- Działa: najczystszy opis audytu, cena i zakres podane, wprost „sam nie prowadzę kampanii”. Blisko „widzę całość i wskazuję, co naprawić”.
- Słabo: brak imiennych dowodów, nastawienie na większe organizacje.

**Martech Consulting, martechconsulting.io** (mały zespół: CRM, e-mail, Meta Ads)
- Hero: „Stop losing leads to silence.”, czyli przestań tracić leady, na które nikt nie odpowiada. Podtytuł o CRM, automatyzacji e-maili i kampaniach.
- Oferta: cztery pakiety z widełkami cen (start automatyzacji, prowadzenie Meta Ads miesięcznie, audyt dostarczalności maili, budowa całego zestawu narzędzi), proces w trzech krokach (rozmowa, wycena ryczałtowa, start).
- Doświadczenie: logotypy z opisem branży, „17+ lat”.
- CTA: darmowa rozmowa 30 minut, „Zobacz pakiety”.
- Działa: nagłówek nazywa problem właściciela, który Stanisław widzi u większości klientów (leady bez odpowiedzi). Konkretne elementy pakietów (rekordy SPF, DKIM, DMARC, liczba sekwencji maili, okres wsparcia).
- Szablonowe: „300%” i „48 h” bez wyjaśnienia, brak opinii i wykluczeń.

**Alex Croucher, alexcroucher.com** (konsultant B2B)
- Hero: konsultant marketingu dla firm B2B, „od MŚP po korporacje”.
- Oferta: etat zastępczy albo projekt, długa lista usług, ceny na osobnej podstronie. Opisany proces: sesja, pisemne wnioski i wycena, umowa, plan z kamieniami milowymi, raport KPI, termin płatności.
- Doświadczenie: 20 lat, role w firmach, logotypy dużych marek, członkostwo w brytyjskim instytucie marketingu.
- CTA: darmowa sesja 30 minut, zamów audyt.
- Działa: doświadczenie pokazane karierą, certyfikatem i nazwami firm zamiast liczb. Jawne zasady płatności i raportowania.
- Szablonowe: lista usług jak z katalogu, „great results”, brak wykluczeń.

**Emily Kramer, MKT1, mkt1.co**
- Hero: pomoc startupom B2B w budowie marketingu, w podtytule liczba doradzanych firm i zasięg treści.
- Oferta: newsletter, ograniczone doradztwo („napisz maila”), warsztaty, podcast. Bez cen.
- Doświadczenie: wcześniejsze role w znanych firmach, nazwane startupy, duża lista subskrybentów.
- Działa: autorytet budują pisanie i wcześniejsze role, case studies prawie nie ma. Dowód, że treści mogą zastąpić studia przypadków.
- Szablonowe: liczby zasięgu bez źródła.

**Bethan Vincent, part-time CMO** (strona na Squarespace)
- Hero w formie pytania o wsparcie marketingowe dla rozwoju firmy.
- Oferta: od 3 000 funtów miesięcznie, rozliczenie miesiąc po miesiącu, projekt albo stała współpraca.
- Doświadczenie: opis kariery, linki do prasy, jedna opinia dyrektora finansowego.
- Działa: cena „od” i brak długiej umowy.
- Szablonowe: nagłówek-pytanie, „wykładniczy zwrot”, brak opisu procesu, stara stopka.

### Przykłady, czego nie robić

- **Bertoli Marketing** (bertolimarketing.com): hasło z trzech równoważników o kierownictwie na poziomie zarządu za ułamek kosztu, wyniki „200–1700%” bez źródła, brak biografii. Agencja udaje jedną osobę.
- **Kamyar Shah** (kamyarshah.com): jedenaście podstron usług (CMO, COO, AI, coaching). Pokazuje, co się dzieje, gdy szeroki profil zamienia się w katalog. Dobry pomysł: przedział przychodów klienta i darmowy 20-minutowy przegląd.
- **EWO** (ewo.uk.com): „marketing na zewnątrz dopasowany do potrzeb”, bez żadnych dowodów.

Widziane tylko w wynikach wyszukiwania, niesprawdzone: HPZ Marketing, Geisheker Group (sekcja o klientach, z którymi nie pracują), automatenow.pl (automatyzacje na HubSpot).

## 4. Wnioski z researchu

Co się powtarza na dobrych stronach i warto przenieść:

1. **Mały pierwszy krok.** Darmowa rozmowa 20–30 minut albo płatny przegląd jako osobny produkt. Stanisław już ma rozmowę 20 minut. Brakuje płatnego przeglądu jako drugiego stopnia.
2. **Trzy stopnie zamiast katalogu usług:** przegląd, jednorazowe wdrożenie, stała współpraca. Tak da się pokazać szeroki profil bez listy dwudziestu usług. Taki układ jest w sekcji 6.5.
3. **Ceny albo przynajmniej „od”.** Wyróżniają się strony, które je podają (Marciniak, Levinas, Johnson, Martech Consulting, Robinson). Polskie strony w tej kategorii zwykle cen nie podają, więc nawet przedział byłby wyróżnikiem.
4. **Klient opisany po objawach, nie po branży.** „Marketing robi prezes między innymi sprawami”, „kilka agencji bez koordynacji”, „leady bez odpowiedzi”. Lista sytuacji z sekcji 2 działa tak samo, a do tego pochodzi z prawdziwej pracy.
5. **Krótkie „dla kogo nie”, najlepiej z progiem** (wielkość firmy, gotowość do zmian po stronie klienta).
6. **Granice roli powiedziane wprost.** Robinson pisze, że sam kampanii nie prowadzi, Szymków, że zarządza procesem. Stanisław może powiedzieć odwrotnie i to jest jego przewaga: sam prowadzi kampanie, sam ustawia pomiar i automatyzacje.
7. **Doświadczenie bez liczb:** obecne role (zewnętrzny szef marketingu w Fibrze i ICAROS), nazwy firm z jednym zdaniem o zakresie, branże, imienne opinie, opis procesu z harmonogramem, pisanie.
8. **Opis pierwszego miesiąca albo przykładowego tygodnia** odpowiada na pytanie „co właściwie dostanę”. Dobry materiał na podstronę współpracy.

Czego unikać, bo powtarza się na słabych stronach:

9. Haseł bez treści i liczb bez kontekstu („tajna broń”, „300%”, „50–70% oszczędności”).
10. Katalogu usług zamiast problemów.
11. Niespójności (różne lata doświadczenia w dwóch miejscach, stara stopka). Obecna strona ma ten problem z „9” i „9+ lat”.
12. AI w nagłówku. Strony, które stawiają AI na pierwszym miejscu (Digital Advisors, „AI-first”), brzmią jak każda inna oferta z tego roku.
13. Hasła „system pozyskiwania klientów”. W Polsce używa go już kilka osób w podobnej formie, a Stanisław od niego odchodzi.

Luka, którą Stanisław może zająć: polskie strony z tej kategorii są albo ogólne („dyrektor marketingu na godziny”, bez konkretów i cen), albo wąskie (jeden mechanizm leadowy). Nikt z przejrzanych nie łączy wprost trzech rzeczy: roli osoby odpowiedzialnej za całość, samodzielnego wykonania i patrzenia na proces po zgłoszeniu (obsługa zapytań, CRM, powracający klienci). Właśnie to widać w materiałach o jego klientach.

## 5. Pozycjonowanie

Trzy warianty. Każdy to jedno zdanie, które może być nagłówkiem albo pierwszym zdaniem pod nim, plus rozwinięcie.

### Wariant A: zewnętrzny dyrektor marketingu

**Zdanie:** Prowadzę marketing w firmach, które nie mają własnego dyrektora marketingu.

**Rozwinięcie:** Dla firmy od kilkunastu do kilkudziesięciu osób etatowy szef marketingu to zwykle za duży koszt, a agencja albo freelancer od reklam zajmuje się tylko swoim kawałkiem. Wchodzę na część etatu i odpowiadam za całość: reklamy, stronę i landingi, obsługę zapytań, CRM, mailing, raportowanie. Pracuję tak dziś jako zewnętrzny szef marketingu w Grupie Fibra i w ICAROS Polska.

**Za:** jasno nazywa rolę, łatwo zrozumieć, ile kosztuje i jak wygląda współpraca (stała, miesięczna). Pokazuje, że to nie jest „robię reklamy”. Popularne określenie fractional CMO w Polsce jest jeszcze mało znane, więc lepiej mówić po polsku, co się robi.

**Przeciw:** sugeruje tylko stałą współpracę. Słabiej sprzedaje jednorazowy przegląd i projekty. „Dyrektor marketingu” może brzmieć zbyt korporacyjnie dla właściciela warsztatu.

### Wariant B: przegląd i naprawa procesu od reklamy do sprzedaży

**Zdanie:** Sprawdzam, gdzie w firmie między reklamą a sprzedażą giną klienci, czas i pieniądze, i to naprawiam.

**Rozwinięcie:** Zaczynam od tego, jak firma pracuje dziś: skąd przychodzą klienci, co się dzieje ze zgłoszeniem, kto odpowiada i po jakim czasie, co jest mierzone, co robi się ręcznie. Z tego powstaje lista rzeczy do zmiany w kolejności od tej, która da najwięcej. Część wdrażam sam (reklamy, landingi, automatyzacje, mailing, CRM), część robi zespół według instrukcji. Używam przy tym nowych narzędzi, także AI, tam gdzie oszczędzają czas.

**Za:** najbliższe temu, co Stanisław opisał jako swoją pracę („wchodzę do firmy, patrzę, jak coś działa, i znajduję procesy do naprawy”). Mówi o efekcie, który właściciel rozumie: czas, pieniądze, klienci. Daje naturalny pierwszy krok (przegląd), po którym przychodzi wdrożenie albo stała współpraca. Odcina się od „robi strony z AI” bez mówienia o tym.

**Przeciw:** dłuższe zdanie, trudniej je skrócić do nagłówka. Trzeba pilnować, żeby nie zmienić się w „audyt marketingowy”, który ludzie kojarzą z PDF-em do szuflady.

### Wariant C: marketing liczony do sprzedaży i kolejnego zakupu

**Zdanie:** Łączę reklamę, stronę, maile i CRM w jedną całość i rozliczam ją ze sprzedaży, a nie z kliknięć.

**Rozwinięcie:** W małej firmie marketing często składa się z oddzielnych kawałków: kampania u jednej osoby, strona u drugiej, newsletter wysyłany raz na kwartał, zgłoszenia w skrzynce mailowej. Składam to w jeden lejek od pierwszego kontaktu do kolejnego zakupu, ustalam z właścicielem jeden wskaźnik, po którym oceniamy wynik (koszt sprzedaży, rezerwacji, oferty), i ustawiam pomiar tak, żeby było go widać.

**Za:** mocno pokazuje myślenie o danych, LTV i całym lejku. Dobre dla firm, które już wydają na reklamy i są rozczarowane.

**Przeciw:** konstrukcja „X, a nie Y” jest na liście rzeczy do unikania i łatwo zamienia się w slogan. Bardziej techniczne, mniej mówi o procesach i oszczędności czasu.

### Rekomendacja

Wariant B jako nagłówek i główna myśl strony, z rolą z wariantu A w drugim zdaniu albo w pasku pod hero („Zewnętrzny szef marketingu w Grupie Fibra i ICAROS Polska”). Wariant C najlepiej wykorzystać w sekcji o sposobie pracy (jeden wskaźnik, pomiar, cały lejek), bez formy „X, a nie Y”.

Przykładowe hero do dalszej pracy nad głosem:

> **Szukam w firmach miejsc, gdzie między reklamą a sprzedażą uciekają klienci, czas i pieniądze. Potem to naprawiam.**
>
> Prowadzę marketing firm od kilkunastu do kilkudziesięciu osób: reklamy, landingi, obsługę zapytań, CRM, mailing i automatyzacje. Zaczynam od sprawdzenia, jak firma pracuje dziś, a zmiany wdrażam sam.
>
> [Umów rozmowę] [Jak wygląda współpraca]

To tylko materiał startowy. Ostateczne słowa powinny przejść przez opis głosu z równoległej sesji.

## 6. Struktura strony głównej

Kolejność od góry. Przy każdej sekcji: cel, szkic treści i uwagi. Nagłówki w szkicu są robocze, ale już w docelowym stylu: nazywają temat zwykłymi słowami.

### 6.1. Hero

**Cel:** w pięć sekund powiedzieć, kim jest Stanisław, czym się zajmuje i dla kogo. Jeden główny przycisk.

**Treść:**
- nagłówek z wariantu B (jedno zdanie),
- dwa, trzy zdania rozwinięcia: dla kogo (firmy od kilkunastu do kilkudziesięciu osób), co obejmuje (reklamy, landingi, obsługa zapytań, CRM, mailing, automatyzacje), jak pracuje (od sprawdzenia do wdrożenia),
- przycisk główny: „Umów rozmowę” (kalendarz). Drugi, tekstowy: „Jak wygląda współpraca” (kotwica do sekcji 6.5),
- zdjęcie Stanisława,
- pod spodem jedna linijka z rolą: „Zewnętrzny szef marketingu w Grupie Fibra i ICAROS Polska. Prowadzę też marketing firm usługowych, sklepów internetowych i firm B2B.”

**Uwagi:** bez liczników „9+ lat”, „24 h”, „2–4 tyg.” w hero. Bez słowa „optymalizacja”. AI nie w nagłówku.

### 6.2. Firmy, z którymi pracuję

**Cel:** szybki dowód, że to praca z prawdziwymi firmami, bez case studies z liczbami.

**Treść:** lista nazw (tekstem albo logotypami), a przy każdej jedno zdanie o roli i branży, np.:
- Grupa Fibra, deweloper i biuro nieruchomości: prowadzę cały marketing jako zewnętrzny szef marketingu,
- ICAROS Polska, sprzęt do rehabilitacji, sprzedaż B2B: odpowiadam za marketing i lejek sprzedażowy,
- Widokownia, domki w Beskidach: prowadzę reklamy, pomiar i mailing do stałych gości,
- Bartnicky, zespół muzyczny: przygotowałem plan, ofertę i kampanie na sezon koncertowy,
- Chess.com: sama nazwa jako firma, z którą pracuję, bez opisu projektów (rola do potwierdzenia),
- SzczypoMedia, agencja marketingowa: prowadzę kampanie Meta dla jej klientów (nazwy klientów agencji tylko po jej zgodzie),
- dalej firmy z usług lokalnych i e-commerce, ewentualnie zbiorczo („oraz kilkanaście firm usługowych i sklepów”).

**Uwagi:** zdanie o roli robi większą robotę niż sam pasek logotypów, bo pokazuje zakres („cały marketing”, „lejek B2B”). Bez wyników. Zgoda firm przed publikacją (sekcja 2). Pasek przewijających się nazw (marquee) lepiej zastąpić statyczną listą.

### 6.3. Z czym przychodzą firmy

**Cel:** pozwolić właścicielowi rozpoznać swoją sytuację. To zastępuje dzisiejszy akordeon „Wiem, z czym dziś się mierzysz”.

**Treść:** pięć, sześć sytuacji opisanych słowami właściciela, każda z jednym, dwoma zdaniami, co z tym zwykle robię. Na bazie listy z sekcji 2:
- „Z reklam przychodzą zgłoszenia, ale mało z nich kupuje.” Sprawdzam, co się dzieje po zgłoszeniu: kto odpowiada, kiedy, czy jest drugi kontakt. Często poprawa obsługi daje więcej niż zmiana reklamy.
- „Nie wiem, które działania się zwracają.” Ustalamy jeden wskaźnik liczony do sprzedaży i ustawiam pomiar tak, żeby było go widać co tydzień.
- „Klienci kupują raz i znikają.” Mailing, program dla stałych klientów, przypomnienia, dosprzedaż.
- „Za dużo sprzedaży idzie przez pośrednika.” Kampanie i strona pod sprzedaż bezpośrednią, lista kontaktów, która zostaje w firmie.
- „Obsługa zapytań to ręczna robota.” Automatyczna pierwsza odpowiedź, CRM zamiast skrzynki mailowej, powiadomienia, gotowe szablony ofert.
- „Marketing robi kilka osób i nikt nie widzi całości.” Biorę odpowiedzialność za całość albo układam ją tak, żeby jedna osoba w firmie ją widziała.

**Uwagi:** cytaty w cudzysłowie „…” tylko, jeśli to rzeczywiście słowa klientów (część jest w materiałach, np. „nie zależy mi na samej liczbie kontaktów”). Inaczej bez cudzysłowu, jako zwykłe zdania. Bez przypisywania do firm.

### 6.4. Zakres pracy

**Cel:** pokazać szeroki profil, ale jako jedną całość, nie listę usług agencji.

**Treść:** obszary ułożone w kolejności drogi klienta, każdy z jednym zdaniem, co konkretnie robię:
- reklama płatna: Meta (Facebook, Instagram) i Google, planowanie budżetu, kampanie sezonowe,
- landingi i oferty: strony pod konkretną kampanię, formularze, oferta handlowa, kalkulatory,
- obsługa zapytań i CRM: czas odpowiedzi, statusy, Pipedrive albo prosty CRM, przekazanie leada handlowcowi,
- mailing i powracający klienci: GetResponse, MailerLite, sekwencje powitalne, newsletter, klub stałych klientów, LTV,
- pomiar i raporty: GA4, piksel i Conversions API, jeden wskaźnik sprzedażowy, raport, który właściciel czyta w pięć minut,
- automatyzacje i AI w procesach: mniej przepisywania i ręcznych maili, narzędzia AI tam, gdzie skracają pracę zespołu.

**Uwagi:** landingi zostają jako element lejka, ale bez słowa „strony internetowe” i bez portfolio. Nazwy narzędzi (Meta, Google, GA4, Pipedrive, GetResponse, MailerLite) dają wiarygodność lepiej niż przymiotniki. AI w jednym punkcie, jako narzędzie.

### 6.5. Jak wygląda współpraca

**Cel:** zdjąć ryzyko z pierwszego kroku i pokazać, że są różne formy.

**Treść:** trzy formy, od najmniejszej:
1. **Przegląd marketingu i sprzedaży.** Dwa, trzy tygodnie. Dostęp do kont reklamowych, analityki i CRM, rozmowy z osobami, które obsługują klientów, przejście drogi klienta krok po kroku. Wynik: lista zmian w kolejności, z oceną, co da najwięcej i ile pracy wymaga. Część rzeczy poprawiam od razu.
2. **Wdrożenie.** Konkretny projekt z listy: lejek z kampanią i landingiem, CRM i automatyczna obsługa zapytań, mailing do obecnych klientów, pomiar. Zakres i cena ustalone z góry.
3. **Stałe prowadzenie marketingu.** Zewnętrzny szef marketingu na część etatu: odpowiadam za całość, prowadzę kampanie sam, współpracuję z zespołem i podwykonawcami (grafik, agencja, handlowcy), raz w miesiącu raport i plan.

**Uwagi:** warto podać orientacyjne ceny albo przedziały (np. „przegląd od … zł”, „stała współpraca od … zł miesięcznie”). Część stron z researchu tak robi i to odsiewa niepasujących klientów. Decyzja należy do Stanisława. Rozmowa na start zostaje jako krok zero.

### 6.6. Dla kogo

**Cel:** powiedzieć, kto jest dobrym klientem, i grzecznie odesłać resztę.

**Treść:**
- dobrze pasuje: firma od kilkunastu do kilkudziesięciu osób, ze sprawdzoną ofertą i klientami, która już wydaje na marketing albo chce zacząć robić to porządnie, właściciel lub zarząd decyduje szybko,
- branże, w których mam doświadczenie (lista z sekcji 2, bez nazw firm),
- słabo pasuje: firma bez sprawdzonej oferty, ktoś, kto szuka tylko „tańszego leada” bez zmian w obsłudze, ktoś, kto potrzebuje samej strony internetowej.

**Uwagi:** zdanie o stronach internetowych w „słabo pasuje” załatwia temat zmiany oferty bez tłumaczenia się.

### 6.7. Większe firmy i szkolenia

**Cel:** zaznaczyć ofertę poboczną, nie mieszając jej z główną.

**Treść:** dwa krótkie bloki obok siebie albo jeden pod drugim, wizualnie mniejsze niż sekcje główne:
- **Pomoc zespołowi w większej firmie.** Dla działu marketingu albo sprzedaży, który ma konkretny problem: lejek dla nowego produktu, porządek w danych i raportach, obsługa leadów, wdrożenie narzędzi AI w pracy zespołu. Pracuję z zespołem przez kilka tygodni nad jedną sprawą.
- **Szkolenia.** Praktyczne warsztaty z marketingu, obsługi zapytań, automatyzacji i AI w codziennej pracy, z programem pod konkretny zespół. Możliwe dofinansowanie. Link: „Szczegóły szkoleń” (`/szkolenia`).

**Uwagi:** ZEF i Hotel Irys mogą trafić tutaj jako firmy, w których były szkolenia (po zgodzie).

### 6.8. O mnie

**Cel:** pokazać człowieka i ekspertyzę bez case studies.

**Treść (szkic do przepisania głosem Stanisława):** krótko, w pierwszej osobie. Ile lat w marketingu (po potwierdzeniu). Skąd przyszedł (szachy, montaż wideo, praca jako freelancer, który sam szukał klientów). Co robi dziś: praca w Chess.com (opis roli do potwierdzenia), zewnętrzny szef marketingu w dwóch firmach, prowadzi marketing kilkunastu mniejszych firm, współpracuje z agencją. Że sam prowadzi kampanie i sam siedzi w danych, więc nie oddaje pracy dalej. Jedno zdanie o tym, co go w tej pracy interesuje (np. moment, kiedy po przejściu drogi klienta widać, gdzie leży problem). Certyfikat Meta.

**Uwagi:** bez „pasjonat”, „ekspert”, „specjalista od AI”. Zdjęcie inne niż w hero, najlepiej przy pracy albo z klientem.

### 6.9. Opinie

**Cel:** dowód od klientów zamiast liczb.

**Treść:** dwie, trzy opinie od właścicieli lub zarządów firm z sekcji 6.2, z imieniem, nazwiskiem, rolą i firmą. Najlepiej takie, które mówią o sposobie pracy i o tym, co się zmieniło w firmie, bez liczb.

**Uwagi:** dzisiejsze opinie o stronach do wymiany. Jeśli nowych nie będzie na start, sekcję lepiej pominąć niż zostawić stare.

### 6.10. Blog (opcjonalnie)

**Cel:** pokazać sposób myślenia. W researchu pisanie często zastępuje case studies.

**Treść:** trzy ostatnie wpisy z bloga, jeśli dotyczą marketingu, lejka, obsługi zapytań, automatyzacji. Wpisy o stronach internetowych schować albo przepisać.

### 6.11. Pytania i odpowiedzi

**Cel:** odpowiedzieć na wątpliwości przed rozmową.

**Treść (propozycje pytań):**
- Czy pracujesz sam? (tak, czasem z zaufanymi podwykonawcami, np. grafik, montaż, programista)
- Czy pracujesz z agencją, z którą już współpracujemy? (tak, mogę przejąć rolę osoby, która widzi całość)
- Czy robisz strony internetowe? (landingi i strony pod kampanie w ramach współpracy, samych stron nie)
- Ile to kosztuje? (przedziały albo zasada wyceny)
- Jak szybko widać efekty? (pierwsze poprawki w obsłudze i pomiarze w kilka tygodni, kampanie zależnie od branży i sezonu)
- Czy pracujesz zdalnie? (do potwierdzenia: zdalnie w całej Polsce, na miejscu np. na Śląsku)

### 6.12. Kontakt

**Cel:** jeden jasny krok.

**Treść:** jedno zdanie zaproszenia (np. „Opisz krótko, jak dziś pozyskujecie klientów. Odpowiem w ciągu 24 godzin w dni robocze.”), przycisk do kalendarza, mail, telefon, LinkedIn.

**Uwagi:** bez „Zero zobowiązań”, „Gotów na…”. Pasek pod przyciskiem bez kropek środkowych.

### Menu i stopka

- Menu: Współpraca (kotwica albo osobna podstrona), Szkolenia, Blog, O mnie, Kontakt. Bez „Strony internetowe” i „System sprzedażowy”.
- Stopka: jedno zdanie opisu zgodne z nowym pozycjonowaniem, np. „Marketing i sprzedaż w firmach od kilkunastu do kilkudziesięciu osób: reklamy, obsługa zapytań, CRM, mailing, automatyzacje.”
- Podstrony `/strony-www`, `/system-sprzedazowy`, `portfolio-*` do zdjęcia z przekierowaniem 301 na stronę główną albo na stronę współpracy (żeby nie stracić ruchu z wyszukiwarki). To zadanie do etapu kodu, nie tego dokumentu.

## 7. Oferta dla małych firm, dla zespołów w dużych firmach i szkolenia

### Małe firmy (od kilkunastu do kilkudziesięciu osób): główna oferta

Mówić językiem właściciela, nie działu marketingu. Trzy formy z sekcji 6.5 (przegląd, wdrożenie, stałe prowadzenie) w tej kolejności, bo pierwszy krok ma być mały. Na stronie głównej pełna sekcja, a jeśli powstanie podstrona „Współpraca”, tam szczegóły z zakresem i cenami.

Co podkreślać:
- jedna osoba odpowiada za całość i sama wykonuje pracę,
- zaczynamy od tego, co już jest w firmie (konta, arkusze, ludzie), bez budowania wszystkiego od nowa,
- ocena wyników po sprzedaży, rezerwacji albo ofercie, ustalona na początku,
- praca z zespołem klienta: handlowiec, recepcja, właściciel, grafik czy agencja dostają jasne zadania.

### Zespoły w dużych firmach: oferta poboczna

Krótko i konkretnie, żeby nie rozmywać głównego przekazu. Jeden blok na stronie głównej, bez osobnej podstrony na start. Forma: projekt na kilka tygodni z jednym zespołem, nad jedną sprawą. Przykłady tematów: lejek i kampania dla nowego produktu, porządek w obsłudze leadów, raportowanie i pomiar, wdrożenie AI w pracy działu marketingu. CTA to ta sama rozmowa.

### Szkolenia

Zostają na osobnej podstronie, która jest napisana dobrze. Na stronie głównej tylko blok z dwoma zdaniami i linkiem. Warto ujednolicić tematy szkoleń z nową ofertą (marketing liczony do sprzedaży, obsługa zapytań, automatyzacje i AI w pracy zespołu) i usunąć z podstrony wzmianki o stronach, jeśli są.

## 8. Czego unikać

### W treści

- Słów: optymalizacja (najwyżej raz), kompleksowy, holistyczny, skalowanie, growth hacking, synergia, innowacyjny, maszyna do sprzedaży, system, który sprzedaje za Ciebie, przełomowy, ekspert, pasjonat.
- AI w nagłówku i jako główny argument. Przy obecnym odbiorze („robi strony z AI”) AI ma się pojawiać jako narzędzie w konkretnym zdaniu, nigdy jako tożsamość.
- Liczb bez źródła („2–3× lepiej”), liczników nabijanych animacją, wyników klientów.
- Sztucznej rzadkości („tylko 5 klientów miesięcznie”) i presji („Nie czekaj”).
- Konstrukcji „nie X, tylko Y”, „X, a nie Y” w nagłówkach, puent, pytań retorycznych z jednowyrazową odpowiedzią.
- Obietnic, których nie da się sprawdzić („więcej klientów w 30 dni”, „odpowiedź w kilkanaście sekund”).
- Walki z agencjami. Stanisław sam z agencją współpracuje i często pracuje obok agencji klienta.
- Mieszania „Ty” i „Państwo”. Obecna strona jest na „Ty”, to pasuje do właścicieli małych firm. Trzymać jedną formę.
- Angielskich nazw tam, gdzie jest polska: „lead” i „CRM” są w porządku, bo klienci ich używają, ale „fractional CMO”, „growth”, „RevOps”, „full-funnel” lepiej opisać po polsku.

### W układzie (sprawa projektu, ale wpływa na treść)

- Eyebrow nad nagłówkami, numeracja sekcji „01, 02”, kropka środkowa jako separator.
- Nagłówki-etykiety: „Co oferuję”, „Dlaczego ja”, „Konkrety”, „Jak mogę pomóc?”.
- Nagłówki-hasła dzielone na dwie linijki z puentą.
- Pasy przewijających się logotypów i słów.
- Trzy kafelki „problem, rozwiązanie, efekt” w identycznej składni.

## 9. Pytania do Stanisława

1. Który wariant pozycjonowania jest najbliżej tego, jak sam o sobie mówisz? Rekomendacja: B z rolą z A.
2. Od kiedy liczyć lata w marketingu i ile ich jest?
3. Które firmy z dawnej listy (Wagento, BigCommerce, Commerce Hero i inne) to była praca marketingowa, a które strony lub wideo?
4. Jak opisać pracę w Chess.com, jeśli w ogóle? Wystarczy sama nazwa na liście firm, czy w „O mnie” ma paść jedno zdanie o roli?
5. SzczypoMedia będzie na liście firm. Czy uprzedzasz Piotra i czy pytasz go też o zgodę na nazwy klientów agencji (np. Skyforce)?
6. Czy podajesz na stronie przedziały cen?
7. Kogo poprosić o opinię (właściciele Fibry, Widokowni i ICAROS, Bartnicky)?
8. MONLINE: pokazujemy na stronie czy nie?
9. Domena docelowa: drozniak.com czy drozniak.pl?
10. Czy przegląd marketingu ma być płatnym pierwszym krokiem, czy darmową rozmową plus wycena?
11. Zasięg pracy na miejscu: Śląsk, cała Polska, zdalnie?
