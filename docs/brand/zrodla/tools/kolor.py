"""Rachunki na kolorach: sRGB i OKLCH, kontrast WCAG 2, APCA, symulacja ślepoty barw."""
import math
def hex2rgb(h): h = h.lstrip('#'); return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))
def rgb2hex(r): return '#%02X%02X%02X' % tuple(max(0, min(255, round(v))) for v in r)
def lin(c): c /= 255; return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
def unlin(c): c = max(0, min(1, c)); return 255 * (12.92 * c if c <= 0.0031308 else 1.055 * c ** (1 / 2.4) - 0.055)
def lum(h): r, g, b = (lin(v) for v in hex2rgb(h)); return 0.2126 * r + 0.7152 * g + 0.0722 * b
def contrast(a, b):
    la, lb = lum(a), lum(b); hi, lo = max(la, lb), min(la, lb); return (hi + 0.05) / (lo + 0.05)
def oklab(h):
    r, g, b = (lin(v) for v in hex2rgb(h))
    l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
    m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
    s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b
    l, m, s = l ** (1/3), m ** (1/3), s ** (1/3)
    return (0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
            1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
            0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s)
def oklch(h):
    L, a, b = oklab(h); return L, math.hypot(a, b), math.degrees(math.atan2(b, a)) % 360
def from_oklab(L, a, b):
    l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
    m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
    s = (L - 0.0894841775 * a - 1.2914855480 * b) ** 3
    r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
    g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
    bl = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
    return r, g, bl
def from_oklch(L, C, H):
    """gamut-map by reducing chroma"""
    for k in range(60):
        c = C * (1 - k / 60)
        r, g, b = from_oklab(L, c * math.cos(math.radians(H)), c * math.sin(math.radians(H)))
        if all(-0.0005 <= v <= 1.0005 for v in (r, g, b)): break
    return rgb2hex([unlin(v) for v in (r, g, b)])
def apca(text, bg):
    """APCA-W3 0.0.98G-4g Lc (text on bg). Positive = dark text on light."""
    def Y(h):
        r, g, b = (v / 255 for v in hex2rgb(h))
        return 0.2126729 * r ** 2.4 + 0.7151522 * g ** 2.4 + 0.0721750 * b ** 2.4
    def clamp(y): return y if y >= 0.022 else y + (0.022 - y) ** 1.414
    yt, yb = clamp(Y(text)), clamp(Y(bg))
    if abs(yb - yt) < 0.0005: return 0.0
    if yb > yt:
        s = (yb ** 0.56 - yt ** 0.57) * 1.14
        return 0.0 if s < 0.1 else (s - 0.027) * 100
    s = (yb ** 0.65 - yt ** 0.62) * 1.14
    return 0.0 if s > -0.1 else (s + 0.027) * 100
def naive_cmyk(h):
    r, g, b = (v / 255 for v in hex2rgb(h)); k = 1 - max(r, g, b)
    if k >= 1: return (0, 0, 0, 100)
    return tuple(round(100 * v) for v in ((1 - r - k) / (1 - k), (1 - g - k) / (1 - k), (1 - b - k) / (1 - k), k))
# Machado et al. 2009 severity 1.0
CVD = {'protan': ((0.152286, 1.052583, -0.204868), (0.114503, 0.786281, 0.099216), (-0.003882, -0.048116, 1.051998)),
       'deutan': ((0.367322, 0.860646, -0.227968), (0.280085, 0.672501, 0.047413), (-0.011820, 0.042940, 0.968881)),
       'tritan': ((1.255528, -0.076749, -0.178779), (-0.078411, 0.930809, 0.147602), (0.004733, 0.691367, 0.303900))}
def simulate(h, kind):
    r, g, b = (lin(v) for v in hex2rgb(h)); M = CVD[kind]
    return rgb2hex([unlin(M[i][0] * r + M[i][1] * g + M[i][2] * b) for i in range(3)])
def dE(a, b):
    A, B = oklab(a), oklab(b); return math.dist(A, B) * 100
