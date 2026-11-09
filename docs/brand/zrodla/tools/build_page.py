import os, sys, base64
sys.path.insert(0, os.path.dirname(__file__))
from marks import wordmark_symbol, A_symbol, B_symbol, C_symbol
REPO = "/Users/stanislawdrozniak/strony_www/drozniak-landingpage"
OUT = f"{REPO}/docs/brand/kierunek-marki.html"

wm_vb, wm_body = wordmark_symbol()
a_vb, a_body, ag = A_symbol()
b_vb, b_body = B_symbol()
c_vb, c_body = C_symbol()
vb = lambda v: " ".join(f"{x:g}" for x in v)
photo = base64.b64encode(open(f"{REPO}/public/images/home/portret-hero-480.jpg", "rb").read()).decode()

sprite = f'''<svg width="0" height="0" style="position:absolute" aria-hidden="true">
<symbol id="wm" viewBox="{vb(wm_vb)}">{wm_body}</symbol>
<symbol id="markA" viewBox="{vb(a_vb)}">{a_body}</symbol>
<symbol id="markB" viewBox="{vb(b_vb)}">{b_body}</symbol>
<symbol id="markC" viewBox="{vb(c_vb)}">{c_body}</symbol>
</svg>'''

def use(i, cls="", label=None, style=""):
    v = {"wm": wm_vb, "markA": a_vb, "markB": b_vb, "markC": c_vb}[i]
    aria = f'role="img" aria-label="{label}"' if label else 'aria-hidden="true"'
    return f'<svg class="{cls}" viewBox="0 0 {v[2]:g} {v[3]:g}" {aria} style="{style}"><use href="#{i}"/></svg>'

dcx, dcy, dr = ag['dot']
travel = f'''<svg class="travel" viewBox="{vb(a_vb)}" role="img" aria-label="Znak D z kropką, kropka przechodzi przez otwartą literę" data-travel>
<path fill="currentColor" d="{ag['d']}"/>
<path class="motion" d="{ag['motion']}" fill="none" stroke="none"/>
<circle class="mover" cx="{dcx}" cy="{dcy}" r="{dr}" fill="var(--dot)"/></svg>'''

def concept(letter, name, mark, idea, plus, risk, rec=False):
    small = "".join(f'<div class="sz"><svg viewBox="0 0 {({"markA":a_vb,"markB":b_vb,"markC":c_vb}[mark])[2]:g} {({"markA":a_vb,"markB":b_vb,"markC":c_vb}[mark])[3]:g}" style="height:{px}px" aria-hidden="true"><use href="#{mark}"/></svg><span>{px} px</span></div>' for px in (64, 32, 16))
    tag = '<p class="rec">Polecam</p>' if rec else ''
    return f'''<article class="concept{' is-rec' if rec else ''}">
<div class="concept-art">{use(mark, "concept-mark", f"Koncepcja {letter}")}</div>
<div class="concept-sizes">{small}</div>
<div class="concept-wm">{use("wm", "wm-s", "Napis Drożniak")}</div>
<h3>{letter}. {name}</h3>{tag}
<p>{idea}</p>
<p><strong>Mocne strony.</strong> {plus}</p>
<p><strong>Ryzyko.</strong> {risk}</p>
</article>'''

concepts = "".join([
    concept("A", "D z kropką", "markA",
        "Kropka znad Ż wychodzi z litery D przez przerwę w łuku. Litera jest otwarta, nic nie zatrzymuje drogi. Całość czyta się też jak „D.”, skrót nazwiska.",
        "Opowiada o tym, czym się zajmujesz, a nie tylko o tym, jak się nazywasz. Czytelny przy 16 px. Daje gotową animację: kropka przechodzi przez znak, tak jak zapytanie przez dobrze ustawiony marketing.",
        "Postawiony tuż przed nazwiskiem czytałby się jak „D. Drożniak”, czyli jak inicjał imienia. Dlatego znak i napis nie stoją obok siebie, każdy pracuje osobno.", rec=True),
    concept("B", "Ḋ, inicjał z kropką", "markB",
        "Kropka przechodzi z Ż na pierwszą literę nazwiska. Klasyczny szeryfowy monogram z tego samego kroju co napis.",
        "Spokojny i ponadczasowy. Ładnie wygląda wytłoczony na papierze. Najbliżej obecnego, książkowego stylu strony.",
        "Litera pochodzi prosto z kroju, więc trzeba ją przerysować, żeby była tylko Twoja. Kojarzy się bardziej z kancelarią niż z marketingiem. Cienkie szeryfy słabną przy 16 px."),
    concept("C", "Ż jako trasa", "markC",
        "Z narysowane jak droga z zakrętem, kropka nad nim to cel. Najbardziej charakterystyczna litera w nazwisku.",
        "Najbardziej wyrazisty z trzech, mocny jak znak drogowy. Trudno go z czymś pomylić.",
        "Ż nie jest Twoim inicjałem. Bez napisu obok mało kto połączy je z nazwiskiem."),
])

dots = [
    ("Złoto z obecnej strony", "--sp-gold", "#C9A227", "2,2", "7,6", False, True),
    ("Żółty z obecnych przycisków", "--sp-yellow", "#F2CE4B", "1,4", "11,9", False, True),
    ("Kobalt", "--sp-cobalt", "#2443D6", "6,8", "2,5", True, False),
    ("Cynober", "--sp-red", "#E03A26", "4,0", "4,2", True, True),
    ("Zieleń sygnałowa", "--sp-green", "#14945E", "3,5", "4,7", True, True),
]
def ok(b): return '<span class="ok">widać</span>' if b else '<span class="bad">ginie</span>'
dot_rows = "".join(f'''<div class="dot-row">
<p class="dot-name">{n}<br><span class="hex">{h}</span></p>
<div class="dot-cell on-paper"><span class="dot" style="background:var({t})"></span><p>{p}:1 {ok(okp)}</p></div>
<div class="dot-cell on-ink"><span class="dot" style="background:var({t})"></span><p>{k}:1 {ok(oki)}</p></div>
</div>''' for n, t, h, p, k, okp, oki in dots)

def swatches(items):
    bar = '<div class="propbar" aria-hidden="true">' + "".join(f'<span style="flex:{w};background:var({t})"></span>' for n, t, h, role, w in items) + '</div>'
    leg = '<ul class="legend">' + "".join(f'<li><span class="chip" style="background:var({t})"></span><p><strong>{n}</strong> {h}<br>{role}</p></li>' for n, t, h, role, w in items) + '</ul>'
    return '<div class="swatches">' + bar + leg + '</div>'

def mini(theme, dot_paper, dot_field, field, btn_bg, btn_fg, btn_dot):
    btn_dot_html = f'<span class="bdot" style="background:var({btn_dot})"></span>' if btn_dot else ''
    return f'''<div class="mini" aria-hidden="true">
<div class="mini-paper" style="--dot:var({dot_paper})">
<div class="mini-bar">{use("wm", "mini-wm")}<span class="mini-links">Współpraca&nbsp;&nbsp; O mnie&nbsp;&nbsp; Kontakt</span><span class="mini-btn" style="background:var({btn_bg});color:var({btn_fg})">{btn_dot_html}Umów rozmowę</span></div>
<p class="mini-h">Marketing i pozyskiwanie klientów dla firm</p>
<p class="mini-t">Planuję i prowadzę wszystkie części marketingu firmy.</p>
</div>
<div class="mini-field" style="background:var({field});--dot:var({dot_field})">{use("markA", "mini-mark")}<p>Porozmawiajmy</p></div>
</div>'''

directions = f'''
<article class="dir is-rec">
<div class="dir-head"><h3>Zielone światło</h3><p class="rec">Polecam</p></div>
{mini("g", "--sp-green", "--sp-green", "--sp-deep", "--sp-ink", "--sp-paper", "--sp-green")}
{swatches([("Papier","--sp-paper","#F6F5F1","tło, ok. 75%",5),("Atrament","--sp-ink","#161511","tekst i znak",3),("Grafit","--sp-muted","#5E5A50","tekst pomocniczy",2),("Głęboka zieleń","--sp-deep","#0E2A20","jedna ciemna płaszczyzna",2),("Zieleń sygnałowa","--sp-green","#14945E","tylko kropka, do 2%",1)])}
<p>Zielone światło oznacza, że droga jest wolna. To samo mówi nazwisko („drożny”) i znak, przez który przechodzi kropka. Zielona kropka oznacza też „dostępny” w komunikatorach, więc przy przycisku „Umów rozmowę” mówi coś prawdziwego. Ciemne płaszczyzny, takie jak stopka i tył wizytówki, dostają głęboką zieleń zamiast czerni, więc marka ma własny ciemny kolor.</p>
<p><strong>Ryzyko.</strong> Zieleń kojarzy się też z ekologią i bankami. Dlatego jest jej mało: kropka i jedna ciemna płaszczyzna na stronę, bez zielonych nagłówków, ikon i ramek.</p>
</article>
<article class="dir">
<div class="dir-head"><h3>Czerwona kropka</h3></div>
{mini("r", "--sp-red", "--sp-red", "--sp-ink", "--sp-ink", "--sp-paper", "--sp-red")}
{swatches([("Papier","--sp-paper","#F6F5F1","tło",5),("Atrament","--sp-ink","#161511","tekst, znak i ciemne pola",4),("Grafit","--sp-muted","#5E5A50","tekst pomocniczy",2),("Cynober","--sp-red","#E03A26","tylko kropka",1)])}
<p>Czerwony punkt to cel na mapie i znaczek nowej wiadomości, czyli nowe zapytanie. Najwięcej energii z trzech kierunków i najlepszy kontrast kropki na obu tłach.</p>
<p><strong>Ryzyko.</strong> Czerwony to też „stop” i komunikat o błędzie, a cała marka mówi „droga wolna”. Papier, czerń, szeryf i jeden czerwony akcent to dziś bardzo częsty zestaw na stronach składanych przez AI, więc trudniej się nim wyróżnić.</p>
</article>
<article class="dir">
<div class="dir-head"><h3>Żółty na atramencie</h3></div>
{mini("y", "--sp-ink", "--sp-yellow", "--sp-ink", "--sp-yellow", "--sp-ink", None)}
{swatches([("Papier","--sp-paper","#F6F5F1","tło",5),("Atrament","--sp-ink","#161511","tekst, znak i ciemne pola",4),("Grafit","--sp-muted","#5E5A50","tekst pomocniczy",2),("Żółty","--sp-yellow","#F2CE4B","przyciski, kropka na ciemnym",1)])}
<p>Zostaje żółty, który już się z Tobą kojarzy ze starej i obecnej strony. Działa tylko na ciemnym tle, więc marka częściej pokazuje się na czarnych płaszczyznach.</p>
<p><strong>Ryzyko.</strong> Na jasnym tle żółta kropka znika (1,4:1), więc w logo na papierze kropka musi być czarna. Podpis marki zmienia kolor zależnie od tła. Złoto i żółć na kremowym tle odbiera się jak luksus albo coaching, a nie jak konkretną pracę z liczbami.</p>
</article>'''

html = f'''<title>Marka Drożniak</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Brygada+1918:wght@400..700&family=Schibsted+Grotesk:wght@400..700&family=Fraunces:opsz,wght@72,500&display=swap">
<style>
/* Układ: jedna kolumna dokumentu 1120 px, sekcje rozdzielone przestrzenią i jednym krokiem tonu, ciemna zieleń raz w nagłówku. */
:root {{
  --bg: #F6F5F1; --surface: #ECEAE3; --surface-2: #E3E0D7;
  --ink: #161511; --muted: #5E5A50; --dot: #14945E;
  --field: #0E2A20; --field-ink: #F1EFE8; --field-muted: #B4C2B9;
  --f-display: "Brygada 1918", Georgia, "Times New Roman", serif;
  --f-text: "Schibsted Grotesk", system-ui, -apple-system, "Segoe UI", sans-serif;
  /* próbki kolorów: stałe w obu motywach, bo pokazują prawdziwe barwy */
  --sp-paper: #F6F5F1; --sp-ink: #161511; --sp-muted: #5E5A50; --sp-green: #14945E; --sp-deep: #0E2A20;
  --sp-red: #E03A26; --sp-yellow: #F2CE4B; --sp-gold: #C9A227; --sp-cobalt: #2443D6;
  --sp-mini-text: #4A4740;
}}
@media (prefers-color-scheme: dark) {{ :root:not([data-theme="light"]) {{
  --bg: #0F1C17; --surface: #16271F; --surface-2: #1D3128; --ink: #EEECE5; --muted: #AAB5AD; --dot: #1FA36A;
  --field: #08130F; --field-ink: #F1EFE8; --field-muted: #AAB5AD; color-scheme: dark; }} }}
:root[data-theme="dark"] {{
  --bg: #0F1C17; --surface: #16271F; --surface-2: #1D3128; --ink: #EEECE5; --muted: #AAB5AD; --dot: #1FA36A;
  --field: #08130F; --field-ink: #F1EFE8; --field-muted: #AAB5AD; color-scheme: dark; }}
* {{ box-sizing: border-box; }}
body {{ background: var(--bg); color: var(--ink); font-family: var(--f-text); font-size: 17px; line-height: 1.55; -webkit-font-smoothing: antialiased; }}
.wrap {{ max-width: 1120px; margin-inline: auto; padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); }}
h1, h2, h3 {{ font-family: var(--f-display); font-weight: 600; color: var(--ink); text-wrap: balance; margin: 0; letter-spacing: -0.015em; }}
h1 {{ font-size: clamp(44px, 7vw, 92px); line-height: 1; letter-spacing: -0.025em; }}
h2 {{ font-size: clamp(32px, 4.2vw, 52px); line-height: 1.05; }}
h3 {{ font-size: 26px; line-height: 1.15; }}
p {{ margin: 0; max-width: 64ch; }}
.lead {{ font-size: clamp(19px, 1.6vw, 22px); line-height: 1.5; }}
.muted {{ color: var(--muted); }}
section {{ padding-block: clamp(64px, 9vw, 120px) 0; }}
.sec-head {{ display: grid; gap: 18px; margin-bottom: 40px; }}
.rec {{ display: inline-block; font-weight: 600; font-size: 15px; color: var(--ink); padding: 4px 12px 4px 26px; border-radius: 999px; background: var(--surface-2); position: relative; width: fit-content; }}
.rec::before {{ content: ""; position: absolute; left: 10px; top: 50%; width: 9px; height: 9px; margin-top: -4.5px; border-radius: 50%; background: var(--sp-green); }}

/* Nagłówek strony */
.hero {{ padding-block: clamp(40px, 6vw, 72px) 0; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(24px, 4vw, 56px); align-items: stretch; }}
.hero-text {{ display: grid; gap: 24px; align-content: center; }}
.hero-field {{ background: var(--sp-deep); color: var(--sp-paper); border-radius: 20px; padding: clamp(28px, 4vw, 48px); display: grid; gap: 28px; justify-items: center; align-content: center; min-height: 420px; --dot: var(--sp-green); }}
.travel {{ width: min(260px, 60%); height: auto; color: var(--sp-paper); overflow: visible; }}
.hero-field .wm-l {{ width: min(300px, 70%); height: auto; color: var(--sp-paper); }}
.hero-field p {{ color: var(--field-muted); font-size: 15px; text-align: center; max-width: 34ch; }}
.primary {{ display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-top: 16px; }}
.primary > div {{ background: var(--surface); border-radius: 16px; padding: 28px 24px; display: grid; gap: 16px; align-content: space-between; min-height: 200px; }}
.primary svg {{ height: 56px; width: auto; max-width: 100%; color: var(--ink); }}
.primary .p-paper {{ background: var(--sp-paper); color: var(--sp-ink); --dot: var(--sp-green); }}
.primary .p-paper svg {{ color: var(--sp-ink); }}
.primary .p-deep {{ background: var(--sp-deep); --dot: var(--sp-green); }}
.primary .p-deep svg {{ color: var(--sp-paper); }}
.primary .p-deep p {{ color: var(--field-muted); }}
.primary .p-mono {{ background: var(--sp-paper); --dot: var(--sp-ink); }}
.primary .p-mono svg {{ color: var(--sp-ink); }}
.primary p {{ font-size: 15px; color: var(--sp-muted); }}

/* Pomysł */
.idea {{ display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: clamp(24px, 5vw, 72px); align-items: start; }}
.idea .copy {{ display: grid; gap: 18px; }}
.lang {{ background: var(--surface); border-radius: 16px; padding: 28px; display: grid; gap: 20px; }}
.lang-row {{ display: grid; grid-template-columns: 120px minmax(0, 1fr); gap: 18px; align-items: center; }}
.lang-row svg {{ width: 120px; height: 48px; color: var(--ink); }}
.lang-row p {{ font-size: 16px; }}

/* Kropka na końcu */
.period {{ display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 16px; }}
.period > div {{ border-radius: 16px; padding: 32px 28px; display: grid; gap: 20px; align-content: start; }}
.period .before {{ background: var(--surface); }}
.period .after {{ background: var(--sp-paper); color: var(--sp-ink); --dot: var(--sp-green); }}
.period .after p {{ color: var(--sp-muted); }}
.old-wm {{ font-family: "Fraunces", Georgia, serif; font-weight: 500; font-size: clamp(34px, 4.6vw, 54px); letter-spacing: 0.02em; line-height: 1; color: var(--ink); }}
.old-wm span {{ color: var(--sp-gold); }}
.period .wm-m {{ height: clamp(40px, 5vw, 60px); width: auto; max-width: 100%; color: var(--sp-ink); }}

/* Koncepcje */
.concepts {{ display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }}
.concept {{ background: var(--surface); border-radius: 16px; padding: 24px; display: grid; gap: 14px; align-content: start; --dot: currentColor; }}
.concept.is-rec {{ background: var(--surface-2); }}
.concept-art {{ background: var(--sp-paper); border-radius: 12px; aspect-ratio: 1; display: grid; place-items: center; color: var(--sp-ink); }}
.concept-mark {{ width: 62%; height: 62%; }}
.concept-sizes {{ display: flex; align-items: flex-end; gap: 22px; padding: 6px 2px; }}
.sz {{ display: grid; gap: 6px; justify-items: start; }}
.sz svg {{ width: auto; color: var(--ink); }}
.sz span {{ font-size: 13px; color: var(--muted); }}
.concept-wm {{ background: var(--sp-paper); border-radius: 12px; padding: 18px; color: var(--sp-ink); }}
.wm-s {{ height: 34px; width: auto; max-width: 100%; display: block; }}
.concept p {{ font-size: 16px; }}
.note {{ margin-top: 20px; color: var(--muted); font-size: 16px; }}

/* Kolory */
.rules {{ display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-bottom: 48px; }}
.rules > div {{ background: var(--surface); border-radius: 16px; padding: 24px; display: grid; gap: 10px; align-content: start; }}
.rules h3 {{ font-size: 22px; }}
.rules p {{ font-size: 16px; }}
.dot-test {{ display: grid; gap: 8px; }}
.dot-row {{ display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 1fr); gap: 8px; align-items: stretch; }}
.dot-name {{ font-weight: 600; font-size: 16px; padding: 14px 4px; align-self: center; }}
.hex {{ font-weight: 400; color: var(--muted); }}
.dot-cell {{ border-radius: 12px; padding: 14px 18px; display: flex; align-items: center; gap: 16px; }}
.dot-cell p {{ font-size: 15px; }}
.on-paper {{ background: var(--sp-paper); color: var(--sp-ink); }}
.on-ink {{ background: var(--sp-ink); color: var(--sp-paper); }}
.dot {{ width: 30px; height: 30px; border-radius: 50%; flex: none; }}
.ok, .bad {{ font-weight: 600; margin-left: 6px; }}
.dot-head {{ display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 1fr); gap: 8px; font-size: 14px; color: var(--muted); padding: 0 4px; }}
.dirs {{ display: grid; gap: 16px; margin-top: 48px; }}
.dir {{ background: var(--surface); border-radius: 16px; padding: clamp(20px, 3vw, 32px); display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 20px 32px; align-items: start; }}
.dir.is-rec {{ background: var(--surface-2); }}
.dir-head {{ grid-column: 1 / -1; display: flex; flex-wrap: wrap; gap: 12px 16px; align-items: center; }}
.dir > p {{ grid-column: 2; font-size: 16px; }}
.dir .mini {{ grid-column: 1; grid-row: 2 / span 3; }}
.dir .swatches {{ grid-column: 2; }}
.mini {{ border-radius: 12px; overflow: hidden; }}
.mini-paper {{ background: var(--sp-paper); color: var(--sp-ink); padding: 16px 18px 26px; display: grid; gap: 14px; }}
.mini-bar {{ display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }}
.mini-wm {{ height: 18px; width: auto; color: var(--sp-ink); }}
.mini-links {{ font-size: 12px; color: var(--sp-mini-text); margin-left: auto; white-space: nowrap; }}
.mini-btn {{ font-size: 12px; font-weight: 600; padding: 7px 12px; border-radius: 999px; display: inline-flex; align-items: center; gap: 7px; white-space: nowrap; }}
.bdot {{ width: 7px; height: 7px; border-radius: 50%; }}
.mini-h {{ font-family: var(--f-display); font-weight: 600; font-size: clamp(22px, 2.6vw, 30px); line-height: 1.08; letter-spacing: -0.015em; max-width: 18ch; }}
.mini-t {{ font-size: 13px; color: var(--sp-mini-text); }}
.mini-field {{ padding: 18px; display: flex; align-items: center; gap: 14px; color: var(--sp-paper); }}
.mini-field p {{ font-family: var(--f-display); font-weight: 600; font-size: 20px; color: var(--sp-paper); }}
.mini-mark {{ height: 34px; width: auto; color: var(--sp-paper); }}
.swatches {{ display: grid; gap: 14px; }}
.propbar {{ display: flex; height: 56px; border-radius: 10px; overflow: hidden; outline: 1px solid var(--surface-2); outline-offset: -1px; }}
.legend {{ list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px 16px; }}
.legend li {{ display: flex; gap: 10px; align-items: flex-start; min-width: 0; }}
.legend .chip {{ width: 18px; height: 18px; border-radius: 50%; flex: none; margin-top: 2px; outline: 1px solid var(--surface-2); }}
.legend p {{ font-size: 14px; line-height: 1.4; color: var(--muted); }}
.legend strong {{ color: var(--ink); font-weight: 600; }}
.props {{ margin-top: 16px; display: flex; height: 16px; border-radius: 8px; overflow: hidden; }}

/* Pismo */
.type {{ display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 16px; }}
.type > div {{ background: var(--surface); border-radius: 16px; padding: clamp(22px, 3vw, 36px); display: grid; gap: 16px; align-content: start; }}
.type .spec-d {{ font-family: var(--f-display); font-weight: 600; font-size: clamp(40px, 5.4vw, 68px); line-height: 1; letter-spacing: -0.02em; }}
.type .spec-t {{ font-family: var(--f-text); font-size: clamp(30px, 3.6vw, 44px); font-weight: 500; line-height: 1.05; letter-spacing: -0.015em; }}
.type .glyphs {{ font-size: 22px; letter-spacing: 0.02em; color: var(--muted); }}
.type p {{ font-size: 16px; }}
.type-why {{ margin-top: 24px; display: grid; gap: 14px; }}

/* Strona */
.site {{ display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); gap: 16px; align-items: start; }}
.site-mock {{ background: var(--sp-paper); color: var(--sp-ink); border-radius: 16px; overflow: hidden; --dot: var(--sp-green); }}
.sm-bar {{ display: flex; align-items: center; gap: 14px; padding: 18px 22px; flex-wrap: wrap; }}
.sm-bar .mini-wm {{ height: 22px; }}
.sm-bar .mini-links {{ font-size: 13px; }}
.sm-bar .mini-btn {{ background: var(--sp-ink); color: var(--sp-paper); font-size: 13px; padding: 9px 14px; }}
.sm-hero {{ display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: 18px; padding: 8px 22px 26px; align-items: center; }}
.sm-hero h4 {{ font-family: var(--f-display); font-weight: 600; font-size: clamp(30px, 3.8vw, 46px); line-height: 1; letter-spacing: -0.025em; margin: 0 0 12px; }}
.sm-hero .sub {{ font-family: var(--f-display); font-size: 18px; font-weight: 500; line-height: 1.2; margin-bottom: 8px; }}
.sm-hero .txt {{ font-size: 13px; color: var(--sp-mini-text); margin-bottom: 14px; }}
.sm-hero img {{ width: 100%; aspect-ratio: 4 / 5; object-fit: cover; border-radius: 12px; display: block; }}
.sm-foot {{ background: var(--sp-deep); padding: 22px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }}
.sm-foot p {{ font-family: var(--f-display); font-weight: 600; font-size: 26px; color: var(--sp-paper); }}
.sm-foot .mini-mark {{ height: 40px; }}
.changes {{ display: grid; gap: 14px; margin: 0; padding: 0; list-style: none; }}
.changes li {{ background: var(--surface); border-radius: 14px; padding: 18px 20px; font-size: 16px; }}

/* Wizytówka */
.cards {{ display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 16px; }}
.bcard {{ aspect-ratio: 90 / 50; border-radius: 10px; padding: clamp(16px, 3vw, 30px); display: grid; max-width: 100%; }}
.bc-front {{ background: var(--sp-paper); color: var(--sp-ink); --dot: var(--sp-green); grid-template-rows: auto 1fr auto; outline: 1px solid var(--surface-2); outline-offset: -1px; }}
.bc-front .wm-c {{ height: clamp(22px, 3vw, 32px); width: auto; }}
.bc-front .who {{ align-self: end; font-size: clamp(12px, 1.4vw, 15px); line-height: 1.4; }}
.bc-front .who strong {{ font-weight: 600; }}
.bc-front .contact {{ font-size: clamp(11px, 1.2vw, 13px); color: var(--sp-mini-text); margin-top: 8px; }}
.bc-back {{ background: var(--sp-deep); place-items: center; --dot: var(--sp-green); }}
.bc-back svg {{ height: 42%; width: auto; color: var(--sp-paper); }}
.print {{ margin-top: 20px; display: grid; gap: 10px; }}
.print p {{ font-size: 16px; }}

/* Decyzje */
.next {{ display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 16px; padding-bottom: clamp(64px, 9vw, 120px); }}
.next > div {{ background: var(--surface); border-radius: 16px; padding: clamp(22px, 3vw, 32px); display: grid; gap: 14px; align-content: start; }}
.next ol, .next ul {{ margin: 0; padding-left: 22px; display: grid; gap: 10px; }}
.next li {{ font-size: 16px; }}
.next .dark {{ background: var(--field); color: var(--field-ink); }}
.next .dark h2, .next .dark h3 {{ color: var(--field-ink); }}

@media (max-width: 860px) {{
  .hero, .idea, .period, .type, .site, .next, .cards {{ grid-template-columns: minmax(0, 1fr); }}
  .concepts, .rules, .primary {{ grid-template-columns: minmax(0, 1fr); }}
  .dir {{ grid-template-columns: minmax(0, 1fr); }}
  .dir > p, .dir .mini, .dir .swatches {{ grid-column: 1; grid-row: auto; }}
  .hero-field {{ min-height: 0; }}
}}
@media (max-width: 520px) {{
  .dot-row, .dot-head {{ grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }}
  .dot-name {{ grid-column: 1 / -1; padding-bottom: 0; }}
  .dot-head span:first-child {{ display: none; }}
  .legend {{ grid-template-columns: minmax(0, 1fr); }}
  .sm-hero {{ grid-template-columns: minmax(0, 1fr); }}
  .mini-links {{ display: none; }}
}}
@media (prefers-reduced-motion: reduce) {{ * {{ animation: none !important; transition: none !important; }} }}
</style>
{sprite}
<div class="wrap">
<header class="hero">
  <div class="hero-text">
    <h1>Marka Drożniak</h1>
    <p class="lead">Propozycja znaku, kolorów i pisma. Do wyboru teraz, zanim powstaną wizytówki, brand book i nowa wersja strony, bo później zmiana będzie kosztowna.</p>
    <p class="muted">Listopad 2026. Wszystkie znaki są narysowane od zera w SVG i przetestowane w rozmiarach od 16 px, w jednym kolorze i w negatywie.</p>
  </div>
  <div class="hero-field">
    {travel}
    {use("wm", "wm-l", "Napis Drożniak")}
    <p>Kropka przechodzi przez otwartą literę. Tak znak może się ruszać w filmach i na stronie.</p>
  </div>
</header>

<div class="primary">
  <div class="p-paper">{use("wm", "", "Napis Drożniak na papierze")}<p>Logo główne: napis z zieloną kropką nad Ż.</p></div>
  <div class="p-deep">{use("markA", "", "Znak D z kropką na zieleni")}<p>Znak skrócony: awatar, favikona, tył wizytówki, róg filmu.</p></div>
  <div class="p-mono">{use("wm", "", "Napis Drożniak w jednym kolorze")}<p>Wersja jednokolorowa do faksu, pieczątki, grawerunku.</p></div>
</div>

<section>
  <div class="idea">
    <div class="copy">
      <h2>Pomysł na markę</h2>
      <p class="lead">„Drożny” znaczy przejezdny, bez zatorów. Mówi się o drożnej drodze albo drożnym przewodzie.</p>
      <p>Twoja praca polega na tym samym: zapytanie od klienta ma przejść od reklamy do sprzedaży i nigdzie po drodze nie utknąć. Nie zginąć w skrzynce, nie czekać trzy dni na odpowiedź, nie przepaść po pierwszym zakupie.</p>
      <p>W nazwisku jest też Ż z kropką. To najbardziej charakterystyczny znak w całym napisie i to on zostaje podpisem marki.</p>
      <p>Z tych dwóch rzeczy powstaje cały język wizualny. Linia to droga, kropka to klient albo zapytanie, które nią idzie. Ten sam układ działa w logo, w animacjach procesu, w schematach i na wizytówce.</p>
    </div>
    <div class="lang" aria-label="Elementy języka wizualnego">
      <div class="lang-row"><svg viewBox="0 0 120 48" aria-hidden="true"><rect x="4" y="18" width="112" height="12" fill="currentColor"/></svg><p><strong>Linia.</strong> Droga, proces, kolejne kroki. Zawsze tej samej grubości.</p></div>
      <div class="lang-row"><svg viewBox="0 0 120 48" aria-hidden="true"><circle cx="60" cy="24" r="14" fill="var(--dot)"/></svg><p><strong>Kropka.</strong> Klient, zapytanie, cel. Jedyne miejsce, gdzie pojawia się kolor marki.</p></div>
      <div class="lang-row"><svg viewBox="0 0 120 48" aria-hidden="true"><rect x="4" y="18" width="70" height="12" fill="currentColor"/><circle cx="98" cy="24" r="14" fill="var(--dot)"/></svg><p><strong>Razem.</strong> Droga, na której nic nie stoi, i klient na jej końcu.</p></div>
    </div>
  </div>
</section>

<section>
  <div class="sec-head">
    <h2>Kropka na końcu nazwiska</h2>
    <p class="lead">Bez kropki na końcu. Twoje nazwisko ma własną kropkę, nad Ż, i to ją warto pokazać.</p>
  </div>
  <div class="period">
    <div class="before">
      <p class="old-wm">DROZNIAK<span>.</span></p>
      <p>Obecny napis ma dwa problemy. Wersalikami zgubiło się Ż, więc czyta się „Drozniak”. To samo jest w obu starszych plikach logo w repozytorium. Kropka na końcu nazwy to z kolei popularny zabieg studiów i freelancerów, więc niczym nie wyróżnia.</p>
    </div>
    <div class="after">
      {use("wm", "wm-m", "Napis Drożniak z kropką nad Ż")}
      <p>Nowy napis: małe litery, polski krój Brygada 1918, kropka nad Ż powiększona do okrągłego punktu w kolorze marki. Nazwisko jest zapisane poprawnie, a kropka robi to, co wcześniej robiła ta na końcu.</p>
    </div>
  </div>
</section>

<section>
  <div class="sec-head">
    <h2>Koncepcje znaku</h2>
    <p class="lead">W każdej logo główne to ten sam napis „Drożniak”. Różni się znak skrócony. Na tym etapie wszystko jest czarne, żeby oceniać kształt, a nie kolor.</p>
  </div>
  <div class="concepts">{concepts}</div>
  <p class="note">Rozmiary 64, 32 i 16 px są prawdziwe, tak znak wygląda w karcie przeglądarki i na liście kontaktów. Przed drukiem warto sprawdzić wybrany znak w bazach znaków towarowych (UPRP i EUIPO), ja tego nie zagwarantuję.</p>
</section>

<section>
  <div class="sec-head">
    <h2>Kolory</h2>
    <p class="lead">Kolorystykę układa się od ról, jakie kolory pełnią. W tej marce są cztery: tło, tekst, jedna ciemna płaszczyzna na mocne miejsca i kolor kropki. Kropka to podpis marki, więc jej kolor musi spełnić trzy warunki.</p>
  </div>
  <div class="rules">
    <div><h3>Widać go na każdym tle</h3><p>Logo pojawia się na papierze, w ciemnej stopce, na zdjęciach. Kolor kropki musi mieć średnią jasność, bo tylko wtedy odcina się i od jasnego, i od ciemnego tła. Minimum to 3:1.</p></div>
    <div><h3>Znaczy to samo co marka</h3><p>Kolor niesie skojarzenie, zanim ktoś przeczyta pierwsze słowo. Dobrze, gdy mówi to samo co nazwisko i znak.</p></div>
    <div><h3>Pojawia się rzadko</h3><p>Najwyżej kilka procent ekranu: kropka w logo, kropka przy przycisku, punkt w animacji. Kolor, który jest wszędzie, przestaje cokolwiek znaczyć.</p></div>
  </div>
  <h3 style="margin-bottom:8px">Kontrast kropki na jasnym i ciemnym tle</h3>
  <p class="muted" style="margin-bottom:20px">Liczby to współczynnik kontrastu według WCAG, policzony dla papieru #F6F5F1 i atramentu #161511.</p>
  <div class="dot-test">
    <div class="dot-head"><span>Kolor</span><span>Na papierze</span><span>Na ciemnym</span></div>
    {dot_rows}
  </div>
  <p class="note">Obecne złoto i żółty giną na jasnym tle, więc kropka w logo byłaby niewidoczna na stronie i na wizytówce. Kobalt ginie na ciemnym. Na obu tłach działają tylko barwy o średniej jasności: czerwień i zieleń.</p>
  <div class="dirs">{directions}</div>
</section>

<section>
  <div class="sec-head">
    <h2>Kroje pisma</h2>
    <p class="lead">Dwa kroje, każdy do swojej roboty. Oba mają wolną licencję SIL Open Font License, więc można ich używać w logo, na stronie i w druku bez opłat.</p>
  </div>
  <div class="type">
    <div>
      <p class="spec-d">Pozyskuję klientów dla firm</p>
      <p class="glyphs" style="font-family:var(--f-display)">ą ę ż ź ł ś ć ó ń  Ż Ł Ś</p>
      <h3>Brygada 1918</h3>
      <p>Do nazwiska i nagłówków. Polski krój odtworzony w 2018 roku na stulecie niepodległości przez studio Capitalics, na podstawie katalogu Państwowej Odlewni Czcionek z 1954 roku i odnalezionych matryc. W polskim tekście, pełnym ogonków i kresek, wygląda równo i spokojnie.</p>
    </div>
    <div>
      <p class="spec-t">Planuję i prowadzę cały marketing firmy</p>
      <p class="glyphs" style="font-family:var(--f-text)">ą ę ż ź ł ś ć ó ń  0123456789</p>
      <h3>Schibsted Grotesk</h3>
      <p>Do tekstu, menu, przycisków i podpisów. Krój zaprojektowany dla norweskiej grupy medialnej Schibsted z myślą o ekranach. Czytelny w małych rozmiarach, rzeczowy jak gazeta.</p>
    </div>
  </div>
  <div class="type-why">
    <p>Dlaczego zmiana: Fraunces i Plus Jakarta Sans są dziś na tysiącach stron startupów i stron generowanych przez AI. Nowa para jest mniej oczywista i ma związek z Tobą: polski krój do polskiego nazwiska, gazetowy grotesk do konkretnych treści.</p>
    <p class="muted">Zasada na stronie: jeden nagłówek, jeden krój. Znika układ „linia szeryfowa plus linia grubym bezszeryfowym” w jednym tytule.</p>
  </div>
</section>

<section>
  <div class="sec-head">
    <h2>Zmiany na stronie</h2>
    <p class="lead">Papier i atrament zostają, bo działają. Zmieniają się akcent, ciemne płaszczyzny, pismo i kilka szarości, które mają za mały kontrast.</p>
  </div>
  <div class="site">
    <div class="site-mock" aria-label="Podgląd strony głównej w nowym stylu" role="img">
      <div class="sm-bar">{use("wm", "mini-wm")}<span class="mini-links">Współpraca&nbsp;&nbsp; Szkolenia&nbsp;&nbsp; O mnie&nbsp;&nbsp; Kontakt</span><span class="mini-btn"><span class="bdot" style="background:var(--sp-green)"></span>Umów rozmowę</span></div>
      <div class="sm-hero">
        <div><h4>Stanisław Drożniak</h4><p class="sub">Marketing i pozyskiwanie klientów dla firm</p><p class="txt">Planuję i prowadzę wszystkie części marketingu firmy: reklamy, stronę, obsługę zapytań i automatyzacje.</p><span class="mini-btn" style="background:var(--sp-ink);color:var(--sp-paper)"><span class="bdot" style="background:var(--sp-green)"></span>Umów rozmowę</span></div>
        <img src="data:image/jpeg;base64,{photo}" alt="">
      </div>
      <div class="sm-foot"><p>Porozmawiajmy</p>{use("markA", "mini-mark")}</div>
    </div>
    <ul class="changes">
      <li>Złote przyciski znikają. Przycisk główny jest czarny, a przy napisie świeci zielona kropka „dostępny”.</li>
      <li>Zieleń sygnałowa pojawia się tylko jako kropka: w logo, przy przycisku i jako punkt w animacjach procesu, na przykład droga zapytania od reklamy do sprzedaży.</li>
      <li>Ciemne płaszczyzny, czyli stopka „Porozmawiajmy” i sekcja realizacji, zmieniają się z czarnych na głęboką zieleń.</li>
      <li>Szary tekst pomocniczy ciemnieje z #85816F do #5E5A50. Obecny ma kontrast 3,6:1, za mało na tekst. Nowy ma 6,3:1.</li>
      <li>Nagłówki w Brygadzie 1918, tekst w Schibsted Grotesk. Zdjęcia zostają bez filtrów i bez barwienia na kolor marki.</li>
    </ul>
  </div>
</section>

<section>
  <div class="sec-head">
    <h2>Wizytówka</h2>
    <p class="lead">Przód na papierze z napisem, tył w głębokiej zieleni ze znakiem. Format 90 × 50 mm, polski standard.</p>
  </div>
  <div class="cards">
    <div class="bcard bc-front" role="img" aria-label="Przód wizytówki">
      {use("wm", "wm-c")}
      <span></span>
      <div class="who"><strong>Stanisław Drożniak</strong><br>Marketing i pozyskiwanie klientów<p class="contact">drozniak.com<br>stanislaw@drozniak.com</p></div>
    </div>
    <div class="bcard bc-back" role="img" aria-label="Tył wizytówki">{use("markA")}</div>
  </div>
  <div class="print">
    <p>Druk: czarny i jeden kolor dodatkowy na niepowlekanym papierze w odcieniu złamanej bieli, bez nadruku tła. Zieleń sygnałowa jest bliska Pantone 340 C, a głęboka zieleń to druk pełną farbą albo papier barwiony w masie. Oba odcienie trzeba potwierdzić na fizycznym wzorniku przed zamówieniem.</p>
    <p class="muted">Dobra drukarnia zrobi też wersję z tłoczeniem znaku na tyle, bez farby. Wtedy kropka zostaje jedynym kolorem.</p>
  </div>
</section>

<section>
  <div class="next">
    <div>
      <h2>Do decyzji</h2>
      <ol>
        <li>Który znak skrócony: A (D z kropką), B (Ḋ) czy C (Ż). Polecam A.</li>
        <li>Który kierunek kolorów: zielone światło, czerwona kropka czy żółty na atramencie. Polecam zielone światło.</li>
        <li>Czy zmieniamy kroje na Brygadę 1918 i Schibsted Grotesk. Polecam tak.</li>
      </ol>
      <p class="muted">Możesz też wziąć coś z kilku propozycji naraz, na przykład znak A w kolorze z innego kierunku.</p>
    </div>
    <div class="dark">
      <h3>Co przygotuję po wyborze</h3>
      <ul>
        <li>Brand book: znak i jego wersje, pole ochronne, minimalne rozmiary, kolory w HEX, RGB, CMYK i Pantone, kroje i skala pisma, zasady zdjęć, przykłady złego użycia.</li>
        <li>Pliki logo: SVG, PNG, PDF do druku, favikony i ikony aplikacji.</li>
        <li>Projekt wizytówki gotowy do drukarni.</li>
        <li>Szablony: stopka maila, okładki social media, slajd, miniatura do filmów.</li>
        <li>Animacja znaku do filmów i strony.</li>
        <li>Nowa wersja strony w tym systemie.</li>
      </ul>
    </div>
  </div>
</section>
</div>
<script>
(function () {{
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;
  document.querySelectorAll('[data-travel]').forEach(function (svg) {{
    var path = svg.querySelector('.motion'), dot = svg.querySelector('.mover');
    if (!path || !path.getTotalLength) return;
    var len = path.getTotalLength(), fade = 350, travel = 2300, hold = 2600, total = fade + travel + hold + fade, t0 = null;
    function ease(t) {{ return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }}
    function frame(ts) {{
      if (t0 === null) t0 = ts;
      var t = (ts - t0) % total, p = 1, op = 1;
      if (t < fade) {{ p = 0; op = t / fade; }}
      else if (t < fade + travel) {{ p = ease((t - fade) / travel); }}
      else if (t >= fade + travel + hold) {{ op = 1 - (t - fade - travel - hold) / fade; }}
      var pt = path.getPointAtLength(p * len);
      dot.setAttribute('cx', pt.x.toFixed(2)); dot.setAttribute('cy', pt.y.toFixed(2)); dot.style.opacity = op.toFixed(3);
      requestAnimationFrame(frame);
    }}
    setTimeout(function () {{ requestAnimationFrame(frame); }}, 900);
  }});
}})();
</script>
'''
open(OUT, "w").write(html)
print(OUT, len(html))
