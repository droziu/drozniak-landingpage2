"""SVG pieces for the brand book, all from the master geometry."""
import os, sys, math
sys.path.insert(0, os.path.dirname(__file__))
from master import symbol, word, SMALL
INK, PAPER, GREEN, DEEP, MUTED, STONE, WHITE = "#161511", "#F6F5F1", "#14945E", "#0E2A20", "#5E5A50", "#ECEAE3", "#FFFFFF"
G = symbol(); GS = symbol(**SMALL); W = word(100)

def _sym_inner(g, ink, dot):
    cx, cy, r = g['dot']
    return f'<path fill="{ink}" d="{g["d"]}"/><circle cx="{cx}" cy="{cy}" r="{r}" fill="{dot}"/>'

def sym_svg(ink=INK, dot=GREEN, small=False, cls="", style="", pad=0):
    g = GS if small else G
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
    return dict(w=x1 - x0, h=y1 - y0, K=K, cap=W['cap'], xh=W['xh'], bb=W['bb'])

def sym_dims(small=False):
    g = GS if small else G
    x0, y0, x1, y1 = g['bb']
    return dict(w=x1 - x0, h=y1 - y0, K=2 * g['dot'][2], bb=g['bb'], p=g['params'], dot=g['dot'])

# --- clear space diagrams: the unit K drawn as dots around the mark
def clear_word(scale_note=True):
    d = word_dims(); K = d['K']; m = 3 * K
    x0, y0, x1, y1 = d['bb']
    vb = (x0 - m - 8, y0 - m - 8, (x1 - x0) + 2 * m + 16, (y1 - y0) + 2 * m + 16)
    zone = f'<rect x="{x0-m:.2f}" y="{y0-m:.2f}" width="{x1-x0+2*m:.2f}" height="{y1-y0+2*m:.2f}" fill="{STONE}"/>'
    inner = f'<rect x="{x0:.2f}" y="{y0:.2f}" width="{x1-x0:.2f}" height="{y1-y0:.2f}" fill="{PAPER}"/>'
    dots = ""
    r = K / 2
    kx = x0 + 0.075 * (x1 - x0)   # vertical stacks above/below the D, away from the ż dot
    for i in range(3):
        dots += f'<circle cx="{x0 - r - i*K:.2f}" cy="{(y0+y1)/2:.2f}" r="{r*0.9:.2f}" fill="{GREEN}" opacity=".5"/>'
        dots += f'<circle cx="{x1 + r + i*K:.2f}" cy="{(y0+y1)/2:.2f}" r="{r*0.9:.2f}" fill="{GREEN}" opacity=".5"/>'
        dots += f'<circle cx="{kx:.2f}" cy="{y0 - r - i*K:.2f}" r="{r*0.9:.2f}" fill="{GREEN}" opacity=".5"/>'
        dots += f'<circle cx="{kx:.2f}" cy="{y1 + r + i*K:.2f}" r="{r*0.9:.2f}" fill="{GREEN}" opacity=".5"/>'
    return f'<svg viewBox="{" ".join(f"{v:.2f}" for v in vb)}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">{zone}{inner}{_word_inner(INK, GREEN)}{dots}</svg>'

def clear_sym():
    d = sym_dims(); K = d['K']; m = K
    x0, y0, x1, y1 = d['bb']
    vb = (x0 - m - 6, y0 - m - 6, (x1 - x0) + 2 * m + 12, (y1 - y0) + 2 * m + 12)
    zone = f'<rect x="{x0-m:.2f}" y="{y0-m:.2f}" width="{x1-x0+2*m:.2f}" height="{y1-y0+2*m:.2f}" fill="{STONE}"/>'
    inner = f'<rect x="{x0:.2f}" y="{y0:.2f}" width="{x1-x0:.2f}" height="{y1-y0:.2f}" fill="{PAPER}"/>'
    r = K / 2
    dots = "".join(f'<circle cx="{cx:.2f}" cy="{cy:.2f}" r="{r*0.9:.2f}" fill="{GREEN}" opacity=".5"/>' for cx, cy in [
        (x0 - r, (y0+y1)/2 - 20), (x1 + r, (y0+y1)/2 - 20), (x0 + 17, y0 - r), (x0 + 17, y1 + r)])
    return f'<svg viewBox="{" ".join(f"{v:.2f}" for v in vb)}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">{zone}{inner}{_sym_inner(G, INK, GREEN)}{dots}</svg>'

# --- construction drawing of the symbol
def construction():
    p = G['params']; cx, cy, R, rx, ry = p['cx'], p['cy'], p['R'], p['rx'], p['ry']
    L, T, B, wv, wh = p['L'], p['T'], p['B'], p['wv'], p['wh']
    dcx, dcy, dr = G['dot']
    ln = 'stroke="#14945E" stroke-width="0.9" fill="none"'
    lm = 'stroke="#8C877B" stroke-width="0.7" fill="none" stroke-dasharray="3 3"'
    a1, a2 = math.radians(p['a1']), math.radians(p['a2'])
    ray = lambda a, r0, r1: f'<line x1="{cx + r0*math.cos(a):.2f}" y1="{cy + r0*math.sin(a):.2f}" x2="{cx + r1*math.cos(a):.2f}" y2="{cy + r1*math.sin(a):.2f}" {lm}/>'
    guides = (f'<circle cx="{cx}" cy="{cy}" r="{R}" {lm}/>'
              f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" {lm}/>'
              f'<line x1="{L-14}" y1="{T}" x2="{cx+R+30}" y2="{T}" {lm}/><line x1="{L-14}" y1="{B}" x2="{cx+R+30}" y2="{B}" {lm}/>'
              f'<line x1="{cx}" y1="{T-14}" x2="{cx}" y2="{B+14}" {lm}/>'
              + ray(a1, 0, R + 34) + ray(a2, 0, R + 34) + ray(math.radians(45), 0, p['rd'] + dr + 8))
    lab = lambda x, y, t, anchor="start": f'<text x="{x:.1f}" y="{y:.1f}" font-size="7.2" fill="#5E5A50" text-anchor="{anchor}" font-family="Schibsted Grotesk, sans-serif">{t}</text>'
    labels = (lab(cx + (R + 38) * math.cos(a1), cy + (R + 38) * math.sin(a1) + 2, "22,5°")
              + lab(cx + (R + 38) * math.cos(a2) - 4, cy + (R + 38) * math.sin(a2) + 9, "67,5°")
              + lab(L + wv / 2, T - 6, "trzon 34", "middle") + lab(cx + 24, T + wh / 2 + 2.5, "32")
              + lab(cx + R + 32, T + 2.5, "") + lab(dcx + dr + 6, dcy + 2.5, "kropka 44 = K"))
    body = _sym_inner(G, INK, GREEN)
    return (f'<svg viewBox="{L-24} {T-26} {cx+R+90-(L-24)} {B+40-(T-26)}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
            f'<g opacity=".92">{body}</g>{guides}{labels}</svg>')

# --- motion frames
def motion_points(n=5):
    p = G['params']; L, T, B, wv, wh, cx, cy = p['L'], p['T'], p['B'], p['wv'], p['wh'], p['cx'], p['cy']
    Rc = p['R'] - (wv + wh) / 4; a = math.radians(45)
    sx, sy = L + wv / 2, B - wh / 2
    pts = [("v", (sx, sy), (sx, T + wh / 2)), ("h", (sx, T + wh / 2), (cx, T + wh / 2)), ("arc", None, None), ("l", (cx + Rc*math.cos(a), cy + Rc*math.sin(a)), G['dot'][:2])]
    seglen = [abs(sy - (T + wh / 2)), cx - sx, Rc * (math.pi / 2 + a), math.dist(pts[3][1], pts[3][2])]
    total = sum(seglen); out = []
    for i in range(n):
        s = total * i / (n - 1); k = 0
        while k < 3 and s > seglen[k]: s -= seglen[k]; k += 1
        if k == 0: out.append((sx, sy - s))
        elif k == 1: out.append((sx + s, T + wh / 2))
        elif k == 2:
            t = -math.pi / 2 + s / Rc; out.append((cx + Rc * math.cos(t), cy + Rc * math.sin(t)))
        else:
            (x1, y1), (x2, y2) = pts[3][1], pts[3][2]; u = min(1, s / seglen[3]); out.append((x1 + (x2 - x1) * u, y1 + (y2 - y1) * u))
    return out

def motion_frame(pt, ink=PAPER):
    x0, y0, x1, y1 = G['bb']; dr = G['dot'][2]
    return (f'<svg viewBox="{x0-4:.2f} {y0-4:.2f} {x1-x0+8:.2f} {y1-y0+8:.2f}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
            f'<path fill="{ink}" d="{G["d"]}"/><circle cx="{pt[0]:.2f}" cy="{pt[1]:.2f}" r="{dr}" fill="{GREEN}"/></svg>')
