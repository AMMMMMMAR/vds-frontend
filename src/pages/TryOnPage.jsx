import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, LayoutGrid } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import GarmentSelector from '../components/tryon/GarmentSelector';
import FittingRoomPanel from '../components/tryon/FittingRoomPanel';

export default function TryOnPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-8">
        <div className="container-main">

          {/* Top bar */}
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
              <span className="label-tag">Step 4 of 4</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-on-surface-variant/60">
              <LayoutGrid className="w-3.5 h-3.5" />
              Virtual Fitting Room
            </div>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-8"
          >
            <h1 className="text-4xl sm:text-5xl font-black text-on-surface tracking-tight mb-2">
              Virtual <span className="gradient-text">Try-On</span>
            </h1>
            <p className="text-body">
              Curated ensemble matched to your V-Model measurements and colour profile.
            </p>
          </motion.div>

          {/* Step progress */}
          <div className="flex gap-1.5 mb-10">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="h-1 flex-1 rounded-full bg-primary" />
            ))}
          </div>

          {/* 3-panel layout on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:items-start">

            {/* Garment selector — left panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              <div className="bg-surface-container rounded-2xl border border-outline-variant/10 p-5">
                <p className="text-xs text-label text-primary/70 mb-4">Select Garments</p>
                <GarmentSelector />
              </div>
            </motion.div>

            {/* Fitting room — center + right panels */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="lg:col-span-2"
            >
              <FittingRoomPanel />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
