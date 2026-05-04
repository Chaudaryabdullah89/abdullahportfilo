"use client";

import React, { useState } from "react";
import { ArrowLeft, Save, Image as ImageIcon, Link as LinkIcon, Code, Eye } from "lucide-react";
import Link from "next/link";

export default function ProjectEditor() {
  return (
    <div className="space-y-12 pb-24">
      
      {/* Header */}
      <nav className="flex justify-between items-center mb-12">
        <Link href="/admin/projects" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-gray-400 transition-all">
           <ArrowLeft size={16} /> Back_to_Registry
        </Link>
        <div className="flex gap-4">
           <button className="flex items-center gap-2 px-6 py-3 border border-black/5 text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">
              <Eye size={16} /> Preview
           </button>
           <button className="flex items-center gap-2 px-8 py-3 bg-[#4ec9b0] text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-[6px_6px_0px_rgba(0,0,0,1)]">
              <Save size={16} /> Publish_Update
           </button>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         
         {/* Main Content Area */}
         <div className="lg:col-span-8 space-y-12">
            
            {/* Primary Details */}
            <div className="bg-white p-10 border border-black/5">
              <h3 className="text-[10px] font-black uppercase tracking-widest mb-10 pb-4 border-b border-black/5">Primary_Assets_&_Descriptor</h3>
              
              <div className="space-y-8">
                 <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-30 block mb-2">Project_Title</label>
                    <input type="text" className="w-full bg-[#fafafa] border border-black/5 p-4 text-2xl font-black uppercase outline-none focus:border-black transition-all" defaultValue="Hostel Management System" />
                 </div>
                 <div className="grid grid-cols-2 gap-8">
                    <div>
                       <label className="text-[10px] font-bold uppercase tracking-widest opacity-30 block mb-2">Classification</label>
                       <select className="w-full bg-[#fafafa] border border-black/5 p-4 text-[10px] font-bold uppercase outline-none focus:border-black transition-all appearance-none cursor-pointer">
                          <option>Full Stack Development</option>
                          <option>UI/UX Design</option>
                          <option>System Architecture</option>
                       </select>
                    </div>
                    <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-30 block mb-2">Completion_Timestamp</label>
                        <input type="date" className="w-full bg-[#fafafa] border border-black/5 p-4 text-[10px] font-bold uppercase outline-none focus:border-black transition-all" />
                    </div>
                 </div>
                 <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-30 block mb-2">Short_Overview</label>
                    <textarea className="w-full h-32 bg-[#fafafa] border border-black/5 p-6 text-[13px] font-[family-name:var(--font-jetbrains-mono)] leading-relaxed outline-none focus:border-black transition-all" defaultValue="A comprehensive solution for managing hostel residents, rooms, and billing." />
                 </div>
              </div>
            </div>

            {/* Markdown Case Study Editor */}
            <div className="bg-white p-10 border border-black/5">
               <h3 className="text-[10px] font-black uppercase tracking-widest mb-10 pb-4 border-b border-black/5 flex items-center justify-between">
                  Technical_Case_Study_MD
                  <Code size={16} className="opacity-20" />
               </h3>
               <textarea 
                 className="w-full min-h-[500px] bg-[#121417] text-[#dcdcdc] p-10 font-[family-name:var(--font-jetbrains-mono)] text-sm leading-relaxed outline-none focus:ring-1 focus:ring-[#4ec9b0] transition-all"
                 placeholder="# Type markdown technical details here..."
                 defaultValue={`# Technical Implementation

This project was built to solve the complex coordination of resident bills.

## Tech Stack
* Next.js 15
* Prisma & PostgreSQL
* Tailwind CSS

The architecture follows a microservice-inspired modular design.`}
               />
            </div>

         </div>

         {/* Meta Sidebar */}
         <div className="lg:col-span-4 space-y-12">
            
            {/* Asset Management */}
            <div className="bg-white p-10 border border-black/5">
               <h3 className="text-[10px] font-bold uppercase tracking-widest mb-10 opacity-40">System_Assets</h3>
               <div className="space-y-8">
                  <div className="group relative w-full h-48 bg-gray-100 flex flex-col items-center justify-center border-2 border-dashed border-black/5 hover:border-black transition-all cursor-pointer overflow-hidden">
                     <ImageIcon size={32} className="opacity-20 group-hover:opacity-100 transition-opacity" />
                     <span className="text-[10px] font-bold uppercase tracking-widest mt-4 opacity-50 group-hover:opacity-100">Upload_Cover_Image</span>
                  </div>
                  <div className="space-y-4">
                     <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-30 block mb-2">Live_URL</label>
                        <div className="flex gap-2">
                           <div className="p-4 bg-[#fafafa] border border-black/5 text-gray-300"><LinkIcon size={14} /></div>
                           <input type="text" className="w-full bg-[#fafafa] border border-black/5 px-4 py-1 text-xs outline-none font-[family-name:var(--font-jetbrains-mono)]" defaultValue="https://live-demo.com" />
                        </div>
                     </div>
                     <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-30 block mb-2">Repository_URL</label>
                        <div className="flex gap-2">
                           <div className="p-4 bg-[#fafafa] border border-black/5 text-gray-300"><Code size={14} /></div>
                           <input type="text" className="w-full bg-[#fafafa] border border-black/5 px-4 py-1 text-xs outline-none font-[family-name:var(--font-jetbrains-mono)]" defaultValue="https://github.com/user/repo" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Classification Tags */}
            <div className="bg-white p-10 border border-black/5">
               <h3 className="text-[10px] font-bold uppercase tracking-widest mb-10 opacity-40">Taxonomy_&_Tags</h3>
               <div className="space-y-4">
                  <input type="text" placeholder="Add tag (Press Enter)..." className="w-full bg-[#fafafa] border border-black/5 p-4 text-[10px] font-bold uppercase outline-none focus:border-black transition-all" />
                  <div className="flex flex-wrap gap-2">
                     {["NEXT.JS", "PRISMA", "UI/UX"].map(tag => (
                        <span key={tag} className="text-[10px] font-bold bg-black text-white px-3 py-1 uppercase tracking-widest flex items-center gap-2">
                           {tag} <span className="text-white/40 cursor-pointer">x</span>
                        </span>
                     ))}
                  </div>
               </div>
            </div>

         </div>

      </div>

    </div>
  );
}
