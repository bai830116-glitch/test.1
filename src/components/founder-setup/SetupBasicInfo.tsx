import React from 'react';
import { motion } from 'motion/react';
import { Dices } from 'lucide-react';
import { FUNNY_NAMES } from './SetupConstants';

interface SetupBasicInfoProps {
  name: string;
  setName: (val: string) => void;
  gender: 'M' | 'F';
  setGender: (val: 'M' | 'F') => void;
  diceRotation: number;
  handleRandomName: () => void;
}

export const SetupBasicInfo: React.FC<SetupBasicInfoProps> = ({
  name,
  setName,
  gender,
  setGender,
  diceRotation,
  handleRandomName
}) => {
  return (
    <section className="bg-panel-dark rounded-[24px] p-5 shadow-lg border border-white/5 space-y-4">
      <div>
        <label className="text-white/60 text-sm font-medium mb-2 block tracking-wider">創辦人藝名</label>
        <div className="flex gap-3 h-14">
          <div className="flex-1 bg-panel-darker rounded-[16px] border border-white/10 overflow-hidden flex items-center px-4 focus-within:border-tiffany transition-colors">
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="輸入超瞎名字..."
              className="w-full bg-transparent outline-none text-white font-medium text-lg placeholder:text-white/30 pb-[2px]"
            />
          </div>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={handleRandomName}
            style={{ backgroundColor: 'var(--color-tiffany-dark)' }}
            className="w-14 h-14 bg-tiffany-dark rounded-[16px] flex items-center justify-center shrink-0 shadow-inner transition-colors"
          >
            <motion.div animate={{ rotate: diceRotation }} transition={{ type: "spring", stiffness: 200, damping: 10 }}>
              <Dices className="w-7 h-7 text-white" />
            </motion.div>
          </motion.button>
        </div>
      </div>
      
      <div>
        <label className="text-white/60 text-sm font-medium mb-2 block tracking-wider">真實面目</label>
        <div className="flex bg-panel-darker rounded-full p-1 border border-white/10 h-14">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setGender('M')}
            className={`flex-1 rounded-full flex items-center justify-center transition-all duration-300 ${gender === 'M' ? 'bg-tiffany text-white shadow-md' : 'text-white/50 hover:text-white/80'}`}
          >
            <span className="font-bold text-lg pb-[2px]">男 ♂</span>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setGender('F')}
            className={`flex-1 rounded-full flex items-center justify-center transition-all duration-300 ${gender === 'F' ? 'bg-tiffany text-white shadow-md' : 'text-white/50 hover:text-white/80'}`}
          >
            <span className="font-bold text-lg pb-[2px]">女 ♀</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
};
