// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith('/admin');

  // 🛡️ ADMIN AUTH
  if (isAdminRoute) {
    const adminToken = request.cookies.get('adminToken')?.value;

    if (!adminToken) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  // 🔐 USER AUTH
  const userToken = request.cookies.get('session')?.value;

  if (!userToken) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/',
    '/dashboard/:path*',
    '/transactions/:path*',
    '/withdraw/:path*',
    '/transfer/:path*',
    '/send-money/:path*',
    '/support/:path*',
    '/admin/users/',
    '/admin/dashboard/',
    '/admin/users/:path*',
    '/admin/investment-plans/:path*',
    '/admin/investments/:path*',
    '/admin/deposits/:path*',
    '/admin/deposits/',
    '/admin/withdrawals/',
    '/admin/kyc/',
    '/admin/kyc/:path*',
    '/admin/withdrawals/:path*',
    '/admin/transfers/:path*',
    '/admin/support-tickets/:path*',
    '/admin/bonuses/:path*',
    '/admin/wallet/:path*',
  ],
};