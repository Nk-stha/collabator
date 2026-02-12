import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_ROUTES = ['/franchise', '/vendor'];
const PUBLIC_ROUTES = ['/login'];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('access_token')?.value;

  const isProtected = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
  if (isProtected && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const isPublic = PUBLIC_ROUTES.some(route => pathname.startsWith(route));
  if (isPublic && token) {
    return NextResponse.redirect(new URL('/franchise/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/franchise/:path*', '/vendor/:path*', '/login'],
};
