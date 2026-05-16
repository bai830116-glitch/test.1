import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScoutStaff } from '../../../../types/scout';
import { ScoutPixelAvatar } from './ScoutPixelAvatar';

interface StaffSpriteProps {
  staff: ScoutStaff;
  onClick: (id: string) => void;
}

export const StaffSprite: React.FC<StaffSpriteProps> = ({ staff, onClick }) => {
  const isDispatched = !!staff.dispatchRoute;
  const displayActionText = isDispatched ? '[📡 跨國遠端連線中]' : staff.actionText;

  // Mood indicators
  const moodEmoteMap: Record<string, string> = {
    happy: '✨',
    tired: '💧',
    focused: '🔥',
    social: '💬'
  };

  const isExcited = staff.action === 'excited';

  return (
    <motion.div
      className="absolute bottom-1 drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] flex flex-col items-center cursor-pointer will-change-transform z-20 scale-[0.6] origin-bottom"
      initial={false}
      animate={{ 
        left: `${staff.x}%`, 
        x: '-50%',
        scaleY: isExcited ? [1, 1.15, 1] : [1, 1.02, 1],
        y: staff.action === 'walk' ? [0, -3, 0] : 0 
      }}
      transition={{ 
        left: { type: "spring", stiffness: 60, damping: 20 },
        scaleY: { repeat: Infinity, duration: isExcited ? 0.3 : 2, ease: "easeInOut" },
        y: { repeat: Infinity, duration: 0.3, ease: "linear" }
      }}
      onClick={() => onClick(staff.id)}
    >
      <ScoutPixelAvatar 
        id={staff.id} 
        action={staff.action} 
        facing={staff.facing} 
      />

      <div 
        className="mt-1 px-1.5 py-0.5 rounded-sm border-2 border-black text-[9px] font-black text-black z-10 tracking-widest shadow-sm"
        style={{ backgroundColor: staff.color }}
      >
        <span className="pb-[10%] block text-center leading-none">{staff.name}</span>
      </div>
    </motion.div>
  );
};
