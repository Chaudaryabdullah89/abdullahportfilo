import { prisma } from "@/lib/prisma";
import * as LucideIcons from "lucide-react";
import { ProgrammingIcons } from "./ProgrammingIcons";

// Helper to get Icon component with fuzzy matching for names
const getIcon = (iconName: string, skillName: string) => {
  const normalizedSkillName = skillName.toLowerCase().replace(/[^a-z0-9]/g, "");
  
  if (ProgrammingIcons[normalizedSkillName]) {
    return ProgrammingIcons[normalizedSkillName];
  }

  const normalizedIconName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
  const IconComponent = (LucideIcons as any)[normalizedIconName] || LucideIcons.Code;
  return IconComponent;
};

const SkillsSection = async () => {
  const allSkills = await prisma.skill.findMany({
    orderBy: { order: "asc" },
  });

  const usingNow = allSkills.filter(s => s.category === "Frontend" || s.category === "Backend");
  const learning = allSkills.filter(s => s.category === "Learning" || s.category === "DevOps");
  const otherSkills = allSkills.filter(s => s.category === "Tools" || s.category === "Design" || s.category === "Other");

  const skillGroups = [
    { label: "USING NOW:", skills: usingNow },
    { label: "LEARNING:", skills: learning },
    { label: "OTHER SKILLS:", skills: otherSkills }
  ].filter(group => group.skills.length > 0); // PRE-FILTER for hydration stability

  return (
    <section id="skills" className="w-full bg-[#f8f8f8] py-32 px-12 font-[family-name:var(--font-space-grotesk)] relative overflow-hidden">
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_0%,_#f0f0f0_100%)] opacity-80 pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto text-center relative z-10">
        
        <div className="flex items-center justify-center gap-4 mb-12 opacity-40">
           <div className="w-12 h-[1px] bg-black"></div>
           <div className="flex items-center">
              <div className="w-1 h-1 bg-black rotate-45"></div>
              <div className="w-3 h-3 border border-black rotate-45 -mx-1"></div>
              <div className="w-1 h-1 bg-black rotate-45"></div>
           </div>
           <div className="w-12 h-[1px] bg-black"></div>
        </div>

        <div className="inline-block border-[5px] border-black px-12 md:px-16 py-4 mb-24 bg-white ">
           <h2 className="teext-2xl font-bold tracking-[0.4em] uppercase text-black">
              Skills
           </h2>
        </div>

        <div className="space-y-32">
           {skillGroups.map((group) => (
             <div key={group.label} className="space-y-16">
                
                <h3 className="text-xl font-black tracking-[0.2em] text-black text-center uppercase">
                   {group.label}
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-16 gap-x-8 max-w-4xl mx-auto" data-reveal="stagger">
                   {group.skills.map((skill) => {
                     const Icon = getIcon(skill.icon, skill.name);
                     return (
                        <div key={skill.id} className="flex flex-col items-center gap-8 group">
                           <div className="relative w-24 h-24 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                              <div className="text-black/80 group-hover:text-black transition-colors flex items-center justify-center w-full h-full">
                                {skill.image ? (
                                   <img src={skill.image} alt={skill.name} className="w-16 h-16 object-contain grayscale group-hover:grayscale-0 transition-all" />
                                ) : (
                                   <Icon size={56} className="stroke-[1.5px]" />
                                )}
                              </div>
                              <div className="absolute inset-0 border-2 border-dashed border-black/5 rounded-full rotate-0 group-hover:rotate-90 group-hover:border-black/20 transition-all duration-1000 scale-110 pointer-events-none"></div>
                           </div>
                           <p className="text-[10px] font-black tracking-[0.3em] text-gray-400 group-hover:text-black transition-colors uppercase font-[family-name:var(--font-jetbrains-mono)]">
                              {skill.name}
                           </p>
                        </div>
                     );
                   })}
                </div>

             </div>
           ))}
        </div>

      </div>
    </section>
  );
};

export default SkillsSection;
