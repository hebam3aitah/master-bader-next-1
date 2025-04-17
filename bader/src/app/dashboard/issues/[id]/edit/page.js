'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function EditIssuePage({ params }) {
  const router = useRouter();
  const [issue, setIssue] = useState(null);
  const [formData, setFormData] = useState({
    Title: '',
    Description: '',
    Location: '',
    DangerLvl: 'low',
  });

  const issueId = params.id;

  useEffect(() => {
    axios.get(`/api/issues/${issueId}`).then(res => {
      setIssue(res.data);
      setFormData({
        Title: res.data.Title,
        Description: res.data.Description,
        Location: res.data.Location,
        DangerLvl: res.data.DangerLvl || 'low',
      });
    });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`/api/issues/${issueId}`, formData);
    router.push('/dashboard/issues');
  };

  if (!issue) return <p className="p-6">جاري تحميل البيانات...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto" dir="rtl">
      <h1 className="text-2xl font-bold mb-4">تعديل المشكلة</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">العنوان</label>
          <input
            name="Title"
            value={formData.Title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">الوصف</label>
          <textarea
            name="Description"
            value={formData.Description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">الموقع</label>
          <input
            name="Location"
            value={formData.Location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">درجة الخطورة</label>
          <select
            name="DangerLvl"
            value={formData.DangerLvl}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="urgent">عالية</option>
            <option value="medium">متوسطة</option>
            <option value="low">منخفضة</option>
          </select>
        </div>

        <button className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded">
          حفظ التعديلات
        </button>
      </form>
    </div>
  );
}
