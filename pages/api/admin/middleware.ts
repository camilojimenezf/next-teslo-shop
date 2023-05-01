// middleware.ts
import { getToken } from 'next-auth/jwt';
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(req: NextRequest | any) {
  const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    return new Response(JSON.stringify({ message: 'No autorizado' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  const validRoles = ['admin', 'super-user', 'SEO'];

  if (!validRoles.includes(session.user.role)) {
    return new Response(JSON.stringify({ message: 'No autorizado' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/admin/:path*'
  ],
};
