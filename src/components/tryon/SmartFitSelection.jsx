import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { usePageFlow } from '../../hooks/usePageFlow';
import { cn } from '../../lib/utils';

import imgGreenTShirt from '../../assets/green-t-shirt.jpeg';
import imgRedTShirt from '../../assets/red-t-shirt.jpeg';
import imgBlackJeans from '../../assets/black-jeans.jpeg';
import imgBlueJeans from '../../assets/bule-jeans.jpeg';

// Hardcoded garments for display layout matching the screenshot
const GARMENTS = [
  { id: 'g1', category: 'upper', line: 'ESSENTIALS', name: 'Green T-Shirt', price: '€45', image: imgGreenTShirt },
  { id: 'g2', category: 'upper', line: 'ESSENTIALS', name: 'Red T-Shirt', price: '€45', image: imgRedTShirt },
  { id: 'g3', category: 'lower', line: 'DENIM', name: 'Black Jeans', price: '€120', image: imgBlackJeans },
  { id: 'g4', category: 'lower', line: 'DENIM', name: 'Blue Jeans', price: '€120', image: imgBlueJeans },
];

function GarmentCard({ garment, isSelected, onToggle }) {
  return (
    <div className="bg-surface-container rounded-3xl p-4 flex flex-col border border-outline-variant/10">
      {/* Image Container */}
      <div className="bg-white rounded-2xl w-full aspect-square mb-4 relative flex items-center justify-center p-4">

        
        {garment.image ? (
          <img src={garment.image} alt={garment.name} className="w-full h-full object-cover rounded-2xl absolute inset-0 z-0" />
        ) : (
          <div className="text-surface-highest/30 text-xs font-semibold uppercase tracking-widest text-center relative z-0">
            Image<br/>Placeholder
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mb-4">
        <p className="text-[10px] font-bold tracking-wider text-on-surface-variant/70 mb-1 uppercase">
          {garment.line}
        </p>
        <p className="text-sm font-semibold text-on-surface leading-tight">
          {garment.name}
        </p>
      </div>

      {/* Action Button */}
      <button
        onClick={() => onToggle(garment)}
        className={cn(
          "w-full mt-auto py-3 rounded-xl font-bold text-[11px] tracking-wider transition-all duration-300",
          isSelected 
            ? "bg-primary text-on-primary shadow-ambient-blue" 
            : "bg-surface-highest text-on-surface-variant hover:text-on-surface hover:bg-surface-highest/80"
        )}
      >
        {isSelected ? 'REMOVE FROM AVATAR' : 'APPLY TO AVATAR'}
      </button>
    </div>
  );
}

export default function SmartFitSelection() {
  const { selectedGarments, toggleGarment } = usePageFlow();
  
  const upperBody = GARMENTS.filter(g => g.category === 'upper');
  const lowerBody = GARMENTS.filter(g => g.category === 'lower');

  return (
    <div className="flex flex-col h-full pl-0 lg:pl-6">
      
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-black text-on-surface tracking-tight mb-2">Vds Fit Selection</h2>
      </div>

      <div className="space-y-10 flex-1 overflow-y-auto pr-2 pb-10">
        {/* Upper Body Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-on-surface">
              {/* Simple shirt icon representation */}
              <svg className="w-5 h-5 text-primary/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" />
              </svg>
              <h3 className="text-sm font-bold tracking-[0.15em] uppercase">UPPER BODY</h3>
            </div>
            <span className="text-[10px] font-bold tracking-wider text-on-surface-variant uppercase">02 ITEMS</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {upperBody.map(garment => (
              <GarmentCard 
                key={garment.id} 
                garment={garment} 
                isSelected={selectedGarments.some(g => g.id === garment.id)}
                onToggle={toggleGarment}
              />
            ))}
          </div>
        </section>

        {/* Lower Body Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-on-surface">
              {/* Simple trousers icon representation */}
              <svg className="w-5 h-5 text-primary/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15.5 3H8.5c-.8 0-1.5.7-1.5 1.5v15c0 1.1.9 2 2 2h2V12h2v9.5c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-15c0-.8-.7-1.5-1.5-1.5z" />
              </svg>
              <h3 className="text-sm font-bold tracking-[0.15em] uppercase">LOWER BODY</h3>
            </div>
            <span className="text-[10px] font-bold tracking-wider text-on-surface-variant uppercase">02 ITEMS</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {lowerBody.map(garment => (
              <GarmentCard 
                key={garment.id} 
                garment={garment} 
                isSelected={selectedGarments.some(g => g.id === garment.id)}
                onToggle={toggleGarment}
              />
            ))}
          </div>
        </section>


      </div>

    </div>
  );
}
