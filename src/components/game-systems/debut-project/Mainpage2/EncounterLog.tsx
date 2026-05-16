import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronUp, ChevronDown, Calendar as CalendarIcon } from 'lucide-react';
import { useEncounterLogic } from './hooks/useEncounterLogic';
import { CalendarGrid } from './EncounterLog/CalendarGrid';
import { EncounterDetails } from './EncounterLog/EncounterDetails';
import { PendingQueue } from './EncounterLog/PendingQueue';

interface EncounterLogProps {
  pendingEncounters?: any[];
  onResolveEncounter?: (id: string) => void;
  scoutGenes?: string[];
  onSpendFunds?: (amount: number) => void;
  isNightTime?: boolean;
  totalGameMinutes?: number;
  isVisible?: boolean;
}

export default function EncounterLog({ 
  pendingEncounters = [], 
  onResolveEncounter,
  scoutGenes = [],
  isNightTime = false,
  totalGameMinutes = 0,
  isVisible = true
}: EncounterLogProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const currentMonth = Math.floor(totalGameMinutes / 43200) + 1;
  const currentDay = Math.floor((totalGameMinutes % 43200) / 1440) + 1;

  const {
    processingId,
    selectedId,
    setSelectedId,
    aiLog
  } = useEncounterLogic(
    pendingEncounters,
    isVisible,
    scoutGenes,
    currentMonth,
    currentDay,
    onResolveEncounter
  );

  const selectedLog = aiLog.find(l => l.id === selectedId) || aiLog.filter(l => l.month === currentMonth)[0];
  
  const calendarContent = (
    <CalendarGrid 
      currentMonth={currentMonth}
      currentDay={currentDay}
      aiLog={aiLog}
      selectedId={selectedId}
      setSelectedId={setSelectedId}
      onDrawerClose={() => setIsDrawerOpen(false)}
    />
  );

  const detailsContent = (
    <>
      <EncounterDetails selectedLog={selectedLog} />
      <PendingQueue pendingEncounters={pendingEncounters} processingId={processingId} />
    </>
  );

  return (
    <div className="w-full h-full bg-[#0A1128] flex flex-col xl:flex-row border-l-4 border-black font-sans text-white relative">
      
      {/* 大螢幕左側：交涉日曆方格 */}
      <div className="hidden xl:flex flex-1 flex-col p-6 bg-[#0F172A]/50 backdrop-blur-sm overflow-hidden relative">
        {calendarContent}
      </div>

      {/* 小螢幕主層 & 大螢幕右側：詳情面板 & 待處理 */}
      <div className="w-full xl:w-[420px] bg-[#0A1128] xl:border-l-[6px] border-black p-6 pb-[4.5rem] xl:pb-6 flex flex-col gap-4 xl:gap-2 relative overflow-hidden flex-1 xl:flex-none">
        {detailsContent}
      </div>

      {/* 小螢幕抽屜：日曆網格 */}
      <motion.div
        className="xl:hidden absolute inset-x-0 bottom-0 z-50 flex flex-col bg-[#0F172A]/95 backdrop-blur-md rounded-t-[2rem] border-t-[4px] border-l-[4px] border-r-[4px] border-black shadow-[0_-10px_40px_rgba(0,0,0,0.8)]"
        initial={false}
        animate={{ y: isDrawerOpen ? 0 : 'calc(100% - 3.5rem)' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        style={{ height: '75vh' }}
      >
        {/* 把手 (Handle) */}
        <button
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className="w-full h-14 bg-[#1E293B] hover:bg-[#334155] rounded-t-[1.75rem] flex items-center justify-between px-6 shrink-0 group active:bg-[#475569] border-b-[4px] border-black transition-colors"
        >
          <div className="flex items-center gap-2">
            <CalendarIcon className="text-tiffany" size={20} />
            <span className="font-black text-tiffany tracking-wider text-sm flex items-center gap-2 drop-shadow-md">約談行事曆 <div className="hidden sm:flex w-2 h-2 rounded-full bg-tiffany animate-pulse"></div></span>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="w-12 h-1.5 bg-slate-500 group-hover:bg-slate-300 active:bg-white rounded-full transition-colors"></div>
          </div>
          <div className="flex items-center text-xs text-slate-400 font-black tracking-widest uppercase">
            {isDrawerOpen ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </div>
        </button>
        {/* 抽屜內文 */}
        <div className="flex-1 overflow-hidden p-4 relative flex flex-col">
          {calendarContent}
        </div>
      </motion.div>

      {/* 夜間全屏面罩 */}
      {isNightTime && (
        <div className="absolute inset-0 z-[60] bg-[#00B4D8]/10 pointer-events-none mix-blend-multiply transition-opacity duration-1000" />
      )}
    </div>
  );
}

