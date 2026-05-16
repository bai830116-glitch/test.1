import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { DifficultyId } from '../../types/game';
import { DIFFICULTIES, DifficultyConfig } from './SetupConstants';

interface SetupDifficultyProps {
  diffId: DifficultyId;
  setDiffId: (id: DifficultyId) => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (open: boolean) => void;
  selectedDiff: DifficultyConfig;
}

export const SetupDifficulty: React.FC<SetupDifficultyProps> = ({
  diffId,
  setDiffId,
  isDropdownOpen,
  setIsDropdownOpen,
  selectedDiff
}) => {
  return (
    <section className="relative z-50">
      <label className="text-white/60 text-sm font-medium mb-2 block tracking-wider">身分難度選擇</label>
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-full bg-panel-dark border-2 border-tiffany rounded-[16px] h-16 flex items-center justify-between px-5 shadow-[0_0_15px_rgba(10,186,181,0.2)]"
      >
        <span className="font-bold text-lg text-white pb-[2px]">{selectedDiff.label}</span>
        <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }}>
          <ChevronDown className="w-6 h-6 text-tiffany" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-panel-darker border border-white/10 rounded-[16px] overflow-hidden shadow-xl"
          >
            {DIFFICULTIES.map((diff) => (
              <button 
                key={diff.id}
                onClick={() => { setDiffId(diff.id); setIsDropdownOpen(false); }}
                className={`w-full text-left px-5 py-4 font-medium transition-colors border-b border-white/5 last:border-b-0 ${diff.id === diffId ? 'bg-tiffany/20 text-tiffany' : 'text-white/70 hover:bg-white/5'}`}
              >
                <span className="pb-[2px] block">{diff.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
