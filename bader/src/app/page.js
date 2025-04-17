'use client';

import Head from 'next/head';
import Link from 'next/link';
import HeroSection from './components/herosection';

import { useState } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-white" dir="rtl">
     
     <HeroSection />

      {/* قسم المميزات */}
      <div className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#31124b]">كيف نعمل على تحسين الحي؟</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-[#662480] text-4xl mb-4 flex justify-center">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 2a1 1 0 10-2 0v4a1 1 0 102 0V9zm-3 3a1 1 0 10-2 0v1a1 1 0 102 0v-1z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#31124b] text-center">تحديد المشاكل</h3>
              <p className="text-gray-700 text-center">نستمع لسكان الحي ونقوم بتحليل ودراسة المشاكل الملحة التي تواجه مجتمعنا</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-[#fa9e1b] text-4xl mb-4 flex justify-center">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#31124b] text-center">تكوين فرق العمل</h3>
              <p className="text-gray-700 text-center">نجمع المتطوعين والداعمين من أصحاب الخبرات المتنوعة للعمل على حل مشاكل الحي</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-[#31124b] text-4xl mb-4 flex justify-center">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#31124b] text-center">تنفيذ المشاريع</h3>
              <p className="text-gray-700 text-center">ننفذ الحلول العملية ونقيم تأثيرها في المجتمع مع المتابعة المستمرة لضمان نجاحها</p>
            </div>
          </div>
        </div>
      </div>

      {/* قسم الإحصائيات */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#31124b]">أثر مبادرتنا بالأرقام</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-[#fa9e1b] text-4xl font-bold mb-2">+15</div>
              <p className="text-gray-700">مشروع تم إنجازه</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-[#662480] text-4xl font-bold mb-2">+1500</div>
              <p className="text-gray-700">مستفيد من المبادرة</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-[#31124b] text-4xl font-bold mb-2">+200</div>
              <p className="text-gray-700">متطوع نشط</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-[#fa9e1b] text-4xl font-bold mb-2">+25</div>
              <p className="text-gray-700">جهة داعمة</p>
            </div>
          </div>
        </div>
      </div>

      {/* قسم آخر المشاريع */}
      <div className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-[#31124b]">آخر مشاريعنا</h2>
          <p className="text-center text-gray-700 mb-12">تعرّف على بعض المشاريع التي نعمل عليها حالياً</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-[#31124b]">تخضير الحي</h3>
                <p className="text-gray-700 mb-4">مشروع لزراعة الأشجار وإنشاء مساحات خضراء في الأماكن المهملة بالحي</p>
                <Link href="/projects/1" className="text-[#662480] hover:text-[#fa9e1b] font-semibold inline-flex items-center">
                  التفاصيل 
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-[#31124b]">صيانة ملعب الحي</h3>
                <p className="text-gray-700 mb-4">إعادة تأهيل وصيانة الملعب الرياضي ليكون وجهة آمنة ومناسبة للشباب</p>
                <Link href="/projects/2" className="text-[#662480] hover:text-[#fa9e1b] font-semibold inline-flex items-center">
                  التفاصيل 
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-[#31124b]">تطوير المكتبة العامة</h3>
                <p className="text-gray-700 mb-4">تجديد المكتبة العامة وتزويدها بالكتب وتقنيات التعلم الحديثة</p>
                <Link href="/projects/3" className="text-[#662480] hover:text-[#fa9e1b] font-semibold inline-flex items-center">
                  التفاصيل 
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/projects" className="bg-[#31124b] text-white hover:bg-[#662480] px-6 py-3 rounded-lg transition-colors font-bold inline-block">
              جميع المشاريع
            </Link>
          </div>
        </div>
      </div>

      {/* قسم الدعم */}

      <div className="py-10 px-2 bg-gradient-to-r m-20 from-[#31124b] to-[#411866]  rounded-2xl p-2 shadow-xl border border-opacity-10  text-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-8">كن جزءاً من التغيير</h2>
          <p className="text-center text-xl mb-12 max-w-3xl mx-auto">نحتاج إلى دعمكم لنحقق طموحاتنا في إصلاح الحي وخلق بيئة أفضل للجميع. يمكنكم المساهمة بالوقت، الخبرة، أو الدعم المادي.</p>
          
          <div className="text-center">
            <Link href="/support" className="bg-[#fa9e1b] text-[#31124b] hover:bg-white px-8 py-4 rounded-lg transition-colors font-bold text-xl inline-block">
              كن داعماً الآن
            </Link>
          </div>
        </div>
        
      </div>

      
    </div>

  );
}