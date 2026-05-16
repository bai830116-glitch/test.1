import React from 'react';

export const WaterCooler = ({ className = "" }: { className?: string }) => (
  <div className={`absolute bottom-0 right-12 w-8 h-20 flex flex-col items-center z-0 scale-[0.7] origin-bottom ${className}`}>
    <div className="w-6 h-8 bg-blue-200/60 border-[2px] border-black rounded-t-lg relative overflow-hidden backdrop-blur-sm">
       <div className="absolute bottom-0 w-full h-6 bg-blue-400/40" />
       <div className="absolute top-1 left-1 w-1 h-4 bg-white/40 rounded-full" />
    </div>
    <div className="w-8 h-12 bg-white border-[2px] border-black border-t-0 flex flex-col items-center pt-1 shadow-inner">
       <div className="flex gap-1">
          <div className="w-1.5 h-2 bg-red-500 border border-black/50" />
          <div className="w-1.5 h-2 bg-blue-500 border border-black/50" />
       </div>
       <div className="w-4 h-1.5 bg-black/80 rounded-b-sm mt-1" />
       <div className="w-5 h-2 bg-gray-300 rounded-full mt-auto mb-1 border border-black/20" />
    </div>
  </div>
);

export const VendingMachine = ({ className = "" }: { className?: string }) => (
  <div className={`absolute bottom-0 left-3 w-14 h-24 border-[2px] border-black bg-red-500 rounded-t-md overflow-hidden flex flex-col shadow-lg z-0 scale-[0.7] origin-bottom ${className}`}>
    <div className="w-full h-3 bg-red-600 border-b border-black/30 flex justify-center items-center">
       <div className="w-8 h-1 bg-white/50 rounded-full" />
    </div>
    <div className="flex-1 bg-gray-900 p-1 flex flex-col gap-1 border-x-2 border-white/20 mx-1 mt-1">
       <div className="w-full h-[18px] bg-blue-200/20 flex gap-0.5 justify-around items-end pb-[1px]">
          {[1,2,3].map(i => <div key={i} className="w-2.5 h-3 bg-orange-400 border border-white/50" />)}
       </div>
       <div className="w-full h-[18px] bg-blue-200/20 flex gap-0.5 justify-around items-end pb-[1px]">
          {[1,2,3].map(i => <div key={i} className="w-2 h-3 bg-green-400 border border-white/50 rounded-full" />)}
       </div>
       <div className="w-full h-[18px] bg-blue-200/20 flex gap-0.5 justify-around items-end pb-[1px]">
          {[1,2].map(i => <div key={i} className="w-3 h-2 bg-purple-400 border border-white/50" />)}
       </div>
    </div>
    <div className="w-full h-6 bg-red-500 flex justify-between px-2 items-center">
       <div className="w-6 h-3 bg-black/80 rounded-sm shadow-inner" />
       <div className="w-2 h-4 bg-gray-800 border border-black/50" />
    </div>
  </div>
);

export const Plant = ({ className = "" }: { className?: string }) => (
  <div className={`absolute bottom-0 right-2 w-8 h-12 flex flex-col items-center z-10 scale-[0.7] origin-bottom ${className}`}>
    <div className="w-8 h-8 bg-[#00D85A] rounded-t-full border-[2px] border-black relative z-10 flex justify-center items-center">
       <div className="w-4 h-4 bg-[#00A844] rounded-full" />
    </div>
    <div className="w-5 h-5 bg-[#8B5A2B] border-[2px] border-black border-t-0 rounded-b-sm -mt-1 shadow-md flex flex-col items-center">
       <div className="w-full h-1 bg-black/20" />
    </div>
  </div>
);

export const Door = ({ className = "" }: { className?: string }) => (
   <div className={`absolute bottom-0 right-6 w-12 h-20 border-[3px] border-black bg-[#E2B77B] flex flex-col items-end py-4 shadow-[inset_4px_4px_0_rgba(255,255,255,0.3)] z-0 scale-[0.8] origin-bottom ${className}`}>
      <div className="w-2 h-4 bg-gray-400 border-[1.5px] border-black rounded-l-sm mr-1 shadow-sm" />
      <div className="absolute top-2 left-2 right-4 bottom-[45%] border-2 border-black/20" />
      <div className="absolute top-[60%] left-2 right-4 bottom-2 border-2 border-black/20" />
   </div>
);

export const Window = ({ className = "" }: { className?: string }) => (
   <div className={`absolute top-6 left-10 w-16 h-16 border-[3px] border-black bg-[#87CEEB] flex shadow-inner z-0 overflow-hidden scale-[0.7] origin-top ${className}`}>
      <div className="absolute bottom-0 w-full h-1.5 bg-white border-t-[2px] border-black" />
      <div className="absolute top-0 left-2 w-2 h-[150%] bg-white/30 transform rotate-45" />
      <div className="w-1/2 h-full border-r-[2px] border-black" />
      <div className="absolute top-0 left-0 w-full h-1/2 flex flex-col justify-between pt-1">
         <div className="w-full h-1 bg-[#F5F5DC] border-b border-black/30" />
         <div className="w-full h-1 bg-[#F5F5DC] border-b border-black/30" />
         <div className="w-full h-1 bg-[#F5F5DC] border-b border-black/30" />
      </div>
   </div>
);
