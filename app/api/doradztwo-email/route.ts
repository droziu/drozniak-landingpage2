import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { summary } = body;

    // Validate required fields
    if (!summary) {
      return NextResponse.json({ error: 'Missing summary data' }, { status: 400 });
    }

    // Get Resend API key from environment variables
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    // Prepare email content
    const emailSubject = `Nowa diagnoza biznesowa - Doradztwo Zef`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
        <div style="background-color: #101820; color: white; padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 24px; color: #fee715;">Nowa diagnoza biznesowa</h1>
          <p style="margin: 10px 0 0 0; color: #00C9A7; font-size: 14px;">Doradztwo Zef - rozwój usług cateringowych</p>
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
      let errorMessage = 'Failed to send email';
      try {
        const contentType = resendResponse.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await resendResponse.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } else {
          const text = await resendResponse.text();
          if (text) {
            errorMessage = text;
          }
        }
      } catch (parseError) {
        console.error('Error parsing Resend API error response:', parseError);
      }
      console.error('Resend API error:', errorMessage);
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
