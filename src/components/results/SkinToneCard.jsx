import React from 'react';
import { Pipette } from 'lucide-react';

export default function SkinToneCard({ skinTone }) {
  if (!skinTone) {
    return (
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-tertiary/10 flex items-center justify-center">
            <Pipette className="w-4 h-4 text-tertiary" />
          </div>
          <h3 className="text-sm font-semibold text-on-surface">Primary Skin Tone</h3>
        </div>
        <p className="text-xs text-on-surface-variant/60">Skin tone data unavailable.</p>
      </div>
    );
  }

  // Capitalise the first letter of the label for display
  const displayLabel = skinTone.fitzpatrick
    ? skinTone.fitzpatrick.charAt(0).toUpperCase() + skinTone.fitzpatrick.slice(1)
    : '—';

  return (
    <div className="card p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-xl bg-tertiary/10 flex items-center justify-center">
          <Pipette className="w-4 h-4 text-tertiary" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-on-surface">Primary Skin Tone</h3>
          <p className="text-[11px] text-on-surface-variant">Chromatic analysis complete</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-5">
        {/* Colour swatch — uses sampled_hex from backend */}
        <div
          className="w-20 h-20 rounded-2xl ring-2 ring-outline-variant/20 shrink-0"
          style={{ backgroundColor: skinTone.hex }}
        />
        <div className="space-y-2">
          <div>
            <p className="text-[10px] text-label text-on-surface-variant/60 mb-0.5">Detected Tone</p>
            <p className="text-sm font-semibold text-on-surface">{displayLabel}</p>
          </div>
          <div>
            <p className="text-[10px] text-label text-on-surface-variant/60 mb-0.5">Hex Value</p>
            <p className="text-sm font-mono font-semibold text-primary">{skinTone.hex}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
