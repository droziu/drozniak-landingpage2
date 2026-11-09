import { NextRequest, NextResponse } from 'next/server';
import { checkSubmission, clientIp } from '@/lib/antispam';

/** Treść z formularza trafia do HTML maila, więc znaki specjalne zamieniamy na encje. */
const escapeHtml = (v: unknown) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
    const name = str(body.name);
    const email = str(body.email);
    const phone = str(body.phone);
    const company = str(body.company);
    const message = str(body.message);

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Uzupełnij imię, e-mail i wiadomość.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Ten adres e-mail wygląda na niepełny.' }, { status: 400 });
    }

    const verdict = await checkSubmission({
      name,
      email,
      message,
      extra: [phone, company],
      honeypot: str(body.company_website),
      elapsedMs: typeof body.elapsed === 'number' ? body.elapsed : undefined,
      turnstileToken: str(body.turnstileToken) || undefined,
      ip: clientIp(request.headers),
    });
    if (!verdict.ok) {
      console.warn(`Formularz kontaktowy odrzucony: ${verdict.reason}`);
      return verdict.silent
        ? NextResponse.json({ success: true }, { status: 200 })
        : NextResponse.json({ error: verdict.message }, { status: 400 });
    }

    // Tylko lokalnie: nagłówek x-dry-run sprawdza całą ochronę bez wysyłania maila
    if (process.env.NODE_ENV === 'development' && request.headers.get('x-dry-run') === '1') {
      return NextResponse.json({ success: true, dryRun: true }, { status: 200 });
    }

    // Get Resend API key from environment variables
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    // Prepare email content
    const emailSubject = `Nowa wiadomość ze strony - ${name.replace(/[\r\n]+/g, ' ').slice(0, 120)}`;
    const emailHtml = `
      <h2>Nowa wiadomość ze strony kontaktowej</h2>
      <p><strong>Imię i nazwisko:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${phone ? `<p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>` : ''}
      ${company ? `<p><strong>Firma:</strong> ${escapeHtml(company)}</p>` : ''}
      <p><strong>Wiadomość:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      <hr>
      <p style="color: #666; font-size: 12px;">Wiadomość wysłana ze strony kontaktowej</p>
    `;

    // Send email using Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Kontakt <noreply@drozniak.com>',
        to: ['stanislaw@drozniak.com'],
        reply_to: email,
        subject: emailSubject,
        html: emailHtml,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json();
      console.error('Resend API error:', errorData);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
