
import { connectDB } from '@/lib/mongoose';
import Project from '@/models/Project';
import Category from '@/models/Category';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 4;
    const category = searchParams.get('category');
    const status = searchParams.get('status');

    const skip = (page - 1) * limit;

    let filter = {};
    if (category && category !== 'all') filter['category'] = category;
    if (status && status !== 'all') filter['status'] = status;

    const projects = await Project.find(filter)
      .populate('category', 'name')
      .sort({ reportedAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalCount = await Project.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({ projects, totalCount, totalPages });
  } catch (error) {
    console.error('❌ Error loading projects:', error.message);
    return NextResponse.json({ message: 'خطأ في تحميل المشاريع', error: error.message }, { status: 500 });
  }
}
