#!/bin/zsh
# Buduje wszystko z jednego źródła: pliki logo, tokeny, animację znaku, księgę marki i wizytówkę.
# Wymaga: Python z pakietami fonttools, brotli, uharfbuzz, pillow; rsvg-convert; Google Chrome.
# Użycie: ./zbuduj.sh            (Python z .venv w tym folderze)
#         PY=/sciezka/python ./zbuduj.sh
set -e
cd "$(dirname "$0")"; export S="$PWD"
PY="${PY:-$S/.venv/bin/python}"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
TMP="$(mktemp -d)"; L="$S/../logo"

"$PY" tools/export_master.py "$L"
"$PY" tools/export_tokens.py "$S/../tokens"
"$PY" tools/export_ruch.py "$S/../ruch"

mkdir -p "$L/png" "$L/pdf"
for v in kolor negatyw czarny bialy; do
  rsvg-convert -w 2400 "$L/napis/drozniak-napis-$v.svg" -o "$L/png/drozniak-napis-$v-2400.png"
  rsvg-convert -w 800  "$L/napis/drozniak-napis-$v.svg" -o "$L/png/drozniak-napis-$v-800.png"
  rsvg-convert -f pdf  "$L/napis/drozniak-napis-$v.svg" -o "$L/pdf/drozniak-napis-$v.pdf"
  for z in znak znak-maly; do
    rsvg-convert -h 1024 "$L/znak/drozniak-$z-$v.svg" -o "$L/png/drozniak-$z-$v-1024.png"
    rsvg-convert -f pdf  "$L/znak/drozniak-$z-$v.svg" -o "$L/pdf/drozniak-$z-$v.pdf"
  done
done
I="$L/ikony"
rsvg-convert -w 1080 "$I/drozniak-awatar.svg" -o "$I/drozniak-awatar-1080.png"
rsvg-convert -w 1080 "$I/drozniak-awatar-jasny.svg" -o "$I/drozniak-awatar-jasny-1080.png"
rsvg-convert -w 1024 "$I/drozniak-ikona-aplikacji.svg" -o "$I/drozniak-ikona-aplikacji-1024.png"
rsvg-convert -w 180 "$I/web/_icon.svg" -o "$I/web/apple-touch-icon.png"
for s in 192 512; do
  rsvg-convert -w $s "$I/web/_icon.svg" -o "$I/web/icon-$s.png"
  rsvg-convert -w $s "$I/web/_icon-maskable.svg" -o "$I/web/icon-$s-maskable.png"
done
for s in 16 32 48; do rsvg-convert -w $s "$I/web/favicon.svg" -o "$TMP/fav-$s.png"; done
"$PY" -c "
from PIL import Image
ims=[Image.open('$TMP/fav-%d.png'%s).convert('RGBA') for s in (16,32,48)]
ims[2].save('$I/web/favicon.ico', sizes=[(16,16),(32,32),(48,48)], append_images=ims[:2])"
rm -f "$I/web/_icon.svg" "$I/web/_icon-maskable.svg"

"$PY" tools/ksiega.py "$TMP/ksiega.html"
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=15000 --print-to-pdf="$S/../brand-book/drozniak-zasady-marki.pdf" "file://$TMP/ksiega.html" 2>/dev/null
"$PY" tools/card.py "$TMP/wizytowka.html"
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=6000 --print-to-pdf="$S/../wizytowka/drozniak-wizytowka-druk.pdf" "file://$TMP/wizytowka.html" 2>/dev/null
pdftoppm -r 300 -f 1 -l 1 -png "$S/../wizytowka/drozniak-wizytowka-druk.pdf" "$TMP/w" && mv "$TMP"/w-*1.png "$S/../wizytowka/podglad-przod.png"
pdftoppm -r 300 -f 2 -l 2 -png "$S/../wizytowka/drozniak-wizytowka-druk.pdf" "$TMP/w" && mv "$TMP"/w-*2.png "$S/../wizytowka/podglad-tyl.png"
rm -rf "$TMP"
echo "gotowe: logo, tokeny, animacja znaku, księga, wizytówka"
