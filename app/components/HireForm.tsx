"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const HireForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Full Web Application",
    budget: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Please provide your name and email.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Proposal request sent! I will contact you soon.");
        setFormData({
          name: "",
          email: "",
          projectType: "Full Web Application",
          budget: "",
          message: "",
        });
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to send request.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <label className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-50">Project Type</label>
        <select 
          value={formData.projectType}
          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
          className="w-full bg-transparent border-b-2 border-black/10 py-2 focus:border-black focus:outline-none uppercase font-bold text-xs tracking-widest"
        >
          <option>Full Web Application</option>
          <option>UI/UX Design Only</option>
          <option>Bug Fix / Maintenance</option>
          <option>E-commerce Solution</option>
          <option>SaaS Development</option>
          <option>Other</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-50">Full Name</label>
        <input 
          type="text" 
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full bg-transparent border-b-2 border-black/10 py-2 focus:border-black focus:outline-none uppercase font-bold text-xs tracking-widest placeholder:opacity-20" 
          placeholder="John Doe" 
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-50">Email Address</label>
        <input 
          type="email" 
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full bg-transparent border-b-2 border-black/10 py-2 focus:border-black focus:outline-none uppercase font-bold text-xs tracking-widest placeholder:opacity-20" 
          placeholder="john@company.com" 
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-50">Estimated Budget</label>
        <input 
          type="text" 
          value={formData.budget}
          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          className="w-full bg-transparent border-b-2 border-black/10 py-2 focus:border-black focus:outline-none uppercase font-bold text-xs tracking-widest placeholder:opacity-20" 
          placeholder="$2000 - $5000" 
        />
      </div>

       <div className="space-y-2">
        <label className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-50">Brief Overview</label>
        <textarea 
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-transparent border-b-2 border-black/10 py-2 focus:border-black focus:outline-none font-bold text-xs tracking-widest placeholder:opacity-20 resize-none" 
          placeholder="Tell me about your project_goals..." 
        />
      </div>

      <button 
        disabled={loading}
        className="w-full bg-black text-white py-5 font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-gray-800 transition-all mt-4 flex items-center justify-center gap-3 disabled:bg-gray-400"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Processing_Request...
          </>
        ) : (
          "Request Proposal"
        )}
      </button>
    </form>
  );
};

export default HireForm;
