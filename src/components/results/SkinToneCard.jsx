import React from 'react';
import { Pipette } from 'lucide-react';

export default function SkinToneCard({ skinTone }) {
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
        <div
          className="w-20 h-20 rounded-2xl ring-2 ring-outline-variant/20 shrink-0"
          style={{ backgroundColor: skinTone.hex }}
        />
        <div className="space-y-1.5">
          <div>
            <p className="text-[10px] text-label text-on-surface-variant/60 mb-0.5">Fitzpatrick Scale</p>
            <p className="text-sm font-semibold text-on-surface">{skinTone.fitzpatrick}</p>
          </div>
          <div>
            <p className="text-[10px] text-label text-on-surface-variant/60 mb-0.5">Hex Value</p>
            <p className="text-sm font-mono font-semibold text-primary">{skinTone.hex}</p>
          </div>
          <div>
            <p className="text-[10px] text-label text-on-surface-variant/60 mb-0.5">Undertone</p>
            <p className="text-sm font-semibold text-on-surface">{skinTone.undertone}</p>
          </div>
        </div>
      </div>
      <div className="bg-surface-low rounded-xl p-3 text-xs text-on-surface-variant">
        Privacy-safe analysis: processed in-memory only. No skin data is stored.
      </div>
    </div>
  );
}
