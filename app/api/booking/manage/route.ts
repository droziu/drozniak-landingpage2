import { NextRequest, NextResponse } from 'next/server';
import { cancel, getBooking, reschedule, saveBrief } from '@/lib/booking/service';
import { errorResponse } from '../_respond';

export const dynamic = 'force-dynamic';

// GET /api/booking/manage?token=...  szczegóły rezerwacji
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(await getBooking(request.nextUrl.searchParams.get('token') || ''));
  } catch (error) {
    return errorResponse(error);
  }
}

// POST /api/booking/manage  { token, action: 'reschedule', start } | { token, action: 'cancel', reason } | { token, action: 'brief', answers }
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const token = typeof body.token === 'string' ? body.token : '';
    if (body.action === 'reschedule') return NextResponse.json(await reschedule(token, body.start));
    if (body.action === 'cancel') return NextResponse.json(await cancel(token, body.reason));
    if (body.action === 'brief') return NextResponse.json(await saveBrief(token, body.answers));
    return NextResponse.json({ error: 'Nieznana akcja.' }, { status: 400 });
  } catch (error) {
    return errorResponse(error);
  }
}
