import React from 'react';
import { Zap } from 'lucide-react';
import { useUpgradeLogic } from './hooks/useUpgradeLogic';
import { StageVisuals } from './StageVisuals';

interface ScoutUpgradePartitionProps {
  searchRadius: number;
  serverLevel: number;
  radarLevel: number;
  funds: number;
  agencyLevel?: number; // 新增：經紀公司等級
  onUpgradeRadar: (newRadius: number, newLevel: number, cost: number) => void;
  onUpgradeServer: (newLevel: number, cost: number) => void;
}

export const ScoutUpgradePartition: React.FC<ScoutUpgradePartitionProps> = (props) => {
  const { funds, radarLevel, serverLevel } = props;
  const {
    showRadarUpgrading,
    showServerUpgrading,
    radarScale,
  } = useUpgradeLogic(props);

  return (
    <div className="relative w-full xl:w-[1372px] xl:mx-auto h-full max-h-screen overflow-hidden flex flex-col font-sans select-none border-x-4 border-black box-border bg-[#0A0E13]">
      <StageVisuals 
        radarScale={radarScale}
        showRadarUpgrading={showRadarUpgrading}
        showServerUpgrading={showServerUpgrading}
        radarLevel={radarLevel}
        serverLevel={serverLevel}
      />

      {/* 頂部 Header */}
      <div className="flex-none pt-4 pb-2 z-20 shrink-0 mx-2">
         <div className="bg-black/90 backdrop-blur-md border-[2px] border-[#0ABAB5] rounded-xl px-4 py-2 flex items-center justify-between shadow-[0_4px_0_#0ABAB5] w-full">
            <div className="flex flex-col">
               <span className="text-[#0ABAB5] text-[8px] font-black tracking-widest drop-shadow-[0_1px_0_#FFF]">BUDGET / 預算</span>
               <span className="text-white font-mono text-lg font-black tracking-widest drop-shadow-[0_2px_2px_#000]">{funds.toLocaleString()} K</span>
            </div>
            <div className="bg-[#0ABAB5] text-black text-[10px] font-black px-2 py-1 rounded-sm tracking-widest animate-pulse">
               LIVE BROADCAST
            </div>
         </div>
      </div>

      <div className="flex-1" />

       {/* Footer Status Bar */}
       <div className="flex-none mx-2 mb-2 lg:mb-2 bg-black/90 backdrop-blur-xl p-3 flex items-center justify-between z-40 border-[2px] border-[#0ABAB5] rounded-xl shadow-[0_4px_0_#0ABAB5]">
          <div className="flex items-center gap-6 pl-2">
             <div className="flex flex-col">
                <span className="text-[7px] font-black text-white/50 tracking-[0.2em] uppercase drop-shadow-sm">Stage Status</span>
                <span className="text-[12px] font-black text-[#81D8D0] italic drop-shadow-[0_0_5px_rgba(129,216,208,0.5)]">ON_AIR</span>
             </div>
             <div className="w-px h-8 bg-white/20" />
             <div className="flex flex-col">
                <span className="text-[7px] font-black text-white/50 tracking-[0.2em] uppercase drop-shadow-sm">System Load</span>
                <span className="text-[12px] font-black text-[#0ABAB5] italic font-mono drop-shadow-[0_0_5px_rgba(10,186,181,0.5)]">NORMAL_v2</span>
             </div>
          </div>
          <div className="flex items-center gap-2 bg-[#1E293B] border-[2px] border-[#0ABAB5]/30 rounded-lg px-4 py-2 shadow-inner group cursor-help transition-all hover:bg-[#0ABAB5]/10">
             <Zap size={16} className="text-[#81D8D0] drop-shadow-[0_0_8px_#81D8D0]" />
             <span className="text-white text-[10px] font-black tracking-[0.2em] drop-shadow-sm">自動升級準備就緒...</span>
          </div>
       </div>
    </div>
  );
};
