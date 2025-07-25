import { NextResponse } from 'next/server';

export function middleware(request) {
  const isLoggedIn = request.cookies.get('isLoggedIn')?.value;
  const isOtpVerified = request.cookies.get('isOtpVerified')?.value;

  if (
    request.nextUrl.pathname.startsWith('/dashboard') &&
    (!isLoggedIn || !isOtpVerified)
  ) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard'],
}; 