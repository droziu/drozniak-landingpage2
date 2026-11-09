"""Brand marks as reusable SVG fragments (ink = currentColor, dot = var(--dot))."""
import sys, os, math
sys.path.insert(0, os.path.dirname(__file__))
from brandlib import load, glyph_d, glyph_bounds, wordmark
S = os.environ["S"]; F = f"{S}/fonts"
BRY = f"{F}/Brygada1918[wght].ttf"
DOT = 'fill="var(--dot, currentColor)"'

def wordmark_symbol(cap=100, wght=600, dot_scale=1.25):
    m = wordmark(BRY, wght, "Drożniak", cap, x0=0, base=cap, dot=dict(scale=dot_scale))
    paths = "".join(f'<path d="{d}"/>' for d in m['ink'])
    dots = "".join(f'<circle cx="{cx}" cy="{cy}" r="{r}" {DOT}/>' for cx, cy, r in m['dots'])
    from brandlib import bbox_of
    pb = bbox_of(m['ink'])
    top = min(min(cy - r for cx, cy, r in m['dots']), pb[1])
    # descender-free word: bottom = baseline (+ small overshoot)
    vb = (-2, round(top - 2, 2), round(m['width'] + 4, 2), round(cap + 4 - (top - 2), 2))
    return vb, f'<g fill="currentColor">{paths}</g>{dots}'

def A_geom(w=34, L=44, T=40, B=216, cx=130, dot_r=22, push=30, gap=10, ang=45):
    R = (B - T) / 2; ri = R - w; cy = (T + B) / 2; Rc = R - w / 2
    a = math.radians(ang)
    dcx = cx + (Rc + push) * math.cos(a); dcy = cy + (Rc + push) * math.sin(a)
    delta = max(math.asin(min(1, (dot_r + gap) / (Rc + push))), (dot_r + gap) / R)
    a1, a2 = a - delta, a + delta
    po = lambda r, t: (cx + r * math.cos(t), cy + r * math.sin(t))
    o1, i1, o2, i2 = po(R, a1), po(ri, a1), po(R, a2), po(ri, a2)
    d = (f"M{L} {T} H{cx} A{R:g} {R:g} 0 0 1 {o1[0]:.2f} {o1[1]:.2f} L{i1[0]:.2f} {i1[1]:.2f} "
         f"A{ri:g} {ri:g} 0 0 0 {cx} {T+w} H{L+w} V{B-w} H{cx} A{ri:g} {ri:g} 0 0 0 {i2[0]:.2f} {i2[1]:.2f} "
         f"L{o2[0]:.2f} {o2[1]:.2f} A{R:g} {R:g} 0 0 1 {cx} {B} H{L} Z")
    sx = L + w / 2
    c45 = po(Rc, a)
    motion = f"M{sx:g} {B - w/2:g} V{T + w/2:g} H{cx} A{Rc:g} {Rc:g} 0 0 1 {c45[0]:.2f} {c45[1]:.2f} L{dcx:.2f} {dcy:.2f}"
    bb = (L, T, max(cx + R, dcx + dot_r), max(B, dcy + dot_r))
    return dict(d=d, dot=(round(dcx, 2), round(dcy, 2), dot_r), motion=motion, bb=bb)

def A_symbol(pad=6):
    from master import symbol
    g = symbol(); x0, y0, x1, y1 = g['bb']
    vb = (x0 - pad, y0 - pad, x1 - x0 + 2 * pad, y1 - y0 + 2 * pad)
    cx, cy, r = g['dot']
    return vb, f'<path fill="currentColor" d="{g["d"]}"/><circle cx="{cx}" cy="{cy}" r="{r}" {DOT}/>', g

def B_symbol(cap=150):
    tt, _ = load(BRY, 600)
    s = cap / tt['OS/2'].sCapHeight
    db = glyph_bounds(tt, 'D'); stem = 92 * s; r = stem / 2 * 1.08; gap = stem * 0.95
    total = cap + gap + 2 * r; top = 0; base = total
    x = -db[0] * s
    d = glyph_d(tt, 'D', s, x, base)
    dcx = x + (db[0] + (db[2] - db[0]) * 0.46) * s
    w = (db[2] - db[0]) * s
    vb = (-8, -8, round(w + 16, 2), round(total + 16, 2))
    return vb, f'<path fill="currentColor" d="{d}"/><circle cx="{dcx:.2f}" cy="{r:.2f}" r="{r:.2f}" {DOT}/>'

def C_symbol(t=34, T=100, B=214, dot_r=22, gap=20):
    W = (B - T) + t * math.sqrt(2); L = 0; R = W
    pts = [(L, T), (R, T), (R - (B - t - T), B - t), (R, B - t), (R, B), (L, B), (L + (B - T - t), T + t), (L, T + t)]
    d = "M" + " L".join(f"{x:.2f} {y:.2f}" for x, y in pts) + " Z"
    cy = T - gap - dot_r
    vb = (-8, round(cy - dot_r - 8, 2), round(W + 16, 2), round(B - (cy - dot_r) + 16, 2))
    return vb, f'<path fill="currentColor" d="{d}"/><circle cx="{W/2:.2f}" cy="{cy:.2f}" r="{dot_r}" {DOT}/>'
