import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ProfileForm from "./ProfileForm";
import { User, Shield, Terminal } from "lucide-react";

export default async function AdminProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email || "" }
  });

  if (!user) {
    return (
      <div className="p-12 text-center">
        <p className="text-gray-400">Registry error: User not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] font-[family-name:var(--font-space-grotesk)] p-8 lg:p-12">
      <div className="max-w-3xl mx-auto space-y-12">
        
        {/* Header */}
        <header className="flex flex-col gap-4">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white">
                 <User size={20} />
              </div>
              <h1 className="text-4xl font-black uppercase tracking-tighter italic">Profile_Settings //</h1>
           </div>
           <p className="text-gray-400 font-medium">Manage your administrative identity and security protocols.</p>
        </header>

        {/* Security Alert Header */}
        <div className="bg-white border border-black/5 p-8 rounded-[2rem] shadow-sm flex items-center justify-between">
           <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center">
                 <Shield size={24} />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Session Secured</p>
                 <h2 className="text-lg font-bold text-black tracking-tight">{user.email}</h2>
              </div>
           </div>
           <div className="flex items-center gap-2 text-[10px] font-bold text-gray-300 uppercase tracking-widest">
              <Terminal size={14} />
              Identity_Active
           </div>
        </div>

        {/* Dynamic Form */}
        <ProfileForm initialData={{
          name: user.name || "",
          email: user.email || ""
        }} />

      </div>
    </div>
  );
}
