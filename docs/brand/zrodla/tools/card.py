"""Wizytówka do druku: 90 × 50 mm ze spadem 3 mm (strona 96 × 56 mm), przód i tył.

Użycie: S=<folder zrodla> python tools/card.py wizytowka.html, potem Chrome robi PDF.
"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
import book_parts as bp
import tokens as T
from tokens import INK, PAPER, GREEN_L, DEEP, MUTED
F = os.environ["S"] + "/fonts"
css = f'''@font-face {{ font-family: "Schibsted Grotesk"; src: url("file://{F}/SchibstedGrotesk-VF.ttf"); font-weight: 400 900; }}
@page {{ size: 96mm 56mm; margin: 0; }}
* {{ box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }}
html, body {{ margin: 0; }}
.p {{ width: 96mm; height: 56mm; position: relative; overflow: hidden; break-after: page; }}
.p:last-child {{ break-after: auto; }}
.front {{ background: #FFFFFF; font-family: "Schibsted Grotesk", Arial, sans-serif; color: {INK}; }}
.w {{ position: absolute; left: 9mm; top: 9mm; width: 30mm; }}
.w svg {{ width: 100%; height: auto; display: block; }}
.who {{ position: absolute; left: 9mm; bottom: 8.5mm; }}
.n {{ font-weight: 600; font-size: 8.5pt; line-height: 1.25; margin: 0; }}
.r {{ font-size: 7pt; line-height: 1.4; margin: 0; }}
.c {{ font-size: 7pt; line-height: 1.5; margin: 2.2mm 0 0; color: {MUTED}; }}
.back {{ background: {DEEP}; display: grid; place-items: center; }}
.back svg {{ height: 15mm; width: auto; display: block; margin-top: -0.6mm; }}'''
html = f'''<!doctype html><html lang="pl"><head><meta charset="utf-8"><title>Wizytówka Drożniak</title><style>{css}</style></head><body>
<section class="p front"><div class="w">{bp.word_svg()}</div><div class="who"><p class="n">Stanisław Drożniak</p><p class="r">{T.DOPISEK}</p><p class="c">{T.TELEFON}<br>{T.MAIL}<br>{T.STRONA}</p></div></section>
<section class="p back">{bp.sym_svg(ink=PAPER, dot=GREEN_L)}</section></body></html>'''
open(sys.argv[1], "w").write(html)
