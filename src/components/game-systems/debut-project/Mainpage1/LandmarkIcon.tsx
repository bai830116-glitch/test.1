import React from 'react';

export const LandmarkIcon = ({ id, color }: { id: string, color: string }) => {
  switch (id) {
    case 'seoul': // Seoul - N Seoul Tower
      return (
         <div className="relative w-8 h-12 flex flex-col items-center origin-bottom hover:scale-110 transition-transform">
            <div className="w-1.5 h-3 bg-red-400 border border-black/80" />
            <div className="w-2.5 h-4 bg-gray-300 border-x-[1.5px] border-black/80" />
            <div className="w-8 h-3 bg-tiffany border-[1.5px] border-black rounded-sm shadow-md" />
            <div className="w-4 flex-1 bg-gray-200 border-x-[1.5px] border-black/80 rounded-b-sm" />
         </div>
      );
    case 'sydney': // Sydney
      return (
         <div className="relative w-10 h-8 flex items-end justify-center origin-bottom hover:scale-110 transition-transform">
            <div className="absolute left-0 bottom-1 w-4 h-5 bg-white border-[1.5px] border-black rounded-tr-full rounded-bl-sm origin-bottom-left rotate-12" />
            <div className="absolute left-2 bottom-1 w-5 h-6 bg-white border-[1.5px] border-black rounded-tr-full rounded-bl-sm origin-bottom-left rotate-6 z-10" />
            <div className="absolute left-4 bottom-1 w-6 h-8 bg-white border-[1.5px] border-black rounded-tr-full rounded-bl-sm z-20" />
            <div className="absolute left-8 bottom-1 w-3 h-4 bg-white border-[1.5px] border-black rounded-tl-full rounded-br-sm origin-bottom-right -rotate-12 z-10" />
            <div className="w-full h-1.5 border border-black rounded-sm z-30" style={{ backgroundColor: color }} />
         </div>
      );
    case 'la': // LA - Hollywood Sign
      return (
         <div className="relative w-12 h-6 flex justify-center items-end origin-bottom hover:scale-110 transition-transform">
            <div className="absolute inset-0 bg-[#A0522D] rounded-t-full border-t border-black/20 z-0 opacity-80" />
            <div className="relative z-10 flex gap-[1.5px] mb-2 px-1">
               <span className="text-[7px] font-black text-white drop-shadow-[1px_1px_0_#000] rotate-[-5deg]">H</span>
               <span className="text-[7px] font-black text-white drop-shadow-[1px_1px_0_#000] mt-0.5">O</span>
               <span className="text-[7px] font-black text-white drop-shadow-[1px_1px_0_#000] mt-0.5">L</span>
               <span className="text-[7px] font-black text-white drop-shadow-[1px_1px_0_#000]">L</span>
               <span className="text-[7px] font-black text-white drop-shadow-[1px_1px_0_#000] -mt-0.5">Y</span>
            </div>
         </div>
      );
    case 'london': // London - Tower Bridge
      return (
         <div className="relative w-12 h-10 flex items-end justify-between origin-bottom hover:scale-110 transition-transform">
            {/* Left Tower */}
            <div className="w-4 h-10 border border-black flex flex-col items-center z-10 rounded-t-sm" style={{ backgroundColor: color }}>
               <div className="w-5 h-2 bg-red-500 border-x border-t border-black rounded-t-full -mt-2" />
               <div className="w-2 h-3 bg-white border border-black/50 mt-1" />
            </div>
            {/* Bridge */}
            <div className="absolute bottom-3 left-3 right-3 h-2 bg-tiffany border border-black z-0 flex items-center justify-around">
               <div className="w-[1px] h-full bg-black/40" />
               <div className="w-[1px] h-full bg-black/40" />
            </div>
            <div className="absolute top-2 left-3 right-3 h-[1px] bg-black/50 transform -rotate-12" />
            <div className="absolute top-2 left-3 right-3 h-[1px] bg-black/50 transform rotate-12" />
            {/* Right Tower */}
            <div className="w-4 h-10 border border-black flex flex-col items-center z-10 rounded-t-sm" style={{ backgroundColor: color }}>
               <div className="w-5 h-2 bg-red-500 border-x border-t border-black rounded-t-full -mt-2" />
               <div className="w-2 h-3 bg-white border border-black/50 mt-1" />
            </div>
         </div>
      );
    case 'saopaulo': // Brazil - Christ the Redeemer
      return (
         <div className="relative w-10 h-12 flex flex-col items-center origin-bottom hover:scale-110 active:scale-110 transition-transform">
            <div className="w-3 h-3 bg-gray-200 border border-black/80 rounded-t-sm" />
            <div className="w-10 h-2 bg-gray-200 border border-black/80 rounded-sm shadow-sm" />
            <div className="w-4 h-6 bg-gray-300 border-x border-black/80 mt-[-1px] flex flex-col items-center gap-[1px] pt-1">
               <div className="w-[1px] h-full bg-black/20" />
            </div>
            <div className="w-6 h-2 bg-gray-400 border border-black/80 rounded-t-sm" />
         </div>
      );
    case 'tokyo': // Tokyo - Tokyo Tower
      return (
         <div className="relative w-8 h-12 flex flex-col items-center origin-bottom hover:scale-110 active:scale-110 transition-transform">
            <div className="w-1 h-3 bg-red-500 border border-black/80" />
            <div className="w-3 h-2 bg-white border-x border-black/80" />
            <div className="w-5 h-2 bg-red-500 border border-black/80" />
            <div className="w-6 h-2 bg-white border-x border-black/80" />
            <div className="w-8 flex-1 bg-red-500 border-x-[1.5px] border-t border-black/80 rounded-b-sm flex justify-center">
                <div className="w-2 h-full bg-black/20" />
            </div>
         </div>
      );
    case 'busan': // Busan
      return (
         <div className="relative w-10 h-8 flex flex-col items-center justify-end origin-bottom hover:scale-110 active:scale-110 transition-transform">
            {/* Bridge */}
            <div className="w-8 h-1 bg-macaron border border-black/80 absolute top-4 shadow-sm z-10" />
            {/* Left Pillar */}
            <div className="w-2 h-8 bg-blue-400 border border-black absolute left-1 z-20 rounded-t-sm" />
            {/* Right Pillar */}
            <div className="w-2 h-8 bg-blue-400 border border-black absolute right-1 z-20 rounded-t-sm" />
            {/* Deck */}
            <div className="w-full h-1.5 bg-[#FF85A2] border border-black shadow-md z-30" />
         </div>
      );
    default:
      return <div className="w-4 h-4 bg-tiffany rounded-full border-[3px] border-black shadow-[0_0_12px_rgba(10,186,181,0.5)] hover:scale-110 active:scale-110 transition-transform" />;
  }
};
