'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function AdminIssuesDashboard() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const res = await axios.get('/api/issues');
      setIssues(res.data);
    } catch (err) {
      console.error('فشل في تحميل المشاكل:', err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm('هل أنت متأكد أنك تريد حذف هذه المشكلة؟');
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/issues/${id}`);
      fetchIssues(); // إعادة تحميل القائمة بعد الحذف
    } catch (err) {
      console.error('فشل في حذف المشكلة:', err);
    }
  };

  return (
    <div className="p-6" dir="rtl">
      <h1 className="text-3xl font-bold mb-4">لوحة التحكم - المشاكل المبلغ عنها</h1>

      {issues.length === 0 ? (
        <p className="text-gray-600">لا توجد مشاكل حالياً</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {issues.map((issue) => (
            <div key={issue._id} className="bg-white rounded-lg shadow p-4 space-y-2">
              <h2 className="text-xl font-bold">{issue.Title}</h2>
              <p className="text-sm text-gray-600">{issue.Description}</p>
              <p className="text-sm">الموقع: {issue.Location}</p>
              <p className="text-sm">التصنيف: {issue.Category?.name}</p>
              <p className="text-sm">درجة الخطورة: {issue.DangerLvl}</p>

              {issue.projectId ? (
                <p className="text-green-600 font-semibold">
                  ✅ تم تحويلها إلى مشروع: {issue.projectId.title}
                </p>
              ) : (
                <Link
                  href={`/dashboard/issues/${issue._id}/convert`}
                  className="inline-block bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm"
                >
                  تحويل إلى مشروع
                </Link>
              )}

              <div className="flex gap-2 mt-3">
                <Link
                  href={`/dashboard/issues/${issue._id}/edit`}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                >
                  تعديل
                </Link>
                <button
                  onClick={() => handleDelete(issue._id)}
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
