// "use client";

// import { useState, useEffect } from 'react';
// import { Heart, Flag } from 'lucide-react';

// export default function CommentSection({ projectId, onReportComment }) {
//   const [comments, setComments] = useState([]);
//   const [commentText, setCommentText] = useState('');
  
//   useEffect(() => {
//     // في التطبيق الحقيقي، ستقوم بالاتصال بـ API لجلب التعليقات
//     const commentsData = [
//       { id: 1, user: "أحمد محمد", text: "مشروع رائع! أتمنى لكم التوفيق", date: "قبل 2 ساعة", likes: 12 },
//       { id: 2, user: "سارة علي", text: "أنا مهتمة بالتطوع معكم، كيف يمكنني المشاركة؟", date: "قبل 5 ساعات", likes: 8 },
//       { id: 3, user: "محمد خالد", text: "هل يمكن التبرع عبر الإنترنت؟", date: "قبل يوم", likes: 5 }
//     ];
//     setComments(commentsData);
//   }, [projectId]);
  
//   const handleAddComment = (e) => {
//     e.preventDefault();
//     if (!commentText.trim()) return;
    
//     const newComment = {
//       id: comments.length + 1,
//       user: "أنت",
//       text: commentText,
//       date: "الآن",
//       likes: 0
//     };
    
//     setComments([newComment, ...comments]);
//     setCommentText('');
//   };
  
//   return (
//     <div>
//       <h3 className="text-xl font-bold mb-4 text-[#31124b]">التعليقات</h3>
//       <form onSubmit={handleAddComment} className="mb-6">
//         <div className="flex">
//           <textarea 
//             value={commentText}
//             onChange={(e) => setCommentText(e.target.value)}
//             placeholder="اكتب تعليقك هنا..."
//             className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e08c18]"
//             rows="3"
//           />
//         </div>
//         <div className="mt-2 text-left">
//           <button 
//             type="submit" 
//             className="bg-[#e08c18] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
//           >
//             إرسال
//           </button>
//         </div>
//       </form>
      
//       <div className="space-y-4">
//         {comments.map((comment) => (
//           <div key={comment.id} className="border-b border-gray-200 pb-4">
//             <div className="flex justify-between mb-2">
//               <div className="font-bold">{comment.user}</div>
//               <div className="text-gray-500 text-sm">{comment.date}</div>
//             </div>
//             <p className="text-gray-700 mb-2">{comment.text}</p>
//             <div className="flex justify-between items-center">
//               <div className="flex items-center space-x-4 space-x-reverse">
//                 <button className="text-gray-500 text-sm flex items-center">
//                   <Heart className="w-4 h-4 ml-1" />
//                   <span>{comment.likes}</span>
//                 </button>
//                 <button 
//                   onClick={() => onReportComment(comment.id)}
//                   className="text-gray-500 text-sm flex items-center"
//                 >
//                   <Flag className="w-4 h-4 ml-1" />
//                   <span>إبلاغ</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from 'react';
import { Heart, Flag } from 'lucide-react';
import axios from 'axios';

export default function CommentSection({ projectId, onReportComment }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    if (!projectId) return;
    fetchComments();
  }, [projectId]);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/api/projects/${projectId}/comments`);
      setComments(res.data.reverse());
    } catch (err) {
      console.error("فشل تحميل التعليقات:", err);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const res = await axios.post(`/api/projects/${projectId}/comments`, {
        comment: commentText,
        userId: "64f63b2c1b2f7a9e4d234bcd" // مؤقتًا، استبدله بـ userId الحقيقي
      });
      setComments(res.data.reverse());
      setCommentText('');
    } catch (err) {
      console.error("فشل إرسال التعليق:", err);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4 text-[#31124b]">التعليقات</h3>
      <form onSubmit={handleAddComment} className="mb-6">
        <div className="flex">
          <textarea 
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="اكتب تعليقك هنا..."
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e08c18]"
            rows="3"
          />
        </div>
        <div className="mt-2 text-left">
          <button 
            type="submit" 
            className="bg-[#e08c18] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            إرسال
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {comments.map((comment, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <div className="flex justify-between mb-2">
              <div className="font-bold">{comment.user?.name || "مستخدم"}</div>
              <div className="text-gray-500 text-sm">
                {new Date(comment.createdAt).toLocaleDateString('ar-EG')}
              </div>
            </div>
            <p className="text-gray-700 mb-2">{comment.comment}</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4 space-x-reverse">
                <button className="text-gray-500 text-sm flex items-center">
                  <Heart className="w-4 h-4 ml-1" />
                  <span>0</span>
                </button>
                <button 
                  onClick={() => onReportComment(comment._id)}
                  className="text-gray-500 text-sm flex items-center"
                >
                  <Flag className="w-4 h-4 ml-1" />
                  <span>إبلاغ</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
