"use client";

import React from "react";
import Link from "next/link";


import { ChevronUp, Mail } from "lucide-react";

// Custom SVG Icons as they are missing in the installed lucide-react version
const GithubIcon = ({ size = 20, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 20, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Footer = ({ settings }: { settings?: any }) => {
  // Safe extraction with fallbacks
  const safeSettings = settings || {
    githubUrl: "",
    linkedinUrl: "",
    email: "",
    heroName: "Muhammad Abdullah"
  };

  return (
    <footer className="w-full bg-[#1a1c1e] py-20 px-12 font-[family-name:var(--font-space-grotesk)] text-white border-t border-white/5">
      <div className="max-w-[1200px] mx-auto text-center flex flex-col items-center">
        
        {/* Back to Top */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col items-center gap-2 group mb-12"
        >
          <ChevronUp size={20} className="transition-transform group-hover:-translate-y-1" />
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-70 group-hover:opacity-100 pb-1 border-b border-transparent group-hover:border-white transition-all">
            Back to top
          </span>
        </button>

        {/* Social Icons */}
        <div className="flex items-center gap-8 mb-12">
          {safeSettings.githubUrl && (
            <a href={safeSettings.githubUrl} target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-all hover:scale-110">
              <GithubIcon size={24} />
            </a>
          )}
          {safeSettings.linkedinUrl && (
            <a href={safeSettings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-all hover:scale-110">
              <LinkedinIcon size={24} />
            </a>
          )}
          {safeSettings.email && (
            <a href={`mailto:${safeSettings.email}`} className="opacity-60 hover:opacity-100 transition-all hover:scale-110">
              <Mail size={24} />
            </a>
          )}
        </div>


        {/* Footer Nav */}
        <div className="flex gap-8 mb-12 text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">
           <Link href="/about" className="hover:text-white transition-all">About</Link>
           <Link href="/projects" className="hover:text-white transition-all">Projects</Link>
           <Link href="/blogs" className="hover:text-white transition-all">Blogs</Link>
           <Link href="/resume" className="hover:text-white transition-all border-b border-white pb-1">Resume</Link>
        </div>

        {/* Copyright */}
        <p className="text-[11px] font-[family-name:var(--font-jetbrains-mono)] tracking-wider text-gray-500 uppercase">
          <span className="text-white opacity-80">@{new Date().getFullYear()} {safeSettings.heroName}</span> All Rights Reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;
