import React from 'react';
import { AlertTriangle } from 'lucide-react';

/**
 * FailureBanner
 * Shown inside a result card when that feature's data is unavailable.
 * Not used for critical failures (those are handled on the Processing page).
 */
export default function FailureBanner({ message }) {
  return (
    <div className="card p-6 border border-amber-500/20 bg-amber-500/5 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
        </div>
        <p className="text-sm font-semibold text-amber-400">Analysis Unavailable</p>
      </div>
      <p className="text-xs text-on-surface-variant leading-relaxed">
        {message ?? 'This feature could not complete.'}
      </p>
      <p className="text-xs text-on-surface-variant/50">
        You can go back to the upload page and try again with a new set of photos.
      </p>
    </div>
  );
}
