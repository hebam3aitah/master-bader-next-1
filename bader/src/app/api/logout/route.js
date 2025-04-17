// app/api/logout/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  cookies().delete('token'); // امسح التوكن
  return NextResponse.json({ message: 'تم تسجيل الخروج' });
}
