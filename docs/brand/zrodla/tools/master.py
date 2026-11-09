"""Final master geometry for the Drożniak marks."""
import sys, os, math
sys.path.insert(0, os.path.dirname(__file__))
from brandlib import wordmark, bbox_of
S = os.environ.get("S", ""); F = f"{S}/fonts"; BRY = f"{F}/Brygada1918[wght].ttf"

def symbol(wv=34, wh=32, L=44, T=40, B=216, cx=130, dot_r=22, push=30, gap=10, ang=45, delta_deg=22.5):
    R = (B - T) / 2; cy = (T + B) / 2
    rx, ry = R - wv, R - wh
    Rc = R - (wv + wh) / 4
    a = math.radians(ang)
    rd = Rc + push
    dcx, dcy = cx + rd * math.cos(a), cy + rd * math.sin(a)
    delta = math.radians(delta_deg) if delta_deg else max(math.asin(min(1, (dot_r + gap) / rd)), (dot_r + gap) / R)
    a1, a2 = a - delta, a + delta
    def ell(t):
        r = 1 / math.sqrt((math.cos(t) / rx) ** 2 + (math.sin(t) / ry) ** 2)
        return cx + r * math.cos(t), cy + r * math.sin(t)
    po = lambda t: (cx + R * math.cos(t), cy + R * math.sin(t))
    o1, o2, i1, i2 = po(a1), po(a2), ell(a1), ell(a2)
    f = lambda p: f"{p[0]:.2f} {p[1]:.2f}"
    d = (f"M{L} {T}H{cx}A{R:g} {R:g} 0 0 1 {f(o1)}L{f(i1)}A{rx:g} {ry:g} 0 0 0 {cx} {T+wh}"
         f"H{L+wv}V{B-wh}H{cx}A{rx:g} {ry:g} 0 0 0 {f(i2)}L{f(o2)}A{R:g} {R:g} 0 0 1 {cx} {B}H{L}Z")
    # centre-line route for animation: stem bottom -> up -> top bar -> arc -> out through the gap to the dot
    c45 = (cx + Rc * math.cos(a), cy + Rc * math.sin(a))
    motion = f"M{L+wv/2:g} {B-wh/2:g}V{T+wh/2:g}H{cx}A{Rc:g} {Rc:g} 0 0 1 {f(c45)}L{dcx:.2f} {dcy:.2f}"
    bb = (L, T, max(cx + R, dcx + dot_r), max(B, dcy + dot_r))
    return dict(d=d, dot=(round(dcx, 2), round(dcy, 2), dot_r), bb=bb, motion=motion,
                params=dict(wv=wv, wh=wh, R=R, rx=rx, ry=ry, cx=cx, cy=cy, L=L, T=T, B=B, dot_r=dot_r, gap=gap, delta=math.degrees(delta), a1=math.degrees(a1), a2=math.degrees(a2), rd=rd))

SMALL = dict(wv=46, wh=44, dot_r=29, push=26, gap=15, delta_deg=30)

def word(cap=100):
    m = wordmark(BRY, 600, "Drożniak", cap, x0=0, base=cap, dot=dict(scale=1.25))
    pb = bbox_of(m['ink'])
    dots = m['dots']
    x0 = min(pb[0], min(c[0] - c[2] for c in dots)); x1 = max(pb[2], max(c[0] + c[2] for c in dots))
    y0 = min(pb[1], min(c[1] - c[2] for c in dots)); y1 = max(pb[3], cap)
    return dict(ink=m['ink'], dots=dots, bb=(x0, y0, x1, y1), cap=cap, xh=m['tt']['OS/2'].sxHeight * m['scale'])
