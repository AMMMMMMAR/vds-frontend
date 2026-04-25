import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Lock } from 'lucide-react';
import { usePageFlow } from '../hooks/usePageFlow';
import ScanAnimation from '../components/processing/ScanAnimation';

export default function ProcessingPage() {
  const navigate = useNavigate();
  const { setProcessingComplete } = usePageFlow();

  const handleComplete = useCallback(() => {
    setProcessingComplete(true);
    navigate('/results');
  }, [navigate, setProcessingComplete]);

  return (
    <div className="min-h-screen bg-surface-lowest flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="orb w-[500px] h-[500px] bg-primary/6 top-[-200px] left-1/2 -translate-x-1/2" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* Scan line across full page */}
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent top-1/2 scan-overlay pointer-events-none" />

      <div className="relative z-10 w-full max-w-xl mx-auto px-4 py-16 flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="label-tag mb-5 inline-block">Step 2 of 4</span>
          <h1 className="text-4xl sm:text-5xl font-black text-on-surface tracking-tight mt-4 mb-4">
            Analyzing <span className="gradient-text">Data...</span>
          </h1>
          <p className="text-body max-w-md mx-auto">
            Please hold still while we process your biometric markers to generate a precise 3D measurement model.
          </p>
        </motion.div>

        {/* Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full"
        >
          <ScanAnimation onComplete={handleComplete} />
        </motion.div>

        {/* Privacy notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left"
        >
          <div className="flex items-center gap-2 text-xs text-on-surface-variant/60">
            <Lock className="w-3.5 h-3.5 text-primary/50" />
            <span>End-to-end encrypted processing</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-outline-variant/30" />
          <div className="flex items-center gap-2 text-xs text-on-surface-variant/60">
            <Shield className="w-3.5 h-3.5 text-primary/50" />
            <span>No photos stored or transmitted</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
