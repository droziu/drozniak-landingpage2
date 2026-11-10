"""Księga marki: okładka, wstęp, rozdziały Marka i Głos."""
from ks_core import *

def build():
    # ------------------------------------------------------------ okładka i spis
    page(f'''<div class="cover-word">{word(ink=PAPER)}</div>
<div class="cover-foot"><p class="cover-title">Księga marki</p><p class="cover-meta">Wersja {T.WERSJA}<br>{T.DATA}</p></div>''', cls="deep", footer=False)
    page("<!--toc-->")

    page(split("Jak korzystać z księgi",
        "Księga opisuje, jak marka Drożniak wygląda, brzmi i zachowuje się w każdym miejscu, od wizytówki po film. Jest dla Stanisława i dla każdego, kto przygotowuje dla marki materiały: grafika, montażysty, programisty, drukarni.",
        notes([("Gdy księga nie odpowiada na pytanie", f"Decyduje Stanisław: {T.MAIL}. Rozstrzygnięcie trafia do następnej wersji księgi, żeby drugi raz nie trzeba było pytać."),
               ("Pliki", "Logo, kroje, tokeny kolorów i szablony leżą w repozytorium strony, w folderze docs/brand. Lista jest w ostatnim rozdziale.")]),
        f'''<div class="grid g3" style="height:100%">
<div class="card"><h3>Zawsze</h3><p style="margin-top:20px">Zasady stałe: logo, pole ochronne, kolory, kroje, zapis nazwy. Odejście od nich wymaga zmiany księgi, a nie decyzji przy jednym projekcie.</p><div class="is" style="grid-template-columns:1fr"><div><h4>Jak je poznać</h4><p>Słowa „zawsze”, „tylko”, „nigdy” i wszystkie strony o logo i kolorze.</p></div></div></div>
<div class="card"><h3>Zwykle</h3><p style="margin-top:20px">Ustawienia domyślne: rozmiar pisma w poście, położenie znaku na filmie, szerokość marginesu. Można od nich odejść, gdy format tego wymaga.</p><div class="is" style="grid-template-columns:1fr"><div><h4>Warunek</h4><p>Trzeba umieć powiedzieć, dlaczego w tym miejscu zasada nie pasuje.</p></div></div></div>
<div class="card"><h3>Nigdy</h3><p style="margin-top:20px">Błędy pokazane na stronach „Czego nie robić”. Każdy przykład pokazuje jeden błąd i mówi, czym go zastąpić.</p><div class="is" style="grid-template-columns:1fr"><div><h4>Wyjątki</h4><p>Nie ma. Jeśli coś wygląda na wyjątek, pytamy przed publikacją.</p></div></div></div>
</div>'''))

    rules = ["Logo to napis „Drożniak”. Znak D z kropką zastępuje go tam, gdzie napis się nie mieści. Nie stoją obok siebie.",
             "Logo bierzemy z pliku. Nie składamy go z klawiatury i nie przerabiamy.",
             "Wokół napisu zostaje wolne pole 3K, wokół znaku 1K. K to średnica kropki w logo.",
             "Tłem jest papier. Głęboka zieleń pojawia się raz na stronę, slajd albo ekran.",
             "Zieleń sygnałowa to kropka. Jedna na kompozycję, nigdy tekst ani tło.",
             "Nagłówki składamy Brygadą 1918, tekst Schibsted Grotesk. Trzeciego kroju nie ma.",
             "Na każdej powierzchni dominuje jedna rzecz, a około 40% zostaje puste.",
             "Schematy budujemy z linii i kropki, bez strzałek, cieni i gradientów.",
             "Piszemy wprost i w pierwszej osobie, bez haseł reklamowych, wykrzykników i obietnic, których nie da się sprawdzić.",
             "Zdjęcia są prawdziwe, w naturalnych kolorach, bez filtrów i barwienia."]
    half = lambda xs, start: f'<ol class="numlist" style="counter-reset:n {start}">' + "".join(f"<li><span>{r}</span></li>" for r in xs) + "</ol>"
    page(top("Skrót zasad", "Dziesięć zasad, które rozstrzygają większość wątpliwości. Każda ma w księdze własną stronę ze szczegółami.",
             f'<div class="grid g2" style="gap:0 80px">{half(rules[:5], 0)}{half(rules[5:], 5)}</div>'))

    # ------------------------------------------------------------ 1. Marka
    opener("Marka")
    page(f'''<div class="say-wrap"><p class="say-big">Drożniak to marka Stanisława Drożniaka. Stanisław planuje i prowadzi marketing firm jako całość.</p>
<div class="say-under">
<div><h3>Co robi</h3><p>Reklamy, strona, obsługa zapytań, automatyzacje, mailing i sprzedaż do klientów, którzy już raz kupili. Do tego usprawnianie pracy firmy z pomocą AI.</p></div>
<div><h3>Dla kogo</h3><p>Dla właścicieli firm, które chcą mieć jedną osobę od całego marketingu. Najczęściej są to firmy do kilkudziesięciu osób. Większym Stanisław pomaga jako wsparcie zespołu albo szkoleniem.</p></div>
<div><h3>Obietnica</h3><p>Zapytanie z reklamy trafia do właściwej osoby, dostaje odpowiedź i jest prowadzone aż do sprzedaży.</p></div>
</div></div>''', title="Kim jest Drożniak")

    idea = f'''<div style="display:grid;gap:72px">
<svg viewBox="0 0 1000 150" style="width:100%;height:auto" aria-hidden="true"><rect x="0" y="62" width="800" height="26" fill="{INK}"/><circle cx="905" cy="75" r="39" fill="{GREEN}"/></svg>
<div class="grid g3">
{cap_tile(word(w=250), "Kropka nad Ż w napisie", "h2", STONE, "box-shadow:none")}
{cap_tile(sym(h=96), "Kropka wychodząca z litery D", "h2", STONE, "box-shadow:none")}
{cap_tile(tor(300, 7, [0, .33, .66, 1], 2), "Kropka na drodze klienta", "h2", STONE, "box-shadow:none")}
</div></div>'''
    page(split("Skąd nazwa i znak",
        "„Drożny” znaczy przejezdny, bez zatorów. Mówi się o drożnej drodze albo drożnym przewodzie. Nazwisko mówi to samo co praca Stanisława: droga od reklamy do sprzedaży jest wolna.",
        notes([("Linia", "Droga, proces, kolejne kroki. W jednym rysunku ma zawsze jedną grubość."),
               ("Kropka", "Klient, zapytanie, cel. Pochodzi znad litery Ż w nazwisku i jest jedynym miejscem, w którym pojawia się kolor marki."),
               ("Co z tego wynika", "Wszystko, co marka rysuje, składa się z tych dwóch elementów: logo, schematy, animacje, znaczniki na liście.")]),
        idea), title="Skąd nazwa i znak")

    def trait(name, what, how, notit):
        return (f'<div class="card"><h3>{name}</h3><p style="margin-top:14px;font-size:24px">{what}</p>'
                f'<div class="is"><div><h4>W praktyce</h4><p>{how}</p></div><div><h4>Nie mylić z</h4><p>{notit}</p></div></div></div>')
    page(split("Osobowość marki",
        "Cztery cechy, po których poznajemy, czy tekst, grafika albo film są w stylu marki. Gdy materiał łamie którąś z nich, wraca do poprawki.",
        notes([("Jak sprawdzać", "Do gotowego materiału zadajemy cztery pytania: czy jest w nim konkret, czy nie krzyczy, czy każdą liczbę da się sprawdzić i czy zrozumie go ktoś spoza marketingu.")]),
        f'''<div class="cards4">
{trait("Konkretna", "Mówi, co zrobi, po co i w jakim czasie.", "Liczba, termin albo przykład w każdym akapicie.", "Suchą listą faktów bez wniosku.")}
{trait("Spokojna", "Nie używa wykrzykników, presji ani odliczania czasu. Pewność bierze się z doświadczenia.", "Jedno wezwanie do działania i dużo wolnego miejsca.", "Brakiem zdania. Marka ma opinię i ją podaje.")}
{trait("Rzetelna", "Każdy etap pracy da się sprawdzić. Klient wie, co działa i ile kosztuje.", "Źródło przy każdej liczbie. Nazwy klientów tylko za ich zgodą.", "Asekuracją i zastrzeżeniem w co drugim zdaniu.")}
{trait("Prosta", "Pisze tak, żeby zrozumiał każdy właściciel firmy, także bez znajomości fachowych pojęć.", "Przykład z branży klienta zamiast skrótu.", "Infantylnym tonem i emotkami.")}
</div>''', cls="n"), title="Osobowość marki")

    page(split("Do kogo mówi marka",
        "Odbiorcą jest właściciel albo osoba zarządzająca firmą do kilkudziesięciu osób. Zna swoją branżę lepiej niż marketing i decyduje sam.",
        notes([("Drugi odbiorca", "Zespół marketingu większej firmy, któremu Stanisław pomaga albo którego szkoli. Do niego wolno pisać fachowo, ale wygląd marki zostaje ten sam."),
               ("Czego nie zakładamy", "Że odbiorca zna skróty, ma czas na długi tekst albo ogląda materiał na dużym ekranie.")]),
        table(["Co wiemy o odbiorcy", "Co z tego wynika dla materiałów"], [
            ["Czyta w telefonie, między innymi sprawami", "Tekst na stronie ma co najmniej 17 px, na grafice do mediów społecznościowych co najmniej 30 px. Jedna myśl na ekran."],
            ["Nie zna fachowych pojęć", "Pojęcie tłumaczymy przy pierwszym użyciu albo zastępujemy przykładem z jego branży."],
            ["Chce wiedzieć, co się dzieje z zapytaniami", "Schemat z linii i kropki pokazuje drogę zapytania. Liczby mają źródło i datę."],
            ["Szuka jednej osoby, a nie agencji", "Marka mówi w pierwszej osobie i pokazuje twarz. Zdjęcie Stanisława jest częścią identyfikacji."],
            ["Słyszał już wiele obietnic", "Bez superlatywów i wykrzykników. Zamiast obietnicy jest opis, co i kiedy zostanie zrobione."],
        ], widths=["40%", "60%"])), title="Do kogo mówi marka")

    page(top("Co marka mówi o sobie", "Te same zdania wracają na stronie, w profilach, w ofertach i na początku filmów. Kto pisze o marce, zaczyna od nich, a nie od własnej wersji.",
        table(["", "Treść", "Gdzie"], [
            ["W jednym zdaniu", "„Planuję i prowadzę wszystkie części marketingu firmy.”", "Nagłówek strony, opis profilu, pierwsze zdanie filmu"],
            ["Dopisek pod nazwiskiem", f"„{T.DOPISEK}”", "Pod napisem, na wizytówce, w podpisie maila"],
            ["W trzech zdaniach", "„Planuję i prowadzę wszystkie części marketingu firmy: reklamy, stronę, obsługę zapytań i automatyzacje. Pracuję głównie z firmami do kilkudziesięciu osób. Większym pomagam jako wsparcie zespołu albo szkoleniem.”", "Sekcja „O mnie”, opis prelegenta, notka w ofercie"],
            ["Dowody", "„Pracowałem już m.in. z Grupą Fibra, ICAROS, Bartnicky i Chess.com.” „W Grupie Fibra pełnię funkcję Head of Marketing.” „Łącznie ponad 100 klientów.”", "Pod opisem, nigdy zamiast niego"],
            ["Czego nie mówimy", "Wyników klienta bez jego zgody. „Obecnie m.in.” przed listą klientów. Nazw firm obsługiwanych pod cudzą marką. „Dyrektor marketingu”. „Najlepszy”, „numer 1”, „gwarantuję”.", "Nigdzie"],
        ], widths=["17%", "55%", "28%"])), title="Co marka mówi o sobie")

    page(split("Nazwa w tekście",
        "Nazwisko jest nazwą marki, więc zapisujemy je zawsze tak samo. W tekstach marka mówi w pierwszej osobie, a nazwy „Drożniak” jako podmiotu używa tylko ktoś, kto pisze o Stanisławie.",
        notes([("Po angielsku", "Nazwisko zostaje z „ż”: Stanisław Drożniak. Gdy system nie przyjmuje polskich znaków, piszemy „drozniak”."),
               ("Adresy", f"Strona: {T.STRONA}. Poczta: {T.MAIL}. W druku bez „www” i bez „https://”.")]),
        f'''<div class="pair">
<div class="hd">Tak</div><div class="hd">Nie</div>
<div>Drożniak</div><div class="no">DROŻNIAK, drożniak, Drozniak</div>
<div>Stanisław Drożniak</div><div class="no">S. Drożniak, D. Drożniak, Staszek Drożniak</div>
<div>marka Drożniak, w ofercie Drożniaka, rozmowa z Drożniakiem</div><div class="no">Drożniak Marketing, Agencja Drożniak, Drożniak Studio</div>
<div>{T.STRONA}</div><div class="no">www.drozniak.pl, Drozniak.pl, https://drozniak.pl/</div>
<div>drozniak w nazwach plików, profili i adresów</div><div class="no">drożniak w adresie strony albo nazwie pliku</div>
<div>„Planuję i prowadzę…”</div><div class="no">„Drożniak planuje i prowadzi…” w tekstach własnych</div>
</div>''', cls="n"), title="Nazwa w tekście")

    # ------------------------------------------------------------ 2. Głos
    opener("Głos")
    def princ(n, name, what, yes, no):
        return (f'<div class="card white" style="padding:28px 30px 26px"><h3 style="font-size:30px">{n}. {name}</h3><p style="margin-top:10px;font-size:20px;line-height:1.45">{what}</p>'
                f'<div class="is" style="grid-template-columns:1fr;gap:8px;padding-top:14px"><p style="font-size:19.5px;line-height:1.4"><span class="tak">Tak.</span> {yes}</p><p class="muted" style="font-size:19.5px;line-height:1.4"><span class="nie">Nie.</span> {no}</p></div></div>')
    page(top("Zasady pisania", "Głos marki się nie zmienia. Te pięć zasad obowiązuje na stronie, w reklamie, w mailu i przed kamerą.",
        f'''<div class="grid g3" style="height:100%;grid-auto-rows:1fr;gap:24px">
{princ(1, "Najpierw konkret", "Zdanie zaczyna się od faktu, liczby albo sytuacji klienta.", "„Zapytania trafiają do jednego arkusza i nikt o nich nie zapomina.”", "„Zero chaosu w leadach!”")}
{princ(2, "Wprost, bez haseł", "Opisujemy to, co się dzieje, tak jak powiedziałby to klient. Bez metafor, gry słów i sloganów.", "„Reklama jest uruchomiona, ale nikt się nie odzywa?”", "„Reklama działa, a telefon milczy?”")}
{princ(3, "Zwykłe słowa", "Fachowe pojęcie tłumaczymy przy pierwszym użyciu albo zastępujemy przykładem.", "„Hotel sprzedaje vouchery na miesiące, w których ma wolne pokoje.”", "„Optymalizujemy LTV i CPL w modelu full-funnel.”")}
{princ(4, "Pierwsza osoba", "„Planuję”, „prowadzę”, „sprawdzam”. „My” piszemy tylko o wspólnej pracy z klientem.", "„Planuję i prowadzę wszystkie części marketingu firmy.”", "„Kompleksowe, holistyczne wsparcie marketingowe.”")}
{princ(5, "Tyle, ile da się sprawdzić", "Bez obietnic wyniku, superlatywów i wykrzykników.", "„Pracowałem już m.in. z Grupą Fibra i Chess.com.”", "„Zaufały nam setki zadowolonych klientów.”")}
<div class="card" style="padding:28px 30px 26px"><h3 style="font-size:30px">Jak sprawdzić zdanie</h3><p style="margin-top:10px;font-size:20px;line-height:1.45">Dwa pytania do każdego nagłówka i każdej reklamy.</p>
<div class="is" style="grid-template-columns:1fr;gap:8px;padding-top:14px"><p style="font-size:19.5px;line-height:1.4">Czy to zdanie mogłoby stać na banerze dowolnej agencji?</p><p style="font-size:19.5px;line-height:1.4">Czy klient powiedziałby tak przez telefon?</p><p class="muted" style="font-size:19.5px;line-height:1.4">Jeśli pierwsza odpowiedź brzmi „tak” albo druga „nie”, zdanie przepisujemy.</p></div></div>
</div>''', cls="tight"), title="Zasady pisania")

    def scale_row(left, right, pos, note):
        return (f'<div style="display:grid;grid-template-columns:150px 330px 1fr;gap:24px;align-items:center;padding:18px 0;border-top:1.5px solid var(--line2)">'
                f'<span style="font-size:21px;font-weight:600">{left}</span>'
                f'<div>{tor(330, 5, [0, pos, 1], 1, ink=INK, green=INK)}<p class="small" style="margin-top:2px;font-size:17px">{note}</p></div>'
                f'<span style="font-size:21px;font-weight:600">{right}</span></div>')
    page(split("Ton w różnych miejscach",
        "Zmienia się ton, czyli to, jak blisko i jak krótko mówimy. Na czterech skalach marka stoi zawsze po tej samej stronie, a miejsce przesuwa ją najwyżej o krok.",
        f'''<div style="margin-top:44px">
{scale_row("Oficjalny", "Swobodny", .62, "„Cześć” i „Dzień dobry”, bez „Szanowni Państwo”.")}
{scale_row("Poważny", "Żartobliwy", .25, "Żart tylko wtedy, gdy czegoś uczy.")}
{scale_row("Z dystansem", "Blisko", .7, "Jak do jednej osoby przy stole.")}
{scale_row("Rzeczowy", "Entuzjastyczny", .15, "Fakty zamiast przymiotników.")}
</div>''',
        table(["Miejsce", "Zwrot do odbiorcy", "Długość", "Na co uważać"], [
            ["Strona i landing page", "Bez zwrotu albo „Ty”", "Nagłówek do 8 słów, akapit do 3 zdań", "Jedno wezwanie do działania na ekran"],
            ["Reklama", "„Ty” albo pytanie", "Nagłówek do 10 słów, tekst do 2 zdań", "Bez haseł, obietnicy wyniku i presji czasu"],
            ["Post", "Bez zwrotu", "Akapity po 2–4 zdania", "Nie łamiemy każdego zdania enterem"],
            ["Mail i wiadomość", "„Cześć” albo „Dzień dobry”, bez imienia", "Do 120 słów", "Na końcu jedna konkretna prośba i termin"],
            ["Oferta i raport", "„Państwo” albo forma bezosobowa", "Ile trzeba", "Nagłówki nazywają temat: „Budżet”, „Harmonogram”"],
            ["Film", "„Ty”", "Zdanie do 15 słów", "Jedna myśl na ujęcie, liczby także na ekranie"],
        ], cls="tb sm", widths=["21%", "25%", "24%", "30%"]), cls="w", fcls="top-a"), title="Ton w różnych miejscach")

    page(top("Słownik", "Po lewej słowa, którymi marka mówi na co dzień. Po prawej te, których szukamy w tekście przed publikacją i zamieniamy.",
        f'''<div class="grid g2" style="gap:0 88px">
<div>{table(["Piszemy", "Zamiast"], [
    ["zapytanie", "lead (dopuszczalne w rozmowie z marketerem)"],
    ["klient, który już kupił", "baza, LTV, retencja"],
    ["reklamy", "paid media, kampanie performance"],
    ["sprawdzam, liczę, poprawiam", "optymalizuję, analizuję, skaluję"],
    ["sprzedaż, zapytanie, rozmowa", "konwersja bez wyjaśnienia, czym jest"],
    ["droga od reklamy do sprzedaży", "lejek bez wyjaśnienia, pełny funnel"],
    ["pomagam, prowadzę", "wspieram, dostarczam wartość"],
], cls="tb plain sm")}</div>
<div>{table(["Nie piszemy", "Dlaczego"], [
    ["„telefon milczy”, „zapytania giną”, „od chaosu do systemu”", "Hasło zamiast opisu tego, co się dzieje"],
    ["kompleksowy, holistyczny, innowacyjny, unikalny", "Przymiotnik zastępuje fakt"],
    ["kluczowy, niezwykle, absolutnie", "Wzmacniacz bez treści"],
    ["„W dzisiejszych czasach”, „Warto zauważyć”, „Co więcej”", "Wstęp zamiast zdania"],
    ["wykrzykniki, emotki jako punktory, strzałki przed linkiem", "Krzyk i ozdoba"],
    ["gwarantuję, najlepszy, numer 1", "Nie da się sprawdzić"],
    ["kropka środkowa jako separator, pauza w środku zdania", "Znak szablonu, a nie pisma"],
    ["„Drogi Kliencie”, „Szanowny Panie Romanie”", "Powitanie jest bez imienia"],
], cls="tb plain sm")}</div></div>'''), title="Słownik")

    page(split("Stałe formuły",
        "Kilka zwrotów ma jedną, ustaloną postać. Dzięki temu przycisk na stronie, koniec filmu i podpis maila brzmią tak samo.",
        notes([("Liczby i daty", "12 500 zł, 3,5%, 9 listopada 2026 albo 9.11.2026, +48 792 491 196. Szczegóły są w rozdziale o piśmie."),
               ("Przed publikacją", "Tekst sprawdzamy zasadami skilla humanizer-pl. Nie zmienia treści, tylko usuwa szablonowe zwroty.")]),
        table(["Sytuacja", "Formuła", "Uwagi"], [
            ["Główny przycisk", "„Umów rozmowę”", "Jeden na ekran. Nie „Kontakt”, nie „Dowiedz się więcej”."],
            ["Drugi przycisk", "„Zobacz ofertę”, „Zobacz szkolenia”", "Czasownik i to, co jest po kliknięciu."],
            ["Powitanie w mailu i wiadomości", "„Cześć” albo „Dzień dobry”", "Zawsze bez imienia."],
            ["Zakończenie maila", "Jedna prośba z terminem", "Nie „pozostaję do dyspozycji”."],
            ["Podpis", "„Stanisław Drożniak”", "Pod spodem dopisek, telefon i adres strony."],
            ["Lista klientów", "„Pracowałem już m.in. z…”", "Nigdy „Obecnie m.in.”."],
            ["Rola w Grupie Fibra", "„pełnię funkcję Head of Marketing”", "Nie „dyrektor marketingu”."],
            ["Koniec filmu", f"„Umów rozmowę na {T.STRONA}”", "Mówione i na planszy końcowej."],
        ], widths=["30%", "33%", "37%"]), cls="n", fcls="top-a"), title="Stałe formuły")

    def ba(where, before, after):
        return (f'<div style="display:grid;grid-template-columns:200px 1fr 1fr;gap:40px;padding:26px 0;border-top:1.5px solid var(--line2)">'
                f'<h3 style="font-size:23px;font-weight:600">{where}</h3><p class="muted" style="font-size:24px">{before}</p><p style="font-size:24px">{after}</p></div>')
    page(top("Przykłady przed i po", "Trzy teksty przepisane według zasad. Treść zostaje ta sama, znikają hasła, przymiotniki, wykrzykniki i zdania o niczym.",
        f'''<div style="display:grid;grid-template-columns:200px 1fr 1fr;gap:40px;padding-bottom:14px"><span></span><span class="disp" style="font-weight:600;font-size:32px">Przed</span><span class="disp" style="font-weight:600;font-size:32px">Po</span></div>
{ba("Nagłówek reklamy", "„Skaluj sprzedaż z ekspertem od performance! Sprawdź, jak możemy pomóc Twojej firmie!”", "„Reklama jest uruchomiona, ale nikt się nie odzywa? Sprawdzę, co się dzieje z zapytaniami po kliknięciu w reklamę.”")}
{ba("Początek posta", "„W dzisiejszych czasach marketing to nie tylko reklamy. To cały ekosystem, w którym kluczową rolę odgrywa spójność.”", "„Zanim zwiększysz budżet na reklamy, policz, ile zapytań z zeszłego miesiąca dostało odpowiedź tego samego dnia.”")}
{ba("Mail z ofertą", "„Szanowny Panie Romanie, z ogromną radością przesyłam kompleksową ofertę współpracy. Pozostaję do dyspozycji w razie pytań.”", "„Dzień dobry, przesyłam ofertę. Najważniejsze są dwie rzeczy: budżet na pierwszy miesiąc (strona 2) i termin startu (strona 4). Proszę o odpowiedź do piątku.”")}
'''), title="Przykłady przed i po")
