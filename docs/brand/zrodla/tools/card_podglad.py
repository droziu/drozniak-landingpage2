"""Podglądy wizytówki MultiLoft z gotowego pliku do druku.

Robi dwa obrazy: podgląd obu stron po przycięciu (z zaznaczoną krawędzią z czarnym środkiem)
i siatkę kontrolną ze spadem, linią cięcia i polem bezpiecznym.
Kolory z CMYK przelicza profilem Coated FOGRA27, jeśli jest w systemie.

Użycie: S=<folder zrodla> python tools/card_podglad.py <plik.pdf> <folder wyjściowy>
"""
import os, sys, subprocess, tempfile
from PIL import Image, ImageDraw, ImageFilter, ImageFont

PDF, OUT = sys.argv[1], sys.argv[2]
SCH = os.environ["S"] + "/fonts/SchibstedGrotesk[wght].ttf"
ICC = "/Library/Application Support/Adobe/Color/Profiles/Recommended/CoatedFOGRA27.icc"
W, H, SPAD = 85.0, 55.0, 3.0
PX = 15                                   # pikseli na milimetr w gotowym obrazie
TLO, PODPIS = "#DEDBD2", "#5E5A50"

def strony():
    tmp = tempfile.mkdtemp()
    cmd = ["pdftoppm", "-r", str(PX * 25.4 * 2), "-png"] + (["-defaultcmykprofile", ICC] if os.path.exists(ICC) else [])
    subprocess.run(cmd + [PDF, f"{tmp}/s"], check=True)
    size = (round((W + 2 * SPAD) * PX), round((H + 2 * SPAD) * PX))
    return [Image.open(f"{tmp}/s-{n}.png").convert("RGB").resize(size, Image.LANCZOS) for n in (1, 2)]

def font(pt, wght=500):
    f = ImageFont.truetype(SCH, pt)
    try: f.set_variation_by_axes([wght])
    except Exception: pass
    return f

def podglad(pages):
    """Obie strony po przycięciu. Pasek pod kartą pokazuje krawędź: biały arkusz, czarny środek, biały arkusz."""
    cw, ch = round(W * PX), round(H * PX); b = round(SPAD * PX)
    kraw = round(1.4 * PX); m = 150
    im = Image.new("RGB", (3 * m + 2 * cw, 2 * m + ch + kraw + 70), TLO)
    for i, (page, name) in enumerate(zip(pages, ("Awers", "Rewers"))):
        x, y = m + i * (cw + m), m
        cien = Image.new("L", im.size, 0)
        ImageDraw.Draw(cien).rectangle((x + 6, y + 22, x + cw - 6, y + ch + kraw + 26), fill=95)
        im.paste(Image.new("RGB", im.size, "#3A3830"), (0, 0), cien.filter(ImageFilter.GaussianBlur(26)))
        im.paste(page.crop((b, b, b + cw, b + ch)), (x, y))
        d = ImageDraw.Draw(im); t = kraw / 3
        for k, col in enumerate(("#EFEDE8", "#1B1A18", "#E6E4DE")):
            d.rectangle((x, y + ch + round(k * t), x + cw - 1, y + ch + round((k + 1) * t) - 1), fill=col)
        d.text((x, y + ch + kraw + 34), name, font=font(30), fill=PODPIS)
    im.save(f"{OUT}/drozniak-wizytowka-multiloft-podglad.png")

def siatka(pages):
    """Strony ze spadem: linia cięcia ciągła, pole bezpieczne 3 mm przerywane."""
    pw, ph = pages[0].size; m = 110
    im = Image.new("RGB", (3 * m + 2 * pw, 2 * m + ph + 80), "#FFFFFF")
    d = ImageDraw.Draw(im)
    for i, page in enumerate(pages):
        x, y = m + i * (pw + m), m
        im.paste(page, (x, y)); d.rectangle((x, y, x + pw - 1, y + ph - 1), outline="#B5B1A6")
        t = SPAD * PX; d.rectangle((x + t, y + t, x + pw - t - 1, y + ph - t - 1), outline="#E5007E", width=2)
        s = 2 * SPAD * PX; x0, y0, x1, y1 = x + s, y + s, x + pw - s - 1, y + ph - s - 1
        for a in range(int(x0), int(x1), 24):
            d.line((a, y0, min(a + 12, x1), y0), fill="#009FE3", width=2); d.line((a, y1, min(a + 12, x1), y1), fill="#009FE3", width=2)
        for a in range(int(y0), int(y1), 24):
            d.line((x0, a, x0, min(a + 12, y1)), fill="#009FE3", width=2); d.line((x1, a, x1, min(a + 12, y1)), fill="#009FE3", width=2)
        d.text((x, y - 52), f"Strona {i + 1}: {('awers', 'rewers')[i]}, 91 × 61 mm ze spadem", font=font(28), fill="#161511")
    y = m + ph + 34; f = font(26, 400)
    d.line((m, y + 16, m + 60, y + 16), fill="#E5007E", width=2); d.text((m + 76, y), "linia cięcia, 85 × 55 mm", font=f, fill=PODPIS)
    for a in range(m + 520, m + 580, 24): d.line((a, y + 16, a + 12, y + 16), fill="#009FE3", width=2)
    d.text((m + 596, y), "pole bezpieczne, 3 mm od cięcia (79 × 49 mm)", font=f, fill=PODPIS)
    im.save(f"{OUT}/drozniak-wizytowka-multiloft-siatka.png")

if __name__ == "__main__":
    p = strony(); podglad(p); siatka(p)
