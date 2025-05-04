'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function EditIssuePage({ params }) {
  const router = useRouter();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ Title: '', Description: '', Location: '', DangerLvl: '' });

  useEffect(() => {بد
    const fetchIssue = async () => {
      try {
        const res = await axios.get(`/api/issues/${params.id}`);
        setIssue(res.data);
        setForm({
          Title: res.data.Title,
          Description: res.data.Description,
          Location: res.data.Location,
          DangerLvl: res.data.DangerLvl,
        });
      } catch (err) {
        console.error('فشل تحميل البلاغ:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchIssue();
  }, [params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/issues/${params.id}`, form);
      alert('✅ تم التعديل بنجاح');
      router.push('/dashboard/issues');
    } catch (err) {
      console.error('خطأ في التحديث:', err);
      alert('❌ حدث خطأ أثناء التحديث');
    }
  };

  if (loading) return <p className="p-6">⏳ جاري تحميل البيانات...</p>;

  return (
    <div className="max-w-xl mx-auto p-6" dir="rtl">
      <h1 className="text-2xl font-bold mb-4">تعديل البلاغ</h1>
      <div className="space-y-4">
        <input name="Title" value={form.Title} onChange={handleChange} placeholder="العنوان" className="w-full border px-4 py-2 rounded" />
        <input name="Location" value={form.Location} onChange={handleChange} placeholder="الموقع" className="w-full border px-4 py-2 rounded" />
        <textarea name="Description" value={form.Description} onChange={handleChange} placeholder="الوصف" rows={4} className="w-full border px-4 py-2 rounded" />
        <select name="DangerLvl" value={form.DangerLvl} onChange={handleChange} className="w-full border px-4 py-2 rounded">
          <option value="low">منخفضة</option>
          <option value="medium">متوسطة</option>
          <option value="high">عالية</option>
        </select>
        <button onClick={handleUpdate} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
          حفظ التعديلات
        </button>
      </div>
    </div>
  );
}
