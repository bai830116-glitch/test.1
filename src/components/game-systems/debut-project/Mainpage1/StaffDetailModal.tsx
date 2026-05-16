import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BatteryMedium, Search, BrainCircuit } from 'lucide-react';
import { ScoutStaff } from '../../../../types/scout';
import { ScoutPixelAvatar } from './ScoutPixelAvatar';

interface StaffDetailModalProps {
  staff: ScoutStaff | null;
  onClose: () => void;
}

export const StaffDetailModal: React.FC<StaffDetailModalProps> = ({ staff, onClose }) => {
  return (
    <AnimatePresence>
      {staff && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="absolute inset-0 bg-black/60 z-40 backdrop-blur-sm" 
            onClick={onClose} 
          />
          <motion.div 
            initial={{ y: '100%' }} 
            animate={{ y: 0 }} 
            exit={{ y: '100%' }} 
            transition={{ type: "spring", stiffness: 300, damping: 30 }} 
            className="absolute bottom-0 left-0 right-0 bg-[#0F172A] rounded-t-[2rem] border-t-[6px] shadow-[0_-10px_40px_rgba(0,180,216,0.3)] z-50 flex flex-col max-h-[85vh] font-sans" 
            style={{ borderColor: staff.color }}
          >
            <div className="w-16 h-2 bg-white/20 rounded-full mx-auto mt-4 mb-2 shrink-0 cursor-pointer" onClick={onClose} />
            
            <div className="p-6 pt-2 overflow-y-auto flex-1 relative">
              {staff.dispatchRoute && (
                <div className="absolute top-0 right-6 bg-tiffany border-[2px] border-black text-white text-[10px] md:text-xs font-black px-3 py-1.5 rounded-b-lg shadow-md z-10 tracking-widest flex items-center gap-1">
                  <span className="animate-pulse w-2 h-2 bg-macaron rounded-full border border-black inline-block" />
                  【出差中：{staff.dispatchRoute}】
                </div>
              )}

              <div className="flex items-center gap-4 mb-6 mt-4">
                <div 
                  className="w-20 h-20 rounded-xl border-[4px] flex items-center justify-center bg-[#87CEEB] shadow-[4px_4px_0_rgba(0,0,0,1)] relative block shrink-0 overflow-hidden" 
                  style={{ borderColor: staff.color }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />
                  <div className="transform scale-125 translate-y-[10px]">
                    <ScoutPixelAvatar id={staff.id} action={staff.action} facing={1} />
                  </div>
                  {staff.mood === 'happy' && (
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute top-1 right-1 text-xl drop-shadow-md"
                    >
                      ✨
                    </motion.div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-3xl font-black text-white drop-shadow-[2px_2px_0_#000]" style={{ color: staff.color }}>
                      <span className="pb-[10%] block">{staff.name}</span>
                    </h2>
                    {staff.mood === 'tired' && <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-md font-black animate-pulse">OVERWORKED</span>}
                  </div>
                  <div className="inline-block bg-tiffany border-2 border-black rounded-lg px-3 py-1 shadow-[2px_2px_0_#000] relative overflow-hidden">
                    <span className="text-sm font-black text-white tracking-widest drop-shadow-md">
                      <span className="pb-[10%] block">{staff.role}</span>
                    </span>
                  </div>
                </div>

                <button 
                  onClick={onClose} 
                  className="self-start p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X size={24} className="text-white" />
                </button>
              </div>

              {/* Behavior Status */}
              <div className="mb-6 grid grid-cols-2 gap-3">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                   <div className="text-[10px] font-black text-zinc-500 uppercase tracking-tighter mb-1">當前狀態</div>
                   <div className="text-white text-sm font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      {staff.actionText}
                   </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                   <div className="text-[10px] font-black text-zinc-500 uppercase tracking-tighter mb-1">互動目標</div>
                   <div className="text-white text-sm font-bold flex items-center gap-2 truncate">
                      {staff.interactingWith ? `📍 使用：${staff.interactingWith}` : '☁️ 隨機巡邏中'}
                   </div>
                </div>
              </div>

              {/* Stats Section */}
              <div className="bg-[#1E293B] rounded-2xl p-5 mb-6 border-[3px] border-black shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)] space-y-5">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[#A1A1AA] text-sm font-black flex items-center gap-1.5 tracking-widest">
                      <BatteryMedium size={18} className={staff.fatigue > 80 ? 'text-red-500 animate-bounce' : 'text-green-400'}/> 工作疲勞度
                    </span>
                    <span className="text-[#A1A1AA] font-black text-lg">{Math.floor(staff.fatigue)} / 100</span>
                  </div>
                  <div className="h-6 bg-[#0F172A] rounded-md overflow-hidden border-[2.5px] border-black p-[2px] shadow-sm relative">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${staff.fatigue}%` }} 
                      className={`h-full rounded-sm relative z-0 border-t-4 border-white/30 ${
                        staff.fatigue > 80 ? 'bg-red-500' : staff.fatigue > 50 ? 'bg-orange-400' : 'bg-green-400'
                      }`} 
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[#FF85A2] text-sm font-black flex items-center gap-1.5 tracking-widest">
                      <Search size={18}/> 顏值辨識力
                    </span>
                    <span className="text-[#FF85A2] font-black text-lg">{staff.stats.charm} / 100</span>
                  </div>
                  <div className="h-6 bg-[#0F172A] rounded-md overflow-hidden border-[2.5px] border-black p-[2px] shadow-sm relative">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${staff.stats.charm}%` }} 
                      className="h-full bg-[#FF85A2] rounded-sm relative z-0 border-t-4 border-white/40" 
                    />
                  </div>
                </div>
              </div>

              <div className="bg-tiffany/10 border-2 border-tiffany/30 rounded-2xl p-4 mb-6 flex items-center gap-3">
                <BrainCircuit size={24} className="text-tiffany animate-pulse" />
                <div>
                  <div className="text-white text-xs font-black pb-[2px]">AI 全自動人力維護中</div>
                  <div className="text-tiffany/70 text-[10px] font-bold">系統將根據疲勞度自動批核經費進行補給</div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
