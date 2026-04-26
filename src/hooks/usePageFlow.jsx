import React, { createContext, useContext, useState, useCallback } from 'react';

const PageFlowContext = createContext(null);

const MOCK_RESULTS = {
  subjectId: 'VDS-8842-X',
  measurements: {
    height: { value: '178', unit: 'cm' },
    chest: { value: '96', unit: 'cm' },
    waist: { value: '82', unit: 'cm' },
    hips: { value: '100', unit: 'cm' },
    shoulder: { value: '44', unit: 'cm' },
    inseam: { value: '81', unit: 'cm' },
  },
  skinTone: {
    fitzpatrick: 'Type III',
    hex: '#C69C82',
    undertone: 'Neutral-Warm',
    label: 'Medium',
  },
  sizing: {
    upperBody: 'L',
    lowerBody: '32 × 32',
    shoeSize: '43 EU',
    fitPreference: 'Standard Fit',
  },
  colorPalette: [
    { hex: '#1B2B4B', label: 'Deep Navy', match: 98 },
    { hex: '#8B7355', label: 'Warm Taupe', match: 94 },
    { hex: '#2D5A27', label: 'Forest Green', match: 91 },
    { hex: '#C4A882', label: 'Sand Beige', match: 89 },
    { hex: '#4A4A6A', label: 'Slate Blue', match: 87 },
  ],
  confidence: 97.4,
  landmarks: 33,
  processingTime: '3.2s',
};

export function PageFlowProvider({ children }) {
  const [uploadedImages, setUploadedImages] = useState({ front: null, side: null, back: null });
  const [userHeight, setUserHeight] = useState('');
  const [analysisResults, setAnalysisResults] = useState(MOCK_RESULTS);
  const [selectedGarments, setSelectedGarments] = useState([]);
  const [processingComplete, setProcessingComplete] = useState(false);

  const updateImage = useCallback((slot, file) => {
    setUploadedImages(prev => ({ ...prev, [slot]: file }));
  }, []);

  const toggleGarment = useCallback((garment) => {
    setSelectedGarments(prev => {
      const exists = prev.find(g => g.id === garment.id);
      if (exists) return prev.filter(g => g.id !== garment.id);
      // Only one upper + one lower at a time
      const filtered = prev.filter(g => g.category !== garment.category);
      return [...filtered, garment];
    });
  }, []);

  return (
    <PageFlowContext.Provider value={{
      uploadedImages, updateImage,
      userHeight, setUserHeight,
      analysisResults, setAnalysisResults,
      selectedGarments, toggleGarment,
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
