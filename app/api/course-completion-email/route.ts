import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, companyName, email, phone, completionDate, additionalQuestion } = body;

    // Validate required fields
    if (!fullName || !companyName || !email || !completionDate) {
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

    // Format date for display
    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString('pl-PL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    };

    // Prepare email content
    const emailSubject = `Ukończenie szkolenia - ${fullName} (${companyName})`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
        <div style="background-color: #101820; color: white; padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 24px; color: #fee715;">Ukończenie szkolenia</h1>
          <p style="margin: 10px 0 0 0; color: #00C9A7; font-size: 14px;">Social Boost: Sztuka Marketingu Online</p>
        </div>
        <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; border-left: 4px solid #fee715; margin-bottom: 20px;">
            <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.6;">
              Użytkownik ukończył szkolenie i przesłał dane do przygotowania zaświadczenia.
            </p>
          </div>
          
          <div style="background-color: #fafafa; padding: 25px; border-radius: 8px; border: 1px solid #e0e0e0; margin-bottom: 20px;">
            <h2 style="margin: 0 0 20px 0; font-size: 18px; color: #101820; border-bottom: 2px solid #fee715; padding-bottom: 10px;">
              Dane do zaświadczenia
            </h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold; width: 200px;">Imię i nazwisko:</td>
                <td style="padding: 8px 0; color: #333;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Nazwa firmy:</td>
                <td style="padding: 8px 0; color: #333;">${companyName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0; color: #333;">${email}</td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Telefon:</td>
                <td style="padding: 8px 0; color: #333;">${phone}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Data ukończenia:</td>
                <td style="padding: 8px 0; color: #333;">${formatDate(completionDate)}</td>
              </tr>
            </table>
          </div>

          ${additionalQuestion ? `
          <div style="background-color: #fafafa; padding: 25px; border-radius: 8px; border: 1px solid #e0e0e0; margin-bottom: 20px;">
            <h2 style="margin: 0 0 15px 0; font-size: 18px; color: #101820; border-bottom: 2px solid #fee715; padding-bottom: 10px;">
              Pytanie do prowadzącego
            </h2>
            <p style="margin: 0; color: #333; line-height: 1.6; white-space: pre-wrap;">${additionalQuestion}</p>
          </div>
          ` : ''}

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <p style="margin: 0; color: #999; font-size: 12px; text-align: center;">
              Email wysłany automatycznie z formularza zakończenia szkolenia
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
    console.error('Course completion email error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
