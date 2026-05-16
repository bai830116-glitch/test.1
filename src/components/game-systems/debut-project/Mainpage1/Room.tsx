import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrainCircuit } from 'lucide-react';

interface RoomProps {
  id: number;
  name: string;
  children: React.ReactNode;
  decors?: React.ReactNode;
  roomThoughts?: Record<string, string>;
  bgColor?: string;
}

export const Room: React.FC<RoomProps> = ({ id, name, children, decors, roomThoughts = {}, bgColor = "#FDFBF7" }) => (
  <div className={`relative flex-1 border-r-[4px] last:border-r-0 border-black flex flex-col justify-end overflow-hidden`} style={{ backgroundColor: bgColor }}>
    {/* Floor */}
    <div className="absolute bottom-0 w-full h-3 bg-[#8B5A2B] border-t-[2px] border-black/80 flex">
       <div className="w-full h-[1px] bg-white/20 mt-[1px]" />
    </div>

    {/* Shadows & Lighting */}
    <div className="absolute top-0 w-full h-10 bg-gradient-to-b from-black/15 to-transparent pointer-events-none" />
    
    <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-white border-[2px] border-black px-2 py-0.5 rounded-md shadow-md z-10 whitespace-nowrap">
      <span className="pb-[10%] block text-[9px] font-black text-black tracking-widest">{name}</span>
    </div>

    <div className="absolute top-1 left-2 bg-[#81D8D0] border-[2px] border-black px-1.5 py-0.5 rounded-sm shadow-[2px_2px_0_rgba(0,0,0,1)] z-10 origin-top-left -rotate-12">
      <span className="text-[8px] font-black italic">B{id}</span>
    </div>

    {/* Ceiling Light Indicator */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-2 bg-gray-300 border-x-[2px] border-b-[2px] border-black rounded-b-sm flex justify-center z-10">
       <div className="w-6 h-full bg-yellow-100 flex justify-around">
          <div className="w-[1px] h-full bg-black/10" />
          <div className="w-[1px] h-full bg-black/10" />
       </div>
       <div className="absolute top-2 w-16 h-12 bg-gradient-to-b from-yellow-200/40 to-transparent pointer-events-none rounded-b-full blur-sm" />
    </div>

    {/* Decorations (Furniture) */}
    <div className="absolute inset-0 pointer-events-none z-0">
        {decors}
    </div>

    {/* Staffs and Interactions */}
    <div className="relative z-10 h-full w-full">
        {children}
    </div>

    {/* AI Thought Bubbles */}
    <AnimatePresence>
        {roomThoughts[id.toString()] && (
            <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute top-10 left-1/2 -translate-x-1/2 z-50 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full border border-tiffany/30 shadow-lg"
            >
                <span className="text-tiffany text-[8px] font-mono leading-none flex items-center gap-1.5 whitespace-nowrap">
                    <BrainCircuit size={10} className="animate-pulse" />
                    {roomThoughts[id.toString()]}
                </span>
            </motion.div>
        )}
    </AnimatePresence>
  </div>
);

export const FloorSeparator = () => (
  <div className="h-4 w-full bg-[#526368] border-y-[3px] border-black relative z-10 flex text-black overflow-hidden shadow-[0_4px_4px_rgba(0,0,0,0.5)_inset]">
    <div className="w-full h-full opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 12px, #000 12px, #000 15px)' }} />
  </div>
);
