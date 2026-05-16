import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info } from 'lucide-react';

interface EncounterDetailsProps {
  selectedLog: any;
}

export const EncounterDetails: React.FC<EncounterDetailsProps> = ({ selectedLog }) => {
  return (
    <>
       <div className="absolute top-0 right-0 w-64 h-64 bg-tiffany/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
       
       <div className="flex-none z-10">
          <h3 className="text-xl font-black mb-4 flex items-center gap-2 border-b-4 border-tiffany pb-2 text-tiffany">
             <Info size={20} />
             約談詳情報告
          </h3>
          
          <AnimatePresence mode="wait">
             {selectedLog ? (
                <motion.div
                  key={selectedLog.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-[#1E293B] border-[4px] border-black rounded-3xl p-4 xl:p-5 shadow-[8px_8px_0_#0ABAB5]"
                >
                   <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 xl:w-16 xl:h-16 rounded-2xl bg-white border-2 border-black flex items-center justify-center text-3xl shadow-sm text-black shrink-0">
                         {selectedLog.avatar}
                      </div>
                      <div className="overflow-hidden">
                         <div className="flex flex-wrap items-center gap-2">
                            <span className="font-black text-xl xl:text-2xl truncate max-w-full">{selectedLog.name}</span>
                            <span className="bg-[#FFD166] border-2 border-black px-2 py-0.5 rounded-lg font-black text-xs text-black shrink-0">{selectedLog.rarity}</span>
                         </div>
                         <div className="text-xs font-bold text-tiffany mt-1 shrink-0 flex items-center gap-2">
                            <span>Day {selectedLog.day} , M{selectedLog.month}</span>
                            <span>({selectedLog.timestamp})</span>
                         </div>
                      </div>
                   </div>
                   <div className="bg-black/40 border-[3px] border-black p-4 rounded-2xl xl:min-h-[90px]">
                      <p className="text-sm font-bold text-slate-200 leading-relaxed italic">「{selectedLog.text}」</p>
                   </div>
                   <div className={`mt-4 text-center py-2 rounded-xl border-2 border-black font-black uppercase text-sm text-black ${
                      selectedLog.status === 'success' ? 'bg-tiffany' : selectedLog.status === 'fail' ? 'bg-[#FF85A2]' : 'bg-[#FFD166]'
                   }`}>
                      {selectedLog.status === 'success' ? 'Success' : selectedLog.status === 'fail' ? 'Rejected' : 'Analyzing'}
                   </div>
                </motion.div>
             ) : (
                <div className="h-32 xl:h-44 border-4 border-dashed border-white/10 rounded-3xl flex items-center justify-center bg-white/5 opacity-40 italic font-black text-slate-400">
                   請從行事曆選擇約談紀錄
                </div>
             )}
          </AnimatePresence>
       </div>
    </>
  );
};
