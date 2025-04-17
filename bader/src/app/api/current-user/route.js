import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/getCurrentUser'; // أو أينما تكون دالتك

export async function GET() {
  const user = await getCurrentUser(); // ستجلب التوكن من الكوكيز وتتحقق من المستخدم

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  return NextResponse.json(user);
}
