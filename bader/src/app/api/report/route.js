import connectDB from '@/lib/connectDb';
import Issue from '@/models/Issue';
export async function POST(req) {
  try {
    // الطباعة قبل معالجة البيانات
    console.log("📝 Request body:", req.body); 

    await connectDB();
    const body = await req.json();
    console.log("📝 Parsed body:", body);  // تحقق من البيانات بعد التحويل من JSON

    const issue = await Issue.create(body);
    console.log("✅ Issue created:", issue); // تحقق إذا تم إنشاء البلاغ بنجاح

    return new Response(JSON.stringify(issue), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("❌ Error creating issue:", error);
    return new Response(JSON.stringify({ message: 'فشل في إنشاء البلاغ', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
