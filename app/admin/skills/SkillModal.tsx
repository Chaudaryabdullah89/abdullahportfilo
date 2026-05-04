"use client";

import React, { useState, useEffect } from "react";
import { X, Save, Cpu, Hash, Layers, ListOrdered, Database, Globe, Terminal, Zap, Shield, Code, Layout, Monitor, Smartphone, Server, Anchor, Wind, Cloud, Box } from "lucide-react";


import { toast } from "sonner";
import { createSkill, updateSkill } from "./actions";

interface SkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  skill?: any;
}

export default function SkillModal({ isOpen, onClose, skill }: SkillModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "Frontend",
    icon: "code",
    order: 0,
  });

  useEffect(() => {
    if (skill) {
      setFormData({
        name: skill.name || "",
        category: skill.category || "Frontend",
        icon: skill.icon || "code",
        order: skill.order || 0,
      });
    } else {
      setFormData({
        name: "",
        category: "Frontend",
        icon: "code",
        order: 0,
      });
    }
  }, [skill, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = skill 
        ? await updateSkill(skill.id, formData)
        : await createSkill(formData);

      if (result.success) {
        toast.success(skill ? "SYSTEM_MANIFEST: SKILL_UPDATED" : "SYSTEM_MANIFEST: SKILL_INITIALIZED");
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
      <div className="bg-[#fafafa] w-full max-w-[500px] border border-black/10 shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white shrink-0 z-20">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                <Code className="text-black" size={20} />
             </div>
             <div>
                <h3 className="font-bold text-gray-900">
                  {skill ? "Edit Skill" : "Add New Skill"}
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
                {/* Name */}
                <div className="space-y-2">
                   <label className="text-xs font-semibold text-gray-500 ml-1">Skill Name</label>
                   <input 
                     required
                     value={formData.name}
                     onChange={e => setFormData({...formData, name: e.target.value})}
                     placeholder="e.g. React.js"
                     className="w-full bg-gray-50/50 border border-gray-100 px-5 py-4 rounded-xl text-sm font-medium outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                   />
                </div>

                {/* Category */}
                <div className="space-y-2">
                   <label className="text-xs font-semibold text-gray-500 ml-1">Category</label>
                   <select 
                     required
                     value={formData.category}
                     onChange={e => setFormData({...formData, category: e.target.value})}
                     className="w-full bg-gray-50/50 border border-gray-100 px-5 py-4 rounded-xl text-sm font-medium outline-none focus:border-black focus:ring-1 focus:ring-black transition-all appearance-none"
                   >
                     <option value="" disabled>Select category...</option>
                     <option value="Frontend">Frontend</option>
                     <option value="Backend">Backend</option>
                     <option value="Design">Design</option>
                     <option value="DevOps">DevOps</option>
                     <option value="Tools">Tools</option>
                   </select>
                </div>
              </div>

              {/* Sorting Order */}
              <div className="space-y-2">
                 <label className="text-xs font-semibold text-gray-500 ml-1">Display Order</label>
                 <input 
                   type="number"
                   required
                   value={formData.order}
                   onChange={e => setFormData({...formData, order: parseInt(e.target.value)})}
                   className="w-full bg-gray-50/50 border border-gray-100 px-5 py-4 rounded-xl text-sm font-medium outline-none focus:border-black focus:ring-1 focus:ring-black transition-all font-mono"
                 />
              </div>

              {/* Icon Selection Matrix */}
              <div className="space-y-4">
                 <label className="text-xs font-semibold text-gray-500 ml-1">Choose an Icon</label>
                 <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {[
                      { name: "code", icon: Code },
                      { name: "cpu", icon: Cpu },
                      { name: "layers", icon: Layers },
                      { name: "layout", icon: Layout },
                      { name: "database", icon: Database },
                      { name: "server", icon: Server },
                      { name: "globe", icon: Globe },
                      { name: "terminal", icon: Terminal },
                      { name: "zap", icon: Zap },
                      { name: "shield", icon: Shield },
                      { name: "monitor", icon: Monitor },
                      { name: "smartphone", icon: Smartphone },
                      { name: "cloud", icon: Cloud },
                      { name: "anchor", icon: Anchor },
                      { name: "wind", icon: Wind },
                      { name: "box", icon: Box }
                    ].map((item) => (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => setFormData({...formData, icon: item.name})}
                        className={`p-3 border rounded-xl flex items-center justify-center transition-all ${
                          formData.icon === item.name 
                          ? "bg-black text-white border-black" 
                          : "bg-gray-50 border-gray-100 hover:border-gray-200 text-gray-400"
                        }`}
                      >
                         <item.icon size={16} />
                      </button>
                    ))}

                 </div>
              </div>

              {/* Icon Name Manual Entry */}
              <div className="space-y-2">
                 <label className="text-xs font-semibold text-gray-500 ml-1">Custom Icon Name (Lucide)</label>
                 <input 
                   value={formData.icon}
                   onChange={e => setFormData({...formData, icon: e.target.value})}
                   placeholder="e.g. box, layout, tool..."
                   className="w-full bg-gray-50/50 border border-gray-100 px-5 py-4 rounded-xl text-sm font-medium outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
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
                {loading ? "Saving..." : "Save Skill"}
              </button>
           </div>
        </form>

      </div>
    </div>
  );
}
