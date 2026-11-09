import { promises as dns } from 'dns';

/**
 * Ochrona formularzy przed spamem, wspólna dla wszystkich endpointów, które wysyłają maile.
 * Kolejność kontroli: pułapka i czas wypełnienia (boty), limit zapytań, Cloudflare Turnstile,
 * treść (długości, linki), domena maila (czy istnieje i czy nie jest jednorazowa).
 */

export type SpamVerdict =
  /** wygląda na człowieka */
  | { ok: true }
  /** bot: odpowiadamy „sukcesem”, ale nic nie wysyłamy, żeby nie podpowiadać, co go zdradziło */
  | { ok: false; silent: true; reason: string }
  /** błąd, który człowiek może poprawić: komunikat trafia do formularza */
  | { ok: false; silent: false; reason: string; message: string };

// Klucze testowe Cloudflare: zawsze przechodzą. Używane tylko w trybie deweloperskim, gdy brak prawdziwych.
const TEST_SECRET = '1x0000000000000000000000000000000AA';

const MIN_FILL_MS = 2500;
const MAX_LINKS = 2;
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };

const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', 'guerrillamail.com', 'guerrillamail.info', 'sharklasers.com', '10minutemail.com',
  'temp-mail.org', 'tempmail.com', 'yopmail.com', 'trashmail.com', 'getnada.com', 'dispostable.com',
  'maildrop.cc', 'throwawaymail.com', 'fakeinbox.com', 'mintemail.com', 'emailondeck.com', 'tempail.com',
]);

// Limit zapytań w pamięci instancji. Na Vercelu instancji bywa kilka, więc to tylko pierwsza linia obrony.
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT.max;
}

export function clientIp(headers: Headers): string {
  return (
    headers.get('cf-connecting-ip') ||
    headers.get('x-real-ip') ||
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  );
}

async function verifyTurnstile(token: string | undefined, ip: string): Promise<'ok' | 'fail' | 'skipped'> {
  const secret =
    process.env.TURNSTILE_SECRET_KEY || (process.env.NODE_ENV === 'development' ? TEST_SECRET : undefined);
  if (!secret) {
    console.warn('TURNSTILE_SECRET_KEY nie jest ustawiony, weryfikacja Cloudflare pominięta');
    return 'skipped';
  }
  if (!token) return 'fail';
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip !== 'unknown') body.set('remoteip', ip);
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
      signal: AbortSignal.timeout(5000),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success ? 'ok' : 'fail';
  } catch (err) {
    // Gdy Cloudflare nie odpowiada, nie blokujemy prawdziwych ludzi. Reszta kontroli dalej działa.
    console.error('Turnstile siteverify error:', err);
    return 'skipped';
  }
}

/** Czy domena przyjmuje pocztę. Brak rekordów MX i A = adres na pewno nie istnieje. Przy timeoucie przepuszczamy. */
async function domainAcceptsMail(domain: string): Promise<boolean> {
  const withTimeout = <T,>(p: Promise<T>) =>
    Promise.race([p, new Promise<'timeout'>((r) => setTimeout(() => r('timeout'), 2500))]);
  try {
    const mx = await withTimeout(dns.resolveMx(domain));
    if (mx === 'timeout') return true;
    if (mx.length > 0) return true;
  } catch {
    // brak MX: sprawdzamy jeszcze rekord A, bo poczta może iść na sam host
  }
  try {
    const a = await withTimeout(dns.resolve4(domain));
    return a === 'timeout' || a.length > 0;
  } catch {
    return false;
  }
}

const countLinks = (text: string) => (text.match(/https?:\/\/|www\.|\[url|<a\s/gi) ?? []).length;

export interface FormInput {
  name: string;
  email: string;
  message: string;
  extra?: string[];
  honeypot?: string;
  /** ile milisekund minęło od wyświetlenia formularza do wysłania */
  elapsedMs?: number;
  turnstileToken?: string;
  ip: string;
}

export async function checkSubmission(input: FormInput): Promise<SpamVerdict> {
  const { name, email, message, extra = [], honeypot, elapsedMs, turnstileToken, ip } = input;

  if (honeypot) return { ok: false, silent: true, reason: 'honeypot' };
  if (typeof elapsedMs === 'number' && elapsedMs < MIN_FILL_MS) {
    return { ok: false, silent: true, reason: `too fast (${elapsedMs} ms)` };
  }

  if (rateLimited(ip)) {
    return {
      ok: false,
      silent: false,
      reason: 'rate limit',
      message: 'Wysłano już kilka wiadomości. Spróbuj ponownie za kilkanaście minut albo napisz na stanislaw@drozniak.com.',
    };
  }

  const turnstile = await verifyTurnstile(turnstileToken, ip);
  if (turnstile === 'fail') {
    return {
      ok: false,
      silent: false,
      reason: 'turnstile',
      message: 'Nie udało się potwierdzić, że wiadomość wysyła człowiek. Odśwież stronę i spróbuj jeszcze raz.',
    };
  }

  if (name.length > 100 || email.length > 200 || message.length > 5000 || extra.some((v) => v.length > 300)) {
    return { ok: false, silent: true, reason: 'too long' };
  }
  if (countLinks(name) > 0 || extra.some((v) => countLinks(v) > 1)) {
    return { ok: false, silent: true, reason: 'links in short fields' };
  }
  if (countLinks(message) > MAX_LINKS) {
    return {
      ok: false,
      silent: false,
      reason: 'too many links',
      message: 'Wiadomość ma za dużo linków. Zostaw najwyżej dwa.',
    };
  }

  const domain = email.split('@')[1]?.toLowerCase().trim() ?? '';
  if (!domain || DISPOSABLE_DOMAINS.has(domain)) {
    return {
      ok: false,
      silent: false,
      reason: 'disposable email',
      message: 'Podaj stały adres e-mail, na który mogę odpisać.',
    };
  }
  if (!(await domainAcceptsMail(domain))) {
    return {
      ok: false,
      silent: false,
      reason: 'domain without mail',
      message: 'Domena tego adresu e-mail nie przyjmuje poczty. Sprawdź, czy nie ma literówki.',
    };
  }

  return { ok: true };
}
