import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SYSTEM_MODULES } from './game-systems';
import { Z_INDEX } from '../constants';

export type SaveControlMode = 'save' | 'delete';

export interface SaveControlConfig {
  mode: SaveControlMode;
  icon: string;
  label: string;
  headerTitle: string;
  headerSubTitle: string;
  hoverBgColorClass: string;
  hoverBorderColorClass: string;
}

export const SAVE_CONTROL_MODES: SaveControlConfig[] = [
  {
    mode: 'save',
    icon: '💾',
    label: '儲存遊戲',
    headerTitle: '紀錄秘密 💾',
    headerSubTitle: 'SAVE GAME DATA',
    hoverBgColorClass: 'hover:bg-tiffany/20',
    hoverBorderColorClass: 'hover:border-tiffany/40',
  },
  {
    mode: 'delete',
    icon: '🗑️',
    label: '刪除檔案',
    headerTitle: '撕毀檔案 🗑️',
    headerSubTitle: 'DELETE SAVE FILE',
    hoverBgColorClass: 'hover:bg-red-500/20',
    hoverBorderColorClass: 'hover:border-red-500/40',
  }
];

export interface SaveSlotData {
  id: string;
  isAuto: boolean;
  displayName: string;
  savedAt: string | null;
  gameWeek: number | null;
  emptyFallbackText: string;
  savedData?: any;
}

const DEFAULT_SAVES: SaveSlotData[] = [
  { id: 'manual_1', isAuto: false, displayName: '總裁親筆御賜存檔 (一)', savedAt: null, gameWeek: null, emptyFallbackText: '無情總裁的空檔...' },
  { id: 'manual_2', isAuto: false, displayName: '總裁親筆御賜存檔 (二)', savedAt: null, gameWeek: null, emptyFallbackText: '讀取寂寞覺得冷...' },
  { id: 'manual_3', isAuto: false, displayName: '總裁親筆御賜存檔 (三)', savedAt: null, gameWeek: null, emptyFallbackText: '這裡跟總裁的錢包一樣空...' },
  { id: 'auto_1', isAuto: true, displayName: '經紀人血汗爆肝備份 (甲)', savedAt: null, gameWeek: null, emptyFallbackText: '睡什麼睡！起來嗨！' },
  { id: 'auto_2', isAuto: true, displayName: '經紀人血汗爆肝備份 (乙)', savedAt: null, gameWeek: null, emptyFallbackText: '肝指數過高無法顯示...' },
  { id: 'auto_3', isAuto: true, displayName: '經紀人血汗爆肝備份 (丙)', savedAt: null, gameWeek: null, emptyFallbackText: '虛無的防爆雷宇宙...' },
];

export function getSavesIndex(): SaveSlotData[] {
  try {
    const saved = localStorage.getItem('__game_saves_index__');
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return DEFAULT_SAVES;
}

interface RightGameNavProps {
  activePageId: string;
  onPageChange: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  playerName: string;
  onExit: () => void;
  currentGameWeek: number;
}

export default function RightGameNav({ activePageId, onPageChange, isOpen, onClose, onOpen, playerName, onExit, currentGameWeek }: RightGameNavProps) {
  const [viewMode, setViewMode] = useState<SaveControlMode | 'navigation'>('navigation');
  const [savesList, setSavesList] = useState<SaveSlotData[]>([]);

  useEffect(() => {
    if (viewMode !== 'navigation') {
      setSavesList(getSavesIndex());
    }
  }, [viewMode]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-[2px]"
            style={{ zIndex: Z_INDEX.RIGHT_NAV_BG }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <div 
        className="fixed top-0 right-0 h-full flex items-center justify-end"
        style={{ pointerEvents: isOpen ? 'auto' : 'none', zIndex: Z_INDEX.RIGHT_NAV }}
      >
        {/* 右側隱性感應牆 */}
        {!isOpen && (
          <div 
            className="absolute right-0 w-[40px] h-[60%] top-[20%] bg-transparent pointer-events-auto cursor-pointer"
            onMouseEnter={onOpen}
            onTouchStart={onOpen}
          />
        )}

        <motion.div 
          initial={false}
          animate={{ x: isOpen ? 0 : '100%' }}
          transition={{ ease: [0.34, 1.56, 0.64, 1], duration: 0.3 }}
          className="relative bg-tiffany/95 shadow-[-4px_0_20px_rgba(10,186,181,0.2)] border-l border-white/20 max-h-[85vh] h-[800px] rounded-l-[24px] flex flex-col pointer-events-auto w-[240px]"
        >
          {/* 右側隱藏時露出的提示條 */}
          {!isOpen && (
             <div className="absolute top-1/2 -left-[6px] -translate-y-1/2 w-[6px] h-[80px] bg-tiffany rounded-l-[8px] shadow-[-2px_0_10px_rgba(10,186,181,0.8)]" />
          )}

          {/* 右上角按鈕組 JSX 注入段落 */}
          <div 
            className="absolute top-4 right-4 flex gap-2 pointer-events-auto z-10" 
            style={{ fontFamily: "'GenSenRounded', 'Noto Sans TC', sans-serif" }}
          >
            {viewMode === 'navigation' ? (
              SAVE_CONTROL_MODES.map(btn => (
                <button
                  key={btn.mode}
                  title={btn.label}
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewMode(btn.mode);
                  }}
                  className={`flex items-center justify-center w-8 h-8 rounded-full bg-black/20 text-white border border-white/20 transition-all cursor-pointer pb-[2px] ${btn.hoverBgColorClass} ${btn.hoverBorderColorClass}`}
                >
                  <span>{btn.icon}</span>
                </button>
              ))
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setViewMode('navigation');
                }}
                className="flex items-center justify-center h-8 px-3 rounded-full bg-black/20 text-white shadow-sm border border-white/20 hover:bg-white/10 hover:border-white/40 transition-colors pb-[2px] text-xs font-bold"
              >
                ↩ 溜回去
              </button>
            )}
          </div>

          {/* 總導航標題 */}
          <div className="px-4 py-8 border-b border-white/20 relative">
            {viewMode === 'navigation' ? (
              <>
                <p className="text-[#121214] font-heavy text-lg leading-tight flex flex-col">
                  <span>{playerName}</span>
                  <span className="text-sm font-medium opacity-80 pt-1">代表管理中心</span>
                </p>
                <button 
                  onClick={onExit}
                  className="mt-4 text-xs bg-red-500/90 hover:bg-red-500 text-white w-full py-2 rounded-xl shadow transition-colors font-bold"
                >
                  返回主畫面
                </button>
              </>
            ) : (
              <div className="text-[#121214]" style={{ fontFamily: "'GenSenRounded', 'Noto Sans TC', sans-serif" }}>
                <h3 className="font-heavy text-[22px] drop-shadow-sm pb-[2px] tracking-wide">
                  {SAVE_CONTROL_MODES.find(m => m.mode === viewMode)?.headerTitle}
                </h3>
                <p className="text-xs font-bold opacity-60 tracking-wider mt-1">
                  {SAVE_CONTROL_MODES.find(m => m.mode === viewMode)?.headerSubTitle}
                </p>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto w-full py-2 flex flex-col px-2 gap-1 [&::-webkit-scrollbar]:hidden pb-10">
             {viewMode === 'navigation' ? SYSTEM_MODULES.map(sys => (
               <button 
                 key={sys.id}
                 onClick={() => { onPageChange(sys.id); onClose(); }}
                 className={`group flex items-center gap-3 w-full px-3 py-3 rounded-[12px] transition-all outline-none border-[2px]
                   ${activePageId === sys.id 
                     ? 'bg-macaron shadow-[0_0_15px_rgba(255,237,153,0.7)] border-white text-black translate-x-[-4px]' 
                     : 'bg-transparent text-white border-transparent hover:bg-black/10'}
                 `}
               >
                 <span className="text-xl pt-[2px]">{sys.icon}</span>
                 <span className="font-bold pb-[2px]">{sys.name}</span>
               </button>
             )) : savesList.map((slot) => {
               const isDisabled = viewMode === 'save' && slot.isAuto;
               return (
                 <button
                   key={slot.id}
                   disabled={isDisabled}
                   onClick={(e) => {
                     e.stopPropagation();
                     e.nativeEvent?.stopImmediatePropagation?.();
                     if (viewMode === 'save') {
                       const savedDate = new Date().toLocaleString('zh-TW');
                       const updatedList = savesList.map(s => s.id === slot.id ? { ...s, savedAt: savedDate, gameWeek: currentGameWeek, savedData: { activePageId, gameWeek: currentGameWeek } } : s);
                       setSavesList(updatedList);
                       localStorage.setItem('__game_saves_index__', JSON.stringify(updatedList));
                       alert('經紀人：存檔資料已經成功寫入了 💾！');
                     } else if (viewMode === 'delete' && slot.savedAt) {
                       const updatedList = savesList.map(s => s.id === slot.id ? { ...s, savedAt: null, gameWeek: null, savedData: undefined } : s);
                       setSavesList(updatedList);
                       localStorage.setItem('__game_saves_index__', JSON.stringify(updatedList));
                       alert('系統：此檔案已經徹底被撕毀了 🗑️！');
                     }
                   }}
                   className={`w-full flex-col items-start justify-center p-3 rounded-[12px] transition-all outline-none border-[2px] border-white/20 hover:bg-white/10 relative z-30 pointer-events-auto ${
                     isDisabled ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'
                   }`}
                   style={{ fontFamily: "'GenSenRounded', 'Noto Sans TC', sans-serif" }}
                 >
                   <div className="text-white font-bold pb-[2px]">{slot.displayName}</div>
                   <div className="text-white/60 text-xs mt-1 pb-[2px]">
                     {slot.savedAt ? `${slot.savedAt} - W ${slot.gameWeek}` : slot.emptyFallbackText}
                   </div>
                 </button>
               );
             })}
          </div>
        </motion.div>
      </div>
    </>
  );
}
