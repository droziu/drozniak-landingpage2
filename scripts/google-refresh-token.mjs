// Jednorazowe pobranie GOOGLE_REFRESH_TOKEN dla umawiania rozmów (/umow).
//
// Uruchomienie (z katalogu projektu):
//   node scripts/google-refresh-token.mjs
// GOOGLE_CLIENT_ID i GOOGLE_CLIENT_SECRET bierze ze zmiennych albo z .env.local.
//
// W kliencie OAuth w Google Cloud musi być adres przekierowania:
//   http://localhost:53682/oauth2callback
//
// Skrypt otwiera przeglądarkę, prosi o zgodę na konto stanislaw@drozniak.com i zapisuje refresh token
// w .env.local jako GOOGLE_REFRESH_TOKEN (bez wypisywania go w terminalu).
import http from 'node:http';
import fs from 'node:fs';
import { exec } from 'node:child_process';

const ENV_FILE = new URL('../.env.local', import.meta.url);
const envText = fs.existsSync(ENV_FILE) ? fs.readFileSync(ENV_FILE, 'utf8') : '';
const fromEnvFile = (key) => envText.match(new RegExp(`^${key}=(.*)$`, 'm'))?.[1]?.trim().replace(/^["']|["']$/g, '') || '';

function saveToEnvFile(key, value) {
  const current = fs.existsSync(ENV_FILE) ? fs.readFileSync(ENV_FILE, 'utf8') : '';
  const line = `${key}=${value}`;
  const re = new RegExp(`^${key}=.*$`, 'm');
  const next = re.test(current) ? current.replace(re, line) : current.replace(/\n?$/, '\n') + line + '\n';
  fs.writeFileSync(ENV_FILE, next);
}

const PORT = 53682;
const REDIRECT = `http://localhost:${PORT}/oauth2callback`;
const SCOPES = [
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/calendar.readonly',
  // Dokumenty rozmów w folderze „Rozmowy”: tylko pliki utworzone przez tę aplikację.
  'https://www.googleapis.com/auth/drive.file',
];

const clientId = process.env.GOOGLE_CLIENT_ID || fromEnvFile('GOOGLE_CLIENT_ID');
const clientSecret = process.env.GOOGLE_CLIENT_SECRET || fromEnvFile('GOOGLE_CLIENT_SECRET');
if (!clientId || !clientSecret) {
  console.error('Brak GOOGLE_CLIENT_ID albo GOOGLE_CLIENT_SECRET w .env.local.');
  process.exit(1);
}

const authUrl =
  'https://accounts.google.com/o/oauth2/v2/auth?' +
  new URLSearchParams({
    client_id: clientId,
    redirect_uri: REDIRECT,
    response_type: 'code',
    scope: SCOPES.join(' '),
    access_type: 'offline',
    prompt: 'consent',
    login_hint: 'stanislaw@drozniak.com',
  });

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT);
  if (url.pathname !== '/oauth2callback') {
    res.writeHead(404).end();
    return;
  }
  const code = url.searchParams.get('code');
  if (!code) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' }).end(`Brak kodu: ${url.searchParams.get('error')}`);
    return;
  }
  try {
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: REDIRECT,
        grant_type: 'authorization_code',
      }),
    });
    const data = await tokenRes.json();
    if (!data.refresh_token) throw new Error(JSON.stringify(data));
    saveToEnvFile('GOOGLE_REFRESH_TOKEN', data.refresh_token);
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Gotowe, kalendarz połączony. Możesz zamknąć tę kartę.');
    console.log('Gotowe: GOOGLE_REFRESH_TOKEN zapisany w .env.local.');
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Błąd, szczegóły w terminalu.');
    console.error('Nie udało się pobrać tokenu:', error);
  } finally {
    server.close();
  }
});

server.listen(PORT, () => {
  console.log('Otwieram przeglądarkę. Jeśli się nie otworzy, wejdź na:\n' + authUrl + '\n');
  exec(`open "${authUrl}"`);
});
