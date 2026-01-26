import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, industry, budget, message } = body;

    // Validate required fields
    if (!name || !email || !industry || !budget || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Get Resend API key from environment variables
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    // Prepare email content for owner
    const ownerEmailSubject = `Nowe zapytanie o stronę WWW - ${name}`;
    const ownerEmailHtml = `
      <h2>Nowe zapytanie o stronę WWW</h2>
      <p><strong>Imię i firma:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Branża:</strong> ${industry}</p>
      <p><strong>Budżet:</strong> ${budget}</p>
      <p><strong>Cel strony:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p style="color: #666; font-size: 12px;">Zapytanie wysłane z formularza stron WWW</p>
    `;

    // Prepare confirmation email for client
    const clientEmailSubject = 'Dziękuję za zapytanie o stronę WWW';
    const clientEmailHtml = `
      <h2>Dziękuję za kontakt!</h2>
      <p>Witaj ${name},</p>
      <p>Otrzymałem Twoje zapytanie dotyczące strony internetowej. Zazwyczaj odpowiadam w ciągu 24 godzin w dni robocze.</p>
      <p>W międzyczasie możesz zarezerwować 20-minutową rozmowę, aby omówić szczegóły:</p>
      <p style="margin: 20px 0;">
        <a href="https://calendly.com/drozniakstanislaw/spotkanie" 
           style="display: inline-block; background: linear-gradient(to right, #fee715, #00C9A7); color: #101820; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
          Umów rozmowę
        </a>
      </p>
      <p>Pozdrawiam,<br>Stanisław Drożniak</p>
      <hr>
      <p style="color: #666; font-size: 12px;">To jest automatyczna wiadomość potwierdzająca otrzymanie Twojego zapytania.</p>
    `;

    // Send email to owner
    const ownerEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Strony WWW <noreply@drozniak.com>',
        to: ['stanislaw@drozniak.com'],
        reply_to: email,
        subject: ownerEmailSubject,
        html: ownerEmailHtml,
      }),
    });

    if (!ownerEmailResponse.ok) {
      const errorData = await ownerEmailResponse.json();
      console.error('Resend API error (owner email):', errorData);
      return NextResponse.json({ error: 'Failed to send email to owner' }, { status: 500 });
    }

    // Send confirmation email to client
    const clientEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Stanisław Drożniak <noreply@drozniak.com>',
        to: [email],
        subject: clientEmailSubject,
        html: clientEmailHtml,
      }),
    });

    if (!clientEmailResponse.ok) {
      const errorData = await clientEmailResponse.json();
      console.error('Resend API error (client email):', errorData);
      console.warn('Failed to send confirmation email to client, but owner email was sent successfully');
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Strony WWW form error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
