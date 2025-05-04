import { connectDB } from '@/lib/mongoose';
import User from '@/models/User';
import { getToken } from 'next-auth/jwt';
import jwt from 'jsonwebtoken';

export async function PUT(req) {
  await connectDB();

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  let userId;
  if (token?.email && token?.name) {
    // مستخدم Google
    const user = await User.findOne({ email: token.email });
    if (!user) return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    userId = user._id;
  } else {
    // مستخدم JWT
    const rawToken = req.cookies.get('token')?.value;
    if (!rawToken) return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });

    const decoded = jwt.verify(rawToken, process.env.JWT_SECRET);
    userId = decoded.userId;
  }

  const updates = await req.json();

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
    return new Response(JSON.stringify({ message: 'Profile updated successfully', updatedUser }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Failed to update profile' }), { status: 500 });
  }
}
