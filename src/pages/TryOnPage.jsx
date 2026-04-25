import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, LayoutGrid } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import AvatarPanel from '../components/tryon/AvatarPanel';
import SmartFitSelection from '../components/tryon/SmartFitSelection';

export default function TryOnPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-8">
        <div className="container-main max-w-[1600px]">

          {/* Top nav */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
          >
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/results')}
                className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-on-surface transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Results
              </button>
            </div>
          </motion.div>

          {/* 50/50 layout on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:items-start h-[calc(100vh-160px)]">

            {/* Left panel — Avatar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="h-full flex flex-col"
            >
              <AvatarPanel />
            </motion.div>

            {/* Right panel — SmartFit Selection */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="h-full"
            >
              <SmartFitSelection />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
