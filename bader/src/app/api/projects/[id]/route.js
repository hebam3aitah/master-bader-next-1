import { connectDB } from '@/lib/mongoose';
import Project from '@/models/Project';

export async function DELETE(_, { params }) {
  try {
    await connectDB();
    await Project.findByIdAndDelete(params.id);
    return Response.json({ message: 'تم الحذف بنجاح' });
  } catch (error) {
    console.error('خطأ في حذف المشروع:', error);
    return new Response('فشل في الحذف', { status: 500 });
  }
}

export async function GET(_, { params }) {
    await connectDB();
    const project = await Project.findById(params.id).populate('category', 'name');
    return Response.json(project);
  }
  
  export async function PUT(req, { params }) {
    await connectDB();
    const data = await req.json();
    const updated = await Project.findByIdAndUpdate(params.id, data, { new: true });
    return Response.json(updated);
  }