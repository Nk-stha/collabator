import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_ROUTES = ['/franchise', '/vendor'];
const PUBLIC_ROUTES = ['/login'];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('access_token')?.value;

  // Protect dashboard routes - redirect to login if no token
  const isProtected = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
  if (isProtected && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Allow access to login page even if token exists
  // This allows users to re-login if needed
  // The login page itself will clear old tokens
  const isPublic = PUBLIC_ROUTES.some(route => pathname.startsWith(route));
  if (isPublic) {
    // Don't redirect if already on login page
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/franchise/:path*', '/vendor/:path*', '/login'],
};
