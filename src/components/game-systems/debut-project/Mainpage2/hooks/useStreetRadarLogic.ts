import { useState, useEffect, useRef } from 'react';
import { Pedestrian } from './StreetRadarTypes';

interface UseStreetRadarLogicProps {
  onTraineeDiscovered?: (trainee: any) => void;
  onShowBubble?: (msg: string) => void;
  totalGameMinutes: number;
  isNightTime: boolean;
  travelRemainingMinutes: number;
  scoutGenes: string[];
  activeRegion: 'Seoul' | 'Tokyo' | 'LA' | null;
  radarLevel: number;
  scoutStamina: number;
  isVisible: boolean;
}

export function useStreetRadarLogic({
  onTraineeDiscovered,
  onShowBubble,
  totalGameMinutes,
  isNightTime,
  travelRemainingMinutes,
  scoutGenes,
  activeRegion,
  radarLevel,
  scoutStamina,
  isVisible
}: UseStreetRadarLogicProps) {
  const [pedestrians, setPedestrians] = useState<Pedestrian[]>([]);
  const pedestriansRef = useRef<Pedestrian[]>([]);
  const staminaRef = useRef(scoutStamina);
  const [scoutPos, setScoutPos] = useState({ x: 50, y: 68, facing: 1 as 1 | -1, isMoving: false, targetX: 50, targetY: 68 });
  const [currentSeason, setCurrentSeason] = useState<'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER'>('SPRING');
  const [lastRefreshMinute, setLastRefreshMinute] = useState(0);

  useEffect(() => { pedestriansRef.current = pedestrians; }, [pedestrians]);
  useEffect(() => { staminaRef.current = scoutStamina; }, [scoutStamina]);

  useEffect(() => {
    const day = Math.floor(totalGameMinutes / 1440);
    const seasons: ('SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER')[] = ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER'];
    setCurrentSeason(seasons[(day % 4)]);
  }, [totalGameMinutes]);

  const refreshCooldown = Math.max(360, 720 - (radarLevel * 80));
  const maxPeds = 6 + Math.floor(radarLevel * 1.5);

  const generatePedestrian = (id: string): Pedestrian => {
    const currentReg = activeRegion || 'Seoul';
    const basePool: Record<string, any[]> = {
      'Seoul': [
        { avatar: '👧', name: '智敏', type: 'VISUAL', vibe: '#FF85A2' },
        { avatar: '🤴', name: '泰亨', type: 'VOCAL', vibe: '#00B4D8' },
        { avatar: '👒', name: '佳恩', type: 'DANCE', vibe: '#FFF176' }
      ],
      'Tokyo': [
        { avatar: '🎸', name: '悠太', type: 'VOCAL', vibe: '#FFD166' },
        { avatar: '🧤', name: '怜奈', type: 'DANCE', vibe: '#81D8D0' }
      ],
      'LA': [
        { avatar: '🎤', name: 'Jason', type: 'VOCAL', vibe: '#00B4D8' },
        { avatar: '🧢', name: 'Sarah', type: 'DANCE', vibe: '#FF85A2' }
      ]
    };
    const pool = basePool[currentReg] || [];
    const char = pool[Math.floor(Math.random() * pool.length)] || { avatar: '👤', name: 'Unknown', type: 'NORMAL', vibe: '#999' };
    const roll = Math.random();
    let rarity: Pedestrian['rarity'] = 'C';
    if (roll > 0.98) rarity = 'SS';
    else if (roll > 0.9) rarity = 'S';
    else if (roll > 0.7) rarity = 'A';
    else if (roll > 0.4) rarity = 'B';

    return {
      id, x: 5 + Math.random() * 90, y: 61 + Math.random() * 9, type: char.type as any,
      rarity, avatar: char.avatar, name: char.name, facing: 1, isMoving: false,
      targetX: 0, targetY: 0, speed: 0.2 + Math.random() * 0.3, vibeColor: char.vibe, actionState: 'IDLE'
    };
  };

  const refreshPedestrians = () => {
    const timeFactor = isNightTime ? 0.5 : 1.2;
    const dynamicMaxPeds = Math.max(3, Math.floor(maxPeds * timeFactor));
    const list = Array.from({ length: dynamicMaxPeds }).map((_, i) => generatePedestrian(`P-${totalGameMinutes}-${i}`));
    setPedestrians(list);
    if (list.some(p => p.rarity === 'S' || p.rarity === 'SS')) {
      onShowBubble?.(isNightTime ? '【深夜爆點】偵測到稀有天賦剪影！' : '【星探嗅覺】區域內出現高品質原石！');
    }
  };

  useEffect(() => { refreshPedestrians(); }, [activeRegion, radarLevel]);

  useEffect(() => {
    if (!isVisible) return;
    const loop = setInterval(() => {
      setPedestrians(prev => prev.map(p => {
        if (!p.isMoving) {
          const roll = Math.random();
          if (p.actionState === 'PHONE' && roll < 0.05) return { ...p, actionState: 'IDLE' };
          if (p.actionState === 'IDLE' && roll < 0.02) {
             return { ...p, isMoving: true, actionState: 'WALKING', targetX: 5 + Math.random() * 90, targetY: 60 + Math.random() * 12 };
          }
          return p;
        }
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 1) return { ...p, isMoving: false, actionState: 'IDLE' };
        return { ...p, x: p.x + (dx/dist)*p.speed, y: p.y + (dy/dist)*p.speed, facing: dx > 0 ? 1 : -1 };
      }));

      setScoutPos(prev => {
        if (!prev.isMoving) {
          if (staminaRef.current > 30 && Math.random() < 0.08) {
            return { ...prev, isMoving: true, targetX: 10 + Math.random() * 80, targetY: 62 + Math.random() * 10 };
          }
          return prev;
        }
        const dx = prev.targetX - prev.x;
        const dy = prev.targetY - prev.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 2) return { ...prev, isMoving: false };
        const speed = staminaRef.current > 50 ? 0.6 : 0.3;
        return { ...prev, x: prev.x + (dx/dist)*speed, y: prev.y + (dy/dist)*speed, facing: dx > 0 ? 1 : -1 };
      });
    }, 60);
    return () => clearInterval(loop);
  }, [isVisible, isNightTime]);

  useEffect(() => {
    if (Math.abs(totalGameMinutes - lastRefreshMinute) >= refreshCooldown) {
       setLastRefreshMinute(totalGameMinutes);
       refreshPedestrians();
    }
  }, [totalGameMinutes, refreshCooldown]);

  useEffect(() => {
    if (travelRemainingMinutes > 0 || !isVisible) return;
    const scanner = setInterval(() => {
      const targets = pedestriansRef.current.filter(p => p.rarity !== 'C' && p.rarity !== 'B');
      if (targets.length > 0 && staminaRef.current >= 10) {
        const target = targets[Math.floor(Math.random() * targets.length)];
        const chance = scoutGenes.includes('銳利之眼') ? 0.8 : 0.5;
        if (Math.random() < chance) {
          setPedestrians(prev => prev.filter(p => p.id !== target.id));
          setTimeout(() => {
            onTraineeDiscovered?.({
              id: `TR-${Date.now()}`, name: target.name, rarity: target.rarity, avatar: target.avatar, type: target.type, level: 1,
              stats: { vocal: 50, dance: 50, visual: 50 }, foundAt: activeRegion, time: new Date().toLocaleTimeString()
            });
            onShowBubble?.(`AI 發現 ${target.rarity} 級人才: ${target.name}！已加入待談面試。`);
          }, 0);
        }
      }
    }, 3000);
    return () => clearInterval(scanner);
  }, [isVisible, travelRemainingMinutes, scoutGenes, activeRegion]);

  return { pedestrians, scoutPos, currentSeason };
}
