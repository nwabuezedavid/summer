import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('session')?.value;

  // If not authenticated, redirect to login
  if (!token) {
    return NextResponse.redirect(
      new URL('/login', request.url)
    );
  }

  // Allow request to continue
  return NextResponse.next();
}

/**
 * Run middleware ONLY on protected routes
 */
export const config = {
  matcher: [
    '/dashboard/',
    '/dashboard/:path*',
    '/transactions/:path*',
    '/withdraw/:path*',
    '/send-money/:path*',
    '/support/:path*',
  ],
};
