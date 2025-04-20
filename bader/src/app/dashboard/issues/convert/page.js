// ✅ صفحة تحويل بلاغ إلى مشروع
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

export default function ConvertIssuePage() {
  const { id } = useParams();
  const router = useRouter();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    category: '',
    priority: 'medium',
    status: 'in-progress',
  });

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const res = await axios.get(`/api/issues/${id}`);
        const data = res.data;
        setIssue(data);
        setForm({
          title: data.Title || '',
          description: data.Description || '',
          location: data.Location || '',
          category: data.Category?._id || '',
          priority: data.DangerLvl || 'medium',
          status: 'in-progress',
        });
      } catch (err) {
        console.error('فشل تحميل البيانات:', err);
      }
    };
    fetchIssue();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/projects', {
        ...form,
        images: issue.Images || [],
        issueId: id,
      });
      router.push('/dashboard/projects');
    } catch (err) {
      console.error('خطأ في التحويل:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!issue) return <p className="p-6">جاري تحميل بيانات البلاغ...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto" dir="rtl">
      <h1 className="text-2xl font-bold mb-4">تحويل بلاغ إلى مشروع</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">عنوان المشروع</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>

        <div>
          <label className="block font-semibold mb-1">الوصف</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>

        <div>
          <label className="block font-semibold mb-1">الموقع</label>
          <input type="text" name="location" value={form.location} onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>

        <div>
          <label className="block font-semibold mb-1">الأولوية</label>
          <select name="priority" value={form.priority} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="urgent">عاجلة</option>
            <option value="medium">متوسطة</option>
            <option value="low">منخفضة</option>
          </select>
        </div>

        <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          {loading ? 'جارٍ التحويل...' : 'إنشاء المشروع'}
        </button>
      </form>
    </div>
  );
}
