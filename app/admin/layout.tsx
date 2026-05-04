"use client";

import React from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "./components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-[#fafafa] text-black font-sans antialiased">
        {children}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] text-black font-sans antialiased overflow-hidden">
      
      {/* Shared Admin Sidebar protocol */}
      <AdminSidebar />

      {/* Main Content Workspace */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10">
        <div className="max-w-[1600px] mx-auto min-h-full transition-all duration-500">
           {children}
        </div>
      </main>
    </div>
  );
}
