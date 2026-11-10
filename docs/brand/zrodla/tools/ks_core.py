"""Szkielet księgi marki: strony, rozdziały, wspólne klocki HTML i makiety."""
import os, sys, html as H
sys.path.insert(0, os.path.dirname(__file__))
import tokens as T
import book_parts as bp
from tokens import INK, PAPER, GREEN, GREEN_L, DEEP, DEEP2, DEEPM, MUTED, STONE, WHITE, LINE, LINE2, ASH, ERR

S = os.environ["S"]; F = f"{S}/fonts"
REPO = os.path.abspath(os.path.join(S, "..", "..", ".."))
PHOTO1 = f"file://{REPO}/public/images/home/portret-hero-800.jpg"
PHOTO2 = f"file://{REPO}/public/images/home/portret-omnie-600.jpg"

pages = []        # html stron
chapters = []     # [tytuł, nr strony otwierającej, [tytuły stron]]
_cur = {"ch": None}

def page(body, cls="", footer=True, title=None):
    n = len(pages) + 1
    ch = _cur["ch"]
    right = f"{ch} | {n}" if ch else f"{n}"
    ft = f'<div class="ft"><span>Drożniak | Księga marki {T.WERSJA}</span><span>{right}</span></div>' if footer else ""
    pages.append(f'<section class="page {cls}">{body}{ft}</section>')
    if title and chapters: chapters[-1][2].append(title)
    return n

def opener(title):
    _cur["ch"] = title
    chapters.append([title, len(pages) + 1, []])
    pages.append(("OPENER", len(chapters) - 1))

def render_openers(total_ch):
    for i, p in enumerate(pages):
        if isinstance(p, tuple):
            idx = p[1]; title, n, items = chapters[idx]
            frac = 0.14 + 0.66 * idx / max(1, total_ch - 1)
            lis = "".join(f"<li>{t}</li>" for t in items)
            body = (f'<div class="op-motif"><span class="op-line" style="width:{frac*1920:.0f}px"></span><span class="op-dot" style="background:{GREEN_L}"></span></div>'
                    f'<div class="op-text"><h2 class="op-title" style="font-size:{176 if len(title) <= 9 else 148}px">{title}</h2><ul class="op-list">{lis}</ul></div>'
                    f'<div class="ft"><span>Drożniak | Księga marki {T.WERSJA}</span><span>{title} | {n}</span></div>')
            pages[i] = f'<section class="page deep">{body}</section>'

# ------------------------------------------------------------------ klocki
def split(title, lead, left="", right="", cls="", fcls=""):
    ld = f'<p class="lead">{lead}</p>' if lead else ""
    return (f'<div class="split {cls}"><div class="col-t"><h2 class="t">{title}</h2>{ld}{left}</div>'
            f'<div class="col-f {fcls}">{right}</div></div>')

def top(title, lead="", body="", cls=""):
    ld = f'<p class="lead">{lead}</p>' if lead else ""
    return f'<div class="body"><div class="top {cls}"><h2 class="t">{title}</h2>{ld}</div><div class="fill">{body}</div></div>'

def notes(items):
    return '<div class="notes">' + "".join(f'<div class="note"><h3>{h}</h3><p>{t}</p></div>' for h, t in items) + '</div>'

def table(head, rows, cls="tb", widths=None):
    cg = ""
    if widths: cg = "<colgroup>" + "".join(f'<col style="width:{w}">' for w in widths) + "</colgroup>"
    th = ("<tr>" + "".join(f"<th>{h}</th>" for h in head) + "</tr>") if head else ""
    tr = "".join("<tr>" + "".join(f"<td>{c}</td>" for c in r) + "</tr>" for r in rows)
    return f'<table class="{cls}">{cg}{th}{tr}</table>'

def tile(inner, ok, text, h="h2", bg=None, strike=False, box_style=""):
    lab = '<span class="tak">Tak.</span>' if ok else '<span class="nie">Nie.</span>'
    st = (f"background:{bg};" if bg else "") + box_style
    return (f'<div class="tile"><div class="tile-box {h}{" strike" if strike else ""}" style="{st}">{inner}</div>'
            f'<p>{lab} {text}</p></div>')

def cap_tile(inner, text, h="h2", bg=None, box_style=""):
    st = (f"background:{bg};" if bg else "") + box_style
    return f'<div class="tile"><div class="tile-box {h}" style="{st}">{inner}</div><p>{text}</p></div>'

def mock(w, h, scale, inner, cls="", bg=PAPER, style="", edge=True):
    """Makieta w prawdziwych pikselach formatu, pomniejszona do strony księgi."""
    return (f'<div class="mk{"" if edge else " noedge"}" style="width:{w*scale:.1f}px;height:{h*scale:.1f}px">'
            f'<div class="mk-in {cls}" style="width:{w}px;height:{h}px;zoom:{scale};background:{bg};{style}">{inner}</div></div>')

def figc(inner, caption=""):
    return f'<div class="figc">{inner}{f"<p>{caption}</p>" if caption else ""}</div>'

def _dot_for(ink, dot):
    """Na ciemnym tle (jasny rysunek) kropka przechodzi na zieleń sygnałową jasną."""
    if dot is None: return GREEN_L if ink in (PAPER, WHITE) else GREEN
    return dot

def word(ink=INK, dot=None, w=None, h=None, style=""):
    dot = _dot_for(ink, dot)
    st = (f"width:{w}px;height:auto;" if w else "") + (f"height:{h}px;width:auto;" if h else "") + style
    return bp.word_svg(ink=ink, dot=dot, style=st)

def sym(ink=INK, dot=None, h=None, small=False, style="", v1=False):
    dot = _dot_for(ink, dot)
    st = (f"height:{h}px;width:auto;" if h else "") + style
    return bp.sym_svg(ink=ink, dot=dot, small=small, style=st, v1=v1)

def abs_(x, y, inner, extra=""):
    return f'<div style="position:absolute;left:{x}px;top:{y}px;{extra}">{inner}</div>'

def txt(s, size, weight=400, color=INK, font="txt", lh=1.3, extra=""):
    fam = "var(--disp)" if font == "disp" else "var(--txt)"
    return f'<div style="font-family:{fam};font-size:{size}px;font-weight:{weight};color:{color};line-height:{lh};{extra}">{s}</div>'

def dot(d, color=GREEN, extra=""):
    return f'<span style="display:block;width:{d}px;height:{d}px;border-radius:50%;background:{color};flex:none;{extra}"></span>'

def tor(w, L=8, nodes=None, hi=None, ink=INK, green=GREEN, labels=None, label_color=None, font=17):
    """Tor: linia grubości L, punkty 2L, zielona kropka 3L. nodes = pozycje 0..1, hi = indeks zielonej."""
    nodes = nodes if nodes is not None else [0, 1]
    pad = 2 * L; hgt = 3 * L + (font * 2.4 if labels else 0)
    cy = 1.5 * L
    x = lambda t: pad + t * (w - 2 * pad)
    s = f'<rect x="{x(0):.1f}" y="{cy - L/2:.1f}" width="{x(1)-x(0):.1f}" height="{L}" fill="{ink}"/>'
    for i, t in enumerate(nodes):
        if i == hi: s += f'<circle cx="{x(t):.1f}" cy="{cy}" r="{1.5*L}" fill="{green}"/>'
        else: s += f'<circle cx="{x(t):.1f}" cy="{cy}" r="{L}" fill="{ink}"/>'
    if labels:
        for i, (t, lb) in enumerate(zip(nodes, labels)):
            anchor = "start" if t < 0.02 else ("end" if t > 0.98 else "middle")
            xx = x(t) + (-L if anchor == "start" else (L if anchor == "end" else 0))
            s += (f'<text x="{xx:.1f}" y="{3*L + font*1.7:.1f}" font-size="{font}" text-anchor="{anchor}" fill="{label_color or ink}" '
                  f'font-family="Schibsted Grotesk" font-weight="{600 if i == hi else 400}">{lb}</text>')
    return f'<svg viewBox="0 0 {w} {hgt:.1f}" width="{w}" height="{hgt:.1f}" aria-hidden="true">{s}</svg>'

def esc(s): return H.escape(s)
