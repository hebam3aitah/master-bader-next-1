// // pages/report-problem.js
// 'use client';

// import { useState, useEffect } from 'react';
// import Head from 'next/head';
// import { motion } from 'framer-motion';
// import axios from 'axios'; // استيراد Axios


// import { Camera, AlertTriangle, MapPin, FileText, Phone, User } from 'lucide-react';


// export default function ReportProblem() {
//   const [formData, setFormData] = useState({
//     problemType: '',
//     location: '',
//     severityLevel: 'medium',
//     description: '',
//     images: [],
//     reporterName: '',
//     phone: ''
//   });

//   const [submitted, setSubmitted] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);
//  const [floating, setFloating] = useState({});

//   // Animation for floating elements
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setFloating({
//         x: Math.sin(Date.now() / 1000) * 10,
//         y: Math.cos(Date.now() / 1500) * 10,
//       });
//     }, 50);
//     return () => clearInterval(interval);
//   }, []);
//   // أنواع المشاكل
//   const problemTypes = [
//     'مشاكل الطرق والرصيف',
//     'إنارة الشوارع',
//     'تراكم النفايات',
//     'مشاكل الصرف الصحي',
//     'حدائق ومساحات عامة',
//     'تلوث بيئي',
//     'أخرى'
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length > 0) {
//       setIsUploading(true);
      
//       // محاكاة عملية رفع الصور
//       setTimeout(() => {
//         setFormData({
//           ...formData,
//           images: [...formData.images, ...files.map(file => URL.createObjectURL(file))]
//         });
//         setIsUploading(false);
//       }, 1500);
//     }
//   };

//   const removeImage = (indexToRemove) => {
//     setFormData({
//       ...formData,
//       images: formData.images.filter((_, index) => index !== indexToRemove)
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     try {
//       const reportData = {
//         ...formData,
//         images: formData.images.map((img) => img), // سيتم تحسين هذا لاحقًا برفع الصور فعليًا
//       };
  
//       const response = await axios.post('/api/report', reportData);
  
//       if (response.status === 201) {
//         setSubmitted(true);
//         setFormData({
//           problemType: '',
//           location: '',
//           severityLevel: 'medium',
//           description: '',
//           images: [],
//           reporterName: '',
//           phone: ''
//         });
//       }
//     } catch (err) {
//       console.error('فشل إرسال البلاغ:', err);
//       alert('حدث خطأ أثناء إرسال البلاغ. الرجاء المحاولة لاحقًا.');
//     }
//   };
  
//     console.log('تم إرسال البلاغ:', formData);
    
    
//     // محاكاة عملية إرسال البيانات
//     setTimeout(() => {
//       setSubmitted(true);
//       // إعادة تعيين النموذج بعد الإرسال
//       setFormData({
//         problemType: '',
//         location: '',
//         severityLevel: 'medium',
//         description: '',
//         images: [],
//         reporterName: '',
//         phone: ''
//       });
//     }, 1000);
//   };

//   return (
//     <>
//       <Head>
//         <title>الإبلاغ عن مشكلة</title>
//         <meta name="description" content="قم بالإبلاغ عن المشاكل في حيك ليتم إصلاحها" />
//       </Head>
      

      
//       <main   dir="rtl" className="min-h-screen  py-12 " >
        
//       {/* Decorative elements */}
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
//         <motion.div 
//           className="absolute w-32 h-32 rounded-full bg-[#fa9e1b] opacity-20 top-20 left-20"
//           animate={{ x: floating.x, y: floating.y }}
//           transition={{ duration: 2 }}
//         />
//         <motion.div 
//           className="absolute w-48 h-48 rounded-full bg-[#fa9e1b] opacity-5 bottom-40 right-10"
//           animate={{ x: -floating.x, y: -floating.y }}
//           transition={{ duration: 3 }}
//         />
//         <motion.div 
//           className="absolute w-24 h-24 rounded-full bg-[#31124b] opacity-20 top-40 right-40"
//           animate={{ x: -floating.y, y: floating.x }}
//           transition={{ duration: 4 }}
//         />
//       </div>
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="max-w-3xl mx-auto">
//             {/* رأس الصفحة */}
//             <div className="text-center mb-10">
//               <div className="inline-block p-3 rounded-full bg-[#fa9e1b] bg-opacity-10 mb-4">
//                 <AlertTriangle size={32} className="text-amber-50" />
//               </div>
//               <h1 className="text-3xl font-extrabold text-[#31124b] mb-2">الإبلاغ عن مشكلة</h1>
//               <p className="text-[#31124b] mt-5 text-2xl ">ساعدنا في تحسين الحي من خلال الإبلاغ عن المشاكل التي تواجهك</p>
//             </div>
            
//             {submitted ? (
//               <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
//                 <div className="inline-block p-3 rounded-full bg-green-100 mb-4">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                 </div>
//                 <h2 className="text-2xl font-bold text-green-700 mb-2">تم استلام بلاغك بنجاح!</h2>
//                 <p className="text-green-600 mb-4">شكراً لك على المساهمة في تحسين الحي. سيتم مراجعة البلاغ والعمل على حل المشكلة في أقرب وقت ممكن.</p>
//                 <button
//                   onClick={() => setSubmitted(false)}
//                   className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
//                 >
//                   إرسال بلاغ آخر
//                 </button>
//               </div>
//             ) : (
//               <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//                 <div className="bg-gradient-to-r from-[#31124b] to-[#fa9e1b] py-6 px-8">
//                   <h2 className="text-2xl font-bold text-white">نموذج الإبلاغ</h2>
//                   <p className="text-white text-opacity-90 mt-5  ">الحقول المطلوبة مميزة بعلامة (*)</p>
//                 </div>
                
//                 <form onSubmit={handleSubmit} className="p-8">
//                   {/* نوع المشكلة */}
//                   <div className="mb-6">
//                     <label className="block text-gray-700 font-semibold mb-2 text-right">
//                       نوع المشكلة <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <select
//                         name="problemType"
//                         value={formData.problemType}
//                         onChange={handleChange}
//                         required
//                         className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-[#fa9e1b] focus:border-[#fa9e1b] appearance-none text-right pr-10"
//                         dir="rtl"
//                       >
//                         <option value="" disabled>اختر نوع المشكلة</option>
//                         {problemTypes.map((type, index) => (
//                           <option key={index} value={type}>{type}</option>
//                         ))}
//                       </select>
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <FileText size={20} className="text-gray-500" />
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* مكان المشكلة */}
//                   <div className="mb-6">
//                     <label className="block text-gray-700 font-semibold mb-2 text-right">
//                       مكان المشكلة <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         name="location"
//                         value={formData.location}
//                         onChange={handleChange}
//                         required
//                         placeholder="أدخل العنوان التفصيلي للمشكلة"
//                         className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-[#fa9e1b] focus:border-[#fa9e1b] text-right pr-10"
//                         dir="rtl"
//                       />
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <MapPin size={20} className="text-gray-500" />
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* درجة الخطورة */}
//                   <div className="mb-6">
//                     <label className="block text-gray-700 font-semibold mb-2 text-right">
//                       درجة الخطورة
//                     </label>
//                     <div className="grid grid-cols-3 gap-4">
//                       <label className="flex flex-col items-center bg-white border border-gray-300 rounded-md p-3 cursor-pointer hover:bg-gray-50 transition duration-200 ease-in-out">
//                         <input
//                           type="radio"
//                           name="severityLevel"
//                           value="low"
//                           checked={formData.severityLevel === 'low'}
//                           onChange={handleChange}
//                           className="sr-only"
//                         />
//                         <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mb-2 ${formData.severityLevel === 'low' ? 'border-green-500 bg-green-500' : 'border-gray-300'}`}>
//                           {formData.severityLevel === 'low' && (
//                             <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
//                               <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                             </svg>
//                           )}
//                         </div>
//                         <span className="text-green-600 font-medium">منخفضة</span>
//                       </label>
                      
//                       <label className="flex flex-col items-center bg-white border border-gray-300 rounded-md p-3 cursor-pointer hover:bg-gray-50 transition duration-200 ease-in-out">
//                         <input
//                           type="radio"
//                           name="severityLevel"
//                           value="medium"
//                           checked={formData.severityLevel === 'medium'}
//                           onChange={handleChange}
//                           className="sr-only"
//                         />
//                         <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mb-2 ${formData.severityLevel === 'medium' ? 'border-[#fa9e1b] bg-[#fa9e1b]' : 'border-gray-300'}`}>
//                           {formData.severityLevel === 'medium' && (
//                             <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
//                               <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                             </svg>
//                           )}
//                         </div>
//                         <span className="text-[#fa9e1b] font-medium">متوسطة</span>
//                       </label>
                      
//                       <label className="flex flex-col items-center bg-white border border-gray-300 rounded-md p-3 cursor-pointer hover:bg-gray-50 transition duration-200 ease-in-out">
//                         <input
//                           type="radio"
//                           name="severityLevel"
//                           value="high"
//                           checked={formData.severityLevel === 'high'}
//                           onChange={handleChange}
//                           className="sr-only"
//                         />
//                         <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mb-2 ${formData.severityLevel === 'high' ? 'border-red-500 bg-red-500' : 'border-gray-300'}`}>
//                           {formData.severityLevel === 'high' && (
//                             <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
//                               <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                             </svg>
//                           )}
//                         </div>
//                         <span className="text-red-600 font-medium">عالية</span>
//                       </label>
//                     </div>
//                   </div>
                  
//                   {/* وصف المشكلة */}
//                   <div className="mb-6">
//                     <label className="block text-gray-700 font-semibold mb-2 text-right">
//                       وصف المشكلة <span className="text-red-500">*</span>
//                     </label>
//                     <textarea
//                       name="description"
//                       value={formData.description}
//                       onChange={handleChange}
//                       required
//                       rows="4"
//                       placeholder="قم بوصف المشكلة بالتفصيل..."
//                       className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-[#fa9e1b] focus:border-[#fa9e1b] text-right"
//                       dir="rtl"
//                     ></textarea>
//                   </div>
                  
//                   {/* صور المشكلة */}
//                   <div className="mb-6">
//                     <label className="block text-gray-700 font-semibold mb-2 text-right">
//                       صور المشكلة
//                     </label>
//                     <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 transition-all duration-300 hover:border-[#fa9e1b]">
//                       <Camera size={40} className="text-gray-400 mb-3" />
//                       <p className="text-gray-600 mb-2">اسحب وأفلت الصور هنا أو</p>
//                       <input
//                         type="file"
//                         accept="image/*"
//                         multiple
//                         onChange={handleImageUpload}
//                         className="hidden"
//                         id="image-upload"
//                       />
//                       <label
//                         htmlFor="image-upload"
//                         className="px-4 py-2 bg-[#fa9e1b] text-white rounded-md cursor-pointer hover:bg-[#7b3edd] transition duration-300"
//                       >
//                         اختر الصور
//                       </label>
//                       <p className="text-xs text-gray-500 mt-2">يمكنك رفع حتى 5 صور بحجم أقصى 5 ميجابايت لكل صورة</p>
//                     </div>
                    
//                     {isUploading && (
//                       <div className="mt-3 bg-blue-50 text-blue-700 p-3 rounded flex items-center justify-center">
//                         <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                         جاري رفع الصور...
//                       </div>
//                     )}
                    
//                     {formData.images.length > 0 && (
//                       <div className="mt-4">
//                         <p className="text-gray-700 font-medium mb-2 text-right">الصور المرفقة:</p>
//                         <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                           {formData.images.map((image, index) => (
//                             <div key={index} className="relative group">
//                               <img
//                                 src={image}
//                                 alt={`صورة ${index + 1}`}
//                                 className="w-full h-32 object-cover rounded-lg border border-gray-200"
//                               />
//                               <button
//                                 type="button"
//                                 onClick={() => removeImage(index)}
//                                 className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition duration-200"
//                               >
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                 </svg>
//                               </button>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
                  
//                   <div className="border-t border-gray-200 my-8"></div>
                  
//                   {/* بيانات مقدم البلاغ */}
//                   <h3 className="text-xl font-bold text-[#31124b] mb-6 text-right">بيانات مقدم البلاغ</h3>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {/* الاسم */}
//                     <div>
//                       <label className="block text-gray-700 font-semibold mb-2 text-right">
//                         الاسم <span className="text-red-500">*</span>
//                       </label>
//                       <div className="relative">
//                         <input
//                           type="text"
//                           name="reporterName"
//                           value={formData.reporterName}
//                           onChange={handleChange}
//                           required
//                           placeholder="أدخل اسمك الكامل"
//                           className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-[#fa9e1b] focus:border-[#fa9e1b] text-right pr-10"
//                           dir="rtl"
//                         />
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <User size={20} className="text-gray-500" />
//                         </div>
//                       </div>
//                     </div>
                    
//                     {/* رقم الهاتف */}
//                     <div>
//                       <label className="block text-gray-700 font-semibold mb-2 text-right">
//                         رقم الهاتف <span className="text-red-500">*</span>
//                       </label>
//                       <div className="relative">
//                         <input
//                           type="tel"
//                           name="phone"
//                           value={formData.phone}
//                           onChange={handleChange}
//                           required
//                           placeholder="أدخل رقم هاتفك"
//                           className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-[#fa9e1b] focus:border-[#fa9e1b] text-right pr-10"
//                           dir="rtl"
//                         />
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <Phone size={20} className="text-gray-500" />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* التعهد وإرسال النموذج */}
//                   <div className="mt-8">
//                     <div className="flex items-start mb-6">
//                       <div className="flex items-center h-5">
//                         <input
//                           id="terms"
//                           type="checkbox"
//                           required
//                           className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-[#fa9e1b]"
//                         />
//                       </div>
//                       <label htmlFor="terms" className="mr-2 text-sm font-medium text-gray-700 text-right">
//                         أتعهد بأن جميع المعلومات المقدمة صحيحة وأوافق على <a href="#" className="text-[#fa9e1b] hover:underline">شروط الخدمة</a>
//                       </label>
//                     </div>
                    
//                   <div className="flex justify-center mt-8">
//               <button
//                 type="submit"
//                 className="px-8 py-4 bg-gradient-to-r from-[#31124b] to-[#fa9e1b] text-white font-bold rounded-full transition-transform transform hover:scale-105 hover:shadow-lg"
//               >
//                       إرسال البلاغ
//                       </button>
//             </div>
//                   </div>
//                 </form>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
      
//     </>
//   );
// }
'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Camera, AlertTriangle, MapPin, FileText, Phone, User } from 'lucide-react';





export default function ReportProblemPage() {
  const [formData, setFormData] = useState({
    problemType: '',
    location: '',
    severityLevel: 'medium',
    description: '',
    images: [],
    reporterName: '',
    phone: '',
  });

  const [submitted, setSubmitted] = useState(false);

   const [floating, setFloating] = useState({});

  const [isUploading, setIsUploading] = useState(false);
  // Animation for floating elements
  useEffect(() => {
    const interval = setInterval(() => {
      setFloating({
        x: Math.sin(Date.now() / 1000) * 10,
        y: Math.cos(Date.now() / 1500) * 10,
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const problemTypes = [
        'مشاكل الطرق والرصيف',
        'إنارة الشوارع',
        'تراكم النفايات',
        'مشاكل الصرف الصحي',
        'حدائق ومساحات عامة',
        'تلوث بيئي',
        'أخرى'
      ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      setFormData((prev) => ({
        ...prev,
        images: [...files],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
   
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setIsUploading(true);
      
      // محاكاة عملية رفع الصور
      setTimeout(() => {
        setFormData({
          ...formData,
          images: [...formData.images, ...files.map(file => URL.createObjectURL(file))]
        });
        setIsUploading(false);
      }, 1500);
    }
  };

  const removeImage = (indexToRemove) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, index) => index !== indexToRemove)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const reportData = {
        ...formData,
        images: formData.images.map((img) => img.name), // لاحقًا سيتم رفعها
      };

      const response = await axios.post('/api/report', reportData);

      if (response.status === 201) {
        setSubmitted(true);
        setFormData({
          problemType: '',
          location: '',
          severityLevel: 'medium',
          description: '',
          images: [],
          reporterName: '',
          phone: '',
        });
      }
    } catch (err) {
      console.error('فشل إرسال البلاغ:', err);
      alert('حدث خطأ أثناء إرسال البلاغ');
    }
  };

  return (
    <>
       <Head>
        <title>الإبلاغ عن مشكلة</title>
        <meta name="description" content="قم بالإبلاغ عن المشاكل في حيك ليتم إصلاحها" />
      </Head>
      

      
      <main   dir="rtl" className="min-h-screen  py-12 " >
        
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <motion.div 
          className="absolute w-32 h-32 rounded-full bg-[#fa9e1b] opacity-20 top-20 left-20"
          animate={{ x: floating.x, y: floating.y }}
          transition={{ duration: 2 }}
        />
        <motion.div 
          className="absolute w-48 h-48 rounded-full bg-[#fa9e1b] opacity-5 bottom-40 right-10"
          animate={{ x: -floating.x, y: -floating.y }}
          transition={{ duration: 3 }}
        />
        <motion.div 
          className="absolute w-24 h-24 rounded-full bg-[#31124b] opacity-20 top-40 right-40"
          animate={{ x: -floating.y, y: floating.x }}
          transition={{ duration: 4 }}
        />
      </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* رأس الصفحة */}
            <div className="text-center mb-10">
              <div className="inline-block p-3 rounded-full bg-[#fa9e1b] bg-opacity-10 mb-4">
                <AlertTriangle size={32} className="text-amber-50" />
              </div>
              <h1 className="text-3xl font-extrabold text-[#31124b] mb-2">الإبلاغ عن مشكلة</h1>
              <p className="text-[#31124b] mt-5 text-2xl ">ساعدنا في تحسين الحي من خلال الإبلاغ عن المشاكل التي تواجهك</p>
            </div>
            
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="inline-block p-3 rounded-full bg-green-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-green-700 mb-2">تم استلام بلاغك بنجاح!</h2>
                <p className="text-green-600 mb-4">شكراً لك على المساهمة في تحسين الحي. سيتم مراجعة البلاغ والعمل على حل المشكلة في أقرب وقت ممكن.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
                >
                  إرسال بلاغ آخر
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-[#31124b] to-[#fa9e1b] py-6 px-8">
                  <h2 className="text-2xl font-bold text-white">نموذج الإبلاغ</h2>
                  <p className="text-white text-opacity-90 mt-5  ">الحقول المطلوبة مميزة بعلامة (*)</p>
                </div>
                
                <form onSubmit={handleSubmit} className="p-8">
                  {/* نوع المشكلة */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2 text-right">
                      نوع المشكلة <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="problemType"
                        value={formData.problemType}
                        onChange={handleChange}
                        required
                        className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-[#fa9e1b] focus:border-[#fa9e1b] appearance-none text-right pr-10"
                        dir="rtl"
                      >
                        <option value="" disabled>اختر نوع المشكلة</option>
                        {problemTypes.map((type, index) => (
                          <option key={index} value={type}>{type}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FileText size={20} className="text-gray-500" />
                      </div>
                    </div>
                  </div>
                  
                  {/* مكان المشكلة */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2 text-right">
                      مكان المشكلة <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        placeholder="أدخل العنوان التفصيلي للمشكلة"
                        className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-[#fa9e1b] focus:border-[#fa9e1b] text-right pr-10"
                        dir="rtl"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin size={20} className="text-gray-500" />
                      </div>
                    </div>
                  </div>
                  
                  {/* درجة الخطورة */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2 text-right">
                      درجة الخطورة
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      <label className="flex flex-col items-center bg-white border border-gray-300 rounded-md p-3 cursor-pointer hover:bg-gray-50 transition duration-200 ease-in-out">
                        <input
                          type="radio"
                          name="severityLevel"
                          value="low"
                          checked={formData.severityLevel === 'low'}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mb-2 ${formData.severityLevel === 'low' ? 'border-green-500 bg-green-500' : 'border-gray-300'}`}>
                          {formData.severityLevel === 'low' && (
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className="text-green-600 font-medium">منخفضة</span>
                      </label>
                      
                      <label className="flex flex-col items-center bg-white border border-gray-300 rounded-md p-3 cursor-pointer hover:bg-gray-50 transition duration-200 ease-in-out">
                        <input
                          type="radio"
                          name="severityLevel"
                          value="medium"
                          checked={formData.severityLevel === 'medium'}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mb-2 ${formData.severityLevel === 'medium' ? 'border-[#fa9e1b] bg-[#fa9e1b]' : 'border-gray-300'}`}>
                          {formData.severityLevel === 'medium' && (
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className="text-[#fa9e1b] font-medium">متوسطة</span>
                      </label>
                      
                      <label className="flex flex-col items-center bg-white border border-gray-300 rounded-md p-3 cursor-pointer hover:bg-gray-50 transition duration-200 ease-in-out">
                        <input
                          type="radio"
                          name="severityLevel"
                          value="high"
                          checked={formData.severityLevel === 'high'}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mb-2 ${formData.severityLevel === 'high' ? 'border-red-500 bg-red-500' : 'border-gray-300'}`}>
                          {formData.severityLevel === 'high' && (
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className="text-red-600 font-medium">عالية</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* وصف المشكلة */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2 text-right">
                      وصف المشكلة <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows="4"
                      placeholder="قم بوصف المشكلة بالتفصيل..."
                      className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-[#fa9e1b] focus:border-[#fa9e1b] text-right"
                      dir="rtl"
                    ></textarea>
                  </div>
                  
                  {/* صور المشكلة */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2 text-right">
                      صور المشكلة
                    </label>
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 transition-all duration-300 hover:border-[#fa9e1b]">
                      <Camera size={40} className="text-gray-400 mb-3" />
                      <p className="text-gray-600 mb-2">اسحب وأفلت الصور هنا أو</p>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="px-4 py-2 bg-[#fa9e1b] text-white rounded-md cursor-pointer hover:bg-[#7b3edd] transition duration-300"
                      >
                        اختر الصور
                      </label>
                      <p className="text-xs text-gray-500 mt-2">يمكنك رفع حتى 5 صور بحجم أقصى 5 ميجابايت لكل صورة</p>
                    </div>
                    
                    {isUploading && (
                      <div className="mt-3 bg-blue-50 text-blue-700 p-3 rounded flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        جاري رفع الصور...
                      </div>
                    )}
                    
                    {formData.images.length > 0 && (
                      <div className="mt-4">
                        <p className="text-gray-700 font-medium mb-2 text-right">الصور المرفقة:</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {formData.images.map((image, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={image}
                                alt={`صورة ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg border border-gray-200"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition duration-200"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t border-gray-200 my-8"></div>
                  
                  {/* بيانات مقدم البلاغ */}
                  <h3 className="text-xl font-bold text-[#31124b] mb-6 text-right">بيانات مقدم البلاغ</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* الاسم */}
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2 text-right">
                        الاسم <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="reporterName"
                          value={formData.reporterName}
                          onChange={handleChange}
                          required
                          placeholder="أدخل اسمك الكامل"
                          className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-[#fa9e1b] focus:border-[#fa9e1b] text-right pr-10"
                          dir="rtl"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User size={20} className="text-gray-500" />
                        </div>
                      </div>
                    </div>
                    
                    {/* رقم الهاتف */}
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2 text-right">
                        رقم الهاتف <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="أدخل رقم هاتفك"
                          className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-[#fa9e1b] focus:border-[#fa9e1b] text-right pr-10"
                          dir="rtl"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone size={20} className="text-gray-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* التعهد وإرسال النموذج */}
                  <div className="mt-8">
                    <div className="flex items-start mb-6">
                      <div className="flex items-center h-5">
                        <input
                          id="terms"
                          type="checkbox"
                          required
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-[#fa9e1b]"
                        />
                      </div>
                      <label htmlFor="terms" className="mr-2 text-sm font-medium text-gray-700 text-right">
                        أتعهد بأن جميع المعلومات المقدمة صحيحة وأوافق على <a href="/termsCategories" className="text-[#fa9e1b] hover:underline">شروط الخدمة</a>
                      </label>
                    </div>
                    
                  <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-[#31124b] to-[#fa9e1b] text-white font-bold rounded-full transition-transform transform hover:scale-105 hover:shadow-lg"
              >
                      إرسال البلاغ
                      </button>
            </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
