"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Scanner from "@/components/Scanner";
import { MapPin, CheckCircle, ShieldAlert, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";

type ScanState = "IDLE" | "SCANNING" | "VERIFYING" | "SUCCESS" | "ERROR";

export default function AttendancePage() {
  const [scanState, setScanState] = useState<ScanState>("IDLE");
  const [errorMessage, setErrorMessage] = useState("");
  const [studentInfo, setStudentInfo] = useState<any>(null);

  const requestLocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser"));
      } else {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        });
      }
    });
  };

  const handleScanSuccess = async (text: string) => {
    if (scanState !== "SCANNING") return;
    setScanState("VERIFYING");
    
    try {
      // 1. Request location permission immediately after scan
      let lat = null;
      let lng = null;
      try {
        const position = await requestLocation();
        lat = position.coords.latitude;
        lng = position.coords.longitude;
      } catch (locErr) {
        console.warn("Location not provided:", locErr);
        // Note: We proceed even if location fails, but backend policy might reject it
      }

      // 2. Send to backend
      const res = await fetch("/api/attendance/check-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: text, lat, lng })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Verification failed");
      }

      // 3. Success
      setStudentInfo(data);
      setScanState("SUCCESS");
      
      // Fire confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#60a5fa', '#ffffff']
      });

    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred");
      setScanState("ERROR");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mark Attendance</h1>
        <p className="text-gray-400 mt-1">Scan your identity card to record your attendance securely.</p>
      </div>

      <div className="relative min-h-[500px]">
        <AnimatePresence mode="wait">
          
          {scanState === "IDLE" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card flex flex-col items-center text-center p-12"
            >
              <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 mb-6 glow-box">
                <MapPin className="w-10 h-10 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Location Permission</h2>
              <p className="text-gray-400 max-w-md mb-8">
                Your institution's policy requires location verification to ensure you are on campus. 
                When prompted, please allow location access.
              </p>
              <button
                onClick={() => setScanState("SCANNING")}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-full font-bold shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all"
              >
                Start Scanning
              </button>
            </motion.div>
          )}

          {scanState === "SCANNING" && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Scanner onScanSuccess={handleScanSuccess} />
            </motion.div>
          )}

          {scanState === "VERIFYING" && (
            <motion.div
              key="verifying"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass-card flex flex-col items-center justify-center p-16 h-full min-h-[400px]"
            >
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
              <h2 className="text-xl font-bold mb-2">Verifying Identity</h2>
              <p className="text-gray-400">Validating location and recording attendance...</p>
            </motion.div>
          )}

          {scanState === "SUCCESS" && studentInfo && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card flex flex-col items-center text-center p-12 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-blue-500/5 z-0"></div>
              
              <div className="relative z-10">
                <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30 mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                  <CheckCircle className="w-12 h-12 text-green-400" />
                </div>
                
                <h2 className="text-3xl font-black text-white mb-2 tracking-tight">ATTENDANCE RECORDED</h2>
                
                <div className="mt-8 bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 w-full max-w-sm text-left">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg border border-blue-400">
                      {studentInfo.student.fullName[0]}
                    </div>
                    <div>
                      <p className="font-bold text-lg">{studentInfo.student.fullName}</p>
                      <p className="text-sm text-gray-400">Class: {studentInfo.student.class.className}-{studentInfo.student.division}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Date</span>
                      <span className="font-medium text-white">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Check-in Time</span>
                      <span className="font-medium text-white">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Location</span>
                      <span className={`font-medium px-2 py-0.5 rounded text-xs ${studentInfo.locationVerified ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                        {studentInfo.locationVerified ? 'Campus Verified ✓' : 'Outside Campus'}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => window.location.href = "/student/dashboard"}
                  className="mt-8 px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors"
                >
                  Return to Dashboard
                </button>
              </div>
            </motion.div>
          )}

          {scanState === "ERROR" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card flex flex-col items-center text-center p-12 border-red-500/30"
            >
              <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 mb-6 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                <ShieldAlert className="w-10 h-10 text-red-400" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Verification Failed</h2>
              <p className="text-gray-400 max-w-md mb-8">{errorMessage}</p>
              
              <div className="flex gap-4">
                <button
                  onClick={() => setScanState("SCANNING")}
                  className="px-6 py-2 border border-white/20 hover:bg-white/5 rounded-full font-medium transition-colors"
                >
                  Try Again
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
