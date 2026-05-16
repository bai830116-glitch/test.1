import React, { useEffect, useRef } from 'react';

interface UseDebutAILogicProps {
  totalGameMinutes: number;
  radarLevel: number;
  serverLevel: number;
  agencyLevel: number;
  funds: number;
  setRadarLevel: React.Dispatch<React.SetStateAction<number>>;
  setServerLevel: React.Dispatch<React.SetStateAction<number>>;
  setSearchRadius: React.Dispatch<React.SetStateAction<number>>;
  setFunds: React.Dispatch<React.SetStateAction<number>>;
  setActiveRegion: React.Dispatch<React.SetStateAction<'Seoul' | 'Tokyo' | 'LA'>>;
  setTravelRemainingMinutes: React.Dispatch<React.SetStateAction<number>>;
  handleShowBubble: (msg: string | null) => void;
}

export function useDebutAILogic({
  totalGameMinutes,
  radarLevel,
  serverLevel,
  agencyLevel,
  funds,
  setRadarLevel,
  setServerLevel,
  setSearchRadius,
  setFunds,
  setActiveRegion,
  setTravelRemainingMinutes,
  handleShowBubble
}: UseDebutAILogicProps) {
  const lastProcessedMinute = useRef(0);

  useEffect(() => {
     if (totalGameMinutes > 0 && totalGameMinutes !== lastProcessedMinute.current) {
       let handled = false;
       
       // 每 3 天 (4320 分) AI 自動換區
       if (totalGameMinutes % 4320 === 0) {
          const regions: ('Seoul' | 'Tokyo' | 'LA')[] = ['Seoul', 'Tokyo', 'LA'];
          setActiveRegion(curr => {
            let nextR = regions[Math.floor(Math.random() * regions.length)];
            while (nextR === curr) {
              nextR = regions[Math.floor(Math.random() * regions.length)];
            }
            return nextR;
          });
          setTravelRemainingMinutes(180);
          handleShowBubble(`AI Agent 主動將雷達移轉至新區域...`);
          handled = true;
       }

       // 每小時檢查資產升級
       if (totalGameMinutes % 60 === 0) {
          // 雷達升級判斷
          const rCost = Math.floor(10000 * Math.pow(2.5, radarLevel - 1));
          if (funds >= rCost && agencyLevel >= radarLevel * 2 && radarLevel < 5) {
             setRadarLevel(l => l + 1);
             setSearchRadius(r => r + 1300);
             setFunds(f => f - rCost);
             handleShowBubble(`AI Agent 自動升級雷達至 LV.${radarLevel + 1}！`);
          }

          // 伺服器升級判斷
          const sCost = Math.floor(15000 * Math.pow(2.8, serverLevel - 1));
          if (funds >= sCost && agencyLevel >= serverLevel * 2 + 1 && serverLevel < 5) {
             setServerLevel(l => l + 1);
             setFunds(f => f - sCost);
             handleShowBubble(`AI Agent 自動升級伺服器至 LV.${serverLevel + 1}！`);
          }
          handled = true;
       }
       
       if (handled) {
          lastProcessedMinute.current = totalGameMinutes;
       }
     }
  }, [totalGameMinutes, radarLevel, serverLevel, agencyLevel, funds, handleShowBubble]);
}
