"""Księga marki: rozdział Kolor."""
from ks_core import *
import kolor as C

def cr(a, b): return f"{C.contrast(a, b):.1f}".replace(".", ",") + ":1"
def rgb(h): return " ".join(str(v) for v in C.hex2rgb(h))
def on(bg): return INK if C.lum(bg) > 0.35 else PAPER

def chip(name, hx, role, h=300, extra="", light=None):
    col = on(hx)
    hs = "" if h == "auto" else f"height:{h}px;"
    return (f'<div class="sw-chip" style="background:{hx};{hs}color:{col}">{extra}<span class="n">{name}</span>'
            f'<span class="r">{role}</span><span class="r tnum" style="opacity:1;margin-top:10px;font-weight:600">{hx}</span></div>')

def mini(bg, inner, w=440, h=248):
    return f'<div style="position:relative;width:{w}px;height:{h}px;background:{bg};border-radius:12px;overflow:hidden;box-shadow:inset 0 0 0 1.5px {LINE}">{inner}</div>'

def build():
    opener("Kolor")

    # ------------------------------------------------------------ paleta
    split_dot = (f'<div style="position:absolute;right:26px;top:26px;display:flex;gap:14px;align-items:center">'
                 f'{dot(44, GREEN)}</div>')
    page(top("Paleta podstawowa", "Marka ma dwa tła, dwa kolory tekstu i jedną zieleń, która występuje jako kropka. Każdy kolor ma jedną rolę.",
        f'''<div class="grid" style="grid-template-columns:1.25fr 1fr 1fr 1.25fr 1fr;gap:24px;height:100%">
<div style="display:grid;grid-template-rows:1.6fr 1fr;gap:24px">{chip("Papier", PAPER, "Tło. Większość każdej powierzchni.", "auto")}{chip("Kamień", STONE, "Druga powierzchnia, jeden krok od papieru.", "auto")}</div>
{chip("Atrament", INK, "Tekst, logo, przyciski.", "auto")}
{chip("Grafit", MUTED, "Tekst pomocniczy i podpisy.", "auto")}
{chip("Głęboka zieleń", DEEP, "Ciemna płaszczyzna: okładki, plansze, stopka, tło grafik w mediach społecznościowych.", "auto")}
<div style="display:grid;grid-template-rows:1fr 1fr;gap:24px">{chip("Zieleń sygnałowa", GREEN, "Kropka na jasnym tle.", "auto")}{chip("Zieleń sygnałowa jasna", GREEN_L, "Kropka na ciemnym tle.", "auto")}</div>
</div>''', cls="tight"), title="Paleta podstawowa")

    # ------------------------------------------------------------ wartości
    rows = [
        ["Papier", PAPER, "4 / 4 / 7 / 0", "papier w złamanej bieli", "brak", "brak"],
        ["Kamień", STONE, "8 / 7 / 12 / 0", "7 / 6 / 10 / 0", "Warm Gray 1 C", "7527 U"],
        ["Atrament", INK, "tekst 0 / 0 / 0 / 100<br>pola 50 / 40 / 50 / 100", "0 / 0 / 0 / 100", "Black C", "Black U"],
        ["Grafit", MUTED, "5 / 10 / 25 / 75", "0 / 5 / 40 / 85", "405 C", "Black 2 U"],
        ["Głęboka zieleń", DEEP, "85 / 0 / 85 / 80", "100 / 0 / 100 / 70<br>wychodzi jaśniej", "3435 C", "nie stosujemy"],
        ["Zieleń sygnałowa", GREEN, "85 / 0 / 80 / 0", "95 / 0 / 95 / 0", "340 C", "355 U"],
        ["Zieleń sygnałowa jasna", GREEN_L, "65 / 0 / 65 / 0", "65 / 0 / 70 / 0", "7479 C", "7479 U"],
    ]
    trs = "".join(f'<tr><td><span class="dotc" style="background:{h}"></span>{n}</td><td class="num">{h}</td><td class="num">{rgb(h)}</td><td class="num">{a}</td><td class="num">{b}</td><td>{pc}</td><td>{pu}</td></tr>' for n, h, a, b, pc, pu in rows)
    page(top("Wartości kolorów", "Ekran: HEX i RGB. Druk w czterech kolorach: CMYK, osobno dla papieru powlekanego i niepowlekanego. Druk kolorem dodatkowym: Pantone.",
        f'''<table class="tb mid"><colgroup><col style="width:20%"><col style="width:10%"><col style="width:12%"><col style="width:18%"><col style="width:18%"><col style="width:11%"><col style="width:11%"></colgroup>
<tr><th>Kolor</th><th>HEX</th><th>RGB</th><th>CMYK, papier powlekany</th><th>CMYK, papier niepowlekany</th><th>Pantone C</th><th>Pantone U</th></tr>{trs}</table>
<p class="small" style="margin-top:28px;max-width:1500px">Wartości CMYK policzono dla profili FOGRA39 (powlekany) i FOGRA29 (niepowlekany) tak, żeby odbitka była jak najbliżej koloru z ekranu. Numery Pantone to najbliższe farby ze wzornika, a nie dokładne odpowiedniki: 340 C drukuje się żywiej niż zieleń na ekranie, 3435 C trochę jaśniej. Przed pierwszym nakładem drukarnia robi odbitkę próbną na docelowym papierze.</p>''', cls="tight"), title="Wartości kolorów")

    # ------------------------------------------------------------ proporcje
    bar = lambda parts: '<div class="prop-bar">' + "".join(f'<span style="flex:{f};background:{c}"></span>' for f, c in parts) + '</div>'
    leg = lambda items: '<div class="grid" style="grid-template-columns:repeat(4,1fr);gap:20px;margin-top:18px">' + "".join(f'<p style="font-size:19px;line-height:1.35"><b class="disp" style="display:block;font-size:34px">{p}</b>{t}</p>' for p, t in items) + '</div>'
    hero_p = (abs_(28, 24, word(w=92)) + abs_(300, 22, f'<span class="btn" style="font-size:11px">' + '<i></i>Umów rozmowę</span>')
              + abs_(28, 96, txt("Marketing i pozyskiwanie<br>klientów dla firm", 27, 600, font="disp", lh=1.08)) + abs_(28, 172, txt("Planuję i prowadzę wszystkie części marketingu firmy.", 12, color=MUTED)))
    hero_d = (abs_(28, 150, txt("Co się dzieje z zapytaniami<br>z reklam", 30, 500, PAPER, "disp", 1.06)) + abs_(28, 40, tor(170, 5, [0, 1], 1, ink=PAPER, green=GREEN_L))
              + abs_(28, 214, word(ink=PAPER, w=80)))
    page(split("Proporcje",
        "Kolor marki działa dlatego, że jest go mało. Powierzchnia jest albo papierowa, albo zielona. Nie mieszamy ich pół na pół i nie dodajemy trzeciego tła.",
        notes([("Powierzchnia papierowa", "Domyślna. Strona, dokument, slajd z treścią, środek karuzeli, mail."),
               ("Powierzchnia zielona", "Okładka, slajd tytułowy i końcowy, plansza w filmie, stopka strony, tył wizytówki, pierwsza grafika w mediach społecznościowych."),
               ("W zestawie", "W prezentacji, karuzeli i na stronie powierzchnie zielone zajmują najwyżej jedną czwartą całości. Dwie zielone powierzchnie nie stoją obok siebie.")]),
        f'''<div class="grid" style="gap:44px">
<div style="display:grid;grid-template-columns:1fr 440px;gap:40px;align-items:center"><div>{bar([(76, PAPER), (20, INK), (2.4, MUTED), (1.6, GREEN)])}{leg([("od 70%", "papier, kamień, biel"), ("do 25%", "atrament i zdjęcia"), ("do 5%", "grafit"), ("do 2%", "zielona kropka")])}</div>{mini(PAPER, hero_p)}</div>
<div style="display:grid;grid-template-columns:1fr 440px;gap:40px;align-items:center"><div>{bar([(76, DEEP), (21, PAPER), (1.4, DEEPM), (1.6, GREEN_L)])}{leg([("od 70%", "głęboka zieleń"), ("do 25%", "papier jako tekst, zdjęcie"), ("do 5%", "tekst pomocniczy"), ("do 2%", "jasna zielona kropka")])}</div>{mini(DEEP, hero_d)}</div>
</div>'''), title="Proporcje")

    # ------------------------------------------------------------ role
    sw = lambda h: f'<span class="dotc" style="background:{h};border-radius:5px;width:22px;height:22px;vertical-align:-4px"></span><span class="tnum">{h}</span>'
    page(top("Role kolorów", "Kolory mają nazwy ról. W kodzie, w szablonach i w rozmowie używamy roli, a nie wartości, bo ta sama rola ma inną wartość na jasnej i na ciemnej powierzchni.",
        table(["Rola", "Na powierzchni papierowej", "Na powierzchni zielonej", "Do czego"], [
            ["Tło", sw(PAPER), sw(DEEP), "Podstawa każdej kompozycji"],
            ["Druga powierzchnia", sw(STONE) + "&nbsp;&nbsp; karty " + sw(WHITE), sw(DEEP2), "Panel, karta, pole formularza, wiersz tabeli"],
            ["Tekst", sw(INK), sw(PAPER), "Nagłówki i tekst ciągły"],
            ["Tekst pomocniczy", sw(MUTED), sw(DEEPM), "Podpisy, etykiety, stopki"],
            ["Linia", sw(LINE) + "&nbsp;&nbsp; mocna " + sw(LINE2), sw(DEEP2), "Podziały, obrysy pól, osie wykresów"],
            ["Kropka", sw(GREEN), sw(GREEN_L), "Jedyny akcent"],
            ["Przycisk główny", sw(INK) + " z tekstem " + sw(PAPER), sw(PAPER) + " z tekstem " + sw(INK), "Jedno główne działanie"],
            ["Fokus klawiatury", sw(INK) + " obrys 2 px", sw(PAPER) + " obrys 2 px", "Widoczny stan zaznaczenia"],
        ], cls="tb mid", widths=["17%", "30%", "24%", "29%"]), cls="tight"), title="Role kolorów")

    # ------------------------------------------------------------ pary i kontrast
    fgs = [("Atrament", INK), ("Grafit", MUTED), ("Papier", PAPER), ("Pomocniczy na zieleni", DEEPM), ("Zieleń sygnałowa", GREEN), ("Zieleń jasna", GREEN_L), ("Zieleń 600", T.GREENS[600])]
    bgs = [("Biel", WHITE), ("Papier", PAPER), ("Kamień", STONE), ("Głęboka zieleń", DEEP), ("Atrament", INK)]
    head = "<tr><th></th>" + "".join(f"<th>{n}</th>" for n, _ in bgs) + "</tr>"
    body = ""
    for fn, fg in fgs:
        body += f"<tr><th>{fn}</th>"
        for bn, bg in bgs:
            r = C.contrast(fg, bg)
            if r < 3: body += f'<td class="x">{f"{r:.1f}".replace(".", ",")}</td>'
            else:
                use = "tekst" if r >= 4.5 else "grafika"
                body += f'<td style="background:{bg};color:{fg}"><b>{f"{r:.1f}".replace(".", ",")}</b>{use}</td>'
        body += "</tr>"
    page(split("Pary i kontrast",
        "Tekst wymaga kontrastu co najmniej 4,5:1, duże nagłówki i grafika, w tym kropka, co najmniej 3:1. To progi standardu WCAG 2.2.",
        notes([("Dlaczego zieleń nie jest kolorem tekstu", "Zieleń sygnałowa ma na papierze 3,5:1. To wystarcza kropce, ale nie literom. Gdy potrzebny jest zielony tekst, na przykład w stanie „sukces”, bierzemy zieleń 600."),
               ("Dlaczego przycisk jest atramentowy", "Papierowy napis na zieleni sygnałowej ma 3,5:1, za mało na tekst przycisku. Przycisk jest atramentowy, a kropka stoi przy napisie."),
               ("Głęboka zieleń i atrament", "Osoby, które słabo rozróżniają czerwień i zieleń, widzą te dwa kolory prawie tak samo. Nie stawiamy ich obok siebie jako dwóch różnych znaczeń.")]),
        f'<table class="mx">{head}{body}</table><p class="small" style="margin-top:20px">Zakreskowane pola: kontrast poniżej 3:1, pary nie używamy.</p>', cls="n"), title="Pary i kontrast")

    # ------------------------------------------------------------ kropka
    ok1 = mini(PAPER, abs_(30, 30, word(w=110)) + abs_(30, 96, txt("Oferta współpracy", 30, 600, font="disp")) + abs_(30, 150, f'<div style="width:300px;height:8px;background:{LINE2};margin-bottom:12px"></div>' * 3), 360, 230)
    ok2 = mini(PAPER, abs_(34, 58, tor(292, 6, [0, .33, .66, 1], 1, labels=["Reklama", "Zapytanie", "Rozmowa", "Sprzedaż"], font=13)) + abs_(34, 160, txt("Jedna kropka pokazuje, o którym etapie mowa.", 13, color=MUTED)), 360, 230)
    ok3 = mini(DEEP, abs_(34, 70, txt("Umów rozmowę", 34, 500, PAPER, "disp")) + abs_(34, 140, '<span class="btn inv" style="font-size:15px"><i></i>Wybierz termin</span>'), 360, 230)
    no1 = mini(PAPER, abs_(34, 36, txt("Trzy kroki", 28, 600, font="disp")) + "".join(abs_(34, 92 + i * 42, f'<div style="display:flex;gap:12px;align-items:center">{dot(16)}<span style="font-size:15px">{t}</span></div>') for i, t in enumerate(["Plan", "Kampania", "Raport"])), 360, 230)
    no2 = mini(PAPER, abs_(34, 50, txt("Zwiększ sprzedaż", 34, 600, GREEN, "disp")) + abs_(34, 126, f'<span class="btn" style="font-size:15px;background:{GREEN};color:#fff">Umów rozmowę</span>'), 360, 230)
    no3 = mini(GREEN, abs_(34, 80, txt("Nowa oferta", 40, 600, PAPER, "disp")), 360, 230)
    cap = lambda ok, t: f'<p style="font-size:18.5px;line-height:1.4;margin-top:12px"><span class="{"tak" if ok else "nie"}">{"Tak." if ok else "Nie."}</span> {t}</p>'
    page(split("Zielona kropka",
        "Zieleń sygnałowa występuje tylko jako okrągła kropka. Kropka wskazuje jedną rzecz: klienta na schemacie, główne działanie albo bieżący krok.",
        table(["", "Zasada"], [
            ["Liczba", "Jedna na kompozycję: ekran, slajd, stronę, kadr. Kropka w logo się nie liczy."],
            ["Kolor", f"{GREEN} na jasnym tle, {GREEN_L} na ciemnym. Na zdjęciu biała."],
            ["Rozmiar", "Co najmniej 8 px albo 2 mm. Przy tekście średnica to połowa wysokości wersalika."],
            ["Kształt", "Pełne koło. Bez obrysu, cienia, poświaty i gradientu."],
            ["Miejsce", "Nad literą, na linii albo przed napisem. Nie po słowie, bo wygląda jak kropka kończąca zdanie."],
            ["Wyjątek", "Miniatury filmów mają własne zasady. Zieleń jest tam tłem pola pod jednym słowem i kolorem strzałki."],
        ], cls="tb sm", widths=["22%", "78%"]),
        f'''<div class="grid g3" style="gap:26px 24px;zoom:.78">
<div>{ok1}{cap(True, "Kropka tylko w logo.")}</div><div>{ok2}{cap(True, "Jedna zielona na schemacie.")}</div><div>{ok3}{cap(True, "Przy głównym przycisku.")}</div>
<div>{no1}{cap(False, "Kropki jako punktory.")}</div><div>{no2}{cap(False, "Zielony tekst i zielony przycisk.")}</div><div>{no3}{cap(False, "Zieleń sygnałowa jako tło.")}</div>
</div>''', cls="w"), title="Zielona kropka")

    # ------------------------------------------------------------ skale
    def scale(d, labels=None):
        cells = ""
        for k, h in d.items():
            lab = (labels or {}).get(k, "")
            cells += f'<div style="background:{h};color:{on(h)}"><b>{k}</b><span>{lab}<br>{h}</span></div>'
        return f'<div class="scale">{cells}</div>'
    page(top("Skale tonalne", "Skale służą interfejsom, wykresom i stanom. W materiałach marki używamy tylko kolorów z palety podstawowej, które na skalach mają swoje nazwy.",
        f'''<h3 style="font-size:22px;font-weight:600;margin-bottom:12px">Zieleń</h3>
{scale(T.GREENS, {400: "sygnałowa jasna", 500: "sygnałowa", 900: "głęboka"})}
<h3 style="font-size:22px;font-weight:600;margin:40px 0 12px">Szarość ciepła</h3>
{scale(T.NEUTRALS, {0: "biel", 50: "papier", 100: "kamień", 200: "linia", 300: "linia mocna", 500: "popiół", 600: "grafit", 800: "atrament, najechanie", 900: "atrament"})}
<div class="grid g3" style="margin-top:44px;gap:56px">
<div class="note"><h3>Jak powstały</h3><p>Stały odcień, równe kroki jasności w przestrzeni OKLCH. Dzięki temu krok 600 jest tak samo ciemny w zieleni i w szarości.</p></div>
<div class="note"><h3>Gwarancja kontrastu</h3><p>Stopnie 600 i ciemniejsze mają na papierze co najmniej 4,5:1. Stopnie 400 i jaśniejsze mają tyle samo na głębokiej zieleni.</p></div>
<div class="note"><h3>Czego nie robimy</h3><p>Nie dorabiamy stopni pośrednich, nie zmieniamy krycia koloru, żeby go rozjaśnić, i nie budujemy z tych stopni gradientów.</p></div>
</div>''', cls="tight"), title="Skale tonalne")

    # ------------------------------------------------------------ funkcjonalne
    icons = {"Sukces": "✓", "Uwaga": "!", "Błąd": "×", "Informacja": "i"}
    msgs = {"Sukces": "Termin zarezerwowany. Potwierdzenie jest w skrzynce.", "Uwaga": "Budżet dzienny kończy się o 14:00.", "Błąd": "Nie udało się wysłać formularza. Spróbuj jeszcze raz.", "Informacja": "Raport obejmuje dane do wczoraj."}
    cards = ""
    for n, (fg, bg) in T.STATES.items():
        cards += (f'<div><div style="background:{bg};border-radius:14px;padding:24px 26px;display:flex;gap:16px;align-items:flex-start">'
                  f'<span style="flex:none;width:30px;height:30px;border-radius:50%;background:{fg};color:#fff;display:grid;place-items:center;font-weight:700;font-size:18px;line-height:1">{icons[n]}</span>'
                  f'<p style="font-size:21px;line-height:1.4;color:{INK}"><b style="color:{fg}">{n}.</b> {msgs[n]}</p></div>'
                  f'<p class="small tnum" style="margin-top:10px">tekst i ikona {fg} ({cr(fg, bg)} na tle), tło {bg}</p></div>')
    page(split("Kolory funkcjonalne",
        "Cztery kolory stanów służą formularzom, panelom, raportom i tej księdze. Nie są kolorami marki i nie pojawiają się w logo, nagłówkach ani na grafikach.",
        notes([("Zawsze ze znakiem", "Kolor nigdy nie jest jedynym nośnikiem informacji. Stan ma ikonę i słowo, a zmiana liczby ma znak plus albo minus."),
               ("Zieleń w stanie sukcesu", "Stan „sukces” używa zieleni 600, ciemniejszej niż sygnałowa, żeby tekst był czytelny i żeby nie mylić go z kropką marki."),
               ("W tej księdze", "Słowa „Tak” i „Nie” oraz przekreślenia na stronach z błędami używają kolorów sukcesu i błędu.")]),
        f'<div class="grid" style="gap:26px">{cards}</div>'), title="Kolory funkcjonalne")

    # ------------------------------------------------------------ wykresy
    def bars(vals, labels, hi=None, w=440, h=300, cols=None):
        mx = max(vals); bw = w / len(vals); out = f'<line x1="0" y1="{h}" x2="{w}" y2="{h}" stroke="{LINE2}" stroke-width="2"/>'
        for i, v in enumerate(vals):
            bh = (h - 40) * v / mx; x = i * bw + bw * 0.18
            col = (cols[i] if cols else (GREEN if i == hi else T.CHART_REST[1]))
            out += f'<rect x="{x:.1f}" y="{h-bh:.1f}" width="{bw*0.64:.1f}" height="{bh:.1f}" fill="{col}"/>'
            out += f'<text x="{x + bw*0.32:.1f}" y="{h-bh-10:.1f}" text-anchor="middle" font-size="19" font-weight="{600 if i == hi else 400}" fill="{INK}" font-family="Schibsted Grotesk" style="font-variant-numeric:tabular-nums">{v}</text>'
            out += f'<text x="{x + bw*0.32:.1f}" y="{h+26:.1f}" text-anchor="middle" font-size="18" fill="{MUTED}" font-family="Schibsted Grotesk">{labels[i]}</text>'
        return f'<svg viewBox="0 -10 {w} {h+44}" style="width:100%;height:auto" aria-hidden="true">{out}</svg>'
    def lines(w=440, h=300):
        ser = [("Wyszukiwarka", GREEN, [30, 34, 41, 48, 52, 61]), ("Polecenia", T.CHART[1][1], [22, 24, 23, 27, 32, 36]), ("Media społ.", T.CHART[2][1], [12, 15, 14, 18, 17, 22]), ("Mailing", T.CHART[3][1], [3, 4, 6, 5, 8, 9])]
        out = "".join(f'<line x1="0" y1="{h - h*k/3:.0f}" x2="{w-170}" y2="{h - h*k/3:.0f}" stroke="{LINE}" stroke-width="1.5"/>' for k in range(4))
        for n, c, v in ser:
            pts = [((w - 170) * i / 5, h - (h - 10) * y / 66) for i, y in enumerate(v)]
            out += f'<polyline points="{" ".join(f"{x:.1f},{y:.1f}" for x, y in pts)}" fill="none" stroke="{c}" stroke-width="{4 if c == GREEN else 3}" stroke-linejoin="round" stroke-linecap="round"/>'
            out += f'<text x="{pts[-1][0]+12:.1f}" y="{pts[-1][1]+5:.1f}" font-size="17" font-weight="{600 if c == GREEN else 400}" fill="{INK}" font-family="Schibsted Grotesk">{n}</text>'
        return f'<svg viewBox="0 -10 {w} {h+20}" style="width:100%;height:auto" aria-hidden="true">{out}</svg>'
    pal = "".join(f'<div style="flex:1;background:{h};color:{on(h)};padding:16px 16px;font-size:17px;line-height:1.3;height:108px;display:flex;flex-direction:column;justify-content:space-between"><b>{i+1}. {n}</b><span class="tnum">{h}</span></div>' for i, (n, h) in enumerate(T.CHART))
    pal += f'<div style="flex:1;background:{T.CHART_REST[1]};color:{INK};padding:16px;font-size:17px;line-height:1.3;height:108px;display:flex;flex-direction:column;justify-content:space-between"><b>{T.CHART_REST[0]}</b><span class="tnum">{T.CHART_REST[1]}</span></div>'
    page(split("Kolory wykresów",
        "Wykres ma odpowiedzieć na jedno pytanie. To, o czym mowa, jest zielone, reszta szara. Kolejne kolory dochodzą dopiero wtedy, gdy trzeba rozróżnić więcej serii.",
        notes([("Kolejność", "Zieleń, stal, ochra, cegła. Zawsze w tej kolejności i najwyżej cztery serie w kolorze. Piąta i dalsze są szare albo idą na osobny wykres."),
               ("Podpisy", "Serię podpisujemy przy linii albo słupku, nie w legendzie. Dzięki temu wykres czyta także osoba, która nie rozróżnia kolorów."),
               ("Wzrost i spadek", "Zieleń 600 i kolor błędu, zawsze ze znakiem plus albo minus."),
               ("Bez ozdób", "Bez efektu 3D, cieni, gradientów i siatki gęstszej niż cztery linie.")]),
        f'''<div style="display:flex;border-radius:14px;overflow:hidden;margin-bottom:36px">{pal}</div>
<div class="grid g2" style="gap:44px">
<div class="figc"><div class="panel white pad-s" style="height:auto;display:block">{bars([18, 22, 27, 41, 33, 30], ["sty", "lut", "mar", "kwi", "maj", "cze"], 3)}</div><p><b>Jedna rzecz w zieleni.</b> Zapytania w miesiącu, o którym mowa.</p></div>
<div class="figc"><div class="panel white pad-s" style="height:auto;display:block">{lines()}</div><p><b>Do czterech serii.</b> Podpis stoi przy końcu linii.</p></div>
</div>'''), title="Kolory wykresów")

    # ------------------------------------------------------------ druk
    page(top("Kolor w druku", "Ekran świeci, papier odbija światło, więc ten sam kolor wychodzi w druku inaczej. Te zasady pilnują, żeby różnica była mała i przewidywalna.",
        table(["Sprawa", "Zasada", "Dlaczego"], [
            ["Papier", "Tłem jest sam papier w złamanej bieli. Koloru papieru nie drukujemy.", "Jasny nadruk z rastra wygląda brudno i podnosi koszt."],
            ["Głęboka zieleń", "Tylko na papierze powlekanym albo pod folią matową. CMYK 85 / 0 / 85 / 80 albo Pantone 3435 C.", "Na papierze niepowlekanym ciemna zieleń wychodzi wyraźnie jaśniejsza i bardziej szara."],
            ["Tekst", "Atrament jako sam czarny: 0 / 0 / 0 / 100. Mały tekst nie składa się z czterech farb.", "Cztery farby nigdy nie trafiają idealnie w to samo miejsce i litery się rozmywają."],
            ["Duże czarne pola", "Czerń głęboka 50 / 40 / 50 / 100, tylko na papierze powlekanym.", "Sam czarny na dużym polu wygląda szaro."],
            ["Kropka", "Najlepiej kolorem dodatkowym: Pantone 340 C albo 355 U, na ciemnym tle 7479. W CMYK tylko z cyjanu i żółtego.", "Kropka ma 1–3 mm. Przy dwóch farbach przesunięcie o 0,1 mm jest niewidoczne."],
            ["Grafit", "Poniżej 9 pt drukujemy go jako 75% czarnego albo Pantone 405 C.", "Drobny tekst z rastra czterech farb jest nieostry."],
            ["Suma farb", "Do 300% na papierze powlekanym, do 250% na niepowlekanym.", "Więcej farby nie schnie i odbija się na sąsiednim arkuszu."],
            ["Plik", "PDF/X-4, 300 dpi, spad 3 mm. Profile: PSO Coated v3 i PSO Uncoated v3.", "Tego oczekuje większość drukarni w Polsce."],
        ], cls="tb", widths=["15%", "47%", "38%"]), cls="tight"), title="Kolor w druku")

    # ------------------------------------------------------------ czego nie robić
    grad = f'<div style="position:absolute;inset:0;background:linear-gradient(120deg,{DEEP},{GREEN_L})"></div><div class="rel" style="width:70%">{word(ink=PAPER, dot=PAPER, style="width:100%;height:auto")}</div>'
    tint = f'<div class="photo" style="position:absolute;inset:0;background-image:url({PHOTO1});filter:grayscale(1) sepia(1) hue-rotate(95deg) saturate(2.4) brightness(.9)"></div>'
    half = f'<div style="position:absolute;inset:0;background:linear-gradient(90deg,{PAPER} 50%,{DEEP} 50%)"></div>'
    third = f'<div style="position:absolute;inset:0;background:#1F3A5F"></div><div class="rel" style="width:70%">{word(ink=PAPER, style="width:100%;height:auto")}</div>'
    opac = f'<div style="position:absolute;inset:0;background:{DEEP};opacity:.45"></div><div class="rel">{txt("Plan na 2027", 34, 600, INK, "disp")}</div>'
    many = f'<div class="rel" style="display:flex;gap:14px">{"".join(dot(30, c) for c in (GREEN, T.CHART[2][1], T.CHART[3][1], T.CHART[1][1]))}</div>'
    gtext = f'<div class="rel" style="padding:0 24px">{txt("Zielony tekst na papierze ma za mały kontrast.", 22, 400, GREEN)}</div>'
    blackbg = f'<div style="position:absolute;inset:0;background:#000"></div><div class="rel" style="width:70%">{word(ink=WHITE, dot=GREEN_L, style="width:100%;height:auto")}</div>'
    tiles = "".join(tile(i, False, t, "h3") for i, t in [
        (grad, "Gradient zamiast jednolitego tła."), (tint, "Barwienie zdjęcia na kolor marki."), (half, "Papier i zieleń pół na pół."), (third, "Trzecie tło spoza palety."),
        (opac, "Rozjaśnianie koloru kryciem."), (many, "Kilka kolorowych akcentów naraz."), (gtext, "Tekst w zieleni sygnałowej."), (blackbg, "Czysta czerń #000000 jako tło marki.")])
    page(top("Czego nie robić z kolorem", "Paleta jest krótka celowo. Każdy przykład pokazuje jeden błąd.",
        f'<div class="grid g4" style="gap:34px 28px">{tiles}</div>', cls="tight"), title="Czego nie robić z kolorem")
