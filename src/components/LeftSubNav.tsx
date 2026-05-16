import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Z_INDEX } from '../constants';

export interface SubNavItem {
  id: string;
  label: string;
  children?: SubNavItem[];
}

interface LeftSubNavProps {
  items: SubNavItem[];
  activeId: string;
  onSelect: (id: string) => void;
  extraInfo?: Record<string, { type: 'bubble' | 'dot', text?: string }>;
}

export default function LeftSubNav({ items, activeId, onSelect, extraInfo }: LeftSubNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    'group-1': true
  });

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const toggleGroup = (id: string) => {
    setExpandedGroups(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            style={{ zIndex: Z_INDEX.LEFT_NAV_BG }}
            onClick={handleClose}
          />
        )}
      </AnimatePresence>

      <div 
        className="absolute top-0 left-0 h-full flex items-center"
        style={{ pointerEvents: isOpen ? 'auto' : 'none', zIndex: Z_INDEX.LEFT_NAV }}
      >
        {/* 左側隱性感應牆 */}
        {!isOpen && (
          <div 
            className="absolute left-0 w-[40px] h-[60%] top-[20%] bg-transparent pointer-events-auto cursor-pointer"
            onMouseEnter={handleOpen}
            onTouchStart={handleOpen}
          />
        )}

        <motion.div 
          initial={false}
          animate={{ x: isOpen ? 0 : '-100%' }}
          transition={{ ease: [0.34, 1.56, 0.64, 1], duration: 0.3 }}
          className="relative bg-[#1a1a1c]/95 backdrop-blur-md border-r border-tiffany/30 h-[75vh] min-h-[500px] rounded-r-[24px] flex flex-col pointer-events-auto min-w-[220px] shadow-[4px_0_20px_rgba(0,0,0,0.5)]"
        >
          {/* 左側隱藏提示條 */}
          {!isOpen && (
             <div className="absolute top-1/2 -right-[6px] -translate-y-1/2 w-[6px] h-[80px] bg-macaron rounded-r-[8px] shadow-[2px_0_10px_rgba(255,237,153,0.5)]" />
          )}

          <div className="px-2 py-4 border-b border-white/10 text-center shrink-0">
            <span className="text-white/50 font-bold tracking-widest text-xs">子系統目錄</span>
          </div>

          <div className="flex-1 px-4 py-6 flex flex-col gap-2 overflow-y-auto [&::-webkit-scrollbar]:hidden">
             {items.map(item => {
               if (item.children) {
                 const isExpanded = expandedGroups[item.id] !== false;
                 return (
                   <div key={item.id} className="w-full flex flex-col gap-1 mb-2">
                     <button 
                       onClick={() => toggleGroup(item.id)}
                       className="w-full flex items-center justify-between px-3 py-2 text-white/80 hover:text-white transition-colors"
                     >
                       <span className="font-bold text-sm tracking-widest">{item.label}</span>
                       {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                     </button>
                     <AnimatePresence>
                       {isExpanded && (
                         <motion.div 
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: 'auto', opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                           className="flex flex-col gap-2 overflow-hidden"
                         >
                           {item.children.map(child => (
                             <button 
                               key={child.id}
                               onClick={() => { onSelect(child.id); handleClose(); }}
                               className={`relative w-full text-left pl-6 pr-4 py-2.5 rounded-lg font-bold tracking-wider text-xs transition-all outline-none border
                                 ${activeId === child.id 
                                   ? 'bg-tiffany/20 text-tiffany border-tiffany/50 shadow-[0_2px_8px_rgba(10,186,181,0.2)]' 
                                   : 'bg-white/5 text-white/60 border-transparent hover:bg-white/10 hover:text-white'
                                 }
                               `}
                             >
                               <span className="pb-[2px] block">{child.label}</span>
                               
                               {/* Extra Info Bubble */}
                               {extraInfo?.[child.id] && (
                                 <motion.div 
                                   initial={{ scale: 0 }}
                                   animate={{ scale: 1 }}
                                   className="absolute -top-1 -right-1 z-10"
                                 >
                                    {extraInfo[child.id].type === 'bubble' ? (
                                      <div className="bg-[#FFD166] text-black text-[8px] font-black px-1.5 py-0.5 rounded-full border border-black animate-bounce shadow-sm">
                                         {extraInfo[child.id].text}
                                      </div>
                                    ) : (
                                      <div className="w-2.5 h-2.5 bg-[#FF85A2] rounded-full border border-black animate-pulse" />
                                    )}
                                 </motion.div>
                               )}
                             </button>
                           ))}
                         </motion.div>
                       )}
                     </AnimatePresence>
                   </div>
                 );
               }

               return (
                 <button 
                   key={item.id}
                   onClick={() => { onSelect(item.id); handleClose(); }}
                   className={`w-full text-center px-4 py-3.5 rounded-xl font-bold tracking-widest transition-all outline-none border-2
                     ${activeId === item.id 
                       ? 'bg-tiffany text-[#121214] border-transparent shadow-[0_4px_12px_rgba(10,186,181,0.4)] scale-[1.02]' 
                       : 'bg-white/5 text-white/70 border-white/5 hover:border-white/20 hover:text-white'
                     }
                   `}
                 >
                   <span className="pb-[2px] block">{item.label}</span>
                 </button>
               );
             })}
          </div>
        </motion.div>
      </div>
    </>
  );
}
