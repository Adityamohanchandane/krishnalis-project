"use client";

import { motion } from "framer-motion";
import { UserCheck, Clock, UserX, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/components/providers/AuthProvider";

export default function StudentHistory() {
  const { user } = useAuth();

  const historyData = [
    { date: "10 September 2026", time: "08:45 AM", status: "present", class: "10-A", campusVerified: true },
    { date: "9 September 2026", time: "09:05 AM", status: "late", class: "10-A", campusVerified: true },
    { date: "8 September 2026", time: "08:30 AM", status: "present", class: "10-A", campusVerified: true },
    { date: "7 September 2026", time: "08:40 AM", status: "present", class: "10-A", campusVerified: true },
    { date: "6 September 2026", time: "-", status: "absent", class: "10-A", campusVerified: false },
    { date: "5 September 2026", time: "08:35 AM", status: "present", class: "10-A", campusVerified: true },
    { date: "4 September 2026", time: "08:50 AM", status: "present", class: "10-A", campusVerified: true },
    { date: "3 September 2026", time: "08:45 AM", status: "present", class: "10-A", campusVerified: true },
    { date: "2 September 2026", time: "09:10 AM", status: "late", class: "10-A", campusVerified: true },
    { date: "1 September 2026", time: "08:30 AM", status: "present", class: "10-A", campusVerified: true },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <UserCheck className="w-5 h-5 text-green-400" />;
      case "late":
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case "absent":
        return <UserX className="w-5 h-5 text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-500/20 text-green-400";
      case "late":
        return "bg-yellow-500/20 text-yellow-400";
      case "absent":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link 
          href="/student/dashboard"
          className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance History</h1>
          <p className="text-gray-400 mt-1">View your complete attendance record</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card"
      >
        <div className="space-y-4">
          {historyData.map((record, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-colors gap-4"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(record.status)}`}>
                  {getStatusIcon(record.status)}
                </div>
                <div>
                  <p className="font-medium">{record.date}</p>
                  <p className="text-xs text-gray-400">Class {record.class} • Check-in: {record.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {record.campusVerified && (
                  <div className="flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-lg border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"></div>
                    <span className="text-xs font-medium text-gray-300">Campus Verified</span>
                  </div>
                )}
                <span className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize ${getStatusColor(record.status)}`}>
                  {record.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
