'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// مكون البطاقة الفردية
const ProjectCard = ({ 
  image, 
  month, 
  title, 
  description, 
  status, 
  progress, 
  showDonate = true,
  showVolunteer = true 
}) => {
  // تحديد لون وحالة المشروع
  const getStatusColor = () => {
    switch(status) {
      case 'مكتمل':
        return 'text-green-600';
      case 'قيد التنفيذ':
        return 'text-[#fa9e1b]';
      default:
        return 'text-blue-600';
    }
  };

  // حساب نسبة التقدم
  const getProgressWidth = () => {
    if (status === 'مكتمل') return '100%';
    if (status === 'قيد التنفيذ') return `${progress || 50}%`;
    return `${progress || 30}%`;
  };

  // تحديد لون شريط التقدم
  const getProgressBarColor = () => {
    if (status === 'مكتمل') return 'bg-green-500';
    if (status === 'قيد التنفيذ') return 'bg-[#fa9e1b]';
    return 'bg-blue-500';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      {/* صورة المشروع */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image || "/api/placeholder/800/400"} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-0 right-0 bg-white bg-opacity-90 px-3 py-1 m-3 rounded-md text-[#31124b] font-semibold">
          {month}
        </div>
      </div>
      
      {/* محتوى البطاقة */}
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-[#31124b] mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 text-sm line-clamp-2">{description}</p>
        
        {/* حالة المشروع */}
        <div className="mt-auto">
          <div className="flex  items-center mb-2">
            <span className="text-sm font-semibold">حالة المشروع   :   </span>
            <span className={`text-sm font-bold ${getStatusColor()}`}> { status}</span>
          </div>
          
          {/* شريط التقدم */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className={`${getProgressBarColor()} h-2 rounded-full transition-all duration-500`} 
              style={{ width: getProgressWidth() }}
            />
          </div>
          
          {/* أزرار العمل */}
          <div className="flex justify-between gap-2 mt-3">
            <Link href={`/projects/${encodeURIComponent(title)}`} className="bg-[#31124b] hover:bg-[#826798] text-white py-2 px-4 rounded-md text-center transition-colors w-full text-sm">
              عرض التفاصيل
            </Link>
            
            {showVolunteer && (
              <Link href={`/volunteer/${encodeURIComponent(title)}`} className="bg-[#4caf50] hover:bg-[#3f6f41] text-white py-2 px-4 rounded-md text-center transition-colors w-full text-sm">
                تطوع معنا
              </Link>
            )}
            
            {showDonate && (
              <Link href={`/donate/${encodeURIComponent(title)}`} className="bg-[#1976d2] hover:bg-[#52779b] text-white py-2 px-4 rounded-md text-center transition-colors w-full text-sm">
                تبرع
                 الان
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// مكون قسم عرض المشاريع
export default function ProjectCards() {
  // بيانات المشاريع
  const projects = [
    {
      image: "/api/placeholder/800/400", // يمكن استبدالها بالمسار الفعلي للصورة
      month: "فبراير",
      title: "ترميم المدارس",
      description: "تقديم بيئة تعليمية أفضل للطلاب والطالبات من خلال تحسين المرافق المدرسية وصيانتها",
      status: "مكتمل",
      progress: 100,
    },
    {
      image: "/api/placeholder/800/400",
      month: "فبراير",
      title: "ترميم المدارس",
      description: "تقديم بيئة تعليمية أفضل للطلاب والطالبات من خلال تحسين المرافق المدرسية وصيانتها",
      status: "قيد التنفيذ",
      progress: 65,
    },
    {
      image: "/api/placeholder/800/400",
      month: "مارس",
      title: "مشروع دعم الأسر المحتاجة",
      description: "يهدف المشروع إلى تقديم المساعدات الإنسانية للأسر المحتاجة والمتضررة في المناطق النائية",
      status: "مكتمل",
      progress: 100,
    },
    {
      image: "/api/placeholder/800/400",
      month: "ابريل",
      title: "بادر: نقلة نوعية لتقديم خدمات",
      description: "في أحد الشوارع الرئيسية بين المحافظات لتحسين المرافق العامة وتسهيل التنقل للمواطنين",
      status: "قيد التنفيذ",
      progress: 40,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      {/* عنوان القسم */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-[#31124b]">
          مشاريع <span className="text-[#fa9e1b]">بادر</span> الحالية
        </h2>
        <p className="text-gray-600 mt-2">استعرض أحدث مشاريعنا وساهم في إنجاحها من خلال التطوع أو التبرع</p>
      </div>
      
      {/* أزرار التصفية */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#31124b] text-white px-4 py-2 rounded-md"
        >
          مشاريع قيد التنفيذ
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#31124b] text-white px-4 py-2 rounded-md"
        >
          مشاريع مكتملة
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#31124b] text-white px-4 py-2 rounded-md"
        >
          للإبلاغ عن مشكلة
        </motion.button>
      </div>
      
      {/* شبكة المشاريع */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project, index) => (
          <ProjectCard 
            key={index}
            image={project.image}
            month={project.month}
            title={project.title}
            description={project.description}
            status={project.status}
            progress={project.progress}
          />
        ))}
      </div>
      
      {/* زر عرض المزيد */}
      <div className="text-center mt-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#fa9e1b] hover:bg-[#e08c18] text-white px-6 py-3 rounded-md font-bold inline-block"
        >
          عرض جميع المشاريع
        </motion.button>
      </div>
    </div>
  );
}