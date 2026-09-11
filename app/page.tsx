"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Background from "@/components/3d/Background";
import { ArrowRight, Scan, ShieldCheck, Clock, CheckCircle } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "OPEN",
    desc: "Student opens the attendance system.",
    icon: <ArrowRight className="w-6 h-6 text-blue-400" />,
  },
  {
    num: "02",
    title: "SCAN",
    desc: "Student scans their identity card using the webcam.",
    icon: <Scan className="w-6 h-6 text-blue-400" />,
  },
  {
    num: "03",
    title: "VERIFY",
    desc: "System verifies identity, time and configured campus location.",
    icon: <ShieldCheck className="w-6 h-6 text-blue-400" />,
  },
  {
    num: "04",
    title: "RECORD",
    desc: "Attendance is securely saved to the database.",
    icon: <CheckCircle className="w-6 h-6 text-blue-400" />,
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen relative overflow-hidden text-white selection:bg-blue-500/30">
      <Background />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <nav className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold tracking-tighter flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center glow-box">
              <Scan className="w-5 h-5 text-white" />
            </div>
            NEXUS<span className="text-blue-400">ATTEND</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-4"
          >
            <Link href="/login" className="px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium">
              Staff Login
            </Link>
            <Link href="/login" className="px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-500 transition-colors text-sm font-medium shadow-[0_0_15px_rgba(37,99,235,0.5)]">
              Student Login
            </Link>
          </motion.div>
        </nav>

        <div className="flex flex-col items-center text-center mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Secure. Verified. Simple.</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-black tracking-tight mb-6"
          >
            Smart <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Attendance.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-400 max-w-2xl mb-12"
          >
            Modern student attendance powered by secure identity verification, time tracking and optional campus verification.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/login" className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-100 transition-transform hover:scale-105 flex items-center gap-2">
              Mark Attendance <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        <div className="mt-40">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400">Four simple steps to secure attendance</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-4 text-6xl font-black text-white/[0.03] group-hover:text-blue-500/[0.05] transition-colors">
                  {step.num}
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
