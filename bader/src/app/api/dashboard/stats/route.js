import { connectDB } from '@/lib/mongoose';
import Project from '@/models/Project';
import Issue from '@/models/Issue';

export async function GET() {
  await connectDB();

  const [projectsCount, issuesCount, projectStatusCounts] = await Promise.all([
    Project.countDocuments(),
    Issue.countDocuments(),
    Project.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ])
  ]);

  const statusChart = projectStatusCounts.map(item => ({
    name: item._id === 'in-progress' ? 'قيد التنفيذ' : item._id === 'completed' ? 'مكتمل' : 'قيد الانتظار',
    value: item.count
  }));

  return Response.json({
    projects: projectsCount,
    issues: issuesCount,
    statusChart
  });
}
