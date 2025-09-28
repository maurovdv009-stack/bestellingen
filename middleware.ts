import { NextResponse } from 'next/server';

export function middleware(req) {
  const basicAuth = req.headers.get('authorization');

  const USERNAME = process.env.BASIC_AUTH_USER;
  const PASSWORD = process.env.BASIC_AUTH_PASSWORD;

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pass] = Buffer.from(authValue, 'base64').toString().split(':');

    if (user === USERNAME && pass === PASSWORD) {
      return NextResponse.next(); // Toegestaan
    }
  }

  const headers = new Headers();
  headers.set('WWW-Authenticate', 'Basic realm="Dashboard"');
  return new NextResponse('Niet toegestaan', { status: 401, headers });
}

export const config = {
  matcher: ['/index.html', '/dashboard/:path*'], // pas dit aan als jouw dashboard op een andere route staat
};
