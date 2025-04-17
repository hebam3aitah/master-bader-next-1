// app/project/[id]/page.js
"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import { Heart, MessageCircle, Share2, Flag, BarChart2, DollarSign, Users } from 'lucide-react';
import Link from 'next/link';
import ReportModal from '../[id]/components/ReportModal/page';
import CommentSection from './components/CommentSection/page';
import ProjectGallery from './components/ProjectGallery/page';
import RelatedProjects from './components/RelatedProjects/page';
import DonationSection from './components/DonationSection/page';

export default function ProjectDetails() {
  const params = useParams();
  const id = params.id;
  
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportCommentId, setReportCommentId] = useState(null);
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  useEffect(() => {
    if (!id) return;
    
    const fetchProjectData = async () => {
      try {
        setLoading(true);
        // في التطبيق الحقيقي، ستقوم بالاتصال بـ API الفعلي
        // هذه مجرد بيانات وهمية للعرض
        const projectData = {
          id: id,
          title: "مشروع المساعدة الإنسانية",
          description: "هذا المشروع يهدف لمساعدة المحتاجين في المناطق المتضررة. نعمل على توفير المأوى والغذاء والرعاية الصحية للأشخاص المتضررين من الكوارث الطبيعية والنزاعات.",
          mainImage: "/api/placeholder/800/400",
          images: [
            "/api/placeholder/800/400",
            "/api/placeholder/800/400",
            "/api/placeholder/800/400",
            "/api/placeholder/800/400"
          ],
          likes: 234,
          comments: 45,
          volunteers: 45,
          donations: 12500,
          relatedProjects: [
            { id: 1, title: "مشروع التعليم للجميع", image: "/api/placeholder/400/200" },
            { id: 2, title: "مشروع الدعم النفسي", image: "/api/placeholder/400/200" },
            { id: 3, title: "مشروع الرعاية الصحية", image: "/api/placeholder/400/200" }
          ]
        };
        
        setProject(projectData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching project data:", error);
        setLoading(false);
      }
    };
    
    fetchProjectData();
  }, [id]);
  
  const handleLike = () => {
    setLiked(!liked);
    if (!liked) {
      setProject({...project, likes: project.likes + 1});
    } else {
      setProject({...project, likes: project.likes - 1});
    }
  };
  
  const handleReportComment = (commentId) => {
    setReportCommentId(commentId);
    setShowReportModal(true);
  };
  
  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-3xl font-bold text-gray-600">جاري التحميل...</div>
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-2xl font-bold text-gray-600">لم يتم العثور على المشروع</div>
      </div>
    );
  }
  
  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      {/* الصورة الرئيسية */}
      <div className="relative w-full h-96">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 z-10"></div>
        <Image 
          src={project.mainImage} 
          alt={project.title}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute bottom-0 right-0 p-8 z-20">
          <h1 className="text-4xl font-bold text-white mb-2">{project.title}</h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* معلومات المشروع */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-[#31124b]">عن المشروع</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">{project.description}</p>
              
              <div className="flex items-center justify-between border-t border-b border-gray-200 py-4 mb-6">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <button 
                    onClick={handleLike} 
                    className={`flex items-center space-x-2 space-x-reverse ${liked ? 'text-red-500' : 'text-gray-500'}`}
                  >
                    <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                    <span>{project.likes}</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 space-x-reverse text-gray-500">
                    <MessageCircle className="w-5 h-5" />
                    <span>{project.comments}</span>
                  </button>
                  
                  <div className="relative">
                    <button onClick={handleShare} className="flex items-center space-x-2 space-x-reverse text-gray-500">
                      <Share2 className="w-5 h-5" />
                      <span>مشاركة</span>
                    </button>
                    
                    {showShareOptions && (
                      <div className="absolute top-10 right-0 bg-white shadow-lg rounded-lg p-3 z-30 w-48">
                        <button className="block w-full text-right py-2 px-3 hover:bg-gray-100 rounded">فيسبوك</button>
                        <button className="block w-full text-right py-2 px-3 hover:bg-gray-100 rounded">تويتر</button>
                        <button className="block w-full text-right py-2 px-3 hover:bg-gray-100 rounded">واتساب</button>
                        <button className="block w-full text-right py-2 px-3 hover:bg-gray-100 rounded">نسخ الرابط</button>
                      </div>
                    )}
                  </div>
                </div>
                
                <Link href={`/project/${id}/reports`}>
                  <div className="flex items-center space-x-2 space-x-reverse text-[#31124b] cursor-pointer">
                    <BarChart2 className="w-5 h-5" />
                    <span>التقارير</span>
                  </div>
                </Link>
              </div>
              
              {/* معرض الصور */}
              <ProjectGallery images={project.images} />
              
              {/* التعليقات */}
              <CommentSection projectId={id} onReportComment={handleReportComment} />
            </div>
          </div>
          
          <div>
            {/* قسم التبرع والتطوع */}
            <DonationSection 
              donations={project.donations} 
              volunteers={project.volunteers} 
              projectId={id} 
            />
            
            {/* المشاريع المتعلقة */}
            <RelatedProjects projects={project.relatedProjects} />
          </div>
        </div>
      </div>
      
      {/* نافذة الإبلاغ عن تعليق */}
      {showReportModal && (
        <ReportModal 
          commentId={reportCommentId} 
          onClose={() => setShowReportModal(false)} 
        />
      )}
    </div>
  );
}