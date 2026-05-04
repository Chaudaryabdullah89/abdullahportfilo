"use client";

import React, { useState, useEffect } from "react";
import { Plus, Search, Trash2, RefreshCw, Edit3, Briefcase, Calendar, MapPin } from "lucide-react";
import ExperienceModal from "./ExperienceModal";
import ConfirmModal from "../components/ConfirmModal";
import { getExperience, deleteExperience } from "./actions";
import { toast } from "sonner";

export default function ExperienceAdminPage() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExp, setSelectedExp] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Delete handling
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [expToDelete, setExpToDelete] = useState<string | null>(null);

  const fetchExperience = async () => {
    setLoading(true);
    const data = await getExperience();
    setExperiences(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  const handleEdit = (exp: any) => {
    setSelectedExp(exp);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedExp(null);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setExpToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!expToDelete) return;
    const result = await deleteExperience(expToDelete);
    if (result.success) {
      toast.success("Experience record deleted");
      fetchExperience();
    } else {
      toast.error("Error: Failed to delete record");
    }
  };

  const filteredExperience = experiences.filter(e => 
    e.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
        {/* Header Section */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Experience</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your work history and professional milestones.</p>
          </div>
          <button 
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-black text-white px-8 py-3.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-all shadow-sm"
          >
            <Plus size={18} /> Add Experience
          </button>
        </header>

        {/* Search & Stats */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-10 gap-4">
           <div className="flex items-center gap-4 bg-gray-50/50 px-6 py-3 rounded-xl border border-gray-50 w-full md:w-96 group focus-within:border-gray-200 transition-all">
              <Search size={16} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Search history..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm font-medium w-full placeholder:text-gray-300"
              />
           </div>
           <div className="text-sm font-medium text-gray-400">
              Total Records: <span className="text-black font-bold ml-1">{experiences.length}</span>
           </div>
        </div>

        {/* Timeline View */}
        <div className="space-y-4">
          {filteredExperience.length === 0 && !loading && (
             <div className="py-20 text-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-sm font-medium text-gray-400">No work history found.</p>
             </div>
          )}

          {filteredExperience.map((exp) => (
            <div 
              key={exp.id}
              className="bg-white border border-gray-100 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:border-black/10 hover:shadow-sm transition-all"
            >
               <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 border border-gray-100">
                     <span className="text-black font-bold text-xl">{exp.company.charAt(0)}</span>
                  </div>
                  <div>
                      <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                         <span className="text-[10px] font-bold uppercase tracking-widest bg-black text-white px-2 py-0.5 rounded-md">{exp.period}</span>
                         <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1 italic">
                            <MapPin size={10} /> {exp.location}
                         </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{exp.role}</h3>
                      <p className="text-gray-500 font-semibold text-sm">at {exp.company}</p>
                      <p className="text-gray-400 text-xs mt-3 line-clamp-1 max-w-[600px]">
                         {exp.description}
                      </p>
                  </div>
               </div>

               <div className="flex gap-3">
                  <button 
                    onClick={() => handleEdit(exp)}
                    className="px-5 py-2.5 rounded-xl border border-gray-100 text-sm font-semibold hover:bg-black hover:text-white hover:border-black transition-all"
                  >
                     Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteClick(exp.id)}
                    className="p-3 rounded-xl border border-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all"
                  >
                     <Trash2 size={18} />
                  </button>
               </div>
            </div>
          ))}
        </div>

        {loading && (
           <div className="flex items-center justify-center py-20 opacity-20">
              <RefreshCw className="animate-spin text-black" size={32} />
           </div>
        )}

      <ExperienceModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          fetchExperience();
        }} 
        experience={selectedExp} 
      />

      <ConfirmModal 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Experience"
        message="Are you sure you want to remove this experience record?"
        confirmLabel="Delete"
      />
    </>
  );
}
