// import connectDB from '@/lib/connectDb';
// import User from '@/models/User';
// import bcrypt from 'bcryptjs';

// export async function POST(req) {
//   try {
//     const { name, email, password, role, phone, address } = await req.json();

//     await connectDB();

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return Response.json({ message: 'البريد الإلكتروني مستخدم مسبقاً' }, { status: 400 });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role: role || 'user',
//       phone,
//       address,
//     });

//     return Response.json({
//       message: 'تم إنشاء الحساب بنجاح',
//       user: {
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         phone: user.phone,
//         address: user.address,
//       }
//     }, { status: 201 });

//   } catch (error) {
//     console.error('Register Error:', error);
//     return Response.json({ message: 'فشل إنشاء الحساب' }, { status: 500 });
//   }
// }
////////////////////////////////////////////////////////////
// import connectToDatabase from '@/lib/connectDb';
// import User from '@/models/User';
// import bcrypt from 'bcryptjs';
// import nodemailer from 'nodemailer';

// export async function POST(req) {
//   try {
//     const { db } = await connectToDatabase();
//     const body = await req.json();
//     const { name, email, password, phone, address } = body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return Response.json({ message: 'البريد الإلكتروني مستخدم من قبل' }, { status: 400 });
//     }
//     console.log("🚀 Trying to connect to MongoDB...");

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       address,
//       phone,
//       IsConfirmed: false,
//       otp,
//     });

//     await newUser.save();

//     // إعداد البريد الإلكتروني
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: `"منصتنا" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: 'رمز التحقق OTP',
//       text: `رمز التحقق الخاص بك هو: ${otp}`,
//     });

//     return Response.json({ message: '✅ تم إنشاء الحساب. تحقق من بريدك الإلكتروني لإدخال OTP.' });
//   } catch (err) {
//     console.error('Register Error:', err);
//     return Response.json({ message: '❌ حدث خطأ أثناء التسجيل' }, { status: 500 });
//   }
// }
import { connectDB } from '@/lib/mongoose'; // اتصال عبر Mongoose
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, password, phone, address } = await req.json();

    if (!email || !password || !name || !phone || !address) {
      return Response.json({ message: 'يرجى ملء جميع الحقول' }, { status: 400 });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return Response.json({ message: 'البريد الإلكتروني مستخدم مسبقًا' }, { status: 409 });
    }
    console.log("🚀 Trying to send OTP to:", email);

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      IsConfirmed: false,
      otp,
    });

    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"بادر" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'رمز التحقق من البريد الإلكتروني',
      text: `رمز التحقق الخاص بك هو: ${otp}`,
    });
    console.log("📬 Email send info:", info);


    // حفظ الإيميل في sessionStorage في الفرونت (لازم تضيفه هناك)
    return Response.json({ message: 'تم إرسال رمز التحقق إلى بريدك الإلكتروني' }, { status: 200 });

  } catch (err) {
    console.error('❌ Register Error:', err);
    return Response.json({ message: 'حدث خطأ أثناء التسجيل' }, { status: 500 });
  }
}