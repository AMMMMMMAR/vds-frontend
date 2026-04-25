import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, CheckCircle2, ImageIcon, AlertCircle } from 'lucide-react';
import { usePageFlow } from '../../hooks/usePageFlow';
import { cn } from '../../lib/utils';

const SLOTS = [
  {
    id: 'front',
    label: 'Front View',
    description: 'Stand facing the camera, arms slightly out',
    icon: '↑',
    required: true,
  },
  {
    id: 'side',
    label: 'Side View',
    description: 'Stand sideways, arms relaxed at sides',
    icon: '→',
    required: true,
  },
  {
    id: 'back',
    label: 'Back View',
    description: 'Stand with back to camera, shoulders relaxed',
    icon: '↓',
    required: false,
  },
];

function UploadSlot({ slot, image, onUpload, onRemove, onDefault }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) onUpload(slot.id, file);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) onUpload(slot.id, file);
  };

  const preview = image ? URL.createObjectURL(image) : null;

  return (
    <div className="flex flex-col gap-3">
      {/* Slot label */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-label text-primary/80">{slot.label}</span>
          {slot.required && (
            <span className="text-[10px] font-medium text-tertiary bg-tertiary/10 border border-tertiary/20 rounded-full px-2 py-0.5">
              Required
            </span>
          )}
        </div>
        {image && (
          <button
            onClick={() => onRemove(slot.id)}
            className="text-on-surface-variant/50 hover:text-error transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => !image && inputRef.current?.click()}
        className={cn(
          'relative w-full aspect-[3/4] rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden cursor-pointer group',
          image
            ? 'border-primary/40 cursor-default'
            : dragging
              ? 'border-primary bg-primary/5 scale-[1.01]'
              : 'border-outline-variant/30 hover:border-primary/50 hover:bg-primary/5'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />

        <AnimatePresence mode="wait">
          {image ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <img
                src={preview}
                alt={slot.label}
                className="w-full h-full object-cover"
              />
              {/* Success overlay */}
              <div className="absolute inset-0 bg-surface/40 flex items-end p-4">
                <div className="flex items-center gap-2 bg-surface-container/90 backdrop-blur-sm rounded-xl px-3 py-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium text-on-surface">Photo uploaded</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6"
            >
              {/* Animated upload icon */}
              <div className={cn(
                'w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300',
                dragging ? 'bg-primary/20 scale-110' : 'bg-surface-highest/50 group-hover:bg-primary/10'
              )}>
                <Upload className={cn('w-7 h-7 transition-colors', dragging ? 'text-primary' : 'text-on-surface-variant/50 group-hover:text-primary/80')} />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-on-surface mb-1">
                  {dragging ? 'Drop it here' : 'Drag & drop or click'}
                </p>
                <p className="text-xs text-on-surface-variant/60">{slot.description}</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onDefault(slot.id); }}
                className="text-xs text-primary/60 hover:text-primary underline underline-offset-2 transition-colors mt-1"
              >
                Use default image
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scan corner decorations */}
        {!image && (
          <>
            <span className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-outline-variant/30 rounded-tl-md" />
            <span className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-outline-variant/30 rounded-tr-md" />
            <span className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-outline-variant/30 rounded-bl-md" />
            <span className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-outline-variant/30 rounded-br-md" />
          </>
        )}
      </div>
    </div>
  );
}

export default function DropZone({ onProceed }) {
  const { uploadedImages, updateImage } = usePageFlow();

  const handleUpload = (slot, file) => updateImage(slot, file);
  const handleRemove = (slot) => updateImage(slot, null);
  const handleDefault = (slot) => {
    // Simulate a default placeholder via a fetch to a placeholder
    fetch('https://placehold.co/400x600/152031/adc6ff?text=Default+View')
      .then(r => r.blob())
      .then(blob => {
        const file = new File([blob], `${slot}-default.png`, { type: 'image/png' });
        updateImage(slot, file);
      })
      .catch(() => {
        // Fallback: create a simple colored blob
        const canvas = document.createElement('canvas');
        canvas.width = 400; canvas.height = 600;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#152031';
        ctx.fillRect(0, 0, 400, 600);
        ctx.fillStyle = '#adc6ff';
        ctx.font = 'bold 24px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Default View', 200, 300);
        canvas.toBlob(b => {
          const f = new File([b], `${slot}-default.png`, { type: 'image/png' });
          updateImage(slot, f);
        });
      });
  };

  const frontUploaded = !!uploadedImages.front;
  const sideUploaded = !!uploadedImages.side;
  const canProceed = frontUploaded && sideUploaded;

  return (
    <div className="flex flex-col gap-8">
      {/* Upload grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {SLOTS.map(slot => (
          <UploadSlot
            key={slot.id}
            slot={slot}
            image={uploadedImages[slot.id]}
            onUpload={handleUpload}
            onRemove={handleRemove}
            onDefault={handleDefault}
          />
        ))}
      </div>

      {/* Notice */}
      {!canProceed && (
        <div className="flex items-start gap-3 bg-surface-container rounded-xl p-4 border border-outline-variant/10">
          <AlertCircle className="w-4 h-4 text-primary/60 mt-0.5 shrink-0" />
          <p className="text-xs text-on-surface-variant">
            <span className="text-on-surface font-medium">Front and Side views are required</span>
            {' '}for accurate measurements. Back view improves accuracy by ~12%.
          </p>
        </div>
      )}

      {/* CTA */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onProceed}
        disabled={!canProceed}
        className={cn(
          'w-full py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-3 transition-all duration-300',
          canProceed
            ? 'btn-primary shadow-ambient-blue-lg cursor-pointer'
            : 'bg-surface-highest text-on-surface-variant/40 cursor-not-allowed'
        )}
      >
        <ImageIcon className="w-5 h-5" />
        Analyze My Measurements
      </motion.button>

      <p className="text-center text-xs text-on-surface-variant/40">
        Supports JPG, PNG up to 10MB · High resolution preferred · Data never stored
      </p>
    </div>
  );
}
