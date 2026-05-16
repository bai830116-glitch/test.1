import { useState, useEffect, useMemo } from 'react';
import { globalTimeBroker } from '../../../../../core/TimeBroker';
import { GAME_BALANCE } from '../../../../../constants';
import { ScoutStaff } from '../../../../../types/scout';
import { INITIAL_STAFF, ROOM_FURNITURE } from '../StaffConstants';
import { ActionType } from '../ScoutPixelAvatar';

interface UseStaffLogicProps {
  isVisible: boolean;
  searchRadius: number;
  serverLevel: number;
  funds: number;
  onSpendFunds?: (amount: number) => void;
  onStaffGeneUpdate?: (genes: string[]) => void;
}

export function useStaffLogic({
  isVisible,
  searchRadius,
  serverLevel,
  funds,
  onSpendFunds,
  onStaffGeneUpdate
}: UseStaffLogicProps) {
  const [staffs, setStaffs] = useState<ScoutStaff[]>(INITIAL_STAFF);
  const [currentTime, setCurrentTime] = useState({ day: 1, hour: 0, min: 0 });
  const [roomThoughts, setRoomThoughts] = useState<Record<string, string>>({});

  // Sync active genes to parent
  useEffect(() => {
    const activeScout = staffs.find(s => s.id === '1');
    if (activeScout && onStaffGeneUpdate) {
      const genes = activeScout.traits.map(t => t.name);
      onStaffGeneUpdate(genes);
    }
  }, [staffs, onStaffGeneUpdate]);

  useEffect(() => {
    if (!isVisible) return; 

    const handleTimeTick = (currentMinute: number) => {
      setCurrentTime({
         day: Math.floor(currentMinute / 1440) + 1,
         hour: Math.floor((currentMinute % 1440) / 60),
         min: Math.floor(currentMinute % 60)
      });

      const MINS_PER_SEGMENT = Math.floor(1440 * Math.max(0.2, 1.0 - ((serverLevel - 1) * 0.18)));
      const ALL_DESTINATIONS = [
        { name: '首爾總部 (亞洲)', minRadius: 0 },
        { name: '東京分部 (亞洲)', minRadius: 2500 },
        { name: '洛杉磯分部 (北美洲)', minRadius: 3800 },
        { name: '雪梨分部 (大洋洲)', minRadius: 5100 },
        { name: '倫敦分部 (歐洲)', minRadius: 6400 },
      ];
      const DESTINATIONS = ALL_DESTINATIONS.filter(d => d.minRadius <= searchRadius).map(d => d.name);
      
      const cycleMins = DESTINATIONS.length * MINS_PER_SEGMENT;
      const currentCycleMins = currentMinute % cycleMins;
      const nextIndex = (Math.floor(currentCycleMins / MINS_PER_SEGMENT) + 1) % DESTINATIONS.length;
      const currentTargetRoute = DESTINATIONS.length > 0 ? `${DESTINATIONS[nextIndex]}` : 'N/A';

      setStaffs(prev => {
        if (prev.length < (GAME_BALANCE.STAFF_MAX_COUNT || 10) && funds >= (GAME_BALANCE.STAFF_RECRUIT_MIN_FUNDS || 10000) && Math.random() < 0.005) {
           const newId = (Math.max(...prev.map(s => parseInt(s.id))) + 1).toString();
           const newStaff: ScoutStaff = {
             id: newId,
             name: "New Recruit",
             role: '探員',
             roomId: Math.floor(Math.random() * 6) + 1,
             x: 50,
             facing: 1,
             action: 'walk',
             actionText: '🆕 入職',
             fatigue: 0,
             color: `hsl(${Math.random() * 360}, 70%, 80%)`,
             stats: { charm: 50, scout: 50 },
             traits: [{ name: "AI 選拔", desc: "系統自動錄用。" }],
             avatarSprite: '👤',
             mood: 'happy'
           };
           if (onSpendFunds) setTimeout(() => onSpendFunds(GAME_BALANCE.STAFF_RECRUIT_COST || 5000), 0);
           return [...prev, newStaff];
        }

        return prev.map(s => {
          let updated = false;
          let newStaff = { ...s };

          if (s.id === '1') {
            if (s.dispatchRoute !== currentTargetRoute) {
              newStaff.dispatchRoute = currentTargetRoute;
              updated = true;
            }
          }

          if (newStaff.fatigue > 80 && funds >= (GAME_BALANCE.STAFF_FATIGUE_RECOVERY_COST || 500)) {
              newStaff.fatigue = Math.max(0, newStaff.fatigue - 20);
              newStaff.action = 'coffee';
              newStaff.mood = 'happy';
              if (onSpendFunds) setTimeout(() => onSpendFunds(GAME_BALANCE.STAFF_FATIGUE_RECOVERY_COST || 500), 0);
              updated = true;
          }

          if (currentMinute % 15 === 0) {
            newStaff.fatigue = Math.min(100, newStaff.fatigue + 1.5);
            updated = true;
          }

          return updated ? newStaff : s;
        });
      });
    };

    const unsub = globalTimeBroker.subscribe('minute', handleTimeTick);

    const interval = setInterval(() => {
      setStaffs(prev => prev.map(s => {
        if (Math.random() < 0.7) return s; 
        
        let nextAction = s.action;
        let nextText = s.actionText;
        let nextX = s.x;
        const nextRoomId = s.roomId;

        const roomFurniture = ROOM_FURNITURE[s.roomId];
        const furnitureKeys = Object.keys(roomFurniture);
        
        if (Math.random() < 0.25) {
          const targetKey = furnitureKeys[Math.floor(Math.random() * furnitureKeys.length)];
          nextX = roomFurniture[targetKey];
          nextAction = 'walk';
          
          if (nextRoomId === 5 || nextRoomId === 3 || nextRoomId === 6) {
            const officeActions: ActionType[] = ['pc', 'typing', 'read', 'idle'];
            nextAction = officeActions[Math.floor(Math.random() * officeActions.length)] as ActionType; 
          }

          const foundTrainee = Math.random() < 0.15;
          if (foundTrainee) {
            nextAction = 'excited';
            nextText = '❗ 發現練習生!';
          }

          return {
            ...s,
            action: nextAction,
            actionText: nextText,
            x: nextX,
            facing: (nextX > s.x ? 1 : -1) as 1 | -1,
          };
        }
        return s;
      }));

      if (Math.random() > 0.8) {
          const roomContext: Record<number, string[]> = {
            1: ["這件衣服適合下一組練習生", "配色太亮了", "限量款已售罄"],
            2: ["這兩個人很有默契", "點這瓶酒慶祝一下", "這道菜很有創意"],
            3: ["火候剛剛好", "食材需要補充了", "洗碗中..."],
            4: ["下一站是哪裡？", "這次計畫很有挑戰性", "休息一下吧"],
            5: ["CEO 剛才過來了", "合約審核中", "報告需要重寫"],
            6: ["基因序列分析中", "重組過程很順利", "數據異常！"]
          };
          const randomFloor = Math.floor(Math.random() * 6) + 1;
          const thoughts = roomContext[randomFloor];
          const text = thoughts[Math.floor(Math.random() * thoughts.length)];
          setRoomThoughts(prev => ({ ...prev, [randomFloor]: text }));
      }
    }, 4000);

    return () => {
      unsub();
      clearInterval(interval);
    };
  }, [isVisible, funds, serverLevel, searchRadius, onSpendFunds]);

  return { staffs, currentTime, roomThoughts };
}
