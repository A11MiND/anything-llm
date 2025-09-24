import { NextResponse } from 'next/server';

export function middleware(request) {
  // Clone the request headers and set a new header `x-version`
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-vercel-revalidate', '1');


  // Create a response
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });

  // Set the CSP header
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src * data:; font-src 'self'; object-src 'none'; frame-ancestors 'self';"
  );

  return response;
}

export const config = {
  matcher: '/(.*)',
};
