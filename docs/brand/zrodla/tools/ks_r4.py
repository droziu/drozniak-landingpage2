"""Księga marki: rozdziały Pismo i Układ."""
from ks_core import *

GL = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPRSŚTUWYZŹŻ<br>aąbcćdeęfghijklłmnńoóprsśtuwyzźż<br>0123456789 „ ” ( ) % zł"

def grid_fig(w, h, m, cols, sc, gut=24, safe=None, note_zone=None, bg=WHITE):
    """Schemat formatu: margines, kolumny, opcjonalnie pole bezpieczne (góra, dół, boki)."""
    mt = mb = ml = mr = m
    if safe: mt, mb, ml = safe; mr = ml
    cw = (w - ml - mr - gut * (cols - 1)) / cols
    rects = "".join(f'<rect x="{ml + i*(cw+gut):.1f}" y="{mt}" width="{cw:.1f}" height="{h-mt-mb}" fill="{GREEN}" opacity=".13"/>' for i in range(cols))
    out = f'<rect width="{w}" height="{h}" fill="{bg}"/>'
    if safe: out += f'<rect width="{w}" height="{mt}" fill="{STONE}"/><rect y="{h-mb}" width="{w}" height="{mb}" fill="{STONE}"/>'
    out += rects + f'<rect x="{ml}" y="{mt}" width="{w-ml-mr}" height="{h-mt-mb}" fill="none" stroke="{GREEN}" stroke-width="{2/sc:.1f}" stroke-dasharray="{8/sc:.0f} {6/sc:.0f}"/>'
    if note_zone:
        x, y, ww, hh = note_zone
        out += f'<rect x="{x}" y="{y}" width="{ww}" height="{hh}" fill="{STONE}" stroke="{ASH}" stroke-width="{1.5/sc:.1f}"/>'
    return f'<svg viewBox="0 0 {w} {h}" width="{w*sc:.0f}" height="{h*sc:.0f}" style="border-radius:6px;box-shadow:0 0 0 1.5px {LINE2}" aria-hidden="true">{out}</svg>'

def build():
    # ============================================================ PISMO
    opener("Pismo")
    page(f'''<div class="grid" style="grid-template-columns:1.25fr 1fr;gap:80px;height:100%">
<div class="spec-l"><p class="spec-big disp">Pozyskuję klientów dla firm</p><p class="spec-gl disp">{GL}</p></div>
<div class="col-t"><h2 class="t">Brygada 1918</h2><p class="lead">Krój nazwiska, nagłówków i dużych liczb. To z niego pochodzi logo.</p>
{notes([("Pochodzenie", "Polski krój z międzywojennej Warszawy. W 2018 roku, na stulecie niepodległości, studio Capitalics odtworzyło go w wersji cyfrowej na podstawie odnalezionych matryc."),
        ("Odmiany", "500 do wielkich nagłówków, 600 do nagłówków, podtytułów i logo. Kursywa 500 tylko do cytatów i tytułów. Odmiana 700 jest tylko w małej wersji znaku."),
        ("Licencja", "SIL Open Font License. Wolno używać w logo, druku, na stronie i w filmie bez opłat. Jest w Google Fonts, Canvie i Google Docs.")])}
<div class="wts"><span class="disp" style="font-weight:500">Drożniak 500</span><span class="disp" style="font-weight:600">Drożniak 600</span><span class="disp" style="font-weight:500;font-style:italic">Kursywa</span></div></div></div>''', title="Brygada 1918")
    page(f'''<div class="grid" style="grid-template-columns:1.25fr 1fr;gap:80px;height:100%">
<div class="spec-l"><p class="spec-big txt" style="font-size:112px;font-weight:500;letter-spacing:-0.03em">Planuję i prowadzę cały marketing firmy</p><p class="spec-gl txt">{GL}</p></div>
<div class="col-t"><h2 class="t">Schibsted Grotesk</h2><p class="lead">Krój tekstu, menu, przycisków, tabel, podpisów i napisów w filmie.</p>
{notes([("Pochodzenie", "Zaprojektowany przez Bakken &amp; Bæck dla norweskiej grupy medialnej Schibsted, z myślą o czytaniu na ekranie."),
        ("Odmiany", "400 do tekstu, 500 do przycisków, menu i małych podpisów, 600 do wyróżnień i nagłówków tabel. Odmiany 800 używamy tylko w miniaturach filmów."),
        ("Cyfry", "W tabelach i przy liczbach w kolumnie włączamy cyfry tabelaryczne, żeby stały równo pod sobą."),
        ("Licencja", "SIL Open Font License, tak jak Brygada. Jest w Google Fonts, Canvie i Google Docs.")])}
<div class="wts"><span class="txt" style="font-weight:400">Tekst 400</span><span class="txt" style="font-weight:500">Przycisk 500</span><span class="txt" style="font-weight:600">Wyróżnienie 600</span></div></div></div>''', title="Schibsted Grotesk")

    samples = [("Wielki nagłówek", "disp", 500, 96, "1,0", "−2%", "Stanisław Drożniak", "Jeden na stronę, slajd albo ekran: imię i nazwisko, tytuł okładki, liczba."),
               ("Nagłówek", "disp", 600, 60, "1,05", "−1,5%", "Pozyskiwanie klientów", "Tytuł sekcji, slajdu, dokumentu, artykułu."),
               ("Podtytuł", "disp", 600, 36, "1,2", "−1%", "Stała współpraca", "Tytuł karty i panelu, wstęp pod nagłówkiem."),
               ("Tekst", "txt", 400, 24, "1,55", "0", "Zapytania trafiają do jednego arkusza i nikt o nich nie zapomina.", "Tekst ciągły, przyciski i menu."),
               ("Mały", "txt", 500, 19, "1,45", "0", "Podpis pod zdjęciem, etykieta pola, stopka", "Podpisy, etykiety, pola formularzy, stopki.")]
    rows = "".join(f'<tr><td style="width:44%"><span class="{c}" style="font-weight:{w};font-size:{sz}px;line-height:1.08;letter-spacing:{"-0.02em" if sz > 50 else "0"}">{ex}</span></td>'
                   f'<td><b>{n}</b><br><span class="muted">{"Brygada 1918" if c == "disp" else "Schibsted Grotesk"} {w}</span></td><td class="num">{lh}</td><td class="num">{tr}</td><td>{use}</td></tr>' for n, c, w, sz, lh, tr, ex, use in samples)
    page(top("Hierarchia", "Pismo ma pięć ról i ani jednej więcej. Duże są wyraźnie duże, małe wyraźnie małe, a między sąsiednimi rolami jest co najmniej półtora raza różnicy.",
        f'''<table class="tb mid sm"><tr><th>Przykład</th><th>Rola i krój</th><th>Interlinia</th><th>Światło</th><th>Do czego</th></tr>{rows}</table>''', cls="tight"), title="Hierarchia")

    trs = "".join("<tr>" + f"<td>{r[0]}</td>" + "".join(f'<td class="num">{v}{" " + r[1] if v[0].isdigit() else ""}</td>' for v in r[2:]) + "</tr>" for r in T.TYPE_SIZES)
    page(top("Rozmiary w formatach", "Role są te same wszędzie, zmienia się rozmiar. Tabela podaje wartości dla formatów, w których marka pojawia się najczęściej.",
        f'''<table class="tb sm"><colgroup><col style="width:25%"><col style="width:15%"><col style="width:15%"><col style="width:15%"><col style="width:15%"><col style="width:15%"></colgroup>
<tr><th>Format</th><th>Wielki nagłówek</th><th>Nagłówek</th><th>Podtytuł</th><th>Tekst</th><th>Mały</th></tr>{trs}</table>
<div class="grid g3" style="margin-top:40px;gap:56px">
<div class="note"><h3>Zakres</h3><p>Mniejsza wartość dotyczy wąskiego ekranu albo długiego tekstu, większa szerokiego ekranu albo krótkiego nagłówka.</p></div>
<div class="note"><h3>Najmniejszy tekst</h3><p>Na grafikach do mediów społecznościowych nic nie jest mniejsze niż 24 px, na slajdzie niż 22 px, w druku niż 8 pt, a w negatywie niż 9 pt.</p></div>
<div class="note"><h3>Inny format</h3><p>Tekst to 1/36 krótszego boku, wielki nagłówek to 1/9. Dla rollupu i plakatu mnożymy rozmiary druku przez odległość czytania w metrach razy 2,5.</p></div>
</div>''', cls="tight"), title="Rozmiary w formatach")

    def rule(h, p, ex=""): return f'<div class="rule"><h3>{h}</h3><p>{p}</p>{f"<p class=ex>{ex}</p>" if ex else ""}</div>'
    page(split("Zasady składu",
        "Zasady, które sprawiają, że długi tekst czyta się bez wysiłku, a krótki wygląda na przemyślany.",
        f'''<div style="margin-top:44px;background:{WHITE};border-radius:16px;padding:36px 40px;box-shadow:inset 0 0 0 1.5px {LINE}">
<p class="disp" style="font-weight:600;font-size:36px;line-height:1.15;letter-spacing:-0.01em">Skąd przychodzą zapytania</p>
<p style="font-size:22px;line-height:1.55;margin-top:14px">Najwięcej zapytań daje wyszukiwarka, ale najlepiej sprzedają się te z&nbsp;poleceń. Zanim zwiększysz budżet, sprawdź, ile zapytań z&nbsp;zeszłego miesiąca dostało odpowiedź tego samego dnia.</p>
<p class="small" style="margin-top:14px">Wiersz ma tu około 55 znaków.</p></div>''',
        f'''<div class="rules c2">
{rule("Długość wiersza", "Od 45 do 75 znaków ze spacjami. Na telefonie od 35. Szerszą kolumnę zwężamy, zamiast zmniejszać pismo.")}
{rule("Wyrównanie", "Do lewej, z nierówną prawą krawędzią. Nie justujemy i nie środkujemy tekstu dłuższego niż trzy wiersze.")}
{rule("Interlinia", "Tekst 1,55, mały 1,45, podtytuł 1,2, nagłówek 1,05, wielki nagłówek 1,0. Im większe pismo, tym ciaśniej.")}
{rule("Światło między literami", "Ujemne tylko w Brygadzie od 36 px w górę. Tekstu i małych podpisów nie rozstrzeliwujemy.")}
{rule("Odstępy", "Akapit od akapitu o wysokość jednego wiersza. Nagłówek stoi dwa razy bliżej swojego tekstu niż poprzedniego.")}
{rule("Wyróżnienia", "Odmiana 600 albo większy rozmiar. Podkreślenie oznacza link. Kursywa tylko w cytacie i tytule.")}
{rule("Nagłówki", "Wielka litera na początku, bez kropki na końcu, najwyżej trzy wiersze. Łamiemy je tak, żeby wiersze miały podobną długość.")}
{rule("Dwie odmiany na powierzchnię", "Na jednej stronie albo slajdzie są najwyżej trzy rozmiary pisma i dwie odmiany każdego kroju.")}
</div>''', cls="n"), title="Zasady składu")

    tbl = table(["Źródło", "Zapytania", "Rozmowy", "Zmiana"], [
        ["Wyszukiwarka", "128", "41", f'<span style="color:{T.GREENS[600]}">+12%</span>'],
        ["Polecenia", "36", "22", f'<span style="color:{T.GREENS[600]}">+4%</span>'],
        ["Media społecznościowe", "1 204", "9", f'<span style="color:{ERR}">−18%</span>'],
        ["Mailing", "58", "17", "0%"]], cls="tb tnum")
    page(split("Liczby i dane",
        "Marka pokazuje dużo liczb: budżety, zapytania, terminy. Liczba ma być łatwa do porównania z sąsiednią i zawsze mieć jednostkę.",
        notes([("Cyfry tabelaryczne", "W tabelach i kolumnach liczb włączamy cyfry o równej szerokości (w CSS font-variant-numeric: tabular-nums). Liczby wyrównujemy do prawej, tekst do lewej."),
               ("Duża liczba", "Brygada 500 w rozmiarze wielkiego nagłówka, pod nią jedno zdanie w rozmiarze tekstu, które mówi, co liczba znaczy i skąd pochodzi."),
               ("Zapis", "Tysiące ze spacją, ułamki z przecinkiem, jednostka po spacji: 12 500 zł, 3,5%, 14 dni. Minus to znak „−”, a nie dywiz.")]),
        f'''<div class="grid" style="gap:36px">
<div class="panel white" style="height:auto;display:block;padding:40px 44px">{tbl}</div>
<div class="grid g2" style="gap:36px">
<div class="panel" style="height:auto;display:block;padding:40px 44px"><p class="disp" style="font-weight:500;font-size:120px;line-height:1;letter-spacing:-0.02em">41</p><p style="margin-top:12px">rozmów z zapytań z wyszukiwarki w kwietniu 2027. Źródło: arkusz zapytań.</p></div>
<div class="panel" style="height:auto;display:block;padding:40px 44px"><p class="disp" style="font-weight:500;font-size:96px;line-height:1.25;letter-spacing:-0.02em;white-space:nowrap">12 500 zł</p><p style="margin-top:12px">budżetu reklam w kwietniu 2027. Źródło: panel reklamowy.</p></div>
</div><p class="small">Liczby na tej stronie są przykładowe.</p></div>'''), title="Liczby i dane")

    page(split("Skład po polsku",
        "Drobne zasady polskiej typografii. Po nich od razu widać, czy tekst złożył ktoś staranny.",
        "",
        f'''<div class="rules c2">
{rule("Cudzysłowy", "„Polskie” u dołu i u góry. Wewnątrz cytatu «francuskie». Nigdy proste &quot;takie&quot;.")}
{rule("Spójniki na końcu wiersza", "Jednoliterowe słowa (a, i, o, u, w, z) nie zostają na końcu wiersza. Wstawiamy po nich twardą spację.")}
{rule("Kreski", "W zdaniach nie używamy myślników ani pauz. Półpauza stoi tylko w zakresach: 9–17, 2026–2027, 2–3 tygodnie.")}
{rule("Liczby i pieniądze", "12 500 zł, 3,5%, 1,5 mln. Waluta po liczbie. Liczby do dziesięciu w zdaniu piszemy słownie.")}
{rule("Daty i godziny", "9 listopada 2026 albo 9.11.2026. Godzina z dwukropkiem: 16:20. Bez „r.” po roku.")}
{rule("Telefon i adresy", f"{T.TELEFON}, w grupach po trzy cyfry. Adres strony bez „www”: {T.STRONA}.")}
{rule("Separatory", "Przecinek, kreska pionowa albo nowy wiersz. Kropki środkowej nie używamy.")}
{rule("Wielkie litery", "Tylko na początku zdania i w nazwach własnych. „Klient”, „Oferta” i „Państwa firma” w środku zdania piszemy małą literą, poza zwrotami grzecznościowymi „Ty” i „Państwo”.")}
</div>''', cls="n"), title="Skład po polsku")

    page(top("Kroje zastępcze i dostępność", "Oba kroje są bezpłatne i dostępne w większości narzędzi. Tam, gdzie nie da się ich wczytać, używamy ustalonych zamienników, a nie przypadkowego kroju z listy.",
        table(["Miejsce", "Nagłówki", "Tekst", "Uwagi"], [
            ["Strona internetowa", "Brygada 1918", "Schibsted Grotesk", "Pliki krojów serwowane ze strony, zamiennik w CSS: Georgia i Arial"],
            ["Canva, Figma, Google Docs i Slides", "Brygada 1918", "Schibsted Grotesk", "Oba kroje są na liście Google Fonts"],
            ["Word, PowerPoint, Keynote, programy do montażu", "Brygada 1918", "Schibsted Grotesk", "Po instalacji plików z folderu zrodla/fonts"],
            ["Mail i newsletter", "Georgia, pogrubiona", "Arial albo Helvetica", "Gmail i Outlook nie wczytują własnych krojów. Kroje marki zobaczy tylko Apple Mail"],
            ["Plik wysyłany do edycji komuś bez krojów", "Georgia", "Arial", "Albo eksport do PDF, w którym kroje są osadzone"],
            ["Kod i wartości techniczne", "nie dotyczy", "krój o stałej szerokości z systemu", "ui-monospace, SF Mono, Menlo, Consolas"],
        ], cls="tb sm", widths=["30%", "17%", "20%", "33%"]) + f'''<pre class="code sm" style="margin-top:30px">--font-naglowki: {T.FONT_DISPLAY};
--font-tekst:    {T.FONT_TEXT};
--font-kod:      {T.FONT_MONO};</pre>''', cls="tight"), title="Kroje zastępcze i dostępność")

    t1 = f'<p class="rel" style="font-family:Arial;font-weight:900;font-size:40px;letter-spacing:-0.02em">Oferta 2027</p>'
    t2 = f'<p class="rel disp" style="font-weight:600;font-size:30px;letter-spacing:0.2em;text-transform:uppercase">Oferta</p>'
    t3 = f'<p class="rel txt" style="font-size:15px;line-height:1.3;text-align:justify;padding:0 26px">Planuję i prowadzę wszystkie części marketingu firmy: reklamy, stronę, obsługę zapytań i automatyzacje. Pracuję głównie z firmami do kilkudziesięciu osób.</p>'
    t4 = f'<p class="rel disp" style="font-weight:600;font-size:17px;line-height:1.35;padding:0 26px">Długi akapit złożony Brygadą zamiast Schibsted Grotesk męczy wzrok już po trzech wierszach tekstu.</p>'
    t5 = f'<p class="rel disp" style="font-weight:600;font-size:36px;text-align:center;line-height:1.1">Plan<br>marketingu<br>na 2027</p>'
    t6 = f'<div class="rel" style="padding:0 26px"><p class="disp" style="font-weight:600;font-size:30px">Budżet</p><p class="disp" style="font-weight:500;font-size:26px">Harmonogram</p><p class="txt" style="font-weight:600;font-size:23px">Zespół</p><p class="txt" style="font-size:20px">Terminy</p><p class="txt" style="font-size:17px">Uwagi</p></div>'
    t7 = f'<p class="rel disp" style="font-weight:600;font-size:38px;transform:scaleX(.7)">Pozyskiwanie</p>'
    t8 = f'<p class="rel txt" style="font-size:22px;font-weight:300;color:{ASH}">Szary, cienki tekst</p>'
    tiles = "".join(tile(i, False, t, "h3") for i, t in [
        (t1, "Inny krój, także „podobny”."), (t2, "Wersaliki i rozstrzelenie."), (t3, "Justowanie i ciasna interlinia."), (t4, "Brygada w długim tekście."),
        (t5, "Środkowanie zamiast lewej krawędzi."), (t6, "Więcej niż trzy rozmiary obok siebie."), (t7, "Ściskanie i rozciąganie liter."), (t8, "Tekst w popiele albo o kontraście poniżej 4,5:1.")])
    page(top("Czego nie robić z pismem", "Dwa kroje i pięć ról wystarczają do wszystkiego. Każdy przykład pokazuje jeden błąd.",
        f'<div class="grid g4" style="gap:34px 28px">{tiles}</div>', cls="tight"), title="Czego nie robić z pismem")

    # ============================================================ UKŁAD
    opener("Układ")
    bars = "".join(f'<div style="display:grid;justify-items:center;gap:10px"><span style="display:block;width:{s}px;height:{s}px;background:{INK}"></span><p class="small tnum">{s}</p></div>' for s in T.SPACE)
    page(split("Skala odstępów",
        "Wszystkie odstępy pochodzą z jednej skali opartej na 8 px. Dzięki temu strona, slajd i grafika mają ten sam rytm, a nikt nie musi dobierać odstępu na oko.",
        notes([("Odstęp w grupie", "Odstęp między grupami jest co najmniej dwa razy większy niż odstęp wewnątrz grupy."),
               ("W druku", "8 px na ekranie odpowiada 2 mm na kartce A4. Skala w milimetrach: 1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48."),
               ("Na innym formacie", "Odstępy rosną razem z pismem. Podstawą jest jedna trzecia rozmiaru tekstu w danym formacie.")]),
        f'''<div style="display:flex;align-items:flex-end;gap:22px;margin-bottom:56px">{bars}</div>
{table(["Odstęp", "Strona", "Slajd i grafika", "Druk A4"], [
    ["Ikona od napisu, kropka od tekstu", "8 px", "12–16 px", "2 mm"],
    ["Nagłówek od swojego tekstu", "16–24 px", "32 px", "4–6 mm"],
    ["Akapit od akapitu", "16 px", "24 px", "4 mm"],
    ["Element od elementu w grupie", "24–32 px", "48 px", "8 mm"],
    ["Grupa od grupy", "48–64 px", "96 px", "12–16 mm"],
    ["Sekcja od sekcji", "128–192 px, telefon 96", "nowy slajd", "nowa strona albo 32 mm"],
], cls="tb sm", widths=["40%", "22%", "19%", "19%"])}'''), title="Skala odstępów")

    def gf(svg, name, text):
        import re
        w = int(re.search(r'width="(\d+)"', svg).group(1))
        return f'<div class="figc" style="flex:none;width:{max(w, 190)}px">{svg}<p><b>{name}</b><br>{text}</p></div>'
    page(top("Marginesy i siatki", "Każdy format ma stały margines i siatkę kolumn. Treść zaczyna się na lewej krawędzi siatki, a nic poza zdjęciem na spad nie wchodzi na margines.",
        f'''<div style="display:flex;gap:30px;align-items:flex-end">
{gf(grid_fig(1440, 900, 40, 12, 0.22), "Strona internetowa", "12 kolumn, odstęp 24 px, treść do 1440 px, margines 16–40 px")}
{gf(grid_fig(1920, 1080, 112, 12, 0.165, 32), "Slajd i film 1920 × 1080", "Margines 112 px, 12 kolumn, odstęp 32 px")}
{gf(grid_fig(210, 297, 20, 6, 0.95, 5), "Dokument A4", "Margines 20 mm, 6 kolumn, odstęp 5 mm")}
{gf(grid_fig(1080, 1350, 80, 6, 0.21), "Post 1080 × 1350", "Margines 80 px, 6 kolumn")}
{gf(grid_fig(1080, 1920, 0, 6, 0.15, safe=(270, 670, 80)), "Relacja i rolka", "Pole bezpieczne: 270 px od góry, 670 od dołu, 80 po bokach")}
{gf(grid_fig(1280, 720, 56, 6, 0.2, note_zone=(1080, 640, 200, 80)), "Miniatura 1280 × 720", "Margines 56 px, prawy dolny róg wolny na znacznik czasu")}
</div>
<div class="grid g3" style="margin-top:40px;gap:56px">
<div class="note"><h3>Margines innego formatu</h3><p>Od 7,5 do 10% krótszego boku. Nigdy mniej niż 5% i nigdy mniej niż pole ochronne logo.</p></div>
<div class="note"><h3>Kolumny</h3><p>Element zajmuje pełne kolumny: 3, 4, 6, 8 albo 12 z 12. Tekst ciągły najwyżej 7 kolumn na stronie i 4 kolumny w dokumencie A4.</p></div>
<div class="note"><h3>Pole bezpieczne</h3><p>W relacjach i rolkach serwis zasłania górę i dół kadru swoimi przyciskami. Tekst i logo stoją tylko w polu bezpiecznym.</p></div>
</div>''', cls="tight"), title="Marginesy i siatki")

    def comp(inner, bg=WHITE): return f'<div style="position:relative;height:250px;background:{bg};border-radius:12px;overflow:hidden;box-shadow:inset 0 0 0 1.5px {LINE}">{inner}</div>'
    bar_ = lambda x, y, w, h, c=LINE2: f'<div style="position:absolute;left:{x}px;top:{y}px;width:{w}px;height:{h}px;background:{c};border-radius:3px"></div>'
    c1 = comp(bar_(32, 36, 250, 46, INK) + bar_(32, 96, 180, 46, INK) + bar_(32, 168, 200, 10) + bar_(32, 188, 160, 10))
    c2 = comp(f'<div style="position:absolute;left:32px;top:0;bottom:0;border-left:2px dashed {GREEN}"></div>' + bar_(32, 34, 90, 16, INK) + bar_(32, 84, 240, 30, INK) + bar_(32, 132, 210, 10) + bar_(32, 152, 180, 10) + bar_(32, 194, 110, 26, INK))
    c3 = comp(f'<div style="position:absolute;right:0;top:0;bottom:0;width:44%;background:repeating-linear-gradient(-45deg,{STONE},{STONE} 8px,{WHITE} 8px,{WHITE} 16px)"></div>' + bar_(32, 60, 170, 34, INK) + bar_(32, 110, 150, 10) + bar_(32, 130, 120, 10))
    c4 = comp(bar_(32, 34, 70, 14, PAPER) + bar_(32, 96, 230, 34, PAPER) + bar_(32, 142, 170, 34, PAPER) + f'<div style="position:absolute;left:32px;top:200px"><span class="btn inv" style="font-size:13px"><i></i>Umów rozmowę</span></div>', DEEP)
    pr = lambda fig, h, p: f'<div>{fig}<h3 class="disp" style="font-weight:600;font-size:32px;margin:22px 0 8px">{h}</h3><p style="font-size:21px;line-height:1.5">{p}</p></div>'
    page(top("Zasady kompozycji", "Cztery zasady, według których układamy każdą powierzchnię: stronę, slajd, grafikę i kadr filmu.",
        f'''<div class="grid g4" style="gap:32px">
{pr(c1, "Jedna rzecz dominuje", "Nagłówek, zdjęcie albo liczba. Największy element jest co najmniej trzy razy większy od następnego.")}
{pr(c2, "Jedna lewa krawędź", "Logo, nagłówek, tekst i przycisk zaczynają się na tej samej pionowej linii. Do lewej, nie do środka.")}
{pr(c3, "Dużo wolnego miejsca", "Na okładkach, slajdach i grafikach około 40% powierzchni zostaje puste. Pustego miejsca niczym nie wypełniamy.")}
{pr(c4, "Stała kolejność", "Od góry: logo albo linia z kropką, przekaz, działanie. Wezwanie do działania jest ostatnie i jedno.")}
</div>''', cls="tight"), title="Zasady kompozycji")

    rr = lambda r, name, use: f'<div class="figc"><div style="height:150px;background:{STONE};border-radius:{r}px"></div><p><b>{name}</b><br>{use}</p></div>'
    page(split("Kształty, linie i cienie",
        "Marka jest płaska i spokojna. Kształty mają dwa promienie zaokrąglenia, linie jedną grubość, a cieni nie ma wcale.",
        notes([("Koło", "Koło jest zarezerwowane dla kropki i dla awatara. Zdjęć, ikon i przycisków z ikoną nie zamykamy w kołach."),
               ("Linie", "1,5 px w kolorze linii do podziałów i obrysów pól. 2 px w atramencie do obrysu fokusu i podkreślenia linku. Bez linii przerywanych i podwójnych."),
               ("Cienie i efekty", "Brak. Warstwy odróżnia kolor tła: papier, kamień, biel. Bez cieni, poświat, rozmycia tła i gradientów.")]),
        f'''<div class="grid" style="gap:44px">
<div class="grid g4" style="gap:28px">{rr(0, "0 px", "Druk, zdjęcia na spad, plansze filmu")}{rr(8, "8 px", "Pola formularzy, etykiety, małe zdjęcia")}{rr(16, "16 px", "Karty, panele, zdjęcia na stronie")}{rr(75, "Pełny", "Przyciski i znaczniki")}</div>
<div class="row" style="gap:28px;align-items:center"><span class="btn" style="font-size:24px"><i></i>Umów rozmowę</span><span class="btn sec" style="font-size:24px">Zobacz ofertę</span>
<span style="font-size:24px;border-bottom:2px solid {INK};padding-bottom:2px">Link w tekście</span>
<span style="font-size:22px;padding:14px 20px;border-radius:8px;background:{WHITE};box-shadow:inset 0 0 0 1.5px {LINE2};min-width:260px;color:{MUTED}">Pole formularza</span></div>
{table(["Element", "Promień", "Linia"], [["Przycisk", "pełny", "brak, drugi przycisk ma obrys 1,5 px w atramencie"], ["Karta, panel, zdjęcie", "16 px", "brak albo 1,5 px w kolorze linii"], ["Pole formularza, etykieta", "8 px", "1,5 px w kolorze linii mocnej"], ["Tabela", "0", "tylko linie poziome, 1,5 px"]], cls="tb sm", widths=["34%", "18%", "48%"])}
</div>'''), title="Kształty, linie i cienie")

    def slide(cramped):
        if cramped:
            chips = "".join(f'<span style="font-size:20px;background:{STONE};padding:10px 18px;border-radius:8px">{t}</span>' for t in ["Reklamy", "Strona", "Zapytania", "Automatyzacje", "Mailing", "Raporty"])
            boxes = "".join(f'<div style="width:350px;height:190px;background:{STONE};border-radius:12px"></div>' for _ in range(3))
            inner = (abs_(40, 34, word(w=120)) + abs_(40, 90, txt("Pozyskiwanie klientów dla firm", 44, 600, font="disp")) +
                     abs_(40, 156, '<div style="width:1120px;font-size:22px;line-height:1.35">Planuję i prowadzę wszystkie części marketingu: reklamy, stronę, obsługę zapytań i automatyzacje. Pracowałem już m.in. z firmami z branży usługowej, turystycznej i sprzedaży internetowej. Każdy etap da się sprawdzić, a klient wie, co działa i ile kosztuje.</div>') +
                     abs_(40, 290, f'<div style="display:flex;gap:14px">{chips}</div>') + abs_(40, 370, f'<div style="display:flex;gap:24px">{boxes}</div>') +
                     abs_(40, 590, '<span class="btn" style="font-size:22px"><i></i>Umów rozmowę</span>') + abs_(300, 596, txt("albo napisz: " + T.MAIL, 22)))
        else:
            inner = (abs_(112, 112, tor(240, 8, [0, 1], 1)) + abs_(112, 230, txt("Pozyskiwanie klientów<br>dla firm", 104, 500, font="disp", lh=1.02, extra="letter-spacing:-0.02em")) +
                     abs_(112, 478, txt("Planuję i prowadzę wszystkie części marketingu firmy.", 28)))
        return mock(1200, 675, 0.66, inner, bg=WHITE)
    page(top("Układ ciasny i układ dobry", "Ta sama treść dwa razy. Po lewej siedem elementów ma tę samą wagę i żaden się nie wyróżnia. Po prawej zostaje jedna myśl, a reszta trafia na kolejne slajdy.",
        f'''<div class="grid g2" style="gap:56px">
<div class="figc">{slide(True)}<p><span class="nie">Nie.</span> Margines 3%, siedem elementów tej samej wagi, tekst na całą szerokość, dwa wezwania do działania.</p></div>
<div class="figc">{slide(False)}<p><span class="tak">Tak.</span> Margines 9%, jeden nagłówek, jedno zdanie, ponad połowa slajdu pusta. Przycisk jest na ostatnim slajdzie.</p></div>
</div>''', cls="tight"), title="Układ ciasny i układ dobry")
