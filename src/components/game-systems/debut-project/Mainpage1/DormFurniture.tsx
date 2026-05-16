import React from 'react';

export const Sofa = ({ className = "" }: { className?: string }) => (
  <div className={`absolute bottom-0 w-16 h-10 flex flex-col justify-end z-0 scale-[0.7] origin-bottom ${className}`}>
    <div className="w-full h-6 bg-[#6B8E23] border-[2px] border-black rounded-t-lg mb-[-2px] shadow-sm flex items-start justify-center pt-1">
       <div className="w-10 h-1 bg-white/20 rounded-full" />
    </div>
    <div className="w-full h-3 bg-[#556B2F] border-[2px] border-black rounded-sm flex items-center justify-around px-1 z-10">
       <div className="w-1 h-3 bg-[#3d4d22]" />
       <div className="w-1 h-3 bg-[#3d4d22]" />
    </div>
    <div className="flex justify-between px-1 h-1.5 z-0 mt-[-1px]">
       <div className="w-1.5 h-full bg-[#3E2723] border-x border-black" />
       <div className="w-1.5 h-full bg-[#3E2723] border-x border-black" />
    </div>
  </div>
);

export const Bookshelf = ({ className = "" }: { className?: string }) => (
  <div className={`absolute bottom-0 w-10 h-24 bg-[#DEB887] border-[2px] border-black rounded-sm z-0 flex flex-col shadow-inner scale-[0.7] origin-bottom ${className}`}>
     <div className="w-full h-2 bg-[#8B4513] border-b-[2px] border-black" />
     <div className="flex-1 border-b-[2px] border-black flex items-end px-[2px] gap-[1px]">
        <div className="w-1.5 h-4 bg-red-400 border border-black/50" />
        <div className="w-1.5 h-5 bg-blue-400 border border-black/50 transform rotate-12 origin-bottom ml-1" />
     </div>
     <div className="flex-1 border-b-[2px] border-black flex items-end px-[2px] gap-[1px]">
        <div className="w-1.5 h-4 bg-green-400 border border-black/50" />
        <div className="w-1.5 h-3 bg-white border border-black/50" />
     </div>
     <div className="flex-1 flex items-end px-[2px] pb-[1px]">
        <div className="w-full h-6 bg-[#A0522D] border border-black/50 flex justify-center items-center">
            <div className="w-3 h-1 bg-black/30 rounded-full" />
        </div>
     </div>
  </div>
);

export const DiningTable = ({ className = "" }: { className?: string }) => (
  <div className={`absolute bottom-0 w-16 h-12 flex flex-col items-center z-10 scale-[0.7] origin-bottom ${className}`}>
    <div className="w-16 h-2 bg-red-600 border-[2px] border-black rounded-sm flex overflow-hidden">
       <div className="w-full h-full opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 4px, white 4px, white 8px)' }} />
    </div>
    <div className="flex justify-between w-14 h-full px-1">
       <div className="w-1.5 h-full bg-[#5C3A21] border-x border-black" />
       <div className="w-1.5 h-full bg-[#5C3A21] border-x border-black" />
    </div>
    <div className="absolute -top-3 left-2 w-4 h-4 bg-white border-[1.5px] border-black rounded-full" />
    <div className="absolute -top-2 left-8 w-3 h-3 bg-white border-[1.5px] border-black rounded-sm" />
  </div>
);

export const BarStool = ({ className = "" }: { className?: string }) => (
  <div className={`absolute bottom-0 w-6 h-12 flex flex-col items-center z-10 scale-[0.7] origin-bottom ${className}`}>
    <div className="w-6 h-3 bg-[#1A1A1A] border-[2px] border-black rounded-full z-10 shadow-md" />
    <div className="w-1 h-full bg-gray-400 border-x border-black" />
    <div className="w-4 h-1 bg-gray-600 border border-black rounded-full mb-[1px]" />
  </div>
);

export const BarCounter = ({ className = "" }: { className?: string }) => (
  <div className={`absolute bottom-0 w-32 h-14 bg-[#3E2723] border-[2px] border-black z-0 flex flex-col scale-[0.7] origin-bottom ${className}`}>
     <div className="w-full h-3 bg-[#1A1A1A] border-b-[2px] border-black " />
     <div className="flex-1 flex justify-around items-center px-2">
        <div className="w-4 h-6 border-2 border-black/30 rounded-sm" />
        <div className="w-4 h-6 border-2 border-black/30 rounded-sm" />
        <div className="w-4 h-6 border-2 border-black/30 rounded-sm" />
     </div>
  </div>
);

export const ClothesRack = ({ className = "" }: { className?: string }) => (
   <div className={`absolute bottom-0 w-24 h-22 flex flex-col items-center z-0 scale-[0.7] origin-bottom ${className}`}>
      <div className="w-full h-[3px] bg-black rounded-full mb-[-1px] mx-2" />
      <div className="w-full flex-1 flex justify-around items-start pt-1">
         <div className="w-5 h-14 bg-[#FF85A2] border-2 border-black rounded-sm shadow-sm" />
         <div className="w-5 h-16 bg-tiffany border-2 border-black rounded-sm shadow-sm" />
         <div className="w-5 h-12 bg-black border-2 border-white/20 rounded-sm shadow-sm" />
         <div className="w-5 h-14 bg-[#FFF176] border-2 border-black rounded-sm shadow-sm" />
      </div>
      <div className="flex justify-between w-full h-2 px-4">
         <div className="w-1.5 h-full bg-black" />
         <div className="w-1.5 h-full bg-black" />
      </div>
   </div>
);

export const KitchenStove = ({ className = "" }: { className?: string }) => (
  <div className={`absolute bottom-0 w-20 h-16 bg-gray-400 border-[2px] border-black flex flex-col rounded-t-sm shadow-md z-0 scale-[0.7] origin-bottom ${className}`}>
     <div className="w-full h-2 bg-gray-500 border-b border-black/50" />
     <div className="flex-1 grid grid-cols-2 p-1 gap-1">
        <div className="bg-gray-300 border border-black/30 rounded-sm flex justify-center items-center">
           <div className="w-4 h-4 border-2 border-black/10 rounded-full" />
        </div>
        <div className="bg-gray-300 border border-black/30 rounded-sm flex justify-center items-center">
           <div className="w-4 h-4 border-2 border-black/10 rounded-full" />
        </div>
     </div>
     <div className="w-full h-4 bg-gray-600 border-t border-black/50 flex items-center px-2 gap-2">
        <div className="w-2 h-2 bg-red-500 rounded-full border border-black/20" />
        <div className="w-2 h-2 bg-blue-500 rounded-full border border-black/20" />
     </div>
  </div>
);
