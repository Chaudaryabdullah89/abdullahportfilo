"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Send, CheckCircle2, ShieldCheck, Loader2 } from "lucide-react";
import { useSocket } from "@/app/components/providers/SocketProvider";

export default function InquiryResponseTerminal({ inquiryId }: { inquiryId: string }) {
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { socket } = useSocket();

  const handleSendResponse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!responseText.trim()) return toast.error("Please enter a response.");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/messages/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageId: inquiryId, responseText }),
      });

      if (res.ok) {
        toast.success("Response dispatched via secure protocol.");
        setResponseText("");

        // Real-time synchronization signal
        if (socket) {
           socket.emit("new-message", { inquiryId });
        }

        router.refresh();
      } else {
        toast.error("Dispatch failed. Check system logs.");
      }
    } catch (error) {
      toast.error("Network error. Uplink lost.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white border border-black/5 p-10 rounded-[2.5rem] shadow-sm space-y-8 mt-12">
       <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 italic">// Internal_Response_Uplink</h3>
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-300 uppercase tracking-widest leading-none">
             <ShieldCheck size={14} />
             Secured_Protocol
          </div>
       </div>

       <form onSubmit={handleSendResponse} className="space-y-8">
          <div className="relative">
             <textarea 
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                placeholder="Compose your professional response protocol..."
                className="w-full bg-gray-50/50 border border-gray-100 p-8 text-[15px] font-medium rounded-[2rem] focus:outline-none focus:border-black focus:bg-white transition-all resize-none h-48 shadow-sm"
                disabled={loading}
             />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
             <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic opacity-50">
                // This response will be visible in the client portal instantly.
             </div>
             <button 
                type="submit"
                disabled={loading || !responseText.trim()}
                className="w-full md:w-auto bg-black text-white px-12 py-5 rounded-2xl text-[12px] font-black uppercase tracking-[0.2em] hover:bg-gray-900 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-20 shadow-xl shadow-black/10"
             >
                {loading ? (
                   <>Dispatching <Loader2 className="animate-spin" size={18} /></>
                ) : (
                   <>Send Response <Send size={18} /></>
                )}
             </button>
          </div>
       </form>
    </section>
  );
}
