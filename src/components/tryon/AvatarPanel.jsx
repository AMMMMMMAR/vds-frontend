import React from 'react';
import { RefreshCcw, Search, Layers } from 'lucide-react';
import { usePageFlow } from '../../hooks/usePageFlow';

export default function AvatarPanel() {
  const { uploadedImages } = usePageFlow();
  return (
    <div className="relative w-full h-[600px] lg:h-[800px] bg-surface-lowest rounded-3xl overflow-hidden flex flex-col border border-outline-variant/10">
      


      {/* Avatar Placeholder Area */}
      <div className="flex-1 w-full bg-surface-lowest relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        {/* Render front image if available, else show placeholder text */}
        <div className="w-full h-full flex flex-col items-center justify-center text-on-surface-variant/30">
          {uploadedImages?.front ? (
            <img 
              src={URL.createObjectURL(uploadedImages.front)} 
              alt="User Front View" 
              className="w-full h-full object-contain relative z-10"
            />
          ) : (
            <p className="text-sm relative z-10">Avatar Image Placeholder</p>
          )}
        </div>
      </div>



    </div>
  );
}
