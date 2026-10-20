import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const pathname = request.nextUrl.pathname;

  // Protect private/administrative routes from search indexing
  if (pathname.startsWith('/admin') || pathname.startsWith('/api')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
  } else {
    // Standard Google/Bing search indexing directive for public pages
    response.headers.set(
      'X-Robots-Tag',
      'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files and Next internals:
     * - _next/static (static assets)
     * - _next/image (image optimization)
     * - favicon.ico, images, icons
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)',
  ],
};
