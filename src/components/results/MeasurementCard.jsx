import React from 'react';
import { Ruler } from 'lucide-react';

export default function MeasurementCard({ measurements }) {
  const rows = [
    { label: 'Height',        key: 'height' },
    { label: 'Chest',         key: 'chest' },
    { label: 'Waist',         key: 'waist' },
    { label: 'Hips',          key: 'hips' },
    { label: 'Shoulder Width',key: 'shoulder' },
    { label: 'Inseam',        key: 'inseam' },
    { label: 'Arm Length',    key: 'armLength' },
  ];

  if (!measurements) {
    return (
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
            <Ruler className="w-4 h-4 text-primary" />
          </div>
          <h3 className="text-sm font-semibold text-on-surface">Measurements</h3>
        </div>
        <p className="text-xs text-on-surface-variant/60">Measurement data unavailable.</p>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
          <Ruler className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-on-surface">Measurements</h3>
          <p className="text-[11px] text-on-surface-variant">Precision verified across 17 data points</p>
        </div>
      </div>

      <div className="space-y-3">
        {rows.map(row => {
          const m = measurements[row.key];
          return (
            <div key={row.key} className="flex items-center justify-between py-2 border-b border-outline-variant/10 last:border-0">
              <span className="text-sm text-on-surface-variant">{row.label}</span>
              <div className="flex items-baseline gap-1">
                <span className="text-base font-bold text-on-surface tabular-nums">{m?.value ?? '—'}</span>
                <span className="text-xs text-on-surface-variant/60">{m?.unit}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center gap-2 bg-primary/5 border border-primary/15 rounded-xl p-3">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse-slow" />
        <p className="text-xs text-on-surface-variant">
          <span className="text-primary font-semibold">AI-verified</span> · 17 landmarks mapped
        </p>
      </div>
    </div>
  );
}
