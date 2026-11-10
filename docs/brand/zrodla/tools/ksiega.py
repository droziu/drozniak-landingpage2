"""Księga marki Drożniak 2.0. Składa strony z rozdziałów i zapisuje jeden plik HTML (Chrome robi z niego PDF).

Użycie: S=<folder zrodla> python tools/ksiega.py wyjscie.html [numer_rozdzialu ...]
"""
import os, sys, importlib
sys.path.insert(0, os.path.dirname(__file__))
import tokens as T
import ks_core as K

OUT = sys.argv[1]
MODS = ["ks_r1", "ks_r2", "ks_r3", "ks_r4", "ks_r5", "ks_r6"]
for m in MODS:
    try:
        importlib.import_module(m).build()
    except ModuleNotFoundError as e:
        if e.name != m: raise
        print("brak modułu", m)

K.page(f'<div class="back">{K.sym(ink=T.PAPER)}<p>{T.STRONA}</p></div>', cls="deep", footer=False)
K.render_openers(len(K.chapters))

toc = "".join(f'<div class="toc-row"><span>{t}</span><span>{n}</span></div>' for t, n, _ in K.chapters)
K.pages[1] = K.pages[1].replace("<!--toc-->",
    f'<div class="toc"><div class="toc-side"><h2 class="t">Spis treści</h2>'
    f'<p class="lead">Wersja {T.WERSJA}, {T.DATA.lower()}. Zastępuje wersję 1.0 z 9 listopada 2026. Zmiany względem poprzedniej wersji są opisane na końcu.</p></div>'
    f'<div class="toc-list">{toc}</div></div>')

css = open(os.path.join(os.path.dirname(__file__), "ksiega.css")).read().replace("%F%", K.F)
for k in ("PAPER", "STONE", "LINE2", "LINE", "INK2", "INK", "MUTED", "ASH", "DEEP2", "DEEPM", "DEEP", "GREEN_L", "GREEN", "ERR"):
    css = css.replace(f"%{k}%", getattr(T, k))
open(OUT, "w").write(f'<!doctype html><html lang="pl"><head><meta charset="utf-8"><title>Drożniak, księga marki {T.WERSJA}</title>'
                     f'<style>{css}</style></head><body>{"".join(K.pages)}</body></html>')
print("stron:", len(K.pages)); [print(f"  {n:3d}  {t}  ({len(i)} stron)") for t, n, i in K.chapters]
