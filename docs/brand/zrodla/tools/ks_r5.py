"""Księga marki: rozdziały Elementy graficzne oraz Ruch i wideo."""
from ks_core import *
import math
import ruch_znaku as rz

def photo(url, w, h, pos="50% 22%", r=0, extra=""):
    return f'<div class="photo" style="width:{w}px;height:{h}px;background-image:url({url});background-position:{pos};border-radius:{r}px;flex:none;{extra}"></div>'

def icon(kind, s=64, col=INK):
    """Kilka ikon liniowych w stylu Phosphor Regular (siatka 32, kreska 2)."""
    P = {
        "telefon": '<path d="M9 5h14a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"/><path d="M13 22.5h6"/>',
        "koperta": '<rect x="4" y="7" width="24" height="18" rx="1.5"/><path d="M4.5 8 16 17.5 27.5 8"/>',
        "kalendarz": '<rect x="5" y="6" width="22" height="21" rx="1.5"/><path d="M5 12h22M11 4v4M21 4v4"/>',
        "wykres": '<path d="M5 26h22"/><path d="M9 26V16M16 26V7M23 26V12"/>',
        "lupa": '<circle cx="14.5" cy="14.5" r="8.5"/><path d="m21 21 6 6"/>',
        "osoba": '<circle cx="16" cy="11" r="5.5"/><path d="M5.5 27c1.6-5.2 5.6-8 10.5-8s8.900 2.8 10.5 8"/>',
    }[kind]
    return f'<svg viewBox="0 0 32 32" width="{s}" height="{s}" fill="none" stroke="{col}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{P}</svg>'

MINI = ["F1_skad_brac_klientow", "F2_wiecej_przychodu", "F3_ai_w_malej_firmie"]
def mini(nazwa, w):
    """Miniatura filmu z folderu zrodla/miniatury (kopie wzorów ze studia grafik)."""
    return f'<img src="file://{S}/miniatury/{nazwa}.jpg" style="display:block;width:{w}px;height:{w*9/16:.0f}px;border-radius:{max(4, w/45):.0f}px;box-shadow:0 0 0 1.5px {LINE2}">'

def frame_film(inner, sc=0.42, bg=None):
    base = abs_(0, 0, photo(PHOTO1, 1920, 1080, "50% 14%")) + abs_(0, 0, '<div style="width:1920px;height:1080px;background:rgba(0,0,0,.18)"></div>')
    return mock(1920, 1080, sc, (base if bg is None else "") + inner, bg=bg or INK)

def build():
    # ============================================================ ELEMENTY
    opener("Elementy")
    L = 14
    dim = lambda x0, x1, y, t: (f'<line x1="{x0}" y1="{y}" x2="{x1}" y2="{y}" stroke="{GREEN}" stroke-width="2"/><line x1="{x0}" y1="{y-7}" x2="{x0}" y2="{y+7}" stroke="{GREEN}" stroke-width="2"/>'
                                f'<line x1="{x1}" y1="{y-7}" x2="{x1}" y2="{y+7}" stroke="{GREEN}" stroke-width="2"/><text x="{(x0+x1)/2}" y="{y+30}" text-anchor="middle" font-size="20" font-weight="600" fill="{GREEN}" font-family="Schibsted Grotesk">{t}</text>')
    con = (f'<svg viewBox="0 0 900 190" style="width:100%;height:auto" aria-hidden="true">'
           f'<rect x="40" y="{60-L/2}" width="640" height="{L}" fill="{INK}"/><circle cx="40" cy="60" r="{L}" fill="{INK}"/><circle cx="360" cy="60" r="{L}" fill="{INK}"/>'
           f'<circle cx="{680 + L + 1.5*L}" cy="60" r="{1.5*L}" fill="{GREEN}"/>'
           f'{dim(26, 54, 108, "2L")}{dim(346, 374, 108, "2L")}{dim(680, 680 + L, 108, "L")}{dim(680 + L, 680 + 4*L, 108, "3L")}'
           f'<line x1="150" y1="{60-L/2}" x2="150" y2="{60+L/2}" stroke="{GREEN}" stroke-width="2"/><text x="150" y="40" text-anchor="middle" font-size="20" font-weight="600" fill="{GREEN}" font-family="Schibsted Grotesk">L</text></svg>')
    forms = f'''<div class="grid g3" style="gap:28px">
<div class="figc"><div class="panel pad-s" style="height:170px">{tor(380, 8, [0, .33, .66, 1], 2)}</div><p><b>Tor.</b> Linia z punktami. Pokazuje proces, a zielona kropka bieżący krok.</p></div>
<div class="figc"><div class="panel pad-s" style="height:170px"><svg viewBox="0 0 380 40" width="380" height="40" aria-hidden="true"><rect x="0" y="12" width="300" height="12" fill="{INK}"/><circle cx="330" cy="18" r="18" fill="{GREEN}"/></svg></div><p><b>Linia z kropką.</b> Otwiera okładkę, slajd i planszę. Między linią a kropką jest odstęp L.</p></div>
<div class="figc"><div class="panel pad-s" style="height:170px"><div style="display:grid;gap:14px;font-size:22px"><div style="display:flex;gap:14px;align-items:center">{dot(12, INK)}Plan</div><div style="display:flex;gap:14px;align-items:center">{dot(16)}<b>Kampania</b></div><div style="display:flex;gap:14px;align-items:center">{dot(12, INK)}Raport</div></div></div><p><b>Znacznik.</b> Sama kropka przed tekstem. Zielona oznacza to, co trwa albo jest dostępne.</p></div>
</div>'''
    page(split("Linia i kropka",
        "Wszystko, co marka rysuje, składa się z linii i kropki. To te same dwa elementy co w logo, więc każdy schemat wygląda jak część marki.",
        notes([("Proporcje", "Grubość linii to L. Punkty na linii mają średnicę 2L, zielona kropka 3L. Między końcem linii a kropką, do której linia prowadzi, jest odstęp L."),
               ("Linia", "Jedna grubość w całym rysunku, w atramencie albo w papierze na ciemnym tle. Prosta, pozioma albo pionowa. Bez strzałek, grotów i przerywania."),
               ("Kropka", "Jedna zielona na rysunek. Pozostałe punkty mają kolor linii.")]),
        f'<div class="grid" style="gap:36px"><div class="panel white" style="height:auto;padding:40px 44px">{con}</div>{forms}</div>'), title="Linia i kropka")

    vt = (f'<svg viewBox="0 0 420 430" width="420" height="430" aria-hidden="true"><rect x="19" y="20" width="8" height="390" fill="{INK}"/>'
          + "".join(f'<circle cx="23" cy="{20 + i*130}" r="{12 if i == 1 else 8}" fill="{GREEN if i == 1 else INK}"/><text x="56" y="{27 + i*130}" font-size="22" font-weight="{600 if i == 1 else 400}" fill="{INK}" font-family="Schibsted Grotesk">{t}</text><text x="56" y="{56 + i*130}" font-size="17" fill="{MUTED}" font-family="Schibsted Grotesk">{d}</text>'
                    for i, (t, d) in enumerate([("Tydzień 1", "Plan i pomiar"), ("Tydzień 2", "Kampania startowa"), ("Tydzień 3", "Pierwsze zapytania"), ("Tydzień 4", "Podsumowanie")])) + '</svg>')
    page(split("Schematy procesów",
        "Schemat pokazuje drogę: zapytania, klienta albo projektu. Czyta się go od lewej do prawej albo z góry na dół, więc strzałki nie są potrzebne.",
        notes([("Etapy", "Od trzech do siedmiu. Dłuższy proces dzielimy na dwa schematy."),
               ("Podpisy", "Pod punktem, jedno do trzech słów, w rozmiarze małym. Podpis bieżącego etapu w odmianie 600."),
               ("Rozgałęzienie", "Linia rozdziela się pod kątem prostym. Każda gałąź kończy się punktem. Pętlę rysujemy jako okrąg z kropką na obwodzie."),
               ("Czego nie ma", "Strzałek, ikon w kółkach, numerów w kółkach, kolorowych pól i cieni.")]),
        f'''<div class="grid" style="grid-template-columns:1fr 440px;gap:36px;height:100%">
<div class="grid" style="grid-template-rows:1fr 1fr;gap:36px">
<div class="panel white pad-s">{tor(560, 9, [0, .25, .5, .75, 1], 2, labels=["Reklama", "Strona", "Zapytanie", "Rozmowa", "Sprzedaż"], font=19)}</div>
<div class="panel deepbg pad-s">{tor(560, 9, [0, .25, .5, .75, 1], 4, ink=PAPER, green=GREEN_L, labels=["Reklama", "Strona", "Zapytanie", "Rozmowa", "Sprzedaż"], font=19)}</div></div>
<div class="panel white pad-s">{vt}</div></div>'''), title="Schematy procesów")

    icons = "".join(f'<div class="figc" style="text-align:center"><div style="display:grid;place-items:center;height:110px">{icon(k, 72)}</div><p>{k}</p></div>' for k in ["telefon", "koperta", "kalendarz", "wykres", "lupa", "osoba"])
    bad = (f'<div style="display:flex;gap:28px;align-items:center"><span style="display:grid;place-items:center;width:96px;height:96px;border-radius:50%;background:{T.GREENS[100]}">{icon("koperta", 52, GREEN)}</span>'
           f'<span style="display:grid;place-items:center;width:96px;height:96px;border-radius:20px;background:{GREEN}">{icon("wykres", 52, WHITE)}</span><span style="font-size:64px">📈</span></div>')
    page(split("Ikony",
        "Ikony są liniowe, w kolorze tekstu, z jednej rodziny: Phosphor w odmianie Regular. Ikona towarzyszy słowu, nigdy go nie zastępuje.",
        notes([("Rozmiar", "20 px przy tekście, 24 px w przyciskach i menu, 32 px przy podtytule. Kreska ma 1/16 wysokości ikony."),
               ("Kolor", "Atrament na jasnym tle, papier na ciemnym. Ikona nie jest zielona i nie stoi w kolorowym kole ani kwadracie."),
               ("Kiedy", "Przy danych kontaktowych, w menu, w ilustracjach interfejsu. Nie jako punktory i nie nad każdym nagłówkiem sekcji.")]),
        f'''<div class="grid" style="gap:36px">
<div class="panel white" style="height:auto;padding:36px 44px;display:block"><div class="grid g6">{icons}</div></div>
<div class="grid g2" style="gap:36px">
<div class="figc"><div class="panel" style="height:220px"><div style="display:grid;gap:16px;font-size:24px"><div style="display:flex;gap:16px;align-items:center">{icon("telefon", 26)}{T.TELEFON}</div><div style="display:flex;gap:16px;align-items:center">{icon("koperta", 26)}{T.MAIL}</div><div style="display:flex;gap:16px;align-items:center">{icon("kalendarz", 26)}Umów rozmowę</div></div></div><p><span class="tak">Tak.</span> Ikona w kolorze tekstu, obok słowa.</p></div>
<div class="figc"><div class="panel" style="height:220px">{bad}</div><p><span class="nie">Nie.</span> Ikona w kolorowym polu, zielona albo emotka.</p></div>
</div></div>'''), title="Ikony")

    crop = lambda w, h, pos, cap_, r=12, circ=False: f'<div class="figc" style="flex:none;width:{w}px">{photo(PHOTO1, w, h, pos, r, "border-radius:50%" if circ else "")}<p>{cap_}</p></div>'
    page(split("Portret",
        "Marka jest osobista, więc twarz Stanisława jest jej częścią tak samo jak logo. Wszystkie portrety pochodzą z jednej sesji albo wyglądają, jakby z niej pochodziły.",
        notes([("Światło i tło", "Światło dzienne, miękkie, z boku albo z przodu. Tło spokojne i prawdziwe: zieleń, ściana, wnętrze. Tła nie wycinamy i nie zastępujemy kolorem, poza miniaturami filmów."),
               ("Kadr", "Oczy na jednej trzeciej wysokości od góry. Twarz patrzy w obiektyw albo w stronę tekstu, nigdy poza kadr."),
               ("Ubiór i wyraz", "Jasna marynarka albo koszula, bez wzorów i napisów. Wyraz spokojny, bez pozowanego uśmiechu i skrzyżowanych rąk."),
               ("Obróbka", "Naturalne kolory. Bez filtrów, barwienia na zielono, mocnego wygładzania i sztucznego rozmycia tła.")]),
        f'''<div class="row" style="gap:24px;align-items:flex-end">
{crop(270, 338, "50% 20%", "<b>4:5</b> strona, post, okładka")}
{crop(210, 210, "50% 10%", "<b>1:1</b> profil, podpis")}
{crop(170, 170, "50% 8%", "<b>Koło</b> awatar osobisty", circ=True)}
<div class="figc" style="flex:none;width:270px">{photo(PHOTO1, 270, 152, "50% 13%", 12)}<p><b>16:9</b> film, miniatura</p>
<div style="margin-top:22px;position:relative">{photo(PHOTO1, 270, 152, "50% 13%", 12, "filter:grayscale(1) sepia(1) hue-rotate(95deg) saturate(2.4) brightness(.9)")}<span style="position:absolute;left:-4%;right:-4%;top:50%;height:5px;background:{ERR};transform:rotate(-20deg)"></span></div><p><span class="nie">Nie.</span> Barwienie na kolor marki.</p></div>
</div>'''), title="Portret")

    shot = (f'<div style="width:400px;background:{WHITE};border-radius:16px;box-shadow:inset 0 0 0 1.5px {LINE2};padding:26px 28px">'
            f'<p style="font-size:19px;font-weight:600;margin-bottom:14px">Zapytania, kwiecień 2027</p>'
            + "".join(f'<div style="display:grid;grid-template-columns:110px 1fr 70px;gap:14px;align-items:center;padding:11px 0;border-top:1.5px solid {LINE}"><span style="height:12px;background:{LINE2};border-radius:3px"></span><span style="font-size:17px">{s}</span><span class="tnum" style="font-size:17px;text-align:right">{v}</span></div>'
                      for s, v in [("Wyszukiwarka", "128"), ("Polecenia", "36"), ("Mailing", "58")]) + '</div>')
    page(split("Zdjęcia pracy i zrzuty ekranu",
        "Pokazujemy prawdziwą pracę: ekran z kampanią, arkusz z zapytaniami, spotkanie z klientem.",
        notes([("Zrzuty ekranu", "W ramce o promieniu 16 px i linii 1,5 px, na papierze albo kamieniu. Bez makiet laptopów i telefonów z odblaskami."),
               ("Dane klientów", "Nazwy, kwoty i adresy zasłaniamy paskiem w kolorze linii mocnej. Nie rozmywamy ich, bo rozmycie da się czasem odwrócić."),
               ("Zdjęcia", "Własne albo od klienta za jego zgodą. Jedno duże zamiast kilku małych. Bez zdjęć z banków zdjęć, grafik z AI udających zdjęcia, kolaży i ramek.")]),
        f'''<div class="grid g2" style="gap:36px;align-items:start">
<div class="figc"><div class="panel" style="height:420px">{shot}</div><p><span class="tak">Tak.</span> Zrzut w prostej ramce, dane klienta zasłonięte paskiem.</p></div>
<div class="figc"><div class="panel" style="height:420px"><div style="width:440px;height:290px;border-radius:22px;background:linear-gradient(135deg,#2b2b2b,#555);box-shadow:0 30px 50px rgba(0,0,0,.35);transform:perspective(900px) rotateY(-18deg) rotateX(6deg);display:grid;place-items:center"><div style="width:400px;height:250px;background:{WHITE};border-radius:6px"></div></div></div><p><span class="nie">Nie.</span> Makieta urządzenia w perspektywie, z cieniem i gradientem.</p></div>
</div>'''), title="Zdjęcia pracy i zrzuty ekranu")

    ui = lambda rows, hi: (f'<div style="width:400px;background:{WHITE};border-radius:16px;box-shadow:inset 0 0 0 1.5px {LINE2};padding:22px 24px;display:grid;gap:12px">'
                           + "".join(f'<div style="display:flex;gap:14px;align-items:center;padding:12px 14px;border-radius:8px;background:{STONE if i != hi else PAPER};font-size:19px">{icon(ic, 24)}<span style="flex:1">{t}</span>{dot(12) if i == hi else ""}</div>' for i, (ic, t) in enumerate(rows)) + '</div>')
    dense = (f'<div style="width:400px;background:{WHITE};border-radius:16px;box-shadow:inset 0 0 0 1.5px {LINE2};padding:16px;display:grid;grid-template-columns:1fr 1fr;gap:8px">'
             + "".join(f'<div style="background:{STONE};border-radius:8px;padding:8px 10px;font-size:11px;line-height:1.3"><b>{t}</b><br>CPL 41 zł, CTR 2,3%, ROAS 4,1, budżet 1 200 zł</div>' for t in ["Kampania A", "Kampania B", "Kampania C", "Kampania D", "Kampania E", "Kampania F"]) + '</div>')
    page(split("Ilustracje interfejsu",
        "Zamiast zrzutu ekranu można pokazać uproszczony fragment interfejsu: kilka wierszy, ikony i parę słów.",
        notes([("Zawartość", "Najwyżej trzy wiersze albo karty, najwyżej pięć słów w każdym, jedna zielona kropka. Prawdziwe nazwy narzędzi tylko wtedy, gdy o nich mowa."),
               ("Wygląd i ruch", "Biała karta, promień 16 px, linia 1,5 px, ikony liniowe, bez cieni. Jedna pętla trwająca 4–6 sekund: wiersz pojawia się, kropka przeskakuje na niego."),
               ("Czego unikamy", "Gęstych tablic z liczbami i miniaturowych raportów. Raport nie jest tym, co marka sprzedaje.")]),
        f'''<div class="grid g2" style="gap:36px;align-items:start">
<div class="figc"><div class="panel" style="height:420px">{ui([("koperta", "Nowe zapytanie"), ("telefon", "Oddzwonić dziś"), ("kalendarz", "Rozmowa w czwartek")], 1)}</div><p><span class="tak">Tak.</span> Trzy wiersze, kilka słów, jedna kropka.</p></div>
<div class="figc"><div class="panel" style="height:420px">{dense}</div><p><span class="nie">Nie.</span> Gęsta tablica liczb, której nikt nie przeczyta.</p></div>
</div>'''), title="Ilustracje interfejsu")

    # ============================================================ RUCH I WIDEO
    opener("Ruch i wideo")
    # krzywa
    bz = (f'<svg viewBox="-20 -20 340 340" width="300" height="300" aria-hidden="true"><rect x="0" y="0" width="300" height="300" fill="none" stroke="{LINE2}" stroke-width="1.5"/>'
          f'<path d="M0 300 C {0.22*300} {300-0.61*300}, {0.36*300} 0, 300 0" fill="none" stroke="{INK}" stroke-width="5"/>'
          f'<circle cx="300" cy="0" r="12" fill="{GREEN}"/><circle cx="0" cy="300" r="8" fill="{INK}"/></svg>')
    page(split("Zasady ruchu",
        "Ruch jest spokojny. Element rusza szybko i łagodnie się zatrzymuje. Odbija się tylko kropka: gdy ląduje na swoim miejscu, ugina się raz i wraca.",
        notes([("Jedna krzywa", f"Wszystkie przejścia poza lądowaniem kropki używają krzywej {T.EASE}."),
               ("Kropka", "Pojawia się skalą od zera, z punktu na punkt przeskakuje łukiem i ląduje z jednym ugięciem. Nie wchodzi kryciem, nie miga, nie obraca się i nie odbija się drugi raz."),
               ("Co animujemy", "Położenie i krycie, u kropki także skalę. Koloru, rozmiaru pisma i układu nie animujemy."),
               ("Bez ruchu", "Gdy ktoś ma w systemie wyłączone animacje, elementy pojawiają się od razu w miejscu docelowym. W filmie to samo dotyczy plansz czytanych bez dźwięku: treść musi być czytelna na zatrzymanej klatce.")]),
        f'''<div style="display:grid;grid-template-columns:340px 1fr;gap:56px;align-items:center">
<div class="figc">{bz}<p>Krzywa ruchu: szybki start, miękkie zatrzymanie.</p></div>
{table(["Ruch", "Czas", "Uwagi"], [
    ["Najechanie, przycisk, link", "150–250 ms", "Zmiana tła albo podkreślenia"],
    ["Wejście elementu na ekran", "400–600 ms", "Przesunięcie o 16–32 px i krycie od 0 do 100%"],
    ["Kolejne elementy grupy", "co 60–80 ms", "Najwyżej pięć elementów z opóźnieniem"],
    ["Przeskok kropki między punktami", f"{rz.HOP['min_ms']}–{rz.HOP['max_ms']} ms", "Łuk w górę, potem lądowanie z ugięciem"],
    ["Lądowanie kropki", f"{T.LAND_MS} ms", "Kropka mija swoje miejsce o jedną piątą drogi opadania, wraca i staje"],
    ["Animacja znaku", rz.sek(rz.END_MS), "Na początku i na końcu filmu, przy pierwszym wejściu na stronę"],
    ["Animacja znaku, wersja krótka", rz.sek(T.LAND_MS), "Wczytywanie, napis w nagłówku i w stopce"],
    ["Przejście między planszami", "400 ms", "Cięcie albo przesunięcie w pionie. Bez przenikań i obrotów"],
], cls="tb sm", widths=["34%", "24%", "42%"])}</div>'''), title="Zasady ruchu")

    M = rz.MARKS; t0 = rz.START_MS
    shots = [(250, "0,25 s"), (520, "0,5 s"), (800, "0,8 s"), (1010, "1,0 s"), (1190, "1,2 s"), (round(t0 + M["apex"]), "1,3 s"), (round(t0 + M["dip"]), "1,5 s"), (rz.END_MS, rz.sek(rz.END_MS))]
    frames = "".join(f'<div class="figc" style="flex:1"><div style="background:{DEEP};border-radius:14px;padding:22px 18px">{rz.frame(ms)}</div><p class="tnum">{t}</p></div>' for ms, t in shots)
    dipk = f"{M['dip_units'] / (2 * rz.R):.2f}".replace(".", ",")
    page(top("Animacja znaku", "Kropka objeżdża literę i ją rysuje, z końca trzonu wyskakuje nad literę i ląduje na swoim miejscu z lekkim ugięciem. Litera pojawia się tam, gdzie kropka już przejechała. Nic nie wchodzi kryciem.",
        f'''<div class="row" style="gap:16px;align-items:flex-start">{frames}</div>
<div class="grid g4" style="margin-top:36px;gap:44px">
<div class="note"><h3>Przebieg</h3><p>0,1 s: kropka pojawia się przy lewym końcu górnej belki. Do {rz.sek(t0 + M["launch"])}: objeżdża literę i ją rysuje. Do {rz.sek(t0 + M["land"])}: wyskakuje z końca trzonu i opada na miejsce. Potem znak stoi do {rz.sek(rz.END_MS)}.</p></div>
<div class="note"><h3>Lądowanie</h3><p>Kropka mija swoje miejsce o {dipk} K, wraca i staje. Jedno ugięcie, bez kolejnych odbić. Litera się przy tym nie rusza.</p></div>
<div class="note"><h3>Stan końcowy</h3><p>Ostatnia klatka jest identyczna z plikiem logo. Animacja nigdy nie kończy się na innym układzie.</p></div>
<div class="note"><h3>Gdzie</h3><p>Początek i koniec filmu, pierwsze wejście na stronę w sesji. Nie przy każdej zmianie podstrony. Do wczytywania służy wersja krótka.</p></div>
</div>''', cls="tight"), title="Animacja znaku")

    def when(s):
        """Chwila (od początku animacji), w której kropka jest w ułamku s trasy."""
        return t0 + next(ms for ms in range(0, rz.ROUTE_MS + 1) if rz.PROGRESS(ms) >= s)
    turn = when((rz.at(6) + rz.at(7)) / 200); bowl = when(rz.at(5) / 100)
    k = lambda v: f"{v:.2f}".replace(".", ",")
    short = "".join(f'<div class="figc" style="flex:1"><div style="background:{DEEP};border-radius:14px;padding:18px 16px">{rz.short_frame(u)}</div><p class="tnum">{t}</p></div>'
                    for u, t in [(0.04, "0 s"), (0.2, "0,1 s"), (0.36, "0,2 s"), (1, rz.sek(T.LAND_MS))])
    page(split("Trasa i tempo kropki",
        "Punkty na rysunku to położenie kropki co 40 ms. Tam, gdzie leżą gęsto, kropka porusza się wolno.",
        table(["Odcinek", "Czas", "Tempo"], [
            ["Pojawienie się", "0,1–0,3 s", "Skala od zera, kropka od razu rusza"],
            ["Belka i brzuszek", f"do {rz.sek(bowl)}", f"Stałe, {k(M['cruise'] / (rz.Y1 - rz.LAUNCH))} wysokości litery na sekundę"],
            ["Zakręt w trzon", f"ok. {rz.sek(turn)}", f"Zwolnienie o {round(rz.TURN_SLOWDOWN * 100)}%"],
            ["Trzon w górę", f"do {rz.sek(t0 + M['launch'])}", f"Przyspieszenie do {round(rz.LAUNCH_BOOST * 100)}% tempa"],
            ["Skok", f"do {rz.sek(t0 + M['apex'])}", f"Hamowanie do zera, najwyższy punkt {k(rz.JUMP / (2 * rz.R))} K nad miejscem kropki"],
            ["Lądowanie", f"do {rz.sek(t0 + rz.ROUTE_MS)}", f"Opadanie i jedno ugięcie o {dipk} K. Sprężyna: tłumienie {k(rz.DAMPING)}, {rz.OMEGA} rad/s"],
            ["Znak stoi", f"do {rz.sek(rz.END_MS)}", "Potem przejście, 400 ms"],
        ], cls="tb xs", widths=["27%", "20%", "53%"])
        + notes([("Wersja krótka", f"{rz.sek(T.LAND_MS)}. Litera albo napis już stoi. Kropka pojawia się 0,9 K nad swoim miejscem i ląduje z tym samym ugięciem."),
                 ("Pliki", "Folder ruch: animacja-znaku.html, animacja-znaku.json (położenie kropki klatka po klatce) i przeskok-kropki.html.")]),
        f'''<div style="display:grid;grid-template-rows:minmax(0,1fr) auto;gap:24px;height:100%">
<div class="panel deepbg pad-s">{rz.route_figure()}</div>
<div class="row" style="gap:16px">{short}</div></div>''', cls="w"), title="Trasa i tempo kropki")

    HP = rz.HOP; kk = lambda v: f"{v:g}".replace(".", ",")
    page(split("Przeskok kropki",
        "W schematach kropka nie przesuwa się po linii, tylko przeskakuje z punktu na punkt: wybija się, leci łukiem, ląduje i ugina się raz.",
        table(["Co", "Ile", "Skąd"], [
            ["Czas lotu", f"{HP['min_ms']}–{HP['max_ms']} ms", f"{HP['base_ms']} ms i {kk(HP['ms_per_px'])} ms na każdy piksel drogi"],
            ["Wysokość łuku", f"{kk(HP['min_rise'])}–{kk(HP['max_rise'])} średnicy kropki", f"{round(HP['rise'] * 100)}% drogi w poziomie, nad wyższym z dwóch punktów"],
            ["Ugięcie", f"{kk(HP['min_dip'])}–{kk(HP['max_dip'])} średnicy kropki", f"{round(HP['dip'] * 100)}% wysokości opadania, sprężyna jak w animacji znaku"],
            ["Postój", f"{kk(HP['hold_ms'] / 1000)} s", f"Na ostatnim punkcie {kk(HP['last_hold_ms'] / 1000)} s"],
            ["Powrót na początek", f"{HP['pop_ms']} ms", "Kropka znika skalą i pojawia się skalą na pierwszym punkcie"],
        ], cls="tb xs", widths=["27%", "30%", "43%"])
        + notes([("Kierunek", "Góra to zawsze góra ekranu. W schemacie pionowym kropka lekko podskakuje i spada na niższy punkt."),
                 ("Gdzie", "Schematy procesów, osie czasu, ilustracje interfejsu. Podpis kroku pogrubia się w chwili lądowania. Na okręgu kropka dalej obiega okrąg.")]),
        f'''<div class="figc" style="display:grid;grid-template-columns:minmax(0,1fr) 190px;grid-template-rows:minmax(0,1fr) auto;gap:0 24px;height:100%">
<div class="panel white pad-s">{rz.hop_figure("row", n=3)}</div><div class="panel white pad-s">{rz.hop_figure("col", n=3, gap=200)}</div>
<p>Poziomo: położenie kropki co 40 ms.</p><p>Pionowo.</p></div>''', cls="w"), title="Przeskok kropki")

    safe169 = (f'<div style="position:absolute;left:67px;top:38px;width:1786px;height:1004px;border:4px dashed rgba(255,255,255,.55)"></div>'
               f'<div style="position:absolute;left:96px;top:54px;width:1728px;height:972px;border:4px solid {GREEN_L}"></div>'
               + abs_(1920 - 96 - 72 * 0.68, 54 + 42, sym(ink=WHITE, dot=WHITE, h=72))
               + abs_(110, 74, txt("pole grafiki: 5% od krawędzi", 30, 500, GREEN_L)) + abs_(84, 990, txt("pole akcji: 3,5%", 26, 500, "rgba(255,255,255,.8)")))
    safe916 = (abs_(0, 0, photo(PHOTO1, 1080, 1920, "50% 20%")) + abs_(0, 0, '<div style="width:1080px;height:1920px;background:rgba(0,0,0,.2)"></div>')
               + f'<div style="position:absolute;left:0;top:0;width:1080px;height:270px;background:rgba(22,21,17,.55)"></div><div style="position:absolute;left:0;bottom:0;width:1080px;height:670px;background:rgba(22,21,17,.55)"></div>'
               + f'<div style="position:absolute;left:80px;top:270px;width:920px;height:980px;border:5px solid {GREEN_L}"></div>'
               + abs_(100, 120, txt("270 px: nazwa profilu", 40, 500, WHITE)) + abs_(100, 1500, txt("670 px: opis i przyciski serwisu", 40, 500, WHITE)))
    page(split("Kadr filmu",
        "Telewizory, telefony i serwisy przycinają albo zasłaniają brzegi kadru. Napisy, plansze i znak stoją w polu, którego nic nie zasłoni.",
        notes([("Film poziomy", "Grafika i tekst w polu 5% od każdej krawędzi: 96 px po bokach i 54 px u góry i u dołu przy 1920 × 1080. Ważny ruch w polu 3,5%."),
               ("Znak w rogu", "Wersja biała, 72 px wysokości, prawy górny róg pola grafiki. Pełne krycie w pierwszych i ostatnich pięciu sekundach, 70% w trakcie."),
               ("Film pionowy", "Pole bezpieczne 920 × 980 px: 270 px od góry, 670 px od dołu, 80 px po bokach. Znaku w rogu nie stawiamy, bo róg zajmuje serwis."),
               ("Twarz", "Oczy na jednej trzeciej wysokości kadru. W pionie twarz mieści się w polu bezpiecznym.")]),
        f'''<div class="fig-row" style="gap:36px;align-items:flex-end">{figc(frame_film(safe169, 0.38), "<b>16:9</b> 1920 × 1080")}{figc(mock(1080, 1920, 0.23, safe916, bg=INK), "<b>9:16</b> 1080 × 1920")}</div>'''), title="Kadr filmu")

    title_card = (abs_(112, 112, tor(260, 10, [0, 1], 1, ink=PAPER, green=GREEN_L)) + abs_(112, 330, txt("Co się dzieje z zapytaniami<br>z reklam", 124, 500, PAPER, "disp", 1.02, "letter-spacing:-0.02em")) + abs_(112, 900, txt("Odcinek 4", 32, 500, DEEPM)))
    lower = abs_(0, 780, '<div style="width:1920px;height:300px;background:linear-gradient(0deg,rgba(0,0,0,.62),rgba(0,0,0,0))"></div>') + abs_(96, 1080 - 54 - 150, f'<div style="display:flex;gap:26px;align-items:center"><span style="display:block;width:8px;height:120px;background:{WHITE}"></span><div>' + txt("Stanisław Drożniak", 48, 600, WHITE, lh=1.15) + txt(T.DOPISEK, 32, 400, WHITE, lh=1.3) + '</div></div>')
    end_card = (abs_(112, 300, word(ink=PAPER, w=760)) + abs_(112, 560, txt("Umów rozmowę", 96, 500, PAPER, "disp", 1.0)) + abs_(112, 690, txt(T.STRONA, 56, 500, PAPER)) )
    page(top("Plansze i podpisy", "Film ma trzy stałe elementy graficzne: planszę tytułową, podpis osoby i planszę końcową. Wszystkie stoją na lewej krawędzi pola grafiki.",
        f'''<div class="grid g3" style="gap:32px">
{figc(mock(1920, 1080, 0.275, title_card, bg=DEEP), "<b>Plansza tytułowa.</b> Głęboka zieleń, linia z kropką, tytuł Brygadą 500 w rozmiarze 96–124 px, najwyżej dwa wiersze. Trwa 2–3 sekundy.")}
{figc(frame_film(lower, 0.275), "<b>Podpis osoby.</b> Imię i nazwisko Schibsted 600, 48 px, pod nim rola 32 px. Biała pionowa kreska 8 px. Wchodzi w 400 ms, zostaje co najmniej 4 sekundy.")}
{figc(mock(1920, 1080, 0.275, end_card, bg=DEEP), "<b>Plansza końcowa.</b> Napis, wezwanie i adres strony. Trwa co najmniej 5 sekund, żeby zmieściły się na niej elementy końcowe YouTube.")}
</div>
<div class="grid g3" style="margin-top:36px;gap:56px">
<div class="note"><h3>Kolejność</h3><p>Pierwsze zdanie filmu pada przed planszą tytułową. Plansza wchodzi po 5–15 sekundach, a nie na otwarcie.</p></div>
<div class="note"><h3>Inne plansze</h3><p>Liczba, cytat i schemat mają układ slajdu z rozdziału o zastosowaniach, w polu grafiki filmu.</p></div>
<div class="note"><h3>Czego nie robimy</h3><p>Pasków z przewijanym tekstem, ramek wokół kadru, znaku wodnego przez środek i animowanych teł.</p></div>
</div>''', cls="tight"), title="Plansze i podpisy")

    capt = lambda t, size, w: f'<div style="display:inline-block;background:rgba(22,21,17,.82);color:#fff;font-weight:600;font-size:{size}px;line-height:1.25;padding:{size*0.28:.0f}px {size*0.5:.0f}px;border-radius:10px;max-width:{w}px;text-align:center">{t}</div>'
    c169 = abs_(0, 0, f'<div style="width:1920px;height:1080px;display:flex;align-items:flex-end;justify-content:center;padding-bottom:84px">{capt("Zanim zwiększysz budżet na reklamy,<br>policz, ile zapytań dostało odpowiedź.", 50, 1400)}</div>')
    c916 = (abs_(0, 0, photo(PHOTO1, 1080, 1920, "50% 20%")) + abs_(0, 0, '<div style="width:1080px;height:1920px;background:rgba(0,0,0,.15)"></div>')
            + abs_(0, 0, f'<div style="width:1080px;height:1920px;display:flex;align-items:flex-start;justify-content:center;padding-top:1060px">{capt("policz, ile zapytań<br>dostało odpowiedź", 64, 900)}</div>'))
    page(split("Napisy",
        "Większość ludzi ogląda filmy w telefonie bez dźwięku, więc każda wypowiedź ma napisy. Napisy są częścią obrazu, a nie dodatkiem serwisu.",
        table(["", "Film poziomy", "Film pionowy"], [
            ["Krój", "Schibsted Grotesk 600", "Schibsted Grotesk 600"],
            ["Rozmiar", "48–54 px", "60–68 px"],
            ["Wiersze", "najwyżej 2, do 37 znaków", "najwyżej 2, do 22 znaków"],
            ["Tło", "atrament, krycie 82%, promień 10 px", "to samo"],
            ["Miejsce", "u dołu, w polu grafiki", "dolna część pola bezpiecznego"],
            ["Czas", "od 1 do 6 sekund na napis", "od 0,8 do 3 sekund"],
        ], cls="tb sm", widths=["18%", "44%", "38%"]),
        f'''<div class="fig-row" style="gap:32px;align-items:flex-end">{figc(frame_film(c169, 0.33), "<b>16:9</b> dwa wiersze u dołu")}{figc(mock(1080, 1920, 0.186, c916, bg=INK), "<b>9:16</b> w polu bezpiecznym")}</div>
<div class="grid g2" style="gap:44px;margin-top:32px">
<div class="note"><h3>Treść</h3><p>Napis powtarza wypowiedź słowo w słowo. Liczby zapisujemy cyframi. Wiersz łamiemy tam, gdzie mówiący robi pauzę.</p></div>
<div class="note"><h3>Wyróżnienia</h3><p>Bez kolorowania słów, emotek i podskakujących liter. Najważniejszą liczbę pokazujemy osobną planszą.</p></div></div>''', cls="w", fcls="top-a"), title="Napisy")

    male = "".join(mini(n, 168) for n in MINI)
    uwagi = [("Własny styl", "Miniatura nie jest slajdem. Ma własny, stały styl i może odejść od zasad tej księgi: tło ma gradient, głowa poświatę, karty cień. Z marki zostają kolory."),
             ("Osoba", "Głowa wycięta z tła, na 65–75% wysokości kadru, doświetlona, z kontrastem i miękkim zielonym światłem z tyłu. Bez brzucha. Dłoń zostaje, gdy wskazuje albo podpiera brodę."),
             ("Tekst", "Schibsted Grotesk 800, najwyżej pięć słów. Jeden wiersz biały i jedno słowo wersalikami w zielonym polu z białym tekstem. Nazywa temat wprost."),
             ("Znane rzeczy i strzałka", "Obok twarzy logotypy serwisów i fragmenty ekranów w dwóch planach, dalszy lekko nieostry. Często układ „przed i po”. Kierunek pokazuje strzałka. Bez logo marki i emotek. Prawy dolny róg pusty.")]
    page(top("Miniatury filmów", "Miniatura wyświetla się w szerokości 168 px, obok kilkunastu innych. Ma wielką twarz, najwyżej pięć słów i rzecz, którą widz zna i od razu łączy z tematem.",
        f'''<div style="display:grid;grid-template-columns:1160px minmax(0,1fr);gap:56px">
<div><div style="display:flex;gap:22px;align-items:flex-start">{figc(mini(MINI[0], 790), "<b>Źródła i narzędzia.</b> Osoba wskazuje na makiety ze znanymi logotypami.")}
<div style="display:grid;gap:14px">{figc(mini(MINI[1], 348), "<b>Wynik.</b> Licznik, wykres i strzałka.")}{figc(mini(MINI[2], 348), "<b>Od tego do tego.</b>")}</div></div>
<div style="margin-top:18px;background:#0F0F0F;border-radius:14px;padding:16px 18px;display:flex;gap:14px;align-items:center">{male}<p style="color:#B8B8B8;font-size:17px;line-height:1.35;margin-left:10px">Te same miniatury w szerokości 168 px, jak na liście filmów w telefonie.</p></div>
<p style="font-size:18.5px;line-height:1.4;color:var(--muted);margin-top:14px">Zasady, referencje i gotowe układy są w studiu grafik, w pliku MINIATURY.md.</p></div>
<div class="notes" style="margin-top:0;padding-top:0;align-content:start;gap:18px">{"".join(f'<div class="note"><h3>{h}</h3><p style="font-size:20px">{t}</p></div>' for h, t in uwagi)}</div>
</div>''', cls="tight"), title="Miniatury filmów")

    page(split("Dźwięk",
        "Dźwięk jest spokojny i wyraźny. Najważniejszy jest głos Stanisława, a muzyka i efekty mu nie przeszkadzają.",
        notes([("Głos", "Nagrany z bliska, bez pogłosu pomieszczenia. Tempo rozmowy, nie lektora reklamowego."),
               ("Muzyka", "Instrumentalna, spokojna, bez wokalu i bez narastającego „epickiego” finału. Pod głosem cichsza o 18–20 dB. W filmach, w których Stanisław tłumaczy, muzyki może nie być wcale."),
               ("Efekty", "Jeden krótki, miękki dźwięk, gdy kropka staje na miejscu w animacji znaku. Bez świstów przy każdym przejściu.")]),
        table(["Parametr", "Wartość", "Gdzie"], [
            ["Głośność filmu", "−14 LUFS", "YouTube, a w praktyce także Instagram i TikTok"],
            ["Głośność podkastu", "−16 LUFS", "Apple Podcasts. Spotify wyrównuje do −14"],
            ["Szczyt sygnału", "do −1 dBTP", "Wszędzie"],
            ["Dźwięk w pliku", "AAC, 48 kHz, 384 kb/s", "Eksport filmu"],
            ["Obraz 1080p", "H.264, 8 Mb/s przy 25–30 kl./s, 12 Mb/s przy 50–60", "Eksport na YouTube"],
            ["Obraz 4K", "H.264, 35–45 Mb/s", "Eksport na YouTube"],
            ["Liczba klatek", "25 kl./s, taka sama od nagrania do eksportu", "Filmy mówione"],
        ], widths=["27%", "40%", "33%"]), cls="n", fcls="top-a"), title="Dźwięk")
