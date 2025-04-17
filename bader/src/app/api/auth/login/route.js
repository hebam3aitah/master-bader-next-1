
import { connectDB } from '@/lib/mongoose';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ message: 'البريد غير مسجل' }), { status: 404 });
    }

    if (!user.IsConfirmed) {
      return new Response(JSON.stringify({ message: 'يرجى تأكيد البريد الإلكتروني أولاً' }), { status: 403 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ message: 'كلمة المرور غير صحيحة' }), { status: 401 });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    // إعداد الكوكي
    const cookie = `token=${token}; Path=/; HttpOnly; Max-Age=604800; SameSite=Strict; ${
      process.env.NODE_ENV === 'production' ? 'Secure;' : ''
    }`;

    return new Response(JSON.stringify({ message: 'تم تسجيل الدخول بنجاح' }), {
      status: 200,
      headers: {
        'Set-Cookie': cookie,
        'Content-Type': 'application/json',
      },
    });

  } catch (err) {
    console.error('Login Error:', err);
    return new Response(JSON.stringify({ message: 'حدث خطأ أثناء تسجيل الدخول' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
