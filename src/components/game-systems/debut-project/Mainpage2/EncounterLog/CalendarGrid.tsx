import React from 'react';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, Mic, Music, Star, User, Zap } from 'lucide-react';

interface CalendarGridProps {
  currentMonth: number;
  currentDay: number;
  aiLog: any[];
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  onDrawerClose: () => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentMonth,
  currentDay,
  aiLog,
  selectedId,
  setSelectedId,
  onDrawerClose
}) => {
  const daysInMonth = 30;
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const getDayIcon = (type: string) => {
    switch (type) {
      case 'VOCAL': return <Mic size={14} className="text-black" />;
      case 'DANCE': return <Music size={14} className="text-black" />;
      case 'VISUAL': return <Star size={14} className="text-black" />;
      default: return <User size={14} className="text-black" />;
    }
  };

  const getDayColor = (type: string) => {
    switch (type) {
      case 'VOCAL': return 'bg-tiffany';
      case 'DANCE': return 'bg-[#FFD166]';
      case 'VISUAL': return 'bg-[#FF85A2]';
      default: return 'bg-white';
    }
  };

  return (
    <>
      <div className="flex justify-between items-end mb-4 xl:mb-6 shrink-0">
        <div>
          <div className="flex items-center gap-2 xl:gap-3 mb-1">
            <CalendarIcon className="text-tiffany hidden xl:block" size={32} />
            <h2 className="text-2xl xl:text-3xl font-black tracking-widest text-tiffany drop-shadow-[0_2px_4px_rgba(0,186,181,0.3)]">交涉行事曆 (第 {currentMonth} 個月)</h2>
          </div>
          <p className="text-slate-400 font-bold text-xs xl:text-sm tracking-widest uppercase">Agent Interaction Calendar</p>
        </div>
        <div className="flex gap-2 xl:gap-4 flex-wrap justify-end">
           <div className="flex items-center gap-1 xl:gap-2">
              <div className="w-3 h-3 xl:w-4 xl:h-4 bg-tiffany border-2 border-black flex items-center justify-center rounded-sm shrink-0"></div>
              <span className="text-[10px] xl:text-xs font-bold text-slate-300">VOCAL</span>
           </div>
           <div className="flex items-center gap-1 xl:gap-2">
              <div className="w-3 h-3 xl:w-4 xl:h-4 bg-[#FFD166] border-2 border-black flex items-center justify-center rounded-sm shrink-0"></div>
              <span className="text-[10px] xl:text-xs font-bold text-slate-300">DANCE</span>
           </div>
           <div className="flex items-center gap-1 xl:gap-2">
              <div className="w-3 h-3 xl:w-4 xl:h-4 bg-[#FF85A2] border-2 border-black flex items-center justify-center rounded-sm shrink-0"></div>
              <span className="text-[10px] xl:text-xs font-bold text-slate-300">VISUAL</span>
           </div>
        </div>
      </div>

      <div className="flex-1 border-[4px] border-black bg-black/40 xl:rounded-[2rem] rounded-[1.5rem] p-3 xl:p-4 shadow-[inset_0_4px_12px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col">
         <div className="grid grid-cols-7 gap-2 xl:gap-3 mb-2 shrink-0">
             {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                <div key={d} className="text-center text-[10px] xl:text-xs font-black text-slate-400 uppercase tracking-widest">{d}</div>
             ))}
         </div>
         <div className="grid grid-cols-7 gap-2 xl:gap-3 flex-1 content-start overflow-y-auto pr-2 custom-scrollbar pb-8">
            {calendarDays.map((day) => {
              const dayLogs = aiLog.filter(l => l.month === currentMonth && l.day === day);
              const isToday = day === currentDay;
              const isPast = day < currentDay;

              return (
                <div
                  key={`day-${day}`}
                  className={`aspect-square rounded-xl xl:rounded-2xl border-[3px] shadow-[2px_2px_0_#000] xl:shadow-[3px_3px_0_#000] flex flex-col p-1 xl:p-2 transition-all relative overflow-hidden ${
                    isToday ? 'border-tiffany bg-tiffany/10 ring-2 ring-tiffany/50 ring-offset-2 ring-offset-black/20' : 
                    isPast ? 'border-white/10 bg-white/5 opacity-80' : 'border-white/20 bg-[#1E293B]'
                  }`}
                >
                  <div className={`text-[10px] xl:text-xs font-black ${isToday ? 'text-tiffany drop-shadow-md' : isPast ? 'text-slate-500' : 'text-slate-400'}`}>
                    {day}
                  </div>
                  
                  <div className="flex-1 flex items-end justify-center gap-1 xl:gap-1.5 pb-1">
                    {dayLogs.slice(0, 3).map((log) => (
                      <motion.button
                        key={log.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.2, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          setSelectedId(log.id);
                          if (window.innerWidth < 1280) onDrawerClose();
                        }}
                        className={`w-4 h-4 xl:w-6 xl:h-6 rounded-full xl:rounded-md border-2 border-black flex items-center justify-center ${getDayColor(log.type)} ${selectedId === log.id ? 'ring-2 ring-white scale-110 z-10 box-content' : ''}`}
                        title={log.name}
                      >
                         <div className="scale-75 xl:scale-100 hidden sm:block">
                           {log.status === 'processing' ? <Zap size={14} className="animate-spin text-black" /> : getDayIcon(log.type)}
                         </div>
                         <div className="scale-[0.5] sm:hidden">
                           {getDayIcon(log.type)}
                         </div>
                      </motion.button>
                    ))}
                    {dayLogs.length > 3 && (
                      <div className="w-3 h-3 rounded-full bg-slate-600 border border-black text-[8px] font-black text-white flex items-center justify-center pb-[#1px]">
                         +
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
         </div>
      </div>
    </>
  );
};
