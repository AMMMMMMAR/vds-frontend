import React from 'react';
import { CheckCircle2, Info } from 'lucide-react';

const guidelines = [
  {
    title: 'Optimal Distance',
    description: 'Stand 2m from camera for a full-body view.',
    icon: '📏',
  },
  {
    title: 'Studio Lighting',
    description: 'Natural, even light. Avoid harsh shadows.',
    icon: '💡',
  },
  {
    title: 'Fitted Clothing',
    description: 'Essential for accurate metric calculation.',
    icon: '👕',
  },
  {
    title: 'Neutral Background',
    description: 'A solid, neutral wall works best.',
    icon: '🏷️',
  },
];

export default function PhotoGuidelines() {
  return (
    <div className="bg-surface-container rounded-2xl border border-outline-variant/10 p-6 h-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Info className="w-4 h-4 text-primary/70" />
        <h3 className="text-sm font-semibold text-on-surface">Photo Guidelines</h3>
      </div>

      {/* Guidelines list */}
      <ul className="space-y-4">
        {guidelines.map((g) => (
          <li key={g.title} className="flex gap-3">
            <div className="mt-0.5 shrink-0">
              <CheckCircle2 className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-on-surface leading-tight">{g.title}</p>
              <p className="text-xs text-on-surface-variant mt-0.5">{g.description}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Divider */}
      <div className="my-6 border-t border-outline-variant/10" />

      {/* Privacy note */}
      <div className="bg-surface-low rounded-xl p-4 border border-outline-variant/10">
        <p className="text-xs font-semibold text-primary mb-1">Privacy First</p>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          Your photos are processed locally in-memory. No images are stored or transmitted to external servers.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        {[
          { value: '33', label: 'Body Landmarks' },
          { value: '±1mm', label: 'Accuracy' },
          { value: '< 5s', label: 'Processing' },
          { value: '0', label: 'Data Stored' },
        ].map(stat => (
          <div key={stat.label} className="bg-surface-highest/30 rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-primary">{stat.value}</p>
            <p className="text-[10px] text-on-surface-variant mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
