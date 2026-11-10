// Maile przez Resend: potwierdzenie, przypomnienia, zmiany. Zaproszenie do kalendarza wysyła sam Google.
import { briefRows, type BriefAnswers } from './brief';
import { BOOKING } from './config';
import type { Booking } from './store';
import { formatRange } from './time';

function esc(value: string | null | undefined) {
  return (value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function manageUrl(token: string) {
  return `${BOOKING.siteUrl}/umow/rezerwacja/${token}`;
}

export function briefUrl(token: string) {
  return `${manageUrl(token)}#pytania`;
}

function when(b: Booking) {
  return `${formatRange(new Date(b.start_at), new Date(b.end_at))} (czas polski)`;
}

/**
 * Szablon według księgi marki („Podpis maila i newsletter”): szerokość 600 px, tekst Arial 16 px
 * z interlinią 1,55, napis jako PNG z tłem w kolorze papieru (tryb ciemny nie zrobi z niego czarnego
 * napisu na czarnym tle), stopka 13 px w graficie z dopiskiem, telefonem i adresem strony.
 */
function layout(body: string) {
  return `<!doctype html><html lang="pl"><body style="margin:0;background:#F6F5F1;font-family:Arial,Helvetica,sans-serif;color:#161511;">
<div style="max-width:600px;margin:0 auto;padding:32px 20px;">
<p style="margin:0 0 20px;"><a href="${BOOKING.siteUrl}"><img src="${BOOKING.siteUrl}/images/brand/drozniak-napis-mail-240.png" width="128" alt="Drożniak" style="display:block;border:0;"></a></p>
<div style="background:#FFFFFF;border-radius:16px;padding:32px;font-size:16px;line-height:1.55;">${body}</div>
<p style="font-size:13px;line-height:1.5;color:#5E5A50;margin:20px 4px 0;">Stanisław Drożniak<br>Marketing i pozyskiwanie klientów dla firm<br>+48 792 491 196 | <a href="${BOOKING.siteUrl}" style="color:#5E5A50;">drozniak.pl</a></p>
</div></body></html>`;
}

/** Przycisk atramentowy, co najmniej 44 px wysokości, tekst 16 px pogrubiony, bez kropki. */
function button(href: string, label: string) {
  return `<a href="${href}" style="display:inline-block;background:#161511;color:#F6F5F1;font-size:16px;font-weight:bold;line-height:20px;text-decoration:none;padding:14px 24px;border-radius:999px;">${label}</a>`;
}

function meetBlock(b: Booking) {
  if (b.mode === 'phone') {
    return `<p style="margin:0 0 20px;">W umówionym terminie zadzwonię na numer <strong>${esc(b.phone)}</strong>.</p>`;
  }
  return b.meet_url
    ? `<p style="margin:0 0 20px;">${button(b.meet_url, 'Dołącz do rozmowy w Google Meet')}</p>`
    : `<p style="margin:0 0 20px;">Link do Google Meet jest w zaproszeniu w Twoim kalendarzu.</p>`;
}

/** Zachęta do odpowiedzi na pytania, dopóki klient ich nie wypełnił. */
function briefBlock(b: Booking, token: string | null) {
  if (!token || b.brief_submitted_at) return '';
  return `<div style="background:#F6F5F1;border-radius:16px;padding:20px 20px 4px;margin:0 0 20px;">
<p style="margin:0 0 8px;font-family:Georgia,'Times New Roman',serif;font-size:20px;font-weight:bold;">Kilka pytań przed rozmową</p>
<p style="margin:0 0 16px;">Odpowiedz na kilka krótkich pytań o firmę. Zajmie to 2 minuty, a ja przyjdę na rozmowę przygotowany.</p>
<p style="margin:0 0 16px;">${button(briefUrl(token), 'Odpowiedz na pytania')}</p>
</div>`;
}

function manageLine(token: string) {
  return `<p style="margin:0;font-size:14px;color:#5E5A50;">Jeśli termin przestanie Ci pasować, możesz go <a href="${manageUrl(token)}" style="color:#161511;">przełożyć albo odwołać</a>.</p>`;
}

async function send(to: string, subject: string, html: string, replyTo?: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('Brak RESEND_API_KEY');
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      from: process.env.BOOKING_FROM_EMAIL || BOOKING.fromEmail,
      to: [to],
      reply_to: replyTo || BOOKING.hostEmail,
      subject,
      html,
    }),
  });
  if (!res.ok) throw new Error(`Resend: ${res.status} ${await res.text()}`);
}

/** Wysyła maila i tylko loguje błąd: rezerwacja w kalendarzu jest ważniejsza niż mail. */
async function sendSafe(to: string, subject: string, html: string, replyTo?: string) {
  try {
    await send(to, subject, html, replyTo);
    return true;
  } catch (error) {
    console.error('[booking] mail nie wyszedł:', subject, error);
    return false;
  }
}

export function sendConfirmation(b: Booking, token: string) {
  const invite =
    b.mode === 'phone'
      ? 'Zaproszenie do kalendarza przyszło osobnym mailem od Google.'
      : 'Zaproszenie z linkiem do Google Meet przyszło osobnym mailem od Google i jest już w Twoim kalendarzu.';
  return sendSafe(
    b.email,
    `Potwierdzenie rozmowy: ${formatRange(new Date(b.start_at), new Date(b.end_at))}`,
    layout(`<p style="margin:0 0 16px;">Dzień dobry,</p>
<p style="margin:0 0 16px;">dziękuję za umówienie rozmowy. Termin:</p>
<p style="margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:1.25;font-weight:bold;">${esc(when(b))}</p>
<p style="margin:0 0 16px;">${invite} Rozmowa trwa ${BOOKING.durationMin} minut.</p>
${meetBlock(b)}
${briefBlock(b, token)}
<p style="margin:0 0 16px;">Dzień przed rozmową i godzinę przed nią wyślę krótkie przypomnienie.</p>
${manageLine(token)}
<p style="margin:20px 0 0;">Do usłyszenia,<br>Stanisław</p>`),
  );
}

export function sendHostNotice(b: Booking, kind: 'new' | 'moved' | 'cancelled') {
  const titles = { new: 'Nowa rozmowa', moved: 'Przełożona rozmowa', cancelled: 'Odwołana rozmowa' };
  const rows: [string, string | null][] = [
    ['Termin', when(b)],
    ['Forma', b.mode === 'phone' ? `Telefon, dzwonisz na ${b.phone}` : 'Google Meet'],
    ['Imię i nazwisko', b.name],
    ['E-mail', b.email],
    ['Telefon', b.phone],
    ['Firma', b.company],
    ['Strona', b.website],
    ['Czego dotyczy', b.topic],
    ['Skąd', b.source],
    ['Powód odwołania', kind === 'cancelled' ? b.cancel_reason : null],
    ['Dokument rozmowy', b.doc_url],
  ];
  return sendSafe(
    BOOKING.hostEmail,
    `${titles[kind]}: ${b.name}${b.company ? ` (${b.company})` : ''}, ${formatRange(new Date(b.start_at), new Date(b.end_at))}`,
    layout(
      `<p style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:1.25;font-weight:bold;">${titles[kind]}</p>` +
        rows
          .filter(([, v]) => v)
          .map(([k, v]) => `<p style="margin:0 0 10px;"><strong>${k}:</strong><br>${esc(v).replace(/\n/g, '<br>')}</p>`)
          .join(''),
    ),
    b.email,
  );
}

export function sendReminder(b: Booking, token: string | null, label: string) {
  return sendSafe(
    b.email,
    `Przypomnienie: rozmowa ${label}, ${formatRange(new Date(b.start_at), new Date(b.end_at))}`,
    layout(`<p style="margin:0 0 16px;">Dzień dobry,</p>
<p style="margin:0 0 16px;">przypominam o naszej rozmowie ${label}:</p>
<p style="margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:1.25;font-weight:bold;">${esc(when(b))}</p>
${meetBlock(b)}
${briefBlock(b, token)}
${token ? manageLine(token) : `<p style="margin:0;font-size:14px;color:#5E5A50;">Jeśli coś Ci wypadło, po prostu odpisz na tego maila.</p>`}
<p style="margin:20px 0 0;">Do usłyszenia,<br>Stanisław</p>`),
  );
}

export function sendMoved(b: Booking, token: string) {
  return sendSafe(
    b.email,
    `Nowy termin rozmowy: ${formatRange(new Date(b.start_at), new Date(b.end_at))}`,
    layout(`<p style="margin:0 0 16px;">Dzień dobry,</p>
<p style="margin:0 0 16px;">rozmowa jest przełożona. Nowy termin:</p>
<p style="margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:1.25;font-weight:bold;">${esc(when(b))}</p>
<p style="margin:0 0 16px;">Wydarzenie w Twoim kalendarzu zaktualizuje się samo${b.mode === 'phone' ? '.' : ', link do Google Meet zostaje ten sam.'}</p>
${meetBlock(b)}
${manageLine(token)}
<p style="margin:20px 0 0;">Do usłyszenia,<br>Stanisław</p>`),
  );
}

export function sendCancelled(b: Booking) {
  return sendSafe(
    b.email,
    'Rozmowa odwołana',
    layout(`<p style="margin:0 0 16px;">Dzień dobry,</p>
<p style="margin:0 0 16px;">rozmowa zaplanowana na ${esc(when(b))} jest odwołana, a wydarzenie zniknie z Twojego kalendarza.</p>
<p style="margin:0 0 20px;">Jeśli zechcesz porozmawiać w innym terminie, wybierz go tutaj:</p>
<p style="margin:0 0 20px;">${button(`${BOOKING.siteUrl}/umow`, 'Wybierz nowy termin')}</p>
<p style="margin:0;">Pozdrawiam,<br>Stanisław</p>`),
  );
}

/** Do prowadzącego: klient odpowiedział na pytania przed rozmową. */
export function sendBriefNotice(b: Booking) {
  const rows = briefRows(b.brief as BriefAnswers | null);
  return sendSafe(
    BOOKING.hostEmail,
    `Odpowiedzi przed rozmową: ${b.name}${b.company ? ` (${b.company})` : ''}, ${formatRange(new Date(b.start_at), new Date(b.end_at))}`,
    layout(
      `<p style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:1.25;font-weight:bold;">Odpowiedzi przed rozmową</p>
<p style="margin:0 0 16px;">${esc(b.name)}, ${esc(when(b))}</p>` +
        rows.map(([q, a]) => `<p style="margin:0 0 12px;"><strong>${esc(q)}</strong><br>${esc(a).replace(/\n/g, '<br>')}</p>`).join('') +
        (b.doc_url ? `<p style="margin:20px 0 0;">${button(b.doc_url, 'Otwórz dokument rozmowy')}</p>` : ''),
    ),
    b.email,
  );
}
