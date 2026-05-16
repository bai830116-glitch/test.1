import React from 'react';
import { motion } from 'motion/react';

export const Desk = ({ className = "" }: { className?: string }) => (
  <div className={`absolute bottom-0 w-20 h-10 flex flex-col justify-end z-10 scale-[0.7] origin-bottom ${className}`}>
    <div className="w-full h-2 bg-[#8B5A2B] border border-black/80 flex items-end justify-between px-1">
      <div className="w-2 h-3 bg-white border border-black/50 ml-1 mb-[1px]" />
      <div className="w-1 h-2 bg-blue-400 border border-black/50 mr-2 mb-[1px]" />
    </div>
    <div className="w-full flex-1 flex">
      <div className="w-5 h-full bg-[#5C3A21] border-x border-black/80 flex flex-col">
         <div className="flex-1 border-b border-black/50 flex justify-center items-center"><div className="w-2 h-0.5 bg-black/40" /></div>
         <div className="flex-1 flex justify-center items-center"><div className="w-2 h-0.5 bg-black/40" /></div>
      </div>
      <div className="flex-1 h-2 bg-[#2D1A11] border-b border-black/80" />
      <div className="w-5 h-full bg-[#5C3A21] border-x border-black/80 flex flex-col">
         <div className="flex-1 border-b border-black/50 flex justify-center items-center"><div className="w-2 h-0.5 bg-black/40" /></div>
         <div className="flex-1 flex justify-center items-center"><div className="w-2 h-0.5 bg-black/40" /></div>
      </div>
    </div>
    <div className="absolute top-[-14px] left-4 w-6 h-4 bg-gray-300 border-[2px] border-black rounded-sm flex justify-center items-center">
       <div className="w-4 h-2 bg-tiffany border border-black/20 animate-pulse" />
    </div>
    <div className="absolute top-[-4px] left-[26px] w-1 h-1 bg-black" />
  </div>
);

export const ServerRack = ({ className = "" }: { className?: string }) => (
  <div className={`absolute bottom-0 right-4 w-12 h-20 bg-[#2A2A2A] border-[2px] border-black p-1 flex flex-col gap-1 rounded-t-sm shadow-xl z-0 scale-[0.7] origin-bottom ${className}`}>
    <div className="w-full h-2 bg-[#1A1A1A] flex gap-1 items-center px-1">
       <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
       <div className="w-1 h-1 bg-green-500 rounded-full" />
    </div>
    {[1,2,3,4].map(i => (
      <div key={i} className="w-full flex-1 bg-[#1A1A1A] border border-black/50 flex items-center px-1">
        <motion.div 
          animate={{ opacity: [1, 0.2, 1] }} 
          transition={{ repeat: Infinity, duration: Math.random() * 0.5 + 0.2 }}
          className="w-1.5 h-1.5 rounded-full bg-tiffany shadow-[0_0_4px_#0ABAB5]" 
        />
        <div className="ml-1 flex-1 flex gap-[1px]">
           <div className="w-1 h-full bg-gray-700" />
           <div className="w-1 h-full bg-gray-700" />
           <div className="w-1 h-full bg-gray-700" />
        </div>
      </div>
    ))}
  </div>
);

export const Whiteboard = ({ className = "" }: { className?: string }) => (
   <div className={`absolute top-6 left-1/2 -translate-x-1/2 w-24 h-14 bg-white border-[3px] border-gray-400 rounded-sm shadow-md flex flex-col p-1 z-0 scale-[0.7] origin-top ${className}`}>
      <div className="w-3/4 h-0.5 bg-red-400 mb-1 transform rotate-1" />
      <div className="w-1/2 h-0.5 bg-blue-400 mb-1" />
      <div className="w-full flex-1 border border-dashed border-gray-300 mt-1 flex gap-1 p-0.5">
         <div className="w-4 h-4 bg-macaron border border-black/20 shadow-sm transform -rotate-6" />
         <div className="w-4 h-4 bg-[#FF85A2] border border-black/20 shadow-sm transform rotate-3" />
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-300 border-t border-gray-400 flex items-center px-1 gap-1">
         <div className="w-2 h-1 bg-black rounded-full" />
         <div className="w-2 h-1 bg-red-500 rounded-full" />
         <div className="w-4 h-1.5 bg-gray-600 rounded-sm ml-auto" />
      </div>
   </div>
);

export const FilingCabinet = ({ className = "" }: { className?: string }) => (
   <div className={`absolute bottom-0 left-2 w-10 h-16 bg-gray-300 border-[2px] border-black flex flex-col shadow-md z-0 scale-[0.7] origin-bottom ${className}`}>
      {[1,2,3,4].map(i => (
         <div key={i} className="flex-1 border-b-[2px] border-black last:border-b-0 flex justify-center items-center bg-gray-200">
            <div className="w-4 h-1 bg-gray-400 border border-black/50 shadow-sm" />
         </div>
      ))}
   </div>
);

export const Copier = ({ className = "" }: { className?: string }) => (
  <div className={`absolute bottom-0 w-12 h-14 bg-gray-100 border-[2px] border-black flex flex-col items-center justify-end z-0 rounded-t-lg shadow-sm scale-[0.7] origin-bottom ${className}`}>
     <div className="w-[90%] h-3 bg-[#E0E0E0] border-[1.5px] border-black rounded-t-md mb-1 flex justify-center items-center">
        <div className="w-4 h-1 bg-blue-300 border border-black/20 animate-pulse" />
     </div>
     <div className="w-full h-5 bg-white border-y-[1.5px] border-black relative">
        <div className="absolute top-1 right-1 w-3 h-0.5 bg-black/20" />
        <div className="absolute top-2.5 right-1 w-3 h-0.5 bg-black/20" />
        <div className="absolute bottom-[2px] left-[-2px] w-4 h-2 bg-white border-[1.5px] border-black rounded-l-sm" />
     </div>
     <div className="w-full h-5 bg-gray-200 flex justify-between px-1 items-end pb-[2px]">
        <div className="w-2 h-2.5 bg-gray-400 border border-black/30" />
        <div className="w-4 h-0.5 bg-black/20 mb-1" />
     </div>
  </div>
);
