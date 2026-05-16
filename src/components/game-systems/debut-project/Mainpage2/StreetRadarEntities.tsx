import React from 'react';
import { motion } from 'motion/react';
import { StreetPedestrianProps } from './StreetRadarTypes';

export function StreetAvatar({ type, rarity, facing, isMoving, actionState, season }: StreetPedestrianProps) {
  const isSpecial = rarity === 'S' || rarity === 'SS';
  
  return (
    <div className="relative flex flex-col items-center origin-bottom" style={{ transform: `scaleX(${facing}) scale(1)` }}>
      {/* 驚嘆號/狀態顯示 */}
      {actionState === 'PHONE' && (
        <div className="absolute -top-6 -right-2 bg-white border-2 border-black rounded-lg px-2 py-0.5 shadow-sm animate-bounce z-20">
          <div className="w-1.5 h-2.5 bg-gray-300 rounded-[1px] flex justify-center mt-0.5">
             <div className="w-full h-[1px] bg-black mt-1" />
          </div>
        </div>
      )}
      
      {/* 驚喜標記 */}
      {isSpecial && (
        <div className="absolute -top-8 text-2xl font-black text-rose-500 drop-shadow-[0_2px_0_#FFF] animate-bounce z-20">
          !
        </div>
      )}

      {/* 頭部 (極度圓潤的大頭) */}
      <motion.div 
        animate={isMoving ? { y: [0, -4, 0] } : {}}
        transition={{ repeat: Infinity, duration: 0.3 }}
        className="w-[50px] h-[40px] rounded-[20px] bg-[#E5C2A4] border-[3px] border-black flex flex-col items-center justify-center relative z-10 overflow-hidden shadow-[inset_-3px_-3px_0_rgba(0,0,0,0.15)]"
      >
         {/* 頭髮 */}
         {type === 'JK' && <div className="absolute top-0 w-full h-[14px] bg-slate-800 rounded-t-[18px] border-b-[2px] border-black" />}
         {type === 'COOL_GUY' && <div className="absolute top-0 w-3/4 h-[12px] bg-yellow-400 rounded-[10px] border-b-[2px] border-black" />}
         {type === 'DANCER' && <div className="absolute top-0 w-full h-[15px] bg-[#FF85A2] rounded-t-[18px] border-b-[2px] border-black" />}
         {type === 'IDOL_TRAINEE' && <div className="absolute top-0 w-full h-[16px] bg-[#00C2CB] rounded-t-[18px] border-b-[2px] border-black flex justify-center"><div className="w-2 h-4 bg-[#00C2CB] rounded-full -mt-2 border-[2px] border-black" /></div>}
         
         {/* 眼睛與嘴巴 */}
         <div className="flex gap-4 mt-2">
            <div className="w-2.5 h-3 bg-black rounded-full" />
            <div className="w-2.5 h-3 bg-black rounded-full" />
         </div>
         <div className="w-4 h-1.5 border-b-[2px] border-black rounded-b-full mt-0.5" />

         {/* 腮紅 (極度誇張) */}
         <div className="absolute bottom-1 w-full flex justify-between px-1">
            <div className="w-5 h-3.5 bg-[#FF85A2]/80 rounded-full blur-[1px]" />
            <div className="w-5 h-3.5 bg-[#FF85A2]/80 rounded-full blur-[1px]" />
         </div>
      </motion.div>

      {/* 身體 (極簡小身體) */}
      <motion.div 
        animate={isMoving ? { rotate: [-5, 5, -5] } : {}}
        transition={{ repeat: Infinity, duration: 0.3 }}
        className="w-[26px] h-[22px] bg-[#8D6E63] border-x-[3px] border-b-[3px] border-black rounded-b-[6px] -mt-1 z-0 relative shadow-[inset_-2px_-2px_0_rgba(0,0,0,0.2)]" 
      />

      {/* 腳 */}
      <div className="flex gap-2 -mt-0.5 relative z-[-1]">
         <motion.div animate={isMoving ? { y: [0, -3, 0] } : {}} transition={{ repeat: Infinity, duration: 0.3, delay: 0.15 }} className="w-2 h-3 bg-slate-800 border-x-[2px] border-b-[2px] border-black rounded-b-full" />
         <motion.div animate={isMoving ? { y: [0, -3, 0] } : {}} transition={{ repeat: Infinity, duration: 0.3 }} className="w-2 h-3 bg-slate-800 border-x-[2px] border-b-[2px] border-black rounded-b-full" />
      </div>
      
      {/* 陰影 */}
      <div className="w-10 h-2 bg-black/20 rounded-full blur-[2px] mt-1" />
    </div>
  );
}

export function DynamicEnvironment({ isNight, activeRegion, season }: { isNight: boolean, activeRegion: string, season?: string }) {
  const isAutumn = season === 'AUTUMN';
  
  // 決定主色調
  const skyColor = isNight ? '#1e1b4b' : (isAutumn ? '#fcd34d' : '#bae6fd');
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none transition-colors duration-1000" style={{ backgroundColor: skyColor }}>
      {/* 雲朵 (白天) */}
      {!isNight && (
         <div className="absolute top-20 flex w-full justify-around opacity-60">
            <div className="w-64 h-16 bg-white rounded-full blur-md" />
            <div className="w-48 h-12 bg-white rounded-full blur-sm mt-16" />
            <div className="w-72 h-20 bg-white rounded-full blur-md -mt-8" />
         </div>
      )}
    </div>
  );
}

// 輔助組件：圓潤路樹 (統一使用)
export function RoundTree({ color = '#84cc16' }: { color?: string }) {
  return (
    <div className="relative flex flex-col items-center drop-shadow-[0_15px_10px_rgba(0,0,0,0.3)] z-20">
      <div className="w-28 h-32 border-[4px] border-black rounded-[2.5rem] shadow-[inset_-8px_-8px_0_rgba(0,0,0,0.2)] relative overflow-hidden flex items-center justify-center" style={{ backgroundColor: color }}>
         <div className="absolute top-3 left-4 w-10 h-10 bg-white/30 rounded-full blur-[2px]" />
         <div className="w-16 h-16 bg-black/10 rounded-full" />
      </div>
      <div className="w-5 h-20 bg-[#78350f] border-x-[4px] border-black -mt-4 z-[-1] relative">
         <div className="absolute left-1/2 w-1 h-full bg-black/20" />
      </div>
      <div className="w-20 h-4 bg-black/30 rounded-[100%] blur-[2px] mt-1" />
    </div>
  );
}

// 輔助組件：長椅
export function Bench() {
  return (
    <div className="relative w-40 h-20 flex flex-col justify-end items-center drop-shadow-[0_10px_5px_rgba(0,0,0,0.3)] z-10">
      <div className="w-full h-[40px] bg-[#d97706] border-[4px] border-black rounded-md flex flex-col justify-evenly py-1 px-2 shadow-[inset_0_-6px_0_rgba(0,0,0,0.2)] relative z-10">
         <div className="w-full h-[4px] bg-black/40 rounded-full" />
         <div className="w-full h-[4px] bg-black/40 rounded-full" />
      </div>
      <div className="flex w-[85%] justify-between -mt-3 relative z-0">
         <div className="w-5 h-12 bg-[#3f3f46] border-[4px] border-black shadow-[inset_-3px_0_0_rgba(0,0,0,0.5)]" />
         <div className="w-5 h-12 bg-[#3f3f46] border-[4px] border-black shadow-[inset_-3px_0_0_rgba(0,0,0,0.5)]" />
      </div>
    </div>
  );
}

// 輔助組件：復古街燈
export function StreetLamp({ isOn = false }: { isOn?: boolean }) {
  return (
    <div className="relative flex flex-col items-center h-[260px] drop-shadow-[0_10px_10px_rgba(0,0,0,0.4)] z-10">
      {/* 燈罩 */}
      <div className={`w-16 h-16 ${isOn ? 'bg-[#fef08a]' : 'bg-[#f8fafc]'} border-[4px] border-black rounded-full relative z-10 flex items-center justify-center ${isOn ? 'shadow-[0_0_40px_rgba(253,224,71,0.8)]' : ''} transition-shadow duration-700`}>
        <div className="w-[120%] h-5 bg-[#334155] border-[4px] border-black absolute top-0 rounded-t-sm shadow-[inset_0_-3px_0_rgba(0,0,0,0.5)] flex items-center justify-center">
           <div className="w-4 h-2 bg-black absolute -top-2 rounded-t-full" />
        </div>
        {isOn && <div className="absolute inset-2 bg-white rounded-full blur-[6px] opacity-100" />}
      </div>
      {/* 燈柱 */}
      <div className="w-4 h-[220px] bg-[#475569] border-x-[4px] border-black -mt-2 z-0 relative shadow-[inset_-2px_0_0_rgba(0,0,0,0.5)]" />
      <div className="w-10 h-8 bg-[#1e293b] border-[4px] border-black -mt-1 flex flex-col justify-end shadow-[inset_-3px_0_0_rgba(0,0,0,0.5)]">
         <div className="w-full h-2 bg-black/20" />
      </div>
    </div>
  );
}
