// // 📁 app/api/admin/issues/route.js
// import { NextResponse } from 'next/server';
// import { connectDB } from '@/lib/mongoose';
// import Issue from '@/models/Issue';

// export async function GET(req) {
//   await connectDB();

//   try {
    

//     // ✅ استخراج الفلترة من الكويري
//     const { searchParams } = new URL(req.url);
//     const status = searchParams.get('status');

//     let query = {};
//     if (status) {
//       query.status = status;
//     }

//     const issues = await Issue.find(query).sort({ createdAt: -1 });
//     return NextResponse.json(issues);
//   } catch (err) {
//     console.error('فشل في جلب البلاغات:', err);
//     return NextResponse.json({ message: 'فشل في جلب البيانات' }, { status: 500 });
//   }
// }
// ✅ app/api/admin/issues/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Issue from '@/models/Issue';

export async function GET(req) {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status'); // مثلاً: "pending"

    let query = {};
    if (status) {
      query.status = status;
    }

    const issues = await Issue.find(query).sort({ createdAt: -1 });

    console.log('✅ عدد النتائج:', issues.length); // 🔍 مهم جدًا
    return NextResponse.json(issues);
  } catch (err) {
    console.error('❌ فشل في جلب البلاغات:', err);
    return NextResponse.json({ message: 'فشل في جلب البيانات' }, { status: 500 });
  }
}
