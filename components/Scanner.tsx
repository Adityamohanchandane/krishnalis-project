"use client";

import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { Scan, ShieldAlert, CheckCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Scanner({ onScanSuccess }: { onScanSuccess: (text: string) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    let controls: any = null;

    const startScanning = async () => {
      try {
        setScanning(true);
        const videoInputDevices = await BrowserMultiFormatReader.listVideoInputDevices();
        
        if (videoInputDevices.length === 0) {
          setError("No camera found. Camera permission is required to scan your identity card.");
          setScanning(false);
          return;
        }

        const selectedDeviceId = videoInputDevices[0].deviceId;
        
        if (videoRef.current) {
          controls = await codeReader.decodeFromVideoDevice(
            selectedDeviceId,
            videoRef.current,
            (result, err) => {
              if (result) {
                onScanSuccess(result.getText());
                if (controls) {
                  controls.stop();
                }
              }
            }
          );
        }
      } catch (err: any) {
        setError(err.message || "Failed to start camera. Please ensure permissions are granted.");
        setScanning(false);
      }
    };

    startScanning();

    return () => {
      if (controls) {
        controls.stop();
      }
    };
  }, [onScanSuccess]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-blue-500/30 glow-box bg-black/50 aspect-video flex items-center justify-center">
      {error ? (
        <div className="flex flex-col items-center text-center p-6 text-red-400">
          <ShieldAlert className="w-12 h-12 mb-4" />
          <p>{error}</p>
        </div>
      ) : (
        <>
          <video ref={videoRef} className="w-full h-full object-cover" />
          
          {/* Scanning Overlay */}
          <div className="absolute inset-0 pointer-events-none border-4 border-transparent">
            <div className="absolute inset-1/4 border-2 border-blue-500/50 rounded-lg">
              {/* Animated scan line */}
              <motion.div
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-0.5 bg-blue-400 shadow-[0_0_10px_#60a5fa]"
              />
            </div>
            
            {/* Corner markers */}
            <div className="absolute top-1/4 left-1/4 w-8 h-8 border-t-4 border-l-4 border-blue-500 -translate-x-1 -translate-y-1"></div>
            <div className="absolute top-1/4 right-1/4 w-8 h-8 border-t-4 border-r-4 border-blue-500 translate-x-1 -translate-y-1"></div>
            <div className="absolute bottom-1/4 left-1/4 w-8 h-8 border-b-4 border-l-4 border-blue-500 -translate-x-1 translate-y-1"></div>
            <div className="absolute bottom-1/4 right-1/4 w-8 h-8 border-b-4 border-r-4 border-blue-500 translate-x-1 translate-y-1"></div>
          </div>
        </>
      )}

      {scanning && !error && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 text-sm text-gray-300">
            <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
            Position your ID card within the frame
          </div>
        </div>
      )}
    </div>
  );
}
