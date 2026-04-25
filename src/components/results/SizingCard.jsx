import React from 'react';
import { Shirt } from 'lucide-react';

export default function SizingCard({ sizing }) {
  const rows = [
    { label: 'Upper Body (Tops)', value: sizing.upperBody },
    { label: 'Lower Body (Bottoms)', value: sizing.lowerBody },
  ];

  return (
    <div className="card p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-xl bg-secondary-container/40 flex items-center justify-center">
          <Shirt className="w-4 h-4 text-secondary" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-on-surface">Recommended Sizing</h3>
          <p className="text-[11px] text-on-surface-variant">AI-matched to your measurements</p>
        </div>
      </div>
      <div className="space-y-3">
        {rows.map(row => (
          <div key={row.label} className="flex items-center justify-between py-2 border-b border-outline-variant/10 last:border-0">
            <span className="text-sm text-on-surface-variant">{row.label}</span>
            <span className="text-sm font-bold text-on-surface">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
