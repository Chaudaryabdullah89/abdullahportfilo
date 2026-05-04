"use client";

import React, { useState } from "react";
import { Mail, Clock, CheckCircle, ExternalLink, Trash2, Send, CornerUpLeft, History } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { deleteMessage, markAsRead } from "./actions";

interface MessageItemProps {
  msg: any;
  index: number;
}

const MessageItem = ({ msg, index }: MessageItemProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const handleMarkRead = async () => {
    if (msg.read) return;
    await markAsRead(msg.id);
    router.refresh();
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    setDeleting(true);
    const res = await deleteMessage(msg.id);
    if (res.success) {
      toast.success("Message deleted.");
      router.refresh();
    } else {
      toast.error("Failed to delete.");
    }
    setDeleting(false);
  };

  const handleSendResponse = async () => {
    if (!responseText.trim()) return toast.error("Please enter a response.");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/messages/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageId: msg.id, responseText }),
      });

      if (res.ok) {
        toast.success("Message sent successfully.");
        setIsReplying(false);
        setResponseText("");
        router.refresh();
      } else {
        toast.error("Failed to send message.");
      }
    } catch (error) {
      toast.error("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className={`relative p-6 border-b border-gray-100 transition-colors ${msg.read ? 'bg-white' : 'bg-blue-50/30'}`}
    >
       <div className="flex flex-col lg:flex-row gap-8">
          
          {/* User Info */}
          <div className="w-full lg:w-1/4">
             <div className="space-y-1">
                <div className="flex items-center gap-2 mb-1">
                   {!msg.read && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                   <h2 className="text-base font-semibold text-gray-900">{msg.name}</h2>
                </div>
                <p className="text-sm text-gray-500 truncate">{msg.email}</p>
                <div className="flex items-center gap-2 text-[11px] text-gray-400 font-medium mt-2 uppercase tracking-tight">
                   <Clock size={12} />
                   <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                </div>
             </div>

             <div className="flex flex-wrap gap-2 mt-4">
                {msg.projectType && (
                  <span className="px-2.5 py-1 bg-gray-100 text-[11px] font-medium text-gray-600 rounded">
                     {msg.projectType}
                  </span>
                )}
                {msg.budget && (
                  <span className="px-2.5 py-1 bg-gray-100 text-[11px] font-medium text-gray-600 rounded">
                     {msg.budget}
                  </span>
                )}
             </div>
          </div>

          {/* Content */}
          <div className="flex-1">
             <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                {msg.message}
             </p>

             {/* Response Log */}
             {msg.replied && msg.responseBody && (
               <div className="mt-6 pl-4 border-l-2 border-green-500/30 py-1">
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-green-600 mb-2 uppercase tracking-tight">
                     <History size={12} />
                     Replied on {new Date(msg.respondedAt).toLocaleDateString()}
                  </div>
                  <p className="text-sm text-gray-500 italic">
                     {msg.responseBody}
                  </p>
               </div>
             )}

             {/* Reply Field */}
             {isReplying && (
                <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                   <textarea 
                     value={responseText}
                     onChange={(e) => setResponseText(e.target.value)}
                     placeholder="Write your reply..."
                     rows={4}
                     className="w-full bg-gray-50 border border-gray-200 p-4 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                   ></textarea>
                   <div className="flex items-center gap-3">
                      <button 
                        onClick={handleSendResponse}
                        disabled={loading}
                        className="bg-gray-900 text-white px-6 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 hover:bg-black transition-all disabled:opacity-50"
                      >
                         <Send size={14} />
                         {loading ? "Sending..." : "Send Reply"}
                      </button>
                      <button onClick={() => setIsReplying(false)} className="text-xs font-medium text-gray-400 hover:text-gray-600">
                         Cancel
                      </button>
                   </div>
                </div>
             )}
          </div>

          {/* Actions */}
          <div className="flex lg:flex-col gap-2">
             <button 
               onClick={() => {
                 setIsReplying(!isReplying);
                 handleMarkRead();
               }}
               className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${msg.replied ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-900'}`}
               title="Reply"
             >
                <CornerUpLeft size={18} />
             </button>
             <button 
               onClick={handleDelete}
               disabled={deleting}
               className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all disabled:opacity-50" 
               title="Delete"
             >
                <Trash2 size={18} />
             </button>
          </div>
       </div>
    </div>
  );
};

export default MessageItem;
