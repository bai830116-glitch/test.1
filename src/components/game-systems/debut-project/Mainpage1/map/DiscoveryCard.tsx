import React from 'react';
import { motion } from 'motion/react';

interface DiscoveryCardProps {
  trainee: { name: string; level: string; trait: string } | null;
  onAction: (msg: string) => void;
}

export const DiscoveryCard: React.FC<DiscoveryCardProps> = ({ trainee, onAction }) => {
  if (!trainee) return null;

  return (
    <motion.div 
      initial={{ x: 300, opacity: 0, scale: 0.8 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      exit={{ x: 300, opacity: 0, scale: 0.8 }}
      className="absolute bottom-32 right-4 md:right-8 z-[60] w-64 bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(255,133,162,0.3)] border-4 border-[#FF85A2]"
    >
      <div className="h-40 bg-[#FF85A2] flex flex-col items-center justify-center relative">
        <div className="absolute top-4 left-4 bg-white text-[#FF85A2] text-[10px] font-black px-2 py-0.5 rounded-full">{trainee.level}</div>
        <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center text-4xl mb-2">👤</div>
        <h4 className="text-white text-xl font-black">{trainee.name}</h4>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest block pb-1">Core Trait</span>
          <span className="text-sm font-black text-slate-700">#{trainee.trait}</span>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 py-2 bg-slate-900 text-white text-xs font-black rounded-xl active:scale-95 transition-transform">發送試鏡</button>
          <button 
            onClick={() => onAction(`A1 運算中: ${trainee.name} 具備極高的${trainee.trait}潛力，建議即刻簽約。`)}
            className="flex-1 py-2 bg-[#00B4D8] text-white text-xs font-black rounded-xl active:scale-95 transition-transform"
          >
            A1 預測
          </button>
        </div>
        <div className="text-[8px] text-center text-slate-400 font-bold px-2">由 A1 自主演化引擎於全球數據流中捕捉</div>
      </div>
    </motion.div>
  );
};
