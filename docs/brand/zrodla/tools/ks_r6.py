"""Księga marki: rozdziały Zastosowania i Pliki."""
from ks_core import *
from ks_r2 import descriptor_lockup, avatar, WR, SR
from ks_r5 import photo, icon

def bars(n, w, h=14, gap=20, col=LINE2):
    return "".join(f'<div style="width:{w if i < n-1 else w*0.6:.0f}px;height:{h}px;background:{col};margin-bottom:{gap}px;border-radius:3px"></div>' for i in range(n))

def slide(kind, sc=0.245):
    W, H, M = 1920, 1080, 112
    if kind == "tytul":
        inner = abs_(M, M, tor(260, 10, [0, 1], 1, ink=PAPER, green=GREEN_L)) + abs_(M, 330, txt("Plan marketingu<br>na 2027", 150, 500, PAPER, "disp", 1.0, "letter-spacing:-0.022em")) + abs_(M, H - M - 300 * WR, word(ink=PAPER, w=300)) + abs_(W - M - 420, H - M - 30, txt("12 stycznia 2027", 28, 400, DEEPM, extra="width:420px;text-align:right"))
        return mock(W, H, sc, inner, bg=DEEP)
    if kind == "tresc":
        inner = (abs_(M, M, txt("Skąd przychodzą zapytania", 72, 600, font="disp", lh=1.05)) + abs_(M, 250, txt("Najwięcej zapytań daje wyszukiwarka, ale najlepiej sprzedają się te z poleceń.", 36, extra="width:900px;line-height:1.4"))
                 + abs_(M, 560, tor(1100, 12, [0, .33, .66, 1], 1, labels=["Reklama", "Zapytanie", "Rozmowa", "Sprzedaż"], font=28)) + abs_(W - M - 56 * SR, H - M - 56, sym(h=56)) + abs_(M, H - M - 22, txt("4", 22, 500, MUTED)))
        return mock(W, H, sc, inner, bg=PAPER)
    if kind == "liczba":
        inner = abs_(M, 170, txt("41", 420, 500, font="disp", lh=0.9, extra="letter-spacing:-0.03em")) + abs_(M, 610, txt("rozmów z zapytań z wyszukiwarki w kwietniu.<br>Miesiąc wcześniej było ich 27.", 36, extra="line-height:1.4")) + abs_(W - M - 56 * SR, H - M - 56, sym(h=56)) + abs_(M, H - M - 22, txt("5", 22, 500, MUTED))
        return mock(W, H, sc, inner, bg=PAPER)
    if kind == "zdjecie":
        inner = abs_(W - 760, 0, photo(PHOTO1, 760, 1080, "50% 12%")) + abs_(M, M, txt("Kto prowadzi projekt", 72, 600, font="disp")) + abs_(M, 250, txt("Stanisław Drożniak planuje i prowadzi wszystkie części marketingu firmy.", 36, extra="width:820px;line-height:1.4")) + abs_(M, H - M - 22, txt("6", 22, 500, MUTED))
        return mock(W, H, sc, inner, bg=PAPER)
    if kind == "tabela":
        rows = "".join(f'<div style="display:grid;grid-template-columns:2fr 1fr 1fr;padding:22px 0;border-top:2px solid {LINE2};font-size:32px"><span>{a}</span><span class="tnum" style="text-align:right">{b}</span><span class="tnum" style="text-align:right">{c}</span></div>' for a, b, c in [("Wyszukiwarka", "128", "41"), ("Polecenia", "36", "22"), ("Mailing", "58", "17")])
        inner = abs_(M, M, txt("Zapytania i rozmowy w kwietniu", 72, 600, font="disp")) + abs_(M, 300, f'<div style="width:1300px"><div style="display:grid;grid-template-columns:2fr 1fr 1fr;padding-bottom:14px;font-size:24px;font-weight:600;color:{MUTED}"><span>Źródło</span><span style="text-align:right">Zapytania</span><span style="text-align:right">Rozmowy</span></div>{rows}</div>') + abs_(W - M - 56 * SR, H - M - 56, sym(h=56)) + abs_(M, H - M - 22, txt("7", 22, 500, MUTED))
        return mock(W, H, sc, inner, bg=PAPER)
    inner = abs_(M, 250, txt("Umów rozmowę", 190, 500, PAPER, "disp", 1.0, "letter-spacing:-0.022em")) + abs_(M, 520, txt(f"{T.STRONA}<br>{T.TELEFON}<br>{T.MAIL}", 40, 400, PAPER, extra="line-height:1.5")) + abs_(M, H - M - 300 * WR, word(ink=PAPER, w=300))
    return mock(W, H, sc, inner, bg=DEEP)

def post(kind, sc=0.25):
    W, H, M = 1080, 1350, 80
    num = lambda n: abs_(W - M - 120, H - M - 24, txt(n, 24, 500, MUTED, extra="width:120px;text-align:right"))
    if kind == "okladka":
        inner = abs_(M, M, tor(230, 9, [0, 1], 1, ink=PAPER, green=GREEN_L)) + abs_(M, 330, txt("Co się dzieje<br>z zapytaniami<br>z reklam", 124, 500, PAPER, "disp", 1.02, "letter-spacing:-0.022em")) + abs_(M, H - M - 190 * WR, word(ink=PAPER, w=190))
        return mock(W, H, sc, inner, bg=DEEP)
    if kind == "tresc":
        inner = abs_(M, M, txt("1. Nikt nie oddzwania tego samego dnia", 64, 600, font="disp", lh=1.08, extra="width:900px")) + abs_(M, 400, txt("Policz, ile zapytań z reklamy dostało odpowiedź w dniu wysłania, a ile dzień później albo wcale.", 36, extra="width:860px;line-height:1.45")) + num("2 / 6")
        return mock(W, H, sc, inner, bg=PAPER)
    if kind == "schemat":
        inner = abs_(M, M, txt("Droga zapytania", 64, 600, font="disp")) + abs_(M, 520, tor(920, 12, [0, .33, .66, 1], 2, labels=["Reklama", "Zapytanie", "Rozmowa", "Sprzedaż"], font=30)) + abs_(M, 760, txt("Najwięcej zapytań zostaje bez odpowiedzi między formularzem a pierwszą rozmową.", 36, extra="width:860px;line-height:1.45")) + num("4 / 6")
        return mock(W, H, sc, inner, bg=PAPER)
    inner = abs_(M, 360, txt("Umów<br>rozmowę", 150, 500, PAPER, "disp", 1.0, "letter-spacing:-0.022em")) + abs_(M, 730, txt(T.STRONA, 48, 500, PAPER)) + abs_(M, H - M - 190 * WR, word(ink=PAPER, w=190))
    return mock(W, H, sc, inner, bg=DEEP)

def build():
    opener("Zastosowania")

    # ------------------------------------------------------------ wizytówka
    mm = 6.2
    front = (f'<div style="position:relative;width:{90*mm:.0f}px;height:{50*mm:.0f}px;background:{WHITE};box-shadow:0 0 0 1.5px {LINE2};border-radius:4px">'
             + abs_(6 * mm, 6 * mm, word(w=30 * mm))
             + abs_(6 * mm, 28.5 * mm, txt("Stanisław Drożniak", 18.6, 600, lh=1.25) + txt(T.DOPISEK, 15.3, 400, lh=1.4) + txt(f"{T.TELEFON}<br>{T.MAIL}<br>{T.STRONA}", 15.3, 400, MUTED, lh=1.5, extra="margin-top:10px")) + '</div>')
    back = (f'<div style="position:relative;width:{90*mm:.0f}px;height:{50*mm:.0f}px;background:{DEEP};border-radius:4px;display:grid;place-items:center">{sym(ink=PAPER, h=15*mm)}</div>')
    page(split("Wizytówka",
        "Przód na papierze, z napisem i danymi. Tył w głębokiej zieleni, z samym znakiem. Napis i znak są na osobnych stronach, więc nie stoją obok siebie.",
        table(["", "Ustalenie"], [
            ["Format", "90 × 50 mm, spad 3 mm z każdej strony, margines bezpieczny 5 mm"],
            ["Przód", "Napis 30 mm szerokości, 6 mm od lewej i górnej krawędzi. Imię i nazwisko Schibsted 600, 8,5 pt. Dopisek i dane 400, 7 pt, dane w graficie"],
            ["Tył", "Pełne pole głębokiej zieleni, znak 15 mm wysokości, w środku optycznym"],
            ["Papier", "Powlekany matowy 350 g z folią matową albo aksamitną po obu stronach. Na niepowlekanym głęboka zieleń szarzeje"],
            ["Kolory", "CMYK według tabeli wartości. Kropka nad Ż jako Pantone 340 C, jeśli drukarnia przyjmie piąty kolor"],
            ["Uszlachetnienie", "Dopuszczalne: znak na tyle tłoczony albo lakier punktowy na kropce. Bez złoceń"],
            ["Plik", "drozniak-wizytowka-druk.pdf, dwie strony, 96 × 56 mm ze spadem"],
        ], cls="tb sm", widths=["21%", "79%"]),
        f'<div class="grid" style="gap:36px;justify-items:start">{front}{back}</div>', cls="w"), title="Wizytówka")

    # ------------------------------------------------------------ dokumenty
    a4 = lambda inner, bg=WHITE, sc=0.26: mock(1240, 1754, sc, inner, bg=bg)
    letter = (abs_(118, 118, word(w=190)) + abs_(1240 - 118 - 300, 124, txt("12 stycznia 2027", 22, 400, MUTED, extra="width:300px;text-align:right"))
              + abs_(118, 380, txt("Oferta współpracy", 64, 600, font="disp")) + abs_(118, 500, txt("Dzień dobry,", 26)) + abs_(118, 570, bars(7, 760, 12, 24))
              + abs_(118, 880, txt("Zakres pierwszego miesiąca", 34, 600, font="disp")) + abs_(118, 950, bars(5, 760, 12, 24))
              + abs_(118, 1754 - 118 - 20, txt(f"Stanisław Drożniak | {T.TELEFON} | {T.MAIL} | {T.STRONA}", 19, 400, MUTED)) + abs_(1240 - 118 - 60, 1754 - 118 - 20, txt("1", 19, 400, MUTED, extra="width:60px;text-align:right")))
    dl, _ = descriptor_lockup(ink=PAPER)
    cover = (abs_(118, 118, tor(250, 10, [0, 1], 1, ink=PAPER, green=GREEN_L)) + abs_(118, 520, txt("Oferta<br>współpracy", 150, 500, PAPER, "disp", 1.0, "letter-spacing:-0.022em"))
             + abs_(118, 900, txt("Przygotowana dla: nazwa firmy<br>12 stycznia 2027", 30, 400, DEEPM, lh=1.45)) + abs_(118, 1754 - 118 - 110, f'<div style="width:520px">{dl}</div>'))
    inv_rows = "".join(f'<div style="display:grid;grid-template-columns:3fr 1fr 1fr;padding:16px 0;border-top:2px solid {LINE2};font-size:22px"><span>{a}</span><span class="tnum" style="text-align:right">{b}</span><span class="tnum" style="text-align:right">{c}</span></div>' for a, b, c in [("Prowadzenie kampanii, styczeń 2027", "1", "4 500,00 zł"), ("Konfiguracja pomiaru", "1", "1 200,00 zł")])
    invoice = (abs_(118, 118, word(ink=INK, dot=INK, w=190)) + abs_(118, 300, txt("Faktura 01/2027", 48, 600, font="disp")) + abs_(118, 400, txt("Data wystawienia: 31.01.2027<br>Termin płatności: 14.02.2027", 22, 400, MUTED, lh=1.5))
               + abs_(118, 560, f'<div style="width:1004px"><div style="display:grid;grid-template-columns:3fr 1fr 1fr;padding-bottom:12px;font-size:19px;font-weight:600;color:{MUTED}"><span>Usługa</span><span style="text-align:right">Ilość</span><span style="text-align:right">Kwota netto</span></div>{inv_rows}<div style="display:flex;justify-content:flex-end;gap:60px;padding-top:26px;border-top:3px solid {INK};font-size:26px;font-weight:600"><span>Do zapłaty</span><span class="tnum">7 011,00 zł</span></div></div>'))
    page(split("Dokumenty",
        "Dokument ma napis w lewym górnym rogu, jedną kolumnę tekstu i stopkę z danymi. Okładka oferty jest zielona, kolejne strony papierowe.",
        notes([("Strona z treścią", "A4, margines 20 mm, tekst 10,5 pt z interlinią 15 pt w kolumnie do 120 mm. Napis 32 mm. Stopka 8 pt w graficie: dane kontaktowe i numer strony."),
               ("Okładka", "Głęboka zieleń, linia z kropką, tytuł Brygadą 500 w rozmiarze 48–60 pt, na dole napis z dopiskiem. W druku tylko na papierze powlekanym, nigdy na biurowej drukarce."),
               ("Faktura", "Logo w wersji czarnej, bo faktury drukuje się jednym kolorem. Tabela bez pionowych linii, kwoty cyframi tabelarycznymi, do prawej.")]),
        f'<div class="fig-row" style="gap:32px;align-items:flex-start">{figc(a4(cover, DEEP), "<b>Okładka oferty</b>")}{figc(a4(letter), "<b>Strona z treścią</b>")}{figc(a4(invoice), "<b>Faktura</b>")}</div>'), title="Dokumenty")

    # ------------------------------------------------------------ prezentacja
    lab = ["Tytułowy", "Treść ze schematem", "Liczba", "Zdjęcie", "Tabela", "Końcowy"]
    kinds = ["tytul", "tresc", "liczba", "zdjecie", "tabela", "koniec"]
    grid = "".join(figc(slide(k), f"<b>{l}</b>") for k, l in zip(kinds, lab))
    page(top("Prezentacja", "Slajd ma 1920 × 1080 px, margines 112 px i jedną myśl. Pierwszy i ostatni są zielone, pozostałe papierowe, ze znakiem w prawym dolnym rogu i numerem w lewym.",
        f'''<div class="grid g3" style="gap:26px 30px;justify-items:start">{grid}</div>''', cls="tight"), title="Prezentacja")

    # ------------------------------------------------------------ mail
    sig = (f'<div style="width:440px;background:{WHITE};border-radius:16px;box-shadow:inset 0 0 0 1.5px {LINE2};padding:34px 36px">'
           f'<p style="font-size:19px;line-height:1.5;color:{INK}">Dzień dobry,<br>przesyłam plan na luty. Proszę o uwagi do piątku.</p>'
           f'<p style="font-size:19px;margin-top:22px">Pozdrawiam</p>'
           f'<div style="margin-top:22px;padding-top:20px;border-top:1.5px solid {LINE}"><p style="font-size:19px;font-weight:700;font-family:Arial">Stanisław Drożniak</p><p style="font-size:16px;color:{MUTED};font-family:Arial">{T.DOPISEK}</p>'
           f'<div style="margin:16px 0 12px">{word(w=120)}</div><p style="font-size:16px;font-family:Arial">{T.TELEFON} | {T.STRONA}</p></div></div>')
    nl = (abs_(0, 0, f'<div style="width:600px;height:900px;background:{PAPER}"></div>') + abs_(32, 36, word(w=120)) + abs_(32, 110, txt("Ile zapytań dostało odpowiedź tego samego dnia", 34, 700, extra="font-family:Georgia,serif;line-height:1.15;width:520px"))
          + abs_(32, 250, txt("Cześć,<br>zanim zwiększysz budżet na reklamy, sprawdź jedną liczbę w swoim arkuszu zapytań.", 16, extra="font-family:Arial;line-height:1.55;width:520px")) + abs_(32, 370, bars(5, 520, 10, 16))
          + abs_(32, 520, f'<span style="display:inline-block;background:{INK};color:{PAPER};font-family:Arial;font-weight:700;font-size:16px;padding:15px 28px;border-radius:999px">Umów rozmowę</span>')
          + abs_(0, 640, f'<div style="width:600px;height:260px;background:{DEEP}"></div>') + abs_(32, 680, word(ink=PAPER, w=120)) + abs_(32, 740, txt(f"Stanisław Drożniak<br>{T.STRONA} | {T.MAIL}<br>Wypisz się z listy", 13, 400, DEEPM, extra="font-family:Arial;line-height:1.6")))
    page(split("Podpis maila i newsletter",
        "Poczta nie wczytuje krojów marki i potrafi odwracać kolory, więc mail projektujemy ostrożniej niż stronę. Marka zostaje w logo, kolorach i układzie.",
        table(["", "Ustalenie"], [
            ["Kroje", "Nagłówki Georgia pogrubiona, tekst Arial. Kroje marki zobaczy tylko Apple Mail"],
            ["Szerokość", "600 px, margines wewnętrzny 32 px, na telefonie 20 px"],
            ["Pismo", "Tekst 16 px z interlinią 1,55. Nagłówek 24–34 px. Stopka 13 px"],
            ["Logo", "Napis jako PNG 240 px, wyświetlany w szerokości 120 px. Zawsze z tłem w kolorze papieru, nigdy przezroczysty, bo tryb ciemny zrobi z niego czarny napis na czarnym tle"],
            ["Przycisk", "Atramentowy, wysokość co najmniej 44 px, tekst 16 px pogrubiony, bez kropki. Jeden na wiadomość"],
            ["Podpis", "Imię i nazwisko, dopisek, napis 120 px, telefon i adres strony. Bez cytatów, banerów, ikon serwisów i zdjęcia"],
            ["Waga", "Kod wiadomości do 100 KB, bo Gmail ucina dłuższe. Każdy obraz do 200 KB i z opisem alternatywnym"],
        ], cls="tb sm", widths=["17%", "83%"]),
        f'<div class="fig-row" style="gap:28px;align-items:flex-start">{figc(sig, "<b>Podpis</b> pod zwykłą wiadomością")}{figc(mock(600, 900, 0.62, nl), "<b>Newsletter</b> 600 px")}</div>', cls="w", fcls="top-a"), title="Podpis maila i newsletter")

    # ------------------------------------------------------------ profile
    dln, _ = descriptor_lockup(ink=PAPER)
    li = (abs_(0, 0, f'<div style="width:1584px;height:396px;background:{DEEP}"></div>') + abs_(620, 96, tor(240, 9, [0, 1], 1, ink=PAPER, green=GREEN_L)) + abs_(620, 168, f'<div style="width:640px">{dln}</div>')
          + f'<div style="position:absolute;left:40px;top:186px;width:300px;height:300px;border-radius:50%;border:4px dashed rgba(255,255,255,.5)"></div>' + abs_(72, 120, txt("tu serwis kładzie<br>zdjęcie profilowe", 22, 400, "rgba(255,255,255,.7)")))
    yt = (abs_(0, 0, f'<div style="width:2560px;height:1440px;background:{DEEP}"></div>') + f'<div style="position:absolute;left:507px;top:508px;width:1546px;height:423px;border:6px dashed {GREEN_L}"></div>'
          + abs_(560, 560, tor(300, 12, [0, 1], 1, ink=PAPER, green=GREEN_L)) + abs_(560, 650, f'<div style="width:820px">{dln}</div>') + abs_(520, 440, txt("pole widoczne na każdym urządzeniu: 1546 × 423 px", 34, 400, GREEN_L)))
    page(split("Profile w mediach społecznościowych",
        "Profil ma trzy elementy marki: awatar, baner i opis. Na profilu osobistym awatarem jest portret, na profilach marki znak na głębokiej zieleni.",
        table(["Serwis", "Awatar", "Baner", "Uwagi"], [
            ["LinkedIn, profil osobisty", "Portret, 800 × 800 px", "1584 × 396 px", "Lewy dół banera zasłania zdjęcie. Treść od 40% szerokości w prawo"],
            ["LinkedIn, strona firmowa", "Znak, 400 × 400 px", "1512 × 256 px", "Tylko linia z kropką i dopisek"],
            ["YouTube", "Znak albo portret, 800 × 800 px", "2560 × 1440 px", "Treść w środkowym polu 1546 × 423 px"],
            ["Instagram, Facebook, TikTok", "Znak, 1080 × 1080 px", "Facebook: 851 × 315 px", "Na Facebooku treść w środkowych 640 px"],
            ["Wizytówka Google", "Znak, 720 × 720 px", "Zdjęcie 4:3", "Prawdziwe zdjęcie, bez tekstu"],
        ], cls="tb xs", widths=["27%", "22%", "17%", "34%"]) + notes([("Opis i spójność", "Opis zaczyna się od zdania „Planuję i prowadzę wszystkie części marketingu firmy”. Ten sam awatar i baner we wszystkich serwisach.")]),
        f'<div class="grid" style="gap:30px">{figc(mock(1584, 396, 0.54, li), "<b>Baner LinkedIn</b> 1584 × 396 px")}{figc(mock(2560, 1440, 0.27, yt), "<b>Baner YouTube</b> 2560 × 1440 px")}</div>', cls="w"), title="Profile w mediach społecznościowych")

    # ------------------------------------------------------------ posty
    page(split("Posty i karuzele",
        "Grafika ma 1080 × 1350 px. Okładka i ostatni slajd są zielone, bo zieleń odróżnia markę od białych grafik obok. Środek jest papierowy.",
        notes([("Okładka", "Linia z kropką, nagłówek Brygadą 500 w rozmiarze 96–128 px, do ośmiu słów, napis w lewym dolnym rogu. Pojedynczy post ma układ okładki."),
               ("Slajdy z treścią", "Nagłówek 60–72 px, tekst co najmniej 30 px, najwyżej 40 słów, numer slajdu w prawym dolnym rogu. Bez logo."),
               ("Całość", "Od czterech do ośmiu slajdów. Na ostatnim jedno wezwanie do działania i adres strony.")]),
        f'<div class="fig-row" style="gap:26px">{figc(post("okladka"), "<b>Okładka</b>")}{figc(post("tresc"), "<b>Treść</b>")}{figc(post("schemat"), "<b>Schemat</b>")}{figc(post("koniec"), "<b>Ostatni slajd</b>")}</div>', cls="n"), title="Posty i karuzele")

    # ------------------------------------------------------------ relacje
    st = lambda inner, bg=DEEP: mock(1080, 1920, 0.2, inner, bg=bg)
    s1 = abs_(80, 300, tor(230, 9, [0, 1], 1, ink=PAPER, green=GREEN_L)) + abs_(80, 500, txt("Ile zapytań<br>dostało<br>odpowiedź<br>tego samego<br>dnia", 112, 500, PAPER, "disp", 1.04, "letter-spacing:-0.022em")) + abs_(80, 1250 - 220 * WR - 10, word(ink=PAPER, w=220))
    s2 = (abs_(0, 0, photo(PHOTO1, 1080, 1920, "50% 20%")) + abs_(0, 0, '<div style="width:1080px;height:1920px;background:rgba(0,0,0,.15)"></div>')
          + abs_(0, 1060, '<div style="width:1080px;display:flex;justify-content:center"><div style="background:rgba(22,21,17,.82);color:#fff;font-weight:600;font-size:64px;line-height:1.25;padding:18px 32px;border-radius:10px;text-align:center">policz zapytania<br>z zeszłego miesiąca</div></div>'))
    s3 = abs_(80, 520, txt("Umów<br>rozmowę", 150, 500, PAPER, "disp", 1.0, "letter-spacing:-0.022em")) + abs_(80, 900, txt(T.STRONA, 56, 500, PAPER)) + abs_(80, 1250 - 220 * WR - 10, word(ink=PAPER, w=220))
    zone = f'<div style="position:absolute;left:80px;top:270px;width:920px;height:980px;border:5px dashed {GREEN_L};opacity:.7"></div>'
    page(split("Relacje i rolki",
        "Format pionowy ma 1080 × 1920 px. Serwis zasłania górę i dół kadru, więc tekst, napisy i logo mieszczą się w polu bezpiecznym 920 × 980 px.",
        notes([("Plansza tekstowa", "Głęboka zieleń, nagłówek Brygadą 500 w rozmiarze 104–136 px, do ośmiu słów."),
               ("Film", "Twarz w górnej części pola bezpiecznego, napisy w dolnej. Pierwsze zdanie pada w pierwszej sekundzie, bez planszy na otwarcie."),
               ("Koniec", "Plansza z wezwaniem i adresem trwa co najmniej dwie sekundy."),
               ("Długość", "Rolka od 20 do 60 sekund i jedna myśl. Dłuższy temat dzielimy na części.")]),
        f'<div class="fig-row" style="gap:30px">{figc(st(s1 + zone), "<b>Plansza</b> z polem bezpiecznym")}{figc(st(s2, INK), "<b>Film</b> z napisami")}{figc(st(s3), "<b>Plansza końcowa</b>")}</div>', cls="n"), title="Relacje i rolki")

    # ------------------------------------------------------------ reklamy
    ad45 = abs_(100, 100, tor(280, 11, [0, 1], 1, ink=PAPER, green=GREEN_L)) + abs_(100, 370, txt("Reklama jest<br>uruchomiona, ale<br>nikt się nie odzywa?", 120, 500, PAPER, "disp", 1.04, "letter-spacing:-0.022em")) + abs_(100, 800, txt("Sprawdzę, co się dzieje<br>z zapytaniami<br>po kliknięciu.", 56, 400, PAPER, lh=1.35)) + abs_(100, 1800 - 100 - 260 * WR, word(ink=PAPER, w=260)) + abs_(800, 980, photo(PHOTO1, 640, 820, "50% 10%"))
    ad11 = abs_(0, 0, photo(PHOTO1, 1200, 1200, "50% 12%"))
    ad19 = abs_(0, 0, photo(PHOTO2, 1200, 628, "50% 20%"))
    page(split("Reklamy",
        "Reklama wygląda jak reszta marki: jedna myśl, spokojny układ, bez presji. W Meta tekst stoi na grafice, w Google grafika jest czystym zdjęciem, bo tekst dokłada system.",
        table(["Miejsce", "Format", "Co na grafice"], [
            ["Meta, aktualności", "1440 × 1800 px (4:5)", "Nagłówek do 10 słów, jedno zdanie, napis, portret albo schemat"],
            ["Meta, relacje i rolki", "1440 × 2560 px (9:16)", "To samo, w polu bezpiecznym: 14% od góry, 35% od dołu, 6% po bokach"],
            ["Google, obraz poziomy", "1200 × 628 px", "Zdjęcie bez tekstu i bez logo"],
            ["Google, obraz kwadratowy", "1200 × 1200 px", "Zdjęcie bez tekstu i bez logo"],
            ["Google, obraz pionowy", "960 × 1200 px", "Zdjęcie bez tekstu i bez logo"],
            ["Google, logo", "1200 × 1200 i 1200 × 300 px", "Znak na głębokiej zieleni oraz napis na papierze z polem ochronnym"],
        ], cls="tb xs", widths=["27%", "28%", "45%"]) + notes([("Treść", "Sytuacja klienta opisana wprost. Bez haseł, metafor, obietnicy wyniku i „tylko dziś”. Przycisk dodaje serwis, na grafice go nie rysujemy.")]),
        f'''<div class="fig-row" style="gap:30px;align-items:flex-start">{figc(mock(1440, 1800, 0.25, ad45, bg=DEEP), "<b>Meta 4:5</b> nagłówek, zdanie, portret")}
<div class="grid" style="gap:24px">{figc(mock(1200, 1200, 0.27, ad11), "<b>Google 1:1</b> samo zdjęcie")}{figc(mock(1200, 628, 0.27, ad19), "<b>Google 1,91:1</b> samo zdjęcie")}</div></div>''', cls="w"), title="Reklamy")

    # ------------------------------------------------------------ strona
    hero = (abs_(40, 28, word(w=132)) + abs_(1440 - 40 - 520, 28, f'<div style="width:520px;display:flex;gap:36px;justify-content:flex-end;align-items:center;font-size:17px"><span>Oferta</span><span>Szkolenia</span><span>O mnie</span><span class="btn" style="font-size:17px"><i></i>Umów rozmowę</span></div>')
            + abs_(40, 200, txt("Stanisław<br>Drożniak", 132, 500, font="disp", lh=0.98, extra="letter-spacing:-0.024em")) + abs_(40, 500, txt(T.DOPISEK, 28, 600, font="disp"))
            + abs_(40, 556, txt("Planuję i prowadzę wszystkie części marketingu firmy: reklamy, stronę, obsługę zapytań i automatyzacje.", 17, extra="width:520px;line-height:1.55")) + abs_(40, 660, '<span class="btn" style="font-size:17px"><i></i>Umów rozmowę</span>')
            + abs_(820, 120, photo(PHOTO1, 580, 700, "50% 14%", 16)))
    foot = abs_(0, 0, f'<div style="width:1440px;height:300px;background:{DEEP}"></div>') + abs_(40, 60, txt("Porozmawiajmy", 72, 500, PAPER, "disp")) + abs_(40, 180, '<span class="btn inv" style="font-size:17px"><i></i>Umów rozmowę</span>') + abs_(1440 - 40 - 330, 190, word(ink=PAPER, w=330))
    page(split("Strona i landing page",
        "Strona jest papierowa, z jedną zieloną płaszczyzną na końcu. Każdy ekran ma jeden nagłówek i jedno główne działanie.",
        notes([("Pierwszy ekran", "Napis 132 px i menu w nagłówku, wielki nagłówek, dopisek, jedno zdanie, jeden przycisk, portret. Nic więcej."),
               ("Sekcje", "Oddziela je odstęp 128–192 px i zmiana tła z papieru na kamień. Bez linii, cieni i ozdobnych przekładek. Stopka jest zielona."),
               ("Landing page", "Te same zasady i tokeny. Może nie mieć menu, ale ma ten sam nagłówek, przycisk i stopkę.")]),
        f'<div class="grid" style="gap:24px">{figc(mock(1440, 820, 0.66, hero), "<b>Pierwszy ekran</b> 1440 px")}{figc(mock(1440, 300, 0.66, foot), "<b>Stopka</b>")}</div>', cls="n"), title="Strona i landing page")

    # ------------------------------------------------------------ tokeny
    css1 = f""":root {{
  /* kolory, powierzchnia papierowa */
  --papier: {PAPER};
  --kamien: {STONE};
  --biel: {WHITE};
  --linia: {LINE};
  --linia-mocna: {LINE2};
  --atrament: {INK};
  --grafit: {MUTED};
  --kropka: {GREEN};

  /* kolory, powierzchnia zielona */
  --gleboka-zielen: {DEEP};
  --gleboka-zielen-2: {DEEP2};
  --tekst-na-zieleni: {PAPER};
  --pomocniczy-na-zieleni: {DEEPM};
  --kropka-na-zieleni: {GREEN_L};

  /* stany */
  --sukces: {T.STATES["Sukces"][0]};
  --uwaga: {T.STATES["Uwaga"][0]};
  --blad: {T.STATES["Błąd"][0]};
  --informacja: {T.STATES["Informacja"][0]};
}}"""
    css2 = f""":root {{
  /* pismo */
  --font-naglowki: "Brygada 1918", Georgia, serif;
  --font-tekst: "Schibsted Grotesk", Arial,
                sans-serif;
  --t-wielki: clamp(44px, 7.4vw, 112px);
  --t-naglowek: clamp(32px, 3.9vw, 56px);
  --t-podtytul: clamp(22px, 1.9vw, 28px);
  --t-tekst: 17px;
  --t-maly: 14px;

  /* odstępy i kształty */
  /* skala: 4 8 12 16 24 32 48 64 96 128 192 */
  --odstep: 8px;
  --promien-maly: 8px;
  --promien: 16px;
  --promien-pelny: 999px;
  --grubosc-linii: 1.5px;

  /* ruch */
  --ruch: {T.EASE};
  --ruch-ladowanie: linear(…);
  --czas-krotki: 200ms;
  --czas-wejscia: 500ms;
  --czas-ladowania: {T.LAND_MS}ms;
}}"""
    page(split("Tokeny dla programisty",
        "Wszystkie wartości z księgi mają nazwy w kodzie. Nowe style piszemy na tokenach, a nie na liczbach, żeby zmiana w księdze była jedną zmianą w kodzie.",
        notes([("Pliki", "docs/brand/tokens/drozniak-tokens.css i drozniak-tokens.json powstają z tego samego źródła co księga."),
               ("Nazwy", "Token nazywa rolę: --kropka, --grafit, --promien. Nie nazywa wyglądu, bo wygląd może się zmienić."),
               ("Na stronie", "Strona ma dziś tokeny o angielskich nazwach (--paper, --ink, --green, --deep). Wartości mają być takie same jak tutaj.")]),
        f'<div class="grid g2" style="gap:24px;align-items:start"><pre class="code sm">{esc(css1)}</pre><pre class="code sm">{esc(css2)}</pre></div>', cls="n"), title="Tokeny dla programisty")

    # ------------------------------------------------------------ duże formaty
    roll = (abs_(100, 150, tor(300, 14, [0, 1], 1, ink=PAPER, green=GREEN_L)) + abs_(100, 420, txt("Marketing i<br>pozyskiwanie<br>klientów<br>dla firm", 104, 500, PAPER, "disp", 1.06, "letter-spacing:-0.02em"))
            + abs_(100, 1180, word(ink=PAPER, w=420)) + abs_(100, 1400, txt(T.STRONA, 64, 500, PAPER)) + f'<div style="position:absolute;left:0;bottom:0;width:850px;height:200px;background:repeating-linear-gradient(-45deg,rgba(255,255,255,.08),rgba(255,255,255,.08) 14px,transparent 14px,transparent 28px)"></div>')
    stamp = (f'<div style="width:{47*5.2:.0f}px;height:{18*5.2:.0f}px;border:1.5px dashed {ASH};display:flex;flex-direction:column;justify-content:center;padding:0 14px">'
             f'<div style="width:112px">{word(ink=INK, dot=INK, style="width:100%;height:auto")}</div><p style="font-size:11.5px;line-height:1.3;margin-top:5px">Stanisław Drożniak<br>NIP i adres firmy</p></div>')
    page(split("Duże formaty i drobne druki",
        "Zasady są te same, zmienia się skala. Na dużym formacie liczy się odległość, z której ktoś czyta, a na drobnym druku najmniejsza kreska.",
        table(["Nośnik", "Ustalenie"], [
            ["Rollup 85 × 200 cm", "Głęboka zieleń, linia z kropką, nagłówek do sześciu słów na wysokości oczu, napis, adres. Dolne 20 cm puste, bo zasłania je kaseta"],
            ["Plakat i baner", "Pismo liczymy z odległości: na każdy metr wysokość wersalika 4 mm. Z 5 m nagłówek ma litery wysokości co najmniej 20 mm"],
            ["Pieczątka 47 × 18 mm", "Napis w wersji czarnej, pod nim dane tekstem 7 pt. Bez znaku i bez ramki"],
            ["Notes, teczka, torba", "Jedno logo na przedmiot, w wersji czarnej albo białej. Znak co najmniej 12 mm, napis 40 mm"],
            ["Haft i grawer", "Znak mały albo napis od 60 mm. Kropka w kolorze nici najbliższym Pantone 340 C"],
            ["Naklejka", "Koło 40 mm z głęboką zielenią i znakiem, jak awatar"],
        ], cls="tb sm", widths=["26%", "74%"]),
        f'<div class="fig-row" style="gap:56px;align-items:flex-end">{figc(mock(850, 2000, 0.36, roll, bg=DEEP), "<b>Rollup</b> 85 × 200 cm")}<div class="grid" style="gap:40px">{figc(stamp, "<b>Pieczątka</b> 47 × 18 mm")}{figc(avatar(180), "<b>Naklejka</b> 40 mm")}</div></div>', cls="w"), title="Duże formaty i drobne druki")

    # ============================================================ PLIKI
    opener("Pliki")
    tree = """docs/brand/
  BRAND.md                                           skrót zasad na jednej stronie
  brand-book/   drozniak-zasady-marki.pdf            ta księga
  logo/
    napis/      drozniak-napis-kolor.svg             oraz -negatyw, -czarny, -bialy
    znak/       drozniak-znak-kolor.svg              oraz -negatyw, -czarny, -bialy
                drozniak-znak-maly-kolor.svg         16–31 px i 5–10 mm
    png/        napis 800 i 2400 px, znak 1024 px    przezroczyste tło
    pdf/        wszystkie wersje wektorowo           dla drukarni
    ikony/      drozniak-awatar-1080.png             awatar marki
                drozniak-ikona-aplikacji-1024.png
    ikony/web/  favicon.svg, favicon.ico, apple-touch-icon.png,
                icon-192.png, icon-512.png, wersje maskowalne
  tokens/       drozniak-tokens.css, drozniak-tokens.json
  ruch/         animacja-znaku.html, animacja-znaku.json   animacja znaku
                przeskok-kropki.html                 kropka między punktami
  wizytowka/    drozniak-wizytowka-druk.pdf          96 × 56 mm ze spadem
  zrodla/       fonts/  tools/  README.md            kroje i skrypty"""
    page(split("Pliki i nazwy",
        "Wszystkie pliki marki leżą w repozytorium strony, w folderze docs/brand. Wzorcem są pliki SVG i skrypty, z których powstaje reszta.",
        notes([("Nazwa pliku", "drozniak, element, wersja, rozmiar: drozniak-napis-negatyw-2400.png. Małe litery, łączniki, bez polskich znaków i spacji."),
               ("Jedno źródło", "Geometria logo jest w zrodla/tools/master.py, a kolory i rozmiary w tokens.py. Zmiana tam przechodzi do logo, księgi, wizytówki i tokenów."),
               ("Kopie", "Nie trzymamy logo w folderach projektów. Każdy projekt bierze plik z folderu logo.")]),
        f'<div class="panel" style="place-items:center start;padding:44px 48px"><pre class="code sm" style="background:transparent;padding:0">{esc(tree)}</pre></div>', cls="n"), title="Pliki i nazwy")

    page(top("Wybór pliku", "Format pliku zależy od tego, gdzie logo trafi. Gdy ktoś prosi o „logo”, pytamy, do czego, i wysyłamy jeden właściwy plik.",
        table(["Do czego", "Plik", "Wersja"], [
            ["Strona internetowa, aplikacja", "SVG", "Kolor albo negatyw, według tła"],
            ["Prezentacja, Canva, Figma", "SVG, a gdy program go nie przyjmuje, PNG 2400 px", "Kolor albo negatyw"],
            ["Word, Google Docs, podpis maila", "PNG 800 px", "Kolor. W mailu z tłem w kolorze papieru"],
            ["Media społecznościowe, awatar", "drozniak-awatar-1080.png", "Znak na głębokiej zieleni"],
            ["Film, montaż", "PNG 2400 px z przezroczystym tłem albo SVG", "Biała na obrazie, negatyw na planszach"],
            ["Drukarnia", "PDF z folderu logo/pdf", "Według techniki: kolor, czarna albo biała"],
            ["Drukarnia prosi o AI albo EPS", "Ten sam PDF, otwiera się w Illustratorze", "Bez zmian"],
            ["Partner, organizator wydarzenia, prasa", "Napis w SVG i PNG 2400 px, kolor i negatyw, oraz ta strona księgi", "Nigdy sam znak"],
            ["Reklamy Google, logo", "Znak 1200 × 1200 px i napis 1200 × 300 px", "Znak na zieleni, napis na papierze"],
        ], widths=["30%", "40%", "30%"]), cls="tight"), title="Wybór pliku")

    checks = ["Czy logo pochodzi z pliku i ma wokół siebie pole ochronne?", "Czy na powierzchni jest jedno logo: napis albo znak?", "Czy tło to papier, kamień, biel albo głęboka zieleń?",
              "Czy zielona kropka jest jedna, okrągła i we właściwym odcieniu dla tła?", "Czy użyte są tylko Brygada 1918 i Schibsted Grotesk, w najwyżej trzech rozmiarach?", "Czy tekst ma kontrast co najmniej 4,5:1 i rozmiar nie mniejszy niż minimum formatu?",
              "Czy jedna rzecz wyraźnie dominuje, a margines ma co najmniej 7,5% krótszego boku?", "Czy wszystko zaczyna się na jednej lewej krawędzi?", "Czy jest jedno wezwanie do działania i brzmi „Umów rozmowę” albo nazywa to, co jest po kliknięciu?",
              "Czy tekst mówi wprost i w pierwszej osobie, bez haseł, wykrzykników, superlatywów i obietnic wyniku?", "Czy każda liczba ma jednostkę i źródło, a nazwy klientów ich zgodę?", "Czy cudzysłowy są polskie, a w tekście nie ma kropki środkowej ani pauz?",
              "Czy zdjęcia są prawdziwe, w naturalnych kolorach, a dane klientów zasłonięte?", "Czy w filmie są napisy, a tekst i znak stoją w polu bezpiecznym?"]
    half = lambda xs: '<ul class="checks">' + "".join(f"<li><span>{c}</span></li>" for c in xs) + "</ul>"
    page(top("Lista kontrolna przed publikacją", "Czternaście pytań do każdego materiału: grafiki, slajdu, strony, filmu, druku. Jedno „nie” oznacza poprawkę.",
        f'<div class="grid g2" style="gap:0 80px">{half(checks[:7])}{half(checks[7:])}</div>', cls="tight"), title="Lista kontrolna przed publikacją")

    cmp_sym = (f'<div style="display:flex;gap:26px;align-items:flex-end"><div class="figc" style="text-align:center"><div style="width:150px;height:150px;border-radius:16px;background:{T.DEEP_V1};display:grid;place-items:center">{sym(ink=PAPER, dot=GREEN, h=80, v1=True)}</div><p>1.0</p></div>'
               f'<div class="figc" style="text-align:center"><div style="width:150px;height:150px;border-radius:16px;background:{DEEP};display:grid;place-items:center">{sym(ink=PAPER, h=92)}</div><p>2.0</p></div></div>')
    page(split("Zmiany względem wersji 1.0",
        "Wersja 2.0 zachowuje napis, kroje, papier, atrament i zieleń sygnałową. Zmienia trzy rzeczy, każdą z konkretnego powodu.",
        notes([("Co doszło", "Głos i słownik, role kolorów, skale, kolory stanów i wykresów, druk, rozmiary pisma w formatach, siatki, schematy, portret, ruch, film, reklamy, mail, profile, tokeny, lista kontrolna."),
               ("Strona", "Strona jest przeniesiona na wersję 2.0: favikona i ikony, tokeny kolorów, kroje i animacja wejścia, w której kropka rysuje literę.")]),
        table(["Co", "Było", "Jest", "Dlaczego"], [
            ["Znak", "Bezszeryfowe D z kropką u dołu po prawej", "D z napisu z kropką nad literą", "Układ „D i zielona kropka obok” ma już znana firma doradcza, a podobny polska agencja. Kropka nad literą jest własna i pochodzi z napisu"],
            ["Głęboka zieleń", T.DEEP_V1, DEEP, "Poprzednia na ciemnym ekranie zlewała się z czernią. Nowa jest wyraźnie zielona, ma odcień zieleni sygnałowej i odpowiednik Pantone 3435 C"],
            ["Kropka na ciemnym tle", GREEN, GREEN_L, "Na zieleni i czerni poprzednia kropka słabo się odcinała w małych rozmiarach"],
            ["Adres strony", "drozniak.com", T.STRONA, "Strona działa pod adresem z końcówką .pl. Poczta zostaje w domenie .com"],
            ["Układy logo", "Brak", "Dopisek i logo partnera", "Potrzebne w ofertach, na banerach i przy wspólnych materiałach"],
        ], cls="tb sm", widths=["16%", "19%", "19%", "46%"]) + f'<div style="margin-top:36px">{cmp_sym}</div>', cls="n", fcls="top-a"), title="Zmiany względem wersji 1.0")

    page(split("Wersje i decyzje",
        "Księgę zmieniamy rzadko i każdą zmianę zapisujemy. Marka zyskuje na tym, że przez lata wygląda tak samo.",
        notes([("Kto decyduje", f"Stanisław Drożniak, {T.MAIL}. Pytania o wyjątki przychodzą z makietą tego, co ma powstać."),
               ("Przegląd", "Raz na pół roku sprawdzamy dziesięć ostatnich materiałów listą kontrolną i poprawiamy zasady, które okazały się niejasne.")]),
        table(["Zmiana", "Numer wersji", "Przykład"], [
            ["Logo, kolory podstawowe, kroje", "3.0, 4.0", "Tylko z ważnego powodu i najwyżej raz na kilka lat. Wymaga wymiany plików, strony i druków"],
            ["Nowa zasada albo nowe zastosowanie", "2.1, 2.2", "Dochodzi szablon podkastu albo zasady dla nowego serwisu"],
            ["Poprawka wartości albo błędu", "2.0.1", "Zmienia się wymiar banera w serwisie"],
        ], widths=["32%", "18%", "50%"]) + f'''<div class="grid g3" style="margin-top:48px;gap:40px">
<div class="note"><h3>Wersja 2.0</h3><p>{T.DATA}. Nowy znak, nowa głęboka zieleń, jasna kropka, pełne zasady głosu, druku, filmu i zastosowań.</p></div>
<div class="note"><h3>Wersja 1.0</h3><p>9 listopada 2026. Napis, pierwszy znak, paleta, kroje, podstawowe zasady.</p></div>
<div class="note"><h3>Zastrzeżenie</h3><p>Księga nie zastępuje badania znaku towarowego. Przed zgłoszeniem znaku do urzędu potrzebne jest sprawdzenie przez rzecznika patentowego.</p></div>
</div>''', cls="n", fcls="top-a"), title="Wersje i decyzje")
