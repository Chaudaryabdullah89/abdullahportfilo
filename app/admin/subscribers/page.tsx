"use client";

import React, { useEffect, useState } from "react";
import { Users, Mail, CheckCircle, XCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function SubscriberPage() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscribers = async () => {
    try {
      const res = await fetch("/api/admin/subscribers");
      const data = await res.json();
      setSubscribers(data);
    } catch (error) {
      toast.error("Failed to load subscriber telemetry.");
    } finally {
      setLoading(false);
    }
  };

  const deleteSubscriber = async (id: string) => {
    if (!confirm("Are you sure you want to SEVER this link?")) return;

    try {
      const res = await fetch(`/api/admin/subscribers/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("LINK_SEVERED: Subscriber purged from system.");
        setSubscribers(subscribers.filter(s => s.id !== id));
      } else {
        toast.error("FAILED_TO_SEVER: Protocol error.");
      }
    } catch (error) {
      toast.error("HARDWARE_FAILURE: Could not reach central server.");
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4">
        <div>
           <p className="text-blue-600 text-[11px] font-bold tracking-[0.2em] mb-2 font-mono uppercase">Telemetry / Active Nodes</p>
           <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">Subscriber Matrix</h1>
        </div>
        <div className="bg-white border border-gray-100 px-8 py-4 rounded-2xl flex items-center gap-6 shadow-sm">
           <div className="p-3 bg-blue-50 rounded-xl">
              <Users size={20} className="text-blue-600" />
           </div>
           <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Total Audience</p>
              <p className="text-2xl font-black text-gray-900 leading-none">{subscribers.length}</p>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-black/[0.03] overflow-hidden transition-all hover:shadow-2xl hover:shadow-black/[0.05]">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-50 text-gray-400 uppercase text-[10px] font-bold tracking-widest">
                     <th className="p-8 text-center w-24">Pos.</th>
                     <th className="p-8">Email Identifier</th>
                     <th className="p-8">Node Status</th>
                     <th className="p-8">Access Linked</th>
                     <th className="p-8 text-right">Operations</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {subscribers.map((sub, i) => (
                     <tr key={sub.id} className="group hover:bg-gray-50/50 transition-all duration-300">
                        <td className="p-8">
                           <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[11px] font-bold text-gray-400 group-hover:bg-white transition-colors border border-transparent group-hover:border-gray-100">
                              {String(i + 1).padStart(2, '0')}
                           </div>
                        </td>
                        <td className="p-8">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-blue-50/50 flex items-center justify-center rounded-xl transition-transform group-hover:scale-110">
                                 <Mail size={16} className="text-blue-500" />
                              </div>
                              <span className="font-semibold text-[15px] text-gray-900">{sub.email}</span>
                           </div>
                        </td>
                        <td className="p-8">
                           {sub.active ? (
                              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-100/50">
                                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                 ACTIVE_NODE
                              </div>
                           ) : (
                              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-50 text-gray-400 rounded-full text-[10px] font-bold uppercase tracking-widest border border-gray-100">
                                 <XCircle size={14} /> LINK_SEVERED
                              </div>
                           )}
                        </td>
                        <td className="p-8">
                           <div className="text-[13px] text-gray-500 font-medium">
                              {new Date(sub.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                           </div>
                           <div className="text-[10px] text-gray-300 font-mono mt-1">
                              {new Date(sub.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                           </div>
                        </td>
                        <td className="p-8 text-right">
                           <button 
                              onClick={() => deleteSubscriber(sub.id)}
                              className="w-10 h-10 inline-flex items-center justify-center bg-white text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all rounded-xl border border-gray-100 hover:border-red-100 hover:shadow-lg hover:shadow-red-500/10"
                           >
                              <Trash2 size={16} />
                           </button>
                        </td>
                     </tr>
                  ))}
                  {subscribers.length === 0 && !loading && (
                     <tr>
                        <td colSpan={5} className="p-32 text-center">
                           <div className="flex flex-col items-center gap-4 opacity-20">
                              <Users size={48} />
                              <p className="text-sm font-bold uppercase tracking-widest">Zero Data Records Found</p>
                           </div>
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
