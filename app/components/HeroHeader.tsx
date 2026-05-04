"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AtSign } from "lucide-react";
import logo from "../../public/logo_copy-removebg-preview.png";
import heroiamge from "../../public/abdullahbg.png";
import TextReveal from "./TextReveal";  
import ScrambleText from "./ScrambleText";
import Magnetic from "./Magnetic";
import gsap from "gsap";

// Custom SVG Icons for brands not in the installed lucide-react version
const GithubIcon = ({ size = 20, ...props }) => (
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

const HeroHeader = ({ settings }: { settings: any }) => {
  const heroRef = useRef(null);

  // Split name for effect
  const nameParts = settings.heroName.split(" ");
  const firstName = nameParts[0] || "Muhammad";
  const lastName = nameParts.slice(1).join(" ") || "Abdullah";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const initHero = () => {
        const tl = gsap.timeline({ 
          defaults: { ease: "power4.out" },
          delay: 0.1 // Slight buffer for render stability
        });

        tl.from(".hero-split", {
          xPercent: 100,
          duration: 1.5,
        })
        .from(".hero-subtitle", {
          x: -50,
          opacity: 0,
          duration: 1,
        }, "-=0.8")
        .from(".hero-badge", {
          scale: 0,
          opacity: 0,
          duration: 0.8,
        }, "-=0.6")
        .fromTo(".hero-social-item", 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.8 },
          "-=0.4"
        )
        .from(".hero-image-focal", {
          scale: 1.1,
          opacity: 0,
          duration: 1.5,
        }, "-=1.2")
        .from(".hero-status-box", {
          x: 50,
          opacity: 0,
          duration: 1,
        }, "-=0.8")
        .from(".hero-nav-link", {
          y: -20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
        }, "-=1.5");
      };

      // Ensure animations play even if event was already dispatched or missed
      initHero();
      
    }, heroRef);

    return () => ctx.revert();
  }, []);


  return (
    <div ref={heroRef} className="relative w-full h-screen min-h-[800px] overflow-hidden bg-[#e5e5e5] font-[family-name:var(--font-space-grotesk)]">
      {/* Premium Split Architecture */}
      <div
        className="hero-split absolute inset-0 bg-[#0d0f11] z-0 pointer-events-none"
        style={{
          clipPath: "polygon(52% 0, 100% 0, 100% 100%, 38% 100%)",
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f5f5f5] to-[#ececec] z-[-1]"></div>

      {/* Main Structural Container */}
      <div className="relative z-10 w-full h-full max-w-[1440px] mx-auto flex flex-col">
        
        {/* Balanced Global Header */}
        <header className="w-full h-32 flex justify-between items-center px-16 z-50">
          <div className="flex items-center gap-6 group cursor-pointer">
            <div className="relative w-12 h-12 bg-black flex items-center justify-center p-2.5 transition-transform group-hover:rotate-6">
              <Image 
                src={logo} 
                alt="Logo" 
                fill
                className="object-contain invert" 
              />
            </div>
            <div className="flex flex-col">
              <span className="text-black font-black text-xl leading-none tracking-tighter uppercase">Abdullah.</span>
              <span className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-40">Software_Engineer</span>
            </div>
          </div>

          {/* Universal Menu Trigger */}
          <button className="w-12 h-12 bg-black flex items-center justify-center border border-white/10 group hover:bg-[#4ec9b0] transition-colors" onClick={() => window.dispatchEvent(new Event('toggleMobileMenu'))}>
            <div className="space-y-1.5 px-3">
              <div className="w-6 h-[2px] bg-white group-hover:bg-black transition-colors"></div>
              <div className="w-4 h-[2px] bg-[#4ec9b0] group-hover:bg-black transition-colors"></div>
              <div className="w-6 h-[2px] bg-white group-hover:bg-black transition-colors"></div>
            </div>
          </button>
        </header>

        {/* Dynamic Content Matrix */}
        <main className="flex-1 flex flex-col md:flex-row justify-between items-center px-6 md:px-16 pb-[15vh]">
          
          {/* Left Narrative Block */}
          <div className="w-full md:w-[45%] flex flex-col items-start translate-y-0 md:translate-y-[-5%] mb-12 md:mb-0">
            <div className="hero-subtitle flex items-center gap-4 mb-8">
              <div className="h-[2px] w-12 bg-black/20"></div>
              <span className="text-[11px] font-bold text-black tracking-[0.5em] font-[family-name:var(--font-jetbrains-mono)] uppercase">
                &lt;Hello_World /&gt;
              </span>
            </div>
            
            <h1 className="hero-title text-5xl md:text-[80px] font-black text-black leading-[0.85] mb-8 tracking-[-0.08em] font-[family-name:var(--font-space-grotesk)] uppercase overflow-hidden">
               <TextReveal text={firstName} />
               <TextReveal text={lastName} className="md:hover:pl-6 transition-all duration-700 ease-out" />
            </h1>
            
            <div className="hero-badge bg-black text-[11px] font-bold text-white px-8 py-2.5 tracking-[0.2em] uppercase mb-16 shadow-[10px_10px_0px_rgba(78,201,176,1)]">
              <ScrambleText text={settings.heroTitle.replace(/ /g, "_")} delay={1.5} />
            </div>

            {/* Premium Social Grid */}
            <div className="flex gap-4">
              {[
                { icon: <AtSign size={20} />, title: "Contact", href: `mailto:${settings.email}` },
                { icon: <GithubIcon size={20} />, title: "GitHub", href: settings.githubUrl },
                { icon: <LinkedinIcon size={20} />, title: "LinkedIn", href: settings.linkedinUrl }
              ].map((social, i) => (
                <Magnetic key={i}>
                  <a
                    href={social.href}
                    className="hero-social-item w-14 h-14 flex items-center justify-center bg-white border border-black/5 shadow-[4px_10px_20px_rgba(0,0,0,0.1)] hover:shadow-[0px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all duration-300 group"
                    title={social.title}
                  >
                    <div className="transition-transform group-hover:scale-110 flex items-center justify-center">
                      {social.icon}
                    </div>
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          {/* Right Visual Architecture */}
          <div className="w-[50%] h-full relative flex flex-col justify-end items-end pointer-events-none">
            
            {/* Focal Portrait Image */}
            <div className="absolute inset-0 top-[-10%] flex items-end justify-end pointer-events-auto translate-x-12">
              <div className="hero-image-focal relative w-full h-[97%] ">
                <Image 
                  src={heroiamge}
                  alt="Muhammad Abdullah" 
                  fill
                  className="object-contain object-bottom drop-shadow-[-30px_30px_60px_rgba(0,0,0,0.45)] brightness-[1.03]"
                  sizes="(max-width: 1440px) 100vw, 50vw"
                  priority
                />
              </div>

              {/* Advanced Technical Status Overlay */}
              <div className="hero-status-box bg-[#121417]/95 p-6 border-l-[4px] border-[#4ec9b0] absolute bottom-[220px] right-[55%] pointer-events-auto backdrop-blur-2xl z-30 shadow-[30px_30px_60px_rgba(0,0,0,0.5)] min-w-[210px]">
                <code className="text-[#dcdcdc] text-[11px] block font-[family-name:var(--font-jetbrains-mono)] leading-relaxed">
                  <span className="text-[#6a9955] opacity-40">// current_instance</span> <br />
                  <span className="text-[#569cd6]">const</span> eng = &#123; <br />
                  &nbsp;&nbsp;state: <span className="text-[#ce9178]">"{settings?.isAvailable ? "available" : "at_capacity"}"</span>, <br />
                  &nbsp;&nbsp;role: <span className="text-[#ce9178]">"software_dev"</span>, <br />
                  &nbsp;&nbsp;tz: <span className="text-[#ce9178]">"GMT+5"</span> <br />
                  &#125;;
                </code>
              </div>
            </div>
          </div>
        </main>
      </div>


      {/* REFINED Hero Banner */}
      <div className="absolute bottom-0 left-0 w-full h-[22vh] bg-[#121416] z-30 flex flex-col justify-center border-t border-white/5 overflow-hidden">
        
        {/* Large faint text decoration */}
        <div className="absolute right-[5%] top-[-10%] text-[240px] font-black text-white/[0.03] select-none leading-none transform rotate-[-5deg] pointer-events-none font-[family-name:var(--font-space-grotesk)] uppercase">
          ENGINEER
        </div>

        <div className="max-w-[1400px] w-full mx-auto px-16 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex-1">
            <h2 className="text-white text-lg font-bold tracking-tight font-[family-name:var(--font-jetbrains-mono)] flex items-center mb-4">
              <span className="text-[#c586c0] mr-2">namespace</span> 
              <span className="text-[#4ec9b0]">Core.Identity</span> 
              <span className="text-white ml-2">&#123;</span>
            </h2>
            <p className="text-gray-400 text-[12px] leading-[1.8] max-w-[600px] font-medium opacity-80 font-[family-name:var(--font-space-grotesk)]">
               Developing robust software solutions through clean code principles and architectural integrity. 
               Every pixel and every line of code is engineered for maximum performance and scalable growth.
            </p>
          </div>
          
            <div className="flex flex-col items-end gap-3">
            <Link 
              href="/about"
              className="group flex items-center font-[family-name:var(--font-jetbrains-mono)] text-[11px] font-bold tracking-widest text-[#ce9178] hover:text-white transition-all"
            >
              <span className="text-white opacity-40 mr-2">01.</span>
              READ_DETAILED_STORY()
              <span className="w-8 h-[1px] bg-[#ce9178] group-hover:w-12 transition-all ml-4"></span>
            </Link>
            {settings?.isAvailable && (
              <Link 
                href="/hire"
                className="group flex items-center font-[family-name:var(--font-jetbrains-mono)] text-[11px] font-bold tracking-widest text-[#4ec9b0] hover:text-white transition-all"
              >
                <span className="text-white opacity-40 mr-2">02.</span>
                HIRE_FOR_PROJECT()
                <span className="w-8 h-[1px] bg-[#4ec9b0] group-hover:w-12 transition-all ml-4"></span>
              </Link>
            )}
            <p className="text-[10px] text-white/20 font-bold tracking-[0.3em] uppercase">Built with Precision</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default HeroHeader;