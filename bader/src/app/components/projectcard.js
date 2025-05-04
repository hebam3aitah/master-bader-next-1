// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import { motion } from 'framer-motion';

// const ProjectCard = ({ 
//   image, 
//   month, 
//   title, 
//   description, 
//   status, 
//   progress, 
//   showDonate = true,
//   showVolunteer = true 
// }) => {
//   const getStatusColor = () => {
//     switch(status) {
//       case 'مكتمل':
//         return 'text-green-600';
//       case 'قيد التنفيذ':
//         return 'text-[#fa9e1b]';
//       default:
//         return 'text-blue-600';
//     }
//   };

//   const getProgressWidth = () => {
//     if (status === 'مكتمل') return '100%';
//     if (status === 'قيد التنفيذ') return `${progress || 50}%`;
//     return `${progress || 30}%`;
//   };

//   const getProgressBarColor = () => {
//     if (status === 'مكتمل') return 'bg-green-500';
//     if (status === 'قيد التنفيذ') return 'bg-[#fa9e1b]';
//     return 'bg-blue-500';
//   };

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}
//       className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
//     >
//       {/* صورة المشروع */}
//       <div className="relative h-48 overflow-hidden">
//         <img 
//           src={image || "/api/placeholder/800/400"} 
//           alt={title} 
//           className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//         />
//         <div className="absolute top-0 right-0 bg-white bg-opacity-90 px-3 py-1 m-3 rounded-md text-[#31124b] font-semibold">
//           {month}
//         </div>
//       </div>
      
//       {/* محتوى البطاقة */}
//       <div className="p-4 flex-grow flex flex-col">
//         <h3 className="text-xl font-bold text-[#31124b] mb-2">{title}</h3>
//         <p className="text-gray-600 mb-4 text-sm line-clamp-2">{description}</p>
        
//         {/* حالة المشروع */}
//         <div className="mt-auto">
//           <div className="flex items-center mb-2">
//             <span className="text-sm font-semibold">حالة المشروع :</span>
//             <span className={`text-sm font-bold ${getStatusColor()}`}> {status}</span>
//           </div>
          
//           {/* شريط التقدم */}
//           <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
//             <div 
//               className={`${getProgressBarColor()} h-2 rounded-full transition-all duration-500`} 
//               style={{ width: getProgressWidth() }}
//             />
//           </div>
          
//           {/* أزرار العمل */}
//           <div className="flex justify-between gap-2 mt-3">
//             <Link href={`/projects/${encodeURIComponent(title)}`} className="bg-[#31124b] hover:bg-[#826798] text-white py-2 px-4 rounded-md text-center transition-colors w-full text-sm">
//               عرض التفاصيل
//             </Link>
            
//             {showVolunteer && (
//               <Link href={`/volunteer-opportunities/${encodeURIComponent(title)}`} className="bg-[#4caf50] hover:bg-[#3f6f41] text-white py-2 px-4 rounded-md text-center transition-colors w-full text-sm">
//                 تطوع معنا
//               </Link>
//             )}
            
//             {showDonate && (
//               <Link href={`/payment/${encodeURIComponent(title)}`} className="bg-[#1976d2] hover:bg-[#52779b] text-white py-2 px-4 rounded-md text-center transition-colors w-full text-sm">
//                 تبرع الآن
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default ProjectCard;
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FiClock, 
  FiCheckCircle, 
  FiArrowRight, 
  FiHeart, 
  FiUsers, 
  FiTrendingUp, 
  FiShare2,
  FiInfo
} from 'react-icons/fi';

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
  const [isHovered, setIsHovered] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const getStatusIcon = () => {
    switch(status) {
      case 'مكتمل':
        return <FiCheckCircle className="ml-1" />;
      case 'قيد التنفيذ':
        return <FiTrendingUp className="ml-1" />;
      default:
        return <FiClock className="ml-1" />;
    }
  };

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

  const getProgressWidth = () => {
    if (status === 'مكتمل') return '100%';
    if (status === 'قيد التنفيذ') return `${progress || 50}%`;
    return `${progress || 30}%`;
  };

  const getProgressBarColor = () => {
    if (status === 'مكتمل') return 'bg-green-500';
    if (status === 'قيد التنفيذ') return 'bg-[#fa9e1b]';
    return 'bg-blue-500';
  };

  const handleShare = (platform) => {
    const shareUrl = `${window.location.origin}/projects/${encodeURIComponent(title)}`;
    
    switch(platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=تعرف على مشروع ${title} من بادر&url=${shareUrl}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=تعرف على مشروع ${title} من بادر: ${shareUrl}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        alert('تم نسخ الرابط بنجاح!');
        break;
    }
    
    setShowShareMenu(false);
  };

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {setIsHovered(false); setShowShareMenu(false);}}
    >
      {/* صورة المشروع مع تأثيرات */}
      <div className="relative h-52 overflow-hidden">
        <motion.img 
          src={image || "/api/placeholder/800/400"} 
          alt={title} 
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.7 }}
        />
        
        {/* تصنيف المشروع */}
        <div className="absolute top-40 right-0 m-3">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white bg-opacity-90 px-3 py-1 rounded-lg text-[#31124b] font-bold text-sm shadow-md"
          >
            {month}
          </motion.div>
        </div>
        
        {/* زر المشاركة */}
        <div className="absolute top-0 left-0 m-3">
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white bg-opacity-90 p-2 rounded-full text-[#31124b] shadow-md hover:bg-[#31124b] hover:text-white transition-colors duration-300"
              onClick={(e) => {
                e.stopPropagation();
                setShowShareMenu(!showShareMenu);
              }}
            >
              <FiShare2 className="text-lg" />
            </motion.button>
            
            {/* قائمة المشاركة */}
            {showShareMenu && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute left-0 top-12 bg-white rounded-lg shadow-xl p-3 z-50 min-w-[150px]"
              >
                <div className="mb-2 pb-1 border-b border-gray-100 text-center">
                  <span className="text-xs font-semibold text-gray-500">مشاركة المشروع</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => handleShare('twitter')}
                    className="flex items-center justify-center p-2 hover:bg-blue-50 rounded-md transition-colors duration-300"
                  >
                    <img src="/twitter-icon.svg" alt="Twitter" className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleShare('facebook')}
                    className="flex items-center justify-center p-2 hover:bg-blue-50 rounded-md transition-colors duration-300"
                  >
                    <img src="/facebook-icon.svg" alt="Facebook" className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleShare('whatsapp')}
                    className="flex items-center justify-center p-2 hover:bg-green-50 rounded-md transition-colors duration-300"
                  >
                    <img src="/whatsapp-icon.svg" alt="WhatsApp" className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleShare('copy')}
                    className="flex items-center justify-center p-2 hover:bg-gray-50 rounded-md transition-colors duration-300"
                  >
                    <img src="/copy-icon.svg" alt="Copy Link" className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      {/* محتوى البطاقة */}
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-[#31124b] mb-2 hover:text-[#4d1b77] transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-4 text-sm line-clamp-2 leading-relaxed">
          {description}
        </p>
        
        {/* حالة المشروع */}
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              {getStatusIcon()}
              <span className={`text-sm font-bold ${getStatusColor()}`}>{status}</span>
            </div>
            <div className="text-sm text-gray-500 font-medium">
              {status === 'مكتمل' ? '100%' : `${progress || 0}%`}
            </div>
          </div>
          
          {/* شريط التقدم المتحرك */}
          <div className="w-full bg-gray-100 rounded-full h-2.5 mb-4 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: getProgressWidth() }}
              transition={{ duration: 1, delay: 0.3 }}
              className={`${getProgressBarColor()} h-full rounded-full relative`}
            >
            </motion.div>
          </div>
          
          {/* أزرار العمل */}
          <div className="grid grid-cols-1 gap-2 mt-4">
            <Link href={`/projects/${encodeURIComponent(title)}`}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#31124b] to-[#4d1b77] hover:from-[#4d1b77] hover:to-[#31124b] text-white py-2.5 px-4 rounded-lg text-center transition-all duration-500 flex items-center justify-center gap-2 font-medium"
              >
                عرض التفاصيل
                <FiInfo className="text-lg" />
              </motion.button>
            </Link>
            
            <div className="flex gap-2 mt-2">
              {showDonate && (
                <Link href={`/payment/${encodeURIComponent(title)}`} className="flex-1">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#fa9e1b] hover:bg-[#e08c16] text-white py-2 px-4 rounded-lg text-center transition-all duration-300 flex items-center justify-center gap-1 text-sm font-medium shadow-md"
                  >
                    <FiHeart className="text-lg" />
                    تبرع الآن
                  </motion.button>
                </Link>
              )}
              
              {showVolunteer && (
                <Link href={`/volunteer-opportunities/${encodeURIComponent(title)}`} className="flex-1">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-white border-2 border-[#31124b] text-[#31124b] py-2 px-4 rounded-lg text-center transition-all duration-300 flex items-center justify-center gap-1 text-sm font-medium hover:bg-[#31124b] hover:text-white shadow-md"
                  >
                    <FiUsers className="text-lg" />
                    تطوع معنا
                  </motion.button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* ختم المشروع إذا كان مكتمل */}
      {status === 'مكتمل' && (
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-8 right-[-35px] bg-green-500 text-white py-1 px-10 transform rotate-45 shadow-lg">
            <span className="text-xs font-bold">مكتمل</span>
          </div>
        </div>
      )}
      
      {/* عرض أيقونة للمشاريع قيد التنفيذ */}
      {status === 'قيد التنفيذ' && (
        <div className="absolute bottom-3 left-3">
          <div className="bg-[#fa9e1b] rounded-full p-1.5 shadow-lg">
            <FiTrendingUp className="text-white text-sm" />
          </div>
        </div>
      )}
      
      {/* عرض أيقونة للمشاريع قيد الانتظار */}
      {status === 'قيد الانتظار' && (
        <div className="absolute bottom-3 left-3">
          <div className="bg-blue-500 rounded-full p-1.5 shadow-lg">
            <FiClock className="text-white text-sm" />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProjectCard;