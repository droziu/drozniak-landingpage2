"""Animacja znaku do filmów i innych produkcji: gotowy plik HTML i liczby klatka po klatce (JSON).

Użycie: S=<folder zrodla> python tools/export_ruch.py ../ruch
Źródło ruchu: ruch_znaku.py (te same liczby co na stronie w app/components/brand/markRoute.ts).
"""
import os, sys, json
sys.path.insert(0, os.path.dirname(__file__))
import tokens as T
import ruch_znaku as rz

OUT = sys.argv[1]; os.makedirs(OUT, exist_ok=True)
W, H = rz.X1 - rz.X0, rz.Y1 - rz.Y0
FIELD = rz.FIELD

def ink_paths():
    out = ""
    for a, b, w, beside in rz.INK:
        st = rz.at(a); ln = rz.at(b + 1) - st
        p = f'<path class="kreska" d="{rz.path_of(a, b)}" pathLength="{ln:.4f}" stroke-width="{w}" stroke-dasharray="{100 - st:.4f} 300"/>'
        out += f'<g clip-path="url(#poza-trzonem)">{p}</g>' if beside else p
    return out

clips = f'<clipPath id="poza-trzonem"><path clip-rule="evenodd" d="{rz.BESIDE_STEM}"/></clipPath>'
field = f'x="{FIELD[0]}" y="{FIELD[1]}" width="{FIELD[2]}" height="{FIELD[3]}"'
end = rz.START_MS + rz.ROUTE_MS

html = f"""<!doctype html>
<html lang="pl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Drożniak, animacja znaku</title>
<!--
  Animacja znaku marki Drożniak {T.WERSJA}. Plik powstaje z docs/brand/zrodla/tools/export_ruch.py, nie edytuj go ręcznie.
  Kliknięcie albo spacja: od początku. Parametry w adresie:
    ?tlo=papier     jasne tło (domyślnie głęboka zieleń)
    ?skala=3        wielkość znaku względem pliku logo (domyślnie dopasowana do okna)
    ?petla=1        powtarzanie co {(rz.END_MS + 1000) / 1000:g} s
    ?t=1200         zatrzymana klatka po tylu milisekundach
  Przebieg: kropka pojawia się (0,1 s), rysuje literę (do {rz.sek(rz.START_MS + rz.MARKS["launch"])}), wyskakuje z końca trzonu,
  ląduje z jednym ugięciem (ok. {rz.sek(rz.START_MS + rz.MARKS["land"])}), znak stoi do {rz.sek(rz.END_MS)}.
-->
<style>
  :root {{ --tlo: {T.DEEP}; --litera: {T.PAPER}; --kropka: {T.GREEN_L}; --ruch: {T.EASE}; --skala: 2; }}
  :root.papier {{ --tlo: {T.PAPER}; --litera: {T.INK}; --kropka: {T.GREEN}; }}
  html, body {{ height: 100%; margin: 0; }}
  body {{ display: grid; place-items: center; overflow: hidden; background: var(--tlo); color: var(--litera); cursor: pointer; }}
  .znak {{ position: relative; width: {W}px; height: {H}px; transform: scale(var(--skala)); }}
  .znak svg {{ display: block; overflow: visible; }}
  .kropka {{ position: absolute; left: 0; top: 0; width: {2 * rz.R}px; height: {2 * rz.R}px; border-radius: 50%; background: var(--kropka);
    offset-path: path("{rz.ROUTE_D}"); offset-anchor: 50% 50%; offset-rotate: 0deg; offset-distance: {rz.ROUTE_REST:.4f}%; }}
  .gra .kropka {{ animation: pojawienie {rz.POP_LEN}ms var(--ruch) {rz.POP_MS}ms both, jazda {rz.ROUTE_MS}ms {rz.linear()} {rz.START_MS}ms both; }}
  .gra .kreska {{ animation: pismo {rz.ROUTE_MS}ms {rz.linear(clamp=True)} {rz.START_MS}ms both; }}
  .gra .calosc {{ animation: calosc {end}ms step-end both; }}
  .stop * {{ animation-play-state: paused !important; }}
  @keyframes pojawienie {{ from {{ transform: scale(0); }} }}
  @keyframes jazda {{ from {{ offset-distance: 0%; }} }}
  @keyframes pismo {{ from {{ stroke-dashoffset: 100; }} }}
  @keyframes calosc {{ from {{ opacity: 0; }} to {{ opacity: 1; }} }}
  @media (prefers-reduced-motion: reduce) {{ .gra * {{ animation: none !important; }} }}
</style>
</head>
<body>
<div class="znak" id="znak">
  <svg viewBox="0 0 {W} {H}" width="{W}" height="{H}" aria-hidden="true">
    <defs>{clips}
      <mask id="pismo" maskUnits="userSpaceOnUse" {field}>
        <g fill="none" stroke="#fff">{ink_paths()}</g>
        <rect class="calosc" {field} fill="#fff"/>
      </mask>
    </defs>
    <path fill="currentColor" d="{rz.G['d']}" mask="url(#pismo)"/>
  </svg>
  <span class="kropka"></span>
</div>
<script>
  var q = new URLSearchParams(location.search), root = document.documentElement, znak = document.getElementById('znak');
  if (q.get('tlo') === 'papier') root.classList.add('papier');
  var skala = parseFloat(q.get('skala')) || Math.max(0.5, Math.min(innerWidth / {W * 2.6:.0f}, innerHeight / {H * 1.9:.0f}));
  root.style.setProperty('--skala', skala);
  function graj() {{ znak.classList.remove('gra'); void znak.offsetWidth; znak.classList.add('gra'); }}
  graj();
  if (q.get('t') !== null) {{
    znak.classList.add('stop');
    znak.querySelectorAll('.kropka, .kreska, .calosc').forEach(function (el) {{
      el.getAnimations().forEach(function (a) {{ a.currentTime = parseFloat(q.get('t')) || 0; }});
    }});
  }} else {{
    addEventListener('click', graj);
    addEventListener('keydown', function (e) {{ if (e.key === ' ') graj(); }});
    if (q.get('petla')) setInterval(graj, {rz.END_MS + 1000});
  }}
</script>
</body>
</html>
"""
open(f"{OUT}/animacja-znaku.html", "w").write(html)

FPS = 60
frames = []
for i in range(round(rz.END_MS / 1000 * FPS) + 1):
    ms = i * 1000 / FPS; x, y, sc, p = rz.state(ms)
    frames.append([round(ms, 1), round(x, 2), round(y, 2), round(sc, 3), round(p, 4)])
M = rz.MARKS; t0 = rz.START_MS
data = {
    "opis": "Animacja znaku marki Drożniak. Kropka rysuje literę D, wyskakuje z końca trzonu i ląduje nad literą z jednym ugięciem.",
    "wersja": T.WERSJA,
    "uklad": {"viewBox": [rz.X0, rz.Y0, W, H], "uwaga": "Współrzędne jak w pliku znaku. Kropka wychodzi poza pole znaku: w lewo, w prawo, w dół i w górę (skok)."},
    "litera": rz.G['d'],
    "kropka": {"promien": rz.R, "miejsce": list(rz.HOME)},
    "trasa": {"d": rz.ROUTE_D, "dlugosc_do_miejsca": round(rz.TOTAL, 2), "miejsce_procent": round(rz.ROUTE_REST, 4)},
    "maska": {"pole": list(FIELD), "wnetrze_trzonu": [list(b) for b in rz.STEM_BOXES],
              "kreski": [{"d": rz.path_of(a, b), "grubosc": w, "pathLength": round(rz.at(b + 1) - rz.at(a), 4),
                          "dasharray": [round(100 - rz.at(a), 4), 300], "omija_trzon": beside} for a, b, w, beside in rz.INK],
              "uwaga": "Litera jest zasłonięta maską. Każda kreska ma stroke-dashoffset = 100 × (1 − rysowanie). Kreski z omija_trzon są przycięte do pola bez wnętrza trzonu."},
    "czasy_ms": {"pojawienie": [rz.POP_MS, rz.POP_MS + rz.POP_LEN], "start_przejazdu": t0, "koniec_rysowania": round(t0 + M["launch"]),
                 "najwyzszy_punkt": round(t0 + M["apex"]), "ladowanie": round(t0 + M["land"]), "ugiecie": round(t0 + M["dip"]),
                 "koniec_ruchu": t0 + rz.ROUTE_MS, "koniec": rz.END_MS, "przejscie_po": 400},
    "tempo": {"rysowanie_ms": rz.DRAW_MS, "zwolnienie_w_zakrecie": rz.TURN_SLOWDOWN, "przyspieszenie_na_trzonie": rz.LAUNCH_BOOST,
              "skok_nad_miejsce": rz.JUMP, "ugiecie": round(M["dip_units"], 2),
              "sprezyna": {"tlumienie": rz.DAMPING, "czestosc_rad_s": rz.OMEGA}},
    "krzywe_css": {"kropka": rz.linear(), "kreski": rz.linear(clamp=True), "czas_ms": rz.ROUTE_MS, "opoznienie_ms": t0,
                   "ladowanie": T.EASE_LAND, "ladowanie_czas_ms": T.LAND_MS},
    "przeskok": {"opis": "Kropka w schematach przeskakuje z punktu na punkt: lot łukiem, lądowanie, jedno ugięcie. Góra to góra ekranu. Prosto w dół bez podskoku: od razu spada, dalszą częścią łuku.",
                 "czas_lotu_ms": {"stala": rz.HOP["base_ms"], "na_piksel": rz.HOP["ms_per_px"], "min": rz.HOP["min_ms"], "max": rz.HOP["max_ms"]},
                 "wysokosc_luku": {"czesc_drogi_w_poziomie": rz.HOP["rise"], "min_srednic": rz.HOP["min_rise"], "max_srednic": rz.HOP["max_rise"]},
                 "ugiecie": {"czesc_opadania": rz.HOP["dip"], "min_srednic": rz.HOP["min_dip"], "max_srednic": rz.HOP["max_dip"],
                             "sprezyna": {"tlumienie": rz.DAMPING, "czestosc_rad_s": rz.OMEGA}, "czas_ms": rz.HOP["settle_ms"]},
                 "postoj_ms": rz.HOP["hold_ms"], "postoj_na_ostatnim_ms": rz.HOP["last_hold_ms"], "pojawienie_skala_ms": rz.HOP["pop_ms"],
                 "wzor": "p = t / czas_lotu; u = u0 + (1 - u0)*p; x = dx*p; y = -a*u + (dy + a)*u*u; a = 2*top + 2*sqrt(top*(top + dy)); top = luk + max(0, -dy); u0 = a/(dy + a) gdy dy > 0 i |dx| < średnica (prosto w dół), inaczej 0; czas_lotu = czas łuku * (1 - u0)",
                 "przyklad_spadek_56px_kropka_10px": [[round(t), round(x, 1), round(y, 1)] for t, x, y in rz.hop(0, 56, 10)[0]],
                 "przyklad_240px_kropka_24px": [[round(t), round(x, 1), round(y, 1)] for t, x, y in rz.hop(240, 0, 24)[0]]},
    "fps": FPS,
    "klatki_opis": ["ms", "x kropki", "y kropki", "skala kropki", "rysowanie 0-1"],
    "klatki": frames,
}
json.dump(data, open(f"{OUT}/animacja-znaku.json", "w"), ensure_ascii=False, indent=1)

H = rz.HOP
demo = f"""<!doctype html>
<html lang="pl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Drożniak, przeskok kropki</title>
<!--
  Przeskok kropki między punktami, marka Drożniak {T.WERSJA}. Plik powstaje z docs/brand/zrodla/tools/export_ruch.py, nie edytuj go ręcznie.
  Parametry w adresie: ?punkty=4 (od 2 do 8), ?tlo=zielen (domyślnie papier), ?pion=1 (schemat pionowy), ?l=8 (grubość linii w px).
  Linia L, punkty 2L, zielona kropka 3L. Kropka przeskakuje z punktu na punkt i ląduje z jednym ugięciem.
-->
<style>
  :root {{ --tlo: {T.PAPER}; --linia: {T.INK}; --kropka: {T.GREEN}; --ruch: {T.EASE}; --l: 8px; }}
  :root.zielen {{ --tlo: {T.DEEP}; --linia: {T.PAPER}; --kropka: {T.GREEN_L}; }}
  html, body {{ height: 100%; margin: 0; }}
  body {{ display: grid; place-items: center; background: var(--tlo); }}
  .tor {{ position: relative; width: min(70vw, 900px); height: calc(var(--l) * 3); }}
  .tor.pion {{ width: calc(var(--l) * 3); height: min(70vh, 640px); }}
  .tor::before {{ content: ''; position: absolute; background: var(--linia); left: calc(var(--l) * 1.5); right: calc(var(--l) * 1.5); top: var(--l); height: var(--l); }}
  .tor.pion::before {{ top: calc(var(--l) * 1.5); bottom: calc(var(--l) * 1.5); left: var(--l); right: auto; width: var(--l); height: auto; }}
  .pt {{ position: absolute; width: calc(var(--l) * 2); height: calc(var(--l) * 2); margin: calc(var(--l) * -1) 0 0 calc(var(--l) * -1); border-radius: 50%; background: var(--linia); }}
  .kropka {{ position: absolute; left: 0; top: 0; width: calc(var(--l) * 3); height: calc(var(--l) * 3); margin: calc(var(--l) * -1.5) 0 0 calc(var(--l) * -1.5); }}
  .kropka::before {{ content: ''; position: absolute; inset: 0; border-radius: 50%; background: var(--kropka); transition: scale {H['pop_ms']}ms var(--ruch); }}
  .kropka.ukryta::before {{ scale: 0; }}
</style>
</head>
<body>
<div class="tor" id="tor"><span class="kropka ukryta" id="kropka"></span></div>
<script>
  var HOP = {json.dumps({k: v for k, v in H.items()})}, DAMPING = {rz.DAMPING}, OMEGA = {rz.OMEGA};
  var q = new URLSearchParams(location.search), root = document.documentElement, tor = document.getElementById('tor'), dot = document.getElementById('kropka');
  if (q.get('tlo') === 'zielen') root.classList.add('zielen');
  if (q.get('l')) root.style.setProperty('--l', parseFloat(q.get('l')) + 'px');
  var pion = !!q.get('pion'), n = Math.min(8, Math.max(2, parseInt(q.get('punkty')) || 4));
  if (pion) tor.classList.add('pion');
  var clamp = function (v, lo, hi) {{ return Math.min(hi, Math.max(lo, v)); }};
  function punkty() {{
    var L = dot.offsetWidth / 3, w = tor.clientWidth, h = tor.clientHeight, out = [];
    for (var i = 0; i < n; i++) out.push(pion ? {{ x: 1.5 * L, y: 1.5 * L + (h - 3 * L) * i / (n - 1) }} : {{ x: 1.5 * L + (w - 3 * L) * i / (n - 1), y: 1.5 * L }});
    return out;
  }}
  function hop(dx, dy, size) {{
    var dist = Math.hypot(dx, dy), arc = clamp(HOP.base_ms + HOP.ms_per_px * dist, HOP.min_ms, HOP.max_ms);
    var rise = clamp(HOP.rise * Math.abs(dx), HOP.min_rise * size, HOP.max_rise * size), top = rise + Math.max(0, -dy);
    var a = 2 * top + 2 * Math.sqrt(top * (top + dy)), dip = clamp(HOP.dip * (top + dy), HOP.min_dip * size, HOP.max_dip * size);
    // prosto w dół bez podskoku: lot od chwili, w której łuk mija wysokość startu
    var u0 = dy > 0 && Math.abs(dx) < size ? a / (dy + a) : 0, flight = arc * (1 - u0);
    var decay = DAMPING * OMEGA / Math.sqrt(1 - DAMPING * DAMPING), peak = Math.atan(OMEGA / decay) / OMEGA;
    var amp = dip / (Math.exp(-decay * peak) * Math.sin(OMEGA * peak)), total = flight + HOP.settle_ms, frames = [];
    for (var t = 0; t < total; t += 1000 / 60) {{
      if (t <= flight) {{ var p = t / flight, u = u0 + (1 - u0) * p; frames.push([t / total, dx * p, -a * u + (dy + a) * u * u]); }}
      else {{ var s = (t - flight) / 1000; frames.push([t / total, dx, dy + amp * Math.exp(-decay * s) * Math.sin(OMEGA * s)]); }}
    }}
    frames.push([1, dx, dy]);
    return {{ frames: frames, total: total }};
  }}
  var P = punkty(), i = 0;
  P.forEach(function (p) {{ var s = document.createElement('span'); s.className = 'pt'; s.style.left = p.x + 'px'; s.style.top = p.y + 'px'; tor.insertBefore(s, dot); }});
  function ustaw(p) {{ dot.style.transform = 'translate(' + p.x + 'px,' + p.y + 'px)'; }}
  function dalej() {{
    if (i === n - 1) {{
      dot.classList.add('ukryta');
      setTimeout(function () {{ i = 0; ustaw(P[0]); dot.classList.remove('ukryta'); setTimeout(dalej, HOP.hold_ms + HOP.pop_ms); }}, HOP.pop_ms);
      return;
    }}
    var from = P[i], to = P[++i], h = hop(to.x - from.x, to.y - from.y, dot.offsetWidth);
    ustaw(to);
    dot.animate(h.frames.map(function (f) {{ return {{ offset: f[0], transform: 'translate(' + (from.x + f[1]) + 'px,' + (from.y + f[2]) + 'px)' }}; }}), {{ duration: h.total, easing: 'linear' }});
    setTimeout(dalej, h.total + (i === n - 1 ? HOP.last_hold_ms : HOP.hold_ms));
  }}
  ustaw(P[0]);
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) dot.classList.remove('ukryta');
  else setTimeout(function () {{ dot.classList.remove('ukryta'); setTimeout(dalej, HOP.hold_ms); }}, 100);
</script>
</body>
</html>
"""
open(f"{OUT}/przeskok-kropki.html", "w").write(demo)
print("animacja znaku i przeskok kropki zapisane w", OUT)
