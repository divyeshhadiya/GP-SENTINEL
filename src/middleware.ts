import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow static assets, API endpoints, Swagger docs, and login/signup
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/assets') ||
    pathname.startsWith('/swagger-ui') ||
    pathname.startsWith('/docs') ||
    pathname.startsWith('/openapi.json') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/signup') ||
    pathname === '/favicon.ico' ||
    pathname === '/icon.png'
  ) {
    return NextResponse.next();
  }

  // Check if authenticated cookie exists
  const authCookie = request.cookies.get('sentinel_auth')?.value;
  if (!authCookie || authCookie !== '1') {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
