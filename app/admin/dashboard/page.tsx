import { prisma } from "@/lib/prisma";
import { Eye, MessageSquare, Folder, Users, Layers, Award } from "lucide-react";
import AvailabilityToggle from "../components/AvailabilityToggle";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [
    projectCount, 
    blogCount, 
    skillCount, 
    experienceCount, 
    subscriberCount,
    messageCount,
    recentProjects, 
    recentMessages,
    settings
  ] = await Promise.all([
    prisma.project.count(),
    prisma.blog.count(),
    prisma.skill.count(),
    prisma.experience.count(),
    prisma.subscriber.count(),
    prisma.contactMessage.count(),
    prisma.project.findMany({ 
      orderBy: { createdAt: "desc" },
      take: 3
    }),
    prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 3
    }),
    prisma.siteSettings.findUnique({ where: { id: "global" } })
  ]);

  const stats = [
    { label: "Active Projects", value: projectCount.toString(), icon: <Folder size={20} />, change: "Live Port" },
    { label: "Published Blogs", value: blogCount.toString(), icon: <Layers size={20} />, change: "Feed" },
    { label: "Active Leads", value: messageCount.toString(), icon: <MessageSquare size={20} />, change: "In-Review" },
    { label: "Network Growth", value: subscriberCount.toString(), icon: <Users size={20} />, change: "Subscribers" },
  ];

  return (
    <div className="space-y-12">
      
      {/* Header */}
      <header className="flex justify-between items-end">
        <div>
           <h1 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] mb-2">// site_overview</h1>
           <h2 className="text-4xl font-black uppercase tracking-tighter italic">Dashboard.</h2>
        </div>
        <div className="text-[10px] font-bold uppercase opacity-30">
           Last Updated: {new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 border border-black/5 hover:border-black transition-all group shadow-[0px_10px_30px_rgba(0,0,0,0.02)]">
             <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-black/5 group-hover:bg-black group-hover:text-white transition-colors">
                   {stat.icon}
                </div>
                <span className="text-[10px] font-bold text-[#4ec9b0]">{stat.change}</span>
             </div>
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{stat.label}</p>
             <h3 className="text-3xl font-black uppercase tracking-tighter">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
        
        {/* Recent Inquiries */}
        <div className="lg:col-span-8 space-y-12">
           <div className="bg-white p-10 border border-black/5">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-10 pb-4 border-b border-black/5 flex justify-between items-center">
                 <span>Recent Messages</span>
                 {messageCount > 0 && <span className="bg-[#4ec9b0] text-[10px] px-3 py-1 text-black font-black uppercase">Active</span>}
              </h3>
              <div className="space-y-6">
                 {recentMessages.length > 0 ? recentMessages.map((msg) => (
                    <div key={msg.id} className="flex justify-between items-center group cursor-pointer p-4 hover:bg-black/5 transition-all">
                       <div className="flex items-center gap-6">
                          <div className="w-10 h-10 bg-gray-100 flex items-center justify-center font-bold text-xs uppercase overflow-hidden">
                             <span className="text-black/30 font-black">{msg.name.slice(0, 1)}</span>
                          </div>
                          <div>
                             <h4 className="font-bold text-sm uppercase">{msg.name}</h4>
                             <div className="flex gap-2 items-center mt-1">
                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest leading-none">{msg.projectType || "General Contact"}</p>
                                {msg.budget && <span className="text-[9px] bg-black text-white px-2 py-0.5 font-bold uppercase">{msg.budget}</span>}
                             </div>
                          </div>
                       </div>
                       <span className="text-[10px] font-bold text-gray-300 uppercase">
                          {new Date(msg.createdAt).toLocaleDateString()}
                       </span>
                    </div>
                  )) : (
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest py-10 text-center">No messages detected.</p>
                  )}
              </div>
           </div>

           <div className="bg-white p-10 border border-black/5">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-10 pb-4 border-b border-black/5">Recent Projects</h3>
              <div className="space-y-6">
                 {recentProjects.map((project) => (
                    <div key={project.id} className="flex justify-between items-center group cursor-pointer p-4 hover:bg-black/5 transition-all">
                       <div className="flex items-center gap-6">
                          <div className="w-10 h-10 bg-gray-100 flex items-center justify-center font-bold text-xs uppercase overflow-hidden">
                            <img src={project.image} alt="" className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <div>
                             <h4 className="font-bold text-sm uppercase">{project.title}</h4>
                             <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-none mt-1">{project.category}</p>
                          </div>
                       </div>
                       <span className="text-[10px] font-bold text-gray-300 uppercase">
                          {new Date(project.createdAt).toLocaleDateString()}
                       </span>
                    </div>
                  ))}
              </div>
           </div>
        </div>

        {/* Identity Section */}
        <div className="lg:col-span-4 bg-[#121417] p-10 text-white flex flex-col justify-between">
           <div className="space-y-12">
              <h3 className="text-sm font-bold uppercase tracking-widest pb-4 border-b border-white/5 opacity-50">Site Identity</h3>
              <div className="space-y-8">
                 <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2">My Full Name</p>
                    <p className="text-xs font-bold uppercase tracking-tighter text-[#4ec9b0] mb-8">{settings?.heroName || "N/A"}</p>
                    
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2">Professional Title</p>
                    <p className="text-xs font-bold uppercase tracking-tighter text-[#4ec9b0] mb-8">{settings?.heroTitle || "N/A"}</p>
                    
                    <AvailabilityToggle initialStatus={settings?.isAvailable ?? true} />
                 </div>
              </div>
           </div>
           
           <div className="pt-20">
               <div className="p-6 border border-white/10 bg-white/[0.02]">
                  <p className="text-[9px] text-white/40 uppercase tracking-[0.2em] leading-relaxed italic mb-4">
                    Overview Summary:
                  </p>
                  <div className="space-y-2">
                     <div className="flex justify-between text-[10px] font-bold uppercase">
                        <span className="opacity-30">Lead Response Rate</span>
                        <span className="text-[#4ec9b0]">88%</span>
                     </div>
                     <div className="w-full h-[1px] bg-white/5">
                        <div className="w-[88%] h-full bg-[#4ec9b0]"></div>
                     </div>
                  </div>
               </div>
           </div>
        </div>

      </div>
    </div>
  );
}
