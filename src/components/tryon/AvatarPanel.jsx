import React from 'react';
import { RefreshCcw, Search, Layers } from 'lucide-react';

export default function AvatarPanel() {
  return (
    <div className="relative w-full h-[600px] lg:h-[800px] bg-surface-lowest rounded-3xl overflow-hidden flex flex-col border border-outline-variant/10">
      
      {/* Badges Overlay */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-3">
        <div className="glass px-3 py-1.5 rounded-full flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-[10px] font-bold tracking-wider text-on-surface">SHOULDER: 44.5CM</span>
        </div>
        <div className="glass px-3 py-1.5 rounded-full flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary/60" />
          <span className="text-[10px] font-bold tracking-wider text-on-surface">CHEST: 102.0CM</span>
        </div>
      </div>

      {/* Avatar Placeholder Area */}
      <div className="flex-1 w-full bg-surface-lowest relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        {/* Placeholder for the actual image the user will upload later */}
        <div className="w-full h-full flex flex-col items-center justify-center text-on-surface-variant/30">
          <p className="text-sm">Avatar Image Placeholder</p>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
        {/* Refresh button */}
        <button className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors">
          <RefreshCcw className="w-5 h-5" />
        </button>

        {/* Search button */}
        <button className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors">
          <Search className="w-5 h-5" />
        </button>

        {/* Primary Capture Action */}
        <button className="h-12 px-8 rounded-2xl bg-primary text-on-primary font-bold text-xs tracking-wider shadow-ambient-blue hover:bg-primary/90 transition-colors">
          CAPTURE LOOK
        </button>

        {/* Layers button */}
        <button className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors">
          <Layers className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
}
