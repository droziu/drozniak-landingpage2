"""Tokeny marki do kodu: CSS i JSON z tokens.py.

Użycie: python tools/export_tokens.py ../tokens
"""
import os, sys, json
sys.path.insert(0, os.path.dirname(__file__))
import tokens as T
OUT = sys.argv[1]; os.makedirs(OUT, exist_ok=True)

css = f"""/* Drożniak, tokeny marki {T.WERSJA} ({T.DATA.lower()}). Plik powstaje z docs/brand/zrodla/tools/tokens.py, nie edytuj go ręcznie. */
:root {{
  /* kolory, powierzchnia papierowa */
  --papier: {T.PAPER};
  --kamien: {T.STONE};
  --biel: {T.WHITE};
  --linia: {T.LINE};
  --linia-mocna: {T.LINE2};
  --atrament: {T.INK};
  --atrament-najechanie: {T.INK2};
  --grafit: {T.MUTED};
  --popiol: {T.ASH};
  --kropka: {T.GREEN};

  /* kolory, powierzchnia zielona */
  --gleboka-zielen: {T.DEEP};
  --gleboka-zielen-2: {T.DEEP2};
  --tekst-na-zieleni: {T.PAPER};
  --pomocniczy-na-zieleni: {T.DEEPM};
  --kropka-na-zieleni: {T.GREEN_L};

  /* skale tonalne: interfejs, wykresy, stany */
{chr(10).join(f"  --zielen-{k}: {v};" for k, v in T.GREENS.items())}
{chr(10).join(f"  --szarosc-{k}: {v};" for k, v in T.NEUTRALS.items())}

  /* stany: tekst i tło */
{chr(10).join(f"  --{n}: {fg};{chr(10)}  --{n}-tlo: {bg};" for n, (fg, bg) in zip(("sukces", "uwaga", "blad", "informacja"), T.STATES.values()))}

  /* wykresy, w kolejności użycia */
{chr(10).join(f"  --wykres-{i+1}: {h};" for i, (_, h) in enumerate(T.CHART))}
  --wykres-reszta: {T.CHART_REST[1]};

  /* pismo */
  --font-naglowki: {T.FONT_DISPLAY};
  --font-tekst: {T.FONT_TEXT};
  --font-kod: {T.FONT_MONO};
  --t-wielki: clamp(44px, 7.4vw, 112px);
  --t-naglowek: clamp(32px, 3.9vw, 56px);
  --t-podtytul: clamp(22px, 1.9vw, 28px);
  --t-tekst: 17px;
  --t-maly: 14px;

  /* odstępy, kształty, ruch */
{chr(10).join(f"  --odstep-{s}: {s}px;" for s in T.SPACE)}
  --promien-maly: {T.RADIUS["mały"]}px;
  --promien: {T.RADIUS["średni"]}px;
  --promien-pelny: {T.RADIUS["pełny"]}px;
  --grubosc-linii: 1.5px;
  --ruch: {T.EASE};
  --ruch-ladowanie: {T.EASE_LAND_FALLBACK};
  --czas-krotki: 200ms;
  --czas-wejscia: 500ms;
  --czas-ladowania: {T.LAND_MS}ms;
}}
/* Lądowanie kropki: sprężyna z jednym ugięciem. Starsze przeglądarki zostają przy krzywej zapasowej powyżej. */
@supports (animation-timing-function: linear(0, 1)) {{
  :root {{
    --ruch-ladowanie: {T.EASE_LAND};
  }}
}}
"""
open(f"{OUT}/drozniak-tokens.css", "w").write(css)
data = {
    "wersja": T.WERSJA, "data": T.DATA,
    "kolory": {"papier": T.PAPER, "kamien": T.STONE, "biel": T.WHITE, "linia": T.LINE, "linia-mocna": T.LINE2, "atrament": T.INK, "grafit": T.MUTED, "popiol": T.ASH,
               "gleboka-zielen": T.DEEP, "gleboka-zielen-2": T.DEEP2, "pomocniczy-na-zieleni": T.DEEPM, "zielen-sygnalowa": T.GREEN, "zielen-sygnalowa-jasna": T.GREEN_L},
    "skale": {"zielen": T.GREENS, "szarosc": T.NEUTRALS},
    "stany": {n: {"tekst": fg, "tlo": bg} for n, (fg, bg) in T.STATES.items()},
    "wykresy": [h for _, h in T.CHART] + [T.CHART_REST[1]],
    "pismo": {"naglowki": "Brygada 1918", "tekst": "Schibsted Grotesk", "role": [dict(zip(("rola", "kroj", "odmiana", "interlinia", "swiatlo"), r)) for r in T.TYPE_ROLES],
              "rozmiary": [dict(zip(("format", "jednostka", "wielki-naglowek", "naglowek", "podtytul", "tekst", "maly"), r)) for r in T.TYPE_SIZES]},
    "odstepy": T.SPACE, "promienie": T.RADIUS, "ruch": {"krzywa": T.EASE, "ladowanie": {"krzywa": T.EASE_LAND, "krzywa-zapasowa": T.EASE_LAND_FALLBACK, "tlumienie": T.LAND_DAMPING, "czestosc-rad-s": T.LAND_OMEGA, "czas-ms": T.LAND_MS}, "czasy": dict(T.MOTION)},
    "kontakt": {"strona": T.STRONA, "mail": T.MAIL, "telefon": T.TELEFON, "dopisek": T.DOPISEK},
}
json.dump(data, open(f"{OUT}/drozniak-tokens.json", "w"), ensure_ascii=False, indent=2)
print("tokeny zapisane w", OUT)
