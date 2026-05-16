import React from 'react';
import { motion } from 'motion/react';
import { Maximize, Minimize, Globe } from 'lucide-react';

interface MapControlsProps {
  isFullscreen: boolean;
  isMobile: boolean;
  onToggleFullscreen: () => void;
  onResetView: () => void;
}

export const MapControls: React.FC<MapControlsProps> = ({ 
  isFullscreen, 
  isMobile, 
  onToggleFullscreen, 
  onResetView 
}) => {
  return (
    <div className={`absolute bottom-3 right-3 md:bottom-6 md:right-6 z-40 flex items-center gap-2 transform origin-bottom-right ${isMobile ? 'scale-75' : ''}`}>
      <button 
        onClick={onToggleFullscreen}
        className="w-10 h-10 md:w-12 md:h-12 bg-[#121214]/90 text-white border-[2px] border-tiffany rounded-full flex items-center justify-center shadow-2xl transition-all backdrop-blur-md active:scale-95 active:bg-[#1E1E22]"
      >
        {isFullscreen ? (
          <Minimize className="w-5 h-5 md:w-6 md:h-6 text-[#FF85A2]" />
        ) : (
          <Maximize className="w-5 h-5 md:w-6 md:h-6 text-tiffany" />
        )}
      </button>

      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onResetView}
        className="w-10 h-10 md:w-12 md:h-12 bg-black/80 text-tiffany border border-tiffany/30 rounded-full flex items-center justify-center transition-all shadow-xl active:scale-90 active:bg-tiffany active:text-white"
      >
        <Globe className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-500" />
      </motion.button>
    </div>
  );
};
