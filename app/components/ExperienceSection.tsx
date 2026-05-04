import { prisma } from "@/lib/prisma";
import React from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const ExperienceSection = async () => {
  const experiences = await prisma.experience.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <section id="experience" className="py-32 px-12 bg-white font-[family-name:var(--font-space-grotesk)]">
      <div className="max-w-4xl mx-auto">
        
        {/* Simplified Header */}
        <div className="mb-24 text-center">
          <div className="inline-block border-[5px] border-black px-12 md:px-16 py-4 mb-24 bg-white ">
           <h2 className="text-2xl font-bold tracking-[0.4em] uppercase text-black">
              Professional Path
           </h2>
        </div>
          <div className="h-0.5 w-12 bg-black mx-auto"></div>
        </div>

        {/* Clean Timeline */}
        <div className="space-y-16 relative">
          {/* Vertical Guide Line */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gray-100 md:left-1/2 md:-ml-[0.5px] hidden md:block"></div>

          {experiences.map((exp, index) => (
            <div 
              key={exp.id} 
              className={`relative flex flex-col md:flex-row gap-8 md:gap-24 group ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-[-5px] md:left-1/2 md:-ml-1.5 top-0 w-3 h-3 bg-white border-2 border-black rounded-full z-10 transition-transform duration-500 group-hover:scale-150 group-hover:bg-black"></div>

              {/* Experience Card */}
              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4ec9b0]">
                      {exp.period}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 leading-none">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-semibold text-gray-400">
                      {exp.company}
                    </p>
                  </div>

                  <div className={`flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                    <div className="flex items-center gap-1">
                       <MapPin size={12} />
                       <span>{exp.location}</span>
                    </div>
                  </div>

                  <p className="text-gray-500 text-sm leading-relaxed max-w-md mx-auto md:mx-0 inline-block font-medium">
                    {exp.description}
                  </p>
                </div>
              </div>

              {/* Empty Space for alignment on Desktop */}
              <div className="w-1/2 hidden md:block"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExperienceSection;
