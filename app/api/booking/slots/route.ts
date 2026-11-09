import { NextRequest, NextResponse } from 'next/server';
import { getSlots } from '@/lib/booking/service';
import { errorResponse } from '../_respond';

export const dynamic = 'force-dynamic';

// GET /api/booking/slots[?token=...]  wolne terminy na najbliższe tygodnie
export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token') || undefined;
    const data = await getSlots(token);
    return NextResponse.json(data, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    return errorResponse(error);
  }
}
