"""Pliki logo z jednej geometrii: napis, znak, znak mały, awatary, ikony i favikony (SVG).

Użycie: S=<folder zrodla> python tools/export_master.py ../logo
PNG, PDF i ICO robi z nich skrypt tools/export_raster.sh.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from master import symbol, word, SMALL
from tokens import INK, PAPER, GREEN, GREEN_L, DEEP, WHITE
OUT = sys.argv[1]
for d in ("napis", "znak", "ikony", "ikony/web"): os.makedirs(f"{OUT}/{d}", exist_ok=True)

def svgdoc(w, h, body, title):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:g} {h:g}" width="{w:g}" height="{h:g}" role="img" aria-labelledby="t">'
            f'<title id="t">{title}</title>{body}</svg>\n')
r2 = lambda v: round(v, 2)

# rysunek / kropka: na ciemnym tle kropka jest jasna
VARIANTS = {"kolor": (INK, GREEN), "negatyw": (PAPER, GREEN_L), "czarny": (INK, INK), "bialy": (WHITE, WHITE)}

# ---- napis
W = word(100); x0, y0, x1, y1 = W['bb']; ww, wh = r2(x1 - x0), r2(y1 - y0)
def word_body(ink, dot):
    g = "".join(f'<path d="{d}"/>' for d in W['ink'])
    c = "".join(f'<circle cx="{cx:g}" cy="{cy:g}" r="{r:g}" fill="{dot}"/>' for cx, cy, r in W['dots'])
    return f'<g transform="translate({-x0:.2f} {-y0:.2f})"><g fill="{ink}">{g}</g>{c}</g>'
for n, (ink, dot) in VARIANTS.items():
    open(f"{OUT}/napis/drozniak-napis-{n}.svg", "w").write(svgdoc(ww, wh, word_body(ink, dot), "Drożniak"))

# ---- znak (podstawowy i mały)
def sym_body(g, ink, dot):
    cx, cy, r = g['dot']
    return f'<path fill="{ink}" d="{g["d"]}"/><circle cx="{cx}" cy="{cy}" r="{r}" fill="{dot}"/>'
def sym_files(g, suffix):
    bx0, by0, bx1, by1 = g['bb']
    for n, (ink, dot) in VARIANTS.items():
        open(f"{OUT}/znak/drozniak-znak{suffix}-{n}.svg", "w").write(svgdoc(r2(bx1 - bx0), r2(by1 - by0), sym_body(g, ink, dot), "Drożniak, znak"))
G = symbol(); Gs = symbol(**SMALL)
sym_files(G, ""); sym_files(Gs, "-maly")

# ---- awatary i ikony: znak w polu, środek optyczny 1,2% powyżej środka pola
def tile(g, size=1024, scale=0.5, circle=False, radius=0.22, bg=DEEP, ink=PAPER, dot=GREEN_L):
    bx0, by0, bx1, by1 = g['bb']; w, h = bx1 - bx0, by1 - by0
    s = size * scale / h
    tx = (size - w * s) / 2 + size * 0.004; ty = (size - h * s) / 2 - size * 0.012
    shape = (f'<circle cx="{size/2:g}" cy="{size/2:g}" r="{size/2:g}" fill="{bg}"/>' if circle
             else f'<rect width="{size}" height="{size}" rx="{size*radius:.1f}" fill="{bg}"/>')
    return svgdoc(size, size, shape + f'<g transform="translate({tx:.2f} {ty:.2f}) scale({s:.5f})">{sym_body(g, ink, dot)}</g>', "Drożniak")

I = f"{OUT}/ikony"
open(f"{I}/drozniak-awatar.svg", "w").write(tile(G, 1080, 0.5, radius=0))                       # serwisy same przycinają do koła
open(f"{I}/drozniak-awatar-jasny.svg", "w").write(tile(G, 1080, 0.5, radius=0, bg=PAPER, ink=INK, dot=GREEN))
open(f"{I}/drozniak-ikona-aplikacji.svg", "w").write(tile(G, 1024, 0.56))
open(f"{I}/favicon.svg", "w").write(tile(Gs, 64, 0.66, radius=0.19))
open(f"{I}/web/favicon.svg", "w").write(tile(Gs, 64, 0.66, radius=0.19))
open(f"{I}/web/_icon.svg", "w").write(tile(Gs, 512, 0.6, radius=0.19))                              # źródło ikon 180, 192, 512
open(f"{I}/web/_icon-maskable.svg", "w").write(tile(G, 512, 0.46, radius=0))                        # znak w kole 80% pola
print("napis", ww, wh, "| znak", G['bb'], "| znak mały", Gs['bb'])
