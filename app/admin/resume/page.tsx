"use client";

import React from "react";
import { Save, Plus, Trash2, Command } from "lucide-react";

export default function AdminResume() {
  return (
    <div className="space-y-12">
      
      {/* Header */}
      <header className="flex justify-between items-end">
        <div>
           <h1 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] mb-2">// curriculum_vitae_config</h1>
           <h2 className="text-4xl font-black uppercase tracking-tighter italic">Identity Manifest.</h2>
        </div>
        <button className="flex items-center gap-3 bg-[#4ec9b0] text-black px-8 py-4 text-[11px] font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-[8px_8px_0px_rgba(0,0,0,1)]">
           <Save size={18} />
           Commit_Changes
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         
         {/* Main Form Area */}
         <div className="lg:col-span-8 space-y-12">
            
            {/* Professional Summary */}
            <div className="bg-white p-10 border border-black/5 shadow-[0px_20px_40px_rgba(0,0,0,0.02)]">
               <h3 className="text-xs font-bold uppercase tracking-widest mb-8 pb-4 border-b border-black/5 flex justify-between items-center">
                  Executive_Summary
                  <Command size={14} className="opacity-20" />
               </h3>
               <textarea 
                 className="w-full h-40 bg-[#fafafa] border border-black/5 p-6 text-[13px] font-[family-name:var(--font-jetbrains-mono)] leading-relaxed outline-none focus:border-black transition-all"
                 placeholder="Enter professional bio..."
                 defaultValue="Developing robust software solutions through clean code principles and architectural integrity. Every pixel and every line of code is engineered for maximum performance and scalable growth."
               />
            </div>

            {/* Experience Records */}
            <div className="space-y-6">
               <div className="flex justify-between items-end mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Employment_History</h3>
                  <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest border border-black/5 px-4 py-2 hover:bg-black hover:text-white transition-all">
                     <Plus size={14} /> Add_Record
                  </button>
               </div>

               {[1, 2].map((record) => (
                  <div key={record} className="bg-white p-10 border border-black/5 shadow-[0px_20px_40px_rgba(0,0,0,0.02)] relative group">
                     <button className="absolute top-10 right-10 p-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50">
                        <Trash2 size={16} />
                     </button>
                     <div className="grid grid-cols-2 gap-8 mb-8">
                        <div>
                           <label className="text-[10px] font-bold uppercase tracking-widest opacity-30 block mb-2">Role_Title</label>
                           <input type="text" className="w-full bg-[#fafafa] border border-black/5 px-4 py-3 text-xs font-bold uppercase outline-none focus:border-black transition-all" defaultValue="Lead Full Stack Developer" />
                        </div>
                        <div>
                           <label className="text-[10px] font-bold uppercase tracking-widest opacity-30 block mb-2">Organization</label>
                           <input type="text" className="w-full bg-[#fafafa] border border-black/5 px-4 py-3 text-xs font-bold uppercase outline-none focus:border-black transition-all" defaultValue="TechNova Solutions" />
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-8 mb-8">
                        <div>
                           <label className="text-[10px] font-bold uppercase tracking-widest opacity-30 block mb-2">Duration</label>
                           <input type="text" className="w-full bg-[#fafafa] border border-black/5 px-4 py-3 text-xs font-bold uppercase outline-none focus:border-black transition-all" defaultValue="2022 - Present" />
                        </div>
                        <div>
                           <label className="text-[10px] font-bold uppercase tracking-widest opacity-30 block mb-2">Locale</label>
                           <input type="text" className="w-full bg-[#fafafa] border border-black/5 px-4 py-3 text-xs font-bold uppercase outline-none focus:border-black transition-all" defaultValue="Remote" />
                        </div>
                     </div>
                     <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-30 block mb-2">Key_Deliverables</label>
                        <textarea className="w-full h-24 bg-[#fafafa] border border-black/5 p-4 text-xs font-[family-name:var(--font-jetbrains-mono)] outline-none focus:border-black transition-all" defaultValue="Leading the development of scalable web applications using Next.js and Node.js. Optimized database queries reducing load times by 40%." />
                     </div>
                  </div>
               ))}
            </div>

         </div>

         {/* Sidebar Tools */}
         <div className="lg:col-span-4 space-y-12">
            <div className="bg-[#121417] p-10 text-white shadow-2xl">
               <h3 className="text-[10px] font-bold uppercase tracking-widest mb-8 opacity-40">Publishing_Controls</h3>
               <div className="space-y-6">
                  <div className="flex items-center justify-between">
                     <span className="text-xs font-bold uppercase tracking-widest italic opacity-80">Public Visibility</span>
                     <div className="w-10 h-5 bg-[#4ec9b0] rounded-full relative">
                        <div className="absolute right-1 top-1 w-3 h-3 bg-black rounded-full"></div>
                     </div>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-xs font-bold uppercase tracking-widest italic opacity-80">Allow PDF Export</span>
                     <div className="w-10 h-5 bg-white/10 rounded-full relative">
                        <div className="absolute right-1 top-1 w-3 h-3 bg-white/20 rounded-full"></div>
                     </div>
                  </div>
               </div>
               <button className="w-full mt-10 py-4 border border-white/20 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">
                  Generate_Preview
               </button>
            </div>
         </div>

      </div>

    </div>
  );
}
