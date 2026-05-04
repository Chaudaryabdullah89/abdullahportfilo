"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  Cpu, 
  Settings, 
  LogOut, 
  Code2, 
  MessageSquare,
  Users,
  Target,
  User
} from "lucide-react";

const AdminSidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { id: "projects", label: "Projects", icon: Briefcase, path: "/admin/projects" },
    { id: "blogs", label: "Blog", icon: FileText, path: "/admin/blogs" },
    { id: "inquiries", label: "Inquiries", icon: Target, path: "/admin/inquiries" },
    { id: "skills", label: "Skills", icon: Code2, path: "/admin/skills" },
    { id: "experience", label: "Experience", icon: Cpu, path: "/admin/experience" },
    { id: "subscribers", label: "Subscribers", icon: Users, path: "/admin/subscribers" },
    { id: "messages", label: "Messages", icon: MessageSquare, path: "/admin/messages" },
    { id: "profile", label: "Account Profile", icon: User, path: "/admin/profile" },
    { id: "settings", label: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  const getIsActive = (path: string) => {
    if (path === "/admin/dashboard" && pathname === "/admin/dashboard") return true;
    if (path !== "/admin/dashboard" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <aside className="w-72 bg-white/70 backdrop-blur-xl border-r border-gray-200/50 flex flex-col sticky top-0 h-screen shrink-0 antialiased">
      
      {/* Refined Pro Header */}
      <div className="p-10 pb-6">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-black rounded-xl flex items-center justify-center shadow-lg shadow-black/10">
              <span className="text-white text-xs font-black tracking-tighter">A.</span>
           </div>
           <div>
              <h1 className="font-bold text-[15px] tracking-tight text-gray-900 leading-none">Admin Hub</h1>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest mt-1">System Control</p>
           </div>
        </div>
      </div>

      {/* Modern Floating Navigation */}
      <nav className="flex-1 px-6 space-y-1.5 mt-8">
        {menuItems.map((item) => {
          const isActive = getIsActive(item.path);
          return (
            <Link 
              key={item.id}
              href={item.path}
              className={`flex items-center gap-3.5 px-5 py-3 rounded-2xl text-[14px] font-semibold transition-all duration-300 group ${
                isActive 
                ? "bg-black text-white shadow-xl shadow-black/10 translate-x-1" 
                : "text-gray-500 hover:text-black hover:bg-gray-100/80"
              }`}
            >
              <item.icon size={18} className={`${isActive ? "text-white" : "text-gray-400 group-hover:text-black"} transition-colors`} />
              {item.label}
              {item.id === "messages" && !isActive && (
                <div className="ml-auto w-2 h-2 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Refined Footer Utility */}
      <div className="p-8 mt-auto">
        <Link 
          href="/"
          className="flex items-center gap-3.5 px-5 py-4 text-[13px] font-bold text-gray-400 hover:text-black transition-all rounded-2xl bg-gray-50/50 border border-transparent hover:border-gray-200 hover:bg-white hover:shadow-sm"
        >
          <LogOut size={18} className="rotate-180 opacity-60" />
          Return to Site
        </Link>
      </div>

    </aside>
  );
};

export default AdminSidebar;
