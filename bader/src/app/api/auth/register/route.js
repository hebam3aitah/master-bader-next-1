import connectDB from '@/lib/connectDb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { name, email, password, role, phone, address } = await req.json();

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ message: 'البريد الإلكتروني مستخدم مسبقاً' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
      phone,
      address,
    });

    return Response.json({
      message: 'تم إنشاء الحساب بنجاح',
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Register Error:', error);
    return Response.json({ message: 'فشل إنشاء الحساب' }, { status: 500 });
  }
}
