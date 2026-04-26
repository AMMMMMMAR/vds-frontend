import React from 'react';
import { RefreshCcw, Search, Layers } from 'lucide-react';

export default function AvatarPanel() {
  return (
    <div className="relative w-full h-[600px] lg:h-[800px] bg-surface-lowest rounded-3xl overflow-hidden flex flex-col border border-outline-variant/10">
      


      {/* Avatar Placeholder Area */}
      <div className="flex-1 w-full bg-surface-lowest relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        {/* Placeholder for the actual image the user will upload later */}
        <div className="w-full h-full flex flex-col items-center justify-center text-on-surface-variant/30">
          <p className="text-sm">Avatar Image Placeholder</p>
        </div>
      </div>



    </div>
  );
}
