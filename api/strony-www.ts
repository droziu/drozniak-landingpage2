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
    const { name, email, industry, budget, message } = request.body;

    // Validate required fields
    if (!name || !email || !industry || !budget || !message) {
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
        from: 'Strony WWW <noreply@drozniak.com>', // Zmień na swój zweryfikowany domenę w Resend
        to: ['stanislaw@drozniak.com'], // Twój email
        reply_to: email,
        subject: ownerEmailSubject,
        html: ownerEmailHtml,
      }),
    });

    if (!ownerEmailResponse.ok) {
      const errorData = await ownerEmailResponse.json();
      console.error('Resend API error (owner email):', errorData);
      return response.status(500).json({ error: 'Failed to send email to owner' });
    }

    // Send confirmation email to client
    const clientEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Stanisław Drożniak <noreply@drozniak.com>', // Zmień na swój zweryfikowany domenę w Resend
        to: [email],
        subject: clientEmailSubject,
        html: clientEmailHtml,
      }),
    });

    if (!clientEmailResponse.ok) {
      const errorData = await clientEmailResponse.json();
      console.error('Resend API error (client email):', errorData);
      // Don't fail the request if client email fails, just log it
      console.warn('Failed to send confirmation email to client, but owner email was sent successfully');
    }

    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Strony WWW form error:', error);
    return response.status(500).json({ error: 'Internal server error' });
  }
}

