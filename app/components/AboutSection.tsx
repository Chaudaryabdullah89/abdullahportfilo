import React from "react";
import { PenTool, Code, Settings, Terminal } from "lucide-react";
import ScrambleText from "./ScrambleText";
import Link from "next/link";
const AboutSection = () => {
  return (
    <section
      id="about"
      className="w-full bg-[#f3f3f3] py-24 px-12 font-[family-name:var(--font-space-grotesk)]"
    >
      <div className="max-w-[1200px] mx-auto text-center">
        {/* Title Box */}

        <div className="inline-block border-[4px] border-black px-16 py-3 mb-24 bg-white shadow-sm">
          <h2 className="text-2xl font-bold tracking-[0.4em] uppercase text-black">
            <ScrambleText text="About me" />
          </h2>
        </div>

        {/* Description */}
        <p
          data-reveal="fade-up"
          className="max-w-[700px] mx-auto text-gray-600 text-[14px] leading-relaxed mb-8 font-[family-name:var(--font-jetbrains-mono)] italic"
        >
          // Building high-performance digital ecosystems with structural
          integrity. Focusing on the intersection of clean architecture and
          seamless user interaction.
        </p>

        {/* Explore Link */}
        <div className="flex items-center justify-center gap-4 mb-16 font-[family-name:var(--font-jetbrains-mono)]">
          <span className="w-[1px] h-6 bg-black"></span>
          <Link href="/projects" className="cursor-poin">
            <span className="text-[12px] font-bold tracking-widest uppercase">
              Explore
            </span>
          </Link>
          <span className="w-[1px] h-6 bg-black"></span>
        </div>

        {/* Decorative Separator */}
        <div className="flex items-center justify-center gap-4 mb-24 opacity-20">
          <div className="h-[2px] w-12 bg-black"></div>
          <div className="flex gap-1 transform rotate-[-45deg]">
            <div className="w-[2px] h-4 bg-black"></div>
            <div className="w-[2px] h-4 bg-black"></div>
            <div className="w-[2px] h-4 bg-black"></div>
          </div>
          <div className="h-[2px] w-12 bg-black"></div>
        </div>

        {/* Features Grid */}
        <div
          data-reveal="stagger"
          className="grid grid-cols-1 md:grid-cols-2 gap-y-24 gap-x-12 mt-12 mb-24"
        >
          {/* Design */}
          <div className="flex flex-col items-center group">
            <div className="relative mb-6">
              <PenTool
                size={48}
                className="text-gray-200 absolute -top-4 -left-6 z-0"
              />
              <h3 className="text-xl font-bold uppercase relative z-10 tracking-widest">
                Design
              </h3>
            </div>
            <p className="max-w-[400px] text-[12px] text-gray-500 font-medium leading-relaxed font-[family-name:var(--font-jetbrains-mono)]">
              // Crafting high-fidelity interfaces that prioritize clarity and
              user engagement across all platforms.
            </p>
          </div>

          {/* Development */}
          <div className="flex flex-col items-center group">
            <div className="relative mb-6">
              <Code
                size={48}
                className="text-gray-200 absolute -top-4 -left-6 z-0"
              />
              <h3 className="text-xl font-bold uppercase relative z-10 tracking-widest">
                Development
              </h3>
            </div>
            <p className="max-w-[400px] text-[12px] text-gray-500 font-medium leading-relaxed font-[family-name:var(--font-jetbrains-mono)]">
              // Engineering robust, scalable applications with clean code
              principles and high-performance logic.
            </p>
          </div>

          {/* Maintenance */}
          <div className="flex flex-col items-center group md:col-span-2 md:mt-8">
            <div className="relative mb-6">
              <Settings
                size={48}
                className="text-gray-200 absolute -top-4 -left-6 z-0"
              />
              <h3 className="text-xl font-bold uppercase relative z-10 tracking-widest">
                Maintenance
              </h3>
            </div>
            <p className="max-w-[400px] text-[12px] text-gray-500 font-medium leading-relaxed font-[family-name:var(--font-jetbrains-mono)]">
              // Ensuring continuous stability and architectural growth for
              long-term production environments.
            </p>
          </div>
        </div>

        {/* Final Separator */}
        <div className="flex items-center justify-center gap-4 py-8 mb-8 opacity-20">
          <div className="h-[2px] w-12 bg-black"></div>
          <div className="flex gap-1 transform rotate-[-45deg]">
            <div className="w-[2px] h-4 bg-black"></div>
            <div className="w-[2px] h-4 bg-black"></div>
            <div className="w-[2px] h-4 bg-black"></div>
          </div>
          <div className="h-[2px] w-12 bg-black"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
