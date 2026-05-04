"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useSocket } from "@/app/components/providers/SocketProvider";

export default function ClientPortalForm({ inquiryId }: { inquiryId: string }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { socket } = useSocket();

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return toast.error("Please enter a message to reply.");
    setLoading(true);

    try {
      const res = await fetch(`/api/portal/${inquiryId}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (res.ok) {
        toast.success("RESPONSE_DISPATCHED_TO_ENGINEER");
        setContent("");
        
        // Real-time emission
        if (socket) {
          socket.emit("new-message", { inquiryId });
        }
        
        router.refresh();
      } else {
        toast.error("SYSTEM_FAILURE: DISPATCH_FAILED");
      }
    } catch (error) {
      toast.error("NETWORK_FAILURE: UPLINK_LOST");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleReply} className="space-y-6">
       <div className="relative">
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type your reply here..."
            className="w-full bg-white border border-black/5 p-8 rounded-[2.5rem] text-[15px] font-medium min-h-[220px] focus:outline-none focus:border-[#4ec9b0] transition-all shadow-sm focus:shadow-xl focus:shadow-emerald-500/5 resize-none"
            disabled={loading}
          />
       </div>
       <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest italic opacity-50">
             // Our conversation is private and secure.
          </div>
          <button 
            type="submit"
            disabled={loading || !content.trim()}
            className="w-full md:w-auto bg-black text-white px-10 py-4 rounded-2xl text-[12px] font-black uppercase tracking-[0.2em] hover:bg-[#1a1a1a] transition-all flex items-center justify-center gap-3 disabled:opacity-30 group shadow-[15px_15px_40px_rgba(0,0,0,0.1)] active:scale-95"
          >
             {loading ? "Sending..." : "Click to Send"}
             <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
       </div>
    </form>
  );
}
