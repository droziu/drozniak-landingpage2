import sys, os, math, re, subprocess
sys.path.insert(0, os.path.dirname(__file__))
from master import symbol, word, SMALL
OUT = sys.argv[1]
INK, PAPER, GREEN, DEEP, WHITE = "#161511", "#F6F5F1", "#14945E", "#0E2A20", "#FFFFFF"
for d in ("napis", "znak", "ikony"): os.makedirs(f"{OUT}/{d}", exist_ok=True)
def svgdoc(w, h, body, title, vb=None):
    vb = vb or f"0 0 {w:g} {h:g}"
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" width="{w:g}" height="{h:g}" role="img" aria-labelledby="t">'
            f'<title id="t">{title}</title>{body}</svg>\n')
def r2(v): return round(v, 2)
# ---- wordmark
W = word(100); x0, y0, x1, y1 = W['bb']
ww, wh = r2(x1 - x0), r2(y1 - y0)
def word_body(ink, dot):
    g = "".join(f'<path d="{d}"/>' for d in W['ink'])
    c = "".join(f'<circle cx="{cx:g}" cy="{cy:g}" r="{r:g}" fill="{dot}"/>' for cx, cy, r in W['dots'])
    return f'<g transform="translate({-x0:.2f} {-y0:.2f})"><g fill="{ink}">{g}</g>{c}</g>'
variants = {"kolor": (INK, GREEN), "negatyw": (PAPER, GREEN), "czarny": (INK, INK), "bialy": (WHITE, WHITE)}
for n, (ink, dot) in variants.items():
    open(f"{OUT}/napis/drozniak-napis-{n}.svg", "w").write(svgdoc(ww, wh, word_body(ink, dot), "Drożniak"))
# ---- symbol (regular and small cut)
def sym_files(geom, suffix):
    bx0, by0, bx1, by1 = geom['bb']; w, h = r2(bx1 - bx0), r2(by1 - by0)
    cx, cy, r = geom['dot']
    for n, (ink, dot) in variants.items():
        body = f'<g transform="translate({-bx0:.2f} {-by0:.2f})"><path fill="{ink}" d="{geom["d"]}"/><circle cx="{cx}" cy="{cy}" r="{r}" fill="{dot}"/></g>'
        open(f"{OUT}/znak/drozniak-znak{suffix}-{n}.svg", "w").write(svgdoc(w, h, body, "Drożniak, znak D."))
    return w, h
G = symbol(); Gs = symbol(**SMALL)
sw, sh = sym_files(G, ""); ssw, ssh = sym_files(Gs, "-maly")
# ---- icons: tile with symbol (small cut), optical centre slightly up/left of bbox centre
def tile(geom, size=512, radius=None, circle=False, bg=DEEP, ink=PAPER, dot=GREEN, scale=0.56):
    bx0, by0, bx1, by1 = geom['bb']; w, h = bx1 - bx0, by1 - by0
    s = size * scale / max(w, h)
    # optical centre: centre the D body (without dot overhang) and nudge up 1.5%
    tx = (size - w * s) / 2 - bx0 * s + size * 0.012
    ty = (size - h * s) / 2 - by0 * s - size * 0.004
    cx, cy, r = geom['dot']
    shape = f'<circle cx="{size/2:g}" cy="{size/2:g}" r="{size/2:g}" fill="{bg}"/>' if circle else f'<rect width="{size}" height="{size}" rx="{radius if radius is not None else size*0.22:.1f}" fill="{bg}"/>'
    body = shape + f'<g transform="translate({tx:.2f} {ty:.2f}) scale({s:.4f})"><path fill="{ink}" d="{geom["d"]}"/><circle cx="{cx}" cy="{cy}" r="{r}" fill="{dot}"/></g>'
    return svgdoc(size, size, body, "Drożniak")
open(f"{OUT}/ikony/drozniak-ikona-aplikacji.svg", "w").write(tile(Gs))
open(f"{OUT}/ikony/drozniak-awatar.svg", "w").write(tile(Gs, circle=True, scale=0.5))
open(f"{OUT}/ikony/favicon.svg", "w").write(tile(Gs, size=64, radius=12, scale=0.66))
open(f"{OUT}/ikony/drozniak-awatar-jasny.svg", "w").write(tile(Gs, circle=True, scale=0.5, bg=PAPER, ink=INK))
print("wordmark", ww, wh, "cap", W['cap'], "xh", round(W['xh'], 2), "dot", W['dots'])
print("symbol", sw, sh, G['params']); print("small", ssw, ssh)
