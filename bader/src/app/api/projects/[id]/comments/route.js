import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Project from '@/models/Project';

export async function GET(_, { params }) {
  await connectDB();
  const project = await Project.findById(params.id).populate('comments.user', 'name');
  if (!project) return NextResponse.json({ message: 'المشروع غير موجود' }, { status: 404 });

  return NextResponse.json(project.comments);
}

export async function POST(req, { params }) {
  await connectDB();
  const { comment, userId } = await req.json();

  if (!comment || !userId) {
    return NextResponse.json({ message: 'البيانات غير كاملة' }, { status: 400 });
  }

  const project = await Project.findById(params.id);
  if (!project) {
    return NextResponse.json({ message: 'المشروع غير موجود' }, { status: 404 });
  }

  project.comments.push({
    comment,
    user: userId,
    createdAt: new Date(),
  });

  await project.save();
  await project.populate('comments.user', 'name');

  return NextResponse.json(project.comments);
}
