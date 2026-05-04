"use client";

import React from "react";
import { ArrowLeft, Save, Eye, PenTool, FileText, Code } from "lucide-react";
import Link from "next/link";

export default function BlogEditor() {
  return (
    <div className="space-y-12 pb-24">
      
      {/* Editorial Header */}
      <nav className="flex justify-between items-center mb-12">
        <Link href="/admin/blogs" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-gray-400 transition-all">
           <ArrowLeft size={16} /> Back_to_Insights
        </Link>
        <div className="flex gap-4">
           <button className="flex items-center gap-2 px-6 py-3 border border-black/5 text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">
              <Eye size={16} /> Preview_Article
           </button>
           <button className="flex items-center gap-2 px-8 py-3 bg-[#4ec9b0] text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-[6px_6px_0px_rgba(0,0,0,1)]">
              <Save size={16} /> Publish_Insight
           </button>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         
         {/* Main Writing Area */}
         <div className="lg:col-span-8 space-y-12">
            
            {/* Meta Info */}
            <div className="bg-white p-10 border border-black/5">
              <div className="space-y-8">
                 <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-30 block mb-2">Article_Title</label>
                    <input type="text" className="w-full bg-[#fafafa] border border-black/5 p-6 text-3xl font-black uppercase outline-none focus:border-black transition-all" defaultValue="The Future of Full Stack Development in 2024" />
                 </div>
                 <div className="grid grid-cols-2 gap-8">
                    <div>
                       <label className="text-[10px] font-bold uppercase tracking-widest opacity-30 block mb-2">Classification</label>
                       <select className="w-full bg-[#fafafa] border border-black/5 p-4 text-[10px] font-bold uppercase outline-none focus:border-black transition-all appearance-none cursor-pointer">
                          <option>Tech Trends</option>
                          <option>Development</option>
                          <option>Performance</option>
                       </select>
                    </div>
                    <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-30 block mb-2">Publication_Date</label>
                        <input type="date" className="w-full bg-[#fafafa] border border-black/5 p-4 text-[10px] font-bold uppercase outline-none focus:border-black transition-all" />
                    </div>
                 </div>
              </div>
            </div>

            {/* Content Editor */}
            <div className="bg-white p-10 border border-black/5">
               <h3 className="text-[10px] font-black uppercase tracking-widest mb-10 pb-4 border-b border-black/5 flex items-center justify-between">
                  Insight_Manuscript_Content
                  <PenTool size={16} className="opacity-20" />
               </h3>
               <textarea 
                 className="w-full min-h-[700px] bg-white text-black p-10 font-[family-name:var(--font-space-grotesk)] text-lg leading-relaxed outline-none focus:ring-1 focus:ring-black/10 transition-all border border-black/5"
                 placeholder="Start writing your insight..."
                 defaultValue={`As we head into 2024, the landscape of full-stack development is shifting rapidly towards edge computing and AI-integrated workflows.

## The Rise of Edge Functions
Processing data closer to the user is no longer a luxury, but a necessity for modern high-performance applications.

> "The latency of the future is zero."

In this article, we explore how Next.js and specialized database adapters are paving the way for this revolution.`}
               />
            </div>

         </div>

         {/* Sidebar Tools */}
         <div className="lg:col-span-4 space-y-12">
            
            {/* Publishing Metadata */}
            <div className="bg-[#121417] p-10 text-white shadow-2xl">
               <h3 className="text-[10px] font-bold uppercase tracking-widest mb-10 opacity-40">Publishing_Controls</h3>
               <div className="space-y-8">
                  <div>
                     <label className="text-[10px] font-bold uppercase tracking-widest opacity-30 block mb-3">Author_Signature</label>
                     <input type="text" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-[10px] font-bold uppercase outline-none focus:border-white/40 transition-all" defaultValue="Muhammad Abdullah" />
                  </div>
                  <div>
                     <label className="text-[10px] font-bold uppercase tracking-widest opacity-30 block mb-3">SEO_Keywords</label>
                     <div className="flex flex-wrap gap-2">
                        {["TECH", "DEV", "2024"].map(tag => (
                          <span key={tag} className="text-[9px] font-bold border border-white/20 px-2 py-1 uppercase">{tag}</span>
                        ))}
                     </div>
                  </div>
                  <div className="pt-8 border-t border-white/5">
                     <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-widest italic opacity-80">Pinned to Featured</span>
                        <div className="w-10 h-5 bg-white/10 rounded-full relative">
                           <div className="absolute right-1 top-1 w-3 h-3 bg-white/20 rounded-full"></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Reading Estimation */}
            <div className="bg-white p-10 border border-black/5">
               <h3 className="text-[10px] font-bold uppercase tracking-widest mb-6 opacity-40">Analytics_Forecast</h3>
               <div className="flex items-center gap-4">
                  <div className="p-4 bg-black text-white">
                     <FileText size={20} />
                  </div>
                  <div>
                     <p className="text-[20px] font-black uppercase tracking-tighter mb-1">5 MIN</p>
                     <p className="text-[9px] font-bold uppercase tracking-widest opacity-30">Estimated Read Time</p>
                  </div>
               </div>
            </div>

         </div>

      </div>

    </div>
  );
}
