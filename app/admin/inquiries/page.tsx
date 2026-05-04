import React from "react";
import { prisma } from "@/lib/prisma";
import { Target, Clock, DollarSign, Briefcase, Mail, Phone, Trash2, CheckCircle2 } from "lucide-react";
import InquiryItem from "./InquiryItem";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  // Filter for messages that have a budget or projectType (Hiring Leads)
  const inquiries = await prisma.contactMessage.findMany({
    where: {
      OR: [
        { budget: { not: null } },
        { projectType: { not: null } }
      ]
    },
    include: {
      thread: {
        orderBy: { createdAt: "asc" }
      }
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-10 max-w-6xl mx-auto pb-20">
      
      {/* Premium Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
           <p className="text-blue-600 text-[10px] font-bold tracking-[0.2em] mb-2 font-mono uppercase opacity-70">Commerce / Leads_Vault</p>
           <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">Project Inquiries</h1>
           <p className="text-[13px] text-gray-400 mt-1.5 font-medium max-w-lg">High-fidelity data captured from your hire-me protocols.</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="bg-white border border-gray-100 shadow-sm px-6 py-3 rounded-2xl flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                 <Target size={16} />
              </div>
              <div>
                 <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">Total_Leads</p>
                 <p className="text-lg font-black text-gray-900">{inquiries.length}</p>
              </div>
           </div>
        </div>
      </header>

      {/* Inquiries Grid */}
      {inquiries.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
           {inquiries.map((inquiry, index) => (
             <InquiryItem key={inquiry.id} inquiry={inquiry} index={index} />
           ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-40 bg-white border border-dashed border-gray-200 rounded-[2.5rem] space-y-6">
           <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-300">
              <Briefcase size={40} strokeWidth={1.5} />
           </div>
           <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900">No active inquiries detected</h3>
              <p className="text-sm text-gray-400 mt-1">When clients request a proposal, their data will appear here.</p>
           </div>
        </div>
      )}

    </div>
  );
}
