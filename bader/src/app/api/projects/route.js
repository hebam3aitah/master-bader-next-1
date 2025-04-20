// ✅ API لإنشاء مشروع وربطه بمشكلة
import { connectDB } from '@/lib/mongoose';
import Project from '@/models/Project';
import Issue from '@/models/Issue';

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();

    const {
      title,
      description,
      location,
      category,
      images = [],
      priority,
      status,
      issueId,
    } = data;

    // إنشاء المشروع
    const project = await Project.create({
      title,
      description,
      location,
      category,
      images,
      priority,
      status,
      reportedAt: new Date(),
    });

    // ربطه بالمشكلة الأصلية إن وُجدت
    if (issueId) {
      await Issue.findByIdAndUpdate(issueId, {
        ProjectID: project._id,
      });
    }

    return Response.json(project);
  } catch (err) {
    console.error('فشل إنشاء المشروع:', err);
    return new Response(JSON.stringify({ message: 'فشل في إنشاء المشروع' }), {
      status: 500,
    });
  }
}
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
      .sort({ reportedAt: -1 });

    return Response.json(projects);
  } catch (error) {
    console.error(error);
    return new Response('خطأ في تحميل المشاريع', { status: 500 });
  }
}
