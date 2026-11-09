# Źródła marki Drożniak

Skrypty, z których powstały pliki logo, księga marki i wizytówka. Wszystko liczy się z jednej geometrii w `tools/master.py`, więc zmiana tam przechodzi na wszystkie pliki.

## Co jest gdzie

- `tools/master.py`: geometria znaku D z kropką (wersja podstawowa i mała) oraz napisu.
- `tools/export_master.py`: pliki SVG do folderu `logo/`.
- `tools/book.py` i `tools/book.css`: księga marki (HTML, z którego Chrome robi PDF).
- `tools/card.py`: wizytówka do druku.
- `tools/build_page.py`: strona z propozycją marki (artefakt z 9.11.2026).
- `fonts/`: Brygada 1918 i Schibsted Grotesk na licencji SIL Open Font License (pliki OFL obok).

## Jak przebudować

Potrzebny Python z pakietami `fonttools`, `brotli` i `uharfbuzz`, do tego `rsvg-convert` i Google Chrome.

```bash
cd docs/brand/zrodla
python3 -m venv .venv && .venv/bin/pip install fonttools brotli uharfbuzz
export S="$PWD"
.venv/bin/python tools/export_master.py ../logo
.venv/bin/python tools/book.py /tmp/ksiega.html
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer --virtual-time-budget=10000 --print-to-pdf=../brand-book/drozniak-zasady-marki.pdf file:///tmp/ksiega.html
.venv/bin/python tools/card.py /tmp/wizytowka.html
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer --virtual-time-budget=6000 --print-to-pdf=../wizytowka/drozniak-wizytowka-druk.pdf file:///tmp/wizytowka.html
```

PNG i PDF poszczególnych wersji logo robi `rsvg-convert` (`-w 2400` dla napisu, `-h 1024` dla znaku, `-f pdf` dla druku).

## Uwagi

- PDF z Chrome jest w RGB. Kolory do druku (CMYK i Pantone) są w księdze, a drukarnia robi próbę przed pierwszym nakładem.
- Napis to Brygada 1918 w odmianie 600 zamieniona na krzywe, z własną kropką nad Ż. Nie składa się go fontem w programach.
