import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, company, message, company_website } = request.body;

    // Honeypot check
    if (company_website) {
      return response.status(200).json({ success: true });
    }

    // Validate required fields
    if (!name || !email || !message) {
      return response.status(400).json({ error: 'Missing required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return response.status(400).json({ error: 'Invalid email format' });
    }

    // Get Resend API key from environment variables
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return response.status(500).json({ error: 'Email service not configured' });
    }

    // Prepare email content
    const emailSubject = `Nowa wiadomość ze strony - ${name}`;
    const emailHtml = `
      <h2>Nowa wiadomość ze strony kontaktowej</h2>
      <p><strong>Imię i nazwisko:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
      ${company ? `<p><strong>Firma:</strong> ${company}</p>` : ''}
      <p><strong>Wiadomość:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
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
        from: 'Kontakt <noreply@drozniak.com>', // Zmień na swój zweryfikowany domenę w Resend
        to: ['stanislaw@drozniak.com'], // Twój email
        reply_to: email,
        subject: emailSubject,
        html: emailHtml,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json();
      console.error('Resend API error:', errorData);
      return response.status(500).json({ error: 'Failed to send email' });
    }

    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return response.status(500).json({ error: 'Internal server error' });
  }
}

