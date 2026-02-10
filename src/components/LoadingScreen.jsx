import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  const logs = [
    "[BOOT] INITIALIZING_KERNEL_V4.02",
    "[INFO] LOADING_R3F_SHADERS...",
    "[INFO] OPTIMIZING_DRACO_MESHES...",
    "[INFO] ESTABLISHING_RAG_PIPELINE...",
    "[INFO] INITIATING_60FPS_RENDERER...",
    "[SUCCESS] SYSTEM_READY"
  ];

  useEffect(() => {
    // Percentage Counter Logic
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500); // Small delay after hitting 100
          return 100;
        }
        return prev + 1;
      });
    }, 30); // Speed of loading

    // Terminal Log Sequence Logic
    const logInterval = setInterval(() => {
      setLogIndex((prev) => (prev < logs.length - 1 ? prev + 1 : prev));
    }, 600);

    return () => {
      clearInterval(interval);
      clearInterval(logInterval);
    };
  }, [onComplete]);

  return (
    <motion.div 
      exit={{ opacity: 0, scale: 1.1 }}
      className="fixed inset-0 z-[10000] bg-dark flex flex-col items-center justify-center p-6 text-center"
    >
      {/* Visual Glitch Background Effect */}
      <div className="absolute inset-0 opacity-10 cyber-grid pointer-events-none" />

      <div className="max-w-md w-full">
        {/* The Big Percentage */}
        <motion.h2 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-7xl md:text-9xl font-black text-brand tracking-tighter mb-8"
        >
          {percent}%
        </motion.h2>

        {/* The Terminal Log */}
        <div className="h-6 mb-12">
          <motion.p 
            key={logIndex}
            initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
            className="font-mono text-[10px] md:text-xs text-gray-500 uppercase tracking-[0.3em]"
          >
            {logs[logIndex]}
          </motion.p>
        </div>

        {/* Custom Progress Bar */}
        <div className="w-full bg-white/5 h-[2px] rounded-full overflow-hidden border border-white/5">
          <motion.div 
            className="h-full bg-brand"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;