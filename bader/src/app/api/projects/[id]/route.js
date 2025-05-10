
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
