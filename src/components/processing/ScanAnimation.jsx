import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';

const STAGES = [
  {
    id: 'landmark',
    label: 'Geometric Landmark Extraction',
    description: 'Pinpointing 33 key body landmarks with sub-millimeter precision.',
    duration: 1200,
    endPercent: 25,
  },
  {
    id: 'slicing',
    label: 'Mathematical 3D Slicing',
    description: 'Cross-sectional slicing of body volume to calculate circumference.',
    duration: 1400,
    endPercent: 60,
  },
  {
    id: 'chromatic',
    label: 'Chromatic Skin Tone Sampling',
    description: 'Privacy-safe histogram analysis to generate your color profile.',
    duration: 1000,
    endPercent: 82,
  },
  {
    id: 'assembly',
    label: 'Digital Twin Assembly',
    description: 'Assembling your mathematically precise virtual measurement profile.',
    duration: 1200,
    endPercent: 100,
  },
];

export default function ScanAnimation({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [completedStages, setCompletedStages] = useState([]);

  useEffect(() => {
    let stageIdx = 0;
    let startTime = Date.now();
    let startPercent = 0;
    let raf;

    const runStage = (idx) => {
      if (idx >= STAGES.length) {
        setTimeout(() => onComplete?.(), 600);
        return;
      }
      const stage = STAGES[idx];
      stageIdx = idx;
      setCurrentStage(idx);
      startTime = Date.now();
      startPercent = idx === 0 ? 0 : STAGES[idx - 1].endPercent;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const t = Math.min(elapsed / stage.duration, 1);
        const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const current = startPercent + (stage.endPercent - startPercent) * eased;
        setProgress(current);

        if (t < 1) {
          raf = requestAnimationFrame(animate);
        } else {
          setCompletedStages(prev => [...prev, stage.id]);
          setTimeout(() => runStage(idx + 1), 200);
        }
      };
      raf = requestAnimationFrame(animate);
    };

    const timeout = setTimeout(() => runStage(0), 400);
    return () => { clearTimeout(timeout); cancelAnimationFrame(raf); };
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center gap-10 w-full max-w-lg mx-auto">
      {/* Animated avatar visual */}
      <div className="relative w-40 h-40">
        {/* Outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20"
        />
        {/* Middle ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-4 rounded-full border border-primary/30"
        />
        {/* Core */}
        <div className="absolute inset-8 rounded-full bg-gradient-to-br from-primary-container/30 to-primary/10 flex items-center justify-center animate-glow-pulse">
          <span className="text-3xl">⬡</span>
        </div>
        {/* Scan line */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="scan-overlay absolute inset-0" />
        </div>
        {/* Progress arc indicator */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(173,198,255,0.08)" strokeWidth="2" />
          <circle
            cx="50" cy="50" r="46" fill="none"
            stroke="url(#progressGrad)" strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 46}`}
            strokeDashoffset={`${2 * Math.PI * 46 * (1 - progress / 100)}`}
            className="transition-all duration-300"
          />
          <defs>
            <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4d8eff" />
              <stop offset="100%" stopColor="#adc6ff" />
            </linearGradient>
          </defs>
        </svg>
        {/* Percent */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-primary tabular-nums">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full">
        <div className="progress-track mb-3">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex justify-between text-[11px] text-on-surface-variant/50">
          <span>Processing</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
      </div>

      {/* Stages */}
      <div className="w-full space-y-3">
        {STAGES.map((stage, i) => {
          const isDone = completedStages.includes(stage.id);
          const isActive = currentStage === i && !isDone;
          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: i <= currentStage ? 1 : 0.35, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`flex items-start gap-3 p-3.5 rounded-xl transition-all duration-300 ${
                isDone
                  ? 'bg-primary/5 border border-primary/15'
                  : isActive
                    ? 'bg-surface-container border border-outline-variant/20'
                    : 'bg-surface-low/40 border border-transparent'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                ) : isActive ? (
                  <Loader2 className="w-4 h-4 text-primary/80 animate-spin" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-outline-variant/30" />
                )}
              </div>
              <div>
                <p className={`text-sm font-medium ${isDone || isActive ? 'text-on-surface' : 'text-on-surface-variant/50'}`}>
                  {stage.label}
                </p>
                {isActive && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-xs text-on-surface-variant mt-1"
                  >
                    {stage.description}
                  </motion.p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
