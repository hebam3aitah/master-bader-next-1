// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { Menu, X, ChevronDown, User } from 'lucide-react'; // إضافة أيقونة المستخدم
// import { motion, AnimatePresence } from 'framer-motion';
// import { useSession, signOut } from 'next-auth/react';  // تأكد من استخدام useSession و signOut

// export default function Navbar() {
//   const pathname = usePathname();

//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   // const { data: session, status } = useSession();  // هنا نحصل على الجلسة و حالتها من useSession
//   const [currentUser, setCurrentUser] = useState(null);

//   const isHiddenPage =
//   pathname?.startsWith("/adminDashboard") ||
//   pathname === "/login" ||
//   pathname === "/register"||

//   // التحقق من التمرير لتغيير خلفية الشريط
//   useEffect(() => {
//     setMounted(true);

//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setScrolled(true);
//       } else {
//         setScrolled(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const getUserData = async () => {
//     try {
//       const res = await fetch("/api/current-user");
//       if (!res.ok) {
//         // مثلاً المستخدم غير مسجّل دخول
//         setCurrentUser(null);
//         return;
//       }
//       const data = await res.json();
//       console.log("Fetched user data:", data);
//       setCurrentUser(data);
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       setCurrentUser(null);
//     }
//   };

//   getUserData();



//   useEffect(() => {
//     console.log(session);  // Debugging session
//   }, [session]); 
//   // قائمة العناصر الرئيسية
//   const navItems = [
//     { title: 'الرئيسية', href: '/' },
//     { title: 'المشاريع', href: '/projects' },
//     { title: 'الفرص التطوعية', href: '/volunteer-opportunities' },
//     { title: 'الجهات الداعمة', href: '/supporters' },
//     { title: 'الإبلاغ عن مشكلة', href: '/report-issue' },
//     { title: 'من نحن', href: '/about' },
//     { title: 'اتصل بنا', href: '/contact' },
//   ];

//   // تبديل القائمة المنسدلة
//   const toggleDropdown = (index) => {
//     if (activeDropdown === index) {
//       setActiveDropdown(null);
//     } else {
//       setActiveDropdown(index);
//     }
//   };
//   // منع مشاكل الـ hydration
//   if (!mounted) return null;

//   // إخفاء الـ Navbar في الصفحات المحددة
//   if (isHiddenPage) {
//     return null;
//   }


//   // إغلاق القائمة عند النقر على رابط
//   const handleNavigation = () => {
//     setIsMenuOpen(false);
//     setActiveDropdown(null);
//   };

//   return (
//     <motion.nav 
//       initial={{ y: -10 }}
//       animate={{ y: 0 }}
//       transition={{ type: 'spring', stiffness: 100, damping: 20 }}
//       className={`${
//         scrolled 
//           ? 'bg-[#31124b] shadow-lg' 
//           : 'bg-[#31124b] bg-opacity-95'
//       } text-white sticky top-0 z-50 transition-all duration-300`}
//       dir="rtl"
//     >
//       <div className="container mx-auto px-4 py-3">
//         <div className="flex items-center justify-between">
//           <Link href="/" className="flex items-center">
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="flex items-center"
//             >
//               <div className="w-10 h-15 rounded-full flex items-center justify-center">
//                 <img
//                   src="/images/logo.png"  // مسار الشعار
//                   alt="Logo"
//                   className="w-45 h-45 object-contain"
//                 />
//               </div>
//               <span className="text-4xl font-bold text-[#fa9e1b] mr-3 font-[IBM Plex Sans Arabic]">بادر</span>
//             </motion.div>
//           </Link>

//           {/* القائمة للشاشات الكبيرة */}
//           <div className="hidden lg:flex items-center space-x-1 rtl:space-x-reverse">
//             {navItems.map((item, index) => (
//               <div key={index} className="relative group">
//                 {item.dropdown ? (
//                   <button 
//                     onClick={() => toggleDropdown(index)}
//                     className="text-white hover:text-[#fa9e1b] px-3 py-2 rounded-md flex items-center"
//                   >
//                     {item.title}
//                     <ChevronDown size={16} className="mr-1 mt-1" />
//                   </button>
//                 ) : (
//                   <Link 
//                     href={item.href} 
//                     className="text-white hover:text-[#fa9e1b] px-3 py-2 rounded-md block"
//                     onClick={handleNavigation}
//                   >
//                     {item.title}
//                   </Link>
//                 )}
                
//                 {/* القائمة المنسدلة */}
//                 {item.dropdown && (
//                   <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block">
//                     <div className="py-1">
//                       {item.dropdown.map((dropItem, dropIndex) => (
//                         <Link
//                           key={dropIndex}
//                           href={dropItem.href}
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#fa9e1b]"
//                           onClick={handleNavigation}
//                         >
//                           {dropItem.title}
//                         </Link>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}


//             {/* أزرار الحساب */}
//             <div className="flex items-center space-x-2 rtl:space-x-reverse mr-2">
//               {!session ? (
//                 <>
//                   <Link 
//                     href="/register" 
//                     className="bg-[#fa9e1b] hover:bg-[#e08c18] text-[#31124b] px-4 py-2 rounded-md text-center"
//                     onClick={handleNavigation}
//                   >
//                     تسجيل الدخول
//                   </Link>
//                 </>
//               ) : (
//                 <>
//                   <motion.div
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="flex items-center space-x-2"
//                   >
//                     <User size={20} /> {/* أيقونة يوزر */}
//                     <Link 
//                       href="/profile" 
//                       className="text-white"
//                     >
//                       <span>{session.user.name}</span> {/* عرض اسم المستخدم */}
//                     </Link>
//                   </motion.div>

//                   <motion.button
//                     onClick={() => signOut()}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="bg-[#fa9e1b] hover:bg-[#e08c18] text-[#31124b] px-4 py-2 rounded-md text-center"
//                   >
//                     تسجيل الخروج
//                   </motion.button>
//                 </>
//               )}
//             </div>
//           </div>

//           {/* زر القائمة للأجهزة المحمولة */}
//           <div className="lg:hidden">
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="text-white focus:outline-none flex items-center"
//             >
//               {isMenuOpen ? (
//                 <X size={24} />
//               ) : (
//                 <Menu size={24} />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* القائمة المنسدلة للأجهزة المحمولة */}
//         <AnimatePresence>
//           {isMenuOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//               className="lg:hidden mt-4 overflow-hidden"
//             >
//               <div className="flex flex-col space-y-1 bg-[#3d1c59] rounded-lg p-3">
//                 {navItems.map((item, index) => (
//                   <div key={index} className="border-b border-[#4c2a68] last:border-0">
//                     {item.dropdown ? (
//                       <div>
//                         <button
//                           onClick={() => toggleDropdown(index)}
//                           className="text-white hover:text-[#fa9e1b] py-3 px-2 w-full text-right flex items-center justify-between"
//                         >
//                           <span>{item.title}</span>
//                           <ChevronDown 
//                             size={18} 
//                             className={`transition-transform duration-300 ${activeDropdown === index ? 'transform rotate-180' : ''}`} 
//                           />
//                         </button>
                        
//                         <AnimatePresence>
//                           {activeDropdown === index && (
//                             <motion.div
//                               initial={{ opacity: 0, height: 0 }}
//                               animate={{ opacity: 1, height: 'auto' }}
//                               exit={{ opacity: 0, height: 0 }}
//                               transition={{ duration: 0.2 }}
//                               className="pr-4 pb-2"
//                             >
//                               {item.dropdown.map((dropItem, dropIndex) => (
//                                 <Link
//                                   key={dropIndex}
//                                   href={dropItem.href}
//                                   className="text-gray-300 hover:text-[#fa9e1b] py-2 block text-sm"
//                                   onClick={handleNavigation}
//                                 >
//                                   {dropItem.title}
//                                 </Link>
//                               ))}
//                             </motion.div>
//                           )}
//                         </AnimatePresence>
//                       </div>
//                     ) : (
//                       <Link 
//                         href={item.href}
//                         className="text-white hover:text-[#fa9e1b] py-3 px-2 block"
//                         onClick={handleNavigation}
//                       >
//                         {item.title}
//                       </Link>
//                     )}
//                   </div>
//                 ))}

//                 {/* أزرار الحساب */}
//                 <div className="pt-2 flex flex-col space-y-2">
//                   {!session ? (
//                     <Link
//                       href="/register"
//                       className="bg-[#fa9e1b] hover:bg-[#e08c18] text-white px-4 py-2 rounded-md text-center"
//                       onClick={handleNavigation}
//                     >
//                       تسجيل الدخول
//                     </Link>
//                   ) : (
//                     <>
//                       <motion.div
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         className="flex items-center space-x-2"
//                       >
//                         <User size={20} /> {/* أيقونة يوزر */}
//                         <Link 
//                           href="/profile" 
//                           className="text-white"
//                         >
//                           <span>{session.user.name}</span> {/* عرض اسم المستخدم */}
//                         </Link>
//                       </motion.div>

//                       <motion.button
//                         onClick={() => signOut()}
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         className="bg-[#fa9e1b] hover:bg-[#e08c18] text-[#31124b] px-4 py-2 rounded-md text-center"
//                       >
//                         تسجيل الخروج
//                       </motion.button>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </motion.nav>
//   );
// // } 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Menu, X } from "lucide-react";

// const navItems = [
//   { title: 'الرئيسية', href: '/' },
//   { title: 'المشاريع', href: '/projects' },
//   { title: 'الفرص التطوعية', href: '/volunteer-opportunities' },
//   { title: 'الجهات الداعمة', href: '/supporters' },
//   { title: 'الإبلاغ عن مشكلة', href: '/report-issue' },
//   { title: 'من نحن', href: '/about' },
//   { title: 'اتصل بنا', href: '/contact' },
// ];

// export default function Navbar() {
//   const pathname = usePathname();

//   // حالة تحكم في القائمة الجانبية (على الموبايل)
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   // حالة للتحكّم في شريط التمرير وتغيير الخلفية
//   const [scrolled, setScrolled] = useState(false);

//   // حالة لمعرفة إن كانت الصفحة رُكِّبت (لتفادي مشاكل hydration)
//   const [mounted, setMounted] = useState(false);

//   // حالة لحفظ بيانات المستخدم (null يعني غير مسجّل دخول)
//   const [currentUser, setCurrentUser] = useState(null);

//   // التحقق إن كان المسار مخفيًّا (صفحات لا نريد عرض النافبار فيها)
//   const isHiddenPage =
//     pathname?.startsWith("/dashboard") ||
//     pathname === "/login" ||
//     pathname === "/register";

//   // جلب بيانات المستخدم الحالي عند التحميل
//   useEffect(() => {
//     setMounted(true);

//     // تفعيل مراقبة التمرير (scroll)
//     const handleScroll = () => {
//       const isScrolled = window.scrollY > 10;
//       if (isScrolled !== scrolled) {
//         setScrolled(isScrolled);
//       }
//     };
//     window.addEventListener("scroll", handleScroll);

//     // استدعاء البيانات من السيرفر (من المفترض أنك تملك /api/current-user)
//     const getUserData = async () => {
//       try {
//         const res = await fetch("/api/current-user");
//         if (!res.ok) {
//           // مثلاً المستخدم غير مسجّل دخول
//           setCurrentUser(null);
//           return;
//         }
//         const data = await res.json();
//         console.log("تم جلب بيانات المستخدم:", data);
//         setCurrentUser(data);
//       } catch (error) {
//         console.error("خطأ في جلب بيانات المستخدم:", error);
//         setCurrentUser(null);
//       }
//     };

//     getUserData();

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [scrolled]);

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen);
//   };

//   // منع مشاكل الـ hydration
//   if (!mounted) return null;

//   // إخفاء الـ Navbar في الصفحات المحددة
//   if (isHiddenPage) {
//     return null;
//   }

//   // هنا نصمّم الـ navbar
//   return (
//     <header
//       className={`sticky top-0 z-50 w-full transition-all duration-300 ${
//         scrolled ? "bg-white shadow-md" : "bg-[#31124b]"
//       }`}
//     >
//       <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" dir="rtl">
//         <div className="flex h-16 items-center justify-between">
//           {/* الشعار (Logo) */}
//           <div className="flex items-center">
//             <Link href="/" className="flex items-center">
//               <span
//                 className={`text-xl font-bold ${
//                   scrolled ? "text-[#31124b]" : "text-white"
//                 }`}
//               >
//                 <span className="ml-2">🌟</span> بادر
//               </span>
//             </Link>
//           </div>

//           {/* روابط سطح المكتب (Desktop Navigation) */}
//           <div className="hidden md:block">
//             <ul className="flex items-center space-x-6 space-x-reverse">
//               {navItems.map((link) => (
//                 <li key={link.href}>
//                   <Link
//                     href={link.href}
//                     className={`px-2 py-1 rounded-md text-sm font-medium transition-colors ${
//                       pathname === link.href
//                         ? scrolled
//                           ? "bg-[#fa9e1b] text-[#31124b] font-semibold"
//                           : "bg-white text-[#31124b] font-semibold"
//                         : scrolled
//                         ? "text-[#31124b] hover:bg-[#f8f5fc]"
//                         : "text-white hover:bg-[#411c65]"
//                     }`}
//                   >
//                     {link.title}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* قسم تسجيل الدخول أو عرض اسم المستخدم (على سطح المكتب) */}
//           <div className="hidden md:flex items-center space-x-4 space-x-reverse">
//             {currentUser ? (
//               // إذا كان مستخدم مسجّل دخول
//               <>
//                 {/* عرض الاسم مثلاً */}
//                 <span
//                   className={`text-sm font-medium ${
//                     scrolled ? "text-[#31124b]" : "text-white"
//                   }`}
//                 >
//                   {currentUser.name || "المستخدم"}
//                 </span>
//                 {/* أيقونة تذهب إلى صفحة البروفايل */}
//                 <Link
//                   href="/profile"
//                   className={`p-1 rounded-full transition-colors ${
//                     scrolled ? "bg-[#fa9e1b]" : "bg-white"
//                   }`}
//                 >
//                   <div className="h-8 w-8 rounded-full flex items-center justify-center text-[#31124b] font-bold">
//                     م
//                   </div>
//                 </Link>
//               </>
//             ) : (
//               // إذا لم يكن مستخدم مسجّل دخول
//               <>
//                 <Link
//                   href="/login"
//                   className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                     scrolled
//                       ? "text-[#31124b] hover:bg-[#f8f5fc]"
//                       : "text-white hover:bg-[#411c65]"
//                   }`}
//                 >
//                   تسجيل الدخول
//                 </Link>
//                 <Link
//                   href="/register"
//                   className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                     scrolled
//                       ? "bg-[#31124b] text-white hover:bg-[#411c65]"
//                       : "bg-[#fa9e1b] text-[#31124b] hover:bg-[#f5b55a]"
//                   }`}
//                 >
//                   التسجيل
//                 </Link>
//               </>
//             )}

//             {/* رابط خاص بالـ Admin (اختياري) */}
//             <div className="h-5 w-px bg-gray-200"></div>
//             <Link
//               href="/dashboard"
//               className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                 scrolled
//                   ? "text-[#31124b] hover:bg-[#f8f5fc]"
//                   : "text-white hover:bg-[#411c65]"
//               }`}
//             >
//               لوحة التحكم
//             </Link>
//           </div>

//           {/* زر القائمة الجانبية (Mobile menu button) */}
//           <div className="flex md:hidden">
//             <button
//               type="button"
//               className={`inline-flex items-center justify-center rounded-md p-2 ${
//                 scrolled
//                   ? "text-[#31124b] hover:bg-[#f8f5fc]"
//                   : "text-white hover:bg-[#411c65]"
//               }`}
//               onClick={toggleMobileMenu}
//             >
//               <span className="sr-only">فتح القائمة الرئيسية</span>
//               {mobileMenuOpen ? (
//                 <X className="block h-6 w-6" aria-hidden="true" />
//               ) : (
//                 <Menu className="block h-6 w-6" aria-hidden="true" />
//               )}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* القائمة الجانبية (Mobile menu) */}
//       <div className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"}`} dir="rtl">
//         <div className="space-y-1 px-4 pb-3 pt-2 bg-white border-t border-[#f1e9f7] shadow-lg">
//           {navItems.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               className={`block px-3 py-2 rounded-md text-base font-medium ${
//                 pathname === link.href
//                   ? "bg-[#fa9e1b] text-[#31124b] font-semibold"
//                   : "text-[#31124b] hover:bg-[#f8f5fc]"
//               }`}
//               onClick={() => setMobileMenuOpen(false)}
//             >
//               {link.title}
//             </Link>
//           ))}

//           {/* قسم تحت (لأزرار Login/Register أو اسم المستخدم) */}
//           <div className="pt-4 pb-3 border-t border-[#f1e9f7]">
//             <div className="flex flex-col space-y-3">
//               {currentUser ? (
//                 // إذا مستخدم مسجّل دخول
//                 <div className="flex flex-col space-y-3 px-3">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center">
//                       <div className="h-8 w-8 rounded-full bg-[#fa9e1b] flex items-center justify-center text-[#31124b] font-bold">
//                         م
//                       </div>
//                       <div className="mr-3 text-base font-medium text-[#31124b]">
//                         {currentUser.name || "المستخدم"}
//                       </div>
//                     </div>
//                     <Link
//                       href="/profile"
//                       className="px-3 py-2 rounded-md text-sm font-medium bg-[#31124b] text-white"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       الملف الشخصي
//                     </Link>
//                   </div>
//                 </div>
//               ) : (
//                 // إذا لم يكن مستخدم مسجّل دخول
//                 <>
//                   <div className="flex items-center justify-between px-3">
//                     <Link
//                       href="/login"
//                       className="w-full px-3 py-2 rounded-md text-base font-medium text-[#31124b] hover:bg-[#f8f5fc] text-center"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       تسجيل الدخول
//                     </Link>
//                   </div>
//                   <div className="flex items-center justify-between px-3">
//                     <Link
//                       href="/register"
//                       className="w-full px-3 py-2 rounded-md text-base font-medium bg-[#31124b] text-white text-center"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       التسجيل
//                     </Link>
//                   </div>
//                 </>
//               )}

//               <div className="border-t border-[#f1e9f7] pt-3 mt-1">
//                 {/* رابط لوحة التحكم */}
//                 <div className="flex items-center justify-between px-3">
//                   <Link
//                     href="/dashboard"
//                     className="px-3 py-2 rounded-md text-sm font-medium bg-[#31124b] text-white"
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     لوحة التحكم
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
//////////////////////////////////////////////////////////
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut, Bell, Sun, Moon } from "lucide-react";

const navItems = [
  { title: 'الرئيسية', href: '/' },
  { title: 'المشاريع', href: '/projects' },
  { title: 'الفرص التطوعية', href: '/volunteer-opportunities' },
  { title: 'الجهات الداعمة', href: '/supporters' },
  { title: 'الإبلاغ عن مشكلة', href: '/report-issue' },
  { title: 'من نحن', href: '/about' },
  { title: 'اتصل بنا', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();

  // حالة تحكم في القائمة الجانبية (على الموبايل)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // حالة للتحكّم في شريط التمرير وتغيير الخلفية
  const [scrolled, setScrolled] = useState(false);

  // حالة لمعرفة إن كانت الصفحة رُكِّبت (لتفادي مشاكل hydration)
  const [mounted, setMounted] = useState(false);

  // حالة لحفظ بيانات المستخدم (null يعني غير مسجّل دخول)
  const [currentUser, setCurrentUser] = useState(null);

  // إضافة حالة للوضع الليلي والنهاري
  const [darkMode, setDarkMode] = useState(false);

  // حالة لعدد الإشعارات
  const [notificationsCount, setNotificationsCount] = useState(3);

  // التحقق إن كان المسار مخفيًّا (صفحات لا نريد عرض النافبار فيها)
  const isHiddenPage =
    pathname === "/login" ||
    pathname === "/register";

  // تبديل وضع السمة (الوضع الليلي/النهاري)
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    // يمكنك هنا إضافة منطق لحفظ الإعداد في localStorage
  };

  // تسجيل الخروج - تم تبسيطه ليقوم بإعادة توجيه المستخدم للصفحة الرئيسية
  const handleLogout = () => {
    setCurrentUser(null);
    window.location.href = "/";
  };

  // جلب بيانات المستخدم الحالي عند التحميل
  useEffect(() => {
    setMounted(true);

    // تفعيل مراقبة التمرير (scroll)
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // استدعاء البيانات من السيرفر
    const getUserData = async () => {
      try {
        const res = await fetch("/api/current-user");
        if (!res.ok) {
          // مثلاً المستخدم غير مسجّل دخول
          setCurrentUser(null);
          return;
        }
        const data = await res.json();
        console.log("تم جلب بيانات المستخدم:", data);
        setCurrentUser(data);
      } catch (error) {
        console.error("خطأ في جلب بيانات المستخدم:", error);
        setCurrentUser(null);
      }
    };

    getUserData();

    // التحقق من وضع السمة المحفوظ
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // تحديث السمة عند تغيير حالة الوضع المظلم
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // منع مشاكل الـ hydration
  if (!mounted) return null;

  // إخفاء الـ Navbar في الصفحات المحددة
  if (isHiddenPage) {
    return null;
  }

  // هنا نصمّم الـ navbar
  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? darkMode ? "bg-gray-900 shadow-md" : "bg-white shadow-md shadow-[#31124b]" 
          : "bg-[#31124b]"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" dir="rtl">
        <div className="flex h-16 items-center justify-between">
          {/* الشعار (Logo) */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <span
                className={`text-xl font-bold transition-all duration-300 ${
                  scrolled 
                    ? darkMode 
                      ? "text-white" 
                      : "text-[#31124b]" 
                    : "text-white"
                }`}
              >
                <span className="ml-2 inline-block transition-transform duration-300 group-hover:rotate-12">🌟</span> بادر
              </span>
            </Link>
          </div>

          {/* روابط سطح المكتب (Desktop Navigation) */}
          <div className="hidden md:block">
            <ul className="flex items-center space-x-6 space-x-reverse">
              {navItems.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`px-2 py-1 rounded-md text-sm font-medium transition-colors relative overflow-hidden before:absolute before:bottom-0 before:right-0 before:h-0.5 before:w-0 before:bg-[#fa9e1b] before:transition-all before:duration-300 hover:before:w-full ${
                      pathname === link.href
                        ? scrolled
                          ? darkMode
                            ? "bg-[#fa9e1b] text-[#31124b] font-semibold"
                            : "bg-[#fa9e1b] text-[#31124b] font-semibold"
                          : "bg-white text-[#31124b] font-semibold"
                        : scrolled
                        ? darkMode
                          ? "text-gray-200 hover:text-white"
                          : "text-[#31124b] hover:text-[#31124b]"
                        : "text-white hover:text-white"
                    }`}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* قسم تسجيل الدخول أو الأيقونات (على سطح المكتب) - تمت إزالة اسم المستخدم */}
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            {/* زر الوضع الليلي/النهاري */}
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${
                scrolled
                  ? darkMode
                    ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                    : "text-[#31124b] hover:bg-[#f8f5fc]"
                  : "text-white hover:bg-[#411c65]"
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {currentUser ? (
              // إذا كان مستخدم مسجّل دخول
              <>
                {/* قسم الإشعارات */}
                <div className="relative">
                  <button 
                    className={`p-2 rounded-full transition-colors ${
                      scrolled
                        ? darkMode
                          ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                          : "text-[#31124b] hover:bg-[#f8f5fc]"
                        : "text-white hover:bg-[#411c65]"
                    }`}
                  >
                    <Bell size={20} />
                    {notificationsCount > 0 && (
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                        {notificationsCount}
                      </span>
                    )}
                  </button>
                </div>
                
                {/* أيقونة تذهب إلى صفحة البروفايل مع حدود بلون برتقالي ذهبي */}
                <Link
                  href="/profile"
                  className={`p-1 rounded-full transition-colors border-2 border-[#fa9e1b] ${
                    scrolled 
                      ? darkMode 
                        ? "bg-gray-800" 
                        : "bg-white" 
                      : "bg-[#31124b]"
                  }`}
                >
                  <div className="h-8 w-8 rounded-full flex items-center justify-center text-[#fa9e1b] font-bold">
                    م
                  </div>
                </Link>
                
                {/* زر تسجيل الخروج */}
                <button
                  onClick={handleLogout}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    scrolled
                      ? darkMode
                        ? "text-white hover:bg-gray-800"
                        : "text-[#31124b] hover:bg-[#f8f5fc]"
                      : "text-white hover:bg-[#411c65]"
                  }`}
                >
                  <LogOut size={16} className="ml-1" />
                  تسجيل خروج
                </button>
              </>
            ) : (
              // إذا لم يكن مستخدم مسجّل دخول
              <>
                <Link
                  href="/login"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    scrolled
                      ? darkMode
                        ? "text-white hover:bg-gray-800"
                        : "text-[#31124b] hover:bg-[#f8f5fc]"
                      : "text-white hover:bg-[#411c65]"
                  }`}
                >
                  تسجيل الدخول
                </Link>
                <Link
                  href="/register"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    scrolled
                      ? darkMode
                        ? "bg-[#fa9e1b] text-[#31124b] hover:bg-[#f5b55a]"
                        : "bg-[#31124b] text-white hover:bg-[#411c65]"
                      : "bg-[#fa9e1b] text-[#31124b] hover:bg-[#f5b55a]"
                  }`}
                >
                  التسجيل
                </Link>
              </>
            )}
          </div>

          {/* زر القائمة الجانبية (Mobile menu button) */}
          <div className="flex md:hidden">
            <button
              type="button"
              className={`inline-flex items-center justify-center rounded-md p-2 ${
                scrolled
                  ? darkMode
                    ? "text-white hover:bg-gray-800"
                    : "text-[#31124b] hover:bg-[#f8f5fc]"
                  : "text-white hover:bg-[#411c65]"
              }`}
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">فتح القائمة الرئيسية</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* القائمة الجانبية (Mobile menu) */}
      <div 
        className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"}`} 
        dir="rtl"
      >
        <div className={`space-y-1 px-4 pb-3 pt-2 shadow-lg ${
          darkMode ? "bg-gray-900 border-t border-gray-800" : "bg-white border-t border-[#f1e9f7]"
        }`}>
          {navItems.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === link.href
                  ? "bg-[#fa9e1b] text-[#31124b] font-semibold"
                  : darkMode
                    ? "text-white hover:bg-gray-800"
                    : "text-[#31124b] hover:bg-[#f8f5fc]"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.title}
            </Link>
          ))}

          {/* زر الوضع الليلي/النهاري في القائمة الجانبية */}
          <button 
            onClick={toggleTheme}
            className={`mt-2 w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium ${
              darkMode
                ? "text-white hover:bg-gray-800"
                : "text-[#31124b] hover:bg-[#f8f5fc]"
            }`}
          >
            <span>{darkMode ? "الوضع النهاري" : "الوضع الليلي"}</span>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* قسم تحت (لأزرار Login/Register أو المستخدم) - تمت إزالة اسم المستخدم */}
          <div className={`pt-4 pb-3 border-t ${
            darkMode ? "border-gray-800" : "border-[#f1e9f7]"
          }`}>
            <div className="flex flex-col space-y-3">
              {currentUser ? (
                // إذا مستخدم مسجّل دخول
                <div className="flex flex-col space-y-3 px-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full border-2 border-[#fa9e1b] flex items-center justify-center text-[#fa9e1b] font-bold">
                        م
                      </div>
                    </div>
                    
                    {/* قسم الإشعارات على الموبايل */}
                    <div className="relative">
                      <button 
                        className={`p-2 rounded-full ${
                          darkMode 
                            ? "text-white hover:bg-gray-800" 
                            : "text-[#31124b] hover:bg-[#f8f5fc]"
                        }`}
                      >
                        <Bell size={20} />
                        {notificationsCount > 0 && (
                          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                            {notificationsCount}
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {/* أزرار الملف الشخصي وتسجيل الخروج */}
                  <div className="flex space-x-2 space-x-reverse">
                    <Link
                      href="/profile"
                      className={`flex-1 px-3 py-2 rounded-md text-sm font-medium ${
                        darkMode 
                          ? "bg-gray-800 text-white hover:bg-gray-700" 
                          : "bg-[#f8f5fc] text-[#31124b] hover:bg-[#f1e9f7]"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      الملف الشخصي
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex-1 px-3 py-2 rounded-md text-sm font-medium bg-[#31124b] text-white hover:bg-[#411c65] flex items-center justify-center"
                    >
                      <LogOut size={16} className="ml-1" />
                      تسجيل خروج
                    </button>
                  </div>
                </div>
              ) : (
                // إذا لم يكن مستخدم مسجّل دخول
                <>
                  <div className="flex items-center justify-between px-3">
                    <Link
                      href="/login"
                      className={`w-full px-3 py-2 rounded-md text-base font-medium ${
                        darkMode 
                          ? "text-white hover:bg-gray-800" 
                          : "text-[#31124b] hover:bg-[#f8f5fc]"
                      } text-center`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      تسجيل الدخول
                    </Link>
                  </div>
                  <div className="flex items-center justify-between px-3">
                    <Link
                      href="/register"
                      className="w-full px-3 py-2 rounded-md text-base font-medium bg-[#31124b] text-white hover:bg-[#411c65] text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      التسجيل
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}