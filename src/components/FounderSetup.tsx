import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Briefcase } from 'lucide-react';
import { GameFounderConfig, DifficultyId } from '../types/game';
import { DIFFICULTIES, FUNNY_NAMES } from './founder-setup/SetupConstants';
import { SetupBasicInfo } from './founder-setup/SetupBasicInfo';
import { SetupDifficulty } from './founder-setup/SetupDifficulty';
import { DifficultyDetails } from './founder-setup/DifficultyDetails';

export interface FounderSetupProps {
  onBack: () => void;
  onComplete: (data: GameFounderConfig) => void;
}

export default function FounderSetup({ onBack, onComplete }: FounderSetupProps) {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'M' | 'F'>('M');
  const [diffId, setDiffId] = useState<DifficultyId>('normal');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [diceRotation, setDiceRotation] = useState(0);

  const selectedDiff = DIFFICULTIES.find(d => d.id === diffId)!;

  const handleRandomName = () => {
    setDiceRotation(prev => prev + 360);
    const randomName = FUNNY_NAMES[Math.floor(Math.random() * FUNNY_NAMES.length)];
    setName(randomName);
  };

  const handleStart = () => {
    onComplete({ name: name || '無名氏', gender, difficulty: diffId });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
      style={{ backgroundColor: 'var(--color-bg-dark)' }}
      className="relative min-h-[100dvh] w-full bg-bg-dark text-white overflow-y-auto overflow-x-hidden flex flex-col p-4 sm:p-6 pb-24"
    >
      {/* 1. Top Navigation */}
      <div className="flex items-center justify-between mt-2 mb-8 relative">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="flex items-center justify-center bg-panel-dark hover:bg-panel-darker border-2 border-white/10 rounded-[14px] px-3 py-2 text-white/80 transition-colors shadow-sm z-10"
        >
          <ChevronLeft className="w-6 h-6 mr-1" />
          <span className="font-bold pb-[2px] pr-2">返回</span>
        </motion.button>
        
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none">
          <div className="bg-gradient-to-r from-tiffany-dark to-tiffany shadow-[0_4px_12px_rgba(10,186,181,0.3)] rounded-full px-6 py-2 border border-white/20">
            <span className="text-white font-heavy text-xl tracking-wider drop-shadow-md pb-[2px] block">大亨的起點</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-lg mx-auto flex flex-col gap-6">
        <SetupBasicInfo 
          name={name} setName={setName} gender={gender} setGender={setGender}
          diceRotation={diceRotation} handleRandomName={handleRandomName}
        />

        <SetupDifficulty 
          diffId={diffId} setDiffId={setDiffId} isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen} selectedDiff={selectedDiff}
        />

        <DifficultyDetails selectedDiff={selectedDiff} diffId={diffId} />
      </div>

      {/* 2. Bottom Main Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 sm:p-6 z-40 flex justify-center pointer-events-none" style={{ backgroundImage: 'linear-gradient(to top, var(--color-bg-dark), transparent)' }}>
        <div className="w-full max-w-lg pointer-events-auto">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            style={{ background: 'linear-gradient(to right, var(--color-tiffany), var(--color-tiffany-light))' }}
            className="w-full relative overflow-hidden group text-tiffany-dark shadow-[0_6px_0_0_var(--color-tiffany-dark)] active:shadow-[0_0px_0_0_var(--color-tiffany-dark)] active:translate-y-[6px] rounded-[24px] h-16 flex items-center justify-center transition-all outline-none"
          >
            <span className="font-heavy text-2xl tracking-widest pb-[4px] relative z-10 flex items-center gap-2">
              <Briefcase className="w-6 h-6 stroke-[3px]" />
              開啟星夢之旅
            </span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-active:opacity-100 transition-opacity"></div>
          </motion.button>
        </div>
      </div>

    </motion.div>
  );
}

