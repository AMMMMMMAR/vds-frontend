import React from 'react';
import { Palette } from 'lucide-react';

function ColorSwatch({ color }) {
  return (
    <div className="flex-1 flex flex-col items-center gap-1.5">
      <div
        className="w-full h-10 sm:h-12 rounded-xl cursor-pointer hover:scale-105 transition-transform shadow-sm"
        style={{ backgroundColor: color.hex }}
        title={color.name}
      />
      <span className="text-[9px] font-mono text-on-surface-variant text-center leading-tight">
        {color.hex}
      </span>
      <span className="text-[9px] text-on-surface-variant/60 text-center leading-tight hidden sm:block">
        {color.name}
      </span>
    </div>
  );
}

export default function ColorPalette({ palette }) {
  if (!palette) {
    return (
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
            <Palette className="w-4 h-4 text-primary" />
          </div>
          <h3 className="text-sm font-semibold text-on-surface">Your Color Palette</h3>
        </div>
        <p className="text-xs text-on-surface-variant/60">Color recommendation data unavailable.</p>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
          <Palette className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-on-surface">Your Color Palette</h3>
          <p className="text-[11px] text-on-surface-variant">Matched for optimal contrast &amp; resonance</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Recommended colours */}
        <div>
          <h4 className="text-sm font-semibold text-on-surface mb-0.5">Recommended for your tone</h4>
          <p className="text-[11px] text-on-surface-variant mb-3">
            These colours enhance your natural features and bring out the best in your complexion.
          </p>
          <div className="flex gap-2">
            {palette.recommended.map(color => (
              <ColorSwatch key={color.hex} color={color} />
            ))}
          </div>
        </div>

        {/* Avoid colours */}
        <div>
          <h4 className="text-sm font-semibold text-on-surface mb-0.5">Not recommended</h4>
          <p className="text-[11px] text-on-surface-variant mb-3">
            These colours may clash with your undertones and are best used sparingly.
          </p>
          <div className="flex gap-2">
            {palette.avoid.map(color => (
              <ColorSwatch key={color.hex} color={color} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
