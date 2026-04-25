import React from 'react';
import { Palette } from 'lucide-react';

export default function ColorPalette({ palette }) {
  return (
    <div className="card p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
          <Palette className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-on-surface">Your Color Palette</h3>
          <p className="text-[11px] text-on-surface-variant">Matched for optimal contrast & resonance</p>
        </div>
      </div>

      {/* Swatches */}
      <div className="flex gap-2 mb-5">
        {palette.map((color) => (
          <div key={color.hex} className="flex-1 flex flex-col items-center gap-2">
            <div
              className="w-full aspect-square rounded-xl ring-1 ring-outline-variant/20 cursor-pointer hover:scale-105 transition-transform"
              style={{ backgroundColor: color.hex }}
              title={color.label}
            />
            <span className="text-[9px] font-mono text-on-surface-variant text-center leading-tight">{color.hex}</span>
          </div>
        ))}
      </div>

      {/* Labels */}
      <div className="space-y-2">
        {palette.map((color) => (
          <div key={color.hex} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full ring-1 ring-outline-variant/20" style={{ backgroundColor: color.hex }} />
              <span className="text-xs text-on-surface-variant">{color.label}</span>
            </div>
            <span className="text-xs font-semibold text-primary">{color.match}% match</span>
          </div>
        ))}
      </div>
    </div>
  );
}
