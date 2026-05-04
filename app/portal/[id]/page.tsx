import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { User, MessageSquare, Terminal, Clock, ShieldCheck, CornerDownRight } from "lucide-react";
import ClientPortalForm from "./ClientPortalForm";
import PortalLockScreen from "./PortalLockScreen";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

import { auth } from "@/auth";

import LiveThreadManager from "@/app/components/LiveThreadManager";

export default async function ClientPortalPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ id: string }>,
  searchParams: Promise<{ token?: string }>
}) {
  const { id } = await params;
  const { token } = await searchParams;

  const inquiry = await prisma.contactMessage.findUnique({
    where: { id },
    include: {
      thread: {
        orderBy: { createdAt: "asc" }
      }
    }
  });

  if (!inquiry) return notFound();

  // 1. Identify Presence (Check for Admin Session)
  const session = await auth();
  const isAdmin = !!session?.user;

  // 2. Security Check: Verify Browser Bond (Bypass if Admin)
  const cookieStore = await cookies();
  const existingToken = cookieStore.get(`portal_auth_${id}`)?.value;

  if (!isAdmin && (!existingToken || existingToken !== inquiry.portalToken)) {
    // If there is a token in URL, redirect to auth handler to set the bond
    if (token && token === inquiry.portalToken) {
      return redirect(`/api/portal/auth?id=${id}&token=${token}`);
    }
    return <PortalLockScreen inquiryId={id} />;
  }

  return (
    <div className="min-h-screen bg-[#fafafa] font-[family-name:var(--font-space-grotesk)] text-black selection:bg-black selection:text-white">
      <LiveThreadManager inquiryId={id} />
      
      {/* Structural Header */}
      <header className="w-full border-b border-black/5 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                 <Terminal size={16} className="text-white" />
              </div>
              <h1 className="text-sm font-black uppercase tracking-tighter italic">Collaboration_Portal //</h1>
           </div>
           <div className="flex items-center gap-4">
              {isAdmin && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-amber-100">
                   <User size={12} />
                   Admin_Presence
                </div>
              )}
              <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                 <ShieldCheck size={14} className="text-emerald-500" />
                 Verified_Connection
              </div>
           </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16 lg:py-24 space-y-16">
        
        {/* Intro Dossier */}
        <section className="space-y-4">
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em]">Project ID: {id.slice(-8).toUpperCase()}</p>
           <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
              Hello, {isAdmin ? "Admin" : inquiry.name}.
           </h2>
           <p className="text-lg text-gray-400 font-medium max-w-2xl leading-relaxed">
              Secure collaboration space for <strong>{inquiry.projectType || inquiry.name}</strong>. 
              Review the detailed history and send responses below.
           </p>
        </section>

        {/* Conversation Thread */}
        <section className="space-y-10">
           
           {/* Original Message Node */}
           <div className="relative pl-10 border-l border-black/5">
              <div className="absolute left-[-15px] top-0 w-8 h-8 bg-white border border-black/5 rounded-full flex items-center justify-center text-gray-300">
                 <Clock size={14} />
              </div>
              <div className="bg-white border border-black/5 p-8 rounded-[2rem] shadow-sm">
                 <div className="flex justify-between items-start mb-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 italic">Request: {inquiry.name}</p>
                    <p className="text-[10px] font-bold text-gray-300 font-mono">{new Date(inquiry.createdAt).toLocaleString()}</p>
                 </div>
                 <p className="text-gray-600 text-sm leading-relaxed italic font-medium">"{inquiry.message}"</p>
              </div>
           </div>

           {/* Thread History */}
           {inquiry.thread.map((node) => (
             <div key={node.id} className="relative pl-10 border-l border-black/5">
                <div className={`absolute left-[-15px] top-0 w-8 h-8 rounded-full flex items-center justify-center border border-black/5 ${
                  node.sender === "admin" ? "bg-black text-white" : "bg-white text-gray-400"
                }`}>
                   {node.sender === "admin" ? <User size={14} /> : <MessageSquare size={14} />}
                </div>
                <div className={`p-8 rounded-[2rem] shadow-sm transition-all hover:translate-x-1 ${
                  node.sender === "admin" ? "bg-[#121417] text-white" : "bg-white border border-black/5 text-gray-600"
                }`}>
                   <div className="flex justify-between items-start mb-4">
                      <p className={`text-[10px] font-black uppercase tracking-widest ${
                        node.sender === "admin" ? "text-amber-400" : "text-blue-500"
                      }`}>
                         {node.sender === "admin" ? "Muhammad Abdullah" : inquiry.name}
                      </p>
                      <p className="text-[10px] font-bold opacity-30 font-mono">{new Date(node.createdAt).toLocaleString()}</p>
                   </div>
                   <p className="text-sm leading-relaxed font-medium whitespace-pre-wrap">{node.content}</p>
                </div>
             </div>
           ))}

        </section>

        {/* Dynamic Reply Interface */}
        <section className="pt-20 border-t border-black/5">
           <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 bg-[#4ec9b0] rounded-xl flex items-center justify-center text-black">
                 <CornerDownRight size={20} />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tighter">Send a reply.</h3>
           </div>
           
           <ClientPortalForm inquiryId={inquiry.id} />
        </section>

      </main>

      {/* Footer Branding */}
      <footer className="py-12 border-t border-black/5 text-center">
         <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.5em]">Muhammad Abdullah // Full_Stack_Systems_Architect</p>
      </footer>

    </div>
  );
}
