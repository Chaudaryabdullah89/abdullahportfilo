import React from "react";
import Link from "next/link";
import { ArrowLeft, Globe, Terminal } from "lucide-react";
import Footer from "@/app/components/Footer";

export const dynamic = 'force-dynamic';

// Custom Github Icon as it's missing in the installed lucide-react version
const GithubIcon = ({ size = 20, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);


import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const project = await prisma.project.findUnique({
    where: { id }
  });

  const settings = await prisma.siteSettings.findUnique({
    where: { id: "global" }
  });


  if (!project) {
    notFound();
  }

  const tags = project.tags ? project.tags.split(",").map(t => t.trim()) : ["Software Development"];


  return (
    <main className="min-h-screen bg-[#1a1c1e] text-white font-[family-name:var(--font-space-grotesk)]">
      
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 flex justify-between items-center bg-[#1a1c1e]/80 backdrop-blur-md">
        <Link 
          href="/projects" 
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-[#4ec9b0] transition-colors group"
        >
          <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          Back to Portfolio
        </Link>
        <div className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-30">
          Project Detail_v.01
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-8 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          
          {/* Left Info Column */}
          <div className="w-full md:w-1/3 flex flex-col">
            <p className="text-[#4ec9b0] text-[12px] font-bold tracking-[0.2em] uppercase font-[family-name:var(--font-jetbrains-mono)] mb-4">
              // {project.category}
            </p>
            <h1 className="text-5xl md:text-7xl font-bold uppercase leading-none mb-12 tracking-tighter">
              {project.title}
            </h1>

            <div className="space-y-8 font-[family-name:var(--font-jetbrains-mono)]">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1 font-bold">Role / Expertise</p>
                <div className="flex flex-wrap gap-2 pt-2">
                   <span className="text-[10px] bg-[#4ec9b0] text-black font-black px-3 py-1 uppercase italic">
                      // {project.role || "Lead Developer"}
                   </span>
                  {tags.map((t: string) => (
                    <span key={t} className="text-[10px] bg-white/5 border border-white/10 px-3 py-1 text-gray-300 uppercase">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1 font-bold">Year</p>
                  <p className="text-sm font-bold">{new Date(project.createdAt).getFullYear()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1 font-bold">Registry_ID</p>
                  <p className="text-[10px] font-bold opacity-30 uppercase font-mono">{project.id.slice(0, 8)}</p>
                </div>
              </div>
            </div>

            <div className="mt-16 flex gap-4">
              <a 
                href={project.liveUrl || "#"} 
                target="_blank"
                className={`flex-1 bg-white text-black py-4 font-bold uppercase text-xs tracking-[0.2em] hover:bg-gray-200 transition-colors flex items-center justify-center gap-3 ${!project.liveUrl ? 'opacity-20 pointer-events-none' : ''}`}
              >
                <Globe size={16} /> Live Demo
              </a>
              <a 
                href={project.githubUrl || "#"} 
                target="_blank"
                className={`flex-1 bg-white/5 border border-white/20 text-white py-4 font-bold uppercase text-xs tracking-[0.2em] hover:bg-white/10 transition-colors flex items-center justify-center gap-3 ${!project.githubUrl ? 'opacity-20 pointer-events-none' : ''}`}
              >
                <GithubIcon size={16} /> Source Code
              </a>
            </div>

          </div>

          {/* Right Image */}
          <div className="flex-1 w-full">
            <div className="relative aspect-video overflow-hidden border border-white/10 grayscale-[0.5] hover:grayscale-0 transition-all duration-1000 group">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Content */}
      <section className="py-20 px-8 bg-black/20 border-y border-white/5">
        <div className="max-w-[1400px] mx-auto space-y-32">
          
          {/* Overview */}
          <div className="flex flex-col md:flex-row gap-16">
            <div className="w-full md:w-1/3">
              <h2 className="text-xl font-black uppercase tracking-widest border-l-4 border-[#4ec9b0] pl-6 py-2 italic font-[family-name:var(--font-jetbrains-mono)]">
                Context & <br />Execution
              </h2>
            </div>
            <div className="flex-1">
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light first-letter:text-5xl first-letter:font-black first-letter:text-[#4ec9b0] first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8]">
                {project.description}
              </p>
            </div>
          </div>

          {/* Deep Dive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 font-[family-name:var(--font-jetbrains-mono)]">
            
            {project.challenge && (
              <div className="space-y-6">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">// the_challenge</p>
                <h3 className="text-3xl font-black text-white/90 uppercase tracking-tighter italic">Problem_Statement.</h3>
                <p className="text-sm leading-8 text-gray-400 font-medium">
                  {project.challenge}
                </p>
              </div>
            )}

            {project.solution && (
              <div className="space-y-6">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">// development_protocol</p>
                <h3 className="text-3xl font-black text-white/90 uppercase tracking-tighter italic">Execution_Strategy.</h3>
                <p className="text-sm leading-8 text-gray-400 font-medium">
                  {project.solution}
                </p>
              </div>
            )}

            {project.results && (
              <div className="space-y-6 lg:col-span-2 pt-12 border-t border-white/5">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">// final_objectives</p>
                <h3 className="text-4xl font-black text-[#4ec9b0] uppercase tracking-tighter italic">Mission_Successful.</h3>
                <p className="text-lg leading-relaxed text-gray-300 font-light max-w-4xl">
                  {project.results}
                </p>
              </div>
            )}

          </div>
        </div>
      </section>


      {/* Footer Design Element */}
      <footer className="py-32 flex flex-col items-center justify-center space-y-20">
        <div className="opacity-10 inline-block border-[10px] border-white px-24 py-16">
          <h2 className="text-[120px] font-black tracking-[-0.1em] uppercase leading-none text-white overflow-hidden whitespace-nowrap">
            PREMIUM_BUILD
          </h2>
        </div>
        
        <Footer settings={settings} />
      </footer>

    </main>
  );
}
