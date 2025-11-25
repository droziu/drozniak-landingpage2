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
    const { summary } = request.body;

    // Validate required fields
    if (!summary) {
      return response.status(400).json({ error: 'Missing summary data' });
    }

    // Get Resend API key from environment variables
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return response.status(500).json({ error: 'Email service not configured' });
    }

    // Prepare email content
    const emailSubject = `Nowa diagnoza biznesowa - Doradztwo Hotel Irys`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
        <div style="background-color: #101820; color: white; padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 24px; color: #fee715;">Nowa diagnoza biznesowa</h1>
          <p style="margin: 10px 0 0 0; color: #00C9A7; font-size: 14px;">Doradztwo Hotel Irys</p>
        </div>
        <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; border-left: 4px solid #fee715; margin-bottom: 20px;">
            <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.6;">
              Otrzymałeś nową diagnozę biznesową wypełnioną przez klienta. Poniżej znajduje się pełne podsumowanie odpowiedzi.
            </p>
          </div>
          <div style="background-color: #fafafa; padding: 25px; border-radius: 8px; border: 1px solid #e0e0e0;">
            <pre style="white-space: pre-wrap; font-family: 'Courier New', monospace; font-size: 13px; line-height: 1.6; color: #333; margin: 0;">${summary}</pre>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <p style="margin: 0; color: #999; font-size: 12px; text-align: center;">
              Email wysłany automatycznie z formularza diagnozy biznesowej
            </p>
          </div>
        </div>
      </div>
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
    console.error('Email sending error:', error);
    return response.status(500).json({ error: 'Internal server error' });
  }
}

