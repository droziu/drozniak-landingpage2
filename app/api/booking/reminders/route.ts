import { NextRequest, NextResponse } from 'next/server';
import { BOOKING } from '@/lib/booking/config';
import { sendReminder } from '@/lib/booking/emails';
import { dueReminders, updateBooking } from '@/lib/booking/store';

export const dynamic = 'force-dynamic';

// GET /api/booking/reminders  wywoływane co 15 minut przez harmonogram (Supabase pg_cron albo Vercel Cron).
// Wymaga nagłówka Authorization: Bearer <CRON_SECRET>.
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Brak dostępu' }, { status: 401 });
  }

  const sent: Record<string, number> = {};
  try {
    for (const reminder of BOOKING.reminders) {
      const due = await dueReminders(reminder.key, reminder.beforeMin);
      sent[reminder.key] = 0;
      for (const booking of due) {
        // Najpierw zaznaczamy, potem wysyłamy: lepiej zgubić jedno przypomnienie niż wysłać je dwa razy.
        await updateBooking(booking.id, { [reminder.key]: new Date().toISOString() });
        if (await sendReminder(booking, booking.manage_token, reminder.label)) sent[reminder.key]++;
      }
    }
    return NextResponse.json({ ok: true, sent });
  } catch (error) {
    console.error('[booking] przypomnienia:', error);
    return NextResponse.json({ ok: false, sent }, { status: 500 });
  }
}
