import React, { createContext, useContext, useState, useCallback } from 'react';

const PageFlowContext = createContext(null);

// ── Mock data used when VITE_USE_MOCK=true ────────────────────────────────────
// This data stays only here and is only used by ScanAnimation when mock mode is on.
// Remove or ignore once you are testing with the real backend.
export const MOCK_ANALYSIS_RESULTS = {
  measurements: {
    height:    { value: '178', unit: 'cm' },
    chest:     { value: '96',  unit: 'cm' },
    waist:     { value: '82',  unit: 'cm' },
    hips:      { value: '100', unit: 'cm' },
    shoulder:  { value: '44',  unit: 'cm' },
    inseam:    { value: '81',  unit: 'cm' },
    armLength: { value: '62',  unit: 'cm' },
  },
  skinTone: {
    fitzpatrick: 'medium',
    hex: '#C69C82',
    label: 'Medium',
  },
  sizing: {
    upperBody: 'L',
    lowerBody: '32W x 32L',
  },
  colorPalette: {
    recommended: [
      { name: 'Deep Navy',    hex: '#1B2B4B' },
      { name: 'Warm Taupe',   hex: '#8B7355' },
      { name: 'Forest Green', hex: '#2D5A27' },
      { name: 'Sand Beige',   hex: '#C4A882' },
      { name: 'Slate Blue',   hex: '#4A4A6A' },
    ],
    avoid: [
      { name: 'Bright Yellow', hex: '#FFD700' },
      { name: 'Hot Pink',      hex: '#FF69B4' },
      { name: 'Neon Green',    hex: '#39FF14' },
      { name: 'Orange Red',    hex: '#FF4500' },
      { name: 'Lime',          hex: '#00FF00' },
    ],
  },
  avatarFailed: false,
};

// ── Provider ──────────────────────────────────────────────────────────────────
export function PageFlowProvider({ children }) {
  // Upload state — 'selfie' slot was previously called 'back'
  const [uploadedImages, setUploadedImages] = useState({ front: null, side: null, selfie: null });
  const [userHeight, setUserHeight] = useState('');

  // Analysis results — null until the Processing pipeline completes successfully
  const [analysisResults, setAnalysisResults] = useState(null);

  // Avatar blob URL — null if avatar generation failed or not yet run
  const [avatarObjUrl, setAvatarObjUrl] = useState(null);

  // Try-on state
  const [tryOnResultUrl, setTryOnResultUrl] = useState(null);
  const [tryOnLoading, setTryOnLoading] = useState(false);

  // Selected garments (kept for UI highlight state in SmartFitSelection)
  const [selectedGarmentId, setSelectedGarmentId] = useState(null);

  // Processing complete flag
  const [processingComplete, setProcessingComplete] = useState(false);

  const updateImage = useCallback((slot, file) => {
    setUploadedImages(prev => ({ ...prev, [slot]: file }));
  }, []);

  return (
    <PageFlowContext.Provider value={{
      // Upload
      uploadedImages, updateImage,
      userHeight, setUserHeight,

      // Analysis
      analysisResults, setAnalysisResults,

      // Avatar
      avatarObjUrl, setAvatarObjUrl,

      // Try-on
      tryOnResultUrl, setTryOnResultUrl,
      tryOnLoading, setTryOnLoading,

      // Garment selection
      selectedGarmentId, setSelectedGarmentId,

      // Flow
      processingComplete, setProcessingComplete,
    }}>
      {children}
    </PageFlowContext.Provider>
  );
}

export function usePageFlow() {
  const ctx = useContext(PageFlowContext);
  if (!ctx) throw new Error('usePageFlow must be used within PageFlowProvider');
  return ctx;
}
