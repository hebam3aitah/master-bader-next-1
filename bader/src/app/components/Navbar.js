
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // التحقق من التمرير لتغيير خلفية الشريط
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // قائمة العناصر الرئيسية
  const navItems = [
    { title: 'الرئيسية', href: '/' },
    { 
      title: 'المشاريع', 
      href: '/projects',
     
    },
    { title: 'الفرص التطوعية', href: '/volunteer-opportunities' },
    { title: 'الجهات الداعمة', href: '/supporters' },
    { title: 'الإبلاغ عن مشكلة', href: '/report-issue' },
    { title: 'من نحن', href: '/about' },
    { title: 'اتصل بنا', href: '/contact' },
  ];

  // تبديل القائمة المنسدلة
  const toggleDropdown = (index) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(index);
    }
  };

  // إغلاق القائمة عند النقر على رابط
  const handleNavigation = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <motion.nav 
      initial={{ y: -10 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`${
        scrolled 
          ? 'bg-[#31124b] shadow-lg' 
          : 'bg-[#31124b] bg-opacity-95'
      } text-white sticky top-0 z-50 transition-all duration-300`}
      dir="rtl"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
        
<Link href="/" className="flex items-center">
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="flex items-center"
  >
    <div className="w-10 h-15 rounded-full flex items-center justify-center ">
      {/* إضافة صورة الشعار */}
      <img
        src="\images\logo.png"  // ضع هنا مسار الشعار الذي تريد إضافته
        alt="Logo"
        className="w-45 h-45 object-contain"  // يمكن تعديل الأبعاد حسب الحاجة
      />
    </div>
    <span className="text-4xl font-bold text-[#fa9e1b]  mr-3 font-[IBM Plex Sans Arabic]">بادر</span>
  </motion.div>
</Link>


          {/* القائمة للشاشات الكبيرة */}
          <div className="hidden lg:flex items-center space-x-1 rtl:space-x-reverse">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                {item.dropdown ? (
                  <button 
                    onClick={() => toggleDropdown(index)}
                    className="text-white hover:text-[#fa9e1b] px-3 py-2 rounded-md flex items-center"
                  >
                    {item.title}
                    <ChevronDown size={16} className="mr-1 mt-1" />
                  </button>
                ) : (
                  <Link 
                    href={item.href} 
                    className="text-white hover:text-[#fa9e1b] px-3 py-2 rounded-md block"
                    onClick={handleNavigation}
                  >
                    {item.title}
                  </Link>
                )}
                
                {/* القائمة المنسدلة */}
                {item.dropdown && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block">
                    <div className="py-1">
                      {item.dropdown.map((dropItem, dropIndex) => (
                        <Link
                          key={dropIndex}
                          href={dropItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#fa9e1b]"
                          onClick={handleNavigation}
                        >
                          {dropItem.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* أزرار الحساب */}
            <div className="flex items-center space-x-2 rtl:space-x-reverse mr-2">
             
              
            
                <Link 
                  href="/register" 
                  className="bg-[#fa9e1b] hover:bg-[#e08c18] text-[#31124b] px-4 py-2 rounded-md text-center"
                  onClick={handleNavigation}
                >
                  تسجيل الدخول
                  </Link>
            </div>
          </div>

          {/* زر القائمة للأجهزة المحمولة */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none flex items-center"
            >
              {isMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
        
        {/* القائمة المنسدلة للأجهزة المحمولة */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 overflow-hidden"
            >
              <div className="flex flex-col space-y-1 bg-[#3d1c59] rounded-lg p-3">
                {navItems.map((item, index) => (
                  <div key={index} className="border-b border-[#4c2a68] last:border-0">
                    {item.dropdown ? (
                      <div>
                        <button
                          onClick={() => toggleDropdown(index)}
                          className="text-white hover:text-[#fa9e1b] py-3 px-2 w-full text-right flex items-center justify-between"
                        >
                          <span>{item.title}</span>
                          <ChevronDown 
                            size={18} 
                            className={`transition-transform duration-300 ${
                              activeDropdown === index ? 'transform rotate-180' : ''
                            }`} 
                          />
                        </button>
                        
                        <AnimatePresence>
                          {activeDropdown === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pr-4 pb-2"
                            >
                              {item.dropdown.map((dropItem, dropIndex) => (
                                <Link
                                  key={dropIndex}
                                  href={dropItem.href}
                                  className="text-gray-300 hover:text-[#fa9e1b] py-2 block text-sm"
                                  onClick={handleNavigation}
                                >
                                  {dropItem.title}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-white hover:text-[#fa9e1b] py-3 px-2 block"
                        onClick={handleNavigation}
                      >
                        {item.title}
                      </Link>
                    )}
                  </div>
                ))}
                
                {/* أزرار الحساب */}
                <div className="pt-2 flex flex-col space-y-2">
                 
                  <Link
                    href="/register"
                    className="bg-[#fa9e1b] hover:bg-[#e08c18] text-white px-4 py-2 rounded-md text-center"
                    onClick={handleNavigation}
                  >
                                      تسجيل الدخول

                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}