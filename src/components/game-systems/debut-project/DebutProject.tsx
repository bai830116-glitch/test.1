import React, { useState, useEffect, useCallback } from 'react';
import LeftSubNav from '../../LeftSubNav';
import ScoutMapPartition from './Mainpage1/ScoutMapPartition';
import ScoutStaffPartition from './Mainpage1/ScoutStaffPartition';
import { ScoutUpgradePartition } from './Mainpage1/ScoutUpgradePartition';
import StreetRadarPartition from './Mainpage2/StreetRadarPartition';
import EncounterLog from './Mainpage2/EncounterLog';
import { globalTimeBroker } from '../../../core/TimeBroker';
import { useDebutAILogic } from './hooks/useDebutAILogic';

const SUB_TABS = [
  { 
    id: 'group-1', label: '全球星探', 
    children: [
      { id: '1-A', label: '1-A 區域派遣網' },
      { id: '1-B', label: '1-B 獵頭事務所' },
      { id: '1-C', label: '1-C 基建投資' }
    ]
  },
  {
    id: 'group-2', label: '街頭偶遇', 
    children: [
      { id: '2-A', label: '2-A 雷達掃描區' },
      { id: '2-B', label: '2-B 偶遇事件簿' }
    ]
  }
];

export default function DebutProject() {
  const [activeTab, setActiveTab] = useState('1-A');
  const [searchRadius, setSearchRadius] = useState(1200);
  const [serverLevel, setServerLevel] = useState(1);
  const [radarLevel, setRadarLevel] = useState(1);
  const [agencyLevel, setAgencyLevel] = useState(1);
  const [funds, setFunds] = useState(500000);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [winSize, setWinSize] = useState({ w: 1024, h: 768 });
  const [radarBubble, setRadarBubble] = useState<string | null>(null);
  const [totalGameMinutes, setTotalGameMinutes] = useState(0);
  const [pendingEncounters, setPendingEncounters] = useState<any[]>([]);
  const [activeRegion, setActiveRegion] = useState<'Seoul' | 'Tokyo' | 'LA'>('Seoul');
  const [travelRemainingMinutes, setTravelRemainingMinutes] = useState(0);
  const [activeScoutGenes, setActiveScoutGenes] = useState<string[]>(['銳利之眼', '高奢人脈']); 
  const [scoutStamina, setScoutStamina] = useState(100);

  const isNightTime = (totalGameMinutes % 1440) < 360 || (totalGameMinutes % 1440) >= 1080;

  useEffect(() => {
    const onResize = () => setWinSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleShowBubble = useCallback((msg: string | null) => setRadarBubble(msg), []);

  useDebutAILogic({
    totalGameMinutes, radarLevel, serverLevel, agencyLevel, funds,
    setRadarLevel, setServerLevel, setSearchRadius, setFunds,
    setActiveRegion, setTravelRemainingMinutes, handleShowBubble
  });

  useEffect(() => {
    setTotalGameMinutes(globalTimeBroker.time);
    const unsub = globalTimeBroker.subscribe('minute', (mins) => {
      setTotalGameMinutes(mins);
      setTravelRemainingMinutes(prev => Math.max(0, prev - 1));
      setScoutStamina(s => Math.min(100, s + 0.5));
    });
    return () => unsub();
  }, []);

  const handleSpendFunds = useCallback((amount: number) => setFunds(prev => prev - amount), []);
  const handleRegionChange = useCallback((region: 'Seoul' | 'Tokyo' | 'LA') => setActiveRegion(region), []);
  const handleStaffGeneUpdate = useCallback((genes: string[]) => setActiveScoutGenes(genes), []);
  const handleTraineeDiscovered = useCallback((trainee: any) => {
    setPendingEncounters(prev => prev.some(p => p.name === trainee.name) ? prev : [...prev, trainee]);
    setScoutStamina(s => Math.max(0, s - 12));
  }, []);
  const handleResolveEncounter = useCallback((id: string) => setPendingEncounters(prev => prev.filter(e => e.id !== id)), []);

  return (
    <div className={`relative w-full h-[100dvh] flex bg-[#121214] text-white overflow-hidden ${isFullscreen ? 'z-[60]' : ''}`}>
      {!isFullscreen && (
        <LeftSubNav 
          items={SUB_TABS} activeId={activeTab} onSelect={setActiveTab} 
          extraInfo={{
            ...(activeTab !== '2-A' && (radarBubble || pendingEncounters.length > 0) ? { '2-A': { type: 'bubble', text: radarBubble || `有 ${pendingEncounters.length} 個新候選！` } } : {}),
          }}
        />
      )}
      
      <div className={isFullscreen ? "fixed inset-0 z-[60] bg-[#0A0E13] flex overflow-hidden" : "flex-1 w-full h-full relative overflow-hidden"}>
        <div className={activeTab === '1-A' ? 'block w-full h-full' : 'hidden'}>
          <ScoutMapPartition 
            searchRadius={searchRadius} serverLevel={serverLevel} funds={funds} onSpendFunds={handleSpendFunds}
            activeRegion={activeRegion} onRegionChange={handleRegionChange} isVisible={activeTab === '1-A'} 
            isFullscreen={isFullscreen} onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
          />
        </div>

        <div className={activeTab === '1-B' ? 'block w-full h-full overflow-y-auto' : 'hidden'}>
          <ScoutStaffPartition 
            searchRadius={searchRadius} serverLevel={serverLevel} funds={funds} onSpendFunds={handleSpendFunds}
            onStaffGeneUpdate={handleStaffGeneUpdate} isVisible={activeTab === '1-B'} 
          />
        </div>

        <div className={activeTab === '1-C' ? 'block w-full h-full overflow-y-auto custom-scrollbar' : 'hidden'}>
          <div className="w-full h-full flex justify-center items-center">
            <ScoutUpgradePartition 
               searchRadius={searchRadius} serverLevel={serverLevel} radarLevel={radarLevel} agencyLevel={agencyLevel} funds={funds}
               onUpgradeRadar={(nr, nl, c) => { setSearchRadius(nr); setRadarLevel(nl); setFunds(p => p - c); if (nl % 2 === 0) setAgencyLevel(p => p + 1); }} 
               onUpgradeServer={(nl, c) => { setServerLevel(nl); setFunds(p => p - c); setAgencyLevel(p => p + 1); }} 
            />
          </div>
        </div>
        
        <div className={activeTab === '2-A' ? 'block w-full h-full overflow-hidden' : 'hidden'}>
          <StreetRadarPartition 
            onTraineeDiscovered={handleTraineeDiscovered} onShowBubble={handleShowBubble} totalGameMinutes={totalGameMinutes}
            isNightTime={isNightTime} travelRemainingMinutes={travelRemainingMinutes} scoutGenes={activeScoutGenes}
            activeRegion={travelRemainingMinutes > 0 ? null : activeRegion} radarLevel={radarLevel} scoutStamina={scoutStamina} isVisible={activeTab === '2-A'}
          />
        </div>

        <div className={activeTab === '2-B' ? 'block w-full h-full overflow-y-auto' : 'hidden'}>
          <EncounterLog 
            pendingEncounters={pendingEncounters} onResolveEncounter={handleResolveEncounter} isNightTime={isNightTime}
            scoutGenes={activeScoutGenes} onSpendFunds={handleSpendFunds} totalGameMinutes={totalGameMinutes} isVisible={activeTab === '2-B'}
          />
        </div>
        
        {activeTab !== '1-A' && (
          <button 
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="absolute bottom-4 right-4 z-[60] w-12 h-12 bg-[#121214]/90 text-white border-2 border-[#0ABAB5] rounded-full flex items-center justify-center shadow-lg backdrop-blur-md active:scale-95 transition-all text-xl"
          >
             {isFullscreen ? '↙' : '↗'}
          </button>
        )}
      </div>
    </div>
  );
}
