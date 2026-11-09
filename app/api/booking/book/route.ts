import { NextRequest, NextResponse } from 'next/server';
import { book } from '@/lib/booking/service';
import { errorResponse } from '../_respond';

export const dynamic = 'force-dynamic';

// POST /api/booking/book  nowa rezerwacja
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    return NextResponse.json(await book(body));
  } catch (error) {
    return errorResponse(error);
  }
}
