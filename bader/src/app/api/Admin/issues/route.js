import { connectDB } from '@/lib/mongoose';
import Issue from '@/models/Issue';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await connectDB();
    const issues = await Issue.find({
      status: { $in: ['pending', 'approved'] }
    }).sort({ createdAt: -1 });

    return NextResponse.json(issues);
  } catch (error) {
    console.error(error);
    return new NextResponse('Error fetching issues', { status: 500 });
  }
}
