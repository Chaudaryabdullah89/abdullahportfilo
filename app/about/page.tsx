import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, User, Code2, Rocket, Heart } from "lucide-react";
import Footer from "../components/Footer";
export default async function AboutPage() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "global" }
  });

  return (
    <main className="min-h-screen bg-white text-black font-[family-name:var(--font-space-grotesk)]">
      
      {/* Navigation */}
      <nav className="p-8 flex justify-between items-center max-w-[1400px] mx-auto">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:pl-2 transition-all group"
        >
          <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          Home
        </Link>
        <div className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-30 font-[family-name:var(--font-jetbrains-mono)]">
          // current_path: ~/about
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24 px-8 max-w-[1200px] mx-auto text-center" data-reveal="fade-up">
        <div className="inline-block border-[8px] border-black px-16 py-6 mb-12">
          <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-none">
            About Me
          </h1>
        </div>
        <p className="text-xl md:text-3xl font-medium max-w-[800px] mx-auto leading-tight text-gray-500 font-[family-name:var(--font-jetbrains-mono)] italic">
          "{settings?.heroTitle || "Crafting digital experiences with precision and code-first thinking."}"
        </p>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-[#1a1c1e] text-white">
        <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-20">
          <div data-reveal="fade-up">
            <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#4ec9b0] mb-8">
              // The_Story
            </h2>
            <div className="space-y-6 text-gray-400 leading-relaxed font-light text-lg">
              <p>
                My journey into software development started with a curiosity about how things work behind the screen. Over the years, that curiosity has turned into a passion for building robust, scalable applications that solve real-world problems.
              </p>
              <p>
                I specialize in full-stack development, with a deep focus on creating clean, maintainable code architectures. For me, coding isn't just about making things work—it's about making them elegant and efficient.
              </p>
              <p>
                When I'm not in front of a screen, I'm usually exploring new technologies, contributing to open-source projects, or refining my design skills to bridge the gap between form and function.
              </p>
            </div>
          </div>
          <div className="relative" data-reveal="image">
             <div className="absolute inset-0 border-2 border-white/10 translate-x-4 translate-y-4"></div>
             <div className="relative aspect-[4/5] bg-gray-800 overflow-hidden border border-white/20">
                <img 
                   src="https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2070&auto=format&fit=crop" 
                   alt="Work Desk" 
                   className="w-full h-full object-cover grayscale opacity-50 transition-all hover:grayscale-0 hover:opacity-100 duration-1000"
                />
                <div className="absolute inset-0 flex items-center justify-center p-12">
                   <Code2 size={120} className="text-white/10" />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-32 px-8 max-w-[1200px] mx-auto">
        <div className="text-center mb-24" data-reveal="fade-up">
           <h2 className="text-4xl font-black uppercase tracking-widest mb-4">Milestones</h2>
           <div className="h-1 w-24 bg-black mx-auto"></div>
        </div>

        <div className="space-y-12" data-reveal="stagger">
           {[
             { year: "2024", title: "Full Stack Developer", company: "Freelance", desc: "Developing enterprise-level systems like Hostel Management Software." },
             { year: "2023", title: "Web Developer Intern", company: "Tech Solutions", desc: "Focused on frontend architecture and optimizing React performance." },
             { year: "2022", title: "Computer Science Degree", company: "University", desc: "Mastering algorithms, data structures, and the foundations of logic." }
           ].map((item, index) => (
             <div key={index} className="flex flex-col md:flex-row border-l-4 border-black pl-8 py-4 items-start group hover:bg-gray-50 transition-colors">
                <div className="w-32 text-2xl font-black opacity-20 group-hover:opacity-100 transition-opacity">
                   {item.year}
                </div>
                <div className="flex-1">
                   <h3 className="text-xl font-bold uppercase tracking-widest mb-2">{item.title}</h3>
                   <p className="text-gray-400 font-bold text-sm mb-4 font-[family-name:var(--font-jetbrains-mono)]">// {item.company}</p>
                   <p className="text-gray-600 max-w-[600px]">{item.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-[#f3f3f3]">
         <div className="max-w-[1200px] mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12" data-reveal="stagger">
               {[
                 { icon: <Rocket />, title: "Precision", desc: "Every line of code is written with intent and purpose." },
                 { icon: <User />, title: "User-First", desc: "Designing for humans, implemented through clean logic." },
                 { icon: <Heart />, title: "Passion", desc: "Driven by the challenge of complex problem solving." }
               ].map((value, i) => (
                 <div key={i} className="bg-white p-12 border-b-8 border-black shadow-sm flex flex-col items-center text-center">
                    <div className="mb-6 scale-150 text-gray-300">{value.icon}</div>
                    <h4 className="text-xl font-bold uppercase tracking-widest mb-4">{value.title}</h4>
                    <p className="text-gray-500 text-sm font-[family-name:var(--font-jetbrains-mono)] leading-relaxed">{value.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 text-center px-8" data-reveal="fade-up">
         <h2 className="text-2xl font-bold uppercase tracking-widest mb-12">Let's build something extraordinary</h2>
         <Link href="/hire" className="inline-block border-[4px] border-black px-12 py-4 text-sm font-bold uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all">
           Hire Me
         </Link>
      </section>

      <Footer settings={settings} />
    </main>
  );
}
