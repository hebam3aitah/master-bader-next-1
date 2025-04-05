// EmailVerificationPage.jsx
'use client';
// EmailVerificationPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';

export default function EmailVerificationPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [verificationStatus, setVerificationStatus] = useState(null); // null: لم يتم التحقق، true: تم بنجاح، false: فشل
  const [timer, setTimer] = useState(120); // مؤقت زمني لإعادة إرسال الرمز (بالثواني)
  const [timerActive, setTimerActive] = useState(true);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  
  // استلام البريد الإلكتروني من URL أو session storage عند تحميل المكون
  useEffect(() => {
    // يمكن استبدال هذا بالطريقة المناسبة لتطبيقك للحصول على البريد الإلكتروني
    const emailFromStorage = sessionStorage.getItem('verificationEmail');
    // أو من query parameters:
    // const urlParams = new URLSearchParams(window.location.search);
    // const emailFromUrl = urlParams.get('email');
    
    if (emailFromStorage) {
      setEmail(emailFromStorage);
    } else {
      // استخدم مثال بريد إلكتروني للعرض فقط (يجب إزالة هذا في الإنتاج)
      setEmail('user@example.com');
    }
  }, []);
  
  // التعامل مع إدخال OTP
  const handleOtpChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return; // التأكد من أن القيمة رقمية فقط
    
    // تحديث قيمة OTP
    const newOtp = [...otp];
    newOtp[index] = value.substring(0, 1);
    setOtp(newOtp);
    
    // الانتقال إلى الحقل التالي إذا تم إدخال رقم
    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };
  
  // التعامل مع مفتاح المسح للحقل الحالي والانتقال للحقل السابق
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };
  
  // التعامل مع اللصق
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    
    // التحقق مما إذا كانت البيانات الملصقة أرقامًا فقط وبطول مناسب (4 أرقام)
    if (/^\d{4}$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      
      // التركيز على آخر حقل
      inputRefs[3].current.focus();
    }
  };
  
  // التحقق من رمز OTP
  const verifyOtp = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 4) {
      alert('الرجاء إدخال رمز التحقق المكون من 4 أرقام');
      return;
    }
    
    // هنا يمكن إضافة منطق التحقق من الرمز مع الخادم
    // هذا مجرد محاكاة للتحقق الناجح
    setVerificationStatus(true);
    
    // في حالة النجاح، يمكن توجيه المستخدم إلى الصفحة التالية بعد 3 ثوانٍ
    setTimeout(() => {
      // يمكن استبدال هذا بالتوجيه إلى الصفحة المطلوبة
      window.location.href = '/dashboard';
    }, 3000);
  };
  
  // إعادة إرسال رمز OTP
  const resendOtp = () => {
    if (timer === 0) {
      // إعادة تعيين المؤقت
      setTimer(120);
      setTimerActive(true);
      
      // هنا يمكن إضافة منطق إعادة إرسال الرمز
      setOtp(['', '', '', '']); // إعادة تعيين حقول الإدخال
      alert('تم إعادة إرسال رمز التحقق');
      
      // التركيز على الحقل الأول
      inputRefs[0].current.focus();
    }
  };
  
  // تأثير المؤقت
  useEffect(() => {
    let interval;
    if (timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setTimerActive(false);
    }
    
    return () => clearInterval(interval);
  }, [timerActive, timer]);
  
  // تنسيق الوقت للعرض
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  // تأثيرات الخلفية المتحركة
  const floatingElements = Array(6).fill(0).map((_, i) => (
    <motion.div
      key={i}
      className="absolute rounded-full opacity-5"
      style={{
        background: i % 2 === 0 ? '#31124b' : '#fa9e1b',
        width: `${Math.random() * 200 + 50}px`,
        height: `${Math.random() * 200 + 50}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        filter: 'blur(40px)',
      }}
      animate={{
        x: [0, Math.random() * 50 - 25],
        y: [0, Math.random() * 50 - 25],
      }}
      transition={{
        repeat: Infinity,
        repeatType: 'reverse',
        duration: Math.random() * 5 + 5,
      }}
    />
  ));

  return (
    <>
      <Head>
        <title>تأكيد البريد الإلكتروني</title>
        <meta name="description" content="صفحة تأكيد البريد الإلكتروني" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
        {/* تأثيرات الخلفية المتحركة */}
        {floatingElements}
        
        {/* البطاقة الرئيسية */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl relative z-10 overflow-hidden"
        >
          {/* زخرفة خلفية البطاقة */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#31124b] to-[#fa9e1b]"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent to-[#fa9e1b]/5 pointer-events-none"></div>
          
          {/* الرأس */}
          <div className="text-center">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20 
              }}
              className="mx-auto h-16 w-16 bg-[#31124b] rounded-full flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </motion.div>
            <h2 className="mt-4 text-2xl font-extrabold text-[#31124b]">تأكيد البريد الإلكتروني</h2>
            <p className="mt-2 text-sm text-gray-600">
              {verificationStatus === null ? 'أدخل رمز التحقق المرسل إلى بريدك الإلكتروني' : 
                verificationStatus ? 'تم تأكيد البريد الإلكتروني بنجاح!' : 
                'فشل في تأكيد البريد الإلكتروني. حاول مرة أخرى.'}
            </p>
          </div>
          
          <AnimatePresence mode="wait">
            {verificationStatus === null ? (
              <motion.form 
                key="verification-form"
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={verifyOtp}
                className="mt-8 space-y-6"
              >
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600">
                    تم إرسال رمز التحقق إلى
                  </p>
                  <p className="font-medium text-[#31124b]">{email}</p>
                </div>
                
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-4 text-center">
                    أدخل رمز التحقق المكون من 4 أرقام
                  </label>
                  <div className="flex justify-center gap-3 mb-6">
                    {[0, 1, 2, 3].map((index) => (
                      <motion.input
                        key={index}
                        ref={inputRefs[index]}
                        type="text"
                        maxLength={1}
                        value={otp[index]}
                        onChange={(e) => handleOtpChange(index, e)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={index === 0 ? handlePaste : undefined}
                        className="w-14 h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fa9e1b] focus:border-[#fa9e1b]"
                        whileFocus={{ scale: 1.05 }}
                        initial={{ scale: 1 }}
                        animate={{ 
                          scale: otp[index] ? [1, 1.1, 1] : 1,
                          borderColor: otp[index] ? ['#d1d5db', '#fa9e1b', '#d1d5db'] : '#d1d5db'
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    ))}
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-500">
                      لم تستلم الرمز؟{' '}
                      <button
                        type="button"
                        onClick={resendOtp}
                        className={`font-medium ${timer === 0 ? 'text-[#fa9e1b] hover:text-[#fa9e1b]/80' : 'text-gray-400 cursor-not-allowed'}`}
                        disabled={timer > 0}
                      >
                        إعادة الإرسال
                      </button>
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {timer > 0 ? `يمكنك إعادة الإرسال بعد ${formatTime(timer)}` : 'يمكنك إعادة إرسال الرمز الآن'}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#31124b] hover:bg-[#31124b]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fa9e1b]"
                  >
                    تأكيد البريد الإلكتروني
                  </motion.button>
                  
                  <Link href="/login" className="w-full">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fa9e1b]"
                    >
                      العودة إلى تسجيل الدخول
                    </motion.button>
                  </Link>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="verification-result"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-8 space-y-6"
              >
                <div className="flex flex-col items-center justify-center pt-4 pb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 260, 
                      damping: 20,
                      duration: 0.5
                    }}
                    className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${verificationStatus ? 'bg-green-100' : 'bg-red-100'}`}
                  >
                    {verificationStatus ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </motion.div>
                  
                  <h3 className={`text-xl font-bold ${verificationStatus ? 'text-green-600' : 'text-red-600'}`}>
                    {verificationStatus ? 'تم التحقق بنجاح!' : 'فشل التحقق'}
                  </h3>
                  
                  <p className="mt-2 text-sm text-gray-600 text-center">
                    {verificationStatus ? 
                      'تم تأكيد بريدك الإلكتروني بنجاح. سيتم توجيهك إلى لوحة التحكم...' : 
                      'حدث خطأ أثناء تأكيد بريدك الإلكتروني. يرجى المحاولة مرة أخرى.'}
                  </p>
                  
                  {!verificationStatus && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setVerificationStatus(null)}
                      className="mt-4 px-6 py-2 text-sm font-medium text-white bg-[#31124b] rounded-lg hover:bg-[#31124b]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fa9e1b]"
                    >
                      حاول مرة أخرى
                    </motion.button>
                  )}
                </div>
                
                {verificationStatus && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="w-full bg-gray-200 rounded-full h-2"
                  >
                    <motion.div 
                      className="h-2 rounded-full bg-green-500"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 3 }}
                    ></motion.div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* زخرفة أسفل البطاقة */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at bottom center, #fa9e1b 0%, transparent 70%)',
            }}
          />
        </motion.div>
        
        {/* رابط إضافي أسفل البطاقة */}
        {/* <div className="mt-8 text-center text-sm">
          <p className="text-gray-600">
            لديك مشكلة في تأكيد البريد الإلكتروني؟{' '}
            <Link href="/contact-support" className="font-medium text-[#31124b] hover:text-[#fa9e1b] transition-colors duration-300">
              تواصل مع الدعم
            </Link>
          </p>
        </div> */}
      </div>
    </>
  );
}