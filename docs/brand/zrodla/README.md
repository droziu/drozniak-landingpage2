# Źródła marki Drożniak

Skrypty, z których powstają pliki logo, tokeny, księga marki i wizytówka. Wszystko liczy się z dwóch plików: geometria logo jest w `tools/master.py`, a kolory, pismo, odstępy i dane kontaktowe w `tools/tokens.py`. Zmiana tam przechodzi na wszystkie pliki.

## Co jest gdzie

- `tools/tokens.py`: wartości marki (kolory, skale, role pisma, odstępy, ruch, adres strony, dopisek).
- `tools/master.py`: geometria napisu i znaku (D z kropką nad literą, wersja podstawowa i mała). Poprzedni znak z wersji 1.0 został jako `symbol_v1`, tylko do porównań.
- `tools/export_master.py`: pliki SVG do folderu `logo/`.
- `tools/export_tokens.py`: `tokens/drozniak-tokens.css` i `drozniak-tokens.json`.
- `tools/ksiega.py`, `ks_core.py`, `ks_r1.py` do `ks_r6.py`, `ksiega.css`: księga marki (HTML, z którego Chrome robi PDF). Każdy plik `ks_r` to jeden albo dwa rozdziały.
- `tools/book_parts.py`: rysunki logo, pola ochronnego i budowy znaku.
- `tools/ruch_znaku.py`: animacja znaku, czyli trasa kropki po literze, tempo, skok i lądowanie, klatki do księgi. Te same liczby ma strona w `app/components/brand/markRoute.ts`; zmiana w jednym miejscu wymaga zmiany w drugim.
- `tools/export_ruch.py`: folder `ruch/` z gotową animacją (`animacja-znaku.html`), jej liczbami klatka po klatce (`animacja-znaku.json`) i przykładem przeskoku kropki między punktami (`przeskok-kropki.html`) do filmów i innych produkcji. Przeskok na stronie liczy `app/components/brand/dotHop.ts`.
- `tools/kolor.py`: rachunki na kolorach (kontrast WCAG i APCA, OKLCH, symulacja ślepoty barw).
- `tools/card.py`: wizytówka do druku.
- `tools/build_page.py`, `tools/marks.py`: strona z pierwszą propozycją marki z 9.11.2026 (historia).
- `fonts/`: Brygada 1918 i Schibsted Grotesk na licencji SIL Open Font License (pliki OFL obok).

## Jak przebudować

Potrzebny Python z pakietami `fonttools`, `brotli`, `uharfbuzz` i `pillow`, do tego `rsvg-convert`, `pdftoppm` (poppler) i Google Chrome.

```bash
cd docs/brand/zrodla
python3 -m venv .venv && .venv/bin/pip install fonttools brotli uharfbuzz pillow
./zbuduj.sh
```

`zbuduj.sh` robi po kolei: pliki logo (SVG, PNG, PDF, ikony, favikony), tokeny, animację znaku, księgę marki i wizytówkę z podglądami.

## Uwagi

- PDF z Chrome jest w RGB. Wartości CMYK i Pantone są w księdze, w rozdziale „Kolor”, a drukarnia robi próbę przed pierwszym nakładem.
- Głęboka zieleń wychodzi dobrze tylko na papierze powlekanym albo pod folią. Na niepowlekanym szarzeje.
- Napis to Brygada 1918 w odmianie 600 zamieniona na krzywe, z własną kropką nad Ż. Nie składa się go fontem w programach.
- Makiety w księdze są w prawdziwych pikselach formatu i pomniejszane właściwością `zoom`. Pomniejszanie przez `transform` psuje skalę stron w PDF.
- Strona internetowa (folder `app/` i `public/`) ma własne kopie logo, ikon i tokenów. Po zmianie marki trzeba je przenieść osobno.
