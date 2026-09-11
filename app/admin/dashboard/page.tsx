"use client";

import { motion } from "framer-motion";
import { Users, UserCheck, Clock, UserX } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";

const data = [
  { name: "Mon", present: 400, absent: 24, late: 20 },
  { name: "Tue", present: 430, absent: 13, late: 10 },
  { name: "Wed", present: 410, absent: 28, late: 15 },
  { name: "Thu", present: 440, absent: 10, late: 5 },
  { name: "Fri", present: 390, absent: 45, late: 30 },
];

const stats = [
  { title: "Total Students", value: "454", icon: <Users className="w-6 h-6 text-blue-400" />, change: "+2%" },
  { title: "Present Today", value: "410", icon: <UserCheck className="w-6 h-6 text-green-400" />, change: "90%" },
  { title: "Late Today", value: "15", icon: <Clock className="w-6 h-6 text-yellow-400" />, change: "3%" },
  { title: "Absent Today", value: "29", icon: <UserX className="w-6 h-6 text-red-400" />, change: "7%" },
];

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <div className="text-sm text-gray-400 bg-white/5 px-4 py-2 rounded-full border border-white/10">
          Last updated: Just now
        </div>
      </div>

      {/* Stats Grid */}
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
              <span className="text-sm font-medium text-gray-400 bg-white/5 px-2 py-1 rounded">
                {stat.change}
              </span>
            </div>
            <p className="text-gray-400 text-sm">{stat.title}</p>
            <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card flex flex-col"
        >
          <h3 className="text-lg font-bold mb-6">Weekly Attendance Trend</h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="name" stroke="#ffffff50" />
                <YAxis stroke="#ffffff50" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000000', borderColor: '#3b82f640', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="present" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="absent" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card flex flex-col"
        >
          <h3 className="text-lg font-bold mb-6">Late Arrivals Trend</h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="name" stroke="#ffffff50" />
                <YAxis stroke="#ffffff50" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000000', borderColor: '#eab30840', borderRadius: '8px' }}
                />
                <Line type="monotone" dataKey="late" stroke="#eab308" strokeWidth={3} dot={{ r: 6, fill: '#eab308', strokeWidth: 2, stroke: '#000' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Live Feed Mock */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">Recent Check-ins</h3>
          <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center font-bold text-blue-400">
                  {String.fromCharCode(64 + i)}
                </div>
                <div>
                  <p className="font-medium">Student Name {i}</p>
                  <p className="text-xs text-gray-400">Class 10-A • ID: STU00{i}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-green-400">08:4{i} AM</p>
                <p className="text-xs text-gray-400">Campus Verified</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
