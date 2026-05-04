"use client";

import React, { useState } from "react";
import { Send, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";

const ContactSection = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Logic implementation
    setTimeout(() => {
      toast.success("Message sent successfully!");
      setLoading(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-40 px-12 bg-white font-(family-name:--font-space-grotesk)">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          {/* Text Content */}
          <div className="space-y-12">
            <div className="space-y-4">
               <h2 className="text-sm font-bold tracking-[0.4em] uppercase text-[#4ec9b0]">
                 Get In Touch
               </h2>
               <h3 className="text-6xl font-black text-gray-900 tracking-tighter leading-tight">
                 Let&apos;s build <br/> something real.
               </h3>
            </div>
            
            <p className="text-gray-500 text-lg leading-relaxed max-w-md">
              Whether you have a specific project in mind or just want to chat about the latest in web tech, my inbox is always open.
            </p>

            <div className="space-y-6 pt-8">
               <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all cursor-default">
                     <Mail size={20} />
                  </div>
                  <div>
                     <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Email Protocol</p>
                     <p className="text-sm font-black text-gray-900 underline pointer-events-auto cursor-pointer">ch.abdullah.dev@gmail.com</p>
                  </div>
               </div>
               
               <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all cursor-default">
                     <MapPin size={20} />
                  </div>
                  <div>
                     <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Location</p>
                     <p className="text-sm font-black text-gray-900">Islamabad, Pakistan</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Minimal Form Hub */}
          <div className="bg-gray-50 rounded-3xl p-12 shadow-sm border border-gray-100">
             <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-white border border-gray-200 px-6 py-4 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#4ec9b0]/20 focus:border-[#4ec9b0] transition-all"
                        placeholder="John Doe"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                      <input 
                        type="email" 
                        required
                        className="w-full bg-white border border-gray-200 px-6 py-4 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#4ec9b0]/20 focus:border-[#4ec9b0] transition-all"
                        placeholder="john@example.com"
                      />
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Project Message</label>
                   <textarea 
                     required
                     rows={5}
                     className="w-full bg-white border border-gray-200 px-6 py-4 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#4ec9b0]/20 focus:border-[#4ec9b0] transition-all resize-none"
                     placeholder="Tell me about your vision..."
                   ></textarea>
                </div>

                <button 
                  disabled={loading}
                  className="w-full bg-gray-900 text-white rounded-xl py-5 text-xs font-bold uppercase tracking-[0.4em] hover:bg-black hover:shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                   <Send size={16} />
                   {loading ? "Transmitting..." : "Send_Message"}
                </button>
             </form>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;
