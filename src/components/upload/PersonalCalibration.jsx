import React from 'react';
import { Ruler, CheckCircle2 } from 'lucide-react';
import { usePageFlow } from '../../hooks/usePageFlow';

export default function PersonalCalibration() {
  const { userHeight, setUserHeight } = usePageFlow();

  const handleHeightChange = (e) => {
    // Only allow numbers
    const value = e.target.value.replace(/\D/g, '');
    setUserHeight(value);
  };

  return (
    <div className="bg-surface-container rounded-2xl border border-outline-variant/10 p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Ruler className="w-4 h-4 text-primary/70" />
        <h3 className="text-sm font-semibold text-on-surface">Personal Calibration</h3>
      </div>

      <div className="flex flex-col gap-2 mb-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-on-surface">Your Height</label>
          <div className="flex items-center gap-1.5 text-tertiary">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">Required</span>
          </div>
        </div>

        <div className="relative">
          <input
            type="text"
            value={userHeight}
            onChange={handleHeightChange}
            placeholder="e.g. 180"
            className="w-full bg-surface text-on-surface rounded-xl px-4 py-3 pr-16 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow border border-outline-variant/20 placeholder:text-on-surface-variant/40"
            maxLength={3}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-surface-highest text-on-surface-variant px-3 py-1.5 rounded-lg text-sm font-medium border border-outline-variant/10 pointer-events-none">
            cm
          </div>
        </div>
      </div>
      
      <p className="text-xs text-on-surface-variant/70 italic mt-3 leading-relaxed">
        (This data is required for accurate model scaling)
      </p>
    </div>
  );
}
