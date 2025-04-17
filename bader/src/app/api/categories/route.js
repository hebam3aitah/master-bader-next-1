import { connectDB } from '@/lib/mongoose';
import Category from '@/models/Category';

export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find({});
    return Response.json(categories);
  } catch (error) {
    console.error('خطأ في جلب التصنيفات:', error);
    return new Response('خطأ داخلي', { status: 500 });
  }
}
