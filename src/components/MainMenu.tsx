import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Star, Sparkles, Music } from 'lucide-react';
import { getSavesIndex, SaveSlotData } from './RightGameNav';

const Particle = ({ Icon, className, delay }: { Icon: any, className: string, delay: number }) => (
  <motion.div
    className={className}
    animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
    transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay }}
  >
    <Icon className="w-full h-full fill-current" />
  </motion.div>
);

const TitleText = ({ children, colorClass, sizeClass }: { children: React.ReactNode, colorClass: string, sizeClass: string }) => (
  <div className={`relative inline-flex justify-center items-center ${sizeClass} font-black tracking-widest select-none`}>
    <span
      className="absolute z-0 text-tiffany-dark whitespace-nowrap"
      style={{
        WebkitTextStroke: 'clamp(8px, 2vw, 14px) var(--color-tiffany-dark)',
        WebkitTextFillColor: 'var(--color-tiffany-dark)',
        textShadow: '0 8px 6px rgba(0,0,0,0.25)'
      }}
      aria-hidden="true"
    >
      {children}
    </span>
    <span className={`relative z-10 ${colorClass} whitespace-nowrap`}>
      {children}
    </span>
  </div>
);

export interface MainMenuProps {
  onStart: () => void;
  onStartGameWithSave?: (loadedData: any) => void;
}

export default function MainMenu({ onStart, onStartGameWithSave }: MainMenuProps) {
  const [savesList, setSavesList] = useState<SaveSlotData[]>([]);

  useEffect(() => {
    // 第一次開啟主選單即時拉取最新存檔資料！
    setSavesList(getSavesIndex());
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }}
      style={{ backgroundColor: 'var(--color-tiffany)' }} // 簡單的美化：備用樣式確保環境通用
      className="relative min-h-[100dvh] w-full bg-tiffany overflow-y-auto overflow-x-hidden flex flex-col items-center justify-start sm:justify-center p-4 sm:p-8"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center z-0">
        <Particle Icon={Star} className="absolute top-[8%] left-[10%] md:left-[20%] text-white/30 w-10 h-10" delay={0} />
        <Particle Icon={Music} className="absolute top-[18%] right-[10%] md:right-[25%] text-macaron/50 w-12 h-12" delay={1.2} />
        <Particle Icon={Heart} className="absolute bottom-[25%] left-[8%] md:left-[20%] text-white/20 w-16 h-16" delay={0.6} />
        <Particle Icon={Star} className="absolute bottom-[10%] right-[15%] md:right-[25%] text-white/30 w-8 h-8" delay={2.1} />
        <Particle Icon={Sparkles} className="absolute top-[45%] left-[5%] md:left-[15%] text-macaron/40 w-7 h-7" delay={1.8} />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center max-w-lg mx-auto py-8 lg:py-4">
        <div className="mt-4 mb-12 flex flex-col items-center justify-center w-full">
          <motion.div initial={{ opacity: 0, y: -40, rotate: -5, scale: 0.9 }} animate={{ opacity: 1, y: 0, rotate: -2, scale: 1 }} transition={{ type: "spring", stiffness: 220, damping: 15 }} className="z-20 w-full flex justify-center">
            <TitleText colorClass="text-white" sizeClass="text-[40px] sm:text-5xl md:text-6xl">練習生走花路</TitleText>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20, rotate: 10, scale: 0.9 }} animate={{ opacity: 1, y: 0, rotate: 4, scale: 1 }} transition={{ delay: 0.15, type: "spring", stiffness: 220, damping: 15 }} className="z-10 -mt-2 sm:-mt-3 ml-24 sm:ml-32 md:ml-40 flex justify-center">
            <TitleText colorClass="text-macaron" sizeClass="text-[32px] sm:text-[40px] md:text-5xl">…才怪！</TitleText>
          </motion.div>
        </div>

        <div className="flex flex-col gap-[14px] md:gap-[18px] w-full max-w-[300px] md:max-w-[340px]">
          {savesList.map((slot, i) => (
            <motion.div key={slot.id} initial={{ opacity: 0, scale: 0.85, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.4 + (i * 0.08), type: "spring", stiffness: 280, damping: 20 }} className="w-full">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  if (slot.savedAt && onStartGameWithSave) {
                    onStartGameWithSave(slot.savedData || {});
                  } else {
                    onStart();
                  }
                }} 
                className="group relative w-full border-[3px] border-white/80 bg-white rounded-[24px] p-2 flex items-center shadow-[0_6px_0_0_var(--color-tiffany-dark)] active:shadow-[0_0px_0_0_var(--color-tiffany-dark)] active:translate-y-[6px] transition-all duration-100 outline-none select-none"
                style={{ fontFamily: "'GenSenRounded', 'Noto Sans TC', sans-serif" }}
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-[16px] bg-tiffany-light flex items-center justify-center shrink-0 shadow-inner">
                  <Heart className="w-6 h-6 md:w-7 md:h-7 text-tiffany fill-tiffany" />
                </div>
                <div className="flex-1 flex flex-col items-start justify-center pl-3 md:pl-4 pb-[4px]">
                  <span className="text-tiffany-dark font-medium text-sm md:text-base tracking-[0.05em] leading-tight pb-[2px]">
                    {slot.displayName}
                  </span>
                  <span className="text-tiffany-dark/60 text-xs tracking-wider mt-0.5 pb-[2px]">
                    {slot.savedAt ? `${slot.savedAt} - W ${slot.gameWeek}` : slot.emptyFallbackText}
                  </span>
                </div>
                <div className="absolute right-[14px] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Sparkles className="w-5 h-5 text-macaron fill-macaron" />
                </div>
              </button>
            </motion.div>
          ))}
        </div>
        <div className="h-10 w-full shrink-0 md:hidden" />
      </div>
    </motion.div>
  );
}
