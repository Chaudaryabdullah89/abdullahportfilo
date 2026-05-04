import React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, BookOpen, ChevronRight, FileText } from "lucide-react";
import Footer from "../components/Footer";
import { prisma } from "@/lib/prisma";
import NewsletterForm from "../components/NewsletterForm";

export default async function BlogListPage() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });

  const settings = await prisma.siteSettings.findUnique({
    where: { id: "global" }
  });

  return (
    <main className="min-h-screen bg-white text-black font-[family-name:var(--font-space-grotesk)]">
      
      {/* Navigation */}
      <nav className="p-8 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] font-bold tracking-widest uppercase">
          <Link 
            href="/" 
            className="flex items-center gap-2 hover:pl-2 transition-all group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            ~/Home
          </Link>
          <div className="text-gray-300">current_path: /Writing_Insights</div>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="pt-24 pb-16 px-8 max-w-7xl mx-auto">
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="max-w-2xl">
               <div className="inline-block border-[5px] border-black px-12 py-4 mb-10 bg-white ">
                  <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                    Writings.
                  </h1>
               </div>
               <p className="text-gray-500 font-[family-name:var(--font-jetbrains-mono)] text-sm max-w-[500px] leading-loose">
                  // Thoughts on software design, structural engineering, and building digital products with high-fidelity logic.
               </p>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] bg-black text-white px-8 py-3 shadow-[8px_8px_0px_rgba(78,201,176,1)]">
               <BookOpen size={16} />
               <span>SYSTEM: {blogs.length} ARTICLES_FOUND</span>
            </div>
         </div>
      </section>

      {/* Blog Grid (No Images) */}
      <section className="py-24 px-8 max-w-7xl mx-auto min-h-[500px]">
         {blogs.length > 0 ? (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {blogs.map((blog) => (
                <Link 
                  href={`/blogs/${blog.id}`} 
                  key={blog.id}
                  className="group relative flex flex-col items-start p-10 bg-white border-l-4 border-b-4 border-black/5 hover:border-black transition-all hover:bg-gray-50 shadow-sm "
                >
                   <div className="space-y-6 w-full">
                      <div className="flex items-center gap-4 text-[10px] font-black tracking-[0.2em] uppercase text-gray-400 font-[family-name:var(--font-jetbrains-mono)]">
                         <span className="text-[#4ec9b0] font-black">&lt;{blog.category} /&gt;</span>
                         <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                         <span className="flex items-center gap-1.5"><Calendar size={12} /> {blog.date}</span>
                         <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                         <span className="flex items-center gap-1.5"><Clock size={12} /> {blog.readTime}</span>
                      </div>
                      
                      <h2 className="text-3xl font-black uppercase tracking-tighter leading-none group-hover:text-[#4ec9b0] transition-colors">
                         {blog.title}
                      </h2>
                      
                      <p className="text-gray-400 text-[13px] leading-relaxed line-clamp-2 font-[family-name:var(--font-jetbrains-mono)] italic">
                        // {blog.summary}
                      </p>

                      <div className="pt-4 flex items-center justify-between border-t border-black/5">
                         <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                           View Blog  <ChevronRight size={18} />
                         </div>
                         <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-[10px] font-black text-[#4ec9b0] px-3 py-1 border border-[#4ec9b0]">READ_IN_DETAIL</span>
                         </div>
                      </div>
                   </div>

                   {/* Numbered decoration */}
                   <div className="absolute top-4 right-6 text-6xl font-black text-black/[0.03] select-none italic">
                      0{blogs.indexOf(blog) + 1}
                   </div>
                </Link>
             ))}
           </div>
         ) : (
           <div className="flex flex-col items-center justify-center py-40 text-center space-y-6">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-200">
                 <FileText size={40} />
              </div>
              <div className="space-y-2">
                 <h3 className="text-2xl font-bold uppercase tracking-widest">No segments found.</h3>
                 <p className="text-gray-400 font-[family-name:var(--font-jetbrains-mono)]">// Writing_Workshop_Protocol: IN_PROGRESS...</p>
              </div>
              <Link href="/" className="inline-block border-[4px] border-black px-12 py-3 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all shadow-[8px_8px_0px_rgba(0,0,0,1)]">
                Back to Home
              </Link>
           </div>
         )}
      </section>

      {/* Mechanical Newsletter Section */}
      <section className="py-32 bg-[#1a1c1e] text-white">
         <div className="max-w-[1200px] mx-auto px-8 flex flex-col items-center text-center space-y-12">
            <div className="space-y-6">
               <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">Connect_System.</h2>
               <p className="text-gray-400 text-sm font-[family-name:var(--font-jetbrains-mono)] uppercase tracking-widest opacity-60 max-w-xl mx-auto">
                 Enable telemetry for new technical insights and structural software sequences.
               </p>
            </div>
            
            <NewsletterForm />

            <div className="pt-12 flex items-center gap-4 opacity-10">
               <div className="h-[1px] w-24 bg-white"></div>
               <div className="text-[10px] font-black tracking-[0.5em]">END_OF_INDEX</div>
               <div className="h-[1px] w-24 bg-white"></div>
            </div>
         </div>
      </section>

      <Footer settings={settings} />
    </main>
  );
}
