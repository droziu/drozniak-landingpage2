import os, sys, base64, html as H
sys.path.insert(0, os.path.dirname(__file__))
import book_parts as bp
from book_parts import INK, PAPER, GREEN, DEEP, MUTED, STONE, WHITE
from brandlib import wordmark
S = os.environ["S"]; F = f"{S}/fonts"
REPO = "/Users/stanislawdrozniak/strony_www/drozniak-landingpage"
OUT = sys.argv[1]
b64 = lambda p: base64.b64encode(open(p, "rb").read()).decode()
PHOTO1 = b64(f"{REPO}/public/images/home/portret-hero-800.jpg")
PHOTO2 = b64(f"{REPO}/public/images/home/portret-omnie-600.jpg")

pages = []      # (kind, html)
toc = []        # (title, page_no)
def page(body, field=False, cls="", footer=True):
    n = len(pages) + 1
    ft = f'<div class="ft"><span>Drożniak | Zasady marki</span><span>{n}</span></div>' if footer else ""
    pages.append(f'<section class="page{" field" if field else ""} {cls}">{body}{ft}</section>')
    return n

SECTIONS = ["O marce", "Logo", "Kolor", "Pismo", "Przestrzeń", "Elementy", "Zastosowania"]
def opener(title, line, idx):
    toc.append((title, len(pages) + 1))
    frac = 0.16 + 0.68 * idx / (len(SECTIONS) - 1)
    body = (f'<div class="op-motif"><span class="op-line" style="width:{frac*100:.1f}%"></span><span class="op-dot"></span></div>'
            f'<div class="op-text"><h2 class="op-title">{title}</h2><p class="op-lead">{line}</p></div>')
    page(body, field=True, cls="opener")

def split(title, intro, left_extra, right, wide=False):
    return (f'<div class="split{" wide" if wide else ""}"><div class="col-text"><h2>{title}</h2>'
            f'<p class="intro">{intro}</p>{left_extra}</div><div class="col-fig">{right}</div></div>')

def notes(items):
    return '<div class="notes">' + "".join(f'<div class="note"><h3>{h}</h3><p>{t}</p></div>' for h, t in items) + '</div>'

word = lambda **k: bp.word_svg(**k)
sym = lambda **k: bp.sym_svg(**k)

# ------------------------------------------------------------------ 1 cover
page(f'''<div class="cover-word">{word(ink=PAPER, dot=GREEN)}</div>
<div class="cover-foot"><p class="cover-title">Zasady marki</p><p class="cover-meta">Wersja 1.0<br>Listopad 2026</p></div>''', field=True, cls="cover", footer=False)
page("<!--toc-->")  # placeholder, filled later

# ------------------------------------------------------------------ O marce
opener("O marce", "Kim jest Drożniak, dla kogo pracuje i skąd wziął się znak.", 0)
page(split("O marce",
    "Drożniak to marka Stanisława Drożniaka. Stanisław planuje i prowadzi marketing firm jako całość: reklamy, stronę, obsługę zapytań, automatyzacje i sprzedaż do klientów, którzy już raz kupili.",
    notes([("Dla kogo", "Właściciele firm, które chcą mieć jedną osobę od całego marketingu. Najczęściej to firmy do kilkudziesięciu osób. Większym Stanisław pomaga jako wsparcie zespołu albo szkoleniem."),
           ("Obietnica", "Zapytanie od klienta przechodzi od reklamy do sprzedaży i nigdzie po drodze nie utyka.")]),
    '''<div class="traits">
<div><h3>Konkretna</h3><p>Mówi, co zrobi, po co i w jakim czasie. Bez ogólników.</p></div>
<div><h3>Spokojna</h3><p>Bez wykrzykników, presji i obietnic bez pokrycia. Pewność bierze się z doświadczenia.</p></div>
<div><h3>Rzetelna</h3><p>Każdy etap da się sprawdzić. Klient wie, co działa i ile kosztuje.</p></div>
<div><h3>Prosta</h3><p>Pisze tak, żeby zrozumiał każdy właściciel firmy, także bez znajomości fachowych pojęć.</p></div>
</div>'''))

idea_fig = f'''<div class="idea-fig">
<svg viewBox="0 0 600 120" class="idea-line" aria-hidden="true"><rect x="0" y="52" width="470" height="16" fill="{INK}"/><circle cx="540" cy="60" r="34" fill="{GREEN}"/></svg>
<div class="idea-row">
<div><div class="idea-cell">{word()}</div><p>Kropka nad Ż w napisie</p></div>
<div><div class="idea-cell">{sym()}</div><p>Kropka wychodząca z D</p></div>
<div><div class="idea-cell"><svg viewBox="0 0 220 60" aria-hidden="true"><rect x="0" y="27" width="220" height="6" fill="{INK}"/><circle cx="20" cy="30" r="9" fill="{INK}"/><circle cx="80" cy="30" r="9" fill="{INK}"/><circle cx="140" cy="30" r="14" fill="{GREEN}"/><circle cx="200" cy="30" r="9" fill="{INK}"/></svg></div><p>Kropka na drodze klienta</p></div>
</div></div>'''
page(split("Pomysł",
    "„Drożny” znaczy przejezdny, bez zatorów. Mówi się o drożnej drodze albo drożnym przewodzie. Marka mówi to samo co praca Stanisława: droga od reklamy do sprzedaży jest wolna.",
    notes([("Linia", "Droga, proces, kolejne kroki. Zawsze jednej grubości."),
           ("Kropka", "Klient, zapytanie, cel. Pochodzi znad litery Ż w nazwisku. To jedyne miejsce, w którym pojawia się kolor marki.")]),
    idea_fig))

# ------------------------------------------------------------------ Logo
opener("Logo", "Napis, znak i zasady, które pilnują, żeby zawsze wyglądały tak samo.", 1)
page(split("Logo główne",
    "Logo główne to napis „Drożniak”. Używamy go wszędzie, gdzie jest miejsce na całe nazwisko: na stronie, w dokumentach, ofertach, prezentacjach, na przodzie wizytówki i w podpisie maila.",
    notes([("Zapis", "Wielkie D, reszta małymi literami. Bez kropki na końcu i bez wersalików, bo wersalikami łatwo zgubić kropkę nad Ż."),
           ("Kropka", "Kropka nad Ż jest okrągła i większa niż w kroju. To podpis marki i jedyny element w kolorze.")]),
    f'<div class="fig-panel big-word">{word()}</div>'))
page(split("Znak",
    "Znak to litera D, z której przez przerwę w łuku wychodzi kropka. Litera jest otwarta, nic nie zatrzymuje drogi. Całość czyta się też jak „D.”, skrót nazwiska.",
    notes([("Gdzie", "Awatar, favikona, ikona aplikacji, tył wizytówki, róg filmu, pieczątka, tłoczenie, gadżety."),
           ("Małe rozmiary", "Poniżej 32 px na ekranie i 8 mm w druku używamy wersji małej, z grubszą kreską i większą przerwą. Zwykła wersja w tych rozmiarach zlewa się w plamę.")]),
    f'''<div class="fig-panel sym-pair"><div>{sym()}<p>Wersja podstawowa</p></div><div>{sym(small=True)}<p>Wersja mała, do 32 px i 8 mm</p></div></div>'''))

wrong_pair = f'<div class="wrong-pair">{sym(style="height:12mm")}{word(style="height:11mm")}</div>'
page(split("Napis czy znak",
    "Na jednej powierzchni pojawia się napis albo znak. Postawione obok siebie czytają się jak „D. Drożniak”, czyli jak inicjał imienia i nazwisko, a Stanisław nie ma na imię na D.",
    notes([("Jeśli potrzebne są oba", "Rozdzielamy je na różne powierzchnie: napis na przodzie wizytówki, znak na tyle. Napis w nagłówku strony, znak jako favikona.")]),
    f'''<div class="use-table">
<div class="use-col"><div class="use-mark">{word(style="height:13mm")}</div><h3>Napis</h3><ul><li>Nagłówek strony</li><li>Dokumenty i oferty</li><li>Prezentacje</li><li>Przód wizytówki</li><li>Podpis maila</li><li>Faktury</li></ul></div>
<div class="use-col"><div class="use-mark">{sym(style="height:15mm")}</div><h3>Znak</h3><ul><li>Awatar w mediach społecznościowych</li><li>Favikona i ikona aplikacji</li><li>Tył wizytówki</li><li>Znak w rogu filmu</li><li>Pieczątka i tłoczenie</li><li>Gadżety</li></ul></div>
<div class="use-col no"><div class="use-mark">{wrong_pair}</div><h3>Nigdy razem</h3><p>Znak przed napisem daje „D. Drożniak”. Tego układu nie ma i nie składamy go sami.</p></div>
</div>'''))

page(split("Budowa znaku",
    "Znak powstał z prostych figur na siatce 256 jednostek. Kąty są pełne, a miary się powtarzają, więc znak da się odtworzyć bez zgadywania.",
    notes([("Wersja podstawowa", "Trzon 34 jednostki. Belki poziome 32, bo pozioma kreska tej samej grubości wygląda na grubszą. Łuk to okrąg o promieniu 88 na zewnątrz i elipsa 54 × 56 w środku. Przerwa od 22,5° do 67,5°. Kropka o średnicy 44 leży na osi 45°."),
           ("Wersja mała", "Trzon 46, belki 44, kropka 58, przerwa od 15° do 75°. Grubsze kreski i szersza przerwa nie zlewają się przy 16 px.")]),
    f'<div class="fig-panel construct">{bp.construction()}</div>'))

wd = bp.word_dims()
def word_construct():
    x0, y0, x1, y1 = wd['bb']; cap, xh = wd['cap'], wd['xh']; K = wd['K']
    lm = 'stroke="#8C877B" stroke-width="0.9" stroke-dasharray="4 3"'
    lines = "".join(f'<line x1="{x0-10:.1f}" y1="{y:.1f}" x2="{x1+10:.1f}" y2="{y:.1f}" {lm}/>' for y in (0, cap - xh, cap))
    lab = lambda y, t: f'<text x="{x0-14:.1f}" y="{y+5:.1f}" font-size="15" fill="{MUTED}" text-anchor="end" font-family="Schibsted Grotesk">{t}</text>'
    dcx, dcy, r = bp.W['dots'][0]
    k = (f'<line x1="{dcx-r:.1f}" y1="{dcy-r-12:.1f}" x2="{dcx+r:.1f}" y2="{dcy-r-12:.1f}" stroke="{GREEN}" stroke-width="1.6"/>'
         f'<text x="{dcx:.1f}" y="{dcy-r-20:.1f}" font-size="16" fill="{GREEN}" text-anchor="middle" font-weight="600" font-family="Schibsted Grotesk">K</text>')
    return (f'<svg viewBox="{x0-14:.1f} {y0-40:.1f} {x1-x0+28:.1f} {y1-y0+52:.1f}" aria-hidden="true">{lines}'
            f'{bp._word_inner(INK, GREEN)}{k}</svg>')
page(split("Budowa napisu",
    "Napis jest złożony krojem Brygada 1918 w odmianie 600 i zamieniony na krzywe. Jedyna zmiana względem kroju to kropka nad Ż: idealne koło, większe o jedną czwartą od kropki z kroju.",
    notes([("Miary", "Przy wysokości wersalika 100 małe litery mają 69, a kropka 26. Średnica kropki to miara K, od której liczymy pole ochronne napisu."),
           ("Nie z klawiatury", "Napisu nie składamy fontem w programie. Zawsze używamy pliku z folderu logo, bo tylko on ma właściwą kropkę i odstępy."),
           ("Na przyszłość", "Gdy marka urośnie, warto zlecić projektantowi pisma przerysowanie kilku liter. Wtedy napis będzie w całości własny, a nie oparty na wolnym kroju.")]),
    f'''<div class="fig-panel wc"><div>{word_construct()}<dl class="wc-leg"><dt>Górna linia</dt><dd>wysokość wersalików, 100</dd><dt>Środkowa linia</dt><dd>wysokość małych liter, 69</dd><dt>Dolna linia</dt><dd>linia pisma</dd><dt>K</dt><dd>średnica kropki nad Ż, 26</dd></dl></div></div>'''))

page(split("Pole ochronne",
    "Wokół logo zostaje pusty margines, w który nic nie wchodzi: tekst, zdjęcie ani krawędź kartki. Miarą jest kropka z danego logo, oznaczona jako K.",
    notes([("Napis", "Co najmniej 3K z każdej strony. To mniej więcej wysokość małej litery."),
           ("Znak", "Co najmniej 1K z każdej strony."),
           ("Minimum to nie cel", "To najmniejszy dopuszczalny odstęp. W praktyce zostawiamy więcej, bo logo z zapasem przestrzeni wygląda pewniej.")]),
    f'<div class="clear-fig"><div class="cf-word">{bp.clear_word()}<p>Napis: 3K</p></div><div class="cf-sym">{bp.clear_sym()}<p>Znak: 1K</p></div></div>'))

# true-scale sizes (mm)
wr = wd['h'] / wd['w']; sd = bp.sym_dims(); sr = sd['w'] / sd['h']
def mmw(wmm, **k): return f'<div class="ts"><div style="width:{wmm}mm;height:{wmm*wr:.2f}mm">{word(**k)}</div><p>{wmm} mm</p></div>'
def mmh(hmm, small=False, **k): return f'<div class="ts"><div style="height:{hmm}mm;width:{hmm*sr:.2f}mm">{sym(small=small, **k)}</div><p>{hmm} mm{" mała" if small else ""}</p></div>'
page(split("Minimalne rozmiary",
    "Poniżej tych rozmiarów logo traci szczegóły. Rysunki na tej stronie mają prawdziwy rozmiar, gdy wydrukujesz ją w skali 100%.",
    '''<table class="spec"><tr><th></th><th>Ekran</th><th>Druk</th></tr>
<tr><td>Napis</td><td>96 px szerokości</td><td>20 mm szerokości</td></tr>
<tr><td>Napis w kolorze</td><td>od 120 px</td><td>od 25 mm</td></tr>
<tr><td>Znak</td><td>od 32 px wysokości</td><td>od 8 mm</td></tr>
<tr><td>Znak, wersja mała</td><td>16 do 31 px</td><td>4 do 8 mm</td></tr></table>
<p class="small-note">Gdy kropka byłaby mniejsza niż 1 mm albo 5 px, logo przechodzi na wersję jednokolorową, bo zieleń w tak małym punkcie się nie odcina.</p>''',
    f'''<div class="ts-rows"><div class="ts-row">{mmw(20, ink=INK, dot=INK)}{mmw(25)}{mmw(40)}{mmw(60)}</div>
<div class="ts-row">{mmh(4, True)}{mmh(6, True)}{mmh(8)}{mmh(12)}{mmh(20)}</div></div>'''))

def tile(bg, ink, dot, label, txt, light=False):
    return (f'<div class="vtile" style="background:{bg}"><div class="vt-marks">{word(ink=ink, dot=dot, style="height:7mm")}{sym(ink=ink, dot=dot, style="height:11mm")}</div>'
            f'<div class="vt-cap{" on-dark" if not light else ""}"><h3>{label}</h3><p>{txt}</p></div></div>')
page(f'''<div class="top"><h2>Wersje kolorystyczne</h2><p class="intro">Są cztery wersje logo. Wybór zależy od tła, nie od gustu.</p></div>
<div class="vgrid">
{tile(PAPER, INK, GREEN, "Kolor", "Atrament i zielona kropka. Podstawowa wersja na papierze i bieli.", True)}
{tile(DEEP, PAPER, GREEN, "Negatyw", "Papier i zielona kropka. Na głębokiej zieleni i atramencie.")}
{tile(STONE, INK, INK, "Czarna", "Druk jednym kolorem, pieczątki, faktury, logo poniżej rozmiaru kolorowego.", True)}
{tile("#3B3A35", WHITE, WHITE, "Biała", "Na zdjęciach i kolorowych tłach, gdzie zielona kropka by zniknęła.")}
</div>''')

def bgtile(bg, ink, dot, ok, txt, photo=None, pos="50% 50%"):
    img = f'<img src="data:image/jpeg;base64,{PHOTO1}" style="object-position:{pos}">' if photo else ""
    return (f'<div class="bgt"><div class="bgt-box" style="background:{bg}">{img}<div class="bgt-mark">{word(ink=ink, dot=dot, style="height:7mm")}</div></div>'
            f'<p><b>{"Tak" if ok else "Nie"}.</b> {txt}</p></div>')
page(f'''<div class="top"><h2>Tła i zdjęcia</h2><p class="intro">Logo stoi na spokojnym, jednolitym tle. Na zdjęciu tylko w miejscu bez szczegółów, w wersji białej.</p></div>
<div class="bgrid">
{bgtile(PAPER, INK, GREEN, True, "Papier")}{bgtile(WHITE, INK, GREEN, True, "Biel")}{bgtile(STONE, INK, GREEN, True, "Kamień")}{bgtile(DEEP, PAPER, GREEN, True, "Głęboka zieleń")}
{bgtile(INK, PAPER, GREEN, True, "Atrament")}{bgtile(INK, WHITE, WHITE, True, "Spokojny, ciemny fragment zdjęcia", photo=True, pos="50% 0%")}{bgtile(GREEN, PAPER, PAPER, False, "Zieleń sygnałowa jako tło")}{bgtile("#9A968C", INK, GREEN, False, "Średnia szarość, mały kontrast")}
</div>''')

# misuse
up = wordmark(f"{F}/Brygada1918[wght].ttf", 600, "DROŻNIAK", 100, x0=0, base=100)
up_svg = f'<svg viewBox="-4 -30 {up["width"]+8:.1f} 140" aria-hidden="true"><g fill="{INK}">' + "".join(f'<path d="{d}"/>' for d in up["ink"]) + '</g></svg>'
x0, y0, x1, y1 = wd['bb']
per_svg = f'<svg viewBox="{x0-4:.1f} {y0-4:.1f} {x1-x0+50:.1f} {y1-y0+8:.1f}" aria-hidden="true">{bp._word_inner(INK, GREEN)}<circle cx="{x1+18:.1f}" cy="{wd["cap"]-9:.1f}" r="9" fill="{INK}"/></svg>'
out_svg = f'<svg viewBox="{x0-6:.1f} {y0-6:.1f} {x1-x0+12:.1f} {y1-y0+12:.1f}" aria-hidden="true"><g fill="none" stroke="{INK}" stroke-width="2.4">' + "".join(f'<path d="{d}"/>' for d in bp.W["ink"]) + f'</g><circle cx="{bp.W["dots"][0][0]}" cy="{bp.W["dots"][0][1]}" r="{bp.W["dots"][0][2]}" fill="{GREEN}"/></svg>'
def mis(inner, txt, bg=PAPER):
    return f'<div class="mis"><div class="mis-box" style="background:{bg}">{inner}</div><p><b>Nie.</b> {txt}</p></div>'
page(f'''<div class="top"><h2>Czego nie robić</h2><p class="intro">Logo zawsze pochodzi z pliku. Nie przerabiamy go, nawet gdy wydaje się, że drobna zmiana nikomu nie zaszkodzi.</p></div>
<div class="mgrid">
{mis(f'<div class="wrong-pair">{sym(style="height:9mm")}{word(style="height:8mm")}</div>', "Znak obok napisu. Czyta się „D. Drożniak”.")}
{mis(per_svg, "Kropka na końcu nazwiska.")}
{mis(up_svg, "Wersaliki i składanie napisu z klawiatury. Łatwo zgubić Ż.")}
{mis(word(dot="#F2CE4B"), "Inny kolor kropki.")}
{mis(word(ink=GREEN, dot=GREEN), "Napis w całości na zielono.")}
{mis(f'<div style="transform:scale(1.35,0.75);width:62%">{word()}</div>', "Rozciąganie, ściskanie, pochylanie.")}
{mis(out_svg, "Obrysy, cienie, gradienty i inne efekty.")}
{mis(f'<img src="data:image/jpeg;base64,{PHOTO1}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 30%"><div style="position:relative;width:70%">{word()}</div>', "Logo na niespokojnym fragmencie zdjęcia.")}
</div>''')

# ------------------------------------------------------------------ Kolor
opener("Kolor", "Papier, atrament, głęboka zieleń i jedna zielona kropka.", 2)
colors = [
 ("Papier", PAPER, "246 245 241", "Druk: papier niepowlekany w złamanej bieli", "—", "Tło. Około 75% każdej powierzchni.", INK),
 ("Atrament", INK, "22 21 17", "Tekst: K 100. Duże pola: 40 40 50 100", "Neutral Black C", "Tekst, logo, przyciski.", PAPER),
 ("Grafit", MUTED, "94 90 80", "0 5 15 65", "—", "Tekst pomocniczy, podpisy.", PAPER),
 ("Głęboka zieleń", DEEP, "14 42 32", "85 45 75 70", "5535 C", "Jedna ciemna płaszczyzna: okładka, stopka, tył wizytówki.", PAPER),
 ("Zieleń sygnałowa", GREEN, "20 148 94", "85 10 75 5", "340 C", "Tylko kropka. Do 2% powierzchni.", PAPER),
]
sw = "".join(f'''<div class="sw"><div class="sw-chip" style="background:{h}"><span style="color:{t}">{n}</span></div>
<dl><dt>HEX</dt><dd>{h}</dd><dt>RGB</dt><dd>{rgb}</dd><dt>CMYK</dt><dd>{cmyk}</dd><dt>Pantone</dt><dd>{pms}</dd></dl><p>{role}</p></div>''' for n, h, rgb, cmyk, pms, role, t in colors)
page(f'''<div class="top"><h2>Paleta</h2><p class="intro">Pięć kolorów, każdy z jedną rolą. Wartości CMYK i Pantone to punkt wyjścia: przed pierwszym drukiem drukarnia robi próbę na papierze, na którym będzie drukować.</p></div>
<div class="swrow">{sw}</div>''')

page(split("Proporcje i role",
    "Kolor marki działa dlatego, że jest go mało. Gdy zielona kropka pojawia się w pięciu miejscach naraz, przestaje cokolwiek znaczyć.",
    notes([("Zieleń sygnałowa", "Tylko jako kropka: w logo, przy głównym przycisku i jako punkt na diagramie. Nigdy jako tekst, tło przycisku, nagłówek, ikona ani duża płaszczyzna."),
           ("Głęboka zieleń", "Raz na ekran albo stronę: okładka, slajd tytułowy, stopka strony, tył wizytówki. W dłuższych dokumentach, takich jak ta księga, także strony otwierające rozdziały."),
           ("Szarości", "Poza grafitem nie dodajemy innych szarości. Jaśniejsza powierzchnia to kamień #ECEAE3, jeden krok od papieru.")]),
    f'''<div class="prop">
<div class="prop-bar"><span style="flex:75;background:{PAPER}"></span><span style="flex:16;background:{INK}"></span><span style="flex:5;background:{DEEP}"></span><span style="flex:2.2;background:{GREEN}"></span></div>
<div class="prop-legend"><p><b>75%</b> papier i biel</p><p><b>18%</b> atrament, grafit, zdjęcia</p><p><b>5%</b> głęboka zieleń</p><p><b>2%</b> zieleń sygnałowa</p></div>
<div class="prop-demo">
<div class="pd-paper"><div class="pd-bar">{word(style="height:5mm")}<span class="pd-btn"><i></i>Umów rozmowę</span></div><p class="pd-h">Marketing i pozyskiwanie klientów dla firm</p><p class="pd-t">Planuję i prowadzę wszystkie części marketingu firmy.</p></div>
<div class="pd-deep"><p>Porozmawiajmy</p>{sym(ink=PAPER, style="height:9mm")}</div>
</div></div>'''))

pairs = [("Atrament na papierze", INK, PAPER, "16,7:1", "Każdy tekst"), ("Grafit na papierze", MUTED, PAPER, "6,3:1", "Tekst pomocniczy"),
         ("Papier na głębokiej zieleni", PAPER, DEEP, "14,0:1", "Każdy tekst"), ("Papier na atramencie", PAPER, INK, "16,7:1", "Każdy tekst"),
         ("Zieleń na papierze", GREEN, PAPER, "3,5:1", "Tylko kropka i grafika"), ("Zieleń na głębokiej zieleni", GREEN, DEEP, "4,0:1", "Tylko kropka i grafika"),
         ("Biały na zieleni", WHITE, GREEN, "3,9:1", "Nie: za słabo na przycisk")]
rows = "".join(f'<tr><td><span class="pair" style="background:{bg};color:{fg}">Aa</span></td><td>{n}</td><td>{r}</td><td>{u}</td></tr>' for n, fg, bg, r, u in pairs)
page(split("Kontrast",
    "Tekst musi mieć kontrast co najmniej 4,5:1, a duże nagłówki i grafika 3:1. To wymagania standardu dostępności WCAG.",
    notes([("Dlaczego zieleń nie jest kolorem tekstu", "Zieleń sygnałowa ma na papierze 3,5:1. Wystarcza na kropkę i elementy graficzne, ale nie na tekst. Linki są w atramencie i podkreślone."),
           ("Dlaczego przyciski są czarne", "Biały napis na zieleni ma 3,9:1, za mało dla zwykłego tekstu przycisku. Przycisk jest atramentowy, a zielona kropka stoi przy napisie.")]),
    f'<table class="contrast"><tr><th></th><th>Para</th><th>Kontrast</th><th>Do czego</th></tr>{rows}</table>'))

# ------------------------------------------------------------------ Pismo
opener("Pismo", "Polski szeryf do nazwiska i nagłówków, grotesk do tekstu.", 3)
glyph_line = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPRSŚTUWYZŹŻ<br>aąbcćdeęfghijklłmnńoóprsśtuwyzźż<br>0123456789 „ ” ( ) % zł"
page(f'''<div class="spec-page"><div class="sp-left"><p class="sp-big disp">Pozyskuję klientów dla firm</p><p class="sp-glyphs disp">{glyph_line}</p></div>
<div class="sp-right"><h2>Brygada 1918</h2><p class="intro">Do nazwiska, nagłówków i krótkich wyróżnień.</p>
{notes([("Pochodzenie", "Polski krój odtworzony w 2018 roku na stulecie niepodległości przez studio Capitalics, na podstawie katalogu Państwowej Odlewni Czcionek z 1954 roku i odnalezionych matryc."),
        ("Odmiany", "500 do dużych nagłówków, 600 do nagłówków średnich i napisu w logo. Kursywę zostawiamy na cytaty."),
        ("Licencja", "SIL Open Font License. Wolno używać w logo, na stronie, w druku i w dokumentach bez opłat. Do pobrania z Google Fonts.")])}
<div class="weights"><span class="disp" style="font-weight:500">Drożniak 500</span><span class="disp" style="font-weight:600">Drożniak 600</span><span class="disp" style="font-weight:500;font-style:italic">Kursywa</span></div></div></div>''')
page(f'''<div class="spec-page"><div class="sp-left"><p class="sp-big txt">Planuję i prowadzę cały marketing firmy</p><p class="sp-glyphs txt">{glyph_line}</p></div>
<div class="sp-right"><h2>Schibsted Grotesk</h2><p class="intro">Do tekstu, menu, przycisków, tabel i podpisów.</p>
{notes([("Pochodzenie", "Krój zaprojektowany przez Bakken & Bæck dla norweskiej grupy medialnej Schibsted, z myślą o ekranach."),
        ("Odmiany", "400 do tekstu, 500 do przycisków i menu, 600 do wyróżnień w tekście. Bez odmian cieńszych niż 400, bo na ekranie słabną."),
        ("Licencja", "SIL Open Font License, tak jak Brygada. Do pobrania z Google Fonts.")])}
<div class="weights"><span class="txt" style="font-weight:400">Tekst 400</span><span class="txt" style="font-weight:500">Przycisk 500</span><span class="txt" style="font-weight:600">Wyróżnienie 600</span></div></div></div>''')

scale = [("Wielki nagłówek", "disp", 500, "44–112 px", "48–72 pt", "1,0", "−2%", "Stanisław Drożniak"),
         ("Nagłówek sekcji", "disp", 600, "32–56 px", "24–32 pt", "1,05", "−1,5%", "Pozyskiwanie klientów"),
         ("Podtytuł i wstęp", "disp", 600, "22–28 px", "13–14 pt", "1,2", "−1%", "Stała współpraca"),
         ("Tekst", "txt", 400, "17 px", "10–11 pt", "1,55", "0", "Zapytania trafiają do jednego arkusza."),
         ("Mały", "txt", 500, "14 px", "8 pt", "1,45", "0", "Podpis pod zdjęciem")]
srows = "".join(f'<tr><td><span class="{c}" style="font-weight:{w};font-size:{[22,15,11.5,9.5,7.6][i]}pt;line-height:1.1">{ex}</span></td><td>{n}</td><td>{px}</td><td>{pt}</td><td>{lh}</td><td>{tr}</td></tr>' for i, (n, c, w, px, pt, lh, tr, ex) in enumerate(scale))
page(f'''<div class="top"><h2>Skala pisma</h2><p class="intro">Pięć rozmiarów i ani jednego więcej. Duże są wyraźnie duże, małe wyraźnie małe. Na komputerze wielki nagłówek ma ponad sześć razy tyle co tekst.</p></div>
<table class="scale"><tr><th>Przykład</th><th>Rola</th><th>Ekran</th><th>Druk</th><th>Interlinia</th><th>Światło</th></tr>{srows}</table>
<p class="small-note wide">Mniejsza wartość dotyczy telefonu, większa szerokiego ekranu. Przyciski i menu mają rozmiar tekstu, etykiety, chipy i pola formularzy rozmiar mały. Tytuł dokumentu, czyli artykułu albo polityki, ma rozmiar nagłówka sekcji. Wyjątkiem są tylko ilustracje interfejsu na stronie, które mają własne drobne rozmiary, bo są obrazkami. Długość wiersza w tekście 45 do 75 znaków, tekst wyrównany do lewej.</p>''')

page(split("Skład po polsku",
    "Drobne zasady, po których od razu widać, że tekst złożył ktoś staranny.",
    "",
    '''<div class="rules2">
<div><h3>Cudzysłowy</h3><p>„Polskie” u dołu i u góry. Wewnątrz cytatu ‚pojedyncze’.</p></div>
<div><h3>Sierotki</h3><p>Jednoliterowe słowa (a, i, o, u, w, z) nie zostają na końcu wiersza. Wstawiamy po nich twardą spację.</p></div>
<div><h3>Kreski</h3><p>W zdaniach nie używamy myślników. Półpauza tylko w zakresach: 9–17, 2025–2026, 2–3 tygodnie.</p></div>
<div><h3>Liczby</h3><p>Tysiące ze spacją, ułamki z przecinkiem: 12 500 zł, 3,5%. Waluta po liczbie: 900 zł.</p></div>
<div><h3>Nagłówki</h3><p>Wielka litera tylko na początku. Bez kropki na końcu i bez wersalików.</p></div>
<div><h3>Separatory</h3><p>Zamiast kropki środkowej „·” używamy przecinka, kreski pionowej albo nowej linii.</p></div>
<div><h3>Daty i telefon</h3><p>9 listopada 2026 albo 9.11.2026. Telefon w grupach: +48 792 491 196.</p></div>
<div><h3>Wyróżnienia</h3><p>Pogrubienie albo większy rozmiar. Bez podkreśleń w tekście, bez koloru i bez kursywy dla ozdoby.</p></div>
</div>''', wide=True))

# ------------------------------------------------------------------ Przestrzeń
opener("Przestrzeń", "Odstępy, marginesy i siatki. To one dają marce oddech.", 4)
steps = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192]
bars = "".join(f'<div class="stp"><span style="width:{s*0.17:.1f}mm;height:{s*0.17:.1f}mm"></span><p>{s}</p></div>' for s in steps)
page(split("Odstępy",
    "Wszystkie odstępy pochodzą z jednej skali opartej na 8 px. Dzięki temu strona, dokument i prezentacja mają ten sam rytm.",
    notes([("Bliżej to razem", "Odstęp między grupami jest co najmniej dwa razy większy niż odstęp wewnątrz grupy. Nagłówek stoi bliżej swojego tekstu niż poprzedniej sekcji."),
           ("Jedna rzecz na raz", "Na każdym ekranie, slajdzie i stronie jedna rzecz dominuje: nagłówek, zdjęcie albo liczba. Reszta jest wyraźnie mniejsza."),
           ("Pusto to nie błąd", "Na slajdach, w postach i na okładkach około 40% powierzchni zostaje pustej. To ta przestrzeń sprawia, że marka wygląda drogo i spokojnie.")]),
    f'''<div class="steps">{bars}</div>
<table class="spec gaps"><tr><th>Odstęp</th><th>Ekran</th><th>Druk</th></tr>
<tr><td>Nagłówek do tekstu</td><td>16–24 px</td><td>4–6 mm</td></tr>
<tr><td>Akapit do akapitu</td><td>16 px</td><td>4 mm</td></tr>
<tr><td>Blok do bloku w sekcji</td><td>48–64 px</td><td>12–16 mm</td></tr>
<tr><td>Sekcja do sekcji</td><td>128–192 px, telefon 80–96</td><td>nowa strona albo 30 mm</td></tr></table>'''))

def gridfig(label, w, h, m, cols, note):
    cw = (w - 2 * m); colw = cw / cols
    colrects = "".join(f'<rect x="{m + i*colw + colw*0.08:.1f}" y="{m:.1f}" width="{colw*0.84:.1f}" height="{h-2*m:.1f}" fill="{GREEN}" opacity=".10"/>' for i in range(cols))
    return (f'<div class="gf"><svg viewBox="0 0 {w} {h}" aria-hidden="true"><rect width="{w}" height="{h}" fill="{WHITE}"/>'
            f'<rect x="{m}" y="{m}" width="{w-2*m}" height="{h-2*m}" fill="{STONE}"/>{colrects}</svg><h3>{label}</h3><p>{note}</p></div>')
page(f'''<div class="top"><h2>Siatki i marginesy</h2><p class="intro">Każdy format ma stały margines i siatkę kolumn. Treść zaczyna się na tej samej lewej krawędzi, a margines nigdy nie jest mniejszy niż tu podany.</p></div>
<div class="grids">
{gridfig("Strona internetowa", 1440, 900, 40, 12, "12 kolumn, odstęp 24 px. Treść do 1440 px, margines boczny 16–40 px zależnie od szerokości.")}
{gridfig("Prezentacja 16:9", 1920, 1080, 112, 12, "1920 × 1080 px. Margines 112 px, 12 kolumn, odstęp 32 px.")}
{gridfig("Dokument A4", 210, 297, 20, 6, "Margines 20 mm, 6 kolumn, odstęp 5 mm. Tekst 10–11 pt.")}
{gridfig("Post 4:5", 1080, 1350, 80, 6, "1080 × 1350 px. Margines 80 px. Znak w rogu najwyżej 64 px.")}
</div>''')

def slide(cramped):
    if cramped:
        return f'''<div class="sl cramped"><div class="sl-in">{word(style="height:4.2mm")}<p class="sl-h">Pozyskiwanie klientów dla firm</p><p class="sl-t">Planuję i prowadzę wszystkie części marketingu: reklamy, stronę, obsługę zapytań i automatyzacje. Pracowałem już m.in. z firmami z branży usługowej, turystycznej i sprzedaży internetowej.</p><div class="sl-row"><span>Reklamy</span><span>Strona</span><span>Zapytania</span><span>Automatyzacje</span><span>Mailing</span></div><span class="sl-btn"><i></i>Umów rozmowę</span></div></div>'''
    return f'''<div class="sl airy"><div class="sl-in">{word(style="height:3.6mm")}<p class="sl-h">Pozyskiwanie klientów dla firm</p><p class="sl-t">Planuję i prowadzę wszystkie części marketingu firmy.</p><span class="sl-btn"><i></i>Umów rozmowę</span></div></div>'''
page(f'''<div class="top"><h2>Oddech w praktyce</h2><p class="intro">Ta sama treść dwa razy. Po lewej wszystko jest ważne, więc nic nie jest. Po prawej zostaje jedna myśl, a reszta trafia na kolejny slajd.</p></div>
<div class="compare"><div>{slide(True)}<p><b>Za ciasno.</b> Margines 3%, pięć elementów tej samej wagi, tekst na całą szerokość.</p></div>
<div>{slide(False)}<p><b>Dobrze.</b> Margines 6%, jeden nagłówek, jedno zdanie, jeden przycisk. Około połowy slajdu jest pusta.</p></div></div>''')

# ------------------------------------------------------------------ Elementy
opener("Elementy", "Linia, kropka, ikony, ruch, zdjęcia i sposób pisania.", 5)
proc = f'''<svg viewBox="0 0 640 150" class="proc" aria-hidden="true">
<rect x="40" y="55" width="560" height="10" fill="{INK}"/>
{"".join(f'<circle cx="{x}" cy="60" r="14" fill="{INK}"/>' for x in (40, 227, 413, 600))}
<circle cx="227" cy="60" r="24" fill="{GREEN}"/>
{"".join(f'<text x="{x}" y="118" font-size="17" text-anchor="middle" fill="{INK}" font-family="Schibsted Grotesk">{t}</text>' for x, t in ((40, "Reklama"), (227, "Zapytanie"), (413, "Rozmowa"), (600, "Sprzedaż")))}
</svg>'''
page(split("Linia i kropka",
    "Schematy, procesy i ilustracje budujemy z tych samych dwóch elementów co logo. Dzięki temu każdy diagram wygląda jak część marki.",
    notes([("Linia", "Jedna grubość w całym rysunku, w atramencie. Bez strzałek, cieni i gradientów. Kierunek pokazuje kolejność."),
           ("Kropka", "Jedna zielona kropka na rysunek. Oznacza to, o czym mowa: klienta, zapytanie albo bieżący krok. Pozostałe punkty są atramentowe."),
           ("Ikony", "Liniowe, w atramencie, z jednej rodziny (na stronie Phosphor, grubość regular). Bez ikon w kolorowych kwadratach i bez zielonych ikon.")]),
    f'<div class="fig-panel">{proc}</div>'))

pts = bp.motion_points(5)
frames = "".join(f'<div class="mf">{bp.motion_frame(p)}</div>' for p in pts)
page(split("Ruch",
    "W animacji kropka przechodzi przez znak i wychodzi przez otwarty łuk. Tak samo porusza się na schematach: idzie po linii od reklamy do sprzedaży.",
    '''<table class="spec"><tr><th>Ruch</th><th>Czas</th></tr>
<tr><td>Przycisk, link, najechanie</td><td>150–250 ms</td></tr>
<tr><td>Wejście elementu na ekran</td><td>400–600 ms, przesunięcie 16–32 px</td></tr>
<tr><td>Animacja znaku</td><td>2,3 s ruchu, 2,6 s pauzy</td></tr>
<tr><td>Krzywa</td><td>cubic-bezier(0.22, 0.61, 0.36, 1)</td></tr></table>
<p class="small-note">Gdy ktoś ma w systemie wyłączony ruch, kropka stoi od razu w miejscu docelowym. Animujemy tylko położenie i przezroczystość, nigdy kolory ani układ.</p>''',
    f'<div class="frames">{frames}</div>'))

page(split("Zdjęcia",
    "Prawdziwe zdjęcia, naturalne światło, spokojne tło. Zdjęcie pokazuje człowieka i pracę, a nie ilustruje pojęcie.",
    notes([("Tak", "Zdjęcia Stanisława, klientów za ich zgodą, miejsc i prawdziwej pracy. Jedno duże zdjęcie zamiast kilku małych."),
           ("Nie", "Zdjęcia stockowe z uśmiechniętymi ludźmi przy laptopie, filtry, barwienie na zielono, ramki i cienie. Tekstu nie kładziemy na zdjęciu, chyba że na spokojnym, ciemnym fragmencie.")]),
    f'''<div class="photos"><div class="ph"><img src="data:image/jpeg;base64,{PHOTO1}" style="object-position:50% 25%"><p><b>Tak.</b> Naturalne kolory, spokojne tło.</p></div>
<div class="ph"><img src="data:image/jpeg;base64,{PHOTO2}"><p><b>Tak.</b> Kadr z powietrzem dookoła.</p></div>
<div class="ph"><div class="tint"><img src="data:image/jpeg;base64,{PHOTO1}" style="object-position:50% 25%"></div><p><b>Nie.</b> Barwienie na kolor marki.</p></div></div>'''))

page(split("Jak piszemy",
    "Prosto i konkretnie, jak do właściciela firmy, który nie musi znać fachowych pojęć. Przykład z jego branży jest lepszy niż lista skrótów.",
    notes([("Zasady", "Krótkie zdania. Konkretne liczby i przykłady zamiast przymiotników. „My”, gdy mowa o wspólnej pracy z klientem. Bez wykrzykników, emotek i obietnic bez pokrycia. Tekst przed publikacją sprawdzamy zasadami skilla humanizer-pl.")]),
    '''<table class="say"><tr><th>Tak</th><th>Nie</th></tr>
<tr><td>Planuję i prowadzę wszystkie części marketingu firmy.</td><td>Kompleksowe, holistyczne wsparcie marketingowe na każdym etapie lejka.</td></tr>
<tr><td>Zapytania trafiają do jednego arkusza i nikt o nich nie zapomina.</td><td>Zero chaosu w leadach!</td></tr>
<tr><td>Hotel sprzedaje vouchery na miesiące, w których ma wolne pokoje.</td><td>Optymalizujemy LTV i CPL w modelu full-funnel.</td></tr>
<tr><td>Pracowałem już m.in. z Grupą Fibra i Widokownią.</td><td>Zaufały nam setki zadowolonych klientów.</td></tr></table>'''))

# ------------------------------------------------------------------ Zastosowania
opener("Zastosowania", "Wizytówka, awatar, podpis maila, prezentacje, dokumenty i strona.", 6)
card_front = f'''<div class="bc bc-f"><div class="bc-w">{word(style="height:5.2mm")}</div><div class="bc-who"><p class="bc-n">Stanisław Drożniak</p><p class="bc-r">Marketing i pozyskiwanie klientów</p><p class="bc-c">+48 792 491 196<br>stanislaw@drozniak.com<br>drozniak.com</p></div></div>'''
card_back = f'<div class="bc bc-b">{sym(ink=PAPER, style="height:13mm")}</div>'
page(split("Wizytówka",
    "Przód na papierze z napisem i danymi, tył w głębokiej zieleni ze znakiem. Rysunki obok mają prawdziwy rozmiar.",
    '''<table class="spec"><tr><td>Format</td><td>90 × 50 mm, spad 3 mm, margines bezpieczny 5 mm</td></tr>
<tr><td>Papier</td><td>Niepowlekany, złamana biel, 350–400 g/m²</td></tr>
<tr><td>Przód</td><td>Napis 30 mm szerokości. Imię i nazwisko Schibsted 600, 8,5 pt. Reszta 400, 7 pt</td></tr>
<tr><td>Tył</td><td>Pełne pole głębokiej zieleni, znak 13 mm wysokości na środku</td></tr>
<tr><td>Druk</td><td>CMYK albo atrament i Pantone 340 C na kropkę. Wersja premium: tył w Pantone 5535 C, znak tłoczony</td></tr></table>''',
    f'<div class="cards">{card_front}{card_back}</div>'))

sig = f'''<div class="sig"><p class="sig-n">Stanisław Drożniak</p><p class="sig-r">Marketing i pozyskiwanie klientów</p><div class="sig-w">{word(style="height:4.4mm")}</div><p class="sig-c">+48 792 491 196 | drozniak.com</p></div>'''
avatars = f'''<div class="avs"><div class="av av-d">{sym(ink=PAPER, small=True, style="height:46%")}</div><div class="av av-p">{sym(small=True, style="height:46%")}</div><div class="av sq">{sym(ink=PAPER, small=True, style="height:50%")}</div></div>'''
page(split("Awatar i podpis maila",
    "Wszędzie ten sam awatar: znak na głębokiej zieleni. Ludzie rozpoznają markę po kształcie, zanim przeczytają nazwę.",
    notes([("Awatar", "LinkedIn, Facebook, Instagram, wizytówka Google, komunikatory. Plik drozniak-awatar-1080.png. Jasna wersja tylko tam, gdzie tło serwisu jest ciemnozielone."),
           ("Podpis maila", "Imię i nazwisko, rola, napis 120 px szerokości (plik 240 px na ekrany Retina), telefon i adres strony. Bez cytatów, banerów i ikon wszystkich serwisów.")]),
    f'<div class="avsig">{avatars}{sig}</div>'))

page(split("Prezentacja i dokument",
    "Slajd tytułowy w głębokiej zieleni, kolejne na papierze. W dokumentach napis w lewym górnym rogu na marginesie, numer strony na dole.",
    notes([("Slajdy", "Jedna myśl na slajd. Nagłówek w Brygadzie, tekst w Schibsted. Znak w prawym dolnym rogu najwyżej 48 px, na slajdzie tytułowym napis."),
           ("Dokumenty i oferty", "A4, margines 20 mm. Napis 32 mm szerokości. Tekst 10,5 pt, interlinia 15 pt. Tabele bez pionowych linii.")]),
    f'''<div class="docs">
<div class="slide-t"><div>{word(ink=PAPER, style="height:6mm")}</div><p>Plan marketingu na 2027</p></div>
<div class="slide-c"><p class="sc-h">Skąd przychodzą zapytania</p><p class="sc-t">Najwięcej zapytań daje wyszukiwarka, ale najlepiej sprzedają się te z poleceń.</p>{sym(style="height:4mm;position:absolute;right:5mm;bottom:4.5mm")}</div>
<div class="a4"><div>{word(style="height:3.2mm")}</div><p class="a4-h">Oferta współpracy</p><p class="a4-t">Proponuję trzy warianty współpracy. Każdy zaczyna się od sprawdzenia, skąd dziś przychodzą zapytania i co się z nimi dzieje po drodze.</p><p class="a4-t">Pierwsze 30 dni to plan, pomiar i kampania startowa.</p><p class="a4-n">1</p></div>
</div>'''))

tokens = """:root {
  --papier: #F6F5F1;
  --kamien: #ECEAE3;
  --atrament: #161511;
  --grafit: #5E5A50;
  --gleboka-zielen: #0E2A20;
  --zielen: #14945E;  /* tylko kropka */
  --font-naglowki: "Brygada 1918", Georgia, serif;
  --font-tekst: "Schibsted Grotesk", system-ui, sans-serif;
  --t-display: clamp(44px, 7.4vw, 112px);
  --t-h2: clamp(32px, 3.9vw, 56px);
  --t-h3: clamp(22px, 1.9vw, 28px);
  --t-body: 17px;
  --t-small: 14px;
  --odstep: 8px;
  --ruch: cubic-bezier(0.22, 0.61, 0.36, 1);
}"""
page(split("Strona internetowa",
    "Strona korzysta z tych samych kolorów, krojów i odstępów co reszta marki. Zmienne w kodzie mają polskie nazwy ról, żeby każdy wiedział, do czego służą.",
    notes([("Przyciski", "Główny: atrament, tekst w papierze, zielona kropka przy napisie, pełne zaokrąglenie. Drugi: papier z atramentowym tekstem. Jeden główny przycisk na ekran."),
           ("Sekcje", "Papier, a raz na stronę głęboka zieleń, zwykle stopka. Sekcje oddziela przestrzeń i zmiana tła, nie linie i nie cienie."),
           ("Favikona", "Mała wersja znaku na głębokiej zieleni. Pliki w folderze logo/ikony/web.")]),
    f'''<div class="web"><pre>{H.escape(tokens)}</pre>
<div class="btns"><span class="b1"><i></i>Umów rozmowę</span><span class="b2">Zobacz realizacje</span></div></div>'''))

files = """logo/
  napis/   drozniak-napis-kolor.svg, -negatyw, -czarny, -bialy
  znak/    drozniak-znak-kolor.svg, -negatyw, -czarny, -bialy
           drozniak-znak-maly-*.svg   (16–31 px, 4–8 mm)
  png/     wszystkie wersje w PNG z przezroczystym tłem
  pdf/     wszystkie wersje w PDF do druku
  ikony/   awatar 1080 px, ikona aplikacji 1024 px
  ikony/web/  favicon.ico, favicon.svg, apple-touch-icon.png,
              icon-192.png, icon-512.png
wizytowka/  drozniak-wizytowka-druk.pdf (przód i tył ze spadem)"""
toc.append(("Pliki", len(pages) + 1))
page(split("Pliki",
    "Wszystkie pliki są w repozytorium strony, w folderze docs/brand. SVG to wzorzec, z którego powstaje reszta.",
    notes([("Który plik kiedy", "Strona i prezentacje: SVG. Word, Google Docs, social media: PNG. Drukarnia: PDF. Gdy drukarnia prosi o format AI albo EPS, otwiera PDF w Illustratorze."),
           ("Kroje", "Brygada 1918 i Schibsted Grotesk są w Google Fonts, także w Google Docs i Slides. Do Worda i PowerPointa instalujemy je z fonts.google.com.")]),
    f'<div class="fig-panel left"><pre class="tree">{H.escape(files)}</pre></div>'))

page(f'<div class="back">{sym(style="height:26mm")}<p>drozniak.com</p></div>', footer=False)

# ------------------------------------------------------------------ TOC
toc_html = "".join(f'<div class="toc-row"><span>{t}</span><span>{n}</span></div>' for t, n in toc)
pages[1] = pages[1].replace("<!--toc-->", f'<div class="toc"><h2>Spis treści</h2><div class="toc-list">{toc_html}</div><p class="intro toc-intro">Ta księga opisuje, jak wygląda i jak brzmi marka Drożniak. Jest dla Stanisława i dla każdego, kto przygotowuje dla niej materiały: drukarni, grafika, montażysty, programisty.</p></div>')

css = open(os.path.join(os.path.dirname(__file__), "book.css")).read().replace("%F%", F)
open(OUT, "w").write(f'<!doctype html><html lang="pl"><head><meta charset="utf-8"><title>Drożniak, zasady marki</title><style>{css}</style></head><body>{"".join(pages)}</body></html>')
print("pages", len(pages), "toc", toc)
