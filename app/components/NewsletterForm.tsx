"use client";

import React, { useState } from "react";
import { toast } from "sonner";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("SYNC_COMPLETE: You are now connected to the content stream.");
        setEmail("");
      } else {
        toast.error(data.message || "SYNC_FAILED: Encountered a protocol error.");
      }
    } catch (error) {
      toast.error("HARDWARE_FAILURE: Link to central server lost.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-0 w-full max-w-2xl border-4 border-white/10 group focus-within:border-white transition-all"
    >
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="INITIALIZE@EMAIL.EXE" 
        className="flex-1 bg-transparent px-8 py-6 text-[12px] font-bold tracking-widest placeholder:text-white/20 focus:outline-none uppercase"
      />
      <button 
        type="submit"
        disabled={isLoading}
        className="bg-white text-black px-12 py-6 text-xs font-black uppercase tracking-[0.3em] hover:bg-[#4ec9b0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "SYNCING..." : "Join_ME"}
      </button>
    </form>
  );
};

export default NewsletterForm;
