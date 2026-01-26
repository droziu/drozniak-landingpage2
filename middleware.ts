import { NextResponse, type NextRequest } from 'next/server';

// Prosty middleware - przekierowania będą obsługiwane przez Client Components w layoutach
export async function middleware(request: NextRequest) {
  // Na razie tylko przekazujemy request dalej
  // Autentykacja będzie sprawdzana w Client Components (layoutach)
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes (handled separately)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api).*)',
  ],
};
