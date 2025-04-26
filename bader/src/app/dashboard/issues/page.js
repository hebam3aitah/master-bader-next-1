"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Dialog } from "@headlessui/react";

const problemTypes = [
  "مشاكل الطرق والرصيف",
  "إنارة الشوارع",
  "تراكم النفايات",
  "مشاكل الصرف الصحي",
  "حدائق ومساحات عامة",
  "تلوث بيئي",
  "أخرى",
];

export default function AdminIssuesTable() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending");
  const [editIssue, setEditIssue] = useState(null);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newImages, setNewImages] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchIssues();
  }, [filter]);

  const fetchIssues = async () => {
    try {
      const res = await axios.get(`/api/Admin/issues?status=${filter}`);
      setIssues(res.data);
    } catch (err) {
      console.error("فشل في جلب البلاغات:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`/api/issues/${id}`, { ...formData, status: "approved" });
      router.push(`/dashboard/issues/${id}/convert`);
    } catch (err) {
      console.error("فشل في الموافقة:", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post("/api/Admin/reject-issue", { issueId: id });
      fetchIssues();
    } catch (err) {
      console.error("فشل في الرفض:", err);
    }
  };

  const handleEditClick = (issue) => {
    setEditIssue(issue);
    setFormData({
      Title: issue.Title,
      Description: issue.Description,
      Location: issue.Location,
      DangerLvl: issue.DangerLvl,
      Images: issue.Images || [],
      Category: issue.Category || "",
    });
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageRemove = (index) => {
    const updatedImages = [...formData.Images];
    updatedImages.splice(index, 1);
    setFormData({ ...formData, Images: updatedImages });
  };

  const handleNewImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);
  };

  const handleUpdate = async () => {
    setIsSubmitting(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "Images") {
          data.append("Images", JSON.stringify(value));
        } else {
          data.append(key, value);
        }
      });
      newImages.forEach((file) => data.append("newImages", file));
      await axios.put(`/api/issues/${editIssue._id}`, data);
      setEditIssue(null);
      fetchIssues();
    } catch (err) {
      console.error("فشل في التحديث:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p className="text-center mt-10">⏳ جاري تحميل البلاغات...</p>;
  if (issues.length === 0) return <p className="text-center mt-10">🚫 لا يوجد بلاغات {filter === "pending" ? "معلقة" : filter === "approved" ? "مقبولة" : "مرفوضة"}</p>;

  return (
    <div dir="rtl" className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">البلاغات</h1>

      <div className="mb-4">
        <label className="mr-2 font-medium">فلترة حسب الحالة:</label>
        <select
          className="border px-2 py-1 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="pending">معلقة</option>
          <option value="approved">مقبولة</option>
          <option value="rejected">مرفوضة</option>
        </select>
      </div>

      <table className="min-w-full border border-gray-300 text-right">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">النوع</th>
            <th className="border px-4 py-2">الموقع</th>
            <th className="border px-4 py-2">الخطورة</th>
            <th className="border px-4 py-2">مقدم البلاغ</th>
            <th className="border px-4 py-2">رقم الهاتف</th>
            <th className="border px-4 py-2">الخيارات</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => (
            <tr key={issue._id}>
              <td className="border px-4 py-2">{issue.Title}</td>
              <td className="border px-4 py-2">{issue.Location}</td>
              <td className="border px-4 py-2">{issue.DangerLvl}</td>
              <td className="border px-4 py-2">{issue.reporterName}</td>
              <td className="border px-4 py-2">{issue.phone}</td>
              <td className="border px-4 py-2 space-y-1 flex flex-col gap-1">
                <button onClick={() => handleEditClick(issue)} className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">تعديل</button>
                <button onClick={() => handleApprove(issue._id)} className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700">موافقة</button>
                <button onClick={() => handleReject(issue._id)} className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">رفض</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={!!editIssue} onClose={() => setEditIssue(null)} className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <Dialog.Title className="text-xl font-bold mb-4">تعديل بيانات البلاغ</Dialog.Title>
          <div className="space-y-4">
            <label className="block font-semibold">نوع المشكلة</label>
            <select
              name="Title"
              value={formData.Title || ""}
              onChange={handleFormChange}
              className="w-full border px-3 py-2 rounded"
            >
              {problemTypes.map((type, i) => (
                <option key={i} value={type}>{type}</option>
              ))}
            </select>

            <label className="block font-semibold">مكان المشكلة</label>
            <input
              name="Location"
              value={formData.Location || ""}
              onChange={handleFormChange}
              placeholder="مكان المشكلة"
              className="w-full border px-3 py-2 rounded"
            />

            <label className="block font-semibold">درجة الخطورة</label>
            <select
              name="DangerLvl"
              value={formData.DangerLvl || "medium"}
              onChange={handleFormChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="low">منخفضة</option>
              <option value="medium">متوسطة</option>
              <option value="high">مرتفعة</option>
            </select>

            <label className="block font-semibold">وصف المشكلة</label>
            <textarea
              name="Description"
              value={formData.Description || ""}
              onChange={handleFormChange}
              placeholder="وصف المشكلة"
              className="w-full border px-3 py-2 rounded"
            />

            <label className="block font-semibold">الصور المرفقة</label>
            <div className="grid grid-cols-2 gap-2">
              {formData.Images?.map((img, i) => (
                <div key={i} className="relative">
                  <img src={img} alt="مرفق" className="w-full h-24 object-cover rounded" />
                  <button onClick={() => handleImageRemove(i)} className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded">X</button>
                </div>
              ))}
            </div>

            <label className="block font-semibold mt-4">رفع صور جديدة</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleNewImageUpload}
              className="w-full"
            />
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button onClick={() => setEditIssue(null)} className="bg-gray-400 px-4 py-2 rounded text-white">إلغاء</button>
            <button onClick={handleUpdate} disabled={isSubmitting} className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700">
              {isSubmitting ? "جاري التحديث..." : "حفظ التعديلات"}
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
