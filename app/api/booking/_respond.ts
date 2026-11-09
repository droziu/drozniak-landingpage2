import { NextResponse } from 'next/server';
import { BookingError } from '@/lib/booking/service';

/** Jednolita odpowiedź z błędem: komunikat po polsku dla użytkownika, szczegóły tylko w logach. */
export function errorResponse(error: unknown) {
  if (error instanceof BookingError) {
    return NextResponse.json(
      { error: error.message, code: error.code, field: error.field, errors: (error as { errors?: unknown }).errors },
      { status: error.status },
    );
  }
  console.error('[booking]', error);
  return NextResponse.json(
    { error: 'Coś poszło nie tak po naszej stronie. Spróbuj za chwilę albo napisz na stanislaw@drozniak.com.', code: 'server' },
    { status: 500 },
  );
}
