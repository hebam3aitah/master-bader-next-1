'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function AdminProjectsDashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('/api/projects/admin');
      setProjects(res.data);
    } catch (err) {
      console.error('فشل في تحميل المشاريع:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('هل تريد فعلاً حذف هذا المشروع؟')) return;
    try {
      await axios.delete(`/api/projects/${id}`);
      fetchProjects();
    } catch (err) {
      console.error('فشل في الحذف:', err);
    }
  };

  return (
    <div className="p-6" dir="rtl">
      <h1 className="text-3xl font-bold mb-4">لوحة التحكم - المشاريع</h1>

      {projects.length === 0 ? (
        <p className="text-gray-500">لا توجد مشاريع حالياً.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map(project => (
            <div key={project._id} className="bg-white rounded-lg shadow p-4 space-y-2">
              <h2 className="text-xl font-bold">{project.title}</h2>
              <p className="text-sm text-gray-600">{project.description}</p>
              <p className="text-sm">الموقع: {project.location}</p>
              <p className="text-sm">الحالة: {project.status}</p>
              <p className="text-sm">الأولوية: {project.priority}</p>
              <p className="text-sm">التصنيف: {project.category?.name}</p>
              {project.issue && (
                <p className="text-sm text-blue-600">من مشكلة: {project.issue.Title}</p>
              )}

              <div className="flex gap-2 mt-3">
                <Link
                  href={`/dashboard/projects/${project._id}/edit`}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                >
                  تعديل
                </Link>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="bg-red-600 hover:bg-red-800 text-white px-3 py-1 rounded text-sm"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
