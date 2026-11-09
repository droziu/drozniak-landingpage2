import os, sys
sys.path.insert(0, os.path.dirname(__file__))
import book_parts as bp
from book_parts import INK, PAPER, GREEN, DEEP, MUTED
F = os.environ["S"] + "/fonts"
css = f'''@font-face {{ font-family: "Schibsted Grotesk"; src: url("file://{F}/SchibstedGrotesk-VF.ttf"); font-weight: 400 900; }}
@page {{ size: 96mm 56mm; margin: 0; }}
* {{ box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }}
html, body {{ margin: 0; }}
.p {{ width: 96mm; height: 56mm; position: relative; overflow: hidden; break-after: page; }}
.p:last-child {{ break-after: auto; }}
.front {{ background: #FFFFFF; font-family: "Schibsted Grotesk", Arial, sans-serif; color: {INK}; }}
.w {{ position: absolute; left: 9mm; top: 8.5mm; height: 5.2mm; }}
.w svg {{ height: 100%; width: auto; display: block; }}
.who {{ position: absolute; left: 9mm; bottom: 8mm; }}
.n {{ font-weight: 600; font-size: 8.5pt; line-height: 1.25; margin: 0; }}
.r {{ font-size: 7pt; line-height: 1.35; margin: 0; }}
.c {{ font-size: 7pt; line-height: 1.45; margin: 2.2mm 0 0; color: {MUTED}; }}
.back {{ background: {DEEP}; display: grid; place-items: center; }}
.back svg {{ height: 13mm; width: auto; display: block; }}'''
html = f'''<!doctype html><html lang="pl"><head><meta charset="utf-8"><title>Wizytówka Drożniak</title><style>{css}</style></head><body>
<section class="p front"><div class="w">{bp.word_svg()}</div><div class="who"><p class="n">Stanisław Drożniak</p><p class="r">Marketing i pozyskiwanie klientów</p><p class="c">+48 792 491 196<br>stanislaw@drozniak.com<br>drozniak.com</p></div></section>
<section class="p back">{bp.sym_svg(ink=PAPER)}</section></body></html>'''
open(sys.argv[1], "w").write(html)
