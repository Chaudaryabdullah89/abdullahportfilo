import React from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Code2, Layers, Cpu } from "lucide-react";
import Footer from "../components/Footer";

import { prisma } from "@/lib/prisma";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });

  const settings = await prisma.siteSettings.findUnique({
    where: { id: "global" }
  });


  return (
    <main className="min-h-screen bg-[#f3f3f3] text-black font-[family-name:var(--font-space-grotesk)]">
      
      {/* Navigation */}
      <nav className="p-8 flex justify-between items-center max-w-[1400px] mx-auto">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:pl-2 transition-all group"
        >
          <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          Home
        </Link>
        <div className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-30 font-[family-name:var(--font-jetbrains-mono)]">
          // current_path: ~/projects
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-8 max-w-[1200px] mx-auto" data-reveal="fade-up">
         <div className="inline-block border-[5px] border-black px-12 py-3 mb-8">
            <h1 className="text-4xl font-bold uppercase tracking-widest">Selected Works</h1>
         </div>
         <p className="text-gray-500 font-[family-name:var(--font-jetbrains-mono)] text-sm max-w-[500px] leading-loose">
            A comprehensive showcase of technical solutions, architectural designs, and software engineering projects.
         </p>
      </section>

      {/* Projects Grid */}
      <section className="pb-32 px-8 max-w-[1200px] mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-16" data-reveal="stagger">
            {projects.map((project) => {
               const projectTags = project.tags ? project.tags.split(",").map(t => t.trim()) : ["Software"];
               const year = new Date(project.createdAt).getFullYear();
               
               return (
                <Link 
                  href={`/projects/${project.id}`} 
                  key={project.id}
                  className="group block"
                >
                   <div data-reveal="image" className="relative aspect-[16/10] bg-black overflow-hidden mb-8 border border-black/5">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-in-out"
                      />
                      <div className="absolute top-6 left-6 bg-black text-white px-4 py-1 text-[10px] font-bold uppercase tracking-widest">
                         {year}
                      </div>
                   </div>
                    <div className="flex justify-between items-start">
                       <div>
                          <div className="flex gap-4 items-center mb-2">
                             <p className="text-[#4ec9b0] text-[10px] font-bold tracking-[0.2em] uppercase font-[family-name:var(--font-jetbrains-mono)]">
                                // {project.category}
                             </p>
                             <span className="h-[1px] w-4 bg-black/10"></span>
                             <p className="text-[9px] font-black uppercase tracking-widest opacity-40 italic">
                                {project.role || "Lead Developer"}
                             </p>
                          </div>
                          <h3 className="text-2xl font-bold uppercase tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                             {project.title}
                          </h3>
                       </div>
                       <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ExternalLink size={20} />
                       </div>
                    </div>

                   <div className="mt-4 flex gap-3">
                      {projectTags.map(tag => (
                         <span key={tag} className="text-[9px] font-bold uppercase tracking-widest bg-gray-200 px-3 py-1 rounded-sm">
                            {tag}
                         </span>
                      ))}
                   </div>
                </Link>
               );
            })}

         </div>
      </section>

      {/* Decorative Stats Section */}
      <section className="py-32 bg-[#1a1c1e] text-white">
         <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-20 text-center" data-reveal="stagger">
            <div>
               <Code2 size={40} className="mx-auto mb-6 text-[#4ec9b0]" />
               <p className="text-4xl font-black mb-2">500+</p>
               <p className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-50">Commits This Year</p>
            </div>
            <div>
               <Layers size={40} className="mx-auto mb-6 text-[#4ec9b0]" />
               <p className="text-4xl font-black mb-2">20+</p>
               <p className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-50">Projects Delivered</p>
            </div>
            <div>
               <Cpu size={40} className="mx-auto mb-6 text-[#4ec9b0]" />
               <p className="text-4xl font-black mb-2">100%</p>
               <p className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-50">System Uptime</p>
            </div>
         </div>
      </section>

      <Footer settings={settings} />
    </main>
  );
}
