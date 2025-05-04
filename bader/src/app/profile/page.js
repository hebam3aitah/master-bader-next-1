
// "use client";

// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   FaEdit, FaMapMarkerAlt, FaPhone, FaUser, FaClipboardCheck, 
//   FaRegClock, FaExclamationTriangle, FaStar, FaMedal, 
//   FaTrophy, FaBell, FaCheckCircle, FaClock, FaBellSlash
// } from 'react-icons/fa';

// export default function UserProfile() {
//   // بيانات المستخدم القابلة للتعديل
//   const [userData, setUserData] = useState({
//     name: "أحمد محمد",
//     phone: "0599123456",
//     location: "حي الياسمين، شارع الزهور"
//   });

//   // حالة التعديل
//   const [editing, setEditing] = useState(null);
//   const [editValue, setEditValue] = useState("");

//   // المشاريع التي تطوع فيها المستخدم
//   const [completedProjects] = useState([
//     { id: 1, title: "تنظيف حديقة الحي", date: "2025-03-20", hours: 4, status: "مكتمل" },
//     { id: 2, title: "دهان مقاعد الحديقة العامة", date: "2025-03-10", hours: 6, status: "مكتمل" },
//     { id: 3, title: "زراعة أشجار في الشارع الرئيسي", date: "2025-02-15", hours: 5, status: "مكتمل" }
//   ]);

//   // المشاريع المتاحة للتطوع
//   const [availableProjects] = useState([
//     { id: 4, title: "صيانة ملعب الأطفال", date: "2025-04-25", estimatedHours: 5, status: "متاح" },
//     { id: 5, title: "طلاء جدران المدرسة", date: "2025-05-01", estimatedHours: 8, status: "متاح" }
//   ]);

//   // المشاكل التي أبلغ عنها المستخدم
//   const [reportedIssues] = useState([
//     { id: 1, title: "كسر في رصيف الشارع الرئيسي", date: "2025-04-01", status: "قيد المعالجة" },
//     { id: 2, title: "إنارة معطلة في حديقة الحي", date: "2025-03-25", status: "تمت المعالجة" },
//     { id: 3, title: "تجمع مياه في شارع الزهور", date: "2025-04-10", status: "في انتظار المراجعة" }
//   ]);

//   // إشعارات المستخدم
//   const [notifications, setNotifications] = useState([
//     { 
//       id: 1, 
//       title: "تم تحديث حالة مشكلة", 
//       message: "تم بدء العمل على مشكلة 'كسر في رصيف الشارع الرئيسي'",
//       date: "2025-04-05",
//       isRead: false,
//       type: "issue"
//     },
//     { 
//       id: 2, 
//       title: "مشروع جديد متاح", 
//       message: "مشروع جديد متاح للتطوع: 'صيانة ملعب الأطفال'",
//       date: "2025-04-02",
//       isRead: true,
//       type: "project"
//     },
//     { 
//       id: 3, 
//       title: "حصلت على شارة جديدة", 
//       message: "مبروك! لقد حصلت على شارة 'المتطوع النشط'",
//       date: "2025-03-30",
//       isRead: false,
//       type: "badge"
//     }
//   ]);

//   // شارات المستخدم
//   const [badges] = useState([
//     { id: 1, name: "المتطوع النشط", icon: <FaMedal className="text-[#fa9e1b]" />, description: "أكملت 3 مشاريع تطوعية", achieved: true },
//     { id: 2, name: "مراقب الحي", icon: <FaExclamationTriangle className="text-[#fa9e1b]" />, description: "أبلغت عن 3 مشاكل في الحي", achieved: true },
//     { id: 3, name: "متطوع الذهبي", icon: <FaTrophy className="text-[#fa9e1b]" />, description: "وصلت إلى 15 ساعة تطوع", achieved: false, progress: 15, current: 15 },
//     { id: 4, name: "مصلح المجتمع", icon: <FaStar className="text-[#fa9e1b]" />, description: "شاركت في 10 مشاريع تطوعية", achieved: false, progress: 10, current: 3 }
//   ]);

//   // إظهار الإشعارات
//   const [showNotifications, setShowNotifications] = useState(false);
  
//   // الإحصائيات
//   const totalVolunteerHours = completedProjects.reduce((sum, project) => sum + project.hours, 0);
//   const totalCompletedProjects = completedProjects.length;
//   const totalReportedIssues = reportedIssues.length;
//   const resolvedIssues = reportedIssues.filter(issue => issue.status === "تمت المعالجة").length;

//   // بدء التعديل
//   const startEdit = (field) => {
//     setEditing(field);
//     setEditValue(userData[field]);
//   };

//   // حفظ التعديل
//   const saveEdit = () => {
//     if (editing) {
//       setUserData({ ...userData, [editing]: editValue });
//     }
//     setEditing(null);
//   };

//   // إلغاء التعديل
//   const cancelEdit = () => {
//     setEditing(null);
//   };

//   // تحديد حالة قراءة الإشعار
//   const markNotificationAsRead = (id) => {
//     setNotifications(notifications.map(notification => 
//       notification.id === id ? { ...notification, isRead: true } : notification
//     ));
//   };

//   // عدد الإشعارات غير المقروءة
//   const unreadCount = notifications.filter(n => !n.isRead).length;

//   // لون الحالة
//   const getStatusColor = (status) => {
//     switch (status) {
//       case "مكتمل":
//       case "تمت المعالجة":
//         return "bg-green-500";
//       case "قيد المعالجة":
//         return "bg-blue-500";
//       case "متاح":
//         return "bg-[#fa9e1b]";
//       case "في انتظار المراجعة":
//         return "bg-purple-500";
//       default:
//         return "bg-gray-500";
//     }
//   };

//   // أيقونة نوع الإشعار
//   const getNotificationIcon = (type) => {
//     switch (type) {
//       case "issue":
//         return <FaExclamationTriangle className="text-red-500" />;
//       case "project":
//         return <FaClipboardCheck className="text-blue-500" />;
//       case "badge":
//         return <FaMedal className="text-[#fa9e1b]" />;
//       default:
//         return <FaBell className="text-gray-500" />;
//     }
//   };

//   return (
//     <div   dir="rtl" className="min-h-screen bg-gray-50">
    

//       <div className="container mx-auto p-4">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* القسم الأيمن - معلومات المستخدم والإحصائيات والشارات */}
//           <div className="lg:col-span-1 space-y-6">
//             {/* معلومات المستخدم */}
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <div className="bg-white p-6 rounded-lg shadow-md">
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="text-xl font-bold text-[#31124b]">الملف الشخصي</h2>
//                   <div className="h-16 w-16 rounded-full bg-[#fa9e1b] flex items-center justify-center text-white text-2xl">
//                     <FaUser />
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   {/* الاسم */}
//                   <div className="flex items-center justify-between p-3 border-b">
//                     <div className="flex items-center space-x-2 rtl:space-x-reverse">
//                       <FaUser className="text-[#fa9e1b]" />
//                       <span className="font-medium mr-2">الاسم:</span>
//                     </div>
                    
//                     {editing === 'name' ? (
//                       <div className="flex items-center">
//                         <input 
//                           type="text" 
//                           value={editValue} 
//                           onChange={(e) => setEditValue(e.target.value)} 
//                           className="border border-gray-300 p-1 rounded"
//                           dir="rtl"
//                         />
//                         <button onClick={saveEdit} className="text-green-600 mx-1">حفظ</button>
//                         <button onClick={cancelEdit} className="text-red-600 mx-1">إلغاء</button>
//                       </div>
//                     ) : (
//                       <div className="flex items-center">
//                         <span>{userData.name}</span>
//                         <button onClick={() => startEdit('name')} className="text-[#fa9e1b] mr-2">
//                           <FaEdit />
//                         </button>
//                       </div>
//                     )}
//                   </div>

//                   {/* رقم الهاتف */}
//                   <div className="flex items-center justify-between p-3 border-b">
//                     <div className="flex items-center space-x-2 rtl:space-x-reverse">
//                       <FaPhone className="text-[#fa9e1b]" />
//                       <span className="font-medium mr-2">رقم الهاتف:</span>
//                     </div>
                    
//                     {editing === 'phone' ? (
//                       <div className="flex items-center">
//                         <input 
//                           type="text" 
//                           value={editValue} 
//                           onChange={(e) => setEditValue(e.target.value)} 
//                           className="border border-gray-300 p-1 rounded" 
//                           dir="rtl"
//                         />
//                         <button onClick={saveEdit} className="text-green-600 mx-1">حفظ</button>
//                         <button onClick={cancelEdit} className="text-red-600 mx-1">إلغاء</button>
//                       </div>
//                     ) : (
//                       <div className="flex items-center">
//                         <span>{userData.phone}</span>
//                         <button onClick={() => startEdit('phone')} className="text-[#fa9e1b] mr-2">
//                           <FaEdit />
//                         </button>
//                       </div>
//                     )}
//                   </div>

//                   {/* المكان */}
//                   <div className="flex items-center justify-between p-3">
//                     <div className="flex items-center space-x-2 rtl:space-x-reverse">
//                       <FaMapMarkerAlt className="text-[#fa9e1b]" />
//                       <span className="font-medium mr-2">المكان:</span>
//                     </div>
                    
//                     {editing === 'location' ? (
//                       <div className="flex items-center">
//                         <input 
//                           type="text" 
//                           value={editValue} 
//                           onChange={(e) => setEditValue(e.target.value)} 
//                           className="border border-gray-300 p-1 rounded" 
//                           dir="rtl"
//                         />
//                         <button onClick={saveEdit} className="text-green-600 mx-1">حفظ</button>
//                         <button onClick={cancelEdit} className="text-red-600 mx-1">إلغاء</button>
//                       </div>
//                     ) : (
//                       <div className="flex items-center">
//                         <span>{userData.location}</span>
//                         <button onClick={() => startEdit('location')} className="text-[#fa9e1b] mr-2">
//                           <FaEdit />
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             {/* لوحة الإحصائيات */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <div className="bg-white p-6 rounded-lg shadow-md">
//                 <h2 className="text-xl font-bold text-[#31124b] mb-4">الإحصائيات</h2>
                
//                 <div className="grid grid-cols-2 gap-4">
//                   {/* إجمالي ساعات التطوع */}
//                   <div className="bg-gradient-to-r from-[#31124b] to-[#42195e] p-4 rounded-lg text-white">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <p className="text-xs opacity-75">إجمالي ساعات التطوع</p>
//                         <p className="text-2xl font-bold">{totalVolunteerHours}</p>
//                       </div>
//                       <div className="text-3xl opacity-75">
//                         <FaClock />
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* عدد المشاريع المكتملة */}
//                   <div className="bg-gradient-to-r from-[#fa9e1b] to-[#f8b957] p-4 rounded-lg text-white">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <p className="text-xs opacity-75">المشاريع المكتملة</p>
//                         <p className="text-2xl font-bold">{totalCompletedProjects}</p>
//                       </div>
//                       <div className="text-3xl opacity-75">
//                         <FaClipboardCheck />
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* عدد المشاكل المبلغ عنها */}
//                   <div className="bg-gradient-to-r from-[#fa9e1b] to-[#f8b957] p-4 rounded-lg text-white">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <p className="text-xs opacity-75">المشاكل المبلغ عنها</p>
//                         <p className="text-2xl font-bold">{totalReportedIssues}</p>
//                       </div>
//                       <div className="text-3xl opacity-75">
//                         <FaExclamationTriangle />
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* عدد المشاكل التي تمت معالجتها */}
//                   <div className="bg-gradient-to-r from-[#31124b] to-[#42195e] p-4 rounded-lg text-white">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <p className="text-xs opacity-75">المشاكل المحلولة</p>
//                         <p className="text-2xl font-bold">{resolvedIssues}</p>
//                       </div>
//                       <div className="text-3xl opacity-75">
//                         <FaCheckCircle />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             {/* الشارات والإنجازات */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//             >
//               <div className="bg-white p-6 rounded-lg shadow-md">
//                 <h2 className="text-xl font-bold text-[#31124b] mb-4">الشارات والإنجازات</h2>
                
//                 <div className="space-y-4">
//                   {badges.map((badge) => (
//                     <div key={badge.id} className="border rounded-lg p-4">
//                       <div className="flex items-center">
//                         <div className={`p-3 rounded-full ${badge.achieved ? 'bg-[#fa9e1b] bg-opacity-20' : 'bg-gray-200'} mr-4`}>
//                           {badge.icon}
//                         </div>
//                         <div className="flex-1">
//                           <h3 className={`font-bold ${badge.achieved ? 'text-[#31124b]' : 'text-gray-500'}`}>
//                             {badge.name}
//                             {badge.achieved && <span className="text-green-500 mr-2 text-sm">(مكتمل)</span>}
//                           </h3>
//                           <p className="text-sm text-gray-600">{badge.description}</p>
                          
//                           {!badge.achieved && badge.progress && (
//                             <div className="mt-2">
//                               <div className="w-full bg-gray-200 rounded-full h-2">
//                                 <div 
//                                   className="bg-[#fa9e1b] h-2 rounded-full" 
//                                   style={{ width: `${(badge.current / badge.progress) * 100}%` }}
//                                 ></div>
//                               </div>
//                               <div className="text-xs text-gray-500 mt-1 text-left">
//                                 {badge.current}/{badge.progress}
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//           {/* القسم الأيسر - المشاريع والمشاكل */}
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="lg:col-span-2 space-y-6"
//           >
//             {/* المشاريع التي تطوع فيها */}
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <div className="flex items-center mb-4">
//                 <FaClipboardCheck className="text-[#fa9e1b] text-xl ml-2" />
//                 <h2 className="text-xl font-bold text-[#31124b]">مشاريع تطوعت فيها</h2>
//               </div>
              
//               <div className="overflow-x-auto">
//                 <table className="min-w-full">
//                   <thead>
//                     <tr className="bg-gray-100">
//                       <th className="p-3 text-right">المشروع</th>
//                       <th className="p-3 text-right">التاريخ</th>
//                       <th className="p-3 text-right">الساعات</th>
//                       <th className="p-3 text-right">الحالة</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {completedProjects.map((project, index) => (
//                       <motion.tr 
//                         key={project.id}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: index * 0.1 }}
//                         className="border-b hover:bg-gray-50"
//                       >
//                         <td className="p-3">{project.title}</td>
//                         <td className="p-3">{project.date}</td>
//                         <td className="p-3">{project.hours} ساعات</td>
//                         <td className="p-3">
//                           <span className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(project.status)}`}>
//                             {project.status}
//                           </span>
//                         </td>
//                       </motion.tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* المشاريع المتاحة للتطوع */}
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <div className="flex items-center mb-4">
//                 <FaRegClock className="text-[#fa9e1b] text-xl ml-2" />
//                 <h2 className="text-xl font-bold text-[#31124b]">مشاريع متاحة للتطوع</h2>
//               </div>
              
//               <div className="space-y-4">
//                 {availableProjects.map((project, index) => (
//                   <motion.div 
//                     key={project.id}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.2 }}
//                     className="border rounded-lg p-4 hover:shadow-md transition-all"
//                   >
//                     <div className="flex justify-between">
//                       <div>
//                         <h3 className="font-bold text-lg">{project.title}</h3>
//                         <p className="text-gray-600">التاريخ: {project.date}</p>
//                         <p className="text-gray-600">الوقت المتوقع: {project.estimatedHours} ساعات</p>
//                       </div>
//                       <div>
//                         <button className="bg-[#fa9e1b] text-white px-4 py-2 rounded-md hover:bg-[#e89018] transition-colors">
//                           تطوع الآن
//                         </button>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>

//             {/* المشاكل المبلغ عنها */}
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <div className="flex items-center mb-4">
//                 <FaExclamationTriangle className="text-[#fa9e1b] text-xl ml-2" />
//                 <h2 className="text-xl font-bold text-[#31124b]">المشاكل التي أبلغت عنها</h2>
//               </div>
              
//               <div className="overflow-x-auto">
//                 <table className="min-w-full">
//                   <thead>
//                     <tr className="bg-gray-100">
//                       <th className="p-3 text-right">المشكلة</th>
//                       <th className="p-3 text-right">تاريخ الإبلاغ</th>
//                       <th className="p-3 text-right">الحالة</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {reportedIssues.map((issue, index) => (
//                       <motion.tr 
//                         key={issue.id}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: index * 0.1 }}
//                         className="border-b hover:bg-gray-50"
//                       >
//                         <td className="p-3">{issue.title}</td>
//                         <td className="p-3">{issue.date}</td>
//                         <td className="p-3">
//                           <span className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(issue.status)}`}>
//                             {issue.status}
//                           </span>
//                         </td>
//                       </motion.tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
              
//               <div className="mt-4">
//                 <button className="bg-[#31124b] text-white px-4 py-2 rounded-md hover:bg-[#25093b] transition-colors w-full">
//                   الإبلاغ عن مشكلة جديدة
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }
//////////////////////////
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  FaEdit, FaMapMarkerAlt, FaPhone, FaUser, FaClipboardCheck, 
  FaRegClock, FaExclamationTriangle, FaStar, FaMedal, 
  FaTrophy, FaBell, FaCheckCircle, FaClock
} from 'react-icons/fa';

export default function UserProfile() {
  const router = useRouter();

  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    location: '',
    image: ''
  });

  const [completedProjects, setCompletedProjects] = useState([]);
  const [availableProjects, setAvailableProjects] = useState([]);
  const [reportedIssues, setReportedIssues] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [badges, setBadges] = useState([]);

  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const resUser = await fetch('/api/current-user');
      if (resUser.status === 401) {
        toast.error('يرجى تسجيل الدخول أولاً');
        return router.push('/login');
      }
      const user = await resUser.json();
      setUserData({
        name: user.name || '',
        phone: user.phone || '',
        location: user.location || '',
        image: user.image || ''
      });

      const [completed, available, issues, notifs, badges] = await Promise.all([
        fetch('/api/user/completed-projects').then(res => res.json()),
        fetch('/api/projects/available').then(res => res.json()),
        fetch('/api/user/reported-issues').then(res => res.json()),
        fetch('/api/user/notifications').then(res => res.json()),
        fetch('/api/user/badges').then(res => res.json()),
      ]);

      setCompletedProjects(completed.projects || []);
      setAvailableProjects(available.projects || []);
      setReportedIssues(issues.issues || []);
      setNotifications(notifs.notifications || []);
      setBadges(badges.badges || []);

    } catch (err) {
      console.error(err);
      toast.error('حدث خطأ أثناء تحميل البيانات');
    }
  };

  const startEdit = (field) => {
    setEditing(field);
    setEditValue(userData[field]);
  };

  const cancelEdit = () => {
    setEditing(null);
  };

  const saveEdit = async () => {
    if (!editing) return;
    try {
      const res = await fetch('/api/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [editing]: editValue }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        setUserData(data.updatedUser); // ✅ بدل التحديث اليدوي
        toast.success('تم تحديث البيانات بنجاح ✅');
      } else {
        toast.error(data.message || 'فشل التحديث ❌');
      }
  
      setEditing(null);
    } catch (err) {
      console.error(err);
      toast.error('حدث خطأ أثناء الحفظ ❌');
    }
  };
  

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', 'user-profiles');

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      const imageUrl = data.secure_url;

      await fetch('/api/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageUrl }),
      });

      setUserData({ ...userData, image: imageUrl });
      toast.success('تم رفع الصورة بنجاح ✅');
    } catch (error) {
      console.error(error);
      toast.error('فشل رفع الصورة ❌');
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const totalVolunteerHours = completedProjects.reduce((sum, project) => sum + (project.hours || 0), 0);
  const totalCompletedProjects = completedProjects.length;
  const totalReportedIssues = reportedIssues.length;
  const resolvedIssues = reportedIssues.filter(issue => issue.status === 'تمت المعالجة').length;

  const getStatusColor = (status) => {
    switch (status) {
      case "مكتمل": case "تمت المعالجة": return "bg-green-500";
      case "قيد المعالجة": return "bg-blue-500";
      case "متاح": return "bg-yellow-500";
      case "في انتظار المراجعة": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "issue": return <FaExclamationTriangle className="text-red-500" />;
      case "project": return <FaClipboardCheck className="text-blue-500" />;
      case "badge": return <FaMedal className="text-yellow-500" />;
      default: return <FaBell className="text-gray-500" />;
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6">

        {/* معلومات المستخدم */}
        <motion.div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <div className="flex flex-col items-center">
            {userData.image ? (
              <img src={userData.image} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
            ) : (
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                <FaUser className="text-3xl text-gray-500" />
              </div>
            )}
            <input type="file" accept="image/*" className="mt-4" onChange={handleImageUpload} />
          </div>

          <div className="mt-6 space-y-4">

            {/* الاسم */}
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <FaUser className="text-yellow-500" /> <span>الاسم:</span>
              </div>
              {editing === 'name' ? (
                <div className="flex gap-2">
                  <input value={editValue} onChange={(e) => setEditValue(e.target.value)} className="border rounded p-1" />
                  <button onClick={saveEdit} className="text-green-500">حفظ</button>
                  <button onClick={cancelEdit} className="text-red-500">إلغاء</button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <span>{userData.name}</span>
                  <button onClick={() => startEdit('name')}><FaEdit className="text-yellow-500" /></button>
                </div>
              )}
            </div>

            {/* الهاتف */}
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <FaPhone className="text-yellow-500" /> <span>رقم الهاتف:</span>
              </div>
              {editing === 'phone' ? (
                <div className="flex gap-2">
                  <input value={editValue} onChange={(e) => setEditValue(e.target.value)} className="border rounded p-1" />
                  <button onClick={saveEdit} className="text-green-500">حفظ</button>
                  <button onClick={cancelEdit} className="text-red-500">إلغاء</button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <span>{userData.phone}</span>
                  <button onClick={() => startEdit('phone')}><FaEdit className="text-yellow-500" /></button>
                </div>
              )}
            </div>

            {/* العنوان */}
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <FaMapMarkerAlt className="text-yellow-500" /> <span>العنوان:</span>
              </div>
              {editing === 'location' ? (
                <div className="flex gap-2">
                  <input value={editValue} onChange={(e) => setEditValue(e.target.value)} className="border rounded p-1" />
                  <button onClick={saveEdit} className="text-green-500">حفظ</button>
                  <button onClick={cancelEdit} className="text-red-500">إلغاء</button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <span>{userData.location}</span>
                  <button onClick={() => startEdit('location')}><FaEdit className="text-yellow-500" /></button>
                </div>
              )}
            </div>

          </div>
        </motion.div>

                    {/* لوحة الإحصائيات */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-[#31124b] mb-4">الإحصائيات</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  {/* إجمالي ساعات التطوع */}
                  <div className="bg-gradient-to-r from-[#31124b] to-[#42195e] p-4 rounded-lg text-white">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs opacity-75">إجمالي ساعات التطوع</p>
                        <p className="text-2xl font-bold">{totalVolunteerHours}</p>
                      </div>
                      <div className="text-3xl opacity-75">
                        <FaClock />
                      </div>
                    </div>
                  </div>
                  
                  {/* عدد المشاريع المكتملة */}
                  <div className="bg-gradient-to-r from-[#fa9e1b] to-[#f8b957] p-4 rounded-lg text-white">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs opacity-75">المشاريع المكتملة</p>
                        <p className="text-2xl font-bold">{totalCompletedProjects}</p>
                      </div>
                      <div className="text-3xl opacity-75">
                        <FaClipboardCheck />
                      </div>
                    </div>
                  </div>
                  
                  {/* عدد المشاكل المبلغ عنها */}
                  <div className="bg-gradient-to-r from-[#fa9e1b] to-[#f8b957] p-4 rounded-lg text-white">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs opacity-75">المشاكل المبلغ عنها</p>
                        <p className="text-2xl font-bold">{totalReportedIssues}</p>
                      </div>
                      <div className="text-3xl opacity-75">
                        <FaExclamationTriangle />
                      </div>
                    </div>
                  </div>
                  
                  {/* عدد المشاكل التي تمت معالجتها */}
                  <div className="bg-gradient-to-r from-[#31124b] to-[#42195e] p-4 rounded-lg text-white">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs opacity-75">المشاكل المحلولة</p>
                        <p className="text-2xl font-bold">{resolvedIssues}</p>
                      </div>
                      <div className="text-3xl opacity-75">
                        <FaCheckCircle />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* الشارات والإنجازات */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-[#31124b] mb-4">الشارات والإنجازات</h2>
                
                <div className="space-y-4">
                  {badges.map((badge) => (
                    <div key={badge.id} className="border rounded-lg p-4">
                      <div className="flex items-center">
                        <div className={`p-3 rounded-full ${badge.achieved ? 'bg-[#fa9e1b] bg-opacity-20' : 'bg-gray-200'} mr-4`}>
                          {badge.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-bold ${badge.achieved ? 'text-[#31124b]' : 'text-gray-500'}`}>
                            {badge.name}
                            {badge.achieved && <span className="text-green-500 mr-2 text-sm">(مكتمل)</span>}
                          </h3>
                          <p className="text-sm text-gray-600">{badge.description}</p>
                          
                          {!badge.achieved && badge.progress && (
                            <div className="mt-2">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-[#fa9e1b] h-2 rounded-full" 
                                  style={{ width: `${(badge.current / badge.progress) * 100}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1 text-left">
                                {badge.current}/{badge.progress}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* القسم الأيسر - المشاريع والمشاكل */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* المشاريع التي تطوع فيها */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <FaClipboardCheck className="text-[#fa9e1b] text-xl ml-2" />
                <h2 className="text-xl font-bold text-[#31124b]">مشاريع تطوعت فيها</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-right">المشروع</th>
                      <th className="p-3 text-right">التاريخ</th>
                      <th className="p-3 text-right">الساعات</th>
                      <th className="p-3 text-right">الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedProjects.map((project, index) => (
                      <motion.tr 
                        key={project.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="p-3">{project.title}</td>
                        <td className="p-3">{project.date}</td>
                        <td className="p-3">{project.hours} ساعات</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(project.status)}`}>
                            {project.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* المشاريع المتاحة للتطوع */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <FaRegClock className="text-[#fa9e1b] text-xl ml-2" />
                <h2 className="text-xl font-bold text-[#31124b]">مشاريع متاحة للتطوع</h2>
              </div>
              
              <div className="space-y-4">
                {availableProjects.map((project, index) => (
                  <motion.div 
                    key={project.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="border rounded-lg p-4 hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-bold text-lg">{project.title}</h3>
                        <p className="text-gray-600">التاريخ: {project.date}</p>
                        <p className="text-gray-600">الوقت المتوقع: {project.estimatedHours} ساعات</p>
                      </div>
                      <div>
                        <button className="bg-[#fa9e1b] text-white px-4 py-2 rounded-md hover:bg-[#e89018] transition-colors">
                          تطوع الآن
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* المشاكل المبلغ عنها */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <FaExclamationTriangle className="text-[#fa9e1b] text-xl ml-2" />
                <h2 className="text-xl font-bold text-[#31124b]">المشاكل التي أبلغت عنها</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-right">المشكلة</th>
                      <th className="p-3 text-right">تاريخ الإبلاغ</th>
                      <th className="p-3 text-right">الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportedIssues.map((issue, index) => (
                      <motion.tr 
                        key={issue.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="p-3">{issue.title}</td>
                        <td className="p-3">{issue.date}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(issue.status)}`}>
                            {issue.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4">
                <button className="bg-[#31124b] text-white px-4 py-2 rounded-md hover:bg-[#25093b] transition-colors w-full">
                  الإبلاغ عن مشكلة جديدة
                </button>
              </div>
            </div>
          </motion.div>
        </div>

  );
}
