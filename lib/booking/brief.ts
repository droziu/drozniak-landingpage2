// Pytania przed rozmową. Klient odpowiada po rezerwacji (strona potwierdzenia i link z maila),
// odpowiedzi trafiają do bazy i do dokumentu Google tej rozmowy. Plik używany i w przeglądarce, i na serwerze.

export type BriefQuestion =
  | { id: string; kind: 'text'; label: string; hint?: string; placeholder: string; rows?: number }
  | { id: string; kind: 'choice'; label: string; hint?: string; options: string[]; multiple?: boolean };

export const BRIEF_QUESTIONS: BriefQuestion[] = [
  {
    id: 'business',
    kind: 'text',
    label: 'Czym zajmuje się Twoja firma i dla kogo pracujecie?',
    placeholder: 'Na przykład: biuro rachunkowe dla małych firm z Krakowa…',
    rows: 3,
  },
  {
    id: 'size',
    kind: 'choice',
    label: 'Ile osób pracuje w firmie?',
    options: ['Tylko ja', '2–10', '11–50', 'Ponad 50'],
  },
  {
    id: 'channels',
    kind: 'choice',
    label: 'Skąd dziś przychodzą do Was klienci?',
    hint: 'Możesz zaznaczyć kilka.',
    options: ['Polecenia', 'Google', 'Media społecznościowe', 'Reklamy płatne', 'Własna sprzedaż', 'Trudno powiedzieć'],
    multiple: true,
  },
  {
    id: 'goal',
    kind: 'text',
    label: 'Co chcesz zmienić albo osiągnąć w najbliższych miesiącach?',
    placeholder: 'Na przykład: więcej zapytań od firm, mniej zależności od poleceń…',
    rows: 3,
  },
  {
    id: 'budget',
    kind: 'choice',
    label: 'Ile mniej więcej możesz przeznaczyć miesięcznie na marketing?',
    hint: 'Razem z budżetem na reklamy. To tylko orientacyjnie.',
    options: ['Do 3 tys. zł', '3–10 tys. zł', 'Ponad 10 tys. zł', 'Jeszcze nie wiem'],
  },
  {
    id: 'more',
    kind: 'text',
    label: 'Chcesz powiedzieć coś jeszcze przed rozmową?',
    placeholder: 'Cokolwiek, co pomoże mi się przygotować…',
    rows: 3,
  },
];

export type BriefAnswers = Record<string, string | string[]>;

/** Czyści odpowiedzi do znanych pytań i dozwolonych opcji. Zwraca null, gdy nie ma żadnej odpowiedzi. */
export function cleanBrief(input: unknown): BriefAnswers | null {
  if (!input || typeof input !== 'object') return null;
  const raw = input as Record<string, unknown>;
  const out: BriefAnswers = {};
  for (const q of BRIEF_QUESTIONS) {
    const v = raw[q.id];
    if (q.kind === 'text') {
      const t = typeof v === 'string' ? v.trim().slice(0, 3000) : '';
      if (t) out[q.id] = t;
    } else {
      const picked = (Array.isArray(v) ? v : [v]).filter((x): x is string => typeof x === 'string' && q.options.includes(x));
      if (picked.length) out[q.id] = q.multiple ? [...new Set(picked)] : picked[0];
    }
  }
  return Object.keys(out).length ? out : null;
}

/** Pary pytanie i odpowiedź w kolejności pytań, tylko te z odpowiedzią. */
export function briefRows(answers: BriefAnswers | null): [string, string][] {
  if (!answers) return [];
  return BRIEF_QUESTIONS.filter((q) => answers[q.id]).map((q) => {
    const v = answers[q.id];
    return [q.label, Array.isArray(v) ? v.join(', ') : v];
  });
}
