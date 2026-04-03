import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('testilo_token')?.value;

  // Protect all /admin/* routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token) {
      // Redirect to login if user is completely anonymous
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
