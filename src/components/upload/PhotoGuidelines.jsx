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
    description: 'Natural even light. Avoid shadows on face and harsh lights for better skin tone reading.',
    icon: '💡',
  },
  {
    title: 'Fitted Clothing',
    description: 'Wear fitted clothes. Loose clothing affects measurement accuracy.',
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
    </div>
  );
}
