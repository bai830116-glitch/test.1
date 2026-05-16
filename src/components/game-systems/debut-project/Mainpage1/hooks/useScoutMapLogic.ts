import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useAnimationFrame } from 'motion/react';
import { globalTimeBroker } from '../../../../../core/TimeBroker';
import { GAME_BALANCE } from '../../../../../constants';
import { geoMercator } from 'd3-geo';
import { ALL_DESTINATIONS, INITIAL_SCOUTS, SCOUT_LOGS } from '../MapConstants';
import { MapScoutStaff } from '../../../../../types/scout';
import { handleScoutFatigue, autoDispatchScouts, getDiscoveryDetails } from './mapLogicHelpers';

const MAP_W = 1600;
const MAP_H = 800;
const projScale = 250;
const projCenter: [number, number] = [0, 30]; 
const projection = geoMercator()
  .scale(projScale)
  .center(projCenter)
  .translate([MAP_W / 2, MAP_H / 2]);

const BASE_MINS_PER_SEGMENT = 1440;

interface UseScoutMapLogicProps {
  isVisible: boolean;
  searchRadius: number;
  serverLevel: number;
  funds: number;
  onSpendFunds?: (amount: number) => void;
  onTriggerNotification?: (msg: string) => void;
  onRegionChange?: (region: 'Seoul' | 'Tokyo' | 'LA') => void;
  activeRegion?: string;
  isFullscreen: boolean;
  winSize: { w: number, h: number };
}

export function useScoutMapLogic({
  isVisible,
  searchRadius,
  serverLevel,
  funds,
  onSpendFunds,
  onTriggerNotification,
  onRegionChange,
  activeRegion,
  isFullscreen,
  winSize
}: UseScoutMapLogicProps) {
  const [scouts, setScouts] = useState<MapScoutStaff[]>(INITIAL_SCOUTS);
  const [cityProgress, setCityProgress] = useState<Record<string, number>>({});
  const [discoveryLog, setDiscoveryLog] = useState<{id: string, name: string, type: string, time: number, scoutName: string}[]>([]);
  const [discoveredTrainee, setDiscoveredTrainee] = useState<{name: string, level: string, trait: string} | null>(null);
  const [floatingTexts, setFloatingTexts] = useState<{id: string, x: number, y: number, text: string, color: string}[]>([]);
  const [scanPulse, setScanPulse] = useState<{x: number, y: number, radius: number} | null>(null);
  const [buffEndTime, setBuffEndTime] = useState<number | null>(null);
  
  const [uiState, setUiState] = useState({
     currentLog: SCOUT_LOGS[0],
     sourceDest: ALL_DESTINATIONS[0],
     targetDest: ALL_DESTINATIONS[1],
     remainingMins: 0
  });

  const scoutRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const lastStateUpdateRef = useRef(0);
  const stateRef = useRef({ isFullscreen, winSize, isVisible, scouts, activeRegion });

  useEffect(() => {
    stateRef.current = { isFullscreen, winSize, isVisible, scouts, activeRegion };
  }, [isFullscreen, winSize, isVisible, scouts, activeRegion]);

  const DESTINATIONS = useMemo(() => 
    ALL_DESTINATIONS.filter(d => d.minRadius <= searchRadius), 
    [searchRadius]
  );

  const MINS_PER_SEGMENT = useMemo(() => 
    Math.floor(BASE_MINS_PER_SEGMENT * Math.max(0.2, 1.0 - ((serverLevel - 1) * 0.18))), 
    [serverLevel]
  );

  const triggerDiscovery = useCallback((cityName: string, scoutName: string) => {
    const types = ['練習生檔案', '品牌贊助商', '媒體合約', '時尚資源'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    if (type === '練習生檔案' && Math.random() > 0.5) {
        setDiscoveredTrainee(getDiscoveryDetails());
        setTimeout(() => setDiscoveredTrainee(null), 5000);
    }

    const newDiscovery = {
        id: Math.random().toString(36).substr(2, 9),
        name: `${cityName} 的 ${type}`,
        type,
        time: Date.now(),
        scoutName
    };
    
    const targetCity = ALL_DESTINATIONS.find(d => d.name === cityName);
    if (targetCity) {
        const projected = projection(targetCity.coordinates as [number, number]);
        if (projected) {
            const nextId = Math.random().toString();
            setFloatingTexts(prev => [...prev, { id: nextId, x: projected[0], y: projected[1], text: `FOUND: ${type}`, color: '#FFD166' }]);
            setTimeout(() => setFloatingTexts(prev => prev.filter(t => t.id !== nextId)), 2000);
        }
    }
    setDiscoveryLog(prev => [newDiscovery, ...prev].slice(0, 3));
  }, []);

  // AI Auto-Dispatch
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setScouts(prev => autoDispatchScouts(prev, DESTINATIONS, cityProgress, onTriggerNotification));

      if (funds > GAME_BALANCE.RADAR_BASE_COST && Math.random() > 0.7) {
        const activeScout = scouts[Math.floor(Math.random() * scouts.length)];
        const projected = projection(activeScout.currentCoords as [number, number]);
        if (projected && onSpendFunds) {
           onSpendFunds(300);
           setScanPulse({ x: projected[0], y: projected[1], radius: 0 });
           onTriggerNotification?.(`System: AI 自主啟動深度掃描 (經費 -300)`);
           scouts.forEach(s => {
               const sProj = projection(s.currentCoords as [number, number]);
               if (sProj) {
                   const d = Math.sqrt(Math.pow(sProj[0] - projected[0], 2) + Math.pow(sProj[1] - projected[1], 2));
                   if (d < 300) {
                        setTimeout(() => {
                            triggerDiscovery(ALL_DESTINATIONS.find(city => city.id === s.targetCityId)?.name || '隱藏區域', s.name);
                        }, 500);
                   }
               }
           });
        }
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [isVisible, DESTINATIONS, cityProgress, funds, scouts, onTriggerNotification, onSpendFunds, triggerDiscovery]);

  // Fatigue Recovery
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
        setScouts(prev => handleScoutFatigue(prev, funds, onSpendFunds, GAME_BALANCE.STAFF_FATIGUE_RECOVERY_COST));
    }, 5000);
    return () => clearInterval(interval);
  }, [isVisible, funds, onSpendFunds]);

  // Animation Loop
  useAnimationFrame((timeMs) => {
    if (!stateRef.current.isVisible) return; 

    if (timeMs - lastStateUpdateRef.current > 50) {
        if (scanPulse) {
            setScanPulse(prev => {
                if (!prev) return null;
                const nextRadius = prev.radius + 15;
                if (nextRadius > 1000) return null;
                return { ...prev, radius: nextRadius };
            });
        }
    }

    if (timeMs - lastStateUpdateRef.current > 1000) {
        setScouts(prev => prev.map(scout => {
            let nextCoords = [...scout.currentCoords] as [number, number];
            let nextStatus = scout.status;
            let nextIntel = [...scout.intelLog];
            let nextFatigue = Math.min(100, scout.fatigue + 0.05);

            if (scout.targetCityId) {
                const targetCity = ALL_DESTINATIONS.find(d => d.id === scout.targetCityId);
                if (targetCity) {
                    const dx = targetCity.coordinates[0] - scout.currentCoords[0];
                    const dy = targetCity.coordinates[1] - scout.currentCoords[1];
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    if (dist > 1) {
                        nextCoords = [
                            scout.currentCoords[0] + (dx / dist) * 0.8,
                            scout.currentCoords[1] + (dy / dist) * 0.8
                        ];
                        nextStatus = 'traveling';
                    } else {
                        nextStatus = 'scouting';
                        if (Math.random() > 0.9) {
                           triggerDiscovery(targetCity.name, scout.name);
                        }
                    }
                }
            }
            return { ...scout, currentCoords: nextCoords, status: nextStatus, intelLog: nextIntel, fatigue: nextFatigue };
        }));
    }

    const time = globalTimeBroker.time;
    const cycleMins = DESTINATIONS.length * MINS_PER_SEGMENT;
    const currentCycleMins = time % cycleMins;
    const currentIndex = Math.floor(currentCycleMins / MINS_PER_SEGMENT);
    const nextIndex = (currentIndex + 1) % DESTINATIONS.length;
    const sourceDest = DESTINATIONS[currentIndex];
    const targetDest = DESTINATIONS[nextIndex];
    const segmentProgress = (currentCycleMins % MINS_PER_SEGMENT) / MINS_PER_SEGMENT;
    const remainingMins = Math.floor(MINS_PER_SEGMENT - (currentCycleMins % MINS_PER_SEGMENT));
    const isArrivingSoon = remainingMins < 10;

    if (segmentProgress > 0.99 && Math.random() > 0.95) {
        const cityName = targetDest.id;
        setCityProgress(prev => ({ ...prev, [cityName]: Math.min((prev[cityName] || 0) + 1, 100) }));
    }

    if (timeMs - lastStateUpdateRef.current > 500) {
      setUiState({
          currentLog: SCOUT_LOGS[Math.floor((currentCycleMins / 300) % SCOUT_LOGS.length)],
          sourceDest,
          targetDest,
          remainingMins
      });
      lastStateUpdateRef.current = timeMs;
    }

    let dLng = targetDest.coordinates[0] - sourceDest.coordinates[0];
    if (dLng > 180) dLng -= 360;
    if (dLng < -180) dLng += 360;
    const lng = sourceDest.coordinates[0] + dLng * segmentProgress;
    const lat = sourceDest.coordinates[1] + (targetDest.coordinates[1] - sourceDest.coordinates[1]) * segmentProgress;
    
    // Region Check
    const regionsMapping: Record<string, 'Seoul' | 'Tokyo' | 'LA'> = { 'seoul': 'Seoul', 'tokyo': 'Tokyo', 'la': 'LA' };
    if (isArrivingSoon && regionsMapping[targetDest.id.toLowerCase()]) {
      const region = regionsMapping[targetDest.id.toLowerCase()];
      if (onRegionChange && stateRef.current.activeRegion !== region) {
        onRegionChange(region);
      }
    }

    const projected = projection([lng, lat]);
    const pxX = projected ? projected[0] : 0;
    const pxY = projected ? projected[1] : 0;

    if (scoutRef.current) scoutRef.current.style.transform = `translate(${pxX}px, ${pxY}px)`;

    if (mapContainerRef.current) {
      const { isFullscreen: fs, winSize: ws } = stateRef.current;
      const isMobile = ws.w < 768;
      if (fs) {
         const ew = isMobile ? ws.h : ws.w;
         const eh = isMobile ? ws.w : ws.h;
         const scale = Math.min(ew / MAP_W, eh / MAP_H) * 0.90;
         mapContainerRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
      } else {
         const zoomScale = isMobile ? 1.6 : 1.8; 
         const offsetX = (MAP_W / 2) - pxX;
         const offsetY = (MAP_H / 2) - pxY;
         mapContainerRef.current.style.transform = `translate(calc(-50% + ${offsetX * zoomScale}px), calc(-50% + ${offsetY * zoomScale}px)) scale(${zoomScale})`;
      }
    }

    if (tooltipRef.current) {
       if (isArrivingSoon) {
          tooltipRef.current.innerHTML = `<div class="bg-[#FFD166] text-slate-900 text-xs md:text-sm font-black px-2.5 py-1.5 rounded-xl border-b-[4px] border-[#D4A017] shadow-lg animate-pulse whitespace-nowrap">即將降落！</div>`;
       } else {
          tooltipRef.current.innerHTML = `
          <div class="flex flex-col-reverse items-center gap-1 drop-shadow-xl">
            <div class="bg-slate-900/95 text-white text-[10px] md:text-sm font-black px-2.5 py-1.5 rounded-xl border border-white/20 backdrop-blur-md shadow-lg whitespace-nowrap">
              飛往 <span style="color: ${targetDest.color}" class="mx-1 font-bold">${targetDest.name}</span>
              <span class="text-[#FFD166] tracking-widest text-[9px]">(${remainingMins} 分)</span>
            </div>
          </div>`;
       }
    }

    const progressEl = document.getElementById('scout-progress-bar');
    const percentEl = document.getElementById('scout-progress-text');
    if (progressEl && percentEl) {
       const progressValue = (1 - (remainingMins / MINS_PER_SEGMENT)) * 100;
       progressEl.style.width = `${progressValue}%`;
       percentEl.innerText = `${Math.floor(progressValue)}%`;
    }
  });

  return {
    scouts, setScouts,
    cityProgress,
    discoveryLog,
    discoveredTrainee,
    floatingTexts,
    scanPulse,
    buffEndTime,
    uiState,
    scoutRef,
    tooltipRef,
    mapContainerRef,
    DESTINATIONS,
    projection,
    triggerDiscovery
  };
}
