// import connectToDatabase from '@/lib/connectDb';
// import User from '@/models/User';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET || 'test12341';

// export async function POST(req) {
//   try {
//     const { email, password } = await req.json();

//     await connectToDatabase();

//     // 1. Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return Response.json({ message: 'هذا البريد غير مسجل' }, { status: 404 });
//     }

//     if (!user.IsConfirmed) {
//       return Response.json({ message: 'يرجى تأكيد البريد الإلكتروني قبل تسجيل الدخول' }, { status: 401 });
//     }
    
//     // 2. Check password
//     const isValid = await bcrypt.compare(password, user.password);
//     if (!isValid) {
//       return Response.json({ message: 'كلمة المرور غير صحيحة' }, { status: 401 });
//     }

//     // 3. Create JWT
//     const token = jwt.sign(
//       { id: user._id, email: user.email, role: user.role },
//       JWT_SECRET,
//       { expiresIn: '2h' }
//     );

//     // 4. Return success
//     return Response.json({
//       message: 'تم تسجيل الدخول بنجاح',
//       token,
//       user: {
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       }
//     });

//   } catch (error) {
//     console.error('Login error:', error);
//     return Response.json({ message: 'حدث خطأ في تسجيل الدخول' }, { status: 500 });
//   }
// }
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
