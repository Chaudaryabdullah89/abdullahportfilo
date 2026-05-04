import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { 
  ArrowLeft, 
  Mail, 
  Clock, 
  Briefcase, 
  DollarSign, 
  MessageSquare, 
  User, 
  ExternalLink,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";
import InquiryResponseTerminal from "./InquiryResponseTerminal";

export default async function InquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const { id } = await params;

  const inquiry = await prisma.contactMessage.findUnique({
    where: { id },
    include: {
      thread: {
        orderBy: { createdAt: "asc" }
      }
    }
  });

  if (!inquiry) return notFound();

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      
      {/* Navigation & Header */}
      <header className="space-y-8">
         <Link 
           href="/admin/inquiries"
           className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors"
         >
           <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
           Back to Master List
         </Link>

         <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-8 border-b border-black/5">
            <div>
               <div className="flex items-center gap-3 mb-4">
                  <div className={`w-2 h-2 rounded-full ${inquiry.read ? 'bg-gray-300' : 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]'}`} />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                    Status: {inquiry.read ? "Reviewed" : "New Lead"}
                  </span>
               </div>
               <h1 className="text-4xl font-black tracking-tight text-gray-900 leading-none">
                  {inquiry.name} <span className="text-gray-300 font-light opacity-50">//</span>
               </h1>
            </div>

            <div className="flex items-center gap-4">
               {inquiry.portalToken && (
                  <a 
                    href={`/portal/${inquiry.id}?token=${inquiry.portalToken}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 text-gray-600 rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:border-black hover:text-black transition-all shadow-sm"
                  >
                     <ExternalLink size={14} />
                     View Client Portal
                  </a>
               )}
            </div>
         </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         
         {/* Sidebar: Metadata */}
         <aside className="lg:col-span-4 space-y-10">
            <div className="bg-white border border-black/5 p-8 rounded-[2.5rem] space-y-8 shadow-sm">
               <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">// Lead_Identity</h3>
               
               <div className="space-y-6">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                        <Mail size={18} />
                     </div>
                     <div>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1.5">Email Protocol</p>
                        <p className="text-[13px] font-bold text-gray-900 leading-none">{inquiry.email}</p>
                     </div>
                  </div>

                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                        <Clock size={18} />
                     </div>
                     <div>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1.5">Capture Date</p>
                        <p className="text-[13px] font-bold text-gray-900 leading-none">{new Date(inquiry.createdAt).toLocaleString()}</p>
                     </div>
                  </div>

                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                        <Briefcase size={18} />
                     </div>
                     <div>
                        <p className="text-[9px] font-bold text-blue-400 uppercase tracking-widest leading-none mb-1.5">Project Domain</p>
                        <p className="text-[13px] font-bold text-gray-900 leading-none">{inquiry.projectType || "General Consultation"}</p>
                     </div>
                  </div>

                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                        <DollarSign size={18} />
                     </div>
                     <div>
                        <p className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest leading-none mb-1.5">Cap Budget</p>
                        <p className="text-[13px] font-bold text-gray-900 leading-none">{inquiry.budget || "TBD"}</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="p-8 border border-black/5 bg-gray-50/50 rounded-[2rem] italic text-[12px] text-gray-400 leading-relaxed">
               "This lead was captured via your hiring protocol. All communication is secured via the identity-aware client portal."
            </div>
         </aside>

         {/* Main Content: Conversation */}
         <main className="lg:col-span-8 space-y-12">
            
            {/* Original Message */}
            <section className="bg-white border border-black/5 p-10 rounded-[2.5rem] shadow-sm">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-8">// Initial_Capture</h3>
               <p className="text-gray-700 text-[15px] font-medium leading-relaxed whitespace-pre-wrap italic">
                  "{inquiry.message}"
               </p>
            </section>

            {/* Thread History */}
            {inquiry.thread && inquiry.thread.length > 0 && (
               <section className="space-y-8">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 pl-4">// Conversation_Feed</h3>
                  <div className="space-y-6">
                     {inquiry.thread.map((node) => (
                        <div key={node.id} className={`flex items-start gap-6 p-8 rounded-[2rem] border animate-in fade-in slide-in-from-bottom-2 duration-500 ${
                           node.sender === "admin" ? "bg-black text-white border-black" : "bg-white border-black/5"
                        }`}>
                           <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                              node.sender === "admin" ? "bg-white/10 text-white" : "bg-gray-100 text-gray-400"
                           }`}>
                              {node.sender === "admin" ? <User size={18} /> : <MessageSquare size={18} />}
                           </div>
                           <div className="flex-1 space-y-3">
                              <div className="flex justify-between items-center">
                                 <p className={`text-[10px] font-black uppercase tracking-widest ${
                                    node.sender === "admin" ? "text-white/40" : "text-gray-400"
                                 }`}>
                                    {node.sender === "admin" ? "Muhammad Abdullah // Admin" : "Client Message"}
                                 </p>
                                 <p className={`text-[9px] font-mono italic opacity-40`}>
                                    {new Date(node.createdAt).toLocaleString()}
                                 </p>
                              </div>
                              <p className="text-[14px] font-medium leading-relaxed whitespace-pre-wrap">
                                 {node.content}
                              </p>
                           </div>
                        </div>
                     ))}
                  </div>
               </section>
            )}

            {/* Response Terminal */}
            <InquiryResponseTerminal inquiryId={inquiry.id} />

         </main>

      </div>
    </div>
  );
}
