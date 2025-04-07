import { connectDB } from '@/lib/mongoose';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(req) {
  try {
    await connectDB();

    const { email, otp } = await req.json();

    if (!email || !otp) {
      return Response.json({ message: 'يرجى إدخال البريد الإلكتروني ورمز التحقق' }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return Response.json({ message: 'هذا البريد غير مسجل' }, { status: 404 });
    }

    if (user.IsConfirmed) {
      return Response.json({ message: 'الحساب مفعل مسبقًا' }, { status: 200 });
    }

    if (user.otp !== otp) {
      return Response.json({ message: 'رمز التحقق غير صحيح' }, { status: 401 });
    }

    // تفعيل الحساب
    user.IsConfirmed = true;
    user.otp = null;
    await user.save();

    // توليد التوكن
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // تخزينه في الكوكيز
    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return Response.json({ message: '✅ تم التحقق وتفعيل الحساب' });
  } catch (error) {
    console.error('OTP VERIFY ERROR:', error);
    return Response.json({ message: '❌ حدث خطأ أثناء التحقق من الرمز' }, { status: 500 });
  }
}
