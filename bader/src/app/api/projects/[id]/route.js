// // ✅ API لجلب أو تعديل مشروع محدد
// import { connectDB } from '@/lib/mongoose';
// import Project from '@/models/Project';

// export async function GET(_, { params }) {
//   await connectDB();
//   const project = await Project.findById(params.id).populate('category', 'name');
//   if (!project) {
//     return new Response(JSON.stringify({ message: 'المشروع غير موجود' }), { status: 404 });
//   }
//   return Response.json(project);
// }

// export async function PUT(req, { params }) {
//   await connectDB();
//   const data = await req.json();

//   const updated = await Project.findByIdAndUpdate(params.id, data, { new: true });
//   if (!updated) {
//     return new Response(JSON.stringify({ message: 'تعذر تحديث المشروع' }), { status: 404 });
//   }
//   return Response.json(updated);
// }
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Project from '@/models/Project';

export async function GET(req, { params }) {
  await connectDB();
  const project = await Project.findById(params.id);
  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }
  return NextResponse.json(project);
}
