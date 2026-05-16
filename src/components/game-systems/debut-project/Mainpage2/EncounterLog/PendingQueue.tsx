import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Zap } from 'lucide-react';

interface PendingQueueProps {
  pendingEncounters: any[];
  processingId: string | null;
}

export const PendingQueue: React.FC<PendingQueueProps> = ({
  pendingEncounters,
  processingId
}) => {
  return (
    <div className="flex-1 flex flex-col min-h-0 z-10 pt-4">
      <h3 className="text-lg xl:text-xl font-black mb-3 xl:mb-4 flex items-center gap-2 border-b-4 border-[#FF85A2] pb-2 text-[#FF85A2]">
         <User size={20} />
         約定對象名單 ({pendingEncounters.length})
      </h3>
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3 pb-8">
         <AnimatePresence>
            {pendingEncounters.map((p) => {
              const isProcessing = p.id === processingId;
              return (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className={`p-3 rounded-2xl border-[3px] border-black flex items-center gap-3 transition-all ${isProcessing ? 'bg-[#FFD166] text-black' : 'bg-white/10 text-white'}`}
                >
                   <div className="w-10 h-10 rounded-xl bg-white border-2 border-black flex items-center justify-center text-xl shrink-0 text-black">
                      {p.avatar}
                   </div>
                   <div className="flex-1 overflow-hidden">
                      <div className="font-black truncate">{p.name}</div>
                      <div className={`text-[10px] font-bold uppercase tracking-tighter shrink-0 ${isProcessing ? 'text-black/60' : 'text-slate-400'}`}>{p?.rarity || 'C'} 級 / {p?.type || 'NORMAL'}</div>
                   </div>
                   {isProcessing && <Zap size={16} className="animate-spin text-black" />}
                </motion.div>
              )
            })}
            {pendingEncounters.length === 0 && (
               <div className="text-center py-8 opacity-20 italic font-black">本日無約談名單</div>
            )}
         </AnimatePresence>
      </div>
    </div>
  );
};
