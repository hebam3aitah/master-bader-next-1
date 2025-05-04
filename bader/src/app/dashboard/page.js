// ✅ Admin Dashboard with Sidebar + Statistics + Chart

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, issues: 0, statusChart: [] });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/dashboard/stats');
       
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error('خطأ في جلب الإحصائيات:', err);
      }
    };
    fetchStats();
  }, []);

  const COLORS = ['#fa9e1b', '#4caf50', '#1976d2'];

  return (
    <div dir="rtl" className="flex min-h-screen">
      
      {/* ✅ Main Content */}
      <main className="flex-1 p-8 bg-gray-50" dir="rtl">
        <h1 className="text-3xl font-bold text-[#31124b] mb-6">الإحصائيات العامة</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-[#31124b] mb-2">عدد المشاريع</h3>
            <p className="text-3xl font-bold text-[#fa9e1b]">{stats.projects}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-[#31124b] mb-2">عدد البلاغات</h3>
            <p className="text-3xl font-bold text-[#fa9e1b]">{stats.issues}</p>
          </div>
        </div>

        {/* ✅ Pie Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-[#31124b] mb-4">نسبة حالات المشاريع</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.statusChart}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {stats.statusChart.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}
