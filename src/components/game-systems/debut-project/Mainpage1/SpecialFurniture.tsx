import React from 'react';
import { motion } from 'motion/react';

export const Poster = ({ color, top = 'top-4', left = 'left-4' }: { color: string, top?: string, left?: string }) => (
  <div className={`absolute ${top} ${left} w-8 h-10 border-[2px] border-black shadow-md flex flex-col items-center bg-white z-0 scale-[0.7]`} >
    <div className="w-full flex-1 flex justify-center items-center border-b border-black/20" style={{ backgroundColor: color }}>
      <div className="w-3 h-3 bg-white/50 rounded-full" />
    </div>
    <div className="w-full h-3 bg-white flex flex-col gap-[1px] p-[2px]">
       <div className="w-[80%] h-[1px] bg-black/30" />
       <div className="w-[60%] h-[1px] bg-black/30" />
    </div>
    <div className={`absolute -top-1 w-2 h-1 bg-macaron border border-black shadow-sm z-10 ${Math.random() > 0.5 ? 'rotate-3' : '-rotate-3'}`} />
  </div>
);

export const MedicalBed = ({ className = "" }: { className?: string }) => (
  <div className={`absolute bottom-0 w-24 h-12 flex flex-col justify-end z-10 scale-[0.7] origin-bottom ${className}`}>
     <div className="w-full h-4 bg-white border-[2.5px] border-black rounded-t-md relative">
        <div className="absolute top-[-4px] left-2 w-6 h-3 bg-gray-100 border-[2px] border-black rounded-sm" />
     </div>
     <div className="w-full h-4 bg-gray-200 border-[2.5px] border-black border-t-0 flex justify-between px-2 items-center">
        <div className="w-1.5 h-2 bg-tiffany animate-pulse" />
        <div className="w-6 h-1 bg-black/20 rounded-full" />
     </div>
     <div className="flex justify-around w-full h-2 px-1">
        <div className="w-1 h-full bg-gray-600" />
        <div className="w-1 h-full bg-gray-600" />
     </div>
  </div>
);

export const LabMonitor = ({ className = "" }: { className?: string }) => (
  <div className={`absolute top-10 left-1/2 -translate-x-1/2 w-16 h-12 bg-[#1A1A1A] border-[3px] border-black flex flex-col p-1 z-0 rounded-sm overflow-hidden scale-[0.7] origin-top ${className}`}>
     <div className="flex-1 bg-green-900/50 flex flex-col gap-0.5 justify-center items-center">
        <motion.div 
           animate={{ x: [-10, 10, -10] }}
           transition={{ repeat: Infinity, duration: 2 }}
           className="w-full h-[1px] bg-[#00FF41]" 
        />
        <div className="w-full h-[1px] bg-[#00FF41]/20" />
        <div className="w-full h-[1px] bg-[#00FF41]/20" />
     </div>
  </div>
);

export const AlbumPoster = ({ color = "#FF85A2", className = "" }: { color?: string, className?: string }) => (
  <div className={`absolute w-10 h-14 border-[3px] border-black shadow-md flex flex-col scale-[0.6] origin-top ${className}`} style={{ backgroundColor: color }}>
    <div className="w-full h-full p-1.5 flex flex-col items-center justify-center opacity-90 overflow-hidden relative">
       <div className="w-full h-full absolute inset-0 bg-white/20 mix-blend-overlay" />
       <div className="w-10 h-8 bg-white/30 rounded-sm mb-1.5 border border-black/10" />
       <div className="w-8 h-1 bg-black/30 rounded-full" />
       <div className="w-6 h-1 bg-black/30 rounded-full mt-1" />
       <div className="absolute bottom-1 right-1 text-[5px] font-black opacity-40">STAR</div>
    </div>
  </div>
);

export const AlbumDisplay = ({ className = "" }: { className?: string }) => (
  <div className={`absolute bottom-0 w-12 h-10 flex items-end justify-center z-10 scale-[0.7] origin-bottom ${className}`}>
     <div className="absolute bottom-0 w-12 h-2 bg-black/20 rounded-full blur-sm" />
     <div className="flex gap-[1px]">
        <div className="w-3.5 h-7 bg-[#81D8D0] border-[2.5px] border-black rounded-sm transform skew-y-3 shadow-md" />
        <div className="w-3.5 h-8 bg-[#FF85A2] border-[2.5px] border-black rounded-sm transform -skew-y-3 -translate-y-1 shadow-md" />
        <div className="w-3.5 h-6 bg-[#FDFD96] border-[2.5px] border-black rounded-sm transform skew-x-2 shadow-md" />
     </div>
  </div>
);

export const GoldTrophy = ({ className = "" }: { className?: string }) => (
  <div className={`absolute bottom-0 w-8 h-12 flex flex-col items-center z-10 scale-[0.7] origin-bottom ${className}`}>
     <div className="absolute bottom-0 w-10 h-2 bg-black/30 rounded-full blur-sm" />
     <motion.div 
        animate={{ rotateY: [0, 180, 360] }}
        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        className="relative mb-0.5"
     >
        <div className="w-6 h-7 bg-[#FDFD96] border-[2.5px] border-black rounded-t-full relative">
           <div className="absolute top-1 left-[-4px] w-2.5 h-3.5 border-[2px] border-black rounded-full" />
           <div className="absolute top-1 right-[-4px] w-2.5 h-3.5 border-[2px] border-black rounded-full" />
           <div className="absolute top-1 left-1.5 w-1 h-3 bg-white/40 rounded-full pointer-events-none" />
        </div>
     </motion.div>
     <div className="w-2 h-2 bg-black/80" />
     <div className="w-6 h-2 bg-[#8B4513] border-[2px] border-black rounded-sm" />
  </div>
);

export const StudioCamera = ({ className = "" }: { className?: string }) => (
  <div className={`absolute bottom-0 w-12 h-16 flex flex-col items-center z-0 scale-[0.8] origin-bottom ${className}`}>
     <div className="w-10 h-6 bg-gray-800 border-[2px] border-black rounded-sm relative">
        <div className="absolute left-[-4px] top-1 w-2 h-3 bg-gray-700 border border-black rounded-l-sm" />
        <div className="absolute right-1 top-1 w-2 h-2 bg-tiffany/50 border border-black rounded-full" />
        <div className="absolute left-2 top-1.5 w-4 h-0.5 bg-white/20" />
     </div>
     <div className="w-2 h-4 bg-gray-600 border-x-[2px] border-black" />
     <div className="w-8 h-6 flex justify-between px-1">
        <div className="w-1.5 h-full bg-black transform -rotate-12" />
        <div className="w-1.5 h-full bg-black transform rotate-12" />
     </div>
  </div>
);

export const LiveSign = ({ className = "" }: { className?: string }) => (
  <div className={`absolute top-4 right-4 w-12 h-6 bg-red-600 border-[2px] border-black rounded-sm shadow-lg flex items-center justify-center scale-[0.8] ${className}`}>
     <motion.div 
        animate={{ opacity: [1, 0.4, 1] }} 
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-[6px] font-black text-white tracking-widest"
     >
        LIVE
     </motion.div>
  </div>
);

export const MicStand = ({ className = "" }: { className?: string }) => (
  <div className={`absolute bottom-0 w-4 h-16 flex flex-col items-center z-0 scale-[0.8] origin-bottom ${className}`}>
     <div className="w-2 h-2 bg-gray-400 border border-black rounded-full" />
     <div className="w-[1.5px] h-full bg-black" />
     <div className="w-4 h-1 bg-black rounded-full" />
  </div>
);
