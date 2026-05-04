"use client";

import React, { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, Calendar, RefreshCw, Briefcase } from "lucide-react";
import { getProjects, deleteProject } from "./actions";
import ProjectModal from "./ProjectModal";
import { toast } from "sonner";
import ConfirmModal from "../components/ConfirmModal";

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Confirmation Modal State
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  const refreshProjects = async () => {
    setLoading(true);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      toast.error("Error: Could not load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProjects();
  }, []);

  const handleDeleteTrigger = (id: string) => {
    setProjectToDelete(id);
    setIsConfirmOpen(true);
  };

  const onConfirmDelete = async () => {
    if (!projectToDelete) return;
    
    const result = await deleteProject(projectToDelete);
    if (result.success) {
      toast.success("Project deleted successfully");
      refreshProjects();
    } else {
      toast.error("Error: Failed to delete project");
    }
    setProjectToDelete(null);
  };

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
        <ConfirmModal 
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={onConfirmDelete}
          title="Delete Project"
          message="Are you sure you want to remove this project? This action cannot be undone."
          confirmLabel="Delete"
        />

        <ProjectModal 
          isOpen={isModalOpen} 
          onClose={() => {
            setIsModalOpen(false);
            refreshProjects();
          }} 
          project={editingProject}
        />

        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div>
             <h1 className="text-3xl font-bold tracking-tight text-gray-900">Projects</h1>
             <p className="text-sm text-gray-500 mt-1">Manage and curate your portfolio showcase.</p>
          </div>
          <button 
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-black text-white px-8 py-3.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-all shadow-sm"
          >
             <Plus size={18} />
             Add Project
          </button>
        </header>

        {/* Search & Stats */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-10 gap-4">
           <div className="flex items-center gap-4 bg-gray-50/50 px-6 py-3 rounded-xl border border-gray-50 w-full md:w-96 group focus-within:border-gray-200 transition-all">
              <Search size={16} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Search projects..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none text-sm font-medium w-full placeholder:text-gray-300"
              />
           </div>
           <div className="text-sm font-medium text-gray-400">
              Total Projects: <span className="text-black font-bold ml-1">{filteredProjects.length}</span>
           </div>
        </div>

        {/* Projects List */}
        {loading ? (
          <div className="flex items-center justify-center py-20 opacity-20">
             <RefreshCw className="animate-spin text-black" size={32} />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-white border border-gray-100 p-6 rounded-2xl flex justify-between items-center hover:border-black/5 hover:shadow-sm transition-all group">
                 <div className="flex gap-6 items-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center text-gray-300">
                       {project.image ? (
                          <img src={project.image} alt="" className="w-full h-full object-cover rounded-xl" />
                       ) : (
                          <Briefcase size={24} />
                       )}
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                           <span className="text-[10px] font-bold uppercase tracking-widest bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md">{project.category}</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">{project.title}</h3>
                    </div>
                 </div>
                 
                 <div className="flex gap-3">
                    <button 
                      onClick={() => handleEdit(project)}
                      className="px-5 py-2.5 rounded-xl border border-gray-100 text-sm font-semibold hover:bg-black hover:text-white hover:border-black transition-all"
                    >
                       Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteTrigger(project.id)}
                      className="p-3 rounded-xl border border-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500 hover:border-red-50 transition-all"
                    >
                       <Trash2 size={18} />
                    </button>
                 </div>
              </div>
            ))}
            
            {!loading && filteredProjects.length === 0 && (
              <div className="py-20 text-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                 <p className="text-sm font-medium text-gray-400">No projects found matching your search.</p>
              </div>
            )}
          </div>
        )}
    </>
  );
}
