import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AvatarHead } from './AvatarHead';

export type ActionType = 'phone' | 'slack' | 'read' | 'walk' | 'idle' | 'pc' | 'eat' | 'typing' | 'sleep' | 'coffee' | 'social' | 'excited';

export interface PixelAvatarProps {
  id: string;
  action: ActionType;
  facing: 1 | -1;
  aura?: boolean;
}

export const ScoutPixelAvatar: React.FC<PixelAvatarProps> = ({ id, action, facing, aura }) => {
  const isJin = id === '1';
  const isAori = id === '2';
  const isWang = id === '3';
  const isNpc = !isJin && !isAori && !isWang;

   const showPhone = action === 'phone';
   const showLaptop = action === 'pc' || action === 'typing';
   const showSweat = action === 'slack' || action === 'pc' || action === 'typing';
   const isWalking = action === 'walk';

  const skinColor = isJin ? '#FFDCA8' : isAori ? '#FFE0B2' : isWang ? '#F5E6CC' : '#E0C097';
  const primaryColor = isJin ? '#212121' : isAori ? '#00B4D8' : isWang ? '#B0BEC5' : '#8D6E63';

  return (
    <div className={`relative w-16 h-20 flex flex-col justify-end items-center ${aura ? 'drop-shadow-[0_0_8px_#FFD166] drop-shadow-[0_0_12px_#FFD166]' : ''}`} style={{ transform: `scaleX(${facing})` }}>
      {/* Base Shadow Floor */}
      <div className="absolute -bottom-1 w-8 h-2 bg-black/20 rounded-full blur-[2px] z-0" />

      {/* Reaction Emote */}
      <AnimatePresence>
        {action === 'excited' && (
          <motion.div 
            initial={{ opacity: 0, y: 0, scale: 0 }}
            animate={{ opacity: 1, y: -90, scale: 1.5 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute z-50 text-2xl"
          >
            ❗
          </motion.div>
        )}
      </AnimatePresence>

      <AvatarHead 
        id={id}
        action={action}
        skinColor={skinColor}
        isWalking={isWalking}
        isJin={isJin}
        isAori={isAori}
        isWang={isWang}
        isNpc={isNpc}
      />

      {/* Body Area */}
      <div className="absolute top-11 w-3 h-2 bg-[#8B5A2B]/40 z-10" />

      <motion.div 
         className="relative w-7 h-5 border-x-[2.5px] border-b-[2.5px] border-black rounded-b-[4px] z-10 flex flex-col items-center overflow-hidden shadow-[inset_-2px_-2px_0_rgba(0,0,0,0.2)]"
         style={{ backgroundColor: primaryColor }}
         animate={ isWalking ? { rotate: [0, 3, -3, 0] } : action === 'pc' ? { y: 1 } : {} }
         transition={{ repeat: Infinity, duration: 0.35 }}
      >
        {isJin && <div className="absolute top-0 w-1 h-3 bg-red-600 z-10" />}
        {isAori && (
           <div className="w-4 h-2 bg-white rounded-b-md mt-0.5 border-[1.5px] border-black/20 flex justify-center">
              <div className="w-1.5 h-1.5 text-[5px] font-black text-[#FF85A2] mt-0.5">♥</div>
           </div>
        )}
        {isWang && (
           <div className="w-3 h-2 bg-white border-x-[1.5px] border-b-[1.5px] border-black/30 mt-0.5 rounded-b-sm" />
        )}
      </motion.div>

      {/* ARMS */}
      <motion.div 
          className="absolute top-11 -left-1 w-2.5 h-4.5 border-[2.5px] border-black rounded-full shadow-sm z-0 origin-top" 
          style={{ backgroundColor: primaryColor }}
          animate={isWalking ? { rotate: [-30, 30, -30] } : action === 'phone' ? { rotate: -120, y: -2, x: 2 } : { rotate: 0 }}
          transition={{ repeat: Infinity, duration: 0.35 }}
      >
           <div className="absolute bottom-[-1px] left-[1px] w-1.2 h-1.5 bg-[#FFE0B2] border-t border-black/30 rounded-full" />
      </motion.div>

      <motion.div 
          className="absolute top-11 -right-1 w-2.5 h-4.5 border-[2.5px] border-black rounded-full shadow-sm z-30 origin-top" 
          style={{ backgroundColor: primaryColor }}
          animate={
              isWalking ? { rotate: [30, -30, 30] } : 
              action === 'pc' ? { rotate: 50, y: 1 } :
              action === 'eat' ? { rotate: -120, y: -4, x: -2 } : { rotate: 0 }
          }
          transition={{ repeat: Infinity, duration: 0.35 }}
      >
          <div className="absolute bottom-[-1px] left-[1px] w-1.2 h-1.5 bg-[#FFE0B2] border-t border-black/30 rounded-full" />
          {showPhone && (
             <div className="absolute bottom-[-4px] -right-1 w-2.5 h-3.5 bg-slate-800 border-[1.5px] border-black rounded-[2px] transform rotate-[60deg]">
                <div className="w-full h-[60%] bg-blue-200 mt-0.5 mx-[1px]" />
             </div>
          )}
      </motion.div>

      {/* Legs */}
      <div className="relative w-4 h-3.5 flex justify-between z-0 -mt-0.5 px-0.5">
          <motion.div 
             className="w-1.5 h-full border-x-[2px] border-b-[2px] border-black rounded-b-sm bg-gray-800"
             animate={ isWalking ? { y: [0, -3, 0] } : {} }
             transition={{ repeat: Infinity, duration: 0.35, delay: 0.17 }}
          />
          <motion.div 
             className="w-1.5 h-full border-x-[2px] border-b-[2px] border-black rounded-b-sm bg-gray-800"
             animate={ isWalking ? { y: [0, -3, 0] } : {} }
             transition={{ repeat: Infinity, duration: 0.35 }}
          />
      </div>

      {(showLaptop) && (
         <div className="absolute bottom-1 -right-6 w-9 h-7 flex flex-col justify-end z-40 transform translate-y-1">
             <div className="w-7 h-5 bg-gray-200 border-[2px] border-black rounded-sm transform -rotate-12 flex justify-center items-center shadow-[1px_1px_0_rgba(0,0,0,0.5)]">
                <div className="w-5 h-3 bg-blue-100 flex flex-col gap-[1px] pt-[1px] px-[1px] overflow-hidden">
                   <div className="w-full h-[2px] bg-blue-300" />
                   <div className="w-3/4 h-[2px] bg-blue-300" />
                   {action === 'typing' && (
                       <motion.div 
                        initial={{ x: -10 }} 
                        animate={{ x: 20 }} 
                        transition={{ repeat: Infinity, duration: 1 }} 
                        className="w-4 h-1 bg-white/60" 
                       />
                   )}
                </div>
             </div>
             <div className="w-8 h-1.5 bg-gray-300 border-[2px] border-black rounded-b-sm -ml-2 -mt-[1px] z-[-1]" />
         </div>
      )}

      {action === 'read' && (
         <div className="absolute top-6 -right-2 w-6 h-7 bg-[#FFF9C4] border-[2.5px] border-black rounded-sm z-40 transform rotate-[15deg] shadow-[2px_2px_0_rgba(0,0,0,0.4)] flex flex-col p-1 gap-1">
             <div className="w-full h-[2px] bg-black/30" />
             <div className="w-4/5 h-[2px] bg-black/30" />
             <div className="w-full h-1.5 bg-[#FF85A2]/60 mt-0.5 border border-[#FF85A2]" />
         </div>
      )}
    </div>
  );
};
