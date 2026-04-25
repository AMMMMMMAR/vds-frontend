import React from 'react';
import { Palette } from 'lucide-react';

const UPPER_COLORS = [
  { hex: '#4A4A6A', label: 'Slate Blue' },
  { hex: '#3B6A6D', label: 'Teal' },
  { hex: '#737A7C', label: 'Grey' },
  { hex: '#2C3E50', label: 'Deep Navy' },
  { hex: '#8E44AD', label: 'Plum' },
];

const LOWER_COLORS = [
  { hex: '#2D5A27', label: 'Forest Green' },
  { hex: '#887355', label: 'Warm Brown' },
  { hex: '#C4A8B2', label: 'Dusty Pink' },
  { hex: '#34495E', label: 'Charcoal' },
  { hex: '#D5C4A1', label: 'Sand Beige' },
];

export default function ColorPalette() {
  return (
    <div className="card p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
          <Palette className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-on-surface">Your Color Palette</h3>
          <p className="text-[11px] text-on-surface-variant">Matched for optimal contrast & resonance</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Upper Body */}
        <div>
          <h4 className="text-sm font-semibold text-on-surface mb-0.5">Upper Body Color Recommendation</h4>
          <p className="text-[11px] text-on-surface-variant mb-3">Suggested for shirts and tops for high contrast.</p>
          <div className="flex gap-2">
            {UPPER_COLORS.map(color => (
              <div key={color.hex} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className="w-full h-10 sm:h-12 rounded-xl cursor-pointer hover:scale-105 transition-transform shadow-sm"
                  style={{ backgroundColor: color.hex }}
                  title={color.label}
                />
                <span className="text-[9px] font-mono text-on-surface-variant text-center">{color.hex}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lower Body */}
        <div>
          <h4 className="text-sm font-semibold text-on-surface mb-0.5">Lower Body Color Recommendation</h4>
          <p className="text-[11px] text-on-surface-variant mb-3">Suggested for pants and skirts for natural harmony.</p>
          <div className="flex gap-2">
            {LOWER_COLORS.map(color => (
              <div key={color.hex} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className="w-full h-10 sm:h-12 rounded-xl cursor-pointer hover:scale-105 transition-transform shadow-sm"
                  style={{ backgroundColor: color.hex }}
                  title={color.label}
                />
                <span className="text-[9px] font-mono text-on-surface-variant text-center">{color.hex}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
