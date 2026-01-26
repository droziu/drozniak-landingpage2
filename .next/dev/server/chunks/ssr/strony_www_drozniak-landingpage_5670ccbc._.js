module.exports = [
"[project]/strony_www/drozniak-landingpage/config/trainingModules.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Konfiguracja modułów i lekcji szkolenia
// Treści są placeholderami - będą dopracowane później
__turbopack_context__.s([
    "findLesson",
    ()=>findLesson,
    "findModule",
    ()=>findModule,
    "getNextLesson",
    ()=>getNextLesson,
    "getPreviousLesson",
    ()=>getPreviousLesson,
    "getTotalLessons",
    ()=>getTotalLessons,
    "trainingModules",
    ()=>trainingModules
]);
const trainingModules = [
    {
        id: '1',
        title: 'Podstawy marketingu online',
        icon: 'chart',
        lessons: [
            {
                id: '1.1',
                moduleId: '1',
                title: 'Wprowadzenie do marketingu cyfrowego',
                intro: `Marketing cyfrowy to wszystkie działania, które pomagają Twojej firmie zostać zauważoną, zbudować zaufanie i sprzedać swoje usługi z pomocą internetu.

Dla większości klientów pierwszy kontakt z firmą wygląda dziś tak:
• wpisują coś w Google,
• widzą stronę internetową, opinie, social media,
• dopiero później dzwonią, piszą lub rezerwują.

Jeśli nie ma Cię w tych miejscach – w praktyce nie istniejesz w świadomości dużej części rynku.`,
                whyImportant: `Marketing cyfrowy jest kluczowy, ponieważ:
• Klienci szukają w internecie – noclegu, restauracji, usług lokalnych, atrakcji.
• Porównują oferty – cena to tylko jeden element, równie ważne są opinie, zdjęcia, „wrażenie" online.
• Decyzję często podejmują jeszcze przed kontaktem z Tobą – na podstawie tego, co widzą w sieci.

Dobre podstawy marketingu online pozwalają:
• przyciągać więcej zapytań i rezerwacji bez zwiększania liczby godzin na telefonie,
• lepiej wykorzystywać sezon (i łagodzić „dziury" poza sezonem),
• bardziej świadomie decydować, w co warto inwestować, a co jest stratą czasu i pieniędzy.`,
                customerPath: `Jak wygląda ścieżka klienta w internecie (prosty schemat):

1. Zauważenie – ktoś widzi reklamę, post, opinię znajomego, wynik w Google.
2. Zainteresowanie – wchodzi na stronę, profil na Facebooku / Instagramie, czyta opinie.
3. Rozważanie – porównuje Twoją ofertę z innymi (cena, standard, opinie, dostępność).
4. Decyzja – dzwoni, pisze wiadomość, rezerwuje online.
5. Doświadczenie – korzysta z usługi (nocleg, jedzenie, zabieg, wyjazd).
6. Powrót / polecenie – zostawia opinię, wraca w kolejnym sezonie albo poleca znajomym.

Marketing online nie jest tylko „robieniem postów" – to świadome projektowanie tej ścieżki tak, żeby jak najwięcej osób dochodziło do kroku 4 i 6.`,
                keyElements: [
                    {
                        title: 'Strona internetowa (WWW)',
                        description: 'Twoja „siedziba" w internecie. To tutaj klient powinien:',
                        points: [
                            'zrozumieć, co oferujesz',
                            'zobaczyć zdjęcia i konkretne korzyści',
                            'łatwo znaleźć kontakt, cennik, sposób rezerwacji'
                        ],
                        icon: 'website'
                    },
                    {
                        title: 'Media społecznościowe (Facebook, Instagram)',
                        description: 'Miejsce do:',
                        points: [
                            'pokazywania „życia" firmy (aktualne zdjęcia, promocje, kulisy)',
                            'budowania zaufania (komentarze, reakcje, relacje)',
                            'prowadzenia płatnych kampanii do konkretnych odbiorców'
                        ],
                        icon: 'social'
                    },
                    {
                        title: 'Google (wizytówka + wyniki wyszukiwania)',
                        description: 'Kluczowe dla lokalnych biznesów:',
                        points: [
                            'wizytówka Google (opinie, zdjęcia, godziny otwarcia)',
                            'wyniki wyszukiwania typu „hotel + miejscowość", „pizzeria + miasto"'
                        ],
                        icon: 'google'
                    },
                    {
                        title: 'E-mail / newsletter',
                        description: 'Kanał do:',
                        points: [
                            'kontaktu z osobami, które już u Ciebie były',
                            'przypominania o ofercie (np. kolejny sezon, specjalne pakiety)',
                            'wysyłania ważnych informacji (potwierdzenia rezerwacji, instrukcje dojazdu)'
                        ],
                        icon: 'email'
                    },
                    {
                        title: 'Platformy zewnętrzne (Booking, Pyszne.pl, agregatory)',
                        description: 'Pomagają dotrzeć do ludzi, którzy Cię jeszcze nie znają, ale:',
                        points: [
                            'pobierają prowizje',
                            'budują też swoją markę, nie tylko Twoją'
                        ],
                        icon: 'platforms'
                    }
                ],
                practicalExamples: [
                    {
                        title: 'Przykład 1 – mały pensjonat w miejscowości turystycznej',
                        description: 'Pensjonat ma kilka pokoi, współpracuje z lokalnymi atrakcjami.\n\nJak może wykorzystać marketing cyfrowy:\n• aktualna strona WWW z prostym formularzem zapytań,\n• regularne posty na Facebooku pokazujące warunki pogodowe, widoki, dostępne terminy,\n• wizytówka Google z aktualnymi zdjęciami pokoi i prośbą o opinie od zadowolonych gości.',
                        effect: 'Efekt: więcej zapytań bez dodatkowych pośredników i lepsze obłożenie poza ścisłym sezonem.'
                    },
                    {
                        title: 'Przykład 2 – pizzeria z dostawą w średnim mieście',
                        description: 'Nowo otwarta pizzeria chce, żeby mieszkańcy w ogóle wiedzieli, że istnieje.\n\nMoże zrobić:\n• kampanię na Facebooku kierowaną tylko do osób mieszkających w okolicy (np. w promieniu 3–5 km),\n• krótkie filmy pokazujące przygotowanie pizzy, wnętrze lokalu, opinie pierwszych klientów,\n• prosty formularz lub numer do zamówień widoczny od razu po wejściu na stronę / profil.',
                        effect: 'Efekt: szybsze „wbicie się" w świadomość lokalną niż przez same ulotki.'
                    },
                    {
                        title: 'Przykład 3 – lokalny hotel / ośrodek',
                        description: 'Hotel żyje głównie z rezerwacji sezonowych, ale chciałby lepiej domknąć miejsca poza sezonem.\n\nMoże:\n• przygotować pakiety „weekendowe" i „ferie" opisane na stronie www,\n• kierować reklamy na Facebooku do rodzin z dziećmi z konkretnych regionów Polski,\n• wysyłać e-maile do osób, które były już kiedyś gośćmi, z propozycją powrotu w niższej cenie lub z dodatkowymi atrakcjami.',
                        effect: 'Efekt: bardziej równomierne obłożenie w ciągu roku, mniejsza zależność od jednego okresu.'
                    }
                ],
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Co jest głównym celem marketingu cyfrowego w małej firmie usługowej?',
                        options: [
                            'Tylko sprzedaż produktów i usług przez internet',
                            'Budowanie świadomości marki, zaufania i pozyskiwanie klientów z kanałów online',
                            'Zastąpienie całej obsługi klienta chatbotem',
                            'Wyłącznie reklamowanie się w social mediach'
                        ],
                        correctAnswer: 1,
                        feedback: 'Dokładnie tak – marketing cyfrowy to kompleksowe podejście, które obejmuje budowanie świadomości marki, relacji z klientami i prowadzenie działań promocyjnych w internecie.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Które stwierdzenie najlepiej opisuje rolę strony internetowej?',
                        options: [
                            'To tylko wizytówka – i tak wszyscy siedzą na Facebooku',
                            'To centrum, w którym klient może zrozumieć ofertę, zobaczyć zdjęcia i łatwo się z Tobą skontaktować',
                            'To miejsce, gdzie wrzuca się regulamin i nic więcej',
                            'Jest potrzebna tylko dużym firmom'
                        ],
                        correctAnswer: 1,
                        feedback: 'Dokładnie tak – strona internetowa to Twoja „siedziba" w internecie, gdzie klient powinien zrozumieć ofertę, zobaczyć zdjęcia i łatwo znaleźć kontakt.'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Dlaczego wizytówka Google jest ważna dla lokalnego biznesu?',
                        options: [
                            'Bo bez niej nie da się prowadzić kampanii na Facebooku',
                            'Bo pozwala klientom szybko sprawdzić opinie, zdjęcia, lokalizację i dane kontaktowe',
                            'Bo zastępuje stronę internetową w 100%',
                            'Bo dzięki niej nie trzeba prowadzić social mediów'
                        ],
                        correctAnswer: 1,
                        feedback: 'Dokładnie tak – wizytówka Google jest kluczowa dla lokalnych biznesów, bo pozwala klientom szybko sprawdzić wszystkie najważniejsze informacje w jednym miejscu.'
                    },
                    {
                        id: 'q4',
                        type: 'open',
                        question: 'Napisz jednym–dwoma zdaniami: Na jakim etapie ścieżki klienta (zauważenie → zainteresowanie → rozważanie → decyzja → doświadczenie → powrót/polecenie) Twoja firma najbardziej traci potencjalnych klientów – i dlaczego tak uważasz?',
                        keywords: [
                            'zauważenie',
                            'zainteresowanie',
                            'rozważanie',
                            'decyzja',
                            'doświadczenie',
                            'powrót',
                            'polecenie',
                            'traci',
                            'klientów',
                            'etap'
                        ],
                        hint: 'Pomyśl o momencie, w którym potencjalny klient rezygnuje z kontaktu z Twoją firmą...',
                        feedback: 'Dziękuję za odpowiedź. To pytanie pomoże nam lepiej zrozumieć, gdzie Twoja firma może poprawić swoją obecność online.'
                    }
                ]
            },
            {
                id: '1.2',
                moduleId: '1',
                title: 'Rola mediów społecznościowych w strategii marketingowej',
                intro: `Media społecznościowe (głównie Facebook i Instagram) to dziś jedno z najważniejszych miejsc kontaktu firmy z klientem.

To tam:
• ludzie szukają opinii,
• sprawdzają „czy to miejsce żyje",
• podejmują decyzję: „spróbuję – nie spróbuję".

Profil w social media to nie jest „dodatek". To element strategii – obok strony WWW, Google i innych kanałów.`,
                whyImportant: [
                    {
                        title: 'Budować zaufanie',
                        description: 'Realne zdjęcia, komentarze, reakcje klientów',
                        points: [],
                        icon: 'trust'
                    },
                    {
                        title: 'Przypominać o sobie',
                        description: 'Szczególnie w branżach sezonowych',
                        points: [],
                        icon: 'remind'
                    },
                    {
                        title: 'Informować szybko',
                        description: 'O promocjach, wolnych terminach, zmianach godzin otwarcia',
                        points: [],
                        icon: 'info-fast'
                    },
                    {
                        title: 'Pokazywać „życie firmy"',
                        description: 'Co dzieje się na co dzień, jak wygląda obsługa, atmosfera',
                        points: [],
                        icon: 'life'
                    },
                    {
                        title: 'Docierać precyzyjnie',
                        description: 'Dzięki reklamom do osób z konkretnej lokalizacji i o określonych zainteresowaniach',
                        points: [],
                        icon: 'target'
                    }
                ],
                whyImportantFooter: 'Bez tego klient często widzi tylko suchy wpis w Google albo ofertę na Booking / agregatorach. Social media pozwalają zbudować emocje i przekonanie: „tam warto pojechać / zamówić / skorzystać".',
                roleDescription: `Można je potraktować jak trzy funkcje:

1. Wizytówka + dowód, że firma działa
• aktualne zdjęcia (z tego sezonu, nie sprzed 5 lat),
• bieżące informacje (np. warunki na stokach, menu dnia, promocje),
• spójny opis oferty i danych kontaktowych.

2. Kanał komunikacji z klientami
• odpowiedzi na pytania w komentarzach i wiadomościach prywatnych,
• informowanie o ważnych zmianach (remont, nowe godziny, nowa usługa),
• reagowanie na opinie (pozytywne i negatywne – w sposób spokojny i merytoryczny).

3. Kanał sprzedaży i pozyskiwania zapytań
• posty kierujące do rezerwacji, zamówień, kontaktu,
• kampanie reklamowe (np. „rezerwuj ferie", „zamów z dostawą", „weekendowy pobyt LAST MINUTE"),
• zachęcanie do powrotu (oferty dla osób, które już były klientami).`,
                keyElements: [
                    {
                        title: 'Treści informacyjne',
                        description: 'Aktualne informacje o firmie:',
                        points: [
                            'aktualne godziny otwarcia, wolne terminy, nowe usługi',
                            'zmiany w ofercie (np. nowe dania, nowe pakiety, nowy sprzęt)'
                        ],
                        icon: 'info'
                    },
                    {
                        title: 'Treści pokazujące „kulisy"',
                        description: 'Autentyczne spojrzenie za kulisy:',
                        points: [
                            'przygotowanie pokoju, sali, sprzętu, jedzenia',
                            'fragmenty pracy zespołu (bez sztucznego „udawania")'
                        ],
                        icon: 'kulisy'
                    },
                    {
                        title: 'Treści sprzedażowe',
                        description: 'Konkretne promocje i zachęty:',
                        points: [
                            'konkretne promocje, pakiety, zachęty (z jasnym wezwaniem do działania: „zadzwoń", „napisz", „zarezerwuj")',
                            'grafiki z prostym komunikatem, a nie ścianą tekstu'
                        ],
                        icon: 'sales'
                    },
                    {
                        title: 'Treści budujące relacje',
                        description: 'Budowanie zaufania i zaangażowania:',
                        points: [
                            'opinie klientów (za zgodą)',
                            'zdjęcia „z życia" – np. zadowoleni goście, pełny lokal, dobra pogoda',
                            'proste pytania do odbiorców, zachęcające do reakcji'
                        ],
                        icon: 'relacje'
                    }
                ],
                practicalExamples: [
                    {
                        title: 'Przykład 1 – pensjonat / ośrodek w miejscowości turystycznej',
                        description: 'Zamiast publikować raz na kilka miesięcy, profil może być narzędziem do:\n• pokazywania aktualnych warunków (śnieg, widoki, atrakcje w okolicy),\n• informowania o wolnych terminach: „Zwolnił się pokój na weekend – kto pierwszy, ten lepszy",\n• pokazywania pakietów: nocleg + wyjazd na stok + termy.',
                        effect: 'Efekt: osoby planujące wyjazd widzą, że obiekt żyje, jest zadbany i ma realne atuty.'
                    },
                    {
                        title: 'Przykład 2 – pizzeria / restauracja',
                        description: 'Profil na Facebooku / Instagramie może:\n• pokazywać realne zdjęcia dań, a nie tylko „stockowe" grafiki,\n• komunikować promocje czasowe (np. „środa – druga pizza -30% przy odbiorze osobistym"),\n• zachęcać do opinii i recenzji, które później zwiększają zaufanie nowych klientów,\n• dzięki reklamom docierać do osób z najbliższej okolicy.',
                        effect: 'Efekt: więcej osób przypomina sobie o lokalu, gdy myśli: „zamówmy coś na kolację".'
                    },
                    {
                        title: 'Przykład 3 – hotel / obiekt noclegowy',
                        description: '• w sezonie: pokazywanie warunków na stokach, zadowolonych gości, aktualnych atrakcji,\n• poza sezonem: promowanie pobytów weekendowych, pakietów rodzinnych, ofert specjalnych (np. „Jesienny relaks + termy"),\n• stała obecność: krótkie relacje (Stories) z codziennych działań – śniadania, widok z okna, przygotowanie pokoi.',
                        effect: 'Efekt: klient, zanim wejdzie na stronę lub zadzwoni, już ma w głowie obraz miejsca – wie, czego się spodziewać.'
                    }
                ],
                additionalInfo: `Warto jasno:

Media społecznościowe nie zastąpią:
• kiepskiej obsługi,
• braku dostępności,
• chaosu w organizacji.

One wzmacniają to, co już jest. Jeśli jakość usługi jest dobra – pomagają to pokazać.

Jeśli jest słaba – bardzo szybko to ujawnią (opinie, komentarze, brak reakcji).`,
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Jaka jest najważniejsza rola mediów społecznościowych w małej firmie usługowej?',
                        options: [
                            'Publikowanie jak największej liczby postów dziennie',
                            'Budowanie relacji, zaufania i przypominanie o marce klientom z docelowej grupy',
                            'Zastąpienie strony internetowej',
                            'Służenie wyłącznie do ogłoszeń o zamknięciu lokalu'
                        ],
                        correctAnswer: 1,
                        hint: 'Pomyśl o głównym celu social mediów – czy chodzi o ilość, czy o jakość relacji z klientami?',
                        feedback: 'Dokładnie tak – media społecznościowe służą przede wszystkim budowaniu relacji i zaufania, a nie tylko publikowaniu treści.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Które z poniższych działań ma największy sens w kontekście social mediów dla lokalnego biznesu?',
                        options: [
                            'Kupowanie „lajków" z całego świata',
                            'Kierowanie reklam do osób mieszkających w promieniu kilku kilometrów od firmy',
                            'Publikowanie wyłącznie memów niezwiązanych z działalnością',
                            'Publikowanie raz w roku informacji o istnieniu firmy'
                        ],
                        correctAnswer: 1,
                        hint: 'Dla lokalnego biznesu najważniejsze jest dotarcie do osób, które mogą rzeczywiście skorzystać z usługi...',
                        feedback: 'Zgadza się – dla lokalnego biznesu kluczowe jest precyzyjne docieranie do osób z najbliższej okolicy, które mogą rzeczywiście skorzystać z oferty.'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Jakiego typu treści nie powinien dominować na profilu firmy?',
                        options: [
                            'Zdjęcia z życia firmy, krótkie relacje z codziennej pracy',
                            'Opinie zadowolonych klientów (za ich zgodą)',
                            'Wyłącznie grafiki z tekstem „PROMOCJA!!!" bez kontekstu i bez informacji, co dokładnie oferujesz',
                            'Informacje o nowych usługach w spokojnej, konkretnej formie'
                        ],
                        correctAnswer: 2,
                        hint: 'Pomyśl o tym, co buduje zaufanie – czy agresywne promocje bez kontekstu, czy autentyczne treści?',
                        feedback: 'Dokładnie – agresywne promocje bez kontekstu nie budują zaufania. Lepiej pokazywać autentyczne treści i konkretne informacje.'
                    },
                    {
                        id: 'q4',
                        type: 'open',
                        question: 'Na jakiej platformie Twoi klienci są najbardziej aktywni (Facebook / Instagram / inne)?',
                        keywords: [
                            'facebook',
                            'instagram',
                            'platforma',
                            'klienci',
                            'aktywni',
                            'social',
                            'media'
                        ],
                        hint: 'Pomyśl o tym, gdzie Twoi klienci spędzają najwięcej czasu online...',
                        feedback: 'Dziękuję za odpowiedź. To pomoże lepiej zrozumieć, na której platformie warto skupić najwięcej uwagi.'
                    },
                    {
                        id: 'q5',
                        type: 'open',
                        question: 'Jakiego typu post zobaczyłby Twój idealny klient i pomyślał: „To jest coś dla mnie"?',
                        keywords: [
                            'post',
                            'klient',
                            'idealny',
                            'typ',
                            'treść',
                            'zainteresowanie',
                            'reakcja'
                        ],
                        hint: 'Pomyśl o treści, która naprawdę przyciągnęłaby uwagę Twojego idealnego klienta...',
                        feedback: 'Dziękuję za odpowiedź. To pomoże lepiej zrozumieć, jakiego typu treści warto publikować, aby dotrzeć do idealnych klientów.'
                    }
                ]
            },
            {
                id: '1.3',
                moduleId: '1',
                title: 'Narzędzia i platformy marketingowe',
                intro: `Marketing online to nie tylko „bycie w internecie", ale korzystanie z konkretnych narzędzi, które pomagają:

• dotrzeć do właściwych osób,
• pokazać im ofertę,
• zmierzyć efekty działań,
• wyciągać wnioski na przyszłość.

Bez narzędzi działasz „na wyczucie". Z narzędziami – widzisz liczby i możesz podejmować decyzje na podstawie danych.`,
                whyImportant: [
                    {
                        title: 'Lepiej rozumieć, co działa',
                        description: 'Które działania marketingowe się opłacają',
                        points: [],
                        icon: 'understand'
                    },
                    {
                        title: 'Oszczędzać czas',
                        description: 'Zamiast robić wszystko ręcznie',
                        points: [],
                        icon: 'time'
                    },
                    {
                        title: 'Podejmować decyzje na danych',
                        description: 'A nie tylko intuicji',
                        points: [],
                        icon: 'data'
                    },
                    {
                        title: 'Uporządkować pracę',
                        description: 'Mieć w jednym miejscu informacje o klientach, wynikach kampanii, treściach',
                        points: [],
                        icon: 'organize'
                    }
                ],
                whyImportantFooter: 'Nie chodzi o to, żeby znać 50 programów. W małej firmie często wystarczy kilka dobrze dobranych narzędzi, używanych konsekwentnie.',
                keyElements: [
                    {
                        title: 'Narzędzia „widoczności"',
                        description: 'Żeby klienci w ogóle Cię znaleźli:',
                        points: [
                            'Strona internetowa (np. WordPress) – Twoja baza, miejsce gdzie możesz opisać ofertę, pokazać zdjęcia, dodać formularz kontaktowy',
                            'Profil firmy w Google (Google Business Profile) – wizytówka w Google: adres, godziny otwarcia, opinie, zdjęcia',
                            'Profile w social media (Facebook, Instagram) – miejsce budowania relacji, pokazywania codzienności firmy, komunikowania promocji'
                        ],
                        icon: 'visibility'
                    },
                    {
                        title: 'Narzędzia „ruchu i kampanii"',
                        description: 'Żeby ściągnąć ludzi do firmy:',
                        points: [
                            'Facebook Ads Manager / Meta Business Suite – panel do ustawiania reklam na Facebooku i Instagramie z zasięgiem lokalnym i konkretnymi celami',
                            'Google Ads – reklamy w wynikach wyszukiwania, przydatne tam, gdzie klienci wpisują konkretne frazy (np. „hotel przy stoku", „pizza na dowóz")'
                        ],
                        icon: 'campaigns'
                    },
                    {
                        title: 'Narzędzia „analityki i danych"',
                        description: 'Żeby widzieć, co się dzieje:',
                        points: [
                            'Google Analytics (GA4) – pozwala śledzić ile osób odwiedza stronę, z jakich źródeł, które podstrony są najczęściej oglądane',
                            'Proste arkusze (np. Google Sheets / Excel) – do zapisywania dat kampanii, stawek i budżetów, liczby zamówień / rezerwacji w danym okresie'
                        ],
                        icon: 'analytics'
                    },
                    {
                        title: 'Narzędzia „relacji z klientem"',
                        description: 'Żeby nie tracić kontaktu:',
                        points: [
                            'Narzędzia e-mail marketingu (np. MailerLite, Mailchimp) – umożliwiają wysyłanie newsletterów i tworzenie prostych automatyzacji',
                            'CRM lub prosta baza kontaktów – lista klientów w arkuszu z oznaczeniami (stały klient, grupa, jednorazowy)'
                        ],
                        icon: 'relationships'
                    },
                    {
                        title: 'Narzędzia „tworzenia treści"',
                        description: 'Żeby materiały wyglądały dobrze:',
                        points: [
                            'Canva – do tworzenia prostych grafik do social mediów, banerów na stronę, prostych plakatów / ulotek',
                            'Proste aplikacje do obróbki zdjęć w telefonie – lekka korekta światła, przycięcie, dopasowanie formatu do Instagrama / Facebooka'
                        ],
                        icon: 'content'
                    }
                ],
                practicalExamples: [
                    {
                        title: 'Przykład – mały hotel / pensjonat w miejscowości turystycznej',
                        description: `1. Widoczność
• Strona WWW na WordPressie: opis pokoi, zdjęcia, formularz zapytań.
• Profil Google (Google Business Profile): aktualne godziny, telefony, mapka dojazdu, opinie.

2. Ruch
• Kampania na Facebooku/Instagramie: reklama z pakietem „ferie zimowe" kierowana do rodzin z większych miast.

3. Analityka
• Google Analytics mierzy, ilu użytkowników z reklamy weszło na stronę i wysłało zapytanie.

4. Relacje
• Po sezonie – wysłanie newslettera do gości, którzy już byli: „oferta na jesienny weekend w górach".

5. Treści
• Zdjęcia aktualnych warunków, krótkie filmy z okolicy, grafiki z Canvy z prostymi komunikatami („ostatnie wolne miejsca", „pakiet rodzinny").`,
                        effect: 'Dzięki takiemu połączeniu właściciel wie, skąd się biorą rezerwacje, widzi które działania działają lepiej i może stopniowo rezygnować z mało skutecznych kanałów na rzecz tych, które dają mierzalny efekt.'
                    }
                ],
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Które narzędzie jest podstawowym wyborem do analizy ruchu na stronie internetowej?',
                        options: [
                            'Google Analytics',
                            'Facebook Ads Manager',
                            'Instagram Stories',
                            'Messenger'
                        ],
                        correctAnswer: 0,
                        hint: 'Pomyśl o narzędziu, które pokazuje szczegółowe statystyki dotyczące odwiedzin strony...',
                        feedback: 'Dokładnie tak – Google Analytics to podstawowe narzędzie do analizy ruchu na stronie internetowej.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Jaką rolę pełni Facebook Ads Manager / Meta Business Suite?',
                        options: [
                            'Jest narzędziem do wysyłania newsletterów',
                            'Zastępuje stronę internetową',
                            'Umożliwia ustawianie i monitorowanie kampanii reklamowych na Facebooku i Instagramie',
                            'Służy tylko do odpowiadania na wiadomości klientów'
                        ],
                        correctAnswer: 2,
                        hint: 'Pomyśl o narzędziu do zarządzania reklamami w social media...',
                        feedback: 'Zgadza się – Facebook Ads Manager / Meta Business Suite umożliwia ustawianie i monitorowanie kampanii reklamowych na Facebooku i Instagramie.'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Do czego w małej firmie najbardziej przydaje się prosty arkusz (np. Google Sheets) w marketingu?',
                        options: [
                            'Do edytowania zdjęć',
                            'Do pisania wpisów na Facebooka',
                            'Do zastąpienia strony internetowej',
                            'Do śledzenia podstawowych danych: dat kampanii, budżetów, liczby zapytań / zamówień'
                        ],
                        correctAnswer: 3,
                        hint: 'Pomyśl o narzędziu, które pomaga organizować i śledzić dane...',
                        feedback: 'Dokładnie – prosty arkusz jest przydatny do śledzenia podstawowych danych marketingowych, takich jak daty kampanii, budżety i liczba zapytań.'
                    },
                    {
                        id: 'q4',
                        type: 'open',
                        question: 'Jakie narzędzia marketingowe już teraz wykorzystujesz w swojej firmie (chociażby w podstawowej formie)?',
                        keywords: [
                            'narzędzia',
                            'marketingowe',
                            'wykorzystujesz',
                            'firma',
                            'podstawowa',
                            'forma',
                            'google',
                            'facebook',
                            'instagram',
                            'strona',
                            'www'
                        ],
                        hint: 'Pomyśl o wszystkich narzędziach online, z których korzystasz w swojej firmie...',
                        feedback: 'Dziękuję za odpowiedź. To pomoże lepiej zrozumieć, jakie narzędzia już masz i które warto rozwinąć.'
                    },
                    {
                        id: 'q5',
                        type: 'open',
                        question: 'Które jedno narzędzie – jeśli nauczyłbyś się korzystać z niego lepiej – dałoby Twoim zdaniem największy efekt w najbliższych 3 miesiącach?',
                        keywords: [
                            'narzędzie',
                            'nauczyłbyś',
                            'korzystać',
                            'lepiej',
                            'największy',
                            'efekt',
                            'miesiące',
                            '3',
                            'trzy'
                        ],
                        hint: 'Pomyśl o narzędziu, które mogłoby przynieść najszybsze i najbardziej widoczne rezultaty...',
                        feedback: 'Dziękuję za odpowiedź. To pomoże lepiej zrozumieć, na którym narzędziu warto się skupić w pierwszej kolejności.'
                    }
                ]
            }
        ]
    },
    {
        id: '2',
        title: 'Content marketing i storytelling',
        icon: 'pen',
        lessons: [
            {
                id: '2.1',
                moduleId: '2',
                title: 'Tworzenie angażujących treści',
                intro: `Angażujące treści to fundament skutecznego marketingu online.

To one zatrzymują uwagę, budują zaufanie i sprawiają, że odbiorca realnie rozważa skorzystanie z oferty – zamiast tylko „przelecieć wzrokiem" po komunikacie.

W praktyce: dobra treść to taka, która jest przydatna, konkretna i napisana językiem człowieka, a nie urzędowym sloganem.`,
                whyImportant: `Dla małego hotelu, pensjonatu czy firmy usługowej:

• klienci porównują oferty głównie online,
• często widzą kilka bardzo podobnych miejsc / usług,
• decyzja zapada na podstawie:
  – zdjęć,
  – opisów,
  – tego, czy komunikat „brzmi po ludzku" i budzi zaufanie.

Jeśli treści są ogólne, suche i podobne do wszystkich innych – firma znika w tłumie.

Jeśli są konkretne, zrozumiałe i pokazują realne korzyści – klient łatwiej wybiera właśnie Ciebie.`,
                keyElements: [
                    {
                        title: 'Konkretny odbiorca',
                        description: 'Piszemy „do kogoś", a nie „do wszystkich"',
                        points: [
                            'Inaczej komunikujemy się z rodziną z dziećmi, inaczej z osobą w delegacji'
                        ],
                        icon: 'audience'
                    },
                    {
                        title: 'Jasny cel komunikatu',
                        description: 'Czy chcemy, żeby ktoś:',
                        points: [
                            'zarezerwował nocleg?',
                            'zapytał o wycenę?',
                            'zapisał się na newsletter?'
                        ],
                        icon: 'goal'
                    },
                    {
                        title: 'Korzyści, nie tylko cechy',
                        description: 'Zamiast: „pokoje z łazienką",',
                        points: [
                            'lepiej: „każdy pokój z prywatną łazienką – bez kolejek i bez dzielenia się z innymi gośćmi"'
                        ],
                        icon: 'benefits'
                    },
                    {
                        title: 'Prosty język',
                        description: 'Krótkie zdania, bez żargonu',
                        points: [
                            'Im łatwiej się to czyta, tym większa szansa, że ktoś dotrwa do końca'
                        ],
                        icon: 'language'
                    },
                    {
                        title: 'Wezwanie do działania (CTA)',
                        description: 'Konkretne działanie dla odbiorcy',
                        points: [
                            'np. „Zadzwoń", „Napisz wiadomość", „Sprawdź dostępne terminy na przyszły weekend"'
                        ],
                        icon: 'cta'
                    }
                ],
                practicalExamples: [
                    {
                        title: 'Przykład 1 – hotel / pensjonat',
                        description: `Zamiast ogólnego komunikatu:

„Zapraszamy do naszego hotelu, mamy wolne pokoje."

lepsza treść:

„Służbowo w Rzeszowie i szukasz spokojnego noclegu blisko centrum?

Nocleg ze śniadaniem od 260 zł za dobę.

Parking i szybkie Wi-Fi w cenie.

Napisz w wiadomości „REZERWACJA", wyślę dostępne terminy na najbliższy tydzień."`,
                        effect: 'Różnica: wiadomo dla kogo jest oferta (osoba w delegacji), są konkretne korzyści (śniadanie, parking, Wi-Fi), jest konkretne działanie („napisz w wiadomości…").'
                    },
                    {
                        title: 'Przykład 2 – lokalna restauracja',
                        description: `Zamiast:

„Zapraszamy na pizzę, mamy najlepszą w mieście."

lepiej:

„Masz ochotę na coś ciepłego po pracy?

Od poniedziałku do czwartku druga pizza -50% na wynos od 17:00 do 20:00.

Zamów telefonicznie lub przez Messenger – zwykle wyrabiamy się w 25–30 minut."`,
                        effect: 'Tu klient dostaje: konkretną porę, konkretną promocję, informację jak zamówić.'
                    },
                    {
                        title: 'Przykład 3 – gabinet fizjoterapii',
                        description: `Zamiast:

„Oferujemy profesjonalne zabiegi fizjoterapeutyczne."

lepiej:

„Boli Cię kręgosłup po całym dniu przy biurku?

Podczas pierwszej wizyty (60 minut) sprawdzimy przyczynę bólu i pokażę Ci 3 proste ćwiczenia, które możesz robić w domu.

Zapisz się przez formularz – zwykle mamy wolne terminy w ciągu 3–4 dni."`,
                        effect: 'Znów: konkret, problem → rozwiązanie → działanie.'
                    }
                ],
                roleDescription: `Praktyczne wskazówki – jak pisać własne treści:

1. Zacznij od jednej osoby w głowie
Wyobraź sobie konkretnego gościa / klienta:
– „rodzina z dwójką dzieci przyjeżdżająca na weekend",
– „para w delegacji na targi",
– „mieszkaniec miasta szukający miejsca na obiad w niedzielę".

2. Odpowiedz na trzy pytania:
• Z jakim problemem / potrzebą przychodzi?
• Co mu konkretnie oferujesz?
• Co ma zrobić teraz, jeśli go to interesuje?

3. Uprość tekst o 20–30%
Zawsze warto przejrzeć tekst drugi raz i usunąć:
• zbędne przymiotniki („najwyższej jakości", „fantastyczny", „wyjątkowy"),
• powtórzenia,
• zbyt długie zdania.

4. Dodaj element „tu i teraz"
Np.:
– „w najbliższy weekend",
– „w listopadzie",
– „tylko przy rezerwacji przez wiadomość prywatną".`,
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Który z poniższych elementów NAJBARDZIEJ pomaga zwiększyć zaangażowanie odbiorcy?',
                        options: [
                            'Używanie jak największej liczby przymiotników („wyjątkowy", „najlepszy", „fantastyczny")',
                            'Zastosowanie prostego języka, konkretów i jasnego wezwania do działania',
                            'Pisanie bardzo długich opisów, aby przekazać jak najwięcej informacji',
                            'Skupienie się wyłącznie na historii firmy'
                        ],
                        correctAnswer: 1,
                        hint: 'Pomyśl o tym, co sprawia, że treść jest łatwa do zrozumienia i zachęca do działania...',
                        feedback: 'Dokładnie tak – prosty język, konkretne informacje i jasne wezwanie do działania to klucz do angażujących treści.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Który opis lepiej spełnia zasady tworzenia angażującej treści dla hotelu?',
                        options: [
                            '„Zapraszamy do naszego hotelu. Mamy pokoje, śniadania i miłą obsługę."',
                            '„Szukasz spokojnego noclegu blisko centrum miasta? Oferujemy pokoje ze śniadaniem od 260 zł, parking i szybkie Wi-Fi. Napisz wiadomość, sprawdzimy dostępne terminy w wybranym przez Ciebie terminie."',
                            '„Nasz hotel działa od 1998 roku i obsłużył już tysiące zadowolonych gości."',
                            '„Jesteśmy najlepszym hotelem w mieście, gwarantujemy pełną satysfakcję."'
                        ],
                        correctAnswer: 1,
                        hint: 'Pomyśl o treści, która jest konkretna, skierowana do konkretnej osoby i ma jasne wezwanie do działania...',
                        feedback: 'Zgadza się – ten opis jest konkretny, skierowany do konkretnej osoby (szukającej noclegu), zawiera konkretne korzyści i ma jasne wezwanie do działania.'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Co jest pierwszym krokiem przy tworzeniu angażującej treści?',
                        options: [
                            'Dodanie jak największej liczby promocji i rabatów',
                            'Skopiowanie treści z innej firmy i lekkie jej przeredagowanie',
                            'Określenie, do kogo konkretnie kierujemy komunikat i jaki ma mieć cel',
                            'Rozpisanie jak najdłuższej historii o firmie'
                        ],
                        correctAnswer: 2,
                        hint: 'Pomyśl o pierwszym kroku – zanim zaczniesz pisać, musisz wiedzieć...',
                        feedback: 'Dokładnie – pierwszym krokiem jest określenie, do kogo konkretnie kierujemy komunikat i jaki ma być jego cel. Bez tego nie można stworzyć skutecznej treści.'
                    },
                    {
                        id: 'q4',
                        type: 'open',
                        question: 'Masz pensjonat w miejscowości turystycznej. Dotychczasowy komunikat na Facebooku brzmi: „Zapraszamy do naszego pensjonatu, mamy ładne pokoje i smaczne śniadania."\n\nPrzeredaguj ten tekst tak, aby był:\n• skierowany do konkretnej grupy (np. rodziny, pary, osoby w delegacji),\n• bardziej konkretny,\n• zakończony jasnym wezwaniem do działania.\n\nNapisz swoją propozycję w 3–4 zdaniach.',
                        keywords: [
                            'pensjonat',
                            'pokoje',
                            'śniadania',
                            'rodzina',
                            'para',
                            'delegacja',
                            'zadzwoń',
                            'napisz',
                            'zarezerwuj',
                            'sprawdź',
                            'terminy'
                        ],
                        hint: 'Pomyśl o konkretnej grupie docelowej, konkretnych korzyściach i jasnym wezwaniu do działania...',
                        feedback: 'Dziękuję za odpowiedź. To ćwiczenie pomoże Ci lepiej zrozumieć, jak tworzyć angażujące treści skierowane do konkretnych odbiorców.'
                    }
                ]
            },
            {
                id: '2.2',
                moduleId: '2',
                title: 'Techniki storytellingu',
                intro: `Storytelling to świadome wykorzystywanie historii w komunikacji marketingowej.

Zamiast pisać: „mamy pokoje, śniadania i dobrą lokalizację", opowiadasz krótką scenę z perspektywy gościa – taką, którą odbiorca łatwo sobie wyobraża.

Historie są zapamiętywane znacznie lepiej niż suche listy cech.

Dlatego dobrze skonstruowana opowieść może zrobić dla Twojej marki więcej niż kolejna „profesjonalna" formułka.`,
                whyImportant: [
                    {
                        title: 'Zamienia ofertę w doświadczenie',
                        description: 'Klient widzi siebie w tej historii',
                        points: [],
                        icon: 'experience'
                    },
                    {
                        title: 'Buduje zaufanie',
                        description: 'Pokazuje ludzi, sytuacje, kulisy, a nie tylko „ładne hasła"',
                        points: [],
                        icon: 'trust-story'
                    },
                    {
                        title: 'Ułatwia decyzję',
                        description: 'Klient myśli: „to dokładnie moja sytuacja"',
                        points: [],
                        icon: 'decision'
                    }
                ],
                whyImportantFooter: `Zamiast mówić:

„Oferujemy komfortowe noclegi dla rodzin."

możesz pokazać scenę:

„W piątkowy wieczór rodzina z dwójką dzieci przyjeżdża zmęczona po 5 godzinach jazdy. Dzieci od razu wskakują do przygotowanego pokoju z dwoma osobnymi łóżkami, a rodzice siadają przy gorącej herbacie w saloniku dla gości. Następnego dnia czeka na nich śniadanie od 8:00 – bez konieczności wychodzenia z budynku."

To dalej ta sama usługa – ale zupełnie inny poziom odczuwania.`,
                keyElements: [
                    {
                        title: 'Bohater',
                        description: 'Ktoś konkretny: gość, klient, właściciel, pracownik',
                        points: [],
                        icon: 'hero'
                    },
                    {
                        title: 'Punkt wyjścia',
                        description: 'Sytuacja początkowa, problem albo potrzeba',
                        points: [
                            'np. „zmęczony po całym dniu w trasie", „szuka spokojnego miejsca do pracy"'
                        ],
                        icon: 'starting-point'
                    },
                    {
                        title: 'Konflikt / wyzwanie',
                        description: 'Co jest trudne, męczące, irytujące dla bohatera',
                        points: [
                            'np. hałaśliwy hotel, brak parkingu, brak śniadania o wczesnej porze'
                        ],
                        icon: 'challenge'
                    },
                    {
                        title: 'Rozwiązanie',
                        description: 'Miejsce, usługa, sposób działania firmy, który usuwa problem',
                        points: [],
                        icon: 'solution-story'
                    },
                    {
                        title: 'Rezultat',
                        description: 'Co się zmieniło po skorzystaniu z usługi',
                        points: [
                            'np. wyspany gość, który zdążył na ważne spotkanie; rodzina, która miała spokojny wyjazd'
                        ],
                        icon: 'result'
                    },
                    {
                        title: 'Puenta / wezwanie do działania',
                        description: 'Konkret: „Zarezerwuj termin", „Napisz wiadomość, sprawdzimy dostępność"',
                        points: [],
                        icon: 'cta-story'
                    }
                ],
                practicalExamples: [
                    {
                        title: 'Przykład 1 – pensjonat w miejscowości turystycznej',
                        description: `Suchy komunikat:

„U nas dobrze czują się rodziny z dziećmi."

Wersja storytellingowa:

„W zeszły weekend przyjechała do nas rodzina z dwójką dzieci, po raz pierwszy w tej okolicy.

W sobotę rano dzieci nie chciały wychodzić z jadalni – uznały, że naleśniki z domową konfiturą to „najlepsze śniadanie na wyjeździe".

Rodzice śmiali się, że wreszcie mają chwilę spokoju przy kawie, a nie gonitwę za maluchami.

W niedzielę przy śniadaniu zarezerwowali już kolejny termin – tym razem na dłuższy pobyt."`,
                        effect: 'Co tu działa: konkretny bohater (rodzina), konkretna scena (śniadanie, naleśniki, kawa), rezultat (chcą wrócić).'
                    },
                    {
                        title: 'Przykład 2 – hotel pod gości biznesowych',
                        description: `Suchy komunikat:

„Obsługujemy klientów biznesowych."

Wersja storytellingowa:

„Pan Marek przyjechał do miasta tylko na jedną noc – rano miał ważną prezentację.

Poprosił o śniadanie wcześniej niż zwykle, bo musiał wyjść przed 7:00.

Zorganizowaliśmy dla niego zestaw śniadaniowy „na wynos" i cichy stolik w lobby, gdzie mógł jeszcze raz przejrzeć slajdy przy kawie.

Po spotkaniu napisał, że „dzięki spokojnej nocy i porannemu ogarnięciu wszystkiego bez chaosu" podpisał kontrakt, na którym mu najbardziej zależało."`,
                        effect: 'Tu historia pokazuje: elastyczność, zrozumienie potrzeb gościa, realny efekt (kontrakt).'
                    },
                    {
                        title: 'Przykład 3 – restauracja / lokal gastronomiczny',
                        description: `Suchy komunikat:

„Nasze dania przygotowujemy z lokalnych składników."

Wersja storytellingowa:

„W każdy czwartek rano właściciel jedzie na lokalny targ po warzywa i zioła od tych samych dostawców od lat.

To od pani, która prowadzi małe gospodarstwo kilka kilometrów dalej, bierzemy pomidory do naszej zupy krem.

Goście często pytają, dlaczego „smakuje jak u babci" – odpowiedź jest prosta: używamy tych samych prostych składników, tylko podanych w trochę bardziej nowoczesny sposób."`,
                        effect: 'Historia pokazuje autentyczność, lokalne pochodzenie i prostotę składników.'
                    }
                ],
                roleDescription: `Proste ramy do wykorzystania w praktyce:

Możesz korzystać z bardzo prostych szablonów:

Schemat 1: Problem → Rozwiązanie → Efekt
• Problem: „Goście przyjeżdżają późno, są zmęczeni, nie chcą już szukać restauracji."
• Rozwiązanie: „Oferujemy późną kolację na miejscu / zestaw powitalny."
• Efekt: „Goście od razu mogą odpocząć – bez biegania po mieście."

Schemat 2: Było → Zdarzyło się → Jest
• Było: „Klient wcześniej zatrzymywał się w dużych, głośnych hotelach przy ruchliwych ulicach."
• Zdarzyło się: „Tym razem wybrał mniejszy obiekt w spokojnej okolicy i… pierwszy raz od dawna naprawdę się wyspał."
• Jest: „Od tamtej pory wraca tam przy każdej wizycie w mieście."

Praktyczne wskazówki:

1. Jedna historia = jeden główny wątek
Nie próbuj w jednej opowieści pokazać wszystkiego (ceny, pokoi, śniadania, parkingu, sali konferencyjnej).
Skup się na jednym konkretnym doświadczeniu.

2. Krótkie, konkretne sceny
Wystarczy 4–6 zdań opisujących sytuację, a nie pełna „powieść".
Dobrze działają szczegóły: godzina, pogoda, drobny dialog, konkretne danie.

3. Prawdziwość przede wszystkim
Nie koloryzuj przesadnie.
Wystarczy opisać realistyczne zdarzenie tak, by było konkretne i „żywe".

4. Zawsze zakończ wezwaniem do działania
Po historii dodaj:
– „Jeśli to brzmi jak coś dla Ciebie, napisz wiadomość – sprawdzimy dostępne terminy."
– „Zadzwoń, jeśli w delegacji też potrzebujesz spokojnego miejsca do pracy po godzinach."`,
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Co jest kluczowym elementem dobrego storytellingu w marketingu?',
                        options: [
                            'Maksymalnie dużo liczb i statystyk',
                            'Emocje, wyraźny bohater, problem i rozwiązanie',
                            'Bardzo formalny język i specjalistyczne słownictwo',
                            'Brak konkretnej struktury – historia „ma się po prostu toczyć"'
                        ],
                        correctAnswer: 1,
                        hint: 'Pomyśl o tym, co sprawia, że historia jest zapamiętywana i angażująca...',
                        feedback: 'Dokładnie tak – dobry storytelling powinien zawierać emocje, wyraźnego bohatera, problem i rozwiązanie, co tworzy angażującą narrację.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Który z poniższych opisów NAJBARDZIEJ przypomina storytelling?',
                        options: [
                            '„Mamy 25 pokoi, parking i bezpłatne Wi-Fi."',
                            '„Nasz hotel działa od 15 lat i był remontowany w 2018 roku."',
                            '„W zeszłym miesiącu gościła u nas para, która przyjechała tylko na jedną noc w drodze nad morze. Prosili o cichy pokój, bo poprzednią noc spędzili przy ruchliwej ulicy. Rano powiedzieli, że pierwszy raz od dawna naprawdę się wyspali i zapisali nasz adres na przyszły rok."',
                            '„Oferujemy wysoki standard obsługi i profesjonalne podejście do klienta."'
                        ],
                        correctAnswer: 2,
                        hint: 'Pomyśl o opisie, który opowiada konkretną historię z bohaterem, sytuacją i rezultatem...',
                        feedback: 'Zgadza się – ten opis zawiera wszystkie elementy storytellingu: konkretnego bohatera (para), sytuację (zmęczenie, hałas), rozwiązanie (cichy pokój) i rezultat (wyspani, chcą wrócić).'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Jak najlepiej zacząć tworzenie historii dla swojej firmy?',
                        options: [
                            'Od ustalenia bohatera i jego sytuacji / problemu',
                            'Od wypisania wszystkich parametrów technicznych obiektu',
                            'Od napisania jak najdłuższego tekstu i skracania go dopiero na końcu',
                            'Od sprawdzenia, jak pisze konkurencja i skopiowania stylu'
                        ],
                        correctAnswer: 0,
                        hint: 'Pomyśl o pierwszym kroku – od czego powinna zaczynać się dobra historia...',
                        feedback: 'Dokładnie – pierwszym krokiem jest ustalenie bohatera i jego sytuacji lub problemu. To fundament każdej dobrej historii.'
                    },
                    {
                        id: 'q4',
                        type: 'open',
                        question: 'Masz obiekt noclegowy. Dotychczasowy post na Facebooku brzmi: „Dziękujemy naszym gościom za wizytę, zapraszamy ponownie."\n\nTwoje zadanie:\n• zamień to na krótką historię z jedną konkretną sytuacją,\n• pokaż, co dokładnie goście docenili,\n• zakończ wezwaniem do działania.\n\nNapisz historię w 4–6 zdaniach.',
                        keywords: [
                            'historia',
                            'goście',
                            'sytuacja',
                            'docenili',
                            'wezwanie',
                            'działanie',
                            'zarezerwuj',
                            'napisz',
                            'sprawdź',
                            'terminy'
                        ],
                        hint: 'Pomyśl o konkretnej sytuacji z gośćmi, co im się podobało i jak to opisać jako historię...',
                        feedback: 'Dziękuję za odpowiedź. To ćwiczenie pomoże Ci lepiej zrozumieć, jak przekształcać suche komunikaty w angażujące historie.'
                    }
                ]
            },
            {
                id: '2.3',
                moduleId: '2',
                title: 'Optymalizacja treści pod kątem SEO',
                intro: `SEO (Search Engine Optimization) to sposób pisania i układania treści tak, aby były zrozumiałe dla użytkowników i łatwe do odczytania przez wyszukiwarki (np. Google).

Dobrze przygotowany tekst pozwala stronie pojawiać się wyżej w wynikach wyszukiwania, gdy ktoś wpisuje konkretne hasła, np. „nocleg blisko centrum" albo „hotel ze śniadaniem".`,
                whyImportant: [
                    {
                        title: 'Zwiększyć widoczność w Google',
                        description: 'Strona pojawia się wyżej w wynikach wyszukiwania',
                        points: [],
                        icon: 'visibility-seo'
                    },
                    {
                        title: 'Przyciągnąć właściwych klientów',
                        description: 'Osoby, które już szukają dokładnie takich usług',
                        points: [
                            'np. „hotel z parkingiem i śniadaniem"'
                        ],
                        icon: 'target-seo'
                    },
                    {
                        title: 'Obniżyć koszt pozyskania klienta',
                        description: 'Ruch z wyszukiwarki jest organiczny, a nie płatny',
                        points: [],
                        icon: 'cost-seo'
                    }
                ],
                whyImportantFooter: `Możesz mieć świetną ofertę i dobrze napisaną treść, ale jeśli:

• tekst nie zawiera słów, które faktycznie wpisują klienci,
• nagłówek nic nie mówi,
• strona nie jest jasno opisana,

to duża część potencjalnych gości w ogóle na nią nie trafi.`,
                keyElements: [
                    {
                        title: 'Słowa kluczowe (keywords)',
                        description: 'Frazy, które wpisuje klient',
                        points: [
                            'np. „hotel blisko centrum miasta", „nocleg z parkingiem i śniadaniem", „weekend w górach dla par"',
                            'Naturalne wplecenie w tytuł, nagłówki, pierwszy akapit i wybrane fragmenty opisu'
                        ],
                        icon: 'keywords'
                    },
                    {
                        title: 'Tytuł i nagłówki (H1, H2, H3)',
                        description: 'Struktura treści pomagająca użytkownikowi i wyszukiwarce',
                        points: [
                            'H1 – główny tytuł strony (np. „Noclegi dla firm – spokojny hotel z parkingiem i śniadaniem")',
                            'H2 / H3 – nagłówki sekcji (np. „Dlaczego firmy wybierają nasz obiekt")'
                        ],
                        icon: 'headings'
                    },
                    {
                        title: 'Opis meta (meta description)',
                        description: 'Krótki opis wyświetlany w wynikach wyszukiwania',
                        points: [
                            'Powinien zawierać główną frazę i zachęcać do kliknięcia',
                            'np. „Kameralny hotel blisko centrum, śniadanie w cenie, bezpłatny parking. Sprawdź wolne terminy i zarezerwuj pobyt online."'
                        ],
                        icon: 'meta'
                    },
                    {
                        title: 'Treść główna (body)',
                        description: 'Tekst podzielony na sekcje, czytelny, bez „ściany tekstu"',
                        points: [
                            'Krótkie akapity, wypunktowania, podkreślenie najważniejszych korzyści'
                        ],
                        icon: 'content-seo'
                    },
                    {
                        title: 'Linki wewnętrzne',
                        description: 'Odsyłacze do innych podstron w ramach strony',
                        points: [
                            'Z bloga do oferty, z oferty do formularza kontaktowego, z „o nas" do „pokoje"',
                            'Pomagają użytkownikowi i ułatwiają robotom Google zrozumienie struktury witryny'
                        ],
                        icon: 'links'
                    },
                    {
                        title: 'Zdjęcia i opisy alternatywne (alt)',
                        description: 'Nazwy plików i teksty alt opisujące zdjęcia',
                        points: [
                            'Nazwa pliku: „pokoj-2-osobowy-z-balkonem.jpg" zamiast „IMG_1234.jpg"',
                            'Tekst alt: „Pokój dwuosobowy z balkonem i widokiem na park"'
                        ],
                        icon: 'images-seo'
                    }
                ],
                practicalExamples: [
                    {
                        title: 'Przykład 1 – podstrona „Pokoje" w hotelu',
                        description: `Zamiast krótkiego, ogólnego opisu:

„Oferujemy wygodne pokoje 1-, 2- i 3-osobowe."

lepsza wersja pod SEO i użytkownika:

„Oferujemy wygodne pokoje 1-, 2- i 3-osobowe dla gości indywidualnych, rodzin i osób podróżujących służbowo.

Wszystkie pokoje mają prywatną łazienkę, szybkie Wi-Fi oraz dostęp do śniadania w formie bufetu.

Jeśli szukasz spokojnego noclegu blisko centrum miasta, a jednocześnie blisko głównych tras dojazdowych – sprawdź nasze aktualne terminy."`,
                        effect: 'Tu pojawiają się naturalnie frazy: „nocleg blisko centrum miasta", „pokoje 1-, 2- i 3-osobowe", „śniadanie w formie bufetu", „szybkie Wi-Fi".'
                    },
                    {
                        title: 'Przykład 2 – oferta dla firm',
                        description: `Sucha wersja:

„Przyjmujemy grupy pracowników."

Wersja zoptymalizowana:

„Specjalizujemy się w noclegach dla pracowników i gości biznesowych.

Oferujemy pokoje 2- i 3-osobowe z możliwością wystawienia faktury VAT, bezpłatny parking dla busów oraz śniadania od godziny 6:30.

Jeśli szukasz stałej bazy noclegowej dla swojej firmy, skontaktuj się z nami – przygotujemy indywidualną ofertę dla grup."`,
                        effect: 'Frazy: „noclegi dla pracowników", „goście biznesowi", „baza noclegowa dla firmy".'
                    },
                    {
                        title: 'Przykład 3 – artykuł na blogu (lokalny SEO)',
                        description: `Temat: „Jak zaplanować weekend w mieście X"

Zamiast ogólnego tekstu:

„Zapraszamy na weekend, w okolicy jest dużo atrakcji."

lepsza wersja:

„Planujesz weekend w mieście X i szukasz spokojnego noclegu blisko centrum?

Z naszego obiektu dojdziesz pieszo do rynku w około 10 minut, a w okolicy znajdziesz restauracje, park i ścieżki spacerowe.

W tym artykule podpowiadamy, jak zaplanować 2 dni tak, aby zobaczyć najważniejsze miejsca i nie tracić czasu na dojazdy."`,
                        effect: 'Tutaj tekst może być dłuższy, ale od początku jasno wynika: dla kogo, gdzie, jaką korzyść daje.'
                    }
                ],
                roleDescription: `Prosta checklista SEO dla pojedynczej podstrony:

Przed publikacją treści zadaj sobie te pytania:

1. Czy w tytule i pierwszym akapicie jest konkret, a nie ogólnik?

2. Czy w treści naturalnie występują 2–3 główne frazy, które wpisuje klient w Google?

3. Czy nagłówki jasno mówią, co jest w danej sekcji?

4. Czy są linki do innych ważnych podstron (np. cennik, kontakt, rezerwacja)?

5. Czy zdjęcia mają sensowne nazwy i opisy (alt)?

Jeśli odpowiedź na większość pytań brzmi „tak" – treść jest na podstawowym poziomie przygotowana pod SEO.`,
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Co NAJBARDZIEJ pomaga wyszukiwarce zrozumieć, o czym jest konkretna podstrona?',
                        options: [
                            'Ilość zdjęć na stronie',
                            'Tylko długość tekstu',
                            'Tytuł, nagłówki i logiczna struktura treści',
                            'Kolorystyka i szata graficzna'
                        ],
                        correctAnswer: 2,
                        hint: 'Pomyśl o elementach, które pomagają wyszukiwarkom zrozumieć strukturę i tematykę treści...',
                        feedback: 'Dokładnie tak – tytuł, nagłówki i logiczna struktura treści to kluczowe elementy, które pomagają wyszukiwarce zrozumieć, o czym jest podstrona.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Który opis jest lepiej przygotowany pod SEO (przy założeniu, że chcesz pozyskiwać gości biznesowych)?',
                        options: [
                            '„Zapraszamy do naszego obiektu, mamy pokoje i śniadania."',
                            '„Oferujemy noclegi dla pracowników i gości biznesowych: pokoje 2- i 3-osobowe, śniadania od 6:30, bezpłatny parking i możliwość wystawienia faktury VAT."',
                            '„U nas jest miło, spokojnie i komfortowo dla każdego."',
                            '„Nasz obiekt działa od 15 lat i znajduje się w dobrej lokalizacji."'
                        ],
                        correctAnswer: 1,
                        hint: 'Pomyśl o opisie, który zawiera konkretne frazy kluczowe i szczegóły istotne dla gości biznesowych...',
                        feedback: 'Zgadza się – ten opis zawiera konkretne frazy kluczowe („noclegi dla pracowników", „goście biznesowi") oraz szczegóły istotne dla tej grupy docelowej.'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Który element JEST przykładem optymalizacji SEO?',
                        options: [
                            'Zmienienie koloru przycisku „Rezerwuj" z niebieskiego na czerwony',
                            'Dodanie większej liczby zdjęć bez opisów',
                            'Skrócenie tekstu o połowę, bez zmiany treści',
                            'Uzupełnienie opisu meta i nagłówków o frazy, które wpisują klienci w Google'
                        ],
                        correctAnswer: 3,
                        hint: 'Pomyśl o elementach, które bezpośrednio wpływają na widoczność w wynikach wyszukiwania...',
                        feedback: 'Dokładnie – uzupełnienie opisu meta i nagłówków o frazy, które wpisują klienci w Google, to kluczowy element optymalizacji SEO.'
                    },
                    {
                        id: 'q4',
                        type: 'multi-task',
                        question: `Masz stronę z opisem oferty:

„Zapraszamy do naszego obiektu. Mamy pokoje i śniadania. Blisko centrum. Skontaktuj się z nami."

Twoim zadaniem jest zoptymalizować ten tekst pod SEO. Wykonaj poniższe 3 zadania:`,
                        subTasks: [
                            {
                                id: 'q4-1',
                                title: 'Zadanie 1: Główna fraza kluczowa',
                                description: 'Wymyśl główną frazę, na którą chcesz się wyświetlać w Google.\nPrzykład: „nocleg blisko centrum miasta X ze śniadaniem"',
                                keywords: [
                                    'nocleg',
                                    'hotel',
                                    'pokoje',
                                    'centrum',
                                    'miasto',
                                    'śniadanie',
                                    'fraza',
                                    'kluczowa'
                                ],
                                hint: 'Pomyśl o konkretnej frazie, którą wpisują klienci szukając Twojej oferty...'
                            },
                            {
                                id: 'q4-2',
                                title: 'Zadanie 2: Tytuł (H1)',
                                description: 'Napisz na nowo tytuł (H1) tej podstrony, używając wybranej frazy kluczowej.',
                                keywords: [
                                    'tytuł',
                                    'h1',
                                    'nagłówek',
                                    'fraza',
                                    'kluczowa'
                                ],
                                hint: 'Tytuł powinien zawierać główną frazę kluczową i być konkretny...'
                            },
                            {
                                id: 'q4-3',
                                title: 'Zadanie 3: Opis (4–6 zdań)',
                                description: `Napisz 4–6 zdań opisu, w którym:
• naturalnie użyjesz wybranej frazy kluczowej,
• dodasz 2–3 konkretne informacje (np. godziny śniadań, parking, Wi-Fi),
• zakończysz wezwaniem do działania (np. „Sprawdź dostępne terminy").`,
                                keywords: [
                                    'opis',
                                    'treść',
                                    'fraza',
                                    'kluczowa',
                                    'informacje',
                                    'parking',
                                    'wi-fi',
                                    'śniadanie',
                                    'wezwanie',
                                    'działanie',
                                    'zarezerwuj',
                                    'sprawdź',
                                    'terminy'
                                ],
                                hint: 'Pomyśl o konkretnych informacjach, które są ważne dla klientów i naturalnie wpleć frazę kluczową...'
                            }
                        ],
                        feedback: 'Dziękuję za odpowiedź. To ćwiczenie pomoże Ci lepiej zrozumieć, jak optymalizować treści pod SEO, używając konkretnych fraz kluczowych i strukturyzując treść.'
                    }
                ]
            }
        ]
    },
    {
        id: '3',
        title: 'Reklamy płatne w mediach społecznościowych',
        icon: 'megaphone',
        lessons: [
            {
                id: '3.1',
                moduleId: '3',
                title: 'Tworzenie skutecznych kampanii na Facebooku i Instagramie',
                intro: `Reklamy płatne w mediach społecznościowych (Facebook / Instagram Ads) pozwalają dotrzeć z ofertą dokładnie do osób, które są dla Ciebie najważniejsze – według lokalizacji, wieku, zainteresowań czy zachowań.

Dla obiektu noclegowego oznacza to możliwość pokazania oferty osobom, które:

• mieszkają w określonym promieniu od Twojej lokalizacji lub w konkretnych miastach,

• interesują się podróżami, noclegami, wyjazdami służbowymi, wydarzeniami w regionie,

• szukają miejsca na wyjazd weekendowy, szkolenie, konferencję lub nocleg pracowniczy.`,
                whyImportant: [
                    {
                        title: 'Szybka budowa rozpoznawalności',
                        description: 'Pomagają szybko zbudować rozpoznawalność obiektu na rynku',
                        points: [],
                        icon: 'visibility'
                    },
                    {
                        title: 'Wypełnianie konkretnych terminów',
                        description: 'Pozwalają wypełniać konkretne terminy (np. dni robocze poza sezonem)',
                        points: [],
                        icon: 'target'
                    },
                    {
                        title: 'Testowanie różnych ofert',
                        description: 'Umożliwiają testowanie różnych ofert (weekendy dla par, noclegi dla firm, pakiety rodzinne)',
                        points: [],
                        icon: 'analytics'
                    },
                    {
                        title: 'Dotarcie do nowych klientów',
                        description: 'Pozwalają dotrzeć do osób spoza Twojej miejscowości, które inaczej by o Tobie nie usłyszały',
                        points: [],
                        icon: 'traffic'
                    },
                    {
                        title: 'Kontrola nad kosztami',
                        description: 'Dają dużą kontrolę nad kosztami – możesz zacząć od małego budżetu dziennego i zwiększać go dopiero wtedy, gdy kampania przynosi efekt',
                        points: [],
                        icon: 'cost-seo'
                    }
                ],
                whyImportantFooter: `Bez płatnych kampanii jesteś w dużej mierze zależny od:

• przypadkowego ruchu organicznego,

• poleceń „z ust do ust",

• spontanicznych wyszukiwań w Google.

Z kampaniami płatnymi możesz świadomie „włączać" i „wzmacniać" widoczność wybranych ofert wtedy, kiedy najbardziej ich potrzebujesz.`,
                practicalExamples: [
                    {
                        title: 'Przykład praktyczny 1 – „Weekend dla par"',
                        description: `Obiekt noclegowy położony w pobliżu atrakcji turystycznych ma wolne miejsca w weekendy poza głównym sezonem.

Parametry kampanii:

• grupa docelowa: osoby w wieku 25–45 lat, mieszkające w promieniu do 100 km od obiektu, będące w związku,

• cel kampanii: kliknięcia w stronę z ofertą „Weekend dla par",

• treść reklamy:

• opis: „Weekendowy pobyt dla dwojga: 2 noce ze śniadaniami, parking w cenie, późne wymeldowanie",

• grafika: realne zdjęcie pokoju oraz sali śniadaniowej,

• wezwanie do działania: „Sprawdź dostępne terminy".`,
                        effect: 'Reklama trafia do osób, które realnie mogą przyjechać na krótki wyjazd i szukają odpoczynku w rozsądnej odległości od domu.'
                    },
                    {
                        title: 'Przykład praktyczny 2 – „Noclegi dla firm i pracowników"',
                        description: `Obiekt położony blisko strefy przemysłowej chce dotrzeć do firm delegujących pracowników.

Parametry kampanii:

• grupa docelowa: osoby w wieku 25–60 lat, zainteresowane tematami „zarządzanie firmą", „delegacje", „logistyka", mieszkające w wybranych miastach (siedziby firm),

• cel kampanii: pozyskanie zapytań ofertowych (kliknięcie w formularz / kontakt mailowy),

• treść reklamy:

• opis: „Noclegi dla pracowników z fakturą VAT, parkingiem i śniadaniem. Elastyczne warunki dla firm",

• grafika: zdjęcie parkingu, pokoju i sali śniadaniowej,

• wezwanie do działania: „Napisz, przygotuję ofertę dla Twojej firmy".`,
                        effect: 'Zamiast czekać, aż firma przypadkiem trafi na stronę, obiekt aktywnie wychodzi z ofertą do osób decyzyjnych.'
                    }
                ],
                keyElements: [
                    {
                        title: 'Jasno określony cel kampanii',
                        description: 'Co chcesz osiągnąć w tej konkretnej kampanii',
                        points: [
                            'więcej wejść na stronę oferty',
                            'więcej zapytań o dostępność',
                            'więcej telefonów / wiadomości',
                            'większą rozpoznawalność obiektu w danym mieście / regionie'
                        ],
                        icon: 'target'
                    },
                    {
                        title: 'Precyzyjna grupa docelowa',
                        description: 'Kto ma zobaczyć tę reklamę',
                        points: [
                            'pary szukające weekendu',
                            'rodziny z dziećmi',
                            'pracownicy w delegacji',
                            'organizatorzy szkoleń / wydarzeń'
                        ],
                        icon: 'audience'
                    },
                    {
                        title: 'Konkretna oferta i komunikat',
                        description: 'Co dokładnie proponujesz',
                        points: [
                            '„Nocleg ze śniadaniem od 260 zł / doba"',
                            '„Pakiet weekendowy dla par"',
                            '„Noclegi pracownicze z fakturą VAT"',
                            'Dlaczego ma to znaczenie dla klienta (korzyść, wygoda, oszczędność czasu / pieniędzy)'
                        ],
                        icon: 'benefits'
                    },
                    {
                        title: 'Dobra kreacja (grafika + tekst)',
                        description: 'Elementy skutecznej kreacji',
                        points: [
                            'zdjęcie pokazujące rzeczywisty standard obiektu',
                            'krótki, czytelny tekst bez żargonu',
                            'wyraźne wezwanie do działania („Sprawdź terminy", „Napisz wiadomość", „Zarezerwuj pobyt")'
                        ],
                        icon: 'content'
                    },
                    {
                        title: 'Budżet i czas trwania kampanii',
                        description: 'Planowanie budżetu',
                        points: [
                            'start od niewielkiego budżetu dziennego (np. 20–40 zł)',
                            'minimum kilka–kilkanaście dni na przetestowanie skuteczności'
                        ],
                        icon: 'cost-seo'
                    },
                    {
                        title: 'Spójność reklamy i miejsca docelowego',
                        description: 'Zapewnienie spójności',
                        points: [
                            'jeżeli reklamujesz „Weekend dla par" – użytkownik po kliknięciu powinien trafić dokładnie na stronę z opisem tego pakietu, a nie na ogólną stronę główną'
                        ],
                        icon: 'experience'
                    }
                ],
                checklist: [
                    {
                        id: 'check-1',
                        text: 'Czy cel kampanii jest jasno określony i jeden na kampanię?'
                    },
                    {
                        id: 'check-2',
                        text: 'Czy wiesz dokładnie, do kogo kierujesz tę konkretną ofertę?'
                    },
                    {
                        id: 'check-3',
                        text: 'Czy treść reklamy jasno mówi: co, dla kogo, w jakiej cenie / na jakich warunkach?'
                    },
                    {
                        id: 'check-4',
                        text: 'Czy grafika jest wyraźna, aktualna i pokazuje Twój obiekt, a nie przypadkowe zdjęcie z banku zdjęć?'
                    },
                    {
                        id: 'check-5',
                        text: 'Czy miejsce, do którego kierujesz użytkownika po kliknięciu, jest spójne z reklamą i łatwe w obsłudze (strona / formularz / wiadomość)?'
                    },
                    {
                        id: 'check-6',
                        text: 'Czy masz zaplanowane minimum kilka dni na obserwację wyników i drobne korekty (zamiast zmieniać wszystko po 1–2 dniach)?'
                    }
                ],
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Co jest fundamentem skutecznej kampanii reklamowej na Facebooku / Instagramie dla obiektu noclegowego?',
                        options: [
                            'Jak najwyższy budżet reklamowy',
                            'Precyzyjnie określony cel i grupa docelowa',
                            'Jak największa liczba różnych grafik',
                            'Publikowanie reklam wyłącznie w weekendy'
                        ],
                        correctAnswer: 1,
                        feedback: 'Dokładnie tak – fundamentem skutecznej kampanii jest precyzyjnie określony cel i dobrze zdefiniowana grupa docelowa.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Który przykład najlepiej opisuje przemyślaną ofertę reklamową?',
                        options: [
                            '„Zapraszamy do naszego hotelu, mamy wolne pokoje."',
                            '„Hotel w centrum miasta, pokoje 2-osobowe, szczegóły na stronie."',
                            '„Weekend dla par: 2 noce ze śniadaniami, darmowy parking i późne wymeldowanie. Sprawdź dostępne terminy."',
                            '„Kliknij, żeby zobaczyć nasz profil na Facebooku."'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – przemyślana oferta reklamowa zawiera konkretne informacje (co, dla kogo, na jakich warunkach) i jasne wezwanie do działania.'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Dlaczego warto zaczynać kampanię od mniejszego budżetu dziennego (np. 20–40 zł)?',
                        options: [
                            'Bo niższy budżet automatycznie poprawia jakość reklamy',
                            'Bo wtedy reklama nie wyświetli się zbyt często',
                            'Bo pozwala bez dużego ryzyka przetestować grupy odbiorców i kreacje przed zwiększeniem wydatków',
                            'Bo Facebook nie pozwala na wyższe budżety dla nowych kont'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – zaczynanie od mniejszego budżetu pozwala na bezpieczne testowanie różnych grup docelowych i kreacji przed zwiększeniem wydatków.'
                    }
                ]
            },
            {
                id: '3.2',
                moduleId: '3',
                title: 'Analiza wyników kampanii',
                intro: `Samo uruchomienie kampanii reklamowej na Facebooku czy Instagramie to dopiero początek. Prawdziwa praca zaczyna się wtedy, gdy zaczynamy regularnie sprawdzać wyniki i na tej podstawie podejmować decyzje:

• co zostawić,

• co zmienić,

• co wyłączyć,

• w co zainwestować więcej.

Analiza wyników kampanii pozwala zamienić „strzelanie na ślepo” w świadome, oparte na danych decyzje marketingowe.`,
                whyImportant: [
                    {
                        title: 'Nie każda reklama działa tak samo',
                        description: 'Różne grupy odbiorców reagują na inne komunikaty i formy',
                        points: [
                            'to, co działa zimą, nie musi działać latem',
                            'różne cele (weekendy, pracownicy, rodziny) mają różne wyniki'
                        ],
                        icon: 'target'
                    },
                    {
                        title: 'Bez analizy tracisz budżet',
                        description: 'Płacisz za kliknięcia, które nie prowadzą do rezerwacji',
                        points: [
                            'ładne kreacje nie zawsze działają',
                            'brak danych = brak pewności, czy pieniądze pracują'
                        ],
                        icon: 'cost-seo'
                    },
                    {
                        title: 'Z analizą podejmujesz świadome decyzje',
                        description: 'Przesuwasz budżet do kampanii, które działają najlepiej',
                        points: [
                            'wyłączasz słabe kampanie',
                            'poprawiasz wyniki krok po kroku zamiast zaczynać od zera'
                        ],
                        icon: 'analytics'
                    }
                ],
                keyElements: [
                    {
                        title: 'CTR (Click-Through Rate)',
                        description: 'Pokazuje, jaki procent osób kliknął reklamę',
                        points: [
                            'niski CTR = słaba grafika lub zbyt ogólny tekst',
                            'warto porównywać CTR między kampaniami'
                        ],
                        icon: 'visibility'
                    },
                    {
                        title: 'CPC (Cost Per Click)',
                        description: 'Średni koszt jednego kliknięcia',
                        points: [
                            'pomaga porównywać kampanie',
                            'nie jest celem samym w sobie, ale sygnałem efektywności'
                        ],
                        icon: 'cost-seo'
                    },
                    {
                        title: 'Konwersje / zapytania / rezerwacje',
                        description: 'Najważniejszy wskaźnik realnych efektów',
                        points: [
                            'połącz dane z reklam z formularzem / skrzynką / systemem rezerwacji',
                            'licz nie tylko kliknięcia, ale też ile osób napisało lub zadzwoniło'
                        ],
                        icon: 'cta'
                    },
                    {
                        title: 'Koszt pozyskania zapytania (CPA)',
                        description: 'Ile realnie kosztuje Cię jedno zapytanie lub rezerwacja',
                        points: [
                            'ten wskaźnik mówi, czy kampania ma sens biznesowo',
                            'łatwiej porównywać różne kampanie i oferty'
                        ],
                        icon: 'benefits'
                    },
                    {
                        title: 'Zasięg i częstotliwość',
                        description: 'Jak szeroko i jak często widzą reklamę Twoi odbiorcy',
                        points: [
                            'wysoka częstotliwość + brak efektów = reklama męczy odbiorców',
                            'czasem wystarczy odświeżyć kreację'
                        ],
                        icon: 'traffic'
                    }
                ],
                practicalExamples: [
                    {
                        title: 'Przykład 1 – kampania „Weekend dla par”',
                        description: `Prowadzisz dwie kampanie równolegle:

• Kampania A – reklama z jednym zdjęciem pokoju,

• Kampania B – reklama z krótkim wideo pokazującym pokój, śniadanie i okolicę.

Po 10 dniach:

• Kampania A: CTR 1,2%, koszt kliknięcia 1,80 zł, 3 zapytania,

• Kampania B: CTR 2,9%, koszt kliknięcia 1,10 zł, 9 zapytań.`,
                        effect: 'Wideo działa lepiej – zwiększasz budżet Kampanii B i testujesz kolejne warianty wideo.'
                    },
                    {
                        title: 'Przykład 2 – noclegi pracownicze',
                        description: `Prowadzisz kampanię noclegów dla firm i pracowników:

• Grupa docelowa 1: osoby mieszkające w Twoim powiecie,

• Grupa docelowa 2: osoby mieszkające w innych miastach, gdzie są siedziby firm.

Po 2 tygodniach:

• Grupa 1: wysoki CTR, ale mało rezerwacji,

• Grupa 2: mniej kliknięć, ale więcej konkretnych zapytań.`,
                        effect: 'Przenosisz większą część budżetu na grupę 2, a dla grupy 1 tworzysz inną kampanię (np. wizerunkową).'
                    }
                ],
                roleDescriptionTitle: 'Prosty schemat analizy po 7–14 dniach kampanii',
                roleDescription: `1. Sprawdź, która kampania ma wyższy CTR i niższy koszt kliknięcia.
2. Zobacz, z których kampanii / zestawów reklam realnie przychodzą zapytania / rezerwacje.
3. Zadaj sobie pytania:
• Czy reklama jest spójna z ofertą na stronie?
• Czy cena, którą pokazujesz, jest jasna i zrozumiała?
• Czy kierujesz reklamę do właściwej grupy (nie za szeroko)?
4. Przesuń budżet do najlepiej działających kampanii / zestawów.
5. Wyłącz kampanie, które mają wysokie koszty i brak efektów (po przetestowaniu ich przez kilka dni).`,
                additionalInfoTitle: 'Najczęstsze błędy przy analizie wyników',
                additionalInfo: `• Wyciąganie wniosków po 1–2 dniach emisji.
• Ocenianie kampanii tylko po „polubieniach”, bez spojrzenia na zapytania i rezerwacje.
• Niewykorzystywanie danych do zmian – kampania „idzie, bo już jest włączona”.
• Porównywanie wyników kampanii o różnych celach.`,
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Który wskaźnik najlepiej pokazuje, czy reklama jest atrakcyjna dla odbiorców?',
                        options: [
                            'Liczba polubień strony',
                            'CTR (współczynnik kliknięć)',
                            'Łączny zasięg kampanii',
                            'Liczba wyświetleń reklamy'
                        ],
                        correctAnswer: 1,
                        feedback: 'CTR pokazuje, jaki procent odbiorców kliknął reklamę, więc najlepiej wskazuje atrakcyjność kreacji.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Co oznacza „koszt pozyskania zapytania / rezerwacji” (CPA)?',
                        options: [
                            'Łączna kwota wydana na reklamy w danym miesiącu',
                            'Średni koszt jednego wyświetlenia reklamy',
                            'Średni koszt kampanii w ciągu jednego dnia',
                            'Ile średnio kosztuje jedno zapytanie lub rezerwacja wygenerowana przez kampanię'
                        ],
                        correctAnswer: 3,
                        feedback: 'CPA pokazuje, ile realnie płacisz za konkretne działanie klienta (zapytanie, rezerwację).'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Po 10 dniach kampanii widzisz, że reklama ma dużo kliknięć, ale mało zapytań. Co robisz?',
                        options: [
                            'Zostawiam kampanię bez zmian',
                            'Zwiększam budżet, aby było więcej kliknięć',
                            'Sprawdzam treść reklamy i stronę docelową, zmieniam ofertę lub grupę docelową',
                            'Wyłączam wszystkie reklamy'
                        ],
                        correctAnswer: 2,
                        feedback: 'Należy sprawdzić spójność reklamy i strony docelowej oraz dopracować ofertę lub targetowanie.'
                    },
                    {
                        id: 'q4',
                        type: 'open',
                        question: 'Jakie trzy konkretne wnioski chcesz wyciągać z wyników swoich kampanii i jak pomogą Ci podejmować decyzje?',
                        keywords: [
                            'wnioski',
                            'działa',
                            'nie działa',
                            'budżet',
                            'target',
                            'oferta',
                            'decyzje'
                        ],
                        hint: 'Pomyśl o tym, co chcesz wiedzieć po analizie: które reklamy działają, jakie grupy warto rozwijać, czego unikać.',
                        feedback: 'Świadome wnioski z kampanii pomagają inwestować w to, co działa, i unikać marnowania budżetu.'
                    }
                ]
            }
        ]
    },
    {
        id: '4',
        title: 'Budowanie relacji z klientami',
        icon: 'users',
        lessons: [
            {
                id: '4.1',
                moduleId: '4',
                title: 'Zarządzanie opiniami i recenzjami online',
                intro: `Opinie i recenzje online (Google, Booking, Facebook, portale rezerwacyjne) są dziś jednym z najważniejszych czynników wpływających na decyzje klientów. Zanim ktoś zadzwoni, napisze maila czy zarezerwuje nocleg, bardzo często najpierw sprawdza średnią ocen i kilka ostatnich komentarzy.`,
                whyImportant: [
                    {
                        title: 'Zwiększenie liczby rezerwacji',
                        description: 'Wyższa średnia ocena = większe zaufanie',
                        points: [],
                        icon: 'target'
                    },
                    {
                        title: 'Wyróżnienie się na tle konkurencji',
                        description: 'Nawet przy podobnym standardzie obiektu',
                        points: [],
                        icon: 'visibility'
                    },
                    {
                        title: 'Szybsze wyłapywanie problemów',
                        description: 'Powtarzające się problemy (np. hałas, śniadania, sprzątanie) i realna poprawa jakości usług',
                        points: [],
                        icon: 'analytics'
                    },
                    {
                        title: 'Budowanie wizerunku',
                        description: 'Firma jako miejsce, które słucha gości i reaguje na uwagi',
                        points: [],
                        icon: 'trust'
                    }
                ],
                whyImportantFooter: `Brak reakcji na opinie lub emocjonalne odpowiedzi:

• obniża zaufanie nowych klientów,

• może sprawiać wrażenie chaosu organizacyjnego lub braku profesjonalizmu,

• wzmacnia negatywne wrażenie po pojedynczym, złym doświadczeniu.`,
                practicalExamples: [
                    {
                        title: 'Przykład praktyczny 1 – obiekt noclegowy',
                        description: `Gość wystawia opinię 3/5 na Google:

„Pokój czysty, ale w nocy było dość głośno od ulicy. Śniadanie ok, ale mogłoby być bardziej urozmaicone."

Słaba reakcja: brak odpowiedzi albo krótka, defensywna wiadomość w stylu:

„Zawsze jest trochę hałasu, nic na to nie poradzimy."

Profesjonalna reakcja:

• podziękowanie za opinię,

• krótkie odniesienie się do uwag,

• zaznaczenie, co firma robi, aby poprawić sytuację,

• zaproszenie do kontaktu bezpośredniego.

Przykładowa odpowiedź:

„Dziękujemy za podzielenie się opinią. Cieszymy się, że docenił/a Pan/Pani czystość i śniadanie. Hałas od ulicy to dla nas ważna uwaga – testujemy obecnie dodatkowe uszczelnienia okien oraz rozważamy dodatkowe elementy wygłuszające. Będziemy wdzięczni za kontakt bezpośredni, żeby lepiej zrozumieć szczegóły pobytu i dobrać spokojniejszy pokój przy kolejnej rezerwacji."`,
                        effect: 'Taka odpowiedź pokazuje, że firma słucha, sygnalizuje działania naprawcze i buduje zaufanie u wszystkich, którzy czytają opinię, nie tylko u jednej osoby.'
                    },
                    {
                        title: 'Przykład praktyczny 2 – powtarzający się problem',
                        description: `Jeżeli w kilku opiniach z rzędu pojawia się motyw: „smutne śniadania", „mało świeżych warzyw", „ciągle to samo menu", to:

• nie wystarczy lepsza odpowiedź,

• konieczna jest realna zmiana (np. rotacja dań, jedno dodatkowe ciepłe danie, lepsza ekspozycja produktów).

Po wprowadzeniu zmiany warto:

• poprosić kolejnych zadowolonych gości o wystawienie opinii,

• sprawdzić, czy nowym recenzjom towarzyszy np. sformułowanie „śniadania się poprawiły", „jest większy wybór".`,
                        effect: 'Systematyczne reagowanie na powtarzające się problemy i wprowadzanie realnych zmian buduje długoterminową reputację i zaufanie klientów.'
                    }
                ],
                roleDescription: `1. Odpowiadaj na większość opinii, nie tylko na skrajnie negatywne.

2. Na negatywne opinie odpowiadaj szybko, ale spokojnie.

3. Nie przerzucaj winy na klienta w publicznej odpowiedzi.

4. Aktywnie zachęcaj zadowolonych gości do wystawiania opinii (np. przy wymeldowaniu).

5. Monitoruj średnią ocenę oraz powtarzające się motywy i traktuj je jak darmowe badanie satysfakcji.`,
                roleDescriptionTitle: 'Dobre praktyki zarządzania opiniami',
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Jak powinna reagować profesjonalna firma na negatywną opinię online?',
                        options: [
                            'Ignorować ją, żeby „nie robić szumu"',
                            'Odpowiedzieć profesjonalnie, podziękować za opinię, przeprosić i zaproponować rozwiązanie',
                            'Usunąć opinię, jeśli to możliwe',
                            'Odpowiedzieć emocjonalnie, tłumacząc, że klient przesadza'
                        ],
                        correctAnswer: 1,
                        feedback: 'Dokładnie tak – profesjonalna odpowiedź na negatywną opinię pokazuje zaangażowanie w satysfakcję klienta i może przekształcić negatywną sytuację w pozytywną.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Które z poniższych działań najlepiej pomaga zwiększyć liczbę pozytywnych opinii?',
                        options: [
                            'Czekanie, aż klienci sami z siebie napiszą recenzję',
                            'Prośba o opinię tylko wtedy, gdy ktoś narzeka',
                            'Systematyczne, uprzejme proszenie zadowolonych gości o pozostawienie opinii (np. przy wymeldowaniu, w mailu po pobycie)',
                            'Oferowanie rabatu w zamian za wyłącznie 5-gwiazdkowe opinie'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – systematyczne, uprzejme proszenie zadowolonych gości o opinie jest najlepszą praktyką, która naturalnie zwiększa liczbę pozytywnych recenzji.'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Które stwierdzenie najlepiej opisuje rolę recenzji online w działalności hotelu lub pensjonatu?',
                        options: [
                            'Mają znaczenie tylko dla turystów zagranicznych',
                            'Są ważne głównie po to, żeby „ładnie wyglądały" w wyszukiwarce',
                            'Silnie wpływają na decyzje rezerwacyjne i są jednym z kluczowych źródeł informacji dla nowych gości',
                            'Są mniej istotne niż ulotki i ogłoszenia drukowane'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – recenzje online silnie wpływają na decyzje rezerwacyjne i są jednym z pierwszych źródeł informacji, które sprawdzają potencjalni klienci przed rezerwacją.'
                    }
                ]
            },
            {
                id: '4.2',
                moduleId: '4',
                title: 'Komunikacja z klientami w mediach społecznościowych',
                intro: `Dla wielu osób Facebook czy Instagram to pierwszy punkt kontaktu z firmą. Zanim zadzwonią lub napiszą maila, szybciej wyślą wiadomość na Messengerze albo skomentują post. To oznacza, że sposób odpowiedzi w social mediach bardzo często decyduje o tym, czy klient zrobi kolejny krok (zapytanie o ofertę, rezerwacja, wizyta), czy po prostu przejdzie dalej.`,
                whyImportant: [
                    {
                        title: 'Budowanie zaufania',
                        description: 'Firma jest „żywa", reaguje, odpowiada',
                        points: [],
                        icon: 'trust'
                    },
                    {
                        title: 'Wzmacnianie wizerunku',
                        description: 'Profesjonalne, uporządkowane miejsce',
                        points: [],
                        icon: 'visibility'
                    },
                    {
                        title: 'Zmniejszanie nieporozumień',
                        description: 'Np. źle zrozumiane godziny zameldowania, zasady rezerwacji',
                        points: [],
                        icon: 'info'
                    },
                    {
                        title: 'Szybsze domykanie sprzedaży',
                        description: 'Zapytanie → konkretna propozycja → rezerwacja',
                        points: [],
                        icon: 'sales'
                    },
                    {
                        title: 'Wpływ na postrzeganie',
                        description: 'Jak Twoją firmę postrzegają osoby, które tylko „podglądają" rozmowy pod postami, ale jeszcze się nie odezwały',
                        points: [],
                        icon: 'relations'
                    }
                ],
                whyImportantFooter: `Brak odpowiedzi lub chaotyczne, emocjonalne reakcje:

• zniechęcają do zadawania pytań,

• obniżają poczucie bezpieczeństwa („czy ktoś w ogóle tam ogarnia?"),

• mogą zniechęcić do rezerwacji nawet przy dobrych zdjęciach i ofercie.`,
                practicalExamples: [
                    {
                        title: 'Przykład praktyczny 1 – zapytanie na Messengerze',
                        description: `Klient pisze wiadomość:

„Dzień dobry, czy macie Państwo wolne pokoje 2-osobowe na przyszły weekend? Interesuje mnie nocleg z soboty na niedzielę, ze śniadaniem."

Słaba odpowiedź (zbyt ogólna, opóźniona):

• odpowiedź po 2 dniach,

• treść: „Proszę dzwonić w godzinach 9–17."

Lepsza odpowiedź:

• odpowiedź w ciągu kilku godzin w godzinach pracy,

• treść konkretna i uporządkowana:

„Dzień dobry, dziękujemy za wiadomość. W terminie sobota–niedziela mamy jeszcze dostępne pokoje 2-osobowe ze śniadaniem.

Cena: 260 zł / doba za pokój ze śniadaniem.

Możemy od razu zarezerwować miejsce – proszę o imię i nazwisko oraz przybliżoną godzinę przyjazdu. W razie pytań chętnie pomogę."`,
                        effect: 'Taka odpowiedź od razu zmniejsza liczbę kolejnych pytań, prowadzi klienta do konkretnej decyzji i pokazuje, że firma jest dostępna i zorganizowana.'
                    },
                    {
                        title: 'Przykład praktyczny 2 – komentarz publiczny',
                        description: `Pod postem pojawia się komentarz:

„Dzwoniłem wczoraj kilka razy i nikt nie odbierał. Słaby kontakt."

Możliwe reakcje:

• Ignorowanie komentarza – pozostawia wrażenie, że firma unika tematu.

• Oburzenie („Przecież nie możemy cały czas siedzieć przy telefonie") – eskaluje problem.

• Profesjonalna odpowiedź:

„Dziękujemy za sygnał. Przepraszamy za trudność z kontaktem – wczoraj w godzinach popołudniowych mieliśmy wzmożony ruch i mogliśmy nie odebrać każdej rozmowy. Prosimy o wiadomość prywatną lub numer telefonu – oddzwonimy dzisiaj i postaramy się wszystko wyjaśnić."

Dodatkowo, po takiej odpowiedzi:

• warto faktycznie oddzwonić,

• sprawdzić, czy w określonych godzinach nie warto wprowadzić prostych usprawnień (np. przekierowanie połączeń, jasna informacja w opisie profilu o godzinach odbierania telefonu).`,
                        effect: 'Profesjonalna odpowiedź na publiczny komentarz pokazuje, że firma słucha, reaguje i dba o klientów, nawet w trudnych sytuacjach.'
                    }
                ],
                roleDescription: `1. Czas reakcji – odpowiadaj możliwie szybko w godzinach pracy; dobry standard to odpowiedź w ciągu kilku godzin (maksymalnie 24 godziny).

2. Ton wypowiedzi – spokojny, uprzejmy, konkretny. Bez emocji, żalu ani ironii, nawet jeśli klient jest nerwowy.

3. Personalizacja – jeżeli to możliwe, zwracaj się po imieniu (jeśli klient je podaje) i nawiązuj do konkretnej sytuacji.

4. Klarowność – krótkie zdania, najważniejsze informacje na początku (termin, cena, dalszy krok).

5. Przenoszenie trudnych tematów do kanału prywatnego – w przypadku skarg szybko zaproponuj przejście do wiadomości prywatnych lub telefonu, ale na komentarz publiczny też odpowiedz.

6. Stałe „następne kroki" – kończ wiadomości jasnym wskazaniem, co klient może zrobić dalej (zadzwonić, wysłać dane do rezerwacji, wejść na konkretną stronę).`,
                roleDescriptionTitle: 'Proste zasady dobrej komunikacji w social mediach',
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Jaki standard czasu odpowiedzi jest rozsądny dla małej firmy (hotel, pensjonat, lokalna usługa) w mediach społecznościowych?',
                        options: [
                            'Odpowiedź raz w tygodniu, przy przeglądaniu wiadomości',
                            'Odpowiedź w ciągu kilku godzin w godzinach pracy, maksymalnie do 24 godzin',
                            'Odpowiedź tylko wtedy, gdy klient pisze drugi raz',
                            'Odpowiedź wyłącznie rano, niezależnie od godziny wysłania wiadomości'
                        ],
                        correctAnswer: 1,
                        feedback: 'Dokładnie tak – odpowiedź w ciągu kilku godzin w godzinach pracy (maksymalnie 24 godziny) to dobry standard, który pokazuje zaangażowanie i profesjonalizm.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Które z poniższych zachowań najlepiej buduje zaufanie w komunikacji w mediach społecznościowych?',
                        options: [
                            'Krótkie, jednozdaniowe odpowiedzi bez szczegółów',
                            'Ignorowanie komentarzy publicznych, odpowiadanie tylko na wiadomości prywatne',
                            'Uprzejme, konkretne odpowiedzi, dopasowane do sytuacji klienta, z jasnym „co dalej"',
                            'Odpowiadanie klientom tylko wtedy, gdy pytają o cenę'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – uprzejme, konkretne odpowiedzi dopasowane do sytuacji klienta, z jasnym wskazaniem następnych kroków, budują zaufanie i profesjonalny wizerunek.'
                    },
                    {
                        id: 'q3',
                        type: 'open',
                        question: 'Napisz jedną konkretną zasadę komunikacji z klientami w mediach społecznościowych, którą chciałbyś wprowadzić lub poprawić w swojej firmie (np. „odpowiadamy na wszystkie wiadomości do 4 godzin w godzinach pracy").',
                        keywords: [
                            'czas',
                            'odpowiedź',
                            'godziny',
                            'standard',
                            'zasada',
                            'komunikacja',
                            'reakcja',
                            'wiadomość',
                            'messenger',
                            'facebook',
                            'instagram',
                            'kontakt',
                            'dostępność',
                            'szybko',
                            'natychmiast',
                            '24',
                            '4',
                            '6',
                            '8',
                            '12'
                        ],
                        hint: 'Pomyśl o konkretnej zasadzie, którą możesz wprowadzić w swojej firmie, np. dotyczącej czasu odpowiedzi, tonu komunikacji, personalizacji itp...',
                        feedback: 'Dziękuję za odpowiedź. Konkretne zasady komunikacji pomagają w budowaniu profesjonalnego wizerunku i zaufania klientów.'
                    }
                ]
            }
        ]
    },
    {
        id: '5',
        title: 'Email marketing',
        icon: 'mail',
        lessons: [
            {
                id: '5.1',
                moduleId: '5',
                title: 'Tworzenie skutecznych kampanii emailowych',
                intro: `Email marketing, mimo rozwoju social mediów i komunikatorów, nadal jest jednym z najbardziej efektywnych kanałów dotarcia do klientów. To bezpośrednia wiadomość do osoby, która już zostawiła kontakt i w jakimś stopniu jest zainteresowana ofertą.

Dobrze przygotowany email:

• trafia do skrzynki osoby, która zna Twoją firmę,

• może zawierać konkretną propozycję (np. termin, cena, link do rezerwacji),

• pozwala budować relację „na spokojnie", poza chaosem mediów społecznościowych.`,
                whyImportant: [
                    {
                        title: 'Docieranie do byłych klientów',
                        description: 'Możesz przypomnieć się przed kolejnym sezonem',
                        points: [],
                        icon: 'remind'
                    },
                    {
                        title: 'Informowanie o nowościach',
                        description: 'Np. nowe pokoje, pakiety rodzinne, oferta świąteczna',
                        points: [],
                        icon: 'info'
                    },
                    {
                        title: 'Kontrola nad komunikacją',
                        description: 'Nie jesteś zależny od algorytmów Facebooka czy Instagrama',
                        points: [],
                        icon: 'organize'
                    },
                    {
                        title: 'Mierzenie efektów',
                        description: 'Widzisz, kto otworzył wiadomość, kto kliknął, co było interesujące',
                        points: [],
                        icon: 'analytics'
                    }
                ],
                whyImportantFooter: `Bez email marketingu łatwo „zgubić" osoby, które były raz i… zniknęły. Z prostą listą mailingową możesz co jakiś czas przypomnieć im o sobie.`,
                practicalExamples: [
                    {
                        title: 'Przykład praktyczny 1 – hotel / pensjonat',
                        description: `Załóżmy, że prowadzisz pensjonat w mieście turystycznym. Po każdym pobycie prosisz gościa o zgodę na zapis do listy mailingowej (np. na recepcji lub w formularzu online).

Raz na kwartał możesz wysłać:

• email z informacją o nowych pakietach (np. „Weekend dla par", „Jesienny wypoczynek z termami"),

• prostą propozycję:

„Dla Gości, którzy już u nas byli – 10% rabatu na pobyt w terminach poza sezonem głównym."`,
                        effect: 'Część gości wróci szybciej, niż gdyby miała sama o Tobie pamiętać, a budujesz wrażenie, że „dbasz o stałych klientów", a nie tylko o nowych.'
                    },
                    {
                        title: 'Przykład praktyczny 2 – mały lokalny biznes usługowy',
                        description: `Firma oferująca usługi (np. gabinet fizjoterapii, studio treningowe, szkoła językowa) może:

• zbierać adresy email od klientów przy pierwszej wizycie,

• wysyłać:

• praktyczne porady (np. jak dbać o kręgosłup, jak przygotować dziecko do egzaminu),

• informacje o wolnych terminach,

• przypomnienia o sezonowych usługach.`,
                        effect: 'Dzięki temu klient nie musi sam śledzić profilu w social mediach, a wiadomości trafiają do skrzynki, którą i tak codziennie otwiera.'
                    }
                ],
                keyElements: [
                    {
                        title: 'Relewantna treść',
                        description: 'Wiadomość musi być dopasowana do odbiorcy',
                        points: [
                            'inaczej piszesz do rodziny z dziećmi',
                            'inaczej do pary szukającej weekendu tylko we dwoje'
                        ],
                        icon: 'target'
                    },
                    {
                        title: 'Personalizacja',
                        description: 'Nawet proste wstawienie imienia zwiększa szansę, że wiadomość zostanie przeczytana',
                        points: [
                            '„Panie Janie, mamy dla Pana…"'
                        ],
                        icon: 'relations'
                    },
                    {
                        title: 'Jasny cel',
                        description: 'Każdy email powinien mieć jedno główne zadanie',
                        points: [
                            'zachęcić do rezerwacji',
                            'przypomnieć o terminach',
                            'poinformować o nowości'
                        ],
                        icon: 'goal'
                    },
                    {
                        title: 'Wyraźne wezwanie do działania (CTA)',
                        description: 'Konkretne przykłady',
                        points: [
                            '„Kliknij tutaj, aby sprawdzić dostępne terminy"',
                            '„Odpowiedz na tego maila, jeśli chcesz zarezerwować pobyt w proponowanym terminie"'
                        ],
                        icon: 'cta'
                    },
                    {
                        title: 'Odpowiedni timing',
                        description: 'Wysyłanie w odpowiednim momencie',
                        points: [
                            'przypomnienie o ofercie przed długim weekendem',
                            'informacja o zimowym pakiecie na kilka tygodni przed feriami'
                        ],
                        icon: 'time'
                    }
                ],
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Co jest kluczowe w skutecznej kampanii emailowej?',
                        options: [
                            'Tylko atrakcyjny, kolorowy design',
                            'Relewantna treść, personalizacja i odpowiedni moment wysyłki',
                            'Wysyłanie jak najdłuższych wiadomości raz w roku',
                            'Wysyłanie tej samej wiadomości do wszystkich, niezależnie od potrzeb'
                        ],
                        correctAnswer: 1,
                        feedback: 'Dokładnie tak – skuteczna kampania emailowa wymaga relewantnej treści dopasowanej do odbiorcy, personalizacji oraz wysłania w odpowiednim momencie.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Która z poniższych wiadomości jest lepiej zaprojektowana dla byłych gości pensjonatu poza sezonem głównym?',
                        options: [
                            '„Zapraszamy do naszego pensjonatu. Mamy wolne pokoje."',
                            '„Dzień dobry, mamy promocję. Jak coś, proszę pisać."',
                            '„Dzień dobry Panie Tomaszu, dla Gości, którzy już u nas byli, przygotowaliśmy 10% rabatu na pobyt w listopadzie i grudniu (od niedzieli do piątku). Jeśli chce Pan sprawdzić dostępne terminy, proszę kliknąć w ten link lub odpowiedzieć na tego maila."',
                            '„Witam, wysyłamy informację o ofercie. Pozdrawiamy."'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – najlepsza wiadomość zawiera personalizację (imię), konkretną ofertę (10% rabatu, termin), jasne warunki (od niedzieli do piątku) i wyraźne wezwanie do działania (link lub odpowiedź).'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Które stwierdzenie najlepiej opisuje rolę listy mailingowej w małej firmie?',
                        options: [
                            'Lista mailingowa jest potrzebna tylko dużym sklepom internetowym.',
                            'Lista mailingowa to zbędny dodatek – wystarczą social media.',
                            'Lista mailingowa to baza kontaktów do osób, które wyraziły zgodę na komunikację i którym można regularnie przypominać o ofercie.',
                            'Lista mailingowa służy wyłącznie do wysyłania świątecznych życzeń.'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – lista mailingowa to baza kontaktów do osób, które wyraziły zgodę na komunikację i którym można regularnie przypominać o ofercie, co jest szczególnie wartościowe dla małych firm.'
                    },
                    {
                        id: 'q4',
                        type: 'choice',
                        question: 'Co z poniższego zazwyczaj NIE jest dobrym pomysłem w email marketingu?',
                        options: [
                            'Wysyłanie wiadomości bez jasnego celu i CTA',
                            'Segmentowanie listy (np. osobno rodziny, osobno klienci biznesowi)',
                            'Testowanie różnych tematów wiadomości (A/B testy)',
                            'Sprawdzanie statystyk otwarć i kliknięć po wysyłce'
                        ],
                        correctAnswer: 0,
                        feedback: 'Dokładnie tak – wysyłanie wiadomości bez jasnego celu i wyraźnego wezwania do działania (CTA) to zły pomysł, ponieważ zmniejsza szansę na zaangażowanie odbiorcy i osiągnięcie celu kampanii.'
                    }
                ]
            },
            {
                id: '5.2',
                moduleId: '5',
                title: 'Personalizacja i automatyzacja kampanii',
                intro: `Wysyłanie „jednego, tego samego maila do wszystkich" coraz rzadziej działa. Klienci dostają dziesiątki wiadomości dziennie – zwracają uwagę głównie na te, które są dla nich.

Personalizacja (dopasowanie treści do odbiorcy) i automatyzacja (wysyłka we właściwym momencie, bez ręcznego klikania) sprawiają, że email marketing zaczyna pracować jak dobrze ułożony system, a nie przypadkowe, pojedyncze wysyłki.`,
                whyImportant: [
                    {
                        title: 'Oszczędność czasu',
                        description: 'Najważniejsze wiadomości (powitalne, przypomnienia, podziękowania) mogą wysyłać się same według ustalonych zasad',
                        points: [],
                        icon: 'time'
                    },
                    {
                        title: 'Wyższe zaangażowanie',
                        description: 'Klient dostaje to, co jest dla niego sensowne (np. informacje przed przyjazdem, nie ogólny newsletter „dla wszystkich")',
                        points: [],
                        icon: 'relations'
                    },
                    {
                        title: 'Lepsze wyniki sprzedaży',
                        description: 'Przypomnienia, oferty dopasowane do terminu i kontekstu łatwiej zamieniają się na rezerwacje, wizyty, zapytania',
                        points: [],
                        icon: 'sales'
                    },
                    {
                        title: 'Bardziej profesjonalny wizerunek',
                        description: 'Komunikacja wygląda jak dobrze zaplanowany proces, a nie pojedyncze „strzały"',
                        points: [],
                        icon: 'visibility'
                    }
                ],
                practicalExamples: [
                    {
                        title: 'Jak może wyglądać personalizacja w praktyce',
                        description: `Przykład – mały hotel / pensjonat:

Zamiast ogólnego maila:

„Dzień dobry, zapraszamy do rezerwacji noclegu u nas."

bardziej spersonalizowana wiadomość do osoby, która już była gościem:

„Dzień dobry Pani Anno,

widzimy, że ostatni raz była Pani u nas zimą zeszłego roku.

Na nadchodzący sezon przygotowaliśmy pakiet Weekend dla dwojga z późnym wymeldowaniem i śniadaniem w cenie.

Jeśli chciałaby Pani sprawdzić dostępne terminy w listopadzie lub grudniu – proszę kliknąć w przycisk poniżej lub odpowiedzieć na tego maila."

Elementy personalizacji:

• imię („Pani Anno"),

• nawiązanie do historii („ostatni raz była Pani zimą"),

• dopasowana propozycja (weekendowy pakiet, a nie przypadkowa oferta),

• jasne CTA („kliknij" / „odpowiedz na maila").`,
                        effect: 'Personalizacja zwiększa zaangażowanie i szansę na konwersję, ponieważ wiadomość jest dopasowana do konkretnego odbiorcy i jego historii z firmą.'
                    }
                ],
                automationScenariosIntro: 'Nie trzeba od razu budować skomplikowanych lejków. W małej firmie już kilka prostych, dobrze ustawionych automatyzacji może zrobić dużą różnicę.',
                automationScenarios: [
                    {
                        id: 'auto-1',
                        title: 'Seria powitalna dla nowych kontaktów',
                        description: 'Każda osoba, która zapisała się na newsletter lub zostawiła maila w formularzu.',
                        icon: 'mail',
                        timeline: 'Dzień 0, 3-5, 7-10',
                        points: [
                            'Dzień 0 – mail powitalny: podziękowanie za zapis, krótka prezentacja obiektu/usługi',
                            'Dzień 3–5 – mail z konkretną wartością: np. „Jak najlepiej zaplanować weekend w [regionie] – 3 sprawdzone pomysły"',
                            'Dzień 7–10 – mail z pierwszą, delikatną propozycją: np. informacja o pakiecie z konkretnymi terminami'
                        ]
                    },
                    {
                        id: 'auto-2',
                        title: 'Mail przed przyjazdem / wizytą',
                        description: 'Wysyłany automatycznie np. 3–5 dni przed przyjazdem.',
                        icon: 'remind',
                        timeline: '3-5 dni przed',
                        points: [
                            'Przypomnienie terminu',
                            'Praktyczne informacje (parking, godziny zameldowania, dojazd)',
                            'Możliwość dopisania usług dodatkowych (np. śniadanie, późne wymeldowanie, dodatkowe łóżko)'
                        ]
                    },
                    {
                        id: 'auto-3',
                        title: 'Mail po pobycie / wykonaniu usługi',
                        description: 'Wysyłany 1–3 dni po zakończeniu pobytu/usługi.',
                        icon: 'relations',
                        timeline: '1-3 dni po',
                        points: [
                            'Podziękowanie',
                            'Prośba o opinię (np. link do Google / Booking)',
                            'Opcjonalnie: kod rabatowy na kolejny pobyt w mniej obłożonych terminach'
                        ]
                    },
                    {
                        id: 'auto-4',
                        title: 'Reaktywacja nieaktywnych klientów',
                        description: 'Do osób, które od dłuższego czasu nie otwierają maili / nie rezerwują.',
                        icon: 'traffic',
                        timeline: 'Po okresie nieaktywności',
                        points: [
                            'Przypomnienie o marce',
                            'Zaproszenie z konkretną korzyścią (np. tańszy pobyt w tygodniu)',
                            'Wyraźny CTA: „Jeśli nie chcesz otrzymywać takich wiadomości, możesz jednym kliknięciem się wypisać"'
                        ]
                    }
                ],
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Na czym polega automatyzacja w email marketingu?',
                        options: [
                            'Na wysyłaniu jak największej liczby maili ręcznie',
                            'Na ustawieniu reguł, które wywołują wysyłkę odpowiednich wiadomości w określonym momencie (np. po zapisie, przed przyjazdem)',
                            'Na kupowaniu gotowych list mailingowych',
                            'Na wysyłaniu tej samej wiadomości do wszystkich kontaktów'
                        ],
                        correctAnswer: 1,
                        feedback: 'Dokładnie tak – automatyzacja polega na ustawieniu reguł, które automatycznie wywołują wysyłkę odpowiednich wiadomości w określonych momentach, bez konieczności ręcznego działania.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Który przykład najlepiej pokazuje sensowną personalizację maila?',
                        options: [
                            '„Dzień dobry, zapraszamy wszystkich do skorzystania z naszej oferty."',
                            '„Witaj! Mamy promocję, szczegóły w załączniku."',
                            '„Dzień dobry Panie Marku, dziękujemy za Pana ostatni pobyt. Na najbliższe tygodnie przygotowaliśmy ofertę z rabatem dla stałych Gości. Jeśli chciałby Pan sprawdzić dostępność pokoi w listopadzie, proszę kliknąć w ten link."',
                            '„Szanowni Państwo, oferta ważna do odwołania."'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – najlepszy przykład zawiera personalizację (imię), nawiązanie do historii (ostatni pobyt), dopasowaną ofertę (rabat dla stałych Gości) i jasne wezwanie do działania (link).'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Jaka jest jedna z głównych korzyści automatyzacji kampanii emailowych w małej firmie?',
                        options: [
                            'Możliwość wysyłania maili bez zgody odbiorców',
                            'Brak potrzeby planowania treści',
                            'Oszczędność czasu przy zachowaniu regularnego kontaktu z klientami',
                            'Zastąpienie wszystkich innych kanałów marketingowych'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – automatyzacja pozwala oszczędzić czas przy jednoczesnym zachowaniu regularnego, zaplanowanego kontaktu z klientami, co jest szczególnie wartościowe dla małych firm z ograniczonymi zasobami.'
                    },
                    {
                        id: 'q4',
                        type: 'open',
                        question: 'Podaj jeden przykład wiadomości, którą w Twojej firmie można byłoby zautomatyzować (np. „mail przed przyjazdem z informacjami praktycznymi").',
                        keywords: [
                            'automatyzacja',
                            'mail',
                            'wiadomość',
                            'przed',
                            'po',
                            'powitalny',
                            'przypomnienie',
                            'podziękowanie',
                            'reaktywacja',
                            'przyjazd',
                            'wizyta',
                            'pobyt',
                            'usługa',
                            'rezerwacja',
                            'termin',
                            'informacje',
                            'praktyczne',
                            'parking',
                            'dojazd',
                            'zameldowanie',
                            'opinia',
                            'rabat',
                            'kod'
                        ],
                        hint: 'Pomyśl o sytuacjach w Twojej firmie, które powtarzają się regularnie i wymagają wysłania podobnej wiadomości – np. przed przyjazdem, po pobycie, przy zapisie na newsletter...',
                        feedback: 'Dziękuję za odpowiedź. Automatyzacja powtarzalnych wiadomości to świetny sposób na oszczędność czasu przy jednoczesnym utrzymaniu profesjonalnej komunikacji z klientami.'
                    }
                ]
            }
        ]
    },
    {
        id: '6',
        title: 'Analiza i optymalizacja',
        icon: 'analytics',
        lessons: [
            {
                id: '6.1',
                moduleId: '6',
                title: 'Narzędzia analityczne i ich zastosowanie',
                intro: `Narzędzia analityczne (takie jak Google Analytics, statystyki Meta, systemy raportowe z silnika rezerwacyjnego, narzędzia do email marketingu) pokazują, co naprawdę dzieje się z Twoim marketingiem:

kto wchodzi na stronę, skąd, co ogląda, w co klika, kiedy znika, a kiedy rezerwuje / dzwoni / pisze.

Bez tych danych decyzje podejmuje się „na wyczucie". Z danymi – możesz świadomie wzmacniać to, co działa, i odcinać to, co tylko generuje koszty.`,
                whyImportant: [
                    {
                        title: 'Widzenie źródeł zapytań i rezerwacji',
                        description: 'Z jakich źródeł faktycznie przychodzą zapytania i rezerwacje (Google, social media, polecenia, reklamy)',
                        points: [],
                        icon: 'analytics'
                    },
                    {
                        title: 'Ocena kampanii',
                        description: 'Które kampanie mają sens, a które tylko „zjadają budżet"',
                        points: [],
                        icon: 'target'
                    },
                    {
                        title: 'Analiza zachowań klientów',
                        description: 'Jak zachowują się klienci na stronie – które podstrony działają, a które trzeba poprawić',
                        points: [],
                        icon: 'data'
                    },
                    {
                        title: 'Lepsze planowanie budżetów',
                        description: 'Planowanie budżetów i sezonowość (np. jakie działania wzmacniać przed wysokim sezonem, a jakie wypełniają dołki obłożenia)',
                        points: [],
                        icon: 'organize'
                    },
                    {
                        title: 'Szybsze wychwytywanie problemów',
                        description: 'Np. nagły spadek ruchu, niedziałający formularz, kampanię z bardzo wysokim kosztem kliknięcia',
                        points: [],
                        icon: 'info'
                    }
                ],
                practicalExamples: [
                    {
                        title: 'Przykład 1 – Ruch na stronie www i strona ofertowa',
                        description: `Mały hotel w mieście turystycznym sprawdza w Google Analytics:

• ile osób miesięcznie odwiedza stronę,

• które podstrony są najczęściej oglądane (np. „Pokoje", „Cennik", „Kontakt"),

• jaki jest współczynnik wyjść ze strony ofertowej (czy ludzie po wejściu od razu zamykają kartę, czy idą dalej).`,
                        effect: 'Jeśli wiele osób wchodzi na stronę „Oferta / Pokoje", a mało przechodzi do „Rezerwacja / Kontakt", to sygnał, że treść oferty, zdjęcia lub przyciski „zadzwoń / zarezerwuj" wymagają poprawy.'
                    },
                    {
                        title: 'Przykład 2 – Skuteczność reklam w social media',
                        description: `Pensjonat uruchamia kampanię Meta Ads promującą pakiet weekendowy. Po tygodniu sprawdza w panelu reklamy:

• CTR (jaki procent osób po zobaczeniu reklamy klika),

• koszt kliknięcia (CPC),

• ile osób przeszło dalej do formularza kontaktowego,

• ile realnych zapytań / rezerwacji przyszło w tym okresie.`,
                        effect: 'Jeśli CTR jest wysoki, ale mało osób pyta o ofertę, to problem może być w stronie docelowej (treść, zdjęcia, brak jasnego telefonu / formularza).'
                    },
                    {
                        title: 'Przykład 3 – Email marketing i powroty Gości',
                        description: `Obiekt noclegowy wysyła kampanię emailową do swoich byłych gości z propozycją pobytu poza wysokim sezonem. Narzędzie do emaili pokazuje:

• ile osób otworzyło wiadomość (open rate),

• ile kliknęło w link („zobacz terminy", „napisz do nas"),

• ile finalnie zarezerwowało pobyt.`,
                        effect: 'Na tej podstawie można ocenić, czy temat wiadomości zachęca do otwarcia, czy oferta jest wystarczająco konkretna i czy warto powtórzyć podobną akcję w przyszłości.'
                    }
                ],
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Które narzędzie jest najczęściej używane do analizy ruchu na stronie internetowej?',
                        options: [
                            'Program do faktur',
                            'Google Analytics',
                            'Edytor zdjęć',
                            'Messenger'
                        ],
                        correctAnswer: 1,
                        feedback: 'Dokładnie tak – Google Analytics to najpopularniejsze i najczęściej używane narzędzie do analizy ruchu na stronie internetowej.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Co mierzy współczynnik konwersji strony docelowej (np. strony z ofertą)?',
                        options: [
                            'Średni czas ładowania strony',
                            'Odsetek osób, które weszły na stronę i od razu ją zamknęły',
                            'Odsetek odwiedzających, którzy wykonali pożądane działanie (np. wysłali formularz, kliknęli „Zadzwoń", dokonali rezerwacji)',
                            'Liczbę polubień profilu w social media'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – współczynnik konwersji mierzy odsetek odwiedzających, którzy wykonali pożądane działanie, takie jak wysłanie formularza, kliknięcie w przycisk „Zadzwoń" lub dokonanie rezerwacji.'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Co powinno być pierwszym krokiem przed analizą danych z narzędzi analitycznych?',
                        options: [
                            'Zwiększenie budżetu reklamowego',
                            'Zmiana wszystkich tekstów na stronie',
                            'Jasne określenie celu (np. więcej rezerwacji bezpośrednich, więcej zapytań z formularza)',
                            'Instalacja jednocześnie kilku różnych systemów analitycznych'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – przed analizą danych należy jasno określić cel, co pozwala na właściwą interpretację wskaźników i podejmowanie trafnych decyzji.'
                    },
                    {
                        id: 'q4',
                        type: 'choice',
                        question: 'Który z poniższych wskaźników jest najmniej przydatny sam w sobie, jeśli nie jest powiązany z celem biznesowym?',
                        options: [
                            'Liczba rezerwacji z formularza na stronie',
                            'Liczba polubień postu na Facebooku',
                            'Współczynnik konwersji strony „Oferta"',
                            'Liczba wysłanych zapytań w miesiącu'
                        ],
                        correctAnswer: 1,
                        feedback: 'Dokładnie tak – liczba polubień postu na Facebooku sama w sobie nie przekłada się bezpośrednio na cele biznesowe, takie jak rezerwacje czy zapytania, jeśli nie jest powiązana z konkretnymi działaniami.'
                    },
                    {
                        id: 'q5',
                        type: 'choice',
                        question: 'Co w praktyce oznacza wysoki CTR reklamy (dużo kliknięć) i jednocześnie wysoki koszt pozyskania rezerwacji?',
                        options: [
                            'Reklama słabo przyciąga uwagę, ale strona świetnie zamienia odwiedzających w klientów',
                            'Reklama przyciąga uwagę, ale oferta / strona docelowa nie przekonuje do rezerwacji',
                            'Wszystko działa idealnie i nie trzeba nic zmieniać',
                            'Należy natychmiast wyłączyć wszystkie kampanie'
                        ],
                        correctAnswer: 1,
                        feedback: 'Dokładnie tak – wysoki CTR oznacza, że reklama przyciąga uwagę, ale wysoki koszt pozyskania rezerwacji sugeruje, że oferta lub strona docelowa nie przekonuje odwiedzających do rezerwacji.'
                    },
                    {
                        id: 'q6',
                        type: 'choice',
                        question: 'Jak często mała firma powinna minimum przeglądać podstawowe raporty z działań marketingowych (ruch na stronie, kampanie, maile), aby sensownie reagować?',
                        options: [
                            'Raz na rok',
                            'Raz na pół roku',
                            'Przynajmniej raz w tygodniu (lub częściej w okresach intensywnych kampanii)',
                            'W ogóle nie trzeba, jeśli są włączone reklamy'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – regularne przeglądanie raportów (przynajmniej raz w tygodniu, a częściej w okresach intensywnych kampanii) pozwala na szybkie reagowanie i optymalizację działań marketingowych.'
                    }
                ]
            },
            {
                id: '6.2',
                moduleId: '6',
                title: 'Optymalizacja działań marketingowych i podejmowanie decyzji na podstawie danych',
                intro: `Optymalizacja działań marketingowych to nie jednorazowe „ustawienie kampanii", ale ciągły proces:

1. Zbierasz dane.

2. Sprawdzasz, co działa, a co nie.

3. Wprowadzasz zmiany.

4. Znowu mierzysz.

Z czasem zaczynasz widzieć proste schematy: co obniża koszt pozyskania klienta, co podnosi liczbę zapytań, a co jest tylko „szumem".`,
                whyImportant: [
                    {
                        title: 'Przestajesz zgadywać',
                        description: 'Dlaczego „coś nie działa"',
                        points: [],
                        icon: 'analytics'
                    },
                    {
                        title: 'Szybciej odkrywasz problemy',
                        description: 'Gdzie faktycznie „ucieka" klient (reklama, strona, formularz, komunikacja)',
                        points: [],
                        icon: 'info'
                    },
                    {
                        title: 'Inwestujesz tam, gdzie działa',
                        description: 'Budżet tam, gdzie realnie pojawiają się zapytania i rezerwacje',
                        points: [],
                        icon: 'target'
                    },
                    {
                        title: 'Traktujesz kampanie jak testy',
                        description: 'Z konkretnym wnioskiem na przyszłość, a nie losową próbą',
                        points: [],
                        icon: 'data'
                    }
                ],
                whyImportantFooter: `Najważniejsza zasada: patrzymy na dane, nie tylko na „intuicję".

Intuicja jest potrzebna do wymyślania rozwiązań, ale decyzję – zmieniamy / zostawiamy / wzmacniamy – warto podeprzeć liczbami.`,
                problemAnalyses: [
                    {
                        id: 'problem-1',
                        title: 'Przykład 1: Mało kliknięć w reklamę',
                        icon: 'traffic',
                        data: [
                            'Dużo wyświetleń reklamy',
                            'CTR (procent osób, które kliknęły) jest niski – np. 0,8%'
                        ],
                        interpretation: [
                            'Reklama jest słabo zauważalna (grafika nie przyciąga uwagi)',
                            'Tekst jest zbyt ogólny („Zapraszamy do naszego hotelu"), nic konkretnego nie obiecuje',
                            'Oferta nie jest dopasowana do grupy docelowej (np. reklama dla rodzin, a targetowanie ustawione na wszystkich 18–65)'
                        ],
                        solutions: [
                            'Zmiana grafiki na bardziej czytelną, z jednym prostym komunikatem (np. „Weekend SPA – pakiet 2 noce + śniadania")',
                            'Dodanie konkretu i korzyści w nagłówku (lokalizacja, cena od…, śniadanie w cenie)',
                            'Zawężenie grupy docelowej (np. osoby 28–55, w promieniu X km od miasta, zainteresowane podróżami / rodzinnym wypoczynkiem)'
                        ]
                    },
                    {
                        id: 'problem-2',
                        title: 'Przykład 2: Dużo kliknięć, mało zapytań',
                        icon: 'sales',
                        data: [
                            'CTR jest dobry – np. 3–4%',
                            'Na stronę wchodzi sporo osób, ale mało kto wysyła zapytanie / dzwoni'
                        ],
                        interpretation: [
                            'Reklama obiecuje więcej niż strona – klient „czegoś szuka", ale tego nie widzi',
                            'Na stronie brakuje jasnego wezwania do działania (numer telefonu, przycisk „Wyślij zapytanie")',
                            'Teksty są zbyt ogólne, brakuje odpowiedzi na proste pytania: „Za ile?", „Gdzie dokładnie?", „Co jest w cenie?"'
                        ],
                        solutions: [
                            'Dodanie dużego, widocznego przycisku „Zadzwoń teraz" / „Zapytaj o termin"',
                            'Pokazanie konkretów w pierwszym ekranie (np. „Nocleg ze śniadaniem od 260 zł / doba, parking i Wi-Fi w cenie")',
                            'Dodanie krótkiej sekcji FAQ z odpowiedziami na 3–4 najczęstsze pytania'
                        ]
                    },
                    {
                        id: 'problem-3',
                        title: 'Przykład 3: Ruch ze smartfonów, ale wysoki współczynnik odrzuceń',
                        icon: 'experience',
                        data: [
                            '70–80% wejść jest z telefonów',
                            'Duży współczynnik odrzuceń (wiele osób wchodzi i od razu wychodzi)',
                            'Średni czas na stronie – tylko kilka sekund'
                        ],
                        interpretation: [
                            'Strona jest niewygodna na telefonie (trzeba powiększać, przewijać w bok)',
                            'Numer telefonu nie jest klikalny',
                            'Formularz jest zbyt długi na małym ekranie'
                        ],
                        solutions: [
                            'Sprawdzenie strony na swoim telefonie tak, jak robi to klient (bez trybu „dewelopera")',
                            'Ułatwienie kontaktu: klikany numer, przycisk „Zadzwoń" widoczny od razu',
                            'Skrócenie formularza – na start wystarczy imię, email / telefon, planowany termin, liczba osób'
                        ]
                    },
                    {
                        id: 'problem-4',
                        title: 'Przykład 4: Działania w social media i „martwe" posty',
                        icon: 'social',
                        data: [
                            'Część postów ma prawie zerowy zasięg',
                            'Inne – wyraźnie większy zasięg i więcej reakcji'
                        ],
                        interpretation: [
                            'Algorytm lepiej promuje posty z konkretną wartością (porady, realne zdjęcia, kulisy pracy) niż same grafiki z tekstem „Rezerwuj"',
                            'Godzina publikacji ma znaczenie – inne wyniki w dzień, inne wieczorem'
                        ],
                        solutions: [
                            'Opieranie się na 2–3 typach postów, które historycznie osiągają lepsze wyniki (np. realne zdjęcia obiektu + krótkie historie gości)',
                            'Publikowanie w różnych godzinach, a potem sprawdzenie, kiedy zasięgi są najwyższe',
                            'Dodawanie konkretnego wezwania do działania: „Napisz w wiadomości «WEEKEND», wyślę dostępne terminy"'
                        ]
                    }
                ],
                decisionSteps: [
                    {
                        id: 'step-1',
                        step: 1,
                        title: 'Ustal cel',
                        description: 'Np. więcej zapytań z formularza, więcej telefonów, więcej rezerwacji z kampanii',
                        icon: 'target'
                    },
                    {
                        id: 'step-2',
                        step: 2,
                        title: 'Wybierz wskaźnik',
                        description: 'Który najlepiej ten cel opisuje (np. liczba wysłanych formularzy, CTR, współczynnik konwersji strony)',
                        icon: 'analytics'
                    },
                    {
                        id: 'step-3',
                        step: 3,
                        title: 'Porównaj dane',
                        description: 'Jak jest teraz? Jak było miesiąc temu? Jak wygląda to dla różnych kampanii / grup docelowych?',
                        icon: 'data'
                    },
                    {
                        id: 'step-4',
                        step: 4,
                        title: 'Postaw hipotezę',
                        description: '„CTR jest niski, bo grafika nie przyciąga uwagi" lub „Ludzie klikają, ale nie wysyłają formularza, bo nie widzą ceny"',
                        icon: 'info'
                    },
                    {
                        id: 'step-5',
                        step: 5,
                        title: 'Wprowadź jedną zmianę',
                        description: 'Na raz – wtedy wiesz, co zadziałało',
                        icon: 'organize'
                    },
                    {
                        id: 'step-6',
                        step: 6,
                        title: 'Zmierz ponownie i zdecyduj',
                        description: 'Po kilku dniach / tygodniu: wzmacniam (działa), poprawiam (wymaga kolejnej zmiany), wyłączam (nie ma sensu nadal wydawać budżetu)',
                        icon: 'analytics'
                    }
                ],
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Które podejście do optymalizacji działań marketingowych jest najbardziej sensowne dla małej firmy?',
                        options: [
                            'Zmieniam wszystko naraz, żeby „coś w końcu zadziałało"',
                            'Kieruję się głównie przeczuciem – danych nie ma sensu analizować',
                            'Ustalam cel, wybieram 1–2 kluczowe wskaźniki, wprowadzam pojedynczą zmianę i sprawdzam dane po kilku dniach',
                            'Uruchamiam kampanię i zostawiam ją bez zmian przez rok'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – systematyczne podejście z ustaleniem celu, wyborem kluczowych wskaźników i wprowadzaniem pojedynczych zmian pozwala na skuteczną optymalizację działań marketingowych.'
                    },
                    {
                        id: 'q2',
                        type: 'open',
                        question: 'Reklama Twojego obiektu wyświetliła się 2 000 razy, a użytkownicy kliknęli ją 60 razy. Jaki jest CTR (Click-Through Rate – współczynnik kliknięć) tej reklamy?',
                        isCalculation: true,
                        correctNumericAnswer: 3.0,
                        formula: 'CTR = (liczba kliknięć / liczba wyświetleń) × 100%',
                        calculationData: [
                            {
                                label: 'Liczba wyświetleń',
                                value: 2000
                            },
                            {
                                label: 'Liczba kliknięć',
                                value: 60
                            }
                        ],
                        hint: 'CTR = (60 / 2000) × 100% = ?',
                        feedback: 'Dokładnie tak – CTR = (60 / 2000) × 100% = 3,0%. To dobry wynik, który pokazuje, że reklama przyciąga uwagę odbiorców.'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Masz dwie kampanie na Facebooku, obie kierują na tę samą stronę. Budżet jest ograniczony. Co jest najbardziej rozsądnym krokiem?',
                        campaignData: [
                            {
                                name: 'Kampania A',
                                ctr: '1,0%',
                                costPerClick: '1,50 zł',
                                inquiries: '2 zapytania w tygodniu'
                            },
                            {
                                name: 'Kampania B',
                                ctr: '3,5%',
                                costPerClick: '0,90 zł',
                                inquiries: '7 zapytań w tygodniu'
                            }
                        ],
                        options: [
                            'Wyłączyć Kampanię B i zostawić tylko Kampanię A',
                            'Zostawić obie kampanie bez zmian',
                            'Przenieść większą część budżetu z Kampanii A do Kampanii B i dalej ją obserwować',
                            'Wyłączyć obie kampanie i wrócić tylko do postów organicznych'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – Kampania B ma lepsze wyniki (wyższy CTR, niższy koszt kliknięcia, więcej zapytań), więc przeniesienie budżetu z Kampanii A do Kampanii B jest najbardziej rozsądnym krokiem.'
                    },
                    {
                        id: 'q4',
                        type: 'choice',
                        question: 'Dlaczego przy optymalizacji strony / reklamy warto zmieniać jeden ważny element na raz (np. najpierw nagłówek, potem grafikę, potem grupę docelową)?',
                        options: [
                            'Żeby mieć więcej pracy',
                            'Dzięki temu możesz lepiej zrozumieć, która konkretna zmiana poprawiła wyniki',
                            'Bo narzędzia reklamowe nie pozwalają zmienić kilku elementów',
                            'Żeby dane w raportach wyglądały bardziej skomplikowanie'
                        ],
                        correctAnswer: 1,
                        feedback: 'Dokładnie tak – wprowadzanie jednej zmiany na raz pozwala na precyzyjne określenie, która konkretna zmiana wpłynęła na poprawę wyników, co ułatwia dalszą optymalizację.'
                    }
                ]
            },
            {
                id: '6.3',
                moduleId: '6',
                title: 'Praktyczne ćwiczenia i warsztaty',
                intro: `Ta część szkolenia ma przenieść wszystko z poziomu „rozumiem w teorii" na poziom „potrafię zastosować u siebie w firmie".

Pracujemy na realnych przykładach – najlepiej z Twojej działalności – i krok po kroku:

• porządkujemy to, co robisz w marketingu,

• wyciągamy wnioski z danych,

• projektujemy konkretne działania na najbliższe tygodnie.`,
                whyImportant: [
                    {
                        title: 'Prawdziwe zrozumienie',
                        description: 'Dopiero przy pracy na własnych przykładach pojawia się prawdziwe zrozumienie („aha, u mnie to działa tak…")',
                        points: [],
                        icon: 'understand'
                    },
                    {
                        title: 'Podejmowanie decyzji',
                        description: 'Konkretne ćwiczenia zmuszają do podjęcia pierwszych decyzji (co poprawić, co wyłączyć, w co zainwestować)',
                        points: [],
                        icon: 'target'
                    },
                    {
                        title: 'Plan działania',
                        description: 'Po warsztacie masz nie tylko „wiedzę z kursu", ale zarys planu działania dopasowanego do Twojej sytuacji',
                        points: [],
                        icon: 'goal'
                    }
                ],
                whyImportantFooter: 'Teoria bez praktyki ma ograniczoną wartość. Dopiero gdy przełożysz pojęcia na własne kanały, własnych klientów i własne liczby, podejmiesz pierwsze decyzje na bazie danych i zapiszesz konkretny plan na 30 dni, zaczyna się realna zmiana w biznesie. Ta część ma Ci w tym pomóc – w prostych, wykonalnych krokach.',
                quiz: [
                    {
                        id: 'exercise1',
                        type: 'multi-task',
                        question: 'Ćwiczenie 1: Mapa działań marketingowych „tu i teraz"',
                        subTasks: [
                            {
                                id: 'ex1-1',
                                title: '1. Lista kanałów',
                                description: 'Wypisz wszystkie kanały, z których REALNIE korzystasz (nawet jeśli nieregularnie)',
                                fieldType: 'text-multiple',
                                fieldOptions: {
                                    multipleFields: [
                                        {
                                            label: 'Kanał 1',
                                            placeholder: 'np. strona internetowa'
                                        },
                                        {
                                            label: 'Kanał 2',
                                            placeholder: 'np. Facebook / Instagram'
                                        },
                                        {
                                            label: 'Kanał 3',
                                            placeholder: 'np. Google Maps'
                                        },
                                        {
                                            label: 'Kanał 4',
                                            placeholder: 'np. płatne reklamy'
                                        },
                                        {
                                            label: 'Kanał 5',
                                            placeholder: 'np. działania offline'
                                        }
                                    ]
                                }
                            },
                            {
                                id: 'ex1-2',
                                title: '2. Kanał do rozwoju',
                                description: 'Wybierz 1 kanał, który zamierzasz rozwijać (ma potencjał i sens)',
                                fieldType: 'text',
                                fieldOptions: {
                                    placeholder: 'Wpisz nazwę kanału, który zamierzasz rozwijać...'
                                }
                            },
                            {
                                id: 'ex1-3',
                                title: '3. Kanał do ograniczenia',
                                description: 'Wybierz 1 kanał do ograniczenia / przetestowania inaczej',
                                fieldType: 'text',
                                fieldOptions: {
                                    placeholder: 'Wpisz nazwę kanału, który ograniczysz...'
                                }
                            },
                            {
                                id: 'ex1-4',
                                title: '4. Kanał do odłożenia',
                                description: 'Wybierz 1 kanał, którym przestajesz się przejmować w najbliższych 30 dniach',
                                fieldType: 'text',
                                fieldOptions: {
                                    placeholder: 'Wpisz nazwę kanału, który odkładasz...'
                                }
                            }
                        ]
                    },
                    {
                        id: 'exercise2',
                        type: 'multi-task',
                        question: 'Ćwiczenie 2: Analiza przykładowej kampanii – praca na liczbach',
                        subTasks: [
                            {
                                id: 'ex2-1',
                                title: '1. Wprowadź dane kampanii',
                                description: 'Jeśli masz już jakąkolwiek kampanię (Facebook/Instagram/Google) – wpisz swoje dane. Jeśli nie – możesz użyć przykładowych liczb.',
                                fieldType: 'text-multiple',
                                fieldOptions: {
                                    multipleFields: [
                                        {
                                            label: 'Liczba wyświetleń (Impressions)',
                                            placeholder: 'np. 5000'
                                        },
                                        {
                                            label: 'Liczba kliknięć (Clicks)',
                                            placeholder: 'np. 150'
                                        },
                                        {
                                            label: 'Budżet wydany (PLN)',
                                            placeholder: 'np. 300'
                                        },
                                        {
                                            label: 'Liczba zapytań/rezerwacji (Leads)',
                                            placeholder: 'np. 10'
                                        }
                                    ]
                                }
                            },
                            {
                                id: 'ex2-2',
                                title: '2. Ocena CTR',
                                description: 'Jak oceniasz CTR tej kampanii?',
                                fieldType: 'choice',
                                fieldOptions: {
                                    choices: [
                                        'Bardzo słaby',
                                        'Przeciętny',
                                        'Dobry / bardzo dobry'
                                    ]
                                }
                            },
                            {
                                id: 'ex2-3',
                                title: '3. Ocena kosztu kliknięcia (CPC)',
                                description: 'Jak oceniasz koszt kliknięcia (CPC) w kontekście Twojej branży i lokalizacji?',
                                fieldType: 'choice',
                                fieldOptions: {
                                    choices: [
                                        'Zdecydowanie za wysoki',
                                        'Akceptowalny',
                                        'Bardzo dobry'
                                    ]
                                }
                            },
                            {
                                id: 'ex2-4',
                                title: '4. Największy problem kampanii',
                                description: 'Co jest największym problemem tej kampanii?',
                                fieldType: 'choice',
                                fieldOptions: {
                                    choices: [
                                        'Ludzie nie klikają (słaba kreacja / komunikat)',
                                        'Ludzie klikają, ale nie ma zapytań (strona docelowa / oferta)',
                                        'Trudno powiedzieć – za mało danych'
                                    ]
                                }
                            },
                            {
                                id: 'ex2-5',
                                title: '5. Podsumowanie',
                                description: 'Podsumuj: co działa, a co wymaga poprawy?',
                                fieldType: 'textarea',
                                fieldOptions: {
                                    placeholder: 'Napisz krótkie podsumowanie...'
                                }
                            },
                            {
                                id: 'ex2-6',
                                title: '6. Jedna decyzja optymalizacyjna',
                                description: 'Wybierz jedno działanie, które wdrożysz jako pierwsze:',
                                fieldType: 'choice',
                                fieldOptions: {
                                    choices: [
                                        'Zmiana kreacji (grafika / tekst)',
                                        'Zmiana grupy docelowej',
                                        'Zmiana strony docelowej',
                                        'Zmiana budżetu / harmonogramu',
                                        'Wstrzymanie tej kampanii i test innej'
                                    ]
                                }
                            },
                            {
                                id: 'ex2-7',
                                title: '7. Uzasadnienie decyzji',
                                description: 'Dlaczego właśnie to działanie?',
                                fieldType: 'textarea',
                                fieldOptions: {
                                    placeholder: 'Krótko uzasadnij swoją decyzję...'
                                }
                            }
                        ]
                    },
                    {
                        id: 'exercise3',
                        type: 'multi-task',
                        question: 'Ćwiczenie 3: Szybki audyt strony docelowej',
                        subTasks: [
                            {
                                id: 'ex3-1',
                                title: '1. Adres strony docelowej',
                                description: 'Podaj adres strony, na którą kierujesz ruch z reklam (np. podstrona z ofertą)',
                                fieldType: 'url',
                                fieldOptions: {
                                    placeholder: 'https://...'
                                }
                            },
                            {
                                id: 'ex3-2',
                                title: '2. Checklista pierwszego ekranu',
                                description: 'Zaznacz, czy na pierwszym ekranie (bez przewijania) użytkownik widzi wyraźnie:',
                                fieldType: 'multichoice',
                                fieldOptions: {
                                    choices: [
                                        'Co dokładnie oferujesz',
                                        'Dla kogo jest oferta',
                                        'Jaki jest orientacyjny zakres / cena',
                                        'Co ma zrobić dalej (zadzwonić, wypełnić formularz, sprawdzić dostępność)'
                                    ]
                                }
                            },
                            {
                                id: 'ex3-3',
                                title: '3. Elementy ułatwiające kontakt',
                                description: 'Zaznacz elementy, które są obecne na stronie:',
                                fieldType: 'multichoice',
                                fieldOptions: {
                                    choices: [
                                        'Numer telefonu jest klikalny na telefonie',
                                        'Przycisk "Zadzwoń"/"Napisz" jest widoczny bez przewijania',
                                        'Formularz nie jest przesadnie długi',
                                        'Są podstawowe informacje: lokalizacja, godziny, parking (jeśli istotne)'
                                    ]
                                }
                            },
                            {
                                id: 'ex3-4',
                                title: '4. Zmiana 1',
                                description: 'Zapisz pierwszą konkretną zmianę, którą możesz wdrożyć w ciągu tygodnia',
                                fieldType: 'text',
                                fieldOptions: {
                                    placeholder: 'np. dodanie dużego przycisku "Zadzwoń teraz"'
                                }
                            },
                            {
                                id: 'ex3-5',
                                title: '5. Zmiana 2',
                                description: 'Zapisz drugą konkretną zmianę',
                                fieldType: 'text',
                                fieldOptions: {
                                    placeholder: 'np. skrócenie formularza'
                                }
                            },
                            {
                                id: 'ex3-6',
                                title: '6. Zmiana 3',
                                description: 'Zapisz trzecią konkretną zmianę',
                                fieldType: 'text',
                                fieldOptions: {
                                    placeholder: 'np. dopisanie 3 najczęstszych pytań i odpowiedzi'
                                }
                            },
                            {
                                id: 'ex3-7',
                                title: '7. Planowany termin wdrożenia',
                                description: 'Kiedy planujesz wdrożyć te zmiany? (wybierz konkretną datę)',
                                fieldType: 'date',
                                fieldOptions: {}
                            }
                        ]
                    },
                    {
                        id: 'exercise4',
                        type: 'multi-task',
                        question: 'Ćwiczenie 4: Plan optymalizacji na 30 dni',
                        subTasks: [
                            {
                                id: 'ex4-1',
                                title: '1. Wybór priorytetów',
                                description: 'Wybierz maksymalnie 3 priorytety (zaznacz wszystkie, które dotyczą Twojej sytuacji):',
                                fieldType: 'multichoice',
                                fieldOptions: {
                                    choices: [
                                        'Poprawa wyników jednej konkretnej kampanii',
                                        'Poprawa strony docelowej',
                                        'Uporządkowanie wizytówki Google (opinie, zdjęcia, opis)',
                                        'Poprawa komunikacji w social media (czas odpowiedzi, regularność)',
                                        'Inne (napisz poniżej)'
                                    ]
                                }
                            },
                            {
                                id: 'ex4-1-other',
                                title: 'Priorytet - Inne',
                                description: 'Jeśli wybrałeś "Inne", napisz swój priorytet:',
                                fieldType: 'text',
                                fieldOptions: {
                                    placeholder: 'Opisz swój priorytet...'
                                }
                            },
                            {
                                id: 'ex4-2',
                                title: 'Priorytet 1 - Konkretne działanie',
                                description: 'Co dokładnie zrobisz? (np. "zmieniam nagłówek i grafikę w kampanii X")',
                                fieldType: 'textarea',
                                fieldOptions: {
                                    placeholder: 'Opisz konkretne działanie...'
                                }
                            },
                            {
                                id: 'ex4-3',
                                title: 'Priorytet 1 - Jak zmierzysz?',
                                description: 'Jaki wskaźnik sprawdzisz za 30 dni? (np. CTR, liczba wiadomości, liczba telefonów)',
                                fieldType: 'text',
                                fieldOptions: {
                                    placeholder: 'np. wyższy CTR, więcej wiadomości...'
                                }
                            },
                            {
                                id: 'ex4-4',
                                title: 'Priorytet 1 - Planowany termin realizacji',
                                description: 'Kiedy planujesz wdrożyć to działanie? (wybierz datę)',
                                fieldType: 'date',
                                fieldOptions: {}
                            },
                            {
                                id: 'ex4-5',
                                title: 'Priorytet 2 - Konkretne działanie',
                                description: 'Jeśli masz drugi priorytet - co dokładnie zrobisz?',
                                fieldType: 'textarea',
                                fieldOptions: {
                                    placeholder: 'Opisz konkretne działanie (lub zostaw puste, jeśli masz tylko jeden priorytet)...'
                                }
                            },
                            {
                                id: 'ex4-6',
                                title: 'Priorytet 2 - Jak zmierzysz?',
                                description: 'Jaki wskaźnik sprawdzisz za 30 dni?',
                                fieldType: 'text',
                                fieldOptions: {
                                    placeholder: 'np. więcej zapytań...'
                                }
                            },
                            {
                                id: 'ex4-7',
                                title: 'Priorytet 2 - Planowany termin realizacji',
                                description: 'Kiedy planujesz wdrożyć to działanie? (wybierz datę)',
                                fieldType: 'date',
                                fieldOptions: {}
                            },
                            {
                                id: 'ex4-8',
                                title: 'Priorytet 3 - Konkretne działanie',
                                description: 'Jeśli masz trzeci priorytet - co dokładnie zrobisz?',
                                fieldType: 'textarea',
                                fieldOptions: {
                                    placeholder: 'Opisz konkretne działanie (lub zostaw puste, jeśli masz mniej niż 3 priorytety)...'
                                }
                            },
                            {
                                id: 'ex4-9',
                                title: 'Priorytet 3 - Jak zmierzysz?',
                                description: 'Jaki wskaźnik sprawdzisz za 30 dni?',
                                fieldType: 'text',
                                fieldOptions: {
                                    placeholder: 'np. więcej opinii...'
                                }
                            },
                            {
                                id: 'ex4-10',
                                title: 'Priorytet 3 - Planowany termin realizacji',
                                description: 'Kiedy planujesz wdrożyć to działanie? (wybierz datę)',
                                fieldType: 'date',
                                fieldOptions: {}
                            },
                            {
                                id: 'ex4-11',
                                title: 'Mały "commitment"',
                                description: 'Jednym zdaniem: Co jest dla Ciebie najważniejszym celem na najbliższe 30 dni w marketingu?',
                                fieldType: 'textarea',
                                fieldOptions: {
                                    placeholder: 'Napisz swój główny cel jednym zdaniem...'
                                }
                            }
                        ]
                    },
                    {
                        id: 'summary-q1',
                        type: 'open',
                        question: 'Jakie dwa konkretne działania optymalizacyjne wdrożysz w swojej firmie w ciągu najbliższych 30 dni? Napisz, co zrobisz i w jakim kanale (np. reklama, strona, social media).',
                        keywords: [
                            'działania',
                            'optymalizacja',
                            'plan',
                            'wdrożenie',
                            '30 dni',
                            'kanał',
                            'reklama',
                            'strona',
                            'social media'
                        ],
                        hint: 'Pomyśl o ćwiczeniach, które wykonałeś/aś – które z nich możesz zastosować w swojej firmie? Co konkretnie zrobisz i gdzie?',
                        feedback: 'Dobrze! Masz już konkretny plan działań. Pamiętaj, że najważniejsze to zacząć od małych, konkretnych kroków.'
                    },
                    {
                        id: 'summary-q2',
                        type: 'open',
                        question: 'Po czym poznasz, że te działania miały sens? Jakie liczby lub sygnały będą dla Ciebie dowodem, że idziesz w dobrą stronę?',
                        keywords: [
                            'pomiar',
                            'wskaźniki',
                            'efekty',
                            'liczby',
                            'sygnały',
                            'dowód',
                            'wyniki',
                            'metryki'
                        ],
                        hint: 'Pomyśl o konkretnych wskaźnikach, które możesz zmierzyć – np. liczba zapytań, CTR, koszt pozyskania klienta, liczba telefonów.',
                        feedback: 'Świetnie! Mierzenie efektów jest kluczowe. Wróć do tego planu za miesiąc i sprawdź, co udało Ci się zrealizować i jakie są efekty.'
                    }
                ]
            }
        ]
    }
];
const findLesson = (lessonId)=>{
    for (const module of trainingModules){
        const lesson = module.lessons.find((l)=>l.id === lessonId);
        if (lesson) return lesson;
    }
    return undefined;
};
const findModule = (moduleId)=>{
    return trainingModules.find((m)=>m.id === moduleId);
};
const getTotalLessons = ()=>{
    return trainingModules.reduce((total, module)=>total + module.lessons.length, 0);
};
const getNextLesson = (currentLessonId)=>{
    const allLessons = [];
    trainingModules.forEach((module)=>{
        allLessons.push(...module.lessons);
    });
    const currentIndex = allLessons.findIndex((l)=>l.id === currentLessonId);
    if (currentIndex === -1 || currentIndex === allLessons.length - 1) {
        return null;
    }
    return allLessons[currentIndex + 1];
};
const getPreviousLesson = (currentLessonId)=>{
    const allLessons = [];
    trainingModules.forEach((module)=>{
        allLessons.push(...module.lessons);
    });
    const currentIndex = allLessons.findIndex((l)=>l.id === currentLessonId);
    if (currentIndex <= 0) {
        return null;
    }
    return allLessons[currentIndex - 1];
};
}),
"[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertModal",
    ()=>AlertModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const AlertModal = ({ isOpen, title, message, buttonText = 'OK', onClose, type = 'info' })=>{
    if (!isOpen) return null;
    const typeStyles = {
        success: {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "w-8 h-8 text-green-400",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                }, void 0, false, {
                    fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
                    lineNumber: 26,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
                lineNumber: 25,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            border: 'border-green-500/50',
            bg: 'bg-green-500/10'
        },
        error: {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "w-8 h-8 text-red-400",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                }, void 0, false, {
                    fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
                    lineNumber: 35,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
                lineNumber: 34,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            border: 'border-red-500/50',
            bg: 'bg-red-500/10'
        },
        info: {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "w-8 h-8 text-blue-400",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                }, void 0, false, {
                    fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
                    lineNumber: 44,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
                lineNumber: 43,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            border: 'border-blue-500/50',
            bg: 'bg-blue-500/10'
        },
        warning: {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "w-8 h-8 text-yellow-400",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                }, void 0, false, {
                    fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
                    lineNumber: 53,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
                lineNumber: 52,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            border: 'border-yellow-500/50',
            bg: 'bg-yellow-500/10'
        }
    };
    const styles = typeStyles[type];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/70 backdrop-blur-sm",
                onClick: onClose
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `relative bg-gradient-to-br from-[#18232F] to-[#101820] rounded-2xl border-2 ${styles.border} shadow-2xl max-w-md w-full p-6 md:p-8 transform transition-all`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-4 mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-shrink-0",
                                children: styles.icon
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-[Montserrat] text-2xl font-bold text-white mb-2",
                                        children: title
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
                                        lineNumber: 78,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-300 leading-relaxed",
                                        children: message
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
                                        lineNumber: 81,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-end",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "px-6 py-3 bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#fee715]/40",
                            children: buttonText
                        }, void 0, false, {
                            fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
                            lineNumber: 88,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdminCoursesTab",
    ()=>AdminCoursesTab
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/app/hooks/useAuth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/lib/supabase-client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$config$2f$trainingModules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/config/trainingModules.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$AlertModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx [app-ssr] (ecmascript)");
// import { useNavigate } from 'react-router-dom'; // Not used in this component
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$LoadingState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Phone$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Phone.esm.js [app-ssr] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$User$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/User.esm.js [app-ssr] (ecmascript) <export default as User>");
;
;
;
;
;
;
;
;
const AdminCoursesTab = ()=>{
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    // const navigate = useNavigate(); // Not used
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [userProgress, setUserProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedUser, setSelectedUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedUserResponses, setSelectedUserResponses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedResponse, setSelectedResponse] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [feedback, setFeedback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [actionLoading, setActionLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [refreshing, setRefreshing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [quickApproving, setQuickApproving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [alertModal, setAlertModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        isOpen: false,
        title: '',
        message: '',
        type: 'info'
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (user) {
            loadUsers();
        }
    }, [
        user
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (selectedUser) {
            loadUserResponses(selectedUser);
        }
    }, [
        selectedUser
    ]);
    const loadUsers = async ()=>{
        if (!user) return;
        try {
            const { data: profiles, error: profilesError } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('profiles').select('id, full_name, company_name, first_name, last_name, phone, notes, created_at').order('created_at', {
                ascending: false
            });
            if (profilesError) {
                console.error('AdminPanel - błąd pobierania profiles:', profilesError);
                throw profilesError;
            }
            const usersWithEmail = await Promise.all((profiles || []).map(async (profile)=>{
                try {
                    const { data: emailData, error: emailError } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].rpc('get_user_email', {
                        user_id: profile.id
                    });
                    return {
                        ...profile,
                        email: emailError ? null : emailData || null
                    };
                } catch (err) {
                    return {
                        ...profile,
                        email: null
                    };
                }
            }));
            setUsers(usersWithEmail);
            const progressDataArray = [];
            for (const profile of usersWithEmail){
                const totalLessons = __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$config$2f$trainingModules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["trainingModules"].reduce((sum, m)=>sum + m.lessons.length, 0);
                const { data: certificateData } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('course_certificates').select('course_completed, course_ready_to_complete').eq('user_id', profile.id).maybeSingle();
                const isCourseCompleted = certificateData?.course_completed || false;
                const isReadyToComplete = certificateData?.course_ready_to_complete || false;
                const allLessonsCompleted = isCourseCompleted || isReadyToComplete;
                const { data: moduleProgressData } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('training_progress').select('*').eq('user_id', profile.id);
                const { data: responsesData } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('training_responses').select('*').eq('user_id', profile.id);
                let completedLessons = 0;
                const modules = [];
                __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$config$2f$trainingModules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["trainingModules"].forEach((module)=>{
                    const moduleProgress = moduleProgressData?.find((p)=>p.module_code === `modul_${module.id}`);
                    const moduleResponses = responsesData?.filter((r)=>r.module_code === `modul_${module.id}`) || [];
                    const completedInModule = module.lessons.filter((lesson)=>{
                        if (allLessonsCompleted) {
                            return true;
                        }
                        if (lesson.quiz.length === 0) {
                            return moduleProgressData?.some((p)=>p.module_code === `modul_${module.id}` && p.last_step_code === lesson.id) || false;
                        }
                        const allQuizCompleted = lesson.quiz.every((q)=>{
                            const response = moduleResponses.find((r)=>r.step_code === lesson.id && r.question_code === q.id);
                            if (!response) return false;
                            if (q.type === 'choice') {
                                const answerValue = Number(response.answer_text);
                                const isCorrect = answerValue === q.correctAnswer;
                                return isCorrect;
                            } else {
                                return response.status === 'approved';
                            }
                        });
                        return allQuizCompleted;
                    }).length;
                    completedLessons += completedInModule;
                    modules.push({
                        moduleId: module.id,
                        moduleTitle: module.title,
                        completed: moduleProgress?.module_completed || false,
                        percentage: module.lessons.length > 0 ? Math.round(completedInModule / module.lessons.length * 100) : 0
                    });
                });
                const percentage = totalLessons > 0 ? Math.round(completedLessons / totalLessons * 100) : 0;
                const lastResponse = responsesData?.sort((a, b)=>new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];
                const lastActivity = lastResponse?.created_at || profile.created_at;
                progressDataArray.push({
                    userId: profile.id,
                    userName: profile.full_name || profile.email?.split('@')[0] || 'Użytkownik',
                    userEmail: profile.email || '',
                    totalLessons,
                    completedLessons,
                    percentage,
                    lastActivity,
                    modules
                });
            }
            setUserProgress(progressDataArray);
            setLoading(false);
        } catch (error) {
            console.error('Błąd ładowania użytkowników:', error);
            setLoading(false);
        }
    };
    const loadUserResponses = async (userId)=>{
        try {
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('training_responses').select('*').eq('user_id', userId).order('created_at', {
                ascending: false
            });
            if (error) throw error;
            setSelectedUserResponses(data || []);
        } catch (error) {
            console.error('Błąd ładowania odpowiedzi:', error);
        }
    };
    const handleRefreshResponses = async ()=>{
        if (!selectedUser) return;
        setRefreshing(true);
        try {
            await loadUserResponses(selectedUser);
            setAlertModal({
                isOpen: true,
                title: 'Odświeżono',
                message: 'Lista odpowiedzi została zaktualizowana.',
                type: 'success'
            });
        } catch (error) {
            console.error('Błąd odświeżania odpowiedzi:', error);
            setAlertModal({
                isOpen: true,
                title: 'Błąd',
                message: 'Nie udało się odświeżyć odpowiedzi.',
                type: 'error'
            });
        } finally{
            setRefreshing(false);
        }
    };
    const handleQuickApprove = async (responseId, e)=>{
        e.stopPropagation();
        setQuickApproving(responseId);
        try {
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('training_responses').update({
                status: 'approved',
                admin_feedback: null,
                reviewed_by: user?.id,
                reviewed_at: new Date().toISOString()
            }).eq('id', responseId);
            if (error) throw error;
            setSelectedUserResponses((prev)=>prev.map((r)=>r.id === responseId ? {
                        ...r,
                        status: 'approved',
                        admin_feedback: null
                    } : r));
            if (selectedUser) {
                await loadUsers();
            }
            setAlertModal({
                isOpen: true,
                title: 'Zatwierdzono',
                message: 'Odpowiedź została szybko zatwierdzona.',
                type: 'success'
            });
        } catch (error) {
            console.error('Błąd szybkiego zatwierdzenia:', error);
            setAlertModal({
                isOpen: true,
                title: 'Błąd',
                message: 'Nie udało się zatwierdzić odpowiedzi.',
                type: 'error'
            });
        } finally{
            setQuickApproving(null);
        }
    };
    const handleReview = async (responseId, status)=>{
        if (!user) return;
        setActionLoading(true);
        try {
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('training_responses').update({
                status,
                admin_feedback: feedback || null,
                reviewed_by: user.id,
                reviewed_at: new Date().toISOString()
            }).eq('id', responseId);
            if (error) throw error;
            await loadUserResponses(selectedUser);
            await loadUsers();
            setSelectedResponse(null);
            setFeedback('');
            setAlertModal({
                isOpen: true,
                title: 'Sukces',
                message: status === 'approved' ? 'Odpowiedź została zatwierdzona.' : 'Odpowiedź została odrzucona.',
                type: 'success'
            });
        } catch (error) {
            console.error('Błąd weryfikacji odpowiedzi:', error);
            setAlertModal({
                isOpen: true,
                title: 'Błąd',
                message: 'Wystąpił błąd podczas weryfikacji odpowiedzi. Spróbuj ponownie.',
                type: 'error'
            });
        } finally{
            setActionLoading(false);
        }
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$LoadingState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoadingState"], {
            variant: "block",
            skeleton: "rows",
            label: "Ładowanie kursantów…"
        }, void 0, false, {
            fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
            lineNumber: 344,
            columnNumber: 12
        }, ("TURBOPACK compile-time value", void 0));
    }
    const currentUserProgress = userProgress.find((p)=>p.userId === selectedUser);
    const pendingResponses = selectedUserResponses.filter((r)=>r.status === 'pending');
    const selectedLesson = selectedResponse ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$config$2f$trainingModules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findLesson"])(selectedResponse.step_code) : null;
    const selectedQuestion = selectedLesson?.quiz.find((q)=>q.id === selectedResponse?.question_code);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid lg:grid-cols-3 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-1 space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-[Montserrat] text-2xl font-bold mb-4",
                                children: "Kursanci"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                lineNumber: 357,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            userProgress.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center text-gray-400 py-8 bg-white/5 rounded-xl",
                                children: "Brak kursantów"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                lineNumber: 359,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)) : userProgress.map((progress)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            onClick: ()=>setSelectedUser(selectedUser === progress.userId ? null : progress.userId),
                                            className: `bg-gradient-to-br from-white/5 to-white/3 rounded-xl p-4 border-2 cursor-pointer transition-all duration-300 ${selectedUser === progress.userId ? 'border-[#fee715] shadow-lg shadow-[#fee715]/20' : 'border-white/10 hover:border-white/20'}`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 min-w-0",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-300 truncate font-medium",
                                                            children: progress.userEmail
                                                        }, void 0, false, {
                                                            fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                            lineNumber: 375,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                        lineNumber: 374,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3 ml-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-20 bg-white/10 rounded-full h-2",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "bg-gradient-to-r from-[#fee715] to-[#00C9A7] h-2 rounded-full transition-all duration-300",
                                                                    style: {
                                                                        width: `${progress.percentage}%`
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                    lineNumber: 381,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                lineNumber: 380,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-right",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-lg font-bold text-[#fee715]",
                                                                    children: [
                                                                        progress.percentage,
                                                                        "%"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                    lineNumber: 387,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                lineNumber: 386,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: `w-5 h-5 text-gray-400 transition-transform duration-300 ${selectedUser === progress.userId ? 'rotate-180' : ''}`,
                                                                fill: "none",
                                                                stroke: "currentColor",
                                                                viewBox: "0 0 24 24",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round",
                                                                    strokeWidth: 2,
                                                                    d: "M19 9l-7 7-7-7"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                    lineNumber: 399,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                lineNumber: 391,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                        lineNumber: 379,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                lineNumber: 373,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                            lineNumber: 365,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        selectedUser === progress.userId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-3 bg-gradient-to-br from-white/5 to-white/3 rounded-xl p-6 border border-white/10 space-y-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-[Montserrat] font-bold text-white mb-3 text-lg",
                                                            children: progress.userName
                                                        }, void 0, false, {
                                                            fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                            lineNumber: 408,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        (()=>{
                                                            const userProfile = users.find((u)=>u.id === progress.userId);
                                                            return userProfile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "space-y-2 text-sm text-gray-300",
                                                                children: [
                                                                    userProfile.company_name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-gray-500",
                                                                                children: "🏢"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                                lineNumber: 417,
                                                                                columnNumber: 35
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                children: userProfile.company_name
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                                lineNumber: 418,
                                                                                columnNumber: 35
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                        lineNumber: 416,
                                                                        columnNumber: 33
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    userProfile.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Phone$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                                                size: 16,
                                                                                weight: "regular",
                                                                                className: "text-gray-500"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                                lineNumber: 423,
                                                                                columnNumber: 35
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                children: userProfile.phone
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                                lineNumber: 424,
                                                                                columnNumber: 35
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                        lineNumber: 422,
                                                                        columnNumber: 33
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    (userProfile.first_name || userProfile.last_name) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$User$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                                                size: 16,
                                                                                weight: "regular",
                                                                                className: "text-gray-500"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                                lineNumber: 429,
                                                                                columnNumber: 35
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                children: [
                                                                                    userProfile.first_name,
                                                                                    userProfile.last_name
                                                                                ].filter(Boolean).join(' ')
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                                lineNumber: 430,
                                                                                columnNumber: 35
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                        lineNumber: 428,
                                                                        columnNumber: 33
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                lineNumber: 414,
                                                                columnNumber: 29
                                                            }, ("TURBOPACK compile-time value", void 0));
                                                        })()
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                    lineNumber: 407,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "pt-3 border-t border-white/10",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between mb-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm text-gray-400",
                                                                    children: "Postęp ogólny"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                    lineNumber: 440,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm font-semibold text-white",
                                                                    children: [
                                                                        progress.completedLessons,
                                                                        "/",
                                                                        progress.totalLessons,
                                                                        " lekcji"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                    lineNumber: 441,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                            lineNumber: 439,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-full bg-white/10 rounded-full h-3 mb-4",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "bg-gradient-to-r from-[#fee715] to-[#00C9A7] h-3 rounded-full transition-all duration-300",
                                                                style: {
                                                                    width: `${progress.percentage}%`
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                lineNumber: 447,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                            lineNumber: 446,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-gray-500 mb-2",
                                                                    children: "Postęp w modułach:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                    lineNumber: 454,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                progress.modules.map((module)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center justify-between text-sm",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-gray-400",
                                                                                children: [
                                                                                    "Moduł ",
                                                                                    module.moduleId
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                                lineNumber: 457,
                                                                                columnNumber: 31
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center gap-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "w-24 bg-white/10 rounded-full h-2",
                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: `h-2 rounded-full transition-all duration-300 ${module.completed ? 'bg-gradient-to-r from-green-400 to-green-500' : 'bg-gradient-to-r from-[#fee715] to-[#00C9A7]'}`,
                                                                                            style: {
                                                                                                width: `${module.percentage}%`
                                                                                            }
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                                            lineNumber: 460,
                                                                                            columnNumber: 35
                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                                        lineNumber: 459,
                                                                                        columnNumber: 33
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: `font-semibold text-xs w-12 text-right ${module.completed ? 'text-green-400' : 'text-gray-400'}`,
                                                                                        children: [
                                                                                            module.percentage,
                                                                                            "%"
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                                        lineNumber: 469,
                                                                                        columnNumber: 33
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                                lineNumber: 458,
                                                                                columnNumber: 31
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, module.moduleId, true, {
                                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                        lineNumber: 456,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0)))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                            lineNumber: 453,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                    lineNumber: 438,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                pendingResponses.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "pt-3 border-t border-white/10",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 text-yellow-400 text-sm font-semibold",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "w-5 h-5",
                                                                fill: "none",
                                                                stroke: "currentColor",
                                                                viewBox: "0 0 24 24",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round",
                                                                    strokeWidth: 2,
                                                                    d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                    lineNumber: 484,
                                                                    columnNumber: 31
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                lineNumber: 483,
                                                                columnNumber: 29
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            pendingResponses.length,
                                                            " ",
                                                            pendingResponses.length === 1 ? 'odpowiedź oczekuje' : 'odpowiedzi oczekuje',
                                                            " na weryfikację"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                        lineNumber: 482,
                                                        columnNumber: 27
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                    lineNumber: 481,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                            lineNumber: 406,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, progress.userId, true, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                    lineNumber: 364,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                        lineNumber: 356,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-2 space-y-6",
                        children: !selectedUser ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white/5 rounded-xl p-12 text-center text-gray-400",
                            children: "Wybierz kursanta, aby zobaczyć szczegóły"
                        }, void 0, false, {
                            fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                            lineNumber: 500,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                currentUserProgress && (()=>{
                                    const userProfile = users.find((u)=>u.id === currentUserProgress.userId);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gradient-to-br from-white/5 to-white/3 rounded-xl p-6 border-2 border-white/10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-[Montserrat] text-xl font-bold text-white mb-4",
                                                children: [
                                                    "Postęp: ",
                                                    currentUserProgress.userName
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                lineNumber: 509,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            userProfile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-6 p-4 bg-white/5 rounded-lg border border-white/10",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "font-[Montserrat] font-semibold text-white mb-3",
                                                        children: "Dane kontaktowe"
                                                    }, void 0, false, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                        lineNumber: 515,
                                                        columnNumber: 27
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2 text-sm",
                                                        children: [
                                                            userProfile.company_name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 text-gray-300",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-500",
                                                                        children: "Firma:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                        lineNumber: 519,
                                                                        columnNumber: 33
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: userProfile.company_name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                        lineNumber: 520,
                                                                        columnNumber: 33
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                lineNumber: 518,
                                                                columnNumber: 31
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            (userProfile.first_name || userProfile.last_name) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 text-gray-300",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-500",
                                                                        children: "Imię i nazwisko:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                        lineNumber: 525,
                                                                        columnNumber: 33
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            userProfile.first_name,
                                                                            userProfile.last_name
                                                                        ].filter(Boolean).join(' ')
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                        lineNumber: 526,
                                                                        columnNumber: 33
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                lineNumber: 524,
                                                                columnNumber: 31
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            userProfile.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 text-gray-300",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-500",
                                                                        children: "Telefon:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                        lineNumber: 531,
                                                                        columnNumber: 33
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: userProfile.phone
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                        lineNumber: 532,
                                                                        columnNumber: 33
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                lineNumber: 530,
                                                                columnNumber: 31
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 text-gray-300",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-500",
                                                                        children: "Email:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                        lineNumber: 536,
                                                                        columnNumber: 31
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: currentUserProgress.userEmail
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                        lineNumber: 537,
                                                                        columnNumber: 31
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                lineNumber: 535,
                                                                columnNumber: 29
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            userProfile.notes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-3 pt-3 border-t border-white/10",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-gray-500 mb-1",
                                                                        children: "Notatki/Cele biznesowe:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                        lineNumber: 541,
                                                                        columnNumber: 33
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-gray-300 whitespace-pre-wrap",
                                                                        children: userProfile.notes
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                        lineNumber: 542,
                                                                        columnNumber: 33
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                lineNumber: 540,
                                                                columnNumber: 31
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                        lineNumber: 516,
                                                        columnNumber: 27
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                lineNumber: 514,
                                                columnNumber: 25
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid md:grid-cols-2 gap-4 mb-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-gray-400 mb-1",
                                                                children: "Ukończone lekcje"
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                lineNumber: 551,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-2xl font-bold text-white",
                                                                children: [
                                                                    currentUserProgress.completedLessons,
                                                                    "/",
                                                                    currentUserProgress.totalLessons
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                lineNumber: 552,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                        lineNumber: 550,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-gray-400 mb-1",
                                                                children: "Postęp ogólny"
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                lineNumber: 557,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-2xl font-bold text-[#fee715]",
                                                                children: [
                                                                    currentUserProgress.percentage,
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                lineNumber: 558,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                        lineNumber: 556,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                lineNumber: 549,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            currentUserProgress.percentage === 100 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-6 pt-6 border-t border-white/10",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: async ()=>{
                                                            if (!selectedUser) return;
                                                            if (!confirm('Czy na pewno chcesz oznaczyć kurs jako gotowy do zakończenia? Użytkownik zobaczy ekran końcowy z formularzem certyfikatu.')) return;
                                                            try {
                                                                setActionLoading(true);
                                                                const { data: existingCert } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('course_certificates').select('id').eq('user_id', selectedUser).maybeSingle();
                                                                if (!existingCert) {
                                                                    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('course_certificates').insert({
                                                                        user_id: selectedUser,
                                                                        full_name: '',
                                                                        company_name: '',
                                                                        email: currentUserProgress.userEmail,
                                                                        course_ready_to_complete: true
                                                                    });
                                                                    if (error) throw error;
                                                                } else {
                                                                    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('course_certificates').update({
                                                                        course_ready_to_complete: true
                                                                    }).eq('user_id', selectedUser);
                                                                    if (error) throw error;
                                                                }
                                                                setAlertModal({
                                                                    isOpen: true,
                                                                    title: 'Sukces',
                                                                    message: 'Kurs został oznaczony jako gotowy do zakończenia. Użytkownik zobaczy ekran końcowy z formularzem certyfikatu.',
                                                                    type: 'success'
                                                                });
                                                            } catch (error) {
                                                                console.error('Błąd oznaczania kursu:', error);
                                                                setAlertModal({
                                                                    isOpen: true,
                                                                    title: 'Błąd',
                                                                    message: 'Wystąpił błąd podczas oznaczania kursu: ' + (error.message || 'Nieznany błąd'),
                                                                    type: 'error'
                                                                });
                                                            } finally{
                                                                setActionLoading(false);
                                                            }
                                                        },
                                                        disabled: actionLoading,
                                                        className: "w-full bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold py-3 px-6 rounded-xl hover:shadow-2xl hover:shadow-[#fee715]/40 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "w-5 h-5",
                                                                fill: "none",
                                                                stroke: "currentColor",
                                                                viewBox: "0 0 24 24",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round",
                                                                    strokeWidth: 2,
                                                                    d: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                    lineNumber: 625,
                                                                    columnNumber: 31
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                lineNumber: 624,
                                                                columnNumber: 29
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            actionLoading ? 'Oznaczanie...' : 'Zakończ Szkolenie'
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                        lineNumber: 566,
                                                        columnNumber: 27
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-gray-400 mt-2 text-center",
                                                        children: "Oznaczy kurs jako gotowy do zakończenia. Użytkownik zobaczy ekran końcowy z formularzem certyfikatu."
                                                    }, void 0, false, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                        lineNumber: 629,
                                                        columnNumber: 27
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                lineNumber: 565,
                                                columnNumber: 25
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                        lineNumber: 508,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0));
                                })(),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-[Montserrat] text-xl font-bold text-white",
                                                    children: [
                                                        "Odpowiedzi (",
                                                        selectedUserResponses.length,
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                    lineNumber: 640,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: handleRefreshResponses,
                                                    disabled: refreshing,
                                                    className: "flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-gray-300 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: `w-4 h-4 ${refreshing ? 'animate-spin' : ''}`,
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                lineNumber: 654,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                            lineNumber: 648,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        refreshing ? 'Odświeżanie...' : 'Odśwież'
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                    lineNumber: 643,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                            lineNumber: 639,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-4",
                                            children: selectedUserResponses.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-white/5 rounded-xl p-8 text-center text-gray-400",
                                                children: "Brak odpowiedzi"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                lineNumber: 661,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)) : selectedUserResponses.map((response)=>{
                                                const lesson = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$config$2f$trainingModules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findLesson"])(response.step_code);
                                                const question = lesson?.quiz.find((q)=>q.id === response.question_code);
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    onClick: ()=>setSelectedResponse(response),
                                                    className: `bg-gradient-to-br from-white/5 to-white/3 rounded-xl p-6 border-2 cursor-pointer transition-all duration-300 relative ${selectedResponse?.id === response.id ? 'border-[#fee715] shadow-lg shadow-[#fee715]/20' : 'border-white/10 hover:border-white/20'}`,
                                                    children: [
                                                        response.status === 'pending' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: (e)=>handleQuickApprove(response.id, e),
                                                            disabled: quickApproving === response.id,
                                                            className: "absolute top-4 right-4 p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-300 hover:text-green-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-10",
                                                            title: "Szybkie zatwierdzenie",
                                                            children: quickApproving === response.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "w-5 h-5 animate-spin",
                                                                fill: "none",
                                                                stroke: "currentColor",
                                                                viewBox: "0 0 24 24",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round",
                                                                    strokeWidth: 2,
                                                                    d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                    lineNumber: 688,
                                                                    columnNumber: 37
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                lineNumber: 687,
                                                                columnNumber: 35
                                                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "w-5 h-5",
                                                                fill: "none",
                                                                stroke: "currentColor",
                                                                viewBox: "0 0 24 24",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round",
                                                                    strokeWidth: 2,
                                                                    d: "M5 13l4 4L19 7"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                    lineNumber: 692,
                                                                    columnNumber: 37
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                lineNumber: 691,
                                                                columnNumber: 35
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                            lineNumber: 680,
                                                            columnNumber: 31
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-start justify-between mb-3 pr-12",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-2 mb-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "px-3 py-1 rounded-lg bg-white/10 text-xs font-semibold",
                                                                                children: [
                                                                                    response.module_code.replace('modul_', 'Moduł '),
                                                                                    " • ",
                                                                                    response.step_code
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                                lineNumber: 700,
                                                                                columnNumber: 35
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: `px-3 py-1 rounded-lg text-xs font-semibold ${response.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/50' : response.status === 'approved' ? 'bg-green-500/20 text-green-300 border border-green-500/50' : 'bg-red-500/20 text-red-300 border border-red-500/50'}`,
                                                                                children: response.status === 'pending' ? 'Oczekuje' : response.status === 'approved' ? 'Zatwierdzona' : 'Odrzucona'
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                                lineNumber: 703,
                                                                                columnNumber: 35
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                        lineNumber: 699,
                                                                        columnNumber: 33
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                        className: "font-[Montserrat] font-bold text-white mb-2",
                                                                        children: question?.question || 'Pytanie'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                        lineNumber: 713,
                                                                        columnNumber: 33
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "bg-white/5 rounded-lg p-3",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-gray-300 text-sm line-clamp-2",
                                                                            children: response.answer_text
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                            lineNumber: 717,
                                                                            columnNumber: 35
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                        lineNumber: 716,
                                                                        columnNumber: 33
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                lineNumber: 698,
                                                                columnNumber: 31
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                            lineNumber: 697,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        response.admin_feedback && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-blue-200",
                                                                children: [
                                                                    "Feedback: ",
                                                                    response.admin_feedback
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                                lineNumber: 725,
                                                                columnNumber: 33
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                            lineNumber: 724,
                                                            columnNumber: 31
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, response.id, true, {
                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                    lineNumber: 670,
                                                    columnNumber: 27
                                                }, ("TURBOPACK compile-time value", void 0));
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                            lineNumber: 659,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                    lineNumber: 638,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                        lineNumber: 498,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                lineNumber: 354,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            selectedResponse && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-black/70 backdrop-blur-sm",
                        onClick: ()=>setSelectedResponse(null)
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                        lineNumber: 742,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative bg-gradient-to-br from-[#18232F] to-[#101820] rounded-2xl p-6 border-2 border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-[Montserrat] text-2xl font-bold text-white mb-6",
                                children: "Weryfikacja odpowiedzi"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                lineNumber: 744,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4 mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-300 mb-2",
                                                children: "Pytanie"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                lineNumber: 750,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-white bg-white/5 rounded-lg p-3",
                                                children: selectedQuestion?.question || 'Brak pytania'
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                lineNumber: 751,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                        lineNumber: 749,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-300 mb-2",
                                                children: "Odpowiedź"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                lineNumber: 757,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-white/5 rounded-lg p-4 max-h-48 overflow-y-auto",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-200 whitespace-pre-wrap",
                                                    children: selectedResponse.answer_text
                                                }, void 0, false, {
                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                    lineNumber: 759,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                lineNumber: 758,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                        lineNumber: 756,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-300 mb-2",
                                                children: "Feedback (opcjonalnie)"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                lineNumber: 764,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                value: feedback,
                                                onChange: (e)=>setFeedback(e.target.value),
                                                placeholder: "Dodaj komentarz dla kursanta...",
                                                className: "w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-[#fee715] min-h-[100px]"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                                lineNumber: 767,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                        lineNumber: 763,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                lineNumber: 748,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleReview(selectedResponse.id, 'approved'),
                                        disabled: actionLoading,
                                        className: "flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white font-[Montserrat] font-bold py-3 px-4 rounded-xl hover:shadow-lg hover:shadow-green-500/40 transition-all duration-300 disabled:opacity-50",
                                        children: "Zatwierdź"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                        lineNumber: 777,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleReview(selectedResponse.id, 'rejected'),
                                        disabled: actionLoading,
                                        className: "flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white font-[Montserrat] font-bold py-3 px-4 rounded-xl hover:shadow-lg hover:shadow-red-500/40 transition-all duration-300 disabled:opacity-50",
                                        children: "Odrzuć"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                        lineNumber: 784,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setSelectedResponse(null);
                                            setFeedback('');
                                        },
                                        className: "px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-[Montserrat] font-semibold rounded-xl transition-all duration-300",
                                        children: "Zamknij"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                        lineNumber: 791,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                                lineNumber: 776,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                        lineNumber: 743,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                lineNumber: 741,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$AlertModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertModal"], {
                isOpen: alertModal.isOpen,
                title: alertModal.title,
                message: alertModal.message,
                type: alertModal.type,
                onClose: ()=>setAlertModal((prev)=>({
                            ...prev,
                            isOpen: false
                        }))
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
                lineNumber: 805,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx",
        lineNumber: 353,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/strony_www/drozniak-landingpage/components/ConfirmModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConfirmModal",
    ()=>ConfirmModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const ConfirmModal = ({ isOpen, title, message, confirmText = 'Potwierdź', cancelText = 'Anuluj', onConfirm, onCancel, type = 'warning' })=>{
    if (!isOpen) return null;
    const typeStyles = {
        warning: {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "w-8 h-8 text-yellow-400",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                }, void 0, false, {
                    fileName: "[project]/strony_www/drozniak-landingpage/components/ConfirmModal.tsx",
                    lineNumber: 30,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/ConfirmModal.tsx",
                lineNumber: 29,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            confirmBg: 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700'
        },
        danger: {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "w-8 h-8 text-red-400",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                }, void 0, false, {
                    fileName: "[project]/strony_www/drozniak-landingpage/components/ConfirmModal.tsx",
                    lineNumber: 38,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/ConfirmModal.tsx",
                lineNumber: 37,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            confirmBg: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
        },
        info: {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "w-8 h-8 text-blue-400",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                }, void 0, false, {
                    fileName: "[project]/strony_www/drozniak-landingpage/components/ConfirmModal.tsx",
                    lineNumber: 46,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/ConfirmModal.tsx",
                lineNumber: 45,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            confirmBg: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
        }
    };
    const styles = typeStyles[type];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/70 backdrop-blur-sm",
                onClick: onCancel
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/ConfirmModal.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative bg-gradient-to-br from-[#18232F] to-[#101820] rounded-2xl border-2 border-white/10 shadow-2xl max-w-md w-full p-6 md:p-8 transform transition-all",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-4 mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-shrink-0",
                                children: styles.icon
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/ConfirmModal.tsx",
                                lineNumber: 66,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-[Montserrat] text-2xl font-bold text-white mb-2",
                                        children: title
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/ConfirmModal.tsx",
                                        lineNumber: 70,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-300 leading-relaxed",
                                        children: message
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/ConfirmModal.tsx",
                                        lineNumber: 73,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/ConfirmModal.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/ConfirmModal.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3 justify-end",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onCancel,
                                className: "px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-[Montserrat] font-semibold rounded-xl transition-all duration-300 border border-white/20",
                                children: cancelText
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/ConfirmModal.tsx",
                                lineNumber: 80,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onConfirm,
                                className: `px-6 py-3 text-white font-[Montserrat] font-bold rounded-xl transition-all duration-300 shadow-lg ${styles.confirmBg}`,
                                children: confirmText
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/ConfirmModal.tsx",
                                lineNumber: 86,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/ConfirmModal.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/ConfirmModal.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/strony_www/drozniak-landingpage/components/ConfirmModal.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/strony_www/drozniak-landingpage/components/CustomSelect.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CustomSelect",
    ()=>CustomSelect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
const CustomSelect = ({ value, onChange, options, placeholder = 'Wybierz opcję', className = '', size = 'default' })=>{
    const isSm = size === 'sm';
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dropdownStyle, setDropdownStyle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const selectRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const buttonRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const selectedOption = options.find((opt)=>opt.value === value);
    // Oblicz pozycję dropdowna gdy jest otwarty (używamy fixed positioning, żeby był nad wszystkimi elementami)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isOpen || !buttonRef.current || !dropdownRef.current) return;
        const updatePosition = ()=>{
            const buttonRect = buttonRef.current?.getBoundingClientRect();
            const dropdownRect = dropdownRef.current?.getBoundingClientRect();
            if (!buttonRect || !dropdownRect) return;
            const margin = 8;
            const minLeft = 12;
            const maxLeft = window.innerWidth - dropdownRect.width - 12;
            // Domyślnie pod przyciskiem
            let top = buttonRect.bottom + margin;
            // Jeśli brakuje miejsca na dole, pokaż nad przyciskiem
            if (top + dropdownRect.height > window.innerHeight - 12) {
                top = buttonRect.top - dropdownRect.height - margin;
            }
            // Clamp do viewportu
            top = Math.max(12, Math.min(top, window.innerHeight - dropdownRect.height - 12));
            let left = buttonRect.left;
            left = Math.max(minLeft, Math.min(left, maxLeft));
            setDropdownStyle({
                position: 'fixed',
                zIndex: 99999,
                top: `${top}px`,
                left: `${left}px`,
                width: `${buttonRect.width}px`
            });
        };
        // Po pierwszym renderze dropdowna złap jego wymiary
        const raf = requestAnimationFrame(updatePosition);
        window.addEventListener('scroll', updatePosition, true);
        window.addEventListener('resize', updatePosition);
        return ()=>{
            cancelAnimationFrame(raf);
            window.removeEventListener('scroll', updatePosition, true);
            window.removeEventListener('resize', updatePosition);
        };
    }, [
        isOpen
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleClickOutside = (event)=>{
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return ()=>{
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [
        isOpen
    ]);
    const handleSelect = (optionValue)=>{
        onChange(optionValue);
        setIsOpen(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: selectRef,
        className: `relative ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                ref: buttonRef,
                type: "button",
                onClick: ()=>setIsOpen(!isOpen),
                className: `w-full bg-white/[0.04] border text-white focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 transition-all flex items-center justify-between ${isOpen ? 'border-[#fee715]/50' : 'border-white/10 hover:border-white/20'} ${isSm ? 'px-3 py-1.5 rounded text-sm' : 'px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#fee715]/50'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: selectedOption ? 'text-white' : 'text-gray-400',
                        children: selectedOption ? selectedOption.label : placeholder
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/CustomSelect.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: `text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${isSm ? 'w-4 h-4' : 'w-5 h-5'}`,
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M19 9l-7 7-7-7"
                        }, void 0, false, {
                            fileName: "[project]/strony_www/drozniak-landingpage/components/CustomSelect.tsx",
                            lineNumber: 120,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/CustomSelect.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/CustomSelect.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: dropdownRef,
                style: dropdownStyle,
                className: `bg-[#101820] border border-white/15 overflow-hidden ${isSm ? 'rounded shadow-lg' : 'rounded-lg shadow-xl'}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-h-48 overflow-y-auto",
                    children: options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>handleSelect(option.value),
                            className: `w-full text-left transition-colors ${value === option.value ? 'bg-[#fee715]/10 text-[#fee715]' : 'text-gray-300 hover:bg-white/5 hover:text-white'} ${isSm ? 'px-3 py-2 text-sm' : 'px-4 py-3'}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: option.label
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/CustomSelect.tsx",
                                        lineNumber: 143,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    value === option.value && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: `text-[#fee715] flex-shrink-0 ${isSm ? 'w-4 h-4' : 'w-5 h-5'}`,
                                        fill: "currentColor",
                                        viewBox: "0 0 20 20",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            fillRule: "evenodd",
                                            d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                                            clipRule: "evenodd"
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/components/CustomSelect.tsx",
                                            lineNumber: 146,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/CustomSelect.tsx",
                                        lineNumber: 145,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/CustomSelect.tsx",
                                lineNumber: 142,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        }, option.value, false, {
                            fileName: "[project]/strony_www/drozniak-landingpage/components/CustomSelect.tsx",
                            lineNumber: 132,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)))
                }, void 0, false, {
                    fileName: "[project]/strony_www/drozniak-landingpage/components/CustomSelect.tsx",
                    lineNumber: 130,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/CustomSelect.tsx",
                lineNumber: 125,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/strony_www/drozniak-landingpage/components/CustomSelect.tsx",
        lineNumber: 102,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FunnelList",
    ()=>FunnelList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/app/hooks/useAuth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/lib/supabase-client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$AlertModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$ConfirmModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/ConfirmModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CustomSelect$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/CustomSelect.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$LoadingState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
const FunnelList = ()=>{
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [funnels, setFunnels] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showAddModal, setShowAddModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showEditModal, setShowEditModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingFunnel, setEditingFunnel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [newFunnelName, setNewFunnelName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedClientId, setSelectedClientId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedStatus, setSelectedStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('draft');
    const [clients, setClients] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [filterStatus, setFilterStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('all');
    const [alertModal, setAlertModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        isOpen: false,
        title: '',
        message: '',
        type: 'info'
    });
    const [confirmModal, setConfirmModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: ()=>{}
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (user) {
            loadFunnels();
            loadClients();
        }
    }, [
        user,
        filterStatus
    ]);
    const loadClients = async ()=>{
        try {
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('marketing_clients').select('id, name, company_name').eq('status', 'active').order('name', {
                ascending: true
            });
            if (error) throw error;
            setClients(data || []);
        } catch (error) {
            console.error('Błąd ładowania klientów:', error);
        }
    };
    const loadFunnels = async ()=>{
        try {
            setLoading(true);
            let query = __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('funnel_diagrams').select(`
          *,
          client:marketing_clients(id, name, company_name)
        `).order('updated_at', {
                ascending: false
            });
            if (filterStatus !== 'all') {
                query = query.eq('status', filterStatus);
            }
            const { data, error } = await query;
            if (error) throw error;
            setFunnels((data || []).map((funnel)=>({
                    ...funnel,
                    client: Array.isArray(funnel.client) ? funnel.client[0] : funnel.client
                })));
        } catch (error) {
            console.error('Błąd ładowania lejków:', error);
            setAlertModal({
                isOpen: true,
                title: 'Błąd',
                message: 'Nie udało się załadować lejków: ' + (error.message || 'Nieznany błąd'),
                type: 'error'
            });
        } finally{
            setLoading(false);
        }
    };
    const handleCreateFunnel = async ()=>{
        if (!user || !newFunnelName.trim()) {
            setAlertModal({
                isOpen: true,
                title: 'Błąd',
                message: 'Nazwa projektu jest wymagana.',
                type: 'error'
            });
            return;
        }
        try {
            const initialDiagramData = {
                nodes: [],
                edges: [],
                viewport: {
                    x: 0,
                    y: 0,
                    zoom: 1
                }
            };
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('funnel_diagrams').insert({
                project_name: newFunnelName.trim(),
                client_id: selectedClientId || null,
                created_by: user.id,
                diagram_data: initialDiagramData,
                status: 'draft'
            }).select().single();
            if (error) throw error;
            // Jeśli ustawiono client_id, utwórz wpis w funnel_access
            if (selectedClientId && user) {
                const { error: accessError } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('funnel_access').insert({
                    funnel_id: data.id,
                    client_id: selectedClientId,
                    access_level: 'view',
                    granted_by: user.id
                });
                if (accessError) {
                    console.warn('Błąd tworzenia wpisu w funnel_access:', accessError);
                // Nie blokujemy - lejek został utworzony
                }
            }
            setAlertModal({
                isOpen: true,
                title: 'Sukces',
                message: 'Lejek został utworzony.',
                type: 'success'
            });
            setShowAddModal(false);
            setNewFunnelName('');
            setSelectedClientId(null);
            router.push(`/admin/marketing/${data.id}`);
        } catch (error) {
            console.error('Błąd tworzenia lejka:', error);
            setAlertModal({
                isOpen: true,
                title: 'Błąd',
                message: 'Nie udało się utworzyć lejka: ' + (error.message || 'Nieznany błąd'),
                type: 'error'
            });
        }
    };
    const handleDeleteFunnel = (funnelId)=>{
        setConfirmModal({
            isOpen: true,
            title: 'Potwierdź usunięcie',
            message: 'Czy na pewno chcesz usunąć ten lejek? Ta operacja jest nieodwracalna.',
            onConfirm: async ()=>{
                setConfirmModal({
                    ...confirmModal,
                    isOpen: false
                });
                try {
                    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('funnel_diagrams').delete().eq('id', funnelId);
                    if (error) throw error;
                    setAlertModal({
                        isOpen: true,
                        title: 'Sukces',
                        message: 'Lejek został usunięty.',
                        type: 'success'
                    });
                    await loadFunnels();
                } catch (error) {
                    console.error('Błąd usuwania lejka:', error);
                    setAlertModal({
                        isOpen: true,
                        title: 'Błąd',
                        message: 'Nie udało się usunąć lejka: ' + (error.message || 'Nieznany błąd'),
                        type: 'error'
                    });
                }
            }
        });
    };
    const handleEditFunnel = (funnel)=>{
        setEditingFunnel(funnel);
        setNewFunnelName(funnel.project_name);
        setSelectedClientId(funnel.client_id || null);
        setSelectedStatus(funnel.status);
        setShowEditModal(true);
    };
    const handleSaveEdit = async ()=>{
        if (!editingFunnel || !newFunnelName.trim() || !user) {
            setAlertModal({
                isOpen: true,
                title: 'Błąd',
                message: 'Nazwa projektu jest wymagana.',
                type: 'error'
            });
            return;
        }
        try {
            // Aktualizuj lejek
            const { error: updateError } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('funnel_diagrams').update({
                project_name: newFunnelName.trim(),
                client_id: selectedClientId || null,
                status: selectedStatus
            }).eq('id', editingFunnel.id);
            if (updateError) throw updateError;
            // Jeśli ustawiono client_id, upewnij się że jest wpis w funnel_access
            if (selectedClientId) {
                // Sprawdź czy już istnieje wpis
                const { data: existingAccess } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('funnel_access').select('id').eq('funnel_id', editingFunnel.id).eq('client_id', selectedClientId).single();
                // Jeśli nie ma, utwórz wpis z access_level 'view'
                if (!existingAccess) {
                    const { error: accessError } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('funnel_access').insert({
                        funnel_id: editingFunnel.id,
                        client_id: selectedClientId,
                        access_level: 'view',
                        granted_by: user.id
                    });
                    if (accessError) {
                        console.warn('Błąd tworzenia wpisu w funnel_access:', accessError);
                    // Nie blokujemy - lejek został zaktualizowany
                    }
                }
            }
            setAlertModal({
                isOpen: true,
                title: 'Sukces',
                message: 'Lejek został zaktualizowany.',
                type: 'success'
            });
            setShowEditModal(false);
            setEditingFunnel(null);
            setNewFunnelName('');
            setSelectedClientId(null);
            setSelectedStatus('draft');
            await loadFunnels();
        } catch (error) {
            console.error('Błąd aktualizacji lejka:', error);
            setAlertModal({
                isOpen: true,
                title: 'Błąd',
                message: 'Nie udało się zaktualizować lejka: ' + (error.message || 'Nieznany błąd'),
                type: 'error'
            });
        }
    };
    const handleDuplicateFunnel = async (funnel)=>{
        try {
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('funnel_diagrams').insert({
                project_name: `${funnel.project_name} (Kopia)`,
                client_id: funnel.client_id,
                created_by: user?.id,
                diagram_data: funnel.diagram_data,
                status: 'draft'
            }).select().single();
            if (error) throw error;
            setAlertModal({
                isOpen: true,
                title: 'Sukces',
                message: 'Lejek został skopiowany.',
                type: 'success'
            });
            await loadFunnels();
        } catch (error) {
            console.error('Błąd kopiowania lejka:', error);
            setAlertModal({
                isOpen: true,
                title: 'Błąd',
                message: 'Nie udało się skopiować lejka: ' + (error.message || 'Nieznany błąd'),
                type: 'error'
            });
        }
    };
    const filteredFunnels = filterStatus === 'all' ? funnels : funnels.filter((f)=>f.status === filterStatus);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-[Montserrat] text-2xl font-bold text-white mb-2",
                                children: "Lejki Marketingowe"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                lineNumber: 349,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-400 text-sm",
                                children: "Twórz i zarządzaj lejkami marketingowymi dla swoich klientów"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                lineNumber: 352,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                        lineNumber: 348,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowAddModal(true),
                        className: "px-6 py-3 bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold rounded-xl hover:shadow-2xl hover:shadow-[#fee715]/40 transform hover:scale-105 transition-all duration-300 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-5 h-5",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M12 4v16m8-8H4"
                                }, void 0, false, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                    lineNumber: 361,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                lineNumber: 360,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            "Nowy Lejek"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                        lineNumber: 356,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                lineNumber: 347,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setFilterStatus('all'),
                        className: `px-4 py-2 rounded-lg font-semibold transition-all ${filterStatus === 'all' ? 'bg-[#fee715] text-[#101820]' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`,
                        children: "Wszystkie"
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                        lineNumber: 369,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setFilterStatus('draft'),
                        className: `px-4 py-2 rounded-lg font-semibold transition-all ${filterStatus === 'draft' ? 'bg-yellow-500 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`,
                        children: "Szkice"
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                        lineNumber: 379,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setFilterStatus('active'),
                        className: `px-4 py-2 rounded-lg font-semibold transition-all ${filterStatus === 'active' ? 'bg-green-500 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`,
                        children: "Aktywne"
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                        lineNumber: 389,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setFilterStatus('archived'),
                        className: `px-4 py-2 rounded-lg font-semibold transition-all ${filterStatus === 'archived' ? 'bg-gray-500 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`,
                        children: "Zarchiwizowane"
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                        lineNumber: 399,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                lineNumber: 368,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$LoadingState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoadingState"], {
                variant: "block",
                skeleton: "cards",
                label: "Ładowanie lejków…"
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                lineNumber: 413,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : filteredFunnels.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white/5 rounded-xl p-12 text-center text-gray-400",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-16 h-16 mx-auto mb-4 text-gray-500",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        }, void 0, false, {
                            fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                            lineNumber: 417,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                        lineNumber: 416,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg mb-2",
                        children: "Brak lejków"
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                        lineNumber: 419,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm",
                        children: 'Kliknij "Nowy Lejek", aby rozpocząć'
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                        lineNumber: 420,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                lineNumber: 415,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4",
                children: filteredFunnels.map((funnel)=>{
                    const nodeCount = funnel.diagram_data?.nodes?.length || 0;
                    const edgeCount = funnel.diagram_data?.edges?.length || 0;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gradient-to-br from-white/5 to-white/3 rounded-xl p-6 border-2 border-white/10 hover:border-[#fee715]/50 transition-all duration-300 cursor-pointer",
                        onClick: ()=>router.push(`/admin/marketing/${funnel.id}`),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start justify-between mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-[Montserrat] font-bold text-white text-lg mb-1",
                                                children: funnel.project_name
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                                lineNumber: 436,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            funnel.client && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-400 text-sm",
                                                children: [
                                                    funnel.client.name,
                                                    funnel.client.company_name && ` • ${funnel.client.company_name}`
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                                lineNumber: 440,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                        lineNumber: 435,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `px-2 py-1 rounded-lg text-xs font-semibold ${funnel.status === 'active' ? 'bg-green-500/20 text-green-300 border border-green-500/50' : funnel.status === 'draft' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/50' : 'bg-gray-500/20 text-gray-300 border border-gray-500/50'}`,
                                        children: funnel.status === 'active' ? 'Aktywny' : funnel.status === 'draft' ? 'Szkic' : 'Zarchiwizowany'
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                        lineNumber: 446,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                lineNumber: 434,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4 text-sm text-gray-400 mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-4 h-4",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                }, void 0, false, {
                                                    fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                                    lineNumber: 462,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                                lineNumber: 461,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    nodeCount,
                                                    " elementów"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                                lineNumber: 464,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                        lineNumber: 460,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-4 h-4",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M13 7l5 5m0 0l-5 5m5-5H6"
                                                }, void 0, false, {
                                                    fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                                    lineNumber: 468,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                                lineNumber: 467,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    edgeCount,
                                                    " połączeń"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                                lineNumber: 470,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                        lineNumber: 466,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                lineNumber: 459,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-500 mb-4",
                                children: [
                                    "Ostatnia aktualizacja: ",
                                    new Date(funnel.updated_at).toLocaleDateString('pl-PL')
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                lineNumber: 474,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2 pt-4 border-t border-white/10",
                                onClick: (e)=>e.stopPropagation(),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>router.push(`/admin/marketing/${funnel.id}`),
                                        className: "flex-1 px-4 py-2 bg-[#fee715] text-[#101820] rounded-lg transition-all text-sm font-semibold hover:bg-[#fee715]/90",
                                        children: "Otwórz"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                        lineNumber: 479,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleEditFunnel(funnel),
                                        className: "px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all text-sm font-semibold",
                                        title: "Edytuj",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-4 h-4",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                                lineNumber: 491,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                            lineNumber: 490,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                        lineNumber: 485,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleDuplicateFunnel(funnel),
                                        className: "px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all text-sm font-semibold",
                                        title: "Duplikuj",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-4 h-4",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                                lineNumber: 500,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                            lineNumber: 499,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                        lineNumber: 494,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleDeleteFunnel(funnel.id),
                                        className: "px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-all text-sm font-semibold",
                                        title: "Usuń",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-4 h-4",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                                lineNumber: 509,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                            lineNumber: 508,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                        lineNumber: 503,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                lineNumber: 478,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, funnel.id, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                        lineNumber: 429,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0));
                })
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                lineNumber: 423,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            showEditModal && editingFunnel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-black/70 backdrop-blur-sm",
                        onClick: ()=>{
                            setShowEditModal(false);
                            setEditingFunnel(null);
                        }
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                        lineNumber: 522,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative bg-gradient-to-br from-[#18232F] to-[#101820] rounded-2xl p-6 border-2 border-white/10 max-w-md w-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-[Montserrat] text-2xl font-bold text-white mb-6",
                                children: "Edytuj Lejek Marketingowy"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                lineNumber: 524,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-300 mb-2",
                                                children: [
                                                    "Nazwa Projektu ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-red-400",
                                                        children: "*"
                                                    }, void 0, false, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                                        lineNumber: 531,
                                                        columnNumber: 34
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                                lineNumber: 530,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: newFunnelName,
                                                onChange: (e)=>setNewFunnelName(e.target.value),
                                                className: "w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-[#fee715]",
                                                placeholder: "np. Lejek sprzedażowy Q1 2024",
                                                autoFocus: true
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                                lineNumber: 533,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                        lineNumber: 529,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-300 mb-2",
                                                children: "Przypisz do Klienta (opcjonalnie)"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                                lineNumber: 544,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CustomSelect$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CustomSelect"], {
                                                value: selectedClientId || '',
                                                onChange: (value)=>setSelectedClientId(value || null),
                                                placeholder: "Brak przypisania",
                                                options: [
                                                    {
                                                        value: '',
                                                        label: '✓ Brak przypisania'
                                                    },
                                                    ...clients.map((client)=>({
                                                            value: client.id,
                                                            label: `${client.name}${client.company_name ? ` • ${client.company_name}` : ''}`
                                                        }))
                                                ]
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                                lineNumber: 547,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                        lineNumber: 543,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-300 mb-2",
                                                children: "Status"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                                lineNumber: 562,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CustomSelect$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CustomSelect"], {
                                                value: selectedStatus,
                                                onChange: (value)=>setSelectedStatus(value),
                                                placeholder: "Wybierz status",
                                                options: [
                                                    {
                                                        value: 'draft',
                                                        label: 'Szkic'
                                                    },
                                                    {
                                                        value: 'active',
                                                        label: 'Aktywny'
                                                    },
                                                    {
                                                        value: 'archived',
                                                        label: 'Zarchiwizowany'
                                                    }
                                                ]
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                                lineNumber: 565,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                        lineNumber: 561,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                lineNumber: 528,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3 mt-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleSaveEdit,
                                        className: "flex-1 bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold py-3 px-4 rounded-xl hover:shadow-lg hover:shadow-[#fee715]/40 transition-all duration-300",
                                        children: "Zapisz Zmiany"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                        lineNumber: 579,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setShowEditModal(false);
                                            setEditingFunnel(null);
                                        },
                                        className: "px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-[Montserrat] font-semibold rounded-xl transition-all duration-300",
                                        children: "Anuluj"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                        lineNumber: 585,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                lineNumber: 578,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                        lineNumber: 523,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                lineNumber: 521,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            showAddModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-black/70 backdrop-blur-sm",
                        onClick: ()=>setShowAddModal(false)
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                        lineNumber: 599,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative bg-gradient-to-br from-[#18232F] to-[#101820] rounded-2xl p-6 border-2 border-white/10 max-w-md w-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-[Montserrat] text-2xl font-bold text-white mb-6",
                                children: "Nowy Lejek Marketingowy"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                lineNumber: 601,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-300 mb-2",
                                                children: [
                                                    "Nazwa Projektu ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-red-400",
                                                        children: "*"
                                                    }, void 0, false, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                                        lineNumber: 608,
                                                        columnNumber: 34
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                                lineNumber: 607,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: newFunnelName,
                                                onChange: (e)=>setNewFunnelName(e.target.value),
                                                className: "w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-[#fee715]",
                                                placeholder: "np. Lejek sprzedażowy Q1 2024",
                                                autoFocus: true
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                                lineNumber: 610,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                        lineNumber: 606,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-300 mb-2",
                                                children: "Przypisz do Klienta (opcjonalnie)"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                                lineNumber: 621,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CustomSelect$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CustomSelect"], {
                                                value: selectedClientId || '',
                                                onChange: (value)=>setSelectedClientId(value || null),
                                                placeholder: "Brak przypisania",
                                                options: [
                                                    {
                                                        value: '',
                                                        label: '✓ Brak przypisania'
                                                    },
                                                    ...clients.map((client)=>({
                                                            value: client.id,
                                                            label: `${client.name}${client.company_name ? ` • ${client.company_name}` : ''}`
                                                        }))
                                                ]
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                                lineNumber: 624,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                        lineNumber: 620,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                lineNumber: 605,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3 mt-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleCreateFunnel,
                                        className: "flex-1 bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold py-3 px-4 rounded-xl hover:shadow-lg hover:shadow-[#fee715]/40 transition-all duration-300",
                                        children: "Utwórz Lejek"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                        lineNumber: 640,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowAddModal(false),
                                        className: "px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-[Montserrat] font-semibold rounded-xl transition-all duration-300",
                                        children: "Anuluj"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                        lineNumber: 646,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                                lineNumber: 639,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                        lineNumber: 600,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                lineNumber: 598,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$AlertModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertModal"], {
                isOpen: alertModal.isOpen,
                title: alertModal.title,
                message: alertModal.message,
                type: alertModal.type,
                onClose: ()=>setAlertModal((prev)=>({
                            ...prev,
                            isOpen: false
                        }))
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                lineNumber: 657,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$ConfirmModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConfirmModal"], {
                isOpen: confirmModal.isOpen,
                title: confirmModal.title,
                message: confirmModal.message,
                confirmText: "Usuń",
                cancelText: "Anuluj",
                type: "danger",
                onConfirm: confirmModal.onConfirm,
                onCancel: ()=>setConfirmModal((prev)=>({
                            ...prev,
                            isOpen: false
                        }))
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
                lineNumber: 665,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx",
        lineNumber: 346,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/strony_www/drozniak-landingpage/lib/supabase.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/@supabase/supabase-js/dist/module/index.js [app-ssr] (ecmascript) <locals>");
const __TURBOPACK__import$2e$meta__ = {
    get url () {
        return `file://${__turbopack_context__.P("strony_www/drozniak-landingpage/lib/supabase.ts")}`;
    }
};
;
const supabaseUrl = __TURBOPACK__import$2e$meta__.env.VITE_SUPABASE_URL;
const supabaseAnonKey = __TURBOPACK__import$2e$meta__.env.VITE_SUPABASE_ANON_KEY;
// Sprawdź czy zmienne środowiskowe są ustawione
if (!supabaseUrl || !supabaseAnonKey) {
    const errorMessage = `
╔══════════════════════════════════════════════════════════════╗
║  BŁĄD: Brakuje zmiennych środowiskowych Supabase!           ║
╠══════════════════════════════════════════════════════════════╣
║  Utwórz plik .env.local w głównym katalogu projektu i dodaj: ║
║                                                              ║
║  VITE_SUPABASE_URL=https://twoj-projekt.supabase.co          ║
║  VITE_SUPABASE_ANON_KEY=twoj-anon-key                       ║
║                                                              ║
║  Po dodaniu zmiennych zrestartuj serwer dev (Ctrl+C i npm   ║
║  run dev ponownie).                                          ║
╚══════════════════════════════════════════════════════════════╝
  `;
    console.error(errorMessage);
    throw new Error('Missing Supabase environment variables. Check console for details.');
}
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
}),
"[project]/strony_www/drozniak-landingpage/hooks/useAuth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/lib/supabase.ts [app-ssr] (ecmascript)");
;
;
const useAuth = ()=>{
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Sprawdź aktualną sesję
        __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.getSession().then(({ data: { session }, error })=>{
            if (error) {
                console.error('Błąd pobierania sesji:', error);
            }
            console.log('Sesja załadowana:', session?.user?.email || 'brak sesji');
            setUser(session?.user ?? null);
            setLoading(false);
        });
        // Nasłuchuj zmian w autentykacji
        const { data: { subscription } } = __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.onAuthStateChange((event, session)=>{
            console.log('Zmiana stanu autentykacji:', event, session?.user?.email || 'brak sesji');
            setUser(session?.user ?? null);
            setLoading(false);
        });
        return ()=>subscription.unsubscribe();
    }, []);
    const signIn = async (email, password)=>{
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.signInWithPassword({
            email,
            password
        });
        return {
            data,
            error
        };
    };
    const updatePassword = async (newPassword)=>{
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.updateUser({
            password: newPassword
        });
        return {
            data,
            error
        };
    };
    const signOut = async ()=>{
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
        return {
            error
        };
    };
    return {
        user,
        loading,
        signIn,
        updatePassword,
        signOut
    };
};
}),
"[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClientManagement",
    ()=>ClientManagement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/hooks/useAuth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/lib/supabase-client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$AlertModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$ConfirmModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/ConfirmModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CustomSelect$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/CustomSelect.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$LoadingState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
const ClientManagement = ()=>{
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const [clients, setClients] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showAddModal, setShowAddModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingClient, setEditingClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        email: '',
        company_name: '',
        phone: '',
        notes: '',
        status: 'active'
    });
    const [alertModal, setAlertModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        isOpen: false,
        title: '',
        message: '',
        type: 'info'
    });
    const [confirmModal, setConfirmModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: ()=>{}
    });
    const [filterStatus, setFilterStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('all');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (user) {
            loadClients();
        }
    }, [
        user,
        filterStatus
    ]);
    const loadClients = async ()=>{
        try {
            setLoading(true);
            let query = __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('marketing_clients').select('*').order('created_at', {
                ascending: false
            });
            if (filterStatus !== 'all') {
                query = query.eq('status', filterStatus);
            }
            const { data, error } = await query;
            if (error) throw error;
            setClients(data || []);
        } catch (error) {
            console.error('Błąd ładowania klientów:', error);
            setAlertModal({
                isOpen: true,
                title: 'Błąd',
                message: 'Nie udało się załadować klientów: ' + (error.message || 'Nieznany błąd'),
                type: 'error'
            });
        } finally{
            setLoading(false);
        }
    };
    const handleAddClient = ()=>{
        setEditingClient(null);
        setFormData({
            name: '',
            email: '',
            company_name: '',
            phone: '',
            notes: '',
            status: 'active'
        });
        setShowAddModal(true);
    };
    const handleEditClient = (client)=>{
        setEditingClient(client);
        setFormData({
            name: client.name,
            email: client.email || '',
            company_name: client.company_name || '',
            phone: client.phone || '',
            notes: client.notes || '',
            status: client.status
        });
        setShowAddModal(true);
    };
    const handleSaveClient = async ()=>{
        if (!user || !formData.name.trim()) {
            setAlertModal({
                isOpen: true,
                title: 'Błąd',
                message: 'Nazwa klienta jest wymagana.',
                type: 'error'
            });
            return;
        }
        try {
            if (editingClient) {
                // Aktualizuj istniejącego klienta
                const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('marketing_clients').update({
                    name: formData.name.trim(),
                    email: formData.email.trim() || null,
                    company_name: formData.company_name.trim() || null,
                    phone: formData.phone.trim() || null,
                    notes: formData.notes.trim() || null,
                    status: formData.status
                }).eq('id', editingClient.id);
                if (error) throw error;
                setAlertModal({
                    isOpen: true,
                    title: 'Sukces',
                    message: 'Klient został zaktualizowany.',
                    type: 'success'
                });
            } else {
                // Dodaj nowego klienta
                const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('marketing_clients').insert({
                    name: formData.name.trim(),
                    email: formData.email.trim() || null,
                    company_name: formData.company_name.trim() || null,
                    phone: formData.phone.trim() || null,
                    notes: formData.notes.trim() || null,
                    status: formData.status,
                    created_by: user.id
                });
                if (error) throw error;
                setAlertModal({
                    isOpen: true,
                    title: 'Sukces',
                    message: 'Klient został dodany.',
                    type: 'success'
                });
            }
            setShowAddModal(false);
            await loadClients();
        } catch (error) {
            console.error('Błąd zapisywania klienta:', error);
            setAlertModal({
                isOpen: true,
                title: 'Błąd',
                message: 'Nie udało się zapisać klienta: ' + (error.message || 'Nieznany błąd'),
                type: 'error'
            });
        }
    };
    const handleDeleteClient = (clientId)=>{
        setConfirmModal({
            isOpen: true,
            title: 'Potwierdź usunięcie',
            message: 'Czy na pewno chcesz usunąć tego klienta? Ta operacja jest nieodwracalna.',
            onConfirm: async ()=>{
                setConfirmModal({
                    ...confirmModal,
                    isOpen: false
                });
                try {
                    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('marketing_clients').delete().eq('id', clientId);
                    if (error) throw error;
                    setAlertModal({
                        isOpen: true,
                        title: 'Sukces',
                        message: 'Klient został usunięty.',
                        type: 'success'
                    });
                    await loadClients();
                } catch (error) {
                    console.error('Błąd usuwania klienta:', error);
                    setAlertModal({
                        isOpen: true,
                        title: 'Błąd',
                        message: 'Nie udało się usunąć klienta: ' + (error.message || 'Nieznany błąd'),
                        type: 'error'
                    });
                }
            }
        });
    };
    const filteredClients = filterStatus === 'all' ? clients : clients.filter((c)=>c.status === filterStatus);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-[Montserrat] text-2xl font-bold text-white mb-2",
                                children: "Zarządzanie Klientami"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                lineNumber: 227,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-400 text-sm",
                                children: "Dodawaj i zarządzaj klientami marketingowymi"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                lineNumber: 230,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                        lineNumber: 226,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleAddClient,
                        className: "px-6 py-3 bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold rounded-xl hover:shadow-2xl hover:shadow-[#fee715]/40 transform hover:scale-105 transition-all duration-300 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-5 h-5",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M12 4v16m8-8H4"
                                }, void 0, false, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                    lineNumber: 239,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                lineNumber: 238,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            "Dodaj Klienta"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                        lineNumber: 234,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                lineNumber: 225,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setFilterStatus('all'),
                        className: `px-4 py-2 rounded-lg font-semibold transition-all ${filterStatus === 'all' ? 'bg-[#fee715] text-[#101820]' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`,
                        children: "Wszyscy"
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                        lineNumber: 247,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setFilterStatus('active'),
                        className: `px-4 py-2 rounded-lg font-semibold transition-all ${filterStatus === 'active' ? 'bg-green-500 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`,
                        children: "Aktywni"
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                        lineNumber: 257,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setFilterStatus('inactive'),
                        className: `px-4 py-2 rounded-lg font-semibold transition-all ${filterStatus === 'inactive' ? 'bg-yellow-500 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`,
                        children: "Nieaktywni"
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                        lineNumber: 267,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setFilterStatus('archived'),
                        className: `px-4 py-2 rounded-lg font-semibold transition-all ${filterStatus === 'archived' ? 'bg-gray-500 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`,
                        children: "Zarchiwizowani"
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                        lineNumber: 277,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                lineNumber: 246,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$LoadingState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoadingState"], {
                variant: "block",
                skeleton: "cards",
                label: "Ładowanie klientów…"
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                lineNumber: 291,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : filteredClients.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white/5 rounded-xl p-12 text-center text-gray-400",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-16 h-16 mx-auto mb-4 text-gray-500",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        }, void 0, false, {
                            fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                            lineNumber: 295,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                        lineNumber: 294,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg mb-2",
                        children: "Brak klientów"
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                        lineNumber: 297,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm",
                        children: 'Kliknij "Dodaj Klienta", aby rozpocząć'
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                        lineNumber: 298,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                lineNumber: 293,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4",
                children: filteredClients.map((client)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gradient-to-br from-white/5 to-white/3 rounded-xl p-6 border-2 border-white/10 hover:border-[#fee715]/50 transition-all duration-300",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start justify-between mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-[Montserrat] font-bold text-white text-lg mb-1",
                                                children: client.name
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                                lineNumber: 309,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            client.company_name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-400 text-sm mb-2",
                                                children: client.company_name
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                                lineNumber: 313,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                        lineNumber: 308,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `px-2 py-1 rounded-lg text-xs font-semibold ${client.status === 'active' ? 'bg-green-500/20 text-green-300 border border-green-500/50' : client.status === 'inactive' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/50' : 'bg-gray-500/20 text-gray-300 border border-gray-500/50'}`,
                                        children: client.status === 'active' ? 'Aktywny' : client.status === 'inactive' ? 'Nieaktywny' : 'Zarchiwizowany'
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                        lineNumber: 316,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                lineNumber: 307,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2 text-sm text-gray-300 mb-4",
                                children: [
                                    client.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-4 h-4 text-gray-500",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                }, void 0, false, {
                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                                    lineNumber: 333,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                                lineNumber: 332,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "truncate",
                                                children: client.email
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                                lineNumber: 335,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                        lineNumber: 331,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    client.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-4 h-4 text-gray-500",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                }, void 0, false, {
                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                                    lineNumber: 341,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                                lineNumber: 340,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: client.phone
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                                lineNumber: 343,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                        lineNumber: 339,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                lineNumber: 329,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            client.notes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4 p-3 bg-white/5 rounded-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-400 mb-1",
                                        children: "Notatki:"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                        lineNumber: 350,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-300 line-clamp-2",
                                        children: client.notes
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                        lineNumber: 351,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                lineNumber: 349,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2 pt-4 border-t border-white/10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleEditClient(client),
                                        className: "flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all text-sm font-semibold",
                                        children: "Edytuj"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                        lineNumber: 356,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleDeleteClient(client.id),
                                        className: "px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-all text-sm font-semibold",
                                        children: "Usuń"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                        lineNumber: 362,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                lineNumber: 355,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, client.id, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                        lineNumber: 303,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                lineNumber: 301,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            showAddModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-black/70 backdrop-blur-sm",
                        onClick: ()=>setShowAddModal(false)
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                        lineNumber: 377,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative bg-gradient-to-br from-[#18232F] to-[#101820] rounded-2xl p-6 border-2 border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-[Montserrat] text-2xl font-bold text-white mb-6",
                                children: editingClient ? 'Edytuj Klienta' : 'Dodaj Nowego Klienta'
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                lineNumber: 379,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-300 mb-2",
                                                children: [
                                                    "Nazwa * ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-red-400",
                                                        children: "*"
                                                    }, void 0, false, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                                        lineNumber: 386,
                                                        columnNumber: 27
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                                lineNumber: 385,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: formData.name,
                                                onChange: (e)=>setFormData({
                                                        ...formData,
                                                        name: e.target.value
                                                    }),
                                                className: "w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-[#fee715]",
                                                placeholder: "Nazwa klienta",
                                                required: true
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                                lineNumber: 388,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                        lineNumber: 384,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-300 mb-2",
                                                children: "Email"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                                lineNumber: 399,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "email",
                                                value: formData.email,
                                                onChange: (e)=>setFormData({
                                                        ...formData,
                                                        email: e.target.value
                                                    }),
                                                className: "w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-[#fee715]",
                                                placeholder: "email@example.com"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                                lineNumber: 400,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                        lineNumber: 398,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-300 mb-2",
                                                children: "Nazwa Firmy"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                                lineNumber: 410,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: formData.company_name,
                                                onChange: (e)=>setFormData({
                                                        ...formData,
                                                        company_name: e.target.value
                                                    }),
                                                className: "w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-[#fee715]",
                                                placeholder: "Nazwa firmy"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                                lineNumber: 411,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                        lineNumber: 409,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-300 mb-2",
                                                children: "Telefon"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                                lineNumber: 421,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "tel",
                                                value: formData.phone,
                                                onChange: (e)=>setFormData({
                                                        ...formData,
                                                        phone: e.target.value
                                                    }),
                                                className: "w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-[#fee715]",
                                                placeholder: "+48 123 456 789"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                                lineNumber: 422,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                        lineNumber: 420,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-300 mb-2",
                                                children: "Status"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                                lineNumber: 432,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CustomSelect$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CustomSelect"], {
                                                value: formData.status,
                                                onChange: (value)=>setFormData({
                                                        ...formData,
                                                        status: value
                                                    }),
                                                placeholder: "Wybierz status",
                                                options: [
                                                    {
                                                        value: 'active',
                                                        label: 'Aktywny'
                                                    },
                                                    {
                                                        value: 'inactive',
                                                        label: 'Nieaktywny'
                                                    },
                                                    {
                                                        value: 'archived',
                                                        label: 'Zarchiwizowany'
                                                    }
                                                ]
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                                lineNumber: 433,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                        lineNumber: 431,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-300 mb-2",
                                                children: "Notatki"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                                lineNumber: 446,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                value: formData.notes,
                                                onChange: (e)=>setFormData({
                                                        ...formData,
                                                        notes: e.target.value
                                                    }),
                                                className: "w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-[#fee715] min-h-[100px]",
                                                placeholder: "Dodatkowe notatki o kliencie..."
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                                lineNumber: 447,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                        lineNumber: 445,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                lineNumber: 383,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3 mt-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleSaveClient,
                                        className: "flex-1 bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold py-3 px-4 rounded-xl hover:shadow-lg hover:shadow-[#fee715]/40 transition-all duration-300",
                                        children: editingClient ? 'Zaktualizuj' : 'Dodaj'
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                        lineNumber: 457,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowAddModal(false),
                                        className: "px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-[Montserrat] font-semibold rounded-xl transition-all duration-300",
                                        children: "Anuluj"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                        lineNumber: 463,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                                lineNumber: 456,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                        lineNumber: 378,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                lineNumber: 376,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$AlertModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertModal"], {
                isOpen: alertModal.isOpen,
                title: alertModal.title,
                message: alertModal.message,
                type: alertModal.type,
                onClose: ()=>setAlertModal((prev)=>({
                            ...prev,
                            isOpen: false
                        }))
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                lineNumber: 474,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$ConfirmModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConfirmModal"], {
                isOpen: confirmModal.isOpen,
                title: confirmModal.title,
                message: confirmModal.message,
                confirmText: "Usuń",
                cancelText: "Anuluj",
                type: "danger",
                onConfirm: confirmModal.onConfirm,
                onCancel: ()=>setConfirmModal((prev)=>({
                            ...prev,
                            isOpen: false
                        }))
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
                lineNumber: 482,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx",
        lineNumber: 224,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PanelClientsManagement",
    ()=>PanelClientsManagement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/lib/supabase-client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/hooks/useAuth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$AlertModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$LoadingState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CustomSelect$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/CustomSelect.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CustomCheckbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/CustomCheckbox.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
const VIEW_TAGS = [
    {
        value: 'documents',
        label: 'Umowy i dokumenty'
    },
    {
        value: 'courses',
        label: 'Kursy'
    },
    {
        value: 'marketing',
        label: 'Marketing'
    },
    {
        value: 'data',
        label: 'Dane'
    },
    {
        value: 'projects',
        label: 'Projekty'
    }
];
const PanelClientsManagement = ()=>{
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const [list, setList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [marketingClients, setMarketingClients] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [modal, setModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingId, setEditingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        email: '',
        name: '',
        company_name: '',
        marketing_client_id: '',
        view_tags: []
    });
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [alert, setAlert] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        isOpen: false,
        title: '',
        message: '',
        type: 'info'
    });
    const load = async ()=>{
        setLoading(true);
        try {
            const [rpc, mc] = await Promise.all([
                __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].rpc('get_panel_clients_for_admin'),
                __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('marketing_clients').select('id, name, company_name').eq('status', 'active').order('name')
            ]);
            if (rpc.error) throw rpc.error;
            setList(rpc.data || []);
            setMarketingClients(mc.data || []);
        } catch (e) {
            setAlert({
                isOpen: true,
                title: 'Błąd',
                message: e?.message || 'Nie udało się załadować listy.',
                type: 'error'
            });
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (user) load();
    }, [
        user?.id
    ]);
    const openAdd = ()=>{
        setEditingId(null);
        setForm({
            email: '',
            name: '',
            company_name: '',
            marketing_client_id: '',
            view_tags: []
        });
        setModal('add');
    };
    const openEdit = (row)=>{
        setEditingId(row.id);
        setForm({
            email: row.email || '',
            name: row.name || '',
            company_name: row.company_name || '',
            marketing_client_id: row.marketing_client_id || '',
            view_tags: row.view_tags || []
        });
        setModal('edit');
    };
    const handleSave = async ()=>{
        if (!user) return;
        if (form.view_tags.length === 0) {
            setAlert({
                isOpen: true,
                title: 'Błąd',
                message: 'Wybierz co najmniej jeden widok.',
                type: 'error'
            });
            return;
        }
        setSaving(true);
        try {
            if (modal === 'add') {
                const { data: uid, error: eu } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].rpc('get_user_id_by_email', {
                    em: form.email.trim()
                });
                if (eu || !uid) {
                    setAlert({
                        isOpen: true,
                        title: 'Błąd',
                        message: 'Nie znaleziono użytkownika o podanym adresie e‑mail. Użytkownik musi istnieć w systemie (np. utwórz go w Supabase Dashboard).',
                        type: 'error'
                    });
                    setSaving(false);
                    return;
                }
                const { data: pc, error: ep } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('panel_clients').insert({
                    user_id: uid,
                    name: form.name.trim() || null,
                    email: form.email.trim() || null,
                    company_name: form.company_name.trim() || null,
                    marketing_client_id: form.marketing_client_id || null,
                    created_by: user.id
                }).select('id').single();
                if (ep) throw ep;
                for (const tag of form.view_tags){
                    await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('client_view_grants').insert({
                        client_id: pc.id,
                        view_tag: tag,
                        granted_by: user.id
                    });
                }
                setAlert({
                    isOpen: true,
                    title: 'Sukces',
                    message: 'Użytkownik panelu został dodany.',
                    type: 'success'
                });
            } else if (modal === 'edit' && editingId) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('panel_clients').update({
                    name: form.name.trim() || null,
                    company_name: form.company_name.trim() || null,
                    marketing_client_id: form.marketing_client_id || null
                }).eq('id', editingId);
                await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('client_view_grants').delete().eq('client_id', editingId);
                for (const tag of form.view_tags){
                    await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('client_view_grants').insert({
                        client_id: editingId,
                        view_tag: tag,
                        granted_by: user.id
                    });
                }
                setAlert({
                    isOpen: true,
                    title: 'Sukces',
                    message: 'Zmiany zapisane.',
                    type: 'success'
                });
            }
            setModal(null);
            setEditingId(null);
            await load();
        } catch (e) {
            setAlert({
                isOpen: true,
                title: 'Błąd',
                message: e?.message || 'Nie udało się zapisać.',
                type: 'error'
            });
        } finally{
            setSaving(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-[Montserrat] text-lg font-bold text-white",
                                children: "Klienci panelu"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                                lineNumber: 162,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-400 text-xs",
                                children: "Użytkownicy panelu klienta i przypisane widoki (Umowy, Kursy, Marketing, Dane, Projekty)"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                                lineNumber: 163,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                        lineNumber: 161,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: openAdd,
                        className: "px-4 py-2 bg-[#fee715] text-[#101820] text-sm font-semibold rounded-lg hover:bg-[#fee715]/90",
                        children: "+ Dodaj użytkownika"
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                        lineNumber: 165,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$LoadingState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoadingState"], {
                variant: "block",
                skeleton: "table",
                label: "Ładowanie użytkowników…"
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                lineNumber: 174,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : list.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "py-8 px-4 rounded-lg bg-white/5 border border-white/10 text-center text-gray-400 text-sm",
                children: "Brak użytkowników. Kliknij „Dodaj użytkownika” i podaj e‑mail istniejącego użytkownika oraz wybierz widoki."
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                lineNumber: 176,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border border-white/10 rounded-lg overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "border-b border-white/10 bg-white/5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "text-left py-2 px-3 text-gray-400 font-medium",
                                        children: "Email"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                                        lineNumber: 184,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "text-left py-2 px-3 text-gray-400 font-medium",
                                        children: "Nazwa"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                                        lineNumber: 185,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "text-left py-2 px-3 text-gray-400 font-medium",
                                        children: "Widoki"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                                        lineNumber: 186,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "text-right py-2 px-3 text-gray-400 font-medium",
                                        children: "Akcje"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                                        lineNumber: 187,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                                lineNumber: 183,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                            lineNumber: 182,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: list.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "border-b border-white/5 hover:bg-white/5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "py-2 px-3 text-white",
                                            children: row.email || '—'
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                                            lineNumber: 193,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "py-2 px-3 text-gray-300",
                                            children: row.name || row.company_name || '—'
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                                            lineNumber: 194,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "py-2 px-3 text-gray-400",
                                            children: (row.view_tags || []).join(', ') || '—'
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                                            lineNumber: 195,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "py-2 px-3 text-right",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>openEdit(row),
                                                className: "text-[#00C9A7] hover:underline text-xs",
                                                children: "Edytuj"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                                                lineNumber: 199,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                                            lineNumber: 198,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, row.id, true, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                                    lineNumber: 192,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                            lineNumber: 190,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                    lineNumber: 181,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                lineNumber: 180,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            modal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-black/70",
                        onClick: ()=>setModal(null)
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                        lineNumber: 210,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative bg-[#18232F] rounded-xl p-5 border border-white/10 max-w-md w-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-base font-semibold text-white mb-4",
                                children: modal === 'add' ? 'Dodaj użytkownika panelu' : 'Edytuj uprawnienia'
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                                lineNumber: 212,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs text-gray-400 mb-1",
                                                children: "E‑mail *"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                                                lineNumber: 215,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "email",
                                                value: form.email,
                                                onChange: (e)=>setForm((f)=>({
                                                            ...f,
                                                            email: e.target.value
                                                        })),
                                                disabled: modal === 'edit',
                                                placeholder: "email@example.com",
                                                className: "w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-500 disabled:opacity-60"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                                                lineNumber: 216,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            modal === 'add' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-500 mt-1",
                                                children: "Użytkownik musi już istnieć w systemie (auth)."
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                                                lineNumber: 224,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                                        lineNumber: 214,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs text-gray-400 mb-1",
                                                children: "Nazwa"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                                                lineNumber: 227,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: form.name,
                                                onChange: (e)=>setForm((f)=>({
                                                            ...f,
                                                            name: e.target.value
                                                        })),
                                                placeholder: "Imię / firma",
                                                className: "w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-500"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                                                lineNumber: 228,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                                        lineNumber: 226,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs text-gray-400 mb-1",
                                                children: "Nazwa firmy"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                                                lineNumber: 237,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: form.company_name,
                                                onChange: (e)=>setForm((f)=>({
                                                            ...f,
                                                            company_name: e.target.value
                                                        })),
                                                placeholder: "Firma",
                                                className: "w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-500"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                                                lineNumber: 238,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                                        lineNumber: 236,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs text-gray-400 mb-1",
                                                children: "Klient marketingowy (dla lejków)"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                                                lineNumber: 247,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CustomSelect$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CustomSelect"], {
                                                value: form.marketing_client_id,
                                                onChange: (v)=>setForm((f)=>({
                                                            ...f,
                                                            marketing_client_id: v
                                                        })),
                                                placeholder: "— Brak —",
                                                options: [
                                                    {
                                                        value: '',
                                                        label: '— Brak —'
                                                    },
                                                    ...marketingClients.map((c)=>({
                                                            value: c.id,
                                                            label: c.company_name ? `${c.name} (${c.company_name})` : c.name
                                                        }))
                                                ],
                                                className: "w-full"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                                                lineNumber: 248,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                                        lineNumber: 246,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs text-gray-400 mb-2",
                                                children: "Widoki (co najmniej jeden) *"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                                                lineNumber: 263,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-x-4 gap-y-2",
                                                children: VIEW_TAGS.map(({ value, label })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CustomCheckbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CustomCheckbox"], {
                                                        checked: form.view_tags.includes(value),
                                                        onChange: (c)=>setForm((f)=>({
                                                                    ...f,
                                                                    view_tags: c ? f.view_tags.includes(value) ? f.view_tags : [
                                                                        ...f.view_tags,
                                                                        value
                                                                    ] : f.view_tags.filter((x)=>x !== value)
                                                                })),
                                                        label: label,
                                                        className: "text-sm"
                                                    }, value, false, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                                                        lineNumber: 266,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                                                lineNumber: 264,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                                        lineNumber: 262,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                                lineNumber: 213,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2 mt-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleSave,
                                        disabled: saving,
                                        className: "px-4 py-2 bg-[#fee715] text-[#101820] text-sm font-semibold rounded-lg hover:bg-[#fee715]/90 disabled:opacity-50",
                                        children: saving ? 'Zapisywanie…' : 'Zapisz'
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                                        lineNumber: 285,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setModal(null),
                                        className: "px-4 py-2 bg-white/10 text-white text-sm rounded-lg hover:bg-white/20",
                                        children: "Anuluj"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                                        lineNumber: 288,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                                lineNumber: 284,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                        lineNumber: 211,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                lineNumber: 209,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$AlertModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertModal"], {
                isOpen: alert.isOpen,
                title: alert.title,
                message: alert.message,
                type: alert.type,
                onClose: ()=>setAlert((a)=>({
                            ...a,
                            isOpen: false
                        }))
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
                lineNumber: 294,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx",
        lineNumber: 159,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/strony_www/drozniak-landingpage/app/components/ProposalsList.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProposalsList",
    ()=>ProposalsList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/app/hooks/useAuth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/lib/supabase-client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$AlertModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$LoadingState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$FileText$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/FileText.esm.js [app-ssr] (ecmascript) <export default as FileText>");
'use client';
;
;
;
;
;
;
;
;
const ProposalsList = ()=>{
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [proposals, setProposals] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [filterStatus, setFilterStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('all');
    const [alertModal, setAlertModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        isOpen: false,
        title: '',
        message: '',
        type: 'info'
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (user) {
            loadProposals();
        }
    }, [
        user,
        filterStatus
    ]);
    const loadProposals = async ()=>{
        try {
            setLoading(true);
            let query = __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('proposals').select(`
          *,
          client:panel_clients(name, company_name),
          marketing_client:marketing_clients(name, company_name)
        `).order('updated_at', {
                ascending: false
            });
            if (filterStatus !== 'all') {
                query = query.eq('status', filterStatus);
            }
            const { data, error } = await query;
            if (error) {
                console.error('Błąd zapytania proposals:', error);
                throw error;
            }
            console.log('Załadowano oferty:', data?.length || 0, 'ofert');
            // Pobierz dodatkowe informacje: last_viewed_at, accepted_at
            const proposalsWithDetails = [];
            for (const prop of data || []){
                // Obsłuż błędy dla opcjonalnych zapytań (tracking i acceptance)
                let lastViewedAt = null;
                let acceptedAt = null;
                try {
                    const { data: tracking } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('proposal_tracking_events').select('created_at').eq('proposal_id', prop.id).eq('event_type', 'view').order('created_at', {
                        ascending: false
                    }).limit(1).maybeSingle(); // maybeSingle zamiast single - nie rzuca błędu jeśli brak danych
                    lastViewedAt = tracking?.created_at || null;
                } catch (err) {
                    console.warn('Błąd pobierania tracking dla oferty', prop.id, err);
                }
                try {
                    const { data: acceptance } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('proposal_acceptances').select('accepted_at').eq('proposal_id', prop.id).maybeSingle(); // maybeSingle zamiast single - nie rzuca błędu jeśli brak danych
                    acceptedAt = acceptance?.accepted_at || null;
                } catch (err) {
                    console.warn('Błąd pobierania acceptance dla oferty', prop.id, err);
                }
                proposalsWithDetails.push({
                    ...prop,
                    client: Array.isArray(prop.client) ? prop.client[0] : prop.client,
                    marketing_client: Array.isArray(prop.marketing_client) ? prop.marketing_client[0] : prop.marketing_client,
                    last_viewed_at: lastViewedAt,
                    accepted_at: acceptedAt
                });
            }
            setProposals(proposalsWithDetails);
        } catch (error) {
            console.error('Błąd ładowania ofert:', error);
            setAlertModal({
                isOpen: true,
                title: 'Błąd',
                message: 'Nie udało się załadować ofert: ' + (error.message || 'Nieznany błąd'),
                type: 'error'
            });
        } finally{
            setLoading(false);
        }
    };
    const getStatusLabel = (status)=>{
        const labels = {
            draft: 'Szkic',
            sent: 'Wysłana',
            viewed: 'Otworzona',
            accepted: 'Zaakceptowana',
            expired: 'Wygasła',
            archived: 'Zarchiwizowana'
        };
        return labels[status] || status;
    };
    const getStatusColor = (status)=>{
        const colors = {
            draft: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
            sent: 'bg-blue-500/20 text-blue-300 border-blue-500/50',
            viewed: 'bg-purple-500/20 text-purple-300 border-purple-500/50',
            accepted: 'bg-green-500/20 text-green-300 border-green-500/50',
            expired: 'bg-gray-500/20 text-gray-300 border-gray-500/50',
            archived: 'bg-gray-500/20 text-gray-300 border-gray-500/50'
        };
        return colors[status] || colors.draft;
    };
    const filteredProposals = filterStatus === 'all' ? proposals : proposals.filter((p)=>p.status === filterStatus);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-[Montserrat] text-2xl font-bold text-white mb-2",
                                children: "Oferty"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/ProposalsList.tsx",
                                lineNumber: 165,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-400 text-sm",
                                children: "Twórz i zarządzaj ofertami dla swoich klientów"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/ProposalsList.tsx",
                                lineNumber: 168,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/ProposalsList.tsx",
                        lineNumber: 164,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.push('/admin/proposals/new'),
                        className: "px-6 py-3 bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold rounded-xl hover:shadow-2xl hover:shadow-[#fee715]/40 transform hover:scale-105 transition-all duration-300 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$FileText$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                size: 20,
                                weight: "bold"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/ProposalsList.tsx",
                                lineNumber: 176,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            "Nowa Oferta"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/ProposalsList.tsx",
                        lineNumber: 172,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/app/components/ProposalsList.tsx",
                lineNumber: 163,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 flex gap-2 flex-wrap",
                children: [
                    'all',
                    'draft',
                    'sent',
                    'viewed',
                    'accepted',
                    'expired',
                    'archived'
                ].map((status)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setFilterStatus(status),
                        className: `px-4 py-2 rounded-lg font-semibold transition-all text-sm ${filterStatus === status ? status === 'all' ? 'bg-[#fee715] text-[#101820]' : getStatusColor(status).replace('/20', '').replace('/50', '') : 'bg-white/10 text-gray-300 hover:bg-white/20'}`,
                        children: status === 'all' ? 'Wszystkie' : getStatusLabel(status)
                    }, status, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/ProposalsList.tsx",
                        lineNumber: 184,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/app/components/ProposalsList.tsx",
                lineNumber: 182,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$LoadingState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoadingState"], {
                variant: "block",
                skeleton: "cards",
                label: "Ładowanie ofert…"
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/app/components/ProposalsList.tsx",
                lineNumber: 202,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : filteredProposals.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white/5 rounded-xl p-12 text-center text-gray-400",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$FileText$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                        size: 48,
                        weight: "thin",
                        className: "mx-auto mb-4 text-gray-500"
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/ProposalsList.tsx",
                        lineNumber: 205,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg mb-2",
                        children: "Brak ofert"
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/ProposalsList.tsx",
                        lineNumber: 206,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm",
                        children: 'Kliknij "Nowa Oferta", aby rozpocząć'
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/ProposalsList.tsx",
                        lineNumber: 207,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/app/components/ProposalsList.tsx",
                lineNumber: 204,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4",
                children: filteredProposals.map((proposal)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gradient-to-br from-white/5 to-white/3 rounded-xl p-6 border-2 border-white/10 hover:border-[#fee715]/50 transition-all duration-300 cursor-pointer",
                        onClick: ()=>router.push(`/admin/proposals/${proposal.id}`),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start justify-between mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-[Montserrat] font-bold text-white text-lg mb-1",
                                                children: proposal.title
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/ProposalsList.tsx",
                                                lineNumber: 219,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            (proposal.client || proposal.marketing_client) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-400 text-sm",
                                                children: [
                                                    proposal.client?.name || proposal.marketing_client?.name,
                                                    proposal.client?.company_name && ` • ${proposal.client.company_name}`,
                                                    proposal.marketing_client?.company_name && ` • ${proposal.marketing_client.company_name}`
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/ProposalsList.tsx",
                                                lineNumber: 223,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/ProposalsList.tsx",
                                        lineNumber: 218,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `px-2 py-1 rounded-lg text-xs font-semibold border ${getStatusColor(proposal.status)}`,
                                        children: getStatusLabel(proposal.status)
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/ProposalsList.tsx",
                                        lineNumber: 230,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/ProposalsList.tsx",
                                lineNumber: 217,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-500 mb-4 space-y-1",
                                children: [
                                    proposal.last_viewed_at && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            "Ostatnie otwarcie: ",
                                            new Date(proposal.last_viewed_at).toLocaleDateString('pl-PL')
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/ProposalsList.tsx",
                                        lineNumber: 239,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    proposal.accepted_at && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            "Zaakceptowana: ",
                                            new Date(proposal.accepted_at).toLocaleDateString('pl-PL')
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/ProposalsList.tsx",
                                        lineNumber: 242,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    !proposal.last_viewed_at && !proposal.accepted_at && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            "Utworzona: ",
                                            new Date(proposal.created_at).toLocaleDateString('pl-PL')
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/ProposalsList.tsx",
                                        lineNumber: 245,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/ProposalsList.tsx",
                                lineNumber: 237,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2 pt-4 border-t border-white/10",
                                onClick: (e)=>e.stopPropagation(),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>router.push(`/admin/proposals/${proposal.id}`),
                                    className: "flex-1 px-4 py-2 bg-[#fee715] text-[#101820] rounded-lg transition-all text-sm font-semibold hover:bg-[#fee715]/90",
                                    children: "Otwórz"
                                }, void 0, false, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/app/components/ProposalsList.tsx",
                                    lineNumber: 250,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/app/components/ProposalsList.tsx",
                                lineNumber: 249,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, proposal.id, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/ProposalsList.tsx",
                        lineNumber: 212,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/app/components/ProposalsList.tsx",
                lineNumber: 210,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$AlertModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertModal"], {
                isOpen: alertModal.isOpen,
                title: alertModal.title,
                message: alertModal.message,
                type: alertModal.type,
                onClose: ()=>setAlertModal((prev)=>({
                            ...prev,
                            isOpen: false
                        }))
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/app/components/ProposalsList.tsx",
                lineNumber: 262,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/strony_www/drozniak-landingpage/app/components/ProposalsList.tsx",
        lineNumber: 162,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/strony_www/drozniak-landingpage/app/admin/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminRootPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/app/hooks/useAuth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$AdminCoursesTab$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/AdminCoursesTab.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$components$2f$FunnelList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/app/components/FunnelList.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$ClientManagement$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/ClientManagement.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$PanelClientsManagement$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/PanelClientsManagement.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$components$2f$ProposalsList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/app/components/ProposalsList.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$LoadingState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$BookOpen$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/BookOpen.esm.js [app-ssr] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$PresentationChart$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PresentationChart$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/PresentationChart.esm.js [app-ssr] (ecmascript) <export default as PresentationChart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Users$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Users.esm.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$User$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/User.esm.js [app-ssr] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$FileText$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/FileText.esm.js [app-ssr] (ecmascript) <export default as FileText>");
'use client';
;
;
;
;
;
;
;
;
;
;
;
function AdminRootPage() {
    const { user, signOut, loading: authLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('courses');
    if (authLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$LoadingState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoadingState"], {
            variant: "fullscreen",
            label: "Ładowanie panelu…"
        }, void 0, false, {
            fileName: "[project]/strony_www/drozniak-landingpage/app/admin/page.tsx",
            lineNumber: 23,
            columnNumber: 12
        }, this);
    }
    if (!user || user.email !== 'stanislaw@drozniak.com') {
        router.push('/login');
        return null;
    }
    const tabs = [
        {
            id: 'courses',
            label: 'Kursy',
            icon: 'BookOpen'
        },
        {
            id: 'marketing',
            label: 'Marketing',
            icon: 'PresentationChart'
        },
        {
            id: 'proposals',
            label: 'Oferty',
            icon: 'FileText'
        },
        {
            id: 'clients',
            label: 'Klienci',
            icon: 'Users'
        },
        {
            id: 'panel-clients',
            label: 'Klienci panelu',
            icon: 'User'
        }
    ];
    const handleTabClick = (tabId)=>{
        setActiveTab(tabId);
        if (tabId === 'marketing') router.push('/admin/marketing');
        else if (tabId === 'clients') router.push('/admin/clients');
        else if (tabId === 'panel-clients') router.push('/admin/panel-clients');
        else if (tabId === 'proposals') router.push('/admin/proposals');
        else router.push('/admin/courses');
    };
    const handleSignOut = async ()=>{
        await signOut();
        router.push('/login');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#101820] text-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-6 py-8 max-w-7xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-8 flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "font-[Montserrat] text-4xl font-bold mb-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "bg-gradient-to-r from-[#fee715] to-[#00C9A7] bg-clip-text text-transparent",
                                        children: "Panel Administratora"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/app/admin/page.tsx",
                                        lineNumber: 60,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/app/admin/page.tsx",
                                    lineNumber: 59,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-400",
                                    children: "Zarządzanie kursantami, lejkami marketingowymi i klientami"
                                }, void 0, false, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/app/admin/page.tsx",
                                    lineNumber: 64,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/strony_www/drozniak-landingpage/app/admin/page.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleSignOut,
                            className: "px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-[Montserrat] font-semibold rounded-xl transition-all duration-300 border border-white/20",
                            children: "Wyloguj"
                        }, void 0, false, {
                            fileName: "[project]/strony_www/drozniak-landingpage/app/admin/page.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/strony_www/drozniak-landingpage/app/admin/page.tsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6 flex gap-2 border-b border-white/10",
                    children: tabs.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleTabClick(tab.id),
                            className: `px-6 py-3 font-[Montserrat] font-semibold transition-all duration-300 border-b-2 ${activeTab === tab.id ? 'border-[#fee715] text-[#fee715]' : 'border-transparent text-gray-400 hover:text-white'}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mr-2 inline-flex items-center",
                                    children: [
                                        tab.icon === 'BookOpen' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$BookOpen$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                            size: 18,
                                            weight: "regular"
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/app/admin/page.tsx",
                                            lineNumber: 87,
                                            columnNumber: 45
                                        }, this),
                                        tab.icon === 'PresentationChart' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$PresentationChart$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PresentationChart$3e$__["PresentationChart"], {
                                            size: 18,
                                            weight: "regular"
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/app/admin/page.tsx",
                                            lineNumber: 88,
                                            columnNumber: 54
                                        }, this),
                                        tab.icon === 'FileText' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$FileText$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                            size: 18,
                                            weight: "regular"
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/app/admin/page.tsx",
                                            lineNumber: 89,
                                            columnNumber: 45
                                        }, this),
                                        tab.icon === 'Users' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Users$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                            size: 18,
                                            weight: "regular"
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/app/admin/page.tsx",
                                            lineNumber: 90,
                                            columnNumber: 42
                                        }, this),
                                        tab.icon === 'User' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$User$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                            size: 18,
                                            weight: "regular"
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/app/admin/page.tsx",
                                            lineNumber: 91,
                                            columnNumber: 41
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/app/admin/page.tsx",
                                    lineNumber: 86,
                                    columnNumber: 15
                                }, this),
                                tab.label
                            ]
                        }, tab.id, true, {
                            fileName: "[project]/strony_www/drozniak-landingpage/app/admin/page.tsx",
                            lineNumber: 77,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/strony_www/drozniak-landingpage/app/admin/page.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        activeTab === 'courses' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$AdminCoursesTab$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminCoursesTab"], {}, void 0, false, {
                            fileName: "[project]/strony_www/drozniak-landingpage/app/admin/page.tsx",
                            lineNumber: 100,
                            columnNumber: 39
                        }, this),
                        activeTab === 'marketing' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$components$2f$FunnelList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FunnelList"], {}, void 0, false, {
                            fileName: "[project]/strony_www/drozniak-landingpage/app/admin/page.tsx",
                            lineNumber: 101,
                            columnNumber: 41
                        }, this),
                        activeTab === 'proposals' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$components$2f$ProposalsList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ProposalsList"], {}, void 0, false, {
                            fileName: "[project]/strony_www/drozniak-landingpage/app/admin/page.tsx",
                            lineNumber: 102,
                            columnNumber: 41
                        }, this),
                        activeTab === 'clients' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$ClientManagement$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ClientManagement"], {}, void 0, false, {
                            fileName: "[project]/strony_www/drozniak-landingpage/app/admin/page.tsx",
                            lineNumber: 103,
                            columnNumber: 39
                        }, this),
                        activeTab === 'panel-clients' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$PanelClientsManagement$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PanelClientsManagement"], {}, void 0, false, {
                            fileName: "[project]/strony_www/drozniak-landingpage/app/admin/page.tsx",
                            lineNumber: 104,
                            columnNumber: 45
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/strony_www/drozniak-landingpage/app/admin/page.tsx",
                    lineNumber: 99,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/strony_www/drozniak-landingpage/app/admin/page.tsx",
            lineNumber: 55,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/strony_www/drozniak-landingpage/app/admin/page.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=strony_www_drozniak-landingpage_5670ccbc._.js.map