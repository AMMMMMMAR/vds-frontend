import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePageFlow } from '../../hooks/usePageFlow';
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import tryOnImg from '../../assets/try-on.png';

export default function FittingRoomPanel() {
  const { selectedGarments, analysisResults } = usePageFlow();
  const upper = selectedGarments.find(g => g.category === 'upper');
  const lower = selectedGarments.find(g => g.category === 'lower');
  const total = selectedGarments.reduce((sum, g) => {
    const n = parseFloat(g.price.replace('€', ''));
    return sum + (isNaN(n) ? 0 : n);
  }, 0);

  return (
    <div className="flex flex-col h-full gap-5">
      {/* Viewport */}
      <div className="relative flex-1 min-h-[380px] rounded-2xl bg-surface-lowest border border-outline-variant/10 overflow-hidden">
        {/* Grid bg */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />

        {/* Avatar */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.img
            src={tryOnImg}
            alt="Virtual Avatar"
            className="h-[90%] object-contain drop-shadow-2xl"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Garment overlay badges */}
        <AnimatePresence>
          {upper && (
            <motion.div
              key={upper.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute top-4 left-4 glass rounded-xl px-3 py-2 flex items-center gap-2"
            >
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: upper.color }} />
              <span className="text-xs font-medium text-on-surface">{upper.name}</span>
            </motion.div>
          )}
          {lower && (
            <motion.div
              key={lower.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute bottom-16 left-4 glass rounded-xl px-3 py-2 flex items-center gap-2"
            >
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: lower.color }} />
              <span className="text-xs font-medium text-on-surface">{lower.name}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ambient glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        {/* Empty state */}
        {selectedGarments.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
            <Sparkles className="w-8 h-8 text-primary/30" />
            <p className="text-sm text-on-surface-variant/50">Select garments to try on</p>
          </div>
        )}
      </div>

      {/* Outfit Summary */}
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingBag className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-on-surface">Selected Outfit</h3>
          {selectedGarments.length > 0 && (
            <span className="ml-auto text-xs bg-primary/10 text-primary border border-primary/20 rounded-full px-2 py-0.5">
              {selectedGarments.length} item{selectedGarments.length > 1 ? 's' : ''}
            </span>
          )}
        </div>

        {selectedGarments.length === 0 ? (
          <p className="text-xs text-on-surface-variant/60 text-center py-4">No garments selected yet</p>
        ) : (
          <div className="space-y-3">
            {selectedGarments.map(g => (
              <div key={g.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg" style={{ backgroundColor: g.color }} />
                  <div>
                    <p className="text-xs font-medium text-on-surface leading-tight">{g.name}</p>
                    <p className="text-[10px] text-on-surface-variant">{g.line}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-primary">{g.price}</span>
              </div>
            ))}

            <div className="border-t border-outline-variant/10 pt-3 flex items-center justify-between">
              <span className="text-sm text-on-surface-variant">Total</span>
              <span className="text-lg font-black text-on-surface">€{total}</span>
            </div>
          </div>
        )}

        {selectedGarments.length > 0 && (
          <button className="btn-primary w-full mt-4 py-3 text-sm flex items-center justify-center gap-2">
            Save Outfit <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Sizing note */}
      {analysisResults?.sizing && (
        <div className="bg-surface-container/60 border border-outline-variant/10 rounded-xl p-4">
          <p className="text-[10px] text-label text-primary/70 mb-1">Your Size Profile</p>
          <p className="text-xs text-on-surface-variant">
            Upper: <span className="text-on-surface font-medium">{analysisResults.sizing.upperBody}</span>
            {' · '}
            Lower: <span className="text-on-surface font-medium">{analysisResults.sizing.lowerBody}</span>
          </p>
        </div>
      )}
    </div>
  );
}
