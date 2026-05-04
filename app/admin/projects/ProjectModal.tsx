"use client";

import React, { useState, useEffect } from "react";
import { X, Save, Box, Image as ImageIcon, Link as LinkIcon, Hash, Type, AlignLeft, ShieldAlert, Award, FileText } from "lucide-react";
import { toast } from "sonner";
import { createProject, updateProject } from "./actions";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: any; 
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image: "",
    description: "",
    challenge: "",
    solution: "",
    results: "",
    role: "Lead Developer",
    tags: "",
    liveUrl: "",
    githubUrl: "",
  });

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || "",
        category: project.category || "",
        image: project.image || "",
        description: project.description || "",
        challenge: project.challenge || "",
        solution: project.solution || "",
        results: project.results || "",
        role: project.role || "Lead Developer",
        tags: project.tags || "",
        liveUrl: project.liveUrl || "",
        githubUrl: project.githubUrl || "",
      });
    } else {
      setFormData({
        title: "",
        category: "",
        image: "",
        description: "",
        challenge: "",
        solution: "",
        results: "",
        role: "Lead Developer",
        tags: "",
        liveUrl: "",
        githubUrl: "",
      });
    }
  }, [project, isOpen]);


  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = project 
        ? await updateProject(project.id, formData)
        : await createProject(formData);

      if (result.success) {
        toast.success(project ? "Project updated" : "Project added");
        onClose();
      } else {
        toast.error("Error: Could not save project");
      }
    } catch (error) {
      toast.error("Error: Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-[800px] rounded-2xl shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden border border-gray-100">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white shrink-0 z-20">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                <Box className="text-black" size={20} />
             </div>
             <div>
                <h3 className="font-bold text-gray-900">
                  {project ? "Edit Project" : "Add New Project"}
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
          className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar outline-none min-h-0"
        >

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="space-y-2">
                 <label className="text-xs font-semibold text-gray-500 ml-1">Project Title</label>
                 <input 
                   required
                   value={formData.title}
                   onChange={e => setFormData({...formData, title: e.target.value})}
                   placeholder="e.g. Nexus AI Dashboard"
                   className="w-full bg-gray-50/50 border border-gray-100 px-5 py-4 rounded-xl text-sm font-medium outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                 />
              </div>

              <div className="space-y-2">
                 <label className="text-xs font-semibold text-gray-500 ml-1">Category</label>
                 <input 
                   required
                   value={formData.category}
                   onChange={e => setFormData({...formData, category: e.target.value})}
                   placeholder="e.g. Web Development"
                   className="w-full bg-gray-50/50 border border-gray-100 px-5 py-4 rounded-xl text-sm font-medium outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                 />
              </div>

              <div className="space-y-2 md:col-span-2">
                 <label className="text-xs font-semibold text-gray-500 ml-1">Cover Image URL</label>
                 <div className="flex gap-4">
                    <input 
                      required
                      value={formData.image}
                      onChange={e => setFormData({...formData, image: e.target.value})}
                      placeholder="https://images.unsplash.com/..."
                      className="flex-1 bg-gray-50/50 border border-gray-100 px-5 py-4 rounded-xl text-sm font-medium outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                    />
                    <label className="cursor-pointer bg-black text-white px-8 py-4 rounded-xl text-xs font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shrink-0">
                      <ImageIcon size={14} />
                      {loading ? "..." : "Upload"}
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          
                          const uploaderData = new FormData();
                          uploaderData.append("file", file);
                          
                          setLoading(true);
                          try {
                            const res = await fetch("/api/upload", {
                              method: "POST",
                              body: uploaderData,
                            });
                            const data = await res.json();
                            if (data.url) {
                              setFormData({ ...formData, image: data.url });
                              toast.success("Image uploaded");
                            } else {
                              toast.error("Upload failed");
                            }
                          } catch (err) {
                            toast.error("Network error");
                          } finally {
                            setLoading(false);
                          }
                        }}
                      />
                    </label>
                 </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                 <label className="text-xs font-semibold text-gray-500 ml-1">Short Description</label>
                 <textarea 
                   required
                   rows={3}
                   value={formData.description}
                   onChange={e => setFormData({...formData, description: e.target.value})}
                   placeholder="A brief summary of the project..."
                   className="w-full bg-gray-50/50 border border-gray-100 p-5 rounded-xl text-sm font-medium outline-none focus:border-black focus:ring-1 focus:ring-black transition-all resize-none"
                 />
              </div>

              {/* Case Study Details */}
              <div className="md:col-span-2 space-y-10 pt-4">
                 <div className="flex items-center gap-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Case Study Details</h4>
                    <div className="flex-1 h-[1px] bg-gray-50"></div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-xs font-semibold text-gray-500 ml-1">Personal Role</label>
                       <input 
                         value={formData.role}
                         onChange={e => setFormData({...formData, role: e.target.value})}
                         placeholder="e.g. Lead Developer"
                         className="w-full bg-gray-50/50 border border-gray-100 px-5 py-4 rounded-xl text-sm font-medium outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-semibold text-gray-500 ml-1">Tech Stack (Tags)</label>
                       <input 
                         value={formData.tags}
                         onChange={e => setFormData({...formData, tags: e.target.value})}
                         placeholder="Next.js, Tailwind, GSAP"
                         className="w-full bg-gray-50/50 border border-gray-100 px-5 py-4 rounded-xl text-sm font-medium outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                       />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 ml-1">The Challenge</label>
                    <textarea 
                      rows={4}
                      value={formData.challenge}
                      onChange={e => setFormData({...formData, challenge: e.target.value})}
                      placeholder="What problem were you solving?"
                      className="w-full bg-gray-50/50 border border-gray-100 p-5 rounded-xl text-sm font-medium outline-none focus:border-black focus:ring-1 focus:ring-black transition-all resize-none leading-relaxed"
                    />
                 </div>

                 <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 ml-1">The Solution</label>
                    <textarea 
                      rows={4}
                      value={formData.solution}
                      onChange={e => setFormData({...formData, solution: e.target.value})}
                      placeholder="How did you build it? What was your approach?"
                      className="w-full bg-gray-50/50 border border-gray-100 p-5 rounded-xl text-sm font-medium outline-none focus:border-black focus:ring-1 focus:ring-black transition-all resize-none leading-relaxed"
                    />
                 </div>

                 <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 ml-1">Final Impact</label>
                    <textarea 
                      rows={4}
                      value={formData.results}
                      onChange={e => setFormData({...formData, results: e.target.value})}
                      placeholder="What were the outcomes and metrics?"
                      className="w-full bg-gray-50/50 border border-gray-100 p-5 rounded-xl text-sm font-medium outline-none focus:border-black focus:ring-1 focus:ring-black transition-all resize-none leading-relaxed"
                    />
                 </div>
              </div>


              <div className="space-y-2">
                 <label className="text-xs font-semibold text-gray-500 ml-1">Live Demo URL</label>
                 <input 
                   value={formData.liveUrl}
                   onChange={e => setFormData({...formData, liveUrl: e.target.value})}
                   placeholder="https://..."
                   className="w-full bg-gray-50/50 border border-gray-100 px-5 py-4 rounded-xl text-sm font-medium outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                 />
              </div>

              <div className="space-y-2">
                 <label className="text-xs font-semibold text-gray-500 ml-1">GitHub Repository URL</label>
                 <input 
                   value={formData.githubUrl}
                   onChange={e => setFormData({...formData, githubUrl: e.target.value})}
                   placeholder="https://github.com/..."
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
                {loading ? "Saving..." : "Save Project"}
              </button>
           </div>
        </form>

      </div>
    </div>
  );
}
