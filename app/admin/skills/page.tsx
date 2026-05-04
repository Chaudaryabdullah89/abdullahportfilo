"use client";

import React, { useState, useEffect } from "react";
import { Plus, Search, Trash2, Edit3, Cpu, Code, RefreshCw } from "lucide-react";
import SkillModal from "./SkillModal";
import ConfirmModal from "../components/ConfirmModal";
import { getSkills, deleteSkill } from "./actions";
import { toast } from "sonner";

export default function SkillsAdminPage() {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Delete handling
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState<string | null>(null);

  const fetchSkills = async () => {
    setLoading(true);
    const data = await getSkills();
    setSkills(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleEdit = (skill: any) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedSkill(null);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setSkillToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!skillToDelete) return;
    const result = await deleteSkill(skillToDelete);
    if (result.success) {
      toast.success("Skill deleted successfully");
      fetchSkills();
    } else {
      toast.error("Error: Failed to delete skill");
    }
  };

  const filteredSkills = skills.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = ["Frontend", "Backend", "Design", "DevOps", "Tools"];

  return (
    <>
        {/* Header Section */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Skills</h1>
            <p className="text-sm text-gray-500 mt-1">Manage and organize your technical expertise.</p>
          </div>
          <button 
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-black text-white px-8 py-3.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-all shadow-sm"
          >
            <Plus size={18} /> Add Skill
          </button>
        </header>

        {/* Search & Stats */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-12 gap-4">
           <div className="flex items-center gap-4 bg-gray-50/50 px-6 py-3 rounded-xl border border-gray-50 w-full md:w-96 group focus-within:border-gray-200 transition-all">
              <Search size={16} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Search skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm font-medium w-full placeholder:text-gray-300"
              />
           </div>
           <div className="text-sm font-medium text-gray-400">
              Total Skills: <span className="text-black font-bold ml-1">{skills.length}</span>
           </div>
        </div>

        {/* Categories View */}
        <div className="space-y-12">
          {categories.map(category => {
            const categorySkills = filteredSkills.filter(s => s.category === category);
            if (categorySkills.length === 0 && searchQuery === "") return null;

            return (
              <div key={category} className="space-y-6">
                <div className="flex items-center gap-4">
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                    {category}
                  </h2>
                  <div className="flex-1 h-[1px] bg-gray-100"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {categorySkills.map(skill => (
                    <div 
                      key={skill.id}
                      className="bg-white border border-gray-100 p-5 rounded-2xl flex items-center justify-between group hover:border-black/10 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white transition-all">
                           <Code size={18} />
                        </div>
                        <div>
                           <p className="text-sm font-bold text-gray-900">{skill.name}</p>
                           <p className="text-[10px] font-medium text-gray-400 uppercase">Order: {skill.order}</p>
                        </div>
                      </div>

                      <div className="flex gap-1">
                        <button 
                          onClick={() => handleEdit(skill)}
                          className="p-2 text-gray-400 hover:text-black hover:bg-gray-50 rounded-lg transition-all"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(skill.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {loading && (
          <div className="flex items-center justify-center p-20 opacity-20">
             <RefreshCw className="animate-spin text-black" size={32} />
          </div>
        )}

      <SkillModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          fetchSkills();
        }} 
        skill={selectedSkill} 
      />

      <ConfirmModal 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Skill"
        message="Are you sure you want to remove this skill from your tech stack?"
        confirmLabel="Delete"
      />
    </>
  );
}
