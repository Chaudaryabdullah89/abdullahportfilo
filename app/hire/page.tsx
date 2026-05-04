import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, MessageSquare, Zap, Target, ShieldCheck } from "lucide-react";
import Footer from "../components/Footer";
import { prisma } from "@/lib/prisma";
import HireForm from "../components/HireForm";

export default async function HireMePage() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "global" }
  });

  return (
    <main className="min-h-screen bg-white text-black font-[family-name:var(--font-space-grotesk)]">
      
      {/* Dynamic Navigation */}
      <nav className="p-8 flex justify-between items-center max-w-[1400px] mx-auto border-b border-black/5">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:pl-2 transition-all group"
        >
          <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          Home
        </Link>
        <div className="flex items-center gap-4">
           {settings?.isAvailable && (
             <>
               <span className="w-2 h-2 bg-[#4ec9b0] rounded-full animate-pulse"></span>
               <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-60">Status: {settings.heroBadge || "Available for Projects"}</span>
             </>
           )}
           {
            !settings?.isAvailable && (
              <>
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-60">Status: {settings?.heroBadge || "Not Available for Projects"}</span>
              </>
            )
           }
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24 px-8 max-w-[1200px] mx-auto">
         <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1">
               <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
                  Hire <br />Me
               </h1>
               <div className="h-2 w-32 bg-black mb-8"></div>
               <p className="text-xl text-gray-500 font-medium leading-relaxed font-[family-name:var(--font-jetbrains-mono)] italic max-w-[500px]">
                  // Looking for a partner to transform your complex ideas into high-performance digital reality?
               </p>
            </div>
            <div className="flex-1 bg-[#1a1c1e] p-12 text-white border-l-8 border-[#4ec9b0]">
               <h2 className="text-2xl font-bold uppercase tracking-widest mb-6">Execution Strategy</h2>
               <ul className="space-y-6">
                  {[
                    "Architecturally sound Codebases",
                    "Performance-first Engineering",
                    "Pixel Perfect implementation",
                    "Maintenance & Scalability focus"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-sm font-bold tracking-widest uppercase opacity-80">
                       <CheckCircle2 size={18} className="text-[#4ec9b0]" />
                       {item}
                    </li>
                  ))}
               </ul>
            </div>
         </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-[#f3f3f3]">
         <div className="max-w-[1200px] mx-auto px-8">
            <div className="text-center mb-24">
               <h2 className="text-sm font-bold tracking-[0.4em] uppercase opacity-40 mb-4">// My_Services</h2>
               <p className="text-3xl font-black uppercase tracking-widest">End-to-End Solutions</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {[
                 { icon: <Zap />, title: "Full-Stack Dev", desc: "Complex web applications built with the latest modern frameworks." },
                 { icon: <Target />, title: "Product MVP", desc: "Turn your startup idea into a working prototype in record time." },
                 { icon: <ShieldCheck />, title: "Consultancy", desc: "Architecture reviews and performance optimization for existing apps." }
               ].map((service, i) => (
                 <div key={i} className="bg-white p-12 border border-black/5 hover:border-black transition-all">
                    <div className="mb-8 text-[#4ec9b0]">{service.icon}</div>
                    <h3 className="text-lg font-black uppercase tracking-widest mb-4">{service.title}</h3>
                    <p className="text-gray-500 text-sm font-medium leading-relaxed">{service.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Inquiry Form Section */}
      <section className="py-32 px-8 max-w-[1200px] mx-auto overflow-hidden relative">
         <div className="absolute right-0 top-0 text-[300px] font-black text-black/5 pointer-events-none transform translate-x-1/2 -translate-y-1/2">
            ?
         </div>
         
         <div className="flex flex-col md:flex-row gap-20">
            <div className="flex-1 z-10">
               <h2 className="text-4xl font-black uppercase tracking-tighter mb-8 italic">Start a Project.</h2>
               <p className="text-gray-500 leading-loose mb-12">
                  Have a specific project in mind? Fill out the brief form and I'll get back to you within 24 hours to schedule a discovery call. Low complexity projects start at $1.5k.
               </p>
               <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest pb-4 border-b border-black/10">
                     <MessageSquare size={20} className="text-[#4ec9b0]" />
                     Direct: {settings?.email || "abdullah@example.com"}
                  </div>
               </div>
            </div>

            <div className="flex-1 bg-white border-[6px] border-black p-10 z-10 shadow-[20px_20px_0px_rgba(0,0,0,0.05)]">
               <HireForm />
            </div>
         </div>
      </section>

      <Footer settings={settings} />
    </main>
  );
}
