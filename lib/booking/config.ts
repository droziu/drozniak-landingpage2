// Ustawienia umawiania rozmów (strona /umow).
// Ustalone 9.11.2026: rozmowa 20 minut, pon.–pt. 9:00–19:00, najwcześniej następnego dnia, do 6 tygodni do przodu.

export const BOOKING = {
  timeZone: 'Europe/Warsaw',
  title: 'Rozmowa ze Stanisławem Drożniakiem',
  /** Długość rozmowy w minutach. */
  durationMin: 20,
  /** Co ile minut zaczyna się kolejny możliwy termin. */
  stepMin: 30,
  /** Wolny czas przed i po każdym zajętym wydarzeniu w kalendarzu. */
  bufferMin: 10,
  /** Najwcześniej tyle godzin od teraz można zarezerwować termin, i nigdy tego samego dnia. */
  minNoticeHours: 12,
  /** Na ile dni do przodu pokazujemy terminy (6 tygodni). */
  horizonDays: 42,
  /** Najwięcej rozmów jednego dnia. */
  maxPerDay: 10,
  /**
   * Godziny pracy według dnia tygodnia (0 = niedziela, 1 = poniedziałek ...).
   * Każdy przedział to [od, do] w czasie polskim, termin musi się w nim zmieścić w całości.
   */
  hours: {
    1: [['09:00', '19:00']],
    2: [['09:00', '19:00']],
    3: [['09:00', '19:00']],
    4: [['09:00', '19:00']],
    5: [['09:00', '19:00']],
  } as Record<number, [string, string][]>,
  /**
   * Stałe cotygodniowe zajęcia, które blokują terminy niezależnie od kalendarza
   * (obowiązuje też zapas bufferMin). Klucz jak w `hours`.
   */
  weeklyBlocks: {
    2: [['17:00', '18:00']], // wtorek, spotkanie Chess.com
    3: [['16:00', '17:00']], // środa, spotkanie Chess.com
  } as Record<number, [string, string][]>,
  /** Dodatkowe dni wolne (RRRR-MM-DD), poza świętami liczonymi automatycznie. */
  blockedDates: [] as string[],
  /** Przypomnienia mailem: ile minut przed rozmową. */
  reminders: [
    { key: 'reminder_24h_sent_at', beforeMin: 24 * 60, label: 'jutro' },
    { key: 'reminder_1h_sent_at', beforeMin: 60, label: 'za godzinę' },
  ] as const,
  /** Klient może przełożyć albo odwołać rozmowę najpóźniej tyle godzin przed nią. */
  changeCutoffHours: 2,
  hostName: 'Stanisław Drożniak',
  hostEmail: 'stanislaw@drozniak.com',
  fromEmail: 'Stanisław Drożniak <spotkania@drozniak.com>',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://drozniak.pl',
};

export type ReminderKey = (typeof BOOKING.reminders)[number]['key'];
