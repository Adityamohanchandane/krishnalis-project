"use client";

import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Calendar, GraduationCap, ArrowLeft, Edit } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/components/providers/AuthProvider";

export default function StudentProfile() {
  const { user } = useAuth();

  const studentData = {
    fullName: "Student Name",
    studentId: "STU123",
    email: user?.email || "student@institution.edu",
    phone: "+91 98765 43210",
    className: "10",
    division: "A",
    rollNumber: "15",
    dateOfBirth: "15 January 2008",
    address: "123 Main Street, City, State - 400001",
    guardianName: "Guardian Name",
    guardianPhone: "+91 98765 43211",
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
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-gray-400 mt-1">View and manage your profile information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-3xl font-bold mb-4 shadow-[0_0_20px_rgba(59,130,246,0.5)]">
              {studentData.fullName.charAt(0)}
            </div>
            <h2 className="text-xl font-bold">{studentData.fullName}</h2>
            <p className="text-gray-400 text-sm mt-1">{studentData.studentId}</p>
            <div className="mt-4 flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              Active
            </div>
            <button className="mt-6 flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-medium transition-all">
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </motion.div>

        {/* Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 glass-card"
        >
          <h3 className="text-lg font-bold mb-6">Personal Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-400">Full Name</p>
                  <p className="font-medium">{studentData.fullName}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="font-medium">{studentData.email}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="font-medium">{studentData.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-400">Date of Birth</p>
                  <p className="font-medium">{studentData.dateOfBirth}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-400">Class & Division</p>
                  <p className="font-medium">{studentData.className}-{studentData.division}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-400">Roll Number</p>
                  <p className="font-medium">{studentData.rollNumber}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-400">Address</p>
                  <p className="font-medium">{studentData.address}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-400">Guardian</p>
                  <p className="font-medium">{studentData.guardianName}</p>
                  <p className="text-xs text-gray-500">{studentData.guardianPhone}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
