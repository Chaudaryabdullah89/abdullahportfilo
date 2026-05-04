import React from "react";
import Link from "next/link";
import { ArrowLeft, Download, Mail, Calendar, MapPin } from "lucide-react";
import Footer from "../components/Footer";
import Magnetic from "../components/Magnetic";

export const dynamic = 'force-dynamic';
const GithubIcon = ({ size = 28, ...props }) => (
<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2.5"
  strokeLinecap="round"
  strokeLinejoin="round"
  {...props}
>
  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
  <path d="M9 18c-4.51 2-5-2-7-2" />
</svg>
);
const LinkedinIcon = ({ size = 28, ...props }) => (
<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2.5"
  strokeLinecap="round"
  strokeLinejoin="round"
  {...props}
>
  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
  <rect width="4" height="12" x="2" y="9" />
  <circle cx="4" cy="4" r="2" />
</svg>
);

import { prisma } from "@/lib/prisma";

export default async function ResumePage() {
  const [settings, experience, skills] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { id: "global" } }),
    prisma.experience.findMany({ orderBy: { order: "asc" } }),
    prisma.skill.findMany({ orderBy: { order: "asc" } }),
  ]);

  const education = [
    {
      degree: "B.Sc. in Computer Science",
      school: "Example University",
      period: "2015 - 2019",
      location: "Cambridge, UK"
    }
  ];


  return (
    <main className="min-h-screen bg-[#fafafa] text-black font-[family-name:var(--font-space-grotesk)]">
      
      {/* Navigation Header */}
      <nav className="p-8 flex justify-between items-center max-w-[1200px] mx-auto sticky top-0 bg-[#fafafa]/80 backdrop-blur-md z-50 print:hidden">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-gray-500 transition-all group"
        >
          <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          Home
        </Link>
        <Magnetic>
          <button className="flex items-center gap-2 bg-black text-white px-6 py-2.5 text-[10px] font-bold tracking-widest uppercase hover:bg-gray-800 transition-all">
            <Download size={16} />
            Download_PDF
          </button>
        </Magnetic>
      </nav>

      {/* Resume Content */}
      <article className="max-w-[900px] mx-auto bg-white shadow-[0px_40px_80px_rgba(0,0,0,0.05)] my-12 md:my-20 p-8 md:p-16 border-t-[10px] border-black">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 pb-12 border-b border-black/5">
          <div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">{settings?.heroName || "Abdullah"}.</h1>
            <p className="text-xl font-bold text-gray-400 uppercase tracking-widest font-[family-name:var(--font-jetbrains-mono)]">
               // {settings?.heroTitle || "Full_Stack_Software_Engineer"}
            </p>
          </div>
          <div className="flex flex-col gap-3 items-start md:items-end">
             <a href={`mailto:${settings?.email}`} className="flex items-center gap-2 text-sm font-bold hover:underline transition-all">
                {settings?.email || "abdullah@example.com"} <Mail size={14} />
             </a>
             <div className="flex gap-4">
                <a href={settings?.githubUrl || "#"} target="_blank"><GithubIcon size={18} className="opacity-40 hover:opacity-100 cursor-pointer transition-opacity" /></a>
                <a href={settings?.linkedinUrl || "#"} target="_blank"><LinkedinIcon size={18} className="opacity-40 hover:opacity-100 cursor-pointer transition-opacity" /></a>
             </div>
          </div>
        </header>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Experience Section */}
            <section>
              <h2 className="text-sm font-bold tracking-[0.4em] uppercase mb-8 flex items-center gap-4 text-gray-400">
                <span className="w-8 h-[1px] bg-gray-200"></span>
                Experience
              </h2>
              <div className="space-y-12">
                {experience.map((exp, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="text-xl font-black uppercase tracking-tight group-hover:text-[#4ec9b0] transition-colors">{exp.role}</h3>
                       <span className="text-[10px] font-bold font-[family-name:var(--font-jetbrains-mono)] bg-gray-100 px-3 py-1 rounded-full uppercase">{exp.period}</span>
                    </div>
                    <p className="text-sm font-bold uppercase tracking-widest mb-4 opacity-40">{exp.company} // {exp.location}</p>
                    <p className="text-gray-600 text-[14px] leading-relaxed font-[family-name:var(--font-jetbrains-mono)] italic">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Education Section */}
            <section>
              <h2 className="text-sm font-bold tracking-[0.4em] uppercase mb-8 flex items-center gap-4 text-gray-400">
                <span className="w-8 h-[1px] bg-gray-200"></span>
                Education
              </h2>
              <div className="space-y-8">
                {education.map((edu, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="text-lg font-black uppercase tracking-tight">{edu.degree}</h3>
                       <span className="text-[10px] font-bold font-[family-name:var(--font-jetbrains-mono)] uppercase">{edu.period}</span>
                    </div>
                    <p className="text-sm font-bold uppercase tracking-widest opacity-40">{edu.school}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-16">
            
            {/* Technical Skills */}
            <section>
               <h2 className="text-sm font-bold tracking-[0.4em] uppercase mb-8 text-gray-400">Skills</h2>
               <div className="space-y-6">
                  {["Frontend", "Backend", "Other"].map((cat) => {
                    const catSkills = skills.filter(s => s.category === cat);
                    if (catSkills.length === 0) return null;
                    return (
                      <div key={cat}>
                         <h4 className="text-[10px] font-black uppercase tracking-widest mb-3 opacity-30">{cat}</h4>
                         <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-widest">
                            {catSkills.map((skill) => (
                              <span key={skill.id} className="border border-black/10 px-2 py-1 hover:border-black transition-colors">{skill.name}</span>
                            ))}
                         </div>
                      </div>
                    );
                  })}
               </div>
            </section>


            {/* Languages */}
            <section>
               <h2 className="text-sm font-bold tracking-[0.4em] uppercase mb-8 text-gray-400">Languages</h2>
               <div className="space-y-4">
                  <div className="flex justify-between items-center bg-black/5 p-3">
                     <span className="text-xs font-bold uppercase tracking-widest">English</span>
                     <span className="text-[10px] font-bold uppercase opacity-40">C2 Native</span>
                  </div>
                  <div className="flex justify-between items-center bg-black/5 p-3">
                     <span className="text-xs font-bold uppercase tracking-widest">Spanish</span>
                     <span className="text-[10px] font-bold uppercase opacity-40">B2 Proficient</span>
                  </div>
               </div>
            </section>

          </div>

        </div>

        {/* Vertical text decoration */}
        <div className="hidden lg:block absolute -left-20 top-1/2 transform -rotate-90 origin-center text-[10px] font-bold tracking-[1em] uppercase opacity-20 pointer-events-none">
          Curriculum_Vitae_2024
        </div>
      </article>

      <Footer />
    </main>
  );
}
