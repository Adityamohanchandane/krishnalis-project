"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function DashboardRedirect() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else {
        // Since Firebase Auth doesn't have custom claims by default without custom setup,
        // we might need to fetch the user document from Firestore to know the role.
        // For now, let's assume if it's the admin email, go to admin, else student.
        if (user.email === "sirsathkrushnali@gmail.com") {
          router.push("/admin/dashboard");
        } else {
          router.push("/student/dashboard");
        }
      }
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
    </div>
  );
}
