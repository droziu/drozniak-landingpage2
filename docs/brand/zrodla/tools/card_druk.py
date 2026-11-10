"""Wizytówka do druku cyfrowego na MultiLoft: 85 × 55 mm, spad 3 mm (strona 91 × 61 mm).

Plik wychodzi od razu w postaci, której wymaga drukarnia: PDF 1.3, same krzywe (bez fontów
i bitmap), kolory w DeviceCMYK bez osadzonego profilu, bez przezroczystości i znaczników cięcia.
Strona 1 to awers (głęboka zieleń i napis), strona 2 to rewers (papier, nazwisko i dane).

Napis i nazwisko są na osobnych stronach, żeby słowo „Drożniak” nie stało dwa razy obok siebie.

Użycie: S=<folder zrodla> python tools/card_druk.py <plik.pdf> [<arkusz próbny A4.pdf>]
Podglądy z gotowego pliku robi tools/card_podglad.py.
"""
import os, sys, zlib, datetime
sys.path.insert(0, os.path.dirname(__file__))
from fontTools.pens.basePen import BasePen
from fontTools.pens.transformPen import TransformPen
from fontTools.svgLib.path import parse_path
import brandlib as bl
import master
import tokens as T

SCH = os.environ["S"] + "/fonts/SchibstedGrotesk[wght].ttf"

# ---------------------------------------------------------------- format (mm)
W, H, SPAD = 85.0, 55.0, 3.0
MM = 72 / 25.4
PW, PH = (W + 2 * SPAD) * MM, (H + 2 * SPAD) * MM
X = lambda mm: (SPAD + mm) * MM            # od lewej krawędzi cięcia
Y = lambda mm: (SPAD + H - mm) * MM        # od górnej krawędzi cięcia

# ---------------------------------------------------------------- kolory CMYK (księga marki, wartości dla profilu Coated FOGRA)
CZARNY = (0, 0, 0, 100)          # tekst: sam czarny, bez rastra, ostry w druku cyfrowym
ZIELEN = (85, 0, 85, 80)         # głęboka zieleń, łączne pokrycie 250%
KROPKA_J = (65, 0, 65, 0)        # zieleń sygnałowa jasna: kropka na ciemnym tle, tylko cyjan i żółty
PAPIER = (0, 0, 0, 0)            # niezadrukowany papier

# ---------------------------------------------------------------- awers: napis na zieleni (mm)
NAPIS_W = 34.0                   # szerokość napisu (minimum w negatywie to 25 mm)
NAPIS_OS = 0.60                  # która część wysokości wersalika staje na osi (środek ciężkości słowa z małymi literami)
NAPIS_DY = -0.3                  # przesunięcie osi do środka optycznego
# ---------------------------------------------------------------- rewers: dane na papierze (mm)
MARG = 7.5                       # lewa krawędź tekstu, góra wersalików nazwiska, linia pisma ostatniego wiersza od dołu
PT_NAZW, PT_TEKST = 9.0, 7.5     # stopień pisma: imię i nazwisko, reszta
INTERLINIA = 3.9                 # odstęp linii pisma w danych kontaktowych
POD_NAZW = 4.0                   # od linii pisma nazwiska do linii pisma dopisku


class PdfPen(BasePen):
    """Zapisuje kontury jako operatory ścieżki PDF. Krzywe kwadratowe z TrueType zamienia na sześcienne."""
    def __init__(self, glyphset=None):
        super().__init__(glyphset); self.ops = []; self.xs = []; self.ys = []
    def _p(self, p):
        self.xs.append(p[0]); self.ys.append(p[1]); return f"{p[0]:.3f} {p[1]:.3f}"
    def _moveTo(self, p): self.ops.append(self._p(p) + " m")
    def _lineTo(self, p): self.ops.append(self._p(p) + " l")
    def _curveToOne(self, a, b, c): self.ops.append(f"{self._p(a)} {self._p(b)} {self._p(c)} c")
    def _closePath(self): self.ops.append("h")
    def _endPath(self): pass


def fill(cmyk, ops):
    c = " ".join(f"{v / 100:g}" for v in cmyk)
    return f"{c} k\n" + "\n".join(ops) + "\nf\n"

def circle(cx, cy, r):
    k = 0.5522847498 * r
    f = lambda *v: " ".join(f"{n:.3f}" for n in v)
    return [f(cx + r, cy) + " m", f(cx + r, cy + k, cx + k, cy + r, cx, cy + r) + " c",
            f(cx - k, cy + r, cx - r, cy + k, cx - r, cy) + " c", f(cx - r, cy - k, cx - k, cy - r, cx, cy - r) + " c",
            f(cx + k, cy - r, cx + r, cy - k, cx + r, cy) + " c", "h"]

def svg_ops(d_list, s, tx, ty):
    """Ścieżki SVG (oś y w dół) w punkty PDF: skala s, początek układu w (tx, ty)."""
    pen = PdfPen()
    for d in d_list: parse_path(d, TransformPen(pen, (s, 0, 0, -s, tx, ty)))
    return pen.ops

def line(text, wght, pt, x_mm, base_mm):
    """Wiersz tekstu na krzywych. Lewa krawędź farby pierwszej litery staje dokładnie na x_mm."""
    tt, glyphs = bl.shape(SCH, wght, text)
    s = pt / tt["head"].unitsPerEm
    gs = tt.getGlyphSet(); pen = PdfPen(gs)
    x = X(x_mm) - bl.glyph_bounds(tt, glyphs[0][0])[0] * s
    y = Y(base_mm)
    for g, adv, xo, yo in glyphs:
        gs[g].draw(TransformPen(pen, (s, 0, 0, s, x + xo * s, y + yo * s)))
        x += adv * s
    return pen.ops, (max(pen.xs) - X(0)) / MM      # operatory i prawa krawędź farby w mm


def awers():
    """Pełne pole głębokiej zieleni ze spadem, napis w wersji negatywowej w środku optycznym."""
    out = [fill(ZIELEN, [f"-2 -2 {PW + 4:.3f} {PH + 4:.3f} re"])]      # z zapasem poza stronę, żeby przy krawędzi spadu nie został włos
    wm = master.word(100)                                  # geometria napisu z master.py, wersalik = 100
    bw = wm["bb"][2] - wm["bb"][0]
    s = NAPIS_W * MM / bw
    cap = 100 * s / MM
    top = H / 2 + NAPIS_DY - NAPIS_OS * cap                # góra wersalika D
    tx, ty = X((W - NAPIS_W) / 2) - wm["bb"][0] * s, Y(top)
    out.append(fill(PAPIER, svg_ops(wm["ink"], s, tx, ty)))
    for cx, cy, r in wm["dots"]:
        out.append(fill(KROPKA_J, circle(tx + cx * s, ty - cy * s, r * s)))
    info = {"napis_szer_mm": NAPIS_W, "wersalik_mm": round(cap, 2), "gora_wersalika_mm": round(top, 2),
            "kropka_mm": round(2 * wm["dots"][0][2] * s / MM, 2), "od_bocznych_krawedzi_mm": round((W - NAPIS_W) / 2, 2)}
    return "".join(out), info


def rewers():
    """Papier bez zadruku tła. Nazwisko i dopisek u góry, dane kontaktowe na dole, jedna lewa krawędź."""
    tt, _ = bl.load(SCH, 600)
    cap_nazw = PT_NAZW * tt["OS/2"].sCapHeight / tt["head"].unitsPerEm / MM
    b = H - MARG
    rows = [("Stanisław Drożniak", 600, PT_NAZW, MARG + cap_nazw),
            (T.DOPISEK, 400, PT_TEKST, MARG + cap_nazw + POD_NAZW),
            (T.TELEFON, 400, PT_TEKST, b - 2 * INTERLINIA),
            (T.MAIL, 400, PT_TEKST, b - INTERLINIA),
            (T.STRONA, 400, PT_TEKST, b)]
    out, info = [], []
    for text, wght, pt, base in rows:
        ops, right = line(text, wght, pt, MARG, base)
        out.append(fill(CZARNY, ops)); info.append((text, pt, round(base, 2), round(right, 2)))
    return "".join(out), {"wiersze (tekst, pt, linia pisma mm, prawa krawędź mm)": info}


def proba_a4(a, r):
    """Arkusz A4 do wydruku w skali 100% na zwykłej drukarce: obie strony przycięte do 85 × 55 mm, z pasérami do wycięcia."""
    aw, ah = 210 * MM, 297 * MM
    x0 = (aw - PW) / 2
    out = []
    note, _ = line("Wydruk próbny. Drukuj w skali 100%, bez dopasowania do strony. Po wycięciu karta ma 85 × 55 mm.", 400, 8, 0, -22)
    for n, (stream, name, top) in enumerate(((a, "Awers", 50), (r, "Rewers", 50 + H + 32))):
        y0 = ah - (top + H + SPAD) * MM
        out.append(f"q 1 0 0 1 {x0:.3f} {y0:.3f} cm\n")
        if n == 0: out.append(fill(CZARNY, note))
        out.append(fill(CZARNY, line(name, 600, 8, 0, -10)[0]))
        out.append("0 0 0 1 K 0.3 w\n")
        for cx, sx in ((0, -1), (W, 1)):                       # pasery: 5 mm, 2 mm od rogu
            for cy, sy in ((0, -1), (H, 1)):
                out.append(f"{X(cx) + sx * 2 * MM:.3f} {Y(cy):.3f} m {X(cx) + sx * 7 * MM:.3f} {Y(cy):.3f} l S\n"
                           f"{X(cx):.3f} {Y(cy) - sy * 2 * MM:.3f} m {X(cx):.3f} {Y(cy) - sy * 7 * MM:.3f} l S\n")
        out.append(f"q {X(0):.3f} {Y(H):.3f} {W * MM:.3f} {H * MM:.3f} re W n\n{stream}Q\nQ\n")
    return "".join(out), (aw, ah)


def pdf(pages, path, size=None):
    """Minimalny PDF 1.3: strony 91 × 61 mm, pole cięcia 85 × 55 mm, treść tylko wektorowa w DeviceCMYK.
    Z podanym size powstaje zwykła strona tego formatu (arkusz próbny), bez pola cięcia."""
    pw, ph = size or (PW, PH)
    box = f"[0 0 {pw:.4f} {ph:.4f}]"
    trim = f"[{SPAD * MM:.4f} {SPAD * MM:.4f} {PW - SPAD * MM:.4f} {PH - SPAD * MM:.4f}]"
    boxes = f"/MediaBox {box}" if size else f"/MediaBox {box} /BleedBox {box} /TrimBox {trim}"
    now = datetime.datetime.now().strftime("D:%Y%m%d%H%M%S")
    objs = {1: b"<< /Type /Catalog /Pages 2 0 R >>"}
    kids = []
    n = 3
    for stream in pages:
        data = zlib.compress(stream.encode("ascii"), 9)
        objs[n] = (f"<< /Type /Page /Parent 2 0 R {boxes} "
                   f"/Resources << /ProcSet [/PDF] >> /Contents {n + 1} 0 R >>").encode()
        objs[n + 1] = f"<< /Length {len(data)} /Filter /FlateDecode >>\nstream\n".encode() + data + b"\nendstream"
        kids.append(f"{n} 0 R"); n += 2
    objs[2] = f"<< /Type /Pages /Kids [{' '.join(kids)}] /Count {len(kids)} >>".encode()
    objs[n] = (f"<< /Title (Wizytowka Drozniak, MultiLoft 85 x 55 mm) /Author (Stanislaw Drozniak) "
               f"/Creator (card_druk.py) /Producer (card_druk.py) /CreationDate ({now}) /ModDate ({now}) /Trapped /False >>").encode()
    buf = bytearray(b"%PDF-1.3\n%\xe2\xe3\xcf\xd3\n"); offs = {}
    for i in sorted(objs):
        offs[i] = len(buf); buf += f"{i} 0 obj\n".encode() + objs[i] + b"\nendobj\n"
    xref = len(buf)
    buf += f"xref\n0 {n + 1}\n".encode() + b"0000000000 65535 f \n"
    for i in range(1, n + 1): buf += f"{offs[i]:010d} 00000 n \n".encode()
    buf += f"trailer\n<< /Size {n + 1} /Root 1 0 R /Info {n} 0 R >>\nstartxref\n{xref}\n%%EOF\n".encode()
    open(path, "wb").write(buf)


if __name__ == "__main__":
    a, ia = awers(); r, ir = rewers()
    pdf([a, r], sys.argv[1])
    if len(sys.argv) > 2:                                      # drugi argument: arkusz próbny A4
        s, size = proba_a4(a, r); pdf([s], sys.argv[2], size)
    print("awers:", ia); print("rewers:", ir)
