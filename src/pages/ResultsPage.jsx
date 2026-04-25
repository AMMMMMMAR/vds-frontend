import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, Download, Share2 } from 'lucide-react';
import { usePageFlow } from '../hooks/usePageFlow';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import MeasurementCard from '../components/results/MeasurementCard';
import SkinToneCard from '../components/results/SkinToneCard';
import SizingCard from '../components/results/SizingCard';
import ColorPalette from '../components/results/ColorPalette';
import tryOnImg from '../assets/try-on.png';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function ResultsPage() {
  const navigate = useNavigate();
  const { analysisResults } = usePageFlow();
  const r = analysisResults;

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="container-main">

          {/* Top bar */}
          <motion.div {...fadeUp(0)} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/upload')}
                className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-on-surface transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <span className="label-tag">Step 3 of 4</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn-secondary py-2 px-4 text-sm flex items-center gap-2">
                <Share2 className="w-4 h-4" /> Share
              </button>
              <button className="btn-secondary py-2 px-4 text-sm flex items-center gap-2">
                <Download className="w-4 h-4" /> Export PDF
              </button>
            </div>
          </motion.div>

          {/* Page header */}
          <motion.div {...fadeUp(0.05)} className="mb-10">
            <h1 className="text-4xl sm:text-5xl font-black text-on-surface tracking-tight mb-3">
              Clinical Analysis <span className="gradient-text">Results</span>
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <p className="text-body">Precision metrics verified across 42 data points.</p>
              <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse-slow" />
                <span className="text-xs font-semibold text-primary">Subject ID: {r.subjectId}</span>
              </div>
            </div>
          </motion.div>

          {/* Step progress */}
          <div className="flex gap-1.5 mb-12">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className={`h-1 flex-1 rounded-full ${n <= 3 ? 'bg-primary' : 'bg-surface-highest'}`} />
            ))}
          </div>

          {/* Main grid: avatar + cards */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* Avatar panel — 2 cols */}
            <motion.div {...fadeUp(0.1)} className="lg:col-span-2">
              <div className="sticky top-24">
                <div className="relative bg-surface-lowest rounded-3xl border border-outline-variant/10 overflow-hidden">
                  {/* Grid bg */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                  {/* Glow */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-32 bg-primary/10 rounded-full blur-3xl" />

                  <img
                    src={tryOnImg}
                    alt="Your Digital Twin"
                    className="relative z-10 w-full object-contain p-6"
                  />

                  {/* Overlay stats */}
                  <div className="relative z-10 p-5 border-t border-outline-variant/10 bg-surface-container/60 backdrop-blur-sm">
                    <p className="text-xs text-label text-primary/70 mb-3">Digital Twin Status</p>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { val: r.confidence + '%', label: 'Confidence' },
                        { val: r.landmarks, label: 'Landmarks' },
                        { val: r.processingTime, label: 'Scan Time' },
                      ].map(s => (
                        <div key={s.label} className="text-center">
                          <p className="text-base font-black text-primary">{s.val}</p>
                          <p className="text-[10px] text-on-surface-variant">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA to try-on */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/try-on')}
                  className="btn-primary w-full mt-5 py-4 flex items-center justify-center gap-2 text-base"
                >
                  Enter Virtual Try-On
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>

            {/* Data cards — 3 cols */}
            <div className="lg:col-span-3 space-y-6">
              <motion.div {...fadeUp(0.15)}>
                <MeasurementCard measurements={r.measurements} />
              </motion.div>
              <motion.div {...fadeUp(0.2)}>
                <SkinToneCard skinTone={r.skinTone} />
              </motion.div>
              <motion.div {...fadeUp(0.25)}>
                <SizingCard sizing={r.sizing} />
              </motion.div>
              <motion.div {...fadeUp(0.3)}>
                <ColorPalette palette={r.colorPalette} />
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
