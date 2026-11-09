"""Helpers: instanced fonts -> glyph paths, wordmarks with a custom ż dot, SVG writing."""
import io, functools
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

FONTS = {}

@functools.lru_cache(None)
def load(path, wght, opsz=None):
    tt = TTFont(path)
    if 'fvar' in tt:
        axes = {a.axisTag: a.defaultValue for a in tt['fvar'].axes}
        lim = {a.axisTag: (a.minValue, a.maxValue) for a in tt['fvar'].axes}
        if 'wght' in axes: axes['wght'] = max(lim['wght'][0], min(lim['wght'][1], wght))
        if 'opsz' in axes: axes['opsz'] = max(lim['opsz'][0], min(lim['opsz'][1], opsz or lim['opsz'][1]))
        tt = instantiateVariableFont(tt, axes)
    buf = io.BytesIO(); tt.save(buf)
    data = buf.getvalue()
    tt = TTFont(io.BytesIO(data))
    return tt, data

def shape(path, wght, text, opsz=None):
    tt, data = load(path, wght, opsz)
    face = hb.Face(data); f = hb.Font(face)
    b = hb.Buffer(); b.add_str(text); b.guess_segment_properties()
    hb.shape(f, b, {"kern": True, "liga": False})
    order = tt.getGlyphOrder()
    return tt, [(order[i.codepoint], p.x_advance, p.x_offset, p.y_offset) for i, p in zip(b.glyph_infos, b.glyph_positions)]

def glyph_d(tt, gname, scale, x, y):
    gs = tt.getGlyphSet(); pen = SVGPathPen(gs)
    gs[gname].draw(TransformPen(pen, (scale, 0, 0, -scale, x, y)))
    return pen.getCommands()

def glyph_bounds(tt, gname):
    gs = tt.getGlyphSet(); bp = BoundsPen(gs); gs[gname].draw(bp); return bp.bounds

def wordmark(path, wght, text, cap_px, x0=0, base=0, track=0.0, kern_adj=None, dot=None, opsz=None, split_dot=True):
    """Return dict(ink=[d...], dots=[(cx,cy,r)], width, capH, scale).
    cap_px: desired cap height in px. track: tracking in em. kern_adj: {index: em} extra space after glyph i.
    dot: None to keep font dot; else dict(scale=1.0 relative to stem, dy=0) to replace ż/i dots with circles."""
    tt, glyphs = shape(path, wght, text, opsz)
    upem = tt['head'].unitsPerEm
    capH = tt['OS/2'].sCapHeight or glyph_bounds(tt, 'H')[3]
    s = cap_px / capH
    x = x0; ink = []; dots = []
    for i, (g, adv, xo, yo) in enumerate(glyphs):
        gx = x + xo * s
        if dot is not None and g in ('zdotaccent',):
            ink.append(glyph_d(tt, 'z', s, gx, base))
            zb = glyph_bounds(tt, 'zdotaccent'); zz = glyph_bounds(tt, 'z')
            # font dot bbox = part above z
            dcx = (zb[0] + zb[2]) / 2 if False else None
            comp = [c for c in tt['glyf']['zdotaccent'].components if c.glyphName != 'z'][0]
            db = glyph_bounds(tt, comp.glyphName)
            cx = gx + ((db[0] + db[2]) / 2 + comp.x) * s
            cy = base - ((db[1] + db[3]) / 2 + comp.y) * s
            r = (db[2] - db[0]) / 2 * s * dot.get('scale', 1.0)
            cy -= dot.get('dy', 0) * cap_px
            cx += dot.get('dx', 0) * cap_px
            dots.append((round(cx, 2), round(cy, 2), round(r, 2)))
        else:
            ink.append(glyph_d(tt, g, s, gx, base))
        x += adv * s + track * cap_px * upem / capH * (1 / upem) * upem if False else adv * s + track * (upem * s)
        if kern_adj and i in kern_adj: x += kern_adj[i] * upem * s
    width = x - x0 - track * upem * s
    return dict(ink=ink, dots=dots, width=round(width, 2), capH=cap_px, scale=s, tt=tt)

def bbox_of(d_list):
    from fontTools.svgLib.path import parse_path
    from fontTools.pens.boundsPen import ControlBoundsPen
    pen = ControlBoundsPen(None)
    for d in d_list:
        parse_path(d, pen)
    return pen.bounds

def svg(w, h, body, title="Drożniak", bg=None):
    bgr = f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ''
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:g} {h:g}" width="{w:g}" height="{h:g}" role="img" aria-labelledby="t">'
            f'<title id="t">{title}</title>{bgr}{body}</svg>\n')
