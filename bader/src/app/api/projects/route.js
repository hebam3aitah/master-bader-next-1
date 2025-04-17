import { connectDB } from '@/lib/mongoose';
import Project from '@/models/Project';

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    let filter = {};
    if (status && ['pending', 'in-progress', 'completed'].includes(status)) {
      filter.status = status;
    }

    const projects = await Project.find(filter)
      .populate('category', 'name')
      .populate('likes', 'name')
      .populate('comments.user', 'name');

    return Response.json(projects);
  } catch (error) {
    console.error(error);
    return new Response('خطأ في تحميل المشاريع', { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    // تحقق مبدئي من البيانات المطلوبة
    if (!body.title || !body.description || !body.category) {
      return new Response('البيانات الأساسية ناقصة', { status: 400 });
    }

    const newProject = new Project({
      title: body.title,
      description: body.description,
      location: body.location || '',
      category: body.category,
      images: body.images || [],
      status: body.status || 'pending',
      priority: body.priority || 'medium',
      likes: [],
      comments: [],
      shareCount: 0,
    });

    await newProject.save();

    return Response.json(newProject, { status: 201 });
  } catch (error) {
    console.error('خطأ في إضافة المشروع:', error);
    return new Response('فشل في إضافة المشروع', { status: 500 });
  }
}
