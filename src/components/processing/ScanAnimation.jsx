import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';
import { usePageFlow, MOCK_ANALYSIS_RESULTS } from '../../hooks/usePageFlow';
import {
  analyzeMeasurements,
  analyzeSkinTone,
  getRecommendation,
  generateAvatar,
  base64ToBlobUrl,
} from '../../lib/api';

// ── Dev flag — controlled by .env (VITE_USE_MOCK=true/false) ─────────────────
// Set VITE_USE_MOCK=true in .env to skip API calls during UI development.
// Set VITE_USE_MOCK=false to test the real backend.
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// ── Stage definitions (visual labels for the progress UI) ────────────────────
const STAGES = [
  {
    id: 'measuring',
    label: 'Geometric Landmark Extraction',
    description: 'Detecting 33 body landmarks and analysing skin chromatics.',
  },
  {
    id: 'recommending',
    label: 'Generating Recommendations & Avatar',
    description: 'Building your sizing profile, colour palette, and 3D digital twin.',
  },
  {
    id: 'assembling',
    label: 'Assembling Your Results',
    description: 'Compiling all measurements and recommendations.',
  },
];

export default function ScanAnimation({ onComplete }) {
  const navigate = useNavigate();
  const {
    uploadedImages, userHeight,
    setAnalysisResults, setAvatarObjUrl,
  } = usePageFlow();

  const [currentStage, setCurrentStage]     = useState(0);
  const [completedStages, setCompletedStages] = useState([]);
  const [progress, setProgress]             = useState(0);
  const [failed, setFailed]                 = useState(false);
  const [failureMessage, setFailureMessage] = useState('');
  const [isRetrying, setIsRetrying]         = useState(false);

  // ── Core pipeline ───────────────────────────────────────────────────────────
  const run = useCallback(async () => {
    setFailed(false);
    setFailureMessage('');
    setCompletedStages([]);
    setProgress(0);

    // ── MOCK MODE ─────────────────────────────────────────────────────────────
    if (USE_MOCK) {
      setCurrentStage(0);
      setProgress(30);
      await new Promise(r => setTimeout(r, 800));
      setCompletedStages(['measuring']);
      setCurrentStage(1);
      setProgress(70);
      await new Promise(r => setTimeout(r, 800));
      setCompletedStages(['measuring', 'recommending']);
      setCurrentStage(2);
      setProgress(100);
      await new Promise(r => setTimeout(r, 500));
      setAnalysisResults(MOCK_ANALYSIS_RESULTS);
      setAvatarObjUrl(null); // mock has no real avatar
      navigate('/results');
      return;
    }

    // ── ROUND 1 — Measurements + Skin Tone (parallel) ─────────────────────────
    setCurrentStage(0);
    setProgress(5);

    const [measResult, skinResult] = await Promise.allSettled([
      analyzeMeasurements(uploadedImages.front, uploadedImages.side, Number(userHeight)),
      analyzeSkinTone(uploadedImages.selfie),
    ]);

    const meas = measResult.status === 'fulfilled'
      ? measResult.value
      : { success: false, user_message: 'Could not connect to the measurement service.' };

    const skin = skinResult.status === 'fulfilled'
      ? skinResult.value
      : { success: false, user_message: 'Could not connect to the skin tone service.' };

    // CRITICAL FAILURE CHECK
    if (!meas.success || !skin.success) {
      const msg = !meas.success ? meas.user_message : skin.user_message;
      setFailureMessage(msg ?? 'Analysis failed. Please check your photos and try again.');
      setFailed(true);
      return;
    }

    setCompletedStages(['measuring']);
    setProgress(45);

    // ── ROUND 2 — Recommendation + Avatar (parallel) ──────────────────────────
    setCurrentStage(1);

    const skinToneLabel = skin.skin_tone.skin_tone;
    const m = meas.measurements;

    const [recResult, avatarResult] = await Promise.allSettled([
      getRecommendation({
        chest_cm:  m.chest_circumference_cm,
        waist_cm:  m.waist_circumference_cm,
        hip_cm:    m.hip_circumference_cm,
        inseam_cm: m.inseam_cm,
        skin_tone: skinToneLabel,
      }),
      generateAvatar(uploadedImages.front),
    ]);

    const rec = recResult.status === 'fulfilled'
      ? recResult.value
      : { success: false, user_message: 'Recommendation service is temporarily unavailable.' };

    const avatar = avatarResult.status === 'fulfilled'
      ? avatarResult.value
      : { success: false };

    // CRITICAL FAILURE CHECK (recommendation)
    if (!rec.success) {
      setFailureMessage(rec.user_message ?? 'Recommendation failed. Please try again.');
      setFailed(true);
      return;
    }

    setCompletedStages(['measuring', 'recommending']);
    setProgress(85);

    // ── ASSEMBLE RESULTS ──────────────────────────────────────────────────────
    setCurrentStage(2);

    setAnalysisResults({
      measurements: {
        height:    { value: String(userHeight), unit: 'cm' },
        chest:     { value: String(m.chest_circumference_cm), unit: 'cm' },
        waist:     { value: String(m.waist_circumference_cm), unit: 'cm' },
        hips:      { value: String(m.hip_circumference_cm), unit: 'cm' },
        shoulder:  { value: String(m.shoulder_width_cm), unit: 'cm' },
        inseam:    { value: String(m.inseam_cm), unit: 'cm' },
        armLength: { value: String(m.arm_length_cm), unit: 'cm' },
      },
      skinTone: {
        fitzpatrick: skin.skin_tone.skin_tone,
        hex: skin.skin_tone.sampled_hex,
        label: skin.skin_tone.skin_tone,
      },
      sizing: {
        upperBody: rec.recommendation.shirt_size,
        lowerBody: rec.recommendation.pants_size,
      },
      colorPalette: {
        recommended: rec.recommendation.recommended_colors,
        avoid: rec.recommendation.avoid_colors,
      },
      avatarFailed: !avatar.success,
    });

    // Avatar is non-critical — build URL if available, null otherwise
    if (avatar.success && avatar.mesh_base64) {
      setAvatarObjUrl(base64ToBlobUrl(avatar.mesh_base64, 'text/plain'));
    } else {
      setAvatarObjUrl(null);
    }

    setCompletedStages(['measuring', 'recommending', 'assembling']);
    setProgress(100);

    await new Promise(r => setTimeout(r, 600));
    navigate('/results');
  }, [uploadedImages, userHeight, setAnalysisResults, setAvatarObjUrl, navigate]);

  // ── Retry handler ─────────────────────────────────────────────────────────
  const handleRetry = async () => {
    setIsRetrying(true);
    await run();
    setIsRetrying(false);
  };

  // ── Auto-run on mount ────────────────────────────────────────────────────
  useEffect(() => {
    run();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Failure state UI ──────────────────────────────────────────────────────
  if (failed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-amber-400" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-on-surface mb-2">Analysis Could Not Complete</h2>
          <p className="text-sm text-on-surface-variant leading-relaxed max-w-sm">
            {failureMessage}
          </p>
        </div>

        <div className="w-full flex flex-col gap-3">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleRetry}
            disabled={isRetrying}
            className="w-full btn-primary py-4 flex items-center justify-center gap-2 text-sm font-semibold"
          >
            {isRetrying
              ? <Loader2 className="w-4 h-4 animate-spin" />
              : <RefreshCw className="w-4 h-4" />
            }
            {isRetrying ? 'Retrying…' : 'Try Again'}
          </motion.button>

          <button
            onClick={() => navigate('/upload')}
            className="flex items-center justify-center gap-2 text-sm text-on-surface-variant hover:text-on-surface transition-colors py-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Change Photos
          </button>
        </div>

        <p className="text-xs text-on-surface-variant/40">
          Your photos are still saved — no need to re-upload unless you want different photos.
        </p>
      </motion.div>
    );
  }

  // ── Running state UI ──────────────────────────────────────────────────────
  return (
    <div className="flex flex-col items-center gap-10 w-full max-w-lg mx-auto">

      {/* Animated avatar visual */}
      <div className="relative w-40 h-40">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-4 rounded-full border border-primary/30"
        />
        <div className="absolute inset-8 rounded-full bg-gradient-to-br from-primary-container/30 to-primary/10 flex items-center justify-center animate-glow-pulse">
          <span className="text-3xl">⬡</span>
        </div>
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="scan-overlay absolute inset-0" />
        </div>
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(173,198,255,0.08)" strokeWidth="2" />
          <circle
            cx="50" cy="50" r="46" fill="none"
            stroke="url(#progressGrad)" strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 46}`}
            strokeDashoffset={`${2 * Math.PI * 46 * (1 - progress / 100)}`}
            className="transition-all duration-500"
          />
          <defs>
            <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4d8eff" />
              <stop offset="100%" stopColor="#adc6ff" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-primary tabular-nums">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full">
        <div className="progress-track mb-3">
          <div className="progress-fill transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex justify-between text-[11px] text-on-surface-variant/50">
          <span>Processing</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
      </div>

      {/* Stage list */}
      <div className="w-full space-y-3">
        {STAGES.map((stage, i) => {
          const isDone   = completedStages.includes(stage.id);
          const isActive = currentStage === i && !isDone && !failed;
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
