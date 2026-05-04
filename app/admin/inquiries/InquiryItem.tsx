"use client";

import React, { useState } from "react";
import { 
  Mail, 
  Clock, 
  Briefcase, 
  DollarSign, 
  Trash2, 
  MessageSquare,
  User,
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { deleteMessage, markAsRead } from "../messages/actions";

interface InquiryItemProps {
  inquiry: any;
  index: number;
}

const InquiryItem = ({ inquiry, index }: InquiryItemProps) => {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const handleMarkRead = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inquiry.read) return;
    await markAsRead(inquiry.id);
    router.refresh();
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    setDeleting(true);
    const res = await deleteMessage(inquiry.id);
    if (res.success) {
      toast.success("Inquiry purged.");
      router.refresh();
    } else {
      toast.error("Delete failed.");
    }
    setDeleting(false);
  };

  return (
    <Link 
      href={`/admin/inquiries/${inquiry.id}`}
      className={`group block bg-white rounded-3xl border transition-all duration-300 hover:border-black hover:shadow-xl hover:shadow-black/5 ${
        inquiry.read 
        ? "border-gray-100 opacity-60 grayscale-[0.5] hover:opacity-100 hover:grayscale-0" 
        : "border-blue-100 shadow-xl shadow-blue-500/5 bg-blue-50/5 ring-1 ring-blue-500/20"
      }`}
    >
       <div className="flex flex-col md:flex-row items-center p-6 gap-8">
          
          {/* Status Dot */}
          <div className="hidden md:block">
             <div className={`w-3 h-3 rounded-full ${inquiry.read ? 'bg-gray-200' : 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] anim-pulse'}`} />
          </div>

          {/* Identity Brief */}
          <div className="flex-1 min-w-0">
             <div className="flex items-center gap-4 mb-2">
                <h2 className="text-[17px] font-black tracking-tight text-gray-900 leading-none truncate uppercase italic">{inquiry.name}</h2>
                <div className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest ${
                   inquiry.read ? 'bg-gray-100 text-gray-400' : 'bg-blue-600 text-white'
                }`}>
                   {inquiry.read ? 'Reviewed' : 'Action_Required'}
                </div>
             </div>
             <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400">
                   <Mail size={12} className="opacity-40" />
                   <span className="truncate">{inquiry.email}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400">
                   <Clock size={12} className="opacity-40" />
                   <span>{new Date(inquiry.createdAt).toLocaleDateString()}</span>
                </div>
             </div>
          </div>

          {/* Project Summary Chips */}
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 group-hover:bg-white group-hover:border-black/5 transition-all">
                <Briefcase size={13} className="text-gray-400" />
                <span className="text-[9px] font-black text-gray-900 uppercase tracking-widest">{inquiry.projectType || "Consult"}</span>
             </div>
             <div className="flex items-center gap-2 bg-emerald-50/50 px-4 py-2 rounded-xl border border-emerald-100 group-hover:bg-white transition-all">
                <DollarSign size={13} className="text-emerald-600" />
                <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">{inquiry.budget || "TBD"}</span>
             </div>
          </div>

          {/* Primary Action Button */}
          <div className="flex items-center gap-4">
             <button 
                onClick={handleDelete}
                disabled={deleting}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-300 hover:text-red-600 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
             >
                <Trash2 size={18} />
             </button>
             <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 group-hover:bg-black group-hover:text-white transition-all duration-500">
                <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
             </div>
          </div>

       </div>

       {/* Message Snippet (Bottom Strip) */}
       <div className="px-6 pb-6 pt-2 border-t border-black/[0.03] mt-2 group-hover:border-black/5 transition-colors">
          <p className="text-[12px] text-gray-400 font-medium leading-none truncate italic">
             "{inquiry.message}"
          </p>
       </div>
    </Link>
  );
};

export default InquiryItem;
