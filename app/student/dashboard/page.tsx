"use client";

import { motion } from "framer-motion";
import { UserCheck, Clock, UserX, Scan, Calendar } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/components/providers/AuthProvider";

export default function StudentDashboard() {
  const { user } = useAuth();

  const stats = [
    { title: "Attendance %", value: "92%", icon: <UserCheck className="w-6 h-6 text-blue-400" />, subtitle: "On track" },
    { title: "Present", value: "45", icon: <Calendar className="w-6 h-6 text-green-400" />, subtitle: "Days" },
    { title: "Absent", value: "3", icon: <UserX className="w-6 h-6 text-red-400" />, subtitle: "Days" },
    { title: "Late", value: "1", icon: <Clock className="w-6 h-6 text-yellow-400" />, subtitle: "Days" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome, {user?.email?.split('@')[0] || 'Student'}</h1>
          <p className="text-gray-400 mt-1">Here is your attendance overview.</p>
        </div>
        <Link 
          href="/student/attendance"
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)]"
        >
          <Scan className="w-5 h-5" />
          MARK ATTENDANCE
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                {stat.icon}
              </div>
            </div>
            <p className="text-gray-400 text-sm">{stat.title}</p>
            <div className="flex items-end gap-2 mt-1">
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <span className="text-sm text-gray-500 mb-1">{stat.subtitle}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">Recent History</h3>
          <Link href="/student/history" className="text-sm text-blue-400 hover:text-blue-300">View Full History</Link>
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-colors gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${i === 2 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                  {i === 2 ? <Clock className="w-5 h-5" /> : <UserCheck className="w-5 h-5" />}
                </div>
                <div>
                  <p className="font-medium">10 September 2026</p>
                  <p className="text-xs text-gray-400">Class 10-A • Check-in: {i === 2 ? '09:05' : '08:45'} AM</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-lg border border-white/10">
                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"></div>
                <span className="text-xs font-medium text-gray-300">Campus Verified</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
