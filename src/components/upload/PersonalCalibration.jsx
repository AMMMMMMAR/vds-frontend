import React from 'react';
import { Ruler, CheckCircle2, AlertCircle } from 'lucide-react';
import { usePageFlow } from '../../hooks/usePageFlow';
import { cn } from '../../lib/utils';

const MIN_HEIGHT = 100;
const MAX_HEIGHT = 250;

export default function PersonalCalibration() {
  const { userHeight, setUserHeight } = usePageFlow();

  const heightNum = parseInt(userHeight, 10);
  const hasValue = userHeight.trim() !== '';
  const isValid = hasValue && !isNaN(heightNum) && heightNum >= MIN_HEIGHT && heightNum <= MAX_HEIGHT;
  const showError = hasValue && !isValid;

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
          <div className={cn('flex items-center gap-1.5', showError ? 'text-red-400' : 'text-tertiary')}>
            {showError
              ? <AlertCircle className="w-3.5 h-3.5" />
              : <CheckCircle2 className="w-3.5 h-3.5" />
            }
            <span className="text-xs font-medium">Required</span>
          </div>
        </div>

        <div className="relative">
          <input
            type="text"
            value={userHeight}
            onChange={handleHeightChange}
            placeholder="e.g. 180"
            className={cn(
              'w-full bg-surface text-on-surface rounded-xl px-4 py-3 pr-16 focus:outline-none focus:ring-2 transition-shadow border placeholder:text-on-surface-variant/40',
              showError
                ? 'border-red-400/60 focus:ring-red-400/30'
                : 'border-outline-variant/20 focus:ring-primary/50'
            )}
            maxLength={3}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-surface-highest text-on-surface-variant px-3 py-1.5 rounded-lg text-sm font-medium border border-outline-variant/10 pointer-events-none">
            cm
          </div>
        </div>

        {/* Inline error */}
        {showError && (
          <p className="text-xs text-red-400 flex items-center gap-1 mt-0.5">
            <AlertCircle className="w-3 h-3 shrink-0" />
            Height must be between {MIN_HEIGHT} and {MAX_HEIGHT} cm
          </p>
        )}
      </div>

      <p className="text-xs text-on-surface-variant/70 italic mt-3 leading-relaxed">
        (This data is required for accurate model scaling)
      </p>
    </div>
  );
}
