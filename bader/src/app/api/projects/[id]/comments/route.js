import { connectDB } from '@/lib/mongoose';
import Project from '@/models/Project';

export async function GET(_, { params }) {
  await connectDB();
  const project = await Project.findById(params.id).populate('comments.user', 'name');
  if (!project) return new Response('المشروع غير موجود', { status: 404 });

  return Response.json(project.comments);
}

export async function POST(req, { params }) {
  await connectDB();
  const { comment, userId } = await req.json(); // تأكد إنك تبعث userId من الواجهة

  const updated = await Project.findByIdAndUpdate(
    params.id,
    {
      $push: {
        comments: {
          comment,
          user: userId,
          createdAt: new Date(),
        },
      },
    },
    { new: true }
  ).populate('comments.user', 'name');

  return Response.json(updated.comments);
}
