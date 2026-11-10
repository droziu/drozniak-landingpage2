"""Animacja znaku: trasa kropki, tempo i klatki.

Kropka objeżdża literę D jej środkiem i przy okazji ją rysuje: górna belka, brzuszek, dolna belka, zakręt,
trzon w górę. Na trzonie przyspiesza, z jego końca wyskakuje nad literę, w najwyższym punkcie zwalnia do zera,
opada na swoje miejsce, ugina się raz poniżej i wraca.

Te same liczby są na stronie w app/components/brand/markRoute.ts. Zmiana tutaj wymaga tej samej zmiany tam.
Współrzędne są w układzie pliku znaku (master.symbol). Osie belek, trzonu i brzuszka są zmierzone na krzywych
litery, więc przy zmianie kroju albo litery trzeba je zmierzyć od nowa.
"""
import os, sys, math, bisect
sys.path.insert(0, os.path.dirname(__file__))
from master import symbol
import tokens as T

G = symbol()
X0, Y0, X1, Y1 = G['bb']
HOME = (G['dot'][0], G['dot'][1]); R = G['dot'][2]

# ------------------------------------------------------------------ trasa
TOP, BOTTOM, STEM, TURN, LAUNCH, K = 86.66, 253.46, 35.73, 16, 82, 0.5523
JUMP = 36                                   # najwyższy punkt skoku: tyle nad miejscem kropki
APEX = ((STEM + HOME[0]) / 2, HOME[1] - JUMP)
DIP_ROOM = 24                               # odcinek pod miejscem kropki na ugięcie
START = (-30, TOP)
SEGS = [  # (koniec) albo (kontrolny 1, kontrolny 2, koniec)
    ((56, TOP),),                                                                               # 0 górna belka
    ((85.14, TOP),),                                                                            # 1 górna belka, dalej
    ((125.52, TOP), (158.26, 123.29), (158.26, 168.48)),                                        # 2 brzuszek, góra
    ((158.26, 215.39), (125.61, BOTTOM), (85.33, BOTTOM)),                                      # 3 brzuszek, dół
    ((60, BOTTOM),),                                                                            # 4 dolna belka
    ((STEM + TURN, BOTTOM),),                                                                   # 5 dolna belka, dalej
    ((STEM + TURN - K * TURN, BOTTOM), (STEM, BOTTOM - TURN + K * TURN), (STEM, BOTTOM - TURN)),  # 6 zakręt w trzon
    ((STEM, LAUNCH),),                                                                          # 7 trzon w górę
    ((STEM, LAUNCH - K * (LAUNCH - APEX[1])), (APEX[0] - K * (APEX[0] - STEM), APEX[1]), APEX),  # 8 skok, w górę
    ((APEX[0] + K * (HOME[0] - APEX[0]), APEX[1]), (HOME[0], HOME[1] - K * (HOME[1] - APEX[1])), HOME),  # 9 skok, w dół
    ((HOME[0], HOME[1] + DIP_ROOM),),                                                           # 10 ugięcie (tylko kropka)
]
SEG_JUMP, SEG_FALL, SEG_DIP = 8, 9, 10

def _start(i): return START if i == 0 else SEGS[i - 1][-1]

def _pt(i, t):
    a = _start(i); s = SEGS[i]
    if len(s) == 1:
        return (a[0] + (s[0][0] - a[0]) * t, a[1] + (s[0][1] - a[1]) * t)
    u = 1 - t; c1, c2, b = s
    return tuple(u**3 * a[k] + 3 * u * u * t * c1[k] + 3 * u * t * t * c2[k] + t**3 * b[k] for k in (0, 1))

_N = 240
_TABLE = []                                  # dla każdego odcinka: długości narastająco co 1/_N
for _i in range(len(SEGS)):
    acc = [0.0]; prev = _start(_i)
    for _k in range(1, _N + 1):
        q = _pt(_i, _k / _N); acc.append(acc[-1] + math.hypot(q[0] - prev[0], q[1] - prev[1])); prev = q
    _TABLE.append(acc)
LENGTHS = [t[-1] for t in _TABLE]
TOTAL = sum(LENGTHS[:SEG_DIP])               # od startu do miejsca kropki: „1” dla ruchu, „100” dla kresek maski
def length_to(i): return sum(LENGTHS[:i])
def at(i): return 100 * length_to(i) / TOTAL

def point(dist):
    """Punkt trasy w odległości dist od startu (w jednostkach znaku)."""
    dist = max(0.0, min(dist, sum(LENGTHS) - 1e-6))
    for i, L in enumerate(LENGTHS):
        if dist <= L or i == len(LENGTHS) - 1:
            acc = _TABLE[i]; j = min(_N - 1, max(0, bisect.bisect_right(acc, dist) - 1))
            f = (dist - acc[j]) / ((acc[j + 1] - acc[j]) or 1)
            return _pt(i, (j + f) / _N)
        dist -= L

def _p(q): return f"{q[0]:.2f} {q[1]:.2f}"
def path_of(a, b):
    d = "M" + _p(_start(a))
    for i in range(a, b + 1):
        s = SEGS[i]
        d += ("C" + " ".join(_p(q) for q in s)) if len(s) == 3 else ("L" + _p(s[0]))
    return d

ROUTE_D = path_of(0, SEG_DIP)                # cała trasa kropki, z odcinkiem na ugięcie
ROUTE_REST = 100 * TOTAL / (TOTAL + DIP_ROOM)  # miejsce kropki na tej trasie, w procentach długości

# Kreski maski: (odcinki od, do, grubość, czy omija trzon). Każda zaczyna się w at(od), więc dostaje przerywanie
# „(100 − start) 300”: przy wspólnym przesunięciu 100 → 0 jej koniec wypada dokładnie pod kropką.
INK = [(0, 1, 16, True), (1, 5, 44, False), (5, 6, 82, True), (6, 7, 44, False)]
# Wnętrze trzonu między belkami, jako prostokąty (x, y, szerokość, wysokość). Kreski belek są grubsze niż belki
# i bez tego odsłaniałyby końce trzonu, zanim kropka do niego dojedzie. Trzon odsłania tylko jego własna kreska.
# U góry pole jest szersze od trzonu, żeby małe ścięcia w narożnikach nie pokazały się przed trzonem.
# U dołu kończy się na krawędziach trzonu: tamte ścięcia odsłania kreska dolnej belki, tuż przed trzonem.
STEM_BOXES = [(16, 91.25, 39, 148.75), (19.9, 240, 31.65, 8.86)]
FIELD = (-40, -10, 260, 290)                # pole maski: litera z zapasem na grubość kresek
BESIDE_STEM = (f"M{FIELD[0]} {FIELD[1]}h{FIELD[2]}v{FIELD[3]}h{-FIELD[2]}z"
               + "".join(f"M{x} {y}h{w}v{h}h{-w}z" for x, y, w, h in STEM_BOXES))   # pole bez trzonu (evenodd)

# ------------------------------------------------------------------ tempo
POP_MS, POP_LEN = 100, 200      # kropka pojawia się skalą od zera
START_MS = 180                  # początek przejazdu
DRAW_MS = 900                   # rysowanie litery, od startu do końca trzonu
LAUNCH_BOOST = 1.35             # prędkość na końcu trzonu względem tempa na brzuszku
TURN_SLOWDOWN = 0.28            # zwolnienie w zakręcie
DAMPING, OMEGA = T.LAND_DAMPING, T.LAND_OMEGA   # sprężyna lądowania, jak w tokenach
END_MS = 2400                   # do tej chwili znak stoi; potem przejście (400 ms)
STEP_MS = 20

def _smooth(a, b, x):
    t = min(1, max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t)

def _simulate():
    s_turn = (at(6) + at(7)) / 200; s_stem = at(7) / 100; s_launch = at(SEG_JUMP) / 100; s_apex = at(SEG_FALL) / 100
    def speed(s):
        start = 0.35 + 0.65 * _smooth(0, 0.08, s)
        corner = 1 - TURN_SLOWDOWN * math.exp(-(((s - s_turn) / 0.04) ** 2))
        stem = 1 + (LAUNCH_BOOST - 1) * _smooth(s_stem, s_launch, s)
        return start * corner * stem
    steps = 5000; ds = s_launch / steps; time = [0.0]
    for i in range(steps): time.append(time[i] + ds / speed((i + 0.5) * ds))
    scale = DRAW_MS / time[steps]
    def draw_at(ms):
        t = ms / scale; lo = min(steps - 1, max(0, bisect.bisect_right(time, t) - 1))
        return (lo + (t - time[lo]) / (time[lo + 1] - time[lo])) * ds
    v_launch = speed(s_launch) / scale; up = s_apex - s_launch; up_ms = 2 * up / v_launch
    decay = DAMPING * OMEGA / math.sqrt(1 - DAMPING ** 2); fall = 1 - s_apex
    settle_ms = 1000 * math.log(fall * TOTAL * 4) / decay
    def spring(ms):
        t = ms / 1000
        return 1 - fall * math.exp(-decay * t) * (math.cos(OMEGA * t) + decay / OMEGA * math.sin(OMEGA * t))
    ms = math.ceil((DRAW_MS + up_ms + settle_ms) / STEP_MS) * STEP_MS
    def progress(t):
        """Droga kropki po t ms od startu przejazdu; 1 = miejsce kropki, powyżej 1 = ugięcie."""
        if t <= 0: return 0.0
        if t >= ms: return 1.0
        if t <= DRAW_MS: return draw_at(t)
        if t <= DRAW_MS + up_ms:
            u = t - DRAW_MS; return s_launch + v_launch * u - v_launch * u * u / (2 * up_ms)
        return spring(t - DRAW_MS - up_ms)
    land = (math.pi - math.acos(DAMPING)) / OMEGA; dip = math.pi / OMEGA
    marks = dict(launch=DRAW_MS, apex=DRAW_MS + up_ms, land=DRAW_MS + up_ms + land * 1000, dip=DRAW_MS + up_ms + dip * 1000,
                 dip_units=(spring(dip * 1000) - 1) * TOTAL, cruise=TOTAL / scale * 1000, v_launch=v_launch * TOTAL * 1000)
    return progress, ms, marks

PROGRESS, ROUTE_MS, MARKS = _simulate()

def linear(clamp=False):
    vals = [PROGRESS(t) for t in range(0, ROUTE_MS + 1, STEP_MS)]
    return "linear(" + ", ".join(f"{round(min(1, v) if clamp else v, 4):g}" for v in vals) + ")"

def state(ms):
    """Stan animacji po ms od jej początku: (x, y kropki, skala kropki, postęp rysowania 0–1)."""
    p = PROGRESS(ms - START_MS)
    x, y = point(p * TOTAL)
    u = min(1, max(0, (ms - POP_MS) / POP_LEN)); scale = 1 - (1 - u) ** 3
    return x, y, scale, min(1, p)

# ------------------------------------------------------------------ rysunki
PAD = 8
_L, _T, _R, _B = START[0] - R, APEX[1] - R, 158.26 + R, BOTTOM + R      # skrajne położenia kropki na trasie
VIEW = (_L - PAD, _T - PAD, _R - _L + 2 * PAD, _B - _T + 2 * PAD)
_uid = [0]

def _letter(p, ink, opacity=1):
    """Litera odsłonięta do postępu p (0–1) maską z kresek po trasie."""
    if p >= 1: return f'<path fill="{ink}" d="{G["d"]}" opacity="{opacity}"/>'
    if p <= 0: return ""
    _uid[0] += 1; u = _uid[0]; off = 100 * (1 - p); fx, fy, fw, fh = FIELD
    clip = f'<clipPath id="rz{u}-c"><path clip-rule="evenodd" d="{BESIDE_STEM}"/></clipPath>'
    strokes = ""
    for a, b, w, beside in INK:
        st = at(a); ln = at(b + 1) - st
        path = (f'<path d="{path_of(a, b)}" pathLength="{ln:.4f}" stroke-width="{w}" stroke-dasharray="{100 - st:.4f} 300" stroke-dashoffset="{off:.4f}"/>')
        strokes += f'<g clip-path="url(#rz{u}-c)">{path}</g>' if beside else path
    return (f'<defs>{clip}<mask id="rz{u}" maskUnits="userSpaceOnUse" x="{fx}" y="{fy}" width="{fw}" height="{fh}">'
            f'<g fill="none" stroke="#fff">{strokes}</g></mask></defs><path fill="{ink}" d="{G["d"]}" mask="url(#rz{u})" opacity="{opacity}"/>')

def frame(ms, ink=T.PAPER, dot=T.GREEN_L):
    """Klatka animacji po ms od jej początku."""
    x, y, sc, p = state(ms)
    circle = f'<circle cx="{x:.2f}" cy="{y:.2f}" r="{R * sc:.2f}" fill="{dot}"/>' if sc > 0 else ""
    return (f'<svg viewBox="{" ".join(f"{v:.2f}" for v in VIEW)}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
            f'{_letter(p, ink)}{circle}</svg>')

def route_figure(ink=T.PAPER, dot=T.GREEN_L, every=40):
    """Trasa kropki na gotowym znaku: linia trasy i położenie kropki co `every` ms. Gęsto znaczy wolno."""
    end = START_MS + ROUTE_MS
    marks = "".join(f'<circle cx="{x:.2f}" cy="{y:.2f}" r="2.6" fill="{dot}"/>'
                    for x, y, _, _ in (state(t) for t in range(START_MS, end + 1, every)))
    route = f'<path d="{path_of(0, SEG_FALL)}" fill="none" stroke="{dot}" stroke-width="1.2" opacity=".55"/>'
    return (f'<svg viewBox="{" ".join(f"{v:.2f}" for v in VIEW)}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
            f'<path fill="{ink}" d="{G["d"]}" opacity=".2"/>{route}{marks}'
            f'<circle cx="{HOME[0]}" cy="{HOME[1]}" r="{R}" fill="none" stroke="{dot}" stroke-width="1.5"/></svg>')

def short_frame(u, ink=T.PAPER, dot=T.GREEN_L):
    """Klatka wersji krótkiej: litera stoi, kropka pojawia się 0,9 K nad swoim miejscem i ląduje. u = 0..1 czasu."""
    t = u * T.LAND_MS / 1000; dec = DAMPING * OMEGA / math.sqrt(1 - DAMPING ** 2)
    p = 1 if u >= 1 else 1 - math.exp(-dec * t) * (math.cos(OMEGA * t) + dec / OMEGA * math.sin(OMEGA * t))
    sc = 1 - (1 - min(1, u * T.LAND_MS / 180)) ** 3
    y = HOME[1] - 0.9 * 2 * R * (1 - p)
    return (f'<svg viewBox="{" ".join(f"{v:.2f}" for v in VIEW)}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
            f'<path fill="{ink}" d="{G["d"]}"/><circle cx="{HOME[0]}" cy="{y:.2f}" r="{R * sc:.2f}" fill="{dot}"/></svg>')

# ------------------------------------------------------------------ przeskok kropki między punktami
# Kropka w schematach nie przesuwa się po linii, tylko przeskakuje z punktu na punkt: wybija się w górę, leci łukiem
# jak rzucona (stała prędkość w poziomie, w pionie rzut), ląduje, ugina się raz poniżej i wraca. Góra to zawsze góra
# ekranu. Te same liczby są na stronie w app/components/brand/dotHop.ts.
HOP = dict(base_ms=380, ms_per_px=0.9, min_ms=440, max_ms=680,     # czas lotu
           rise=0.16, min_rise=0.7, max_rise=3,                     # wysokość łuku: część drogi w poziomie, w średnicach kropki
           dip=0.12, min_dip=0.2, max_dip=0.45,                     # ugięcie: część wysokości opadania, w średnicach kropki
           settle_ms=380, pop_ms=200, hold_ms=1300, last_hold_ms=2200)

def hop(dx, dy, size, step=1000 / 60):
    """Przeskok o (dx, dy) pikseli dla kropki o średnicy size: (klatki [(ms, x, y)], czas lotu, czas całości, ugięcie)."""
    cl = lambda v, lo, hi: min(hi, max(lo, v))
    dist = math.hypot(dx, dy); flight = cl(HOP["base_ms"] + HOP["ms_per_px"] * dist, HOP["min_ms"], HOP["max_ms"])
    rise = cl(HOP["rise"] * abs(dx), HOP["min_rise"] * size, HOP["max_rise"] * size)
    top = rise + max(0, -dy); a = 2 * top + 2 * math.sqrt(top * (top + dy)); fall = top + dy
    dip = cl(HOP["dip"] * fall, HOP["min_dip"] * size, HOP["max_dip"] * size)
    decay = DAMPING * OMEGA / math.sqrt(1 - DAMPING ** 2); peak = math.atan(OMEGA / decay) / OMEGA
    amp = dip / (math.exp(-decay * peak) * math.sin(OMEGA * peak))
    total = flight + HOP["settle_ms"]; frames = []; t = 0.0
    while t < total:
        if t <= flight:
            u = t / flight; frames.append((t, dx * u, -a * u + (dy + a) * u * u))
        else:
            q = (t - flight) / 1000; frames.append((t, dx, dy + amp * math.exp(-decay * q) * math.sin(OMEGA * q)))
        t += step
    frames.append((total, dx, dy))
    return frames, flight, total, dip

def hop_figure(direction="row", n=4, gap=240, L=8, ink=T.INK, dot=T.GREEN, every=40):
    """Schemat z n punktami i przeskokami kropki: położenie kropki co `every` ms na każdym łuku."""
    size = 3 * L; pad = 2 * size
    pts = [(pad + i * gap, pad + size * 3.4) if direction == "row" else (pad, pad + size + i * gap) for i in range(n)]
    x0, y0 = pts[0]; x1, y1 = pts[-1]
    s = (f'<rect x="{x0:.1f}" y="{y0 - L / 2:.1f}" width="{x1 - x0:.1f}" height="{L}" fill="{ink}"/>' if direction == "row"
         else f'<rect x="{x0 - L / 2:.1f}" y="{y0:.1f}" width="{L}" height="{y1 - y0:.1f}" fill="{ink}"/>')
    s += "".join(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{L}" fill="{ink}"/>' for x, y in pts[:-1])
    for (ax, ay), (bx, by) in zip(pts, pts[1:]):
        frames, _, _, _ = hop(bx - ax, by - ay, size, step=every)
        s += "".join(f'<circle cx="{ax + fx:.1f}" cy="{ay + fy:.1f}" r="{L * 0.42:.1f}" fill="{dot}"/>' for _, fx, fy in frames[1:-1])
    s += f'<circle cx="{x1:.1f}" cy="{y1:.1f}" r="{size / 2}" fill="{dot}"/>'
    w = (x1 + pad) if direction == "row" else (pad * 2 + size)
    h = (y1 + pad) if direction == "row" else (y1 + pad + size)
    return f'<svg viewBox="0 0 {w:.1f} {h:.1f}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">{s}</svg>'

def sek(ms):
    """Czas w sekundach po polsku, z dokładnością do 0,05 s."""
    return f"{round(ms / 50) * 50 / 1000:.2f}".rstrip("0").rstrip(".").replace(".", ",") + " s"

if __name__ == "__main__":
    print("trasa:", round(TOTAL, 1), "czas przejazdu:", ROUTE_MS, "ms")
    print({k: round(v, 1) for k, v in MARKS.items()})
