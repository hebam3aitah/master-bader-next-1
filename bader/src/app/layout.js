// app/layout.js
import '../styles/globals.css';  // تأكد من استيراد الأنماط
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Inter } from 'next/font/google';
import SessionWrapper from "@/app/components/SessionWrapper";

const ibmPlexSansArabic = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex-sans-arabic',
});

export default function RootLayout({ children }) {
  return (
    
    <html lang="ar">
       <head>
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${ibmPlexSansArabic.variable} font-body bg-gray-100`}>
      <SessionWrapper>

      <Navbar/>
      <main>{children}</main>
      <Footer />
      </SessionWrapper>

    </body></html>
  );
}
