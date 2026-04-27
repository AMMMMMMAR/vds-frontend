import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { usePageFlow } from '../../hooks/usePageFlow';
import { generateTryOn, base64ToBlobUrl } from '../../lib/api';
import { cn } from '../../lib/utils';

// Garment images are served from /public/garments/ so they can be fetched as Files at runtime.
const GARMENTS = [
  { id: 'g1', category: 'upper', line: 'ESSENTIALS', name: 'Green T-Shirt', imagePath: '/garments/green-t-shirt.jpeg' },
  { id: 'g2', category: 'upper', line: 'ESSENTIALS', name: 'Red T-Shirt',   imagePath: '/garments/red-t-shirt.jpeg' },
  { id: 'g3', category: 'lower', line: 'DENIM',      name: 'Black Jeans',   imagePath: '/garments/black-jeans.jpeg' },
  { id: 'g4', category: 'lower', line: 'DENIM',      name: 'Blue Jeans',    imagePath: '/garments/blue-jeans.jpeg' },
];

function GarmentCard({ garment, isSelected, isLoading, onApply }) {
  return (
    <div className="bg-surface-container rounded-3xl p-4 flex flex-col border border-outline-variant/10">
      {/* Image */}
      <div className="bg-white rounded-2xl w-full aspect-square mb-4 relative overflow-hidden">
        <img
          src={garment.imagePath}
          alt={garment.name}
          className="w-full h-full object-cover"
        />
        {isLoading && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-2xl">
            <Loader2 className="w-6 h-6 text-white animate-spin" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mb-4">
        <p className="text-[10px] font-bold tracking-wider text-on-surface-variant/70 mb-1 uppercase">
          {garment.line}
        </p>
        <p className="text-sm font-semibold text-on-surface leading-tight">{garment.name}</p>
      </div>

      {/* Action */}
      <button
        onClick={() => onApply(garment)}
        disabled={isLoading}
        className={cn(
          'w-full mt-auto py-3 rounded-xl font-bold text-[11px] tracking-wider transition-all duration-300',
          isSelected
            ? 'bg-primary text-on-primary shadow-ambient-blue'
            : 'bg-surface-highest text-on-surface-variant hover:text-on-surface hover:bg-surface-highest/80',
          isLoading && 'opacity-60 cursor-not-allowed'
        )}
      >
        {isLoading ? 'Applying…' : isSelected ? 'APPLIED' : 'APPLY TO AVATAR'}
      </button>
    </div>
  );
}

export default function SmartFitSelection() {
  const {
    uploadedImages,
    selectedGarmentId, setSelectedGarmentId,
    setTryOnResultUrl, setTryOnLoading, tryOnLoading,
  } = usePageFlow();

  const [loadingId, setLoadingId] = React.useState(null);
  const [tryOnError, setTryOnError] = React.useState(null);

  const handleApply = async (garment) => {
    if (tryOnLoading) return;
    if (!uploadedImages.front) {
      setTryOnError('No front photo found. Please go back and upload your photos first.');
      return;
    }

    setLoadingId(garment.id);
    setTryOnLoading(true);
    setTryOnResultUrl(null);
    setTryOnError(null);

    try {
      // Fetch garment from public/ as a Blob then wrap as File
      const garmentResp = await fetch(garment.imagePath);
      const garmentBlob = await garmentResp.blob();
      const garmentFile = new File([garmentBlob], `${garment.id}.jpeg`, { type: 'image/jpeg' });

      const result = await generateTryOn(uploadedImages.front, garmentFile);

      if (result.success && result.images_base64.length > 0) {
        const url = base64ToBlobUrl(result.images_base64[0], result.mime_type || 'image/jpeg');
        setTryOnResultUrl(url);
        setSelectedGarmentId(garment.id);
      } else {
        setTryOnError(result.user_message ?? 'Try-on failed. Please try a different item.');
      }
    } catch {
      setTryOnError('Could not connect to the try-on service. Please try again.');
    } finally {
      setLoadingId(null);
      setTryOnLoading(false);
    }
  };

  const upperBody = GARMENTS.filter(g => g.category === 'upper');
  const lowerBody = GARMENTS.filter(g => g.category === 'lower');

  return (
    <div className="flex flex-col h-full pl-0 lg:pl-6">

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-black text-on-surface tracking-tight mb-1">VDS Fit Selection</h2>
        <p className="text-sm text-on-surface-variant">
          Select any item to apply it to your photo via Vertex AI.
        </p>
      </div>

      {/* Error */}
      {tryOnError && (
        <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <p className="text-xs text-amber-400">{tryOnError}</p>
        </div>
      )}

      <div className="space-y-10 flex-1 overflow-y-auto pr-2 pb-10">

        {/* Upper Body */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-on-surface">
              <svg className="w-5 h-5 text-primary/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" />
              </svg>
              <h3 className="text-sm font-bold tracking-[0.15em] uppercase">Upper Body</h3>
            </div>
            <span className="text-[10px] font-bold tracking-wider text-on-surface-variant uppercase">0{upperBody.length} items</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {upperBody.map(g => (
              <GarmentCard
                key={g.id}
                garment={g}
                isSelected={selectedGarmentId === g.id}
                isLoading={loadingId === g.id}
                onApply={handleApply}
              />
            ))}
          </div>
        </section>

        {/* Lower Body */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-on-surface">
              <svg className="w-5 h-5 text-primary/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15.5 3H8.5c-.8 0-1.5.7-1.5 1.5v15c0 1.1.9 2 2 2h2V12h2v9.5c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-15c0-.8-.7-1.5-1.5-1.5z" />
              </svg>
              <h3 className="text-sm font-bold tracking-[0.15em] uppercase">Lower Body</h3>
            </div>
            <span className="text-[10px] font-bold tracking-wider text-on-surface-variant uppercase">0{lowerBody.length} items</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {lowerBody.map(g => (
              <GarmentCard
                key={g.id}
                garment={g}
                isSelected={selectedGarmentId === g.id}
                isLoading={loadingId === g.id}
                onApply={handleApply}
              />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
