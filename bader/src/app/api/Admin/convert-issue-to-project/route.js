import { connectDB } from '@/lib/mongoose';
import Issue from '@/models/Issue';
import Project from '@/models/Project';
import { sendNotificationToUsers } from '@/lib/notifications'; // نحكي عنها كمان شوي

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();

    const { issueId, updatedData } = data;

    // 1. نحدث بيانات البلاغ لو الأدمن عدل عليها
    const issue = await Issue.findByIdAndUpdate(issueId, updatedData, { new: true });

    if (!issue) {
      return new Response('Issue not found', { status: 404 });
    }

    // 2. ننشئ مشروع جديد بناءً على البلاغ
    const project = await Project.create({
      title: issue.problemType,
      description: issue.description,
      location: issue.location,
      category: issue.category,
      images: issue.images,
      status: 'in-progress',
      priority: issue.severityLevel,
      issue: issue._id,
      reportedAt: new Date(),
    });

    // 3. نربط البلاغ بالمشروع الجديد
    issue.projectId = project._id;
    issue.status = 'converted-to-project';
    await issue.save();

    // 4. نرسل إشعار لكل المستخدمين
    await sendNotificationToUsers({
      title: 'مشروع جديد تم إطلاقه!',
      body: `تم إطلاق مشروع جديد بعنوان: ${project.title}. شارك في دعمه!`,
      link: `/projects/${project._id}`
    });

    return Response.json({ project });
  } catch (error) {
    console.error(error);
    return new Response('Error converting issue', { status: 500 });
  }
}
