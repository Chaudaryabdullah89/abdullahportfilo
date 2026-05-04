"use client";

import React, { useState, useEffect } from "react";
import { Save, User, AtSign, Search, Globe, RefreshCw } from "lucide-react";
import { getSettings, updateSettings } from "./actions";
import { toast } from "sonner";

const GithubIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    heroName: "",
    heroTitle: "",
    heroBadge: "",
    metaTitle: "",
    metaDescription: "",
    githubUrl: "",
    linkedinUrl: "",
    email: "",
    isAvailable: true
  });

  useEffect(() => {
    const fetch = async () => {
      const data = await getSettings();
      if (data) {
        setFormData({
          heroName: data.heroName || "",
          heroTitle: data.heroTitle || "",
          heroBadge: data.heroBadge || "",
          metaTitle: data.metaTitle || "",
          metaDescription: data.metaDescription || "",
          githubUrl: data.githubUrl || "",
          linkedinUrl: data.linkedinUrl || "",
          email: data.email || "",
          isAvailable: data.isAvailable ?? true
        });
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const res = await updateSettings(formData);
    if (res.success) {
      toast.success("SYSTEM_STABLE: Settings persistent across all nodes.");
    } else {
      toast.error("HARDWARE_FAILURE: Could not sync settings.");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4 opacity-30">
        <RefreshCw className="animate-spin text-black" size={40} />
        <p className="text-xs font-bold uppercase tracking-widest text-black">Decrypting Configuration...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 px-4">
        <div>
           <p className="text-blue-600 text-[10px] font-bold tracking-[0.2em] mb-2 font-mono uppercase opacity-70">Global / Core_Config</p>
           <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">Site Settings</h1>
           <p className="text-[13px] text-gray-400 mt-1.5 font-medium max-w-lg">Manage your architectural identity and global system parameters.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2.5 bg-black text-white px-8 py-3.5 rounded-xl text-[12px] font-bold hover:bg-gray-800 transition-all shadow-xl shadow-black/10 active:scale-95 disabled:opacity-50"
        >
           {saving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
           {saving ? "SYNCING..." : "SAVE_CONFIGURATION"}
        </button>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* Personal Identity */}
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-black/[0.02] space-y-8 group">
           <div className="flex items-center gap-3.5 pb-5 border-b border-gray-50">
              <div className="w-10 h-10 bg-blue-50/50 rounded-xl flex items-center justify-center text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                 <User size={18} />
              </div>
              <div>
                 <h3 className="font-bold text-base text-gray-900 tracking-tight">Identity Module</h3>
                 <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Public Persona</p>
              </div>
           </div>
           
           <div className="space-y-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Hero_Display_Name</label>
                 <input 
                   type="text" 
                   value={formData.heroName}
                   onChange={(e) => setFormData({...formData, heroName: e.target.value})}
                   className="w-full bg-gray-50/50 border border-gray-100/50 px-6 py-4 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-blue-200 focus:shadow-xl focus:shadow-blue-500/5 transition-all text-gray-900" 
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Professional_Title</label>
                 <input 
                   type="text" 
                   value={formData.heroTitle}
                   onChange={(e) => setFormData({...formData, heroTitle: e.target.value})}
                   className="w-full bg-gray-50/50 border border-gray-100/50 px-6 py-4 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-blue-200 focus:shadow-xl focus:shadow-blue-500/5 transition-all text-gray-900" 
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Status_Badge_Protocol</label>
                 <input 
                   type="text" 
                   value={formData.heroBadge}
                   onChange={(e) => setFormData({...formData, heroBadge: e.target.value})}
                   className="w-full bg-gray-50/50 border border-gray-100/50 px-6 py-4 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-blue-200 focus:shadow-xl focus:shadow-blue-500/5 transition-all text-gray-900" 
                 />
              </div>
              <div className="space-y-4 pt-4 border-t border-gray-50">
                  <div className="flex items-center justify-between">
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Availability_Protocol</label>
                        <p className="text-[11px] text-gray-400 font-medium">Toggle "Hire Me" visibility</p>
                     </div>
                     <button 
                       onClick={() => setFormData({...formData, isAvailable: !formData.isAvailable})}
                       className={`w-12 h-6 rounded-full transition-all relative ${formData.isAvailable ? 'bg-[#4ec9b0]' : 'bg-gray-200'}`}
                     >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.isAvailable ? 'left-7' : 'left-1'}`} />
                     </button>
                  </div>
               </div>
           </div>
        </div>

        {/* Search & Exposure */}
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-black/[0.02] space-y-8 group">
           <div className="flex items-center gap-3.5 pb-5 border-b border-gray-50">
              <div className="w-10 h-10 bg-emerald-50/50 rounded-xl flex items-center justify-center text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                 <Search size={18} />
              </div>
              <div>
                 <h3 className="font-bold text-base text-gray-900 tracking-tight">SEO Parameters</h3>
                 <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Discovery Metadata</p>
              </div>
           </div>
           
           <div className="space-y-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Meta_Title_Entry</label>
                 <input 
                   type="text" 
                   value={formData.metaTitle}
                   onChange={(e) => setFormData({...formData, metaTitle: e.target.value})}
                   className="w-full bg-gray-50/50 border border-gray-100/50 px-6 py-4 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-blue-200 focus:shadow-xl focus:shadow-blue-500/5 transition-all text-gray-900" 
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Manifest_Description</label>
                 <textarea 
                   value={formData.metaDescription}
                   onChange={(e) => setFormData({...formData, metaDescription: e.target.value})}
                   className="w-full h-32 bg-gray-50/50 border border-gray-100/50 p-6 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-blue-200 focus:shadow-xl focus:shadow-blue-500/5 transition-all resize-none leading-relaxed text-gray-900" 
                 />
              </div>
           </div>
        </div>

        {/* Network Connections */}
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-black/[0.02] space-y-8 xl:col-span-2 group">
           <div className="flex items-center gap-3.5 pb-5 border-b border-gray-50">
              <div className="w-10 h-10 bg-purple-50/50 rounded-xl flex items-center justify-center text-purple-600 transition-colors group-hover:bg-purple-600 group-hover:text-white">
                 <Globe size={18} />
              </div>
              <div>
                 <h3 className="font-bold text-base text-gray-900 tracking-tight">Network Protocols</h3>
                 <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Communication Channels</p>
              </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4 bg-gray-50/50 px-6 py-4 border border-gray-100/50 rounded-xl group focus-within:border-blue-200 focus-within:bg-white focus-within:shadow-xl focus-within:shadow-blue-500/5 transition-all">
                 <GithubIcon size={20} className="text-gray-400 group-focus-within:text-black" />
                 <input 
                   type="text" 
                   value={formData.githubUrl}
                   onChange={(e) => setFormData({...formData, githubUrl: e.target.value})}
                   className="bg-transparent border-none outline-none text-[13px] font-bold w-full text-gray-900" 
                 />
              </div>
              <div className="flex items-center gap-4 bg-gray-50/50 px-6 py-4 border border-gray-100/50 rounded-xl group focus-within:border-blue-200 focus-within:bg-white focus-within:shadow-xl focus-within:shadow-blue-500/5 transition-all">
                 <LinkedinIcon size={20} className="text-gray-400 group-focus-within:text-black" />
                 <input 
                   type="text" 
                   value={formData.linkedinUrl}
                   onChange={(e) => setFormData({...formData, linkedinUrl: e.target.value})}
                   className="bg-transparent border-none outline-none text-[13px] font-bold w-full text-gray-900" 
                 />
              </div>
              <div className="flex items-center gap-4 bg-gray-50/50 px-6 py-4 border border-gray-100/50 rounded-xl group focus-within:border-blue-200 focus-within:bg-white focus-within:shadow-xl focus-within:shadow-blue-500/5 transition-all">
                 <AtSign size={20} className="text-gray-400 group-focus-within:text-black" />
                 <input 
                   type="text" 
                   value={formData.email}
                   onChange={(e) => setFormData({...formData, email: e.target.value})}
                   className="bg-transparent border-none outline-none text-[13px] font-bold w-full text-gray-900" 
                 />
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
