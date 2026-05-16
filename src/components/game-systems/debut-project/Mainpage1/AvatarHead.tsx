import React from 'react';
import { motion } from 'motion/react';
import { ActionType } from './ScoutPixelAvatar';

interface AvatarHeadProps {
  id: string;
  action: ActionType;
  skinColor: string;
  isWalking: boolean;
  actionState?: string;
  isJin: boolean;
  isAori: boolean;
  isWang: boolean;
  isNpc: boolean;
}

export const AvatarHead: React.FC<AvatarHeadProps> = ({
  id,
  action,
  skinColor,
  isWalking,
  isJin,
  isAori,
  isWang,
  isNpc
}) => {
  return (
    <motion.div 
      className="relative w-[68px] h-[58px] rounded-[24px] border-[3.5px] border-black z-20 flex justify-center shadow-[inset_-4px_-5px_0_rgba(0,0,0,0.15)] overflow-visible"
      style={{ backgroundColor: skinColor }}
      animate={
        action === 'excited' ? { y: [0, -8, 0], scale: [1, 1.05, 1] } :
        isWalking ? { y: [0, -3, 0] } :
        action === 'slack' || action === 'sleep' ? { y: [0, 2, 0], rotate: [-4, 4, -4] } :
        action === 'pc' || action === 'typing' ? { rotate: 5, x: 1 } : 
        action === 'phone' ? { rotate: [-2, 2, -2] } :
        action === 'coffee' ? { rotate: 3, y: 1 } : {}
      }
      transition={{ repeat: Infinity, duration: action === 'excited' ? 0.3 : isWalking ? 0.35 : action === 'slack' ? 2 : 1 }}
    >
      {/* Hair Elements */}
      {isAori && (
         <>
           <div className="absolute -top-[3.5px] left-[-3px] right-[-3px] h-6 bg-[#FF85A2] rounded-t-[14px] rounded-b-[3px] border-b-[3px] border-black/30" />
           <motion.div 
             className="absolute top-1 -left-5 w-5 h-8 bg-[#FF85A2] rounded-l-full rounded-br-full border-[3px] border-black z-[-1] origin-top-right transform -rotate-12" 
             animate={isWalking ? { rotate: [-10, -25, -10] } : {}} transition={{ repeat: Infinity, duration: 0.4 }}
           />
           <motion.div 
             className="absolute top-1 -right-5 w-5 h-8 bg-[#FF85A2] rounded-r-full rounded-bl-full border-[3px] border-black z-[-1] origin-top-left transform rotate-12" 
             animate={isWalking ? { rotate: [10, 25, 10] } : {}} transition={{ repeat: Infinity, duration: 0.4 }}
           />
           <div className="absolute -top-4.5 left-1/2 -translate-x-1/2 w-10 h-5 bg-[#81D8D0] border-[3px] border-black rounded-t-md">
               <div className="absolute -bottom-[3px] -right-2.5 w-6 h-2 bg-[#81D8D0] border-[3px] border-black rounded-r-md border-l-0" />
               <div className="absolute top-1 left-2 w-1.5 h-1.5 bg-white/40 rounded-full" />
           </div>
           {action === 'idle' && (
             <motion.div 
               animate={{ scale: [0.5, 1.2, 0.5], opacity: [0.8, 1, 0.8] }} transition={{ repeat: Infinity, duration: 1.5 }}
               className="absolute bottom-1 right-2 w-4 h-4 bg-pink-300 rounded-full border-[2px] border-black/50 overflow-hidden shadow-sm"
             >
               <div className="absolute top-[2px] right-[2px] w-2 h-2 bg-white/60 rounded-full" />
             </motion.div>
           )}
         </>
      )}
      
      {isJin && (
         <>
            <div className="absolute -top-1.5 -left-1 -right-1 h-5 bg-[#3E2723] rounded-t-xl border-b-[3px] border-black" />
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-7 h-5 bg-[#3E2723] rounded-t-lg border-x-[3px] border-t-[3px] border-black" />
         </>
      )}
      
      {isWang && (
         <>
            <div className="absolute -top-1.5 -left-1.5 -right-1.5 h-6 bg-[#212121] rounded-t-xl border-[3px] border-black" />
            <div className="absolute -top-2.5 left-1 w-4.5 h-4.5 bg-[#212121] transform rotate-45 border-l-[3px] border-t-[3px] border-black rounded-tl-sm" />
            <div className="absolute -top-2 right-1 w-4 h-4 bg-[#212121] transform rotate-45 border-r-[3px] border-t-[3px] border-black rounded-tr-sm z-30" />
         </>
      )}

      {isNpc && (
         <>
            <div className="absolute -top-[3px] -left-1 -right-1 h-[8px] bg-[#4E342E] rounded-t-xl border-[2px] border-black" />
         </>
      )}

      {/* Face Wrapper */}
      <div className="relative w-full h-full pt-6 flex justify-center z-10 pointer-events-none">
          {/* Eyes */}
          {isJin ? (
             <div className="absolute top-5 w-12 h-5 bg-black flex gap-[2px] justify-center items-center shadow-md">
               <div className="w-[16px] h-[10px] bg-white/40 rounded-sm ml-0.5 mt-0.5 relative overflow-hidden">
                  <motion.div animate={{ x: [-20, 20] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 bg-white/20 -skew-x-12" />
               </div>
               <div className="w-[16px] h-[10px] bg-white/40 rounded-sm mt-0.5 mr-0.5 relative overflow-hidden">
                  <motion.div animate={{ x: [-20, 20] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 bg-white/20 -skew-x-12" />
               </div>
             </div>
          ) : (
             <div className="absolute top-7 flex gap-4.5">
                 <div className="w-4.5 h-5.5 bg-black rounded-full relative overflow-hidden">
                     {(action === 'slack' || action === 'idle') ? 
                       <div className="absolute -top-0.5 -left-1 w-8 h-4.5 bg-[#FFE0B2]" /> 
                       : <div className="absolute top-1 right-[2px] w-3 h-3 bg-white rounded-full flex items-center justify-center">
                           <div className="w-1.5 h-1.5 bg-blue-300/40 rounded-full" />
                         </div>
                     }
                     <div className="absolute bottom-1 left-2 w-2 h-2 bg-white/40 rounded-full" />
                 </div>
                 <div className="w-4.5 h-5.5 bg-black rounded-full relative overflow-hidden">
                     {(action === 'slack' || action === 'idle') ? 
                       <div className="absolute -top-0.5 -left-1 w-8 h-4.5 bg-[#FFE0B2]" />
                       : <div className="absolute top-1 right-[2px] w-3 h-3 bg-white rounded-full flex items-center justify-center">
                           <div className="w-1.5 h-1.5 bg-blue-300/40 rounded-full" />
                         </div>
                     }
                     <div className="absolute bottom-1 left-2 w-2 h-2 bg-white/40 rounded-full" />
                 </div>
             </div>
          )}

          {/* Blush */}
          <div className="absolute top-10 w-14 flex justify-between opacity-95 px-1">
             <div className="w-4 h-2.5 bg-[#FF85A2] rounded-full blur-[1.2px]" />
             <div className="w-4 h-2.5 bg-[#FF85A2] rounded-full blur-[1.2px]" />
          </div>

          {isWang && (
             <div className="absolute top-3 w-8 h-3 border-[1.5px] border-black/60 rounded-[3px] flex justify-between px-[1px] z-10">
                <div className="w-3 h-2.5 border-[1.5px] border-black/80 rounded-[2px]" />
                <div className="w-3 h-2.5 border-[1.5px] border-black/80 rounded-[2px]" />
             </div>
          )}
          
          {isWang && (
              <div className="absolute top-[20px] w-7 flex justify-between px-0.5 opacity-40 z-0">
                 <div className="w-[10px] h-1.5 bg-purple-900 rounded-b-full" />
                 <div className="w-[10px] h-1.5 bg-purple-900 rounded-b-full" />
              </div>
          )}

          {/* Mouth */}
          <div className={`
            absolute bottom-2.5 bg-black
            ${action === 'phone' || action === 'sleep' ? 'w-2 h-3.5 rounded-full left-[60%]' : 
              action === 'read' || action === 'typing' ? 'w-4 h-[2.5px] rounded-none' : 
              action === 'slack' ? 'w-2.5 h-2.5 rounded-full scale-y-50' :
              action === 'eat' ? 'w-4 h-4 rounded-full' :
              'w-3 h-1.5 rounded-b-full'}
          `} />
          
          {(action === 'slack') && (
              <motion.div animate={{ opacity:[0,1,0], x:[0,6,10], y:[0,-5,-10] }} transition={{ repeat:Infinity, duration:2 }} className="absolute -top-3 -right-3 text-[14px] font-black text-blue-500 drop-shadow-[1px_1px_0_#FFF] z-30">
                  z
              </motion.div>
          )}
      </div>
    </motion.div>
  );
};
