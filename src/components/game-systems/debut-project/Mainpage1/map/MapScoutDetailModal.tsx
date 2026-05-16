import React from 'react';
import { motion } from 'motion/react';
import { MapScoutStaff } from '../../../../../types/scout';

interface MapScoutDetailModalProps {
  selectedScout: MapScoutStaff;
  onClose: () => void;
  onSendSupplies: () => void;
  canSendSupplies: boolean;
}

export function MapScoutDetailModal({
  selectedScout,
  onClose,
  onSendSupplies,
  canSendSupplies
}: MapScoutDetailModalProps) {
  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md pointer-events-auto"
        onClick={onClose}
    >
        <motion.div 
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            onClick={e => e.stopPropagation()}
            className="bg-[#121214] rounded-[2.5rem] w-full max-w-sm overflow-hidden shadow-[0_0_100px_rgba(0,180,216,0.2)] border-[4px] border-[#00B4D8]"
        >
            <div className="h-40 bg-gradient-to-br from-[#00B4D8] to-blue-900 relative flex flex-col items-center justify-center pt-4">
                <div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-md border-2 border-white/20 flex items-center justify-center text-5xl shadow-2xl mb-2">
                    {selectedScout.avatarSprite}
                </div>
                <h2 className="text-white text-2xl font-black tracking-tighter drop-shadow-md">{selectedScout.name}</h2>
                <div className="text-white/60 text-[10px] font-black tracking-widest uppercase">{selectedScout.role}</div>
            </div>
            
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 p-3 rounded-2xl border border-white/10 text-center">
                        <div className="text-[9px] text-white/40 mb-1">CURRENT_STATUS</div>
                        <div className="text-xs font-black text-[#FFD166] uppercase">{selectedScout.status}</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-2xl border border-white/10 text-center">
                        <div className="text-[9px] text-white/40 mb-1">SYSTEM_STAMINA</div>
                        <div className="text-xs font-black text-[#00B4D8]">{100 - Math.floor(selectedScout.fatigue)}%</div>
                    </div>
                </div>

                <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-2">核心特質 AGENT TRAITS</span>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-[#00B4D8]/20 text-[#00B4D8] text-[10px] font-black rounded-lg border border-[#00B4D8]/30">#銳利之眼</span>
                        <span className="px-2 py-1 bg-[#FF85A2]/20 text-[#FF85A2] text-[10px] font-black rounded-lg border border-[#FF85A2]/30">#{selectedScout.specialty}專家</span>
                    </div>
                </div>

                <div>
                    <span className="text-[10px] font-black text-white/50 uppercase tracking-widest block mb-2">A1 Activity Intel 日誌</span>
                    <div className="space-y-2 bg-black/40 p-4 rounded-2xl border border-white/5 max-h-32 overflow-y-auto custom-scrollbar">
                        {selectedScout.intelLog.map((log, i) => (
                            <div key={i} className="text-[11px] text-[#00B4D8] font-bold border-l-2 border-[#00B4D8]/30 pl-2 py-0.5">
                                {log}
                            </div>
                        ))}
                        {selectedScout.intelLog.length === 0 && <div className="text-xs text-white/20 text-center py-4 italic">暫無即時日誌</div>}
                    </div>
                </div>

                <div className="flex gap-3">
                    <button 
                        onClick={onSendSupplies}
                        className="flex-1 py-4 bg-[#FFD166] text-black rounded-2xl font-black text-xs active:scale-95 transition-transform disabled:opacity-50"
                        disabled={!canSendSupplies}
                    >
                        發送補給 (Coffee -100)
                    </button>
                    <button className="flex-1 py-4 bg-white/10 text-white rounded-2xl font-black text-xs active:scale-95 transition-transform" onClick={onClose}>
                        關閉窗口
                    </button>
                </div>
            </div>
        </motion.div>
    </motion.div>
  );
}
