import { NextResponse } from 'next/server';

const rateLimitMap = new Map();

export function middleware(request) {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();

  const userData = rateLimitMap.get(ip) || { count: 0, timestamp: now };

  if (now - userData.timestamp < 60000) {
    if (userData.count >= 5) {
      const retryAfter = Math.ceil((60000 - (now - userData.timestamp)) / 1000);
      return new NextResponse(
        JSON.stringify({ message: `عدد كبير من المحاولات، حاول بعد ${retryAfter} ثانية.` }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': retryAfter.toString(),
          },
        }
      );
    } else {
      userData.count += 1;
    }
  } else {
    userData.count = 1;
    userData.timestamp = now;
  }

  rateLimitMap.set(ip, userData);

  return NextResponse.next();
}

export const config = {
    matcher: [
      '/api/auth/forgot-password',
      '/api/auth/verify-reset-otp',
      '/api/auth/reset-password'
    ],
  };