import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, CheckCircle2, ImageIcon, AlertCircle, ArrowRight } from 'lucide-react';
import { usePageFlow } from '../../hooks/usePageFlow';
import { cn } from '../../lib/utils';
import frontImg from '../../assets/vds-front.png';
import sideImg from '../../assets/vds-side.png';
import backImg from '../../assets/vds-selfie.png';

const SLOTS = [
  {
    id: 'front',
    label: 'FRONT VIEW',
    description: 'Stand straight, arms slightly out, plain background',
    icon: '↑',
    required: true,
  },
  {
    id: 'side',
    label: 'SIDE VIEW',
    description: 'Stand sideways, arms relaxed, full body visible',
    icon: '→',
    required: true,
  },
  {
    id: 'back',
    label: 'FACE SELFIE',
    description: 'Clear face photo, good lighting, no sunglasses',
    icon: '👤',
    required: true,
  },
];

const getStaticImage = (slotId) => {
  if (slotId === 'front') return frontImg;
  if (slotId === 'side') return sideImg;
  if (slotId === 'back') return backImg;
  return null;
};

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
                <p className="text-xs text-on-surface-variant/60 flex items-center justify-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-white/50 shrink-0" />
                  {slot.description}
                </p>
              </div>
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
  const { uploadedImages, updateImage, userHeight, setUserHeight } = usePageFlow();

  const handleUpload = (slot, file) => updateImage(slot, file);
  const handleRemove = (slot) => updateImage(slot, null);
  const handleDefault = (slot) => {
    let imgPath = '';
    if (slot === 'front') imgPath = frontImg;
    else if (slot === 'side') imgPath = sideImg;
    else if (slot === 'back') imgPath = backImg;

    fetch(imgPath)
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
  const canProceed = frontUploaded && sideUploaded && userHeight.trim() !== '';

  const isTestApplied = SLOTS.every(slot => uploadedImages[slot.id]);

  const toggleTestImages = () => {
    if (isTestApplied) {
      SLOTS.forEach(slot => updateImage(slot.id, null));
      setUserHeight('');
    } else {
      SLOTS.forEach(slot => handleDefault(slot.id));
      setUserHeight('175');
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* SECTION 1 */}
      <div>
        <h3 className="text-lg font-semibold text-on-surface mb-4 flex flex-wrap items-center gap-2">
          1. Upload Your Photos
          <span className="text-sm font-normal text-on-surface-variant/60">
            (Full-body photo required · Face photo required for skin tone)
          </span>
        </h3>
        
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
      </div>

      {/* SECTION 2 */}
      <div>
        <h3 className="text-lg font-semibold text-on-surface mb-4">
          2. Verify Quick Scans
        </h3>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex gap-3">
            {SLOTS.map(slot => (
              <div key={slot.id} className="w-24 h-20 sm:w-[120px] sm:h-[88px] bg-surface-highest rounded-xl overflow-hidden shadow-sm flex items-center justify-center border border-outline-variant/10 relative">
                {uploadedImages[slot.id] ? (
                  <img src={URL.createObjectURL(uploadedImages[slot.id])} alt={slot.label} className="w-full h-full object-cover" />
                ) : (
                  <>
                    <img src={getStaticImage(slot.id)} alt={`${slot.label} default`} className="w-full h-full object-cover opacity-50 grayscale-[30%]" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                      <ImageIcon className="w-5 h-5 text-white/50" />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center text-center shrink-0">
            <button
               onClick={toggleTestImages}
               className="px-6 py-3 bg-surface-highest hover:bg-surface-highest/80 text-on-surface font-semibold rounded-xl text-sm transition-colors border border-outline-variant/20 mb-1.5 tracking-wide min-w-[160px]"
            >
              {isTestApplied ? 'CLEAR SCANS' : 'TEST SCAN ALL'}
            </button>
            <span className="text-[11px] text-on-surface-variant/60">Make sure photos are clear before analyzing</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-2">
        {/* CTA */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onProceed}
          disabled={!canProceed}
          className={cn(
            'w-full py-4 rounded-2xl font-semibold text-base flex flex-col items-center justify-center transition-all duration-300 relative',
            canProceed
              ? 'btn-primary shadow-ambient-blue-lg cursor-pointer'
              : 'bg-surface-highest text-on-surface-variant/40 cursor-not-allowed'
          )}
        >
          <div className="flex items-center gap-3">
            <ImageIcon className="w-5 h-5" />
            <span>Analyze My Measurements</span>
          </div>
          <span className="text-[11px] font-normal mt-1 opacity-70">Analyze with Verified Scans</span>
        </motion.button>

        <p className="text-center text-xs text-on-surface-variant/40">
          Supports JPG, PNG up to 10MB · Clear lighting preferred · Data never stored
        </p>
      </div>
    </div>
  );
}
