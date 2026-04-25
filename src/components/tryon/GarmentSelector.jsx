import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Tag } from 'lucide-react';
import { usePageFlow } from '../../hooks/usePageFlow';
import { cn } from '../../lib/utils';

const GARMENTS = [
  { id: 'g1', category: 'upper', name: 'Structured Tech-Blazer', line: 'Aether Edition', price: '€450', matchPct: 98, color: '#1B2B4B' },
  { id: 'g2', category: 'upper', name: 'Obsidian Silk Shirt', line: 'Essential Line', price: '€210', matchPct: 94, color: '#0A0A0A' },
  { id: 'g3', category: 'upper', name: 'Navy Technical Polo', line: 'Daily Armor', price: '€180', matchPct: 91, color: '#1a2e4a' },
  { id: 'g4', category: 'lower', name: 'Tapered Slate Trousers', line: 'Daily Armor', price: '€320', matchPct: 98, color: '#3d3d3d' },
  { id: 'g5', category: 'lower', name: 'Raw Carbon Denim', line: 'Essential Line', price: '€185', matchPct: 89, color: '#1c2535' },
  { id: 'g6', category: 'lower', name: 'Utility Cargo Pants', line: 'Modular Kit', price: '€240', matchPct: 85, color: '#2c3a2c' },
];

function GarmentCard({ garment, isSelected, onToggle }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={() => onToggle(garment)}
      className={cn(
        'w-full text-left rounded-2xl border p-4 transition-all duration-200 group',
        isSelected
          ? 'bg-primary/10 border-primary/40 shadow-ambient-blue'
          : 'bg-surface-container border-outline-variant/10 hover:border-outline-variant/30 hover:bg-surface-high'
      )}
    >
      {/* Color chip + check */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl ring-1 ring-outline-variant/20"
            style={{ backgroundColor: garment.color }}
          />
          <div className={cn(
            'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all',
            isSelected ? 'bg-primary border-primary' : 'border-outline-variant/40'
          )}>
            {isSelected && <Check className="w-3 h-3 text-on-primary" strokeWidth={3} />}
          </div>
        </div>
        <span className={cn(
          'text-[10px] font-semibold rounded-full px-2 py-0.5',
          garment.matchPct >= 95
            ? 'bg-primary/10 text-primary border border-primary/20'
            : 'bg-surface-highest text-on-surface-variant border border-outline-variant/20'
        )}>
          {garment.matchPct}% fit
        </span>
      </div>

      <p className="text-sm font-semibold text-on-surface leading-tight">{garment.name}</p>
      <p className="text-xs text-on-surface-variant mt-0.5">{garment.line}</p>
      <p className="text-base font-bold text-primary mt-2">{garment.price}</p>
    </motion.button>
  );
}

export default function GarmentSelector() {
  const [tab, setTab] = useState('upper');
  const { selectedGarments, toggleGarment } = usePageFlow();

  const filtered = GARMENTS.filter(g => g.category === tab);

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex gap-1 bg-surface-lowest p-1 rounded-xl mb-5">
        {['upper', 'lower'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all',
              tab === t
                ? 'bg-primary/15 text-primary'
                : 'text-on-surface-variant hover:text-on-surface'
            )}
          >
            {t === 'upper' ? 'Upper Body' : 'Lower Body'}
          </button>
        ))}
      </div>

      {/* Garment list */}
      <div className="space-y-3 flex-1 overflow-y-auto pr-1">
        {filtered.map(garment => (
          <GarmentCard
            key={garment.id}
            garment={garment}
            isSelected={selectedGarments.some(g => g.id === garment.id)}
            onToggle={toggleGarment}
          />
        ))}
      </div>

      {/* AI note */}
      {selectedGarments.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 bg-surface-container border border-outline-variant/10 rounded-xl p-4"
        >
          <div className="flex items-start gap-2">
            <Tag className="w-4 h-4 text-primary/70 mt-0.5 shrink-0" />
            <p className="text-xs text-on-surface-variant">
              <span className="text-on-surface font-medium">AI Size Intelligence: </span>
              Based on your V-Model measurements, these selections are a <span className="text-primary font-semibold">98% match</span> for your frame. Recommended Size 48 (EU) for the blazer to achieve the intended structured drape.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
