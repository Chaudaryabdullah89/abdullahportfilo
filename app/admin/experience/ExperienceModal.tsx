"use client";

import React, { useState, useEffect } from "react";
import { X, Save, Briefcase, Building2, Calendar, MapPin, AlignLeft, ListOrdered } from "lucide-react";
import { toast } from "sonner";
import { createExperience, updateExperience } from "./actions";

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  experience?: any;
}

export default function ExperienceModal({ isOpen, onClose, experience }: ExperienceModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    period: "",
    location: "",
    description: "",
    order: 0,
  });

  useEffect(() => {
    if (experience) {
      setFormData({
        role: experience.role || "",
        company: experience.company || "",
        period: experience.period || "",
        location: experience.location || "",
        description: experience.description || "",
        order: experience.order || 0,
      });
    } else {
      setFormData({
        role: "",
        company: "",
        period: "",
        location: "",
        description: "",
        order: 0,
      });
    }
  }, [experience, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = experience 
        ? await updateExperience(experience.id, formData)
        : await createExperience(formData);

      if (result.success) {
        toast.success(experience ? "SYSTEM_MANIFEST: CAREER_RECORD_UPDATED" : "SYSTEM_MANIFEST: MILESTONE_INITIALIZED");
        onClose();
      } else {
        toast.error("DATABASE_ERROR: OPERATION_FAILED");
      }
    } catch (error) {
      toast.error("SYSTEM_FATAL: HANDSHAKE_ERROR");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#fafafa] w-full max-w-[600px] border border-black/10 shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white shrink-0 z-20">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                <Briefcase className="text-black" size={20} />
             </div>
             <div>
                <h3 className="font-bold text-gray-900">
                  {experience ? "Edit Experience" : "Add New Experience"}
                </h3>
             </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-black">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <form 
          onSubmit={handleSubmit} 
          className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar outline-none min-h-0"
        >
           <div className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Role */}
                <div className="space-y-2">
                   <label className="text-xs font-semibold text-gray-500 ml-1">Job Title</label>
                   <input 
                     required
                     value={formData.role}
                     onChange={e => setFormData({...formData, role: e.target.value})}
                     placeholder="e.g. Full Stack Developer"
                     className="w-full bg-gray-50/50 border border-gray-100 px-5 py-4 rounded-xl text-sm font-medium outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                   />
                </div>

                {/* Company */}
                <div className="space-y-2">
                   <label className="text-xs font-semibold text-gray-500 ml-1">Company</label>
                   <input 
                     required
                     value={formData.company}
                     onChange={e => setFormData({...formData, company: e.target.value})}
                     placeholder="e.g. Tech Solutions Inc."
                     className="w-full bg-gray-50/50 border border-gray-100 px-5 py-4 rounded-xl text-sm font-medium outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                   />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Period */}
                <div className="space-y-2">
                   <label className="text-xs font-semibold text-gray-500 ml-1">Dates (e.g. 2021 - Present)</label>
                   <input 
                     required
                     value={formData.period}
                     onChange={e => setFormData({...formData, period: e.target.value})}
                     placeholder="Jan 2023 - Present"
                     className="w-full bg-gray-50/50 border border-gray-100 px-5 py-4 rounded-xl text-sm font-medium outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                   />
                </div>

                {/* Location */}
                <div className="space-y-2">
                   <label className="text-xs font-semibold text-gray-500 ml-1">Location</label>
                   <input 
                     required
                     value={formData.location}
                     onChange={e => setFormData({...formData, location: e.target.value})}
                     placeholder="e.g. Remote"
                     className="w-full bg-gray-50/50 border border-gray-100 px-5 py-4 rounded-xl text-sm font-medium outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                   />
                </div>
              </div>

              {/* Sorting Order */}
              <div className="space-y-2">
                 <label className="text-xs font-semibold text-gray-500 ml-1">Display Order (Lower numbers appear first)</label>
                 <input 
                   type="number"
                   required
                   value={formData.order}
                   onChange={e => setFormData({...formData, order: parseInt(e.target.value)})}
                   className="w-full bg-gray-50/50 border border-gray-100 px-5 py-4 rounded-xl text-sm font-medium outline-none focus:border-black focus:ring-1 focus:ring-black transition-all font-mono"
                 />
              </div>

              {/* Description */}
              <div className="space-y-2">
                 <label className="text-xs font-semibold text-gray-500 ml-1">Role Description</label>
                 <textarea 
                   required
                   rows={6}
                   value={formData.description}
                   onChange={e => setFormData({...formData, description: e.target.value})}
                   placeholder="Describe your responsibilities and impact..."
                   className="w-full bg-gray-50/50 border border-gray-100 p-5 rounded-xl text-sm font-medium outline-none focus:border-black focus:ring-1 focus:ring-black transition-all resize-none leading-relaxed"
                 />
              </div>

           </div>

           {/* Submit Section */}
           <div className="pt-8 border-t border-gray-100 flex justify-end gap-4 pb-2">
              <button 
                type="button" 
                onClick={onClose}
                className="px-6 py-3.5 text-sm font-semibold text-gray-400 hover:text-black transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className="bg-black text-white px-10 py-3.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-gray-800 transition-all shadow-sm disabled:opacity-50"
              >
                <Save size={18} />
                {loading ? "Saving..." : "Save Experience"}
              </button>
           </div>
        </form>


      </div>
    </div>
  );
}
