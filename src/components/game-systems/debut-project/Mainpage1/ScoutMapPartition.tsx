import React, { useState, useMemo, useEffect } from 'react';
import { globalTimeBroker } from '../../../../core/TimeBroker';
import { MapControls } from './map/MapControls';
import { MapDisplay } from './map/MapDisplay';
import { useScoutMapLogic } from './hooks/useScoutMapLogic';
import { MapScoutStaff } from '../../../../types/scout';
import { CITY_INTEL_DB } from './MapConstants';

interface ScoutMapPartitionProps {
  onTriggerNotification?: (msg: string) => void;
  activeRegion?: string;
  onRegionChange?: (region: 'Seoul' | 'Tokyo' | 'LA') => void;
  searchRadius?: number;
  serverLevel?: number;
  isVisible?: boolean;
  funds?: number;
  onSpendFunds?: (amount: number) => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export default function ScoutMapPartition({ 
  onTriggerNotification, 
  activeRegion,
  onRegionChange,
  searchRadius = 1200, 
  serverLevel = 1, 
  isVisible = true, 
  funds = 0, 
  onSpendFunds,
  isFullscreen = false,
  onToggleFullscreen
}: ScoutMapPartitionProps) {
  const [winSize, setWinSize] = useState({ 
    w: typeof window !== 'undefined' ? window.innerWidth : 1024, 
    h: typeof window !== 'undefined' ? window.innerHeight : 768 
  });
  const [selectedScout, setSelectedScout] = useState<MapScoutStaff | null>(null);

  const {
    scouts, setScouts,
    cityProgress,
    discoveryLog,
    discoveredTrainee,
    scanPulse,
    buffEndTime,
    mapContainerRef,
    scoutRef,
    tooltipRef,
    projection,
    DESTINATIONS
  } = useScoutMapLogic({
    isVisible: isVisible ?? true,
    searchRadius,
    serverLevel,
    funds,
    onSpendFunds,
    onTriggerNotification,
    onRegionChange,
    activeRegion,
    isFullscreen,
    winSize
  });

  const heatMapData = useMemo(() => {
    if (!isVisible) return [];
    return DESTINATIONS.map(d => ({
        id: d.id,
        coords: d.coordinates as [number, number],
        heat: (CITY_INTEL_DB[d.id]?.traineeHeat || 50) + Math.sin(globalTimeBroker.time / 200) * 10
    }));
  }, [globalTimeBroker.time, isVisible, DESTINATIONS]);

  useEffect(() => {
    const onResize = () => setWinSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center relative p-0 m-0 bg-[#0A0E13] font-sans select-none overflow-hidden">
      <style>{`
         @keyframes dash {
            to { stroke-dashoffset: -100; }
         }
      `}</style>
      <MapDisplay 
        mapContainerRef={mapContainerRef}
        scoutRef={scoutRef}
        tooltipRef={tooltipRef}
        projection={projection}
        DESTINATIONS={DESTINATIONS}
        discoveryLog={discoveryLog}
        discoveredTrainee={discoveredTrainee}
        selectedScout={selectedScout}
        setSelectedScout={setSelectedScout}
        scouts={scouts}
        setScouts={setScouts}
        cityProgress={cityProgress}
        onTriggerNotification={onTriggerNotification}
        buffEndTime={buffEndTime}
        scanPulse={scanPulse}
        heatMapData={heatMapData}
        onCityClick={() => {}}
        funds={funds}
        onSpendFunds={onSpendFunds}
      />

      <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-lg transform transition-all duration-500`}>
        <div className="bg-[#121214]/90 backdrop-blur-xl border-2 border-[#00B4D8]/30 rounded-2xl p-3 shadow-2xl flex flex-col gap-2">
          <div className="flex justify-between items-center px-1">
             <span className="text-[#00B4D8] text-[10px] font-black uppercase tracking-widest">Recruitment Live</span>
             <span id="scout-progress-text" className="text-[#FFD166] font-mono text-xs font-black">0%</span>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
             <div id="scout-progress-bar" className="h-full bg-[#00B4D8] transition-[width] duration-1000 ease-linear" style={{ width: '0%' }} />
          </div>
        </div>
      </div>

      <MapControls 
        isFullscreen={isFullscreen} 
        isMobile={winSize.w < 768}
        onToggleFullscreen={onToggleFullscreen || (() => {})}
        onResetView={() => {}}
      />
    </div>
  );
}
