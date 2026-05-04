import { prisma } from "@/lib/prisma";
import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandIcons } from "./BrandIcons";

const PortfolioSection = async () => {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <section id="work" className="py-32 px-12 bg-[#fafafa] font-[family-name:var(--font-space-grotesk)]">
      <div className="max-w-7xl mx-auto">
        
        {/* Minimal Header */}
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
           <div className="space-y-2">
              <h2 className="text-sm font-bold tracking-[0.4em] uppercase text-gray-400">
                Selected Works
              </h2>
              <h3 className="text-5xl font-black text-gray-900 tracking-tighter">
                Portfolio.
              </h3>
           </div>
           <p className="text-gray-400 max-w-sm text-sm font-medium leading-relaxed italic">
              // A collection of high-fidelity digital solutions built with precision and scale.
           </p>
        </div>

        {/* Sleek Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((project) => (
            <div key={project.id} className="group relative">
               
               {/* Project Image Hub */}
               <div className="relative aspect-[4/5] overflow-hidden bg-gray-200 rounded-sm shadow-sm group-hover:shadow-xl transition-all duration-700">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  />
                  
                  {/* Overlay Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-between p-8">
                     <div className="flex justify-end gap-3">
                        {project.githubUrl && (
                          <a href={project.githubUrl} className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#4ec9b0] transition-colors">
                            <BrandIcons.github size={20} className="text-black" />
                          </a>
                        )}
                        <Link href={`/projects/${project.id}`} className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#4ec9b0] transition-colors">
                           <ArrowUpRight size={20} className="text-black" />
                        </Link>
                     </div>
                     
                     <div className="space-y-4 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="flex flex-wrap gap-2">
                           {project.tags.split(",").map((tag, i) => (
                              <span key={i} className="text-[9px] font-bold text-white uppercase tracking-widest bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                                {tag.trim()}
                              </span>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>

               {/* Project Text Info */}
               <div className="mt-8 space-y-2">
                  <div className="flex items-center justify-between">
                     <h4 className="text-xl font-bold text-gray-900 tracking-tight underline-offset-8 decoration-transparent group-hover:decoration-black transition-all">
                        {project.title}
                     </h4>
                     <span className="text-[10px] font-bold text-[#4ec9b0] uppercase tracking-[0.2em]">
                        {project.category}
                     </span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
               </div>

            </div>
          ))}
        </div>

        {/* View All Protocol */}
        <div className="mt-32 text-center">
           <Link 
             href="/projects" 
             className="inline-block px-12 py-5 border-2 border-black text-sm font-bold uppercase tracking-[0.4em] hover:bg-black hover:text-white transition-all shadow-[8px_8px_0px_rgba(0,0,0,0.05)] hover:shadow-none translate-x-0"
           >
              View_All_Archive
           </Link>
        </div>

      </div>
    </section>
  );
};

export default PortfolioSection;
