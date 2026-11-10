/**
 * Treść starszych wpisów w Supabase ma zaszyte style z marki 1.0 (żółte ramki, granatowy tekst, kolorowe
 * paski z lewej, szarości z Tailwinda). Zamiast migracji bazy zamieniamy je przy wyświetlaniu na kolory
 * i linie z księgi 2.0: tekst w atramencie, pomocniczy w graficie, karty białe z linią 1,5 px, wyróżniona
 * karta z obrysem w atramencie, podkreślenia jak linki. Zieleń sygnałowa zostaje tylko dla kropki.
 */
const SWAPS: [RegExp, string][] = [
  // wyróżniona karta (żółta) i jej pasek z lewej
  [/border:\s*2px solid #fee715/gi, 'border:1.5px solid #161511'],
  [/;?\s*border-left:\s*4px solid #(?:fee715|3b82f6|9ca3af)/gi, ''],
  [/background:\s*#fffbeb/gi, 'background:#FFFFFF'],
  // zwykłe karty
  [/border:\s*2px solid #e5e7eb/gi, 'border:1.5px solid #D6D2C6'],
  [/background:\s*#f9fafb/gi, 'background:#FFFFFF'],
  [/border-radius:\s*6px/gi, 'border-radius:8px'],
  // podkreślenia i cytaty z żółtą kreską
  [/text-decoration-color:\s*#fee715/gi, 'text-decoration-color:rgba(22,21,17,.4)'],
  [/class="my-6 pl-4 border-l-4 border-\[#fee715\]"/gi, 'style="margin:1.5rem 0;padding-left:1rem;border-left:1.5px solid #161511"'],
  // kolory tekstu
  [/#101820/gi, '#161511'],
  [/#6b7280/gi, '#5E5A50'],
  [/#fee715/gi, '#161511'],
  [/#3b82f6/gi, '#161511'],
];

export function brandHtml(html: string): string {
  let out = html;
  for (const [re, to] of SWAPS) out = out.replace(re, to);
  return out;
}

/** Tytuł pisany wersalikami („TRZY GŁÓWNE DROGI”) zamienia na zdaniowy („Trzy główne drogi”). */
export function sentenceCase(text: string): string {
  const letters = text.replace(/[^\p{L}]/gu, '');
  if (letters.length < 4 || letters !== letters.toLocaleUpperCase('pl')) return text;
  const lower = text.toLocaleLowerCase('pl');
  return lower.charAt(0).toLocaleUpperCase('pl') + lower.slice(1);
}
