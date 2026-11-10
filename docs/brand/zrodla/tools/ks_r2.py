"""Księga marki: rozdział Logo."""
from ks_core import *
from brandlib import wordmark
import master

SCH = f"{F}/SchibstedGrotesk[wght].ttf"
BRY = f"{F}/Brygada1918[wght].ttf"
wd = bp.word_dims(); sd = bp.sym_dims(); sds = bp.sym_dims(True)
WR = wd['h'] / wd['w']            # wysokość / szerokość napisu
SR = sd['w'] / sd['h']            # szerokość / wysokość znaku

def word_px(wpx, **k): return f'<div style="width:{wpx}px">{word(style="width:100%;height:auto", **k)}</div>'
def sym_px(hpx, small=False, **k): return sym(h=hpx, small=small, **k)

def descriptor_lockup(ink=INK, dotc=None, text=None):
    """Napis z dopiskiem: dopisek ma wersalik 0,75 K i stoi 2 K pod linią pisma, od lewej krawędzi napisu."""
    text = text or T.DOPISEK
    K = wd['K']; x0, y0, x1, y1 = wd['bb']; cap = wd['cap']
    m = wordmark(SCH, 500, text, 0.75 * K, x0=x0, base=cap + 2 * K + 0.75 * K, track=0.005)
    dsc = "".join(f'<path d="{d}"/>' for d in m['ink'])
    dotc = dotc or (GREEN_L if ink in (PAPER, WHITE) else GREEN)
    h = cap + 2 * K + 0.75 * K + 6 - y0
    return (f'<svg viewBox="{x0:.2f} {y0:.2f} {x1-x0:.2f} {h:.2f}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="width:100%;height:auto">'
            f'{bp._word_inner(ink, dotc)}<g fill="{ink}">{dsc}</g></svg>'), (x1 - x0, h)

def avatar(size, circle=True, bg=DEEP, ink=PAPER, small=False, scale=0.5, guides=False, radius=0.22):
    d = sds if small else sd
    h = size * scale; w = h * d['w'] / d['h']
    shape = f'border-radius:50%' if circle else f'border-radius:{size*radius:.1f}px'
    g = ""
    if guides:
        g = (f'<div style="position:absolute;left:50%;top:0;bottom:0;width:0;border-left:1.5px dashed {ASH}"></div>'
             f'<div style="position:absolute;top:50%;left:0;right:0;height:0;border-top:1.5px dashed {ASH}"></div>'
             f'<div style="position:absolute;left:{(size-h)/2:.1f}px;top:{(size-h)/2:.1f}px;width:{h:.1f}px;height:{h:.1f}px;border:1.5px dashed {GREEN_L if bg == DEEP else GREEN};border-radius:{"50%" if circle else "0"}"></div>')
    return (f'<div style="position:relative;width:{size}px;height:{size}px;background:{bg};{shape};overflow:hidden;flex:none;'
            f'{"box-shadow:inset 0 0 0 1.5px " + LINE2 if bg in (PAPER, WHITE) else ""}">'
            f'<div style="position:absolute;left:{(size-w)/2 + size*0.004:.1f}px;top:{(size-h)/2 - size*0.012:.1f}px">{sym(ink=ink, h=h, small=small)}</div>{g}</div>')

def build():
    opener("Logo")

    # ------------------------------------------------------------ elementy
    page(top("Elementy logo", "Logo ma dwie postaci: napis i znak. Łączy je jeden pomysł, czyli okrągła zielona kropka nad literą.",
        f'''<div class="grid g3" style="height:100%">
<div class="figc"><div class="panel" style="height:560px">{word_px(430)}</div><p><b>Napis.</b> Logo główne. Używamy go wszędzie, gdzie mieści się całe nazwisko.</p></div>
<div class="figc"><div class="panel" style="height:560px">{sym_px(300)}</div><p><b>Znak.</b> Pierwsza litera nazwiska z kropką znad Ż. Zastępuje napis na małych i kwadratowych polach.</p></div>
<div class="figc"><div class="panel" style="height:560px"><div class="row" style="align-items:flex-end;gap:52px">{sym_px(128, True)}{sym_px(64, True)}{sym_px(32, True)}{sym_px(16, True)}</div></div><p><b>Znak mały.</b> Grubsza litera i większa kropka. Do rozmiarów od 16 do 31 px i od 5 do 10 mm.</p></div>
</div>''', cls="tight"), title="Elementy logo")

    # ------------------------------------------------------------ napis
    page(split("Napis",
        "Logo główne to nazwisko „Drożniak”. Stoi na stronie, w dokumentach, ofertach, prezentacjach, na przodzie wizytówki i w podpisie maila.",
        notes([("Zapis", "Wielkie D, reszta małymi literami. Bez kropki na końcu i bez wersalików, bo w wersalikach kropka nad Ż przestaje być widoczna."),
               ("Kropka", "Okrągła i o jedną czwartą większa niż w kroju. To jedyny element logo w kolorze."),
               ("Źródło", "Zawsze plik z folderu logo/napis. Napisu nie składamy fontem w programie, bo tylko plik ma właściwą kropkę i odstępy.")]),
        f'<div class="panel">{word_px(900)}</div>'), title="Napis")

    x0, y0, x1, y1 = wd['bb']; cap, xh, K = wd['cap'], wd['xh'], wd['K']; dcx, dcy, dr = wd['dot']
    lm = f'stroke="{ASH}" stroke-width="0.9" stroke-dasharray="4 3"'
    lines = "".join(f'<line x1="{x0-70:.1f}" y1="{y:.1f}" x2="{x1+12:.1f}" y2="{y:.1f}" {lm}/>' for y in (0, cap - xh, cap))
    lab = lambda y, s: f'<text x="{x0-74:.1f}" y="{y+4.5:.1f}" font-size="12.5" fill="{MUTED}" text-anchor="end" font-family="Schibsted Grotesk">{s}</text>'
    kmark = (f'<line x1="{dcx-dr:.1f}" y1="{dcy-dr-12:.1f}" x2="{dcx+dr:.1f}" y2="{dcy-dr-12:.1f}" stroke="{GREEN}" stroke-width="1.6"/>'
             f'<text x="{dcx:.1f}" y="{dcy-dr-20:.1f}" font-size="15" fill="{GREEN}" text-anchor="middle" font-weight="600" font-family="Schibsted Grotesk">K</text>'
             f'<line x1="{dcx+dr+10:.1f}" y1="{dcy+dr:.1f}" x2="{dcx+dr+10:.1f}" y2="{cap-xh:.1f}" stroke="{GREEN}" stroke-width="1.6"/>'
             f'<text x="{dcx+dr+17:.1f}" y="{(dcy+dr+cap-xh)/2+4:.1f}" font-size="12.5" fill="{GREEN}" font-weight="600" font-family="Schibsted Grotesk">0,46 K</text>')
    wc = (f'<svg viewBox="{x0-150:.1f} {y0-44:.1f} {x1-x0+176:.1f} {y1-y0+62:.1f}" style="width:100%;height:auto" aria-hidden="true">{lines}'
          f'{lab(0, "100")}{lab(cap - xh, "69")}{lab(cap, "0")}{bp._word_inner(INK, GREEN)}{kmark}</svg>')
    page(split("Budowa napisu",
        "Napis jest złożony krojem Brygada 1918 w odmianie 600 i zamieniony na krzywe. Jedyna zmiana względem kroju to kropka nad Ż.",
        notes([("Miara K", "K to średnica kropki. Przy wysokości wersalika 100 kropka ma 26, a małe litery 69. Od K liczymy pole ochronne, dopisek i odstępy w zestawieniach z innymi logo."),
               ("Odstęp kropki", "Między literą a kropką jest 0,46 K. Ta sama proporcja wraca w znaku."),
               ("Proporcje", "Szerokość napisu to 5,8 jego wysokości. Przy 100 mm szerokości wersalik ma 15,4 mm.")]),
        f'<div class="panel">{wc}</div>'), title="Budowa napisu")

    # ------------------------------------------------------------ znak
    page(split("Znak",
        "Znak to pierwsza litera nazwiska, ta sama co w napisie, z kropką znad Ż postawioną nad literą. Kto zna napis, rozpozna znak, i odwrotnie.",
        notes([("Gdzie", "Favikona, ikona aplikacji, awatar firmowy, tył wizytówki, róg filmu, pieczątka, tłoczenie, gadżety."),
               ("Czego nie robi", "Nie stoi obok napisu i nie zastępuje go tam, gdzie napis się mieści."),
               ("Kropka", "Zawsze nad literą. Kropka obok litery albo po niej wygląda jak znak innej, znanej firmy doradczej.")]),
        f'<div class="grid g2" style="height:100%"><div class="panel">{sym_px(430)}</div><div class="panel deepbg">{sym_px(430, ink=PAPER)}</div></div>'), title="Znak")

    page(split("Budowa znaku",
        "Litera pochodzi z napisu, a kropka ma te same proporcje co kropka nad Ż. Znak da się odtworzyć z trzech miar.",
        notes([("H", "Wysokość litery D. Od niej liczymy pozostałe miary."),
               ("K", "Średnica kropki: 0,32 H w znaku podstawowym i 0,40 H w znaku małym. K jest też miarą pola ochronnego."),
               ("Położenie kropki", "Odstęp od litery 0,46 K, tak jak w napisie. Oś kropki leży o 1,2% szerokości litery na prawo od jej środka, bo łuk D jest optycznie cięższy niż trzon.")]),
        f'''<div class="grid g2" style="height:100%">
<div class="figc" style="display:flex;flex-direction:column"><div class="panel pad-s" style="flex:1">{bp.construction()}</div><p><b>Znak podstawowy.</b> Brygada 1918 w odmianie 600.</p></div>
<div class="figc" style="display:flex;flex-direction:column"><div class="panel pad-s" style="flex:1">{bp.construction(True)}</div><p><b>Znak mały.</b> Odmiana 700 i większa kropka.</p></div>
</div>'''), title="Budowa znaku")

    def ladder(sizes, small):
        return "".join(f'<div class="figc" style="text-align:center"><div style="height:130px;display:flex;align-items:flex-end;justify-content:center">{sym_px(s, small)}</div><p>{s} px</p></div>' for s in sizes)
    def ladder_d(sizes, small):
        return "".join(f'<div class="figc" style="text-align:center"><div style="height:130px;display:flex;align-items:flex-end;justify-content:center">{avatar(s, circle=False, small=small, scale=0.66, radius=0.19)}</div><p>{s} px</p></div>' for s in sizes)
    page(split("Znak w małych rozmiarach",
        "Cienkie kreski szeryfowej litery znikają, gdy znak ma kilkanaście pikseli. Dlatego poniżej 32 px używamy znaku małego.",
        notes([("Granica", "Znak podstawowy od 32 px i od 10 mm wysokości. Znak mały od 16 do 31 px i od 5 do 10 mm."),
               ("Poniżej 16 px", "Nie używamy logo. W takim miejscu zostaje sama nazwa zapisana tekstem."),
               ("Na tej stronie", "Rysunki mają prawdziwy rozmiar w pikselach, gdy strona jest wyświetlana w skali 100%.")]),
        f'''<div class="grid" style="gap:36px">
<div class="panel white" style="height:auto;padding:36px 44px;display:block"><p class="small" style="margin-bottom:8px">Znak podstawowy</p><div class="row" style="gap:56px;align-items:flex-end">{ladder((128, 96, 64, 48, 32), False)}</div></div>
<div class="panel white" style="height:auto;padding:36px 44px;display:block"><p class="small" style="margin-bottom:8px">Znak mały</p><div class="row" style="gap:56px;align-items:flex-end">{ladder((31, 24, 20, 16), True)}<span style="width:40px"></span>{ladder_d((48, 32, 16), True)}</div></div>
</div>'''), title="Znak w małych rozmiarach")

    page(split("Wybór między napisem a znakiem",
        "Na jednej powierzchni jest napis albo znak. Postawione obok siebie dwa razy pokazują tę samą literę i tę samą kropkę.",
        notes([("Gdy potrzebne są oba", "Rozdzielamy je na różne powierzchnie: napis na przodzie wizytówki, znak na tyle. Napis w nagłówku strony, znak jako favikona."),
               ("Zdjęcie profilowe", "Na profilu osobistym, na przykład w LinkedIn, awatarem jest zdjęcie Stanisława. Znak jest awatarem tam, gdzie występuje marka, a nie osoba.")]),
        f'''<div class="grid g3" style="height:100%">
<div class="card"><div style="height:120px;display:flex;align-items:center">{word_px(300)}</div><h3 style="font-size:34px;margin-top:20px">Napis</h3><p style="margin-top:14px">Gdy pole ma co najmniej 96 px albo 20 mm szerokości i jest poziome.</p><div class="is" style="grid-template-columns:1fr"><p>Nagłówek strony, dokumenty, oferty, slajd tytułowy, przód wizytówki, podpis maila, faktura, grafiki do mediów społecznościowych, plansza końcowa filmu.</p></div></div>
<div class="card"><div style="height:120px;display:flex;align-items:center">{sym_px(110)}</div><h3 style="font-size:34px;margin-top:20px">Znak</h3><p style="margin-top:14px">Gdy pole jest kwadratowe, okrągłe albo mniejsze niż 96 px szerokości.</p><div class="is" style="grid-template-columns:1fr"><p>Favikona, ikona aplikacji, awatar firmowy, róg filmu i slajdu, tył wizytówki, pieczątka, tłoczenie, gadżety.</p></div></div>
<div class="card" style="background:{WHITE};box-shadow:inset 0 0 0 1.5px {LINE}"><div style="height:120px;display:flex;align-items:center;gap:22px;position:relative">{sym_px(104)}{word_px(250)}<span style="position:absolute;left:-4%;right:-4%;top:50%;height:5px;background:{ERR};transform:rotate(-12deg);border-radius:3px"></span></div><h3 style="font-size:34px;margin-top:20px">Nigdy razem</h3><p style="margin-top:14px">Nie ma układu „znak i napis”. Nie składamy go sami, także w stopce, na banerze ani w animacji.</p></div>
</div>''', cls="n"), title="Wybór między napisem a znakiem")

    # ------------------------------------------------------------ pole ochronne
    page(split("Pole ochronne",
        "Wokół logo zostaje wolne pole, w które nie wchodzi tekst, zdjęcie, inne logo ani krawędź formatu. Miarą jest K, czyli średnica kropki z danego logo.",
        notes([("Napis", "Co najmniej 3K z każdej strony. To trochę więcej niż wysokość małej litery."),
               ("Znak", "Co najmniej 1K z każdej strony."),
               ("Większy odstęp", "Pole ochronne to najmniejszy dopuszczalny odstęp. Margines formatu jest zwykle większy i to on wyznacza położenie logo.")]),
        f'''<div style="display:grid;grid-template-columns:1.9fr 1fr;gap:56px;align-items:center;height:100%">
<div class="figc">{bp.clear_word()}<p><b>Napis: 3K</b></p></div><div class="figc">{bp.clear_sym()}<p><b>Znak: 1K</b></p></div></div>'''), title="Pole ochronne")

    page(split("Minimalne rozmiary",
        "Poniżej tych rozmiarów cienkie kreski liter nie wychodzą w druku albo znikają na ekranie. Rozmiar napisu podajemy szerokością, rozmiar znaku wysokością.",
        notes([("Skąd te liczby", "Najcieńsza kreska napisu ma 5% wysokości wersalika. W druku w negatywie kreska musi mieć co najmniej 0,18 mm, a pod folię i tłoczenie 0,3 mm."),
               ("Kropka w kolorze", "Gdy kropka byłaby mniejsza niż 5 px albo 1 mm, logo przechodzi na wersję jednokolorową.")]),
        table(["", "Ekran", "Druk, ciemne na jasnym", "Druk, jasne na ciemnym", "Folia i tłoczenie"], [
            ["Napis", "od 96 px", "od 20 mm", "od 25 mm", "od 40 mm"],
            ["Napis z zieloną kropką", "od 120 px", "od 25 mm", "od 25 mm", "od 40 mm"],
            ["Napis z dopiskiem", "od 280 px", "od 60 mm", "od 70 mm", "nie stosujemy"],
            ["Znak", "od 32 px", "od 10 mm", "od 10 mm", "od 12 mm"],
            ["Znak mały", "16 do 31 px", "5 do 10 mm", "6 do 10 mm", "nie stosujemy"],
        ]) + f'''<div class="row" style="gap:56px;align-items:flex-end;margin-top:64px">
<div class="figc">{word_px(96, dot=INK)}<p>96 px</p></div><div class="figc">{word_px(120)}<p>120 px</p></div><div class="figc">{word_px(200)}<p>200 px</p></div>
<div class="figc">{sym_px(16, True)}<p>16 px</p></div><div class="figc">{sym_px(24, True)}<p>24 px</p></div><div class="figc">{sym_px(32)}<p>32 px</p></div><div class="figc">{sym_px(64)}<p>64 px</p></div></div>''', cls="n", fcls="top-a"), title="Minimalne rozmiary")

    # ------------------------------------------------------------ wersje
    def vt(bg, ink, dotc, label, text, light):
        col = INK if light else PAPER
        return (f'<div style="background:{bg};border-radius:20px;padding:48px 44px 40px;display:flex;flex-direction:column;{"box-shadow:inset 0 0 0 1.5px " + LINE if light else ""}">'
                f'<div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:56px">{word_px(300, ink=ink, dot=dotc)}{sym_px(120, ink=ink, dot=dotc)}</div>'
                f'<h3 style="font-size:24px;font-weight:600;color:{col}">{label}</h3><p style="font-size:20px;line-height:1.45;color:{col};opacity:.86;margin-top:6px">{text}</p></div>')
    page(top("Wersje kolorystyczne", "Logo ma cztery wersje. Wybór zależy od tła i techniki druku, a nie od upodobań.",
        f'''<div class="grid g4" style="height:100%">
{vt(PAPER, INK, GREEN, "Kolor", "Atrament i zieleń sygnałowa. Podstawowa wersja na papierze i bieli.", True)}
{vt(DEEP, PAPER, GREEN_L, "Negatyw", "Papier i zieleń sygnałowa jasna. Na głębokiej zieleni i atramencie.", False)}
{vt(STONE, INK, INK, "Czarna", "Druk jednym kolorem, pieczątka, faks, grawer, logo poniżej rozmiaru kolorowego.", True)}
{vt("#3A3F3B", WHITE, WHITE, "Biała", "Na zdjęciach i kolorowych tłach, na których zielona kropka by zniknęła.", False)}
</div>''', cls="tight"), title="Wersje kolorystyczne")

    bgs = [(WHITE, "Biel", INK, GREEN), (PAPER, "Papier", INK, GREEN), (STONE, "Kamień", INK, GREEN), (LINE2, "Linia mocna", INK, INK),
           ("#8A867A", "Średnia szarość", None, None), (T.GREENS[600], "Zieleń 600", WHITE, WHITE), (DEEP, "Głęboka zieleń", PAPER, GREEN_L), (INK, "Atrament", PAPER, GREEN_L)]
    cells = ""
    for bg, name, ink, dc in bgs:
        if ink:
            cells += f'<div class="figc"><div style="height:250px;background:{bg};border-radius:14px;display:grid;place-items:center;box-shadow:inset 0 0 0 1.5px {LINE}">{word_px(170, ink=ink, dot=dc)}</div><p><b>{name}</b></p></div>'
        else:
            cells += f'<div class="figc"><div style="height:250px;background:{bg};border-radius:14px;display:grid;place-items:center;position:relative;overflow:hidden">{word_px(170, ink=INK, dot=GREEN)}<span style="position:absolute;left:-10%;right:-10%;top:50%;height:5px;background:{ERR};transform:rotate(-32deg)"></span></div><p><b>{name}</b></p></div>'
    page(top("Dobór wersji do tła", "Na jasnym tle logo jest ciemne, na ciemnym jasne. W środku skali jasności logo nie stawiamy, bo żadna wersja nie ma tam dość kontrastu.",
        f'''<div class="grid" style="grid-template-columns:repeat(8,1fr);gap:16px">{cells}</div>
<div style="margin-top:44px">{table(["Tło", "Wersja", "Kropka"], [
    ["Biel, papier, kamień", "Kolor", "Zieleń sygnałowa #14945E"],
    ["Inne jasne tło, jaśniejsze niż linia mocna #D6D2C6", "Czarna", "W kolorze logo"],
    ["Tło o średniej jasności, między #D6D2C6 a #5E5A50", "Żadna. Zmieniamy tło albo kładziemy logo na papierowym polu", ""],
    ["Kolorowe ciemne tło i zdjęcie", "Biała", "W kolorze logo"],
    ["Głęboka zieleń i atrament", "Negatyw", "Zieleń sygnałowa jasna #23C27D"],
], cls="tb sm", widths=["42%", "38%", "20%"])}</div>'''), title="Dobór wersji do tła")

    def photo_tile(ok, text, pos, wordmark_html, overlay="", strike=False):
        lab = '<span class="tak">Tak.</span>' if ok else '<span class="nie">Nie.</span>'
        return (f'<div class="tile"><div class="tile-box h5{" strike" if strike else ""}" style="box-shadow:none"><div class="photo" style="position:absolute;inset:0;background-image:url({PHOTO1});background-position:{pos}"></div>{overlay}'
                f'<div class="rel" style="width:100%;height:100%">{wordmark_html}</div></div><p>{lab} {text}</p></div>')
    page(split("Logo na zdjęciu",
        "Na zdjęciu stoi wersja biała, w spokojnym i ciemnym fragmencie kadru. Jeśli takiego fragmentu nie ma, przyciemniamy zdjęcie albo stawiamy logo poza nim.",
        notes([("Przyciemnienie", "Czarna warstwa o kryciu najwyżej 40% na całym zdjęciu albo gradient od dołu. Kontrast logo do tła pod nim ma wynosić co najmniej 4,5:1."),
               ("Twarz", "Logo nie zasłania twarzy i nie stoi bliżej niż 3K od jej krawędzi."),
               ("Kolorowa kropka", "Na zdjęciu kropka jest biała. Zielona pojawia się tylko na jednolitym tle marki.")]),
        f'''<div class="grid g3">
{photo_tile(True, "Ciemny, spokojny fragment i wersja biała.", "50% 0%", f'<div style="position:absolute;left:28px;bottom:28px">{word_px(190, ink=WHITE, dot=WHITE)}</div>', f'<div style="position:absolute;inset:0;background:linear-gradient(0deg,rgba(0,0,0,.55),rgba(0,0,0,0) 55%)"></div>')}
{photo_tile(True, "Zdjęcie przyciemnione o 40%, logo w rogu.", "50% 30%", f'<div style="position:absolute;left:28px;top:28px">{word_px(190, ink=WHITE, dot=WHITE)}</div>', '<div style="position:absolute;inset:0;background:rgba(0,0,0,.4)"></div>')}
{photo_tile(False, "Logo na twarzy i na jasnym, niespokojnym tle.", "50% 30%", f'<div style="position:absolute;left:50%;top:42%;transform:translate(-50%,-50%)">{word_px(220)}</div>', "", True)}
</div>'''), title="Logo na zdjęciu")

    # ------------------------------------------------------------ położenie
    def fmt(w, h, sc, items, label, bg=PAPER):
        inner = ""
        for (x, y, html) in items: inner += abs_(x, y, html)
        return figc(mock(w, h, sc, inner, bg=bg), label)
    mrg = lambda w, h, m, col=GREEN: f'<div style="position:absolute;left:{m}px;top:{m}px;width:{w-2*m}px;height:{h-2*m}px;border:3px dashed {col};opacity:.55"></div>'
    page(split("Położenie na formacie",
        "Logo stoi przy lewym marginesie, u góry w dokumentach i na stronie, u dołu na grafikach. Znak w roli sygnatury stoi w prawym rogu. Na jednej powierzchni logo jest jedno.",
        table(["Format", "Logo", "Rozmiar", "Miejsce"], [
            ["Strona internetowa", "Napis", "132 px", "Lewy górny róg nagłówka"],
            ["Dokument A4", "Napis", "32 mm", "Lewy górny róg, na marginesie 20 mm"],
            ["Slajd tytułowy", "Napis", "300 px", "Lewy dolny róg, margines 112 px"],
            ["Slajd z treścią", "Znak", "56 px", "Prawy dolny róg"],
            ["Post 1080 × 1350", "Napis", "190 px", "Lewy dolny róg, margines 80 px"],
            ["Relacja 1080 × 1920", "Napis", "220 px", "Lewy dół pola bezpiecznego"],
            ["Film 1920 × 1080", "Znak biały", "72 px", "Prawy górny róg, 96 px od krawędzi"],
            ["Miniatura filmu", "Brak", "", "Markę niesie kolor, krój i kropka"],
        ], cls="tb xs", widths=["30%", "17%", "15%", "38%"]) + '<p class="small" style="margin-top:22px">Poza tabelą: szerokość napisu to 15–20% krótszego boku formatu, a na okładkach do 45%.</p>',
        f'''<div style="display:grid;grid-template-columns:auto auto;gap:36px 40px;justify-content:start;align-items:end">
{fmt(1240, 1754, 0.235, [(0, 0, mrg(1240, 1754, 118)), (118, 118, word_px(190)), (118, 420, txt("Oferta współpracy", 64, 600, font="disp")), (118, 540, f'<div style="width:760px;height:14px;background:{LINE2};margin-bottom:22px"></div>' * 9)], "Dokument A4", WHITE)}
{fmt(1920, 1080, 0.235, [(0, 0, mrg(1920, 1080, 112, GREEN_L)), (112, 300, txt("Plan marketingu<br>na 2027", 132, 500, PAPER, "disp", 1.02)), (112, 1080 - 112 - 300 * WR, word_px(300, ink=PAPER))], "Slajd tytułowy", DEEP)}
{fmt(1080, 1350, 0.235, [(0, 0, mrg(1080, 1350, 80, GREEN_L)), (80, 330, txt("Co się dzieje<br>z zapytaniami<br>z reklam", 118, 500, PAPER, "disp", 1.04)), (80, 1350 - 80 - 190 * WR, word_px(190, ink=PAPER))], "Post", DEEP)}
{fmt(1920, 1080, 0.235, [(0, 0, f'<div class="photo" style="width:1920px;height:1080px;background-image:url({PHOTO1});background-position:50% 18%"></div>'), (0, 0, '<div style="width:1920px;height:1080px;background:rgba(0,0,0,.25)"></div>'), (0, 0, mrg(1920, 1080, 96, WHITE)), (1920 - 96 - 72 * SR, 96, sym_px(72, ink=WHITE, dot=WHITE))], "Film", INK)}
</div>''', cls="w"), title="Położenie na formacie")

    # ------------------------------------------------------------ awatar
    page(split("Awatar",
        "Awatar marki to znak na głębokiej zieleni. Wysokość znaku to połowa średnicy koła, a jego środek leży w środku pola. Nic więcej w awatarze nie ma.",
        notes([("Koło i kwadrat", "Serwisy przycinają awatar do koła, więc projektujemy w kwadracie i sprawdzamy w kole. W kwadracie z zaokrąglonym rogiem znak ma 56% wysokości pola."),
               ("Wersja jasna", "Znak atramentowy na papierze. Tylko tam, gdzie tło serwisu jest ciemnozielone albo czarne."),
               ("Pliki", "drozniak-awatar-1080.png do serwisów społecznościowych, drozniak-ikona-aplikacji-1024.png do aplikacji.")]),
        f'''<div class="grid" style="gap:44px">
<div class="row" style="gap:30px;align-items:center">{avatar(230, guides=True)}{avatar(230)}{avatar(230, circle=False, scale=0.56)}{avatar(230, bg=PAPER, ink=INK)}</div>
<div class="row" style="gap:22px;align-items:center">{avatar(120)}{avatar(96)}{avatar(64)}{avatar(48)}{avatar(40, small=True)}{avatar(32, small=True)}{avatar(24, small=True)}
<p class="small" style="max-width:380px">Od 48 px w dół awatar wyświetla się tak, jak go widać w komentarzach i na listach. Poniżej 48 px plik zawiera znak mały.</p></div>
</div>'''), title="Awatar")

    fav = lambda s, sc=0.66: avatar(s, circle=False, small=True, scale=sc, radius=0.19)
    page(split("Favikona i ikony",
        "Favikona to znak mały na głębokiej zieleni z zaokrąglonym rogiem. Ten sam rysunek, w większych rozmiarach, służy jako ikona strony dodanej do ekranu telefonu.",
        notes([("Dlaczego na zielonym polu", "Karta przeglądarki bywa jasna albo ciemna. Własne tło gwarantuje, że znak wygląda zawsze tak samo."),
               ("Maska", "W ikonie maskowalnej znak mieści się w kole o średnicy 80% pola, bo system przycina rogi po swojemu.")]),
        table(["Plik", "Rozmiar", "Do czego"], [
            ["favicon.svg", "wektor", "Nowoczesne przeglądarki"],
            ["favicon.ico", "16, 32 i 48 px", "Starsze przeglądarki, skróty w Windows"],
            ["apple-touch-icon.png", "180 px", "Ekran początkowy iPhone’a i iPada"],
            ["icon-192.png, icon-512.png", "192 i 512 px", "Android, manifest strony"],
            ["icon-192-maskable.png, icon-512-maskable.png", "192 i 512 px", "Android, ikona przycinana przez system"],
            ["drozniak-ikona-aplikacji-1024.png", "1024 px", "Sklepy z aplikacjami, skróty"],
        ], cls="tb sm", widths=["46%", "20%", "34%"]) + f'<div class="row" style="gap:40px;align-items:flex-end;margin-top:56px">{fav(180, 0.6)}{fav(96)}{fav(48)}{fav(32)}{fav(16)}</div>',
        cls="n", fcls="top-a"), title="Favikona i ikony")

    # ------------------------------------------------------------ dopisek
    dl, (dw, dh) = descriptor_lockup()
    dln, _ = descriptor_lockup(ink=PAPER)
    page(split("Dopisek pod napisem",
        "Tam, gdzie samo nazwisko nie mówi, czym marka się zajmuje, pod napisem stoi dopisek. Dopisek nie jest częścią logo, więc jego treść może się zmienić bez zmiany znaku.",
        notes([("Budowa", "Schibsted Grotesk 500, wysokość wersalika 0,75 K, jedna linia, od lewej krawędzi napisu, 2K pod linią pisma. Kolor taki jak napis."),
               ("Kiedy", "Baner profilu, okładka oferty, rollup, reklama, stopka prezentacji dla nowego odbiorcy. Nie na stronie, gdzie opis stoi obok jako tekst."),
               ("Rozmiar", "Od 280 px albo 60 mm szerokości. Mniejszy napis zostaje bez dopisku.")]),
        f'''<div class="grid" style="grid-template-rows:1fr 1fr;gap:28px;height:100%">
<div class="panel"><div style="width:760px">{dl}</div></div>
<div class="panel deepbg"><div style="width:760px">{dln}</div></div></div>'''), title="Dopisek pod napisem")

    # ------------------------------------------------------------ partner
    def partner(ink=INK, line=LINE2, name="Grupa Fibra", w=1000):
        capx = 300 * (wd['cap'] / wd['w'])          # wysokość wersalika napisu o szerokości 300
        k = 300 * (wd['K'] / wd['w'])
        ph = capx * 1.0
        return (f'<div style="display:flex;align-items:center;gap:{3*k:.1f}px">{word_px(300, ink=ink)}'
                f'<span style="display:block;width:2px;height:{capx*1.7:.1f}px;background:{line}"></span>'
                f'<span style="font-family:var(--txt);font-weight:700;font-size:{ph*1.25:.1f}px;letter-spacing:-0.02em;color:{ink};line-height:1">{name}</span></div>')
    page(split("Logo obok logo klienta lub partnera",
        "W zestawieniu z cudzym logo występuje napis, nigdy znak. Oba logo dzieli pionowa linia, a ich wielkość wyrównujemy optycznie, nie według wymiarów pliku.",
        notes([("Odstępy", "Po 3K z każdej strony linii. Linia ma 1,7 wysokości wersalika napisu i grubość 1/12 K."),
               ("Wielkość", "Litery w logo partnera mają wysokość wersalika napisu. Jego znak graficzny może być wyższy najwyżej o połowę."),
               ("Kolejność i zgoda", "W materiałach marki napis stoi pierwszy, w materiałach partnera drugi. Logo klienta pokazujemy za jego zgodą i w wersji, którą sam przysłał.")]),
        f'''<div class="grid" style="grid-template-rows:1fr 1fr;gap:28px;height:100%">
<div class="panel white">{partner()}</div>
<div class="panel deepbg">{partner(PAPER, "rgba(246,245,241,.35)", "Chess.com")}</div></div>'''), title="Logo obok logo klienta lub partnera")

    # ------------------------------------------------------------ czego nie robić
    up = wordmark(BRY, 600, "DROŻNIAK", 100, x0=0, base=100)
    up_svg = f'<svg viewBox="-4 -30 {up["width"]+8:.1f} 140" aria-hidden="true"><g fill="{INK}">' + "".join(f'<path d="{d}"/>' for d in up["ink"]) + '</g></svg>'
    per_svg = f'<svg viewBox="{x0-4:.1f} {y0-4:.1f} {x1-x0+50:.1f} {y1-y0+8:.1f}" aria-hidden="true">{bp._word_inner(INK, GREEN)}<circle cx="{x1+18:.1f}" cy="{cap-10:.1f}" r="10" fill="{GREEN}"/></svg>'
    out_svg = (f'<svg viewBox="{x0-6:.1f} {y0-6:.1f} {x1-x0+12:.1f} {y1-y0+12:.1f}" aria-hidden="true"><g fill="none" stroke="{INK}" stroke-width="2.4">'
               + "".join(f'<path d="{d}"/>' for d in bp.W["ink"]) + f'</g><circle cx="{dcx}" cy="{dcy}" r="{dr}" fill="{GREEN}"/></svg>')
    g = bp.G; gx0, gy0, gx1, gy1 = g['bb']; gcx, gcy, gr = g['dot']
    side_dot = f'<svg viewBox="{gx0-4:.1f} {g["params"]["top"]-4:.1f} {gx1-gx0+70:.1f} {g["params"]["cap"]+8:.1f}" aria-hidden="true"><path fill="{INK}" d="{g["d"]}"/><circle cx="{gx1+34:.1f}" cy="{gy1-gr:.1f}" r="{gr}" fill="{GREEN}"/></svg>'
    shadow = f'<div style="filter:drop-shadow(6px 8px 5px rgba(0,0,0,.45));width:76%">{word(style="width:100%;height:auto")}</div>'
    mis = [
        (f'<div style="display:flex;align-items:center;gap:16px;width:80%">{sym(h=70)}{word(style="flex:1;height:auto")}</div>', "Znak obok napisu."),
        (per_svg, "Kropka na końcu nazwiska."),
        (side_dot, "Kropka obok litery zamiast nad nią."),
        (up_svg, "Wersaliki i napis złożony z klawiatury."),
        (word(dot="#E1A52C", style="width:76%;height:auto"), "Inny kolor kropki."),
        (word(ink=GREEN, dot=GREEN, style="width:76%;height:auto"), "Napis w całości na zielono."),
        (f'<div style="transform:scale(1.3,0.72);width:60%">{word(style="width:100%;height:auto")}</div>', "Rozciąganie, ściskanie i pochylanie."),
        (out_svg, "Obrys zamiast wypełnienia."),
        (shadow, "Cień, poświata, gradient."),
        (f'<div style="transform:rotate(-14deg);width:70%">{word(style="width:100%;height:auto")}</div>', "Obracanie."),
        (f'<div style="opacity:.35;width:76%">{word(style="width:100%;height:auto")}</div>', "Zmniejszanie krycia."),
        (f'<div style="width:100%;height:100%;background:{GREEN};display:grid;place-items:center"><div style="width:76%">{word(ink=PAPER, dot=PAPER, style="width:100%;height:auto")}</div></div>', "Zieleń sygnałowa jako tło logo."),
    ]
    tiles = "".join(tile(inner, False, tx, "h1") for inner, tx in mis)
    page(top("Czego nie robić z logo", "Logo zawsze pochodzi z pliku i zostaje takie, jakie jest. Każdy przykład pokazuje jeden błąd.",
        f'<div class="grid g4" style="gap:30px 28px">{tiles}</div>', cls="tight"), title="Czego nie robić z logo")
