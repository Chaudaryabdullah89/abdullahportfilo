"use client";

import React, { useState } from "react";
import { Lock, User, ArrowRight, ShieldCheck, Terminal, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

export default function AdminLogin() {
  const [isFocused, setIsFocused] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("AUTHENTICATION_FAILURE: INVALID_CREDENTIALS");
        toast.error("SECURITY_ALERT: ACCESS_DENIED");
      } else {
        toast.success("SYSTEM_ACCESS: SESSION_ESTABLISHED");
        router.push("/admin/dashboard");
      }
    } catch (err) {
      setError("SYSTEM_ERROR: CONNECTION_TIMEOUT");
      toast.error("SYSTEM_FATAL: UNABLE_TO_REACH_AUTH_SERVER");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#121417] flex items-center justify-center p-6 font-[family-name:var(--font-space-grotesk)] overflow-hidden relative">
      
      {/* Background Architectural Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
         <div className="absolute top-[-10%] left-[-10%] text-[400px] font-black text-white/5 leading-none transform rotate-[-15deg]">ADMIN</div>
         <div className="absolute bottom-[-10%] right-[-10%] text-[400px] font-black text-white/5 leading-none transform rotate-[15deg] uppercase tracking-tighter">SECURE</div>
      </div>

      <div className="w-full max-w-[450px] relative z-10">
         
         {/* Branding Header */}
         <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#4ec9b0] mb-8 shadow-[10px_10px_0px_rgba(255,255,255,0.05)]">
               <ShieldCheck size={32} className="text-black" />
            </div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Systems_Access.</h1>
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] font-[family-name:var(--font-jetbrains-mono)]">
               // authorized_personnel_only
            </p>
         </div>

         {/* Login Card */}
         <div className={`bg-[#1c1f24] p-12 border transition-all duration-700 ${isFocused ? 'border-[#4ec9b0] shadow-[0_0_50px_rgba(78,201,176,0.2)]' : 'border-white/5 shadow-2xl'}`}>
            <form className="space-y-8" onSubmit={handleSubmit}>
               
               {error && (
                 <div className="bg-red-500/10 border border-red-500/20 p-4 flex items-center gap-3 text-red-500 text-[10px] font-black uppercase tracking-widest">
                   <AlertTriangle size={16} />
                   {error}
                 </div>
               )}

               {/* Identity Field */}
               <div className="relative group">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 block mb-3 pl-1">Identity_Manifest</label>
                  <div className="flex items-center bg-white/5 border border-white/5 group-hover:border-white/20 transition-all">
                     <div className="p-4 text-white/20"><User size={20} /></div>
                     <input 
                       onFocus={() => setIsFocused(true)}
                       onBlur={() => setIsFocused(false)}
                       type="text" 
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}
                       placeholder="SYSTEM_ADMIN" 
                       className="bg-transparent border-none outline-none text-white text-xs font-bold uppercase tracking-widest w-full py-4 pr-6 placeholder:opacity-10"
                       required
                     />
                  </div>
               </div>

               {/* Access Key Field */}
               <div className="relative group">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 block mb-3 pl-1">Access_Algorithm</label>
                  <div className="flex items-center bg-white/5 border border-white/5 group-hover:border-white/20 transition-all">
                     <div className="p-4 text-white/20"><Lock size={20} /></div>
                     <input 
                       onFocus={() => setIsFocused(true)}
                       onBlur={() => setIsFocused(false)}
                       type="password" 
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       placeholder="••••••••••••" 
                       className="bg-transparent border-none outline-none text-white text-xs font-bold uppercase tracking-widest w-full py-4 pr-6 placeholder:opacity-10"
                       required
                     />
                  </div>
               </div>

               <div className="pt-4">
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#4ec9b0] text-black py-5 text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:brightness-110 active:scale-[0.98] transition-all shadow-[8px_8px_0px_rgba(255,255,255,0.05)] disabled:opacity-50"
                  >
                     {loading ? "ESTABLISHING_SESSION..." : "Establish_Secure_Session"}
                     <ArrowRight size={18} />
                  </button>
               </div>
            </form>

            <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center opacity-20">
               <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-white">
                  <Terminal size={12} />
                  ROOT::V2.4.0
               </div>
               <Link href="/" className="text-[9px] font-black uppercase tracking-widest text-white hover:opacity-100 transition-opacity">
                  Abandon_Access
               </Link>
            </div>
         </div>

         {/* Footer Warning */}
         <p className="text-center mt-12 text-[9px] font-bold text-white/10 uppercase tracking-widest px-8 leading-relaxed">
            Every access attempt is logged and monitored. Unauthorized breach attempts will trigger an automated IP-locked isolation protocol.
         </p>

      </div>

    </div>
  );
}

