

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut, Bell } from "lucide-react";
import NotificationsMenu from "./NotificationsMenu";

const navItems = [
  { title: "الرئيسية", href: "/" },
  { title: "المشاريع", href: "/projects" },
  { title: "الفرص التطوعية", href: "/volunteer-opportunities" },
  { title: "الجهات الداعمة", href: "/supporters" },
  { title: "الإبلاغ عن مشكلة", href: "/report-issue" },
  { title: "من نحن", href: "/about" },
  { title: "اتصل بنا", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const isHiddenPage = pathname === "/login" || pathname === "/register";

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "GET" });
      document.cookie = "token=; Max-Age=0; path=/"; // مسح الكوكي يدويًا احتياطيًا
      setCurrentUser(null);
      window.location.href = "/";
    } catch (err) {
      console.error("فشل تسجيل الخروج:", err);
    }
  };

  useEffect(() => {
    setMounted(true);

    const getUserData = async () => {
      try {
        const res = await fetch("/api/current-user");
        if (!res.ok) {
          setCurrentUser(null);
          return;
        }
        const data = await res.json();
        setCurrentUser(data);
      } catch (error) {
        console.error("خطأ في جلب بيانات المستخدم:", error);
        setCurrentUser(null);
      }
    };

    getUserData();
  }, []);

  if (!mounted || isHiddenPage) return null;

  return (
    <header className="sticky top-0 z-50 w-full bg-[#31124b]">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" dir="rtl">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <img src="/images/logo.png" alt="بادر" className="h-8 w-auto mr-2" />
            <span className="text-xl font-bold text-white">بادر</span>
          </Link>

          <div className="hidden md:flex space-x-6 space-x-reverse items-center">
            {navItems.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md font-medium text-sm transition-colors ${
                  pathname === link.href
                    ? "bg-[#fa9e1b] text-[#31124b]"
                    : "text-white hover:text-[#fa9e1b]"
                }`}
              >
                {link.title}
              </Link>
            ))}
            <NotificationsMenu />

            {currentUser ? (
              <>
                <span className="text-sm text-white font-semibold">
                  {currentUser.name}
                </span>
                <Link
                  href="/profile"
                  className="h-8 w-8 rounded-full bg-white text-[#31124b] flex items-center justify-center font-bold"
                >
                  {currentUser?.name?.charAt(0) || "م"}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-red-300 flex items-center gap-1"
                >
                  <LogOut size={16} /> تسجيل خروج
                </button>
              </>
            ) : (
              <Link href="/login" className="text-white hover:text-[#fa9e1b]">
                تسجيل الدخول
              </Link>
            )}
          </div>

          <div className="md:hidden flex">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="flex flex-col p-4 space-y-2">
            {navItems.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === link.href
                    ? "bg-[#fa9e1b] text-[#31124b]"
                    : "text-[#31124b] hover:bg-[#f5f5f5]"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}

            {currentUser ? (
              <>
                <div className="text-sm font-semibold text-[#31124b]">
                  {currentUser.name}
                </div>
                <button
                  onClick={handleLogout}
                  className="text-red-600 text-right"
                >
                  تسجيل خروج
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="text-[#31124b]"
                onClick={() => setMobileMenuOpen(false)}
              >
                تسجيل الدخول
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
