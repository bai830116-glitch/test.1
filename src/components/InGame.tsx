import React, { useState, useEffect } from 'react';
import { SYSTEM_MODULES } from './game-systems';
import { GameFounderConfig } from '../types/game';
import RightGameNav from './RightGameNav';
import TopTimeHUD from './TopTimeHUD';
import { globalTimeBroker } from '../core/TimeBroker';

import { Z_INDEX } from '../constants';

export interface InGameProps {
  config: GameFounderConfig;
  initialSaveData?: any;
  onExit: () => void;
}

export default function InGame({ config, initialSaveData, onExit }: InGameProps) {
  const [navOpen, setNavOpen] = useState(false);
  const [activeId, setActiveId] = useState(() => {
    return initialSaveData?.activePageId || 'MainStage';
  });
  const [gameWeek, setGameWeek] = useState(() => {
    return initialSaveData?.gameWeek || 1;
  });

  // 如果有更多 initialSaveData 可以在這邊 useEffect 就地重設，例如 gameWeek
  React.useEffect(() => {
    if (initialSaveData?.activePageId && initialSaveData.activePageId !== activeId) {
      setActiveId(initialSaveData.activePageId);
    }
    if (initialSaveData?.gameWeek && initialSaveData.gameWeek !== gameWeek) {
      setGameWeek(initialSaveData.gameWeek);
    }
  }, [initialSaveData, activeId, gameWeek]);

  // Init globalTimeBroker
  useEffect(() => {
    // start at day 1 (0 min) or depending on initialSaveData
    globalTimeBroker.init(0);
    // Unmount GC? Normally we might want to shut down loop when InGame unmounts.
    // We can add a destroy method to TimeBroker if needed, but it's okay for now.
  }, []);

  // Match the active component
  const activeModule = SYSTEM_MODULES.find(s => s.id === activeId) || SYSTEM_MODULES[0];
  const ActiveComponent = activeModule.component;

  return (
    <div className="relative w-full h-[100dvh] bg-[#121214] text-white overflow-hidden flex">
      {/* 頂部導航欄 UI 佈局架構（全自動顯示型右上角 HUD 抽屜） */}
      <TopTimeHUD />

      {/* 動態畫布容器 (Carrier) - 承載各個分系統面板 */}
      <div 
        className="flex-1 w-full h-full relative"
        style={{ zIndex: Z_INDEX.GAME_SYSTEM }}
      >
        <ActiveComponent onOpenRightNav={() => setNavOpen(true)} />
      </div>

      {/* 獨立模組化右側導航 */}
      <RightGameNav 
        activePageId={activeId}
        onPageChange={setActiveId}
        isOpen={navOpen}
        onClose={() => setNavOpen(false)}
        onOpen={() => setNavOpen(true)}
        playerName={config.name}
        onExit={onExit}
        currentGameWeek={gameWeek}
      />
    </div>
  );
}
