"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Scan, 
  History, 
  User, 
  LogOut 
} from "lucide-react";
import Background from "@/components/3d/Background";

const sidebarLinks = [
  { name: "Dashboard", href: "/student/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { name: "Mark Attendance", href: "/student/attendance", icon: <Scan className="w-5 h-5 text-blue-400" /> },
  { name: "History", href: "/student/history", icon: <History className="w-5 h-5" /> },
  { name: "Profile", href: "/student/profile", icon: <User className="w-5 h-5" /> },
];

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (user.email === "sirsathkrushnali@gmail.com") {
        router.push("/admin/dashboard");
      }
    }
  }, [loading, user, router]);

  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      <Background />
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 glass flex flex-col z-20">
        <div className="p-6 border-b border-white/10">
          <Link href="/student/dashboard" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center glow-box">
              <Scan className="w-4 h-4 text-white" />
            </div>
            NEXUS<span className="text-blue-400">STUDENT</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive 
                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/30 glow-box" 
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.icon}
                <span className="font-medium">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={async () => {
              if (auth) {
                await signOut(auth);
              }
              router.push("/login");
            }}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden z-10 relative">
        <header className="h-16 border-b border-white/10 glass flex items-center justify-end px-8">
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">{user?.email}</p>
              <p className="text-xs text-blue-400">STUDENT</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-blue-600 border border-blue-400 flex items-center justify-center text-sm font-bold">
              {user?.email?.[0].toUpperCase()}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
