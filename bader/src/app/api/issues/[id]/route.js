import { connectDB } from '@/lib/mongoose';
import Issue from '@/models/Issue';

export async function GET(req, { params }) {
  await connectDB();
  const issue = await Issue.findById(params.id).populate('Category', 'name');
  return Response.json(issue);
}


export async function PUT(req, { params }) {
    await connectDB();
    const data = await req.json();
    const updated = await Issue.findByIdAndUpdate(params.id, data, { new: true });
    return Response.json(updated);
  }