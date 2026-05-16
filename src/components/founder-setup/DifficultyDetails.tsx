import React from 'react';
import { motion } from 'motion/react';
import { Building, MapPin, Wallet, Zap } from 'lucide-react';
import { DifficultyConfig } from './SetupConstants';

interface DifficultyDetailsProps {
  selectedDiff: DifficultyConfig;
  diffId: string;
}

export const DifficultyDetails: React.FC<DifficultyDetailsProps> = ({
  selectedDiff,
  diffId
}) => {
  return (
    <>
      {/* Story Container */}
      <motion.section 
        layout
        className="bg-panel-dark rounded-[24px] p-5 shadow-lg border border-white/5"
      >
        <motion.div
          key={diffId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white/90 text-[15px] sm:text-base leading-relaxed tracking-wide font-regular"
        >
          {selectedDiff.story}
        </motion.div>
      </motion.section>

      {/* Starting Attributes List */}
      <motion.section 
        layout
        className="space-y-3"
      >
        <div className="grid grid-cols-2 gap-3">
          <motion.div key={`scale-${diffId}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-panel-dark rounded-[16px] p-4 flex flex-col items-center text-center justify-center border border-white/5">
            <Building className="w-6 h-6 text-tiffany/80 mb-2" />
            <span className="text-white/50 text-xs mb-1">公司規模</span>
            <span className="text-white font-medium text-sm leading-tight pb-[2px]">{selectedDiff.companyScale}</span>
          </motion.div>
          <motion.div key={`loc-${diffId}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.05 }} className="bg-panel-dark rounded-[16px] p-4 flex flex-col items-center text-center justify-center border border-white/5">
            <MapPin className="w-6 h-6 text-tiffany/80 mb-2" />
            <span className="text-white/50 text-xs mb-1">辦公地點</span>
            <span className="text-white font-medium text-sm leading-tight pb-[2px]">{selectedDiff.location}</span>
          </motion.div>
        </div>
        
        <motion.div key={`cash-${diffId}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="bg-panel-dark rounded-[16px] p-4 flex items-center justify-between border border-white/5">
          <div className="flex items-center gap-3">
            <div className="bg-macaron/20 p-2 rounded-full"><Wallet className="w-5 h-5 text-macaron" /></div>
            <span className="text-white/70 font-medium pb-[2px]">創業基金</span>
          </div>
          <span className="text-macaron font-heavy text-xl tracking-wider pb-[2px]">{selectedDiff.cash}</span>
        </motion.div>

        <motion.div key={`talent-${diffId}`} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="bg-panel-dark rounded-[16px] p-4 flex items-start gap-3 border border-tiffany/30 shadow-[inset_0_0_20px_rgba(10,186,181,0.05)]">
           <div className="bg-tiffany/20 p-2 rounded-full shrink-0"><Zap className="w-5 h-5 text-tiffany" /></div>
           <div className="flex flex-col">
             <span className="text-tiffany font-bold mb-1 pb-[2px]">{selectedDiff.talentLabel}</span>
             <span className="text-white/80 text-sm leading-snug">{selectedDiff.talentDesc}</span>
           </div>
        </motion.div>

      </motion.section>
    </>
  );
};
