// Dokument Google dla każdej rozmowy, w folderze „Rozmowy” na Dysku prowadzącego.
// Uprawnienie drive.file: aplikacja widzi i zmienia tylko pliki, które sama utworzyła.
import { briefRows, type BriefAnswers } from './brief';
import { BOOKING } from './config';
import { accessToken } from './google';
import type { Booking } from './store';
import { formatRange } from './time';

const FOLDER_NAME = 'Rozmowy';
const FOLDER_MIME = 'application/vnd.google-apps.folder';
const DOC_MIME = 'application/vnd.google-apps.document';
/** Znacznik w dokumencie, w miejscu którego pojawią się odpowiedzi klienta. */
const BRIEF_MARKER = '[[ODPOWIEDZI_KLIENTA]]';

async function api<T>(url: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { Authorization: `Bearer ${await accessToken()}`, ...(init.headers || {}) },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Google ${init.method || 'GET'} ${url.split('?')[0]}: ${res.status} ${await res.text()}`);
  return (res.status === 204 ? undefined : await res.json()) as T;
}

let folderId: string | null = null;

async function ensureFolder() {
  if (folderId) return folderId;
  const q = encodeURIComponent(`name = '${FOLDER_NAME}' and mimeType = '${FOLDER_MIME}' and trashed = false`);
  const found = await api<{ files: { id: string }[] }>(`https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id)&pageSize=1`);
  if (found.files[0]) return (folderId = found.files[0].id);
  const created = await api<{ id: string }>('https://www.googleapis.com/drive/v3/files?fields=id', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: FOLDER_NAME, mimeType: FOLDER_MIME }),
  });
  return (folderId = created.id);
}

function esc(value: string | null | undefined) {
  return (value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function docTitle(b: Booking) {
  const date = new Date(b.start_at).toLocaleDateString('sv-SE', { timeZone: BOOKING.timeZone });
  return `${date} ${b.name}${b.company ? ` (${b.company})` : ''}`;
}

function docHtml(b: Booking) {
  const row = (label: string, value: string | null | undefined) =>
    value ? `<p><b>${label}:</b> ${esc(value).replace(/\n/g, '<br>')}</p>` : '';
  const form =
    b.mode === 'phone' ? `Telefon, dzwonię na ${b.phone ?? 'numer z rezerwacji'}` : b.meet_url ? `Google Meet: ${b.meet_url}` : 'Google Meet';
  const answers = briefRows(b.brief as BriefAnswers | null);
  return `<html><body>
<h1>${esc(b.name)}${b.company ? `, ${esc(b.company)}` : ''}</h1>
${row('Termin', `${formatRange(new Date(b.start_at), new Date(b.end_at))}`)}
${row('Forma', form)}
${row('E-mail', b.email)}
${row('Telefon', b.phone)}
${row('Strona', b.website)}
<h2>Czego dotyczy</h2>
<p>${esc(b.topic).replace(/\n/g, '<br>')}</p>
<h2>Odpowiedzi przed rozmową</h2>
${answers.length ? answers.map(([q, a]) => `<p><b>${esc(q)}</b><br>${esc(a).replace(/\n/g, '<br>')}</p>`).join('') : `<p>${BRIEF_MARKER}</p>`}
<h2>Notatki z rozmowy</h2>
<p></p>
</body></html>`;
}

/** Tworzy dokument rozmowy. Zwraca id i adres. */
export async function createCallDoc(b: Booking) {
  const parent = await ensureFolder();
  const boundary = `b${Math.random().toString(36).slice(2)}`;
  const body = [
    `--${boundary}`,
    'Content-Type: application/json; charset=UTF-8',
    '',
    JSON.stringify({ name: docTitle(b), mimeType: DOC_MIME, parents: [parent] }),
    `--${boundary}`,
    'Content-Type: text/html; charset=UTF-8',
    '',
    docHtml(b),
    `--${boundary}--`,
  ].join('\r\n');
  const file = await api<{ id: string; webViewLink: string }>(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink',
    { method: 'POST', headers: { 'Content-Type': `multipart/related; boundary=${boundary}` }, body },
  );
  return { id: file.id, url: file.webViewLink };
}

type DocBody = { body: { content: { startIndex: number; endIndex: number; paragraph?: { elements: { textRun?: { content: string } }[] } }[] } };

/**
 * Wpisuje odpowiedzi klienta w miejsce znacznika, nie ruszając reszty dokumentu (np. Twoich notatek).
 * Gdy znacznika już nie ma (odpowiedzi poprawione drugi raz), dopisuje nową wersję na końcu.
 */
export async function writeBriefToDoc(docId: string, answers: BriefAnswers) {
  const rows = briefRows(answers);
  if (!rows.length) return;
  const doc = await api<DocBody>(`https://docs.googleapis.com/v1/documents/${docId}?fields=body(content(startIndex,endIndex,paragraph(elements(textRun(content)))))`);
  const marker = doc.body.content.find((c) => c.paragraph?.elements.some((e) => e.textRun?.content.includes(BRIEF_MARKER)));
  const last = doc.body.content[doc.body.content.length - 1];

  // Tekst do wstawienia i zakresy pytań do pogrubienia.
  const heading = marker ? '' : '\nOdpowiedzi przed rozmową (poprawione)\n';
  let text = heading;
  const bold: [number, number][] = [];
  for (const [q, a] of rows) {
    bold.push([text.length, text.length + q.length]);
    text += `${q}\n${a}\n\n`;
  }
  text = text.replace(/\n+$/, marker ? '' : '\n');

  const at = marker ? marker.startIndex : last.endIndex - 1;
  const requests: object[] = [];
  if (marker) requests.push({ deleteContentRange: { range: { startIndex: marker.startIndex, endIndex: marker.endIndex - 1 } } });
  requests.push({ insertText: { location: { index: at }, text } });
  requests.push({
    updateTextStyle: { range: { startIndex: at, endIndex: at + text.length }, textStyle: { bold: false }, fields: 'bold' },
  });
  for (const [s, e] of bold) {
    requests.push({ updateTextStyle: { range: { startIndex: at + s, endIndex: at + e }, textStyle: { bold: true }, fields: 'bold' } });
  }
  if (heading) {
    requests.push({
      updateParagraphStyle: {
        range: { startIndex: at + 1, endIndex: at + heading.length },
        paragraphStyle: { namedStyleType: 'HEADING_2' },
        fields: 'namedStyleType',
      },
    });
  }
  await api(`https://docs.googleapis.com/v1/documents/${docId}:batchUpdate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ requests }),
  });
}

/** Podmienia tekst w dokumencie (np. stary termin na nowy po przełożeniu rozmowy). */
export async function replaceInDoc(docId: string, from: string, to: string) {
  await api(`https://docs.googleapis.com/v1/documents/${docId}:batchUpdate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ requests: [{ replaceAllText: { containsText: { text: from, matchCase: true }, replaceText: to } }] }),
  });
}
