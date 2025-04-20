
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// 📌 Rate Limiting Map (in-memory)
const rateLimitMap = new Map();

function handleRateLimit(req) {
  const forwardedFor = req.headers.get('x-forwarded-for');
  const ip = forwardedFor?.split(',')[0]?.trim() || 'unknown';
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
  return null;
}

export function middleware(req) {
  const { pathname } = req.nextUrl;
  console.log('✅ Middleware triggered for:', pathname);

  // ✅ Rate limiting للحماية من الهجمات
  if (
    pathname.startsWith('/api/auth/forgot-password') ||
    pathname.startsWith('/api/auth/verify-reset-otp') ||
    pathname.startsWith('/api/auth/reset-password')
  ) {
    const rateResponse = handleRateLimit(req);
    if (rateResponse) return rateResponse;
  }

  // ✅ حماية صفحة /dashboard بالكامل: فقط للأدمن
  if (pathname.startsWith('/dashboard')) {
    const token = req.cookies.get('token')?.value;

    if (!token) {
      console.log('🚫 لا يوجد توكن');
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('🎯 Decoded role:', decoded.role);

      if (!decoded || decoded.role !== 'admin') {
        console.log('🚫 ليس أدمن');
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    } catch (err) {
      console.log('🚫 JWT غير صالح');
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/auth/forgot-password',
    '/api/auth/verify-reset-otp',
    '/api/auth/reset-password',
  ],
};
