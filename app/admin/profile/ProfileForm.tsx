"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { updateProfile } from "./actions";

export default function ProfileForm({ initialData }: { initialData: { name: string, email: string } }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData.name,
    email: initialData.email,
    newPassword: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    setLoading(true);
    try {
      const res = await updateProfile({
        name: formData.name,
        email: formData.email,
        password: formData.newPassword || undefined
      });

      if (res.success) {
        toast.success("Identity updated successfully.");
        setFormData(prev => ({ ...prev, newPassword: "", confirmPassword: "" }));
      } else {
        toast.error(res.error || "Update failed.");
      }
    } catch (err) {
      toast.error("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Identity Block */}
      <div className="bg-white border border-black/5 p-10 rounded-[2.5rem] shadow-sm space-y-8">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">// Identity_Manifest</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Display Name</label>
            <input 
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              className="w-full bg-gray-50 border border-gray-100 p-5 rounded-2xl font-bold text-sm focus:outline-none focus:border-black transition-all"
            />
          </div>
          <div className="space-y-3">
             <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Access Email</label>
             <input 
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              className="w-full bg-gray-50 border border-gray-100 p-5 rounded-2xl font-bold text-sm focus:outline-none focus:border-black transition-all"
            />
          </div>
        </div>
      </div>

      {/* Security Block */}
      <div className="bg-white border border-black/5 p-10 rounded-[2.5rem] shadow-sm space-y-8">
        <div className="flex items-center justify-between">
           <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">// Credential_Rotation</h3>
           <div className="flex items-center gap-2 text-[9px] font-bold text-amber-500 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full">
              <AlertCircle size={10} />
              Leave blank to keep current
           </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">New Password</label>
            <input 
              type="password"
              placeholder="••••••••"
              value={formData.newPassword}
              onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
              className="w-full bg-gray-50 border border-gray-100 p-5 rounded-2xl font-mono text-sm focus:outline-none focus:border-black transition-all"
            />
          </div>
          <div className="space-y-3">
             <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Confirm Changes</label>
             <input 
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              className="w-full bg-gray-50 border border-gray-100 p-5 rounded-2xl font-mono text-sm focus:outline-none focus:border-black transition-all"
            />
          </div>
        </div>
      </div>

      {/* Action Center */}
      <div className="flex items-center justify-end gap-6 pt-4">
         <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest italic pt-1">Require_System_Update_Sync //</p>
         <button 
           type="submit"
           disabled={loading}
           className="bg-black text-white px-10 py-5 rounded-[1.5rem] text-[12px] font-black uppercase tracking-[0.2em] hover:bg-gray-900 transition-all flex items-center gap-3 shadow-xl shadow-black/10 active:scale-95 disabled:opacity-20"
         >
           {loading ? <Loader2 className="animate-spin" size={18} /> : (
             <>Apply Changes <CheckCircle2 size={18} /></>
           )}
         </button>
      </div>

    </form>
  );
}
