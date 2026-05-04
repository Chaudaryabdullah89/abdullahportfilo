"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { X, Mail } from "lucide-react";

// Custom SVG Icons for brands to avoid lucide-react export errors
const GithubIcon = ({ size = 20, ...props }: any) => (
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
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 20, ...props }: any) => (
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

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelLeftRef = useRef<HTMLDivElement>(null);
  const panelRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    window.addEventListener("toggleMobileMenu", handleToggle);
    return () => window.removeEventListener("toggleMobileMenu", handleToggle);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (containerRef.current) containerRef.current.style.visibility = "visible";

      const tl = gsap.timeline();
      tl.set([panelLeftRef.current, panelRightRef.current], { yPercent: (i) => i === 0 ? -100 : 100 })
        .to([panelLeftRef.current, panelRightRef.current], {
          yPercent: 0,
          duration: 1,
          ease: "expo.inOut",
        })
        .fromTo(".nav-panel-item", 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power4.out" },
          "-=0.4"
        );
    } else {
      gsap.to([panelLeftRef.current, panelRightRef.current], {
        yPercent: (i) => i === 0 ? -100 : 100,
        duration: 0.8,
        ease: "expo.inOut",
        onComplete: () => {
          if (containerRef.current) containerRef.current.style.visibility = "hidden";
          document.body.style.overflow = "auto";
        }
      });
    }
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[99999] flex flex-col md:flex-row invisible font-[family-name:var(--font-space-grotesk)]"
    >
      {/* PANEL LEFT: Branding & Intel */}
      <div 
        ref={panelLeftRef}
        className="w-full md:w-[40%] h-full bg-[#0d0f11] p-8 md:p-16 flex flex-col justify-between border-r border-white/5"
      >
        <div className="nav-panel-item">
           <span className="text-white font-black text-3xl tracking-tighter uppercase block">Abdullah.</span>
           <span className="text-[#4ec9b0] text-[10px] font-bold tracking-[0.5em] uppercase mt-2 block font-[family-name:var(--font-jetbrains-mono)]">SOFTWARE DEVELOPER</span>
        </div>

        <div className="nav-panel-item space-y-12">
           <div className="space-y-4">
              <p className="text-white/20 text-[10px] font-bold tracking-widest uppercase">// mission_statement</p>
              <p className="text-white/60 text-lg font-medium leading-[1.6]">
                 Architecting clean-code ecosystems with high-fidelity performance and mechanical precision.
              </p>
           </div>

           <div className="flex gap-6">
              {[
                { icon: <GithubIcon size={20} />, href: "https://github.com" },
                { icon: <LinkedinIcon size={20} />, href: "https://linkedin.com" },
                { icon: <Mail size={20} />, href: "mailto:contact@example.com" }
              ].map((social, i) => (
                <a key={i} href={social.href} className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 text-white hover:bg-[#4ec9b0] hover:text-black transition-all">
                   {social.icon}
                </a>
              ))}
           </div>
        </div>

        <div className="nav-panel-item">
           <Link 
             href="/hire" 
             onClick={closeMenu}
             className="inline-block bg-white text-black px-12 py-4 font-black text-[12px] tracking-[0.2em] uppercase hover:bg-[#4ec9b0] transition-colors shadow-[8px_8px_0px_rgba(78,201,176,1)]"
           >
              Initiate_Project
           </Link>
        </div>
      </div>

      {/* PANEL RIGHT: Navigation Matrix */}
      <div 
        ref={panelRightRef}
        className="w-full md:w-[60%] h-full bg-[#121417] p-8 md:p-16 flex flex-col relative"
      >
        <button 
          onClick={closeMenu}
          className="absolute top-8 md:top-16 right-8 md:right-16 w-14 h-14 bg-white/5 flex items-center justify-center group hover:bg-white transition-all z-50 transition-transform hover:rotate-90"
        >
           <X size={24} className="text-white group-hover:text-black transition-colors" />
        </button>

        <nav className="flex-1 flex flex-col justify-center gap-6 md:gap-12 pt-20">
           {[
             { label: "About", href: "/about", index: "01" },
             { label: "Projects", href: "/projects", index: "02" },
             { label: "Blogs", href: "/blogs", index: "03" },
             { label: "Contact", href: "/#contact", index: "04" },
           ].map((link) => (
             <Link 
               key={link.label} 
               href={link.href} 
               onClick={closeMenu}
               className="nav-panel-item group flex items-end gap-10"
             >
                <span className="text-[#4ec9b0] text-sm font-bold font-[family-name:var(--font-jetbrains-mono)] opacity-40 group-hover:opacity-100 transition-opacity">
                   [{link.index}]
                </span>
                <span className="text-white text-5xl md:text-[100px] font-black uppercase tracking-tighter leading-none transition-all duration-700 group-hover:text-[#4ec9b0] group-hover:translate-x-4">
                   {link.label}
                </span>
             </Link>
           ))}
        </nav>

        {/* <div className="nav-panel-item absolute bottom-8 md:bottom-16 left-8 md:px-16 text-white/10 text-[100px] md:text-[200px] font-black select-none pointer-events-none leading-none">
           NAV_SYS
        </div> */}
      </div>

    </div>
  );
};

export default MobileMenu;
