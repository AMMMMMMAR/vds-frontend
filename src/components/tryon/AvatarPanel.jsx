import React from 'react';
import { Loader2, AlertTriangle } from 'lucide-react';
import { usePageFlow } from '../../hooks/usePageFlow';

export default function AvatarPanel() {
  const { uploadedImages, tryOnResultUrl, tryOnLoading } = usePageFlow();

  return (
    <div className="relative w-full h-[600px] lg:h-[800px] bg-surface-lowest rounded-3xl overflow-hidden flex flex-col border border-outline-variant/10">

      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* Label */}
      <div className="absolute top-4 left-4 z-20">
        <span className="text-[10px] font-bold tracking-widest text-on-surface-variant/50 uppercase">
          {tryOnResultUrl ? 'Try-On Result' : 'Your Photo'}
        </span>
      </div>

      {/* Image area */}
      <div className="flex-1 w-full relative">

        {/* Loading overlay */}
        {tryOnLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-surface-lowest/80 backdrop-blur-sm">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-sm font-medium text-on-surface-variant">Applying garment via AI…</p>
            <p className="text-xs text-on-surface-variant/50">This may take 10–30 seconds</p>
          </div>
        )}

        {/* Try-on result — shown after API returns */}
        {tryOnResultUrl && !tryOnLoading && (
          <img
            src={tryOnResultUrl}
            alt="Virtual try-on result"
            className="w-full h-full object-contain relative z-10"
          />
        )}

        {/* Original front image — shown before any try-on */}
        {!tryOnResultUrl && !tryOnLoading && (
          <div className="w-full h-full flex flex-col items-center justify-center text-on-surface-variant/30">
            {uploadedImages?.front ? (
              <img
                src={URL.createObjectURL(uploadedImages.front)}
                alt="Your front photo"
                className="w-full h-full object-contain relative z-10"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-center px-8">
                <AlertTriangle className="w-8 h-8 text-on-surface-variant/20" />
                <p className="text-sm relative z-10">No photo available. Please complete the upload step first.</p>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
