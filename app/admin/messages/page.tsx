import React from "react";
import { prisma } from "@/lib/prisma";
import { Mail, Inbox } from "lucide-react";
import MessageItem from "./MessageItem";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      
      {/* Minimal Header */}
      <div className="flex items-center justify-between">
         <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Messages</h1>
            <p className="text-sm text-gray-400">
               Manage your incoming inquiries and responses
            </p>
         </div>
         <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 bg-gray-50 px-4 py-2 rounded-full">
            <Inbox size={14} className="text-gray-300" />
            <span>{messages.length} total</span>
         </div>
      </div>

      {/* Messages List */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        {messages.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {messages.map((msg, index) => (
              <MessageItem key={msg.id} msg={msg} index={index} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center space-y-6">
             <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-200">
                <Mail size={32} />
             </div>
             <div className="space-y-1">
                <h3 className="text-sm font-semibold text-gray-900">No messages yet</h3>
                <p className="text-sm text-gray-400 max-w-[240px]">
                   Inquiries from your portfolio contact form will appear here.
                </p>
             </div>
          </div>
        )}
      </div>

    </div>
  );
}
