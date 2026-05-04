import React from "react";
import Link from "next/link";
import { ArrowLeft, Send, Calendar, Clock, User, Share2 } from "lucide-react";
import Footer from "../../components/Footer";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const blog = await prisma.blog.findUnique({
    where: { id }
  });

  const settings = await prisma.siteSettings.findUnique({
    where: { id: "global" }
  });

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-black font-[family-name:var(--font-space-grotesk)]">
      
      {/* Article Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-gray-50">
        <Link 
          href="/blogs" 
          className="flex items-center gap-2 text-sm font-semibold tracking-tight text-gray-400 hover:text-black transition-all group"
        >
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          Back to Writing
        </Link>
        <div className="text-gray-300 text-xs font-medium tracking-tight">
          Viewing: {blog.category}
        </div>
      </nav>

      {/* Hero Header */}
      <header className="pt-40 pb-20 px-8 max-w-5xl mx-auto">
         <div className="space-y-12">
            <div className="space-y-6 max-w-4xl">
               <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-black/40">
                  <span className="bg-gray-50 text-black px-2 py-1 rounded">{blog.category}</span>
                  <span>•</span>
                  <span>{blog.readTime || "5 min read"}</span>
               </div>
               <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.95] mb-8">
                 {blog.title}
               </h1>
            </div>

            {blog.image && (
              <div className="relative aspect-[16/6] w-full overflow-hidden rounded-[3rem] shadow-sm border border-gray-50 bg-gray-50">
                 <img 
                   src={blog.image} 
                   alt={blog.title} 
                   className="w-full h-full object-cover"
                 />
              </div>
            )}
         </div>
      </header>

      {/* Article Content */}
      <article className="py-20 px-8 max-w-5xl mx-auto flex flex-col lg:flex-row gap-20">
         
         {/* Metadata Sidebar */}
         <aside className="w-full lg:w-48 shrink-0 space-y-12 lg:sticky lg:top-40 h-fit">
            <div className="space-y-2">
               <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Author</p>
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-50 rounded-full border border-gray-100 flex items-center justify-center text-[10px] font-bold">
                     {blog.author.charAt(0)}
                  </div>
                  <p className="text-sm font-bold">{blog.author}</p>
               </div>
            </div>
            <div className="space-y-2">
               <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Published</p>
               <div className="flex items-center gap-2 text-sm font-bold">
                  <Calendar size={14} className="text-gray-400" />
                  {blog.date}
               </div>
            </div>
            <div className="pt-8 border-t border-gray-50 space-y-4">
               <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Share</p>
               <div className="flex gap-2">
                  {["X", "LinkedIn"].map(platform => (
                    <button key={platform} className="p-3 bg-gray-50 rounded-xl hover:bg-black hover:text-white transition-all">
                       <Share2 size={16} />
                    </button>
                  ))}
               </div>
            </div>
         </aside>

         {/* Content Area */}
         <div className="flex-1 max-w-3xl">
            {blog.summary && (
              <p className="text-2xl md:text-3xl font-medium text-gray-400 leading-relaxed mb-16 border-l-4 border-black pl-8">
                 {blog.summary}
              </p>
            )}

            <div className="prose prose-lg max-w-none text-gray-900 leading-relaxed space-y-12 text-lg">
               {blog.content.split('\n').filter(p => p.trim() !== "").map((para, i) => (
                 <p key={i} className={i === 0 ? "text-xl font-bold text-black" : ""}>
                    {para.trim()}
                 </p>
               ))}
            </div>
         </div>
      </article>

      {/* Footer Navigation */}
      <footer className="py-32 px-8 max-w-7xl mx-auto border-t border-gray-50">
         <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-gray-50 p-12 rounded-[3rem]">
            <div className="space-y-2">
               <h3 className="text-2xl font-bold">Enjoyed this article?</h3>
               <p className="text-gray-400 font-medium">Head back to the archive to explore more stories.</p>
            </div>
            <Link 
              href="/blogs"
              className="px-10 py-5 bg-black text-white rounded-2xl font-bold flex items-center gap-3 hover:scale-105 transition-all shadow-xl"
            >
               Browse Archive
               <ArrowLeft size={18} className="rotate-180" />
            </Link>
         </div>
      </footer>

      <Footer settings={settings} />
    </main>
  );
}
