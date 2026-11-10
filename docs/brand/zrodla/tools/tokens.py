"""Jedno źródło wartości marki Drożniak: kolory, pismo, odstępy, ruch.

Z tego pliku biorą dane: księga marki (ksiega.py), pliki logo (export_master.py),
wizytówka (card.py) i eksport tokenów (export_tokens.py). Zmiana tutaj przechodzi wszędzie.
"""

WERSJA = "2.0"
DATA = "Listopad 2026"
STRONA = "drozniak.pl"
MAIL = "stanislaw@drozniak.com"
TELEFON = "+48 792 491 196"
DOPISEK = "Marketing i pozyskiwanie klientów dla firm"

# ---------------------------------------------------------------- kolory podstawowe
PAPER = "#F6F5F1"      # papier: tło
STONE = "#ECEAE3"      # kamień: druga powierzchnia
WHITE = "#FFFFFF"      # biel: karty, pola formularzy
LINE = "#E4E1D8"       # linia: podziały, obramowania
LINE2 = "#D6D2C6"      # linia mocna: obrys pól, osie wykresów
INK = "#161511"        # atrament: tekst, logo, przyciski
INK2 = "#2B2923"       # atrament po najechaniu
MUTED = "#5E5A50"      # grafit: tekst pomocniczy
ASH = "#8A867A"        # popiół: tekst nieaktywny, znaki pomocnicze (nie do czytania)
DEEP = "#0A3D27"       # głęboka zieleń: ciemna płaszczyzna
DEEP2 = "#154D34"      # krok jaśniej na głębokiej zieleni
DEEPM = "#B8CEC0"      # tekst pomocniczy na głębokiej zieleni
GREEN = "#14945E"      # zieleń sygnałowa: kropka na jasnym tle
GREEN_L = "#23C27D"    # zieleń sygnałowa jasna: kropka na ciemnym tle
DEEP_V1 = "#0E2A20"    # głęboka zieleń z wersji 1.0, tylko do porównań

# ---------------------------------------------------------------- skale tonalne (interfejs, wykresy, stany)
GREENS = {50: "#ECFAF1", 100: "#D8F6E3", 200: "#B3ECCA", 300: "#7DDBA7", 400: GREEN_L, 500: GREEN,
          600: "#06784A", 700: "#065F3B", 800: "#0B4C2F", 900: DEEP, 950: "#072918"}
NEUTRALS = {0: WHITE, 50: PAPER, 100: STONE, 200: LINE, 300: LINE2, 400: "#AFAB9E", 500: ASH,
            600: MUTED, 700: "#424037", 800: INK2, 900: INK}

# ---------------------------------------------------------------- kolory funkcjonalne (tekst / tło)
STATES = {
    "Sukces": ("#06784A", "#E0F7E9"),
    "Uwaga": ("#895709", "#FDEFD2"),
    "Błąd": ("#A52A24", "#FFE9E5"),
    "Informacja": ("#2D5E8B", "#E5F2FF"),
}
ERR = STATES["Błąd"][0]

# ---------------------------------------------------------------- kolory wykresów (kolejność użycia)
CHART = [("Zieleń", GREEN), ("Stal", "#16456D"), ("Ochra", "#D2992E"), ("Cegła", "#932412")]
CHART_REST = ("Reszta", "#C4C0B4")

# ---------------------------------------------------------------- pismo
FONT_DISPLAY = '"Brygada 1918", Georgia, "Times New Roman", serif'
FONT_TEXT = '"Schibsted Grotesk", "Helvetica Neue", Arial, sans-serif'
FONT_MONO = 'ui-monospace, "SF Mono", Menlo, Consolas, monospace'

# rola: (krój, odmiana, interlinia, światło)
TYPE_ROLES = [
    ("Wielki nagłówek", "Brygada 1918", 500, "1,0", "−2%"),
    ("Nagłówek", "Brygada 1918", 600, "1,05", "−1,5%"),
    ("Podtytuł", "Brygada 1918", 600, "1,2", "−1%"),
    ("Tekst", "Schibsted Grotesk", 400, "1,55", "0"),
    ("Mały", "Schibsted Grotesk", 500, "1,45", "0"),
]
# rozmiary ról w formatach: wielki nagłówek, nagłówek, podtytuł, tekst, mały
TYPE_SIZES = [
    ("Strona internetowa", "px", "44–112", "32–56", "22–28", "17", "14"),
    ("Dokument A4", "pt", "36–48", "20–26", "13–14", "10,5", "8"),
    ("Slajd 1920 × 1080", "px", "120–160", "64–80", "36–44", "28", "22"),
    ("Post 1080 × 1350", "px", "96–128", "60–72", "40", "30", "24"),
    ("Relacja i rolka 1080 × 1920", "px", "104–136", "64–80", "44", "36", "28"),
    ("Miniatura 1280 × 720", "px", "150–175", "115–130", "nie używamy", "w karcie od 40", "nie używamy"),
    ("Film 1920 × 1080", "px", "96–120", "64", "44", "nie używamy", "30"),
    ("Mail 600 px", "px", "32–36", "24–26", "19", "16", "13"),
]

# ---------------------------------------------------------------- odstępy, promienie, ruch
SPACE = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192]
RADIUS = {"mały": 8, "średni": 16, "pełny": 999}
EASE = "cubic-bezier(0.22, 0.61, 0.36, 1)"
# Lądowanie kropki: sprężyna z tłumieniem 0,45 i częstością 14 rad/s. Kropka mija swoje miejsce o ok. 20% drogi opadania,
# wraca i staje. EASE_LAND to ta sprężyna jako linear() na 600 ms, EASE_LAND_FALLBACK dla przeglądarek bez linear().
LAND_DAMPING, LAND_OMEGA, LAND_MS = 0.45, 14, 600
def _land(step=25):
    import math
    dec = LAND_DAMPING * LAND_OMEGA / math.sqrt(1 - LAND_DAMPING ** 2); out = []
    for t in range(0, LAND_MS + 1, step):
        s = t / 1000
        v = 1 if t == LAND_MS else 1 - math.exp(-dec * s) * (math.cos(LAND_OMEGA * s) + dec / LAND_OMEGA * math.sin(LAND_OMEGA * s))
        out.append(f"{round(v, 3):g}")
    return "linear(" + ", ".join(out) + ")"
EASE_LAND = _land()
EASE_LAND_FALLBACK = "cubic-bezier(0.3, 1.5, 0.6, 1)"
MOTION = [("Najechanie, przycisk, link", "150–250 ms"), ("Wejście elementu", "400–600 ms, przesunięcie 16–32 px"),
          ("Przeskok kropki między punktami", "440–680 ms"), ("Lądowanie kropki", "600 ms, jedno ugięcie"), ("Animacja znaku", "2,4 s"),
          ("Animacja znaku, wersja krótka", "0,6 s"), ("Przejście między planszami w filmie", "400 ms")]
