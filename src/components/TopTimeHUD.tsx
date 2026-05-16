import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { globalTimeBroker, SpeedMultiplier } from '../core/TimeBroker';

import { Z_INDEX } from '../constants';

export default function TopTimeHUD() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState<SpeedMultiplier>(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [locked, setLocked] = useState(false);
  const hudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This isn't perfect hot-plug hook directly for speed/lock state,
    // so we can poll or use an event. Given React, let's just subscribe to minute ticks to update time.
    // To sync speed properly we might need a generic update, but we can poll it per minute for now, 
    // or we might need an event emitter in TimeBroker. Let's rely on timeBroker properties.
    const unsub = globalTimeBroker.subscribe('minute', (mins) => {
      setTotalMinutes(mins);
      setCurrentSpeed(globalTimeBroker.speed);
      setLocked(globalTimeBroker.locked);
    });

    // initial fetch
    setTotalMinutes(globalTimeBroker.time);
    setCurrentSpeed(globalTimeBroker.speed);
    setLocked(globalTimeBroker.locked);

    return () => unsub();
  }, []);

  const formatTime = (totalMins: number) => {
    const days = Math.floor(totalMins / (24 * 60)) + 1;
    const hours = Math.floor((totalMins % (24 * 60)) / 60);
    const mins = Math.floor(totalMins % 60);
    return `第 ${days} 天 ${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const getStatusColor = () => {
    if (locked) return 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.8)]'; // 警告紅色
    if (currentSpeed === 0 || currentSpeed === 5) return 'bg-macaron shadow-[0_0_12px_rgba(254,253,150,0.8)]'; // 長草/暫停為馬卡龍黃
    return 'bg-tiffany shadow-[0_0_12px_rgba(0,178,178,0.8)]'; // 正常為蒂芬妮藍
  };

  return (
    <div 
      ref={hudRef}
      className="absolute top-0 right-0 flex flex-col items-end select-none pr-4 md:pr-6 pointer-events-auto origin-top-right transform-none"
      style={{ fontFamily: "'GenSenRounded', 'Noto Sans TC', 'Microsoft JhengHei', sans-serif", zIndex: Z_INDEX.TOP_HUD }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* 觸發區圓點 */}
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        className="pt-4 pb-2 pl-6 pr-2 cursor-pointer flex justify-end items-center h-10 w-16"
      >
        <div className="relative flex items-center justify-center w-6 h-6">
          <motion.div 
            className={`absolute inset-0 rounded-full ${getStatusColor()}`}
            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0.4, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className={`w-3 h-3 rounded-full ${getStatusColor().split(' ')[0]}`} />
        </div>
      </div>

      {/* 狀態燈面板 */}
      <div 
        className={`transition-all duration-300 overflow-hidden bg-[#1E1E22]/95 backdrop-blur-md rounded-2xl flex flex-col items-end w-80 origin-top-right border border-white/10 shadow-2xl cursor-default ${
          isOpen ? 'h-32 opacity-100 mt-2 pointer-events-auto' : 'h-0 opacity-0 mt-0 pointer-events-none'
        }`}
        onClick={(e) => { e.stopPropagation(); }}
      >
        <div className="w-full h-full p-4 flex flex-col justify-between">
          {/* 行 1: 時鐘 */}
          <div className="w-full text-right text-xs font-bold text-white/80 tracking-wider">
            {formatTime(totalMinutes)}
          </div>

          {/* 行 2 & 3: 時速看板 3x2 Grid */}
          <div className="grid grid-cols-3 gap-2 flex-1 mt-3">
            <SpeedBadge label="💤 日常暫停" speed={0} current={currentSpeed} locked={locked} />
            <SpeedBadge label="🎤 回歸打歌" speed={1} current={currentSpeed} locked={locked} />
            <SpeedBadge label="✈️ 巡演宣傳" speed={2} current={currentSpeed} locked={locked} />
            <SpeedBadge label="🏆 年末頒獎" speed={3} current={currentSpeed} locked={locked} />
            <SpeedBadge label="👟 新團企劃" speed={4} current={currentSpeed} locked={locked} />
            <SpeedBadge label="📦 空白長草" speed={5} current={currentSpeed} locked={locked} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SpeedBadge({ label, speed, current, locked }: { label: string, speed: SpeedMultiplier, current: SpeedMultiplier, locked: boolean }) {
  const isCurrent = current === speed;
  const isDanger = locked && speed === 0;

  const getStyles = () => {
    if (isDanger && isCurrent) return 'bg-rose-500/20 border-rose-500 text-rose-400 font-bold';
    if (isCurrent) return 'bg-tiffany/20 border-tiffany text-tiffany font-bold';
    return 'bg-black/30 border-white/5 text-white/50';
  };

  return (
    <div className={`flex items-center justify-center rounded-lg border-[1px] text-[11px] pb-[2px] transition-colors ${getStyles()}`}>
      <span className="tracking-widest flex items-center justify-center pb-1.5 pt-1.5">{label}</span>
    </div>
  );
}
