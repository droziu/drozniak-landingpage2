"""Rysunki SVG do księgi marki, wszystkie z jednej geometrii (master.py)."""
import os, sys, math
sys.path.insert(0, os.path.dirname(__file__))
from master import symbol, symbol_v1, word, SMALL, GAP_K
from tokens import INK, PAPER, GREEN, GREEN_L, DEEP, MUTED, STONE, WHITE, LINE2
G = symbol(); GS = symbol(**SMALL); W = word(100); G1 = symbol_v1()
GUIDE = "#8A867A"

def _sym_inner(g, ink, dot):
    cx, cy, r = g['dot']
    return f'<path fill="{ink}" d="{g["d"]}"/><circle cx="{cx}" cy="{cy}" r="{r}" fill="{dot}"/>'

def sym_svg(ink=INK, dot=GREEN, small=False, cls="", style="", pad=0, v1=False):
    g = G1 if v1 else (GS if small else G)
    x0, y0, x1, y1 = g['bb']
    return (f'<svg class="{cls}" style="{style}" viewBox="{x0-pad:.2f} {y0-pad:.2f} {x1-x0+2*pad:.2f} {y1-y0+2*pad:.2f}" '
            f'xmlns="http://www.w3.org/2000/svg" aria-hidden="true">{_sym_inner(g, ink, dot)}</svg>')

def _word_inner(ink, dot):
    paths = "".join(f'<path d="{d}"/>' for d in W['ink'])
    dots = "".join(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{dot}"/>' for cx, cy, r in W['dots'])
    return f'<g fill="{ink}">{paths}</g>{dots}'

def word_svg(ink=INK, dot=GREEN, cls="", style="", pad=0):
    x0, y0, x1, y1 = W['bb']
    return (f'<svg class="{cls}" style="{style}" viewBox="{x0-pad:.2f} {y0-pad:.2f} {x1-x0+2*pad:.2f} {y1-y0+2*pad:.2f}" '
            f'xmlns="http://www.w3.org/2000/svg" aria-hidden="true">{_word_inner(ink, dot)}</svg>')

def word_dims():
    x0, y0, x1, y1 = W['bb']; K = 2 * W['dots'][0][2]
    return dict(w=x1 - x0, h=y1 - y0, K=K, cap=W['cap'], xh=W['xh'], bb=W['bb'], dot=W['dots'][0])

def sym_dims(small=False):
    g = GS if small else G
    x0, y0, x1, y1 = g['bb']
    return dict(w=x1 - x0, h=y1 - y0, K=2 * g['dot'][2], bb=g['bb'], p=g['params'], dot=g['dot'])

# ------------------------------------------------------------------ pole ochronne: miara K narysowana kropkami
def _kdots(pts, r):
    return "".join(f'<circle cx="{x:.2f}" cy="{y:.2f}" r="{r*0.9:.2f}" fill="{GREEN}" opacity=".45"/>' for x, y in pts)

def clear_word(n=3):
    d = word_dims(); K = d['K']; m = n * K
    x0, y0, x1, y1 = d['bb']; r = K / 2
    vb = (x0 - m - 8, y0 - m - 8, (x1 - x0) + 2 * m + 16, (y1 - y0) + 2 * m + 16)
    zone = f'<rect x="{x0-m:.2f}" y="{y0-m:.2f}" width="{x1-x0+2*m:.2f}" height="{y1-y0+2*m:.2f}" fill="{STONE}"/>'
    inner = f'<rect x="{x0:.2f}" y="{y0:.2f}" width="{x1-x0:.2f}" height="{y1-y0:.2f}" fill="none" stroke="{GUIDE}" stroke-width="1" stroke-dasharray="5 4"/>'
    kx = x0 + 0.075 * (x1 - x0); my = (y0 + y1) / 2; pts = []
    for i in range(n):
        pts += [(x0 - r - i*K, my), (x1 + r + i*K, my), (kx, y0 - r - i*K), (kx, y1 + r + i*K)]
    return f'<svg viewBox="{" ".join(f"{v:.2f}" for v in vb)}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">{zone}{inner}{_word_inner(INK, GREEN)}{_kdots(pts, r)}</svg>'

def clear_sym(n=1, small=False):
    d = sym_dims(small); K = d['K']; m = n * K
    x0, y0, x1, y1 = d['bb']; r = K / 2; g = GS if small else G
    vb = (x0 - m - 6, y0 - m - 6, (x1 - x0) + 2 * m + 12, (y1 - y0) + 2 * m + 12)
    zone = f'<rect x="{x0-m:.2f}" y="{y0-m:.2f}" width="{x1-x0+2*m:.2f}" height="{y1-y0+2*m:.2f}" fill="{STONE}"/>'
    inner = f'<rect x="{x0:.2f}" y="{y0:.2f}" width="{x1-x0:.2f}" height="{y1-y0:.2f}" fill="none" stroke="{GUIDE}" stroke-width="1" stroke-dasharray="5 4"/>'
    my = y0 + (y1 - y0) * 0.62
    pts = [(x0 - r, my), (x1 + r, my), (x0 + r, y0 - r), (x0 + r, y1 + r)]
    return f'<svg viewBox="{" ".join(f"{v:.2f}" for v in vb)}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">{zone}{inner}{_sym_inner(g, INK, GREEN)}{_kdots(pts, r)}</svg>'

# ------------------------------------------------------------------ rysunek budowy znaku
def construction(small=False):
    g = GS if small else G; p = g['params']; cx, cy, r = g['dot']
    w, base, top, K, gap, cap = p['w'], p['base'], p['top'], p['K'], p['gap'], p['cap']
    lm = f'stroke="{GUIDE}" stroke-width="0.8" fill="none" stroke-dasharray="4 3"'
    ln = f'stroke="{GREEN}" stroke-width="1.2" fill="none"'
    t = lambda x, y, s, a="start", col=MUTED, fw=400: f'<text x="{x:.1f}" y="{y:.1f}" font-size="9.5" fill="{col}" text-anchor="{a}" font-weight="{fw}" font-family="Schibsted Grotesk, sans-serif">{s}</text>'
    xr = w + 22; xl = -22
    guides = (f'<line x1="{xl-18}" y1="{top:.1f}" x2="{xr+70}" y2="{top:.1f}" {lm}/><line x1="{xl-18}" y1="{base:.1f}" x2="{xr+70}" y2="{base:.1f}" {lm}/>'
              f'<line x1="{xl-18}" y1="0" x2="{xr+70}" y2="0" {lm}/><line x1="{xl-18}" y1="{K:.1f}" x2="{xr+70}" y2="{K:.1f}" {lm}/>'
              f'<line x1="{cx:.1f}" y1="-14" x2="{cx:.1f}" y2="{base+14:.1f}" {lm}/>')
    dim = lambda y0, y1, x: f'<line x1="{x}" y1="{y0:.1f}" x2="{x}" y2="{y1:.1f}" {ln}/><line x1="{x-4}" y1="{y0:.1f}" x2="{x+4}" y2="{y0:.1f}" {ln}/><line x1="{x-4}" y1="{y1:.1f}" x2="{x+4}" y2="{y1:.1f}" {ln}/>'
    dims = dim(0, K, xr + 8) + dim(K, top, xr + 8) + dim(top, base, xr + 8)
    kk = f"{p['k']:.2f}".replace(".", ",")
    labels = (t(xr + 18, K / 2 + 3.5, f"K = {kk} H", col=GREEN, fw=600) + t(xr + 18, K + gap / 2 + 3.5, "0,46 K")
              + t(xr + 18, top + cap / 2 + 3.5, "H") + t(cx, base + 28, "oś kropki", "middle"))
    return (f'<svg viewBox="{xl-24:.1f} -22 {xr + 96 - (xl - 24):.1f} {base + 60:.1f}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
            f'{_sym_inner(g, INK, GREEN)}{guides}{dims}{labels}</svg>')

# Klatki animacji znaku i trasa kropki są w ruch_znaku.py.
