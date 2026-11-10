"""Geometria logo Drożniak: napis, znak (D z kropką nad literą) i poprzedni znak z wersji 1.0."""
import sys, os, math
sys.path.insert(0, os.path.dirname(__file__))
from brandlib import wordmark, bbox_of, load, glyph_d, glyph_bounds
S = os.environ.get("S", ""); F = f"{S}/fonts"; BRY = f"{F}/Brygada1918[wght].ttf"

# Proporcje kropki wzięte z napisu: średnica K i odstęp od litery równy 0,457 K.
GAP_K = 0.457

def symbol(wght=600, k=0.32, cap=176, dx=0.012):
    """Znak: wersalik D z Brygady 1918 i okrągła kropka nad literą.
    k = średnica kropki względem wysokości litery, dx = przesunięcie kropki w prawo względem szerokości litery."""
    tt, _ = load(BRY, wght)
    s = cap / tt['OS/2'].sCapHeight
    b = glyph_bounds(tt, 'D')
    w = (b[2] - b[0]) * s
    K = k * cap; r = K / 2; gap = GAP_K * K
    top = K + gap                      # górna krawędź litery
    base = top + cap                   # linia pisma
    d = glyph_d(tt, 'D', s, -b[0] * s, base)
    cx = w / 2 + dx * w; cy = r
    motion = f"M{-1.6*w:.2f} {cy:.2f}H{cx:.2f}"   # kropka wjeżdża po linii z lewej i staje nad literą
    return dict(d=d, dot=(round(cx, 2), round(cy, 2), round(r, 2)), bb=(0, 0, round(w, 2), round(base, 2)), motion=motion,
                params=dict(cap=cap, w=w, K=K, gap=gap, top=top, base=base, wght=wght, k=k, s=s))

SMALL = dict(wght=700, k=0.40)

def symbol_v1(wv=34, wh=32, L=44, T=40, B=216, cx=130, dot_r=22, push=30, gap=10, ang=45, delta_deg=22.5):
    """Znak z wersji 1.0 (bezszeryfowe D z kropką u dołu po prawej). Zostaje tylko do porównań."""
    R = (B - T) / 2; cy = (T + B) / 2
    rx, ry = R - wv, R - wh
    Rc = R - (wv + wh) / 4
    a = math.radians(ang)
    rd = Rc + push
    dcx, dcy = cx + rd * math.cos(a), cy + rd * math.sin(a)
    delta = math.radians(delta_deg)
    a1, a2 = a - delta, a + delta
    def ell(t):
        r = 1 / math.sqrt((math.cos(t) / rx) ** 2 + (math.sin(t) / ry) ** 2)
        return cx + r * math.cos(t), cy + r * math.sin(t)
    po = lambda t: (cx + R * math.cos(t), cy + R * math.sin(t))
    o1, o2, i1, i2 = po(a1), po(a2), ell(a1), ell(a2)
    f = lambda p: f"{p[0]:.2f} {p[1]:.2f}"
    d = (f"M{L} {T}H{cx}A{R:g} {R:g} 0 0 1 {f(o1)}L{f(i1)}A{rx:g} {ry:g} 0 0 0 {cx} {T+wh}"
         f"H{L+wv}V{B-wh}H{cx}A{rx:g} {ry:g} 0 0 0 {f(i2)}L{f(o2)}A{R:g} {R:g} 0 0 1 {cx} {B}H{L}Z")
    bb = (L, T, max(cx + R, dcx + dot_r), max(B, dcy + dot_r))
    return dict(d=d, dot=(round(dcx, 2), round(dcy, 2), dot_r), bb=bb)

def word(cap=100):
    m = wordmark(BRY, 600, "Drożniak", cap, x0=0, base=cap, dot=dict(scale=1.25))
    pb = bbox_of(m['ink'])
    dots = m['dots']
    x0 = min(pb[0], min(c[0] - c[2] for c in dots)); x1 = max(pb[2], max(c[0] + c[2] for c in dots))
    y0 = min(pb[1], min(c[1] - c[2] for c in dots)); y1 = max(pb[3], cap)
    return dict(ink=m['ink'], dots=dots, bb=(x0, y0, x1, y1), cap=cap, xh=m['tt']['OS/2'].sxHeight * m['scale'])
