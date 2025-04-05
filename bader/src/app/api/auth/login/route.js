import connectToDatabase from '@/lib/connectDb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'test12341';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    await connectToDatabase();

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return Response.json({ message: 'هذا البريد غير مسجل' }, { status: 404 });
    }

    // 2. Check password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return Response.json({ message: 'كلمة المرور غير صحيحة' }, { status: 401 });
    }

    // 3. Create JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    // 4. Return success
    return Response.json({
      message: 'تم تسجيل الدخول بنجاح',
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return Response.json({ message: 'حدث خطأ في تسجيل الدخول' }, { status: 500 });
  }
}
