// Konfiguracja modułów i lekcji szkolenia
// Treści są placeholderami - będą dopracowane później

export interface QuizSubTask {
  id: string;
  title: string;
  description: string;
  keywords?: string[]; // słowa kluczowe, które powinny być w odpowiedzi
  hint?: string;
}

export interface QuizQuestion {
  id: string;
  type: 'choice' | 'open' | 'multi-task';
  question: string;
  options?: string[]; // dla typu 'choice'
  correctAnswer?: string | number; // dla 'choice' - indeks poprawnej odpowiedzi
  keywords?: string[]; // dla typu 'open' - słowa kluczowe, które powinny być w odpowiedzi
  hint?: string; // podpowiedź przy błędnej odpowiedzi
  feedback?: string; // komunikat po poprawnej odpowiedzi
  subTasks?: QuizSubTask[]; // dla typu 'multi-task' - tablica podzadań
}

export interface PracticalExample {
  title: string;
  description: string;
  effect: string;
}

export interface KeyElement {
  title: string;
  description: string;
  points: string[];
  icon: string; // nazwa ikony SVG
}

export interface ChecklistItem {
  id: string;
  text: string;
}

export interface Lesson {
  id: string; // np. "1.1"
  moduleId: string; // np. "1"
  title: string;
  intro: string; // Wprowadzenie (może być dłuższe)
  whyImportant: string | KeyElement[]; // Dlaczego to ważne (może być string lub tablica KeyElement)
  whyImportantFooter?: string; // Opcjonalny tekst końcowy dla sekcji "Dlaczego to ważne"
  customerPath?: string; // Opcjonalna sekcja: ścieżka klienta
  keyElements?: string | KeyElement[]; // Opcjonalna sekcja: najważniejsze elementy (stary format string lub nowy format tablica)
  roleDescription?: string; // Opcjonalna sekcja: opis roli (np. "Jaką rolę pełnią...")
  roleDescriptionTitle?: string; // Opcjonalny tytuł sekcji roli
  practicalExamples?: PracticalExample[]; // Tablica przykładów praktycznych
  practicalExample?: string; // Stary format (dla kompatybilności wstecznej)
  additionalInfo?: string; // Opcjonalna sekcja: dodatkowe informacje (np. "Czego NIE robią...")
  additionalInfoTitle?: string; // Opcjonalny tytuł dodatkowej sekcji
  checklist?: ChecklistItem[]; // Opcjonalna checklista (nie wymagana do zaliczenia)
  quiz: QuizQuestion[];
}

export interface Module {
  id: string;
  title: string;
  icon: string; // nazwa ikony (używamy prostych wektorów)
  lessons: Lesson[];
}

export const trainingModules: Module[] = [
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
            keywords: ['zauważenie', 'zainteresowanie', 'rozważanie', 'decyzja', 'doświadczenie', 'powrót', 'polecenie', 'traci', 'klientów', 'etap'],
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
            keywords: ['facebook', 'instagram', 'platforma', 'klienci', 'aktywni', 'social', 'media'],
            hint: 'Pomyśl o tym, gdzie Twoi klienci spędzają najwięcej czasu online...',
            feedback: 'Dziękuję za odpowiedź. To pomoże lepiej zrozumieć, na której platformie warto skupić najwięcej uwagi.'
          },
          {
            id: 'q5',
            type: 'open',
            question: 'Jakiego typu post zobaczyłby Twój idealny klient i pomyślał: „To jest coś dla mnie"?',
            keywords: ['post', 'klient', 'idealny', 'typ', 'treść', 'zainteresowanie', 'reakcja'],
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
            keywords: ['narzędzia', 'marketingowe', 'wykorzystujesz', 'firma', 'podstawowa', 'forma', 'google', 'facebook', 'instagram', 'strona', 'www'],
            hint: 'Pomyśl o wszystkich narzędziach online, z których korzystasz w swojej firmie...',
            feedback: 'Dziękuję za odpowiedź. To pomoże lepiej zrozumieć, jakie narzędzia już masz i które warto rozwinąć.'
          },
          {
            id: 'q5',
            type: 'open',
            question: 'Które jedno narzędzie – jeśli nauczyłbyś się korzystać z niego lepiej – dałoby Twoim zdaniem największy efekt w najbliższych 3 miesiącach?',
            keywords: ['narzędzie', 'nauczyłbyś', 'korzystać', 'lepiej', 'największy', 'efekt', 'miesiące', '3', 'trzy'],
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
            keywords: ['pensjonat', 'pokoje', 'śniadania', 'rodzina', 'para', 'delegacja', 'zadzwoń', 'napisz', 'zarezerwuj', 'sprawdź', 'terminy'],
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
            keywords: ['historia', 'goście', 'sytuacja', 'docenili', 'wezwanie', 'działanie', 'zarezerwuj', 'napisz', 'sprawdź', 'terminy'],
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
                keywords: ['nocleg', 'hotel', 'pokoje', 'centrum', 'miasto', 'śniadanie', 'fraza', 'kluczowa'],
                hint: 'Pomyśl o konkretnej frazie, którą wpisują klienci szukając Twojej oferty...'
              },
              {
                id: 'q4-2',
                title: 'Zadanie 2: Tytuł (H1)',
                description: 'Napisz na nowo tytuł (H1) tej podstrony, używając wybranej frazy kluczowej.',
                keywords: ['tytuł', 'h1', 'nagłówek', 'fraza', 'kluczowa'],
                hint: 'Tytuł powinien zawierać główną frazę kluczową i być konkretny...'
              },
              {
                id: 'q4-3',
                title: 'Zadanie 3: Opis (4–6 zdań)',
                description: `Napisz 4–6 zdań opisu, w którym:
• naturalnie użyjesz wybranej frazy kluczowej,
• dodasz 2–3 konkretne informacje (np. godziny śniadań, parking, Wi-Fi),
• zakończysz wezwaniem do działania (np. „Sprawdź dostępne terminy").`,
                keywords: ['opis', 'treść', 'fraza', 'kluczowa', 'informacje', 'parking', 'wi-fi', 'śniadanie', 'wezwanie', 'działanie', 'zarezerwuj', 'sprawdź', 'terminy'],
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
            keywords: ['wnioski', 'działa', 'nie działa', 'budżet', 'target', 'oferta', 'decyzje'],
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
        intro: 'Opinie i recenzje online mają ogromny wpływ na decyzje zakupowe klientów. Zarządzanie nimi to kluczowy element budowania wizerunku marki.',
        whyImportant: 'Pozytywne opinie budują zaufanie i zachęcają nowych klientów do skorzystania z usług. Negatywne opinie, jeśli są odpowiednio obsłużone, mogą być okazją do pokazania zaangażowania w satysfakcję klienta.',
        practicalExample: 'Restauracja może aktywnie prosić zadowolonych klientów o pozostawienie opinii na Google, a na negatywne opinie odpowiadać profesjonalnie, oferując rozwiązanie problemu.',
        quiz: [
          {
            id: 'q1',
            type: 'choice',
            question: 'Jak powinno się reagować na negatywną opinię online?',
            options: [
              'Ignorować ją',
              'Odpowiedzieć profesjonalnie, przeprosić i zaproponować rozwiązanie',
              'Usunąć opinię',
              'Odpowiedzieć agresywnie'
            ],
            correctAnswer: 1,
            feedback: 'Dokładnie tak – profesjonalna odpowiedź na negatywną opinię pokazuje zaangażowanie w satysfakcję klienta i może przekształcić negatywną sytuację w pozytywną.'
          }
        ]
      },
      {
        id: '4.2',
        moduleId: '4',
        title: 'Komunikacja z klientami w mediach społecznościowych',
        intro: 'Szybka i profesjonalna komunikacja w mediach społecznościowych buduje zaufanie i lojalność klientów. To pierwszy punkt kontaktu dla wielu potencjalnych klientów.',
        whyImportant: 'Klienci oczekują szybkiej odpowiedzi w mediach społecznościowych. Profesjonalna komunikacja pokazuje, że firma dba o klientów i jest dostępna, co buduje pozytywny wizerunek marki.',
        practicalExample: 'Firma może ustalić zasady odpowiadania na wiadomości w ciągu 24 godzin, używać przyjaznego tonu i personalizować odpowiedzi, co buduje pozytywne doświadczenia klientów.',
        quiz: [
          {
            id: 'q1',
            type: 'open',
            question: 'Jaki jest zalecany czas odpowiedzi na wiadomości w mediach społecznościowych?',
            keywords: ['24', 'godziny', 'szybko', 'natychmiast', 'dzień'],
            hint: 'Pomyśl o standardach, które klienci uważają za akceptowalne...',
            feedback: 'Dokładnie tak – zaleca się odpowiadanie na wiadomości w ciągu 24 godzin, a najlepiej jeszcze szybciej, aby pokazać zaangażowanie w obsługę klienta.'
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
        intro: 'Email marketing pozostaje jednym z najbardziej efektywnych kanałów komunikacji z klientami. Dobrze zaprojektowana kampania emailowa może przynosić wysokie wskaźniki konwersji.',
        whyImportant: 'Email marketing pozwala na bezpośrednią komunikację z klientami, którzy wyrazili zgodę na otrzymywanie wiadomości. To kanał o wysokim ROI i możliwości personalizacji.',
        practicalExample: 'Sklep internetowy może wysyłać spersonalizowane emaile z produktami dopasowanymi do wcześniejszych zakupów klienta, co zwiększa prawdopodobieństwo kolejnego zakupu.',
        quiz: [
          {
            id: 'q1',
            type: 'choice',
            question: 'Co jest kluczowe w skutecznej kampanii emailowej?',
            options: [
              'Tylko atrakcyjny design',
              'Relewantna treść, personalizacja i odpowiedni timing',
              'Wysoka częstotliwość wysyłki',
              'Długie wiadomości'
            ],
            correctAnswer: 1,
            feedback: 'Dokładnie tak – skuteczna kampania emailowa wymaga relewantnej treści dopasowanej do odbiorcy, personalizacji oraz wysłania w odpowiednim momencie.'
          }
        ]
      },
      {
        id: '5.2',
        moduleId: '5',
        title: 'Personalizacja i automatyzacja kampanii',
        intro: 'Personalizacja i automatyzacja to przyszłość email marketingu. Pozwalają one na dostarczanie odpowiedniej treści do odpowiedniej osoby w odpowiednim czasie.',
        whyImportant: 'Zautomatyzowane i spersonalizowane kampanie emailowe oszczędzają czas, zwiększają zaangażowanie odbiorców i poprawiają wskaźniki konwersji poprzez dostarczanie bardziej relewantnych treści.',
        practicalExample: 'Firma może zautomatyzować serię powitalnych emaili dla nowych subskrybentów, które są wysyłane w określonych odstępach czasu i zawierają spersonalizowane treści na podstawie preferencji użytkownika.',
        quiz: [
          {
            id: 'q1',
            type: 'open',
            question: 'Jakie korzyści przynosi automatyzacja kampanii emailowych?',
            keywords: ['czas', 'oszczędność', 'skalowanie', 'spójność', 'efektywność', 'personalizacja'],
            hint: 'Pomyśl o tym, co automatyzacja pozwala osiągnąć w kontekście czasu i zasobów...',
            feedback: 'Dokładnie tak – automatyzacja pozwala na oszczędność czasu, skalowanie działań, zachowanie spójności komunikacji i zwiększenie efektywności kampanii.'
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
        intro: 'Narzędzia analityczne dostarczają kluczowych danych o zachowaniach klientów i efektywności działań marketingowych. Bez danych trudno podejmować świadome decyzje.',
        whyImportant: 'Analiza danych pozwala na zrozumienie, co działa, a co nie, co umożliwia optymalizację działań i maksymalizację zwrotu z inwestycji marketingowych.',
        practicalExample: 'Firma może wykorzystać Google Analytics do analizy, które strony na stronie internetowej są najczęściej odwiedzane, co pozwala na optymalizację treści i poprawę konwersji.',
        quiz: [
          {
            id: 'q1',
            type: 'choice',
            question: 'Które narzędzie jest najbardziej uniwersalne do analizy działań marketingowych?',
            options: [
              'Tylko Facebook Insights',
              'Google Analytics i inne narzędzia w zależności od kanału',
              'Tylko Instagram Analytics',
              'Nie potrzeba narzędzi analitycznych'
            ],
            correctAnswer: 1,
            feedback: 'Dokładnie tak – Google Analytics to uniwersalne narzędzie, ale warto korzystać z różnych narzędzi analitycznych w zależności od kanału marketingowego.'
          }
        ]
      },
      {
        id: '6.2',
        moduleId: '6',
        title: 'Optymalizacja działań marketingowych i podejmowanie decyzji na podstawie danych',
        intro: 'Optymalizacja działań marketingowych oparta na danych to ciągły proces poprawy wyników. Regularna analiza i wprowadzanie zmian prowadzi do lepszych rezultatów.',
        whyImportant: 'Działania marketingowe wymagają ciągłej optymalizacji. Podejmowanie decyzji na podstawie danych, a nie przypuszczeń, prowadzi do bardziej efektywnych kampanii i lepszego wykorzystania budżetu.',
        practicalExample: 'Firma może zauważyć, że kampanie prowadzone w godzinach porannych mają wyższy wskaźnik konwersji, co pozwala na przesunięcie budżetu reklamowego na te godziny.',
        quiz: [
          {
            id: 'q1',
            type: 'open',
            question: 'Co jest kluczowe przy optymalizacji działań marketingowych?',
            keywords: ['dane', 'analiza', 'testowanie', 'pomiary', 'wskaźniki', 'metryki'],
            hint: 'Pomyśl o procesie, który pozwala na ciągłe ulepszanie działań...',
            feedback: 'Dokładnie tak – optymalizacja wymaga regularnej analizy danych, testowania różnych podejść i mierzenia kluczowych wskaźników efektywności.'
          }
        ]
      },
      {
        id: '6.3',
        moduleId: '6',
        title: 'Praktyczne ćwiczenia i warsztaty',
        intro: 'Praktyczne ćwiczenia i warsztaty pozwalają na zastosowanie zdobytej wiedzy w rzeczywistych sytuacjach. To moment na utrwalenie umiejętności i przygotowanie się do samodzielnego działania.',
        whyImportant: 'Teoria bez praktyki ma ograniczoną wartość. Ćwiczenia praktyczne pozwalają na zrozumienie, jak zastosować wiedzę w realnych sytuacjach biznesowych i budują pewność siebie.',
        practicalExample: 'Podczas warsztatów uczestnicy mogą stworzyć własną kampanię reklamową, przeanalizować wyniki i wprowadzić optymalizacje, co daje praktyczne doświadczenie w działaniu.',
        quiz: [
          {
            id: 'q1',
            type: 'open',
            question: 'Dlaczego praktyczne ćwiczenia są ważne w procesie uczenia się marketingu?',
            keywords: ['praktyka', 'doświadczenie', 'zastosowanie', 'umiejętności', 'pewność'],
            hint: 'Pomyśl o różnicy między wiedzą teoretyczną a umiejętnością zastosowania jej w praktyce...',
            feedback: 'Dokładnie tak – praktyczne ćwiczenia pozwalają na zastosowanie wiedzy w rzeczywistych sytuacjach, budowanie doświadczenia i zwiększanie pewności siebie w działaniu.'
          }
        ]
      }
    ]
  }
];

// Helper do znajdowania lekcji
export const findLesson = (lessonId: string): Lesson | undefined => {
  for (const module of trainingModules) {
    const lesson = module.lessons.find(l => l.id === lessonId);
    if (lesson) return lesson;
  }
  return undefined;
};

// Helper do znajdowania modułu
export const findModule = (moduleId: string): Module | undefined => {
  return trainingModules.find(m => m.id === moduleId);
};

// Helper do obliczania całkowitej liczby lekcji
export const getTotalLessons = (): number => {
  return trainingModules.reduce((total, module) => total + module.lessons.length, 0);
};

// Helper do znajdowania następnej lekcji
export const getNextLesson = (currentLessonId: string): Lesson | null => {
  const allLessons: Lesson[] = [];
  trainingModules.forEach(module => {
    allLessons.push(...module.lessons);
  });
  
  const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);
  if (currentIndex === -1 || currentIndex === allLessons.length - 1) {
    return null;
  }
  
  return allLessons[currentIndex + 1];
};

// Helper do znajdowania poprzedniej lekcji
export const getPreviousLesson = (currentLessonId: string): Lesson | null => {
  const allLessons: Lesson[] = [];
  trainingModules.forEach(module => {
    allLessons.push(...module.lessons);
  });
  
  const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);
  if (currentIndex <= 0) {
    return null;
  }
  
  return allLessons[currentIndex - 1];
};

