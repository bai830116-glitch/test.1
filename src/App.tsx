import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import MainMenu from './components/MainMenu';
import FounderSetup from './components/FounderSetup';
import InGame from './components/InGame';
import { GameFounderConfig, AppScreen } from './types/game';

/**
 * 場景切換管理器 (Router / State Controller)
 */
export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('MAIN_MENU');
  
  // 記錄玩家創建角色時的設定資料，用於傳遞至 InGame 畫面
  const [gameConfig, setGameConfig] = useState<GameFounderConfig | null>(null);
  
  // 記錄玩家讀檔時的初始化資料
  const [initialSaveData, setInitialSaveData] = useState<any>(null);

  /**
   * 當玩家從主選單點擊創建存檔時觸發
   */
  const handleStartGame = () => {
    setCurrentScreen('FOUNDER_SETUP');
  };

  /**
   * 當玩家從主選單讀取存檔時觸發
   */
  const handleStartGameWithSave = (loadedData: any) => {
    setInitialSaveData(loadedData);
    // TODO: 如果讀檔包含了創建角色的設定，這邊也可以從 loadedData 裡面拿取並設定 gameConfig，例如：
    // setGameConfig(loadedData.config || { name: '讀檔經紀人', origin: '讀檔的' });
    setGameConfig({ name: '讀檔經紀人', origin: '讀檔的', company: '讀檔娛樂', starterIdol: 'some_id' } as any); // 假資料以便通過 InGame 的 props
    setCurrentScreen('IN_GAME');
  };

  /**
   * 當玩家在創建介面點擊返回時觸發
   */
  const handleBackToMenu = () => {
    setCurrentScreen('MAIN_MENU');
  };

  /**
   * 當玩家完成設定並點擊「開啟星夢之旅」時觸發，進入主要遊戲畫面
   */
  const handleCompleteSetup = (config: GameFounderConfig) => {
    setGameConfig(config);
    setInitialSaveData(null); // 新遊戲清空舊存檔
    setCurrentScreen('IN_GAME');
  };

  /**
   * 遊戲內返回主選單時觸發
   */
  const handleExitGame = () => {
    setGameConfig(null);
    setInitialSaveData(null);
    setCurrentScreen('MAIN_MENU');
  };

  return (
    // 套用 AnimatePresence 使每個組件在掛載/卸載時可以執行過渡動畫
    <AnimatePresence mode="wait">
      
      {/* 渲染第一畫面：主選單 (無導航列) */}
      {currentScreen === 'MAIN_MENU' && (
        <motion.div key="MAIN_MENU" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <MainMenu onStart={handleStartGame} onStartGameWithSave={handleStartGameWithSave} />
        </motion.div>
      )}

      {/* 渲染第二畫面：創建存檔 (無導航列) */}
      {currentScreen === 'FOUNDER_SETUP' && (
        <motion.div key="FOUNDER_SETUP" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <FounderSetup onBack={handleBackToMenu} onComplete={handleCompleteSetup} />
        </motion.div>
      )}
      
      {/* 渲染第三畫面：遊戲內主畫面 (包含獨立導航列) */}
      {currentScreen === 'IN_GAME' && gameConfig && (
        <motion.div key="IN_GAME" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <InGame config={gameConfig} initialSaveData={initialSaveData} onExit={handleExitGame} />
        </motion.div>
      )}
      
    </AnimatePresence>
  );
}

