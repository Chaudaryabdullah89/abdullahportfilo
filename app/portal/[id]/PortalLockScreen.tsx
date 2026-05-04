"use client";

import React, { useState } from "react";
import { ShieldCheck, Mail, Key, ArrowRight, Loader2, MessageSquarePlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PortalLockScreen({ inquiryId }: { inquiryId: string }) {
  const [mode, setMode] = useState<"TOKEN" | "RECOVERY" | "SUCCESS" | "NOT_FOUND">("TOKEN");
  const [tokenInput, setTokenInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleManualAuth = () => {
    if (!tokenInput.trim()) return;
    setLoading(true);
    // Redirect to auth handler
    router.push(`/api/portal/auth?id=${inquiryId}&token=${tokenInput.trim()}`);
  };

  const handleRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    
    setLoading(true);
    try {
      const res = await fetch("/api/portal/recover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput.trim() }),
      });

      if (res.ok) {
        setMode("SUCCESS");
      } else if (res.status === 404) {
        setMode("NOT_FOUND");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-[family-name:var(--font-space-grotesk)]">
      <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-black/5 space-y-8 animate-in fade-in zoom-in duration-500">
        
        {/* Header Icon */}
        <div className="flex justify-center">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-colors duration-500 ${
            mode === "NOT_FOUND" ? "bg-amber-50 text-amber-500" :
            mode === "SUCCESS" ? "bg-emerald-50 text-emerald-500" : "bg-red-50 text-red-500"
          }`}>
            {mode === "RECOVERY" ? <Mail size={32} /> : 
             mode === "SUCCESS" ? <ShieldCheck size={32} /> : 
             mode === "NOT_FOUND" ? <MessageSquarePlus size={32} /> : <Key size={32} />}
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="text-center space-y-3">
          <h1 className="text-2xl font-black uppercase tracking-tighter">
            {mode === "TOKEN" && "Portal Locked"}
            {mode === "RECOVERY" && "Access Recovery"}
            {mode === "SUCCESS" && "Link Dispatched"}
            {mode === "NOT_FOUND" && "No Record Found"}
          </h1>
          <p className="text-gray-400 text-sm font-medium leading-relaxed">
            {mode === "TOKEN" && "This conversation is private. Please enter your secure access token to continue."}
            {mode === "RECOVERY" && "Enter your email address and we'll send you a fresh access link instantly."}
            {mode === "SUCCESS" && "We've sent a secure portal link to your email. Check your inbox to continue."}
            {mode === "NOT_FOUND" && "We couldn't find an existing conversation for that email. Would you like to start one?"}
          </p>
        </div>

        {/* Interactive Forms */}
        <div className="space-y-4">
          {mode === "TOKEN" && (
            <div className="space-y-4">
              <input 
                type="text"
                placeholder="Paste your access token..."
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 p-5 rounded-2xl text-center font-mono font-bold text-sm tracking-widest focus:outline-none focus:border-black transition-all"
              />
              <button 
                onClick={handleManualAuth}
                disabled={loading || !tokenInput.trim()}
                className="w-full bg-black text-white py-5 rounded-2xl text-[12px] font-black uppercase tracking-[0.2em] hover:bg-gray-900 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-30"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : (
                  <>Unlock Portal <ArrowRight size={18} /></>
                )}
              </button>
              <button 
                onClick={() => setMode("RECOVERY")}
                className="w-full text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
              >
                Lost your access link?
              </button>
            </div>
          )}

          {mode === "RECOVERY" && (
            <form onSubmit={handleRecovery} className="space-y-4">
              <input 
                type="email"
                placeholder="Enter your email..."
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
                className="w-full bg-gray-50 border border-gray-100 p-5 rounded-2xl text-center font-bold text-sm focus:outline-none focus:border-black transition-all"
              />
              <button 
                type="submit"
                disabled={loading || !emailInput.trim()}
                className="w-full bg-black text-white py-5 rounded-2xl text-[12px] font-black uppercase tracking-[0.2em] hover:bg-gray-900 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-30"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : "Send Access Link"}
              </button>
              <button 
                type="button"
                onClick={() => setMode("TOKEN")}
                className="w-full text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
              >
                Back to Lock Screen
              </button>
            </form>
          )}

          {mode === "NOT_FOUND" && (
            <div className="space-y-4 pt-4">
               <Link 
                href="/#hiring"
                className="w-full bg-black text-white py-5 rounded-2xl text-[12px] font-black uppercase tracking-[0.2em] hover:bg-gray-900 transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                Start New Inquiry
              </Link>
              <button 
                onClick={() => setMode("RECOVERY")}
                className="w-full text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
              >
                Try a different email
              </button>
            </div>
          )}

          {mode === "SUCCESS" && (
            <div className="pt-4">
               <button 
                onClick={() => setMode("TOKEN")}
                className="w-full bg-black text-white py-5 rounded-2xl text-[12px] font-black uppercase tracking-[0.2em] hover:bg-gray-900 transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                Return to Login
              </button>
            </div>
          )}
        </div>

        {/* Footer Brand */}
        <div className="pt-4 text-center">
           <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-20">Secure Portal Registry</p>
        </div>

      </div>
    </main>
  );
}
