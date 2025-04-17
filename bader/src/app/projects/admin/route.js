import { connectDB } from '@/lib/mongoose';
import Project from '@/models/Project';

export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find({})
      .populate('category', 'name')
      .populate('issue', 'Title');

    return Response.json(projects);
  } catch (error) {
    console.error('فشل في تحميل المشاريع:', error);
    return new Response('حدث خطأ في السيرفر', { status: 500 });
  }
}
