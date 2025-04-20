'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function ConvertIssuePage({ params }) {
  const router = useRouter();
  const [issue, setIssue] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    category: '',
    images: [],
    status: 'pending',
    priority: 'medium',
  });

  const issueId = params.id;

  useEffect(() => {
    fetchIssue();
  }, []);

  const fetchIssue = async () => {
    try {
      const res = await axios.get(`/api/issues/${issueId}`);
      setIssue(res.data);
      setFormData({
        title: res.data.Title,
        description: res.data.Description,
        location: res.data.Location,
        category: res.data.Category?._id || '',
        images: res.data.Images,
        status: 'pending',
        priority: res.data.DangerLvl || 'medium',
      });
    } catch (err) {
      console.error('فشل في جلب بيانات المشكلة', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/projects', {
        ...formData,
        issue: issueId,
      });

      await axios.put(`/api/issues/${issueId}/link`, {
        projectId: res.data._id,
      });

      router.push('/dashboard/issues');
    } catch (error) {
      console.error('فشل في تحويل المشكلة إلى مشروع:', error);
    }
  };

  if (!issue) return <p className="p-6">جارٍ تحميل البيانات...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto" dir="rtl">
      <h1 className="text-2xl font-bold mb-4">تحويل المشكلة إلى مشروع</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">عنوان المشروع</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">الوصف</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">الموقع</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">الحالة</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="pending">قيد الانتظار</option>
            <option value="in-progress">قيد التنفيذ</option>
            <option value="completed">مكتمل</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">الأولوية</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="urgent">عاجلة</option>
            <option value="medium">متوسطة</option>
            <option value="low">منخفضة</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded"
        >
          إنشاء مشروع
        </button>
      </form>
    </div>
  );
}
