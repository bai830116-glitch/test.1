import React from 'react';
import { Destination } from '../../../../../types/scout';

interface CityMarkerProps {
  dest: Destination;
  progress: number;
  pxX: number;
  pxY: number;
  onClick: (dest: Destination) => void;
}

export const CityMarker: React.FC<CityMarkerProps> = ({ dest, progress, pxX, pxY, onClick }) => {
  return (
    <div 
      className="absolute pointer-events-auto cursor-pointer flex flex-col items-center justify-end origin-bottom transform-gpu group z-10"
      style={{ 
        left: pxX, 
        top: pxY, 
        width: 120, 
        height: 120, 
        transform: 'translate(-50%, calc(-100% + 15px))'
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(dest);
      }}
    >
      <div className="w-full h-full flex flex-col items-center justify-end pb-2 active:-translate-y-1 group-hover:-translate-y-1 transition-transform drop-shadow-[0_8px_8px_rgba(0,0,0,0.5)]">
        {dest.icon}
        <div 
          className="px-1.5 py-0.5 bg-slate-900/90 backdrop-blur-sm rounded-lg text-[8px] font-black text-white border-2 border-white/10 mb-0.5 border-b-[3px] shadow-xl whitespace-nowrap" 
          style={{ borderBottomColor: dest.color }}
        >
          <span className="pb-[1px] block drop-shadow-[0_1px_0_rgba(0,0,0,0.8)] tracking-tighter">
            {dest.name}
          </span>
          {/* Progress Bar */}
          <div className="w-full h-0.5 bg-white/10 rounded-full mt-0.5 overflow-hidden">
            <div className="h-full bg-[#00B4D8]" style={{ width: `${progress}%` }} />
          </div>
        </div>
        
        {progress >= 100 && (
          <div className="absolute -top-4 right-0 px-1.5 py-0.5 bg-yellow-400 text-black text-[8px] font-black rounded-md animate-bounce shadow-lg">探索完成</div>
        )}

        <div className="absolute top-0 right-0 w-4 h-4 bg-[#FF85A2] rounded-full border border-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
        </div>
      </div>
    </div>
  );
};
